/* ================= v267: (1) «📖 صفحات مصحف المدينة» — المصحف صفحة صفحة (604) بخط مجمع الملك فهد نفسه (خطوط صفحات QCF المنشورة للاستخدام العام) مطابق للمطبوع سطر بسطر · بتختار الصفحة أو السورة أو الجزء، وبتقلّب بالأسهم أو بالسحب، والصوت بتاع الصفحة بصوت الحصري · زرار ليه جنب «مصحف الشمرلي» وفي الأدوات · (2) باقات العيلة جوه «اشترك» زي باقي الأقسام ================= */
(function () {
  const FF = k => { try { return window.ff254(k); } catch (e) { return true; } };
  const AR = () => state.lang === "ar"; const T = (a, e) => AR() ? a : e;
  const css = s => document.head.insertAdjacentHTML("beforeend", `<style>${s}</style>`);
  const E = s => { try { return esc(s); } catch (e) { return String(s == null ? "" : s); } };
  window.mp267 = window.mp267 || {};
  const P3 = n => String(n).padStart(3, "0");
  const FONT = n => `https://raw.githubusercontent.com/mustafa0x/qpc-fonts/f93bf5f3/mushaf-woff2/QCF_P${P3(n)}.woff2`;
  const BSML = "https://raw.githubusercontent.com/mustafa0x/qpc-fonts/f93bf5f3/mushaf-v2-woff2/QCF_BSML.woff2";
  /* أول صفحة لكل سورة (مصحف المدينة 604) */
  const SP = [1,2,50,77,106,128,151,177,187,208,221,235,249,255,262,267,282,293,305,312,322,332,342,350,359,367,377,385,396,404,411,415,418,428,434,440,446,453,458,467,477,483,489,496,499,502,507,511,515,518,520,523,526,528,531,534,537,542,545,549,551,553,554,556,558,560,562,564,566,568,570,572,574,575,577,578,580,582,583,585,586,587,587,589,590,591,591,592,593,594,595,595,596,596,597,597,598,598,599,599,600,600,601,601,601,602,602,602,603,603,603,604,604,604];
  const JP = [1,22,42,62,82,102,121,142,162,182,201,222,242,262,282,302,322,342,362,382,402,422,442,462,482,502,522,542,562,582];
  const fonts = {}; const cache = {};
  async function font(n) { if (fonts[n]) return fonts[n]; fonts[n] = (async () => { const f = new FontFace("qcf" + n, `url(${FONT(n)}) format("woff2")`); await f.load(); document.fonts.add(f); return 1; })().catch(e => { delete fonts[n]; throw e; }); return fonts[n]; }
  async function data(n) { if (cache[n]) return cache[n]; const j = await fetch(`https://api.quran.com/api/v4/verses/by_page/${n}?words=true&word_fields=code_v1,line_number,page_number&per_page=50`).then(r => r.json()); cache[n] = j.verses || []; return cache[n]; }
  const st = () => state.mp267 = state.mp267 || { p: +(localStorage.getItem("itqan_mp267") || 1), z: 1 };
  mp267.go = n => { const s = st(); s.p = Math.max(1, Math.min(604, +n || 1)); try { localStorage.setItem("itqan_mp267", s.p); } catch (e) {} draw(); };
  mp267.open = n => { if (n) st().p = n; go16("mushaf267"); };
  async function draw() { const s = st(); const box = document.getElementById("mpbox267"); if (!box) return; const n = s.p; box.innerHTML = `<div class="ld267">⏳ ${T("بيحمّل الصفحة", "Loading page")} ${n}…</div>`;
    const lab = document.getElementById("mpn267"); if (lab) lab.value = n;
    try { const [v] = await Promise.all([data(n), font(n)]); if (st().p !== n) return;
      const lines = {}; v.forEach(x => (x.words || []).forEach(w => { const L = w.line_number || 0; (lines[L] = lines[L] || []).push({ c: w.code_v1, k: x.verse_key, t: w.char_type_name }); }));
      const max = n <= 2 ? 8 : 15; let h = "";
      for (let L = 1; L <= max; L++) { const ws = lines[L]; h += `<div class="ln267 ${ws ? "" : "em267"}">${ws ? ws.map(w => `<span class="w267" data-k="${E(w.k)}" onclick="mp267.ay('${E(w.k)}')">${w.c}</span>`).join("") : ""}</div>`; }
      box.innerHTML = `<div class="pg267" style="font-family:qcf${n}">${h}</div><div class="ft267">${n}</div>`;
      [n + 1, n - 1].forEach(m => { if (m >= 1 && m <= 604) { data(m).catch(() => {}); font(m).catch(() => {}); } });
    } catch (e) { box.innerHTML = `<div class="ld267">⚠️ ${T("الصفحة ماحمّلتش — اتأكد من النت ودوس تاني", "Couldn't load — check the connection and retry")} <button class="btn btn-o" onclick="mp267.go(${n})">↻</button></div>`; } }
  /* سماع الآية / الصفحة بصوت الحصري */
  let au = null; const aurl = k => { const [s, a] = k.split(":").map(Number); return `https://everyayah.com/data/Husary_128kbps/${P3(s)}${P3(a)}.mp3`; };
  mp267.ay = k => { document.querySelectorAll(".w267.on").forEach(x => x.classList.remove("on")); document.querySelectorAll(`.w267[data-k="${k}"]`).forEach(x => x.classList.add("on")); try { if (au) au.pause(); au = new Audio(aurl(k)); au.play().catch(() => {}); } catch (e) {} };
  mp267.play = async () => { const v = await data(st().p).catch(() => []); const ks = v.map(x => x.verse_key); let i = 0; const nx = () => { if (i >= ks.length) return; const k = ks[i++]; mp267.ay(k); au.onended = nx; }; nx(); };
  mp267.stop = () => { try { au && au.pause(); } catch (e) {} document.querySelectorAll(".w267.on").forEach(x => x.classList.remove("on")); };
  let sx = 0; addEventListener("touchstart", e => { if (e.target.closest && e.target.closest("#mpbox267")) sx = e.touches[0].clientX; }, { passive: true });
  addEventListener("touchend", e => { if (!sx || !(e.target.closest && e.target.closest("#mpbox267"))) return; const d = e.changedTouches[0].clientX - sx; sx = 0; if (Math.abs(d) > 60) mp267.go(st().p + (d > 0 ? 1 : -1)); }, { passive: true });
  addEventListener("keydown", e => { if (state.route !== "mushaf267" || /input|select|textarea/i.test((e.target || {}).tagName || "")) return; if (e.key === "ArrowLeft") mp267.go(st().p + 1); if (e.key === "ArrowRight") mp267.go(st().p - 1); });
  function page() { const s = st(); let sn = []; try { sn = SURAHS; } catch (e) {}
    const surSel = `<select class="in" style="width:auto" onchange="mp267.go(this.value)"><option value="">${T("السورة…", "Surah…")}</option>${SP.map((p, i) => `<option value="${p}">${i + 1}. ${E((sn[i] && (sn[i].ar || sn[i][1] || sn[i].name)) || "")}</option>`).join("")}</select>`;
    const juzSel = `<select class="in" style="width:auto" onchange="mp267.go(this.value)"><option value="">${T("الجزء…", "Juz…")}</option>${JP.map((p, i) => `<option value="${p}">${T("الجزء", "Juz")} ${i + 1}</option>`).join("")}</select>`;
    const bar = `<div class="bar267"><button class="btn btn-o" onclick="mp267.go(state.mp267.p+1)">→ ${T("التالية", "Next")}</button><input id="mpn267" class="in" type="number" min="1" max="604" value="${s.p}" style="width:5.5rem;text-align:center" onchange="mp267.go(this.value)"><button class="btn btn-o" onclick="mp267.go(state.mp267.p-1)">${T("السابقة", "Prev")} ←</button>${surSel}${juzSel}<button class="btn btn-p" onclick="mp267.play()">▶ ${T("سمّع الصفحة (الحصري)", "Play page (Husary)")}</button><button class="btn btn-o" onclick="mp267.stop()">⏹</button><label class="xs">🔍 <input type="range" min="70" max="140" value="${Math.round(s.z * 100)}" oninput="state.mp267.z=this.value/100;document.getElementById('mpbox267').style.setProperty('--z',state.mp267.z)"></label></div>`;
    setTimeout(draw, 0);
    return pageWrap("📖", T("صفحات مصحف المدينة", "Madinah Mushaf pages"), T("نفس الصفحة المطبوعة سطر بسطر · دوس على أي آية تسمعها · اسحب أو استخدم الأسهم للتقليب", "Exactly as printed, line by line · tap an ayah to hear it · swipe or use arrows"), bar + `<div id="mpbox267" class="box267" style="--z:${s.z}"></div>`, 900); }
  try { if (!PAGES16.includes("mushaf267")) PAGES16.push("mushaf267"); } catch (e) {}
  /* الصفحة بتترسم من خلال R56 لو موجود، وإلا من هنا */
  const _r2 = render; render = function () { if (state.route !== "mushaf267" || !FF("v267.mushaf")) { const o = _r2.apply(this, arguments); after(); return o; }
    state.route = "alltools"; state.__mp267 = 1; let o; try { o = _r2.apply(this, arguments); } finally { state.route = "mushaf267"; state.__mp267 = 0; } after(); return o; };
  try { const _at = renderAllTools; renderAllTools = function () { if (state.__mp267) return page(); return _at.apply(this, arguments); }; } catch (e) {}
  function after() { try {
    /* زرار جنب «مصحف الشمرلي» */
    document.querySelectorAll(`#app button[onclick*="go16('pdf181','shamarly')"]`).forEach(b => { if (b.__m267) return; b.__m267 = 1; b.insertAdjacentHTML("afterend", `<button class="btn btn-o" style="padding:.1rem .5rem" onclick="mp267.open()">📖 ${T("صفحات مصحف المدينة", "Madinah pages")}</button>`); });
    /* باقات العيلة جوه «اشترك» */
    if (state.route === "pricing" && FF("v267.family") && !document.getElementById("fam267")) { const h = document.querySelector("#app h1, #app h2, #app section .wrap > *"); if (h) h.insertAdjacentHTML(/^H[12]$/.test(h.tagName) ? "afterend" : "beforebegin", `<div id="fam267" class="card fam267"><span>👪</span><div><b>${T("باقات العيلة", "Family plans")}</b><small>${T("اشتراك واحد لكل أفراد البيت — الأطفال والكبار، وكل واحد بحسابه وتقدّمه.", "One subscription for the whole household — each member with their own account and progress.")}</small></div><button class="btn btn-p" onclick="go16('fam226')">${T("شوف باقات العيلة", "See family plans")}</button></div>`); }
  } catch (e) {} }
  css(`.bar267{display:flex;gap:.4rem;flex-wrap:wrap;align-items:center;justify-content:center;margin-bottom:.8rem}.bar267 .btn{padding:.25rem .7rem}
  .box267{max-width:calc(560px * var(--z,1));margin:0 auto;background:#fffbea;border:2px solid #b08d2f;border-radius:14px;padding:1.2rem 1rem .6rem;box-shadow:0 8px 30px -12px rgba(0,0,0,.25);direction:rtl;color:#111}
  .pg267{font-size:calc(min(4.6vw, 28px) * var(--z,1));line-height:1.9}.ln267{display:flex;justify-content:space-between;white-space:nowrap;min-height:1.9em}.ln267.em267{justify-content:center}.w267{cursor:pointer;border-radius:4px}.w267:hover{background:rgba(176,141,47,.15)}.w267.on{background:rgba(15,118,110,.18)}
  .ft267{text-align:center;color:#8a6d1f;font-size:.85rem;margin-top:.4rem}.ld267{text-align:center;padding:3rem 1rem;color:#8a6d1f}
  .fam267{display:flex;gap:.8rem;align-items:center;flex-wrap:wrap;border:2px solid var(--accent);margin:.6rem 0}.fam267>span{font-size:2rem}.fam267>div{flex:1;min-width:12rem}.fam267 small{display:block;color:var(--muted)}`);
})();
