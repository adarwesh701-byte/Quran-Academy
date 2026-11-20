/* ================= v288: طلب المالك 20/11 العصر — (1) لينكات بأسماء احترافية: بدل ‎#/hifzt‎ بقت ‎/Memorization-Tracker‎ وبدل ‎#/mq179/rast‎ بقت ‎/Maqam_Rast‎ — كل صفحة ليها لينك مقروء، الرجوع والفتح في تاب جديد شغالين، واللينكات القديمة لسه بتفتح · (2) شريطين جانبيين بس (يمين وشمال) بنفس شكل الشريط القديم: أيقونة وتحتها اسم صغير في النص — مقفولين افتراضيًا كظل على الحافة بسهم، بالضغط يطلع الشريط ويزق المحتوى (مفيش حاجة فوق حاجة) · اليمين: أقسام الموقع · الشمال: كل الأيقونات العايمة اللي كانت لوحدها (اللغة والعرض، الأدوات، منشئ التجربة، وضع الحصة، الخطوط، ثبات الهيدر، المساعد الذكي) · المالك يتحكم: يضيف أيقونة باسم ولينك، يغيّر/يرتّب/ينقل/يخفي، لمين يظهر، مفتوح ولا مقفول افتراضيًا، مكانه، وهل يظهر على التابلت — ومش بيظهروا على الموبايل ================= */
(function () {
  const FF = k => { try { return window.ff254(k); } catch (e) { return true; } };
  const AR = () => { try { return state.lang === "ar"; } catch (e) { return true; } }; const T = (a, e) => AR() ? a : e;
  const css = s => document.head.insertAdjacentHTML("beforeend", `<style>${s}</style>`);
  const E = s => String(s == null ? "" : s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const J = o => JSON.parse(JSON.stringify(o));
  const own = () => { try { return realRole() === "owner"; } catch (e) { return false; } };

  /* ================= 1) اللينكات الاحترافية ================= */
  const S = { tracks: "Courses", "track-detail": "Course", library: "Library", pricing: "Pricing", about: "About", contact: "Contact", booking: "Book-Trial", login: "Login", signup: "Sign-Up", dashboard: "Dashboard", pay: "Payment", cert: "Certificate", verify: "Verify", policy: "Policy", profile: "Profile", teach: "Teach-With-Us", progress: "Progress", calc274: "Calculator", abyb280: "Arabic-Between-Your-Hands", xb286: "Experience-Builder", ce293: "Curriculum",
    tools: "Tools", hifz: "Memorization", tuner: "Tuner", "maqam-game": "Maqam-Game", sponsor: "Sponsor", khatma: "Family-Khatma", placement: "Placement-Test", maqamat: "Maqamat", competitions: "Competitions", competition: "Competition", d: "Daily", growth: "Growth", invite: "Invite-Friends", guide: "Site-Guide", lang: "Languages", plan: "Study-Plan", hifzt: "Memorization-Tracker", links: "Links", prayer: "Prayer-Times", ayahcard: "Ayah-Card", arbaeen: "Forty-Hadith", asma: "Names-of-Allah", org: "Organizations", tasmee: "Recitation", stories: "Quran-Stories", matn: "Mutoon", kit: "Kit", myspace: "My-Space", alltools: "All-Tools", privacy: "Privacy", terms: "Terms", sfile: "Student-File", reading: "Reading", makharij: "Makharij", nahw: "Nahw-Sarf-Balagha", fusha: "Fusha", egyptian: "Egyptian-Arabic", kidsar: "Kids-Arabic", tahwil: "Maqam-Transitions", meet: "Meet", kidsmushaf: "Kids-Mushaf", ilm: "Islamic-Sciences", mqchallenge: "Maqam-Challenge", adhans: "Adhans", qiraat: "Qiraat", adhkar: "Adhkar", display: "Display", nooraniya: "Nooraniya", "verify-email": "Verify-Email", complete: "Complete-Profile", level: "Level", arabiya: "Arabiya", alam: "Islamic-Figures", acl: "Access-Control", studio: "Studio", tjb: "Tajweed", mqc: "Maqam-Course", abyb: "Arabiya-Book", bk: "Books", world: "Sections", today: "Today",
    cp158: "Control-Panel", rec161: "Recordings", office161: "Office", habits168: "Habits", games172: "Games", vow172: "Pledge", badges172: "Badges", journey172: "Journey", lrec177: "Lesson-Recordings", ver178: "Versions", lib178: "Library-Hub", mq179: "Maqam", special179: "Special", layouts180: "Layouts", pdfbooks181: "PDF-Books", pdf181: "PDF", control183: "Control", sitemap183: "Sitemap", history183: "History", social184: "Social", todo186: "Todo", rr186: "Review-Requests", notes186: "Notes", team188: "Team", books192: "Book-Shelf", book192: "Book", bookedit192: "Book-Editor", voice194: "Voice-Lab", map196: "Hifz-Map", me196: "Me", tch196: "Teacher", hw196: "Homework", sub196: "Subscription", org200: "Academy-Plans", price201: "Prices", bar201: "Bars", voice203: "Voice-Studio", ui203: "Interface", pop205: "Style", inv205: "Invites", bars211: "Bar-Styles", all211: "Everything", dr212: "Drafts", look217: "Look", teach218: "Teaching", hub218: "Hub", zakat218: "Zakat", design218: "Design", view219: "View", tasbih219: "Tasbih", log221: "Activity-Log", fc223: "Flashcards", pw223: "Password", cal224: "Calendar", stats224: "Statistics", guard225: "Guardian", ct225: "Contacts", inv225: "Invoices", fin225: "Finance", mfa225: "Security", fam226: "Family", sub226: "Subscriptions", mir226: "Mirror", vt226: "Voice-Test", tf228: "Tafsir", wird233: "Daily-Wird", khatma233: "Khatma-Plan", kamil233: "Complete-Khatma", streak233: "Streak", grp238: "Group-Lessons", qiraat10: "Ten-Qiraat", muslim241: "Muslim-Life", voice242: "Voice", wb243: "Whiteboard", srs244: "Smart-Review", pts244: "Points", life249: "Daily-Life", wb251: "Board", clk251: "Clock", ver254: "Release-Notes", sc255: "Student-Showcase", tools260pw: "Tool-Access", trip260: "Trip", mushaf267: "Mushaf" };
  const REV = {}; Object.entries(S).forEach(([r, s]) => { REV[s.toLowerCase()] = r; });
  const cap = s => s.charAt(0).toUpperCase() + s.slice(1);
  const slugOf = r => S[r] || (REV[r.toLowerCase()] ? r + "-page" : cap(r));
  const encA = a => (/^[a-z][a-z0-9-]*$/.test(a) ? cap(a) : a).replace(/\//g, "~");
  const decA = a => { a = a.replace(/~/g, "/"); return /^[A-Z][a-z0-9-]*$/.test(a) ? a.charAt(0).toLowerCase() + a.slice(1) : a; };
  const toPretty = u => { const m = /#\/?([^?]*)/.exec(String(u)); if (!m) return null; const parts = m[1].split("/"); const r = parts.shift(); if (!r) return "/"; if (r === "home" && !parts.length) return "/"; let a = parts.join("/"); try { a = decodeURIComponent(a); } catch (e) {} return "/" + slugOf(r) + (a ? "_" + encodeURIComponent(encA(a)).replace(/%7E/g, "~") : ""); };
  const fromPath = p => { let seg = String(p || "").replace(/^\/+|\/+$/g, ""); try { seg = decodeURIComponent(seg); } catch (e) {} if (!seg || /\.|\//.test(seg)) return null; const i = seg.indexOf("_"); const sl = i < 0 ? seg : seg.slice(0, i), a = i < 0 ? "" : seg.slice(i + 1); let r = REV[sl.toLowerCase()]; if (!r) { const low = sl.toLowerCase(); let all = []; try { all = (window.PAGES16 || []).concat(typeof HASH_ROUTES !== "undefined" ? HASH_ROUTES : []); } catch (e) {} r = all.find(x => x.toLowerCase() === low) || (/-page$/.test(low) ? low.replace(/-page$/, "") : null); } if (!r) return null; return "#/" + r + (a ? "/" + encodeURIComponent(decA(a)).replace(/%2F/g, "/") : ""); };
  try { const _n = navigate; navigate = function () { try { state.pageArg = null; } catch (e) {} return _n.apply(this, arguments); }; } catch (e) {}
  window.url288 = { toPretty, fromPath, slugOf };
  let POP = 0;
  const ON = () => !POP && FF("v288.urls") && !/[?&]xb=1/.test(location.search) && location.protocol === "https:" && !/\.html$/.test(location.pathname);
  const H = { push: history.pushState.bind(history), rep: history.replaceState.bind(history) };
  const curPretty = () => location.hash && location.hash.startsWith("#/") ? toPretty(location.hash) : location.pathname;
  if (ON()) {
    history.pushState = function (s, t, u) { if (typeof u === "string" && /#\//.test(u) && ON()) { const p = toPretty(u); if (p) { return p === curPretty() ? H.rep(s, t, p) : H.push(s, t, p); } } return H.push(s, t, u); };
    history.replaceState = function (s, t, u) { if (typeof u === "string" && /#\//.test(u) && ON()) { const p = toPretty(u); if (p) return H.rep(s, t, p); } return H.rep(s, t, u); };
    // عند الفتح: لو اللينك مقروء نحوّله لشكل التطبيق الداخلي عشان التشغيل يقراه، وبعد أول عرض نرجّعه مقروء
    const boot = fromPath(location.pathname); if (boot && !location.hash) { H.rep(history.state, "", "/" + boot); POP = 1; setTimeout(() => { POP = 0; pretty(); }, 1500); }
    // الرجوع/التقدّم: قبل ما الموقع يقرا العنوان نحوّله، وبعدها نرجّعه
    (window.__pop288 = window.__pop288 || []).push(() => { POP = 0; try { state.pageArg = null; } catch (e) {} if (!location.hash) { const h = fromPath(location.pathname); if (h) H.rep(history.state, "", "/" + h); } POP = 1; setTimeout(() => { POP = 0; pretty(); }, 30); });
  }
  function pretty() { if (!ON()) return; if (location.hash && location.hash.startsWith("#/")) { const p = toPretty(location.hash); if (p && p !== location.pathname + location.hash) H.rep(history.state, "", p); }
    document.querySelectorAll('#app a[data-l283][href^="#/"], #rl288 a[href^="#/"], #rr288 a[href^="#/"]').forEach(a => { const p = toPretty(a.getAttribute("href")); if (p) a.setAttribute("href", p); }); }
  window.go288 = u => { u = String(u || "").trim(); if (!u) return; if (/^https?:\/\//.test(u)) return void window.open(u, "_blank", "noopener"); let h = u.startsWith("#/") ? u : u.startsWith("/") ? (fromPath(u) || "#/home") : "#/" + u; const p = h.replace(/^#\/?/, "").split("/"); const r = p[0] || "home", a = p.slice(1).join("/"); try { if (r === "library" && a && typeof libGo === "function") return libGo(decodeURIComponent(a)); if ((window.PAGES16 || []).includes(r)) return go16(r, a ? decodeURIComponent(a) : undefined); navigate(r); } catch (e) { location.href = "/" + h; } };

  /* ================= 2) الشريطين الجانبيين ================= */
  const SEC = [["quran", "📖", "القرآن", "Quran"], ["qiraat", "📜", "القراءات", "Qira'at"], ["maqamat", "🎼", "الصوت والمقامات", "Voice & Maqamat"], ["arabic", "✍️", "العربي", "Arabic"], ["sciences", "📚", "العلوم الإسلامية", "Islamic sciences"], ["class", "🎥", "الفصل والحصص", "Classroom"], ["comp", "🏆", "المسابقات", "Competitions"], ["life", "🕌", "حياة المسلم", "Muslim life"]];
  const AUTO = {
    home: { ic: "🏠", ar: "الرئيسية", en: "Home", go: "home" },
    pricing: { ic: "💳", ar: "الأسعار", en: "Pricing", go: "pricing" },
    myspace: { ic: "👤", ar: "مساحتي", en: "My space", go: "myspace", need: () => { try { return !!state.auth.user; } catch (e) { return false; } } },
    lang: { ic: "🌐", ar: "اللغة والعرض", en: "Language", run: () => { const b = document.getElementById("ctl113"); b && b.click(); }, need: () => !!document.getElementById("ctl113") },
    tools: { ic: "🧰", ar: "الأدوات", en: "Tools", run: () => { try { bar201.tog("tools"); } catch (e) { const b = document.getElementById("tab201-tools") || document.getElementById("h207-tools"); b && b.click(); } }, need: () => !!document.getElementById("sd152") },
    wb: { ic: "🧑‍🏫", ar: "السبورة", en: "Whiteboard", run: () => wb290.open(), need: () => !!window.wb290 },
    builder: { ic: "🎨", ar: "منشئ التجربة", en: "Builder", run: () => xb286.open(), need: () => own() && window.xb286 && ((state.settings || {}).ctl286 !== "old") },
    ctl: { ic: "🛠️", ar: "وضع الحصة", en: "Class mode", run: () => { const b = document.getElementById("lk187"); b && b.click(); }, need: () => !!document.getElementById("lk187") },
    fonts: { ic: "🔤", ar: "الخطوط", en: "Fonts", run: () => { try { ft271.open(); } catch (e) {} }, need: () => !!document.querySelector(".fb271") },
    pin: { ic: "📌", ar: "ثبات الهيدر", en: "Header", run: () => { try { hd268.cfg(); } catch (e) {} }, need: () => !!document.querySelector(".pin268") },
    ai: { ic: "🤖", ar: "المساعد الذكي", en: "AI assistant", run: () => { state.aiOpen = !state.aiOpen; render(); }, need: () => !!document.querySelector(".ai-widget") }
  };
  SEC.forEach(([id, ic, ar, en]) => { AUTO["s_" + id] = { ic, ar, en, run: () => { navigate("home"); setTimeout(() => { try { tr277.tab(id); } catch (e) {} const s = document.getElementById("tr275"); s && s.scrollIntoView({ behavior: "smooth", block: "start" }); }, 250); } }; });
  const DEF = () => ({ open: false, tablet: true, pos: "center", r: { items: ["home"].concat(SEC.map(s => "s_" + s[0])).concat(["pricing", "myspace"]).map(k => ({ k })) }, l: { items: ["lang", "wb", "tools", "builder", "ctl", "ai", "fonts", "pin"].map(k => ({ k })) } });
  const CFG = () => { const c = (state.settings || {}).rails288; return c && c.r && c.l ? c : DEF(); };
  const roleNow = () => { try { if (!state.auth.user) return "guest"; const r = realRole(); return r === "owner" && state.preview ? state.preview : (r || "student"); } catch (e) { return "student"; } };
  const ROLES = { owner: ["المالك", "Owner"], admin: ["المشرفين", "Admins"], teacher: ["المعلمين", "Teachers"], student: ["الطلاب", "Students"], guest: ["الزوار", "Visitors"] };
  const rn = k => (ROLES[k] || [k])[AR() ? 0 : 1] || k;
  let OPEN = { l: null, r: null }; try { const o = JSON.parse(sessionStorage.getItem("rails288") || "{}"); OPEN = Object.assign(OPEN, o); } catch (e) {}
  const isOpen = s => OPEN[s] == null ? !!CFG().open : !!OPEN[s];
  const resolve = it => { const a = it.k ? AUTO[it.k] : null; if (it.k && !a) return null; if (a && a.need && !a.need()) return null; if (it.roles && it.roles.length && !it.roles.includes(roleNow())) return null; return { ic: it.ic || (a && a.ic) || "⭐", lb: it.lb || (a ? (AR() ? a.ar : a.en) : ""), go: it.go || (a && a.go) || "", run: !it.go && a && a.run }; };
  let RUNS = [];
  function tile(x, i) { const href = x.go ? (/^https?:/.test(x.go) ? x.go : (ON() ? (x.go.startsWith("/") ? x.go : toPretty("#/" + x.go)) : "#/" + x.go)) : "#"; const img = /^(https?:|data:|\/)/.test(x.ic) && /\.(png|jpe?g|webp|svg|gif)|^data:/.test(x.ic);
    return `<a class="t288" href="${E(href)}" ${/^https?:/.test(x.go) ? 'target="_blank" rel="noopener"' : ""} onclick="if(event.ctrlKey||event.metaKey||event.shiftKey||event.button===1)return true;event.preventDefault();rails288.run(${i})" title="${E(x.lb)}"><span class="i288">${img ? `<img src="${E(x.ic)}" alt="">` : E(x.ic)}</span><b>${E(x.lb)}</b></a>`; }
  function build() { const on = FF("v288.rails") && innerWidth > 760 && (CFG().tablet !== false || innerWidth > 1100) && !document.getElementById("xb286") && !/[?&]xb=1/.test(location.search) === true;
    const b = document.body; if (!b) return; b.classList.toggle("rails288", !!on); ["l", "r"].forEach(s => { let el = document.getElementById("r" + s + "288"); if (!on) { el && el.remove(); b.classList.remove("ro" + s + "288"); return; }
      const c = CFG(); const its = (c[s].items || []).map(resolve).filter(Boolean); const sig = JSON.stringify([its, isOpen(s), c.pos, own(), AR()]);
      if (!el) { el = document.createElement("aside"); el.id = "r" + s + "288"; el.className = "rail288 " + (s === "l" ? "L" : "R"); document.body.appendChild(el); }
      b.classList.toggle("ro" + s + "288", isOpen(s) && its.length > 0); el.classList.toggle("open", isOpen(s)); el.dataset.pos = c.pos || "center";
      if (el.dataset.sig === sig) return; el.dataset.sig = sig; const base = RUNS.length;
      its.forEach(x => RUNS.push(x));
      el.innerHTML = its.length ? `<button class="h288" onclick="rails288.tog('${s}')" title="${isOpen(s) ? T("اقفل الشريط", "Close bar") : T("افتح الشريط", "Open bar")}" aria-expanded="${isOpen(s)}"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="${(s === "l") === isOpen(s) ? "M15 18l-6-6 6-6" : "M9 18l6-6-6-6"}"/></svg></button><div class="p288">${its.map((x, i) => tile(x, base + i)).join("")}${own() ? `<a class="t288 cfg" href="#" onclick="event.preventDefault();rails288.edit()" title="${T("تحكّم في الشرايط", "Customize bars")}"><span class="i288">⚙️</span><b>${T("تخصيص", "Customize")}</b></a>` : ""}</div>` : "";
      if (RUNS.length > 400) RUNS = RUNS.slice(-200); });
    pretty(); }
  window.rails288 = {
    run(i) { const x = RUNS[i]; if (!x) return; if (x.run) return x.run(); go288(x.go); },
    tog(s) { OPEN[s] = !isOpen(s); try { sessionStorage.setItem("rails288", JSON.stringify(OPEN)); } catch (e) {} const el = document.getElementById("r" + s + "288"); el && (el.dataset.sig = ""); build(); },
    /* ---------- محرر الشرايط (المالك) ---------- */
    W: null,
    edit() { if (!own()) return; rails288.W = J(CFG()); rails288.draw(); },
    draw() { const W = rails288.W; let d = document.getElementById("rd288"); if (!d) { d = document.createElement("div"); d.id = "rd288"; document.body.appendChild(d); }
      const autoOpts = Object.keys(AUTO).map(k => `<option value="${k}">${E(AUTO[k].ic + " " + (AR() ? AUTO[k].ar : AUTO[k].en))}</option>`).join("");
      const side = s => `<div class="col288"><h4>${s === "r" ? T("الشريط اليمين", "Right bar") : T("الشريط الشمال", "Left bar")}</h4>${(W[s].items || []).map((it, i) => { const a = it.k && AUTO[it.k]; return `<div class="row288"><input class="ic" value="${E(it.ic || "")}" placeholder="${E(a ? a.ic : "⭐")}" title="${T("الأيقونة: إيموجي أو رابط صورة", "Icon: emoji or image URL")}" onchange="rails288.set('${s}',${i},'ic',this.value)"><input value="${E(it.lb || "")}" placeholder="${E(a ? (AR() ? a.ar : a.en) : T("الاسم", "Label"))}" onchange="rails288.set('${s}',${i},'lb',this.value)">
        <input value="${E(it.go || "")}" placeholder="${a ? (a.go ? E(a.go) : T("(وظيفته الأصلية)", "(built-in action)")) : T("اللينك: صفحة أو https://", "Link: page or https://")}" onchange="rails288.set('${s}',${i},'go',this.value)" list="pg288">
        <div class="ro288">${Object.keys(ROLES).map(k => `<label><input type="checkbox" ${(it.roles || []).includes(k) ? "checked" : ""} onchange="rails288.role('${s}',${i},'${k}',this.checked)">${rn(k)}</label>`).join("")}</div>
        <div class="bt288"><button onclick="rails288.mv('${s}',${i},-1)">⬆️</button><button onclick="rails288.mv('${s}',${i},1)">⬇️</button><button onclick="rails288.side('${s}',${i})" title="${T("انقله للشريط التاني", "Move to the other bar")}">⇄</button><button onclick="rails288.del('${s}',${i})">🗑️</button></div></div>`; }).join("")}
        <div class="add288"><button onclick="rails288.add('${s}')">➕ ${T("أيقونة جديدة بلينك", "New icon with link")}</button><select onchange="if(this.value){rails288.addK('${s}',this.value);this.value=''}"><option value="">➕ ${T("رجّع أيقونة من الموقع…", "Add a built-in icon…")}</option>${autoOpts}</select></div></div>`;
      const routes = Object.keys(S).map(r => `<option value="${r}">${S[r]}</option>`).join("");
      d.innerHTML = `<div class="bg" onclick="rails288.close()"></div><div class="pn"><h3>🧭 ${T("التحكم في الشريطين الجانبيين", "Side bars")}</h3><p class="sm muted">${T("كل أيقونة: إيموجي أو رابط صورة، واسم صغير تحتها، ولينك يفتح صفحة من الموقع (اكتب اسمها) أو أي لينك https. لو سبت الخانة فاضية بتاخد الأصلي. اختار لمين تظهر (فاضي = الكل).", "Each icon: emoji or image URL, a short label and a link (site page or https). Empty = default. Pick who sees it (none = everyone).")}</p>
        <div class="opt288"><label><input type="checkbox" ${W.open ? "checked" : ""} onchange="rails288.W.open=this.checked"> ${T("مفتوحين افتراضيًا (لو مش متعلّم، بيظهروا كظل على الحافة وبيتفتحوا بالسهم)", "Open by default (otherwise a shadow on the edge that opens with the arrow)")}</label>
          <label><input type="checkbox" ${W.tablet !== false ? "checked" : ""} onchange="rails288.W.tablet=this.checked"> ${T("يظهروا على التابلت كمان (على الموبايل مش بيظهروا عشان مايغطوش المحتوى)", "Show on tablets too (never on phones)")}</label>
          <label>${T("مكانهم:", "Position:")} <select onchange="rails288.W.pos=this.value">${[["top", T("فوق", "Top")], ["center", T("في النص", "Center")], ["bottom", T("تحت", "Bottom")]].map(([k, l]) => `<option value="${k}" ${W.pos === k ? "selected" : ""}>${l}</option>`).join("")}</select></label></div>
        <div class="cols288">${side("l")}${side("r")}</div><datalist id="pg288">${routes}</datalist>
        <div class="row" style="gap:.4rem;margin-top:.8rem;flex-wrap:wrap"><button class="btn btn-p" onclick="rails288.save()">💾 ${T("احفظ للكل", "Save for everyone")}</button><button class="btn btn-o" onclick="rails288.W=JSON.parse(JSON.stringify(rails288.DEF()));rails288.draw()">↺ ${T("رجّع الافتراضي", "Reset to default")}</button><button class="btn btn-o" onclick="rails288.close()">${T("إلغاء", "Cancel")}</button></div></div>`; d.classList.add("on"); },
    DEF, set(s, i, k, v) { const it = rails288.W[s].items[i]; if (v === "") delete it[k]; else it[k] = v; },
    role(s, i, k, on) { const it = rails288.W[s].items[i]; const a = (it.roles || []).filter(x => x !== k); if (on) a.push(k); if (a.length) it.roles = a; else delete it.roles; },
    mv(s, i, n) { const a = rails288.W[s].items, j = i + n; if (j < 0 || j >= a.length) return; a.splice(j, 0, a.splice(i, 1)[0]); rails288.draw(); },
    side(s, i) { const o = s === "l" ? "r" : "l"; rails288.W[o].items.push(rails288.W[s].items.splice(i, 1)[0]); rails288.draw(); },
    del(s, i) { rails288.W[s].items.splice(i, 1); rails288.draw(); },
    add(s) { rails288.W[s].items.push({ ic: "⭐", lb: T("جديد", "New"), go: "home" }); rails288.draw(); },
    addK(s, k) { rails288.W[s].items.push({ k }); rails288.draw(); },
    async save() { await saveSetting16("rails288", rails288.W); rails288.close(); document.querySelectorAll(".rail288").forEach(e => e.dataset.sig = ""); build(); },
    close() { const d = document.getElementById("rd288"); d && d.remove(); }
  };
  css(`
  .rail288{position:fixed;z-index:870;top:50%;transform:translateY(-50%);display:flex;align-items:center;pointer-events:none}
  .rail288[data-pos=top]{top:5.5rem;transform:none}.rail288[data-pos=bottom]{top:auto;bottom:1.2rem;transform:none}
  .rail288.L{left:0;flex-direction:row-reverse}.rail288.R{right:0;flex-direction:row}
  .rail288>*{pointer-events:auto}
  .rail288 .p288{display:none;flex-direction:column;align-items:center;gap:.45rem;padding:.6rem .45rem;background:var(--card);border:1px solid var(--line);border-radius:24px;box-shadow:0 10px 34px rgba(15,23,42,.14);max-height:calc(100vh - 7rem);overflow-y:auto;scrollbar-width:none;width:96px;box-sizing:border-box}
  .rail288 .p288::-webkit-scrollbar{display:none}
  .rail288.L .p288{margin-left:10px}.rail288.R .p288{margin-right:10px}
  .rail288.open .p288{display:flex;animation:in288 .28s cubic-bezier(.2,.8,.2,1)}
  .rail288.L.open .p288{animation-name:inl288}
  @keyframes in288{from{opacity:0;transform:translateX(24px)}}@keyframes inl288{from{opacity:0;transform:translateX(-24px)}}
  .t288{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:.25rem;width:80px;min-height:74px;padding:.5rem .25rem;border-radius:18px;background:color-mix(in srgb,var(--fg) 4%,var(--card));text-decoration:none!important;color:var(--fg)!important;box-sizing:border-box;transition:transform .15s,background .15s;flex:0 0 auto}
  .t288:hover{transform:translateY(-2px);background:color-mix(in srgb,var(--accent) 12%,var(--card))}
  .t288 .i288{font-size:2rem;line-height:1;display:flex;align-items:center;justify-content:center;height:2.2rem}.t288 .i288 img{width:2.2rem;height:2.2rem;object-fit:contain}
  .t288 b{font-size:.72rem;font-weight:700;line-height:1.2;text-align:center;max-width:74px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;display:block;color:var(--fg)}
  .t288.cfg{opacity:.75;min-height:60px}.t288.cfg .i288{font-size:1.3rem;height:1.5rem}
  .h288{width:18px;height:86px;border:0;cursor:pointer;display:flex;align-items:center;justify-content:center;color:var(--muted);font-size:1.1rem;font-weight:700;padding:0;background:linear-gradient(var(--card),var(--card)) padding-box;box-shadow:0 0 18px rgba(15,23,42,.18)}
  .rail288.R .h288{border-radius:14px 0 0 14px}.rail288.L .h288{border-radius:0 14px 14px 0}
  .rail288.open.R .h288{border-radius:14px 0 0 14px;margin-right:-6px;position:relative;z-index:1}.rail288.open.L .h288{margin-left:-6px;position:relative;z-index:1}
  .h288:hover{color:var(--accent);box-shadow:0 0 22px color-mix(in srgb,var(--accent) 40%,transparent)}
  html body.rails288.rails288.rails288.rails288 #app{padding-left:22px!important;padding-right:22px!important;box-sizing:border-box}html body.rails288.rails288.rails288.ror288.ror288 #app{padding-right:122px!important}html body.rails288.rails288.rails288.rol288.rol288 #app{padding-left:122px!important}
  html body.rails288 :is(#ctl113,#lk187,#xbf286,.fb271,.pin268,.ai-widget>.ai-toggle,#h207-tools,#tab201-tools,.tab201,#nv180,#hlpfab,#zn215,#tbb209,.h207){display:none!important}
  html body.rails288 .ai-widget{bottom:1rem}
  @media(max-width:760px){.rail288{display:none!important}}
  #rd288{position:fixed;inset:0;z-index:6000;display:flex;align-items:center;justify-content:center;padding:1rem}
  #rd288 .bg{position:absolute;inset:0;background:rgba(0,0,0,.5)}
  #rd288 .pn{position:relative;background:var(--card);color:var(--fg);border-radius:18px;padding:1rem 1.1rem;width:min(64rem,100%);max-height:92vh;overflow:auto;box-shadow:0 20px 60px rgba(0,0,0,.3)}
  #rd288 h3{margin:0 0 .3rem}#rd288 h4{margin:.2rem 0 .5rem}
  #rd288 .opt288{display:grid;gap:.35rem;margin:.6rem 0;padding:.6rem;border:1px solid var(--line);border-radius:12px}
  #rd288 .cols288{display:grid;grid-template-columns:1fr 1fr;gap:1rem;direction:ltr}#rd288 .col288{direction:rtl}html:not([dir=rtl]) #rd288 .col288{direction:ltr}@media(max-width:800px){#rd288 .cols288{grid-template-columns:1fr}}
  #rd288 .row288{display:grid;grid-template-columns:3.2rem 1fr;gap:.3rem;padding:.5rem;border:1px solid var(--line);border-radius:12px;margin:.35rem 0}
  #rd288 .row288 input{min-width:0;padding:.35rem .5rem;border:1px solid var(--line);border-radius:8px;background:var(--bg);color:var(--fg)}
  #rd288 .row288 input.ic{text-align:center;font-size:1.2rem}
  #rd288 .row288>input:nth-child(3){grid-column:1/-1}
  #rd288 .ro288{grid-column:1/-1;display:flex;flex-wrap:wrap;gap:.2rem .6rem;font-size:.78rem}#rd288 .ro288 label{display:flex;gap:.2rem;align-items:center}
  #rd288 .bt288{grid-column:1/-1;display:flex;gap:.25rem}#rd288 .bt288 button,#rd288 .add288 button,#rd288 .add288 select{border:1px solid var(--line);background:var(--bg);color:var(--fg);border-radius:8px;padding:.3rem .55rem;cursor:pointer}
  #rd288 .add288{display:flex;gap:.4rem;flex-wrap:wrap;margin-top:.4rem}
  `);

  const _r = render; render = function () { const o = _r.apply(this, arguments); try { RUNS = []; document.querySelectorAll(".rail288").forEach(e => e.dataset.sig = ""); build(); } catch (e) { console.warn("v288", e); } return o; };
  addEventListener("resize", () => { try { build(); } catch (e) {} });
  setTimeout(() => { try { build(); pretty(); } catch (e) {} }, 600);
  /* لو الشريط اتقفل بأي طريقة تانية، اللينكات المقروءة تفضل */
  let q = 0; new MutationObserver(ms => { if (q) return; if (!ms.some(m => m.target.id === "app")) return; q = 1; setTimeout(() => { q = 0; try { pretty(); } catch (e) {} }, 200); }).observe(document.documentElement, { childList: true, subtree: true });
})();
