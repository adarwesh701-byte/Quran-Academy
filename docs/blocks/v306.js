/* ================= v306: لينكات الأقسام مقروءة (Library_Quran بدل Library_<uuid>) + حل اللينك عند الفتح المباشر ================= */
(function () {
  if (window.__v306) return; window.__v306 = 1;
  const LSK = "itqan_libslug306"; let M = { i2s: {}, s2i: {} };
  try { M = JSON.parse(localStorage.getItem(LSK) || "") || M; } catch (e) {}
  const UU = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  const slugify = s => String(s || "").trim().replace(/[^\p{L}\p{N}\s-]/gu, "").replace(/\s+/g, "-").replace(/-+/g, "-").replace(/^-|-$/g, "").split("-").map(w => /^[a-z]/.test(w) ? w.charAt(0).toUpperCase() + w.slice(1) : w).join("-");
  const build = () => { try { const secs = sectionsData(); if (!Array.isArray(secs) || !secs.length) return false; const i2s = {}, s2i = {}; const byId = {}; secs.forEach(s => byId[s.id] = s);
    secs.forEach(s => { const t = s.title || {}; let sl = slugify(t.en || t.ar || ""); if (!sl) return; if (s2i[sl.toLowerCase()] && s2i[sl.toLowerCase()] !== s.id) { const p = byId[s.parent_id]; const ps = p ? slugify((p.title || {}).en || (p.title || {}).ar || "") : ""; sl = ps ? ps + "-" + sl : sl; let n = 2, b = sl; while (s2i[sl.toLowerCase()] && s2i[sl.toLowerCase()] !== s.id) sl = b + "-" + n++; } i2s[s.id] = sl; s2i[sl.toLowerCase()] = s.id; });
    M = { i2s, s2i }; localStorage.setItem(LSK, JSON.stringify(M)); return true; } catch (e) { return false; } };
  window.libSlug306 = { id2s: id => UU.test(id) ? (M.i2s[id] || null) : null, s2id: s => UU.test(s) ? s : (M.s2i[String(s).toLowerCase()] || null), build };
  let n = 0; const iv = setInterval(() => { if (build() || ++n > 40) clearInterval(iv); }, 1000);
  /* فتح قسم باسمه المقروء لو لسه البيانات ما اتحمّلتش */
  const _lo = window.libOpen || libOpen;
  libOpen = function (id) { if (id && !UU.test(id)) { const real = M.s2i[String(id).toLowerCase()]; if (real) id = real; else { let t = 0; const w = setInterval(() => { build(); const r = M.s2i[String(id).toLowerCase()]; if (r || ++t > 30) { clearInterval(w); if (r) _lo(r); } }, 500); } } return _lo.call(this, id); };
  /* حذف الأقسام الثلاثة (الجملة / المفتاح الصوتي / حركته السحرية) من كل المقامات الأساسية والفرعية */
  (function () {
    const d = document; if (!d.getElementById("css306k")) d.head.insertAdjacentHTML("beforeend", "<style id='css306k'>.mqk86g{display:none!important}</style>");
    let t = 0; new MutationObserver(() => { if (t) return; t = setTimeout(() => { t = 0; d.querySelectorAll(".mqk86g").forEach(x => x.remove()); }, 40); }).observe(d.body, { childList: true, subtree: true });
  })();
  /* عنوان التبويب احترافي ويعبّر عن الصفحة (بدل «Itqan Academy» ثابت) */
  (function () {
    const d = document; let t = 0;
    const brand = () => { try { return state.lang === "ar" ? "أكاديمية إتقان" : "Itqan Academy"; } catch (e) { return "Itqan Academy"; } };
    const clean = s => String(s || "").replace(/[\p{Extended_Pictographic}\uFE0F\u200d]/gu, "").replace(/\s+/g, " ").trim().slice(0, 70);
    const set = () => { try { const h = [...d.querySelectorAll("#app h1, #app .stitle, #app h2, #app h3")].find(e => !e.closest("header, .hdr, button, .hlpq, .modal, #cm302") && clean(e.textContent).length > 2); let x = clean(h && h.textContent); if (!x) { const sg = (window.url288 && location.pathname.length > 1) ? decodeURIComponent(location.pathname.slice(1)).replace(/[_-]+/g, " ") : ""; x = clean(sg); } const full = x && x !== brand() ? x + " | " + brand() : brand(); if (d.title !== full) d.title = full; } catch (e) {} };
    new MutationObserver(() => { clearTimeout(t); t = setTimeout(set, 250); }).observe(d.body, { childList: true, subtree: true });
    addEventListener("popstate", () => setTimeout(set, 300)); set();
  })();
  /* ===== المُوالف/كاشف المقام: أكثر حساسية وثباتًا (فلتر وسيط + تصحيح قفزات الأوكتاف) + العرض بعرض الصفحة ===== */
  (function () {
    const buf = []; let lastT = 0;
    const med = a => { const s = a.slice().sort((x, y) => x - y); return s[s.length >> 1]; };
    if (typeof tnShow === "function" && !tnShow.__s306) {
      const _t = tnShow;
      tnShow = function (f) {
        try {
          if (f > 0) {
            const now = performance.now(); if (now - lastT > 1200) buf.length = 0; lastT = now;
            if (buf.length >= 3) { const m = med(buf); const r = f / m; if (r > 1.9 && r < 2.1) f = f / 2; else if (r > 0.47 && r < 0.53) f = f * 2; else if (r > 1.45 || r < 0.69) { /* قفزة غير منطقية: تجاهل الإطار */ buf.push(m); f = m; } }
            buf.push(f); if (buf.length > 7) buf.shift();
            f = med(buf.slice(-5));
          }
        } catch (e) {}
        return _t.call(this, f);
      };
      tnShow.__s306 = 1;
    }
    document.head.insertAdjacentHTML("beforeend", "<style id='css306t'>#tn278,.t278{width:100%!important;max-width:none!important;box-sizing:border-box}#tn278 .r278,#tn278 .s278{white-space:normal;overflow-wrap:anywhere}#tn_cv{width:100%!important;max-width:100%!important;height:auto!important}#tn_cv:not(#z){display:block}</style>");
  })();

  /* ===== «التحويلات» في الرئيسية داخل قسم المقامات: تظهر للمالك فقط، وهو يختار يرفعها للجميع ===== */
  (function () {
    const d = document; const K = "tahwilHome306";
    const AR = () => { try { return state.lang === "ar"; } catch (e) { return true; } };
    const own = () => { try { return realRole() === "owner"; } catch (e) { return false; } };
    const on = () => { try { return setv(K, false) === true; } catch (e) { return false; } };
    window.tahwil306 = { async toggle() { try { state.settings = Object.assign({}, state.settings || {}, { [K]: !on() }); await saveSetting16(K, on()); toast(on() ? (AR() ? "اتنشرت للجميع ✅" : "Published to everyone ✅") : (AR() ? "رجعت مخفية عن الطلاب" : "Hidden from students")); } catch (e) { try { toast(String(e.message || e), true); } catch (x) {} } render(); } };
    const inject = () => {
      try {
        if (state.route !== "home") return; const on1 = d.querySelector("#tr275 .tb275 button.on"); if (!on1 || !/'maqamat'/.test(on1.getAttribute("onclick") || "")) return;
        const g = d.querySelector("#tr275 .gr275"); if (!g || g.querySelector(".t306")) return; if (!on() && !own()) return;
        const lbl = AR() ? "التحويل بين المقامات" : "Modulation between maqamat";
        g.insertAdjacentHTML("beforeend", `<div class="cd275 t306" style="--c:#6d28d9"><div class="ch275" onclick="go16('tahwil')"><span class="ci275">🔀</span><b class="notr">${lbl}</b>${own() ? `<small onclick="event.stopPropagation();tahwil306.toggle()" style="cursor:pointer;background:${on() ? "#dcfce7" : "#fef3c7"};padding:.1rem .5rem;border-radius:999px">${on() ? (AR() ? "منشورة ✓" : "Published ✓") : (AR() ? "مسودة — اضغط للنشر" : "Draft — tap to publish")}</small>` : ""}<i>◂</i></div></div>`);
      } catch (e) {}
    };
    let t = 0; new MutationObserver(() => { clearTimeout(t); t = setTimeout(inject, 80); }).observe(d.body, { childList: true, subtree: true }); inject();
  })();
})();
