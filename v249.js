/* ================= v249: ملف Notion «project» (الدفعة 1) — الرئيسية: «الفصل والحصص» و«المسابقات» و«حياة المسلم» بقوا مسارات زي اللي فوق بنفس التقسيمة · «حياة المسلم» (كانت «كل الأدوات») فيها أدوات المسلم + كل أداة مش موجودة في أي مسار + الوايت بورد، والمالك يختار اللي جواها ويرتّبها زي الفولدرات · صفحة كل مقام (أساسي أو فرعي): الشريط اللي فوق والهيدر اتشالوا وبتدخل على التبويبات علطول، والفروع اتشالت من الأساسي (ليها قسم «المقامات الفرعية» لوحده: تدوس على الكرد تتفتح فروعه) · «الأذانات» اتشالت من المسار واتحطت في تبويب «نشيد وابتهال» جوه كل مقام · التلاوات في المرتل/المجود بقت قايمة منظمة صغيرة · شريط «🎙️ سجّل نفسك واسمع» في كل تبويبات المقام · العربي: «العربية الفصحى» (من غير «وحدات») في «اتكلم عربي»، «منهج متكامل العربية الفصحى» واحد بس ومخفي عن غيرك لحد ما ترفع الكتاب، «العامية المصرية» من غير «مواقف»، وأسماء الوحدات بالعربي + معناها بالإنجليزي ================= */
(function () {
  const AR = () => state.lang === "ar"; const T = (a, e) => AR() ? a : e;
  const css = s => document.head.insertAdjacentHTML("beforeend", `<style>${s}</style>`);
  const own = () => { try { return realRole() === "owner" && !state.preview; } catch (e) { return false; } };
  function show(body) { const app = document.getElementById("app"); if (!app) return; app.innerHTML = renderHeader() + body + renderFooter() + renderAIWidget(); try { applyOv(app); edBar(); uilApply(); uilBar(); } catch (e) {} }
  ["life249"].forEach(p => { if (!PAGES16.includes(p)) PAGES16.push(p); });

  /* ---------- الأدوات ---------- */
  function tools() { const out = []; const seen = {}; try { DOMAINS().forEach(d => (d.tools || []).forEach(t => { const js = String(t[2]); if (seen[js]) return; seen[js] = 1; out.push({ ic: t[0], n: t[1], js, d: d.k }); })); } catch (e) {} return out; }
  /* نفس المفاتيح اللي المسارات الخمسة بتستخدمها (v241) — عشان نعرف الأداة اللي مش موجودة في أي مسار */
  const USED = ["libGo('4513c7ff", "libGo('7e2ec901", "libGo('27c0d098", "hzTab='today'", "hzTab='session'", "hzTab='map'", "go16('tasmee')", "go16('hifzt')", "go16('khatma')", "go16('growth')", "go16('games172')", "go16('tjb')", "go16('makharij')", "go16('tf228')", "go16('vow172')", "go16('nooraniya')", "go16('kidsmushaf')", "go16('qiraat')", "go16('adhans')", "go16('tuner')", "go16('maqamat')", "go16('tahwil')", "go16('mqc')", "go16('mqchallenge')", "go16('reading')", "go16('kidsar')", "go16('lang','fu')", "go16('lang','eg')", "go16('lang','gu')", "go16('egyptian')", "go16('abyb')", "go16('arabiya')", "go16('fusha')", "go16('nahw')", "go16('ilm')", "go16('alam')", "go16('kutub199')", "go16('bk','fqs')", "go16('voice242')", "go16('qiraat10')", "go16('muslim241')", "go16('alltools')", "go16('competitions')", "navigate('classroom')", "navigate('booking')", "go16('grp238')", "go16('wb243')", "go16('wb249')"];
  const USEDRE = [/صلّح أخطاء التجويد/, /ألعاب التجويد/, /رحلة التجويد/, /المصحف الملوّن/, /مصحف أخطائي/, /قصة مصوّرة/, /المقامات الأساسية/, /المقامات الفرعية/, /أنشد معي/, /تفسير القرآن/, /الحديث الشريف/, /^الفقه$/, /السيرة النبوية/, /قصص الأنبياء/, /Colou?red mushaf/i, /Main maqamat/i, /Branch maqamat/i, /Sing along|Chant with/i];
  /* أدوات كانت مش في أي مسار ولها مكان طبيعي — بتتحط في التقسيمة الصح جوه المسار */
  const MAP = [["libGo('72d76e51", /المعلومات النظرية|Theory/], ["go16('maqam-game')", /مساحتك الصوتية|Your voice space/], ["libGo('7eb9cec7", /^العلوم$|^Sciences$/], ["libGo('d5142f20", /^العلوم$|^Sciences$/], ["libGo('6e27f3e6", /^العلوم$|^Sciences$/]];
  MAP.forEach(m => USED.push(m[0]));
  USED.push("libGo('53c9bdc4", "libGo('64bff2a0", "libGo('efab5231", "libGo('c5785fc2"); /* مكتبات اللهجات موجودة في «محتوى الأكاديمية» */
  const isUsed = t => USED.some(k => t.js.includes(k)) || USEDRE.some(r => r.test(t.n));
  const find = (A, k) => A.find(t => t.js.includes(k));
  const WB = () => ({ ic: "🖍️", n: T("الوايت بورد", "Whiteboard"), js: typeof window.wb249 === "object" ? "go16('wb249')" : "go16('wb243')" });
  const CLK = () => ({ ic: "🕰️", n: T("الساعة والتقويم (ميلادي + هجري)", "Clock & calendar (Gregorian + Hijri)"), js: "go16('clk251')" });

  function lifeDefault() { const A = tools(); const g = (name, keys, extra = []) => [name, keys.map(k => find(A, k)).filter(Boolean).concat(extra)];
    const L0 = state.lang; let Aar = A; try { state.lang = "ar"; Aar = tools(); } catch (e) {} finally { state.lang = L0; } /* الأسماء العربي عشان المقارنة تبقى صح في أي لغة */
    const usedJs = new Set(Aar.filter(isUsed).map(t => t.js));
    const other = A.filter(t => !usedJs.has(t.js) && !/prayer|adhkar|asma|ayahcard|arbaeen|cal224|khatma|go16\('level'\)|placement|pricing|sponsor/.test(t.js) && !/^go16\('(life249|clk251)'\)$/.test(t.js));
    return [
      g(T("🕌 الصلاة", "🕌 Prayer"), ["go16('prayer')"]),
      g(T("📿 الأذكار والدعاء", "📿 Adhkar & du'a"), ["go16('adhkar')", "go16('asma')"]),
      g(T("📖 مع القرآن كل يوم", "📖 Daily with the Quran"), ["go16('ayahcard')", "go16('arbaeen')", "go16('khatma')"]),
      g(T("🗓️ التقويم والوقت", "🗓️ Calendar & time"), [], [{ ic: "🌙", n: T("التقويم الهجري", "Hijri calendar"), js: "go16('cal224')" }].concat(typeof PAGES16 !== "undefined" && PAGES16.includes("clk251") ? [CLK()] : [])),
      [T("🖍️ الوايت بورد", "🖍️ Whiteboard"), [WB()]],
      [T("🧰 أدوات تانية", "🧰 More tools"), other]
    ].filter(x => x[1].length); }
  /* إعدادات المالك: {g:[[اسم, [js...]]...]} — لو مفيش يبقى الافتراضي */
  function lifeGroups() { const cfg = setv("life249", null); if (!cfg || !Array.isArray(cfg.g)) return lifeDefault(); const A = tools().concat([WB(), CLK(), { ic: "🌙", n: T("التقويم الهجري", "Hijri calendar"), js: "go16('cal224')" }]); return cfg.g.map(([n, list]) => [n, (list || []).map(js => A.find(t => t.js === js)).filter(Boolean)]).filter(x => x[1].length || own()); }
  async function lifeSave(g) { await saveSetting16("life249", { g: g.map(([n, L]) => [n, L.map(t => t.js)]) }); toast("✅"); render(); }
  window.life249 = {
    edit() { state.lifeEd = !state.lifeEd; render(); },
    mv(gi, i, d) { const G = lifeGroups(); const L = G[gi][1]; const j = i + d; if (j < 0 || j >= L.length) return; [L[i], L[j]] = [L[j], L[i]]; lifeSave(G); },
    gmv(gi, d) { const G = lifeGroups(); const j = gi + d; if (j < 0 || j >= G.length) return; [G[gi], G[j]] = [G[j], G[gi]]; lifeSave(G); },
    to(gi, i, gj) { const G = lifeGroups(); const [t] = G[gi][1].splice(i, 1); G[+gj][1].push(t); lifeSave(G); },
    del(gi, i) { const G = lifeGroups(); G[gi][1].splice(i, 1); lifeSave(G); },
    add(gi, js) { if (!js) return; const G = lifeGroups(); const t = tools().concat([WB(), CLK(), { ic: "🌙", n: T("التقويم الهجري", "Hijri calendar"), js: "go16('cal224')" }]).find(x => x.js === js); if (t && !G[gi][1].some(x => x.js === js)) G[gi][1].push(t); lifeSave(G); },
    ren(gi) { const G = lifeGroups(); const n = prompt(T("اسم الفولدر", "Folder name"), G[gi][0]); if (!n) return; G[gi][0] = n; lifeSave(G); },
    newg() { const n = prompt(T("اسم الفولدر الجديد", "New folder name")); if (!n) return; const G = lifeGroups(); G.push([n, []]); lifeSave(G); },
    delg(gi) { const G = lifeGroups(); if (G[gi][1].length && !confirm(T("الفولدر فيه أدوات — تشيله؟ (الأدوات نفسها مش هتتمسح من الموقع)", "Remove this folder? (tools stay on the site)"))) return; G.splice(gi, 1); lifeSave(G); },
    reset() { if (!confirm(T("ترجع للترتيب الافتراضي؟", "Back to default?"))) return; saveSetting16("life249", null).then(() => render()); }
  };
  function lifePage() { const G = lifeGroups(); const ed = own() && state.lifeEd; const A = tools().concat([WB(), CLK(), { ic: "🌙", n: T("التقويم الهجري", "Hijri calendar"), js: "go16('cal224')" }]);
    const head = own() ? `<div class="row" style="gap:.35rem;flex-wrap:wrap;margin-bottom:.6rem"><button class="btn ${ed ? "btn-p" : "btn-o"} xs" onclick="life249.edit()">🗂️ ${ed ? T("خلصت الترتيب", "Done") : T("رتّب زي الفولدرات (للمالك)", "Arrange like folders (owner)")}</button>${ed ? `<button class="btn btn-o xs" onclick="life249.newg()">➕ ${T("فولدر جديد", "New folder")}</button><button class="btn btn-o xs" onclick="life249.reset()">↺ ${T("الافتراضي", "Default")}</button>` : ""}</div>` : "";
    const body = G.map(([n, L], gi) => `<details class="card lf249" ${gi === 0 || ed ? "open" : ""}><summary class="b">${esc(n)} <small class="muted">(${L.length})</small>${ed ? `<span class="lfa"><button onclick="event.preventDefault();life249.gmv(${gi},-1)">▲</button><button onclick="event.preventDefault();life249.gmv(${gi},1)">▼</button><button onclick="event.preventDefault();life249.ren(${gi})">✏️</button><button onclick="event.preventDefault();life249.delg(${gi})">🗑️</button></span>` : ""}</summary>
      <div class="tl241" style="margin-top:.5rem">${L.map((t, i) => ed ? `<div class="lfi"><span>${t.ic}</span><b>${esc(t.n)}</b><span class="lfa"><button onclick="life249.mv(${gi},${i},-1)" title="↑">▲</button><button onclick="life249.mv(${gi},${i},1)" title="↓">▼</button><select onchange="life249.to(${gi},${i},this.value)" title="${T("انقل لفولدر", "Move to folder")}"><option value="">↪️</option>${G.map((g, j) => j === gi ? "" : `<option value="${j}">${esc(g[0])}</option>`).join("")}</select><button onclick="life249.del(${gi},${i})" title="${T("شيلها من هنا", "Remove from here")}">✕</button></span></div>` : `<button onclick="${esc(t.js)}"><span>${t.ic}</span>${esc(t.n)}</button>`).join("")}</div>
      ${ed ? `<select class="in" style="margin-top:.4rem" onchange="life249.add(${gi},this.value)"><option value="">➕ ${T("ضيف أداة من الموقع…", "Add a tool from the site…")}</option>${A.filter(t => !L.some(x => x.js === t.js)).map(t => `<option value="${esc(t.js)}">${t.ic} ${esc(t.n)}</option>`).join("")}</select>` : ""}</details>`).join("");
    return pageWrap("🕌", T("حياة المسلم", "Muslim life"), T("الصلاة والأذكار والتقويم وكل أداة يومية في مكان واحد", "Prayer, adhkar, calendar and every daily tool in one place"), head + body, 900); }

  /* ---------- الرئيسية: 3 مسارات زيادة بنفس الشكل ---------- */
  function extraPaths() { const A = tools(); const L = (ks, extra = []) => ks.map(k => find(A, k)).filter(Boolean).concat(extra);
    const comp = A.filter(t => /competitions|mqchallenge|challenge|leader|honor/i.test(t.js) || /مسابق|تحدّي|لوحة الشرف/.test(t.n));
    return [
      { id: "class", ic: "🎥", t: T("الفصل والحصص", "Classroom & lessons"), s: T("حصصك، الحجز، الحصة الجماعية، الوايت بورد", "Your lessons, booking, group lessons, whiteboard"), c: "#0e7490", g: [
        [T("الحصص", "Lessons"), [{ ic: "🎥", n: T("الفصل والحصص", "Classroom & lessons"), js: "navigate('classroom')" }, { ic: "📅", n: T("احجز حصة", "Book a lesson"), js: "navigate('booking')" }, { ic: "👥", n: T("الحصة الجماعية", "Group lesson"), js: "go16('grp238')" }]],
        [T("أدوات الفصل", "Class tools"), [WB()]]] },
      { id: "comp", ic: "🏆", t: T("المسابقات", "Competitions"), s: T("المسابقات والتحديات ولوحة الشرف", "Competitions, challenges and the honour board"), c: "#b45309", g: [
        [T("المسابقات", "Competitions"), [{ ic: "🏆", n: T("كل المسابقات", "All competitions"), js: "go16('competitions')" }].concat(comp.filter(t => !/go16\('competitions'\)/.test(t.js)))]] },
      { id: "life", ic: "🕌", t: T("حياة المسلم", "Muslim life"), s: T("الصلاة، الأذكار، التقويم، الوايت بورد وكل الأدوات اليومية", "Prayer, adhkar, calendar, whiteboard and daily tools"), c: "#15803d", g: lifeGroups().map(([n, L]) => [n.replace(/^\S+\s/, ""), L]).concat([[T("الصفحة كاملة", "Full page"), [{ ic: "🕌", n: T("افتح حياة المسلم", "Open Muslim life"), js: "go16('life249')" }]]]) }
    ]; }
  const OPEN = () => state.p249 || "";
  window.p249 = id => { state.p249 = OPEN() === id ? "" : id; const b = document.getElementById("px249"); if (b) b.outerHTML = pathsHtml(); };
  function pathsHtml() { return `<div id="px249" class="pg241" style="margin-top:.6rem">${extraPaths().map(p => `<div class="pc241 ${OPEN() === p.id ? "on" : ""}" style="--c:${p.c}"><button class="ph241" onclick="p249('${p.id}')"><span class="i">${p.ic}</span><span class="tx"><b>${esc(p.t)}</b><small>${esc(p.s)}</small></span><span class="ar">${OPEN() === p.id ? "−" : "+"}</span></button>${OPEN() === p.id ? `<div class="pb241">${p.g.filter(g => g[1].length).map(g => `<div class="gg241"><h4>${esc(g[0])}</h4><div class="tl241">${g[1].map(t => `<button onclick="${esc(t.js)}"><span>${t.ic}</span>${esc(t.n)}</button>`).join("")}</div></div>`).join("")}</div>` : ""}</div>`).join("")}</div>`; }
  function home() { if (state.route !== "home") return; const p = document.getElementById("pth241"); if (!p) return; const m = document.getElementById("more245"); if (m) m.style.display = "none"; if (!document.getElementById("px249")) { const pg = p.querySelector(".pg241"); (pg || p).insertAdjacentHTML("afterend", pathsHtml()); } arabicFix(p); }

  /* ---------- العربي في المسار ---------- */
  function arabicFix(root) { const card = [...root.querySelectorAll(".gg241")]; if (!card.length) return;
    try { const A = tools(); const mq = [...root.querySelectorAll(".pc241.on")].find(c => /المقامات|Maqamat/.test((c.querySelector(".ph241 b") || {}).textContent || ""));
      if (mq && !mq.querySelector(".gg241[data-g249]")) { const L = ["libGo('4513c7ff", "libGo('7e2ec901", "libGo('27c0d098"].map(k => find(A, k)).filter(Boolean).filter(t => !mq.querySelector(`.tl241 button[onclick="${t.js.replace(/"/g, "&quot;")}"]`)); const pb = mq.querySelector(".pb241"); if (L.length && pb) pb.insertAdjacentHTML("afterbegin", `<div class="gg241" data-g249="1"><h4>${T("المقامات", "The maqamat")}</h4><div class="tl241">${L.map(t => `<button onclick="${esc(t.js)}"><span>${t.ic}</span>${esc(t.n)}</button>`).join("")}</div></div>`); }
      MAP.forEach(([k, re]) => { const t = find(A, k); if (!t) return; const g = card.find(x => re.test(((x.querySelector("h4") || {}).textContent || "").trim())); if (!g || g.querySelector(`button[data-k249="${k}"]`)) return; g.querySelector(".tl241").insertAdjacentHTML("beforeend", `<button data-k249="${esc(k)}" onclick="${esc(t.js)}"><span>${t.ic}</span>${esc(t.n)}</button>`); }); } catch (e) {} const speak = card.find(g => /اتكلم عربي|Speak Arabic/.test(g.querySelector("h4") && g.querySelector("h4").textContent)); const fus = root.querySelector(".tl241 button[onclick*=\"go16('fusha')\"]"); if (speak && fus && !speak.contains(fus)) speak.querySelector(".tl241").appendChild(fus); }
  const hasBook = () => { try { const ix = (abybIndex() || [[]])[0]; return Array.isArray(ix) ? ix.length > 0 : !!(ix && Object.keys(ix).length); } catch (e) { return false; } };
  const _D = DOMAINS; DOMAINS = function () { const ds = _D.apply(this, arguments); try { ds.forEach(d => { if (!d.tools) return;
      d.tools = d.tools.filter(t => { const js = String(t[2]);
        if (js.includes("go16('adhans')")) return false; /* الأذانات بقت جوه تبويب الابتهال في كل مقام */
        if (js.includes("go16('arabiya')")) return false; /* اتدمجت في المنهج المتكامل */
        if (js.includes("go16('abyb')") && !own() && !hasBook()) return false; /* مخفي لحد ما الكتاب يترفع */
        return true; });
      d.tools.forEach(t => { const js = String(t[2]);
        if (js.includes("'egyptian'")) t[1] = String(t[1]).replace(/\s*\((مواقف|situations)\)/i, "");
        if (js.includes("go16('fusha')")) t[1] = T("العربية الفصحى", "Standard Arabic");
        if (js.includes("go16('abyb')")) t[1] = T("منهج متكامل العربية الفصحى", "Standard Arabic — complete course") + (own() && !hasBook() ? T(" (مخفي لحد ما ترفع الكتاب)", " (hidden until you upload the book)") : ""); }); }); } catch (e) {} return ds; };

  /* ---------- صفحة المقام ---------- */
  const secOf = id => { try { return (sectionsData() || []).find(s => s.id === id); } catch (e) { return null; } };
  const ttl = s => { const t = s && s.title; return typeof t === "object" ? (AR() ? t.ar : t.en || t.ar) : (t || ""); };
  function maqamPageFix() { if (state.route !== "library" || !state.libSec) return; const s = secOf(state.libSec); const k = s && s.meta && s.meta.kind; const tabs = document.querySelector("#app .motabs"); const wrap = (tabs && tabs.parentElement) || (document.querySelector("#app .libhead") || {}).parentElement; if (!wrap) return;
    if (k === "mq_branch") { wrap.querySelectorAll(":scope > .mt179c").forEach(x => x.style.display = "none"); return; }
    if (k !== "maqam" || !tabs) return; wrap.classList.add("mq249"); if (state.mqHead249) wrap.classList.add("hd249"); else wrap.classList.remove("hd249");
    if (!wrap.querySelector("#mh249")) { const par = secOf(s.parent_id); tabs.insertAdjacentHTML("beforebegin", `<div id="mh249"><button class="btn btn-o xs" onclick="libGo('${par ? par.id : ""}')">${AR() ? "→" : "←"} ${esc(ttl(par) || T("المقامات", "Maqamat"))}</button><b class="notr">${esc(ttl(s))}</b>${own() ? `<button class="btn btn-o xs" onclick="state.mqHead249=!state.mqHead249;render()" title="${T("أدوات القسم (للمالك)", "Section tools (owner)")}">⚙️</button>` : ""}</div>`); }
    /* نص الأذان/الابتهال تحت الصوت بزرار «عرض» */
    wrap.querySelectorAll(".adhan59:not([data-f249])").forEach(c => { c.dataset.f249 = 1; c.classList.add("cl249"); const h = c.firstElementChild; if (h) h.insertAdjacentHTML("afterend", `<button class="btn btn-o xs" onclick="this.closest('.adhan59').classList.toggle('cl249');this.textContent=this.closest('.adhan59').classList.contains('cl249')?'📜 ${T("عرض الكلمات", "Show the words")}':'✕ ${T("اخفي", "Hide")}'">📜 ${T("عرض الكلمات", "Show the words")}</button>`); });
    if (!wrap.querySelector("#rb249")) tabs.insertAdjacentHTML("afterend", `<div id="rb249" class="card"><b>🎙️ ${T("سجّل نفسك واسمع", "Record yourself & listen")}</b><button class="btn btn-p xs" data-a="rec">🎙️ ${T("سجّل", "Record")}</button><span class="rbo"></span></div>`);
    if (state.mqTab === "nasheed") adhansIn(wrap, s.meta.maqam); }
  /* الأذانات جوه تبويب الابتهال */
  function adhansIn(wrap, m) { if (wrap.querySelector("#ad249") || typeof adhList !== "function") return; const xs = adhList(); if (!Array.isArray(xs)) return; const L = xs.filter(c => c.maqam === m);
    if (!L.length && !own()) return; const el = document.createElement("div"); el.id = "ad249"; el.className = "card"; el.innerHTML = `<h3>📢 ${T("الأذان على المقام ده", "Adhan in this maqam")}</h3>${L.length ? `<div class="rcgrid59">${L.map(c => { try { return recCard59(c, m); } catch (e) { return ""; } }).join("")}</div>` : `<p class="sm muted">${T("لسه مفيش أذان على المقام ده.", "No adhan in this maqam yet.")}</p>`}${own() ? `<button class="btn btn-o xs" style="margin-top:.4rem" onclick="go16('adhans')">📢 ${T("كل الأذانات + أضف أذان (للمالك)", "All adhans + add (owner)")}</button>` : ""}`;
    const tabs = wrap.querySelector("#rb249") || wrap.querySelector(".motabs"); tabs.insertAdjacentElement("afterend", el); }
  /* مسجّل صغير */
  const RB = { rec: null, blob: null };
  addEventListener("click", async e => { const b = e.target.closest && e.target.closest("#rb249 button[data-a]"); if (!b) return; const box = b.closest("#rb249"); const o = box.querySelector(".rbo"); const a = b.dataset.a;
    if (a === "rec") { if (RB.rec && RB.rec.state === "recording") { RB.rec.stop(); return; } try { const st = await navigator.mediaDevices.getUserMedia({ audio: true }); const mime = ["audio/webm;codecs=opus", "audio/mp4", "audio/webm"].find(t => window.MediaRecorder && MediaRecorder.isTypeSupported(t)) || ""; const r = new MediaRecorder(st, mime ? { mimeType: mime } : {}); const ch = []; r.ondataavailable = x => x.data.size && ch.push(x.data);
        r.onstop = () => { st.getTracks().forEach(t => t.stop()); RB.blob = new Blob(ch, { type: r.mimeType || "audio/webm" }); b.textContent = "🎙️ " + T("سجّل تاني", "Record again"); b.classList.remove("on"); o.innerHTML = `<audio controls src="${URL.createObjectURL(RB.blob)}"></audio>${state.auth && state.auth.user ? `<button class="btn btn-o xs" data-a="send">📤 ${T("ابعت للمعلم", "Send to my teacher")}</button>` : ""}`; };
        RB.rec = r; r.start(); b.textContent = "⏹ " + T("وقّف", "Stop"); b.classList.add("on"); o.innerHTML = `<span class="sm rdlive">● ${T("بيسجّل… غنّي أو اقرأ على المقام", "Recording… sing or recite in the maqam")}</span>`; } catch (err) { toast(T("اسمح للمايك من المتصفح", "Allow the microphone in your browser"), true); } }
    if (a === "send") { if (!RB.blob) return; b.disabled = true; try { const s = secOf(state.libSec); const f = new File([RB.blob], `maqam_${Date.now()}.${/mp4/.test(RB.blob.type) ? "m4a" : "webm"}`, { type: RB.blob.type }); const up = await sfUpload(state.auth.user.id, [f], false); const { error } = await sb.from("student_tasks").insert({ student_id: state.auth.user.id, created_by: state.auth.user.id, kind: "check", area: "maqamat", title: `🎙️ ${T("تسجيلي على", "My recording in")} ${ttl(s)}`, status: "submitted", sub_files: up, submitted_at: new Date().toISOString() }); if (error) throw error; toast("✅ " + T("وصل للمعلم", "Sent to your teacher")); } catch (err) { toast(err.message || String(err), true); b.disabled = false; } } }, true);

  /* ---------- أسماء وحدات الأطفال بالإنجليزي جنب العربي ---------- */
  const KAEN = { "التَّحِيَّةُ وَالتَّعَارُفُ": "Greetings", "الْخُضْرَوَاتُ": "Vegetables", "الْمُوَاصَلَاتُ": "Transport", "الْمِهَنُ": "Jobs", "أَيَّامُ الْأُسْبُوعِ": "Days of the week", "الْحَوَاسُّ الْخَمْسُ": "The five senses", "فِي الْحَدِيقَةِ": "In the garden", "فِي الْمَطْبَخِ": "In the kitchen" };
  function kidsEn() { if (AR()) return; document.querySelectorAll("#app button b, #app .nhcard b").forEach(b => { if (b.dataset.en249) return; const t = (b.textContent || "").replace(/^\d+\.\s*/, "").trim(); const en = KAEN[t]; if (en) { b.dataset.en249 = 1; b.insertAdjacentHTML("beforeend", ` <small class="ken249">— ${en}</small>`); } }); }
  /* ملاحظة «المحتوى مكتوب…» تحت الوحدات اتشالت (من غير مصادر) */
  function noSrc() { document.querySelectorAll("#app p.xs.muted").forEach(p => { if (/المحتوى مكتوب خصيصًا|Content written for the academy|Levels 2 and 3 are coming|المستوى التاني والتالت جايين/.test(p.textContent)) p.remove(); }); }

  const _r = render; render = function () { if (state.route === "life249" || state.route === "muslim241") return show(lifePage()); const o = _r.apply(this, arguments); try { home(); maqamPageFix(); kidsEn(); noSrc(); } catch (e) { console.warn("v249", e); } return o; };
  let t0 = 0; new MutationObserver(() => { clearTimeout(t0); t0 = setTimeout(() => { try { home(); maqamPageFix(); kidsEn(); if (state.route === "home") { const p = document.getElementById("pth241"); p && arabicFix(p); } } catch (e) {} }, 140); }).observe(document.getElementById("app") || document.body, { childList: true, subtree: false });
  /* لما مسار من الخمسة يتفتح، نصلّح العربي */
  const _p241 = window.p241; if (typeof _p241 === "function") window.p241 = function () { const r = _p241.apply(this, arguments); try { home(); } catch (e) {} return r; };
  /* «كل الأدوات» في أي مكان تاني بقت «حياة المسلم» */
  const _go = go16; go16 = function (r, a) { if (r === "muslim241") r = "life249"; return _go.call(this, r, a); };

  css(`#more245{display:none!important}
  .mq249>.crumb,.mq249>.stitle,.mq249>.ssub,.mq249>.libcrumb,.mq249>.libhead,.mq249>.dmbar{display:none!important}.mq249.hd249>.libhead{display:block!important}
  .mq249{display:flex;flex-direction:column}#mh249{order:-1}
  #mh249{display:flex;align-items:center;gap:.5rem;margin:.2rem 0 .5rem}#mh249 b{font-size:1.15rem;flex:1}
  #rb249{display:flex;align-items:center;gap:.5rem;flex-wrap:wrap;padding:.3rem .7rem!important;margin:.4rem 0;font-size:.9rem}#rb249 .rbo{display:flex;align-items:center;gap:.4rem;flex-wrap:wrap}#rb249 audio{height:34px;max-width:260px}#rb249 button.on{background:#dc2626;border-color:#dc2626}
  .mq249 .rcgrid59{display:flex!important;flex-direction:column;gap:.35rem}
  .mq249 .rc59{display:grid!important;grid-template-columns:minmax(150px,1.1fr) minmax(220px,2fr) auto;grid-auto-flow:row dense;align-items:center;gap:.25rem .6rem;padding:.45rem .7rem!important;border-radius:14px;min-height:0!important}
  .mq249 .rc59>b{grid-column:1;font-size:.95rem}.mq249 .rc59>audio{grid-column:2;height:34px}.mq249 .rc59 .rc59m{display:none}
  .mq249 .rc59 .sp197{grid-column:3;display:flex;gap:2px}.mq249 .rc59 .sp197 button{font-size:.68rem;padding:.05rem .3rem}
  .mq249 .rc59 .ao185b{grid-column:1}.mq249 .rc59 .im83{grid-column:2}
  .mq249 .rc59 .ao185b,.mq249 .rc59 .im83{justify-self:start;font-size:.78rem!important;padding:.15rem .6rem!important;margin:0!important;width:auto!important}
  .mq249 .rc59 .rc76a{grid-column:3;justify-self:end}.mq249 .rc59 .rc76a button{padding:.1rem .35rem;font-size:.75rem}
  @media(max-width:700px){.mq249 .rc59{grid-template-columns:1fr auto}.mq249 .rc59>audio{grid-column:1/-1}.mq249 .rc59 .sp197{grid-column:2;grid-row:1}}
  .lf249 summary{display:flex;align-items:center;gap:.4rem}.lf249 .lfa{margin-inline-start:auto;display:inline-flex;gap:.2rem}.lf249 .lfa button,.lf249 .lfa select{border:1px solid var(--line);background:var(--card);color:var(--fg);border-radius:8px;padding:.05rem .35rem;cursor:pointer;font-size:.8rem}
  .lfi{display:flex;align-items:center;gap:.4rem;border:1px dashed var(--accent);border-radius:12px;padding:.4rem .5rem}.lfi b{font-size:.85rem;flex:1}
  .adhan59.cl249>*:not(:first-child):not(button){display:none!important}
  .ken249{font-weight:500;color:var(--muted);font-size:.78em}`);
})();
