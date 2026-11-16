// Automatic payments for Itqan Academy: PayPal (buttons) + Paymob (cards / wallets in Egypt).
// Keys are read from the database (site_settings = public ids, private_settings = secrets, owner-only).
// Orders are only ever marked paid after the provider confirms the money server-side.
const URL_ = Deno.env.get("SUPABASE_URL")!, SRK = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!, ANON = Deno.env.get("SUPABASE_ANON_KEY")!;
const SITE = "https://itqan-maqamat-academy.vercel.app";
const cors = { "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type", "Access-Control-Allow-Methods": "POST, OPTIONS" };
const J = (o: unknown, s = 200) => new Response(JSON.stringify(o), { status: s, headers: { ...cors, "Content-Type": "application/json" } });
const H = { apikey: SRK, Authorization: `Bearer ${SRK}`, "Content-Type": "application/json" };
async function rest(path: string, init: RequestInit = {}) {
  const r = await fetch(`${URL_}/rest/v1/${path}`, { ...init, headers: { ...H, ...(init.headers || {}) } });
  const t = await r.text(); if (!r.ok) throw new Error(`db ${r.status} ${t}`); return t ? JSON.parse(t) : null;
}
async function cfg() {
  const [a, b] = await Promise.all([rest("site_settings?id=eq.1&select=data"), rest("private_settings?id=eq.1&select=data")]);
  const pub = (a && a[0] && a[0].data) || {}, prv = (b && b[0] && b[0].data) || {};
  return { pay: pub.payments || {}, cur: pub.currency || "USD", prv };
}
async function getOrder(id: string) { const r = await rest(`orders?id=eq.${id}&select=id,student_id,amount,currency,payment_status,plan_id,kind,pay_code`); return r && r[0]; }
async function markPaid(id: string, method: string, ref: string) {
  await rest(`orders?id=eq.${id}&payment_status=neq.paid`, { method: "PATCH", headers: { Prefer: "return=minimal" },
    body: JSON.stringify({ payment_status: "paid", paid_at: new Date().toISOString(), payment_method: method, payment_ref: ref }) });
  await rest(`orders?id=eq.${id}&status=eq.pending`, { method: "PATCH", headers: { Prefer: "return=minimal" }, body: JSON.stringify({ status: "active" }) });
}
async function whoAmI(req: Request) {
  const a = req.headers.get("Authorization") || ""; if (!a) return null;
  const r = await fetch(`${URL_}/auth/v1/user`, { headers: { Authorization: a, apikey: ANON } }); if (!r.ok) return null; return await r.json();
}
function usdOf(o: any, rate: number) { return o.currency === "EGP" ? (rate > 0 ? o.amount / rate : 0) : Number(o.amount); }
function egpOf(o: any, rate: number) { return o.currency === "EGP" ? Number(o.amount) : (rate > 0 ? o.amount * rate : 0); }

// ---------- PayPal ----------
async function ppToken(pay: any, prv: any) {
  const base = pay.paypalMode === "sandbox" ? "https://api-m.sandbox.paypal.com" : "https://api-m.paypal.com";
  if (!pay.paypalClientId || !prv.paypal_secret) throw new Error("paypal_not_configured");
  const r = await fetch(`${base}/v1/oauth2/token`, { method: "POST", headers: { Authorization: "Basic " + btoa(`${pay.paypalClientId}:${prv.paypal_secret}`), "Content-Type": "application/x-www-form-urlencoded" }, body: "grant_type=client_credentials" });
  const j = await r.json(); if (!r.ok) throw new Error("paypal_auth"); return { base, tok: j.access_token };
}

