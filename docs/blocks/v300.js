/* ================= v300: ⏱️ مؤقت بـ13 شكلًا (يظهر جنب السبورة في الشريط الشمال وفي شريط الفصل، ومتزامن مع الطلاب داخل الفصل) + 🎮 12 لعبة جديدة للصغار والكبار داخل الفصل (أي حرف؟ · عدّ وطابق · اعثر على المختلف · اضرب الحيوان · فرقع البالونات · ذاكرة الألوان · حجر ورقة مقص · لون الحبر · حساب سريع · كلمة مبعثرة · سين وجيم · أربعة في صف) + قائمة ألعاب مقسّمة حسب العمر ================= */
(function () {
  if (window.__v300) return; window.__v300 = 1;
  const D = document;
  const AR = () => { try { return state.lang === "ar"; } catch (e) { return D.documentElement.lang === "ar"; } };
  const T = (a, e) => AR() ? a : e;
  const LS = (k, d) => { try { const v = JSON.parse(localStorage.getItem(k) || "null"); return v == null ? d : v; } catch (e) { return d; } };
  const LSset = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} };
  const E = s => String(s == null ? "" : s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const FF = k => { try { return typeof window.ff254 === "function" ? window.ff254(k) : true; } catch (e) { return true; } };
  const rnd = n => Math.floor(Math.random() * n);
  const pick = a => a[rnd(a.length)];
  const shuffle = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = rnd(i + 1); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const inRoom = () => { try { return !!(RM && RM.joined); } catch (e) { return false; } };
  const isHost = () => { try { return !inRoom() || rmIsHost(); } catch (e) { return true; } };

  /* ---------- صوت (مستقل عن الفصل) ---------- */
  function ac() { try { if (!window.__ac300) window.__ac300 = new (window.AudioContext || window.webkitAudioContext)(); if (window.__ac300.state === "suspended") window.__ac300.resume(); return window.__ac300; } catch (e) { return null; } }
  function tone(f, t0, d, type, vol) { const a = ac(); if (!a) return; try { const now = a.currentTime, o = a.createOscillator(), g = a.createGain(); o.type = type || "sine"; o.frequency.value = f; g.gain.setValueAtTime(vol || .2, now + t0); g.gain.exponentialRampToValueAtTime(.001, now + t0 + d); o.connect(g); g.connect(a.destination); o.start(now + t0); o.stop(now + t0 + d + .05); } catch (e) {} }
  const SND = {
    bell() { tone(880, 0, 1.2, "sine", .25); tone(1320, 0, .8, "sine", .08); tone(880, .9, 1.2, "sine", .2); },
    alarm() { for (let i = 0; i < 4; i++) { tone(880, i * .35, .16, "square", .09); tone(660, i * .35 + .17, .16, "square", .07); } },
    fanfare() { [523, 659, 784, 1047].forEach((f, i) => tone(f, i * .13, .35, "triangle", .16)); tone(1047, .6, .7, "triangle", .2); },
    chime() { [784, 988, 1175, 1568].forEach((f, i) => tone(f, i * .18, .6, "sine", .15)); },
    tick() { tone(1000, 0, .05, "square", .04); },
    ok() { tone(660, 0, .12); tone(990, .1, .28); },
    no() { tone(180, 0, .35, "sawtooth", .1); },
    pop() { tone(520, 0, .08); }
  };
  const snd = n => { try { if (SND[n]) SND[n](); } catch (e) {} };
  const burst = ms => { try { if (typeof confetti === "function") confetti(ms || 2200); } catch (e) {} };

  /* ======================================================================
     1) المؤقت ⏱️
     ====================================================================== */
  const SKINS = [
    ["ring", "⭕", "حلقة", "Ring"], ["digital", "🔢", "أرقام مضيئة", "Neon digits"], ["hour", "⏳", "ساعة رملية", "Hourglass"], ["rocket", "🚀", "صاروخ", "Rocket"],
    ["race", "🐢", "سباق السلحفاة", "Turtle race"], ["candle", "🕯️", "شمعة", "Candle"], ["pie", "🍕", "قرص", "Pie"], ["balloon", "🎈", "بالونة", "Balloon"],
    ["battery", "🔋", "بطارية", "Battery"], ["plant", "🌱", "نبتة تنمو", "Growing plant"], ["clock", "🕰️", "ساعة بعقرب", "Clock"], ["ice", "🍦", "آيس كريم", "Ice cream"], ["sun", "🌅", "شروق وغروب", "Sunrise & sunset"]
  ];
  const COLS = ["#10b981", "#3b82f6", "#f59e0b", "#ef4444", "#a855f7", "#ec4899", "#14b8a6", "#eab308"];
  const PRE = [[30, "٣٠ث", "30s"], [60, "١د", "1m"], [120, "٢د", "2m"], [180, "٣د", "3m"], [300, "٥د", "5m"], [600, "١٠د", "10m"], [900, "١٥د", "15m"], [1800, "٣٠د", "30m"]];
  const SNDS = [["bell", "🔔", "جرس", "Bell"], ["alarm", "⏰", "منبّه", "Alarm"], ["fanfare", "🎺", "بوق الفوز", "Fanfare"], ["chime", "🎐", "رنين", "Chime"]];
  const P0 = Object.assign({ skin: "ring", col: COLS[0], snd: "bell", sndOn: true, dur: 300, up: false, size: 100, x: null, y: null }, LS("tm300p", {}));
  const TM = { open: false, set: false, big: false, view: false, dismissed: false, done: false, lastTick: -1, last: "", lastSync: 0, iv: 0, el: null,
    s: { dur: P0.dur * 1000, el: 0, t0: 0, run: false, up: P0.up, skin: P0.skin, col: P0.col, snd: P0.snd, sndOn: P0.sndOn, label: "", size: P0.size } };
  const savePrefs = () => { const s = TM.s; LSset("tm300p", { skin: s.skin, col: s.col, snd: s.snd, sndOn: s.sndOn, dur: Math.round(s.dur / 1000), up: s.up, size: s.size, x: P0.x, y: P0.y }); };
  const elapsed = () => TM.s.el + (TM.s.run ? Date.now() - TM.s.t0 : 0);
  const canCtl = () => !TM.view;
  const two = n => (n < 10 ? "0" : "") + n;
  function fmt(ms, up) { const t = Math.max(0, up ? Math.floor(ms / 1000) : Math.ceil(ms / 1000)); const h = Math.floor(t / 3600), m = Math.floor(t % 3600 / 60), s = t % 60; return (h ? h + ":" + two(m) : two(m)) + ":" + two(s); }
  const lerp = (a, b, t) => Math.round(a + (b - a) * t);
  const mix = (A, B, t) => `rgb(${lerp(A[0], B[0], t)},${lerp(A[1], B[1], t)},${lerp(A[2], B[2], t)})`;

  /* كل شكل يرجّع {h: HTML, tx: هل يظهر الرقم تحته} — p = نسبة ما مضى (0..1) */
  const SK = {
    ring(p, c, txt) { const C = 2 * Math.PI * 88; return { tx: false, h: `<svg viewBox="0 0 220 220" class="tsv"><circle cx="110" cy="110" r="88" fill="none" stroke="rgba(255,255,255,.12)" stroke-width="16"/><circle cx="110" cy="110" r="88" fill="none" stroke="${c}" stroke-width="16" stroke-linecap="round" stroke-dasharray="${C.toFixed(1)}" stroke-dashoffset="${(C * p).toFixed(1)}" transform="rotate(-90 110 110)"/><text x="110" y="128" text-anchor="middle" class="tbig">${txt}</text></svg>` }; },
    digital(p, c, txt) { return { tx: false, h: `<div class="tdg" style="color:${c};text-shadow:0 0 14px ${c},0 0 34px ${c}">${txt}</div><div class="tdb"><i style="width:${((1 - p) * 100).toFixed(1)}%;background:${c}"></i></div>` }; },
    hour(p, c) {
      const f = 1 - p, yl = 28 + 96 * (1 - f), w = y => 108 * (1 - (y - 28) / 96), tw = w(yl), h = 96 * p, bw = 54 * p;
      const top = f > .004 ? `<polygon points="${100 - tw / 2},${yl} ${100 + tw / 2},${yl} 100,124" fill="${c}"/>` : "";
      const bot = p > .004 ? `<polygon points="100,${232 - h} ${100 - bw - 8},232 ${100 + bw + 8},232" fill="${c}"/>` : "";
      const st = f > .004 && p < .996 ? `<line x1="100" y1="124" x2="100" y2="${232 - h}" stroke="${c}" stroke-width="3" stroke-dasharray="5 4" class="tfall"/>` : "";
      return { tx: true, h: `<svg viewBox="0 0 200 260" class="tsv"><rect x="40" y="14" width="120" height="12" rx="6" fill="#cbd5e1"/><rect x="40" y="234" width="120" height="12" rx="6" fill="#cbd5e1"/>${top}${bot}${st}<polygon points="46,28 154,28 100,124" fill="none" stroke="#e2e8f0" stroke-width="4" stroke-linejoin="round"/><polygon points="100,128 154,232 46,232" fill="none" stroke="#e2e8f0" stroke-width="4" stroke-linejoin="round"/></svg>` };
    },
    rocket(p, c) { const done = p >= .999; return { tx: true, h: `<div class="trk"><i class="st1">✨</i><i class="st2">⭐</i><i class="st3">✨</i><div class="trm">🌕</div><div class="trr ${done ? "" : "fly"}" style="bottom:${(6 + p * 66).toFixed(1)}%">${done ? "🎉" : "🚀"}</div></div>` }; },
    race(p, c) { return { tx: true, h: `<div class="trc" dir="ltr"><div class="trl"><span class="trt" style="left:${(p * 80).toFixed(1)}%">🐢</span><span class="trf">🏁</span></div><div class="trg"></div></div>` }; },
    candle(p, c, txt, run) { const bh = 12 + 128 * (1 - p), y = 232 - bh; const fl = p < .999 ? `<g transform="translate(100 ${y - 4})"><g class="tfl"><ellipse cx="0" cy="-16" rx="11" ry="20" fill="#fb923c"/><ellipse cx="0" cy="-12" rx="6" ry="12" fill="#fde047"/></g></g>` : `<text x="100" y="${y - 14}" text-anchor="middle" font-size="30">💨</text>`; return { tx: true, h: `<svg viewBox="0 0 200 260" class="tsv"><ellipse cx="100" cy="238" rx="64" ry="9" fill="#475569"/><rect x="76" y="${y}" width="48" height="${bh}" rx="5" fill="#fde68a"/><rect x="76" y="${y}" width="48" height="8" rx="4" fill="#fef3c7"/><line x1="100" y1="${y}" x2="100" y2="${y - 9}" stroke="#334155" stroke-width="3"/>${fl}</svg>` }; },
    pie(p, c) { const f = 1 - p; let d; if (f >= .9999) d = `<circle cx="110" cy="110" r="90" fill="${c}"/>`; else if (f <= .0005) d = ""; else { const a = -Math.PI / 2 + 2 * Math.PI * f, x = 110 + 90 * Math.cos(a), y = 110 + 90 * Math.sin(a); d = `<path d="M110 110 L110 20 A90 90 0 ${f > .5 ? 1 : 0} 1 ${x.toFixed(2)} ${y.toFixed(2)} Z" fill="${c}"/>`; } return { tx: true, h: `<svg viewBox="0 0 220 220" class="tsv"><circle cx="110" cy="110" r="94" fill="#1e293b" stroke="#e2e8f0" stroke-width="4"/>${d}<circle cx="110" cy="110" r="5" fill="#fff"/></svg>` }; },
    balloon(p, c) { const done = p >= .999; return { tx: true, h: `<div class="tbl"><div class="tbs" style="transform:scale(${(.35 + p * 1.05).toFixed(3)})">${done ? "💥" : "🎈"}</div></div>` }; },
    battery(p, c) { const f = 1 - p, col = f > .5 ? c : f > .2 ? "#f59e0b" : "#ef4444"; return { tx: true, h: `<svg viewBox="0 0 220 140" class="tsv"><rect x="14" y="30" width="176" height="80" rx="14" fill="none" stroke="#e2e8f0" stroke-width="6"/><rect x="194" y="55" width="14" height="30" rx="5" fill="#e2e8f0"/><rect x="22" y="38" width="${(160 * f).toFixed(1)}" height="64" rx="8" fill="${col}"/><text x="102" y="86" text-anchor="middle" font-size="34" fill="#fff" opacity=".9">⚡</text></svg>` }; },
    plant(p, c) { const st = p >= .999 ? "🌸" : p > .72 ? "🌷" : p > .45 ? "🪴" : p > .2 ? "🌿" : "🌱"; return { tx: true, h: `<div class="tpl"><div class="tps" style="font-size:${(2.6 + p * 3.2).toFixed(2)}rem">${st}</div><div class="tpg"></div><div class="tpw">${p > .05 && p < .999 ? "💧" : ""}</div></div>` }; },
    clock(p, c) { const a = 2 * Math.PI * p - Math.PI / 2, x = 110 + 74 * Math.cos(a), y = 110 + 74 * Math.sin(a); let ticks = ""; for (let i = 0; i < 12; i++) { const t = i * Math.PI / 6; ticks += `<line x1="${110 + 84 * Math.cos(t)}" y1="${110 + 84 * Math.sin(t)}" x2="${110 + 94 * Math.cos(t)}" y2="${110 + 94 * Math.sin(t)}" stroke="#e2e8f0" stroke-width="${i % 3 ? 3 : 5}"/>`; } const C = 2 * Math.PI * 62; return { tx: true, h: `<svg viewBox="0 0 220 220" class="tsv"><circle cx="110" cy="110" r="102" fill="#1e293b" stroke="#e2e8f0" stroke-width="5"/>${ticks}<circle cx="110" cy="110" r="62" fill="none" stroke="${c}" stroke-opacity=".35" stroke-width="30" stroke-dasharray="${(C * p).toFixed(1)} ${C.toFixed(1)}" transform="rotate(-90 110 110)"/><line x1="110" y1="110" x2="${x.toFixed(1)}" y2="${y.toFixed(1)}" stroke="${c}" stroke-width="6" stroke-linecap="round"/><circle cx="110" cy="110" r="7" fill="${c}"/></svg>` }; },
    ice(p, c) { return { tx: true, h: `<div class="tic"><div class="tcc" style="transform:scale(1,${(1 - p * .68).toFixed(3)})">🍦</div><div class="tcd" style="opacity:${p > .05 && p < .999 ? 1 : 0}">💧</div><div class="tcp" style="transform:scale(${(.2 + p * 1.1).toFixed(2)})"></div></div>` }; },
    sun(p, c) { const th = Math.PI * (1 - p), x = 150 + 120 * Math.cos(th), y = 150 - 112 * Math.sin(th); const stops = [[0, [56, 189, 248]], [.5, [125, 211, 252]], [.75, [251, 146, 60]], [.88, [190, 80, 120]], [1, [30, 27, 75]]]; let sky = mix(stops[0][1], stops[0][1], 0); for (let i = 1; i < stops.length; i++) if (p <= stops[i][0]) { sky = mix(stops[i - 1][1], stops[i][1], (p - stops[i - 1][0]) / (stops[i][0] - stops[i - 1][0])); break; } const night = p > .93; return { tx: true, h: `<svg viewBox="0 0 300 190" class="tsv"><rect width="300" height="190" rx="18" fill="${sky}"/>${night ? `<text x="60" y="50" font-size="16">✨</text><text x="230" y="40" font-size="12">⭐</text><text x="150" y="90" font-size="14">✨</text>` : ""}<path d="M30 150 A120 112 0 0 1 270 150" fill="none" stroke="#fff" stroke-opacity=".35" stroke-width="3" stroke-dasharray="4 6"/><rect y="150" width="300" height="40" fill="#14532d"/><text x="${x.toFixed(1)}" y="${(y + 12).toFixed(1)}" text-anchor="middle" font-size="38">${night ? "🌙" : "☀️"}</text></svg>` }; }
  };

  function renderStage() {
    const s = TM.s, el = elapsed(), total = s.dur;
    const rem = Math.max(0, total - el);
    const p = s.up ? Math.min(1, (el % 60000) / 60000) : Math.min(1, el / total);
    const txt = s.up ? fmt(el, true) : fmt(rem, false);
    const sk = (SK[s.skin] || SK.ring)(p, s.col, txt, s.run);
    const key = s.skin + "|" + s.col + "|" + p.toFixed(3) + "|" + txt + "|" + s.run;
    const root = TM.el; if (!root) return;
    const stg = root.querySelector(".tst"), tx = root.querySelector(".ttx");
    if (key !== TM.last) { TM.last = key; stg.innerHTML = sk.h; }
    tx.style.display = sk.tx ? "" : "none"; tx.textContent = txt; tx.style.color = s.col;
    const warn = !s.up && s.run && rem <= 10000 && rem > 0;
    root.classList.toggle("warn", warn); root.classList.toggle("done", TM.done); root.classList.toggle("runs", !!s.run);
    const pb = root.querySelector("[data-a=go]"); if (pb) pb.innerHTML = s.run ? "⏸ " + T("إيقاف مؤقت", "Pause") : (TM.done ? "↺ " + T("ابدأ من جديد", "Restart") : (el > 0 ? "▶ " + T("تابع", "Resume") : "▶ " + T("ابدأ", "Start")));
  }

  function tick() {
    const s = TM.s; if (!TM.open) return;
    const el = elapsed(), rem = s.dur - el;
    if (s.run && !s.up) {
      const sec = Math.ceil(rem / 1000);
      if (sec !== TM.lastTick) { TM.lastTick = sec; if (s.sndOn && sec <= 10 && sec > 0) snd("tick"); }
      if (rem <= 0) return finish();
    }
    if (s.run && TM.shared && !TM.view && inRoom() && Date.now() - TM.lastSync > 5000) { TM.lastSync = Date.now(); bc("sync"); }
    renderStage();
  }
  function finish() {
    const s = TM.s; s.el = s.dur; s.run = false; TM.done = true;
    if (s.sndOn) snd(s.snd); burst(2200); try { navigator.vibrate && navigator.vibrate([200, 100, 200, 100, 400]); } catch (e) {}
    renderStage(); if (!TM.view) bc("sync");
  }

  /* ---------- مزامنة داخل الفصل (المعلم يتحكم والطلاب يشاهدون) ---------- */
  const snap = ev => ({ ev, dur: TM.s.dur, el: elapsed(), run: TM.s.run, up: TM.s.up, skin: TM.s.skin, col: TM.s.col, snd: TM.s.snd, sndOn: TM.s.sndOn, label: TM.s.label, done: TM.done });
  function bc(ev) { try { if (inRoom() && rmIsHost()) { TM.shared = true; rmSend("tm300", { st: ev === "close" ? null : snap(ev) }); } } catch (e) {} }
  function recv(p) {
    const host = p.role === "host" || p.role === "owner"; if (!host) return;
    const st = p.st;
    if (!st) { if (TM.view) closeT(true); return; }
    if (st.ev !== "sync") TM.dismissed = false;
    if (TM.dismissed) return;
    const s = TM.s; Object.assign(s, { dur: st.dur, el: st.el, t0: Date.now(), run: !!st.run, up: !!st.up, skin: st.skin, col: st.col, snd: st.snd, sndOn: st.sndOn, label: st.label || "" });
    const wasDone = TM.done; TM.done = !!st.done && !s.run;
    TM.view = true; TM.shared = true; if (!TM.open) openT(); else { build(); }
    if (st.ev === "start") { ac(); }
    if (TM.done && !wasDone && s.sndOn) { /* الطالب يسمع النهاية من الفحص المحلي أو من هنا */ }
  }

  /* ---------- الواجهة ---------- */
  function css() {
    if (D.getElementById("css300")) return;
    const st = D.createElement("style"); st.id = "css300"; st.textContent = `
.tm300{position:fixed;z-index:5600;display:flex;flex-direction:column;width:calc(340px * var(--tz,1));max-width:96vw;background:rgba(15,23,42,.97);color:#f1f5f9;border:1px solid #334155;border-radius:22px;box-shadow:0 24px 70px rgba(0,0,0,.55);font-family:Tajawal,system-ui,sans-serif;direction:rtl;user-select:none;-webkit-user-select:none;overflow:hidden}
html[lang=en] .tm300{direction:ltr}
.tm300 .th{display:flex;align-items:center;gap:.4rem;padding:.5rem .7rem;cursor:grab;background:rgba(30,41,59,.9);font-weight:800;font-size:.92rem;touch-action:none}
.tm300 .th .sp{flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-weight:600;opacity:.85;font-size:.82rem}
.tm300 button{font:inherit;cursor:pointer;color:inherit}
.tm300 .th button{background:none;border:0;border-radius:8px;width:30px;height:30px;font-size:1rem}.tm300 .th button:hover{background:#334155}
.tm300 .tst{flex:0 0 auto;display:flex;align-items:center;justify-content:center;min-height:240px;padding:.6rem .6rem 0}
.tm300 .tsv{width:100%;max-height:260px;display:block}
.tm300 .tbig{font:900 46px Tajawal,system-ui,sans-serif;fill:#fff;font-variant-numeric:tabular-nums}
.tm300 .ttx{text-align:center;font:900 2.6rem Tajawal,system-ui,sans-serif;font-variant-numeric:tabular-nums;letter-spacing:.04em;padding:.1rem 0 .3rem}
.tm300 .tdg{font:900 3.5rem 'Courier New',monospace;font-variant-numeric:tabular-nums;letter-spacing:.02em;white-space:nowrap;text-align:center;padding:1rem 0 .4rem;width:100%}
.tm300 .tdb{height:12px;background:#1e293b;border-radius:8px;overflow:hidden;width:86%;margin:0 auto .8rem}.tm300 .tdb i{display:block;height:100%;border-radius:8px;transition:width .15s linear}
.tm300 .tfall{animation:tm300fall .5s linear infinite}@keyframes tm300fall{to{stroke-dashoffset:-9}}
.tm300 .tfl{animation:tm300fl .35s ease-in-out infinite alternate;transform-box:fill-box;transform-origin:50% 100%}@keyframes tm300fl{from{transform:scale(1,1)}to{transform:scale(.88,1.12)}}
.tm300 .trk{position:relative;width:100%;height:250px;background:linear-gradient(#0f172a,#1e1b4b);border-radius:16px;overflow:hidden}
.tm300 .trk i{position:absolute;font-style:normal;opacity:.8;animation:tm300tw 2s ease-in-out infinite alternate}.tm300 .st1{top:14%;inset-inline-start:14%}.tm300 .st2{top:34%;inset-inline-end:16%;animation-delay:.6s}.tm300 .st3{top:56%;inset-inline-start:30%;animation-delay:1.1s}@keyframes tm300tw{to{opacity:.2}}
.tm300 .trm{position:absolute;top:3%;left:50%;transform:translateX(-50%);font-size:2.2rem}
.tm300 .trr{position:absolute;left:50%;transform:translateX(-50%);font-size:3rem;transition:bottom .2s linear}.tm300 .trr.fly{animation:tm300sh .25s linear infinite alternate}@keyframes tm300sh{from{margin-left:-2px}to{margin-left:2px}}
.tm300 .trc{width:100%;padding:1.2rem .4rem}.tm300 .trl{position:relative;height:80px}.tm300 .trt{position:absolute;top:8px;font-size:3rem;transition:left .2s linear}.tm300 .trf{position:absolute;right:0;top:8px;font-size:3rem}.tm300 .trg{height:14px;border-radius:8px;background:repeating-linear-gradient(90deg,#16a34a 0 18px,#15803d 18px 36px)}
.tm300 .tbl{width:100%;height:240px;display:flex;align-items:center;justify-content:center}.tm300 .tbs{font-size:6rem;transition:transform .2s linear;transform-origin:50% 60%}
.tm300 .tpl{width:100%;height:240px;position:relative;display:flex;align-items:flex-end;justify-content:center}.tm300 .tps{line-height:1;margin-bottom:22px;transition:font-size .3s}.tm300 .tpg{position:absolute;bottom:0;left:6%;right:6%;height:26px;border-radius:50%;background:#78350f}.tm300 .tpw{position:absolute;top:10px;inset-inline-end:14%;font-size:2rem}
.tm300 .tic{width:100%;height:240px;position:relative;display:flex;align-items:flex-end;justify-content:center}.tm300 .tcc{font-size:9rem;line-height:1;margin-bottom:16px;transform-origin:50% 100%}.tm300 .tcd{position:absolute;bottom:34px;inset-inline-end:34%;font-size:1.6rem;animation:tm300dr 1s linear infinite}@keyframes tm300dr{from{transform:translateY(-30px);opacity:1}to{transform:translateY(24px);opacity:0}}.tm300 .tcp{position:absolute;bottom:4px;width:70%;height:20px;border-radius:50%;background:rgba(251,207,232,.55)}
.tm300 .tc{display:flex;gap:.4rem;justify-content:center;flex-wrap:wrap;padding:.3rem .7rem .7rem}
.tm300 .tc button{background:#1e293b;border:1px solid #334155;border-radius:999px;padding:.4rem .9rem;font-weight:700;font-size:.88rem}.tm300 .tc button:hover{background:#334155}
.tm300 .tc button.go{background:var(--tc,#10b981);border-color:transparent;color:#fff;padding:.45rem 1.3rem;font-size:.95rem}
.tm300 .tp{border-top:1px solid #334155;padding:.7rem;display:grid;gap:.6rem;flex:1 1 auto;min-height:0;overflow:auto;background:rgba(2,6,23,.55);user-select:text;-webkit-user-select:text}
.tm300 .tp .rw{display:flex;flex-wrap:wrap;gap:.3rem;align-items:center}.tm300 .tp label.lb{font-size:.78rem;font-weight:800;min-width:100%;opacity:.8}
.tm300 .tp .ch{background:#1e293b;border:1px solid #334155;border-radius:999px;padding:.25rem .7rem;font-size:.82rem}.tm300 .tp .ch.on{background:var(--tc,#10b981);border-color:transparent;color:#fff}
.tm300 .tp .sk{display:flex;flex-direction:column;align-items:center;gap:.1rem;width:72px;padding:.35rem .2rem;background:#1e293b;border:2px solid #334155;border-radius:12px;font-size:.7rem}.tm300 .tp .sk b{font-size:1.5rem;line-height:1.1}.tm300 .tp .sk.on{border-color:var(--tc,#10b981);background:#0f172a}
.tm300 .tp .cl{width:26px;height:26px;border-radius:50%;border:3px solid transparent;padding:0}.tm300 .tp .cl.on{border-color:#fff}
.tm300 .tp input[type=number]{width:4.2rem;background:#0f172a;color:#fff;border:1px solid #475569;border-radius:8px;padding:.3rem;text-align:center}
.tm300 .tp input[type=text]{flex:1;min-width:8rem;background:#0f172a;color:#fff;border:1px solid #475569;border-radius:8px;padding:.35rem .5rem}
.tm300 .tp input[type=range]{flex:1}
.tm300.warn{animation:tm300w .5s ease-in-out infinite alternate;border-color:#ef4444}@keyframes tm300w{to{box-shadow:0 0 0 6px rgba(239,68,68,.45),0 24px 70px rgba(0,0,0,.55)}}
.tm300.warn .ttx,.tm300.warn .tbig,.tm300.warn .tdg{color:#fca5a5!important;fill:#fca5a5}
.tm300.done{animation:tm300d .6s ease-in-out 3}@keyframes tm300d{25%{transform:translateX(-6px) rotate(-1deg)}75%{transform:translateX(6px) rotate(1deg)}}
.tm300.done .ttx{color:#fde68a!important}
.tm300.big{inset:0!important;width:auto;max-width:none;border-radius:0;display:flex;flex-direction:column;--tz:1}
.tm300.big .tst{flex:1;min-height:0}.tm300.big .tsv{max-height:62vh;height:100%}.tm300.big .ttx{font-size:min(14vw,9rem)}.tm300.big .tdg{font-size:min(20vw,13rem)}
.tm300.big .trk,.tm300.big .tbl,.tm300.big .tpl,.tm300.big .tic{height:min(60vh,520px)}.tm300.big .tbs{font-size:min(30vw,16rem)}.tm300.big .tcc{font-size:min(36vw,22rem)}
@media (max-width:520px){.tm300{width:94vw}}
.tm300t .i288{font-size:2rem}`;
    D.head.appendChild(st);
  }

  function setsHtml() {
    const s = TM.s, ctl = canCtl();
    return `<div class="rw"><label class="lb">${T("المدة", "Duration")}</label>${PRE.map(([v, a, e]) => `<button class="ch ${s.dur === v * 1000 ? "on" : ""}" data-a="pre" data-v="${v}">${T(a, e)}</button>`).join("")}</div>
    <div class="rw"><input type="number" id="tmM" min="0" max="180" value="${Math.floor(s.dur / 60000)}"><b>:</b><input type="number" id="tmS" min="0" max="59" value="${Math.floor(s.dur / 1000) % 60}"><button class="ch on" data-a="cust">${T("اضبط", "Set")}</button><button class="ch ${s.up ? "on" : ""}" data-a="up">${s.up ? T("تصاعدي (ساعة إيقاف)", "Count up (stopwatch)") : T("تنازلي", "Countdown")}</button></div>
    <div class="rw"><label class="lb">${T("الشكل", "Style")}</label>${SKINS.map(([k, ic, a, e]) => `<button class="sk ${s.skin === k ? "on" : ""}" data-a="skin" data-v="${k}"><b>${ic}</b>${T(a, e)}</button>`).join("")}</div>
    <div class="rw"><label class="lb">${T("اللون", "Colour")}</label>${COLS.map(c => `<button class="cl ${s.col === c ? "on" : ""}" style="background:${c}" data-a="col" data-v="${c}" aria-label="${c}"></button>`).join("")}</div>
    <div class="rw"><label class="lb">${T("صوت النهاية", "End sound")}</label><button class="ch ${s.sndOn ? "on" : ""}" data-a="sndon">${s.sndOn ? "🔊 " + T("مفعّل", "On") : "🔇 " + T("مكتوم", "Off")}</button>${SNDS.map(([k, ic, a, e]) => `<button class="ch ${s.snd === k ? "on" : ""}" data-a="snd" data-v="${k}">${ic} ${T(a, e)}</button>`).join("")}<button class="ch" data-a="test">▶ ${T("جرّب", "Test")}</button></div>
    <div class="rw"><label class="lb">${T("عنوان المهمة (يظهر للطالب)", "Task title (shown to the student)")}</label><input type="text" id="tmL" maxlength="60" value="${E(s.label)}" placeholder="${T("مثال: حل السؤال ٣ في دقيقتين", "e.g. Solve question 3")}"></div>
    <div class="rw"><label class="lb">${T("حجم النافذة", "Window size")}</label><input type="range" id="tmZ" min="70" max="190" step="5" value="${s.size}"><span>${s.size}%</span></div>
    ${ctl ? "" : `<div style="font-size:.78rem;opacity:.7">${T("المعلم هو من يتحكم في المؤقت.", "The teacher controls the timer.")}</div>`}`;
  }

  const fit = () => { const r = TM.el; if (!r || TM.big) { if (r) r.style.maxHeight = ""; return; } r.style.maxHeight = Math.max(260, innerHeight - (parseFloat(r.style.top) || 0) - 8) + "px"; };
  function build() {
    css(); const s = TM.s; let root = TM.el;
    if (!root) { root = TM.el = D.createElement("div"); root.id = "tm300"; root.className = "tm300"; D.body.appendChild(root);
      root.addEventListener("click", onClick); root.addEventListener("input", onInput); root.addEventListener("change", onInput);
      initDrag(root);
    }
    root.style.setProperty("--tz", String(s.size / 100)); root.style.setProperty("--tc", s.col); root.classList.toggle("big", TM.big);
    if (!TM.big) { const W = Math.min(innerWidth, 340 * s.size / 100), x = P0.x != null ? Math.min(Math.max(0, P0.x), Math.max(0, innerWidth - W)) : null, y = P0.y != null ? Math.min(Math.max(0, P0.y), Math.max(0, innerHeight - 120)) : null; if (x != null) { root.style.left = x + "px"; root.style.right = "auto"; } else { root.style.left = "auto"; root.style.right = "1rem"; } root.style.top = (y != null ? y : 76) + "px"; }
    const ctl = canCtl();
    root.innerHTML = `<div class="th" data-drag="1"><span>⏱️</span><b>${T("المؤقت", "Timer")}</b><span class="sp">${E(s.label)}</span><button data-a="set" title="${T("الإعدادات", "Settings")}">⚙️</button><button data-a="big" title="${T("ملء الشاشة", "Fullscreen")}">${TM.big ? "🗗" : "⛶"}</button><button data-a="x" title="${T("إغلاق", "Close")}">✕</button></div>
    <div class="tst"></div><div class="ttx"></div>
    ${ctl ? `<div class="tc"><button data-a="m30">${T("−٣٠ث", "−30s")}</button><button class="go" data-a="go"></button><button data-a="rst">↺ ${T("إعادة", "Reset")}</button><button data-a="p30">${T("+٣٠ث", "+30s")}</button></div>` : `<div class="tc" style="opacity:.8;font-size:.85rem">${E(s.label) || T("المؤقت من المعلم", "Timer from the teacher")}</div>`}
    ${TM.set ? `<div class="tp" id="tmP">${setsHtml()}</div>` : ""}`;
    TM.last = ""; fit(); renderStage();
  }

  function initDrag(root) {
    let d = null;
    root.addEventListener("pointerdown", e => { const h = e.target.closest(".th"); if (!h || e.target.closest("button") || TM.big) return; const r = root.getBoundingClientRect(); d = { dx: e.clientX - r.left, dy: e.clientY - r.top }; try { h.setPointerCapture(e.pointerId); } catch (x) {} e.preventDefault(); });
    root.addEventListener("pointermove", e => { if (!d) return; const x = Math.min(Math.max(0, e.clientX - d.dx), innerWidth - 80), y = Math.min(Math.max(0, e.clientY - d.dy), innerHeight - 60); root.style.left = x + "px"; root.style.right = "auto"; root.style.top = y + "px"; P0.x = x; P0.y = y; fit(); });
    const up = () => { if (d) { d = null; savePrefs(); } };
    root.addEventListener("pointerup", up); root.addEventListener("pointercancel", up);
  }

  function set(k, v, send) { TM.s[k] = v; savePrefs(); TM.last = ""; if (send !== false) bc("sync"); }
  function setDur(sec) { const s = TM.s; s.dur = Math.max(5000, Math.round(sec * 1000)); s.el = 0; s.run = false; TM.done = false; TM.lastTick = -1; savePrefs(); }
  function onClick(e) {
    const t = e.target.closest("[data-a]"); if (!t || !TM.el) return; const a = t.dataset.a, v = t.dataset.v, s = TM.s;
    if (a === "x") return closeT(false);
    if (a === "set") { TM.set = !TM.set; return build(); }
    if (a === "big") { TM.big = !TM.big; return build(); }
    if (!canCtl()) return;
    ac();
    if (a === "go") { if (s.run) { s.el = elapsed(); s.run = false; bc("sync"); } else { if (TM.done || (!s.up && elapsed() >= s.dur)) { s.el = 0; TM.done = false; } s.t0 = Date.now(); s.run = true; TM.lastTick = -1; bc("start"); } renderStage(); }
    else if (a === "rst") { s.el = 0; s.run = false; TM.done = false; TM.lastTick = -1; bc("sync"); renderStage(); }
    else if (a === "p30" || a === "m30") { const d = a === "p30" ? 30000 : -30000; if (s.up) { s.el = Math.max(0, elapsed() + d); if (s.run) s.t0 = Date.now(); } else { s.dur = Math.max(5000, s.dur + d); TM.done = false; } savePrefs(); bc("sync"); renderStage(); }
    else if (a === "pre") { setDur(+v); bc("sync"); build(); }
    else if (a === "cust") { const m = Math.max(0, +D.getElementById("tmM").value || 0), sec = Math.max(0, Math.min(59, +D.getElementById("tmS").value || 0)); setDur(Math.max(5, m * 60 + sec)); bc("sync"); build(); }
    else if (a === "up") { s.up = !s.up; s.el = 0; s.run = false; TM.done = false; savePrefs(); bc("sync"); build(); }
    else if (a === "skin") { set("skin", v); build(); }
    else if (a === "col") { set("col", v); build(); }
    else if (a === "sndon") { set("sndOn", !s.sndOn); build(); }
    else if (a === "snd") { set("snd", v); snd(v); build(); }
    else if (a === "test") snd(s.snd);
  }
  function onInput(e) {
    const t = e.target; if (!canCtl()) return;
    if (t.id === "tmL") { TM.s.label = t.value; const sp = TM.el.querySelector(".th .sp"); if (sp) sp.textContent = t.value; clearTimeout(onInput.tm); onInput.tm = setTimeout(() => bc("sync"), 400); }
    else if (t.id === "tmZ") { TM.s.size = +t.value; TM.el.style.setProperty("--tz", String(TM.s.size / 100)); if (t.nextElementSibling) t.nextElementSibling.textContent = t.value + "%"; savePrefs(); }
  }

  function openT() {
    if (!FF("v300.timer")) return;
    TM.open = true; TM.dismissed = false; build();
    clearInterval(TM.iv); TM.iv = setInterval(() => { try { tick(); } catch (e) { console.warn("v300", e); } }, 100);
    try { if (typeof rmRenderBar === "function" && inRoom()) rmRenderBar(); } catch (e) {}
  }
  function closeT(fromRemote) {
    if (!TM.open) return;
    if (TM.view && !fromRemote) TM.dismissed = true;
    if (!TM.view) bc("close");
    TM.open = false; TM.set = false; TM.big = false; clearInterval(TM.iv); TM.iv = 0;
    if (TM.el) { TM.el.remove(); TM.el = null; }
    if (fromRemote || !inRoom()) { TM.view = false; TM.shared = false; }
    if (!TM.s.run) { /* يبقى الوقت المتبقي محفوظًا */ }
    try { if (typeof rmRenderBar === "function" && inRoom()) rmRenderBar(); } catch (e) {}
  }
  window.tm300 = { open() { if (!TM.open) { if (!inRoom()) { TM.view = false; TM.shared = false; } else if (rmIsHost()) { TM.view = false; TM.shared = true; } openT(); if (!TM.view) bc("open"); } else build(); }, close() { closeT(false); }, toggle() { TM.open ? closeT(false) : window.tm300.open(); }, state: TM, watch() { watchRails(); } };

  /* ---------- زر المؤقت: الشريط الشمال (جنب السبورة) + شريط الفصل ---------- */
  function injectRail() {
    if (!FF("v300.timer")) return;
    D.querySelectorAll(".rail288").forEach(rail => {
      if (rail.querySelector(".tm300t")) return;
      const wb = [...rail.querySelectorAll(".t288")].find(a => /السبورة|Whiteboard/i.test(a.getAttribute("title") || ""));
      if (!wb) return;
      wb.insertAdjacentHTML("afterend", `<a class="t288 tm300t" href="#" onclick="event.preventDefault();tm300.toggle()" title="${E(T("المؤقت", "Timer"))}"><span class="i288">⏱️</span><b>${E(T("المؤقت", "Timer"))}</b></a>`);
    });
  }
  let railMo = new Set();
  function watchRails() { D.querySelectorAll(".rail288").forEach(r => { if (railMo.has(r)) return; railMo.add(r); new MutationObserver(() => { clearTimeout(watchRails.t); watchRails.t = setTimeout(injectRail, 30); }).observe(r, { childList: true }); }); injectRail(); }
  if (typeof render === "function") { const _r = render; render = function () { const o = _r.apply(this, arguments); try { setTimeout(watchRails, 700); setTimeout(watchRails, 1800); } catch (e) {} return o; }; }
  setTimeout(watchRails, 900); setTimeout(watchRails, 2500);
  addEventListener("resize", () => { if (TM.open && !TM.big && TM.el) { fit(); const r = TM.el.getBoundingClientRect(); if (r.right > innerWidth) TM.el.style.left = Math.max(0, innerWidth - r.width) + "px"; } });

  if (typeof rmRenderBar === "function") {
    const _rb = rmRenderBar;
    rmRenderBar = function () { _rb.apply(this, arguments); try { const w = D.getElementById("rbWb"); if (!w || D.getElementById("rbTm") || !FF("v300.timer")) return; if (!rmIsHost() && !TM.open) return; w.insertAdjacentHTML("afterend", `<button class="rm-btn ${TM.open ? "on" : ""}" id="rbTm" onclick="tm300.toggle()" title="${E(T("المؤقت", "Timer"))}"><i class="fa-solid fa-stopwatch"></i><span>${E(T("المؤقت", "Timer"))}</span></button>`); } catch (e) {} };
  }
  if (typeof rmOnEv === "function") { const _ev = rmOnEv; rmOnEv = function (p) { if (p && p.type === "tm300" && inRoom() && p.from !== RM.pid) { try { recv(p); } catch (e) { console.warn("v300", e); } return; } return _ev.apply(this, arguments); }; }
  if (typeof roomTeardown === "function") { const _td = roomTeardown; roomTeardown = function () { try { if (TM.open && (TM.view || TM.shared)) { TM.view = false; closeT(true); } } catch (e) {} try { const g = D.getElementById("rmGame"); if (g) g.remove(); } catch (e) {} try { arcStop(); } catch (e) {} return _td.apply(this, arguments); }; }

  /* ======================================================================
     2) الألعاب 🎮
     ====================================================================== */
  const AV = ["🐱", "🐶", "🐰", "🦁", "🐼", "🦊", "🐸", "🐯", "🐵", "🦄", "🐢", "🐧", "🐨", "🦉", "🐙", "🦋"];
  const av = pid => AV[[...String(pid || "")].reduce((s, c) => s + c.charCodeAt(0), 0) % AV.length];
  const myName = () => { try { return RM.myName || T("أنا", "Me"); } catch (e) { return "—"; } };
  const hostNow = () => { try { return rmIsHost(); } catch (e) { return true; } };

  /* أنواع الألعاب: [المفتاح، أيقونة، عربي، إنجليزي، فئة، للمعلم فقط] */
  const GAMES = [
    ["q_letter", "🍎", "أي حرف؟", "Which letter?", "kid", 1], ["q_count", "🔢", "عدّ وطابق", "Count & match", "kid", 1], ["q_odd", "🔍", "اعثر على المختلف", "Spot the odd one", "kid", 1],
    ["a_whack", "🐹", "اضرب الحيوان", "Whack-a-critter", "kid", 1], ["a_balloon", "🎈", "فرقع البالونات", "Pop the balloons", "kid", 1], ["a_simon", "🌈", "ذاكرة الألوان", "Colour memory", "kid", 1], ["rps", "✊", "حجر ورقة مقص", "Rock paper scissors", "kid", 1],
    ["q_color", "🎨", "لون الحبر", "Ink colour", "big", 1], ["q_math", "➕", "حساب سريع", "Quick maths", "big", 1], ["q_word", "🔤", "كلمة مبعثرة", "Word scramble", "big", 1], ["q_sj", "📚", "سين وجيم", "Q & A", "big", 1], ["c4", "🔴", "أربعة في صف", "Connect four", "big", 0]
  ];
  const GK = {}; GAMES.forEach(g => GK[g[0]] = g);
  const gTitle = k => { const g = GK[k]; return g ? g[1] + " " + T(g[2], g[3]) : ""; };
  const gSend2 = () => { try { gSend(); } catch (e) { try { gameBroadcast(); gameRender(); } catch (x) {} } };

  /* ---------- بنوك الأسئلة (محتوى مراجَع) ---------- */
  const LET = [["🍎", "تفاحة", "ت"], ["🍌", "موزة", "م"], ["🍇", "عنب", "ع"], ["🍊", "برتقالة", "ب"], ["🍉", "بطيخة", "ب"], ["🍓", "فراولة", "ف"], ["🥕", "جزرة", "ج"], ["🍅", "طماطم", "ط"], ["🥒", "خيار", "خ"], ["🌽", "ذرة", "ذ"], ["🥚", "بيضة", "ب"], ["🍞", "خبز", "خ"], ["🥛", "حليب", "ح"], ["🍯", "عسل", "ع"],
    ["🐱", "قطة", "ق"], ["🐶", "كلب", "ك"], ["🐰", "أرنب", "أ"], ["🦁", "أسد", "أ"], ["🐘", "فيل", "ف"], ["🐪", "جمل", "ج"], ["🐴", "حصان", "ح"], ["🐮", "بقرة", "ب"], ["🐑", "خروف", "خ"], ["🐓", "ديك", "د"], ["🐟", "سمكة", "س"], ["🐢", "سلحفاة", "س"], ["🐸", "ضفدع", "ض"], ["🦋", "فراشة", "ف"], ["🐝", "نحلة", "ن"], ["🐍", "ثعبان", "ث"], ["🦊", "ثعلب", "ث"], ["🐻", "دب", "د"], ["🐒", "قرد", "ق"],
    ["🌙", "قمر", "ق"], ["☀️", "شمس", "ش"], ["⭐", "نجمة", "ن"], ["🌹", "وردة", "و"], ["🌳", "شجرة", "ش"], ["🏠", "بيت", "ب"], ["🚗", "سيارة", "س"], ["✈️", "طائرة", "ط"], ["🚲", "دراجة", "د"], ["⚽", "كرة", "ك"], ["📖", "كتاب", "ك"], ["✏️", "قلم", "ق"], ["🔑", "مفتاح", "م"], ["🕌", "مسجد", "م"], ["🕋", "كعبة", "ك"], ["⏰", "ساعة", "س"], ["🥁", "طبل", "ط"], ["🎈", "بالون", "ب"]];
  const LETTERS = "ابتثجحخدذرزسشصضطظعغفقكلمنهوي".split("");
  const WORDS = [["🦁", "أسد"], ["🌙", "قمر"], ["📖", "كتاب"], ["🕌", "مسجد"], ["⭐", "نجمة"], ["☀️", "شمس"], ["🐟", "سمكة"], ["🐴", "حصان"], ["🏠", "بيت"], ["🌹", "وردة"], ["✈️", "طائرة"], ["🚗", "سيارة"], ["🍎", "تفاحة"], ["🍌", "موزة"], ["🍇", "عنب"], ["🐪", "جمل"], ["🐘", "فيل"], ["🐱", "قطة"], ["🐶", "كلب"], ["⏰", "ساعة"], ["🔑", "مفتاح"], ["⚽", "كرة"], ["🌳", "شجرة"], ["🕋", "كعبة"], ["✏️", "قلم"], ["🚲", "دراجة"]];
  const ODD = [["🐶", "🐺"], ["🍎", "🍅"], ["😀", "😃"], ["🐱", "🐯"], ["🍊", "🍑"], ["🔴", "🟠"], ["🐻", "🐨"], ["🍓", "🍒"], ["🌸", "🌺"], ["⭐", "🌟"], ["🐸", "🐢"], ["🔵", "🟣"], ["🐰", "🐭"], ["🍋", "🍌"], ["🟢", "🟩"]];
  const CNT = ["🍎", "⭐", "🐟", "🎈", "🚗", "🌹", "🐥", "🍪", "⚽", "🦋"];
  const COLORS = [["أحمر", "#ef4444"], ["أزرق", "#3b82f6"], ["أخضر", "#22c55e"], ["أصفر", "#eab308"], ["بنفسجي", "#a855f7"], ["برتقالي", "#f97316"]];
  const COLORS_EN = { "أحمر": "Red", "أزرق": "Blue", "أخضر": "Green", "أصفر": "Yellow", "بنفسجي": "Purple", "برتقالي": "Orange" };
  const SJ = {
    quran: ["📖 القرآن", [["كم عدد سور القرآن الكريم؟", "١١٤", ["١١٠", "١٢٠", "١٠٠"]], ["ما أطول سورة في القرآن الكريم؟", "البقرة", ["آل عمران", "النساء", "المائدة"]], ["ما أقصر سورة في القرآن الكريم؟", "الكوثر", ["الإخلاص", "العصر", "النصر"]], ["أي سورة لا تبدأ بالبسملة؟", "التوبة", ["الفاتحة", "الأنفال", "يونس"]], ["كم عدد أجزاء القرآن الكريم؟", "٣٠", ["٢٠", "٤٠", "٢٥"]], ["ما أول سورة في ترتيب المصحف؟", "الفاتحة", ["البقرة", "الإخلاص", "الناس"]], ["ما آخر سورة في ترتيب المصحف؟", "الناس", ["الفلق", "الإخلاص", "المسد"]], ["نزلت أولى آيات القرآن على النبي ﷺ من سورة…", "العلق", ["الفاتحة", "المدثر", "البقرة"]], ["في أي سورة آية الكرسي؟", "البقرة", ["آل عمران", "النساء", "الأنعام"]], ["كم عدد آيات سورة الفاتحة؟", "٧", ["٥", "٦", "٨"]], ["كم عدد آيات سورة الإخلاص؟", "٤", ["٣", "٥", "٦"]], ["جاء في الحديث الصحيح أن سورة… تعدل ثلث القرآن", "الإخلاص", ["الفاتحة", "الكوثر", "الناس"]], ["ما السورة التي سُمّيت باسم حشرة تصنع العسل؟", "النحل", ["النمل", "العنكبوت", "الفيل"]]]],
    seerah: ["🕌 السيرة والأنبياء", [["أين وُلد النبي محمد ﷺ؟", "مكة المكرمة", ["المدينة المنورة", "الطائف", "القدس"]], ["إلى أي مدينة هاجر النبي ﷺ؟", "المدينة المنورة", ["الطائف", "جدة", "القدس"]], ["من أول مؤذن في الإسلام؟", "بلال بن رباح", ["أبو بكر", "عمر بن الخطاب", "علي بن أبي طالب"]], ["من النبي الذي ابتلعه الحوت؟", "يونس", ["نوح", "موسى", "عيسى"]], ["من النبي الذي رفع قواعد الكعبة مع ابنه إسماعيل؟", "إبراهيم", ["نوح", "موسى", "يوسف"]], ["من النبي الذي كلّمه الله تكليمًا؟", "موسى", ["عيسى", "داود", "يحيى"]], ["من أول الأنبياء؟", "آدم", ["نوح", "إبراهيم", "إدريس"]], ["من خاتم الأنبياء والمرسلين؟", "محمد ﷺ", ["عيسى", "موسى", "إبراهيم"]], ["ما اسم الغار الذي نزل فيه الوحي أول مرة؟", "غار حراء", ["غار ثور", "غار أحد", "غار بدر"]], ["من النبي الذي سُخّرت له الريح وفهم منطق الطير؟", "سليمان", ["داود", "يوسف", "هود"]], ["ما الكتاب الذي أُنزل على عيسى عليه السلام؟", "الإنجيل", ["التوراة", "الزبور", "القرآن"]], ["ما الكتاب الذي أُنزل على داود عليه السلام؟", "الزبور", ["الإنجيل", "التوراة", "الصحف"]], ["كم عدد الأنبياء المذكورين بأسمائهم في القرآن الكريم؟", "٢٥", ["١٢", "٤٠", "١٠٠"]], ["من صاحب النبي ﷺ في رحلة الهجرة؟", "أبو بكر الصديق", ["عمر بن الخطاب", "عثمان بن عفان", "بلال بن رباح"]], ["ما اسم أم النبي ﷺ؟", "آمنة بنت وهب", ["خديجة بنت خويلد", "فاطمة الزهراء", "عائشة"]]]],
    ibadat: ["🧎 العبادات", [["كم عدد أركان الإسلام؟", "٥", ["٤", "٦", "٧"]], ["كم عدد أركان الإيمان؟", "٦", ["٥", "٤", "٧"]], ["كم ركعة في صلاة الفجر؟", "٢", ["٣", "٤", "١"]], ["كم ركعة في صلاة المغرب؟", "٣", ["٢", "٤", "٥"]], ["كم ركعة في فرض العشاء؟", "٤", ["٢", "٣", "٦"]], ["في أي شهر يصوم المسلمون الصيام المفروض؟", "رمضان", ["شعبان", "محرم", "ذو الحجة"]], ["إلى أي جهة يتجه المسلم في صلاته؟", "الكعبة المشرفة", ["المسجد الأقصى", "المسجد النبوي", "جبل عرفة"]], ["أي صلاة لا ركوع فيها ولا سجود؟", "صلاة الجنازة", ["صلاة الفجر", "صلاة الجمعة", "صلاة العيد"]], ["في أي مدينة تُؤدّى مناسك الحج؟", "مكة المكرمة", ["المدينة المنورة", "القدس", "جدة"]], ["كم شوطًا في الطواف الواحد حول الكعبة؟", "٧", ["٥", "٣", "١٠"]]]],
    tajweed: ["🎙️ التجويد", [["كم عدد أحكام النون الساكنة والتنوين؟", "٤", ["٣", "٥", "٦"]], ["ما حكم النون الساكنة إذا جاء بعدها حرف الباء؟", "الإقلاب", ["الإظهار", "الإدغام", "الإخفاء"]], ["كم عدد حروف الإظهار الحلقي؟", "٦", ["٤", "٥", "٧"]], ["حروف القلقلة تجمعها عبارة…", "قطب جد", ["يرملون", "خص ضغط قظ", "سكت"]], ["حروف الإدغام تجمعها كلمة…", "يرملون", ["قطب جد", "خص ضغط قظ", "أبجد"]], ["كم حركة يُمدّ المدّ الطبيعي؟", "حركتان", ["حركة واحدة", "أربع حركات", "ست حركات"]], ["كم عدد حروف الإخفاء؟", "١٥", ["١٠", "٦", "٢٠"]], ["ما حكم الميم الساكنة إذا جاء بعدها حرف الباء؟", "إخفاء شفوي", ["إدغام شفوي", "إظهار شفوي", "إقلاب"]], ["من أي عضو يخرج صوت الغنّة؟", "الخيشوم", ["الحلق", "الشفتان", "اللسان"]]]],
    arabic: ["✍️ العربية", [["كم عدد حروف الهجاء العربية؟", "٢٨", ["٢٦", "٣٠", "٢٤"]], ["ما جمع كلمة «كتاب»؟", "كُتُب", ["كتابات", "أكتاب", "كتابون"]], ["ما ضد كلمة «كبير»؟", "صغير", ["طويل", "قصير", "عظيم"]], ["ما مثنى كلمة «طالب»؟", "طالبان", ["طلاب", "طالبون", "طالبات"]], ["ما نوع الكلمة «مدرسة»؟", "اسم", ["فعل", "حرف", "ضمير"]], ["ما نوع الكلمة «في»؟", "حرف", ["اسم", "فعل", "صفة"]], ["ما مؤنث كلمة «معلّم»؟", "معلّمة", ["معلّمات", "معلّمان", "علّامة"]], ["ما مفرد كلمة «أقلام»؟", "قلم", ["قلمة", "قالم", "تقليم"]], ["ما الفعل في جملة «يقرأ الطالب الدرس»؟", "يقرأ", ["الطالب", "الدرس", "لا يوجد"]], ["ما جمع كلمة «ولد»؟", "أولاد", ["ولدون", "ولدات", "وُلَدة"]]]]
  };

  /* ---------- مولّدات الأسئلة ---------- */
  function mkQ(g) {
    const k = g.kind, lvl = g.lvl || 1;
    if (k === "q_letter") {
      const w = pick(LET), set = new Set([w[2]]); while (set.size < 4) set.add(pick(LETTERS)); const opts = shuffle([...set]);
      return { big: w[0], t: T("بأي حرف تبدأ هذه الكلمة؟", "Which letter does this word start with?"), opts, c: opts.indexOf(w[2]), fb: w[1] };
    }
    if (k === "q_count") {
      const mx = lvl === 1 ? 5 : lvl === 2 ? 10 : 20, n = 1 + rnd(mx), em = pick(CNT), set = new Set([n]); while (set.size < 4) { const d = Math.max(1, n + rnd(7) - 3); if (d <= mx + 2) set.add(d); }
      const opts = shuffle([...set]).map(String); return { cnt: n, em, t: T("عدّ الأشكال، ثم اختر الرقم الصحيح", "Count them, then pick the right number"), opts, c: opts.indexOf(String(n)), fb: String(n) };
    }
    if (k === "q_odd") {
      const n = lvl === 1 ? 3 : lvl === 2 ? 4 : 5, pr = pick(ODD), flip = rnd(2), A = pr[flip], B = pr[1 - flip], o = rnd(n * n);
      return { grid: Array.from({ length: n * n }, (_, i) => i === o ? B : A), cols: n, t: T("اضغط على الشكل المختلف", "Tap the different one"), c: o, fb: "" };
    }
    if (k === "q_color") {
      const word = pick(COLORS); let ink = pick(COLORS); if (lvl > 1) while (ink[0] === word[0]) ink = pick(COLORS); else if (rnd(3)) while (ink[0] === word[0]) ink = pick(COLORS);
      const set = new Set([ink[0]]); while (set.size < 4) set.add(pick(COLORS)[0]); const opts = shuffle([...set]);
      return { word: word[0], ink: ink[1], t: T("ما لون الخط؟ (لا تقرأ الكلمة)", "What colour is the ink? (don't read the word)"), opts, c: opts.indexOf(ink[0]), fb: ink[0], swatch: true };
    }
    if (k === "q_math") {
      let a, b, op, r;
      if (lvl === 1) { op = rnd(2) ? "+" : "−"; a = 1 + rnd(9); b = 1 + rnd(9); if (op === "−" && b > a) [a, b] = [b, a]; r = op === "+" ? a + b : a - b; }
      else if (lvl === 2) { const m = rnd(3); if (m === 0) { op = "+"; a = 5 + rnd(30); b = 5 + rnd(30); r = a + b; } else if (m === 1) { op = "−"; a = 10 + rnd(40); b = 1 + rnd(a - 1); r = a - b; } else { op = "×"; a = 2 + rnd(5); b = 2 + rnd(9); r = a * b; } }
      else { const m = rnd(3); if (m === 0) { op = "×"; a = 3 + rnd(10); b = 3 + rnd(10); r = a * b; } else if (m === 1) { op = "÷"; b = 2 + rnd(10); r = 2 + rnd(11); a = b * r; } else { op = "+"; a = 20 + rnd(80); b = 20 + rnd(80); r = a + b; } }
      const set = new Set([r]); while (set.size < 4) { const d = r + rnd(11) - 5; if (d >= 0 && d !== r) set.add(d); } const opts = shuffle([...set]).map(String);
      return { math: `${a} ${op} ${b} = ؟`, t: T("احسب الناتج", "Work out the answer"), opts, c: opts.indexOf(String(r)), fb: String(r) };
    }
    if (k === "q_word") {
      const pool = WORDS.filter(w => lvl === 1 ? w[1].length <= 3 : lvl === 2 ? w[1].length === 4 : w[1].length >= 5), w = pick(pool.length ? pool : WORDS); const L = [...w[1]]; let sh = shuffle(L); for (let i = 0; i < 5 && sh.join("") === w[1]; i++) sh = shuffle(L);
      return { big: w[0], w: w[1], shuf: sh, build: true, t: T("رتّب الحروف لتكوين اسم الصورة", "Put the letters in order to name the picture"), c: 0, fb: w[1] };
    }
    if (k === "q_sj") {
      const cats = (g.cats && g.cats.length ? g.cats : Object.keys(SJ)), cat = pick(cats), it = pick(SJ[cat][1]), opts = shuffle([it[1]].concat(it[2]));
      return { cat: SJ[cat][0], t: it[0], opts, c: opts.indexOf(it[1]), fb: it[1] };
    }
    return { t: "", opts: [], c: 0 };
  }

  /* ---------- حالة اللعبة ---------- */
  function newGame(kind) {
    const base = { kind, id: Date.now().toString(36) + rnd(1e4), epoch: 0, by: RM.pid, sc: {} };
    if (kind.startsWith("q_")) { const g = Object.assign(base, { lvl: 1, round: 1, ans: {}, cats: [], t0: Date.now() }); g.q = mkQ(g); return g; }
    if (kind === "rps") return Object.assign(base, { round: 1, ans: {}, reveal: false, hc: null });
    if (kind === "c4") return Object.assign(base, { cells: Array(42).fill(0), turn: 1, win: null });
    return base; /* ألعاب الأركيد */
  }
  const mergeSc = (a, b) => { const o = Object.assign({}, a || {}); Object.keys(b || {}).forEach(k => { if (!o[k] || (b[k].s || 0) > (o[k].s || 0)) o[k] = b[k]; }); return o; };
  let _gs = null, _gr = null, _grv = null, _rm = null;
  function install() {
    if (typeof gameStart !== "function" || typeof gameRender !== "function" || typeof gameRecv !== "function") return false;
    _gs = gameStart; _gr = gameRender; _grv = gameRecv;
    gameStart = function (kind) { if (!GK[kind]) return _gs(kind); arcStop(); RM.game = newGame(kind); gameBroadcast(); gameRender(); };
    gameRender = function (prev) { const g = RM.game; if (!g || !GK[g.kind]) { arcStop(); B300.pick = null; return _gr(prev); } render3(g); };
    gameRecv = function (p) {
      const st = p && p.st, prev = RM.game;
      if (!st || !GK[st.kind]) return _grv(p);
      if (prev && prev.kind === st.kind && prev.id === st.id) {
        if ((st.epoch || 0) < (prev.epoch || 0)) return;
        if ((st.epoch || 0) === (prev.epoch || 0)) {
          st.sc = mergeSc(prev.sc, st.sc);
          if (st.kind.startsWith("q_") || st.kind === "rps") {
            if ((st.round || 0) < (prev.round || 0)) { prev.sc = st.sc; return gameRender(prev); }
            if (st.round === prev.round) { st.ans = Object.assign({}, prev.ans, st.ans); if (st.kind === "rps") { st.reveal = st.reveal || prev.reveal; if (prev.reveal && prev.hc != null) st.hc = prev.hc; } }
          }
        }
      }
      RM.game = st; gameRender(prev);
    };
    return true;
  }

  /* ---------- أدوات العرض ---------- */
  const B300 = { pick: null, rid: "" };
  function lbHtml(g) {
    const rows = Object.keys(g.sc || {}).map(k => Object.assign({ pid: k }, g.sc[k])).sort((a, b) => (b.s || 0) - (a.s || 0)).slice(0, 8);
    if (!rows.length) return `<div class="g3e">${T("لا توجد نتائج بعد — كن أول المتسابقين!", "No scores yet — be the first!")}</div>`;
    const mx = Math.max(10, rows[0].s || 0), med = ["🥇", "🥈", "🥉"];
    return rows.map((r, i) => `<div class="g3r ${r.pid === RM.pid ? "me" : ""}"><span class="g3m">${med[i] || i + 1}</span><span class="g3n">${E(r.n || "—")}</span><div class="g3b"><i style="width:${Math.max(4, (r.s || 0) / mx * 100).toFixed(0)}%"></i><em style="inset-inline-start:calc(${Math.max(4, (r.s || 0) / mx * 100).toFixed(0)}% - 1.4rem)">${r.av || av(r.pid)}</em></div><b class="g3s">${r.s || 0}</b></div>`).join("");
  }
  function css3() {
    if (D.getElementById("css300g")) return;
    const st = D.createElement("style"); st.id = "css300g"; st.textContent = `
.g3{text-align:center;color:#e5e7eb}.g3 button{font:inherit;cursor:pointer}
.g3 .g3t{display:flex;justify-content:space-between;align-items:center;margin-bottom:.5rem}
.g3 .g3q{background:#111c33;border:1px solid #334155;border-radius:16px;padding:.8rem;margin:.4rem 0}
.g3 .g3big{font-size:4.2rem;line-height:1.15}.g3 .g3tx{font-weight:800;font-size:1.05rem;margin:.2rem 0 .5rem}
.g3 .g3m2{font:900 2.6rem Tajawal,sans-serif;direction:ltr;letter-spacing:.05em}
.g3 .g3o{display:grid;grid-template-columns:1fr 1fr;gap:.45rem;margin-top:.4rem}
.g3 .g3o button{border:2px solid #334155;background:#1e293b;color:#fff;border-radius:14px;padding:.7rem .4rem;font-size:1.25rem;font-weight:800;transition:transform .1s}.g3 .g3o button:active{transform:scale(.96)}
.g3 .g3o button.ok{background:#047857;border-color:#34d399}.g3 .g3o button.bad{background:#991b1b;border-color:#f87171}.g3 .g3o button:disabled{cursor:default;opacity:.9}
.g3 .g3sw{display:inline-block;width:.9rem;height:.9rem;border-radius:50%;margin-inline-end:.35rem;vertical-align:middle}
.g3 .g3c{display:flex;flex-wrap:wrap;gap:.3rem;justify-content:center;margin:.5rem 0}.g3 .g3c button,.g3 .g3p{border:1px solid #334155;background:#1e293b;color:#e5e7eb;border-radius:999px;padding:.3rem .8rem;font-size:.82rem;font-weight:700}
.g3 .g3c button.on{background:#10b981;border-color:#10b981;color:#fff}.g3 .g3p.pr{background:#10b981;border-color:#10b981;color:#fff;padding:.5rem 1.3rem;font-size:.95rem}
.g3 .g3lb{margin-top:.6rem;text-align:start}.g3 .g3h{font-size:.78rem;color:#94a3b8;margin:.2rem 0}
.g3 .g3r{display:flex;align-items:center;gap:.4rem;margin:.28rem 0;padding:.15rem .3rem;border-radius:10px}.g3 .g3r.me{background:rgba(16,185,129,.14)}
.g3 .g3m{width:1.6rem;text-align:center}.g3 .g3n{width:5.4rem;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-size:.85rem}
.g3 .g3b{flex:1;position:relative;height:20px;background:#1e293b;border-radius:11px}.g3 .g3b i{display:block;height:100%;border-radius:11px;background:linear-gradient(90deg,#10b981,#f59e0b);transition:width .4s}.g3 .g3b em{position:absolute;top:-3px;font-style:normal;font-size:1.15rem;transition:inset-inline-start .4s}
.g3 .g3s{min-width:2rem;text-align:center}.g3 .g3e{color:#94a3b8;font-size:.85rem;padding:.4rem}
.g3 .g3g{display:grid;gap:.3rem;justify-content:center;margin:.4rem auto}.g3 .g3g button{border:2px solid #334155;background:#1e293b;border-radius:12px;font-size:1.7rem;padding:.15rem;line-height:1.3;aspect-ratio:1}.g3 .g3g button.ok{background:#047857;border-color:#34d399}.g3 .g3g button.bad{background:#991b1b;border-color:#f87171}
.g3 .g3cn{display:flex;flex-wrap:wrap;gap:.2rem;justify-content:center;font-size:2rem;max-width:20rem;margin:.3rem auto}
.g3 .g3tl{display:flex;flex-wrap:wrap;gap:.35rem;justify-content:center;margin:.4rem 0}.g3 .g3tl button{border:2px solid #475569;background:#1e293b;color:#fff;border-radius:12px;min-width:2.6rem;padding:.4rem .6rem;font:800 1.5rem 'Amiri',Tajawal,serif}.g3 .g3tl button:disabled{opacity:.25}
.g3 .g3an{min-height:3.4rem;border:2px dashed #475569;border-radius:12px;display:flex;gap:.3rem;justify-content:center;align-items:center;flex-wrap:wrap;font:800 1.7rem 'Amiri',Tajawal,serif;direction:rtl;padding:.3rem}
.g3 .rps{display:flex;gap:.5rem;justify-content:center}.g3 .rps button{font-size:3rem;border:3px solid #334155;background:#1e293b;border-radius:18px;padding:.3rem .8rem}.g3 .rps button.on{border-color:#10b981;background:#064e3b}
.g3 .c4{display:grid;grid-template-columns:repeat(7,1fr);gap:4px;background:#1d4ed8;padding:6px;border-radius:12px;max-width:21rem;margin:.4rem auto;direction:ltr}.g3 .c4 button{aspect-ratio:1;border-radius:50%;border:0;background:#0f172a;padding:0;font-size:1.6rem;line-height:1}.g3 .c4 button.w{box-shadow:0 0 0 3px #fde047}
.g3 .a3a{position:relative;background:#0b1224;border:1px solid #334155;border-radius:16px;padding:.6rem;min-height:290px;margin:.4rem 0;overflow:hidden}
.g3 .a3hud{display:flex;justify-content:space-around;font-weight:800;font-size:1.1rem;margin-bottom:.4rem}
.g3 .a3gr{display:grid;grid-template-columns:repeat(3,1fr);gap:.5rem;max-width:20rem;margin:0 auto}.g3 .a3h{aspect-ratio:1;border-radius:50%;border:0;background:radial-gradient(circle at 50% 70%,#1f2937 55%,#92400e 56%);font-size:2.8rem;line-height:1;padding:0}.g3 .a3h.up{animation:a3pop .15s}@keyframes a3pop{from{transform:scale(.4)}}
.g3 .a3sky{position:relative;height:250px;border-radius:12px;background:linear-gradient(#38bdf8,#e0f2fe);overflow:hidden}
.g3 .a3b{position:absolute;bottom:-70px;width:52px;height:64px;border-radius:50% 50% 48% 48%;border:0;color:#fff;font:800 1.5rem 'Amiri',Tajawal,serif;animation:a3rise var(--d,5s) linear forwards;padding:0;box-shadow:inset -6px -6px 0 rgba(0,0,0,.15)}
@keyframes a3rise{to{transform:translateY(-340px)}}
.g3 .a3tg{font-weight:800;font-size:1.05rem;margin:.1rem 0 .3rem}.g3 .a3tg b{font:900 1.8rem 'Amiri',Tajawal,serif;color:#fde047}
.g3 .a3p{display:grid;grid-template-columns:1fr 1fr;gap:.5rem;max-width:15rem;margin:.4rem auto}.g3 .a3p button{aspect-ratio:1.4;border-radius:16px;border:0;opacity:.75;transition:.1s}.g3 .a3p button.lit{opacity:1;filter:brightness(1.5);transform:scale(.96)}
.g3 .a3end{font-size:1.2rem;font-weight:800;margin:.6rem 0}`;
    D.head.appendChild(st);
  }

  /* ---------- رسم اللعبة ---------- */
  function shell(g, inner) {
    const host = hostNow(), close = `<button class="rm-pbtn" onclick="${host ? "gameClose()" : "rmEl('rmGame').remove()"}">✕</button>`;
    return `<div class="g3" data-k="${g.kind}" data-id="${g.id}"><div class="g3t"><b>${E(gTitle(g.kind))}</b>${close}</div>${inner}</div>`;
  }
  function mount(g, html) {
    let el = D.getElementById("rmGame"); if (!el) { el = D.createElement("div"); el.id = "rmGame"; el.className = "rm-game"; (D.getElementById("rmRoot") || D.body).appendChild(el); }
    el.innerHTML = `<div style="width:min(560px,96vw)">${shell(g, html)}</div>`; return el;
  }
  function render3(g) {
    css3(); const k = g.kind;
    if (k.startsWith("q_")) return mount(g, qHtml(g));
    if (k === "rps") return mount(g, rpsHtml(g));
    if (k === "c4") return mount(g, c4Html(g));
    return arcRender(g);
  }

  /* --- أسئلة الاختيار --- */
  function qHtml(g) {
    const q = g.q, host = hostNow(), mine = (g.ans || {})[RM.pid], k = g.kind, nA = Object.keys(g.ans || {}).length;
    let body = "";
    if (k === "q_letter") body = `<div class="g3big">${q.big}</div>`;
    else if (k === "q_count") body = `<div class="g3cn">${Array(q.cnt).fill(q.em).join("")}</div>`;
    else if (k === "q_color") body = `<div class="g3m2" style="color:${q.ink};font-size:3rem;direction:rtl">${E(q.word)}</div>`;
    else if (k === "q_math") body = `<div class="g3m2">${E(q.math)}</div>`;
    else if (k === "q_word") body = `<div class="g3big">${q.big}</div>`;
    else if (k === "q_sj") body = `<div class="g3h">${E(q.cat)}</div>`;
    let ans = "";
    if (k === "q_odd") {
      ans = `<div class="g3g" style="grid-template-columns:repeat(${q.cols},minmax(0,${q.cols > 4 ? 3.2 : 4}rem))">${q.grid.map((e, i) => { let cls = ""; if (mine) cls = i === q.c ? "ok" : (mine.v === i ? "bad" : ""); return `<button class="${cls}" ${mine ? "disabled" : ""} onclick="g300.ans(${i})">${e}</button>`; }).join("")}</div>`;
    } else if (q.build) {
      const need = q.w.length, p = B300.rid === g.id + ":" + g.round ? (B300.pick || []) : (B300.rid = g.id + ":" + g.round, B300.pick = [], B300.pick);
      const built = p.map(i => q.shuf[i]).join("");
      ans = mine ? `<div class="g3an" style="${mine.ok ? "border-color:#34d399;color:#34d399" : "border-color:#f87171;color:#f87171"}">${E(q.w)}</div>`
        : `<div class="g3an">${p.map(i => `<span>${E(q.shuf[i])}</span>`).join("") || `<small style="opacity:.5;font-size:.9rem">${T("اضغط الحروف بالترتيب", "Tap the letters in order")}</small>`}</div>
        <div class="g3tl">${q.shuf.map((c, i) => `<button ${p.includes(i) ? "disabled" : ""} onclick="g300.tile(${i})">${E(c)}</button>`).join("")}</div>
        <div class="g3c"><button onclick="g300.undo()">⌫ ${T("تراجع", "Undo")}</button><button onclick="g300.clr()">↺</button></div>`;
    } else {
      ans = `<div class="g3o">${q.opts.map((o, i) => { let cls = ""; if (mine) cls = i === q.c ? "ok" : (mine.v === i ? "bad" : ""); const sw = k === "q_color" ? `<span class="g3sw" style="background:${(COLORS.find(c => c[0] === o) || [0, "#999"])[1]}"></span>` : ""; return `<button class="${cls}" ${mine ? "disabled" : ""} onclick="g300.ans(${i})">${sw}${E(k === "q_color" && !AR() ? COLORS_EN[o] || o : o)}</button>`; }).join("")}</div>`;
    }
    const fb = mine ? `<div class="g3tx" style="margin-top:.5rem;color:${mine.ok ? "#34d399" : "#f87171"}">${mine.ok ? "✅ " + T("أحسنت!", "Well done!") + " +" + mine.pts : "❌ " + T("حاول في السؤال التالي", "Try the next one")}${q.fb ? ` <span style="color:#e5e7eb">— ${E(q.fb)}</span>` : ""}</div>` : "";
    const lv = ["q_letter", "q_count", "q_odd", "q_color", "q_math", "q_word"].includes(k);
    const ctl = host ? `<div class="g3c">${lv ? [[1, T("سهل", "Easy")], [2, T("متوسط", "Medium")], [3, T("صعب", "Hard")]].map(([v, l]) => `<button class="${(g.lvl || 1) === v ? "on" : ""}" onclick="g300.lvl(${v})">${l}</button>`).join("") : ""}${k === "q_sj" ? Object.keys(SJ).map(c => `<button class="${(g.cats || []).includes(c) ? "on" : ""}" onclick="g300.cat('${c}')">${SJ[c][0]}</button>`).join("") : ""}</div>
      <div class="g3c"><button class="g3p pr" onclick="g300.next()">${T("السؤال التالي", "Next question")} ➜</button><button class="g3p" onclick="g300.reset()">↺ ${T("تصفير النقاط", "Reset scores")}</button></div><div class="g3h">${nA} ${T("أجابوا", "answered")}</div>` : `<div class="g3h">${T("ينتظر المعلم لينتقل للسؤال التالي…", "Waiting for the teacher…")}</div>`;
    return `<div class="g3q"><div class="g3tx">${E(q.t)}</div>${body}${ans}${fb}</div>${ctl}<div class="g3lb"><div class="g3h">🏁 ${T("لوحة السباق", "Race board")}</div>${lbHtml(g)}</div>`;
  }
  function award(g, ok, v) {
    const pid = RM.pid, nOk = Object.values(g.ans || {}).filter(x => x.ok).length, pts = ok ? 10 + (nOk === 0 ? 5 : 0) : 0;
    g.ans = Object.assign({}, g.ans, { [pid]: { v, ok, pts, n: myName() } });
    const old = (g.sc || {})[pid] || { s: 0 }; g.sc = Object.assign({}, g.sc, { [pid]: { n: myName(), s: (old.s || 0) + pts, av: av(pid) } });
    snd(ok ? "ok" : "no"); if (ok && nOk === 0) burst(900); gSend2();
  }
  function next(g) { g.round = (g.round || 1) + 1; g.ans = {}; g.q = mkQ(g); g.t0 = Date.now(); B300.pick = null; B300.rid = ""; gSend2(); }
  const G = () => RM.game;
  window.g300 = {
    ans(i) { const g = G(); if (!g || (g.ans || {})[RM.pid]) return; ac(); award(g, i === g.q.c, i); },
    tile(i) { const g = G(); if (!g || (g.ans || {})[RM.pid]) return; ac(); const p = B300.pick = (B300.pick || []); if (p.includes(i)) return; p.push(i); snd("pop"); if (p.length === g.q.w.length) { const ok = p.map(x => g.q.shuf[x]).join("") === g.q.w; return award(g, ok, ok ? 0 : -1); } render3(g); },
    undo() { const g = G(); if (!g) return; (B300.pick || []).pop(); render3(g); }, clr() { const g = G(); if (!g) return; B300.pick = []; render3(g); },
    next() { const g = G(); if (g && hostNow()) next(g); },
    lvl(v) { const g = G(); if (!g || !hostNow()) return; g.lvl = v; next(g); },
    cat(c) { const g = G(); if (!g || !hostNow()) return; const a = new Set(g.cats || []); a.has(c) ? a.delete(c) : a.add(c); g.cats = [...a]; next(g); },
    reset() { const g = G(); if (!g || !hostNow()) return; g.epoch = (g.epoch || 0) + 1; g.sc = {}; g.ans = {}; if (g.q) next(g); else gSend2(); },
    rps(v) { const g = G(); if (!g || g.reveal || (g.ans || {})[RM.pid]) return; ac(); g.ans = Object.assign({}, g.ans, { [RM.pid]: { v, n: myName() } }); snd("pop"); gSend2(); },
    rpsGo() { const g = G(); if (!g || !hostNow() || g.reveal) return; g.hc = rnd(3); g.reveal = true; const sc = Object.assign({}, g.sc); Object.keys(g.ans || {}).forEach(pid => { const a = g.ans[pid], r = (a.v - g.hc + 3) % 3; if (r === 1) sc[pid] = { n: a.n, s: ((sc[pid] || {}).s || 0) + 1, av: av(pid) }; else if (!sc[pid]) sc[pid] = { n: a.n, s: 0, av: av(pid) }; }); g.sc = sc; snd("fanfare"); gSend2(); },
    rpsNext() { const g = G(); if (!g || !hostNow()) return; g.round++; g.ans = {}; g.reveal = false; g.hc = null; gSend2(); },
    c4(col) { c4Drop(col); },
    c4reset() { const g = G(); if (!g) return; g.cells = Array(42).fill(0); g.turn = 1; g.win = null; gSend2(); },
    arc(a) { arcAct(a); }
  };

  /* --- حجر ورقة مقص --- */
  const RPS = ["✊", "✋", "✌️"], RPSN = [T("حجر", "Rock"), T("ورقة", "Paper"), T("مقص", "Scissors")];
  function rpsHtml(g) {
    const host = hostNow(), mine = (g.ans || {})[RM.pid], n = Object.keys(g.ans || {}).length; let mid;
    if (g.reveal) {
      const r = mine ? (mine.v - g.hc + 3) % 3 : -1, res = r === 0 ? T("🤝 تعادل", "🤝 Draw") : r === 1 ? T("🎉 فزت على المعلم!", "🎉 You beat the teacher!") : r === 2 ? T("😅 فاز المعلم", "😅 The teacher wins") : "";
      mid = `<div class="g3tx">${T("اختيار المعلم", "Teacher chose")}</div><div class="g3big">${RPS[g.hc]}</div><div class="g3tx" style="color:#fde047">${res}</div><div class="g3h">${Object.keys(g.ans).map(p => `${av(p)} ${E(g.ans[p].n)} ${RPS[g.ans[p].v]}`).join(" · ")}</div>`;
    } else {
      mid = `<div class="g3tx">${T("اختر قبل أن يكشف المعلم اختياره!", "Choose before the teacher reveals!")}</div><div class="rps">${RPS.map((e, i) => `<button class="${mine && mine.v === i ? "on" : ""}" ${mine ? "disabled" : ""} onclick="g300.rps(${i})" title="${RPSN[i]}">${e}</button>`).join("")}</div><div class="g3h">${n} ${T("اختاروا", "chose")}</div>`;
    }
    const ctl = host ? `<div class="g3c">${g.reveal ? `<button class="g3p pr" onclick="g300.rpsNext()">${T("جولة جديدة", "New round")} ➜</button>` : `<button class="g3p pr" onclick="g300.rpsGo()">${T("اكشف اختيار المعلم", "Reveal teacher's pick")}</button>`}<button class="g3p" onclick="g300.reset()">↺ ${T("تصفير النقاط", "Reset scores")}</button></div>` : "";
    return `<div class="g3q">${mid}</div>${ctl}<div class="g3lb"><div class="g3h">🏆 ${T("من فاز على المعلم", "Who beat the teacher")}</div>${lbHtml(g)}</div>`;
  }

  /* --- أربعة في صف --- */
  function c4Win(c) {
    const at = (r, k) => (r < 0 || r > 5 || k < 0 || k > 6) ? 0 : c[r * 7 + k];
    for (let r = 0; r < 6; r++) for (let k = 0; k < 7; k++) { const v = at(r, k); if (!v) continue; for (const [dr, dk] of [[0, 1], [1, 0], [1, 1], [1, -1]]) { const cells = [[r, k]]; for (let i = 1; i < 4; i++) { if (at(r + dr * i, k + dk * i) === v) cells.push([r + dr * i, k + dk * i]); else break; } if (cells.length === 4) return { v, cells: cells.map(([a, b]) => a * 7 + b) }; } }
    return c.every(Boolean) ? { v: 0, cells: [] } : null;
  }
  function c4Mine() { const alone = (() => { try { return Object.keys(RM.peers || {}).length === 0; } catch (e) { return true; } })(); return { me: hostNow() ? 1 : 2, alone }; }
  function c4Drop(col) {
    const g = G(); if (!g || g.win) return; const { me, alone } = c4Mine(); if (g.turn !== me && !alone) return;
    for (let r = 5; r >= 0; r--) if (!g.cells[r * 7 + col]) { g.cells[r * 7 + col] = g.turn; g.win = c4Win(g.cells); if (g.win) { snd("fanfare"); if (g.win.v) burst(1800); } else { g.turn = g.turn === 1 ? 2 : 1; snd("pop"); } return gSend2(); }
  }
  function c4Html(g) {
    const { me, alone } = c4Mine(), col = ["", "🔴", "🟡"];
    const st = g.win ? (g.win.v ? `${col[g.win.v]} ${T("فاز!", "wins!")} 🎉` : T("تعادل", "Draw")) : `${T("الدور", "Turn")}: ${col[g.turn]} ${g.turn === me || alone ? "— " + T("دورك", "your move") : ""}`;
    const cells = g.cells.map((v, i) => `<button class="${g.win && g.win.cells.includes(i) ? "w" : ""}" onclick="g300.c4(${i % 7})">${col[v] || ""}</button>`).join("");
    return `<div class="g3q"><div class="g3tx">${st}</div><div class="c4">${cells}</div><div class="g3h">${T("المعلم 🔴 والطالب 🟡", "Teacher 🔴 · Student 🟡")}</div></div><div class="g3c"><button class="g3p" onclick="g300.c4reset()">↺ ${T("إعادة", "Reset")}</button></div>`;
  }

  /* --- ألعاب الأركيد المحلية (كل طالب يلعب على جهازه والنتائج تُجمع للجميع) --- */
  let ARC = { stop: null };
  function arcStop() { try { if (ARC.stop) ARC.stop(); } catch (e) {} ARC.stop = null; }
  function arcRender(g) {
    const el = D.getElementById("rmGame");
    const info = { a_whack: T("اضغط على الحيوانات التي تخرج من الجحور خلال ٣٠ ثانية!", "Tap the critters as they pop up — 30 seconds!"), a_balloon: T("فرقع البالونات التي عليها الحرف المطلوب فقط! لديك ٤٠ ثانية.", "Pop only the balloons with the target letter — 40 seconds!"), a_simon: T("شاهد تسلسل الألوان ثم كرّره. كل جولة أطول من التي قبلها!", "Watch the colour sequence, then repeat it. Each round is longer!") }[g.kind];
    if (el && el.querySelector(`.g3[data-id="${g.id}"]`)) { const lb = el.querySelector("#a3lb"); if (lb) lb.innerHTML = lbHtml(g); return; }
    arcStop(); css3();
    const host = hostNow();
    mount(g, `<div class="a3a" id="a3a"><div class="g3tx">${info}</div><button class="g3p pr" data-go="1" onclick="g300.arc('go')">▶ ${T("ابدأ", "Play")}</button></div>${host ? `<div class="g3c"><button class="g3p" onclick="g300.reset()">↺ ${T("تصفير النقاط", "Reset scores")}</button></div>` : ""}<div class="g3lb"><div class="g3h">🏆 ${T("أعلى النتائج", "Top scores")}</div><div id="a3lb">${lbHtml(g)}</div></div>`);
  }
  function arcSubmit(s) {
    const g = G(); if (!g || !GK[g.kind]) return; const old = (g.sc || {})[RM.pid]; if (old && old.s >= s) return;
    g.sc = Object.assign({}, g.sc, { [RM.pid]: { n: myName(), s, av: av(RM.pid) } }); gSend2();
  }
  function arcAct(a) {
    const g = G(), box = D.getElementById("a3a"); if (!g || !box) return; ac(); arcStop();
    const live = () => box.isConnected && ARC.stop === stopFn; let alive = true; const timers = [];
    const stopFn = () => { alive = false; timers.forEach(clearTimeout); timers.forEach(clearInterval); }; ARC.stop = stopFn;
    const ok = () => alive && box.isConnected;
    const after = (ms, f) => { const t = setTimeout(() => { if (ok()) f(); }, ms); timers.push(t); return t; };
    const every = (ms, f) => { const t = setInterval(() => { if (ok()) f(); else stopFn(); }, ms); timers.push(t); return t; };
    const finish = s => { stopFn(); if (!box.isConnected) return; arcSubmit(s); box.innerHTML = `<div class="a3end">${s >= 1 ? "🎉" : "💪"} ${T("نتيجتك", "Your score")}: <b>${s}</b></div><button class="g3p pr" onclick="g300.arc('go')">↺ ${T("العب مرة أخرى", "Play again")}</button>`; if (s > 0) { snd("fanfare"); burst(1400); } };
    const k = g.kind;
    if (k === "a_whack") {
      let s = 0, left = 30;
      box.innerHTML = `<div class="a3hud"><span>⏱️ <b id="a3t">30</b></span><span>⭐ <b id="a3s">0</b></span></div><div class="a3gr">${Array.from({ length: 9 }, () => `<button class="a3h"></button>`).join("")}</div>`;
      const holes = [...box.querySelectorAll(".a3h")], hud = () => { box.querySelector("#a3t").textContent = left; box.querySelector("#a3s").textContent = s; };
      holes.forEach(h => h.addEventListener("pointerdown", e => { e.preventDefault(); if (!h.dataset.up) return; delete h.dataset.up; s++; h.textContent = "💥"; snd("pop"); after(160, () => { h.textContent = ""; h.classList.remove("up"); }); hud(); }));
      const spawn = () => { const free = holes.filter(h => !h.dataset.up), h = pick(free.length ? free : holes); h.dataset.up = "1"; h.classList.add("up"); h.textContent = pick(["🐹", "🐸", "🐰", "🐻", "🐼"]); after(Math.max(520, 1000 - (30 - left) * 15), () => { if (h.dataset.up) { delete h.dataset.up; h.classList.remove("up"); h.textContent = ""; } }); };
      const loop = () => { if (!ok()) return; spawn(); after(Math.max(380, 760 - (30 - left) * 11), loop); }; loop();
      every(1000, () => { left--; hud(); if (left <= 0) finish(s); });
    } else if (k === "a_balloon") {
      let s = 0, left = 40, target = pick(LETTERS); const cols = ["#ef4444", "#3b82f6", "#22c55e", "#a855f7", "#f97316", "#ec4899"];
      box.innerHTML = `<div class="a3hud"><span>⏱️ <b id="a3t">40</b></span><span>⭐ <b id="a3s">0</b></span></div><div class="a3tg">${T("فرقع الحرف", "Pop the letter")}: <b id="a3g">${target}</b></div><div class="a3sky" id="a3sky"></div>`;
      const sky = box.querySelector("#a3sky"), hud = () => { box.querySelector("#a3t").textContent = left; box.querySelector("#a3s").textContent = s; box.querySelector("#a3g").textContent = target; };
      const spawn = () => { const b = D.createElement("button"), L = rnd(10) < 4 ? target : pick(LETTERS); b.className = "a3b"; b.textContent = L; b.style.left = (3 + rnd(80)) + "%"; b.style.background = pick(cols); b.style.setProperty("--d", (3.6 + Math.random() * 2) + "s");
        b.addEventListener("pointerdown", e => { e.preventDefault(); if (b.dataset.x) return; b.dataset.x = 1; if (L === target) { s++; snd("pop"); b.textContent = "💥"; b.style.background = "transparent"; } else { s = Math.max(0, s - 1); snd("no"); b.style.opacity = .3; } hud(); setTimeout(() => b.remove(), 180); });
        b.addEventListener("animationend", () => b.remove()); sky.appendChild(b); };
      const loop = () => { if (!ok()) return; spawn(); after(560, loop); }; loop();
      every(8000, () => { target = pick(LETTERS); hud(); snd("chime"); });
      every(1000, () => { left--; hud(); if (left <= 0) finish(s); });
    } else if (k === "a_simon") {
      const C = ["#ef4444", "#3b82f6", "#22c55e", "#eab308"], F = [262, 330, 392, 523]; let seq = [], pos = 0, play = false;
      box.innerHTML = `<div class="a3hud"><span>🔁 <b id="a3s">0</b></span><span id="a3m">${T("شاهد…", "Watch…")}</span></div><div class="a3p">${C.map((c, i) => `<button data-i="${i}" style="background:${c}"></button>`).join("")}</div>`;
      const pads = [...box.querySelectorAll(".a3p button")], msg = box.querySelector("#a3m"), sc = box.querySelector("#a3s");
      const flash = i => { pads[i].classList.add("lit"); tone(F[i], 0, .3, "sine", .25); after(280, () => pads[i].classList.remove("lit")); };
      const showSeq = () => { play = false; msg.textContent = T("شاهد…", "Watch…"); seq.forEach((v, n) => after(500 + n * 650, () => flash(v))); after(500 + seq.length * 650, () => { play = true; pos = 0; msg.textContent = T("دورك!", "Your turn!"); }); };
      const nextR = () => { seq.push(rnd(4)); showSeq(); };
      pads.forEach(p => p.addEventListener("pointerdown", e => { e.preventDefault(); if (!play) return; const i = +p.dataset.i; flash(i); if (i === seq[pos]) { pos++; if (pos === seq.length) { play = false; sc.textContent = seq.length; after(700, nextR); } } else { play = false; snd("no"); after(500, () => finish(seq.length - 1)); } }));
      nextR();
    }
  }

  /* ---------- قائمة الألعاب مقسّمة حسب العمر ---------- */
  function rebuildMenu() {
    const b = D.getElementById("rmMenuBox"); if (!b) return; const host = hostNow(); let old = [];
    try { old = (typeof GAMES17 !== "undefined" ? GAMES17 : []).filter(g => host || !g[2]); } catch (e) {}
    const oldBtn = (k, ic) => { const g = old.find(x => x[0] === k); return g ? `<button onclick="rmMenuClose();gameStart('${k}')">${E(RL(g[1]))}</button>` : ""; };
    const mine = grp => GAMES.filter(g => g[4] === grp && (host || !g[5])).map(g => `<button onclick="rmMenuClose();gameStart('${g[0]}')">${g[1]} ${E(T(g[2], g[3]))}</button>`).join("");
    const H = t => `<div style="font-size:.74rem;color:#94a3b8;padding:.35rem .6rem .1rem">${t}</div>`;
    const kid = mine("kid") + oldBtn("mem") + oldBtn("wheel"), big = mine("big") + oldBtn("hang") + oldBtn("scr") + oldBtn("tf") + oldBtn("quiz") + oldBtn("tasmee"), tool = oldBtn("buzz") + oldBtn("ttt") + oldBtn("score");
    b.innerHTML = `${kid ? H("🧒 " + T("للصغار", "For little ones")) + kid : ""}${big ? H("🎓 " + T("للكبار", "For older students")) + big : ""}${tool ? H("🧰 " + T("أدوات المسابقة", "Contest tools")) + tool : ""}`;
    b.style.maxHeight = "min(72vh,560px)"; b.style.overflowY = "auto"; b.style.minWidth = "250px";
    const r = b.getBoundingClientRect(); if (r.top < 8) b.style.top = "8px";
  }
  function hookMenu() {
    if (typeof rmMenu !== "function") return; const _m = rmMenu;
    rmMenu = function (kind, el) { _m.apply(this, arguments); if (kind === "games" && FF("v300.games")) { try { rebuildMenu(); } catch (e) { console.warn("v300", e); } } };
  }

  if (FF("v300.games")) { try { if (install()) hookMenu(); } catch (e) { console.warn("v300 games", e); } }
  window.v300 = { games: GAMES.map(g => g[0]), skins: SKINS.map(s => s[0]), mkQ, newGame, SJ };
})();
