/* ================= v272: شرح التجويد بالإنجليزي من الكتب الإنجليزي اللي على الموقع (tjb_en.json) — لما الصفحة إنجليزي و«Show the full explanation» مفتوح: الباب المناسب من الكتابين مع بعض، والكلام المتكرر بيتشال، ومن غير أسماء كتب · وبالعربي الشرح زي ما هو من الكتاب العربي ================= */
(function () {
  const FF = k => { try { return window.ff254(k); } catch (e) { return true; } };
  const AR = () => state.lang === "ar";
  const E = s => { try { return esc(s); } catch (e) { return String(s == null ? "" : s); } };
  if (typeof tjxBlock !== "function") return;
  const MAP = { nun: [/Noon Sakina|Nūn Saakinah|Noon Saakinah/i], mim: [/Meem Saakinah|Meem Sakina/i], ghunna: [/Mushaddadah|Mushaddad/i], lam: [/Laam Saakinah|Lam Sakina/i], madd: [/Prolongation|Stretching/i], qalqala: [/Qalqala/i], ra: [/Heaviness|Tafkheem/i], makharij: [/Makhaarij/i], sifat: [/Phonetic Characteristics|Attributes of the Letters/i], waqf: [/Waqf|Stopping/i], mithl: [/Identical Letters|Idghaam|Coinciding/i], lazim: [/Prolongation|Stretching/i] };
  let EN = null, loading = false;
  function load() { if (EN || loading) return; loading = true; fetch("tjb_en.json?v=" + (typeof UI_VERSION !== "undefined" ? UI_VERSION : "")).then(r => r.json()).then(j => { EN = (j.books || []); render(); }).catch(() => { loading = false; }); }
  const norm = s => String(s || "").toLowerCase().replace(/[^a-z]/g, "").slice(0, 70);
  function enDetail(id) { const re = MAP[id]; if (!re || !EN) return ""; const seen = new Set(); let out = "";
    EN.forEach(b => (b.chs || []).filter(c => re.some(r => r.test(c.t || ""))).forEach(c => { let body = "";
      (c.items || []).forEach(it => { const t = (it.h || it.t || "").replace(/(?<=[a-zA-Zāīūḥ\)])\d{1,2}(?=[\s.,;:)])/g, "").trim(); if (!t) return; const k = norm(t); if (k.length > 20 && seen.has(k)) return; seen.add(k); body += it.h ? `<h4 class="tjbh">${E(t)}</h4>` : `<div class="tjbi">${E(t)}</div>`; });
      if (body) out += `<section class="en272"><h3>${E(c.t)}</h3>${body}</section>`; }));
    return out; }
  window.t272 = { set(j) { EN = j.books || []; } };
  const _b = tjxBlock; tjxBlock = function (id) { const h = _b.apply(this, arguments); if (!FF("v272.en") || AR() || state.tjxD !== id) return h; if (!EN) { load(); return h; } const d = enDetail(id); if (!d) return h;
    return h.replace(/<div class="card d270">[\s\S]*?(?=<div class="card q270)/, `<div class="card d270 notr" lang="en">${d}</div>`); };
  document.head.insertAdjacentHTML("beforeend", `<style>.en272 h3{margin:.8rem 0 .3rem}.en272+.en272{border-top:1px dashed var(--line);padding-top:.4rem}</style>`);
})();
