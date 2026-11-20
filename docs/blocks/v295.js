/* ================= v295: القوائم مابتفتحش لوحدها (طلب المالك) — كانت فيه مناطق «مرّر هنا لتنزل القوائم» وأسهم وشرايط بتفتح القوائم فوق المحتوى بمجرد ما الماوس يعدّي عليها (منطقة الهيدر zn215، سهم القوائم tbb209، سهم الشريط rope268، تبويبات الشرايط الجانبية tab201/h207، الشريط الجانبي rb169، الدوك dk196، أقسام الأدوات hd193) · دلوقتي بتفتح بالضغط بس، وبتتقفل لما تختار حاجة أو تنتقل لصفحة أو تضغط برّه أو Esc · من غير أي تغيير في شكل الشريط اللي فوق ================= */
(function () {
  const FF = k => { try { return window.ff254(k); } catch (e) { return true; } };
  const HOVER = "#zn215,#tbb209,.tab201,#h207-tools,.h207,#rope268,#rb169,.dk196h,.hd193,details.ac200>summary,details.ac200";
  const block = e => { if (!FF("v295.nohover")) return; const t = e.target; if (t && t.nodeType === 1 && t.matches && t.matches(HOVER)) { e.stopImmediatePropagation(); e.stopPropagation(); } };
  // على window في مرحلة الـ capture: بيشتغل قبل أي مستمع على العنصر أو على document
  window.addEventListener("mouseenter", block, true);
  window.addEventListener("mouseover", e => { if (!FF("v295.nohover")) return; const t = e.target; if (t && t.closest && t.closest("#rope268")) e.stopImmediatePropagation(); }, true);
  document.addEventListener("DOMContentLoaded", () => { document.body.classList.remove("hv283"); });
  /* القفل: بعد اختيار عنصر، أو الانتقال لصفحة، أو الضغط برّه، أو Esc */
  const openNow = () => document.body.classList.contains("tb209-open") || document.body.classList.contains("hv283") || (ropeOpened && !document.body.classList.contains("nc268"));
  let ropeOpened = false; document.addEventListener("click", e => { if (e.target.closest && e.target.closest("#rope268")) setTimeout(() => { ropeOpened = !document.body.classList.contains("nc268"); }, 0); }, true);
  function closeMenus() { const b = document.body; if (!b) return; b.classList.remove("hv283"); if (ropeOpened && !b.classList.contains("nc268")) { ropeOpened = false; try { hd268.tog(); } catch (e) {} } if (b.classList.contains("tb209-open")) { try { const t = document.getElementById("tbb209"); t && t.click(); } catch (e) {} if (b.classList.contains("tb209-open")) b.classList.remove("tb209-open"); } }
  let lastRoute = null;
  const _r = render; render = function () { const o = _r.apply(this, arguments); try { const k = state.route + "|" + (state.pageArg || ""); if (lastRoute !== null && k !== lastRoute && FF("v295.nohover")) closeMenus(); lastRoute = k; } catch (e) {} return o; };
  document.addEventListener("click", e => { if (!FF("v295.nohover") || !openNow()) return; const t = e.target; if (t.closest("#tbb209,#rope268,#zn215,.pin268")) return; if (t.closest("#app .hdr .nav a, #app .bar185 a, #app .dombar a, #app .unav a, #app .mnav a")) { setTimeout(closeMenus, 0); return; } if (!t.closest("#app .hdr, #app .bar185, #app .dombar, #app .unav, #app .mnav")) closeMenus(); }, true);
  addEventListener("keydown", e => { if (e.key === "Escape" && openNow()) closeMenus(); });
  /* عنوان المنطقة كان بيقول «مرّر هنا» — بقى «اضغط» */
  let q = 0; new MutationObserver(() => { if (q) return; q = 1; setTimeout(() => { q = 0; const z = document.getElementById("zn215"); if (z && z.title && /مرّر|Hover/.test(z.title)) z.title = state.lang === "ar" ? "اضغط لفتح القوائم" : "Click to open the menus"; }, 200); }).observe(document.documentElement, { childList: true, subtree: true });
})();
