/* ================= v278: المقامات — طلب المالك 20/11 (4) — (1) «مارس المقام بصوتك»: تحت كل درجة في السلم اسمها الحقيقي على صوتك (G3، A♭3…) محسوب من قرارك · (2) لوحة «اختبر صوتك على المقام»: أوكتافك في النص، وأوكتاف تحت، واتنين فوق، وكل خط عليه اسم الدرجة (Re/Mi½♭…) واسم النغمة الحقيقي، والمؤشر بيقولك إنت على أنهي درجة، وعلى الدرجة ولا بين الخطوط، وصوتك أقرب لأنهي مقام لو مش على المقام المختار · (3) «غنّي/غناء» في قسم المقامات بقت «أنشد/إنشاد» (وبالإنجليزي chant) ================= */
(function () {
  const FF = k => { try { return window.ff254(k); } catch (e) { return true; } };
  const AR = () => state.lang === "ar"; const T = (a, e) => AR() ? a : e;
  const css = s => document.head.insertAdjacentHTML("beforeend", `<style>${s}</style>`);
  const SC = id => (typeof MAQAM_SCALES !== "undefined" && MAQAM_SCALES[id]) || (MQ.find(x => x.id === id) || {}).sc || [];
  const curM = () => MQ.find(x => x.id === TN.maqam) || MQ[0];
  const nn = abs => { try { return noteName(abs) || ""; } catch (e) { return ""; } };
  const hz = f => { if (!(f > 0)) return ""; const q = Math.round(24 * Math.log2(f / 440)) + 114; const s = Math.floor(q / 2), half = q % 2; const N = ["C", "C#", "D", "Eb", "E", "F", "F#", "G", "Ab", "A", "Bb", "B"]; if (!half) return N[((s % 12) + 12) % 12] + Math.floor(s / 12); const up = s + 1; const L = ["C", "D♭", "D", "E♭", "E", "F", "G♭", "G", "A♭", "A", "B♭", "B"][((up % 12) + 12) % 12]; return (L.length === 1 ? L + "½♭" : L.replace("♭", "") + "¾♭") + Math.floor(up / 12); };
  const OCT = [[-1, "قرار القرار", "Low octave"], [0, "القرار (أوكتافك)", "Your octave"], [1, "الجواب", "Jawab"], [2, "جواب الجواب", "Jawab al-jawab"]];

  /* ---------- (2) لوحة الصوت ---------- */
  if (typeof tnDrawLadder === "function") { const _d = tnDrawLadder; tnDrawLadder = function () { if (!FF("v278.tuner")) return _d.apply(this, arguments);
    const cv = document.getElementById("tn_cv"); if (!cv) return; if (cv.height < 620) { cv.height = 640; cv.width = 560; }
    const ctx = cv.getContext("2d"); const W = cv.width, H = cv.height; ctx.clearRect(0, 0, W, H);
    const m = curM(); const sc = SC(m.id); const n = sc.length - 1; const lo = -1200, hi = 3600; const y = c => H - 14 - (c - lo) / (hi - lo) * (H - 28);
    const cols = ["rgba(148,163,184,.18)", "rgba(16,185,129,.16)", "rgba(245,158,11,.16)", "rgba(239,68,68,.12)"];
    OCT.forEach(([o, a, e], k) => { const y1 = y(o * 1200), y2 = y(o * 1200 + 1200); ctx.fillStyle = cols[k]; ctx.fillRect(0, y2, W, y1 - y2); ctx.fillStyle = "rgba(100,116,139,.9)"; ctx.font = "bold 12px Tajawal, sans-serif"; ctx.textAlign = "center"; ctx.fillText(AR() ? a : e, W / 2, y2 + 14); });
    ctx.font = "12px Tajawal, sans-serif";
    for (let o = -1; o <= 2; o++) sc.forEach((v, i) => { if (i === n && o < 2) return; const c = v + o * 1200; if (c < lo || c > hi) return; const yy = y(c); const key = i === 0 || i === n;
      ctx.strokeStyle = key ? "rgba(16,185,129,.95)" : "rgba(100,116,139,.45)"; ctx.lineWidth = key ? 2 : 1; ctx.beginPath(); ctx.moveTo(70, yy); ctx.lineTo(W - 70, yy); ctx.stroke();
      ctx.fillStyle = key ? "#047857" : "#334155"; ctx.textAlign = "left"; ctx.fillText(`${nn((m.tonic || 0) + v)} ${i === n ? 1 : i + 1}`, 6, yy + 4);
      ctx.textAlign = "right"; ctx.fillText(hz(TN.tonic * Math.pow(2, c / 1200)), W - 6, yy + 4); });
    const now = performance.now(); ctx.strokeStyle = "#f59e0b"; ctx.lineWidth = 3; ctx.beginPath(); let on = false;
    (TN.hist || []).forEach(([t, c]) => { const x = 70 + (1 - (now - t) / 8000) * (W - 140); if (c == null || c < lo || c > hi) { on = false; return; } if (!on) { ctx.moveTo(x, y(c)); on = true; } else ctx.lineTo(x, y(c)); }); ctx.stroke();
    const last = (TN.hist || []).slice(-1)[0]; if (last && last[1] != null && now - last[0] < 400) { ctx.fillStyle = "#f59e0b"; ctx.beginPath(); ctx.arc(W - 70, y(last[1]), 6, 0, 7); ctx.fill(); } }; }

  /* المؤشر: على أنهي درجة، على الخط ولا بين الخطوط، وأقرب مقام */
  const hits = []; let lastStat = 0;
  function analyse(f) { const m = curM(); const sc = SC(m.id); const n = sc.length - 1; if (!sc.length) return null; const c = 1200 * Math.log2(f / TN.tonic); const o = Math.floor(c / 1200); const rel = c - o * 1200;
    let bi = 0, bd = 1e9; sc.forEach((v, i) => { const d = rel - v; if (Math.abs(d) < Math.abs(bd)) { bd = d; bi = i; } }); if (bi === n) { bi = 0; }
    return { c, o: bi === 0 && bd < 0 && Math.abs(rel - 1200) < 60 ? o + 1 : o, rel, bi, dev: Math.round(bd), ok: Math.abs(bd) <= 30 }; }
  function suggest() { const now = performance.now(); const H = hits.filter(h => now - h.t < 15000); if (H.length < 8) return null; const m = curM();
    const score = id => { const sc = SC(id); if (!sc.length) return 1e9; return H.reduce((a, h) => a + Math.min(...sc.map(v => Math.abs(h.rel - v)), Math.abs(h.rel - 1200)), 0) / H.length; };
    const cur = score(m.id); let best = m.id, bs = cur; MQ.forEach(x => { const s = score(x.id); if (s < bs - 6) { bs = s; best = x.id; } });
    const onPct = Math.round(H.filter(h => h.ok).length / H.length * 100); return { cur, best, bs, onPct }; }
  if (typeof tnShow === "function") { const _s = tnShow; tnShow = function (f) { _s.apply(this, arguments); if (!FF("v278.tuner")) return; try { const box = box278(); if (!box || !(f > 0)) return; const a = analyse(f); if (!a) return; hits.push({ t: performance.now(), rel: a.rel, ok: a.ok }); if (hits.length > 400) hits.splice(0, 100);
      const m = curM(); const sc = SC(m.id); const v = sc[a.bi]; const name = nn((m.tonic || 0) + v); const real = hz(TN.tonic * Math.pow(2, (v + a.o * 1200) / 1200)); const oct = (OCT.find(x => x[0] === a.o) || [0, "", ""]);
      const now = performance.now(); if (now - lastStat < 120) return; lastStat = now;
      const sg = suggest(); const mq = id => { try { return mqName(MQ.find(x => x.id === id)); } catch (e) { return id; } };
      box.innerHTML = `<div class="r278 ${a.ok ? "ok" : "off"}"><b>${a.ok ? "✅ " + T("على الدرجة", "On the degree") : "↔️ " + T("بين الدرجات", "Between degrees")}</b> <span class="dg278">${name} · ${T("درجة", "degree")} ${a.bi + 1}</span> <span class="xs muted">${real} · ${AR() ? oct[1] : oct[2]}</span>${a.ok ? "" : ` <span class="xs">(${a.dev > 0 ? "+" : ""}${a.dev} ${T("سنت", "cents")})</span>`}</div>
        ${sg ? `<div class="s278">${T("على درجات المقام", "On the maqam's degrees")}: <b>${sg.onPct}%</b>${sg.best !== m.id ? ` — <b class="w278">${T("صوتك أقرب لمقام", "Your notes fit")} ${mq(sg.best)}</b> ${T("مش", "not")} ${mq(m.id)}` : ` — <b class="g278">${T("إنت على مقام", "You're on")} ${mq(m.id)} ✓</b>`}</div>` : `<div class="s278 xs muted">${T("كمّل شوية — بعد كام نغمة هقولك إنت على المقام ولا لأ", "Keep going — after a few notes I'll tell you if you're on the maqam")}</div>`}`; } catch (e) {} }; }
  function box278() { const cv = document.getElementById("tn_cv"); if (!cv) return null; let b = document.getElementById("tn278"); if (!b) { cv.insertAdjacentHTML("beforebegin", `<div id="tn278" class="t278"><span class="xs muted">${T("شغّل المايك وابدأ — هقولك إنت على أنهي درجة", "Start the mic — I'll show which degree you're on")}</span></div>`); b = document.getElementById("tn278"); } return b; }
  css(`.t278{padding:.5rem .7rem;border-radius:12px;background:var(--card);border:1px solid var(--line);margin-bottom:.5rem;min-height:3.2rem}.r278{display:flex;flex-wrap:wrap;gap:.4rem;align-items:baseline}.r278.ok b{color:#059669}.r278.off b{color:#d97706}.dg278{font-weight:800;font-size:1.1rem}.s278{margin-top:.3rem;font-size:.9rem}.w278{color:#dc2626}.g278{color:#059669}`);

  /* ---------- (1) أسماء النغمات الحقيقية تحت درجات السلم في «مارس المقام» ---------- */
  function ladderNames() { if (!FF("v278.names")) return; document.querySelectorAll("#app .mp276 .mqd-lad, #app #vt245 .mqd-lad").forEach(lad => { if (lad.dataset.n278) return; lad.dataset.n278 = 1; const mid = (state.mqd && state.mqd.mid) || TN.maqam; const m = MQ.find(x => x.id === mid) || curM(); const sc = SC(m.id); const n = sc.length - 1; let f0; try { f0 = personalTonic(m); } catch (e) { f0 = TN.tonic; } if (!f0 || !n) return;
    lad.querySelectorAll(".mqd-n").forEach(el => { const i = +(((el.getAttribute("onclick") || "").match(/mqdPlayOne\((-?\d+)\)/) || [])[1]); if (isNaN(i)) return; const o = Math.floor(i / n), k = ((i % n) + n) % n; const c = sc[k] + o * 1200; if (!el.querySelector(".r278n")) el.insertAdjacentHTML("beforeend", `<em class="r278n">${hz(f0 * Math.pow(2, c / 1200))}</em>`); }); }); }
  css(`.r278n{display:block;font-style:normal;font-size:.72rem;font-weight:800;color:#0369a1;margin-top:.15rem;direction:ltr}`);

  /* ---------- (3) «غناء» في قسم المقامات ← «إنشاد» ---------- */
  const isMq = () => /maqam|tuner|voice242|tahwil|mqc|mqchallenge|adhans/.test(state.route || "") || (state.route === "library" && state.mqFor) || (state.route === "d" && /maqam/.test(String(state.pageArg || "")));
  const RX = [[/غنّي|غني(?=\s|$)/g, "أنشد"], [/الغناء/g, "الإنشاد"], [/غناء/g, "إنشاد"], [/تغنّي|تغني(?=\s|$)/g, "تُنشد"], [/\bSing along\b/g, "Chant along"], [/\bsing along\b/g, "chant along"], [/\bSinging\b/g, "Chanting"], [/\bsinging\b/g, "chanting"], [/\bSing\b/g, "Chant"], [/\bsing\b/g, "chant"], [/\bsongs\b/g, "nasheeds"], [/\bsong\b/g, "nasheed"]];
  function noSing() { if (!FF("v278.nosing") || !isMq()) return; const app = document.getElementById("app"); if (!app) return; const tw = document.createTreeWalker(app, NodeFilter.SHOW_TEXT); let x; while ((x = tw.nextNode())) { const v = x.nodeValue; if (!/غن|غناء|[Ss]ing|song/.test(v)) continue; let r = v; RX.forEach(([a, b]) => r = r.replace(a, b)); if (r !== v) x.nodeValue = r; } }

  const _r = render; render = function () { const o = _r.apply(this, arguments); try { ladderNames(); noSing(); } catch (e) {} return o; };
  let q = 0; new MutationObserver(() => { if (q) return; q = 1; requestAnimationFrame(() => { q = 0; try { ladderNames(); noSing(); } catch (e) {} }); }).observe(document.documentElement, { childList: true, subtree: true });
})();
