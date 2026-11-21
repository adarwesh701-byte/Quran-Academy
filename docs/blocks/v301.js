/* ================= v301: (1) منشئ الامتحانات «اعمل امتحانًا» — اختيار عدة وحدات ودروس وموضوعات معًا + امتحان شامل على الدروس المكتملة + محرك اختيار يوازن بين الموضوعات والصعوبة ويمنع التكرار ولا يضيف أسئلة من خارج الاختيار ولا يدّعي عددًا غير متاح · (2) اختبار تحديد المستوى لمسارات اللغة: ٥٠ سؤالًا متدرجة باتجاهين مع تقرير للمستوى · (3) إصلاح المؤقت (الأرقام المضيئة تُقصّ، والأشكال تُقصّ في النوافذ القصيرة) ================= */
(function () {
  if (window.__v301) return; window.__v301 = 1;
  const D = document;
  const AR = () => { try { return state.lang === "ar"; } catch (e) { return false; } };
  const T = (a, e) => AR() ? a : e;
  const E = s => String(s == null ? "" : s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const FF = k => { try { return typeof window.ff254 === "function" ? window.ff254(k) : true; } catch (e) { return true; } };
  const css = (id, s) => { try { if (D.getElementById(id)) return; D.head.insertAdjacentHTML("beforeend", `<style id="${id}">${s}</style>`); } catch (e) {} };
  const LS = (k, d) => { try { const v = JSON.parse(localStorage.getItem(k) || "null"); return v == null ? d : v; } catch (e) { return d; } };
  const LSset = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} };
  const rnd = n => Math.floor(Math.random() * n);
  const pick = a => a[rnd(a.length)];
  const shuf = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = rnd(i + 1); const t = a[i]; a[i] = a[j]; a[j] = t; } return a; };
  const strip = s => String(s || "").replace(/[ً-ْٰـ]/g, "");
  const PUNC = /[.,،؛؟?!:«»﴿﴾()"]/g;
  const words = s => String(s || "").replace(PUNC, " ").split(/\s+/).filter(Boolean);
  const nfc = s => String(s == null ? "" : s).normalize("NFC").replace(/\s+/g, " ").trim().toLowerCase();

  /* ======================================================================
     0) إصلاح المؤقت (v300): الأرقام المضيئة تتقلّص حسب عرض النافذة، والمسرح لا يُقصّ في النوافذ القصيرة
     ====================================================================== */
  css("css301t", `
.tm300 .tst{container-type:inline-size;min-width:0;overflow:hidden}
.tm300 .tdg{font-size:min(3.5rem,calc(88cqw / 4.4));padding-inline:.2rem;box-sizing:border-box}
.tm300:not(.big) .tst{flex:0 0 auto;height:clamp(150px,calc(100dvh - 330px),250px);min-height:0}
.tm300:not(.big) .tst>.tsv,.tm300:not(.big) .tst>.trk,.tm300:not(.big) .tst>.tbl,.tm300:not(.big) .tst>.tpl,.tm300:not(.big) .tst>.tic,.tm300:not(.big) .tst>.trc{height:100%;max-height:100%;min-height:0}
.tm300:not(.big) .tst .tbs{font-size:min(6rem,36cqw)}.tm300:not(.big) .tst .tcc{font-size:min(9rem,50cqw)}
.tm300:not(.big) .tst .tps{font-size:min(5.8rem,40cqw)!important}`);

  /* ======================================================================
     1) محرك الأسئلة — دوال نقية (قابلة للاختبار بدون متصفح)
     ====================================================================== */
  const DIFFN = { 1: ["سهل", "Easy"], 2: ["متوسط", "Medium"], 3: ["صعب", "Hard"] };
  const SKILLN = { recall: ["التذكّر", "Recall"], understanding: ["الفهم", "Understanding"], structure: ["بناء الجملة", "Sentence structure"], listening: ["الاستماع", "Listening"], application: ["التطبيق", "Application"] };
  const TYPEN = { mcq: ["اختيار من متعدد", "Multiple choice"], tf: ["صواب وخطأ", "True / false"], order: ["ترتيب كلمات", "Word order"], listen: ["استماع", "Listening"] };
  const ansText = q => q.t === "order" ? q.w.join(" ") : q.t === "tf" ? String(!!q.a) : q.t === "listen" ? q.ans : (q.o || [])[q.a];
  const qkey = q => nfc(q.q || (q.w || []).join(" ")) + "|" + nfc(ansText(q)) + "|" + q.t;
  function valid(q) {
    if (!q || !q.t) return false;
    if (q.t === "tf") return typeof q.a === "boolean" && !!nfc(q.q);
    if (q.t === "order") return Array.isArray(q.w) && q.w.length >= 3 && new Set(q.w.map(nfc)).size >= 2;
    if (q.t === "mcq" || q.t === "listen") {
      if (!Array.isArray(q.o) || q.o.length < 2) return false; const k = q.o.map(nfc); if (k.some(x => !x) || new Set(k).size !== k.length) return false;
      if (q.t === "listen") return !!q.audio && !!q.audio.src && k.includes(nfc(q.ans));
      return !!nfc(q.q) && q.a >= 0 && q.a < q.o.length;
    }
    return false;
  }
  /* تنظيف المجموعات: يحذف غير الصالح والمكرر، ويحدّ الفكرة الواحدة باثنين على الأكثر (حتى لا تتكرر فكرة بصيغ كثيرة) */
  function clean(pools, cap) {
    cap = cap || 2; const seen = new Set(), idea = {}, out = {};
    Object.keys(pools).forEach(id => {
      out[id] = [];
      shuf(pools[id] || []).forEach(q => {
        if (!valid(q)) return; const k = q.key || (q.key = qkey(q)); if (seen.has(k)) return;
        const ik = q.idea || k; if ((idea[ik] || 0) >= cap) return;
        seen.add(k); idea[ik] = (idea[ik] || 0) + 1; out[id].push(q);
      });
    });
    return out;
  }
  /* اختيار الأسئلة: من المجموعات المحددة فقط، بتوازن بين الدروس وأنماط الأسئلة والصعوبة، وبدون إعادة ما ظهر مؤخرًا إلا عند الضرورة */
  function select(pools, o) {
    o = o || {}; const n = Math.max(1, o.n || 50), diff = o.diff || "all", seenMap = o.avoidSeen === false ? {} : (o.seen || {});
    const cl = clean(pools, o.cap); const ids = Object.keys(cl);
    const okDiff = q => (diff === "all" || diff === "ramp") ? true : q.diff === +diff;
    const usable = {}; let available = 0; ids.forEach(id => { usable[id] = cl[id].filter(okDiff); available += usable[id].length; });
    const fresh = {}, old = {}; let freshN = 0;
    ids.forEach(id => { fresh[id] = usable[id].filter(q => !seenMap[q.key]); old[id] = usable[id].filter(q => seenMap[q.key]); freshN += fresh[id].length; });
    const picked = [], typeN = {}, diffN = {}, leafN = {}; ids.forEach(id => leafN[id] = 0);
    const draw = Q => {
      let guard = 0;
      while (picked.length < n && guard++ < 100000) {
        const act = ids.filter(id => Q[id].length); if (!act.length) break;
        shuf(act).sort((a, b) => leafN[a] - leafN[b]).forEach(id => {
          if (picked.length >= n || !Q[id].length) return;
          const head = Q[id].slice(0, 8); let best = 0, bs = 1e9;
          head.forEach((q, i) => { const sc = (typeN[q.t] || 0) * 3 + (diff === "all" ? (diffN[q.diff] || 0) : 0) + Math.random(); if (sc < bs) { bs = sc; best = i; } });
          const q = Q[id].splice(best, 1)[0]; picked.push(q); typeN[q.t] = (typeN[q.t] || 0) + 1; diffN[q.diff] = (diffN[q.diff] || 0) + 1; leafN[id]++;
        });
      }
    };
    draw(fresh);
    const before = picked.length; draw(old);
    let qs = diff === "ramp" ? picked.slice().sort((a, b) => (a.diff || 2) - (b.diff || 2) || Math.random() - .5) : shuf(picked);
    return { qs, available, freshAvailable: freshN, picked: qs.length, reused: qs.length - before, requested: n, shortage: qs.length < n, perLeaf: leafN, byType: typeN, byDiff: diffN, pools: cl };
  }
  /* مولّد الأسئلة من درس مراجَع (جُمل الكتاب نفسها) — كل سؤال له إجابة واحدة، ويحمل شرحًا من النص نفسه */
  function genLesson(L, poolWords, ctx) {
    const out = []; const lines = (L.lines || []).filter(x => x && x.t && (x.sp || L.kind === "reading") && words(x.t).length >= 2);
    const sps = [...new Set(lines.map(x => x.sp).filter(Boolean))];
    const mk = (o, ln) => Object.assign({ node: ctx.node, topic: ctx.topic, unit: ctx.unit, idea: ln ? ln.id : null, expl: ln ? T("من الدرس: «", "From the lesson: «") + ln.t + "»" : "" }, o);
    lines.forEach(ln => {
      const ws = words(ln.t), cand = ws.filter(w => strip(w).length >= 3);
      if (ws.length >= 4 && cand.length) { /* كلمة ناقصة */
        const w = pick(cand), sw = strip(w); let near = poolWords.filter(p => strip(p) !== sw && Math.abs(strip(p).length - sw.length) <= 2); if (near.length < 2) near = poolWords.filter(p => strip(p) !== sw);
        const ds = []; shuf(near).forEach(p => { if (ds.length < 2 && !ds.some(d => strip(d) === strip(p))) ds.push(p); });
        if (ds.length === 2) { let done = false; const qtxt = ln.t.split(/(\s+)/).map(p => { if (!done && p.replace(PUNC, "") === w) { done = true; return p.replace(w, "_____"); } return p; }).join(""); if (done) { const o = shuf([w, ...ds]); out.push(mk({ t: "mcq", q: qtxt, o, a: o.indexOf(w), skill: "recall", diff: ws.length >= 8 ? 3 : ws.length >= 6 ? 2 : 1, qh: T("اختر الكلمة المناسبة للفراغ", "Choose the word that fits the blank") }, ln)); } }
      }
      if (ws.length >= 3 && ws.length <= 8) out.push(mk({ t: "order", w: ws, skill: "structure", diff: ws.length <= 4 ? 1 : ws.length <= 6 ? 2 : 3 }, ln)); /* ترتيب */
      if (L.kind === "dialogue" && sps.length > 1 && ln.sp) { /* من القائل؟ */
        const truth = rnd(2) === 0, who = truth ? ln.sp : pick(sps.filter(s => s !== ln.sp));
        out.push(mk({ t: "tf", q: T("هل قال «" + who + "»: «" + ln.t + "»؟", "Did “" + who + "” say: «" + ln.t + "»?"), a: truth, fix: truth ? "" : T("قالها ", "Said by ") + ln.sp, skill: "understanding", diff: 1 }, ln));
      }
      if (ctx.audio && ln.e > ln.s) { /* اسمع واختر */
        const ds = []; shuf(lines.filter(y => y !== ln && strip(y.t) !== strip(ln.t))).forEach(y => { if (ds.length < 2 && !ds.some(d => strip(d) === strip(y.t))) ds.push(y.t); });
        if (ds.length === 2) out.push(mk({ t: "listen", ans: ln.t, o: shuf([ln.t, ...ds]), audio: { src: ctx.audio, s: ln.s, e: ln.e }, skill: "listening", diff: words(ln.t).length > 6 ? 3 : 2 }, ln));
      }
    });
    (L.quiz || []).forEach(b => { /* أسئلة الكتاب نفسه */
      const au = ctx.audio && L.kind === "listen" ? { src: ctx.audio, s: 0, e: 0 } : null;
      if (b.t === "tf") out.push(mk({ t: "tf", q: b.q, a: !!b.a, fix: b.fix || "", skill: "understanding", diff: 2, audio: au, idea: "bk:" + nfc(b.q), expl: T("سؤال من الكتاب", "A question from the book") }));
      else if (b.t === "mcq" && Array.isArray(b.o)) { const ans = b.o[b.a], o = shuf(b.o); out.push(mk({ t: "mcq", q: b.q, o, a: o.indexOf(ans), skill: "understanding", diff: 2, audio: au, idea: "bk:" + nfc(b.q), expl: T("سؤال من الكتاب", "A question from the book") })); }
    });
    return out;
  }

  /* ======================================================================
     2) مصادر الامتحان (شجرة: مصدر ← مستوى ← وحدة ← درس) — كل درس ورقة قابلة للتحديد
     ====================================================================== */
  const ce = () => (window.ce293 && window.ce293._x) || null;
  const SRC = [];
  const leafDone = {};
  SRC.push({
    id: "abyb", ic: "📗", t: ["العربية بين يديك", "Al-Arabiyyah Bayna Yadayk"],
    async load() {
      const x = ce(); if (!x) return null; const C = x.CUR.abyb, idx = await x.getJ(C.data + "index.json"), P = x.P();
      const ent = Array.isArray(idx.units) ? idx.units : Object.entries(idx.units || {}); const pools = {}, lv = {};
      await Promise.all(ent.map(async ([tag, meta]) => {
        const unit = { id: "abyb:" + tag, t: [meta.t || tag, meta.t || tag], kids: [], pending: !(meta.ok > 0), nLessons: meta.n || 0, unitNo: tag };
        if (meta.ok > 0) {
          try {
            const U = await x.getJ(C.data + tag + ".json"); const Ls = U.lessons.map(x.merge).filter(L => !L.hidden), ok = Ls.filter(L => L.status === "ok");
            const pw = [...new Set(ok.flatMap(L => (L.lines || []).flatMap(l => words(l.t))).filter(w => strip(w).length >= 3))];
            Ls.forEach(L => {
              const id = "abyb:" + L.id, kind = { dialogue: ["حوار", "Dialogue"], reading: ["قراءة", "Reading"], listen: ["فهم المسموع", "Listening"], audio: ["استماع", "Listening"] }[L.kind] || ["درس", "Lesson"];
              const title = L.title || (kind[0] + (L.n ? " " + L.n : "")), titleEn = L.title || (kind[1] + (L.n ? " " + L.n : ""));
              const leaf = { id, t: [title, titleEn], leaf: true, ref: { c: "abyb", u: tag, l: L.id }, done: !!(P[L.id] && P[L.id].done), n: 0, draft: L.status !== "ok" };
              if (L.status === "ok") pools[id] = genLesson(L, pw, { node: id, topic: title, unit: tag, audio: L.audio ? x.media("abyb", L.audio) : "" }); unit.kids.push(leaf);
            });
          } catch (e) { unit.err = true; }
        }
        (lv[tag.slice(0, 2)] = lv[tag.slice(0, 2)] || []).push(unit);
      }));
      const kids = Object.keys(C.levels).filter(k => lv[k]).map(k => ({ id: "abyb:" + k, t: C.levels[k], kids: lv[k].sort((a, b) => a.unitNo < b.unitNo ? -1 : 1) }));
      return { kids, pools };
    }
  });
  SRC.push({
    id: "bal", ic: "📜", t: ["البلاغة الميسرة", "Balāgha made easy"],
    async load() {
      const B = (window.bal297 && window.bal297.data) || []; if (!B.length) return null; const p = LS("itqan_bal297", {}), pools = {};
      const kids = B.map(l => { const id = "bal:" + l.id; pools[id] = (l.q || []).map(([q, o, a]) => { const ans = o[a], oo = shuf(o); return { t: "mcq", q, o: oo, a: oo.indexOf(ans), skill: "recall", diff: 2, node: id, topic: l.t, unit: "bal", idea: "bal:" + nfc(q), expl: T("من كتاب «البلاغة الميسرة»", "From the book “al-Balāgha al-Muyassara”") }; }); return { id, t: [l.t, l.en || l.t], leaf: true, ref: { c: "bal" }, done: (p[l.id] || 0) >= 70, n: 0 }; });
      return { kids, pools };
    }
  });
  SRC.push({
    id: "sj", ic: "📚", t: ["أسئلة عامة سريعة", "Quick general questions"],
    async load() {
      const J = window.v300 && window.v300.SJ; if (!J) return null; const EN = { quran: "The Quran", seerah: "Seerah & prophets", ibadat: "Acts of worship", tajweed: "Tajweed", arabic: "Arabic" }; const pools = {};
      const kids = Object.keys(J).map(k => { const id = "sj:" + k; pools[id] = J[k][1].map(([q, ans, ds]) => { const o = shuf([ans].concat(ds)); return { t: "mcq", q, o, a: o.indexOf(ans), skill: "recall", diff: 1, node: id, topic: J[k][0], unit: "sj", idea: "sj:" + nfc(q) }; }); return { id, t: [J[k][0], (J[k][0].match(/^\S+/) || [""])[0] + " " + (EN[k] || k)], leaf: true, ref: { c: "sj" }, done: false, n: 0 }; });
      return { kids, pools };
    }
  });

  /* ======================================================================
     3) الحالة والتحميل
     ====================================================================== */
  const S = { tree: null, loading: false, open: {}, sel: new Set(LS("itqan_ex301s", [])), n: LS("itqan_ex301n", 50), diff: LS("itqan_ex301d", "all"), avoid: LS("itqan_ex301a", true), pools: {}, leaves: {}, run: null, msg: "" };
  const seenGet = () => LS("itqan_ex301seen", {});
  const walk = (nodes, f, depth) => (nodes || []).forEach(n => { f(n, depth || 0); if (n.kids) walk(n.kids, f, (depth || 0) + 1); });
  const leavesOf = n => { const o = []; (function w(x) { if (x.leaf) o.push(x); else (x.kids || []).forEach(w); })(n); return o; };
  const live = n => leavesOf(n).filter(l => l.n > 0);
  async function loadTree(force) {
    if (S.loading || (S.tree && !force)) return; S.loading = true; let raw = {}; const tree = [];
    for (const s of SRC) { let r = null; try { r = await s.load(); } catch (e) { r = null; } if (r && r.kids && r.kids.length) { tree.push({ id: s.id, ic: s.ic, t: s.t, kids: r.kids, src: true }); Object.assign(raw, r.pools); } }
    S.pools = clean(raw); S.leaves = {}; walk(tree, (n, d) => { n.d = d; if (n.leaf) { n.n = (S.pools[n.id] || []).length; S.leaves[n.id] = n; } });
    S.sel = new Set([...S.sel].filter(id => S.leaves[id] && S.leaves[id].n > 0)); S.tree = tree; S.loading = false; redraw();
  }
  const saveSel = () => { LSset("itqan_ex301s", [...S.sel]); LSset("itqan_ex301n", S.n); LSset("itqan_ex301d", S.diff); LSset("itqan_ex301a", S.avoid); };
  const findNode = id => { let f = null; walk(S.tree, n => { if (n.id === id) f = n; }); return f; };

  /* ======================================================================
     4) الواجهة
     ====================================================================== */
  css("css301", `
.ex301{display:grid;gap:.9rem;min-width:0}.ex301 *{box-sizing:border-box}
.ex301 .xc{border:1px solid var(--line);border-radius:16px;background:var(--card);padding:.9rem 1rem;min-width:0}
.ex301 .xh{display:flex;gap:.5rem;align-items:center;flex-wrap:wrap}.ex301 .xh h3{margin:0;font-size:1.05rem}
.ex301 .xchips{display:flex;gap:.4rem;flex-wrap:wrap}.ex301 .xchips button,.ex301 .xb{border:1px solid var(--line);background:var(--bg);color:var(--fg);border-radius:999px;padding:.5rem .95rem;font:inherit;font-size:.9rem;cursor:pointer;min-height:44px}
.ex301 .xchips button.on{background:var(--accent);color:var(--accent-fg,#fff);border-color:var(--accent)}.ex301 .xb:hover,.ex301 .xchips button:hover{border-color:var(--accent)}
.ex301 .xb.pr{background:var(--accent);color:var(--accent-fg,#fff);border-color:var(--accent);font-weight:800}.ex301 .xb[disabled]{opacity:.45;cursor:not-allowed}
.ex301 button:focus-visible,.ex301 input:focus-visible,.ex301 select:focus-visible{outline:3px solid color-mix(in srgb,var(--accent) 55%,transparent);outline-offset:2px}
.ex301 .xs{display:flex;gap:.7rem;flex-wrap:wrap}.ex301 .xs>div{flex:1 1 7.5rem;min-width:0;text-align:center;padding:.5rem;border-radius:12px;background:color-mix(in srgb,var(--accent) 8%,transparent)}.ex301 .xs b{display:block;font-size:1.5rem;line-height:1.2}.ex301 .xs span{font-size:.78rem;opacity:.8}
.ex301 .xw{border:1.5px solid #f59e0b;background:#f59e0b14;border-radius:12px;padding:.6rem .8rem;font-size:.92rem}.ex301 .xi{border:1px solid var(--line);border-radius:12px;padding:.6rem .8rem;font-size:.9rem;opacity:.9}
.ex301 .xt{display:grid;gap:.25rem}.ex301 .xn{display:flex;align-items:center;gap:.45rem;min-height:44px;padding:.15rem .4rem;border-radius:10px;min-width:0}.ex301 .xn:hover{background:color-mix(in srgb,var(--accent) 6%,transparent)}
.ex301 .xn input[type=checkbox]{width:22px;height:22px;flex:0 0 22px;accent-color:var(--accent);cursor:pointer}.ex301 .xn input:disabled{cursor:not-allowed}
.ex301 .xn .xl{flex:0 1 auto;min-width:0;overflow-wrap:anywhere;line-height:1.5;cursor:pointer}.ex301 .xn .xl.l0{font-weight:800}.ex301 .xn .xl.l1{font-weight:700}
.ex301 .xn .xq{font-size:.78rem;padding:.12rem .5rem;border-radius:99px;background:color-mix(in srgb,var(--accent) 12%,transparent);color:var(--accent);white-space:nowrap}.ex301 .xn .xq.z{background:color-mix(in srgb,var(--fg) 8%,transparent);color:var(--muted,inherit)}
.ex301 .xn .xd{font-size:.76rem;color:#16a34a;white-space:nowrap;font-weight:700}
.ex301 .xn .xe{margin-inline-start:auto;border:0;background:none;color:inherit;font:inherit;font-size:1.05rem;cursor:pointer;width:44px;height:44px;border-radius:10px;flex:0 0 44px}.ex301 .xn .xe:hover{background:color-mix(in srgb,var(--fg) 8%,transparent)}
.ex301 .xk{padding-inline-start:1.2rem;border-inline-start:2px solid var(--line);margin-inline-start:.9rem}
.ex301 .xo{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(14rem,100%),1fr));gap:.8rem}.ex301 .xo label{display:grid;gap:.3rem;font-size:.9rem;font-weight:700;min-width:0}
.ex301 .xo input[type=number],.ex301 .xo select{width:100%;padding:.55rem .7rem;border:1px solid var(--line);border-radius:10px;background:var(--bg);color:var(--fg);font:inherit;min-height:44px}
.ex301 .xr{border:1px solid var(--line);border-radius:18px;padding:1.1rem;background:var(--card)}.ex301 .xr .q{font-size:1.2rem;line-height:2.1;margin:.4rem 0 .8rem;overflow-wrap:anywhere}
.ex301 .xp{height:8px;border-radius:9px;background:color-mix(in srgb,var(--fg) 10%,transparent);overflow:hidden}.ex301 .xp i{display:block;height:100%;background:var(--accent);transition:width .25s}
.ex301 .xa{display:grid;gap:.5rem}.ex301 .xa button{text-align:start;padding:.75rem .95rem;border-radius:12px;border:1.5px solid var(--line);background:var(--bg);color:var(--fg);font:inherit;font-size:1.05rem;cursor:pointer;min-height:48px;overflow-wrap:anywhere}
.ex301 .xa button.ok{background:#16a34a22;border-color:#16a34a}.ex301 .xa button.no{background:#dc262618;border-color:#dc2626}.ex301 .xa button:disabled{cursor:default}
.ex301 .xw2{display:flex;flex-wrap:wrap;gap:.4rem;justify-content:center;min-height:3.2rem;padding:.4rem;border:1.5px dashed var(--line);border-radius:12px;margin:.4rem 0}.ex301 .xw2 button{padding:.45rem .75rem;border-radius:10px;border:1px solid var(--line);background:var(--bg);color:var(--fg);font:inherit;font-size:1.1rem;cursor:pointer;min-height:44px}
.ex301 .xf{margin-top:.7rem;padding:.6rem .8rem;border-radius:12px;font-size:.95rem}.ex301 .xf.ok{background:#16a34a18;color:#15803d}.ex301 .xf.no{background:#dc262614;color:#b91c1c}
.ex301 .xbar{display:grid;grid-template-columns:minmax(0,8rem) 1fr 3.2rem;gap:.5rem;align-items:center;margin:.3rem 0;font-size:.88rem}.ex301 .xbar span{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.ex301 .xbar b{text-align:end}
.ex301 table{width:100%;border-collapse:collapse;font-size:.88rem}.ex301 td,.ex301 th{padding:.35rem .4rem;border-bottom:1px solid var(--line);text-align:start;vertical-align:top;overflow-wrap:anywhere}
@media (max-width:520px){.ex301 .xn .xq,.ex301 .xn .xd{font-size:.72rem}.ex301 .xk{padding-inline-start:.6rem;margin-inline-start:.5rem}}`);

  const nm = n => n.t[AR() ? 0 : 1];
  const selLeaves = () => [...S.sel].map(id => S.leaves[id]).filter(Boolean);
  const stats = () => {
    const sl = selLeaves(); const allLive = []; walk(S.tree, n => { if (n.leaf && n.n > 0) allLive.push(n); });
    const sub = {}; sl.forEach(l => { sub[l.id] = S.pools[l.id]; }); let avail = 0;
    Object.keys(sub).forEach(id => { avail += sub[id].filter(q => S.diff === "all" || S.diff === "ramp" || q.diff === +S.diff).length; });
    const totalAll = allLive.reduce((s, l) => s + l.n, 0), totalSel = sl.reduce((s, l) => s + l.n, 0);
    return { sl, avail, expected: Math.min(S.n, avail), cover: allLive.length ? Math.round(100 * sl.length / allLive.length) : 0, covQ: totalAll ? Math.round(100 * totalSel / totalAll) : 0, nLive: allLive.length, done: allLive.filter(l => l.done).length, totalAll };
  };
  function isOpen(n) { if (S.open[n.id] != null) return S.open[n.id]; const L = leavesOf(n), lv = L.filter(l => l.n > 0); return (n.d || 0) === 0 || (!!(n.kids && n.kids.length) && lv.length > 0 && L.length <= 14 && (n.d || 0) <= 2); }
  function nodeHtml(n, d) {
    const L = leavesOf(n), lv = L.filter(l => l.n > 0), k = lv.filter(l => S.sel.has(l.id)).length, qn = lv.reduce((s, l) => s + l.n, 0);
    const isLeaf = !!n.leaf, kids = (n.kids || []), hasKids = kids.length > 0;
    const open = isOpen(n);
    const checked = lv.length > 0 && k === lv.length, dis = lv.length === 0;
    const q = isLeaf ? (n.n > 0 ? `<span class="xq">${n.n} ${T("سؤال", "Qs")}</span>` : `<span class="xq z">${n.draft ? T("غير جاهز للاختبار", "Not ready yet") : T("لا أسئلة", "No questions")}</span>`) : (qn > 0 ? `<span class="xq">${qn} ${T("سؤال", "Qs")}${lv.length ? " · " + lv.length + " " + T("درس", "lessons") : ""}</span>` : `<span class="xq z">${n.pending ? T("قيد التجهيز", "Being prepared") : T("لا أسئلة بعد", "No questions yet")}</span>`);
    const dn = isLeaf && n.done ? `<span class="xd">✓ ${T("أنهيته", "Completed")}</span>` : "";
    const row = `<div class="xn"><input type="checkbox" id="x301-${E(n.id)}" data-tri="${!dis && k > 0 && !checked ? 1 : 0}" ${checked ? "checked" : ""} ${dis ? "disabled" : ""} onchange="exam301.tog('${E(n.id)}')" aria-label="${E(nm(n))}"><label class="xl l${Math.min(d, 2)}" for="x301-${E(n.id)}">${n.ic ? n.ic + " " : ""}${E(nm(n))}</label>${dn}${q}${hasKids ? `<button class="xe" onclick="exam301.exp('${E(n.id)}')" aria-expanded="${open}" aria-label="${T("توسيع/طي", "Expand/collapse")}">${open ? "▾" : "◂"}</button>` : ""}</div>`;
    return row + (hasKids && open ? `<div class="xk">${kids.map(c => nodeHtml(c, d + 1)).join("")}</div>` : "");
  }
  function hist() {
    const h = LS("itqan_ex301r", []).slice(0, 5); if (!h.length) return "";
    return `<div class="xc"><h3>🕘 ${T("آخر نتائجك", "Your recent results")}</h3><table><tr><th>${T("التاريخ", "Date")}</th><th>${T("الأسئلة", "Questions")}</th><th>${T("النتيجة", "Score")}</th></tr>${h.map(r => `<tr><td>${new Date(r.ts).toLocaleDateString(AR() ? "ar" : "en", { day: "numeric", month: "short" })}</td><td>${r.n}</td><td><b>${r.pct}%</b></td></tr>`).join("")}</table></div>`;
  }
  function mainView() {
    if (!S.tree) return `<div class="xc" style="text-align:center;padding:2rem">⏳ ${T("جارٍ تحميل الدروس والأسئلة…", "Loading lessons and questions…")}</div>`;
    if (!S.tree.length) return `<div class="xc xi">${T("لا تتوفر مصادر أسئلة الآن. تأكد من الاتصال ثم أعد المحاولة.", "No question sources are available right now. Check your connection and try again.")} <button class="xb" onclick="exam301.reload()">↻ ${T("إعادة المحاولة", "Retry")}</button></div>`;
    const st = stats(), short = st.sl.length && st.avail < S.n;
    return `<div class="xc"><div class="xh"><h3>🎯 ${T("نوع الامتحان", "Exam type")}</h3></div>
      <div class="xchips" style="margin:.5rem 0"><button onclick="exam301.preset('clear')">${T("مخصص (اختر بنفسك)", "Custom (pick yourself)")}</button><button class="${st.done && st.sl.length && st.sl.every(l => l.done) && st.sl.length === st.done ? "on" : ""}" onclick="exam301.preset('done')" ${st.done ? "" : "disabled"}>✅ ${T("شامل على ما أنهيته", "Comprehensive on completed")} (${st.done})</button><button onclick="exam301.preset('all')">📚 ${T("كل المتاح", "Everything available")}</button></div>
      <div class="xi">${T("علّم الدروس أو الوحدات أو المستويات التي تريد الامتحان عليها (يمكنك الجمع بين أكثر من وحدة ودرس وموضوع معًا). لن تدخل أي أسئلة من خارج اختيارك.", "Tick the lessons, units or levels you want to be examined on — you can combine several units, lessons and topics. No question from outside your selection will appear.")}</div></div>
    <div class="xc"><div class="xh" style="justify-content:space-between"><h3>🗂️ ${T("اختر الموضوعات", "Choose topics")}</h3><div class="xchips"><button onclick="exam301.preset('all')">${T("تحديد الكل", "Select all")}</button><button onclick="exam301.preset('none')">${T("إلغاء التحديد", "Select none")}</button><button onclick="exam301.preset('clear')">${T("مسح الاختيار", "Clear")}</button><button onclick="exam301.preset('inv')">${T("عكس", "Invert")}</button><button onclick="exam301.expAll(true)">${T("فتح الكل", "Expand all")}</button><button onclick="exam301.expAll(false)">${T("طيّ الكل", "Collapse all")}</button></div></div><div class="xt" style="margin-top:.5rem">${S.tree.map(n => nodeHtml(n, 0)).join("")}</div></div>
    <div class="xc"><div class="xs"><div><b>${st.sl.length}</b><span>${T("موضوعات مختارة", "Topics selected")}</span></div><div><b>${st.avail}</b><span>${T("أسئلة متاحة فعليًا", "Questions actually available")}</span></div><div><b>${st.expected}</b><span>${T("الأسئلة المتوقعة في الامتحان", "Expected in the exam")}</span></div><div><b>${st.cover}%</b><span>${T("تغطية الدروس الجاهزة", "Ready-lessons coverage")}</span></div></div>
      <div class="xi" style="margin-top:.6rem">${T("الدروس الجاهزة للاختبار", "Lessons ready for testing")}: ${st.nLive} · ${T("إجمالي الأسئلة المتاحة", "total questions")}: ${st.totalAll}. ${T("الدروس التي بلا نص مراجَع لا تدخل الامتحان حتى لا نُنشئ أسئلة غير موثوقة.", "Lessons without reviewed text are not included, so we never create unreliable questions.")}</div>
      ${short ? `<div class="xw" style="margin-top:.6rem">⚠️ ${T("المتاح فعليًا من اختيارك", "Available from your selection")}: <b>${st.avail}</b> ${T("سؤالًا فقط (المطلوب", "questions only (requested")} ${S.n}${T("). لن نكرّر الأسئلة ولن نضيف من خارج اختيارك — اختر موضوعات أكثر أو خفّض العدد.", "). We will not repeat questions or add any from outside your selection — pick more topics or lower the number.")}</div>` : ""}
      ${S.msg ? `<div class="xw" style="margin-top:.6rem">${E(S.msg)}</div>` : ""}</div>
    <div class="xc"><h3>⚙️ ${T("خيارات الامتحان", "Exam options")}</h3><div class="xo" style="margin-top:.5rem">
      <label>${T("عدد الأسئلة (الحد الأدنى المستهدف ٥٠)", "Number of questions (target minimum 50)")}<input type="number" id="x301n" min="5" max="200" value="${S.n}" onchange="exam301.setN(this.value)"></label>
      <label>${T("الصعوبة", "Difficulty")}<select id="x301d" onchange="exam301.setD(this.value)">${[["all", T("الكل — متوازن", "All — balanced")], ["ramp", T("متدرّجة من السهل للصعب", "Graded easy → hard")], ["1", T("سهل فقط", "Easy only")], ["2", T("متوسط فقط", "Medium only")], ["3", T("صعب فقط", "Hard only")]].map(([v, l]) => `<option value="${v}" ${String(S.diff) === v ? "selected" : ""}>${l}</option>`).join("")}</select></label>
      <label style="grid-column:1/-1;flex-direction:row;display:flex;align-items:center;gap:.5rem"><input type="checkbox" ${S.avoid ? "checked" : ""} onchange="exam301.setA(this.checked)" style="width:22px;height:22px;accent-color:var(--accent)"> ${T("تجنّب الأسئلة التي ظهرت لي مؤخرًا (إلا عند الضرورة)", "Avoid questions I saw recently (unless necessary)")}</label></div>
      <div class="xchips" style="margin-top:.6rem">${[20, 30, 50, 75, 100].map(v => `<button class="${S.n === v ? "on" : ""}" onclick="exam301.setN(${v})">${v}</button>`).join("")}</div>
      <div class="row" style="margin-top:.9rem"><button class="xb pr" onclick="exam301.start()" ${st.sl.length ? "" : "disabled"}>📝 ${T("ابدأ الامتحان", "Start exam")} (${st.expected})</button></div></div>
    ${hist()}`;
  }
  /* ----- تشغيل الامتحان ----- */
  let AUD = null; const stopAud = () => { try { if (AUD) { AUD.pause(); AUD = null; } } catch (e) {} };
  function play(a) { stopAud(); if (!a || !a.src) return; try { AUD = new Audio(a.src); const s = a.s || 0, e = a.e || 0; AUD.currentTime = s; AUD.play().catch(() => {}); if (e) { const t = setInterval(() => { if (!AUD || AUD.currentTime >= e - .03) { clearInterval(t); stopAud(); } }, 40); } } catch (err) {} }
  function runView() {
    const R = S.run; if (R.done) return resultView(); const q = R.qs[R.i], tot = R.qs.length, p = R.picked;
    const au = q.audio && q.audio.src ? `<button class="xb" onclick="exam301.play()">🎧 ${T("استمع", "Listen")}</button>` : "";
    let inner = "";
    if (q.t === "tf") inner = `<div class="q">${E(q.q)}</div><div class="xa">${[[true, "✓ " + T("صواب", "True")], [false, "✗ " + T("خطأ", "False")]].map(([v, l]) => `<button onclick="exam301.ans(${v})" ${p != null ? "disabled" : ""} class="${p != null ? (v === q.a ? "ok" : (p === v ? "no" : "")) : ""}">${l}</button>`).join("")}</div>`;
    else if (q.t === "mcq" || q.t === "listen") inner = `<div class="q">${q.t === "listen" ? T("استمع ثم اختر الجملة التي سمعتها:", "Listen, then choose the sentence you heard:") : (q.qh ? `<div style="font-size:.85rem;opacity:.75">${E(q.qh)}</div>` : "") + E(q.q)}</div><div class="xa">${q.o.map((o, i) => `<button onclick="exam301.ans(${i})" ${p != null ? "disabled" : ""} class="${p != null ? ((q.t === "listen" ? o === q.ans : i === q.a) ? "ok" : (p === i ? "no" : "")) : ""}">${E(o)}</button>`).join("")}</div>`;
    else { if (!R.ord) R.ord = { pick: [], left: shuf(q.w.map((w, i) => i)) }; const O = R.ord; inner = `<div class="q">${T("رتّب الكلمات لتكوّن الجملة:", "Put the words in order to form the sentence:")}</div><div class="xw2" dir="rtl">${O.pick.map((i, k) => `<button onclick="exam301.unpick(${k})" ${p != null ? "disabled" : ""}>${E(q.w[i])}</button>`).join("")}</div><div class="xw2" dir="rtl" style="border-style:solid">${O.left.map((i, k) => `<button onclick="exam301.pick(${k})" ${p != null ? "disabled" : ""}>${E(q.w[i])}</button>`).join("")}</div>${p == null ? `<button class="xb pr" onclick="exam301.ans('order')" ${O.left.length ? "disabled" : ""}>${T("تحقّق", "Check")}</button>` : ""}`; }
    let fb = ""; if (p != null) { const ok = R.last; const right = q.t === "tf" ? (q.a ? T("صواب", "True") : T("خطأ", "False")) + (q.fix ? " — " + T("الصواب:", "Correct:") + " " + q.fix : "") : q.t === "order" ? q.w.join(" ") : q.t === "listen" ? q.ans : q.o[q.a]; fb = `<div class="xf ${ok ? "ok" : "no"}">${ok ? "✓ " + T("إجابة صحيحة.", "Correct.") : "✗ " + T("الإجابة الصحيحة:", "Correct answer:") + " <b>" + E(right) + "</b>"}${q.expl ? `<div style="font-size:.85rem;margin-top:.3rem;opacity:.85">${E(q.expl)}</div>` : ""}</div><div class="row" style="margin-top:.7rem"><button class="xb pr" onclick="exam301.nq()">${R.i + 1 >= tot ? T("عرض النتيجة", "See result") : T("التالي", "Next")} ⏭</button></div>`; }
    return `<div class="xr"><div class="xh" style="justify-content:space-between"><b>${T("السؤال", "Question")} ${R.i + 1} / ${tot}</b><span class="xq" style="font-size:.78rem;padding:.12rem .5rem;border-radius:99px;background:color-mix(in srgb,var(--accent) 12%,transparent)">${E(q.topic || "")} · ${DIFFN[q.diff] ? DIFFN[q.diff][AR() ? 0 : 1] : ""}</span></div><div class="xp" style="margin:.5rem 0"><i style="width:${Math.round(100 * R.i / tot)}%"></i></div>${au}${inner}${fb}<div class="row" style="margin-top:.8rem"><button class="xb" onclick="exam301.quit()">✕ ${T("إنهاء الامتحان", "End exam")}</button></div></div>`;
  }
  const bars = (map, label) => Object.keys(map).map(k => { const [ok, n] = map[k], pc = Math.round(100 * ok / Math.max(1, n)); return `<div class="xbar"><span title="${E(label(k))}">${E(label(k))}</span><div class="xp"><i style="width:${pc}%;background:${pc >= 70 ? "#16a34a" : pc >= 50 ? "#f59e0b" : "#dc2626"}"></i></div><b>${pc}%</b></div>`; }).join("");
  function resultView() {
    const R = S.run, a = R.res, n = a.length, ok = a.filter(x => x.ok).length, pc = Math.round(100 * ok / Math.max(1, n));
    const grp = f => { const m = {}; a.forEach(x => { const k = f(x); (m[k] = m[k] || [0, 0])[1]++; if (x.ok) m[k][0]++; }); return m; };
    const byT = grp(x => x.topic || "—"), byS = grp(x => x.skill), byD = grp(x => x.diff);
    const weak = Object.keys(byT).filter(k => byT[k][1] >= 2 && byT[k][0] / byT[k][1] < .6), strong = Object.keys(byT).filter(k => byT[k][1] >= 2 && byT[k][0] / byT[k][1] >= .8);
    const nodeOf = {}; a.forEach(x => { nodeOf[x.topic] = x.node; });
    const rev = weak.map(t => { const lf = S.leaves[nodeOf[t]]; const go = lf && lf.ref && lf.ref.c === "abyb" ? `ce293.open('abyb','${lf.ref.u}','${lf.ref.l}')` : (lf && lf.ref && lf.ref.c === "bal" ? "go16('balagha')" : ""); return `<li>${E(t)} ${go ? `<button class="xb" style="min-height:36px;padding:.2rem .7rem" onclick="${go}">${T("راجع الدرس", "Review lesson")}</button>` : ""}</li>`; }).join("");
    const wrongs = a.filter(x => !x.ok);
    const lvl = pc >= 85 ? T("ممتاز — تقدّم للمستوى التالي", "Excellent — move on to the next level") : pc >= 70 ? T("جيد — راجع النقاط الضعيفة ثم تقدّم", "Good — review the weak spots, then move on") : pc >= 50 ? T("مقبول — أعد الدروس الضعيفة ثم أعد الامتحان", "Fair — redo the weak lessons, then retake") : T("تحتاج مراجعة — ابدأ بالدروس الأضعف", "Needs review — start with the weakest lessons");
    return `<div class="xr" style="text-align:center"><div style="font-size:3rem">${pc >= 85 ? "🌟" : pc >= 70 ? "🎉" : pc >= 50 ? "👍" : "💪"}</div><h2 style="margin:.2rem 0">${T("النتيجة", "Score")}: ${pc}%</h2><p>${ok} ${T("صحيحة من", "correct of")} ${n}${R.info && R.info.shortage ? " · " + T("المتاح فعليًا كان", "available were") + " " + R.info.picked : ""}</p><p><b>${lvl}</b></p></div>
    <div class="xc"><h3>📚 ${T("حسب الموضوع", "By topic")}</h3>${bars(byT, k => k)}</div>
    <div class="xc"><h3>🧠 ${T("حسب المهارة", "By skill")}</h3>${bars(byS, k => (SKILLN[k] || [k, k])[AR() ? 0 : 1])}<h3 style="margin-top:.8rem">📈 ${T("حسب الصعوبة", "By difficulty")}</h3>${bars(byD, k => (DIFFN[k] || [k, k])[AR() ? 0 : 1])}</div>
    <div class="xc"><h3>🧭 ${T("الخطوة التالية", "Next step")}</h3>${strong.length ? `<p>💪 ${T("نقاط قوتك", "Strengths")}: ${strong.map(E).join("، ")}</p>` : ""}${weak.length ? `<p>🎯 ${T("تحتاج مراجعة", "Needs review")}:</p><ul>${rev}</ul>` : `<p>${T("لا توجد موضوعات ضعيفة واضحة.", "No clearly weak topics.")}</p>`}</div>
    ${wrongs.length ? `<div class="xc"><h3>❌ ${T("أسئلتك الخاطئة", "Your mistakes")} (${wrongs.length})</h3><table>${wrongs.map(x => `<tr><td>${E(x.q)}</td><td><b>${E(x.right)}</b></td></tr>`).join("")}</table></div>` : ""}
    <div class="row" style="gap:.5rem;flex-wrap:wrap"><button class="xb pr" onclick="exam301.again()">🔁 ${T("امتحان جديد بنفس الاختيارات", "New exam, same selection")}</button><button class="xb" onclick="exam301.edit()">✏️ ${T("تعديل الاختيارات", "Edit selection")}</button></div>`;
  }
  function body() { return S.run ? runView() : mainView(); }
  function fixTri() { try { D.querySelectorAll("#ex301 input[data-tri='1']").forEach(i => { i.indeterminate = true; }); } catch (e) {} }
  function redraw() { const el = D.getElementById("ex301"); if (!el || state.route !== "exam301") return; const y = window.scrollY; el.innerHTML = body(); fixTri(); try { window.scrollTo(0, y); } catch (e) {} }

  /* ----- الأوامر ----- */
  const setAll = (ids, on) => ids.forEach(id => on ? S.sel.add(id) : S.sel.delete(id));
  const api = window.exam301 = {
    open() { go16("exam301"); },
    reload() { S.tree = null; S.loading = false; loadTree(true); redraw(); },
    exp(id) { const n = findNode(id); if (!n) return; S.open[id] = !isOpen(n); redraw(); },
    expAll(on) { walk(S.tree, n => { if (n.kids && n.kids.length) S.open[n.id] = on; }); redraw(); },
    tog(id) { const n = findNode(id); if (!n) return; const lv = live(n).map(l => l.id), all = lv.length && lv.every(x => S.sel.has(x)); setAll(lv, !all); S.msg = ""; saveSel(); redraw(); },
    preset(k) { const lv = []; walk(S.tree, n => { if (n.leaf && n.n > 0) lv.push(n); });
      if (k === "all") S.sel = new Set(lv.map(l => l.id)); else if (k === "none" || k === "clear") S.sel = new Set(); else if (k === "done") S.sel = new Set(lv.filter(l => l.done).map(l => l.id)); else if (k === "inv") S.sel = new Set(lv.filter(l => !S.sel.has(l.id)).map(l => l.id));
      S.msg = ""; saveSel(); redraw(); },
    setN(v) { S.n = Math.max(5, Math.min(200, Math.round(+v) || 50)); saveSel(); redraw(); },
    setD(v) { S.diff = v; saveSel(); redraw(); },
    setA(v) { S.avoid = !!v; saveSel(); },
    async start() {
      if (!S.sel.size) { S.msg = T("اختر موضوعًا واحدًا على الأقل.", "Pick at least one topic."); return redraw(); }
      /* نعيد توليد الأسئلة كل مرة لتتغير الاختيارات البديلة والتشكيلة */
      await loadTree(true); const sub = {}; [...S.sel].forEach(id => { if (S.pools[id]) sub[id] = S.pools[id]; });
      const r = select(sub, { n: S.n, diff: S.diff, avoidSeen: S.avoid, seen: seenGet() });
      if (!r.qs.length) { S.msg = T("لا توجد أسئلة متاحة بهذه الإعدادات. جرّب «الكل» في الصعوبة أو اختر موضوعات أخرى.", "No questions are available with these settings. Try “All” difficulty or other topics."); return redraw(); }
      S.msg = ""; S.run = { qs: r.qs, i: 0, res: [], picked: null, last: false, ord: null, info: r, t0: Date.now(), qt: Date.now() }; redraw(); try { window.scrollTo(0, 0); } catch (e) {}
    },
    ans(v) {
      const R = S.run; if (!R || R.picked != null || R.done) return; const q = R.qs[R.i]; let ok;
      if (q.t === "tf") ok = v === q.a; else if (q.t === "order") { ok = R.ord.pick.map(i => q.w[i]).join(" ") === q.w.join(" "); v = ok ? "ok" : "bad"; } else ok = v === q.a || (q.t === "listen" && q.o[v] === q.ans);
      R.picked = v; R.last = ok; R.res.push({ key: q.key, node: q.node, topic: q.topic, skill: q.skill, diff: q.diff, type: q.t, ok, ms: Date.now() - R.qt, q: q.q || (q.w ? q.w.join(" ") : "🎧 " + (q.ans || "")), right: q.t === "tf" ? (q.a ? T("صواب", "True") : T("خطأ", "False")) : q.t === "order" ? q.w.join(" ") : q.t === "listen" ? q.ans : q.o[q.a] }); stopAud(); redraw();
    },
    nq() { const R = S.run; if (!R) return; R.i++; R.picked = null; R.ord = null; R.qt = Date.now(); if (R.i >= R.qs.length) return api.finish(); redraw(); },
    pick(k) { const R = S.run; if (!R || R.picked != null) return; const i = R.ord.left.splice(k, 1)[0]; R.ord.pick.push(i); redraw(); },
    unpick(k) { const R = S.run; if (!R || R.picked != null) return; const i = R.ord.pick.splice(k, 1)[0]; R.ord.left.push(i); redraw(); },
    play() { const R = S.run; if (R) play(R.qs[R.i].audio); },
    quit() { const R = S.run; if (!R) return; if (R.res.length && confirm(T("تنهي الامتحان الآن وتعرض النتيجة؟", "End the exam now and show the result?"))) return api.finish(); if (!R.res.length) { S.run = null; stopAud(); redraw(); } },
    finish() {
      const R = S.run; if (!R || R.done) return; R.done = true; stopAud(); const n = R.res.length, ok = R.res.filter(x => x.ok).length, pc = Math.round(100 * ok / Math.max(1, n));
      const seen = seenGet(), now = Date.now(); R.res.forEach(x => { if (x.key) seen[x.key] = now; }); const ks = Object.keys(seen).sort((a, b) => seen[b] - seen[a]).slice(0, 800), keep = {}; ks.forEach(k => keep[k] = seen[k]); LSset("itqan_ex301seen", keep);
      const h = LS("itqan_ex301r", []); h.unshift({ ts: now, n, ok, pct: pc, sel: S.sel.size }); LSset("itqan_ex301r", h.slice(0, 30)); redraw(); try { window.scrollTo(0, 0); } catch (e) {}
    },
    again() { S.run = null; api.start(); }, edit() { S.run = null; stopAud(); redraw(); },
    _eng: { select, clean, valid, qkey, genLesson, nfc, strip, words }
  };

  /* ----- تسجيل الصفحة ----- */
  try { if (typeof PAGES16 !== "undefined" && Array.isArray(PAGES16) && !PAGES16.includes("exam301")) PAGES16.push("exam301"); } catch (e) {}
  if (typeof render === "function") {
    const _r = render;
    render = function () {
      if (state.route === "exam301" && FF("v301.exam")) {
        const app = D.getElementById("app");
        if (app) {
          let b; try { b = body(); } catch (e) { console.error(e); b = `<div class="xc">${E(e.message)}</div>`; }
          app.innerHTML = renderHeader() + pageWrap("📝", T("منشئ الامتحانات", "Exam builder"), T("اختر عدة وحدات ودروس وموضوعات معًا، وأنشئ امتحانًا شاملًا عليها فقط.", "Pick several units, lessons and topics together and build one exam from just those."), `<div class="ex301" id="ex301">${b}</div>`, 1000) + renderFooter();
          fixTri(); loadTree(); try { if (window.tm300 && tm300.watch) setTimeout(() => tm300.watch(), 700); } catch (e) {} setTimeout(injectRail, 800);
        }
        return;
      }
      if (state.route !== "exam301" && AUD) stopAud();
      return _r.apply(this, arguments);
    };
  }
  if (typeof DOMAINS === "function") { const _D = DOMAINS; DOMAINS = function () { const ds = _D.apply(this, arguments); try { if (FF("v301.exam")) { const a = ds.find(d => d.k === "arabic"); if (a && a.tools && !a.tools.some(t => /exam301/.test(t[2]))) a.tools.push(["📝", T("منشئ الامتحانات — امتحان شامل على ما تختاره", "Exam builder — a full exam on what you choose"), "go16('exam301')", ""]); } } catch (e) {} return ds; }; }
  /* زر الامتحانات في الشريط الجانبي (بجانب المؤقت) */
  function injectRail() {
    if (!FF("v301.exam")) return;
    D.querySelectorAll(".rail288").forEach(rail => {
      if (rail.querySelector(".ex301t")) return; const anchor = rail.querySelector(".tm300t") || [...rail.querySelectorAll(".t288")].find(a => /السبورة|Whiteboard/i.test(a.getAttribute("title") || "")); if (!anchor) return;
      anchor.insertAdjacentHTML("afterend", `<a class="t288 ex301t" href="#" onclick="event.preventDefault();exam301.open()" title="${E(T("منشئ الامتحانات", "Exam builder"))}"><span class="i288">📝</span><b>${E(T("الامتحانات", "Exams"))}</b></a>`);
    });
  }
  const railSeen = new Set();
  function watchRail() { D.querySelectorAll(".rail288").forEach(r => { if (railSeen.has(r)) return; railSeen.add(r); new MutationObserver(() => { clearTimeout(watchRail.t); watchRail.t = setTimeout(injectRail, 60); }).observe(r, { childList: true }); }); injectRail(); }
  setTimeout(watchRail, 1100); setTimeout(watchRail, 2800);
  if (typeof render === "function") { const _r2 = render; render = function () { const o = _r2.apply(this, arguments); try { setTimeout(watchRail, 900); } catch (e) {} return o; }; }

  /* ======================================================================
     5) اختبار تحديد المستوى لمسارات اللغة: ٥٠ سؤالًا (كلمة ← معنى، ومعنى ← كلمة) متدرجة بالوحدات، وتقدير مستوى بالنوافذ لا بآخر إجابة صحيحة
     ====================================================================== */
  const PL_N = 50;
  function plLevel(per) { /* per[i] = [صحيح، إجمالي] لكل وحدة؛ المستوى = أول وحدة تهبط عندها الدقة في نافذة وحدتين دون ٦٠٪ */
    const n = per.length; const tot = per.reduce((s, x) => s + x[1], 0), ok = per.reduce((s, x) => s + x[0], 0); if (tot && ok / tot < .25) return 0;
    for (let i = 0; i < n; i++) { const a = per[i], b = per[i + 1] || [0, 0], t = a[1] + b[1]; if (t && (a[0] + b[0]) / t < .6) return i; }
    return Math.max(0, n - 1);
  }
  function plBuild(tr) {
    const Tk = LC[tr], units = Tk.units, n = units.length, base = Math.floor(PL_N / n), extra = PL_N - base * n, qs = [];
    const poolM = [...new Set(units.flatMap(u => u.words.map(w => w[2])))], poolW = [...new Set(units.flatMap(u => u.words.map(w => w[0])))];
    units.forEach((u, i) => {
      const quota = base + (i >= n - extra ? 1 : 0); shuf(u.words).slice(0, quota).forEach((w, j) => {
        const rev = (i + j) % 2 === 1;
        if (!rev) { const ds = shuf(poolM.filter(x => x !== w[2])).slice(0, 3); qs.push({ q: w[0], ans: w[2], opts: shuf([w[2]].concat(ds)), t: `${L("laUnit")} ${i + 1}`, u: i }); }
        else { const ds = shuf(poolW.filter(x => x !== w[0])).slice(0, 3); qs.push({ q: T("أيُّ كلمة معناها: «", "Which word means: «") + w[2] + "»؟", ans: w[0], opts: shuf([w[0]].concat(ds)), t: `${L("laUnit")} ${i + 1}`, u: i }); }
      });
    });
    return qs.sort((a, b) => a.u - b.u);
  }
  function plPer(z) { const n = LC[z.place].units.length, per = Array.from({ length: n }, () => [0, 0]); z.qs.forEach((q, k) => { per[q.u][1]++; if (z.res && z.res[k]) per[q.u][0]++; }); return per; }
  if (typeof laPlacement === "function" && typeof LC !== "undefined" && FF("v301.placement")) {
    laPlacement = function (tr) {
      const Tk = LC[tr]; const qs = plBuild(tr);
      state.qz = { qs, i: 0, ok: 0, pick: null, back: () => {}, again: () => laPlacement(tr), place: tr, p301: true, onDone: async () => {
        const z = state.qz; const per = plPer(z), lvl = plLevel(per); z.lvl301 = lvl; const plan = laPlan(); plan.placed = Object.assign({}, plan.placed, { [tr]: Math.min(lvl, Tk.units.length - 1) });
        LSset("itqan_pl301_" + tr, { ts: Date.now(), per, lvl });
        try { await sb.from("profiles").update({ lang_plan: plan }).eq("id", state.auth.user.id); state.auth.profile.lang_plan = plan; } catch (e) {}
        try { render(); } catch (e) {}
      } };
      render();
    };
    if (typeof langAcademy === "function") {
      const _la = langAcademy;
      langAcademy = function (defTrack) {
        const z = state.qz;
        if (z && z.p301 && z.fin && z.lvl301 != null && z.place) {
          if (defTrack) state.la.tr = defTrack;
          if (!defTrack || defTrack === z.place) return `<div class="lahero"><h2>${LC[z.place].ic} ${L("plT")}</h2></div><div style="margin-top:1rem">${quizView()}</div>`;
        }
        return _la.apply(this, arguments);
      };
    }
    if (typeof quizView === "function") {
      const _q = quizView;
      quizView = function () {
        let h = _q.apply(this, arguments);
        try {
          const z = state.qz;
          if (z && z.p301 && z.fin && !z.qs[z.i] && z.lvl301 != null) {
            const per = plPer(z), n = per.length, pc = z => z[1] ? Math.round(100 * z[0] / z[1]) : 0;
            const strong = per.map((x, i) => [i, pc(x)]).filter(x => x[1] >= 75).map(x => x[0] + 1), weak = per.map((x, i) => [i, pc(x)]).filter(x => x[1] < 50).map(x => x[0] + 1);
            h += `<div class="card" style="margin-top:1rem"><h3>🧭 ${T("تقرير مستواك", "Your level report")}</h3><p><b>${T("ابدأ من الوحدة", "Start from unit")} ${z.lvl301 + 1}</b> ${T("من", "of")} ${n}</p>
              <div style="display:grid;gap:.25rem">${per.map((x, i) => `<div style="display:grid;grid-template-columns:5.5rem 1fr 2.6rem;gap:.4rem;align-items:center;font-size:.85rem"><span>${L("laUnit")} ${i + 1}</span><div style="height:8px;border-radius:9px;background:color-mix(in srgb,var(--fg) 10%,transparent);overflow:hidden"><i style="display:block;height:100%;width:${pc(x)}%;background:${pc(x) >= 75 ? "#16a34a" : pc(x) >= 50 ? "#f59e0b" : "#dc2626"}"></i></div><b>${pc(x)}%</b></div>`).join("")}</div>
              ${strong.length ? `<p>💪 ${T("نقاط القوة (الوحدات)", "Strengths (units)")}: ${strong.join("، ")}</p>` : ""}${weak.length ? `<p>🎯 ${T("تحتاج مراجعة (الوحدات)", "Needs review (units)")}: ${weak.join("، ")}</p>` : ""}
              <p class="muted sm">${T("التقدير يعتمد على نافذة من وحدتين متتاليتين لا على إجابة واحدة، فلا يغيّره التخمين المحظوظ.", "The estimate uses a window of two consecutive units, not a single answer, so a lucky guess does not move it.")}</p>
              <button class="btn btn-p" onclick="state.qz=null;go16('lang','${z.place}')">${T("ابدأ التعلّم من هنا", "Start learning from here")} ➜</button></div>`;
          }
        } catch (e) {}
        return h;
      };
    }
  }
  window.v301 = { plLevel, plBuild, select, clean, valid, genLesson, SRC, S };
})();
