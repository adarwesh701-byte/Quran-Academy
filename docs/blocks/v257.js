/* ================= v257: Notion «project» التالت (أول دفعة) — الشريط التاني: «الأقسام» و«باقات الاشتراك مع مدرس» و«الفصل والحصص» و«اشترك» اتشالوا (فاضل «الأدوات» و«احصل على اشتراك مجاني» و«دليل الموقع») · صفحة «الأقسام والأدوات» اتشالت وبتوديك على «الأدوات» · شريط لوحتي: «المحادثات» و«الإشعارات» اتشالوا منه · الرئيسية: «أهلاً بك يا …» فوق، والشريط الأبيض الفاضي اتشال، و«عاين الرئيسية الجديدة» و«تحدّي 30 يوم» نزلوا تحت الأقسام · «شكل الفم مع الحركات» اتشال من الأدوات ================= */
(function () {
  const FF = k => { try { return window.ff254(k); } catch (e) { return true; } };
  const css = s => document.head.insertAdjacentHTML("beforeend", `<style>${s}</style>`);
  function subbar() { if (!FF("v257.bar")) return; const tools = document.querySelector('#app a[onclick^="go16(\'alltools\')"]'); const bar = tools && tools.parentElement; if (!bar) return;
    [...bar.querySelectorAll("a")].forEach(a => { const s = a.getAttribute("onclick") || ""; if (/go16\('tools'\)|state\.ptab='lessons'|go16\('d','classroom'\)|^navigate\('pricing'\)/.test(s)) a.remove(); });
    const my = document.querySelector('#app a[onclick^="go16(\'myspace\')"]'); const row = my && my.parentElement; if (row) [...row.querySelectorAll("a")].forEach(a => { const s = a.getAttribute("onclick") || ""; if (/dash\.tab='chats'|notif\.open=true/.test(s)) a.remove(); }); }
  function homeOrder() { if (!FF("v257.home") || state.route !== "home") return; const hb = document.getElementById("hbh168"); const w = hb ? hb.parentElement : (document.getElementById("hmb165") || {}).parentElement; const ly = document.querySelector("#app section.ly180"); if (!w || !ly) return;
    [...w.children].forEach(c => { if (c.classList.contains("card") && !c.id && !(c.innerText || "").trim() && !c.querySelector("img,canvas,video,audio,button,input")) c.style.display = "none"; });
    let box = document.getElementById("mv257"); if (!box) { box = document.createElement("div"); box.id = "mv257"; box.className = "wrap"; ly.insertAdjacentElement("afterend", box); } ["hmb165", "hbh168"].forEach(id => { const e = document.getElementById(id); if (e && e.parentElement !== box) box.appendChild(e); }); }
  const _g = go16; go16 = function (r, a) { if (r === "tools" && FF("v257.bar")) r = "alltools"; return _g.call(this, r, a); };
  const _D = DOMAINS; DOMAINS = function () { const ds = _D.apply(this, arguments); if (!FF("v257.mouth")) return ds; try { ds.forEach(d => { if (d.tools) d.tools = d.tools.filter(t => !/شكل الفم|Mouth shape|mouth & vowels/i.test(String(t[1]))); }); } catch (e) {} return ds; };
  const _r = render; render = function () { if (state.route === "tools" && FF("v257.bar")) state.route = "alltools"; const o = _r.apply(this, arguments); try { subbar(); homeOrder(); } catch (e) { console.warn("v257", e); } return o; };
  let t0 = 0; new MutationObserver(() => { clearTimeout(t0); t0 = setTimeout(() => { try { subbar(); homeOrder(); } catch (e) {} }, 150); }).observe(document.getElementById("app") || document.body, { childList: true });
  css(`#mv257{margin-top:.8rem;display:grid;gap:.6rem}`);
})();
