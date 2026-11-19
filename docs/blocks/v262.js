/* ================= v262: Notion 3 (بنود صغيرة) — المُوالف: جنب Re/Mi/Fa الدرجة بالحروف (B2 · C4 …) في الناحية التانية + خط الصوت بقى ناعم ومظبوط (من غير القفزات والخطوط الواقفة) · سلم المقام: المسافات بقت بنسبة البعد (التون ضعف النص تون) + زرار «أوكتاف فوق/تحت» يعرض أوكتافين جنب بعض + الزراير بالعرض · «القراءات العشر» في الرئيسية بقت قسم واحد بيفتح علطول · «مصحف الروايات نص وصوت» اتشال (فاضل «المقارنة مع حفص») · منهج العلوم الشرعية فيه قسم العلوم الإسلامية كامل · النحو من الصفر للقمة فيه قسم النحو والصرف والبلاغة ================= */
(function () {
  const FF = k => { try { return window.ff254(k); } catch (e) { return true; } };
  const AR = () => state.lang === "ar"; const T = (a, e) => AR() ? a : e;
  const css = s => document.head.insertAdjacentHTML("beforeend", `<style>${s}</style>`);

  /* ---------- 1) اسم الدرجة بالحروف (C4، B2…) — ربع التون بيتكتب ½♭ ---------- */
  const LET = ["C", "C♯", "D", "E♭", "E", "F", "F♯", "G", "A♭", "A", "B♭", "B"];
  function sci(f) { if (!(f > 0)) return ""; const x = 12 * Math.log2(f / 440) + 57; const q = Math.round(x * 2) / 2; const base = Math.floor(q); const half = q - base === .5;
    if (!half) return LET[((base % 12) + 12) % 12] + Math.floor(base / 12); const up = base + 1; const nm = LET[((up % 12) + 12) % 12]; return (nm.length === 1 ? nm + "½♭" : LET[((base % 12) + 12) % 12] + "½♯") + Math.floor(up / 12); }
  window.sci262 = sci;

  /* ---------- 2) المُوالف ---------- */
  if (typeof tnDrawLadder === "function") {
    const _d = tnDrawLadder;
    tnDrawLadder = function () {
      if (!FF("v262.tuner")) return _d.apply(this, arguments);
      try { smooth(); } catch (e) {}
      const cv = document.getElementById("tn_cv"); const ctx = cv && cv.getContext("2d"); if (!ctx) return _d.apply(this, arguments);
      const W = cv.width, H = cv.height, lo = -700, hi = 3000; const toC = yy => lo + (H - 16 - yy) / (H - 32) * (hi - lo);
      const ft = ctx.fillText; ctx.fillText = function (txt, x, y) { try { if (this.textAlign === "right" && Math.abs(x - (W - 6)) < 1 && TN.tonic > 0) { const c = Math.round(toC(y - 4) / 50) * 50; const parts = String(txt).split(" · "); txt = sci(TN.tonic * Math.pow(2, c / 1200)) + (parts[1] ? " · " + parts[1] : ""); } } catch (e) {} return ft.call(this, txt, x, y); };
      try { return _d.apply(this, arguments); } finally { ctx.fillText = ft; } };
    /* القفزات: أي نقطة بعيدة عن اللي قبلها بأوكتاف تقريبًا بتترجع لنفس الأوكتاف، والقفزة الكبيرة بتقطع الخط، وبعدها متوسط 5 نقط */
    function smooth() { const h = TN.hist; if (!Array.isArray(h) || !h.length) return; let i0 = Math.max(1, (TN.__s262 || 0)); if (i0 > h.length) i0 = 1;
      for (let i = i0; i < h.length; i++) { const p = h[i - 1], c = h[i]; if (!c || c[1] == null || !p || p[1] == null) continue; let d = c[1] - p[1];
        if (Math.abs(Math.abs(d) - 1200) < 250) { c[1] -= Math.sign(d) * 1200; d = c[1] - p[1]; }
        if (Math.abs(d) > 380) { const n = h[i + 1]; if (!n || n[1] == null || Math.abs(n[1] - c[1]) > 200) c[1] = null; } }
      for (let i = Math.max(2, i0); i < h.length - 2; i++) { const w = [h[i - 2], h[i - 1], h[i], h[i + 1], h[i + 2]].map(x => x && x[1]).filter(v => v != null); if (h[i][1] != null && w.length >= 3) { w.sort((a, b) => a - b); h[i][1] = w[Math.floor(w.length / 2)]; } }
      TN.__s262 = Math.max(1, h.length - 3); }
  }

  /* ---------- 3) سلم المقام: مسافات بنسبة البعد + أوكتاف فوق/تحت ---------- */
  if (typeof mqDegPage === "function" && typeof degList === "function") {
    const _dl = degList; degList = function (m, a, b) { if (state.__mqd262 && FF("v262.ladder")) { const st = state.mqd || {}; a = a - (st.lo262 || 0); } return _dl.call(this, m, a, b); };
    const _p = mqDegPage; mqDegPage = function (mid) { if (!FF("v262.ladder")) return _p.apply(this, arguments); state.__mqd262 = 1; let h; try { h = _p.apply(this, arguments); } finally { state.__mqd262 = 0; }
      const st = state.mqd || {}; const up = st.oct || 1, dn = st.lo262 || 0;
      const bar = `<div class="oc262"><button class="btn btn-o" onclick="state.mqd.lo262=${dn ? 0 : 1};render()">${dn ? "➖" : "➕"} ${T("أوكتاف تحت (قرار القرار)", "Octave below")}</button><span class="xs muted">${T("المعروض:", "Showing:")} <b>${up + dn}</b> ${T("أوكتاف", "octave(s)")}</span><button class="btn btn-o" onclick="state.mqd.oct=${up >= 2 ? 1 : 2};render()">${up >= 2 ? "➖" : "➕"} ${T("أوكتاف فوق (الجواب)", "Octave above")}</button></div>`;
      return h.replace('<div class="mqd-lad">', bar + `<div class="mqd-lad p262 ${up + dn > 1 ? "two262" : ""}">`); };
    /* المسافة بين كل درجتين بنسبة البعد بالسنت (التون 200 = ضعف النص تون 100) */
    const fixIv = () => { if (!FF("v262.ladder")) return; const L = document.querySelector(".mqd-lad.p262"); if (!L || L.__p262) return; L.__p262 = 1; const st = state.mqd || {}; const m = (typeof MQ !== "undefined") && MQ.find(x => x.id === st.mid); if (!m) return;
      state.__mqd262 = 1; let degs; try { degs = degList(m, 0, (st.oct || 1) - 1); } finally { state.__mqd262 = 0; }
      const iv = degs.slice(0, -1).map((d, i) => mqDeg(m, degs[i + 1]) - mqDeg(m, d)); L.querySelectorAll(".mqd-iv").forEach((s, i) => { const c = iv[i] || 200; s.style.flex = `0 0 ${Math.round(c * .26)}px`; s.dataset.c262 = c; }); };
    window.fixIv262 = fixIv;
    const _r = render; render = function () { const o = _r.apply(this, arguments); try { fixIv(); } catch (e) {} return o; };
    css(`.oc262{display:flex;gap:.5rem;align-items:center;justify-content:center;flex-wrap:nowrap;margin:.4rem 0;overflow-x:auto}.oc262 .btn{padding:.2rem .7rem;font-size:.82rem;white-space:nowrap}
    .mqd-lad.p262{gap:0;overflow-x:auto;justify-content:safe center}.mqd-lad.p262 .mqd-iv{min-width:0;text-align:center;white-space:nowrap;overflow:hidden;text-overflow:clip;margin:0;padding:.05rem 0;font-size:.6rem;background:linear-gradient(var(--line),var(--line)) center/100% 2px no-repeat,var(--bg);border-radius:999px}
    .mqd-lad.p262.two262 .mqd-n{min-width:46px;padding:.3rem .1rem}.mqd-lad.p262.two262 .mqd-n b{font-size:.85rem}.mqd-lad.p262.two262 .mqd-iv{font-size:.55rem}
    .mqd .row{flex-wrap:nowrap!important;overflow-x:auto;scrollbar-width:thin}.mqd .row>.btn{white-space:nowrap;flex:none}`);
  }

  /* ---------- 4) «القراءات العشر» في الرئيسية = قسم واحد بيفتح علطول ---------- */
  try { const _p = window.p241; if (typeof _p === "function") window.p241 = p241 = function (id) { if (id === "qiraat" && FF("v262.qiraat")) { go16("qiraat"); return; } return _p.apply(this, arguments); }; } catch (e) {}

  /* ---------- 5) صفحة القراءات: شيل «مصحف الروايات (نص وصوت)» ---------- */
  function qiraatTabs() { if (!FF("v262.qiraat") || state.route !== "qiraat") return; document.querySelectorAll("#app button, #app a").forEach(b => { if (/مصحف الروايات \(نص وصوت\)|Riwayat mushaf \(text/.test(b.textContent || "") && !b.__q262) { b.__q262 = 1; b.style.display = "none"; if (b.classList.contains("btn-p") || b.getAttribute("aria-selected") === "true") { const nx = [...b.parentElement.children].find(x => /المقارنة مع حفص|compar/i.test(x.textContent || "")); if (nx && !nx.__qc262) { nx.__qc262 = 1; setTimeout(() => nx.click(), 0); } } } }); }

  /* ---------- 6) منهج العلوم الشرعية فيه «العلوم الإسلامية» كامل · النحو فيه «النحو والصرف والبلاغة» ---------- */
  function links() { if (!FF("v262.links")) return; const app = document.getElementById("app"); if (!app) return; const h = app.querySelector("h1"); if (!h) return;
    const secs = (() => { try { return sectionsData(); } catch (e) { return null; } })();
    if (state.route === "ilm" && !app.querySelector("#il262")) { let id = null; try { id = ISL_ROOT; } catch (e) {} if (id) h.parentElement.insertBefore(Object.assign(document.createElement("div"), { id: "il262", className: "card lk262", innerHTML: `<span>📚</span><div><b>${T("قسم العلوم الإسلامية كامل", "The full Islamic sciences section")}</b><small>${T("التفسير، الحديث، الفقه، السيرة، قصص الأنبياء، علوم القرآن والحديث، والآداب", "Tafsir, hadith, fiqh, seerah, prophets, Quran & hadith sciences, manners")}</small></div><button class="btn btn-p" onclick="libGo('${id}')">${T("افتح", "Open")}</button>` }), h.nextSibling); }
    if (state.route === "nahw" && !app.querySelector("#nh262") && Array.isArray(secs)) { const x = secs.find(s => s.is_visible !== false && /نحو|صرف|بلاغ/.test(((s.title || {}).ar || "")) && !/الآجرومية/.test(((s.title || {}).ar || ""))); if (x) h.parentElement.insertBefore(Object.assign(document.createElement("div"), { id: "nh262", className: "card lk262", innerHTML: `<span>📐</span><div><b>${T("قسم النحو والصرف والبلاغة", "Grammar, morphology & rhetoric section")}</b><small>${(x.title || {}).ar || ""}</small></div><button class="btn btn-p" onclick="libGo('${x.id}')">${T("افتح", "Open")}</button>` }), h.nextSibling); } }

  const _r2 = render; render = function () { const o = _r2.apply(this, arguments); try { qiraatTabs(); links(); } catch (e) { console.warn("v262", e); } return o; };
  let t0 = 0; new MutationObserver(() => { clearTimeout(t0); t0 = setTimeout(() => { try { qiraatTabs(); } catch (e) {} }, 150); }).observe(document.getElementById("app") || document.body, { childList: true, subtree: true });
  css(`.lk262{display:flex;gap:.8rem;align-items:center;border:2px solid var(--accent);margin:.6rem 0}.lk262>span{font-size:2rem}.lk262>div{flex:1}.lk262 small{display:block;color:var(--muted);font-size:.8rem}`);
})();
