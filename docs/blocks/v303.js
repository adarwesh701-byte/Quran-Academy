/* ================= v303: (1) الشريطان الجانبيان يفتحان ويقفلان بضغطة واحدة (v215 كان يعاملهما كأزرار عائمة على الحافة فيحتاج ضغطتين) · (2) الشريط العلوي أفقي دائمًا بنفس الترتيب والشكل (لا قائمة رأسية ولا زر همبرجر) · (3) إزالة السهم من علامة الشريط مع بقاء العلامة الخضراء ================= */
(function () {
  if (window.__v303) return; window.__v303 = 1;
  const D = document;
  const css = (id, s) => { try { if (D.getElementById(id)) return; D.head.insertAdjacentHTML("beforeend", `<style id="${id}">${s}</style>`); } catch (e) {} };

  /* (1) أي بقايا لـ fl215 على الشريطين تُزال */
  const clean = () => D.querySelectorAll(".rail288.fl215,#rl288.fl215,#rr288.fl215").forEach(el => { el.classList.remove("fl215", "out215", "dr215"); el.removeAttribute("data-edge"); el.style.removeProperty("--tx215"); });
  clean(); new MutationObserver(clean).observe(D.body, { childList: true, subtree: false, attributes: true, attributeFilter: ["class"] });
  css("css303r", `.rail288,.rail288.fl215{translate:none!important;touch-action:auto!important}`);

  /* (2) الشريط العلوي أفقي دائمًا */
  css("css303n", `
html body .mnav,html body .mnav.open,html body .hdr .burger{display:none!important}
html body #app header.hdr nav.nav:not(#z303){flex-direction:row!important;writing-mode:horizontal-tb!important;width:100%;max-width:none;align-items:center}
html body #app .hdr nav.nav>*{flex:0 0 auto!important;width:auto!important;max-width:none!important;display:inline-flex;flex-direction:row;align-items:center;white-space:nowrap}
html body #app .hdr nav.nav .ed261,html body #app .hdr nav.nav .tl207{width:auto!important;white-space:nowrap}
html body #app .hdr nav.nav a{position:static}`);

  /* (3) العلامة الخضراء بلا سهم */
  css("css303h", `#tbb209 .ch,#tbb209 .s211-mihrab{display:none!important}html body #rope268 b{font-size:0!important;color:transparent!important;overflow:hidden}`);
  window.v303 = { clean };
})();

