/* ================= v305: الشريط العلوي على كل المقاسات (موبايل/تابلت/ديسكتوب): صف كامل العرض تحت اللوجو بصفوف فوق بعض، العلامة الخضراء أنزل وكأنها تشدّ الشريط، ومعاينة «كطالب/كمعلم» بلا أي أداة تعديل (كانت الأدوات تظهر لأن الدور الحقيقي أونر) ================= */
(function () {
  if (window.__v305) return; window.__v305 = 1;
  const D = document;
  const css = (id, s) => { try { if (D.getElementById(id)) return; D.head.insertAdjacentHTML("beforeend", `<style id="${id}">${s}</style>`); } catch (e) {} };
  const eff = () => { try { return role(); } catch (e) { return null; } };
  css("css305", `
html body #app header.hdr .wrap:not(#z305){display:flex!important;flex-wrap:wrap!important;align-items:center;justify-content:space-between;gap:.5rem .6rem}
html body #app header.hdr .wrap>nav.nav:not(#z305){flex:1 1 100%!important;order:50!important;width:100%!important;max-width:100%!important;margin:.2rem 0 0!important}
html body #app header.hdr .wrap>.tools:not(#z305){flex:0 1 auto;flex-wrap:wrap;justify-content:flex-end}
html body #app header.hdr:not(#z305){padding-bottom:.9rem!important;margin-bottom:1.6rem!important;overflow:visible!important}
html body #rope268:not(#z305){display:flex!important;visibility:visible!important;opacity:1!important;bottom:-38px!important;z-index:40}
html body #rope268:not(#z305) i{height:22px!important;width:2px}
html body #rope268:not(#z305) b{box-shadow:0 2px 6px rgba(0,0,0,.25)}
/* أدوات التعديل مخفية تمامًا في عرض الطالب/المعلم/الزائر */
html body.ro305 :is(.ed261,.pin268,#ed158b,#ed189b,#ctl113,#vb252,#dr212b,#sim189,.tbtn169,.hd186-handle,#simBar button:not(.keep305),.rail288 .ed288,.rail288 .cfg288,.h288 .ed288){display:none!important}`);
  const sync = () => {
    const ro = eff() !== "owner";
    D.body.classList.toggle("ro305", ro);
    if (ro) D.querySelectorAll("#app header.hdr .ed261, #app header.hdr .pin268, .pin268").forEach(x => x.remove());
  };
  let t = 0;
  new MutationObserver(() => { if (t) return; t = setTimeout(() => { t = 0; sync(); }, 30); }).observe(D.body, { childList: true, subtree: true });
  sync();
  /* كل المجموعات/الأكورديونات تبدأ مقفولة عند دخول أي صفحة (الزائر يفتح بنفسه)، والصفحة تبدأ من فوق */
  const seen = new WeakSet();
  const closeAll = () => D.querySelectorAll("details[open]:not(.keep305)").forEach(d => { if (seen.has(d)) return; seen.add(d); d.removeAttribute("open"); });
  new MutationObserver(() => { clearTimeout(closeAll.t); closeAll.t = setTimeout(closeAll, 60); }).observe(D.body, { childList: true, subtree: true });
  window.addEventListener("hashchange", () => { try { window.scrollTo(0, 0); } catch (e) {} });
  closeAll();
})();
