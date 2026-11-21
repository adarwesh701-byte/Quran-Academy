/* ================= v304: الشريط العلوي: مفرود افتراضيًا، صفوف أفقية فوق بعض (بدون تمرير ولا تداخل)، محتوى كل زر جنب بعض (أيقونة + اسم)، العلامة الخضراء تفتح/تقفل (والمرور عليها يعرضه مؤقتًا وهو مقفول)، لا ينزل مع الصفحة، والطالب لا يرى أدوات تعديله أبدًا ================= */
(function () {
  if (window.__v304) return; window.__v304 = 1;
  const D = document, KEY = "itqan_nav304";
  const css = (id, s) => { try { if (D.getElementById(id)) return; D.head.insertAdjacentHTML("beforeend", `<style id="${id}">${s}</style>`); } catch (e) {} };
  const closed = () => { try { return localStorage.getItem(KEY) === "0"; } catch (e) { return false; } };
  const isOwner = () => { try { return _role25() === "owner"; } catch (e) { return false; } };
  const sync = () => { D.body.classList.toggle("n304-closed", closed()); D.body.classList.remove("nc268"); };
  sync();

  css("css304", `
html body #app header.hdr nav.nav:not(#z304){display:flex!important;flex-direction:row!important;flex-wrap:wrap!important;justify-content:center;align-items:center;gap:.3rem .35rem;width:100%;max-width:none!important;height:auto!important;max-height:none!important;overflow:visible!important;-webkit-mask-image:none!important;mask-image:none!important;position:static!important;transform:none!important;opacity:1!important;visibility:visible!important;pointer-events:auto!important;clip-path:none!important;animation:none!important;writing-mode:horizontal-tb!important}
html body.n304-closed:not(.n304-hov) #app header.hdr nav.nav:not(#z304){display:none!important}
html body #app header.hdr nav.nav>*:not(#z304){flex:0 0 auto!important;width:auto!important;min-width:0;max-width:none!important;margin:0!important;display:inline-flex!important;flex-direction:row!important;align-items:center;gap:.35rem;white-space:nowrap;position:static!important;transform:none!important}
html body #app header.hdr nav.nav>*:not(#z304) :is(.i264,.t264){display:inline-block!important;position:static!important;width:auto!important}
html body #app header.hdr:not(#z304){position:relative!important;top:auto!important}
html body #tbb209,html body #ar190{display:none!important}
html body #rope268{display:flex!important;cursor:pointer}
html body #rope268 b{font-size:0!important;color:transparent!important;overflow:hidden}`);

  /* العلامة الخضراء: ضغطة تفتح/تقفل (اختيار الزائر يُحفظ عنده، والافتراضي مفرود) */
  D.addEventListener("click", e => {
    const r = e.target.closest && e.target.closest("#rope268"); if (!r) return;
    e.stopImmediatePropagation(); e.preventDefault();
    try { localStorage.setItem(KEY, closed() ? "1" : "0"); } catch (x) {}
    D.body.classList.remove("n304-hov"); sync();
    try { const f = D.getElementById("fl268"); if (f) f.dataset.sig = ""; } catch (x) {}
  }, true);
  /* لا فتح بالمرور (قرار v295: القوائم لا تفتح بالـ hover) */
  /* الطالب (وأي غير المالك) لا يرى أدوات تعديل الشريط */
  const strip = () => { if (isOwner()) return; D.querySelectorAll("#app header.hdr .ed261, #app header.hdr .pin268").forEach(x => x.remove()); };
  new MutationObserver(() => { strip(); if (D.body.classList.contains("nc268")) D.body.classList.remove("nc268"); }).observe(D.body, { childList: true, subtree: true });
  strip();
  window.v304 = { sync };
})();

