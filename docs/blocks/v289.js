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
})();
