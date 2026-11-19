/* ================= v259: قسم «العامية المصرية» يفضل بالعامية — تحويل واجهة الموقع للفصحى (v208) مايلمسش صفحة العامية ولا اختبار تحديد مستوى العامية (زي «أنا مش فاهم» كانت بتطلع «أنا لا فاهم») ================= */
(function () {
  const FF = k => { try { return window.ff254(k); } catch (e) { return true; } };
  const MARK = "eg259";
  /* إمتى نبقى جوه العامية: صفحة «egyptian» نفسها، أو اختبار تحديد المستوى وهو على العامية */
  const inEg = () => { try { return FF("v259.eg") && (state.route === "egyptian" || (state.route === "level" && state.lvT && state.lvT.sec === "egyptian")); } catch (e) { return false; } };
  /* v208 بيسيب أي حاجة جوه [lang] (غير html/body/#app) — فبنحط lang="ar-EG" على اللي جوه #app وعلى النوافذ اللي بتتفتح فوق الصفحة */
  const tag = el => { if (el && el.nodeType === 1 && !el.hasAttribute("lang")) { el.setAttribute("lang", "ar-EG"); el.dataset[MARK] = "1"; } };
  const chrome = el => el.id === "app" || /^(HEADER|NAV|FOOTER|SCRIPT|STYLE|LINK)$/.test(el.tagName) || /(^|\s)(bar|side|tab|h207|top|ai-widget|off173|hdr|bnav)/.test(el.getAttribute("class") || "");
  function apply(added) {
    const app = document.getElementById("app");
    if (inEg()) {
      if (app) Array.from(app.children).forEach(el => { if (!chrome(el)) tag(el); });
      (added || []).forEach(el => { if (el.nodeType === 1 && el.parentElement === document.body && !chrome(el)) tag(el); });
    } else {
      document.querySelectorAll("[data-" + MARK + "]").forEach(el => { el.removeAttribute("lang"); delete el.dataset[MARK]; });
    }
  }
  /* لازم يشتغل قبل v208: v208 بيستنى requestAnimationFrame، واحنا بنعلّم العناصر فورًا */
  new MutationObserver(ms => { const added = []; ms.forEach(m => m.addedNodes.forEach(n => added.push(n))); try { apply(added); } catch (e) {} }).observe(document.body, { childList: true, subtree: true });
  const _r = render; render = function () { const o = _r.apply(this, arguments); try { apply(); } catch (e) {} return o; };
})();
