/* ================= v289: طلب المالك 20/11 (Phase 2) — (1) التحميل عند Refresh: شاشة تحميل ثابتة (هيكل الصفحة) بتظهر من أول لحظة وبتفضل لحد ما الجلسة والملف الشخصي والإعدادات يتحمّلوا والصفحة المطلوبة تترسم وتستقر — بدل ما الزائر/صفحة تانية تظهر وتختفي · (2) الأداء: وقف حلقات بتعيد كتابة نفس الكلام والخصائص كل 150ms (navFix وشريط الأدوات) فكانت بتشغّل كل المراقبين باستمرار، وتجميع قراءات المقاسات بدل قراءة/كتابة متبادلة، وإلغاء قراءة المقاسات لما مفيش حاجة تترسم · (3) «عربي للأطفال» بقى جوه «اتكلم عربي» ================= */
(function () {
  const FF = k => { try { return window.ff254(k); } catch (e) { return true; } };
  function done() { const b = document.getElementById("bt289"); if (!b || b.__d) return; b.__d = 1; b.classList.add("out"); setTimeout(() => b.remove(), 300); }
  if (!FF("v289.boot")) { done(); return; }
  /* نستنى: الجلسة جاهزة + أول رسم بعد الجاهزية + الصفحة تستقر 200ms من غير تغييرات في #app (بحد أقصى 0.9 ثانية بعد الجاهزية) */
  let readyAt = 0, last = 0, t = 0;
  const app = () => document.getElementById("app");
  function check() { clearTimeout(t); if (!state.auth || !state.auth.ready) { t = setTimeout(check, 60); return; } if (!readyAt) readyAt = Date.now(); const now = Date.now(); if (now - last >= 150 || now - readyAt > 900) { requestAnimationFrame(() => requestAnimationFrame(done)); return; } t = setTimeout(check, 60); }
  document.addEventListener("DOMContentLoaded", () => { const a = app(); if (a) new MutationObserver(() => { last = Date.now(); }).observe(a, { childList: true, subtree: true }); check(); });
  if (document.readyState !== "loading") check();
  /* أي تنقّل بعد كده مايأثرش: الشاشة بتتشال مرة واحدة بس */
  /* ---------- البيانات من الكاش الأول (الإعدادات + الملف الشخصي) وبعدين نحدّث في الخلفية — عشان الصفحة تترسم بسرعة ومرة واحدة ---------- */
  if (FF("v289.cache")) {
    const SK = "itqan_set289", PK = u => "itqan_prof289_" + u; const rd = k => { try { return JSON.parse(localStorage.getItem(k) || "null"); } catch (e) { return null; } }; const wr = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} };
    let bootS = 1, bootP = 1;
    const _ls = loadSettings; loadSettings = async function () { const c = bootS ? rd(SK) : null; bootS = 0; const fresh = Promise.resolve(_ls.apply(this, arguments)).then(() => { const n = state.settings; if (n) { const was = JSON.stringify(rd(SK)); wr(SK, n); if (c && was !== JSON.stringify(n) && state.auth && state.auth.ready) { try { render(); } catch (e) {} } } });
      if (c) { try { applySettings(c); } catch (e) { return fresh; } fresh.catch(() => {}); return; } return fresh; };
    const _lp = loadProfile; loadProfile = async function () { const u = state.auth && state.auth.user; const c = bootP && u ? rd(PK(u.id)) : null; bootP = 0;
      const fresh = Promise.resolve(_lp.apply(this, arguments)).then(() => { const p = state.auth && state.auth.profile; const uu = state.auth && state.auth.user; if (uu && p) { const was = JSON.stringify(rd(PK(uu.id))); wr(PK(uu.id), p); if (c && was !== JSON.stringify(p) && state.auth.ready) { try { render(); } catch (e) {} } } });
      if (c && u) { state.auth.profile = c; fresh.catch(() => {}); return; } return fresh; };
    window.addEventListener("storage", () => {});
  }
})();
