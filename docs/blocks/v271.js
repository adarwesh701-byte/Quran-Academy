/* ================= v271: الخطوط زي الوورد (طلب المالك 19/11) — زرار «🔤 الخطوط» للمالك: لكل جزء لوحده (الكلام العادي · العناوين · عناوين الأقسام والكروت · الأزرار · الشريط اللي فوق · الكتب) تختار نوع الخط والحجم والسُمك، بمعاينة قبل الحفظ · الافتراضي: الخط أتقل (أسمك) في الموقع كله من غير ما يكبر · الشريط اللي فوق: الخط مابيصغرش لوحده ومفيش حاجة بتختفي على الجنب — اللي مالوش مكان بينزل سطر تاني، وحجمه أكبر شوية (والمالك يغيّره) · خط المصحف والقرآن مابيتغيّرش ================= */
(function () {
  const FF = k => { try { return window.ff254(k); } catch (e) { return true; } };
  const AR = () => state.lang === "ar"; const T = (a, e) => AR() ? a : e;
  const own = () => { try { return realRole() === "owner" && !state.preview; } catch (e) { return false; } };
  const E = s => { try { return esc(s); } catch (e) { return String(s == null ? "" : s); } };
  const PARTS = () => [
    ["body", T("الكلام العادي", "Body text"), "#app :is(p,li,td,th,label,dd,blockquote,span,small,div,a,input,textarea,select)", { f: "", s: 1, w: 500 }],
    ["h", T("العناوين الكبيرة", "Page headings"), "#app :is(h1,h2)", { f: "", s: 1, w: 800 }],
    ["sec", T("عناوين الأقسام والكروت", "Section & card titles"), "#app :is(h3,h4,h5,.tjbh,.gh260,.sec-title,.card>b:first-child,.mstile b,.c260 b,.bg260 b)", { f: "", s: 1, w: 700 }],
    ["btn", T("الأزرار", "Buttons"), "#app :is(.btn,.chip,.badge,.opt,button)", { f: "", s: 1, w: 600 }],
    ["nav", T("الشريط اللي فوق", "Top bar"), "#app header.hdr nav.nav>a, #fl268 nav.p268-nav>a", { f: "", s: 0.9, w: 600 }],
    ["book", T("الكتب والشروح", "Books & explanations"), "#app :is(.tjbi,.tjxs p,.bk-p,.para,.book-body p,.reader p,.ch-body p)", { f: "", s: 1, w: 500 }]];
  const FONTS = ["", "Tajawal", "Cairo", "Almarai", "IBM Plex Sans Arabic", "Readex Pro", "Noto Kufi Arabic", "Noto Naskh Arabic", "Amiri", "Changa", "El Messiri", "Markazi Text", "Inter", "Manrope"];
  const W = [300, 400, 500, 600, 700, 800, 900];
  const cfg = () => { let c = null; try { c = setv("font271", null); } catch (e) {} const o = {}; PARTS().forEach(p => o[p[0]] = Object.assign({}, p[3], (c || {})[p[0]] || {})); return o; };
  /* الخط والمصحف والقرآن بيفضلوا زي ما هم */
  const SKIP = ":not([lang=ar].notr):not(.notr *):not(.ayah):not(.ayah *):not(.tj2 *):not(.mushaf *):not(.pg267 *):not(.w267):not(i):not([class*=fa-]):not(svg *)";
  const loaded = new Set();
  function loadFont(f) { if (!f || loaded.has(f)) return; loaded.add(f); const l = document.createElement("link"); l.rel = "stylesheet"; l.href = "https://fonts.googleapis.com/css2?family=" + encodeURIComponent(f) + ":wght@300;400;500;600;700;800;900&display=swap"; document.head.appendChild(l); }
  function css(c) { return PARTS().map(([k, , sel]) => { const v = c[k]; if (v.f) loadFont(v.f); const sels = sel.split(/,\s*(?![^()]*\))/).map(s => s.trim() + SKIP).join(","); return `${sels}{${v.f ? `font-family:"${v.f}",system-ui,sans-serif!important;` : ""}font-weight:${v.w}!important;${k !== "body" && v.s !== 1 ? `font-size:${v.s}em!important;` : ""}}`; }).join("\n") + (c.body.s !== 1 ? `html{font-size:calc(18.9px * ${c.body.s})!important}` : ""); }
  function apply(c) { if (!FF("v271.font")) { const s = document.getElementById("st271"); if (s) s.textContent = ""; document.body.classList.remove("f271"); return; } let st = document.getElementById("st271"); if (!st) { st = document.createElement("style"); st.id = "st271"; document.head.appendChild(st); }
    c = c || state.fd271 || cfg(); st.textContent = css(c) + `\nhtml body.f271 #app header.hdr nav.nav>a, html body.f271 #fl268 nav.p268-nav>a{font-size:${c.nav.s}rem!important}`; document.body.classList.add("f271");
    /* الشريط: مفيش تصغير أوتوماتيك ولا إخفاء أيقونات — اللي مالوش مكان بينزل */
    const n = document.querySelector("#app header.hdr nav.nav"); if (n) { n.style.removeProperty("--nf"); n.classList.remove("noi268", "wr268"); } }
  /* المحرر */
  window.ft271 = {
    open() { state.fd271 = JSON.parse(JSON.stringify(cfg())); draw(); },
    set(k, f, v) { state.fd271[k][f] = f === "f" ? v : +v; apply(state.fd271); draw(); },
    async save() { await saveSetting16("font271", state.fd271); state.fd271 = null; const m = document.getElementById("ft271m"); if (m) m.remove(); toast("✅"); render(); },
    cancel() { state.fd271 = null; const m = document.getElementById("ft271m"); if (m) m.remove(); apply(); },
    reset() { const o = {}; PARTS().forEach(p => o[p[0]] = Object.assign({}, p[3])); state.fd271 = o; apply(o); draw(); } };
  function draw() { const c = state.fd271; let m = document.getElementById("ft271m"); if (!m) { m = document.createElement("div"); m.id = "ft271m"; m.className = "notr"; document.body.appendChild(m); }
    m.innerHTML = `<div class="bx271"><div class="row" style="justify-content:space-between;align-items:center"><h3 style="margin:0">🔤 ${T("الخطوط", "Fonts")}</h3><button class="x271" onclick="ft271.cancel()">✕</button></div><p class="xs muted">${T("كل تغيير بيبان على الموقع علطول (معاينة) — ومابيتحفظش للكل غير لما تدوس «احفظ». خط القرآن مابيتغيّرش.", "Changes preview live — saved for everyone only when you press Save. Quran text never changes.")}</p>
      ${PARTS().map(([k, name]) => { const v = c[k]; return `<div class="r271"><b>${E(name)}</b><div class="g271">
        <label>${T("النوع", "Font")}<select class="in" onchange="ft271.set('${k}','f',this.value)">${FONTS.map(f => `<option value="${E(f)}" ${v.f === f ? "selected" : ""}>${f ? E(f) : T("خط الموقع", "Site font")}</option>`).join("")}</select></label>
        <label>${T("الحجم", "Size")} <b>${Math.round(v.s * 100)}%</b><input type="range" min="${k === "nav" ? 0.7 : 0.8}" max="${k === "nav" ? 1.4 : 1.4}" step="0.02" value="${v.s}" oninput="ft271.set('${k}','s',this.value)"></label>
        <label>${T("السُمك", "Weight")} <b>${v.w}</b><input type="range" min="300" max="900" step="100" value="${v.w}" oninput="ft271.set('${k}','w',this.value)"></label></div>
        <div class="pv271" style="${v.f ? `font-family:'${E(v.f)}';` : ""}font-weight:${v.w};font-size:${k === "nav" ? v.s + "rem" : v.s + "em"}">${k === "nav" ? "🏠 " + T("الرئيسية", "Home") + " · 🧰 " + T("الأدوات", "Tools") : T("أكاديمية إتقان — تعلّم القرآن والتجويد والمقامات", "Itqan Academy — learn Quran, tajweed and maqamat")}</div></div>`; }).join("")}
      <div class="row" style="gap:.5rem;margin-top:.8rem;flex-wrap:wrap"><button class="btn btn-p" onclick="ft271.save()">💾 ${T("احفظ للكل", "Save for everyone")}</button><button class="btn btn-o" onclick="ft271.reset()">↺ ${T("الافتراضي", "Default")}</button><button class="btn btn-o" onclick="ft271.cancel()">${T("إلغاء", "Cancel")}</button></div></div>`; }
  /* زرار للمالك جنب 📌 وفي لوحة التحكم */
  function btn() { if (!own()) return; const hdr = document.querySelector("#app header.hdr"); if (hdr && !hdr.querySelector(".fb271")) hdr.insertAdjacentHTML("beforeend", `<button class="fb271" title="${T("الخطوط", "Fonts")}" onclick="ft271.open()">🔤</button>`);
    const site = document.querySelector('#cp261 .sc261.op .si261'); if (site && /🛠️|site/i.test((site.closest(".sc261").querySelector(".sh261") || {}).textContent || "") && !site.querySelector(".fb271b")) site.insertAdjacentHTML("afterbegin", `<button class="btn btn-o fb271b" style="margin-bottom:.5rem" onclick="ft271.open()">🔤 ${T("الخطوط (النوع والحجم والسُمك لكل جزء)", "Fonts (family, size, weight per part)")}</button>`); }
  const _r = render; render = function () { const o = _r.apply(this, arguments); try { apply(); btn(); } catch (e) { console.warn("v271", e); } return o; };
  addEventListener("resize", () => setTimeout(() => { try { apply(); } catch (e) {} }, 200));
  new MutationObserver(() => { try { btn(); } catch (e) {} }).observe(document.body, { childList: true });
  document.head.insertAdjacentHTML("beforeend", `<style>
  html body.f271.h268.one264.one264 #app header.hdr nav.nav{flex-wrap:wrap!important;overflow:visible!important;justify-content:center!important;gap:.15rem .3rem}
  html body.f271.h268.one264.one264 #app header.hdr nav.nav>a{padding:.3rem .6rem!important}
  html body.f271.h268.one264.one264 #app header.hdr nav.nav>a .i264{display:inline!important}
  @media (max-width:760px){html body.f271.h268.one264.one264 #app header.hdr nav.nav{display:grid!important}}
  .fb271{position:absolute;bottom:4px;inset-inline-end:44px;border:1px dashed var(--line);background:var(--card);border-radius:8px;padding:0 .35rem;cursor:pointer;font-size:.85rem;z-index:5}
  #ft271m{position:fixed;top:0;bottom:0;inset-inline-end:0;width:min(440px,96vw);z-index:9996;background:var(--card,#fff);color:var(--text,#111);box-shadow:0 0 40px rgba(0,0,0,.25);overflow:auto;padding:1rem}
  .r271{border:1px solid var(--line);border-radius:12px;padding:.6rem;margin:.5rem 0}.g271{display:grid;grid-template-columns:1fr 1fr 1fr;gap:.4rem;margin:.4rem 0}.g271 label{font-size:.75rem;display:flex;flex-direction:column;gap:.2rem}.g271 select{padding:.2rem;font-size:.8rem}.pv271{border-top:1px dashed var(--line);padding-top:.4rem}
  .x271{border:0;background:var(--line,#eee);width:30px;height:30px;border-radius:50%;cursor:pointer}</style>`);
  apply();
})();
