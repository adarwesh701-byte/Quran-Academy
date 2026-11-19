/* ================= v268: الهيدر (طلب المالك 19/11 بالليل) — الافتراضي: اللوجو بس هو اللي ثابت، وباقي الهيدر (الأزرار والشريط) بيطلع مع الصفحة لما تنزل · الشريط صف واحد بخط أصغر على الكمبيوتر والتابلت (من الرئيسية لآخره)، وعلى الموبايل بينزل سطرين عادي · الشريط مفرود افتراضيًا، والحبل/السهم اللي تحته بيقفله ويفتحه · المالك من زرار 📌 يختار لكل جزء (اللوجو · الأزرار · الشريط): ثابت / يطلع مع الصفحة / يختفي وانت نازل ويظهر وانت طالع، والشريط مفرود ولا مقفول افتراضيًا ================= */
(function () {
  const FF = k => { try { return window.ff254(k); } catch (e) { return true; } };
  const AR = () => state.lang === "ar"; const T = (a, e) => AR() ? a : e;
  const css = s => document.head.insertAdjacentHTML("beforeend", `<style>${s}</style>`);
  const own = () => { try { return realRole() === "owner" && !state.preview; } catch (e) { return false; } };
  const DEF = { logo: "fixed", tools: "scroll", nav: "scroll", navOpen: true };
  const C = () => { let c = null; try { c = setv("hdr268", null); } catch (e) {} return Object.assign({}, DEF, c || {}); };
  const PARTS = () => [["logo", "🪶", T("اللوجو", "Logo")], ["tools", "🔘", T("الأزرار (اللغة، الشكل، البحث…)", "Buttons (language, theme, search…)")], ["nav", "🧭", T("الشريط (الرئيسية، الأدوات…)", "Bar (Home, Tools…)")]];
  const MODES = () => [["fixed", T("ثابت", "Fixed")], ["scroll", T("يطلع مع الصفحة", "Scrolls away")], ["hide", T("يختفي وانت نازل ويظهر وانت طالع", "Hide on scroll down")]];
  const LS = (k, v) => { try { if (v === undefined) return localStorage.getItem(k); localStorage.setItem(k, v); } catch (e) {} };

  function apply() { if (!FF("v268.hdr")) { document.body.classList.remove("h268"); return; } const hdr = document.querySelector("#app header.hdr"); if (!hdr) return; const c = C();
    document.body.classList.add("h268"); document.body.classList.remove("fx264", "ah261");
    /* مفرود/مقفول: اختيار الزائر بيتحفظ عنده، والافتراضي من المالك */
    const u = LS("itqan_nav268"); const open = u == null ? c.navOpen !== false : u === "1"; document.body.classList.toggle("nc268", !open);
    if (!hdr.querySelector("#rope268")) hdr.insertAdjacentHTML("beforeend", `<button id="rope268" class="rope268" title="${T("افتح/اقفل الشريط", "Show/hide the bar")}" onclick="hd268.tog()"><i></i><b>${open ? "⌃" : "⌄"}</b></button>${own() ? `<button class="pin268" title="${T("ثبات الهيدر", "Header behaviour")}" onclick="hd268.cfg()">📌</button>` : ""}`);
    float(); fit(); }
  /* الشريط صف واحد: الخط بيصغر لحد ما كله يدخل في العرض (كمبيوتر/تابلت) */
  function fit() { const n = document.querySelector("#app header.hdr nav.nav"); if (!n || innerWidth <= 760) { if (n) { n.style.removeProperty("--nf"); n.classList.remove("wr268"); } return; } n.classList.remove("wr268", "noi268"); let f = 0.86; n.style.setProperty("--nf", f + "rem"); let g = 0; while (n.scrollWidth > n.clientWidth + 1 && f > 0.62 && g++ < 20) { f -= 0.02; n.style.setProperty("--nf", f.toFixed(2) + "rem"); } if (n.scrollWidth > n.clientWidth + 1) { n.classList.add("noi268"); f = 0.8; g = 0; n.style.setProperty("--nf", f + "rem"); while (n.scrollWidth > n.clientWidth + 1 && f > 0.6 && g++ < 20) { f -= 0.02; n.style.setProperty("--nf", f.toFixed(2) + "rem"); } } else n.classList.remove("noi268"); if (n.scrollWidth > n.clientWidth + 1) n.classList.add("wr268"); }
  addEventListener("resize", () => { clearTimeout(fit.t); fit.t = setTimeout(fit, 120); });
  /* النسخة العايمة: الأجزاء «الثابتة» و«اللي بتختفي» بتظهر فوق لما الهيدر الأصلي يطلع برا الشاشة */
  function float() { const hdr = document.querySelector("#app header.hdr"); if (!hdr) return; const c = C(); let f = document.getElementById("fl268");
    const want = PARTS().map(p => p[0]).filter(k => c[k] !== "scroll" && !(k === "nav" && document.body.classList.contains("nc268")));
    if (!want.length) { if (f) f.remove(); return; }
    if (!f) { f = document.createElement("div"); f.id = "fl268"; f.className = "notr"; document.body.appendChild(f); }
    const sig = want.join(",") + "|" + state.route + "|" + state.lang; if (f.dataset.sig !== sig) { f.dataset.sig = sig; f.innerHTML = "";
      const sel = { logo: ".logo", tools: ".tools", nav: "nav.nav" };
      want.forEach(k => { const el = hdr.querySelector(sel[k]); if (!el) return; const cl = el.cloneNode(true); cl.removeAttribute("id"); cl.querySelectorAll("[id]").forEach(x => x.removeAttribute("id")); cl.classList.add("p268", "p268-" + k); cl.dataset.m = c[k]; f.appendChild(cl); }); }
    onScroll(true); }
  let ly = 0; function onScroll(force) { const f = document.getElementById("fl268"); const hdr = document.querySelector("#app header.hdr"); if (!f || !hdr) return; const y = scrollY; const past = hdr.getBoundingClientRect().bottom < 0; const down = y > ly; ly = y;
    f.classList.toggle("on", past); f.querySelectorAll(".p268").forEach(p => { p.classList.toggle("gone", p.dataset.m === "hide" && down && !force); }); }
  addEventListener("scroll", () => onScroll(), { passive: true });
  window.hd268 = { tog() { const nc = !document.body.classList.contains("nc268"); document.body.classList.toggle("nc268", nc); LS("itqan_nav268", nc ? "0" : "1"); const b = document.querySelector("#rope268 b"); if (b) b.textContent = nc ? "⌄" : "⌃"; const f = document.getElementById("fl268"); if (f) f.dataset.sig = ""; float(); },
    cfg() { const c = C(); let m = document.getElementById("cf268"); if (m) m.remove(); m = document.createElement("div"); m.id = "cf268"; m.className = "ov268 notr"; m.onclick = e => { if (e.target === m) m.remove(); };
      m.innerHTML = `<div class="bx268"><button class="x268" onclick="this.closest('#cf268').remove()">✕</button><h3>📌 ${T("الهيدر وانت نازل في الصفحة", "Header while scrolling")}</h3>${PARTS().map(p => `<div class="r268"><b>${p[1]} ${p[2]}</b><div class="row" style="gap:.3rem;flex-wrap:wrap">${MODES().map(x => `<label class="ch268"><input type="radio" name="m268${p[0]}" value="${x[0]}" ${c[p[0]] === x[0] ? "checked" : ""}> ${x[1]}</label>`).join("")}</div></div>`).join("")}
        <div class="r268"><b>🧭 ${T("الشريط أول ما الصفحة تفتح", "Bar when the page opens")}</b><div class="row" style="gap:.3rem"><label class="ch268"><input type="radio" name="o268" value="1" ${c.navOpen !== false ? "checked" : ""}> ${T("مفرود", "Expanded")}</label><label class="ch268"><input type="radio" name="o268" value="0" ${c.navOpen === false ? "checked" : ""}> ${T("مقفول (يتفتح بالحبل)", "Collapsed (open with the rope)")}</label></div></div>
        <div class="row" style="gap:.5rem;margin-top:.8rem"><button class="btn btn-p" onclick="hd268.save()">💾 ${T("احفظ للكل", "Save for everyone")}</button><button class="btn btn-o" onclick="hd268.reset()">↺ ${T("الافتراضي", "Default")}</button></div><p class="xs muted">${T("الافتراضي: اللوجو بس ثابت، والباقي بيطلع مع الصفحة، والشريط مفرود.", "Default: only the logo is fixed, the rest scrolls away, the bar is expanded.")}</p></div>`; document.body.appendChild(m); },
    async save() { const m = document.getElementById("cf268"); const v = {}; PARTS().forEach(p => { const r = m.querySelector(`input[name=m268${p[0]}]:checked`); v[p[0]] = r ? r.value : DEF[p[0]]; }); const o = m.querySelector("input[name=o268]:checked"); v.navOpen = !o || o.value === "1"; await saveSetting16("hdr268", v); try { localStorage.removeItem("itqan_nav268"); } catch (e) {} m.remove(); toast("✅"); render(); },
    async reset() { await saveSetting16("hdr268", DEF); try { localStorage.removeItem("itqan_nav268"); } catch (e) {} const m = document.getElementById("cf268"); if (m) m.remove(); render(); } };
  const _r = render; render = function () { const o = _r.apply(this, arguments); try { apply(); } catch (e) { console.warn("v268", e); } return o; };
  let t0 = 0; new MutationObserver(() => { clearTimeout(t0); t0 = setTimeout(() => { try { apply(); } catch (e) {} }, 80); }).observe(document.getElementById("app") || document.body, { childList: true });

  css(`
  /* الهيدر الأصلي بيطلع مع الصفحة (مش sticky) */
  html body.h268 #app header.hdr{position:relative!important;top:auto!important;transform:none!important}
  body.h268 #tbb209,body.h268 #un209{display:none!important}
  /* الشريط: صف واحد وخط أصغر على الكمبيوتر والتابلت */
  @media (min-width:761px){
    html body.h268.one264.one264 #app header.hdr nav.nav{flex-wrap:nowrap!important;justify-content:safe center!important;gap:0 .1rem;overflow-x:auto;scrollbar-width:none}
    html body.h268.one264.one264 #app header.hdr nav.nav>a{font-size:var(--nf,.84rem)!important;padding:.25rem .4rem!important;gap:.2rem}
    html body.h268.one264.one264 #app header.hdr nav.nav.wr268{flex-wrap:wrap!important}
    html body.h268.one264.one264 #app header.hdr nav.nav.noi268>a .i264{display:none}
    html body.h268.one264.one264 #app header.hdr nav.nav>a .i264{font-size:1em}
  }
  @media (max-width:760px){ html body.h268.one264.one264 #app header.hdr nav.nav>a{font-size:clamp(.54rem,2.3vw,.66rem)!important} }
  /* مقفول */
  html body.h268.nc268 #app header.hdr nav.nav{display:none!important}
  .rope268{position:absolute;left:50%;bottom:-14px;transform:translateX(-50%);border:0;background:transparent;cursor:pointer;display:flex;flex-direction:column;align-items:center;z-index:5;padding:0}
  .rope268 i{width:2px;height:10px;background:var(--accent,#0f766e)}.rope268 b{width:22px;height:22px;border-radius:50%;background:var(--accent,#0f766e);color:#fff;font-size:.8rem;display:grid;place-items:center;line-height:1}
  .pin268{position:absolute;bottom:4px;inset-inline-end:8px;border:1px dashed var(--line);background:var(--card);border-radius:8px;padding:0 .35rem;cursor:pointer;font-size:.85rem;z-index:5}
  /* العايم */
  #fl268{position:fixed;top:0;left:0;right:0;z-index:960;display:flex;flex-direction:column;align-items:stretch;pointer-events:none;transform:translateY(-110%);transition:transform .25s}
  #fl268.on{transform:none}
  #fl268 .p268{pointer-events:auto;transition:transform .25s,opacity .25s;background:var(--card,#fff);box-shadow:0 4px 14px -10px rgba(0,0,0,.3)}
  #fl268 .p268.gone{transform:translateY(-120%);opacity:0;pointer-events:none}
  #fl268 .p268-logo{align-self:flex-start;margin:.4rem;padding:.3rem .5rem;border-radius:14px;display:inline-flex;align-items:center;gap:.4rem}
  html[dir=rtl] #fl268 .p268-logo{align-self:flex-end}
  #fl268 .p268-logo:only-child,#fl268 .p268-logo{width:max-content}
  #fl268 .p268-tools{display:flex;gap:.3rem;justify-content:center;flex-wrap:wrap;padding:.3rem}
  #fl268 nav.p268-nav{display:flex!important;flex-wrap:nowrap;justify-content:center;gap:.1rem .25rem;overflow-x:auto;padding:.25rem .4rem}
  #fl268 nav.p268-nav>a{display:inline-flex;align-items:center;gap:.25rem;white-space:nowrap;padding:.25rem .5rem;border-radius:999px;font-size:clamp(.66rem,.9vw,.84rem);color:inherit;text-decoration:none}
  @media (max-width:760px){#fl268 nav.p268-nav{flex-wrap:wrap}}
  .ov268{position:fixed;inset:0;z-index:9995;background:rgba(15,23,42,.45);display:grid;place-items:center;padding:1rem}.bx268{position:relative;background:var(--card,#fff);color:var(--text,#111);border-radius:18px;padding:1.3rem;max-width:560px;width:100%}.r268{margin:.7rem 0;display:flex;flex-direction:column;gap:.3rem}.ch268{border:1px solid var(--line);border-radius:999px;padding:.2rem .6rem;font-size:.85rem;cursor:pointer}.x268{position:absolute;top:.6rem;inset-inline-end:.6rem;border:0;background:var(--line,#eee);width:30px;height:30px;border-radius:50%;cursor:pointer}`);
})();
