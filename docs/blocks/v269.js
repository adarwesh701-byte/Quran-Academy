/* ================= v269: (1) صفحة «درجات المقام» (وأي صفحة بتتحدّث لوحدها) مابقتش ترعش وتطلع وتنزل: لما الصفحة نفسها تترسم تاني، مكانك في الصفحة بيفضل زي ما هو ومن غير أنيميشن الدخول · (2) المصحف الملوّن: شريط الأحكام مابقاش لازق فوق المصحف ومغطّي عليه · وتقدر تعلّم على اللام الشمسية والمتجانسين والمتقاربين وهمزة الوصل والحروف اللي لا تُنطق (بتتلوّن لما تختارها) · (3) «حروف الكلمة» بقت أكبر، وأي حرف تدوس عليه بيفتحلك مكانه في المخارج والصفات علطول · (4) الأمثلة اللي فيها أكتر من كلمة (أحكام النون والميم واللام وعلاقات الحروف) بقت بصوت الشيخ الحصري للآية كلها مش كلمة كلمة · (5) الخط موحّد في الموقع، والبولد للعناوين والأقسام بس (حتى في الكتب) ================= */
(function () {
  const FF = k => { try { return window.ff254(k); } catch (e) { return true; } };
  const AR = () => state.lang === "ar"; const T = (a, e) => AR() ? a : e;
  const css = s => document.head.insertAdjacentHTML("beforeend", `<style>${s}</style>`);

  /* ---------- 1) ثبات الصفحة لما تترسم تاني ---------- */
  const key = () => [state.route, state.pageArg, state.libSec, state.mqTab, state.tjxD, (state.tjb || {}).c, state.fuU].join("|");
  let lastKey = "";
  const _r = render; render = function () { if (!FF("v269.steady")) return _r.apply(this, arguments); const k = key(); const same = k === lastKey; const y = scrollY;
    if (same) document.documentElement.classList.add("rr269"); const o = _r.apply(this, arguments); lastKey = k;
    if (same) { if (Math.abs(scrollY - y) > 2) window.scrollTo(0, y); requestAnimationFrame(() => { if (Math.abs(scrollY - y) > 2 && key() === k) window.scrollTo(0, y); setTimeout(() => document.documentElement.classList.remove("rr269"), 350); }); }
    return o; };
  css(`html.rr269 #app *{animation:none!important;transition:none!important}`);

  /* ---------- 2) المصحف الملوّن ---------- */
  const MARK = { laam_shamsiyah: ["#7c3aed", "#f3e8ff"], idgham_mutajanisayn: ["#b45309", "#fef3c7"], idgham_mutaqaribayn: ["#c2410c", "#ffedd5"], ham_wasl: ["#0369a1", "#e0f2fe"], slnt: ["#475569", "#e2e8f0"] };
  function tj() { if (!FF("v269.tj")) return; let st = document.getElementById("st269"); if (!st) { st = document.createElement("style"); st.id = "st269"; document.head.appendChild(st); }
    const on = new Set(state.mk269 || []); /* بتتعلّم لما تختارها بإيدك من الشريط */
    st.textContent = Object.entries(MARK).filter(([k]) => on.has(k)).map(([k, [c, b]]) => `html body #app .tj2 .tj-${k}{color:${c}!important;background:${b}!important;border-radius:3px}html body #app .tjf157 .chip[onclick*="'${k}'"]{background:${c}!important;border-color:${c}!important;color:#fff!important}`).join(""); }
  /* الشرايح دي بتعلّم/بتشيل العلامة لوحدها من غير ما تلخبط باقي الأحكام */
  try { const _f = window.tjf157; if (typeof _f === "function") window.tjf157 = function (k) { if (FF("v269.tj") && MARK[k]) { const s = new Set(state.mk269 || []); s.has(k) ? s.delete(k) : s.add(k); state.mk269 = [...s]; tj(); return; } return _f.apply(this, arguments); }; } catch (e) {}
  css(`html body #app .tjf157.in246{position:static!important;top:auto!important;box-shadow:none}
  html body #app .tjf157 .chip[onclick*="laam_shamsiyah"],html body #app .tjf157 .chip[onclick*="idgham_mutajanisayn"],html body #app .tjf157 .chip[onclick*="idgham_mutaqaribayn"],html body #app .tjf157 .chip[onclick*="ham_wasl"],html body #app .tjf157 .chip[onclick*="'slnt'"]{opacity:1!important;filter:none!important;cursor:pointer;color:var(--text,#111)}`);

  /* ---------- 3) حروف الكلمة ← المخارج والصفات ---------- */
  const bare = s => String(s || "").replace(/[ً-ٰٟۖ-ۭ]/g, "").replace(/[ٱأإآ]/g, "ا").trim();
  function letters() { if (!FF("v269.letters")) return; document.querySelectorAll(".tf164 > span, .tjwib .chip.lt, #mmModal .chip.lt").forEach(sp => { if (sp.__l269) return; sp.__l269 = 1; const L = bare(sp.textContent).charAt(0); if (!L) return; sp.classList.add("lt269"); sp.title = (sp.title ? sp.title + " · " : "") + T("دوس تشوف مخرجه وصفاته", "Tap for its articulation & attributes");
      sp.addEventListener("click", ev => { ev.stopPropagation(); ev.preventDefault(); ["mmModal", "tjWI"].forEach(id => { const m = document.getElementById(id); if (m) m.remove(); }); state.mkL = L; go16("makharij"); setTimeout(() => window.scrollTo({ top: 0 }), 50); }); }); }
  css(`.tf164{display:flex;flex-wrap:wrap;gap:.35rem;margin:.3rem 0}.tf164>span.lt269,.chip.lt.lt269{font:700 1.9rem/1.2 'Amiri',serif!important;min-width:2.6rem;text-align:center;padding:.15rem .5rem!important;border-radius:12px;border:1.5px solid var(--line);background:var(--card);cursor:pointer;transition:transform .12s}.tf164>span.lt269:hover,.chip.lt.lt269:hover{transform:translateY(-2px);border-color:var(--accent)}.tf164>span.h{color:#b91c1c}.tf164>span.c{color:#92400e}.tf164>span.l{color:#1d4ed8}
  #mmModal .mk234{display:none}`);

  /* ---------- 4) الأحكام المركّبة بصوت الحصري للآية كلها ---------- */
  if (typeof wbwPlay === "function") { const _w = wbwPlay; wbwPlay = function (s, a, w, n, btn) { if (!FF("v269.husary") || !(n > 1)) return _w.apply(this, arguments);
      try { if (window.__h269 && window.__h269.btn === btn && !window.__h269.au.paused) { window.__h269.au.pause(); btn && btn.classList.remove("on"); window.__h269 = null; return; } if (window.__h269) { window.__h269.au.pause(); window.__h269.btn && window.__h269.btn.classList.remove("on"); } } catch (e) {}
      try { wbwStop(); } catch (e) {} const au = new Audio(eaUrl("Husary_128kbps", s + ":" + a)); window.__h269 = { au, btn }; if (btn) btn.classList.add("on"); au.onended = () => { if (btn) btn.classList.remove("on"); }; au.play().catch(() => {}); }; }

  /* ---------- 5) الخط موحّد + البولد للعناوين بس ---------- */
  function font() { document.body.classList.toggle("ft269", FF("v269.font")); }
  css(`
  body.ft269 #app :is(p,li,td,th,label,dd,dt,blockquote,.tjbi,.tjxs p,.muted:not(.xs),.sm:not(h1,h2,h3,h4,h5,h6),.card>div:not([class]),.bk-p,.para){font-size:1rem;line-height:1.75}
  body.ft269 #app :is(p,li,td,label,dd,blockquote,.tjbi,.tjxs p,.bk-p,.para,.fures,.muted) :is(b,strong){font-weight:inherit}
  body.ft269 #app .tjbi>b:first-child{font-weight:inherit}
  body.ft269 #app :is(h1,h2,h3,h4,h5,h6,.sec-title,.tjbch>h3,.tjbh,legend,summary,thead th){font-weight:800}
  body.ft269 #app :is(.btn,.chip,.badge,.opt){font-weight:600}`);

  const _r2 = render; render = function () { const o = _r2.apply(this, arguments); try { tj(); letters(); font(); } catch (e) { console.warn("v269", e); } return o; };
  let t0 = 0; new MutationObserver(() => { clearTimeout(t0); t0 = setTimeout(() => { try { letters(); } catch (e) {} }, 60); }).observe(document.body, { childList: true, subtree: true });
  font();
})();
