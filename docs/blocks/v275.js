/* ================= v275: الرئيسية = كل محتوى الأكاديمية في مكان واحد (طلب المالك 20/11) — نفس تقسيمة «القرآن · الصوت والمقامات · العربي · الفصل والمزيد» بنفس الأسامي، بتختار القسم من فوق والمحتوى بيظهر تحته على طول (من غير صفحة تانية)، وكل حاجة في الموقع جواها: الأقسام وأدواتها + كل الأدوات + المكتبة. صفحة «الأقسام» وصفحة «كل الأدوات» بيرجّعوا للرئيسية. المالك: ✏️ رتّب — قسم جديد، تغيير الاسم والأيقونة واللون، دمج قسمين، حذف قسم (محتواه بيتنقل مش بيتمسح)، نقل أي مجموعة لأي قسم، مجموعة جديدة، نقل أي أداة لأي مجموعة، إخفاء/إظهار، ترتيب ↑↓ — والحفظ في site_settings.tree275 · + زرار «رجوع» ثابت للموبايل والتابلت والتطبيق ================= */
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
    const c = cfg(); Object.entries(c.newDoms || {}).forEach(([k, v]) => out.push({ k, ic: v.ic || "📁", t: { ar: v.ar, en: v.en || v.ar }, c: v.c || "#475569", door: v.door || "more", tools: [], custom: 1 }));
    out.forEach(n => { const r = (c.dom || {})[n.k]; if (r) { if (r.ar) n.t = { ar: r.ar, en: r.en || r.ar }; if (r.ic) n.ic = r.ic; } if (c.place[n.k]) n.door = c.place[n.k]; n.tools.forEach(t => t.key = n.k + "|" + t.t); });
    /* نقل الأدوات بين المجموعات */
    const all = {}; out.forEach(n => n.tools.forEach(t => all[t.key] = t)); out.forEach(n => n.tools = n.tools.filter(t => !c.tplace[t.key] || c.tplace[t.key] === n.k));
    Object.entries(c.tplace || {}).forEach(([tk, nk]) => { const t = all[tk]; const n = out.find(x => x.k === nk); if (t && n && !n.tools.includes(t)) n.tools.push(t); });
    out.forEach(n => { const o = (c.torder || {})[n.k]; if (o) n.tools.sort((a, b) => (o.indexOf(a.key) + 1 || 999) - (o.indexOf(b.key) + 1 || 999)); });
    const ids = c.doors.map(d => d.id); out.forEach(n => { if (!ids.includes(n.door)) n.door = ids[ids.length - 1]; });
    return out; }
  const inDoor = (id, ns) => { const c = cfg(); const o = c.order[id] || []; return ns.filter(n => n.door === id).sort((a, b) => (o.indexOf(a.k) + 1 || 999) - (o.indexOf(b.k) + 1 || 999)); };

  /* ---------- العرض في الرئيسية ---------- */
  function html() { const c = cfg(); const ns = nodes(); const ed = own() && state.ed275; const hid = k => !!c.hide[k];
    const doors = c.doors.filter(d => ed || !hid("door:" + d.id)); let cur = state.hw275 || LS("hw275") || (doors[0] || {}).id; if (!doors.some(d => d.id === cur)) cur = (doors[0] || {}).id;
    const D = doors.find(d => d.id === cur) || doors[0] || {};
    const tabs = `<div class="tb275">${doors.map(d => `<button class="${d.id === cur ? "on" : ""} ${hid("door:" + d.id) ? "hd275" : ""}" style="--c:${E(d.c || "#0f766e")}" onclick="tr275.tab('${d.id}')">${E(d.ic)} ${E(nm(d))}${ed ? `<span class="e275" onclick="event.stopPropagation();tr275.door('${d.id}')">⚙️</span>` : ""}</button>`).join("")}${ed ? `<button class="add275" onclick="tr275.newDoor()">＋ ${T("قسم جديد", "New section")}</button>` : ""}</div>`;
    const list = inDoor(D.id, ns).filter(n => ed || (!hid(n.k) && n.tools.some(t => !hid(t.key)) || (ed)));
    const open = LS("op275") || {};
    const cards = list.map((n, i) => { const tools = n.tools.filter(t => ed || !hid(t.key)); const shut = open[n.k] === 0;
      return `<div class="cd275 ${hid(n.k) ? "hd275" : ""}" style="--c:${E(n.c || D.c || "#0f766e")}"><div class="ch275" onclick="tr275.fold('${n.k}')"><span class="ci275">${E(n.ic)}</span><b>${E(nm(n.t))}</b><small>${tools.length}</small><i>${shut ? "◂" : "▾"}</i></div>
        ${ed ? `<div class="ce275" onclick="event.stopPropagation()"><select onchange="tr275.mvNode('${n.k}',this.value)">${c.doors.map(d => `<option value="${d.id}" ${d.id === n.door ? "selected" : ""}>${T("في: ", "In: ")}${E(nm(d))}</option>`).join("")}</select><button onclick="tr275.up('${D.id}','${n.k}',-1)">↑</button><button onclick="tr275.up('${D.id}','${n.k}',1)">↓</button><button onclick="tr275.ren('${n.k}')">✏️</button><button onclick="tr275.hide('${n.k}')">${hid(n.k) ? "👁️" : "🙈"}</button>${n.custom ? `<button onclick="tr275.delDom('${n.k}')">🗑️</button>` : ""}</div>` : ""}
        ${shut ? "" : `<div class="cl275">${tools.map((t, j) => `<div class="ti275 ${hid(t.key) ? "hd275" : ""}"><button class="tg275" onclick="${E(t.go)}"><span>${E(t.ic || "•")}</span><b>${E(t.t)}</b></button>${ed ? `<span class="te275"><select onchange="tr275.mvTool(${J(t.key)},this.value)">${ns.map(m => `<option value="${m.k}" ${m.k === n.k ? "selected" : ""}>→ ${E(nm(m.t))}</option>`).join("")}</select><button onclick="tr275.tup(${J(n.k)},${J(t.key)},-1)">↑</button><button onclick="tr275.tup(${J(n.k)},${J(t.key)},1)">↓</button><button onclick="tr275.hide(${J(t.key)})">${hid(t.key) ? "👁️" : "🙈"}</button></span>` : ""}</div>`).join("") || `<div class="xs muted" style="padding:.4rem">${T("فاضية — انقل فيها أدوات من أي مجموعة", "Empty — move tools here")}</div>`}</div>`}</div>`; }).join("");
    const head = `<div class="hh275"><div><h2>${E(D.ic || "")} ${E(nm(D))}</h2><p class="muted">${E(AR() ? (D.sar || "") : (D.sen || D.sar || ""))}</p></div>${own() ? `<button class="btn ${ed ? "btn-p" : "btn-o"} btn-sm" onclick="state.ed275=!state.ed275;render()">${ed ? "✅ " + T("خلصت", "Done") : "✏️ " + T("رتّب المحتوى", "Arrange content")}</button>` : ""}</div>`;
    const tools = ed ? `<div class="row" style="gap:.4rem;margin:.4rem 0"><button class="btn btn-o btn-sm" onclick="tr275.newDom('${D.id}')">＋ ${T("مجموعة جديدة هنا", "New group here")}</button><button class="btn btn-o btn-sm" onclick="tr275.reset()">↺ ${T("رجّع الترتيب الأصلي", "Reset")}</button></div>` : "";
    return `<section class="sec tr275" id="tr275" style="padding:.8rem 0"><div class="wrap">${tabs}${head}${tools}<div class="gr275">${cards || `<div class="muted">${T("مفيش محتوى هنا", "Nothing here")}</div>`}</div></div></section>`; }

  const pick = (msg, arr) => { const s = prompt(msg + "\n" + arr.map((a, i) => (i + 1) + ") " + a[1]).join("\n")); const i = +s - 1; return arr[i] ? arr[i][0] : null; };
  window.tr275 = {
    tab(id) { state.hw275 = id; LS("hw275", id); render(); setTimeout(() => { const s = document.getElementById("tr275"); s && s.scrollIntoView({ behavior: "smooth", block: "start" }); }, 30); },
    fold(k) { const o = LS("op275") || {}; o[k] = o[k] === 0 ? 1 : 0; LS("op275", o); render(); },
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
    reset() { if (!confirm(T("ترجّع الترتيب الأصلي؟ (الأقسام والمجموعات اللي عملتها هتتمسح)", "Reset to the original layout?"))) return; save({}); }
  };

  /* ---------- الربط ---------- */
  if (typeof doors147Html === "function") { const _d = doors147Html; doors147Html = function () { if (!FF("v275.home")) return _d.apply(this, arguments); try { return html(); } catch (e) { console.error(e); return _d.apply(this, arguments); } }; }
  const _r = render; render = function () {
    if (FF("v275.home") && (state.route === "world" || state.route === "alltools")) { if (state.route === "world" && state.pageArg) { state.hw275 = state.pageArg; LS("hw275", state.pageArg); } state.route = "home"; state.pageArg = null; try { history.replaceState(null, "", "#/home"); } catch (e) {} setTimeout(() => { const s = document.getElementById("tr275"); s && s.scrollIntoView({ block: "start" }); }, 80); }
    const o = _r.apply(this, arguments); try { backBtn(); } catch (e) {} return o; };

  /* ---------- زرار رجوع ثابت ---------- */
  function backBtn() { let b = document.getElementById("bk275"); const show = FF("v275.back") && state.route !== "home";
    if (!show) { b && b.remove(); return; }
    if (!b) { b = document.createElement("button"); b.id = "bk275"; b.onclick = () => { try { if (typeof back81 === "function" && (state.fuQ || state.fuU != null)) return back81(); } catch (e) {} if (history.length > 1) history.back(); else navigate("home"); }; document.body.appendChild(b); }
    b.textContent = AR() ? "→ رجوع" : "← Back"; b.title = T("رجوع", "Back"); }
  css(`.tb275{display:flex;flex-wrap:wrap;gap:.5rem;margin:.4rem 0 1rem}.tb275 button{border:1px solid var(--line);background:var(--card);border-radius:999px;padding:.55rem 1.1rem;font-weight:700;font-size:1rem;cursor:pointer;color:inherit;position:relative}
  .tb275 button.on{background:var(--c);color:#fff;border-color:transparent}.tb275 .add275{border-style:dashed}.e275{margin-inline-start:.4rem;font-size:.85rem}
  .hh275{display:flex;justify-content:space-between;align-items:flex-start;gap:.6rem;flex-wrap:wrap}.hh275 h2{margin:0;color:var(--c,inherit)}
  .gr275{display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:.9rem;align-items:start;margin-top:.6rem}
  .cd275{background:color-mix(in srgb,var(--c) 6%,var(--card));border-radius:22px;border-inline-start:4px solid var(--c);padding:.4rem .6rem .6rem}
  .ch275{display:flex;align-items:center;gap:.5rem;padding:.5rem .3rem;cursor:pointer}.ch275 b{flex:1;color:var(--c);font-size:1.05rem}.ci275{font-size:1.4rem}.ch275 small{background:color-mix(in srgb,var(--c) 12%,transparent);border-radius:999px;padding:0 .5rem;font-size:.75rem}.ch275 i{font-style:normal;opacity:.6}
  .cl275{display:flex;flex-direction:column;gap:.45rem}.ti275{display:flex;flex-direction:column;gap:.2rem}
  .tg275{display:flex;align-items:center;gap:.7rem;width:100%;text-align:start;background:var(--card);border:1px solid color-mix(in srgb,var(--c) 25%,var(--line));border-radius:16px;padding:.6rem .7rem;cursor:pointer;color:inherit}
  .tg275 span{width:2.4rem;height:2.4rem;border-radius:12px;display:grid;place-items:center;background:color-mix(in srgb,var(--c) 14%,transparent);font-size:1.2rem;flex:0 0 auto}.tg275 b{font-weight:700}
  .tg275:hover{border-color:var(--c);transform:translateY(-1px)}
  .ce275,.te275{display:flex;flex-wrap:wrap;gap:.25rem;align-items:center;padding:.2rem}.ce275 select,.te275 select{max-width:12rem;font-size:.8rem;padding:.15rem;border-radius:8px}
  .ce275 button,.te275 button{border:1px solid var(--line);background:var(--card);border-radius:8px;padding:.1rem .4rem;cursor:pointer}
  .hd275{opacity:.45}#tr275{scroll-margin-top:96px}
  #bk275{position:fixed;z-index:1300;bottom:calc(14px + env(safe-area-inset-bottom));inset-inline-start:14px;background:var(--accent,#0f766e);color:#fff;border:0;border-radius:999px;padding:.55rem 1rem;font-weight:800;box-shadow:0 6px 16px rgba(0,0,0,.25);cursor:pointer}
  @media (min-width:1100px) and (hover:hover){#bk275{bottom:auto;top:84px;padding:.4rem .8rem;font-size:.85rem;opacity:.9}}`);
})();
