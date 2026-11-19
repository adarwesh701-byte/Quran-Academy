/* ================= v266: (1) مفيش لينكات يوتيوب على المنصة (N4): الأناشيد والأذان والابتهالات اللي كانت لينكات بس اتأرشفت من الداتابيز (58 — نسخة منها في contents_links_backup266)، وأي فيديو أو لينك يوتيوب جوه المحتوى مابيظهرش لغير المالك، وخانة «لينك يوتيوب» في الإضافة عليها تنبيه إن الملف نفسه بس هو اللي بيظهر · (2) كل المشايخ المتاحين لكل رواية: الموقع بيجيب من mp3quran كل مصحف للرواية دي ويضيفه على القايمة (رجع الشيخ عبد الرشيد صوفي في كل رواياته) ================= */
(function () {
  const FF = k => { try { return window.ff254(k); } catch (e) { return true; } };
  const AR = () => state.lang === "ar"; const T = (a, e) => AR() ? a : e;
  const css = s => document.head.insertAdjacentHTML("beforeend", `<style>${s}</style>`);
  const own = () => { try { return realRole() === "owner" && !state.preview; } catch (e) { return false; } };

  /* ---------- 1) اليوتيوب ---------- */
  const YT = /youtube\.com\/(watch|embed|shorts|live)|youtu\.be\/|youtube-nocookie\.com\/embed/i;
  function hideYT() { if (!FF("v266.links")) return; const app = document.getElementById("app"); if (!app) return;
    app.querySelectorAll("iframe[src], a[href]").forEach(el => { if (el.__y266) return; const u = el.getAttribute("src") || el.getAttribute("href") || ""; if (!YT.test(u) || el.closest("footer, .ftr, .social")) return; el.__y266 = 1;
      if (own()) { el.classList.add("y266o"); el.title = T("لينك يوتيوب — مش ظاهر للطلاب. ارفع الملف نفسه.", "YouTube link — hidden from students. Upload the file itself."); return; }
      el.style.display = "none"; });
    if (own()) app.querySelectorAll('input[placeholder*="youtube"], input[placeholder*="youtu.be"]').forEach(i => { if (i.__y266) return; i.__y266 = 1; i.insertAdjacentHTML("afterend", `<div class="xs" style="color:#b45309;margin-top:.2rem">⚠️ ${T("لينكات يوتيوب مابتظهرش على المنصة — ارفع الملف (صوت/فيديو) نفسه.", "YouTube links don't show on the platform — upload the audio/video file itself.")}</div>`); }); }
  window.hideYT266 = hideYT;
  const _r = render; render = function () { const o = _r.apply(this, arguments); try { hideYT(); } catch (e) {} return o; };
  let t0 = 0; new MutationObserver(() => { clearTimeout(t0); t0 = setTimeout(() => { try { hideYT(); } catch (e) {} }, 150); }).observe(document.getElementById("app") || document.body, { childList: true, subtree: true });

  /* ---------- 2) كل المشايخ لكل رواية ---------- */
  const N = s => String(s || "").replace(/[ً-ْٰـ]/g, "").replace(/[أإآٱ]/g, "ا").replace(/ى/g, "ي").replace(/ة/g, "ه").replace(/\s+/g, " ").trim();
  async function merge() { if (!FF("v266.reciters") || typeof QRR === "undefined" || merge.done) return; merge.done = 1;
    let j = null; try { j = await fetch("https://mp3quran.net/api/v3/reciters?language=ar").then(r => r.json()); } catch (e) { merge.done = 0; return; }
    const M = (j && j.reciters || []).flatMap(r => (r.moshaf || []).map(m => ({ name: r.name, mo: N(m.name), raw: m.name, server: String(m.server || "").replace(/^http:/, "https:") })));
    let added = 0;
    QRR.forEach(row => { const key = N(row[2]); const list = row[5] = Array.isArray(row[5]) ? row[5] : []; const have = new Set(list.map(x => String(x[1]).replace(/\/+$/, "/")));
      M.filter(m => m.mo.includes(key) && m.server).forEach(m => { const s = m.server.replace(/\/*$/, "/"); if (have.has(s)) return; have.add(s); const tag = /مجود/.test(m.raw) ? T(" (مجوّد)", " (mujawwad)") : ""; list.push([m.name + tag, s]); added++; }); });
    if (added) { try { render(); } catch (e) {} } }
  setTimeout(merge, 1500);
  const _g = go16; go16 = function (r) { if (/^qiraat/.test(r)) setTimeout(merge, 50); return _g.apply(this, arguments); };

  css(`.y266o{outline:2px dashed #f59e0b;outline-offset:2px}`);
})();
