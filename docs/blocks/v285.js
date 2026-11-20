/* ================= v285: تجربة موبايل وتابلت حقيقية (طلب المالك 20/11) — على الموبايل: شريط علوي صغير (اللوجو + بحث + إشعارات + ☰) وكل روابط الشريط والأدوات في قائمة جانبية مرتبة صف صف بخط كامل من غير تقطيع · الشريط السفلي ثابت ومعاه «المزيد» · أزرار المالك العائمة اتجمعت في القائمة بدل ما تغطي الصفحة · النوافذ بقت Bottom Sheet · الجداول بتتحول لكروت · الأزرار مقاس اللمس (44px) · أقسام الرئيسية شريط يتسحب بالعرض · على التابلت: الشريط صف واحد يتسحب بالعرض من غير تقطيع الكلام، والكروت عمودين/تلاتة ================= */
(function () {
  const FF = k => { try { return window.ff254(k); } catch (e) { return true; } };
  const AR = () => state.lang === "ar"; const T = (a, e) => AR() ? a : e;
  const css = s => document.head.insertAdjacentHTML("beforeend", `<style>${s}</style>`);
  const E = s => String(s == null ? "" : s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const own = () => { try { return realRole() === "owner"; } catch (e) { return false; } };
  const dev = () => innerWidth <= 760 ? "m" : innerWidth <= 1100 ? "t" : "d";
  window.dev285 = dev;

  /* ---------- الجهاز على الـ body ---------- */
  function mark() { const on = FF("v285.mob"); const d = dev(); const b = document.body; if (!b) return;
    b.classList.toggle("x285", on); b.classList.toggle("m285", on && d === "m"); b.classList.toggle("t285", on && d === "t"); b.classList.toggle("d285", on && d === "d");
    b.classList.toggle("tp285", on && d === "t" && innerHeight > innerWidth); b.dataset.dev = d; }
  addEventListener("resize", () => { mark(); fix(); }); addEventListener("orientationchange", () => setTimeout(() => { mark(); fix(); }, 200));

  /* ---------- الألوان والقياسات (CSS) ---------- */
  const FLOAT = "#ctl113,#fl268,#h207-tools,#pb178,#lk187,#sim189,#ed189b,#vb252,#dr212b,#tbb209,#zn215,#rope268,.pin268,.fb271,#ed158b,.tbtn169,.rail185,.tab201-tools,#tab201-tools,.hd186-handle,.sd152,#sd152";
  css(`
  /* ===== عام لكل الأجهزة: الكلام مايتقطعش حرف حرف ===== */
  body.x285 .t264,body.x285 .bnav a span,body.x285 .tb275 button,body.x285 .ch275 b,body.x285 .fh276 b{word-break:normal!important;overflow-wrap:normal!important;hyphens:none!important}
  body.x285 #app p,body.x285 #app li,body.x285 #app h1,body.x285 #app h2,body.x285 #app h3,body.x285 #app td{word-break:normal;overflow-wrap:break-word}
  body.x285 #app img,body.x285 #app video,body.x285 #app iframe{max-width:100%}

  /* ===== الموبايل ===== */
  html body.x285.m285.x285.m285.x285.m285{font-size:15px;-webkit-text-size-adjust:100%}
  html body.x285.m285.x285.m285.x285.m285 #app header.hdr{position:sticky!important;top:0!important;z-index:950!important;padding:0!important;background:color-mix(in srgb,var(--card) 92%,transparent)!important;backdrop-filter:blur(14px);-webkit-backdrop-filter:blur(14px);border-bottom:1px solid var(--line);padding-top:env(safe-area-inset-top)!important}
  html body.x285.m285.x285.m285.x285.m285 #app header.hdr>.wrap{display:flex!important;flex-wrap:nowrap!important;align-items:center!important;gap:.4rem!important;min-height:56px;padding:.35rem .75rem!important;grid-template-columns:none!important}
  html body.x285.m285.x285.m285.x285.m285 #app header.hdr .logo{flex:1;min-width:0;display:flex;align-items:center;gap:.5rem}
  html body.x285.m285.x285.m285.x285.m285 #app header.hdr .logo small{display:none!important}
  html body.x285.m285.x285.m285.x285.m285 #app header.hdr .logo b{font-size:1rem;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;display:block}
  html body.x285.m285.x285.m285.x285.m285 #app header.hdr .logo>i{width:36px!important;height:36px!important;min-width:36px;font-size:1.1rem!important}
  html body.x285.m285.x285.m285.x285.m285 #app header.hdr nav.nav,html body.x285.m285.x285.m285.x285.m285 #app header.hdr .mnav,html body.x285.m285.x285.m285.x285.m285 #app header.hdr .unav,html body.x285.m285.x285.m285.x285.m285 #app header.hdr .dombar,html body.x285.m285.x285.m285.x285.m285 #app .mnav,html body.x285.m285.x285.m285.x285.m285 #app .unav,html body.x285.m285.x285.m285.x285.m285 #app .dombar,html body.x285.m285.x285.m285.x285.m285 .pvbar~.mnav{display:none!important}
  html body.x285.m285.x285.m285.x285.m285 #app header.hdr .tools{display:flex!important;flex-wrap:nowrap!important;gap:.25rem!important;margin:0!important;width:auto!important;flex:0 0 auto}
  html body.x285.m285.x285.m285.x285.m285 #app header.hdr .tools>*{display:none!important}
  html body.x285.m285.x285.m285.x285.m285 #app header.hdr .tools>.k285{display:inline-flex!important}
  html body.x285.m285.x285.m285.x285.m285 #app header.hdr .tools .ibtn{width:42px!important;height:42px!important;min-width:42px!important;border-radius:12px!important;font-size:1.05rem!important;align-items:center;justify-content:center}
  html body.x285.m285.x285.m285.x285.m285 ${FLOAT.split(",").map(s => s.trim()).join(",html body.x285.m285.x285.m285.x285.m285 ")}{display:none!important}
  html body.x285.m285.x285.m285.x285.m285 #app{padding-bottom:calc(76px + env(safe-area-inset-bottom))!important;padding-inline:0!important}
  html body.x285.m285.x285.m285.x285.m285 #app .wrap{padding-inline:14px!important;max-width:100%!important}
  html body.x285.m285.x285.m285.x285.m285 #app .sec{padding-block:.9rem!important}
  html body.x285.m285.x285.m285.x285.m285 #app h1{font-size:1.45rem!important;line-height:1.35!important}
  html body.x285.m285.x285.m285.x285.m285 #app h2{font-size:1.2rem!important;line-height:1.4!important}
  html body.x285.m285.x285.m285.x285.m285 #app h3{font-size:1.05rem!important}
  html body.x285.m285.x285.m285.x285.m285 #app .card{border-radius:16px!important;padding:14px!important}
  html body.x285.m285.x285.m285.x285.m285 #app .btn{min-height:44px;font-size:.95rem!important;border-radius:12px!important}
  html body.x285.m285.x285.m285.x285.m285 #app .btn-sm,html body.x285.m285.x285.m285.x285.m285 #app .btn.xs{min-height:38px}
  html body.x285.m285.x285.m285.x285.m285 #app input:not([type=checkbox]):not([type=radio]):not([type=range]),html body.x285.m285.x285.m285.x285.m285 #app select,html body.x285.m285.x285.m285.x285.m285 #app textarea{font-size:16px!important;min-height:44px}
  html body.x285.m285.x285.m285.x285.m285 #app .row{flex-wrap:wrap}
  html body.x285.m285.x285.m285.x285.m285 .bnav{display:flex!important;height:auto!important;padding:.25rem .15rem calc(.3rem + env(safe-area-inset-bottom))!important;z-index:940!important}
  html body.x285.m285.x285.m285.x285.m285 .bnav a{min-height:52px;justify-content:center;font-size:.7rem!important;min-width:0}
  html body.x285.m285.x285.m285.x285.m285 .bnav a span{white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:100%;display:block}
  html body.x285.m285.x285.m285.x285.m285 .bnav a i{font-size:1.2rem}
  /* الرئيسية: الأقسام شريط يتسحب بالعرض */
  html body.x285.m285.x285.m285.x285.m285 #tr275 .tb275{display:flex!important;flex-wrap:nowrap!important;overflow-x:auto;gap:.45rem!important;padding:.15rem 14px .55rem!important;margin-inline:-14px!important;scroll-snap-type:x proximity;scrollbar-width:none}
  html body.x285.m285.x285.m285.x285.m285 #tr275 .tb275::-webkit-scrollbar{display:none}
  html body.x285.m285.x285.m285.x285.m285 #tr275 .tb275 button{flex:0 0 auto!important;white-space:nowrap!important;min-height:42px;scroll-snap-align:start;width:auto!important}
  html body.x285.m285.x285.m285.x285.m285 #tr275 .gr275{grid-template-columns:1fr!important;gap:.55rem!important}
  html body.x285.m285.x285.m285.x285.m285 #tr275 .ch275,html body.x285.m285.x285.m285.x285.m285 #tr275 .fh276{min-height:52px}
  html body.x285.m285.x285.m285.x285.m285 #tr275 .tg275{min-height:46px}
  html body.x285.m285.x285.m285.x285.m285 .hub [style*="grid-template-columns"],html body.x285.m285.x285.m285.x285.m285 .hub .tiles,html body.x285.m285.x285.m285.x285.m285 .hub .grid{grid-template-columns:repeat(2,minmax(0,1fr))!important}
  html body.x285.m285.x285.m285.x285.m285 #app [style*="grid-template-columns:repeat(3"],html body.x285.m285.x285.m285.x285.m285 #app [style*="grid-template-columns: repeat(3"],html body.x285.m285.x285.m285.x285.m285 #app [style*="grid-template-columns:repeat(4"],html body.x285.m285.x285.m285.x285.m285 #app [style*="grid-template-columns: repeat(4"]{grid-template-columns:repeat(2,minmax(0,1fr))!important}
  /* النوافذ: Bottom Sheet */
  html body.x285.m285.x285.m285.x285.m285 .modal{align-items:flex-end!important;padding:0!important}
  html body.x285.m285.x285.m285.x285.m285 .modal>.card,html body.x285.m285.x285.m285.x285.m285 .modal>div:first-child{width:100%!important;max-width:100%!important;max-height:92dvh!important;border-radius:20px 20px 0 0!important;margin:0!important;padding-bottom:calc(16px + env(safe-area-inset-bottom))!important;animation:up285 .25s ease}
  html body.x285.m285.x285.m285.x285.m285 .modal>.card::before{content:"";display:block;width:42px;height:5px;border-radius:9px;background:var(--line);margin:-4px auto 10px}
  @keyframes up285{from{transform:translateY(40px);opacity:.4}to{transform:none;opacity:1}}
  /* الجداول: كروت */
  html body.x285.m285.x285.m285.x285.m285 #app table.c285,html body.x285.m285.x285.m285.x285.m285 #app table.c285 tbody,html body.x285.m285.x285.m285.x285.m285 #app table.c285 tr,html body.x285.m285.x285.m285.x285.m285 #app table.c285 td{display:block;width:100%!important}
  html body.x285.m285.x285.m285.x285.m285 #app table.c285 thead{display:none}
  html body.x285.m285.x285.m285.x285.m285 #app table.c285 tr{border:1px solid var(--line);border-radius:14px;padding:.5rem .75rem;margin:0 0 .6rem;background:var(--card)}
  html body.x285.m285.x285.m285.x285.m285 #app table.c285 td{border:0!important;padding:.3rem 0!important;display:flex;justify-content:space-between;gap:.75rem;text-align:start}
  html body.x285.m285.x285.m285.x285.m285 #app table.c285 td[data-l285]::before{content:attr(data-l285);font-weight:700;color:var(--muted);flex:0 0 auto;max-width:45%}
  html body.x285.m285.x285.m285.x285.m285 #app .tblwrap,html body.x285.m285.x285.m285.x285.m285 #app [style*="overflow-x:auto"]{-webkit-overflow-scrolling:touch}

  /* ===== التابلت ===== */
  html body.x285.t285.x285.t285.x285.t285 #app header.hdr nav.nav{display:flex!important;flex-wrap:nowrap!important;overflow-x:auto!important;gap:.3rem!important;grid-template-columns:none!important;scrollbar-width:thin;padding-bottom:.25rem}
  html body.x285.t285.x285.t285.x285.t285 #app header.hdr nav.nav>a{flex:0 0 auto!important;width:auto!important;min-width:0!important;flex-direction:row!important;align-items:center!important;gap:.35rem!important;white-space:nowrap!important;padding:.45rem .7rem!important;min-height:44px;height:auto!important}
  html body.x285.t285.x285.t285.x285.t285 #app header.hdr nav.nav>a .t264{white-space:nowrap!important;font-size:.88rem!important}
  html body.x285.t285.x285.t285.x285.t285 #app header.hdr .tools{flex-wrap:wrap;gap:.3rem}
  html body.x285.t285.x285.t285.x285.t285 #app .btn{min-height:42px}
  html body.x285.t285.x285.t285.x285.t285 #tr275 .gr275{grid-template-columns:repeat(2,minmax(0,1fr))!important}
  html body.x285.t285.x285.t285.x285.t285.tp285 #app [style*="grid-template-columns:repeat(4"],html body.x285.t285.x285.t285.x285.t285.tp285 #app [style*="grid-template-columns: repeat(4"]{grid-template-columns:repeat(2,minmax(0,1fr))!important}
  html body.x285.t285.x285.t285.x285.t285 .modal>.card{max-width:min(40rem,92vw)!important}

  /* ===== القائمة الجانبية (Drawer) ===== */
  #dr285{position:fixed;inset:0;z-index:2000;display:none}
  #dr285.on{display:block}
  #dr285 .bg{position:absolute;inset:0;background:rgba(0,0,0,.45);animation:fd285 .2s}
  #dr285 .pn{position:absolute;top:0;bottom:0;inset-inline-start:0;width:min(86vw,360px);background:var(--card);box-shadow:0 0 40px rgba(0,0,0,.25);display:flex;flex-direction:column;animation:sl285 .25s cubic-bezier(.2,.8,.2,1);padding-top:env(safe-area-inset-top)}
  [dir=rtl] #dr285 .pn{animation-name:slr285}
  #dr285 .hd{display:flex;align-items:center;gap:.6rem;padding:.9rem 1rem;border-bottom:1px solid var(--line)}
  #dr285 .hd b{flex:1;font-size:1.05rem}
  #dr285 .hd button{width:42px;height:42px;border-radius:12px;border:1px solid var(--line);background:transparent;font-size:1.1rem;color:var(--text)}
  #dr285 .bd{overflow:auto;flex:1;padding:.5rem .5rem calc(1rem + env(safe-area-inset-bottom))}
  #dr285 .gt{font-size:.75rem;color:var(--muted);font-weight:700;padding:.7rem .7rem .3rem}
  #dr285 .it{display:flex;align-items:center;gap:.75rem;width:100%;min-height:48px;padding:.55rem .75rem;border:0;background:transparent;border-radius:12px;color:var(--text);font:inherit;font-size:.98rem;text-align:start;cursor:pointer;text-decoration:none}
  #dr285 .it:hover,#dr285 .it:active{background:color-mix(in srgb,var(--accent) 10%,transparent)}
  #dr285 .it .ic{width:28px;text-align:center;font-size:1.15rem;flex:0 0 28px}
  #dr285 .it .lb{flex:1;white-space:normal;word-break:normal;line-height:1.35}
  #dr285 .it.cur{background:color-mix(in srgb,var(--accent) 14%,transparent);font-weight:700}
  #dr285 .it.gold{color:#b45309}
  @keyframes fd285{from{opacity:0}}@keyframes sl285{from{transform:translateX(-100%)}}@keyframes slr285{from{transform:translateX(100%)}}
  `);

  /* ---------- الهيدر على الموبايل: نسيب أهم الأزرار ---------- */
  function keepTools() { const tl = document.querySelector("#app header.hdr .tools"); if (!tl) return;
    [...tl.children].forEach(c => { const t = (c.textContent || "") + " " + (c.title || "") + " " + (c.innerHTML || ""); const k = c.classList.contains("burger") || /🔍|fa-magnifying|fa-search/.test(t) || (c.tagName === "SPAN" && c.classList.contains("keep219") && c.querySelector("button")) || /fa-bell/.test(c.innerHTML) || /تسجيل الدخول|Log in|دخول/.test(c.textContent || "") && !state.auth.user;
      c.classList.toggle("k285", !!k); });
    const bg = tl.querySelector(".burger"); if (bg && !bg.__b285) { bg.__b285 = 1; bg.addEventListener("click", e => { if (!document.body.classList.contains("m285")) return; e.preventDefault(); e.stopImmediatePropagation(); dr.open(); }, true); } }

  /* ---------- الجداول → كروت ---------- */
  function tables() { if (!document.body.classList.contains("m285")) return; document.querySelectorAll("#app table:not(.c285):not(.n285)").forEach(t => { const rows = t.querySelectorAll("tr"); if (rows.length < 2) return; const hs = [...(t.querySelectorAll("thead th").length ? t.querySelectorAll("thead th") : t.rows[0].querySelectorAll("th"))].map(h => h.textContent.trim()); if (!hs.length || hs.length < 3) { t.classList.add("n285"); return; } t.classList.add("c285"); t.querySelectorAll("tbody tr, tr").forEach(r => { if (r.querySelector("th") && !r.querySelector("td")) { r.style.display = "none"; return; } [...r.children].forEach((td, i) => { if (td.tagName === "TD" && hs[i] && !td.dataset.l285) td.dataset.l285 = hs[i]; }); }); }); }

  /* ---------- الشريط السفلي: «المزيد» ---------- */
  function bnav() { if (!document.body.classList.contains("m285")) return; document.querySelectorAll(".bnav").forEach((n, i, all) => { if (i < all.length - 1) { n.style.display = "none"; return; } if (n.querySelector(".mo285")) return; const items = n.querySelectorAll("a"); if (items.length >= 5) { const last = items[items.length - 1]; if (!/fa-gear|fa-user|fa-bars/.test(last.innerHTML)) {} }
    n.insertAdjacentHTML("beforeend", `<a href="#" class="mo285" onclick="dr285.open();return false"><i class="fa-solid fa-bars"></i><span>${T("المزيد", "More")}</span></a>`); if (n.querySelectorAll("a").length > 5) { const a = [...n.querySelectorAll("a:not(.mo285)")]; a.slice(4).forEach(x => x.style.display = "none"); } }); }

  /* ---------- القائمة الجانبية ---------- */
  const lbl = el => { const t = el.querySelector(".t264"); let s = (t ? t.textContent : "") || el.getAttribute("title") || el.getAttribute("aria-label") || el.textContent || ""; s = s.replace(/\s+/g, " ").trim(); return s; };
  const ico = el => { const i = el.querySelector(".i264"); if (i) return E(i.textContent.trim()); const fa = el.querySelector("i[class*=fa-]"); if (fa) return `<i class="${E(fa.className)}"></i>`; const m = (el.textContent || "").trim().match(/^(\p{Extended_Pictographic}[️‍\p{Extended_Pictographic}]*)/u); return m ? m[1] : "•"; };
  let REF = [];
  const dr = window.dr285 = {
    open() { let d = document.getElementById("dr285"); if (!d) { d = document.createElement("div"); d.id = "dr285"; document.body.appendChild(d); } REF = []; const row = (el, cls) => { const L = lbl(el); if (!L) return ""; REF.push(el); return `<button class="it ${cls || ""}" onclick="dr285.go(${REF.length - 1})"><span class="ic">${ico(el)}</span><span class="lb">${E(L.replace(/^\p{Extended_Pictographic}[️‍]*\s*/u, ""))}</span></button>`; };
      const nav = [...document.querySelectorAll("#app header.hdr nav.nav > a")]; const pub = nav.filter(a => !a.classList.contains("u261")), mine = nav.filter(a => a.classList.contains("u261"));
      const tools = [...document.querySelectorAll("#app header.hdr .tools > *")].filter(c => !c.classList.contains("burger") && !c.classList.contains("tbtn169") && c.tagName !== "SELECT" && c.tagName !== "SPAN");
      const sel = document.querySelector("#app header.hdr .tools > select");
      const fl = own() ? FLOAT.split(",").map(s => document.querySelector(s.trim())).filter(e => e && e.id && !/fl268|rope268|tbb209|zn215|h207-tools/.test(e.id)) : [];
      const prof = state.auth && state.auth.profile; const nm = prof && (prof.full_name || prof.name) || "";
      d.innerHTML = `<div class="bg" onclick="dr285.close()"></div><div class="pn" role="dialog" aria-modal="true"><div class="hd"><b>${nm ? "👋 " + E(nm) : T("أكاديمية إتقان", "Itqan Academy")}</b><button onclick="dr285.close()" aria-label="${T("إغلاق", "Close")}">✕</button></div><div class="bd">
        ${mine.length ? `<div class="gt">${T("حسابي", "My account")}</div>${mine.map(a => row(a)).join("")}` : ""}
        <div class="gt">${T("الأكاديمية", "Academy")}</div>${pub.map(a => row(a, a.classList.contains("gold") ? "gold" : "")).join("")}
        <div class="gt">${T("الإعدادات والأدوات", "Settings & tools")}</div>${tools.map(b => row(b)).join("")}
        ${sel ? `<div class="it"><span class="ic">👁️</span><span class="lb"><select onchange="var s=document.querySelector('#app header.hdr .tools > select');s.value=this.value;s.dispatchEvent(new Event('change',{bubbles:true}));dr285.close()" style="width:100%">${[...sel.options].map(o => `<option value="${E(o.value)}" ${o.selected ? "selected" : ""}>${E(o.text)}</option>`).join("")}</select></span></div>` : ""}
        ${fl.length ? `<div class="gt">${T("أدوات المالك", "Owner tools")}</div>${fl.map(b => row(b)).join("")}` : ""}
      </div></div>`; d.classList.add("on"); document.documentElement.style.overflow = "hidden"; },
    go(i) { const el = REF[i]; dr.close(); if (el) setTimeout(() => el.click(), 30); },
    close() { const d = document.getElementById("dr285"); if (d) d.classList.remove("on"); document.documentElement.style.overflow = ""; }
  };
  addEventListener("keydown", e => { if (e.key === "Escape") dr.close(); });
  addEventListener("popstate", () => dr.close());

  /* ---------- الرئيسية: أهلًا بك + الأقسام أول حاجة تحت الهيدر ---------- */
  function homeTop() { if (state.route !== "home" || !FF("v285.top")) return; const app = document.getElementById("app"); if (!app) return; const wl = app.querySelector(":scope > #wl283"), tr = app.querySelector(":scope > #tr275"); if (!wl || !tr) return;
    const first = [...app.children].find(e => e.tagName === "SECTION"); if (first && first !== wl) first.before(wl); if (wl.nextElementSibling !== tr) wl.after(tr); }

  function fix() { try { homeTop(); } catch (e) {} if (!FF("v285.mob")) return; try { keepTools(); tables(); bnav(); } catch (e) { console.warn("v285", e); } }
  const _r = render; render = function () { const o = _r.apply(this, arguments); try { mark(); fix(); } catch (e) {} return o; };
  let q = 0; new MutationObserver(ms => { if (q) return; if (!ms.some(m => m.target.id === "app" || (m.target.closest && m.target.closest("#app")))) return; q = 1; setTimeout(() => { q = 0; fix(); }, 120); }).observe(document.documentElement, { childList: true, subtree: true });
  mark(); setTimeout(() => { mark(); fix(); }, 300);
})();
