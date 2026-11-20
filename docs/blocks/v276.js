/* ================= v276: الرئيسية — طلب المالك 20/11 (2) — جوه كل مجموعة فولدرات صغيرة بتتفتح تحتها (الحاجات الشبه بعض مع بعض) بترتيب مبدئي، وكل حاجة مقفولة افتراضيًا (المجموعات والفولدرات)، وكل حاجات القايمة القديمة («مساحتك الصوتية»، «الأذان والابتهالات»، «القرّاء العشرة»، «العربية بين يديك»، «حياة المسلم»، «احجز حصة»، «الحصة الجماعية»، «الوايت بورد»، الساعة…) اتضافت جوه أقسامها · المالك في «✏️ رتّب»: فولدر جديد بأي اسم وأيقونة، تغيير اسم/أيقونة الفولدر، مسح فولدر (أدواته مابتتمسحش)، ترتيب، نقل أي أداة لأي فولدر أو أي مجموعة، والشيل بيحذّرك لو الحاجة مش موجودة في أي مكان تاني ================= */
(function () {
  const FF = k => { try { return window.ff254(k); } catch (e) { return true; } };
  const AR = () => state.lang === "ar"; const T = (a, e) => AR() ? a : e;
  const E = s => { try { return esc(s); } catch (e) { return String(s == null ? "" : s); } };
  const own = () => { try { return realRole() === "owner" && !state.preview; } catch (e) { return false; } };
  const css = s => document.head.insertAdjacentHTML("beforeend", `<style>${s}</style>`);
  const LS = (k, v) => { try { if (v === undefined) return JSON.parse(localStorage.getItem(k) || "null"); localStorage.setItem(k, JSON.stringify(v)); } catch (e) { return null; } };
  const nm = o => o ? (AR() ? (o.ar || o.en) : (o.en || o.ar)) : "";
  const J = s => E(JSON.stringify(s));

  /* ---------- الإعداد ---------- */
  function C() { const c = Object.assign({ doors: null, place: {}, order: {}, hide: {}, dom: {}, newDoms: {}, tplace: {}, torder: {} }, JSON.parse(JSON.stringify(setv("tree275", null) || {})));
    if (!Array.isArray(c.doors) || !c.doors.length) c.doors = DOORS147.map(d => ({ id: d.id, ic: d.ic, ar: d.ar, en: d.en, sar: d.sar, sen: d.sen, c: d.c })); return c; }
  let draft = null; const cfg = () => draft || C();
  async function save(c) { draft = c; render(); try { await saveSetting16("tree275", c); draft = null; } catch (e) { toast(e.message || "error", true); } }

  /* ---------- كل العقد (المجموعات) والأدوات ---------- */
  function nodes() { const out = [];
    try { DOMAINS().forEach(d => out.push({ k: "d:" + d.k, ic: d.ic || "📁", t: { ar: (d.t || {}).ar, en: (d.t || {}).en }, s: d.s, c: d.color, door: door147Of(d), tools: (d.tools || []).map(x => ({ ic: x[0], t: x[1], go: x[2] })) })); } catch (e) {}
    try { if (window.t260 && t260.cfg && t260.ALL) { const A = t260.ALL(); (t260.cfg().groups || []).forEach(g => out.push({ k: "g:" + g.id, ic: g.icon || "🧰", t: { ar: g.name, en: g.name }, c: "#475569", door: "more", tools: (g.items || []).map(id => A[id]).filter(Boolean).map(x => ({ ic: x.ic, t: nm(x) || x.ar, go: `t260.open(${JSON.stringify(x.id).replace(/"/g, "'")})` })) })); } } catch (e) {}
    try { const S = (state.data && state.data.sections) || []; const top = S.filter(s => !s.parent_id && s.is_visible !== false); if (top.length) out.push({ k: "lib", ic: "📚", t: { ar: "المكتبة", en: "Library" }, c: "#0369a1", door: "more", tools: top.map(s => ({ ic: s.icon || "📖", t: typeof s.title === "object" ? nm(s.title) : String(s.title || ""), go: `libGo('${s.id}')` })) }); } catch (e) {}
    const X = { maqamat: [["🎤", T("مساحتك الصوتية (مداك، تمارين، اكتشف مقامك)", "Your voice space"), "go16('voice242')"], ["🕌", T("الأذان والابتهالات", "Adhan & ibtihalat"), "go16('adhans')"]], hifz: [["📜", T("القرّاء العشرة ورواتهم", "The ten readers & narrators"), "go16('qiraat10')"]], tajweed: [["🔡", T("تدريب الحركات", "Vowels practice"), "go16('vow172')"]], arabic: [["📘", T("العربية بين يديك", "Al-Arabiyyah Bayna Yadayk"), "go16('arabiya')"]], sciences: [["🕌", T("حياة المسلم — كل أدوات المسلم", "Muslim life — all tools"), "go16('muslim241')"], ["🕰️", T("الساعة والتقويم (ميلادي + هجري)", "Clock & calendar"), "go16('clk251')"]], classroom: [["📅", T("احجز حصة", "Book a lesson"), "navigate('booking')"], ["👥", T("الحصة الجماعية", "Group lesson"), "go16('grp238')"], ["🖍️", T("الوايت بورد", "Whiteboard"), typeof window.wb249 === "object" ? "go16('wb249')" : "go16('wb243')"]] };
    out.forEach(n => { const a = X[n.k.slice(2)]; if (a && n.k.startsWith("d:")) a.forEach(x => { if (!n.tools.some(t => t.go === x[2])) n.tools.push({ ic: x[0], t: x[1], go: x[2] }); }); });
    const c = cfg(); Object.entries(c.newDoms || {}).forEach(([k, v]) => out.push({ k, ic: v.ic || "📁", t: { ar: v.ar, en: v.en || v.ar }, c: v.c || "#475569", door: v.door || "more", tools: [], custom: 1 }));
    out.forEach(n => { const r = (c.dom || {})[n.k]; if (r) { if (r.ar) n.t = { ar: r.ar, en: r.en || r.ar }; if (r.ic) n.ic = r.ic; } if (c.place[n.k]) n.door = c.place[n.k]; n.tools.forEach(t => t.key = n.k + "|" + t.t); });
    /* نقل الأدوات بين المجموعات */
    const all = {}; out.forEach(n => n.tools.forEach(t => all[t.key] = t)); out.forEach(n => n.tools = n.tools.filter(t => !c.tplace[t.key] || c.tplace[t.key] === n.k));
    Object.entries(c.tplace || {}).forEach(([tk, nk]) => { const t = all[tk]; const n = out.find(x => x.k === nk); if (t && n && !n.tools.includes(t)) n.tools.push(t); });
    out.forEach(n => { const o = (c.torder || {})[n.k]; if (o) n.tools.sort((a, b) => (o.indexOf(a.key) + 1 || 999) - (o.indexOf(b.key) + 1 || 999)); });
    const ids = c.doors.map(d => d.id); out.forEach(n => { if (!ids.includes(n.door)) n.door = ids[ids.length - 1]; });
    return out; }
  const RULES = {
    "d:hifz": [["📅", "خطة الحفظ والجلسات", "Plan & sessions", /hzTab|hifzt|khatma|growth/], ["🎤", "التسميع والمصاحف", "Recitation & mushafs", /tasmee|hzMushaf|kidsmushaf/], ["📜", "القراءات ومحتوى الطلاب", "Qira'at & student content", /qiraat|sc255/], ["🎯", "المستوى والاختبارات والألعاب", "Level, tests & games", /level|placement|games|nooraniya/]],
    "d:tajweed": [["📘", "الأحكام والدروس", "Rules & lessons", /tjb|tf228|makharij|nooraniya|vow172|رحلة|journey/], ["📖", "المصاحف", "Mushafs", /مصحف|kidsmushaf|Mushaf/], ["🎤", "التطبيق والتصحيح", "Practice & correction", /tasmee|games|قصة|story/i], ["🎯", "المستوى والتقدّم", "Level & progress", /level|growth|qiraat/]],
    "d:maqamat": [["🎼", "المقامات", "The maqamat", /الأساسية|الفرعية|أنشد|Main|Branch|Sing|adhans|maqamat'\)/], ["🎤", "صوتك والتدريب", "Your voice & training", /tuner|voice242|maqam-game|challenge/], ["📐", "النظري والتحويل", "Theory & modulation", /tahwil|mqc/], ["🎯", "المستوى", "Level", /level/]],
    "d:sciences": [["📚", "العلوم والكتب", "Sciences & books", /ilm|تفسير|الحديث|الفقه|السيرة|الأنبياء|علوم|الآداب|Tafsir|Hadith|Fiqh|Sira|Prophets|Sciences|Virtues|kutub|fqs|alam/i], ["🕌", "أدوات المسلم", "Muslim tools", /adhkar|prayer|ayahcard|arbaeen|asma|muslim241|clk251/], ["🎯", "المستوى", "Level", /level/]],
    "d:arabic": [["🔤", "الحروف والقراءة من الصفر", "Letters & reading from zero", /reading|kidsar|nooraniya|tf228/], ["🗣️", "اتكلم عربي", "Speak Arabic", /lang'|egyptian/], ["📘", "الفصحى والنحو", "Fusha & grammar", /abyb|arabiya|fusha|nahw/], ["🎯", "المستوى", "Level", /level|placement/]],
    "d:classroom": [["🎥", "الحصص والحجز", "Lessons & booking", /classroom|booking|grp238/], ["🧰", "أدوات الفصل", "Class tools", /wb24|growth/], ["💳", "الأسعار والكفالة", "Pricing & sponsorship", /pricing|sponsor/], ["🎯", "المستوى", "Level", /level/]],
    "*": [["🎼", "المقامات والصوت", "Maqamat & voice", /maqam|tuner|tahwil|mq|nasheed|voice/i], ["🕌", "القرآن والتجويد", "Quran & tajweed", /tasmee|hifz|tajcolor|makharij|matn|listen|qiraat|tjb|mushaf|surah/i], ["✍️", "العربي", "Arabic", /arabic|nahw|lang|fusha|egypt|kids/i], ["📚", "العلوم والقصص", "Sciences & stories", /ilm|prophets|stories|adhkar|alam|libGo|seerah/i], ["🧰", "أدوات يومية", "Daily tools", /prayer|wb|clk|cal|zakat|calc|qibla/i]]
  };
  function folders(n) { const c = cfg(); const R = (RULES[n.k] || RULES["*"]); const auto = R.map((r, i) => ({ id: "a" + i, ic: r[0], ar: r[1], en: r[2], re: r[3] })); const cu = ((c.folders || {})[n.k] || []).map(f => Object.assign({}, f));
    const ren = (c.fren || {})[n.k] || {}; auto.forEach(f => { if (ren[f.id]) Object.assign(f, ren[f.id]); });
    const all = auto.concat(cu).filter(f => !(c.fdel || {})[n.k + "/" + f.id]); const box = {}; all.forEach(f => box[f.id] = []); const rest = [];
    n.tools.forEach(t => { const p = (c.fplace || {})[t.key]; if (p && box[p]) return box[p].push(t); const f = all.find(f => f.re && f.re.test(t.go + " " + t.t)); if (f) box[f.id].push(t); else rest.push(t); });
    const L = all.map(f => Object.assign(f, { tools: box[f.id] })); if (rest.length) L.push({ id: "rest", ic: "📂", ar: "أدوات تانية", en: "Other tools", tools: rest });
    const fo = (c.forder || {})[n.k]; if (fo) L.sort((a, b) => (fo.indexOf(a.id) + 1 || 999) - (fo.indexOf(b.id) + 1 || 999)); return L; }
  const inDoor = (id, ns) => { const c = cfg(); const o = c.order[id] || []; return ns.filter(n => n.door === id).sort((a, b) => (o.indexOf(a.k) + 1 || 999) - (o.indexOf(b.k) + 1 || 999)); };

  /* ---------- العرض في الرئيسية ---------- */
  function html() { const c = cfg(); const ns = nodes(); const ed = own() && state.ed275; const hid = k => !!c.hide[k];
    const doors = c.doors.filter(d => ed || !hid("door:" + d.id)); let cur = state.hw275 || LS("hw275") || (doors[0] || {}).id; if (!doors.some(d => d.id === cur)) cur = (doors[0] || {}).id;
    const D = doors.find(d => d.id === cur) || doors[0] || {};
    const tabs = `<div class="tb275">${doors.map(d => `<button class="${d.id === cur ? "on" : ""} ${hid("door:" + d.id) ? "hd275" : ""}" style="--c:${E(d.c || "#0f766e")}" onclick="tr276.tab('${d.id}')">${E(d.ic)} ${E(nm(d))}${ed ? `<span class="e275" onclick="event.stopPropagation();tr276.door('${d.id}')">⚙️</span>` : ""}</button>`).join("")}${ed ? `<button class="add275" onclick="tr276.newDoor()">＋ ${T("قسم جديد", "New section")}</button>` : ""}</div>`;
    const list = inDoor(D.id, ns).filter(n => ed || (!hid(n.k) && n.tools.some(t => !hid(t.key)) || (ed)));
    const open = LS("op275") || {}; if (ed) list.forEach(n => { if (open[n.k] == null) open[n.k] = 1; });
    const cards = list.map((n, i) => { const tools = n.tools.filter(t => ed || !hid(t.key)); const shut = open[n.k] !== 1;
      return `<div class="cd275 ${hid(n.k) ? "hd275" : ""}" style="--c:${E(n.c || D.c || "#0f766e")}"><div class="ch275" onclick="tr276.fold('${n.k}')"><span class="ci275">${E(n.ic)}</span><b>${E(nm(n.t))}</b><small>${tools.length}</small><i>${shut ? "◂" : "▾"}</i></div>
        ${ed ? `<div class="ce275" onclick="event.stopPropagation()"><select onchange="tr276.mvNode('${n.k}',this.value)">${c.doors.map(d => `<option value="${d.id}" ${d.id === n.door ? "selected" : ""}>${T("في: ", "In: ")}${E(nm(d))}</option>`).join("")}</select><button onclick="tr276.up('${D.id}','${n.k}',-1)">↑</button><button onclick="tr276.up('${D.id}','${n.k}',1)">↓</button><button onclick="tr276.ren('${n.k}')">✏️</button><button onclick="tr276.hide('${n.k}')">${hid(n.k) ? "👁️" : "🙈"}</button>${n.custom ? `<button onclick="tr276.delDom('${n.k}')">🗑️</button>` : ""}</div>` : ""}
        ${shut ? "" : `<div class="cl275">${folders(n).filter(f => ed || f.tools.some(t => !hid(t.key))).map(f => { const fk = n.k + "/" + f.id; const fo = (LS("of276") || {})[fk] === 1; const ft = f.tools.filter(t => ed || !hid(t.key));
          return `<div class="fd276"><div class="fh276" onclick="tr276.ffold(${J(fk)})"><span>${E(f.ic)}</span><b>${E(nm(f))}</b><small>${ft.length}</small><i>${fo ? "▾" : "◂"}</i>${ed ? `<span class="te275" onclick="event.stopPropagation()"><button onclick="tr276.fup(${J(n.k)},${J(f.id)},-1)">↑</button><button onclick="tr276.fup(${J(n.k)},${J(f.id)},1)">↓</button>${f.id !== "rest" ? `<button onclick="tr276.fren(${J(n.k)},${J(f.id)})">✏️</button><button onclick="tr276.fdel(${J(n.k)},${J(f.id)})">🗑️</button>` : ""}</span>` : ""}</div>
          ${fo ? `<div class="fl276">${ft.map(t => `<div class="ti275 ${hid(t.key) ? "hd275" : ""}"><button class="tg275" onclick="${E(t.go)}"><span>${E(t.ic || "•")}</span><b>${E(t.t)}</b></button>${ed ? `<span class="te275"><select onchange="tr276.mvF(${J(t.key)},this.value)"><option value="">📂 ${T("انقلها لفولدر…", "Move to folder…")}</option>${folders(n).filter(x => x.id !== "rest").map(x => `<option value="${E(n.k + "@" + x.id)}">${E(x.ic)} ${E(nm(x))}</option>`).join("")}</select><select onchange="tr276.mvTool(${J(t.key)},this.value)"><option value="">↪️ ${T("انقلها لمجموعة تانية…", "Move to another group…")}</option>${ns.filter(m => m.k !== n.k).map(m => `<option value="${m.k}">${E(nm(m.t))}</option>`).join("")}</select><button onclick="tr276.del(${J(t.key)})">${hid(t.key) ? "👁️" : "🗑️"}</button></span>` : ""}</div>`).join("") || `<div class="xs muted" style="padding:.3rem">${T("فاضي", "Empty")}</div>`}</div>` : ""}</div>`; }).join("")}${ed ? `<button class="add275 nf276" onclick="tr276.newF(${J(n.k)})">＋ 📂 ${T("فولدر جديد", "New folder")}</button>` : ""}</div>`}</div>`; }).join("");
    const head = `<div class="hh275"><div><h2>${E(D.ic || "")} ${E(nm(D))}</h2><p class="muted">${E(AR() ? (D.sar || "") : (D.sen || D.sar || ""))}</p></div>${own() ? `<button class="btn ${ed ? "btn-p" : "btn-o"} btn-sm" onclick="state.ed275=!state.ed275;render()">${ed ? "✅ " + T("خلصت", "Done") : "✏️ " + T("رتّب المحتوى", "Arrange content")}</button>` : ""}</div>`;
    const tools = ed ? `<div class="row" style="gap:.4rem;margin:.4rem 0"><button class="btn btn-o btn-sm" onclick="tr276.newDom('${D.id}')">＋ ${T("مجموعة جديدة هنا", "New group here")}</button><button class="btn btn-o btn-sm" onclick="tr276.reset()">↺ ${T("رجّع الترتيب الأصلي", "Reset")}</button></div>` : "";
    return `<section class="sec tr275 tr276" id="tr275" style="padding:.8rem 0"><div class="wrap">${tabs}${head}${tools}<div class="gr275">${cards || `<div class="muted">${T("مفيش محتوى هنا", "Nothing here")}</div>`}</div></div></section>`; }

  const pick = (msg, arr) => { const s = prompt(msg + "\n" + arr.map((a, i) => (i + 1) + ") " + a[1]).join("\n")); const i = +s - 1; return arr[i] ? arr[i][0] : null; };
  window.tr276 = {
    tab(id) { state.hw275 = id; LS("hw275", id); render(); setTimeout(() => { const s = document.getElementById("tr275"); s && s.scrollIntoView({ behavior: "smooth", block: "start" }); }, 30); },
    fold(k) { const o = LS("op275") || {}; o[k] = o[k] === 1 ? 0 : 1; LS("op275", o); render(); },
    mvNode(k, door) { const c = cfg(); c.place[k] = door; save(c); },
    up(door, k, d) { const c = cfg(); const ks = inDoor(door, nodes()).map(n => n.k); const i = ks.indexOf(k), j = i + d; if (j < 0 || j >= ks.length) return; [ks[i], ks[j]] = [ks[j], ks[i]]; c.order[door] = ks; save(c); },
    tup(nk, tk, d) { const c = cfg(); const n = nodes().find(x => x.k === nk); if (!n) return; const ks = n.tools.map(t => t.key); const i = ks.indexOf(tk), j = i + d; if (j < 0 || j >= ks.length) return; [ks[i], ks[j]] = [ks[j], ks[i]]; c.torder = c.torder || {}; c.torder[nk] = ks; save(c); },
    mvTool(tk, nk) { const c = cfg(); c.tplace[tk] = nk; save(c); },
    hide(k) { const c = cfg(); if (c.hide[k]) delete c.hide[k]; else c.hide[k] = 1; save(c); },
    ren(k) { const c = cfg(); const n = nodes().find(x => x.k === k); const ar = prompt(T("الاسم بالعربي:", "Arabic name:"), n ? n.t.ar : ""); if (ar == null) return; const en = prompt(T("الاسم بالإنجليزي:", "English name:"), n ? n.t.en : "") || ar; const ic = prompt(T("الأيقونة (إيموجي):", "Icon (emoji):"), n ? n.ic : "📁") || "📁"; c.dom[k] = { ar, en, ic }; if (c.newDoms[k]) Object.assign(c.newDoms[k], { ar, en, ic }); save(c); },
    newDom(door) { const ar = prompt(T("اسم المجموعة الجديدة:", "New group name:")); if (!ar) return; const ic = prompt(T("الأيقونة:", "Icon:"), "📁") || "📁"; const c = cfg(); const k = "n:" + Date.now().toString(36); c.newDoms[k] = { ar, en: ar, ic, door }; save(c); },
    delDom(k) { if (!confirm(T("أمسح المجموعة؟ أدواتها هترجع لمكانها الأصلي.", "Delete this group? Its tools go back to where they were."))) return; const c = cfg(); delete c.newDoms[k]; Object.keys(c.tplace).forEach(t => { if (c.tplace[t] === k) delete c.tplace[t]; }); save(c); },
    newDoor() { const ar = prompt(T("اسم القسم الجديد:", "New section name:")); if (!ar) return; const en = prompt(T("بالإنجليزي:", "English:"), ar) || ar; const ic = prompt(T("الأيقونة:", "Icon:"), "📁") || "📁"; const c = cfg(); const id = "x" + Date.now().toString(36); c.doors.push({ id, ic, ar, en, sar: "", sen: "", c: "#0f766e" }); state.hw275 = id; save(c); },
    door(id) { const c = cfg(); const d = c.doors.find(x => x.id === id); if (!d) return;
      const act = pick(T("القسم: ", "Section: ") + nm(d), [["ren", T("غيّر الاسم والأيقونة والوصف", "Rename / icon / description")], ["col", T("غيّر اللون", "Colour")], ["l", T("حرّكه يمين/قبل", "Move earlier")], ["r", T("حرّكه شمال/بعد", "Move later")], ["merge", T("ادمجه في قسم تاني", "Merge into another section")], ["hide", c.hide["door:" + id] ? T("أظهره", "Show") : T("اخفيه", "Hide")], ["del", T("امسحه (محتواه يتنقل)", "Delete (content moves)")]]);
      if (!act) return; const i = c.doors.indexOf(d);
      if (act === "ren") { const ar = prompt(T("الاسم:", "Name:"), d.ar); if (ar == null) return; d.ar = ar; d.en = prompt("English:", d.en || ar) || ar; d.ic = prompt(T("الأيقونة:", "Icon:"), d.ic) || d.ic; d.sar = prompt(T("الوصف:", "Description:"), d.sar || "") || ""; d.sen = d.sen || d.sar; }
      else if (act === "col") { d.c = prompt(T("اللون (مثلًا #0f766e):", "Colour (e.g. #0f766e):"), d.c || "#0f766e") || d.c; }
      else if (act === "l" && i > 0) { [c.doors[i - 1], c.doors[i]] = [c.doors[i], c.doors[i - 1]]; }
      else if (act === "r" && i < c.doors.length - 1) { [c.doors[i + 1], c.doors[i]] = [c.doors[i], c.doors[i + 1]]; }
      else if (act === "hide") { if (c.hide["door:" + id]) delete c.hide["door:" + id]; else c.hide["door:" + id] = 1; }
      else if (act === "merge" || act === "del") { const others = c.doors.filter(x => x.id !== id); if (!others.length) return; const to = pick(T("المحتوى يروح لأنهي قسم؟", "Move its content to which section?"), others.map(x => [x.id, nm(x)])); if (!to) return; nodes().filter(n => n.door === id).forEach(n => c.place[n.k] = to); Object.keys(c.newDoms).forEach(k => { if (c.newDoms[k].door === id) c.newDoms[k].door = to; }); c.doors = others; state.hw275 = to; }
      save(c); },
    ffold(fk) { const o = LS("of276") || {}; o[fk] = o[fk] === 1 ? 0 : 1; LS("of276", o); render(); },
    mvF(tk, v) { if (!v) return; const [nk, fid] = v.split("@"); const c = cfg(); c.fplace = c.fplace || {}; c.fplace[tk] = fid; if (!tk.startsWith(nk + "|")) c.tplace[tk] = nk; save(c); },
    newF(nk) { const ar = prompt(T("اسم الفولدر:", "Folder name:")); if (!ar) return; const en = prompt("English:", ar) || ar; const ic = prompt(T("الأيقونة (إيموجي):", "Icon (emoji):"), "📂") || "📂"; const c = cfg(); c.folders = c.folders || {}; (c.folders[nk] = c.folders[nk] || []).push({ id: "f" + Date.now().toString(36), ar, en, ic }); save(c); },
    fren(nk, fid) { const c = cfg(); const f = folders(nodes().find(x => x.k === nk)).find(x => x.id === fid) || {}; const ar = prompt(T("الاسم:", "Name:"), f.ar); if (ar == null) return; const en = prompt("English:", f.en || ar) || ar; const ic = prompt(T("الأيقونة:", "Icon:"), f.ic) || f.ic; const cu = ((c.folders || {})[nk] || []).find(x => x.id === fid); if (cu) Object.assign(cu, { ar, en, ic }); else { c.fren = c.fren || {}; c.fren[nk] = c.fren[nk] || {}; c.fren[nk][fid] = { ar, en, ic }; } save(c); },
    fdel(nk, fid) { if (!confirm(T("أمسح الفولدر؟ الأدوات اللي جواه هتروح «أدوات تانية» في نفس المجموعة، مش هتتمسح.", "Delete folder? Its tools move to 'Other tools'."))) return; const c = cfg(); c.folders = c.folders || {}; c.folders[nk] = (c.folders[nk] || []).filter(x => x.id !== fid); c.fdel = c.fdel || {}; if (fid[0] === "a") c.fdel[nk + "/" + fid] = 1; Object.keys(c.fplace || {}).forEach(k => { if (c.fplace[k] === fid) c.fplace[k] = "rest"; }); save(c); },
    fup(nk, fid, d) { const c = cfg(); const ids = folders(nodes().find(x => x.k === nk)).map(f => f.id); const i = ids.indexOf(fid), j = i + d; if (j < 0 || j >= ids.length) return; [ids[i], ids[j]] = [ids[j], ids[i]]; c.forder = c.forder || {}; c.forder[nk] = ids; save(c); },
    del(tk) { const c = cfg(); if (c.hide[tk]) { delete c.hide[tk]; return save(c); } const ns = nodes(); const t = ns.flatMap(n => n.tools).find(x => x.key === tk); const elsewhere = t && ns.some(n => n.tools.some(x => x.key !== tk && x.go === t.go && !c.hide[x.key] && !c.hide[n.k]));
      if (!elsewhere && !confirm(T("⚠️ «" + (t ? t.t : "") + "» مش موجودة في أي مكان تاني في الرئيسية — لو شلتها مش هيبقى ليها مكان يوصلها منه حد (هتفضل ظاهرة باهتة هنا في وضع الترتيب لو حبيت ترجّعها). أكمّل؟", "⚠️ This isn't anywhere else on the home page — removing it leaves no way to reach it. Continue?"))) return;
      if (elsewhere && !confirm(T("أشيلها من هنا؟ (موجودة في مكان تاني)", "Remove from here? (exists elsewhere)"))) return; c.hide[tk] = 1; save(c); },
    reset() { if (!confirm(T("ترجّع الترتيب الأصلي؟ (الأقسام والمجموعات اللي عملتها هتتمسح)", "Reset to the original layout?"))) return; save({}); }
  };
  window.tr275 = Object.assign(window.tr275 || {}, { tab: tr276.tab });

  if (typeof doors147Html === "function") { const _d = doors147Html; doors147Html = function () { if (!FF("v276.home")) return _d.apply(this, arguments); try { return html(); } catch (e) { console.error(e); return _d.apply(this, arguments); } }; }
  css(`.fd276{border:1px solid color-mix(in srgb,var(--c) 22%,var(--line));border-radius:16px;background:var(--card);overflow:hidden}
  .fh276{display:flex;align-items:center;gap:.5rem;padding:.6rem .7rem;cursor:pointer}.fh276 b{flex:1}.fh276>span:first-child{font-size:1.2rem}.fh276 small{opacity:.6;font-size:.75rem}.fh276 i{font-style:normal;opacity:.6}
  .fl276{display:flex;flex-direction:column;gap:.4rem;padding:0 .5rem .6rem}.nf276{border:1px dashed var(--line);background:none;border-radius:12px;padding:.4rem;cursor:pointer;color:inherit}`);

  /* ---------- «مارس المقام بصوتك»: السلم بالدرجات + الآهات تحت آخر الصفحة كمان (ومكانهم الأصلي زي ما هو) ---------- */
  if (typeof maqamOne === "function") { const _mo = maqamOne; maqamOne = function (cur) { let h = _mo.apply(this, arguments); if (state.mqTab !== "vtest" || !FF("v276.mqprac")) return h; try { const m = ((cur && cur.meta) || {}).maqam; if (!m) return h;
      let lad = ""; try { lad = mqDegPage(m); } catch (e) {}
      let aah = ""; try { const d = document.createElement("div"); const t0 = state.mqTab; state.mqTab = "aah"; let a; try { a = maqamPage("aah", m); } finally { state.mqTab = t0; } d.innerHTML = a; const c = [...d.querySelectorAll(".card")].find(x => { const h3 = x.querySelector("h3"); return h3 && h3.textContent.indexOf(L("vtStep2").slice(0, 8)) === 0; }); if (c) aah = c.outerHTML; } catch (e) {}
      if (!lad && !aah) return h; return h + `<div class="mp276"><h3 class="mph276">🎼 ${T("السلم بالدرجات والآهات", "Scale degrees & aahs")}</h3>${lad}${aah}</div>`; } catch (e) { return h; } }; }
  css(`.mp276{margin-top:1.4rem;padding-top:1rem;border-top:2px dashed var(--line)}.mph276{margin:0 0 .6rem}`);

  /* ---------- العامية: صوت Azure مصري لحد ما تترفع التسجيلات (التسجيل المرفوع له الأولوية) ---------- */
  if (typeof rdSay === "function") { const _s = rdSay; rdSay = function (t) { const eg = state.route === "egyptian" || (state.pl265 && state.pl265.sec === "egyptian");
      if (eg && FF("v276.egtts") && state.auth && state.auth.user && typeof ttsPlay === "function") { try { const u = typeof vUrl84 === "function" && vUrl84("t:" + t); if (u && !state.vMode84) return vPlayUrl84(u); } catch (e) {} try { return ttsPlay(t, "eg-a", true); } catch (e) {} }
      return _s.apply(this, arguments); }; }
})();
