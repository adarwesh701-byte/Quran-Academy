/* ================= v280: «العربية بين يديك» الكتاب نفسه بالصوت الأصلي (#/abyb280) — شريحة شريحة زي الكتاب بالظبط: صورة الصفحة من غير الإجابات + زرار «الإجابات» يظهرها، والتسجيل الأصلي للكتاب على شريحته (من غير Azure)، تنقّل بالأسهم والكيبورد، والتقدّم بيتحفظ («خلصت» بعد 70% من الشرائح) — الملفات على فرع media في الريبو (abyb/LxUyy) وبتتعرض من jsDelivr (والاحتياطي raw.githubusercontent) — المستوى التاني (15 وحدة) نزل، والباقي بيتضاف لـ abyb/index.json ================= */
(function () {
  const FF = k => { try { return window.ff254(k); } catch (e) { return true; } };
  const AR = () => state.lang === "ar"; const T = (a, e) => AR() ? a : e;
  const E = s => { try { return esc(s); } catch (e) { return String(s == null ? "" : s); } };
  const css = s => document.head.insertAdjacentHTML("beforeend", `<style>${s}</style>`);
  const CDN = "https://cdn.jsdelivr.net/gh/adarwesh701-byte/Quran-Academy@media/abyb/", RAW = "https://raw.githubusercontent.com/adarwesh701-byte/Quran-Academy/media/abyb/";
  const LV = { L1: ["المستوى الأول", "Level 1"], L2: ["المستوى الثاني", "Level 2"], L3: ["المستوى الثالث", "Level 3"], L4: ["المستوى الرابع", "Level 4"] };
  let IDX = null, loading = 0;
  function load() { if (IDX || loading) return; loading = 1; fetch(CDN + "index.json?v=" + (typeof UI_VERSION !== "undefined" ? UI_VERSION : "")).then(r => r.ok ? r.json() : Promise.reject()).catch(() => fetch(RAW + "index.json").then(r => r.json())).then(j => { IDX = j; render(); }).catch(() => { loading = 0; }); }
  const P = () => { try { return JSON.parse(localStorage.getItem("itqan_abyb280") || "{}"); } catch (e) { return {}; } };
  const saveP = p => { try { localStorage.setItem("itqan_abyb280", JSON.stringify(p)); } catch (e) {} };
  const S = () => state.ab280 = state.ab280 || { L: null, u: null, s: 1, ans: 0 };
  const unit = () => { const s = S(); return IDX && s.L && (IDX[s.L] || []).find(x => x.tag === s.u); };
  const pct = u => { const v = (P()[u.tag] || []).length; return Math.round(v / u.n * 100); };
  const img = (tag, name) => `<img class="im280" src="${CDN}${tag}/${name}" onerror="if(!this.dataset.r){this.dataset.r=1;this.src='${RAW}${tag}/${name}'}" alt="">`;

  function page() { load(); const s = S();
    if (!IDX) return pageWrap("📘", T("العربية بين يديك", "Al-Arabiyyah Bayna Yadayk"), "", `<div class="card">⏳ ${T("جارٍ التحميل…", "Loading…")}</div>`, 1000);
    const levels = Object.keys(LV).filter(k => (IDX[k] || []).length); if (!s.L || !IDX[s.L]) s.L = levels[0];
    const u = unit();
    if (u) return viewer(u);
    const tabs = `<div class="tb275">${Object.keys(LV).map(k => `<button class="${k === s.L ? "on" : ""} ${(IDX[k] || []).length ? "" : "hd275"}" style="--c:#b45309" ${(IDX[k] || []).length ? `onclick="ab280.lv('${k}')"` : "disabled"}>${E(T(LV[k][0], LV[k][1]))}${(IDX[k] || []).length ? "" : " · " + T("قريبًا", "soon")}</button>`).join("")}</div>`;
    const list = (IDX[s.L] || []).map(x => { const p = pct(x); return `<button class="uc280 ${p >= 70 ? "done" : ""}" onclick="ab280.open('${x.tag}')"><span class="n280">${p >= 70 ? "⭐" : x.u}</span><b>${E(x.title)}</b><small>${x.n} ${T("شريحة", "slides")} · 🔊 ${x.audio.length}</small><i style="--p:${p}%"></i></button>`; }).join("");
    return pageWrap("📘", T("العربية بين يديك — الكتاب", "Al-Arabiyyah Bayna Yadayk — the book"), T("الكتاب نفسه صفحة صفحة بالتسجيل الأصلي. حاول تجاوب الأول، وبعدها اضغط «الإجابات».", "The book itself, page by page, with its original audio. Try first, then press «Answers»."), tabs + `<div class="ug280">${list}</div>`, 1000); }

  function viewer(u) { const s = S(); const n = u.n; s.s = Math.max(1, Math.min(n, s.s || 1)); const i = s.s; const hasAns = u.ans.includes(i); const au = u.audio.includes(i);
    const p = P(); const seen = new Set(p[u.tag] || []); if (!seen.has(i)) { seen.add(i); p[u.tag] = [...seen]; saveP(p); }
    const name = hasAns && !s.ans ? `q${i}.jpg` : `a${i}.jpg`;
    const pre = i < n ? `<link rel="prefetch" href="${CDN}${u.tag}/${u.ans.includes(i + 1) ? "q" : "a"}${i + 1}.jpg">` : "";
    return pageWrap("📘", `${T("الوحدة", "Unit")} ${u.u}: ${u.title}`, T(LV[s.L][0], LV[s.L][1]), `<div class="vw280">
      <div class="bar280"><button class="btn btn-o btn-sm" onclick="ab280.close()">☰ ${T("كل الوحدات", "All units")}</button><span class="xs muted">${i} / ${n} · ${pct(u)}%</span><select class="in" style="width:auto" onchange="ab280.go(+this.value)">${Array.from({ length: n }, (_, k) => `<option value="${k + 1}" ${k + 1 === i ? "selected" : ""}>${T("شريحة", "Slide")} ${k + 1}${u.audio.includes(k + 1) ? " 🔊" : ""}${u.ans.includes(k + 1) ? " ✍️" : ""}</option>`).join("")}</select></div>
      <div class="st280" onclick="ab280.tap(event)">${img(u.tag, name)}</div>
      ${au ? `<audio id="au280" class="au280" controls preload="auto" src="${CDN}${u.tag}/${i}.mp3" onerror="if(!this.dataset.r){this.dataset.r=1;this.src='${RAW}${u.tag}/${i}.mp3'}"></audio>` : ""}
      <div class="nav280"><button class="btn btn-o btn-lg" ${i <= 1 ? "disabled" : ""} onclick="ab280.go(${i - 1})">${AR() ? "→" : "←"} ${T("السابق", "Previous")}</button>${hasAns ? `<button class="btn ${s.ans ? "btn-p" : "btn-o"} btn-lg" onclick="ab280.ans()">${s.ans ? "🙈 " + T("أخفِ الإجابات", "Hide answers") : "👁️ " + T("الإجابات", "Answers")}</button>` : ""}<button class="btn btn-p btn-lg" ${i >= n ? "disabled" : ""} onclick="ab280.go(${i + 1})">${T("التالي", "Next")} ${AR() ? "←" : "→"}</button></div>${pre}</div>`, 1100); }

  window.ab280 = {
    lv(k) { S().L = k; render(); },
    open(tag) { const s = S(); s.u = tag; const last = (P()["last:" + tag]) || 1; s.s = last; s.ans = 0; render(); window.scrollTo({ top: 0 }); },
    close() { const s = S(); s.u = null; render(); },
    go(i) { const s = S(); const u = unit(); if (!u) return; s.s = Math.max(1, Math.min(u.n, i)); s.ans = 0; const p = P(); p["last:" + u.tag] = s.s; saveP(p); try { document.getElementById("au280") && document.getElementById("au280").pause(); } catch (e) {} render(); const st = document.querySelector(".st280"); st && st.scrollIntoView({ block: "start", behavior: "smooth" }); },
    ans() { const s = S(); s.ans = s.ans ? 0 : 1; render(); },
    tap(e) { const r = e.currentTarget.getBoundingClientRect(); const x = (e.clientX - r.left) / r.width; const s = S(); if (x > .7) ab280.go(s.s + (AR() ? -1 : 1)); else if (x < .3) ab280.go(s.s + (AR() ? 1 : -1)); }
  };
  document.addEventListener("keydown", e => { if (state.route !== "abyb280" || !unit() || /INPUT|SELECT|TEXTAREA/.test((e.target || {}).tagName || "")) return; const s = S(); if (e.key === "ArrowLeft") ab280.go(s.s + (AR() ? 1 : -1)); else if (e.key === "ArrowRight") ab280.go(s.s + (AR() ? -1 : 1)); else if (e.key === " " && document.getElementById("au280")) { e.preventDefault(); const a = document.getElementById("au280"); a.paused ? a.play() : a.pause(); } });

  try { if ((typeof PAGES16 !== "undefined" && Array.isArray(PAGES16)) && !PAGES16.includes("abyb280")) PAGES16.push("abyb280"); } catch (e) {}
  try { if (typeof HASH_ROUTES !== "undefined" && !HASH_ROUTES.includes("abyb280")) HASH_ROUTES.push("abyb280"); } catch (e) {}
  if (/^#\/abyb280/.test(location.hash)) state.route = "abyb280";
  const _r = render; render = function () { if (state.route === "abyb280" && FF("v280.book")) { const app = document.getElementById("app"); if (!app) return; let b; try { b = page(); } catch (e) { console.error(e); b = `<div class="card">${E(e.message)}</div>`; } app.innerHTML = renderHeader() + b + renderFooter() + (typeof renderAIWidget === "function" ? renderAIWidget() : ""); return; } return _r.apply(this, arguments); };
  if (typeof DOMAINS === "function") { const _D = DOMAINS; DOMAINS = function () { const ds = _D.apply(this, arguments); try { if (FF("v280.book")) { const a = ds.find(d => d.k === "arabic"); if (a && a.tools && !a.tools.some(t => /abyb280/.test(t[2]))) a.tools.splice(1, 0, ["📘", T("العربية بين يديك — الكتاب بالصوت الأصلي", "Al-Arabiyyah Bayna Yadayk — book with original audio"), "go16('abyb280')", ""]); } } catch (e) {} return ds; }; }
  css(`.ug280{display:grid;grid-template-columns:repeat(auto-fill,minmax(240px,1fr));gap:.7rem;margin-top:.6rem}
  .uc280{position:relative;display:flex;flex-direction:column;gap:.25rem;text-align:start;padding:.8rem .9rem 1rem;border-radius:18px;border:1px solid var(--line);background:var(--card);cursor:pointer;color:inherit;overflow:hidden}.uc280 b{font-family:'Amiri',serif;font-size:1.25rem}.uc280.done{border-color:#16a34a}
  .n280{width:2rem;height:2rem;border-radius:50%;display:grid;place-items:center;background:#b45309;color:#fff;font-weight:800}.uc280 i{position:absolute;bottom:0;inset-inline-start:0;height:4px;width:var(--p);background:#16a34a}
  .bar280{display:flex;gap:.5rem;align-items:center;justify-content:space-between;flex-wrap:wrap;margin-bottom:.5rem}
  .st280{border-radius:14px;overflow:hidden;box-shadow:0 6px 20px -10px rgba(0,0,0,.35);background:#fff;cursor:pointer;user-select:none}.im280{display:block;width:100%;height:auto}
  .au280{width:100%;margin-top:.6rem}.nav280{display:flex;gap:.5rem;justify-content:space-between;margin-top:.7rem;flex-wrap:wrap}.nav280 .btn{flex:1;min-width:8rem}`);
})();
