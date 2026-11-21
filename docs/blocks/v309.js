/* ================= v309: محتوى أقسام الرئيسية مقفول افتراضيًا (يظهر فقط لما يضغط الزائر على اسم القسم، وضغطة ثانية تقفله) — يتكرر كل مرة يدخل الرئيسية ================= */
(function () {
  if (window.__v309) return; window.__v309 = 1;
  const D = document; let closed = true, lastRoute = null;
  D.head.insertAdjacentHTML("beforeend", `<style id="css309">body.hc309 #tr275 .hh275,body.hc309 #tr275 .gr275{display:none!important}body.hc309 #tr275 .tb275 button.on{background:var(--card)!important;color:inherit!important;border-color:var(--line)!important}</style>`);
  const apply = () => { try { const home = state.route === "home"; if (home && lastRoute !== "home") closed = true; lastRoute = state.route; D.body.classList.toggle("hc309", home && closed); } catch (e) {} };
  const _r = render; render = function () { const o = _r.apply(this, arguments); apply(); return o; };
  if (window.tr277 && typeof tr277.tab === "function") { const _t = tr277.tab; tr277.tab = function (id) { const same = state.hw277 === id || (!state.hw277 && true); if (!closed && same && state.hw277 === id) { closed = true; apply(); return; } closed = false; D.body.classList.remove("hc309"); return _t.apply(this, arguments); }; }
  apply();
})();
