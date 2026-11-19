/* ================= v230: «تسجيل الدخول» بيفتح صفحة الدخول علطول (جوجل + فيسبوك + الإيميل والباسورد) بلون مميّز في النهاري والليلي، ونصوصها بتعدّلها انت · اتشال «بدون تأكيد إيميل» · الأسعار مخفية عن الزائر لحد ما يسجّل · اتشال «كمّل من مكان ما وقفت» و«تراجع» (غير في وضع البناء) و«رجوع لمكانك» · نتايج البحث بتفتح المكان الصح · رفع «العربية بين يديك» بشريط تقدّم ونسبة مئوية ================= */
(function () {
  const AR = () => state.lang === "ar"; const T = (a, e) => AR() ? a : e;
  const css = s => document.head.insertAdjacentHTML("beforeend", `<style>${s}</style>`);
  const own = () => { try { return _role25() === "owner"; } catch (e) { return false; } };
  const logged = () => !!(state.auth && state.auth.user);

  /* 1) الدخول علطول لصفحة الدخول */
  try { localStorage.setItem("itqan_known", "1"); } catch (e) {}
  const LG = () => Object.assign({ title: "", sub: "", note: "", google: 1, facebook: 1 }, setv("lg230", {}) || {});
  window.lg230 = async () => { const c = LG(); const t = prompt(T("عنوان صفحة الدخول (فاضي = العادي)", "Login page title"), c.title); if (t == null) return; const s = prompt(T("جملة تحت العنوان", "Subtitle"), c.sub); if (s == null) return; const n = prompt(T("ملاحظة صغيرة تحت الفورم (اختياري)", "Small note under the form"), c.note); if (n == null) return; const g = confirm(T("يظهر زرار «ادخل بجوجل»؟", "Show Google button?")); const f = confirm(T("يظهر زرار «ادخل بفيسبوك»؟", "Show Facebook button?")); await saveSetting16("lg230", { title: t, sub: s, note: n, google: g ? 1 : 0, facebook: f ? 1 : 0 }); render(); };
  function loginPage() { if (!/^(login|signup)$/.test(state.route)) return; const app = document.getElementById("app"); if (!app) return; const c = LG();
    app.querySelectorAll(".oa114 button").forEach(b => { if (/بدون تأكيد|no email confirmation/.test(b.innerHTML)) b.innerHTML = b.innerHTML.replace(/\s*—\s*(بدون تأكيد إيميل|no email confirmation)/, ""); if (/'google'/.test(b.getAttribute("onclick") || "") && !c.google) b.style.display = "none"; if (/'facebook'/.test(b.getAttribute("onclick") || "") && !c.facebook) b.style.display = "none"; });
    if (state.route !== "login") return; const h = [...app.querySelectorAll("h1, h2")].find(x => !x.closest(".hdr")); if (h && c.title && !h.__lg) { h.__lg = 1; h.textContent = c.title; } if (h && c.sub && !app.querySelector("#lgs230")) h.insertAdjacentHTML("afterend", `<p id="lgs230" class="muted" style="margin:.2rem 0 .8rem">${esc(c.sub)}</p>`);
    const form = app.querySelector("form, .authbox, .card"); if (form && c.note && !app.querySelector("#lgn230")) form.insertAdjacentHTML("beforeend", `<p id="lgn230" class="xs muted" style="margin-top:.6rem">${esc(c.note)}</p>`);
    if (own() && h && !app.querySelector("#lge230")) h.insertAdjacentHTML("beforebegin", `<button id="lge230" class="btn btn-o xs" onclick="lg230()">✏️ ${T("عدّل صفحة الدخول", "Edit login page")}</button>`); }

  /* 2) الأسعار مخفية عن الزائر */
  const hideP = () => !logged() && (setv("hp230", 1) !== 0);
  function prices() { document.body.classList.toggle("np230", hideP()); if (hideP() && state.route === "pricing") { const app = document.getElementById("app"); const main = app && [...app.children].find(x => !x.matches(".hdr,header,footer,.bar185,.dombar,.unav") && x.tagName !== "NAV"); if (main && !app.querySelector("#np230")) { [...app.children].forEach(x => { if (!x.matches(".hdr,header,footer,.bar185,.dombar,.unav,nav")) x.style.display = "none"; }); app.querySelector(".hdr, header").insertAdjacentHTML("afterend", `<section class="sec" id="np230"><div class="wrap" style="max-width:560px;text-align:center"><div style="font-size:3rem">🔒</div><h2>${T("سجّل مجانًا علشان تشوف الباقات والأسعار", "Sign up free to see plans and prices")}</h2><p class="muted">${T("التسجيل في دقيقة، وبيفتحلك محتوى مجاني في كل مسار وحصة تجريبية.", "It takes a minute and unlocks free content and a trial lesson.")}</p><button class="btn btn-p" onclick="navigate('signup')">✨ ${T("سجّل مجانًا", "Sign up free")}</button> <button class="btn btn-o" onclick="navigate('login')">${T("عندي حساب", "I have an account")}</button></div></section>`); } } }
  window.hp230 = async () => { await saveSetting16("hp230", setv("hp230", 1) === 0 ? 1 : 0); render(); };

  /* 3) البحث بيفتح المكان الصح */
  try { const _sx = srIndex109; srIndex109 = function () { const L = _sx.apply(this, arguments) || []; let ds = []; try { ds = DOMAINS(); } catch (e) {} return L.map(x => { const m = String(x[2] || "").match(/go16\('d','([^']+)'\)/); if (m) { const d = ds.find(z => z.k === m[1]); const door = d && typeof door147Of === "function" ? door147Of(d) : "quran"; return [x[0], x[1], `go16('world','${door}')`]; } return x; }).filter(x => !/pdfbooks181/.test(String(x[2])) || own()); }; } catch (e) {}

  /* 4) رفع العربية بين يديك بنسبة مئوية */
  try { const _au = abybUpload; abybUpload = async function (files) { const F = [...(files || [])].filter(f => /U\d+\.pptx$/i.test(f.name)); const n = F.length; let bar = document.getElementById("up230"); if (!bar) { bar = document.createElement("div"); bar.id = "up230"; document.body.appendChild(bar); }
      let done = 0, cur = "", k = 0, tot = 0; const paint = () => { const pct = n ? Math.min(100, Math.round(((done + (tot ? k / tot : 0)) / n) * 100)) : 0; bar.innerHTML = `<div class="row" style="justify-content:space-between;gap:.5rem"><b>📤 ${T("رفع العربية بين يديك", "Uploading the Arabic book")}</b><b>${pct}%</b></div><div class="pb230"><i style="width:${pct}%"></i></div><small>${esc(cur || T("بيقرأ الملفات…", "Reading files…"))} · ${done}/${n} ${T("وحدة", "units")}</small><small class="muted">${T("سيب الصفحة مفتوحة لحد ما يوصل 100%", "Keep this page open until 100%")}</small>`; };
      paint(); const log = document.getElementById("abybLog"); const mo = log ? new MutationObserver(() => { const t = (log.lastElementChild || {}).textContent || ""; let m; if ((m = t.match(/الوحدة (\d+)/)) && /بقرأ/.test(t)) { cur = t.replace(/^📂\s*/, ""); k = 0; tot = 0; } if ((m = t.match(/(\d+)\/(\d+)/))) { k = +m[1]; tot = +m[2]; } if (/^✅/.test(t)) { done++; k = 0; tot = 0; cur = t; } if (/^❌/.test(t)) { done++; cur = t; } paint(); }) : null; mo && mo.observe(log, { childList: true });
      try { return await _au.apply(this, arguments); } finally { mo && mo.disconnect(); done = n; cur = "✅ " + T("خلص الرفع", "Upload finished"); paint(); setTimeout(() => bar.remove(), 8000); } }; } catch (e) {}

  /* 5) زرار الدخول بلون مميّز + شيل الحاجات الزيادة */
  function mark() { document.querySelectorAll("#app .hdr button, #app .hdr a, #app .mnav button").forEach(b => { if (/navigate\('login'\)/.test(b.getAttribute("onclick") || "")) b.classList.add("lg230b"); }); const b = window.B216 && window.B216.on; document.body.classList.toggle("bo230", !!b); }
  const _r = render; render = function () { _r.apply(this, arguments); try { mark(); prices(); loginPage(); } catch (e) { console.warn("v230", e); } };
  let t0; new MutationObserver(() => { clearTimeout(t0); t0 = setTimeout(() => { try { mark(); loginPage(); } catch (e) {} }, 120); }).observe(document.body, { childList: true });
  css(`
  .lg230b{background:#f59e0b!important;border-color:#f59e0b!important;color:#1f1300!important;font-weight:800!important;box-shadow:0 4px 14px rgba(245,158,11,.35)!important}.lg230b:hover{background:#fbbf24!important}
  #ct171,#ct219,#bk177{display:none!important}body:not(.bo230) #un209{display:none!important}
  body.np230 #eg191,body.np230 #app [onclick*="navigate('pricing')"],body.np230 .bnav [onclick*="pricing"]{display:none!important}
  #up230{position:fixed;bottom:1rem;left:50%;transform:translateX(-50%);z-index:50000;width:min(460px,92vw);background:var(--card);border:2px solid var(--accent);border-radius:16px;padding:.7rem .9rem;box-shadow:0 12px 30px rgba(0,0,0,.2);display:flex;flex-direction:column;gap:.3rem}.pb230{height:12px;border-radius:999px;background:var(--bg);overflow:hidden}.pb230 i{display:block;height:100%;background:var(--accent);transition:width .3s}
  `);
})();
