/* ================= v282: الرئيسية (طلب المالك 20/11) — «أهلًا بك» ولوحة التحكم الكاملة وبعدها أقسام الموقع في أول الصفحة علطول · «ماذا تريد أن تتعلم؟» و«ما الذي يهمك؟» وكارت «كمّل» اتشالوا · تحدّي الـ30 يوم في مكانه ================= */
(function () {
  const FF = k => { try { return window.ff254(k); } catch (e) { return true; } };
  function home() { if (state.route !== "home" || !FF("v282.top")) return; const app = document.getElementById("app"); if (!app) return;
    const first = [...app.children].find(e => e.tagName === "SECTION"); const hub = app.querySelector(":scope > section.hub"); const tr = app.querySelector(":scope > #tr275");
    if (first) { if (hub && hub !== first) first.before(hub); const after = hub || first; if (tr && after.nextElementSibling !== tr) after.after(tr); }
    app.querySelectorAll("#int200").forEach(e => e.remove());
    app.querySelectorAll("h2, h3").forEach(h => { if (/^\s*(ماذا تريد أن تتعلم|عايز تتعلم إيه|What would you like to learn)\??\s*$/.test(h.textContent)) { const box = h.closest(".card, section > .wrap > div") || h; if (box.querySelector && box.querySelector("#tr275, .hub")) h.remove(); else (box.textContent.trim().length < 60 ? box : h).remove(); } });
    app.querySelectorAll("button, a").forEach(b => { if (/^\s*(كمّل|كمل|Continue|Resume)\s*$/.test(b.textContent)) { const c = b.closest(".card, [class*=rs], [class*=resume], [class*=cont]"); (c && !c.querySelector("#tr275, .hub") ? c : b).remove(); } }); }
  const _r = render; render = function () { const o = _r.apply(this, arguments); try { home(); } catch (e) {} return o; };
  let q = 0; new MutationObserver(() => { if (q || state.route !== "home") return; q = 1; requestAnimationFrame(() => { q = 0; try { home(); } catch (e) {} }); }).observe(document.documentElement, { childList: true, subtree: true });
})();
