// Itqan — one AI entry point for the owner: Gemini first (owner's key), Pollinations when Gemini is missing or out of quota.
import { createClient } from "jsr:@supabase/supabase-js@2";
const CORS = { "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type", "Access-Control-Allow-Methods": "POST, OPTIONS" };
const J = (o: unknown, s = 200) => new Response(JSON.stringify(o), { status: s, headers: { ...CORS, "Content-Type": "application/json" } });
const quota = (s: number, t: string) => s === 429 || s === 403 || /quota|exhaust|rate|billing|RESOURCE_EXHAUSTED/i.test(t);

async function geminiText(key: string, model: string, prompt: string, system?: string) {
  const r = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${encodeURIComponent(key)}`, {
    method: "POST", headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ contents: [{ role: "user", parts: [{ text: prompt }] }], ...(system ? { systemInstruction: { parts: [{ text: system }] } } : {}) }) });
  const t = await r.text(); if (!r.ok) throw { status: r.status, msg: t.slice(0, 300) };
  const j = JSON.parse(t); return (j.candidates?.[0]?.content?.parts || []).map((p: any) => p.text || "").join("");
}
async function geminiImage(key: string, model: string, prompt: string): Promise<Uint8Array> {
  const r = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${encodeURIComponent(key)}`, {
    method: "POST", headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }], generationConfig: { responseModalities: ["IMAGE"] } }) });
  const t = await r.text(); if (!r.ok) throw { status: r.status, msg: t.slice(0, 300) };
  const j = JSON.parse(t); const part = (j.candidates?.[0]?.content?.parts || []).find((p: any) => p.inlineData?.data);
  if (!part) throw { status: 500, msg: "no image" };
  return Uint8Array.from(atob(part.inlineData.data), c => c.charCodeAt(0));
}
async function pollText(prompt: string, system?: string) {
  const r = await fetch("https://text.pollinations.ai/openai", { method: "POST", headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ model: "openai", messages: [...(system ? [{ role: "system", content: system }] : []), { role: "user", content: prompt }] }) });
  const t = await r.text(); if (!r.ok) throw { status: r.status, msg: t.slice(0, 300) };
  try { const j = JSON.parse(t); return j.choices?.[0]?.message?.content || t; } catch { return t; }
}
async function pollImage(prompt: string, w = 1280, h = 720, seed = Math.floor(Math.random() * 1e6)): Promise<Uint8Array> {
  const r = await fetch(`https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}?width=${w}&height=${h}&nologo=true&model=flux&seed=${seed}`);
  const ct = r.headers.get("content-type") || ""; if (!r.ok || !ct.startsWith("image/")) throw { status: r.status, msg: "pollinations " + r.status };
  return new Uint8Array(await r.arrayBuffer());
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: CORS });
  const url = Deno.env.get("SUPABASE_URL")!; const db = createClient(url, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!);
  /* owner only */
  const jwt = (req.headers.get("authorization") || "").replace(/^Bearer\s+/i, "");
  const { data: u } = await db.auth.getUser(jwt); const uid = u?.user?.id; if (!uid) return J({ error: "login" }, 401);
  const { data: prof } = await db.from("profiles").select("role").eq("id", uid).maybeSingle(); if (prof?.role !== "owner") return J({ error: "owner only" }, 403);
  let b: any = {}; try { b = await req.json(); } catch { /* */ }
  const { data: ps } = await db.from("private_settings").select("data").eq("id", 1).maybeSingle();
  const g = ps?.data?.gemini || {}; const key = String(g.key || "").trim();
  const order: string[] = Array.isArray(g.order) && g.order.length ? g.order : ["gemini", "pollinations"];
  const tried: any[] = [];
  if (b.task === "status") {
    let gem: any = { configured: !!key };
    if (key) { try { await geminiText(key, g.textModel || "gemini-2.5-flash", "Reply with: ok"); gem.ok = true; } catch (e: any) { gem.ok = false; gem.err = e.msg || String(e); gem.quota = quota(e.status, e.msg || ""); } }
    return J({ gemini: gem, order });
  }
  if (b.task === "text") {
    for (const p of order) {
      try {
        if (p === "gemini") { if (!key) { tried.push({ p, skip: "no key" }); continue; } return J({ provider: "gemini", text: await geminiText(key, g.textModel || "gemini-2.5-flash", String(b.prompt || ""), b.system) }); }
        if (p === "pollinations") return J({ provider: "pollinations", text: await pollText(String(b.prompt || ""), b.system) });
      } catch (e: any) { tried.push({ p, status: e.status, err: (e.msg || String(e)).slice(0, 200) }); }
    }
    return J({ error: "all providers failed", tried }, 502);
  }
  if (b.task === "image") {
    const prompt = String(b.prompt || "") + (b.style ? ", " + b.style : "");
    for (const p of order) {
      try {
        let bytes: Uint8Array;
        if (p === "gemini") { if (!key) { tried.push({ p, skip: "no key" }); continue; } bytes = await geminiImage(key, g.imageModel || "gemini-2.5-flash-image", prompt); }
        else if (p === "pollinations") bytes = await pollImage(prompt, b.w || 1280, b.h || 720);
        else continue;
        const path = `ai/${b.target ? String(b.target).replace(/[^a-z0-9]+/gi, "-") + "-" : ""}${Date.now()}.png`;
        const up = await db.storage.from("academy_public").upload(path, bytes, { contentType: "image/png", upsert: true }); if (up.error) throw { status: 500, msg: up.error.message };
        const pub = db.storage.from("academy_public").getPublicUrl(path).data.publicUrl;
        /* every image is a candidate until the owner approves it */
        const ck = `cand:${b.target || "misc"}:${Date.now()}`;
        await db.from("art_assets").insert({ key: ck, prompt, status: "review", url: pub, meta: { target: b.target || null, provider: p } });
        return J({ provider: p, url: pub, key: ck });
      } catch (e: any) { tried.push({ p, status: e.status, err: (e.msg || String(e)).slice(0, 200) }); }
    }
    return J({ error: "all providers failed", tried }, 502);
  }
  return J({ error: "unknown task" }, 400);
});