// ---------- Paymob HMAC (transaction processed callback) ----------
const HKEYS = ["amount_cents", "created_at", "currency", "error_occured", "has_parent_transaction", "id", "integration_id", "is_3d_secure", "is_auth", "is_capture", "is_refunded", "is_standalone_payment", "is_voided", "order.id", "owner", "pending", "source_data.pan", "source_data.sub_type", "source_data.type", "success"];
function pick(o: any, k: string) { return k.split(".").reduce((a, p) => (a == null ? a : a[p]), o); }
async function hmac512(key: string, msg: string) {
  const k = await crypto.subtle.importKey("raw", new TextEncoder().encode(key), { name: "HMAC", hash: "SHA-512" }, false, ["sign"]);
  const s = new Uint8Array(await crypto.subtle.sign("HMAC", k, new TextEncoder().encode(msg)));
  return [...s].map((b) => b.toString(16).padStart(2, "0")).join("");
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: cors });
  const url = new URL(req.url);
  try {
    if (url.searchParams.get("paymob") === "1") {
      const body = await req.json().catch(() => ({}));
      const obj = body.obj || {};
      const { prv } = await cfg();
      if (!prv.paymob_hmac) return J({ ok: false }, 400);
      const msg = HKEYS.map((k) => { const v = pick(obj, k); return v === null || v === undefined ? "" : String(v); }).join("");
      const mine = await hmac512(prv.paymob_hmac, msg);
      if (mine !== (url.searchParams.get("hmac") || "").toLowerCase()) return J({ ok: false, error: "bad_hmac" }, 401);
      if (obj.success === true && obj.pending === false && !obj.is_refunded && !obj.is_voided) {
        const ref = String(pick(obj, "order.merchant_order_id") || "");
        const oid = ref.slice(0, 36);
        const o = oid && await getOrder(oid);
        const { pay } = await cfg();
        if (o && Math.round(egpOf(o, Number(pay.egpRate || 0)) * 100) <= Number(obj.amount_cents)) await markPaid(o.id, "paymob", String(obj.id));
      }
      return J({ ok: true });
    }
    if (req.method !== "POST") return J({ error: "method" }, 405);
    const { action, order_id, paypal_order_id } = await req.json();
    const user = await whoAmI(req); if (!user) return J({ error: "login" }, 401);
    const o = await getOrder(order_id); if (!o || o.student_id !== user.id) return J({ error: "order" }, 404);
    if (o.payment_status === "paid") return J({ ok: true, paid: true });
    const { pay, prv } = await cfg(); const rate = Number(pay.egpRate || 0);

    if (action === "paypal_create") {
      const usd = usdOf(o, rate); if (!(usd > 0)) return J({ error: "amount" }, 400);
      const { base, tok } = await ppToken(pay, prv);
      const r = await fetch(`${base}/v2/checkout/orders`, { method: "POST", headers: { Authorization: `Bearer ${tok}`, "Content-Type": "application/json" },
        body: JSON.stringify({ intent: "CAPTURE", purchase_units: [{ reference_id: o.id, custom_id: o.id, invoice_id: `${o.pay_code}-${Date.now()}`, description: `Itqan Academy ${o.pay_code}`, amount: { currency_code: "USD", value: usd.toFixed(2) } }], application_context: { shipping_preference: "NO_SHIPPING", brand_name: "Itqan Academy" } }) });
      const j = await r.json(); if (!r.ok) return J({ error: "paypal_create", detail: j?.name }, 400);
      return J({ id: j.id });
    }
    if (action === "paypal_capture") {
      const { base, tok } = await ppToken(pay, prv);
      const r = await fetch(`${base}/v2/checkout/orders/${encodeURIComponent(paypal_order_id)}/capture`, { method: "POST", headers: { Authorization: `Bearer ${tok}`, "Content-Type": "application/json" } });
      const j = await r.json();
      const cap = j?.purchase_units?.[0]?.payments?.captures?.[0];
      const okAmt = cap && Number(cap.amount?.value) + 0.009 >= usdOf(o, rate) && cap.amount?.currency_code === "USD";
      if (j?.status === "COMPLETED" && cap?.status === "COMPLETED" && cap.custom_id === o.id && okAmt) { await markPaid(o.id, "paypal", cap.id); return J({ ok: true, paid: true }); }
      return J({ error: "paypal_not_completed", status: j?.status || j?.name }, 400);
    }
    if (action === "paymob_create") {
      if (!prv.paymob_secret || !pay.paymobPublicKey || !prv.paymob_integrations) return J({ error: "paymob_not_configured" }, 400);
      const cents = Math.round(egpOf(o, rate) * 100); if (!(cents > 0)) return J({ error: "amount" }, 400);
      const ids = String(prv.paymob_integrations).split(/[ ,]+/).map((x: string) => parseInt(x, 10)).filter((x: number) => x > 0);
      const prof = (await rest(`profiles?id=eq.${user.id}&select=real_name,phone,email`))?.[0] || {};
      const nm = String(prof.real_name || "Student").trim().split(/\s+/);
      const r = await fetch("https://accept.paymob.com/v1/intention/", { method: "POST", headers: { Authorization: `Token ${prv.paymob_secret}`, "Content-Type": "application/json" },
        body: JSON.stringify({ amount: cents, currency: "EGP", payment_methods: ids, items: [{ name: `Itqan ${o.pay_code}`, amount: cents, description: String(o.plan_id || o.kind || "order"), quantity: 1 }],
          billing_data: { first_name: nm[0] || "Student", last_name: nm.slice(1).join(" ") || "Itqan", email: prof.email || user.email || "student@itqan.academy", phone_number: prof.phone || "+201000000000", apartment: "NA", street: "NA", building: "NA", floor: "NA", city: "NA", country: "EG", state: "NA" },
          special_reference: `${o.id}-${Date.now()}`, notification_url: `${URL_}/functions/v1/payments?paymob=1`, redirection_url: `${SITE}/#/pay-result/${o.id}` }) });
      const j = await r.json(); if (!r.ok || !j.client_secret) return J({ error: "paymob_create", detail: j?.detail || j?.message }, 400);
      return J({ url: `https://accept.paymob.com/unifiedcheckout/?publicKey=${encodeURIComponent(pay.paymobPublicKey)}&clientSecret=${encodeURIComponent(j.client_secret)}` });
    }
    return J({ error: "action" }, 400);
  } catch (e) { return J({ error: String((e as Error).message || e) }, 500); }
});
