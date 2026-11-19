/* ================= v264: الشريط اللي فوق (N4) — شريط واحد: «الأدوات» و«احصل على اشتراك مجاني» و«دليل الموقع» طلعوا في نفس صف «الرئيسية» · أيقونة جنب كل اسم · «👨‍🏫 مع معلمي» للطالب و«👨‍🏫 مع طالبي» للمعلم (والأيقونة اللي كانت من غير كلام بقت «أسعار مع مدرس») · علامة 🕌 اللي جنب اللغة اتشالت · الشريط ثابت فوق دايمًا (والمالك يقدر يخليه يطلع وينزل من ✏️) · الحجم بيتظبط على الشاشة: الصغيرة كله ظاهر بحجم أصغر، والكبيرة بحجم مناسب ================= */
(function () {
  const FF = k => { try { return window.ff254(k); } catch (e) { return true; } };
  const AR = () => state.lang === "ar"; const T = (a, e) => AR() ? a : e;
  const css = s => document.head.insertAdjacentHTML("beforeend", `<style>${s}</style>`);
  const R = () => { try { return role(); } catch (e) { return null; } };
  const mode = () => { try { return (setv("top261", null) || {}).mode || "fixed"; } catch (e) { return "fixed"; } };
  const keyOf = a => (a.getAttribute("onclick") || a.getAttribute("href") || "").replace(/;?\s*return false;?\s*$/, "").trim();
  /* أيقونة واسم لكل لينك (لو المالك ماغيّرش الاسم من ✏️) */
  const MAP = () => [
    [/navigate\('home'\)/, "🏠", null], [/navigate\('tracks'\)/, "🎓", null], [/^navigate\('pricing'\)/, "💳", null],
    [/state\.ptab='lessons';navigate\('pricing'\)/, "🏷️", T("أسعار مع مدرس", "Teacher prices")], [/navigate\('about'\)/, "ℹ️", null],
    [/go16\('trip260'\)/, "👨‍🏫", R() === "teacher" ? T("مع طالبي", "With my students") : T("مع معلمي", "With my teacher")], [/cp261\.open/, "⚙️", null],
    [/go16\('myspace'\)/, "🏠", null], [/alltools/, "🧰", null], [/go16\('invite'\)/, "🎁", null], [/go16\('guide'\)/, "🗺️", null], [/fpGo/, "⏳", null],
    [/dash\.tab='overview'/, "📊", null], [/dash\.tab='requests'/, "📨", null], [/dash\.tab='reports'/, "💰", null], [/dash\.tab='reviews'/, "⭐", null], [/dash\.tab='settings'/, "🛠️", null], [/navigate\('login'\)/, "🔑", null], [/navigate\('signup'\)/, "✨", null]];
  const lead = /^[\s‍️\p{Extended_Pictographic}\p{Emoji_Presentation}]+/u;
  function bar() { if (!FF("v264.bar")) { document.body.classList.remove("fx264", "one264"); return; }
    const hdr = document.querySelector("header.hdr"); const nav = hdr && hdr.querySelector("nav.nav"); if (!nav || nav.__b264) return; nav.__b264 = 1;
    const c = (() => { try { return setv("top261", null) || {}; } catch (e) { return {}; } })(); const ren = c.ren || {};
    /* الشريط التاني يطلع في نفس الصف */
    const dom = hdr.querySelector(".dombar"); if (dom) { const home = [...nav.querySelectorAll(":scope > a")].find(a => /navigate\('home'\)/.test(a.getAttribute("onclick") || "")); let after = home;
      [...dom.querySelectorAll("a")].forEach(a => { const b = a.cloneNode(true); b.classList.add("d264"); if (after) { after.insertAdjacentElement("afterend", b); after = b; } else nav.prepend(b); }); dom.style.display = "none"; }
    /* أيقونة + كلام لكل لينك */
    [...nav.querySelectorAll(":scope > a")].forEach(a => { const k = keyOf(a); if (ren[k]) return; const m = MAP().find(x => x[0].test(k)); if (!m) return;
      const txt = (m[2] || (a.textContent || "").replace(lead, "").trim()) || ""; a.innerHTML = `<span class="i264">${m[1]}</span><span class="t264">${txt}</span>`; a.title = txt; });
    /* شيل 🕌 اللي جنب اللغة */
    const mq = hdr.querySelector("#hbi168"); if (mq) mq.style.display = "none";
    document.body.classList.add("one264"); document.body.classList.toggle("fx264", mode() !== "auto"); }
  const _r = render; render = function () { const o = _r.apply(this, arguments); try { bar(); } catch (e) { console.warn("v264", e); } return o; };
  let t0 = 0; new MutationObserver(() => { clearTimeout(t0); t0 = setTimeout(() => { try { bar(); } catch (e) {} }, 60); }).observe(document.getElementById("app") || document.body, { childList: true });
  css(`
  /* ثابت فوق — من غير ما يطلع وينزل */
  html:has(body.fx264),body.fx264{overflow-x:clip!important;overflow-y:visible!important}
  body.fx264 header.hdr{position:sticky!important;top:0!important;transform:none!important;transition:none!important;z-index:950}
  body.fx264 header.hdr.hid261,body.fx264 header.hdr.hide183{transform:none!important}
  body.fx264 #un209,body.fx264 #tbb209{display:none!important}
  html body.fx264 #app header.hdr{background:var(--card,#fff)!important;box-shadow:0 4px 18px -12px rgba(0,0,0,.25)}
  html body.one264.one264 #app header.hdr nav.nav{max-height:none!important;opacity:1!important;pointer-events:auto!important;transform:none!important;visibility:visible!important;position:static!important;box-shadow:none!important}
  html body.one264.one264 #app header.hdr .dombar{display:none!important}
  /* شريط واحد بعرض الهيدر */
  html body.one264.one264 #app header.hdr>.wrap{flex-wrap:wrap}
  html body.one264.one264 #app header.hdr nav.nav{order:5;flex:1 1 100%;display:flex!important;flex-wrap:wrap;justify-content:center;gap:.25rem .4rem;padding:.25rem 0 .35rem;margin:0}
  html body.one264.one264 #app header.hdr nav.nav>a{display:inline-flex;align-items:center;gap:.3rem;white-space:nowrap;padding:.35rem .7rem;border-radius:999px;font-size:.92rem;line-height:1.2}
  html body.one264.one264 #app header.hdr nav.nav>a .i264{font-size:1.05em}
  html body.one264.one264 #app header.hdr nav.nav>a.d264.gold{border:1.5px solid #f59e0b;color:#b45309}
  /* الشاشة الصغيرة: كله ظاهر من أول الشاشة لآخرها — الأيقونة فوق والكلام تحت بحجم أصغر */
  @media (max-width:760px){
    html body.one264.one264 #app header.hdr nav.nav{display:grid!important;grid-template-columns:repeat(auto-fit,minmax(52px,1fr));gap:.15rem;padding:.2rem 0}
    html body.one264.one264 #app header.hdr nav.nav>a{flex-direction:column;gap:.05rem;padding:.25rem .1rem;border-radius:10px;font-size:clamp(.56rem,2.5vw,.72rem);white-space:normal;text-align:center;justify-content:flex-start}
    html body.one264.one264 #app header.hdr nav.nav>a .i264{font-size:1.15rem}
    html body.one264.one264 #app header.hdr nav.nav>a .t264{display:block;line-height:1.1;overflow:hidden;text-overflow:ellipsis;max-width:100%}
  }
  @media (min-width:1400px){html body.one264.one264 #app header.hdr nav.nav>a{font-size:1rem;padding:.4rem .85rem}}`);
})();
