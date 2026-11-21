/* ================= v296: (1) حارس الأسئلة — قبل عرض أي سؤال اختيارات: الإجابة الصحيحة لازم تكون موجودة مرة واحدة بس، ومفيش اختيارين بنفس النص، ولو السؤال مايتحققش مايتعرضش · (2) صفحة «اشترك» الجديدة (/Subscribe): أربع خطط مستقلة (كل المحتوى · المقامات · اللغة العربية · التجويد) بمقارنة واضحة، كل خطة مربوطة بقسمها وسعرها من الإعدادات، والشراء والسعر بيتحسبوا على الخادم (create_site_order / create_purchase196) · المالك: يربط كل خطة بقسم، يعدّل السعر، يوقف/يشغّل الخطة — من غير كود · (3) عرض «جرّب 7 أيام» بيظهر بعد الساعة المجانية، بشروط واضحة، ومابيفتحش أي محتوى من المتصفح أبدًا: لازم بوابة دفع + تحقق من الخادم (لسه مش متفعّل — التصميم في docs/audit/TRIAL7-SERVER-DESIGN.md) ================= */
(function () {
  const FF = k => { try { return window.ff254(k); } catch (e) { return true; } };
  const AR = () => { try { return state.lang === "ar"; } catch (e) { return true; } }; const T = (a, e) => AR() ? a : e;
  const css = s => document.head.insertAdjacentHTML("beforeend", `<style>${s}</style>`);
  const E = s => String(s == null ? "" : s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const own = () => { try { return realRole() === "owner" && !state.preview; } catch (e) { return false; } };

  /* ================= 1) حارس الأسئلة ================= */
  // مقارنة محافظة: بنشيل المسافات الزيادة ونوحّد شكل الحروف (NFC) بس — التشكيل بيفضل، لأن أسئلة الإعراب بتفرق بالتشكيل
  const key = s => String(s == null ? "" : s).normalize("NFC").replace(/\s+/g, " ").trim().replace(/[A-Za-z]+/g, w => w.toLowerCase());
  const QG = window.qg296 = { checked: 0, fixed: 0, dropped: 0, log: [] };
  function guardQ(qq) {
    if (!qq || qq._g296 || !Array.isArray(qq.opts)) return qq;
    qq._g296 = 1; QG.checked++;
    const seen = new Set(), out = []; let hasAns = false; const ak = key(qq.ans);
    for (const o of qq.opts) { const k = key(o); if (!k || seen.has(k)) continue; seen.add(k); if (k === ak) { if (hasAns) continue; hasAns = true; out.push(qq.ans); } else out.push(o); }
    if (!hasAns || out.length < 2) { qq._bad296 = 1; QG.dropped++; if (QG.log.length < 50) QG.log.push({ q: String(qq.q || "").slice(0, 80), why: !hasAns ? "no-answer" : "one-option" }); return qq; }
    if (out.length !== qq.opts.length) { QG.fixed++; if (QG.log.length < 50) QG.log.push({ q: String(qq.q || "").slice(0, 80), why: "duplicate-options" }); }
    qq.opts = out; return qq;
  }
  window.qg296.guard = guardQ;
  if (typeof quizView === "function") {
    const _qv = quizView;
    quizView = function () {
      try {
        const z = state.qz;
        if (z && Array.isArray(z.qs) && FF("v296.qguard")) {
          // نتخطى أي سؤال مش سليم، ونشيله من العدد عشان النتيجة تبقى صح
          let n = 0; while (z.qs[z.i] && guardQ(z.qs[z.i])._bad296 && n++ < 200) z.qs.splice(z.i, 1);
        }
      } catch (e) { console.warn("v296 qguard", e); }
      return _qv.apply(this, arguments);
    };
  }

  /* ================= 2) صفحة «اشترك» — أربع خطط ================= */
  const PLANS = [
    { k: "all", ic: "🌟", t: ["المحتوى الكامل", "Full content"], d: ["كل الأقسام والأدوات المدفوعة في اشتراك واحد.", "Every paid section and tool in one subscription."] },
    { k: "maqamat", ic: "🎼", t: ["المقامات", "Maqamat"], d: ["قسم المقامات بكل دروسه وأدواته فقط.", "The Maqamat section only, with all its lessons and tools."], re: /مقام|maqam/i },
    { k: "arabic", ic: "🗣️", t: ["اللغة العربية", "Arabic language"], d: ["قسم اللغة العربية بكل مناهجه فقط.", "The Arabic language section only, with all its curricula."], re: /عرب|arabic/i },
    { k: "tajweed", ic: "📖", t: ["التجويد", "Tajweed"], d: ["قسم التجويد بكل دروسه واختباراته فقط.", "The Tajweed section only, with all its lessons and tests."], re: /تجويد|tajw/i }
  ];
  const cfg = () => Object.assign({ map: {}, off: {}, trial: { on: false } }, setv("plans296", {}) || {});
  const secs = () => { let s; try { s = sectionsData(); } catch (e) { s = null; } return Array.isArray(s) ? s.filter(x => !x.parent_id) : null; };
  const secPrice = s => { const c = Object.assign({ price: {} }, setv("secsub196", {}) || {}); return +(c.price[s.id] != null ? c.price[s.id] : s.price || 0); };
  function secFor(p, list) {
    if (p.k === "all" || !list) return null; const m = cfg().map[p.k];
    if (m) return list.find(s => s.id === m) || null;
    return list.find(s => p.re.test(JSON.stringify(s.title || {})) || p.re.test(String(s.slug || s.key || ""))) || null; // تخمين أولي لحد ما المالك يربط
  }
  const cur = () => setv("currency", "USD");
  const days = () => +(((state.settings || {}).sectionAccess || {}).days || 30);
  const fmt = (a, c) => { try { return money(a, c); } catch (e) { return a + " " + c; } };

  function planCard(p, list) {
    const c = cfg(), off = !!c.off[p.k]; if (off && !own()) return "";
    const ttl = AR() ? p.t[0] : p.t[1], desc = AR() ? p.d[0] : p.d[1];
    let price = "", buy = "", note = "";
    if (p.k === "all") {
      const sp = (setv("sitePlans", []) || []).filter(x => x && x.id);
      const aa = ((state.settings || {}).allAccess || {}).price;
      price = sp.length ? sp.map(x => `<button class="btn ${x.id === "site_y" ? "btn-p" : "btn-o"} pl296b" onclick="pl296.site('${E(x.id)}')"><b>${E(x[state.lang] || x.ar || x.en || x.id)}</b> · ${E(fmt(x.price, cur()))}</button>`).join("") : (aa ? `<div class="pl296p">${E(fmt(aa, cur()))}</div>` : `<div class="muted sm">${T("السعر لسه ماتحددش", "Price not set yet")}</div>`);
    } else {
      const s = secFor(p, list);
      if (!list) price = `<div class="muted sm">…</div>`;
      else if (!s) { price = `<div class="muted sm">${T("القسم لسه مش مربوط بالخطة", "Section not linked yet")}</div>`; }
      else { const pr = secPrice(s); price = pr > 0 ? `<div class="pl296p">${E(fmt(pr, cur()))} <small>/ ${days()} ${T("يوم", "days")}</small></div>` : `<div class="muted sm">${T("القسم ده مش معروض للبيع لوحده", "This section isn't sold on its own")}</div>`; if (pr > 0 && !off) buy = `<button class="btn btn-p" onclick="pl296.sec('${E(s.id)}')">🔓 ${T("اشترك في", "Subscribe to")} ${E(ttl)}</button>`; if (pr > 0) note = `<small class="xs muted">${T("يفتح القسم ده بس — مابيفتحش باقي الأقسام.", "Opens this section only — not the others.")}</small>`; }
    }
    const ownBox = own() ? `<div class="pl296own">${p.k === "all" ? `<small class="xs">${T("أسعار «كل المحتوى» من «الأسعار» في لوحة التحكم.", "Full-content prices are edited in Control panel → Prices.")}</small>` : ownerMap(p, list)}<label class="xs"><input type="checkbox" ${off ? "checked" : ""} onchange="pl296.off('${p.k}',this.checked)"> ${T("إيقاف الخطة مؤقتًا", "Pause this plan")}</label></div>` : "";
    return `<div class="card pl296c ${off ? "off" : ""}"><div class="pl296h"><span>${p.ic}</span><b>${E(ttl)}</b>${off ? `<span class="badge">${T("موقوفة", "Paused")}</span>` : ""}</div><p class="sm muted">${E(desc)}</p>${price}${buy}${note}${ownBox}</div>`;
  }
  function ownerMap(p, list) {
    if (!list) return ""; const s = secFor(p, list); const pr = s ? secPrice(s) : 0;
    return `<label class="xs">${T("القسم", "Section")}: <select class="in" style="width:auto" onchange="pl296.map('${p.k}',this.value)"><option value="">—</option>${list.map(x => `<option value="${E(x.id)}" ${s && s.id === x.id ? "selected" : ""}>${E(secTitle(x))}</option>`).join("")}</select></label>${s ? `<label class="xs">💲 ${T("السعر", "Price")} <input class="in" type="number" min="0" step="0.5" style="width:6rem" value="${pr}" onchange="pl296.price('${E(s.id)}',this.value)"> ${E(cur())}</label>` : ""}`;
  }
  function compare() {
    const rows = [[T("كل الأقسام", "All sections"), "✅", "—", "—", "—"], [T("المقامات", "Maqamat"), "✅", "✅", "—", "—"], [T("اللغة العربية", "Arabic"), "✅", "—", "✅", "—"], [T("التجويد", "Tajweed"), "✅", "—", "—", "✅"], [T("الأدوات العامة المجانية", "Free tools"), "✅", "✅", "✅", "✅"]];
    return `<div class="card" style="overflow-x:auto"><h3 style="margin-top:0">${T("مقارنة سريعة", "Quick comparison")}</h3><div class="pl296t" style="--n:${PLANS.length}"><div></div>${PLANS.map(p => `<b>${p.ic}<span>${E(AR() ? p.t[0] : p.t[1])}</span></b>`).join("")}${rows.map(r => `<i>${E(r[0])}</i>${r.slice(1).map(x => `<em>${x}</em>`).join("")}`).join("")}</div><p class="xs muted" style="margin:.5rem 0 0">${T("الاشتراك المنفصل بيخليك تدفع للقسم اللي محتاجه بس. ولو اخترت قسمين أو أكتر من «اشترك في قسم أو اتنين» بتاخد خصم.", "A single-section plan means you only pay for what you need. Two or more sections get a discount.")}</p></div>`;
  }

  /* ================= 3) عرض «جرّب 7 أيام» ================= */
  function trialCard() {
    const c = cfg(), tr = c.trial || {};
    if (!FF("v296.trial")) return "";
    if (!tr.on && !own()) return "";
    if (!own()) { // للطالب: بيظهر بعد ما الساعة المجانية تتستخدم وتخلص بس
      if (!state.auth || !state.auth.user) return "";
      let fp = null; try { fp = typeof fpS === "function" ? fpS() : null; } catch (e) {}
      if (!fp) return "";
      const used = !!(fp.hour_used || fp.hour_ends), act = (() => { try { return typeof fpActive === "function" && fpActive(); } catch (e) { return false; } })();
      if (!used || act) return "";
    }
    const ready = !!tr.on && !!tr.server; // الخادم لازم يكون جاهز (بوابة دفع + webhook)
    const start = new Date(), end = new Date(Date.now() + 7 * 864e5);
    const d = x => x.toLocaleDateString(AR() ? "ar-EG" : "en-GB", { day: "numeric", month: "long", year: "numeric" });
    return `<div class="card pl296tr"><div class="pl296h"><span>🎁</span><b>${T("جرّب كل المحتوى 7 أيام", "Try all content for 7 days")}</b>${!ready ? `<span class="badge">${T("قريبًا", "Coming soon")}</span>` : ""}</div>
      <ul class="sm"><li>${T("كل الأقسام مفتوحة 7 أيام كاملة.", "Every section is open for 7 full days.")}</li><li>${T("الساعة المجانية الشهرية زي ما هي — العرض ده إضافي.", "The monthly free hour stays — this is extra.")}</li><li>${T("محتاج بطاقة دفع صالحة من خلال بوابة دفع آمنة. الأكاديمية مابتحفظش بيانات البطاقة.", "A valid card is required through a secure payment gateway. The academy never stores card details.")}</li><li>${T("ممكن يتعمل حجز مؤقت بمبلغ صغير للتحقق من البطاقة، وبيتلغي حسب مزوّد الدفع — وهيتوضّح قبل ما تأكد.", "A small temporary hold may be placed to verify the card and released per the provider — shown before you confirm.")}</li><li>${T("مفيش أي خصم للاشتراك قبل نهاية التجربة إلا بموافقتك الصريحة.", "No subscription charge before the trial ends without your explicit consent.")}</li></ul>
      <p class="xs muted">${T("لو بدأت النهارده", "If you start today")}: ${d(start)} → ${d(end)}. ${T("بعد النهاية المحتوى بيتقفل تاني لحد ما تشترك.", "After that, content locks again until you subscribe.")}</p>
      ${ready ? `<label class="xs"><input type="checkbox" id="tr296ok"> ${T("قرأت الشروط وموافق", "I have read and agree to the terms")}</label><button class="btn btn-p" style="margin-top:.4rem" onclick="pl296.trial()">✨ ${T("ابدأ تجربتك المجانية", "Start your free trial")}</button>` : `<p class="xs muted">${T("العرض هيتفعّل أول ما بوابة الدفع تتربط.", "The offer will open once the payment gateway is connected.")}</p>`}
      ${own() ? `<div class="pl296own"><label class="xs"><input type="checkbox" ${tr.on ? "checked" : ""} onchange="pl296.trialOn(this.checked)"> ${T("إظهار العرض للطلاب", "Show the offer to students")}</label><small class="xs muted">${T("زرار البدء مش هيشتغل غير لما دالة الخادم trial7 تتنشر وتتربط ببوابة الدفع (Paymob/PayPal) — التفاصيل في docs/audit/TRIAL7-SERVER-DESIGN.md. المتصفح عمره ما بيفتح المحتوى لوحده.", "The start button only works once the trial7 server function is deployed and linked to the gateway. The browser never unlocks content by itself.")}</small></div>` : ""}</div>`;
  }

  function page() {
    const list = secs();
    return `<div class="pl296">${trialCard()}<div class="pl296g">${PLANS.map(p => planCard(p, list)).join("")}</div>${compare()}
      <div class="card sm" style="text-align:center">🧩 ${T("عايز قسم تاني أو أكتر من قسم؟", "Want another section or several?")} <a href="#" onclick="go16('sub196');return false;">${T("اشترك في قسم أو اتنين", "Subscribe to one or two sections")}</a></div></div>`;
  }

  window.pl296 = {
    async site(id) { if (!state.auth.user) return navigate("signup"); if (typeof buySite === "function") return buySite(id); },
    async sec(id) { if (!state.auth.user) return navigate("signup"); const { data, error } = await sb.rpc("create_purchase196", { p_ids: [id] }); if (error) return toast(error.message, true); invalidate("myOrders"); state.payKind = "order"; state.payOrderId = data; navigate("pay"); },
    async map(k, id) { if (!own()) return; const c = cfg(); c.map = Object.assign({}, c.map, { [k]: id || null }); await saveSetting16("plans296", c); },
    async off(k, v) { if (!own()) return; const c = cfg(); c.off = Object.assign({}, c.off, { [k]: !!v }); await saveSetting16("plans296", c); },
    async price(id, v) { if (!own()) return; if (window.sub197 && sub197.price) return sub197.price(id, v); },
    async trialOn(v) { if (!own()) return; const c = cfg(); c.trial = Object.assign({}, c.trial, { on: !!v }); await saveSetting16("plans296", c); },
    async trial() {
      if (!state.auth.user) return navigate("signup");
      const ok = document.getElementById("tr296ok"); if (!ok || !ok.checked) return toast(T("لازم توافق على الشروط الأول", "Please accept the terms first"), true);
      // الخادم بس هو اللي بيبدأ التجربة بعد تحقق بوابة الدفع (webhook). المتصفح بياخد لينك الدفع بس.
      try { const { data, error } = await sb.functions.invoke("trial7", { body: { action: "start" } }); if (error || !data || !data.url) throw error || new Error("not_ready"); location.href = data.url; }
      catch (e) { toast(T("التجربة لسه مش متاحة — جرّب بعدين", "The trial isn't available yet — please try later"), true); }
    }
  };

  css(`.pl296g{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:.8rem;margin-bottom:1rem}.pl296c{display:flex;flex-direction:column;gap:.45rem}.pl296c.off{opacity:.6}.pl296h{display:flex;gap:.45rem;align-items:center;font-size:1.1rem}.pl296h span:first-child{font-size:1.5rem}.pl296p{font-size:1.35rem;font-weight:800;color:var(--accent)}.pl296p small{font-size:.8rem;font-weight:400;color:var(--muted,#64748b)}.pl296b{display:block;width:100%;margin:.15rem 0;text-align:start}.pl296own{display:flex;flex-direction:column;gap:.3rem;border-top:1px dashed var(--line);padding-top:.45rem;margin-top:.2rem}.pl296t{display:grid;grid-template-columns:minmax(6rem,1.4fr) repeat(var(--n),1fr);font-size:.92rem}.pl296t>*{border-bottom:1px solid var(--line);padding:.45rem .3rem;text-align:center;font-style:normal}.pl296t>b{display:flex;flex-direction:column;align-items:center;gap:.1rem;font-size:.85rem}.pl296t>i{text-align:start;font-weight:600}.pl296tr{border:2px solid #f59e0b;margin-bottom:1rem}.pl296tr ul{margin:.3rem 0;padding-inline-start:1.2rem;line-height:1.9}
  @media (max-width:640px){.pl296g{grid-template-columns:1fr}.pl296t{font-size:.78rem}.pl296t>b span{font-size:.7rem}}`);

  /* التسجيل كصفحة بلينك مقروء: /Subscribe */
  try { if (typeof PAGES16 !== "undefined" && Array.isArray(PAGES16) && !PAGES16.includes("subscribe")) PAGES16.push("subscribe"); } catch (e) {}
  const _r = render;
  render = function () {
    if (state.route === "subscribe" && FF("v296.plans")) {
      const app = document.getElementById("app");
      if (app) { let b; try { b = page(); } catch (e) { console.error(e); b = `<div class="err">${E(e.message)}</div>`; } app.innerHTML = renderHeader() + pageWrap("💳", T("اشترك", "Subscribe"), T("اختار المحتوى الكامل أو قسم واحد بس — كل خطة مستقلة.", "Choose full content or a single section — every plan is independent."), b, 1100) + renderFooter(); }
      return;
    }
    const o = _r.apply(this, arguments);
    // رابط واضح للصفحة الجديدة جوه صفحة الأسعار (مرة واحدة)
    try { if (state.route === "pricing" && FF("v296.plans") && !document.getElementById("pl296link")) { const a = document.querySelector("#app .sec .wrap"); a && a.insertAdjacentHTML("afterbegin", `<div class="card" id="pl296link" style="text-align:center;border:2px solid var(--accent)">💳 <b>${T("خطط الاشتراك: كل المحتوى · المقامات · العربي · التجويد", "Plans: Full · Maqamat · Arabic · Tajweed")}</b> <button class="btn btn-p" style="margin-inline-start:.5rem" onclick="go16('subscribe')">${T("قارن واشترك", "Compare & subscribe")}</button></div>`); } } catch (e) {}
    return o;
  };
})();
