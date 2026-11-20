/* ================= v277: الرئيسية — طلب المالك 20/11 (3) — نفس تقسيمة القايمة القديمة بالظبط: 8 أقسام فوق (القرآن والتجويد · القراءات العشر · المقامات · العربية · العلوم الإسلامية · الفصل والحصص · المسابقات · حياة المسلم)، وجوه كل قسم مجموعات وجوه كل مجموعة فولدرات، وكل محتوى المنصة متجمّع في مكان واحد بس من غير تكرار (الأدوات وكل الأدوات والمكتبة والقايمة القديمة)، والقايمة القديمة اللي فوق اتشالت من الرئيسية · كله مقفول افتراضيًا · المالك: ✏️ رتّب — قسم/مجموعة/فولدر جديد، تغيير الاسم والأيقونة واللون، نقل أي حاجة لأي فولدر، ترتيب ↑↓، شيل مع تحذير، ورجوع للترتيب الأصلي — الحفظ في site_settings.tree277 ================= */
(function () {
  const FF = k => { try { return window.ff254(k); } catch (e) { return true; } };
  const AR = () => state.lang === "ar"; const T = (a, e) => AR() ? a : e;
  const E = s => { try { return esc(s); } catch (e) { return String(s == null ? "" : s); } };
  const own = () => { try { return realRole() === "owner" && !state.preview; } catch (e) { return false; } };
  const css = s => document.head.insertAdjacentHTML("beforeend", `<style>${s}</style>`);
  const LS = (k, v) => { try { if (v === undefined) return JSON.parse(localStorage.getItem(k) || "null"); localStorage.setItem(k, JSON.stringify(v)); } catch (e) { return null; } };
  const nm = o => o ? (AR() ? (o.ar || o.en) : (o.en || o.ar)) : "";
  const J = s => E(JSON.stringify(s));

  /* ---------- التقسيمة الافتراضية: [قسم, مجموعة, فولدر, قاعدة] ---------- */
  const DOORS = [
    ["quran", "📖", "القرآن والتجويد", "Quran & Tajweed", "الحفظ والمراجعة، التجويد، المصاحف", "Memorization, review, tajweed, mushafs", "#0f766e"],
    ["qiraat", "📜", "القراءات العشر", "The Ten Qira'at", "القرّاء العشرة ورواتهم، استماع آية بآية والفروق", "The ten readers and their narrators", "#7c2d12"],
    ["maqamat", "🎼", "المقامات", "Maqamat", "الأساسية، الفرعية، أنشد معي، مساحتك الصوتية، النظري", "Main, branches, sing along, your voice, theory", "#6d28d9"],
    ["arabic", "✍️", "العربية", "Arabic", "الحروف من الصفر، اتكلم عربي، النحو والصرف", "Letters from zero, speak Arabic, grammar", "#b45309"],
    ["sciences", "📚", "العلوم الإسلامية", "Islamic Sciences", "التفسير والحديث والفقه والسيرة والعقيدة", "Tafsir, hadith, fiqh, seerah, aqeedah", "#1d4ed8"],
    ["class", "🎥", "الفصل والحصص", "Classroom & lessons", "حصصك، الحجز، الحصة الجماعية، الوايت بورد", "Your lessons, booking, group lessons, whiteboard", "#0e7490"],
    ["comp", "🏆", "المسابقات", "Competitions", "المسابقات والتحديات ومحتوى الطلاب", "Competitions, challenges and student showcase", "#b45309"],
    ["life", "🕌", "حياة المسلم", "Muslim life", "الصلاة، الأذكار، التقويم والأدوات اليومية", "Prayer, adhkar, calendar and daily tools", "#15803d"]
  ];
  const G = (d, ic, ar, en, f) => ({ d, ic, ar, en, f });
  const F = (ic, ar, en, re) => ({ ic, ar, en, re });
  const TREE = [
    G("quran", "🧠", "حفظ القرآن", "Memorization", [F("📅", "خطة الحفظ والورد", "Plan & daily wird", /hzTab='today'|hzTab='session'|hifzt|wird233|khatma233|#\/hifz|خطط حفظ|الورد اليومي|خطة ختمة|Smart memori|Daily wird|Khatma plan/), F("🔁", "المراجعة والتسميع", "Review & recitation", /srs244|kamil233|fc223|state\.ts\.mode=null|#\/tasmee|رتّب الآية|سمّع من غير|Recite without|Order the ayah/), F("🗺️", "الخريطة والتقدّم", "Map & progress", /hzTab='map'|growth|pts244|streak233|badges172/), F("👪", "ختمة العيلة", "Family khatma", /go16\('khatma'\)|#\/khatma$/)]),
    G("quran", "🕌", "التجويد", "Tajweed", [F("📘", "الأحكام والدروس", "Rules & lessons", /tjb|nooraniya|vow172|رحلة|journey|Journey|d\/tajweed|matn|تحفة/), F("👄", "المخارج والصفات والحروف", "Articulation & letters", /makharij|tf228|التفخيم/), F("🎤", "التطبيق والتصحيح", "Practice & correction", /mode:'tj'|mir226|vt226|المرآة|صوتي على خط/), F("🎮", "ألعاب وقصص", "Games & stories", /ألعاب|games172|قصة مصوّرة|stories|[Ss]tor(y|ies)|[Gg]ames/)]),
    G("quran", "📖", "المصاحف والاستماع", "Mushafs & listening", [F("🖍️", "المصاحف", "Mushafs", /^(?!.*(الموسوعة|بيان الإسلام|سمّع|تسميع)).*(hzMushaf|kidsmushaf|tajcolor|مصحف|[Mm]ushaf)/), F("🎧", "الاستماع", "Listening", /surah_gallery|listen/)]),
    G("qiraat", "📜", "القراءات العشر", "The Ten Qira'at", [F("👥", "القرّاء والرواة", "Readers & narrators", /qiraat/)]),
    G("maqamat", "🎼", "المقامات", "The maqamat", [F("🎵", "الأساسية والفرعية", "Main & branches", /الأساسية|الفرعية|d\/maqamat|t260\.open\('maqam'\)|[Mm]ain maqam|[Bb]ranch|[Ss]ub-?maqam/), F("🌙", "أنشد معي والأذان", "Sing along & adhan", /أنشد|adhans|nasheed|[Ss]ing along|[Cc]hant/)]),
    G("maqamat", "🎤", "صوتك", "Your voice", [F("🎚️", "مساحتك الصوتية والمُوالف", "Voice space & tuner", /voice242|tuner/), F("🎯", "خمّن وتحدّى", "Guess & challenge", /maqam-game|maqamgame|mqchallenge/)]),
    G("maqamat", "📐", "النظري", "Theory", [F("🪜", "السلم والتحويل", "Scale & modulation", /go16\('maqamat'\)|tahwil/), F("📚", "موسوعة المقامات المتشابهة", "Similar maqamat encyclopedia", /mqc/)]),
    G("arabic", "🔤", "الحروف والقراءة من الصفر", "Letters & reading from zero", [F("🔤", "القراءة من الصفر", "Reading from zero", /reading/)]),
    G("arabic", "🗣️", "اتكلم عربي", "Speak Arabic", [F("📗", "الفصحى", "Fusha", /fusha|abyb|arabiya/), F("🧒", "عربي للأطفال", "Kids Arabic", /kidsar/), F("🇪🇬", "العامية المصرية", "Egyptian", /egyptian|lang','eg'/)]),
    G("arabic", "📐", "النحو والصرف والبلاغة", "Nahw, Sarf & Balagha (grammar, morphology, rhetoric)", [F("📐", "النحو والصرف والبلاغة", "Nahw, Sarf & Balagha", /nahw/)]),
    G("sciences", "🎓", "المنهج والكتب", "Curriculum & books", [F("🎓", "منهج العلوم الشرعية", "Islamic sciences curriculum", /go16\('ilm'\)|#\/ilm|t260\.open\('ilm'\)/), F("📚", "الكتب المشروحة والمصوّرة", "Explained & scanned books", /bk'|fqs|kutub|books192|pdf|الموسوعة|بيان الإسلام|المكتبة المصوّرة|الكتب/)]),
    G("sciences", "📖", "مكتبة العلوم", "Sciences library", [F("📖", "التفسير وعلوم القرآن", "Tafsir & Quranic sciences", /تفسير|علوم القرآن|Tafsir/i), F("📜", "الحديث وعلومه", "Hadith & its sciences", /الحديث|arbaeen|Hadith/i), F("⚖️", "الفقه", "Fiqh", /الفقه|Fiqh/i), F("🌴", "السيرة وقصص الأنبياء", "Seerah & prophets", /السيرة|الأنبياء|prophets|Sira|Prophet/i), F("⭐", "الأعلام والآداب", "Great figures & manners", /alam|أعلام|الآداب|Virtues/i), F("🕋", "العقيدة وأسماء الله", "Aqeedah & names of Allah", /asma|عقيدة|Aqeedah/i)]),
    G("class", "🎥", "الحصص", "Lessons", [F("🎥", "الفصل والحجز", "Classroom & booking", /classroom|booking/), F("👥", "الحصة الجماعية", "Group lesson", /grp238/)]),
    G("class", "🧰", "أدوات الفصل", "Class tools", [F("🖍️", "الوايت بورد", "Whiteboard", /wb24|wb251|السبورة|[Ww]hiteboard/)]),
    G("class", "🎯", "المستوى والأسعار", "Level & pricing", [F("🎯", "حدد مستواك", "Find your level", /level|placement|اعرف مستواك/), F("💳", "الأسعار والكفالة", "Pricing & sponsorship", /pricing|sponsor/)]),
    G("comp", "🏆", "المسابقات", "Competitions", [F("🏆", "المسابقات", "Competitions", /competitions/), F("🌟", "محتوى طلاب الأكاديمية", "Student showcase", /sc255|showcase/)]),
    G("life", "🕌", "الصلاة والأذكار", "Prayer & adhkar", [F("🕰️", "مواقيت الصلاة والقبلة", "Prayer times & qibla", /prayer|qibla/), F("📿", "الأذكار", "Adhkar", /adhkar/)]),
    G("life", "🧰", "أدوات يومية", "Daily tools", [F("📅", "الساعة والتقويم", "Clock & calendar", /clk251|cal224|hijri/), F("🪙", "الزكاة والحساب", "Zakat & calculator", /zakat|calc274/), F("🖼️", "كارت آية", "Ayah card", /ayahcard/)]),
    G("life", "🕌", "حياة المسلم كاملة", "All Muslim life", [F("🕌", "كل أدوات المسلم", "All Muslim tools", /muslim241|life249|t260\.open\('muslim'\)|t260\.open\('life'\)/)])
  ];
  const DEFGONE = {}; ["go16('adhans')", "t260.open('maqam')", "go16('tuner')", "go16('tahwil')"].forEach(k => DEFGONE[k] = 1);
  const REST = ["class", "📂", "أدوات تانية", "Other tools"];

  /* ---------- كل أدوات المنصة (من غير تكرار) ---------- */
  const norm = s => String(s || "").replace(/[ً-ْـ]/g, "").replace(/[()\[\]«»—–\-،,.:؛!؟?]/g, " ").replace(/\s+/g, " ").trim().toLowerCase();
  function allTools() { const out = [], seen = new Set(), seenT = new Set(); const push = (ic, t, go) => { if (!t || !go) return; if (/go16\('lang','(fu|gu|pa)'\)|go16\('abyb'\)|go16\('arabiya'\)|t260\.open\('(arabic|arabiya)'\)/.test(go)) return; const g = String(go).replace(/^location\.hash='#\/(\w+)'$/, "go16('$1')"); const tk = norm(t); const gk = /navigate\('library'\)|tr277\.lib/.test(g) ? "lib|" + tk : g; if (seen.has(gk) || seenT.has(tk)) return; seen.add(gk); seenT.add(tk); out.push({ ic: ic || "•", t, go: g, key: gk, m: push.m || "" }); };
    const secs = (state.data && state.data.sections) || [];
    const libFor = t => { try { const s = secs.find(x => norm(typeof x.title === "object" ? (x.title.ar || "") : x.title) === norm(t) || (typeof x.title === "object" && norm(x.title.en) === norm(t))); return s ? `libGo('${s.id}')` : null; } catch (e) { return null; } };
    try { DOMAINS().forEach(d => (d.tools || []).forEach(x => push(x[0], x[1], /navigate\('library'\)/.test(x[2]) ? (libFor(x[1]) || `tr277.lib(${JSON.stringify(x[1]).replace(/"/g, "'")})`) : x[2]))); } catch (e) {}
    [["🎤", T("مساحتك الصوتية (مداك، تمارين، اكتشف مقامك)", "Your voice space"), "go16('voice242')"], ["🕌", T("الأذان والابتهالات", "Adhan & ibtihalat"), "go16('adhans')"], ["📜", T("القرّاء العشرة ورواتهم", "The ten readers & narrators"), "go16('qiraat10')"], ["🔡", T("تدريب الحركات", "Vowels practice"), "go16('vow172')"], ["🕰️", T("الساعة والتقويم (ميلادي + هجري)", "Clock & calendar"), "go16('clk251')"], ["📅", T("احجز حصة", "Book a lesson"), "navigate('booking')"], ["👥", T("الحصة الجماعية", "Group lesson"), "go16('grp238')"], ["🪙", T("حاسبة الزكاة", "Zakat calculator"), "go16('zakat218')"], ["🧮", T("آلة حاسبة متقدمة", "Advanced calculator"), "go16('calc274')"], ["🕌", T("حياة المسلم", "Muslim life"), "go16('life249')"]].forEach(x => push(x[0], x[1], x[2]));
    try { if (window.t260 && t260.ALL) Object.values(t260.ALL()).forEach(x => { const g = String(x.go || ""); const tgt = g.startsWith("#/") ? `go16('${g.slice(2).split("/")[0]}')` : g; const core = s => { const m = String(s).match(/go16\('([^']+)'(?:,'([^']+)')?\)|#\/([\w-]+)|navigate\('([^']+)'\)/); return m ? (m[1] || m[3] || m[4]) + (m[2] ? '/' + m[2] : '') : s; }; const ck = core(tgt); const dupe = ck !== 'library' && ck !== 'd' && out.some(o => core(o.go) === ck); if (!dupe) { push.m = tgt; push(x.ic, nm(x) || x.ar, `t260.open('${x.id}')`); push.m = ''; } }); } catch (e) {}
    try { secs.filter(s => !s.parent_id && s.is_visible !== false).forEach(s => { const t = typeof s.title === "object" ? nm(s.title) : String(s.title || ""); if (!out.some(o => o.go === `libGo('${s.id}')`)) push(s.icon || "📖", t, `libGo('${s.id}')`); }); } catch (e) {}
    return out; }

  /* ---------- الإعداد ---------- */
  const C0 = () => ({ doors: {}, dadd: [], dord: null, gadd: [], gren: {}, gord: {}, gplace: {}, fadd: [], fren: {}, ford: {}, fdel: {}, place: {}, tord: {}, hide: {} });
  let draft = null; const cfg = () => draft || Object.assign(C0(), JSON.parse(JSON.stringify(setv("tree277", null) || {})));
  async function save(c) { draft = c; render(); try { await saveSetting16("tree277", c); draft = null; } catch (e) { toast(e.message || "error", true); } }

  function model() { const c = cfg();
    let doors = DOORS.map(d => Object.assign({ id: d[0], ic: d[1], ar: d[2], en: d[3], sar: d[4], sen: d[5], c: d[6] }, c.doors[d[0]] || {})).concat((c.dadd || []).map(d => Object.assign({}, d, c.doors[d.id] || {})));
    if (c.dord) doors.sort((a, b) => (c.dord.indexOf(a.id) + 1 || 999) - (c.dord.indexOf(b.id) + 1 || 999));
    const groups = TREE.map((g, i) => ({ id: "g" + i, d: g.d, ic: g.ic, ar: g.ar, en: g.en, fs: g.f })).concat((c.gadd || []).map(g => Object.assign({ fs: [] }, g)));
    groups.forEach(g => { Object.assign(g, c.gren[g.id] || {}); if (c.gplace[g.id]) g.d = c.gplace[g.id]; });
    if (!groups.some(g => g.id === "rest")) groups.push({ id: "rest", d: REST[0], ic: REST[1], ar: REST[2], en: REST[3], fs: [] });
    const folders = []; groups.forEach(g => { g.fs.forEach((f, j) => folders.push(Object.assign({ id: g.id + "f" + j, g: g.id }, f))); });
    (c.fadd || []).forEach(f => folders.push(Object.assign({}, f)));
    folders.forEach(f => Object.assign(f, c.fren[f.id] || {}));
    const live = folders.filter(f => !c.fdel[f.id]); const fdef = live.find(f => f.g === "rest") || (() => { const x = { id: "restf", g: "rest", ic: "📂", ar: "أدوات تانية", en: "Other tools" }; live.push(x); return x; })();
    const tools = allTools(); const box = {}; live.forEach(f => box[f.id] = []);
    tools.forEach(t => { const p = c.place[t.key]; if (p && box[p]) return box[p].push(t); const s = t.go + " " + (t.m || "") + " " + t.t; const f = live.find(f => f.re && !c.fdel[f.id] && f.re.test(s)); (f ? box[f.id] : box[fdef.id]).push(t); });
    live.forEach(f => { f.tools = box[f.id]; const o = c.tord[f.id]; if (o) f.tools.sort((a, b) => (o.indexOf(a.key) + 1 || 999) - (o.indexOf(b.key) + 1 || 999)); });
    const ids = doors.map(d => d.id); groups.forEach(g => { if (!ids.includes(g.d)) g.d = ids[ids.length - 1]; });
    return { doors, groups, folders: live, tools }; }
  const sortBy = (arr, o) => o ? arr.slice().sort((a, b) => (o.indexOf(a.id) + 1 || 999) - (o.indexOf(b.id) + 1 || 999)) : arr;

  /* ---------- العرض ---------- */
  function html() { const c = cfg(); const M = model(); const ed = own() && state.ed277; const O = own(); const GONE = Object.assign({}, DEFGONE, c.gone || {}); Object.keys(c.ungone || {}).forEach(k => delete GONE[k]); const gone = k => !!GONE[k]; const hid = k => !!c.hide[k] || gone(k); const sees = k => ed || (gone(k) ? false : (!c.hide[k] || O));
    const doors = M.doors.filter(d => sees("D:" + d.id)); let cur = state.hw277 || LS("hw277") || (doors[0] || {}).id; if (!doors.some(d => d.id === cur)) cur = (doors[0] || {}).id; const D = doors.find(d => d.id === cur) || {};
    const OP = LS("op277") || {}; const isOpen = k => OP[k] === 1;
    const tabs = `<div class="tb275">${doors.map(d => `<button class="${d.id === cur ? "on" : ""} ${hid("D:" + d.id) ? "hd275" : ""}" style="--c:${E(d.c || "#0f766e")}" onclick="tr277.tab('${d.id}')">${E(d.ic)} ${E(nm(d))}${ed ? `<span class="e275" onclick="event.stopPropagation();tr277.door('${d.id}')">⚙️</span>` : ""}</button>`).join("")}${ed ? `<button class="add275" onclick="tr277.newDoor()">＋ ${T("قسم جديد", "New section")}</button>` : ""}</div>`;
    const gs = sortBy(M.groups.filter(g => g.d === D.id), c.gord[D.id]);
    const allF = M.folders;
    const cards = gs.map(g => { const fs = sortBy(allF.filter(f => f.g === g.id), c.ford[g.id]).filter(f => ed || f.tools.some(t => sees(t.key))); const n = fs.reduce((a, f) => a + f.tools.filter(t => sees(t.key)).length, 0); if (!ed && (!n || !sees("G:" + g.id))) return ""; const op = ed || isOpen(g.id);
      return `<div class="cd275 ${hid("G:" + g.id) ? "hd275" : ""}" style="--c:${E(D.c || "#0f766e")}"><div class="ch275" onclick="tr277.fold('${g.id}')"><span class="ci275">${E(g.ic)}</span><b>${E(nm(g))}</b><small>${n}</small><i>${op ? "▾" : "◂"}</i></div>
        ${ed ? `<div class="ce275" onclick="event.stopPropagation()"><select onchange="tr277.mvG('${g.id}',this.value)">${M.doors.map(d => `<option value="${d.id}" ${d.id === g.d ? "selected" : ""}>${T("في: ", "In: ")}${E(nm(d))}</option>`).join("")}</select><button onclick="tr277.ord('gord','${D.id}','${g.id}',-1)">↑</button><button onclick="tr277.ord('gord','${D.id}','${g.id}',1)">↓</button><button onclick="tr277.renG('${g.id}')">✏️</button><button onclick="tr277.hide('G:${g.id}')">${hid("G:" + g.id) ? "👁️" : "🙈"}</button><button onclick="tr277.newF('${g.id}')">＋📂</button></div>` : ""}
        ${op ? `<div class="cl275">${fs.map(f => { const ft = f.tools.filter(t => sees(t.key)); const fo = isOpen(f.id);
          return `<div class="fd276"><div class="fh276" onclick="tr277.fold('${f.id}')"><span>${E(f.ic)}</span><b>${E(nm(f))}</b><small>${ft.length}</small><i>${fo ? "▾" : "◂"}</i>${ed ? `<span class="te275" onclick="event.stopPropagation()"><button onclick="tr277.ord('ford','${g.id}','${f.id}',-1)">↑</button><button onclick="tr277.ord('ford','${g.id}','${f.id}',1)">↓</button><button onclick="tr277.renF('${f.id}')">✏️</button><select onchange="tr277.mvF('${f.id}',this.value)"><option value="">↪️ ${T("انقل الفولدر…", "Move folder…")}</option>${M.groups.filter(x => x.id !== g.id).map(x => `<option value="${x.id}">${E(nm(x))}</option>`).join("")}</select><button onclick="tr277.delF('${f.id}')">🗑️</button></span>` : ""}</div>
            ${fo ? `<div class="fl276">${ft.map(t => `<div class="ti275 ${hid(t.key) ? "hd275" : ""}"><button class="tg275" onclick="${E(t.go)}"><span>${E(t.ic)}</span><b>${E(t.t)}</b></button>${ed ? `<span class="te275"><select onchange="tr277.mvT(${J(t.key)},this.value)"><option value="">📂 ${T("انقلها لـ…", "Move to…")}</option>${M.doors.map(d => M.groups.filter(x => x.d === d.id).map(x => allF.filter(y => y.g === x.id && y.id !== f.id).map(y => `<option value="${y.id}">${E(nm(d))} › ${E(nm(x))} › ${E(nm(y))}</option>`).join("")).join("")).join("")}</select><button onclick="tr277.ord('tord','${f.id}',${J(t.key)},-1)">↑</button><button onclick="tr277.ord('tord','${f.id}',${J(t.key)},1)">↓</button><button title="${T("إخفاء عن الطلاب (يبقى عندك)", "Hide from students (you still see it)")}" onclick="tr277.hide(${J(t.key)})">${c.hide[t.key] ? "👁️" : "🙈"}</button><button title="${T("حذف من الرئيسية للجميع", "Remove from home for everyone")}" onclick="tr277.del(${J(t.key)})">${gone(t.key) ? "↩️" : "🗑️"}</button></span>` : ""}</div>`).join("") || `<div class="xs muted" style="padding:.3rem">${T("فاضي", "Empty")}</div>`}</div>` : ""}</div>`; }).join("")}</div>` : ""}</div>`; }).join("");
    const head = `<div class="hh275"><div><h2 style="--c:${E(D.c || "")}">${E(D.ic || "")} ${E(nm(D))}</h2><p class="muted">${E(AR() ? (D.sar || "") : (D.sen || D.sar || ""))}</p></div>${own() ? `<button class="btn ${ed ? "btn-p" : "btn-o"} btn-sm" onclick="state.ed277=!state.ed277;render()">${ed ? "✅ " + T("خلصت", "Done") : "✏️ " + T("رتّب المحتوى", "Arrange content")}</button>` : ""}</div>`;
    const bar = ed ? `<div class="row" style="gap:.4rem;margin:.4rem 0;flex-wrap:wrap"><button class="btn btn-o btn-sm" onclick="tr277.newG('${D.id}')">＋ ${T("مجموعة جديدة هنا", "New group here")}</button><button class="btn btn-o btn-sm" onclick="tr277.reset()">↺ ${T("رجّع الترتيب الأصلي", "Reset")}</button></div>` : "";
    return `<section class="sec tr275" id="tr275" style="padding:.8rem 0"><div class="wrap">${tabs}${head}${bar}<div class="gr275">${cards || `<div class="muted">${T("مفيش محتوى هنا", "Nothing here")}</div>`}</div></div></section>`; }

  const pick = (msg, arr) => { const s = prompt(msg + "\n" + arr.map((a, i) => (i + 1) + ") " + a[1]).join("\n")); const i = +s - 1; return arr[i] ? arr[i][0] : null; };
  const ask3 = (o) => { const ar = prompt(T("الاسم بالعربي:", "Arabic name:"), o.ar || ""); if (ar == null || !ar.trim()) return null; const en = prompt(T("الاسم بالإنجليزي:", "English name:"), o.en || ar) || ar; const ic = prompt(T("الأيقونة (إيموجي):", "Icon (emoji):"), o.ic || "📂") || "📂"; return { ar, en, ic }; };
  window.tr277 = {
    tab(id) { state.hw277 = id; LS("hw277", id); render(); setTimeout(() => { const s = document.getElementById("tr275"); s && s.scrollIntoView({ behavior: "smooth", block: "start" }); }, 30); },
    fold(k) { const o = LS("op277") || {}; o[k] = o[k] === 1 ? 0 : 1; LS("op277", o); render(); },
    ord(kind, parent, id, d) { const c = cfg(); const M = model(); let ids;
      if (kind === "gord") ids = sortBy(M.groups.filter(g => g.d === parent), c.gord[parent]).map(g => g.id);
      else if (kind === "ford") ids = sortBy(M.folders.filter(f => f.g === parent), c.ford[parent]).map(f => f.id);
      else ids = (M.folders.find(f => f.id === parent) || { tools: [] }).tools.map(t => t.key);
      const i = ids.indexOf(id), j = i + d; if (i < 0 || j < 0 || j >= ids.length) return; [ids[i], ids[j]] = [ids[j], ids[i]]; c[kind][parent] = ids; save(c); },
    mvG(g, d) { const c = cfg(); c.gplace[g] = d; save(c); },
    mvF(f, g) { if (!g) return; const c = cfg(); const ex = (c.fadd || []).find(x => x.id === f); if (ex) ex.g = g; else { c.fren[f] = Object.assign({}, c.fren[f] || {}, { g }); } save(c); },
    mvT(k, f) { if (!f) return; const c = cfg(); c.place[k] = f; save(c); },
    renG(g) { const M = model(); const x = M.groups.find(y => y.id === g) || {}; const r = ask3(x); if (!r) return; const c = cfg(); const ex = (c.gadd || []).find(y => y.id === g); if (ex) Object.assign(ex, r); else c.gren[g] = Object.assign({}, c.gren[g] || {}, r); save(c); },
    renF(f) { const M = model(); const x = M.folders.find(y => y.id === f) || {}; const r = ask3(x); if (!r) return; const c = cfg(); const ex = (c.fadd || []).find(y => y.id === f); if (ex) Object.assign(ex, r); else c.fren[f] = Object.assign({}, c.fren[f] || {}, r); save(c); },
    newG(d) { const r = ask3({ ic: "📁" }); if (!r) return; const c = cfg(); const id = "u" + Date.now().toString(36); (c.gadd = c.gadd || []).push(Object.assign({ id, d }, r)); (c.fadd = c.fadd || []).push({ id: id + "f", g: id, ic: "📂", ar: r.ar, en: r.en }); const o = LS("op277") || {}; o[id] = 1; LS("op277", o); save(c); },
    newF(g) { const r = ask3({ ic: "📂" }); if (!r) return; const c = cfg(); (c.fadd = c.fadd || []).push(Object.assign({ id: "v" + Date.now().toString(36), g }, r)); save(c); },
    delF(f) { if (!confirm(T("أمسح الفولدر؟ الحاجات اللي جواه هتروح «أدوات تانية» (مش هتتمسح).", "Delete the folder? Its items go to 'Other tools'."))) return; const c = cfg(); c.fdel[f] = 1; c.fadd = (c.fadd || []).filter(x => x.id !== f); Object.keys(c.place).forEach(k => { if (c.place[k] === f) delete c.place[k]; }); save(c); },
    hide(k) { const c = cfg(); if (c.hide[k]) delete c.hide[k]; else c.hide[k] = 1; save(c); },
    del(k) { const c = cfg(); c.gone = c.gone || {}; c.ungone = c.ungone || {}; if (c.gone[k] || (DEFGONE[k] && !c.ungone[k])) { delete c.gone[k]; c.ungone[k] = 1; return save(c); } const t = model().tools.find(x => x.key === k);
      if (!confirm(T("⚠️ «" + (t ? t.t : "") + "» موجودة هنا فقط — إذا حذفتها لن يصل إليها أحد من الرئيسية (تبقى باهتة في وضع الترتيب ويمكنك إرجاعها بـ↩️). إذا أردت إخفاءها عن الطلاب فقط استخدم 🙈. أحذفها؟", "⚠️ This item exists only here. Remove it for everyone? (Use 🙈 to hide from students only.)"))) return; c.gone[k] = 1; delete c.ungone[k]; save(c); },
    newDoor() { const r = ask3({ ic: "📁" }); if (!r) return; const c = cfg(); const id = "x" + Date.now().toString(36); (c.dadd = c.dadd || []).push(Object.assign({ id, c: "#0f766e", sar: "", sen: "" }, r)); state.hw277 = id; save(c); },
    door(id) { const c = cfg(); const M = model(); const d = M.doors.find(x => x.id === id); if (!d) return;
      const act = pick(T("القسم: ", "Section: ") + nm(d), [["ren", T("غيّر الاسم والأيقونة", "Rename / icon")], ["desc", T("غيّر الوصف", "Description")], ["col", T("غيّر اللون", "Colour")], ["l", T("حرّكه قبل", "Move earlier")], ["r", T("حرّكه بعد", "Move later")], ["merge", T("ادمجه في قسم تاني", "Merge into another section")], ["hide", c.hide["D:" + id] ? T("أظهره", "Show") : T("اخفيه", "Hide")], ["del", T("امسحه (محتواه يتنقل)", "Delete (content moves)")]]); if (!act) return;
      const ov = c.doors[id] = Object.assign({}, c.doors[id] || {}); const add = (c.dadd || []).find(x => x.id === id); const tgt = add || ov;
      if (act === "ren") { const r = ask3(d); if (!r) return; Object.assign(tgt, r); }
      else if (act === "desc") { tgt.sar = prompt(T("الوصف:", "Description:"), d.sar || "") || ""; tgt.sen = prompt("English:", d.sen || "") || tgt.sar; }
      else if (act === "col") tgt.c = prompt(T("اللون (مثلًا #0f766e):", "Colour:"), d.c || "#0f766e") || d.c;
      else if (act === "l" || act === "r") { const ids = M.doors.map(x => x.id); const i = ids.indexOf(id), j = i + (act === "l" ? -1 : 1); if (j < 0 || j >= ids.length) return; [ids[i], ids[j]] = [ids[j], ids[i]]; c.dord = ids; }
      else if (act === "hide") { if (c.hide["D:" + id]) delete c.hide["D:" + id]; else c.hide["D:" + id] = 1; }
      else if (act === "merge" || act === "del") { const others = M.doors.filter(x => x.id !== id); const to = pick(T("المحتوى يروح لأنهي قسم؟", "Move its content to which section?"), others.map(x => [x.id, nm(x)])); if (!to) return; M.groups.filter(g => g.d === id).forEach(g => c.gplace[g.id] = to); (c.gadd || []).forEach(g => { if (g.d === id) g.d = to; }); if (add) c.dadd = c.dadd.filter(x => x.id !== id); else c.hide["D:" + id] = 1; state.hw277 = to; }
      save(c); },
    lib(title) { try { const S = (state.data && state.data.sections) || []; const s = S.find(x => norm(typeof x.title === "object" ? (x.title.ar || x.title.en) : x.title) === norm(title)); if (s) return libGo(s.id); } catch (e) {} navigate("library"); },
    reset() { if (!confirm(T("ترجّع الترتيب الأصلي؟ (كل التعديلات هتتمسح)", "Reset to the original layout?"))) return; save({}); }
  };

  /* ---------- الربط: مكان الأقسام في الرئيسية + شيل القايمة القديمة ---------- */
  if (typeof doors147Html === "function") { const _d = doors147Html; doors147Html = function () { if (!FF("v277.home")) return _d.apply(this, arguments); try { return html(); } catch (e) { console.error(e); return _d.apply(this, arguments); } }; }
  const _r = render; render = function () { if (FF("v277.home") && state.route === "home" && state.hw275 && !state.hw277) { const m = { quran: "quran", voice: "maqamat", arabic: "arabic", more: "class" }[state.hw275]; if (m) state.hw277 = m; state.hw275 = null; } const o = _r.apply(this, arguments);
    try { if (FF("v277.home") && state.route === "home") document.querySelectorAll("#app #pth241, #app #px249, #app #more245").forEach(e => e.remove()); } catch (e) {} return o; };
  if (window.tr275) tr275.tab = id => tr277.tab({ quran: "quran", voice: "maqamat", arabic: "arabic", more: "class" }[id] || id);
  css(`body #app #pth241,body #app #px249{display:none!important}`);
})();
