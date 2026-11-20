/* ================= v279: طلب المالك 20/11 (5) — (1) تسجيل صوت الجهاز/الكمبيوتر للمالك بس (والمعلمين لو المالك سمحلهم من الإعدادات) — الطالب بيشوف تسجيل المايك بس في المنصة كلها · (2) جنب أي خانة رفع صوت في المنصة زرار «🎙️ سجّل بالمايك» (التسجيل بيتحط في الخانة نفسها ويترفع بنفس الطريقة) · (3) وضع «رتّب المحتوى» في الرئيسية: أسماء الفولدرات والمجموعات مابقتش بتتكسّر حرف حرف — أزرار التحكم بقت في سطر لوحدها ================= */
(function () {
  const FF = k => { try { return window.ff254(k); } catch (e) { return true; } };
  const AR = () => state.lang === "ar"; const T = (a, e) => AR() ? a : e;
  const css = s => document.head.insertAdjacentHTML("beforeend", `<style>${s}</style>`);
  const isOwner = () => { try { return realRole() === "owner"; } catch (e) { return false; } };
  const isTeacher = () => { try { return realRole() === "teacher" || role() === "teacher"; } catch (e) { return false; } };
  const sysOK = () => { if (!FF("v279.sys")) return true; if (isOwner()) return true; const s = setv("sysrec279", null) || { teachers: true }; const uid = state.auth && state.auth.user && state.auth.user.id; return isTeacher() && (s.teachers === true || (Array.isArray(s.ids) && s.ids.includes(uid))); };

  /* ---------- (1) صوت الجهاز للمالك بس ---------- */
  const SYS_RX = /صوت (الجهاز|الكمبيوتر|السيستم|النظام)|system (audio|sound)|computer (audio|sound)|device audio/i;
  function hideSys() { if (sysOK()) { document.body.classList.remove("nosys279"); return; } document.body.classList.add("nosys279");
    try { if (localStorage.getItem("itqan_src179") === "sys") { localStorage.setItem("itqan_src179", "mic"); if (window.__sys179) { window.__sys179.getTracks().forEach(t => t.stop()); window.__sys179 = null; } } } catch (e) {}
    document.querySelectorAll("#app button, #app label, #app .chip, body > div button").forEach(b => { if (b.dataset.s279) return; const oc = b.getAttribute("onclick") || ""; if (/src179\('sys'\)|sysRec|captureSys|getDisplayMedia/.test(oc) || (SYS_RX.test(b.textContent || "") && !/مشاركة الشاشة|share screen/i.test(b.textContent || ""))) { b.dataset.s279 = 1; b.classList.add("sys279"); } }); }
  if (navigator.mediaDevices && navigator.mediaDevices.getDisplayMedia) { const _g = navigator.mediaDevices.getDisplayMedia.bind(navigator.mediaDevices);
    navigator.mediaDevices.getDisplayMedia = function (c) { const roomShare = typeof RM !== "undefined" && RM && RM.joined; if (!sysOK() && !roomShare && c && c.audio) { toast(T("تسجيل صوت الجهاز متاح للمالك فقط — سجّل صوتك أنت بالمايك.", "Recording device audio is for the owner only — record your own voice with the microphone."), true); return Promise.reject(new DOMException("blocked", "NotAllowedError")); } return _g(c); }; }
  css(`body.nosys279 .sys279{display:none!important}`);

  /* إعداد المالك: يسمح للمعلمين */
  if (typeof ownerSettings === "function") { const _os = ownerSettings; ownerSettings = function () { const s = setv("sysrec279", null) || { teachers: true }; return `<div class="card" style="border:2px solid #7c3aed;margin-bottom:1rem"><h3>🖥️ ${T("تسجيل صوت الجهاز (صوت الكمبيوتر)", "Recording device audio")}</h3><p class="sm muted">${T("الطالب يسجّل صوته بالمايك فقط. تسجيل صوت الجهاز لك أنت، ويمكنك فتحه للمعلمين.", "Students record only their own voice with the mic. Device audio is yours; you can open it to teachers.")}</p><label class="row" style="gap:.4rem;align-items:center"><input type="checkbox" ${s.teachers ? "checked" : ""} onchange="sys279(this.checked)"> ${T("اسمح لكل المعلمين بتسجيل صوت الجهاز", "Allow all teachers to record device audio")}</label></div>` + _os.apply(this, arguments); }; }
  window.sys279 = v => { const s = Object.assign({}, setv("sysrec279", null) || {}, { teachers: !!v }); saveSetting16("sysrec279", s); };

  /* ---------- (2) «سجّل بالمايك» جنب أي رفع صوت ---------- */
  let REC = null;
  function micBtns() { if (!FF("v279.mic")) return; document.querySelectorAll('#app input[type=file], body > div input[type=file]').forEach(inp => { const acc = (inp.getAttribute("accept") || "").toLowerCase(); if (!/audio|\.mp3|\.m4a|\.wav|\.ogg/.test(acc)) return; if (inp.dataset.m279) return; inp.dataset.m279 = 1; const id = inp.id || (inp.id = "f279_" + Math.random().toString(36).slice(2, 8));
      inp.insertAdjacentHTML("afterend", `<button type="button" class="btn btn-o btn-sm mic279" data-for="${id}" onclick="mic279(this)">🎙️ ${T("سجّل بالمايك", "Record with mic")}</button>`); }); }
  window.mic279 = async btn => { const inp = document.getElementById(btn.dataset.for); if (!inp) return;
    if (REC && REC.btn === btn) { try { REC.mr.stop(); } catch (e) {} return; }
    if (REC) { try { REC.mr.stop(); } catch (e) {} }
    let s; try { s = await navigator.mediaDevices.getUserMedia({ audio: true }); } catch (e) { return toast(T("اسمح للموقع باستخدام المايك", "Allow microphone access"), true); }
    const mime = MediaRecorder.isTypeSupported("audio/webm;codecs=opus") ? "audio/webm;codecs=opus" : (MediaRecorder.isTypeSupported("audio/mp4") ? "audio/mp4" : ""); const mr = new MediaRecorder(s, mime ? { mimeType: mime } : undefined); const ch = []; const t0 = Date.now();
    REC = { mr, btn }; btn.classList.add("on279"); const tick = setInterval(() => { btn.textContent = "⏹️ " + T("إيقاف", "Stop") + " · " + Math.round((Date.now() - t0) / 1000) + "s"; }, 500);
    mr.ondataavailable = e => e.data && e.data.size && ch.push(e.data);
    mr.onstop = () => { clearInterval(tick); s.getTracks().forEach(t => t.stop()); REC = null; btn.classList.remove("on279"); btn.textContent = "🎙️ " + T("سجّل مرة أخرى", "Record again"); const type = (mr.mimeType || "audio/webm").split(";")[0]; const ext = type.includes("mp4") ? "m4a" : "webm"; const f = new File(ch, `recording-${new Date().toISOString().slice(0, 19).replace(/[:T]/g, "-")}.${ext}`, { type });
      try { const dt = new DataTransfer(); dt.items.add(f); inp.files = dt.files; inp.dispatchEvent(new Event("change", { bubbles: true })); inp.dispatchEvent(new Event("input", { bubbles: true })); } catch (e) {}
      let pv = btn.nextElementSibling; if (!pv || !pv.classList.contains("pv279")) { btn.insertAdjacentHTML("afterend", `<audio class="pv279" controls></audio>`); pv = btn.nextElementSibling; } pv.src = URL.createObjectURL(f); toast(T("✅ التسجيل جاهز — اضغط رفع/حفظ كالمعتاد", "✅ Recording ready — press upload/save as usual")); };
    mr.start(); };
  css(`.mic279{margin:.3rem .3rem 0 0}.mic279.on279{background:#dc2626!important;color:#fff!important;border-color:#dc2626!important;animation:p279 1.2s infinite}@keyframes p279{50%{opacity:.7}}.pv279{display:block;width:100%;max-width:360px;margin-top:.3rem}`);

  /* ---------- (3) وضع الترتيب في الرئيسية: الأسماء ماتتكسّرش ---------- */
  css(`.tr275 .fh276{flex-wrap:wrap}.tr275 .fh276>b{flex:1 1 55%;min-width:8rem;white-space:normal;word-break:normal}.tr275 .fh276 .te275{flex:1 1 100%;order:9;justify-content:flex-start}
  .tr275 .ch275{flex-wrap:wrap}.tr275 .ch275>b{flex:1 1 55%;min-width:8rem}.tr275 .ce275{justify-content:flex-start}
  .tr275 .te275 .tabox,.tr275 .ce275 .tabox{max-width:12rem;font-size:.8rem;padding:.2rem .4rem}
  .tr275 .ti275 .te275{flex-wrap:wrap}.tr275 .ti275 .te275 select{max-width:100%;flex:1 1 12rem}`);

  const _r = render; render = function () { const o = _r.apply(this, arguments); try { hideSys(); micBtns(); } catch (e) {} return o; };
  let q = 0; new MutationObserver(() => { if (q) return; q = 1; requestAnimationFrame(() => { q = 0; try { hideSys(); micBtns(); } catch (e) {} }); }).observe(document.documentElement, { childList: true, subtree: true });
})();
