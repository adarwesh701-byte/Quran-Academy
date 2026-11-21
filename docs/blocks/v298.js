/* ================= v298: دفعة إصلاحات الواجهة — (4) كليك يمين/تبويب جديد (9) نص مش بينزل أعمدة (10) داكن بدون أبيض (15) اهتزاز الموبايل + user-select (17) تحميل لا نهائي + إعادة محاولة (18) زر الرجوع + شريط الإعدادات مطوي ============= */
(function () {
  if (window.__v298) return; window.__v298 = 1;
  const D = document, $ = (s, r) => (r || D).querySelector(s), $$ = (s, r) => Array.from((r || D).querySelectorAll(s));
  const AR = () => { try { return state.lang === "ar"; } catch (e) { return D.documentElement.lang === "ar"; } };
  const T = (a, e) => AR() ? a : e;
  /* ---------- CSS ---------- */
  const st = D.createElement("style"); st.id = "css298";
  st.textContent = `
html{overflow-x:clip;overscroll-behavior-x:none}
body{overflow-x:clip;max-width:100vw}
/* (15) الأزرار مش بتتحدد (Copy/Share) */
button,.btn,summary,[role=button],[onclick],.bnav a,nav a,.chip,.tab,label.btn{-webkit-user-select:none;user-select:none;-webkit-touch-callout:none;-webkit-tap-highlight-color:transparent}
input,textarea,[contenteditable=true],.sel298{-webkit-user-select:text;user-select:text}
/* (9) نصوص قصيرة سطر واحد */
.mic298,.mic279,.lhb,.rdsyl,.lhs small,.dombar a,.bnav a span,.bnav a,.chip,.tab,.btn-sm{white-space:nowrap}
.lhs{min-width:0}.lhs .row{flex-wrap:nowrap}
.lhp{grid-template-columns:repeat(auto-fit,minmax(78px,1fr))}
/* (3) أقسام الإعدادات: مطوي افتراضيًا ويدفع المحتوى */
#stx152{position:static!important;width:auto!important;max-height:none!important;margin:.6rem 0;border-radius:14px;overflow:hidden;scrollbar-width:thin;scrollbar-color:#3a4a6b #131b2e}
#stx152>.row:first-child{cursor:pointer;padding:.5rem .7rem;-webkit-user-select:none;user-select:none}
#stx152>.row:first-child::after{content:"▾";margin-inline-start:auto;transition:transform .2s}
#stx152.o298>.row:first-child::after{transform:rotate(180deg)}
#stx152:not(.o298)>*:not(:first-child){display:none!important}
#stx152.o298{max-height:60vh;overflow:auto}
#stx152::-webkit-scrollbar{width:8px}#stx152::-webkit-scrollbar-thumb{background:#3a4a6b;border-radius:8px}#stx152::-webkit-scrollbar-track{background:transparent}
/* (2) معاينة منشئ التجربة: بدون شريط أبيض */
#xbst286{background:#0b0f19!important;overflow:hidden}
#xbi286{background:#0b0f19;border:0;scrollbar-width:none;color-scheme:dark}
/* (17) */
.err298{padding:1rem;border:1px dashed #f59e0b;border-radius:14px;text-align:center}
/* scrollbars داكنة */
[data-theme=dark] *{scrollbar-color:#3a4a6b #131b2e}
[data-theme=dark] ::-webkit-scrollbar-track{background:#131b2e}[data-theme=dark] ::-webkit-scrollbar-thumb{background:#3a4a6b;border-radius:8px}
/* (4) قائمة كليك يمين */
#cm298{position:fixed;z-index:99999;background:var(--card,#fff);color:var(--fg,#111);border:1px solid var(--line,#ddd);border-radius:12px;box-shadow:0 10px 30px rgba(0,0,0,.35);padding:.3rem;min-width:11rem;font-size:.9rem}
#cm298 button{display:block;width:100%;text-align:start;background:none;border:0;color:inherit;padding:.5rem .7rem;border-radius:8px;cursor:pointer}
#cm298 button:hover{background:rgba(16,185,129,.15)}`;
  D.head.appendChild(st);

  /* ---------- (3) شريط أقسام الإعدادات: toggle ---------- */
  D.addEventListener("click", e => { const h = e.target.closest && e.target.closest("#stx152>.row:first-child"); if (!h) return; if (e.target.closest("button,a")) return; h.parentElement.classList.toggle("o298"); }, true);

  /* ---------- (4) روابط حقيقية: كليك يمين / Ctrl-Click / كليك الوسط ---------- */
  const RX = /(?:go16|navigate)\(\s*['"]([^'"]+)['"]\s*(?:,\s*['"]([^'"]*)['"])?/;
  function urlOf(el) {
    const n = el.closest("[onclick]"); if (!n || n.closest("a[href]")) return null;
    const m = RX.exec(n.getAttribute("onclick") || ""); if (!m) return null;
    return { el: n, url: location.origin + location.pathname + "#/" + m[1] + (m[2] ? "/" + m[2] : "") };
  }
  let cm = null; const closeCm = () => { cm && cm.remove(); cm = null; };
  D.addEventListener("contextmenu", e => {
    closeCm(); const u = urlOf(e.target); if (!u) return;
    e.preventDefault(); cm = D.createElement("div"); cm.id = "cm298";
    cm.innerHTML = `<button data-a="tab">↗️ ${T("فتح في تبويب جديد", "Open in new tab")}</button><button data-a="copy">🔗 ${T("نسخ الرابط", "Copy link")}</button>`;
    D.body.appendChild(cm); cm.style.left = Math.min(e.clientX, innerWidth - 190) + "px"; cm.style.top = Math.min(e.clientY, innerHeight - 100) + "px";
    cm.onclick = ev => { const a = ev.target.dataset.a; if (a === "tab") window.open(u.url, "_blank", "noopener"); if (a === "copy") { try { navigator.clipboard.writeText(u.url); } catch (x) {} } closeCm(); };
  }, true);
  D.addEventListener("click", e => { if (cm && !e.target.closest("#cm298")) closeCm(); const u = urlOf(e.target); if (u && (e.ctrlKey || e.metaKey)) { e.preventDefault(); e.stopImmediatePropagation(); window.open(u.url, "_blank", "noopener"); } }, true);
  D.addEventListener("auxclick", e => { if (e.button !== 1) return; const u = urlOf(e.target); if (u) { e.preventDefault(); window.open(u.url, "_blank", "noopener"); } }, true);
  addEventListener("scroll", closeCm, { passive: true });
  /* إتاحة الفتح بالكيبورد + دلالة للقارئ */
  const mark = () => $$('[onclick]:not([data-l298])').slice(0, 800).forEach(n => { n.dataset.l298 = 1; if (!/^(A|BUTTON|INPUT|SELECT|TEXTAREA|SUMMARY)$/.test(n.tagName) && RX.test(n.getAttribute("onclick") || "")) { n.setAttribute("role", "link"); if (!n.hasAttribute("tabindex")) n.tabIndex = 0; } });

  /* ---------- (18) زر الرجوع ---------- */
  try {
    const h0 = location.hash;
    if (h0 && h0 !== "#/home" && h0 !== "#/" && !sessionStorage.getItem("s298")) { sessionStorage.setItem("s298", "1"); history.replaceState({ r298: "root" }, "", "#/home"); history.pushState({ r298: "deep" }, "", h0); }
  } catch (e) {}
  const OV = []; let skipPop = 0;
  const isOv = n => { if (!(n instanceof Element) || n.id === "cm298") return false; const cs = getComputedStyle(n); if (cs.position !== "fixed") return false; if ((parseInt(cs.zIndex) || 0) < 900) return false; const r = n.getBoundingClientRect(); return r.width > innerWidth * .6 && r.height > innerHeight * .45 && cs.display !== "none" && cs.visibility !== "hidden"; };
  function closeOv(n) { const b = $$("button,a,[role=button]", n).find(x => /^(✕|✖|×|x|X|إغلاق|اغلاق|Close|إلغاء)\s*$/.test((x.textContent || "").trim()) || /close|إغلاق/i.test(x.getAttribute("aria-label") || "")); if (b) b.click(); setTimeout(() => { if (n.isConnected && isOv(n)) n.remove(); }, 80); }
  new MutationObserver(ms => {
    ms.forEach(m => {
      m.addedNodes.forEach(n => { if (n.nodeType === 1 && n.parentElement === D.body && isOv(n) && !OV.includes(n)) { OV.push(n); try { history.pushState({ m298: 1 }, "", location.href); } catch (e) {} } });
      m.removedNodes.forEach(n => { const i = OV.indexOf(n); if (i > -1) { OV.splice(i, 1); if (history.state && history.state.m298) { skipPop++; history.back(); } } });
    });
  }).observe(D.body, { childList: true });
  addEventListener("popstate", e => {
    if (skipPop > 0) { skipPop--; e.stopImmediatePropagation(); return; }
    const top = OV[OV.length - 1]; if (top) { e.stopImmediatePropagation(); OV.pop(); closeOv(top); }
  }, true);
  addEventListener("keydown", e => { if (e.key === "Escape") { closeCm(); } });

  /* ---------- (17) تحميل لا نهائي ---------- */
  const seen = new WeakMap();
  setInterval(() => {
    const now = Date.now();
    $$('#app [class*=skel],#app [class*=loading],#app .card.muted.sm').forEach(n => {
      if (n.children.length > 1 || n.dataset.e298) return;
      const txt = (n.textContent || "").trim();
      if (!(/skel|loading/i.test(n.className) || /^(جارٍ|جاري|⏳)?\s*(التحميل|تحميل|Loading)/i.test(txt))) return;
      const t0 = seen.get(n) || now; seen.set(n, t0);
      if (now - t0 > 20000) { n.dataset.e298 = 1; n.className = "err298"; n.innerHTML = `<p>${T("تعذّر تحميل المحتوى. تأكد من الاتصال ثم أعد المحاولة.", "Couldn't load this content. Check your connection and retry.")}</p><button class="btn btn-p" onclick="try{render()}catch(e){location.reload()}">🔄 ${T("إعادة المحاولة", "Retry")}</button>`; }
    });
  }, 2500);

  /* ---------- (10) الوضع الداكن: لا أبيض/كريمي، وتباين ≥ 4.5 ---------- */
  const lum = c => { const f = v => { v /= 255; return v <= .03928 ? v / 12.92 : Math.pow((v + .055) / 1.055, 2.4); }; return .2126 * f(c[0]) + .7152 * f(c[1]) + .0722 * f(c[2]); };
  const rgba = s => { const m = /rgba?\(([^)]+)\)/.exec(s || ""); if (!m) return null; const p = m[1].split(/[ ,\/]+/).filter(Boolean).map(parseFloat); return [p[0], p[1], p[2], p.length > 3 ? p[3] : 1]; };
  const ratio = (a, b) => { const x = lum(a), y = lum(b); return (Math.max(x, y) + .05) / (Math.min(x, y) + .05); };
  const done = new WeakSet();
  function effBg(n) { for (let p = n; p && p.nodeType === 1; p = p.parentElement) { const c = rgba(getComputedStyle(p).backgroundColor); if (c && c[3] > .6) return c; } return [11, 15, 25, 1]; }
  const FX = new Set();
  function fixDark(root) {
    if (D.documentElement.getAttribute("data-theme") !== "dark") { FX.forEach(e => { ["background-image", "background-color", "border-color", "color"].forEach(p => e.style.removeProperty(p)); done.delete(e); }); FX.clear(); return; }
    const els = $$("*", root).filter(e => !done.has(e) && !/^(SCRIPT|STYLE|SVG|PATH|IMG|CANVAS|VIDEO|AUDIO|IFRAME)$/i.test(e.tagName)).slice(0, 2500);
    els.forEach(e => {
      done.add(e); let cs; try { cs = getComputedStyle(e); } catch (x) { return; }
      const bg = rgba(cs.backgroundColor), bi = cs.backgroundImage;
      let light = bg && bg[3] > .5 && lum(bg) > .45;
      if (!light && bi && bi.includes("gradient")) { const cols = (bi.match(/rgba?\([^)]+\)/g) || []).map(rgba).filter(Boolean); if (cols.length && cols.every(c => c[3] > .5 && lum(c) > .45)) light = true; }
      if (light && !e.matches("input[type=checkbox],input[type=radio],.keep298,.piano,.key,[class*=swatch],[class*=color]")) { FX.add(e); e.style.setProperty("background-image", "none", "important"); e.style.setProperty("background-color", "var(--card,#131b2e)", "important"); if (cs.borderTopWidth !== "0px") e.style.setProperty("border-color", "var(--line,#243049)", "important"); }
      if ([...e.childNodes].some(c => c.nodeType === 3 && c.textContent.trim())) {
        const fg = rgba(getComputedStyle(e).color); const b = effBg(e);
        if (fg && ratio(fg, b) < 4.5) FX.add(e), e.style.setProperty("color", lum(b) < .3 ? "var(--fg,#f1f5f9)" : "#0b0f19", "important");
      }
    });
  }
  let dt = 0; const sched = () => { clearTimeout(dt); dt = setTimeout(() => { mark(); (window.requestIdleCallback || setTimeout)(() => fixDark(D.body)); }, 350); };
  new MutationObserver(sched).observe(D.body, { childList: true, subtree: true });
  new MutationObserver(() => { /* تغيير الثيم: أعد الفحص */ sched(); }).observe(D.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  sched();
  window.v298 = { fixDark, urlOf };
})();
