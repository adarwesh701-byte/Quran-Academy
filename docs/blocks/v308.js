/* ================= v308: قسم «التحويلات» (مستقل) داخل المقامات في الرئيسية — خاص بالمالك حتى يضغط «انشر للجميع» · مرتّل / قرآن مجوّد · مقام الأصل ← المقام المقابل ← طرق التحويل (محسوبة من السلالم الحقيقية) + همهمات يسمعها الطالب ويكررها + طرق يضيفها المالك · وإزالة «التحويل» القديم من كل صفحات المقامات ================= */
(function () {
  if (window.__v308) return; window.__v308 = 1;
  const D = document; const AR = () => { try { return state.lang === "ar"; } catch (e) { return true; } }; const T = (a, e) => AR() ? a : e;
  const E = s => String(s == null ? "" : s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const own = () => { try { return realRole() === "owner" && !state.preview; } catch (e) { return false; } };
  const CFG = () => { const c = (typeof setv === "function" && setv("tahwilat308", null)) || {}; return { public: !!c.public, custom: Array.isArray(c.custom) ? c.custom : [] }; };
  const save = c => { try { return saveSetting16("tahwilat308", c); } catch (e) {} };
  const visible = () => own() || CFG().public;
  const SC = id => { const s = (typeof MAQAM_SCALES !== "undefined" && MAQAM_SCALES[id]) || ((MQ.find(x => x.id === id) || {}).sc) || []; return s.slice(0, -1); };
  const nm = id => { try { return mqName(MQ.find(x => x.id === id)); } catch (e) { return id; } };
  const circ = (a, b) => Math.abs((((a - b) % 1200) + 1800) % 1200 - 600);
  const ORD = ["القرار", "الثانية", "الثالثة", "الرابعة", "الخامسة (الجواب)", "السادسة", "السابعة", "الثامنة"]; const ORDE = ["Tonic", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th"];
  const dn = i => AR() ? ORD[i] || (i + 1) : ORDE[i] || (i + 1) + "th";
  const S = (typeof state !== "undefined" && state) || {}; if (!state.t308) state.t308 = { a: null, b: null, kind: "mur" };

  /* ---------- طرق التحويل المحسوبة من السلالم: نركّب قرار المقام الجديد على كل درجة من المقام الأصلي ---------- */
  function routes(a, b) {
    const sa = SC(a), sb = SC(b); if (!sa.length || !sb.length) return [];
    const out = [];
    sa.forEach((pv, k) => { const tb = sb.map(v => (v + pv) % 1200); let shared = 0; const diff = [];
      tb.forEach((v, j) => { const hit = sa.some(x => circ(x, v) <= 30); if (hit) shared++; else { let best = null, bd = 1e9; sa.forEach((x, i) => { const d = ((v - x + 1800) % 1200) - 600; if (Math.abs(d) < Math.abs(bd)) { bd = d; best = i; } }); diff.push({ j, d: Math.round(bd), near: best }); } });
      out.push({ k, shared, diff, n: sb.length }); });
    out.sort((x, y) => y.shared - x.shared || x.k - y.k);
    const pick = out.slice(0, 3); if (!pick.some(r => r.k === 0)) pick.push(out.find(r => r.k === 0)); return pick;
  }
  const dtxt = d => (d.d > 0 ? T("أعلى", "higher") : T("أخفض", "lower")) + " " + Math.abs(d.d) + " " + T("سنت", "cents");

  /* ---------- همهمة: نسمع المقام الأصلي حتى درجة التحويل ثم المقام الجديد من هناك ---------- */
  let ac = null;
  function hum(a, b, k) { try { ac = ac || new (window.AudioContext || window.webkitAudioContext)(); const sa = SC(a), sb = SC(b); const base = 146.83; const fr = c => base * Math.pow(2, c / 1200); const seq = [];
      for (let i = 0; i <= k; i++) seq.push(sa[i]); const pv = sa[k]; sb.forEach(v => { if (v > 0) seq.push(pv + v); }); seq.push(pv + 1200); let t = ac.currentTime + .05;
      seq.forEach((c, i) => { const o = ac.createOscillator(), g = ac.createGain(); o.type = "triangle"; o.frequency.value = fr(c); g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(.35, t + .04); g.gain.exponentialRampToValueAtTime(.001, t + .5); o.connect(g); g.connect(ac.destination); o.start(t); o.stop(t + .52); t += .48; }); } catch (e) {}
  }
  let loopT = 0; const stopLoop = () => { clearInterval(loopT); loopT = 0; };
  window.th308 = {
    setA(v) { S.t308.a = v || null; S.t308.b = null; render(); }, setB(v) { S.t308.b = v || null; render(); }, kind(k) { S.t308.kind = k; render(); },
    swap() { const t = S.t308.a; S.t308.a = S.t308.b; S.t308.b = t; render(); },
    play(a, b, k) { hum(a, b, k); }, loop(a, b, k) { if (loopT) { stopLoop(); render(); return; } hum(a, b, k); loopT = setInterval(() => hum(a, b, k), (SC(a).length + SC(b).length + 2) * 480 + 600); render(); },
    pub(v) { const c = CFG(); c.public = !!v; save(c); toast(v ? T("✅ القسم مفتوح الآن للجميع", "✅ Section is now public") : T("🔒 القسم خاص بك فقط", "🔒 Section is owner-only")); setTimeout(render, 300); },
    add() { const g = id => (D.getElementById(id) || {}).value || ""; const a = S.t308.a, b = S.t308.b; if (!a || !b) return; const c = CFG(); c.custom.push({ a, b, kind: S.t308.kind, name: g("th_n").trim(), at: g("th_at").trim(), to: g("th_to").trim(), url: g("th_u").trim() }); save(c); setTimeout(render, 300); },
    del(i) { const c = CFG(); c.custom.splice(i, 1); save(c); setTimeout(render, 300); }
  };

  function body() {
    const t = S.t308, a = t.a, b = t.b; const c = CFG();
    const kindTabs = `<div class="row" style="gap:.4rem;margin-bottom:.8rem"><button class="btn ${t.kind === "mur" ? "btn-p" : "btn-o"}" onclick="th308.kind('mur')">🎙️ ${T("مرتّل", "Murattal")}</button><button class="btn ${t.kind === "muj" ? "btn-p" : "btn-o"}" onclick="th308.kind('muj')">🎼 ${T("قرآن مجوّد", "Mujawwad")}</button></div>`;
    const sel = (id, val, ex, fn, ph) => `<select class="in" onchange="${fn}(this.value)"><option value="">${ph}</option>${MQ.filter(m => m.id !== ex).map(m => `<option value="${m.id}" ${val === m.id ? "selected" : ""}>${E(mqName(m))}</option>`).join("")}</select>`;
    const ctl = `<div class="fgrid" style="align-items:end;margin-bottom:.8rem"><div><label class="l">${T("المقام الأصلي", "From maqam")}</label>${sel("a", a, null, "th308.setA", T("اختر…", "Choose…"))}</div><div><label class="l">${T("المقام المقابل", "To maqam")}</label>${sel("b", b, a, "th308.setB", T("اختر…", "Choose…"))}</div>${a && b ? `<button class="btn btn-o" onclick="th308.swap()">⇄ ${T("اعكس الاتجاه", "Swap")}</button>` : ""}</div>`;
    let main = `<p class="sm muted">${T("اختر المقام الأصلي ثم المقام المقابل لتظهر طرق التحويل وهمهمة كل طريقة.", "Pick the source and target maqam to see every way to modulate, with a hum for each.")}</p>`;
    if (a && b) {
      const rs = routes(a, b); const MQKd = (typeof MQK !== "undefined" && MQK[a] && MQK[a].to && MQK[a].to[b]) || "";
      main = `<h3 style="margin:.2rem 0 .6rem">🔀 ${E(nm(a))} ← ${E(nm(b))}</h3>` + (MQKd ? `<div class="notice" style="margin-bottom:.8rem">💡 ${E(MQKd)}</div>` : "") +
        rs.map((r, i) => { const pv = r.k; return `<div class="card" style="margin-bottom:.7rem;border-inline-start:4px solid ${i === 0 ? "#059669" : "#94a3b8"}"><h4 style="margin:0 0 .3rem">${i === 0 ? "⭐ " : ""}${T("الطريقة", "Route")} ${i + 1}${pv === 0 ? " — " + T("على نفس القرار", "same tonic") : ""}</h4>
          <div class="kv"><span>📍 ${T("موضع التحويل", "Where it happens")}</span><b>${T("عند الدرجة", "At degree")} ${pv + 1} (${dn(pv)}) ${T("من", "of")} ${E(nm(a))}</b></div>
          <div class="kv"><span>🎯 ${T("الدرجة المقابلة", "Matching degree")}</span><b>${T("تصير القرار (الدرجة 1) في", "becomes degree 1 of")} ${E(nm(b))}</b></div>
          <div class="kv"><span>🎹 ${T("نغمات مشتركة", "Shared notes")}</span><b>${r.shared} / ${r.n}</b></div>
          ${r.diff.length ? `<div class="kv"><span>🔧 ${T("ما يتغيّر", "What changes")}</span><b>${r.diff.map(d => `${T("الدرجة", "degree")} ${d.j + 1} ${dtxt(d)}`).join(" · ")}</b></div>` : `<div class="kv"><span>🔧 ${T("ما يتغيّر", "What changes")}</span><b>${T("لا شيء — نفس النغمات", "nothing — same notes")}</b></div>`}
          <div class="row" style="gap:.4rem;margin-top:.5rem;flex-wrap:wrap"><button class="btn btn-p" onclick="th308.play('${a}','${b}',${pv})">▶️ ${T("اسمع الهمهمة", "Hear the hum")}</button><button class="btn btn-o" onclick="th308.loop('${a}','${b}',${pv})">🔁 ${loopT ? T("إيقاف التكرار", "Stop loop") : T("كرّر", "Repeat")}</button></div></div>`; }).join("");
      const mine = c.custom.map((x, i) => ({ x, i })).filter(({ x }) => x.kind === t.kind && ((x.a === a && x.b === b) || (x.a === b && x.b === a)));
      main += `<h4 style="margin:1rem 0 .4rem">${t.kind === "mur" ? "🎙️" : "🎼"} ${T("تحويلات مسجّلة", "Recorded modulations")} (${t.kind === "mur" ? T("مرتّل", "Murattal") : T("مجوّد", "Mujawwad")})</h4>` +
        (mine.length ? mine.map(({ x, i }) => `<div class="card" style="margin-bottom:.6rem"><b>${E(x.name || T("تحويل", "Modulation"))}</b>${x.at ? `<div class="kv"><span>📍 ${T("موضع التحويل", "Where")}</span><b>${E(x.at)}</b></div>` : ""}${x.to ? `<div class="kv"><span>🎯 ${T("الدرجة المقابلة", "Matching degree")}</span><b>${E(x.to)}</b></div>` : ""}${x.url ? `<audio controls loop preload="none" src="${E(x.url)}" style="width:100%;margin-top:.4rem"></audio><button class="btn btn-o" style="margin-top:.3rem" onclick="const a=this.previousElementSibling;a.loop=!a.loop;this.textContent=a.loop?'🔁 ${T("التكرار شغّال", "Loop on")}':'🔁 ${T("التكرار متوقف", "Loop off")}'">🔁 ${T("التكرار شغّال", "Loop on")}</button>` : ""}${own() ? `<button class="btn btn-o" style="margin-top:.3rem" onclick="th308.del(${i})">🗑️ ${T("حذف", "Delete")}</button>` : ""}</div>`).join("") : `<p class="sm muted">${T("لا توجد تسجيلات بعد لهذا الاتجاه.", "No recordings yet for this pair.")}</p>`);
      if (own()) main += `<div class="card" style="margin-top:.8rem;border:2px dashed #7c3aed"><h4 style="margin:0 0 .5rem">➕ ${T("أضف تحويلًا (أنت فقط)", "Add a modulation (owner)")}</h4><div class="fgrid"><input class="in" id="th_n" placeholder="${T("اسم الطريقة", "Route name")}"><input class="in" id="th_at" placeholder="${T("موضع التحويل (مثلًا: عند الدرجة الثالثة)", "Where it happens")}"><input class="in" id="th_to" placeholder="${T("الدرجة المقابلة", "Matching degree")}"><input class="in" id="th_u" placeholder="${T("رابط الهمهمة الصوتية (اختياري)", "Hum audio URL (optional)")}"></div><button class="btn btn-p" style="margin-top:.5rem" onclick="th308.add()">${T("حفظ", "Save")}</button></div>`;
    }
    const pubBar = own() ? `<div class="card" style="margin-bottom:.8rem;border:2px solid ${c.public ? "#059669" : "#7c3aed"}"><b>${c.public ? "🌍 " + T("القسم منشور للجميع", "Published to everyone") : "🔒 " + T("القسم خاص بك فقط (لا يراه الطلاب ولا المعلمون ولا الزوار)", "Owner-only (hidden from students, teachers, visitors)")}</b><div class="row" style="margin-top:.4rem">${c.public ? `<button class="btn btn-o" onclick="th308.pub(false)">🔒 ${T("اجعله خاصًا", "Make private")}</button>` : `<button class="btn btn-p" onclick="th308.pub(true)">🚀 ${T("انشره للجميع", "Publish to everyone")}</button>`}</div></div>` : "";
    return pubBar + kindTabs + ctl + main;
  }
  PAGES16.push("tahwilat");
  const _r = render;
  render = function () {
    if (state.route === "tahwilat") { const app = D.getElementById("app"); if (!app) return; let b; try { b = visible() ? body() : `<div class="notice">${T("هذا القسم غير متاح حاليًا.", "This section is not available yet.")}</div>`; } catch (e) { b = `<div class="err">${E(e.message)}</div>`; }
      app.innerHTML = renderHeader() + pageWrap("🔀", T("التحويلات", "Modulations"), T("انتقل من مقام إلى مقام — طرق التحويل وهمهمة كل طريقة", "Move from one maqam to another — routes and a hum for each"), b) + renderFooter() + renderAIWidget(); try { applyOv(app); edBar(); uilApply(); uilBar(); } catch (e) {} return; }
    return _r.apply(this, arguments);
  };
  /* بطاقة القسم داخل «المقامات» في الرئيسية (بدل تحويل المقام القديم) */
  const _D = DOMAINS;
  DOMAINS = function () { const ds = _D(); const d = ds.find(x => x.k === "maqamat"); if (d && d.tools) { d.tools = d.tools.filter(t => !String(t[2]).includes("tahwil'") && !String(t[2]).includes("'tahwil'")); if (visible() && !d.tools.some(t => String(t[2]).includes("tahwilat"))) d.tools.splice(1, 0, ["🔀", T("التحويلات", "Modulations") + (own() && !CFG().public ? " 🔒" : ""), "go16('tahwilat')", ""]); } return ds; };
  try { if (Array.isArray(KIT)) { const i = KIT.findIndex(k => k[0] === "tahwil"); if (i >= 0) KIT.splice(i, 1); } } catch (e) {}

  /* إزالة «التحويل» القديم من صفحات المقامات الأساسية والفرعية */
  const RX = /كيف تتحوّل منه|How to modulate from it|التحويل من مقام لمقام|Modulation between maqamat/;
  const clean = () => { D.querySelectorAll("#app details").forEach(d => { const s = d.querySelector("summary"); if (s && RX.test(s.textContent) && !d.closest("#tn307")) d.remove(); });
    if (state.route !== "tahwilat" && state.route !== "tahwil") D.querySelectorAll("#app .mqk86 .kv, #app .mqinfo59 .kv").forEach(() => {}); };
  let q = 0; new MutationObserver(() => { if (q) return; q = setTimeout(() => { q = 0; clean(); }, 60); }).observe(D.body, { childList: true, subtree: true });
})();
