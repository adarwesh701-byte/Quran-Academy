/* ================= v260: قسم «الأدوات» الجديد (Notion 3) — نفس شكل «مساحتي» · الترتيب: المقامات «للقرآن والإنشاد» ← تكلّم عربي ← القراءات العشر ← الأذكار ← … · كل أداة: مفتوحة / «سجّل الأول» (تظهر للزائر وبيقفلها بـ X ويكمّل) / «مدفوع — اشترك في محتوى المنصة» · تحكم كامل للمالك: أقسام، أسماء، أيقونات، ترتيب، نقل، 7 طرق عرض بمعاينة، طريقة الفتح · «مساحتي» للمالك بس + زرار «⬆️ ارفعها للأدوات» على كل حاجة فيها · الطالب: «🧭 رحلتي مع معلمي» والمعلم: «👨‍🏫 مع طلابي» (فيها كل حاجة بين المعلم والطالب) ================= */
(function () {
  const FF = k => { try { return window.ff254(k); } catch (e) { return true; } };
  const AR = () => state.lang === "ar"; const T = (a, e) => AR() ? a : e;
  const css = s => document.head.insertAdjacentHTML("beforeend", `<style>${s}</style>`);
  const own = () => { try { return realRole() === "owner" && !state.preview; } catch (e) { return false; } };
  const R = () => { try { return role(); } catch (e) { return null; } };
  const E = s => { try { return esc(s); } catch (e) { return String(s == null ? "" : s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]); } };
  const J = v => E(JSON.stringify(v));

  /* ---------- الأدوات (الافتراضي بالترتيب اللي في Notion) ---------- */
  /* go: لينك (#/…) أو كود JS · rt: الصفحات اللي الأداة بتغطيها (عشان القفل) · acc: الافتراضي */
  const kind = k => `t260.kind('${k}')`;
  const DEF = [
    ["maqam", "🎼", "تعلّم المقامات الصوتية — للقرآن والإنشاد", "Vocal maqamat — for Quran & nasheed", "سلالم وآهات لكل مقام · المُوالف · التحويل", "#/d/maqamat", ["d/maqamat", "tuner", "tahwil", "mqchallenge"], "paid", "#b45309"],
    ["arabic", "🗣️", "تكلّم عربي", "Speak Arabic", "الفصحى والعامية المصرية وعربي الأطفال وكل أقسام العربي", "#/lang", ["lang", "fusha", "egyptian", "kidsar", "arabiya"], "paid", "#0d9488"],
    ["qiraat", "📜", "القراءات العشر", "The ten Qira'at", "القراء ورواتهم — مفتوحة كاملة", "#/qiraat", ["qiraat", "qiraat10"], "open", "#7c3aed"],
    ["adhkar", "📿", "الأذكار", "Adhkar", "الصباح والمساء والنوم والصلاة", "#/adhkar", ["adhkar"], "login", "#15803d"],
    ["tasmee", "🎤", "سمّع من غير مصحف", "Recite without a mushaf", "اقرا بصوتك والموقع يصحّحلك", "#/tasmee", ["tasmee"], "login", "#db2777"],
    ["ilm", "🎓", "منهج العلوم الشرعية", "Islamic sciences curriculum", "عقيدة وفقه وحديث وسيرة — وفيه قسم العلوم الإسلامية كامل", "#/ilm", ["ilm"], "login", "#0369a1"],
    ["nahw", "📐", "النحو والصرف والبلاغة من الصفر للقمة", "Grammar, morphology & rhetoric", "من أول حرف لحد البلاغة", "#/nahw", ["nahw"], "login", "#9333ea"],
    ["tajcolor", "🖍️", "المصحف الملوّن بأحكام التجويد", "Colour-coded tajweed mushaf", "كل حكم بلونه", kind("tajcolor"), [], "login", "#dc2626"],
    ["makharij", "👄", "مخارج الحروف وصفاتها", "Articulation points", "مخطط لكل حرف بالصوت", "#/makharij", ["makharij"], "login", "#ea580c"],
    ["matn", "📜", "تحفة الأطفال والجزرية", "Tuhfat al-Atfal & Jazariyyah", "المتن بيت بيت بالصوت", "#/matn", ["matn"], "login", "#a16207"],
    ["hifz", "📖", "خطط حفظ ذكية", "Smart memorisation plans", "ورد جديد + مراجعة متباعدة", "#/hifz", ["hifz"], "login", "#16a34a"],
    ["listen", "🎬", "استمع للقرآن مع فيديو", "Listen with video", "كل القرّاء والآية بتظهر وهي بتتقري", kind("surah_gallery"), [], "login", "#0891b2"],
    ["prophets", "🌿", "قصص الأنبياء والسيرة", "Prophets & Seerah", "كل نبي وكل حدث", kind("prophets"), [], "login", "#15803d"],
    ["stories", "🎨", "قصص مصوّرة", "Illustrated stories", "قصص قصيرة للأحكام والسور", "#/stories", ["stories"], "login", "#e11d48"],
    ["khatma", "🤝", "ختمة العيلة", "Family khatma", "قسّموا الختمة على بعض", "#/khatma", ["khatma"], "login", "#0d9488"],
    ["arbaeen", "📗", "الأربعون النووية", "The Forty Hadith", "الحديث وشرحه بالصوت", "#/arbaeen", ["arbaeen"], "login", "#166534"],
    ["asma", "✨", "أسماء الله الحسنى", "The 99 Names", "الاسم ومعناه وبطاقات", "#/asma", ["asma"], "login", "#ca8a04"],
    ["ayahcard", "🖼️", "اعمل كارت آية وشاركه", "Make & share an ayah card", "اختار الآية والخلفية", "#/ayahcard", ["ayahcard"], "login", "#4f46e5"],
    ["prayer", "🕌", "مواقيت الصلاة", "Prayer times", "حسب مكانك وبتوقيتك", "#/prayer", ["prayer"], "login", "#0f766e"],
    ["placement", "🧭", "اعرف مستواك", "Find your level", "اختبار تحديد مستوى", "#/placement", ["placement", "level"], "login", "#2563eb"],
    ["alam", "👥", "أعلام الإسلام", "Great figures of Islam", "الصحابة والصحابيات وآل البيت", "#/alam", ["alam"], "login", "#7c2d12"],
    ["maqamgame", "🎧", "خمّن المقام", "Guess the maqam", "اسمع تلاوة وخمّن المقام", "#/maqam-game", ["maqam-game"], "paid", "#b45309"],
    ["wb", "🖍️", "السبورة (الوايت بورد)", "Whiteboard", "لوحة لانهائية — مجانية للكل", "go16('wb243')", [], "open", "#2563eb"],
    ["books", "📚", "الكتب التفاعلية", "Interactive books", "", "go16('books192')", ["books192"], "login", "#0e7490"],
    ["kutub", "🖼️", "الكتب المصوّرة", "Illustrated books", "", "go16('kutub199')", ["kutub199"], "login", "#9d174d"]
  ].map(a => ({ id: a[0], ic: a[1], ar: a[2], en: a[3], d: a[4], go: a[5], rt: a[6], acc: a[7], c: a[8] }));
  /* حاجات تانية ممكن المالك يضيفها (من الأدوات القديمة ومن «مساحتي») — مش بتتمسح، بس مش ظاهرة لحد ما يضيفها */
  const MORE = [["level", "🎯", "حدد مستواك في كل قسم", "#/level"], ["tjb", "📘", "التجويد المفصّل", "#/tjb"], ["reading", "🔤", "تعلّم القراءة من الصفر", "#/reading"], ["tahwil", "🔀", "التحويل من مقام لمقام", "#/tahwil"], ["mqchallenge", "🏆", "تحدّي المقام", "#/mqchallenge"], ["fusha", "📗", "العربية الفصحى", "#/fusha"], ["egyptian", "🇪🇬", "العامية المصرية", "#/egyptian"], ["kidsmushaf", "🧒", "المصحف المعلّم للأطفال", "#/kidsmushaf"], ["kidsar", "🧒", "عربي للأطفال", "#/kidsar"], ["tuner", "🎙️", "المُوالف: صوتك على المقام", "#/tuner"], ["tjjourney", "🧭", "رحلة التجويد خطوة بخطوة", "#/d/tajweed"], ["tafsir", "📚", "تفسير بلغتك", "#/library"], ["nooraniya", "🔤", "القاعدة النورانية", "#/nooraniya"], ["arabiya", "📗", "العربية الفصحى — المنهج المتكامل", "#/arabiya"],
    ["srs", "🔁", "مراجعة المحفوظ (مثل Anki)", "go16('srs244')"], ["pts", "⭐", "النقاط والمستويات والشارات", "go16('pts244')"], ["wird", "📖", "الورد اليومي", "go16('wird233')"], ["khatmaplan", "🗓️", "خطة ختمة", "go16('khatma233')"], ["kamil", "🧩", "كمّل الآية", "go16('kamil233')"], ["streak", "🔥", "السلسلة وهدف الأسبوع", "go16('streak233')"], ["mirror", "🪞", "المرآة", "go16('mir226')"], ["vt", "📈", "صوتي على خط زمني", "go16('vt226')"], ["hijri", "🗓️", "التقويم الهجري والمناسبات", "go16('cal224')"], ["fc", "🃏", "بطاقات المراجعة", "go16('fc223')"], ["games", "🎮", "ألعاب التعلّم", "go16('games172')"], ["competitions", "🏆", "المسابقات", "go16('competitions')"], ["showcase", "🌟", "محتوى طلاب الأكاديمية", "go16('sc255')"], ["life", "🕋", "حياة المسلم", "go16('life249')"], ["muslim", "🧭", "أدوات المسلم", "go16('muslim241')"]
  ].map(a => ({ id: a[0], ic: a[1], ar: a[2], en: a[2], d: "", go: a[3], rt: [], acc: "login", c: "#475569" }));
  const ALL = () => { const m = {}; DEF.concat(MORE).forEach(x => m[x.id] = x); const cu = (cfg().custom || {}); Object.keys(cu).forEach(k => m[k] = Object.assign({ id: k, rt: [], acc: "login", c: "#475569", d: "" }, cu[k])); return m; };

  /* ---------- الإعداد: site_settings.tools260 ---------- */
  const VIEWS = () => [["tiles", "🔲", T("مربعات (زي مساحتي)", "Tiles (like My space)")], ["cards", "🗂️", T("كروت بوصف", "Cards with description")], ["big", "🖼️", T("كروت كبيرة ملونة", "Big coloured banners")], ["icons", "📱", T("أيقونات زي الموبايل", "Phone-style icons")], ["list", "📋", T("قايمة", "List")], ["carousel", "🎠", T("شريط بيتسحب بالعرض", "Swipe carousel")], ["chips", "💊", T("أزرار صغيرة", "Compact chips")]];
  const defCfg = () => ({ groups: [{ id: "g1", name: T("الأدوات", "Tools"), icon: "🧰", view: "tiles", open: "same", items: DEF.map(x => x.id) }], acc: {}, custom: {}, intro: "" });
  function cfg() { let c = null; try { c = setv("tools260", null); } catch (e) {} if (!c || !Array.isArray(c.groups)) c = defCfg(); return c; }
  const accOf = (id, c) => { c = c || cfg(); const a = (c.acc || {})[id]; if (a) return a; const t = ALL()[id]; return t ? t.acc : "login"; };
  const nm = t => t ? (AR() ? t.ar : (t.en || t.ar)) : "";

  /* ---------- مين معاه اشتراك المحتوى ---------- */
  function paidOK(id) { try { const r = R(); if (realRole() === "owner" || r === "owner" || r === "teacher") return true; } catch (e) {} if (!state.auth || !state.auth.user) return false;
    try { if (libFull()) return true; } catch (e) {} try { if (id === "maqam" || id === "maqamgame") { if (mqPremium()) return true; } } catch (e) {}
    try { const now = Date.now(); return myAccess().some(a => (!a.expires_at || new Date(a.expires_at).getTime() > now) && (a.scope === "all" || a.scope === "feature:" + id || a.scope === "feature:tools")); } catch (e) { return false; } }
  const subGo = "t260.sub()";

  /* ---------- فتح أداة ---------- */
  const go = (t, how) => { if (!t) return; const g = t.go || ""; if (how === "tab" && g[0] === "#") { window.open(location.pathname + g, "_blank"); return; } if (g[0] === "#") { location.hash = g; return; } try { (0, eval)(g); } catch (e) { console.warn("t260 go", e); } };
  window.t260 = window.t260 || {};
  /* الزائر مابيشوفش الأسعار (إعداد hp230) — فبيسجّل الأول وبعدها بيروح على اشتراك المحتوى */
  t260.sub = () => { state.ptab = "content"; if (!state.auth.user) { try { lsSet("itqan_after_hash", "#/pricing"); } catch (e) {} navigate("signup"); return; } navigate("pricing"); };
  t260.open = (id, how) => { const t = ALL()[id]; if (!t) return; const a = accOf(id); if (a === "paid" && !paidOK(id)) { state.t260pw = id; go16("tools260pw", id); return; } go(t, how); };
  t260.kind = k => { const s = (() => { try { return sectionsData(); } catch (e) { return null; } })(); let x = null;
    if (Array.isArray(s)) { if (k === "prophets") { try { x = islChild(["قصص الأنبياء"]); } catch (e) {} } else x = s.find(y => (y.meta || {}).kind === k && y.is_visible !== false); }
    if (x) { try { libGo(x.id); return; } catch (e) {} try { libOpen(x.id); return; } catch (e) {} }
    location.hash = k === "tajcolor" ? "#/d/tajweed" : "#/library"; };

  /* ---------- العرض ---------- */
  function tileHtml(t, g, preview) { const a = accOf(t.id); const lock = a === "paid" && !paidOK(t.id); const badge = a === "paid" ? `<i class="b260 p">${lock ? "🔒 " : ""}${T("مدفوع", "Paid")}</i>` : a === "open" && !state.auth.user ? `<i class="b260 o">${T("مجاني", "Free")}</i>` : "";
    const on = preview ? "" : `onclick="t260.open('${t.id}','${g.open || "same"}');return false;"`; const d = (t.d || "");
    switch (g.view) {
      case "cards": return `<a href="#" class="c260" style="--c:${t.c}" ${on}><span>${t.ic}</span><b>${E(nm(t))}</b>${d ? `<small>${E(d)}</small>` : ""}${badge}</a>`;
      case "big": return `<a href="#" class="bg260" style="--c:${t.c}" ${on}><span>${t.ic}</span><div><b>${E(nm(t))}</b>${d ? `<small>${E(d)}</small>` : ""}</div>${badge}</a>`;
      case "icons": return `<a href="#" class="ic260" style="--c:${t.c}" ${on}><span>${t.ic}</span><b>${E(nm(t))}</b>${a === "paid" ? `<i class="dot260">🔒</i>` : ""}</a>`;
      case "list": return `<a href="#" class="li260" style="--c:${t.c}" ${on}><span>${t.ic}</span><b>${E(nm(t))}</b><small>${E(d)}</small>${badge}<em>›</em></a>`;
      case "chips": return `<a href="#" class="ch260" style="--c:${t.c}" ${on}>${t.ic} ${E(nm(t))}${a === "paid" ? " 🔒" : ""}</a>`;
      case "carousel": return `<a href="#" class="ca260" style="--c:${t.c}" ${on}><span>${t.ic}</span><b>${E(nm(t))}</b>${badge}</a>`;
      default: return `<a href="#" class="mstile t260" style="--c:${t.c}" ${on}><span>${t.ic}</span><b>${E(nm(t))}</b>${badge}</a>`; } }
  function groupHtml(g, preview) { const M = ALL(); const its = (g.items || []).map(id => M[id]).filter(Boolean); const wrap = { tiles: "msgrid", cards: "g260 cards", big: "g260 big", icons: "g260 icons", list: "g260 list", carousel: "g260 carousel", chips: "g260 chips" }[g.view] || "msgrid";
    return `<div class="grp260" data-g="${E(g.id)}">${cfg().groups.length > 1 || preview ? `<h2 class="gh260">${E(g.icon || "")} ${E(g.name || "")}</h2>` : ""}<div class="${wrap}">${its.map(t => tileHtml(t, g, preview)).join("") || `<div class="muted sm">${T("القسم ده فاضي", "This group is empty")}</div>`}</div></div>`; }
  function page() { const c = state.t260d && own() ? state.t260d : cfg();
    const top = own() ? `<div class="row" style="gap:.5rem;flex-wrap:wrap;margin-bottom:.8rem">${state.t260d ? "" : `<button class="btn btn-p" onclick="t260.edit()">✏️ ${T("تحكم كامل في الأدوات", "Full control of tools")}</button>`}<button class="btn btn-o" onclick="go16('myspace')">🏠 ${T("مساحتي (أفكارك)", "My space (your ideas)")}</button></div>` : "";
    const intro = c.intro ? `<p class="muted" style="white-space:pre-line">${E(c.intro)}</p>` : "";
    const body = state.t260d && own() ? editor(c) : c.groups.map(g => groupHtml(g)).join("");
    return pageWrap("🧰", T("الأدوات", "Tools"), T("كل أدوات المنصة في مكان واحد", "All platform tools in one place"), top + intro + body, 1150); }

  /* ---------- المحرر (للمالك) — بيشتغل على نسخة، ومافيش حاجة بتتحفظ غير لما تدوس «احفظ» ---------- */
  t260.edit = () => { state.t260d = JSON.parse(JSON.stringify(cfg())); render(); };
  t260.cancel = () => { state.t260d = null; render(); };
  t260.save = async () => { const d = state.t260d; if (!d) return; await saveSetting16("tools260", d); state.t260d = null; toast("✅ " + T("اتحفظ", "Saved")); render(); };
  t260.reset = () => { if (!confirm(T("ترجّع الأدوات للترتيب الأصلي؟ (الأدوات اللي ضفتها من مساحتك هتفضل في القايمة تقدر ترجّعها)", "Reset to the default layout?"))) return; const k = state.t260d.custom; state.t260d = defCfg(); state.t260d.custom = k || {}; render(); };
  const D = () => state.t260d; const G = gid => D().groups.find(g => g.id === gid);
  t260.gset = (gid, k, v) => { const g = G(gid); if (g) g[k] = v; render(); };
  t260.gmove = (gid, dir) => { const a = D().groups; const i = a.findIndex(g => g.id === gid); const j = i + dir; if (j < 0 || j >= a.length) return; [a[i], a[j]] = [a[j], a[i]]; render(); };
  t260.gdel = gid => { const g = G(gid); if (!g) return; if ((g.items || []).length && !confirm(T("تشيل القسم؟ الأدوات اللي جواه هتتنقل لأول قسم.", "Delete group? Its tools move to the first group."))) return; D().groups = D().groups.filter(x => x.id !== gid); if (!D().groups.length) D().groups.push({ id: "g" + Date.now(), name: T("الأدوات", "Tools"), icon: "🧰", view: "tiles", open: "same", items: [] }); D().groups[0].items = D().groups[0].items.concat(g.items || []); render(); };
  t260.gadd = () => { const n = prompt(T("اسم القسم الجديد", "New group name")); if (!n) return; D().groups.push({ id: "g" + Date.now(), name: n, icon: "📁", view: "tiles", open: "same", items: [] }); render(); };
  t260.imove = (gid, id, dir) => { const g = G(gid); const a = g.items; const i = a.indexOf(id); const j = i + dir; if (i < 0 || j < 0 || j >= a.length) return; [a[i], a[j]] = [a[j], a[i]]; render(); };
  t260.ito = (gid, id, to) => { const g = G(gid), h = G(to); if (!g || !h || g === h) return; g.items = g.items.filter(x => x !== id); h.items.push(id); render(); };
  t260.idel = (gid, id) => { const g = G(gid); g.items = g.items.filter(x => x !== id); render(); };
  t260.iadd = (gid, id) => { if (!id) return; const g = G(gid); D().groups.forEach(x => x.items = x.items.filter(y => y !== id)); g.items.push(id); render(); };
  t260.acc = (id, v) => { D().acc = D().acc || {}; D().acc[id] = v; render(); };
  t260.iren = id => { const t = ALL()[id]; const n = prompt(T("الاسم", "Name"), nm(t)); if (n == null) return; const ic = prompt(T("الأيقونة (إيموجي)", "Icon (emoji)"), t.ic); D().custom = D().custom || {}; D().custom[id] = Object.assign({}, t, D().custom[id] || {}, { ar: n || t.ar, en: n || t.en, ic: ic || t.ic }); render(); };
  t260.link = gid => { const n = prompt(T("اسم الأداة", "Tool name")); if (!n) return; const u = prompt(T("اللينك (مثلاً #/hifz أو https://…)", "Link (#/hifz or https://…)")); if (!u) return; const ic = prompt(T("أيقونة (إيموجي)", "Icon (emoji)"), "⭐") || "⭐"; const id = "c" + Date.now(); D().custom = D().custom || {}; D().custom[id] = { ar: n, en: n, ic, go: /^https?:/.test(u) ? `window.open(${JSON.stringify(u)},'_blank')` : u, c: "#475569", acc: "login", d: "" }; G(gid).items.push(id); render(); };
  function editor(c) { const M = ALL(); const used = new Set(c.groups.flatMap(g => g.items));
    const avail = Object.values(M).filter(t => !used.has(t.id));
    const accSel = id => { const a = accOf(id, c); return `<select class="in s260" onchange="t260.acc('${id}',this.value)"><option value="open" ${a === "open" ? "selected" : ""}>🔓 ${T("مفتوحة للكل", "Open")}</option><option value="login" ${a === "login" ? "selected" : ""}>📝 ${T("سجّل الأول", "Sign up first")}</option><option value="paid" ${a === "paid" ? "selected" : ""}>💳 ${T("مدفوع — اشترك", "Paid — subscribe")}</option></select>`; };
    const groups = c.groups.map((g, gi) => `<div class="card ed260"><div class="row" style="gap:.4rem;flex-wrap:wrap;align-items:center"><input class="in" style="width:4rem;text-align:center" value="${E(g.icon || "")}" onchange="t260.gset('${g.id}','icon',this.value)" title="${T("الأيقونة", "Icon")}"><input class="in" style="flex:1;min-width:10rem" value="${E(g.name || "")}" onchange="t260.gset('${g.id}','name',this.value)"><button class="btn btn-o" onclick="t260.gmove('${g.id}',-1)" ${gi ? "" : "disabled"}>▲</button><button class="btn btn-o" onclick="t260.gmove('${g.id}',1)" ${gi < c.groups.length - 1 ? "" : "disabled"}>▼</button><button class="btn btn-o" onclick="t260.gdel('${g.id}')">🗑️</button></div>
      <div class="xs muted" style="margin:.5rem 0 .2rem">${T("طريقة العرض (دوس وشوف المعاينة تحت)", "View (click to preview below)")}</div><div class="row" style="gap:.3rem;flex-wrap:wrap">${VIEWS().map(v => `<button class="btn ${g.view === v[0] ? "btn-p" : "btn-o"} vw260" onclick="t260.gset('${g.id}','view','${v[0]}')">${v[1]} ${v[2]}</button>`).join("")}</div>
      <div class="row xs" style="gap:.4rem;align-items:center;margin-top:.4rem">${T("الأداة بتتفتح:", "Tools open:")} <select class="in s260" onchange="t260.gset('${g.id}','open',this.value)"><option value="same" ${g.open !== "tab" ? "selected" : ""}>${T("في نفس الصفحة", "In the same page")}</option><option value="tab" ${g.open === "tab" ? "selected" : ""}>${T("في تاب جديد", "In a new tab")}</option></select></div>
      <div class="pv260"><div class="xs muted">👁️ ${T("معاينة", "Preview")}</div>${groupHtml(g, true)}</div>
      <div class="its260">${g.items.map((id, i) => { const t = M[id]; if (!t) return ""; return `<div class="it260"><span>${t.ic}</span><b>${E(nm(t))}</b>${accSel(id)}<select class="in s260" onchange="t260.ito('${g.id}','${id}',this.value)"><option value="">${T("انقل لـ…", "Move to…")}</option>${c.groups.filter(x => x.id !== g.id).map(x => `<option value="${x.id}">${E(x.icon || "")} ${E(x.name)}</option>`).join("")}</select><button class="btn btn-o" onclick="t260.imove('${g.id}','${id}',-1)" ${i ? "" : "disabled"}>▲</button><button class="btn btn-o" onclick="t260.imove('${g.id}','${id}',1)" ${i < g.items.length - 1 ? "" : "disabled"}>▼</button><button class="btn btn-o" title="${T("الاسم والأيقونة", "Name & icon")}" onclick="t260.iren('${id}')">✏️</button><button class="btn btn-o" title="${T("شيلها من الأدوات", "Remove")}" onclick="t260.idel('${g.id}','${id}')">✕</button></div>`; }).join("")}</div>
      <div class="row" style="gap:.4rem;flex-wrap:wrap;margin-top:.5rem"><select class="in" style="flex:1;min-width:12rem" onchange="t260.iadd('${g.id}',this.value)"><option value="">➕ ${T("ضيف أداة هنا (من الأدوات ومن مساحتك)…", "Add a tool here…")}</option>${avail.map(t => `<option value="${t.id}">${t.ic} ${E(nm(t))}</option>`).join("")}</select><button class="btn btn-o" onclick="t260.link('${g.id}')">🔗 ${T("لينك مخصص", "Custom link")}</button></div></div>`).join("");
    return `<div class="card" style="border:2px solid var(--accent);position:sticky;top:.5rem;z-index:5;display:flex;gap:.5rem;flex-wrap:wrap;align-items:center"><b>✏️ ${T("بتعدّل الأدوات — الطلاب والزوار مش هيشوفوا حاجة لحد ما تحفظ", "Editing tools — nothing changes for others until you save")}</b><span style="flex:1"></span><button class="btn btn-p" onclick="t260.save()">💾 ${T("احفظ", "Save")}</button><button class="btn btn-o" onclick="t260.cancel()">${T("إلغاء", "Cancel")}</button><button class="btn btn-o" onclick="t260.reset()">↺ ${T("الترتيب الأصلي", "Default")}</button></div>
      <div class="card"><label class="l">${T("كلمة فوق الأدوات (اختياري)", "Text above the tools (optional)")}</label><textarea class="in" rows="2" onchange="state.t260d.intro=this.value">${E(c.intro || "")}</textarea></div>${groups}<button class="btn btn-p" onclick="t260.gadd()">➕ ${T("إنشاء قسم جديد", "Create a new group")}</button>
      <div class="card xs muted" style="margin-top:.8rem">🔓 ${T("مفتوحة: أي حد يدخل علطول", "Open: anyone goes straight in")} · 📝 ${T("سجّل الأول: الزائر يشوف رسالة التسجيل وبيقفلها بـ X ويكمّل", "Sign up first: visitors see a sign-up box they can close with X")} · 💳 ${T("مدفوع: «محتوى مدفوع — اشترك في محتوى المنصة» + لينك الاشتراك", "Paid: «Paid content — subscribe» + link")}</div>`; }

  /* ---------- صفحة «محتوى مدفوع» ---------- */
  function paywall(id) { const t = ALL()[id] || {}; return pageWrap(t.ic || "🔒", nm(t) || T("محتوى مدفوع", "Paid content"), "", `<div class="card pw260"><div style="font-size:3rem">🔒</div><h2>${T("محتوى مدفوع", "Paid content")}</h2><p class="muted">${T("الجزء ده للمشتركين في محتوى المنصة.", "This part is for platform-content subscribers.")}</p><button class="btn btn-p" style="font-size:1.1rem" onclick="${subGo}">⭐ ${T("اشترك في محتوى المنصة من هنا", "Subscribe to the platform content")}</button>${!state.auth.user ? `<p class="xs muted" style="margin-top:.6rem">${T("معاك اشتراك؟", "Already subscribed?")} <a href="#" onclick="lsSet('itqan_after_hash','#/alltools');navigate('login');return false;">${T("سجّل دخول", "Sign in")}</a></p>` : ""}<div style="margin-top:.8rem"><button class="btn btn-o" onclick="go16('alltools')">🧰 ${T("رجوع للأدوات", "Back to tools")}</button></div></div>`, 700); }

  /* ---------- القفل على الصفحات نفسها (لو حد دخل من لينك مباشر) ---------- */
  const curKey = () => (state.route || "") + (state.pageArg ? "/" + state.pageArg : "");
  function toolOfRoute() { const k = curKey(), r = state.route; const M = ALL(); const used = cfg().groups.flatMap(g => g.items); for (const id of used) { const t = M[id]; if (t && (t.rt || []).some(x => x === k || x === r)) return t; } return null; }
  let lastLR = "";
  function loginNag(t) { if (state.auth.user || document.getElementById("lg260")) return; const k = curKey(); if (k === lastLR) return; lastLR = k;
    const m = document.createElement("div"); m.id = "lg260"; m.className = "notr"; m.innerHTML = `<div class="lgbox260"><button class="x260" onclick="document.getElementById('lg260').remove()" aria-label="close">✕</button><div style="font-size:2.4rem">${t.ic}</div><h3>${T("سجّل الأول عشان تحفظ تقدّمك", "Sign up first to save your progress")}</h3><p class="sm muted">${T("الحساب مجاني وبياخد 30 ثانية — أو اقفل الرسالة دي وكمّل تتفرج.", "Free account in 30 seconds — or close this and keep browsing.")}</p><div class="row" style="gap:.5rem;justify-content:center;flex-wrap:wrap"><button class="btn btn-p" onclick="lsSet('itqan_after_hash','#/${E(k)}');navigate('signup')">✨ ${T("حساب جديد", "Create account")}</button><button class="btn btn-o" onclick="lsSet('itqan_after_hash','#/${E(k)}');navigate('login')">${T("تسجيل الدخول", "Sign in")}</button></div></div>`;
    m.addEventListener("click", e => { if (e.target === m) m.remove(); }); document.body.appendChild(m); }
  /* كل الصفحات دي بتترسم من خلال «alltools» عشان كل التعديلات اللي على الشرايط تفضل شغالة */
  try { const _ra = renderAllTools; renderAllTools = function () { if (!FF("v260.tools")) return _ra.apply(this, arguments); const x = state.__t260; if (x && x.k === "pw") return paywall(x.id); if (x && x.k === "trip") return trip(); return page(); }; } catch (e) { console.warn("v260 renderAllTools", e); }
  const _r = render; render = function () {
    let x = null;
    if (FF("v260.tools")) {
      if (state.route === "tools") state.route = "alltools";
      if (state.route === "myspace" && state.auth.user && !own() && FF("v260.myspace")) { state.route = "trip260"; try { history.replaceState(null, "", "#/trip260"); } catch (e) {} }
      if (state.route === "tools260pw") x = { k: "pw", id: state.pageArg || state.t260pw };
      else if (state.route === "trip260" && FF("v260.myspace")) x = { k: "trip" };
      else { const t = toolOfRoute(); if (t && accOf(t.id) === "paid" && !paidOK(t.id)) x = { k: "pw", id: t.id }; }
    }
    if (!x) { const o = _r.apply(this, arguments); after(); return o; }
    const real = state.route; state.__t260 = x; state.route = "alltools"; let o; try { o = _r.apply(this, arguments); } finally { state.route = real; state.__t260 = null; } after(); return o; };
  function after() { try { if (!FF("v260.tools")) return; const t = toolOfRoute(); if (t && accOf(t.id) === "login") setTimeout(() => loginNag(t), 400); else if (!t) lastLR = ""; myspaceUp(); rowFix(); } catch (e) { console.warn("v260", e); } }
  ["alltools", "tools260pw", "trip260"].forEach(p => { try { if (!PAGES16.includes(p)) PAGES16.push(p); } catch (e) {} });

  /* الزائر: قفل الزوار القديم (guestlock164) مايقفلش الأدوات المفتوحة و«سجّل الأول» — بيشوفها، وبتظهرله رسالة التسجيل */
  function guestOK() { if (!FF("v260.tools")) return false; const r = state.route, k = curKey(); if (r === "alltools" || r === "tools260pw") return true; const M = ALL(); const c = cfg();
    for (const id of c.groups.flatMap(g => g.items)) { const t = M[id]; if (!t || accOf(id, c) === "paid") continue; if ((t.rt || []).some(x => x === k || x === r)) return true;
      if (r === "library" && state.libSec && /t260\.kind\('([a-z_]+)'\)/.test(t.go || "")) { const kk = RegExp.$1; try { const s = sectionsData(); if (Array.isArray(s)) { const x = kk === "prophets" ? islChild(["قصص الأنبياء"]) : s.find(y => (y.meta || {}).kind === kk); if (x && x.id === state.libSec) return true; } } catch (e) {} } }
    return false; }
  try { const _sv = setv; setv = function (k) { if (k === "guestlock164" && guestOK()) return false; return _sv.apply(this, arguments); }; } catch (e) { console.warn("v260 setv", e); }

  /* القراءات العشر مفتوحة كاملة للي يدخل */
  try { const _lf = libFull; libFull = function () { if (FF("v260.tools") && ["qiraat", "qiraat10"].includes(state.route) && accOf("qiraat") === "open") return true; return _lf.apply(this, arguments); }; } catch (e) {}

  /* ---------- «مساحتي» للمالك: زرار ⬆️ على كل حاجة يرفعها للأدوات ---------- */
  function myspaceUp() { if (state.route !== "myspace" || !own() || !FF("v260.myspace")) return; const g = document.querySelector("#app .msgrid"); if (!g || g.__u260) return; g.__u260 = 1;
    const hd = document.createElement("div"); hd.className = "card sm"; hd.id = "msh260"; hd.innerHTML = `🏠 <b>${T("مساحتي — ليك انت بس", "My space — only you")}</b> · ${T("دوس ⬆️ على أي حاجة عشان ترفعها للأدوات عند الطلاب والزوار.", "Press ⬆️ on anything to publish it to everyone's Tools.")} <button class="btn btn-o" style="padding:.1rem .6rem" onclick="go16('alltools')">🧰 ${T("افتح الأدوات", "Open tools")}</button>`; g.parentElement.insertBefore(hd, g);
    const used = new Set(cfg().groups.flatMap(x => x.items).map(id => (ALL()[id] || {}).go));
    g.querySelectorAll(".mstile").forEach(b => { const on = b.getAttribute("onclick") || ""; if (!on) return; const up = document.createElement("i"); up.className = "up260" + (used.has(on) ? " on" : ""); up.textContent = used.has(on) ? "✓" : "⬆️"; up.title = T("ارفعها للأدوات", "Publish to Tools"); up.onclick = e => { e.stopPropagation(); e.preventDefault(); t260.up(b); }; b.style.position = "relative"; b.appendChild(up); }); }
  t260.up = async b => { const on = b.getAttribute("onclick") || ""; const ic = (b.querySelector("span") || {}).textContent || "⭐"; const name = ((b.querySelector("b") || {}).textContent || "").trim(); const c = JSON.parse(JSON.stringify(cfg()));
    const ex = Object.values(ALL()).find(t => t.go === on); if (ex && c.groups.some(g => g.items.includes(ex.id))) return toast(T("موجودة في الأدوات بالفعل ✓", "Already in Tools ✓"));
    let gi = 0; if (c.groups.length > 1) { const a = prompt(T("في أنهي قسم؟ اكتب الرقم:\n", "Which group? number:\n") + c.groups.map((g, i) => (i + 1) + ") " + g.name).join("\n"), "1"); if (a == null) return; gi = Math.max(0, Math.min(c.groups.length - 1, (+a || 1) - 1)); }
    const id = ex ? ex.id : "m" + Date.now(); if (!ex) { c.custom = c.custom || {}; c.custom[id] = { ar: name, en: name, ic, go: on, c: getComputedStyle(b).getPropertyValue("--c") || "#475569", acc: "login", d: "" }; }
    c.groups[gi].items.push(id); await saveSetting16("tools260", c); toast("⬆️ " + T("اترفعت للأدوات", "Published to Tools")); b.querySelector(".up260").textContent = "✓"; };

  /* ---------- «رحلتي مع معلمي» (طالب/ولي أمر) و«مع طلابي» (معلم) ---------- */
  const it = (ic, t, go, c) => `<button class="mstile" style="--c:${c}" onclick="${go}"><span>${ic}</span><b>${E(t)}</b></button>`;
  function tripItems(rl) { const dash = t => `state.dash.tab='${t}';navigate('dashboard')`;
    if (rl === "teacher") return [it("📅", T("الجدول والكاليندر", "Calendar"), dash("calendar"), "#0d9488"), it("🎥", T("الفصل والحصص", "Classroom"), "navigate('classroom')", "#2563eb"), it("👨‍🎓", T("طلابي", "My students"), dash("mystudents"), "#15803d"), it("📂", T("ملفات طلابي", "Students' files"), "go16('sfile')", "#0ea5e9"), it("📝", T("الواجبات", "Homework"), dash("homework"), "#7c3aed"), it("👨‍🏫", T("لوحة المعلم (الحصص والواجبات)", "Teacher board"), "go16('tch196')", "#0369a1"), it("🖍️", T("الوايت بورد", "Whiteboard"), "go16('wb243')", "#2563eb"), it("👥", T("اجتماع جماعي (رابط)", "Group meeting link"), "meetCreate()", "#9333ea"), it("🕒", T("مواعيدي المتاحة", "My availability"), dash("schedule"), "#0891b2"), it("💰", T("أرباحي", "Earnings"), dash("dues"), "#a16207"), it("🏆", T("المسابقات", "Competitions"), "go16('competitions')", "#b45309"), it("💬", T("الرسائل", "Messages"), dash("messages"), "#475569")];
    return [it("📅", T("الحصص والجدول", "Lessons & schedule"), dash("lessons"), "#0d9488"), it("🎥", T("الفصل", "Classroom"), "navigate('classroom')", "#2563eb"), it("🧑‍🏫", T("مع معلمي", "With my teacher"), "go16('me196')", "#0369a1"), it("📝", T("الواجبات", "Homework"), dash("homework"), "#7c3aed"), it("🎤", T("التسميع", "Recite from memory"), "go16('tasmee')", "#db2777"), it("🎓", T("شهادتي", "My certificates"), dash("mycerts"), "#a16207"), it("🗺️", T("رحلتي", "My journey"), "go16('journey172')", "#15803d"), it("🏅", T("إنجازاتي", "Achievements"), "go16('badges172')", "#ca8a04"), it("📂", T("ملفي ومتابعتي", "My file & progress"), "go16('sfile')", "#0ea5e9"), it("🖍️", T("الوايت بورد", "Whiteboard"), "go16('wb243')", "#2563eb"), it("💳", T("الاشتراكات والدفع", "Billing"), dash("billing"), "#0891b2"), it("💬", T("الرسائل", "Messages"), dash("messages"), "#475569")]; }
  function trip() { if (!state.auth.user) return pageWrap("🧭", T("رحلتي مع معلمي", "My journey with my teacher"), "", needLogin("trip260"));
    const rl = own() ? (state.trip260 || "student") : R(); const tch = rl === "teacher";
    const sw = own() ? `<div class="row" style="gap:.4rem;margin-bottom:.8rem"><span class="xs muted">${T("عاين كـ:", "Preview as:")}</span><button class="btn ${!tch ? "btn-p" : "btn-o"}" onclick="state.trip260='student';render()">🧑‍🎓 ${T("طالب", "Student")}</button><button class="btn ${tch ? "btn-p" : "btn-o"}" onclick="state.trip260='teacher';render()">👨‍🏫 ${T("معلم", "Teacher")}</button></div>` : "";
    let tc = ""; try { if (!tch) tc = `<div style="margin-top:1rem">${teacherCard(true)}</div>`; } catch (e) {}
    return pageWrap(tch ? "👨‍🏫" : "🧭", tch ? T("مع طلابي", "With my students") : T("رحلتي مع معلمي", "My journey with my teacher"), tch ? T("الجداول والحصص والطلاب وملفاتهم والواجبات — كل حاجة بينك وبين طلابك", "Schedule, lessons, students, files and homework") : T("الحصص والواجبات والشهادات والتسميع وإنجازاتك — كل حاجة بينك وبين معلمك", "Lessons, homework, certificates, recitation and achievements"), sw + `<div class="msgrid">${tripItems(rl).join("")}</div>` + tc); }

  /* ---------- شريط لوحتي: «مساحتي» للمالك بس · الطالب «رحلتي مع معلمي» · المعلم «مع طلابي» · الرسائل اتشالت ---------- */
  function rowFix() { if (!FF("v260.myspace")) return; const my = document.querySelector('#app .unav a[onclick^="go16(\'myspace\')"]'); const row = my && my.parentElement; if (!row || row.__r260) return; row.__r260 = 1; if (own()) return; const tch = R() === "teacher";
    my.setAttribute("onclick", "go16('trip260');return false;"); my.textContent = tch ? T("👨‍🏫 مع طلابي", "👨‍🏫 With my students") : T("🧭 رحلتي مع معلمي", "🧭 My journey");
    [...row.querySelectorAll("a")].forEach(a => { const s = a.getAttribute("onclick") || ""; if (a !== my && /dash\.tab='(lessons|messages|calendar|mystudents|dues|schedule)'/.test(s)) a.remove(); }); }

  css(`.b260{position:absolute;top:.35rem;inset-inline-end:.35rem;font-style:normal;font-size:.68rem;font-weight:800;padding:.08rem .45rem;border-radius:999px;background:#fef3c7;color:#92400e}.b260.o{background:#dcfce7;color:#166534}
  .t260,.c260,.ca260{position:relative}.gh260{font-size:1.15rem;margin:1.1rem 0 .5rem}
  .g260.cards{display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:.7rem}.c260{position:relative;display:flex;flex-direction:column;gap:.25rem;padding:1rem;border-radius:16px;border:1px solid var(--line);background:var(--card,#fff);text-decoration:none;color:inherit;border-top:4px solid var(--c);transition:transform .15s,box-shadow .15s}.c260:hover{transform:translateY(-3px);box-shadow:0 8px 22px rgba(0,0,0,.08)}.c260 span{font-size:1.8rem}.c260 small{color:var(--muted);font-size:.8rem}
  .g260.big{display:grid;grid-template-columns:repeat(auto-fill,minmax(320px,1fr));gap:.8rem}.bg260{position:relative;display:flex;gap:.9rem;align-items:center;padding:1.2rem;border-radius:20px;color:#fff;text-decoration:none;background:linear-gradient(135deg,var(--c),color-mix(in srgb,var(--c) 60%,#000));min-height:110px;box-shadow:0 6px 18px rgba(0,0,0,.12)}.bg260 span{font-size:2.6rem}.bg260 b{font-size:1.1rem;display:block}.bg260 small{opacity:.9;font-size:.82rem}.bg260 .b260{background:rgba(255,255,255,.9)}
  .g260.icons{display:grid;grid-template-columns:repeat(auto-fill,minmax(92px,1fr));gap:1rem .5rem}.ic260{position:relative;display:flex;flex-direction:column;align-items:center;gap:.35rem;text-decoration:none;color:inherit;text-align:center}.ic260 span{width:64px;height:64px;border-radius:18px;display:grid;place-items:center;font-size:2rem;background:linear-gradient(145deg,var(--c),color-mix(in srgb,var(--c) 55%,#000));box-shadow:0 4px 12px rgba(0,0,0,.18)}.ic260 b{font-size:.74rem;line-height:1.2}.dot260{position:absolute;top:-4px;inset-inline-end:14px;font-style:normal;font-size:.8rem}
  .g260.list{display:flex;flex-direction:column;gap:.35rem}.li260{position:relative;display:flex;align-items:center;gap:.7rem;padding:.7rem 1rem;border-radius:12px;border:1px solid var(--line);background:var(--card,#fff);text-decoration:none;color:inherit;border-inline-start:4px solid var(--c)}.li260 span{font-size:1.4rem}.li260 small{color:var(--muted);flex:1;font-size:.8rem}.li260 .b260{position:static}.li260 em{font-style:normal;color:var(--muted)}
  .g260.carousel{display:flex;gap:.7rem;overflow-x:auto;scroll-snap-type:x mandatory;padding-bottom:.5rem}.ca260{flex:0 0 170px;scroll-snap-align:start;display:flex;flex-direction:column;gap:.5rem;align-items:center;justify-content:center;text-align:center;height:150px;border-radius:18px;text-decoration:none;color:#fff;background:linear-gradient(160deg,var(--c),color-mix(in srgb,var(--c) 55%,#000))}.ca260 span{font-size:2.4rem}.ca260 .b260{background:rgba(255,255,255,.9)}
  .g260.chips{display:flex;flex-wrap:wrap;gap:.4rem}.ch260{padding:.4rem .85rem;border-radius:999px;border:1.5px solid var(--c);color:inherit;text-decoration:none;font-weight:700;font-size:.88rem}.ch260:hover{background:var(--c);color:#fff}
  .ed260{margin:.8rem 0}.pv260{margin:.7rem 0;padding:.7rem;border:2px dashed var(--line);border-radius:14px;max-height:340px;overflow:auto}.pv260 .gh260{margin-top:.2rem}.its260{display:flex;flex-direction:column;gap:.3rem}.it260{display:flex;gap:.35rem;align-items:center;flex-wrap:wrap;padding:.35rem .5rem;border:1px solid var(--line);border-radius:10px}.it260 b{flex:1;min-width:9rem;font-size:.9rem}.it260 .btn{padding:.12rem .5rem}.s260{width:auto;padding:.2rem .4rem;font-size:.8rem}.vw260{padding:.2rem .6rem;font-size:.8rem}
  .pw260{text-align:center;padding:2rem 1rem}.pw260 h2{margin:.4rem 0}
  #lg260{position:fixed;inset:0;z-index:9990;background:rgba(15,23,42,.5);display:grid;place-items:center;padding:1rem;animation:f260 .2s}.lgbox260{position:relative;background:var(--card,#fff);color:var(--text,#111);border-radius:20px;padding:1.6rem 1.3rem 1.3rem;max-width:400px;width:100%;text-align:center;box-shadow:0 20px 50px rgba(0,0,0,.3)}.lgbox260 h3{margin:.3rem 0}.x260{position:absolute;top:.5rem;inset-inline-end:.6rem;border:0;background:var(--line,#eee);width:32px;height:32px;border-radius:50%;font-size:1rem;cursor:pointer}@keyframes f260{from{opacity:0}to{opacity:1}}
  .up260{position:absolute;top:.25rem;inset-inline-start:.25rem;font-style:normal;font-size:.8rem;background:#fff;border:1px solid var(--line);border-radius:8px;padding:0 .3rem;cursor:pointer;z-index:2}.up260.on{background:#dcfce7}`);
})();
