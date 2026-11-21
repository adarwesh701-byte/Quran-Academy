/* ================= v307: الموالف (لوحة الصوت) احترافي: التقاط أدق وأحسّ (YIN + تنعيم + إصلاح قفزات الأوكتاف) · اللوحة بعرض الصفحة كلها · كل خط عليه اسم النغمة (دو/ري/مي…) + نوعها (طبيعية/بيمول/دييز/نص بيمول) + رقم الدرجة · اكتشاف المقام مستقل عن القرار (تبدأ من أي درجة) · ثبات الصفحة (لا تطلع وتنزل) ================= */
(function () {
  if (window.__v307) return; window.__v307 = 1;
  const D = document; const AR = () => { try { return state.lang === "ar"; } catch (e) { return true; } }; const T = (a, e) => AR() ? a : e;
  const css = (id, s) => { if (D.getElementById(id)) return; D.head.insertAdjacentHTML("beforeend", `<style id="${id}">${s}</style>`); };

  /* ---------- 1) كاشف النغمة: YIN ---------- */
  tnPitch = function (buf, sr) {
    const n = buf.length; let e = 0; for (let i = 0; i < n; i++) e += buf[i] * buf[i]; const rms = Math.sqrt(e / n); if (rms < .0035) return -1;
    const W = 1024, tmin = Math.floor(sr / 1000), tmax = Math.min(Math.floor(sr / 65), n - W - 2); if (tmax <= tmin + 2) return -1;
    const d = new Float32Array(tmax + 2); const cm = new Float32Array(tmax + 2);
    for (let t = tmin - 1; t <= tmax; t++) { let s = 0; for (let i = 0; i < W; i += 2) { const x = buf[i] - buf[i + t]; s += x * x; } d[t] = s; }
    let run = 0; cm[tmin - 1] = 1; for (let t = tmin; t <= tmax; t++) { run += d[t]; cm[t] = run > 0 ? d[t] * (t - tmin + 1) / run : 1; }
    let best = -1; for (let t = tmin + 1; t < tmax; t++) { if (cm[t] < .18 && cm[t] <= cm[t - 1] && cm[t] <= cm[t + 1]) { best = t; break; } }
    if (best < 0) { let m = 1, mi = -1; for (let t = tmin + 1; t < tmax; t++) if (cm[t] < m) { m = cm[t]; mi = t; } if (mi < 0 || m > .32) return -1; best = mi; }
    const a = cm[best - 1], b = cm[best], c = cm[best + 1]; const den = 2 * (2 * b - a - c); const sh = den ? (c - a) / den : 0;
    return sr / (best + (isFinite(sh) ? Math.max(-1, Math.min(1, sh)) : 0));
  };

  /* ---------- 2) تنعيم + إصلاح قفزات الأوكتاف + تسجيل النغمات المستقرة ---------- */
  const ENDS = []; const RECENT = []; let held = 0, lastGood = 0; const STABLE = [];
  const cents = f => 1200 * Math.log2(f / 440);
  function smooth(f) {
    const now = performance.now();
    if (!(f > 0)) { if (lastGood && now - held < 140) return lastGood; if (STABLE.length && now - STABLE[STABLE.length - 1].t < 400) { ENDS.push(STABLE[STABLE.length - 1].c); if (ENDS.length > 12) ENDS.shift(); } return f; }
    if (RECENT.length) { const med = RECENT.slice().sort((x, y) => x - y)[RECENT.length >> 1]; let c = cents(f); const k = Math.round((c - med) / 1200); if (k !== 0 && Math.abs(c - med - k * 1200) < 90) { c -= k * 1200; f = 440 * Math.pow(2, c / 1200); } }
    RECENT.push(cents(f)); if (RECENT.length > 5) RECENT.shift();
    const med = RECENT.slice().sort((x, y) => x - y)[RECENT.length >> 1]; const out = Math.abs(cents(f) - med) < 60 ? (440 * Math.pow(2, (cents(f) * .5 + med * .5) / 1200)) : f;
    lastGood = out; held = now;
    if (RECENT.length >= 4 && Math.max(...RECENT.slice(-4)) - Math.min(...RECENT.slice(-4)) < 45) { STABLE.push({ t: now, c: cents(out) }); while (STABLE.length && now - STABLE[0].t > 14000) STABLE.shift(); }
    return out;
  }

  /* ---------- 3) أسماء النغمات: دو/ري/مي + نوعها ---------- */
  const SOL = ["Do", "Do", "Re", "Mi", "Mi", "Fa", "Fa", "Sol", "La", "La", "Si", "Si"]; const ACC = ["", "♯", "", "♭", "", "", "♯", "", "♭", "", "♭", ""];
  const LET = ["C", "C", "D", "E", "E", "F", "F", "G", "A", "A", "B", "B"];
  const AT = { "": ["طبيعية", "natural"], "♭": ["بيمول", "flat"], "♯": ["دييز", "sharp"], "½♭": ["نص بيمول (كُرون)", "half-flat"], "½♯": ["نص دييز", "half-sharp"] };
  function nameOf(f) { // أقرب ربع تون على A440
    const q = Math.round(cents(f) / 50); const odd = ((q % 2) + 2) % 2; const s = Math.floor(q / 2); const at = k => { const i = (((s + k) + 9) % 12 + 12) % 12; return { i, oct: Math.floor(((s + k) + 9) / 12) + 4 }; };
    let lo = at(0), up = at(1), r;
    if (!odd) r = { i: lo.i, oct: lo.oct, acc: ACC[lo.i] };
    else if (ACC[up.i] === "") r = { i: up.i, oct: up.oct, acc: "½♭" };
    else r = { i: lo.i, oct: lo.oct, acc: "½♯" };
    const ty = AT[r.acc] || AT[""]; return { sol: SOL[r.i], acc: r.acc, txt: SOL[r.i] + r.acc, west: LET[r.i] + r.acc + r.oct, type: AR() ? ty[0] : ty[1] };
  }

  /* ---------- 4) اكتشاف المقام من النغمات المستقرة (مستقل عن القرار: ابدأ من أي درجة) ---------- */
  const SCALES = () => { const o = {}; try { MQ.forEach(m => { const sc = (typeof MAQAM_SCALES !== "undefined" && MAQAM_SCALES[m.id]) || m.sc; if (sc && sc.length > 2) o[m.id] = sc.slice(0, -1); }); } catch (e) {} return o; };
  const circ = (a, b) => { let d = ((a - b) % 1200 + 1800) % 1200 - 600; return Math.abs(d); };
  let LASTWIN = null;
  function detect() {
    const H = STABLE; if (H.length < 24) return null; const cs = H.map(h => ((h.c % 1200) + 1200) % 1200);
    const hist = new Float32Array(120); cs.forEach(c => { hist[Math.round(c / 10) % 120]++; });
    const cand = []; for (let i = 0; i < 120; i++) { const w = hist[i] + .5 * (hist[(i + 119) % 120] + hist[(i + 1) % 120]); if (w >= Math.max(4, H.length * .07) && hist[i] >= hist[(i + 119) % 120] && hist[i] >= hist[(i + 1) % 120]) cand.push([i * 10, w]); }
    cand.sort((a, b) => b[1] - a[1]); const tons = cand.slice(0, 6).map(x => x[0]); if (!tons.length) return null;
    const S = SCALES(); let best = null; const wt = {}; cand.forEach(([c, w]) => { wt[c] = w; }); const maxW = Math.max(...cand.map(x => x[1])); const mod = c => ((c % 1200) + 1200) % 1200;
    const sorted = H.map(h => h.c).sort((a, b) => a - b); const lowC = mod(sorted[Math.floor(sorted.length * .06)]); const userT = mod(cents(TN.tonic));
    const endsN = ENDS.map(mod);
    const all = [];
    Object.keys(S).forEach(id => { const sc = S[id]; tons.forEach(t => { let fit = 0, on = 0; const hit = new Array(sc.length).fill(0);
      cs.forEach(c => { const rel = (c - t + 1200) % 1200; let d = 1e9, k = -1; sc.forEach((v, j) => { const x = circ(rel, v); if (x < d) { d = x; k = j; } }); fit += Math.exp(-Math.pow(d / 32, 2)); if (d <= 30) { on++; hit[k]++; } });
      fit /= cs.length; const cov = hit.filter(h => h >= Math.max(2, cs.length * .04)).length / sc.length;
      const share = (wt[t] || 0) / maxW; const endB = endsN.length ? endsN.filter(e => circ(e, t) < 40).length / endsN.length : 0; const lowB = circ(lowC, t) < 45 ? 1 : 0; const usrB = circ(userT, t) < 60 ? 1 : 0;
      const score = fit * .62 + cov * .1 + share * .08 + endB * .1 + lowB * .07 + usrB * .03;
      all.push({ id, tonic: t, score, on: Math.round(on / cs.length * 100) }); }); });
    all.sort((x, y) => y.score - x.score); best = all[0]; if (!best) return null;
    if (LASTWIN && (LASTWIN.id !== best.id || circ(LASTWIN.tonic, best.tonic) > 40)) { const prev = all.find(x => x.id === LASTWIN.id && circ(x.tonic, LASTWIN.tonic) <= 40); if (prev && prev.score >= best.score - .04) best = prev; }
    LASTWIN = best; return best;
  }
  const mqLabel = id => { try { return mqName(MQ.find(x => x.id === id)); } catch (e) { return id; } };

  /* ---------- 5) لوحة الصوت بعرض الصفحة ---------- */
  css("css307", `
body:has(#tn_cv) #app .grid.g2{grid-template-columns:1fr!important}
body:has(#tn_cv) #app .card:has(#tn_cv){padding:.5rem}
#tn_cv{width:100%!important;height:auto!important;display:block;touch-action:pan-y}
#tn278{display:none!important}
#tn307{padding:.6rem .8rem;border-radius:14px;background:var(--card);border:1px solid var(--line);margin-bottom:.6rem;min-height:7.2rem;contain:layout style}
#tn307 .n307{display:flex;flex-wrap:wrap;align-items:baseline;gap:.5rem .8rem}
#tn307 .big307{font-size:1.9rem;font-weight:900;direction:ltr;min-width:5.5rem}
#tn307 .ok307{color:#059669}#tn307 .off307{color:#d97706}#tn307 .w307{color:#dc2626}#tn307 .g307{color:#059669}
#tn_deg,#tn_msg{min-height:2.8rem}
body:has(#tn_cv){overflow-anchor:none}`);
  function panel() {
    const cv = D.getElementById("tn_cv"); if (!cv) return null; let b = D.getElementById("tn307");
    if (!b) { cv.parentElement.insertAdjacentHTML("beforebegin", `<div id="tn307"><span class="xs muted">${T("شغّل الميكروفون وابدأ — سأكتب لك اسم كل نغمة ودرجتها", "Start the mic — I'll name every note and degree")}</span></div>`); b = D.getElementById("tn307"); }
    return b;
  }
  const _show = tnShow; let lastP = 0;
  tnShow = function (f) {
    f = smooth(f); _show.call(this, f);
    try { const now = performance.now(); if (now - lastP < 100) return; lastP = now; const b = panel(); if (!b || !(f > 0)) return;
      const nm = nameOf(f); const id = TN.maqam; const sc = (MAQAM_SCALES[id] || []).slice(0, -1); const rel = ((1200 * Math.log2(f / TN.tonic)) % 1200 + 1200) % 1200; let bi = 0, bd = 1e9; sc.forEach((v, i) => { const d = rel - v, dd = Math.abs(((d + 600) % 1200 + 1200) % 1200 - 600); if (dd < Math.abs(bd)) { bd = ((d + 600) % 1200 + 1200) % 1200 - 600; bi = i; } });
      const ok = Math.abs(bd) <= 25; const dt = detect();
      let mq; if (!dt) mq = `<span class="xs muted">${T("أكمل بضع نغمات ثابتة وسأحدد المقام (حتى لو بدأت من أي درجة)", "Hold a few steady notes and I'll detect the maqam (from any starting degree)")}</span>`;
      else { const tn = nameOf(TN.tonic * Math.pow(2, (dt.tonic - ((1200 * Math.log2(TN.tonic / 440)) % 1200 + 1200) % 1200) / 1200)); const tf = 440 * Math.pow(2, dt.tonic / 1200); const tnm = nameOf(tf);
        mq = dt.id === id ? `<b class="g307">${T("أنت على مقام", "You're on")} ${mqLabel(id)} ✓</b> <span class="xs muted">${T("قراره", "tonic")} ${tnm.txt} · ${dt.on}%</span>` : `<b class="w307">${T("صوتك أقرب لمقام", "Your notes fit")} ${mqLabel(dt.id)}</b> <span class="xs">${T("على قرار", "on tonic")} <b>${tnm.txt}</b> · ${dt.on}%</span> <button class="btn btn-o" style="padding:.1rem .6rem" onclick="tn307.adopt('${dt.id}',${dt.tonic})">${T("اعتمده", "Use it")}</button>`; }
      b.innerHTML = `<div class="n307"><span class="big307 ${ok ? "ok307" : "off307"}">${nm.txt}</span><span><b>${nm.type}</b> · ${nm.west}</span><span class="xs muted">${f.toFixed(1)} Hz</span><span class="xs">${T("درجة", "degree")} <b>${bi + 1}</b> ${ok ? "✅" : "↔ " + (bd > 0 ? "+" : "") + Math.round(bd) + " " + T("سنت", "cents")}</span></div><div style="margin-top:.35rem">${mq}</div>`;
    } catch (e) {}
  };
  window.tn307 = { adopt(id, c) { try { TN.maqam = id; let f = 440 * Math.pow(2, c / 1200); while (f < TN.tonic * .7) f *= 2; while (f > TN.tonic * 1.42) f /= 2; TN.tonic = f; const i = D.getElementById("tn_t"); if (i) i.value = f.toFixed(1); const s = D.querySelector("select.in[onchange*='TN.maqam']"); if (s) s.value = id; LASTWIN = null; tnDrawLadder(); toast("🎯 " + mqLabel(id) + " · " + nameOf(f).txt); } catch (e) {} } };

  tnDrawLadder = function () {
    const cv = D.getElementById("tn_cv"); if (!cv) return; const card = cv.parentElement; const dpr = Math.min(2, window.devicePixelRatio || 1);
    const CW = Math.max(300, Math.floor((card.clientWidth || 600) - 16)); const CH = Math.max(520, Math.min(780, Math.round(innerHeight * .78)));
    if (cv.width !== CW * dpr || cv.height !== CH * dpr) { cv.width = CW * dpr; cv.height = CH * dpr; }
    const ctx = cv.getContext("2d"); ctx.setTransform(dpr, 0, 0, dpr, 0, 0); const W = CW, H = CH; ctx.clearRect(0, 0, W, H);
    const id = TN.maqam; const scF = MAQAM_SCALES[id] || MAQAM_SCALES.bayati; const sc = scF.slice(0, -1); const lo = -1200, hi = 2400; const y = c => H - 16 - (c - lo) / (hi - lo) * (H - 32);
    const cols = ["rgba(148,163,184,.16)", "rgba(16,185,129,.15)", "rgba(245,158,11,.15)"]; const OC = [[-1, "قرار القرار", "Low octave"], [0, "القرار (أوكتافك)", "Your octave"], [1, "الجواب", "Jawab"]];
    const dark = D.documentElement.getAttribute("data-theme") === "dark" || D.body.getAttribute("data-theme") === "dark"; const fg = dark ? "#e2e8f0" : "#1e293b", mu = dark ? "#94a3b8" : "#475569";
    OC.forEach(([o, a, e], k) => { const y1 = y(o * 1200), y2 = y(o * 1200 + 1200); ctx.fillStyle = cols[k]; ctx.fillRect(0, y2, W, y1 - y2); ctx.fillStyle = mu; ctx.font = "bold 12px Tajawal, sans-serif"; ctx.textAlign = "center"; ctx.fillText(AR() ? a : e, W / 2, y2 + 15); });
    const last = (TN.hist || []).slice(-1)[0]; const now = performance.now(); const curC = last && last[1] != null && now - last[0] < 500 ? last[1] : null;
    const LX = Math.min(190, Math.max(150, W * .3)), RX = Math.min(100, W * .2);
    for (let o = -1; o <= 1; o++) sc.forEach((v, i) => { const c = v + o * 1200; const yy = y(c); if (yy < 4 || yy > H - 4) return; const key = i === 0; const f = TN.tonic * Math.pow(2, c / 1200); const nm = nameOf(f);
      const near = curC != null && Math.abs(curC - c) < 28;
      ctx.strokeStyle = near ? "#f59e0b" : key ? "rgba(16,185,129,.95)" : (dark ? "rgba(148,163,184,.45)" : "rgba(100,116,139,.5)"); ctx.lineWidth = near ? 3 : key ? 2.2 : 1.2; ctx.beginPath(); ctx.moveTo(LX, yy); ctx.lineTo(W - RX, yy); ctx.stroke();
      ctx.textAlign = "right"; ctx.font = `${key || near ? "800" : "700"} 14px Tajawal, sans-serif`; ctx.fillStyle = near ? "#b45309" : key ? "#047857" : fg; ctx.fillText(nm.txt, LX - 36, yy + 5);
      const nw = ctx.measureText(nm.txt).width; ctx.font = "10.5px Tajawal, sans-serif"; ctx.fillStyle = mu; ctx.fillText(nm.type.replace(" (كُرون)", ""), LX - 36 - nw - 6, yy + 4);
      ctx.textAlign = "center"; ctx.beginPath(); ctx.fillStyle = key ? "#059669" : (dark ? "#334155" : "#e2e8f0"); ctx.arc(LX - 18, yy, 11, 0, 7); ctx.fill(); ctx.fillStyle = key ? "#fff" : fg; ctx.font = "bold 12px Tajawal, sans-serif"; ctx.fillText(String(i + 1), LX - 18, yy + 4);
      ctx.textAlign = "left"; ctx.fillStyle = mu; ctx.font = "12px Tajawal, sans-serif"; ctx.fillText(nm.west, W - RX + 8, yy + 4); });
    ctx.strokeStyle = "#f59e0b"; ctx.lineWidth = 3; ctx.lineJoin = "round"; ctx.beginPath(); let on = false; const x0 = LX, x1 = W - RX;
    (TN.hist || []).forEach(([t, c]) => { const x = x0 + (1 - (now - t) / 8000) * (x1 - x0); if (c == null || c < lo || c > hi) { on = false; return; } if (!on) { ctx.moveTo(x, y(c)); on = true; } else ctx.lineTo(x, y(c)); }); ctx.stroke();
    if (curC != null && curC >= lo && curC <= hi) { const nm = nameOf(TN.tonic * Math.pow(2, curC / 1200)); ctx.fillStyle = "#f59e0b"; ctx.beginPath(); ctx.arc(x1, y(curC), 7, 0, 7); ctx.fill(); ctx.font = "800 13px Tajawal, sans-serif"; ctx.textAlign = "left"; const tw = ctx.measureText(nm.txt).width + 14; ctx.fillStyle = "#f59e0b"; const bx = Math.min(x1 + 10, W - tw - 2); ctx.fillRect(bx, y(curC) - 11, tw, 22); ctx.fillStyle = "#1f2937"; ctx.fillText(nm.txt, bx + 7, y(curC) + 4); }
  };
  addEventListener("resize", () => { try { tnDrawLadder(); } catch (e) {} });
})();
