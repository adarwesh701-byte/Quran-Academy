/* ================= v273: عربي الأطفال — باقي الكتاب في كل وحدة (المستويات 2→9): «تبادل الحوار» بكل البدائل اللي في الكتاب (اسمع/قول/اختار الكلمة الناقصة)، القراءة وأسئلتها، صح ولا غلط، أسئلة الكلام، تدريب النطق والأسماء + الوحدة الناقصة في المستوى التالت — البيانات في kids273.json وبتتحمّل لما الوحدة تتفتح ================= */
(function () {
  const FF = k => { try { return window.ff254(k); } catch (e) { return true; } };
  const AR = () => state.lang === "ar"; const T = (a, e) => AR() ? a : e;
  const E = s => { try { return esc(s); } catch (e) { return String(s == null ? "" : s); } };
  const FR = s => { try { return window.franco254 ? window.franco254(s) : ""; } catch (e) { return ""; } };
  let X = null, loading = false;
  const S = window.k273 = window.k273 || { sub: {}, q: {}, tf: {}, ans: {} };
  function load() { if (X) return; if (window.KIDS273) { X = window.KIDS273; addNew(); return; } if (loading) return; loading = true; fetch("kids273.json?v=" + (typeof UI_VERSION !== "undefined" ? UI_VERSION : "")).then(r => r.json()).then(j => { X = j; addNew(); try { render(); } catch (e) {} }).catch(() => { loading = false; }); }
  function addNew() { try { const L3 = window.KAL258 && KAL258[3]; if (X && X.new3 && L3 && !L3.some(u => u[0] === X.new3[0])) L3.push(X.new3); } catch (e) {} }
  const lvl = () => { try { const v = +(state.kaL || localStorage.getItem("ka_lvl") || 1); return v; } catch (e) { return 1; } };
  const fill = (l, s) => l.replace(/\$(\d)/g, (m, d) => s[+d - 1] || "");
  const say = t => `rdSay(${E(JSON.stringify(t))})`;
  const shuf = a => a.map(x => [Math.random(), x]).sort((p, q) => p[0] - q[0]).map(x => x[1]);
  function line(t, k) { const fr = FR(t); return `<div class="k273l"><button class="k273p" onclick="${say(t)}" title="${T("اسمع", "Listen")}">🔊</button><div><div class="notr k273a" lang="ar" dir="rtl">${E(t)}</div>${fr ? `<div class="k273f" dir="ltr">${E(fr)}</div>` : ""}</div></div>`; }
  function drill(key, d, j) {
    const id = key + "_" + j; const subs = d.s || []; const k = subs.length ? (S.sub[id] || 0) % subs.length : 0; const cur = subs[k] || [];
    let h = `<div class="card k273d"><div class="k273h"><b>💬 ${T("حوار", "Dialogue")} ${j + 1}</b>${subs.length > 1 ? `<span class="xs muted">${k + 1}/${subs.length}</span>` : ""}</div>`;
    h += d.l.map(l => line(fill(l, cur))).join("");
    h += `<div class="row" style="gap:.35rem;flex-wrap:wrap;margin-top:.4rem"><button class="btn btn-o btn-sm" onclick="k273.play('${id}')">▶️ ${T("اسمع الحوار كله", "Play all")}</button>`;
    if (subs.length > 1) h += `<button class="btn btn-o btn-sm" onclick="k273.next('${id}')">🔁 ${T("بالكلمات التانية", "Next words")}</button>`;
    const blanks = subs.length > 2 && /\$1/.test(d.l.join(""));
    if (blanks) h += `<button class="btn btn-p btn-sm" onclick="k273.quiz('${id}')">🧩 ${T("اختار الكلمة الناقصة", "Pick the missing word")}</button>`;
    h += `</div>`;
    const q = S.q[id];
    if (q) { const opts = q.o.map((o, n) => `<button class="btn ${q.pick == null ? "btn-o" : (o === q.a ? "k273ok" : (n === q.pick ? "k273no" : "btn-o"))}" ${q.pick != null ? "disabled" : ""} onclick="k273.pick('${id}',${n})"><span class="notr" lang="ar">${E(o)}</span></button>`).join("");
      h += `<div class="k273q"><div class="notr k273a" lang="ar" dir="rtl">${E(q.t)}</div><div class="k273o">${opts}</div>${q.pick != null ? `<div class="sm">${q.o[q.pick] === q.a ? "✅ " + T("برافو!", "Well done!") : "❌ " + T("الصح: ", "Correct: ") + `<span class="notr" lang="ar">${E(q.a)}</span>`}</div>` : ""}</div>`; }
    return h + `</div>`;
  }
  function reading(key, r) {
    let h = `<div class="card k273r"><b>📖 ${T("اقرأ", "Read")}</b><div style="margin:.4rem 0">${r.t.map(t => line(t)).join("")}</div><button class="btn btn-o btn-sm" onclick="k273.playR('${key}')">▶️ ${T("اسمع القطعة", "Play the passage")}</button>`;
    if (r.q) h += `<div style="margin-top:.6rem"><b>❓ ${T("جاوب", "Answer")}</b>${r.q.map((q, n) => { const id = key + "_q" + n; return `<div class="k273qa">${line(q[0])}${S.ans[id] ? `<div class="k273ans">${line(q[1])}</div>` : `<button class="btn btn-o btn-sm" onclick="k273.show('${id}')">👁️ ${T("الإجابة", "Answer")}</button>`}</div>`; }).join("")}</div>`;
    if (r.tf) h += tf(key, r.tf);
    return h + `</div>`;
  }
  function tf(key, arr) { let ok = 0, n = 0; const rows = arr.map((x, i) => { const id = key + "_tf" + i; const p = S.tf[id]; if (p != null) { n++; if (p === x[1]) ok++; } return `<div class="k273tf">${line(x[0])}<div class="row" style="gap:.3rem">${[1, 0].map(v => `<button class="btn btn-sm ${p == null ? "btn-o" : (v === x[1] ? "k273ok" : (v === p ? "k273no" : "btn-o"))}" ${p != null ? "disabled" : ""} onclick="k273.tf('${id}',${v})">${v ? "✓ " + T("صح", "True") : "✗ " + T("غلط", "False")}</button>`).join("")}</div></div>`; }).join("");
    return `<div style="margin-top:.6rem"><b>✓✗ ${T("صح ولا غلط؟", "True or false?")}</b>${n ? ` <span class="sm">(${ok}/${n})</span>` : ""}${rows}</div>`; }
  function talk(title, arr) { return `<div class="card"><b>${title}</b>${arr.map(t => line(t)).join("")}</div>`; }
  function extras(i) {
    const n = lvl(); if (!X) { load(); return `<div class="card k273w">⏳ ${T("بنجهّز تدريبات الكتاب…", "Loading book exercises…")}</div>`; }
    const u = (X[String(n)] || [])[i]; if (!u) return "";
    const key = "k" + n + "_" + i; let h = "";
    (u.d || []).forEach((d, j) => h += drill(key, d, j));
    if (u.r) h += reading(key + "r", u.r);
    if (u.tf) h += `<div class="card">${tf(key + "t", u.tf)}</div>`;
    if (u.q) h += talk("🎤 " + T("اتكلم: جاوب عن نفسك بصوتك", "Speak: answer about yourself"), u.q);
    if (u.lq) h += talk("🎧 " + T("أسئلة على الحوار — اسمع وجاوب", "Questions on the dialogue"), u.lq);
    if (u.w) h += `<div class="card"><b>🗓️ ${T("الشهور الهجرية", "Hijri months")}</b><div class="k273g">${u.w.map((w, k) => `<button class="btn btn-o btn-sm" onclick="${say(w)}"><span class="notr" lang="ar">${k + 1}. ${E(w)}</span></button>`).join("")}</div></div>`;
    if (u.tt) h += `<div class="card"><b>📅 ${T("أيام الدراسة", "School days")}</b><div class="k273g">${u.tt.map(w => `<button class="btn btn-o btn-sm" onclick="${say(w)}"><span class="notr" lang="ar">${E(w)}</span></button>`).join("")}</div></div>`;
    if (u.p) h += `<div class="card"><b>🗣️ ${T("تدريب النطق: ", "Pronunciation: ")}<span class="notr" lang="ar">${E(u.p.t)}</span></b><div class="k273g">${u.p.r.map(r => `<div class="k273pr">${r.map(w => `<button class="btn btn-o btn-sm" onclick="${say(w)}"><span class="notr" lang="ar">${E(w)}</span></button>`).join("")}</div>`).join("")}</div></div>`;
    if (u.n) h += `<div class="card"><b>📛 ${T("أسماء — اسمع وردّد", "Names — listen & repeat")}</b><div class="k273g">${u.n.map(w => `<button class="btn btn-o btn-sm" onclick="${say(w)}"><span class="notr" lang="ar">${E(w)}</span></button>`).join("")}</div></div>`;
    if (u.sm) h += `<div class="card"><b>☀️🌙 ${T("الشمسية والقمرية", "Sun & moon letters")}</b><div class="k273g">${u.sm.map(w => `<button class="btn btn-o btn-sm" onclick="${say(w)}"><span class="notr" lang="ar">${E(w)}</span></button>`).join("")}</div></div>`;
    if (!h) return "";
    const open = S.open === key;
    return `<details class="k273" ${open ? "open" : ""} ontoggle="k273.open=this.open?'${key}':null"><summary>📚 ${T("تدريبات زيادة من الدرس (حوارات، قراءة، نطق)", "More practice from the lesson (dialogues, reading, pronunciation)")}</summary><div class="k273b">${h}</div></details>`;
  }
  function find(id) { const m = /^k(\d)_(\d+)_(\d+)$/.exec(id); if (!m || !X) return null; const u = (X[m[1]] || [])[+m[2]]; return u && u.d && u.d[+m[3]]; }
  S.next = id => { S.sub[id] = (S.sub[id] || 0) + 1; delete S.q[id]; render(); };
  S.play = id => { const d = find(id); if (!d) return; const subs = d.s || []; const cur = subs.length ? subs[(S.sub[id] || 0) % subs.length] : []; const ls = d.l.map(l => fill(l, cur)); let k = 0; const go = () => { if (k >= ls.length) return; try { rdSay(ls[k++]); } catch (e) {} setTimeout(go, 1400 + ls[k - 1].length * 90); }; go(); };
  S.playR = key => { const m = /^k(\d)_(\d+)r$/.exec(key); const u = m && X && (X[m[1]] || [])[+m[2]]; if (!u || !u.r) return; const ls = u.r.t; let k = 0; const go = () => { if (k >= ls.length) return; try { rdSay(ls[k++]); } catch (e) {} setTimeout(go, 1500 + ls[k - 1].length * 85); }; go(); };
  S.quiz = id => { const d = find(id); if (!d) return; const subs = d.s; const k = (S.sub[id] || 0) % subs.length; const a = subs[k][0]; const others = shuf([...new Set(subs.map(s => s[0]).filter(w => w !== a))]).slice(0, 2); const tpl = d.l.find(l => /\$1/.test(l)); S.q[id] = { t: fill(tpl.replace(/\$1/g, "____"), subs[k]), a, o: shuf([a, ...others]), pick: null }; render(); };
  S.pick = (id, n) => { const q = S.q[id]; if (!q || q.pick != null) return; q.pick = n; try { if (q.o[n] === q.a && typeof fbStar === "function") fbStar(); } catch (e) {} render(); setTimeout(() => { if (S.q[id] === q) { S.sub[id] = (S.sub[id] || 0) + 1; S.quiz(id); } }, 1800); };
  S.show = id => { S.ans[id] = 1; render(); };
  S.tf = (id, v) => { S.tf[id] = v; render(); };
  if (typeof fuUnit === "function") { const _u = fuUnit; fuUnit = function (i) { const h = _u.apply(this, arguments); if (state.route !== "kidsar" || !FF("v273.kids")) return h; try { return h + extras(i); } catch (e) { console.error(e); return h; } }; }
  const _r = render; render = function () { if (state.route === "kidsar" && FF("v273.kids")) load(); return _r.apply(this, arguments); };
  document.head.insertAdjacentHTML("beforeend", `<style>
.k273{margin-top:1rem;border:2px solid var(--accent);border-radius:16px;padding:.4rem .7rem;background:var(--card)}.k273>summary{cursor:pointer;font-weight:800;padding:.4rem 0}
.k273b{display:flex;flex-direction:column;gap:.6rem;margin:.5rem 0}.k273h{display:flex;justify-content:space-between;align-items:center;margin-bottom:.3rem}
.k273l{display:flex;gap:.5rem;align-items:flex-start;padding:.25rem 0;border-bottom:1px dashed var(--line)}.k273p{border:0;background:none;cursor:pointer;font-size:1.1rem}
.k273a{font:600 1.25rem/1.9 'Amiri',serif}.k273f{font-size:.82rem;color:var(--muted)}.k273q{margin-top:.6rem;padding:.5rem;border-radius:12px;background:#fef9c3}
.k273o{display:flex;flex-wrap:wrap;gap:.4rem;margin:.4rem 0}.k273ok{background:#16a34a!important;color:#fff!important}.k273no{background:#dc2626!important;color:#fff!important}
.k273qa{margin:.35rem 0}.k273ans{background:#dcfce7;border-radius:10px;padding:0 .4rem}.k273tf{margin:.3rem 0}.k273g{display:flex;flex-wrap:wrap;gap:.35rem;margin-top:.35rem}.k273pr{display:flex;gap:.25rem;padding:.2rem;border:1px solid var(--line);border-radius:10px}
body.dark .k273q{background:#3f3a12}body.dark .k273ans{background:#14381f}</style>`);
})();
