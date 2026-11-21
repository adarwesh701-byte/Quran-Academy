/* ================= v302: (1) كليك يمين يعمل على كل الأزرار والتبويبات (قائمة بديلة حين لا يوجد مسار) · (2) زر الرجوع في الموبايل/التابلت يرجع داخل التطبيق ولا يغلقه (ضغطتان للخروج من الرئيسية) · (3) الدارك مود: لا بياض (شريط التمرير/القوائم/المعاينة) ================= */
(function () {
  if (window.__v302) return; window.__v302 = 1;
  const D = document;
  const AR = () => { try { return state.lang === "ar"; } catch (e) { return false; } };
  const T = (a, e) => AR() ? a : e;
  const E = s => String(s == null ? "" : s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const css = (id, s) => { try { if (D.getElementById(id)) return; D.head.insertAdjacentHTML("beforeend", `<style id="${id}">${s}</style>`); } catch (e) {} };
  const EMB = /[?&]embed=1/.test(location.search);

  /* ---------- (3) دارك مود بلا بياض ---------- */
  css("css302d", `
[data-theme=dark]{color-scheme:dark}
[data-theme=dark] html,[data-theme=dark] body{background:var(--bg)}
[data-theme=dark] ::-webkit-scrollbar{width:10px;height:10px;background:var(--bg)}
[data-theme=dark] ::-webkit-scrollbar-track{background:var(--bg)}
[data-theme=dark] ::-webkit-scrollbar-thumb{background:#33415c;border-radius:8px;border:2px solid var(--bg)}
[data-theme=dark] ::-webkit-scrollbar-thumb:hover{background:#4a5b7e}
[data-theme=dark] *{scrollbar-color:#33415c var(--bg)}
[data-theme=dark] input,[data-theme=dark] select,[data-theme=dark] textarea{background-color:var(--card);color:var(--fg);border-color:var(--line)}
[data-theme=dark] option{background:var(--card);color:var(--fg)}
[data-theme=dark] .btn-o,[data-theme=dark] .ibtn{background:var(--card);color:var(--fg);border-color:var(--line)}
[data-theme=dark] iframe{background:var(--bg);color-scheme:dark}
[data-theme=dark] .card,[data-theme=dark] .modal .card{background:var(--card);color:var(--fg)}
[data-theme=dark] table,[data-theme=dark] th,[data-theme=dark] td{background:transparent;color:var(--fg);border-color:var(--line)}
[data-theme=dark] details,[data-theme=dark] summary{color:var(--fg)}
[data-theme=dark] #cm302,[data-theme=dark] #cm183{background:var(--card);color:var(--fg);border-color:var(--line)}`);

  /* ---------- (1) كليك يمين على كل عنصر قابل للضغط ---------- */
  css("css302c", `#cm302{position:fixed;z-index:100000;min-width:12rem;background:var(--card,#fff);color:var(--fg,#111);border:1px solid var(--line,#ddd);border-radius:12px;box-shadow:0 10px 30px rgba(0,0,0,.28);padding:.3rem;display:flex;flex-direction:column}
#cm302 button{display:flex;gap:.5rem;align-items:center;border:0;background:transparent;color:inherit;font:inherit;padding:.5rem .7rem;border-radius:8px;cursor:pointer;text-align:start}
#cm302 button:hover{background:rgba(16,185,129,.14)}`);
  const CLICKABLE = "[onclick],a[href],button,summary,[role=button],[role=tab],[role=link],[data-js],label,.tab,.pill,.chip";
  const hashOf = el => {
    const a = el.getAttribute("href") || ""; if (/^#\//.test(a)) return a;
    const js = el.getAttribute("onclick") || el.getAttribute("data-js") || "";
    let m = js.match(/(?:go16|navigate|go179)\(\s*['"]#?\/?([^'",)]+)['"](?:\s*,\s*['"]([^'"]*)['"])?/); if (m) return "#/" + m[1] + (m[2] ? "/" + m[2] : "");
    return "";
  };
  function closeMenu() { const m = D.getElementById("cm302"); if (m) m.remove(); }
  function openMenu(el, ev) {
    closeMenu(); const h = hashOf(el); const m = D.createElement("div"); m.id = "cm302";
    const it = [["open", "↗", T("افتح", "Open")]];
    if (h) it.push(["tab", "🗗", T("افتح في تاب جديد", "Open in a new tab")], ["copy", "🔗", T("انسخ الرابط", "Copy link")]);
    const txt = (el.innerText || el.textContent || "").trim();
    if (txt) it.push(["text", "📋", T("انسخ النص", "Copy text")]);
    m.innerHTML = it.map(([a, i, n]) => `<button data-a="${a}"><span>${i}</span>${E(n)}</button>`).join("");
    D.body.appendChild(m);
    const x = Math.max(8, Math.min(innerWidth - m.offsetWidth - 8, ev.clientX)), y = Math.max(8, Math.min(innerHeight - m.offsetHeight - 8, ev.clientY));
    m.style.left = x + "px"; m.style.top = y + "px";
    m.onclick = e => {
      const b = e.target.closest("button"); if (!b) return; const a = b.dataset.a; closeMenu();
      if (a === "open") el.click();
      else if (a === "tab") window.open(location.origin + "/" + h, "_blank", "noopener");
      else if (a === "copy") { try { navigator.clipboard.writeText(location.origin + "/" + h); } catch (e2) {} try { toast("📋 ✓"); } catch (e3) {} }
      else if (a === "text") { try { navigator.clipboard.writeText(txt.slice(0, 2000)); } catch (e2) {} try { toast("📋 ✓"); } catch (e3) {} }
    };
    setTimeout(() => { addEventListener("click", function f(e) { if (!m.contains(e.target)) { closeMenu(); removeEventListener("click", f, true); } }, true); }, 0);
  }
  D.addEventListener("contextmenu", e => {
    if (EMB) return;
    if (e.defaultPrevented) return; /* قائمة v183 تعاملت معه */
    const t = e.target; if (!t || !t.closest) return;
    if (t.closest("#cm302,#cm183,input,textarea,select,audio,video,canvas,img,[contenteditable=true]")) return;
    const el = t.closest(CLICKABLE); if (!el) return;
    e.preventDefault(); openMenu(el, e);
  }, false);
  addEventListener("keydown", e => { if (e.key === "Escape") closeMenu(); });
  addEventListener("scroll", closeMenu, { passive: true });

  /* ---------- (2) زر الرجوع: يرجع داخل التطبيق ولا يقفله ---------- */
  let lastExitTap = 0;
  try {
    if (!(history.state && history.state.r302)) {
      const cur = location.href;
      history.replaceState(Object.assign({}, history.state || {}, { r302: "root" }), "", cur);
      history.pushState(Object.assign({}, history.state || {}, { r302: "app" }), "", cur);
    }
  } catch (e) {}
  addEventListener("popstate", e => {
    try {
      const st = e.state || history.state || {};
      if (st.r302 !== "root") return;
      /* وصلنا لمدخل الحماية: لو لسه داخل صفحة غير الرئيسية نرجّعه للرئيسية بدل الخروج */
      if (typeof state !== "undefined" && state.route && state.route !== "home") {
        history.pushState({ r302: "app" }, "", "#/home");
        state.route = "home"; state.pageArg = null; render(); return;
      }
      const now = Date.now();
      if (now - lastExitTap < 2200) { history.back(); return; }  /* ضغطة ثانية: نخرج */
      lastExitTap = now;
      history.pushState({ r302: "app" }, "", location.href);
      try { toast(T("اضغط رجوع مرة أخرى للخروج", "Press back again to exit")); } catch (e2) {}
    } catch (err) {}
  }, false);

  window.v302 = { hashOf, openMenu };
})();

