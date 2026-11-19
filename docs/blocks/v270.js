/* ================= v270: دروس التجويد (طلب المالك 19/11) — كل درس: الحكم باختصار الأول (من غير أسماء كتب) + الأمثلة بصوت الحصري · «📖 عرض الشرح بالتفصيل» بيفرد الشرح الكامل · تحت الدرس علطول اختبار على الحكم ده بس: سماع («اسمع وحدد الحكم») + «إيه حكم الكلمة دي؟» + أسئلة الحكم، وبعد كل إجابة شرح ليه صح أو غلط، واللي غلط فيه بيتعاد في الآخر · 70% أو أكتر ← الدرس بيتعلّم ✅ خلص (والطالب أو المالك يقدر يعلّمه بإيده) · بالإنجليزي: القرآن مابيتترجمش — اسم الحكم بالفرانكو وجنبه المصطلح بالإنجليزي ================= */
(function () {
  const FF = k => { try { return window.ff254(k); } catch (e) { return true; } };
  const AR = () => state.lang === "ar"; const T = (a, e) => AR() ? a : e;
  const css = s => document.head.insertAdjacentHTML("beforeend", `<style>${s}</style>`);
  const E = s => { try { return esc(s); } catch (e) { return String(s == null ? "" : s); } };
  const rnd = a => a.slice().sort(() => Math.random() - .5);
  if (typeof tjxBlock !== "function" || typeof TJX === "undefined") return;
  window.tq270 = window.tq270 || {};
  const SRC = /^(المصدر|المراجع|مصدر)/;
  const first = (p, n = 170) => { const s = String(p || "").split(/(?<=[.؛])\s/)[0]; return s.length > n ? s.slice(0, n).replace(/\s\S*$/, "") + "…" : s; };
  const DONE = () => { try { return JSON.parse(localStorage.getItem("itqan_tjx270") || "{}"); } catch (e) { return {}; } };
  const setDone = (id, sc) => { const d = DONE(); if (sc == null) delete d[id]; else d[id] = { sc, at: Date.now() }; try { localStorage.setItem("itqan_tjx270", JSON.stringify(d)); } catch (e) {}
    if (state.auth && state.auth.user && state.auth.profile) { const md = Object.assign({}, state.auth.profile.metadata || {}); md.tjx270 = d; state.auth.profile.metadata = md; try { sb.from("profiles").update({ metadata: md }).eq("id", state.auth.user.id).then(() => {}, () => {}); } catch (e) {} } };
  /* اسم الحكم: بالعربي للعربي — وبالإنجليزي: الفرانكو + المصطلح الإنجليزي + العربي */
  const nm = x => AR() ? x[2] : `${x[3]} — ${x[4]}`;
  const allEx = () => Object.values(TJX).flatMap(v => v.ex || []);
  function build(id) { const X = TJX[id]; const C = (typeof TJC !== "undefined" && Array.isArray(TJC)) ? TJC.find(c => c.id === id) : null; const qs = [];
    const pool = (X.ex || []); const others = allEx().filter(e => !pool.some(p => p[2] === e[2]));
    const opts = x => { const names = [...new Set(pool.map(e => e[2]).filter(n => n !== x[2]))]; const more = [...new Set(others.map(e => e[2]))]; const pick = rnd(names).slice(0, 3); while (pick.length < 3 && more.length) { const m = more.splice(Math.floor(Math.random() * more.length), 1)[0]; if (!pick.includes(m) && m !== x[2]) pick.push(m); } const L = rnd([x[2], ...pick]); return L.map(n => allEx().find(e => e[2] === n)); };
    const why = x => { const r = (X.d || []).find(d => !SRC.test(d[0]) && (d[0].includes(x[2].split(" ")[0]) || String(d[1]).includes(x[2]))); return r ? first(r[1], 220) : ""; };
    rnd(pool).forEach((x, i) => { const o = opts(x); qs.push({ k: i % 2 ? "read" : "listen", v: x[0], w: x[1], ans: o.findIndex(e => e[2] === x[2]), o, why: why(x) }); });
    if (C && Array.isArray(C.q)) rnd(C.q).slice(0, 4).forEach(q => { const o = rnd([q[1], ...(q[2] || [])]); qs.push({ k: "mcq", t: q[0], ans: o.indexOf(q[1]), o: o.map(s => [null, null, s, "", ""]), why: "" }); });
    return { qs: rnd(qs).slice(0, 8), n: 0, ok: 0, pick: null, again: [], end: false }; }
  tq270.start = id => { tq270[id] = build(id); render(); };
  tq270.play = k => { try { eaPlay(eaUrl("Husary_128kbps", k)); } catch (e) {} };
  tq270.pick = (id, i) => { const z = tq270[id]; if (!z || z.pick != null) return; const q = z.qs[z.n]; z.pick = i; const ok = i === q.ans; if (ok) z.ok++; else if (!q.re) z.again.push(Object.assign({}, q, { re: 1 })); try { sfxSafe(ok ? "correct" : "wrong"); } catch (e) {} render(); };
  tq270.next = id => { const z = tq270[id]; z.n++; z.pick = null; if (z.n >= z.qs.length && z.again.length) { z.base = z.base || z.qs.length; z.qs = z.qs.concat(z.again); z.again = []; }
    if (z.n >= z.qs.length) { z.end = true; const base = z.base || z.qs.length; const sc = Math.round(Math.min(z.ok, base) / base * 100); z.sc = sc; if (sc >= 70) setDone(id, sc); } render(); };
  tq270.mark = (id, v) => { setDone(id, v ? 100 : null); render(); };
  function quiz(id) { const z = tq270[id];
    if (!z) return `<div class="card q270"><h3>📝 ${T("اختبار على الدرس ده", "Quiz on this lesson")}</h3><p class="sm muted">${T("سماع وأسئلة على الحكم — 70% أو أكتر والدرس يتعلّم إنه خلص.", "Listening and questions on this rule — 70%+ marks the lesson done.")}</p><button class="btn btn-p" onclick="tq270.start('${id}')">▶ ${T("ابدأ الاختبار", "Start the quiz")}</button></div>`;
    if (z.end) return `<div class="card q270 r270"><div style="font-size:2.4rem">${z.sc >= 70 ? "🎉" : "💪"}</div><h3>${z.sc}%</h3><p>${z.sc >= 70 ? T("ممتاز! الدرس اتعلّم إنه خلص ✅", "Great! Lesson marked done ✅") : T("محتاج 70% — راجع الحكم وجرّب تاني.", "You need 70% — review and try again.")}</p><button class="btn btn-o" onclick="tq270.start('${id}')">🔁 ${T("أسئلة تانية", "New questions")}</button></div>`;
    const q = z.qs[z.n]; const shown = z.pick != null; const label = o => AR() || !o[3] ? E(o[2]) : `${E(o[3])} <small class="muted">— ${E(o[4] || "")}</small> <span class="notr" lang="ar">(${E(o[2])})</span>`;
    const head = q.k === "listen" ? `<p class="b">🎧 ${T("اسمع وحدد الحكم", "Listen and name the rule")}</p><button class="btn btn-o" onclick="tq270.play('${q.v}')">🔊 ${T("اسمع الآية", "Play the ayah")}</button><p class="w270 notr" lang="ar">«${E(q.w)}»</p>` : q.k === "read" ? `<p class="b">${T("إيه حكم الكلمة دي؟", "What is the rule here?")}</p><p class="w270 notr" lang="ar">«${E(q.w)}»</p><button class="btn btn-o xs" onclick="tq270.play('${q.v}')">🔊</button>` : `<p class="b notr" lang="ar">${E(q.t)}</p>`;
    return `<div class="card q270"><div class="row" style="justify-content:space-between"><b>📝 ${T("اختبار الدرس", "Lesson quiz")}</b><span class="xs muted">${z.n + 1} / ${z.qs.length}${q.re ? " · 🔁" : ""}</span></div>${head}
      <div class="o270">${q.o.map((o, i) => `<button class="opt ${shown ? (i === q.ans ? "ok" : z.pick === i ? "bad" : "") : ""}" ${shown ? "disabled" : ""} onclick="tq270.pick('${id}',${i})">${label(o)}</button>`).join("")}</div>
      ${shown ? `<div class="fures ${z.pick === q.ans ? "ok" : ""}">${z.pick === q.ans ? "✅ " + T("صح!", "Correct!") : "❌ " + T("الصح:", "Correct:") + " <b>" + label(q.o[q.ans]) + "</b>"}${q.why ? `<div class="sm" style="margin-top:.3rem">💡 ${E(q.why)}</div>` : ""}</div><div style="text-align:center;margin-top:.5rem"><button class="btn btn-p" onclick="tq270.next('${id}')">${T("التالي ←", "Next →")}</button></div>` : ""}</div>`; }

  const _b = tjxBlock; tjxBlock = function (id) { if (!FF("v270.tjx")) return _b.apply(this, arguments); const X = TJX[id]; if (!X) return _b.apply(this, arguments); const open = state.tjxD === id; const d = DONE()[id];
    const rows = (X.d || []).filter(r => !SRC.test(r[0]));
    const sum = `<div class="card s270"><div class="row" style="justify-content:space-between;align-items:center;gap:.5rem;flex-wrap:wrap"><h3 style="margin:0">📌 ${T("الحكم باختصار", "The rule in brief")}</h3>${d ? `<span class="badge ok270">✅ ${T("خلص", "Done")} ${d.sc < 100 ? d.sc + "%" : ""}</span>` : ""}</div>
      <ul class="l270">${rows.slice(0, 4).map(r => `<li><b>${E(r[0])}:</b> ${E(first(r[1]))}</li>`).join("")}</ul>
      <div class="ex270">${(X.ex || []).map(x => `<button class="tjw" onclick="tq270.play('${x[0]}')" title="${T("بصوت الشيخ الحصري", "Recited by Sheikh Al-Husary")}"><span class="notr" lang="ar">${E(x[1])}</span> 🔊<small>${AR() ? E(x[2]) : `${E(x[3])} — ${E(x[4])}`}</small></button>`).join("")}</div>
      <button class="btn ${open ? "btn-o" : "btn-p"}" style="margin-top:.6rem" onclick="state.tjxD=state.tjxD==='${id}'?null:'${id}';render()">${open ? "▲ " + T("إخفاء الشرح", "Hide the explanation") : "📖 " + T("عرض الشرح بالتفصيل", "Show the full explanation")}</button></div>`;
    let det = ""; if (open) { let h = _b.apply(this, arguments); const m = h.match(/<div class="tjxdb">([\s\S]*)$/); let inner = m ? m[1] : ""; inner = inner.replace(/<p class="xs muted">📖[\s\S]*?<\/p>/g, "").replace(/<section class="tjxs"[^>]*><h4>(المصدر|المراجع)<\/h4>[\s\S]*?<\/section>/g, "");
      det = `<div class="card d270">${rows.slice(4).map(r => `<section class="tjxs"><h4>${E(r[0])}</h4><p>${E(r[1])}</p></section>`).join("")}${inner}</div>`; }
    const mark = `<div class="mk270"><label class="row" style="gap:.4rem;align-items:center"><input type="checkbox" ${d ? "checked" : ""} onchange="tq270.mark('${id}',this.checked)"> ${T("✓ خلّصت الدرس ده", "✓ I finished this lesson")}</label></div>`;
    return sum + det + quiz(id) + mark; };
  css(`.s270 .l270{margin:.5rem 0;padding-inline-start:1.1rem;line-height:1.8}.ex270{display:flex;flex-wrap:wrap;gap:.35rem}.ex270 .tjw small{display:block;font-size:.72rem;color:var(--muted)}
  .ok270{background:#dcfce7;color:#166534}.q270 .o270{display:grid;gap:.4rem;margin-top:.5rem}.q270 .opt{text-align:start}.q270 .opt.ok{border-color:#16a34a;background:#dcfce7}.q270 .opt.bad{border-color:#dc2626;background:#fee2e2}
  .w270{font:1.8rem/1.6 'Amiri',serif;text-align:center;margin:.4rem 0}.r270{text-align:center}.mk270{margin:.4rem 0 1rem;padding:.6rem .8rem;border:1px dashed var(--line);border-radius:12px}`);
})();
