/* ================= v283: طلب المالك 20/11 العصر — (1) الرئيسية: «أهلًا بك» والاسم بس فوق، وتحتها الأقسام علطول، وبعدين باقي لوحة الطالب · شريط أقسام المحتوى اللي في اللوحة اتشال · (2) كل صفحة ليها لينك حقيقي (#/route/...) — الرجوع بيرجع لنفس الصفحة، وأزرار الأقسام بقت لينكات تتفتح في تاب جديد بكليك يمين · (3) الهيدر: اللوجو بس هو اللي بيفضل ظاهر وانت نازل، والباقي مكانه فوق · الشريط الرئيسي رجع بسهمه: بالمرور عليه يتفتح ولما الماوس يبعد يتقفل، وبالضغط يفضل مفتوح · (4) مصدر التسجيل (مايك/صوت الجهاز) للمالك والمعلم في كل مكان فيه تسجيل طبقة الصوت، والطالب مايك بس · (5) اللهجات (الخليجي/الفلسطيني) اتشالت من الموقع كله ================= */
(function () {
  const FF = k => { try { return window.ff254(k); } catch (e) { return true; } };
  const AR = () => state.lang === "ar"; const T = (a, e) => AR() ? a : e;
  const css = s => document.head.insertAdjacentHTML("beforeend", `<style>${s}</style>`);
  const staff = () => { try { const r = realRole(); return r === "owner" || r === "teacher"; } catch (e) { return false; } };

  /* ---------- (1) الرئيسية ---------- */
  function home() { if (state.route !== "home" || !FF("v283.home")) return; const app = document.getElementById("app"); if (!app) return; const hub = app.querySelector(":scope > section.hub"); const tr = app.querySelector(":scope > #tr275");
    let wl = app.querySelector(":scope > #wl283"); const row = hub && hub.querySelector(".wrap > .row");
    if (row && !wl) { wl = document.createElement("section"); wl.id = "wl283"; wl.className = "sec"; wl.innerHTML = `<div class="wrap"></div>`; wl.firstChild.appendChild(row); row.querySelectorAll("a.btn").forEach(a => a.remove()); }
    if (wl && tr) { if (tr.previousElementSibling !== wl) tr.before(wl); if (hub && tr.nextElementSibling !== hub) tr.after(hub); }
    app.querySelectorAll(".hub .dmtools").forEach(e => e.remove()); }
  css(`#wl283{padding:.6rem 0 0}#wl283 .row{margin:0}#wl283 h2{margin:0}`);

  /* ---------- (2) اللينكات ---------- */
  const want = () => { const r = state.route || "home"; let a = typeof state.pageArg === "string" ? state.pageArg : ""; if (!a && r === "library" && state.libSec) a = state.libSec; if (!a && ["track-detail", "cert", "verify"].includes(r) && state.track) a = state.track; return "#/" + r + (a ? "/" + encodeURIComponent(a).replace(/%2F/g, "/") : ""); };
  let syncing = 0;
  function sync() { if (!FF("v283.links") || syncing) return; const w = want(); const cur = location.hash || ""; if (cur === w || cur.startsWith(w + "/") || (w === "#/home" && cur === "")) return; const seg = s => s.replace(/^#\/?/, "").split(/[/?]/)[0]; if (seg(cur) === seg(w) && !state.pageArg && !(state.route === "library" && state.libSec)) return; try { history.pushState(null, "", w); } catch (e) {} }
  if (typeof readHash === "function") { const _h = readHash; readHash = function () { const was = syncing; syncing = 1; try { const r = _h.apply(this, arguments); const p = (location.hash || "").replace(/^#\/?/, "").split("/"); if (!p[0]) { state.route = "home"; state.pageArg = null; } if (p[0] === "library" && p[1]) { state.route = "library"; state.libSec = decodeURIComponent(p[1]); } else if (p[0] && p[0] !== state.route && Array.isArray(window.PAGES16) && PAGES16.includes(p[0])) { state.route = p[0]; state.pageArg = p[1] ? decodeURIComponent(p[1]) : null; } else if (p[0] && p[0] === state.route && p[1] && state.pageArg == null && Array.isArray(window.PAGES16) && PAGES16.includes(p[0])) state.pageArg = decodeURIComponent(p[1]); return r; } finally { syncing = was; } }; }
  addEventListener("popstate", () => { syncing = 1; setTimeout(() => { syncing = 0; }, 400); }, true);
  const hrefOf = go => { let m; if ((m = /go16\('([^']+)'(?:\s*,\s*'([^']+)')?\)/.exec(go))) return "#/" + m[1] + (m[2] ? "/" + m[2] : ""); if ((m = /navigate\('([^']+)'\)/.exec(go))) return "#/" + m[1]; if ((m = /libGo\('([^']+)'\)/.exec(go))) return "#/library/" + m[1]; if ((m = /t260\.open\('([^']+)'\)/.exec(go))) { try { const t = t260.ALL()[m[1]]; if (t && /^#\//.test(t.go)) return t.go; } catch (e) {} } return null; };
  function linkify() { document.querySelectorAll("#app button.tg275:not([data-l283]), #app button.uc280:not([data-l283])").forEach(b => { b.dataset.l283 = 1; const go = b.getAttribute("onclick") || ""; const h = hrefOf(go); if (!h) return; const a = document.createElement("a"); a.className = b.className; a.href = h; a.innerHTML = b.innerHTML; a.dataset.l283 = 1; a.setAttribute("onclick", `if(event.ctrlKey||event.metaKey||event.shiftKey||event.button===1)return true;event.preventDefault();${go}`); b.replaceWith(a); }); }
  css(`a.tg275,a.uc280{text-decoration:none;color:inherit}`);

  /* ---------- (3) الهيدر ---------- */
  css(`html body #rope268{display:flex!important}
  html body #app header.hdr{position:relative!important;top:auto!important}
  html body #fl268 .p268:not(.p268-logo){display:none!important}
  html body.nc268.hv283 #app header.hdr nav.nav{display:flex!important}`);
  document.addEventListener("mouseover", e => { if (!FF("v283.nav")) return; const r = e.target.closest && e.target.closest("#rope268"); if (r && document.body.classList.contains("nc268")) document.body.classList.add("hv283"); }, true);
  document.addEventListener("mouseout", e => { if (!document.body.classList.contains("hv283")) return; const h = document.querySelector("#app header.hdr"); const to = e.relatedTarget; if (h && to && h.contains(to)) return; document.body.classList.remove("hv283"); }, true);
  document.addEventListener("click", e => { if (e.target.closest && e.target.closest("#rope268")) document.body.classList.remove("hv283"); }, true);

  /* ---------- (4) مصدر التسجيل للمالك والمعلم ---------- */
  function srcBars() { if (!staff()) return; document.querySelectorAll("#app [onclick*=\"vrRecord('low')\"]").forEach(b => { const box = b.closest(".card") || b.parentElement; if (!box || box.querySelector(".src179")) return; let src = "mic"; try { src = localStorage.getItem("itqan_src179") || "mic"; } catch (e) {}
      box.insertAdjacentHTML("afterbegin", `<div class="src179"><span class="xs muted">${T("التسجيل من:", "Record from:")}</span><button class="${src === "mic" ? "on" : ""}" onclick="src179('mic')">🎤 ${T("المايك (صوتي)", "Microphone (me)")}</button><button class="${src === "sys" ? "on" : ""}" onclick="src179('sys')">🖥️ ${T("صوت الجهاز (الطالب في الحصة)", "Device audio (student in class)")}</button></div>`); }); }

  /* ---------- (5) اللهجات ---------- */
  const DIA = /الخليجي|الخليجية|الفلسطيني|الفلسطينية|اللهجات|Gulf|Palestinian|Dialects/;
  function noDialects() { if (!FF("v283.nodia")) return; document.querySelectorAll("#app [onclick*=\"lang','gu'\"], #app [onclick*=\"lang','pa'\"], #app [onclick*=\"'gu'\"], #app [onclick*=\"'pa'\"]").forEach(e => e.remove());
    document.querySelectorAll("#app button, #app a, #app option, #app .chip").forEach(e => { if (e.children.length > 3) return; if (DIA.test(e.textContent || "") && (e.textContent || "").length < 60) e.remove(); }); }

  const _r = render; render = function () { const o = _r.apply(this, arguments); try { home(); sync(); linkify(); srcBars(); noDialects(); } catch (e) { console.warn("v283", e); } return o; };
  let q = 0; new MutationObserver(() => { if (q) return; q = 1; requestAnimationFrame(() => { q = 0; try { home(); linkify(); srcBars(); noDialects(); } catch (e) {} }); }).observe(document.documentElement, { childList: true, subtree: true });
})();
