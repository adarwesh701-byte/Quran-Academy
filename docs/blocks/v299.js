/* ================= v299: الشريط العلوي يعود صفًا أفقيًا (الاسم بجانب الأيقونة) مع لوحة تحكم 🎚️: طريقة العرض (أسطر/صف قابل للتمرير/شبكة/عمودي) · التوزيع · شكل الزر والحواف · الاسم والأيقونة (بجانب/فوق/أيقونات فقط/أسماء فقط) · حجم الكل والأيقونة والمسافات · الترتيب (الأصلي/أبجدي/مخصص ▲▼) · إخفاء وحجم لكل عنصر · إعدادات منفصلة للكمبيوتر والموبايل · لي فقط أو لكل الزوار (للمالك) ================= */
(function () {
  if (window.__v299) return; window.__v299 = 1;
  const D = document;
  const AR = () => { try { return state.lang === "ar"; } catch (e) { return D.documentElement.lang === "ar"; } };
  const T = (a, e) => AR() ? a : e;
  const LS = (k, d) => { try { const v = JSON.parse(localStorage.getItem(k) || "null"); return v == null ? d : v; } catch (e) { return d; } };
  const LSset = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} };
  const owner = () => { try { return _role25() === "owner"; } catch (e) { try { return role() === "owner"; } catch (e2) { return false; } } };
  const E = s => String(s == null ? "" : s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const FF = k => { try { return typeof window.ff254 === "function" ? window.ff254(k) : true; } catch (e) { return true; } };
  const NAV = "header.hdr nav.nav";
  const isMob = () => innerWidth <= 700;

  /* ---------- الإعدادات ---------- */
  const DEF = { layout: "wrap", align: "center", label: "side", style: "soft", radius: "pill", scale: 100, iscale: 110, gap: 6, px: 85, py: 40, colw: 110, showSearch: false, showNew: false, groups: false, sort: "default", order: [], hidden: [], sizes: {} };
  const DEFM = { scale: 85, iscale: 110, gap: 4, px: 70, py: 35 };
  const G = () => { try { return setv("nav299", {}) || {}; } catch (e) { return {}; } };
  const cfgFor = dev => { const g = G(), u = LS("nav299u", {}); const m = dev === "m"; return Object.assign({}, DEF, m ? DEFM : {}, g.d || {}, m ? (g.m || {}) : {}, u.d || {}, m ? (u.m || {}) : {}); };
  const cfg = () => cfgFor(isMob() ? "m" : "d");

  /* ---------- CSS ---------- */
  const A = "html body.n299.n299 #app header.hdr nav.nav";
  const B = x => "html body" + x + ".n299 #app header.hdr nav.nav";
  const st = D.createElement("style"); st.id = "css299";
  st.textContent = `
${A}{display:flex!important;flex-direction:row!important;flex-wrap:var(--n-wrap,wrap)!important;align-items:center!important;justify-content:var(--n-just,center)!important;gap:var(--n-gap,6px)!important;width:auto!important;max-width:100%!important;min-width:0!important;max-height:none!important;height:auto!important;overflow:visible!important;padding:.3rem .2rem!important;border:0!important;background:transparent!important;box-shadow:none!important;border-radius:0!important;font-size:calc(.92rem * var(--n-s,1))}
${B("[data-nl299=scroll]")}{overflow-x:auto!important;overflow-y:hidden!important;scrollbar-width:thin;-webkit-overflow-scrolling:touch;justify-content:flex-start!important}
${B("[data-nl299=grid]")}{display:grid!important;grid-template-columns:repeat(auto-fit,minmax(var(--n-colw,110px),1fr));align-items:stretch!important}
${B("[data-nl299=grid]")}>.x201{grid-column:1/-1}
${A}>.x201{order:-1000;display:flex;gap:.25rem;padding:0;justify-content:flex-start;font-size:.85rem}
${A} .sp203{display:contents!important}
${A} .sp203 .hd203{display:contents!important}
${B(".n299:not(.ns299)")} .hd203 input{display:none!important}
${A} .hd203 input{order:-900;width:9rem;max-width:40vw}
${A} .hd203 .mini203:first-of-type{display:none!important}
${A} .hd203 .mini203{order:-890}
${A} .sp203 details.g203[open]{display:contents!important}
${A} .sp203 details.g203[open]>summary{display:none!important}
${A} .sp203 details.g203[open]::details-content{display:contents!important}
${B(".ng299")} .sp203 details.g203[open]::details-content{display:flex!important;flex-wrap:wrap;gap:var(--n-gap,6px);align-items:center;justify-content:var(--n-just,center)}
${A} .sp203 details.g203:not([open]){display:inline-block;order:900}
${A} .sp203 details.g203:not([open])>summary{list-style:none;cursor:pointer;padding:.3em .8em;border:1px dashed var(--line);border-radius:999px;font-size:.8em;color:var(--muted)}
${A} .sp203 details.g203:not([open])>summary::-webkit-details-marker{display:none}
${B(".ng299")} .sp203 details.g203[open]{display:flex!important;flex-wrap:wrap;gap:var(--n-gap,6px);align-items:center;border:1px dashed var(--line);border-radius:14px;padding:.25rem .45rem}
${B(".ng299")} .sp203 details.g203[open]>summary{display:block!important;list-style:none;font-size:.78em;color:var(--muted);padding:0 .3em}
${B(".ng299")} .sp203 details.g203[open]>summary::-webkit-details-marker{display:none}
/* العنصر */
${A} .it203:empty{display:none!important}
${A} .it203{position:relative;display:block;margin:0;padding:0;min-width:0;order:var(--o,500);font-size:calc(1em * var(--is,1))}
${A}>a{order:var(--o,500);font-size:calc(1em * var(--is,1))}
${A} .it203>a,${A} .it203>button,${A}>a{display:inline-flex!important;align-items:center;justify-content:center;gap:.4em;white-space:nowrap;width:auto!important;min-height:0!important;margin:0;padding:calc(var(--n-py,.4) * 1em) calc(var(--n-px,.85) * 1em)!important;font-size:1em!important;font-weight:600;line-height:1.25;border-radius:var(--n-r,999px)!important;text-decoration:none;color:var(--fg)!important;background:var(--n-bg)!important;border:var(--n-bd)!important;box-shadow:none!important;transform:none!important;transition:background .15s,border-color .15s!important}
${A} .it203>a:hover,${A} .it203>button:hover,${A}>a:hover{background:color-mix(in srgb,var(--accent) 16%,var(--bg))!important;border-color:color-mix(in srgb,var(--accent) 40%,transparent)!important}
${A} .it203>a[aria-current=page],${A}>a[aria-current=page]{background:color-mix(in srgb,var(--accent) 18%,var(--bg))!important;color:var(--accent)!important;font-weight:800}
${A} .it203>a.gold,${A}>a.gold{border:1.5px solid #f59e0b!important;color:#b45309!important}
${A} .it203>button::before,${A} .it203>button::after,${A}>a::before,${A}>a::after{content:none!important;display:none!important}
${A} .i264,${A} .i299{font-size:calc(1.1em * var(--n-i,1))!important;line-height:1}
${B("[data-nlb299=stack]")} .it203>a,${B("[data-nlb299=stack]")} .it203>button,${B("[data-nlb299=stack]")}>a{flex-direction:column;gap:.15em;text-align:center}
${B("[data-nlb299=stack]")} .i264{font-size:calc(1.5em * var(--n-i,1))!important}
${B("[data-nlb299=icon]")} .t264{display:none!important}
${B("[data-nlb299=text]")} .i264{display:none!important}
${B("[data-nl299=grid]")} .it203{display:flex;min-width:0}${B("[data-nl299=grid]")} .t264{white-space:normal;overflow-wrap:anywhere;line-height:1.2}${B("[data-nl299=grid]")} .it203>a,${B("[data-nl299=grid]")} .it203>button,${B("[data-nl299=grid]")}>a{white-space:normal!important}${B("[data-nl299=grid]")} .it203>a,${B("[data-nl299=grid]")} .it203>button,${B("[data-nl299=grid]")}>a{width:100%!important}
body[data-ns299=soft]{--n-bg:color-mix(in srgb,var(--accent) 7%,var(--bg));--n-bd:1px solid transparent}
body[data-ns299=outline]{--n-bg:transparent;--n-bd:1.5px solid var(--line)}
body[data-ns299=solid]{--n-bg:color-mix(in srgb,var(--accent) 14%,var(--card));--n-bd:1.5px solid color-mix(in srgb,var(--accent) 45%,transparent)}
body[data-ns299=flat]{--n-bg:transparent;--n-bd:1px solid transparent}
body.n299:not(.nb299) ${A} .nw203{display:none!important}
${B(".nb299")} .nw203{position:absolute;top:-.45em;inset-inline-end:-.2em;font-size:.55em;padding:0 .4em;border-radius:999px;background:var(--danger,#dc2626);color:#fff;font-style:normal}
${A} .ed203{position:absolute;top:-.7em;inset-inline-start:0;display:flex;gap:.1em;font-size:.8em}
${A} [data-h299="1"]{display:none!important}
/* الزرار الصغير + اللوحة */
.n299b{order:-950;display:inline-flex;align-items:center;justify-content:center;border:1px dashed var(--line);background:var(--bg);border-radius:999px;cursor:pointer;padding:.25rem .55rem;font-size:1rem;line-height:1;-webkit-user-select:none;user-select:none}.n299b:hover{background:color-mix(in srgb,var(--accent) 16%,var(--bg))}
#pnl299{position:fixed;top:4.2rem;inset-inline-start:.8rem;width:min(94vw,390px);max-height:calc(100vh - 5rem);overflow:auto;z-index:3500;background:var(--card);color:var(--fg);border:1px solid var(--line);border-radius:18px;box-shadow:0 24px 60px rgba(0,0,0,.35);padding:.8rem;font-size:.88rem;direction:rtl}
html[lang=en] #pnl299{direction:ltr}
#pnl299 h3{margin:0 0 .5rem;font-size:1rem;display:flex;align-items:center;gap:.4rem}
#pnl299 h3 button{margin-inline-start:auto}
#pnl299 .r{display:flex;align-items:center;gap:.5rem;margin:.4rem 0;flex-wrap:wrap}
#pnl299 .r>label{min-width:6.2rem;font-weight:700;font-size:.82rem}
#pnl299 .seg{display:flex;flex-wrap:wrap;gap:.25rem;flex:1}
#pnl299 .seg button,#pnl299 .b{border:1px solid var(--line);background:var(--bg);color:var(--fg);border-radius:999px;padding:.25rem .65rem;cursor:pointer;font:inherit;font-size:.8rem}
#pnl299 .seg button.on,#pnl299 .b.on{background:var(--accent);color:#fff;border-color:var(--accent)}
#pnl299 input[type=range]{flex:1;min-width:6rem}
#pnl299 .v{min-width:3rem;text-align:center;font-variant-numeric:tabular-nums;opacity:.8;font-size:.8rem}
#pnl299 hr{border:0;border-top:1px solid var(--line);margin:.6rem 0}
#pnl299 .li{display:flex;align-items:center;gap:.35rem;padding:.2rem 0;border-bottom:1px dashed var(--line)}
#pnl299 .li .nm{flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
#pnl299 .li .b{padding:.1rem .45rem}
#pnl299 .li input[type=range]{flex:0 0 5.5rem;min-width:0}
#pnl299 .li.off .nm{opacity:.45;text-decoration:line-through}
#pnl299 .note{font-size:.75rem;opacity:.7;margin:.3rem 0}
`;
  D.head.appendChild(st);

  /* ---------- أيقونات احتياطية للي ملهاش أيقونة ---------- */
  const ICO = [[/navigate\('about'\)/, "ℹ️"], [/navigate\('tracks'\)/, "🎓"], [/navigate\('pricing'\)/, "💳"], [/navigate\('login'\)/, "🔑"], [/navigate\('signup'\)/, "✨"], [/navigate\('home'\)/, "🏠"], [/contact|تواصل/, "📞"], [/go16\('invite'\)/, "🎁"], [/go16\('guide'\)/, "🗺️"], [/go16\('myspace'\)/, "🏠"], [/alltools/, "🧰"], [/dashboard/, "📊"]];
  const lead = /^[\s‍️\p{Extended_Pictographic}\p{Emoji_Presentation}]+/u;
  function ensureIcon(el) {
    if (el.querySelector(".i264,.i299") || el.querySelector("i,svg,img,input")) return;
    if (el.children.length) return; const txt = (el.textContent || "").trim(); if (!txt) return;
    const key = (el.getAttribute("onclick") || "") + " " + txt; let ic = "", rest = txt; const m = txt.match(lead);
    if (m) { ic = m[0].trim(); rest = txt.slice(m[0].length).trim(); } else { const f = ICO.find(x => x[0].test(key)); ic = f ? f[1] : "🔹"; }
    el.textContent = ""; const a = D.createElement("span"); a.className = "i264 i299"; a.textContent = ic; el.append(a); if (rest) { const b = D.createElement("span"); b.className = "t264"; b.textContent = rest; el.append(b); }
  }

  /* ---------- جمع العناصر ---------- */
  const keyOf = el => { const a = el.matches("a,button") ? el : el.querySelector("a,button"); if (!a) return null; return ((a.getAttribute("onclick") || "").replace(/;?\s*return false;?\s*$/, "").trim()) || (a.textContent || "").trim().slice(0, 40); };
  const clickable = el => el.matches("a,button") ? el : el.querySelector("a,button");
  const labelOf = el => { const a = clickable(el); if (!a) return ""; const t = a.querySelector(".t264"); let s = ((t ? t.textContent : a.textContent) || "").replace(/\s+/g, " ").trim(); if (!s || !/[\p{L}]/u.test(s)) s = a.getAttribute("title") || s; return s; };
  const iconOf = el => { const a = clickable(el); const i = a && a.querySelector(".i264"); return i ? i.textContent.trim() : "•"; };
  function collect() {
    const nav = D.querySelector(NAV); if (!nav) return [];
    const out = []; const seen = new Set();
    [...nav.querySelectorAll(":scope > a, .it203")].forEach(el => { if (el.closest(".x201")) return; const k = keyOf(el); if (!k || seen.has(k)) return; seen.add(k); out.push({ el, key: k }); });
    return out;
  }
  const put = (el, p, v) => { if (el.style.getPropertyValue(p) !== v) el.style.setProperty(p, v); };
  const unput = (el, p) => { if (el.style.getPropertyValue(p)) el.style.removeProperty(p); };
  function sorted(list, c) {
    const L = list.map((x, i) => Object.assign({ i }, x, { label: labelOf(x.el) }));
    if (c.sort === "az") return L.sort((a, b) => a.label.localeCompare(b.label, AR() ? "ar" : "en"));
    if (c.sort === "custom") { const o = c.order || []; return L.sort((a, b) => { const ia = o.indexOf(a.key), ib = o.indexOf(b.key); return (ia < 0 ? 1e4 + a.i : ia) - (ib < 0 ? 1e4 + b.i : ib); }); }
    return L;
  }

  /* ---------- التطبيق (idempotent: ما بيكتبش غير لو اتغيّر) ---------- */
  let last = [];
  function apply() {
    const b = D.body; if (!b) return; const c = cfg();
    const on = FF("v299.bar") && c.layout !== "column";
    b.classList.toggle("n299", on);
    const nav = D.querySelector(NAV); if (!on || !nav) { if (nav) nav.querySelectorAll("[data-h299]").forEach(e => e.removeAttribute("data-h299")); return; }
    const sd = (k, v) => { if (b.dataset[k] !== v) b.dataset[k] = v; };
    sd("nl299", c.layout); sd("nlb299", c.label); sd("ns299", c.style);
    b.classList.toggle("ns299", !!c.showSearch); b.classList.toggle("nb299", !!c.showNew); b.classList.toggle("ng299", !!c.groups);
    const V = (k, v) => { if (b.style.getPropertyValue(k) !== v) b.style.setProperty(k, v); };
    V("--n-s", String((c.scale || 100) / 100)); V("--n-i", String((c.iscale || 100) / 100)); V("--n-gap", (c.gap | 0) + "px");
    V("--n-px", String((c.px || 85) / 100)); V("--n-py", String((c.py || 40) / 100)); V("--n-colw", (c.colw | 0) + "px");
    V("--n-r", c.radius === "square" ? "4px" : c.radius === "round" ? "12px" : "999px");
    V("--n-wrap", c.layout === "scroll" ? "nowrap" : "wrap");
    V("--n-just", { start: "flex-start", center: "center", end: "flex-end", between: "space-between" }[c.align] || "center");
    const list = collect(); last = list; list.forEach(x => ensureIcon(clickable(x.el)));
    const S = sorted(list, c); const hid = new Set(c.hidden || []);
    S.forEach((x, idx) => {
      if (c.sort === "default") unput(x.el, "--o"); else put(x.el, "--o", String(idx * 10));
      const sz = (c.sizes || {})[x.key]; if (sz && sz !== 100) put(x.el, "--is", String(sz / 100)); else unput(x.el, "--is");
      if (hid.has(x.key)) { if (x.el.dataset.h299 !== "1") x.el.dataset.h299 = "1"; } else if (x.el.dataset.h299) x.el.removeAttribute("data-h299");
    });
    if (!nav.querySelector(":scope > .n299b")) { const bt = D.createElement("span"); bt.className = "n299b"; bt.setAttribute("role", "button"); bt.tabIndex = 0; bt.dataset.a299 = "open"; bt.title = T("تحكم في شكل هذا الشريط", "Customise this bar"); bt.textContent = "🎚️"; nav.appendChild(bt); }
  }

  /* ---------- مراقبة الشريط (childList فقط، من غير subtree) ---------- */
  let mo = null, tm = 0;
  const later = (ms) => { clearTimeout(tm); tm = setTimeout(() => { try { apply(); } catch (e) { console.warn("v299", e); } }, ms || 50); };
  function watch() { const nav = D.querySelector(NAV); if (mo) { mo.disconnect(); mo = null; } if (!nav) return; mo = new MutationObserver(() => later(60)); mo.observe(nav, { childList: true }); }
  const _r = render; render = function () { const o = _r.apply(this, arguments); try { later(30); setTimeout(() => { watch(); apply(); }, 400); setTimeout(() => { watch(); apply(); panelSync(); }, 1400); } catch (e) {} return o; };
  let rz = 0; addEventListener("resize", () => { clearTimeout(rz); rz = setTimeout(() => { apply(); panelSync(); }, 200); });
  D.addEventListener("DOMContentLoaded", () => { watch(); later(100); });
  setTimeout(() => { watch(); apply(); }, 800);

  /* ---------- اللوحة 🎚️ ---------- */
  const P = { open: false, scope: "me", dev: null };
  const dev = () => P.dev || (isMob() ? "m" : "d");
  function putCfg(k, v) {
    const d = dev();
    if (P.scope === "all" && owner()) {
      const g = JSON.parse(JSON.stringify(G())); g[d] = Object.assign({}, g[d] || {}, { [k]: v });
      state.settings = state.settings || {}; state.settings.nav299 = g; P.dirty = 1;
      const U = LS("nav299u", {}); if (U[d] && k in U[d]) { delete U[d][k]; LSset("nav299u", U); }
    } else { const U = LS("nav299u", {}); U[d] = Object.assign({}, U[d] || {}, { [k]: v }); LSset("nav299u", U); }
    apply();
  }
  const seg = (k, opts, cur) => `<div class="seg">${opts.map(([v, l]) => `<button class="${cur === v ? "on" : ""}" data-a299="set" data-k="${k}" data-v="${v}">${l}</button>`).join("")}</div>`;
  const rng = (k, mn, mx, st2, cur, unit) => `<input type="range" min="${mn}" max="${mx}" step="${st2}" value="${cur}" data-r299="${k}"><span class="v" id="v299-${k}">${cur}${unit || ""}</span>`;
  const tgl = (k, cur) => `<button class="b ${cur ? "on" : ""}" data-a299="tg" data-k="${k}">${cur ? T("شغّال", "On") : T("مقفول", "Off")}</button>`;
  function panelHtml() {
    const d = dev(), c = cfgFor(d), S = sorted(last, c), hid = new Set(c.hidden || []);
    const own = owner();
    return `<h3>🎚️ ${T("شكل الشريط العلوي", "Top bar look")}<button class="b" data-a299="close">✕</button></h3>
    <div class="r"><label>${T("الجهاز", "Device")}</label>${seg("__dev", [["d", "🖥️ " + T("كمبيوتر", "Desktop")], ["m", "📱 " + T("موبايل", "Phone")]], d)}</div>
    ${own ? `<div class="r"><label>${T("ينطبق على", "Applies to")}</label>${seg("__scope", [["me", T("أنا فقط", "Just me")], ["all", T("كل الزوار", "Everyone")]], P.scope)}</div>` : ""}
    ${d !== (isMob() ? "m" : "d") ? `<p class="note">⚠️ ${T("أنت تعدّل إعدادات الجهاز الآخر — لن ترى التغيير هنا.", "You're editing the other device — no preview here.")}</p>` : ""}
    <hr>
    <div class="r"><label>${T("طريقة العرض", "Layout")}</label>${seg("layout", [["wrap", T("أسطر", "Wrap")], ["scroll", T("صف واحد قابل للتمرير", "One row, scroll")], ["grid", T("شبكة", "Grid")], ["column", T("عمودي (القديم)", "Vertical (old)")]], c.layout)}</div>
    <div class="r"><label>${T("التوزيع", "Align")}</label>${seg("align", [["start", T("بداية", "Start")], ["center", T("وسط", "Center")], ["end", T("نهاية", "End")], ["between", T("توزيع", "Spread")]], c.align)}</div>
    <div class="r"><label>${T("الاسم والأيقونة", "Icon & name")}</label>${seg("label", [["side", T("أيقونة جنب الاسم", "Icon beside")], ["stack", T("أيقونة فوق الاسم", "Icon above")], ["icon", T("أيقونات فقط", "Icons only")], ["text", T("أسماء فقط", "Names only")]], c.label)}</div>
    <div class="r"><label>${T("شكل الزرار", "Button style")}</label>${seg("style", [["soft", T("هادئ", "Soft")], ["outline", T("إطار", "Outline")], ["solid", T("مظلّل", "Tinted")], ["flat", T("بدون", "Flat")]], c.style)}</div>
    <div class="r"><label>${T("الحواف", "Corners")}</label>${seg("radius", [["pill", T("كبسولة", "Pill")], ["round", T("مستدير", "Round")], ["square", T("مربع", "Square")]], c.radius)}</div>
    <hr>
    <div class="r"><label>${T("حجم الكل", "Overall size")}</label>${rng("scale", 50, 220, 5, c.scale, "%")}</div>
    <div class="r"><label>${T("حجم الأيقونة", "Icon size")}</label>${rng("iscale", 60, 260, 5, c.iscale, "%")}</div>
    <div class="r"><label>${T("المسافة بينهم", "Gap")}</label>${rng("gap", 0, 30, 1, c.gap, "px")}</div>
    <div class="r"><label>${T("حشو أفقي", "Pad X")}</label>${rng("px", 10, 200, 5, c.px, "")}</div>
    <div class="r"><label>${T("حشو رأسي", "Pad Y")}</label>${rng("py", 0, 120, 5, c.py, "")}</div>
    ${c.layout === "grid" ? `<div class="r"><label>${T("عرض الخانة", "Cell width")}</label>${rng("colw", 50, 260, 5, c.colw, "px")}</div>` : ""}
    <hr>
    <div class="r"><label>${T("الترتيب", "Order")}</label>${seg("sort", [["default", T("الأصلي", "Original")], ["az", T("أبجدي", "A–Z")], ["custom", T("مخصص (بالأسهم)", "Custom (arrows)")]], c.sort)}</div>
    <div class="r"><label>${T("مربع البحث", "Search box")}</label>${tgl("showSearch", c.showSearch)}<label style="min-width:0">${T("علامة «جديد»", "“New” tag")}</label>${tgl("showNew", c.showNew)}</div>
    <div class="r"><label>${T("عناوين المجموعات", "Group titles")}</label>${tgl("groups", c.groups)}</div>
    <div class="note">${T("لكل عنصر: ▲▼ للترتيب · 👁 للإخفاء · المنزلق لضبط حجمه (الأصل 100%)", "Per item: ▲▼ order · 👁 hide · slider for its size (100% = normal)")}</div>
    <div id="li299">${S.map(x => { const h = hid.has(x.key), sz = (c.sizes || {})[x.key] || 100; return `<div class="li ${h ? "off" : ""}" data-key="${E(x.key)}"><span>${E(iconOf(x.el))}</span><span class="nm">${E(x.label)}</span><button class="b" data-a299="up">▲</button><button class="b" data-a299="dn">▼</button><button class="b" data-a299="hide">${h ? "🙈" : "👁"}</button><input type="range" min="50" max="250" step="5" value="${sz}" data-sz299="1" title="${sz}%"></div>`; }).join("")}</div>
    <hr>
    <div class="r">${own && P.scope === "all" ? `<button class="b on" data-a299="save">💾 ${T("احفظ للجميع", "Save for everyone")}${P.dirty ? " •" : ""}</button>` : ""}<button class="b" data-a299="reset">↺ ${T("استعادة الأصل", "Reset")}</button><button class="b" data-a299="copy">⧉ ${T("انسخ إلى الجهاز الآخر", "Copy to other device")}</button></div>`;
  }
  function panelSync() { const p = D.getElementById("pnl299"); if (!p) return; const sc = p.scrollTop; p.innerHTML = panelHtml(); p.scrollTop = sc; }
  function openPanel() { let p = D.getElementById("pnl299"); if (!p) { p = D.createElement("div"); p.id = "pnl299"; D.body.appendChild(p); } P.open = true; apply(); p.innerHTML = panelHtml(); }
  function closePanel() { const p = D.getElementById("pnl299"); if (p) p.remove(); P.open = false; }
  window.nav299 = { open: openPanel, close: closePanel, cfg };

  function ordKeys(c) { return sorted(last, c).map(x => x.key); }
  const act = {
    open: openPanel, close: closePanel,
    set(t) { const k = t.dataset.k, v = t.dataset.v; if (k === "__dev") { P.dev = v; return panelSync(); } if (k === "__scope") { P.scope = v; return panelSync(); } putCfg(k, v); panelSync(); },
    tg(t) { const k = t.dataset.k; putCfg(k, !cfgFor(dev())[k]); panelSync(); },
    up(t) { mv(t, -1); }, dn(t) { mv(t, 1); },
    hide(t) { const k = t.closest(".li").dataset.key; const h = new Set(cfgFor(dev()).hidden || []); h.has(k) ? h.delete(k) : h.add(k); putCfg("hidden", [...h]); panelSync(); },
    reset() { const d = dev(); if (P.scope === "all" && owner()) { const g = JSON.parse(JSON.stringify(G())); delete g[d]; state.settings = state.settings || {}; state.settings.nav299 = g; P.dirty = 1; } const U = LS("nav299u", {}); delete U[d]; LSset("nav299u", U); apply(); panelSync(); },
    copy() { const d = dev(), o = d === "m" ? "d" : "m"; const c = cfgFor(d); const U = LS("nav299u", {}); U[o] = Object.assign({}, c); LSset("nav299u", U); apply(); panelSync(); try { toast("✅"); } catch (e) {} },
    async save() { try { await saveSetting16("nav299", G()); P.dirty = 0; } catch (e) { console.warn(e); } openPanel(); }
  };
  function mv(t, dir) { const k = t.closest(".li").dataset.key, c = cfgFor(dev()), ks = ordKeys(c), i = ks.indexOf(k), j = i + dir; if (i < 0 || j < 0 || j >= ks.length) return; [ks[i], ks[j]] = [ks[j], ks[i]]; putCfg("order", ks); putCfg("sort", "custom"); panelSync(); }
  /* على window في الـ capture: عشان v295 مايقفلش الشريط لما تدوس في اللوحة */
  addEventListener("click", e => {
    const t = e.target && e.target.closest ? e.target.closest("[data-a299]") : null;
    if (t && (t.closest("#pnl299") || t.classList.contains("n299b"))) { e.stopImmediatePropagation(); e.preventDefault(); const f = act[t.dataset.a299]; if (f) f(t); return; }
    if (e.target && e.target.closest && e.target.closest("#pnl299")) e.stopImmediatePropagation();
  }, true);
  addEventListener("input", e => {
    const t = e.target; if (!t || !t.closest || !t.closest("#pnl299")) return;
    if (t.dataset.r299) { const k = t.dataset.r299; const v = +t.value; putCfg(k, v); const s = D.getElementById("v299-" + k); if (s) s.textContent = v + (k === "scale" || k === "iscale" ? "%" : k === "gap" || k === "colw" ? "px" : ""); }
    else if (t.dataset.sz299) { const k = t.closest(".li").dataset.key; const m = Object.assign({}, cfgFor(dev()).sizes || {}); const v = +t.value; if (v === 100) delete m[k]; else m[k] = v; putCfg("sizes", m); t.title = v + "%"; }
  }, true);
  addEventListener("keydown", e => { if (e.key === "Escape" && P.open) closePanel(); });
})();
