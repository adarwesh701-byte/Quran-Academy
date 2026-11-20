/* ================= v281: طلبات المالك 20/11 (6) — (1) سهم «افتح/اقفل الشريط» اتشال · (2) لو الطالب أخفى كارت اللوجو يفضل مخفي طول الجلسة · (3) الرجوع: الرابع يرجّعك لنفس المكان اللي جيت منه بالظبط (والرئيسية بنفس السكرول)، وتسيب الاختبار ترجع للمكان اللي قبله · (4) أسئلة «حدد مستواك» بالإنجليزي: السؤال إنجليزي والكلمة العربي جوّاه، والاختيارات اللي مصطلحات (نحو/صرف/بلاغة) جنبها الفرانكو والمعنى · (5) بعد كل إجابة (صح أو غلط) الشرح بلغة الطالب · (6) اختبار تحديد المستوى بيقف لوحده لو الغلط عدّى النص (مالوش لازمة يكمّل) · (7) صوت الجهاز مسموح للمعلمين افتراضيًا (الطالب مايك بس) ================= */
(function () {
  const FF = k => { try { return window.ff254(k); } catch (e) { return true; } };
  const AR = () => state.lang === "ar"; const T = (a, e) => AR() ? a : e;
  const E = s => { try { return esc(s); } catch (e) { return String(s == null ? "" : s); } };
  const css = s => document.head.insertAdjacentHTML("beforeend", `<style>${s}</style>`);
  const SS = (k, v) => { try { if (v === undefined) return sessionStorage.getItem(k); sessionStorage.setItem(k, v); } catch (e) { return null; } };

  /* (1) */ css(`html body #rope268{display:none!important}`);
  /* (2) */ if (SS("logo281")) document.documentElement.classList.add("lg281");
  document.addEventListener("click", e => { if (e.target.closest && e.target.closest(".x274")) { SS("logo281", "1"); document.documentElement.classList.add("lg281"); } }, true);
  css(`html.lg281 #fl268{display:none!important}`);

  /* (3) الرجوع لنفس المكان */
  const key = () => location.hash || "#/home";
  const savePos = () => { try { const m = JSON.parse(SS("pos281") || "{}"); m[key()] = scrollY; SS("pos281", JSON.stringify(m)); } catch (e) {} };
  document.addEventListener("click", e => { const b = e.target.closest && e.target.closest("[onclick*='go16'],[onclick*='navigate'],[onclick*='libGo'],[onclick*='t260.open'],[onclick*='tr277.lib'],a[href^='#/']"); if (b) savePos(); }, true);
  addEventListener("popstate", () => { const h = (location.hash || "").replace(/^#\/?/, ""); if (!h && state.route !== "home") { state.route = "home"; state.pageArg = null; try { render(); } catch (e) {} }
    try { const m = JSON.parse(SS("pos281") || "{}"); const y = m[key()]; if (y != null) { let n = 0; const go = () => { scrollTo(0, y); if (++n < 6 && Math.abs(scrollY - y) > 30) setTimeout(go, 120); }; setTimeout(go, 60); } } catch (e) {} });
  if (window.pl265) { const _q = pl265.quit; pl265.quit = function () { if (!confirm(T("تخرج من الاختبار؟", "Quit the test?"))) return; state.pl265 = null; state.fuQ = null; try { clearInterval(fuAuto.t); } catch (e) {} if (history.length > 1) history.back(); else navigate("home"); }; }

  /* (4)+(5) أسئلة المستوى بالإنجليزي + الشرح */
  const FU = {
"معنى «كِتَاب»:":{"e":"Meaning of «كِتَاب»:","x":["«كِتَاب» تعني book.","«كِتَاب» means book."]},
"الحرف الأول في «مَدْرَسَة»:":{"e":"The first letter of «مَدْرَسَة»:","x":["أول حرف في «مَدْرَسَة» هو الميم (م).","«مَدْرَسَة» (school) starts with mīm (م)."]},
"«أنا طالب، وهي …»":{"e":"«أنا طالب، وهي …» — I am a (male) student, and she is …","o":{"طالبة":"female student","طالب":"male student","طلاب":"students","طالبان":"two students"},"x":["للمؤنث نزيد التاء المربوطة: طالب ← طالبة.","For a female we add tāʾ marbūṭa: طالب → طالبة."]},
"جمع «ولد»:":{"e":"Plural of «ولد» (boy):","o":{"أولاد":"boys (plural)","ولدان":"two boys (dual)","والد":"father","ولادة":"birth"},"x":["جمع «وَلَد» جمع تكسير: «أولاد».","The plural of وَلَد is the broken plural أولاد."]},
"«هذا ___ كبير»":{"e":"«هذا ___ كبير» — This is a big house (fill in):","x":["بعد «هذا» يأتي الخبر مرفوعًا منوّنًا: بيتٌ.","After هذا the predicate is nominative with tanwīn: بيتٌ."]},
"«ذهبتُ ___ المسجد»":{"e":"«ذهبتُ ___ المسجد» — I went ___ the mosque:","o":{"إلى":"to","في":"in","على":"on","عن":"about / from"},"x":["حرف الجر «إلى» يدل على الاتجاه: ذهبتُ إلى المسجد.","إلى shows direction: I went to the mosque."]},
"ماضي «يكتب»:":{"e":"Past tense of «يكتب» (he writes):","o":{"كتب":"he wrote (past)","اكتب":"write! (command)","كاتب":"writer","مكتوب":"written"},"x":["الماضي من «يكتب» هو «كَتَبَ».","The past of يكتب is كَتَبَ."]},
"«هؤلاء ___»":{"e":"«هؤلاء ___» — These are ___ (fill in):","x":["«هؤلاء» للجمع، فنستعمل الجمع: طلابٌ.","هؤلاء is plural, so we use the plural: طلابٌ."]},
"ضد «كبير»:":{"e":"Opposite of «كبير» (big):","o":{"صغير":"small","طويل":"tall / long","جميل":"beautiful","قديم":"old"},"x":["ضد «كبير» هو «صغير».","The opposite of كبير (big) is صغير (small)."]},
"«أين ___ ؟» (سؤال عن مكان الكتاب)":{"e":"«أين ___ ؟» — Where is the book?","x":["بعد «أين» يأتي المبتدأ مرفوعًا: أين الكتابُ؟","After أين the subject is nominative: أين الكتابُ؟"]},
"«الطالبان ___ الدرس»":{"e":"«الطالبان ___ الدرس» — The two students ___ the lesson:","x":["المثنى المذكر يأخذ «يكتبان».","For two males the verb is يكتبان."]},
"الفعل المضارع المجزوم: «لم ___»":{"e":"Jussive present verb (majzūm) after «لم»:","x":["«لم» تجزم المضارع فيُسكَّن آخره: لم يذهبْ.","لم makes the present verb majzūm (sukūn): لم يذهبْ."]},
"إعراب «محمدٌ» في «جاء محمدٌ»:":{"e":"The iʿrāb (إعراب – grammatical case) of «محمدٌ» in «جاء محمدٌ»:","o":{"فاعل مرفوع":"fāʿil marfūʿ – nominative subject","مفعول به":"mafʿūl bihi – object","مبتدأ":"mubtadaʾ – topic","مجرور":"majrūr – genitive"},"x":["«محمدٌ» قام بالفعل «جاء» فهو فاعل مرفوع بالضمة.","محمدٌ did the action of جاء, so he is the fāʿil (subject), nominative with ḍamma."]},
"«رأيتُ ___ مجتهدين»":{"e":"«رأيتُ ___ مجتهدين» — I saw the hard-working teachers:","x":["المفعول به جمع مذكر سالم منصوب بالياء: المعلمين.","The object (sound masculine plural) takes -īn: المعلمين."]},
"الأمر من «قرأ» للمفرد المذكر:":{"e":"Command (amr) of «قرأ» (to read) for one male:","o":{"اقرأ":"read! (command)","يقرأ":"he reads","قارئ":"reader","قراءة":"reading"},"x":["الأمر من «قرأ»: اقرأْ.","The command of قرأ is اقرأ (read!)."]},
"«كان الجوُّ ___»":{"e":"«كان الجوُّ ___» — The weather was beautiful:","x":["«كان» تنصب الخبر: كان الجوُّ جميلًا.","Kāna makes its predicate accusative: جميلًا."]},
"«إنَّ العلمَ ___»":{"e":"«إنَّ العلمَ ___» — Indeed knowledge is light:","x":["«إنَّ» ترفع الخبر: إنَّ العلمَ نورٌ.","Inna leaves its predicate nominative: نورٌ."]},
"الممنوع من الصرف:":{"e":"Which word is mamnūʿ min aṣ-ṣarf (ممنوع من الصرف – diptote, takes no tanwīn)?","x":["«مساجد» على صيغة منتهى الجموع فهي ممنوعة من الصرف.","مساجد follows the ultimate-plural pattern, so it is a diptote."]},
"«ما أجملَ السماءَ!» أسلوب:":{"e":"«ما أجملَ السماءَ!» is the style of:","o":{"تعجب":"taʿajjub – exclamation","استفهام":"istifhām – question","نفي":"nafy – negation","نداء":"nidāʾ – vocative"},"x":["«ما أفعلَ!» صيغة تعجب.","The pattern «ما أفعلَ!» is taʿajjub (exclamation)."]},
"المفعول لأجله في «قمتُ احترامًا للمعلم»:":{"e":"The mafʿūl li-ajlihi (مفعول لأجله – object of purpose) in «قمتُ احترامًا للمعلم»:","x":["«احترامًا» يبيّن سبب القيام.","احترامًا explains why I stood: out of respect."]},
"«ظننتُ الأمرَ ___»":{"e":"«ظننتُ الأمرَ ___» — I thought the matter easy:","x":["«ظنّ» تنصب مفعولين: الأمرَ سهلًا.","Ẓanna takes two objects in the accusative: الأمرَ سهلًا."]},
"الحال في «جاء الطالبُ مسرعًا»:":{"e":"The ḥāl (الحال – circumstantial word) in «جاء الطالبُ مسرعًا»:","x":["«مسرعًا» يبيّن هيئة الطالب وقت المجيء.","مسرعًا describes the student's state as he came: hurrying."]},
"نوع «لا» في «لا رجلَ في الدار»:":{"e":"Type of «لا» in «لا رجلَ في الدار»:","o":{"نافية للجنس":"nāfiya lil-jins – absolute negation","ناهية":"nāhiya – prohibition","عاطفة":"ʿāṭifa – conjunction","زائدة":"zāʾida – extra"},"x":["«لا» النافية للجنس تنفي الجنس كله وتنصب اسمها: لا رجلَ.","This لا negates the whole category and puts its noun in the accusative."]},
"التمييز في «اشتريتُ عشرين كتابًا»:":{"e":"The tamyīz (التمييز – specifying word) in «اشتريتُ عشرين كتابًا»:","x":["«كتابًا» يوضّح المعدود بعد «عشرين».","كتابًا specifies what was counted after عشرين."]},
"الصواب:":{"e":"Which sentence is correct?","x":["المبتدأ والخبر مثنى مرفوعان بالألف: الأستاذان مجتهدان.","Both the topic and predicate are dual and nominative (-ān)."]},
"في ﴿وَاشْتَعَلَ الرَّأْسُ شَيْبًا﴾ استعارة:":{"e":"In ﴿وَاشْتَعَلَ الرَّأْسُ شَيْبًا﴾ the istiʿāra (استعارة – metaphor) is:","o":{"مكنية":"makniyya – implicit","تصريحية":"taṣrīḥiyya – explicit","تشبيه بليغ":"tashbīh balīgh – eloquent simile","كناية":"kināya – metonymy"},"x":["شُبّه الشيب بالنار وحُذفت النار وبقي من لوازمها «اشتعل»، فهي مكنية.","Grey hair is likened to fire; the fire is omitted and only «ishtaʿala» remains — an implicit metaphor."]},
"وزن «استغفار»:":{"e":"The wazn (وزن – morphological pattern) of «استغفار»:","x":["«استغفار» على وزن «استفعال».","استغفار follows the pattern استفعال."]},
"«زيدٌ أسدٌ» تشبيه:":{"e":"«زيدٌ أسدٌ» is which tashbīh (تشبيه – simile)?","o":{"بليغ":"balīgh – eloquent (no particle, no shared quality)","تمثيلي":"tamthīlī – composite","مرسل مفصل":"mursal mufaṣṣal – explicit","ضمني":"ḍimnī – implicit"},"x":["حُذفت أداة التشبيه ووجه الشبه، فهو تشبيه بليغ.","Both the particle and the shared quality are omitted: tashbīh balīgh."]},
"إعراب «أيُّ» في «أيُّهم أفضلُ؟»:":{"e":"The iʿrāb (إعراب) of «أيُّ» in «أيُّهم أفضلُ؟»:","o":{"مبتدأ مرفوع":"mubtadaʾ marfūʿ – nominative topic","خبر":"khabar – predicate","فاعل":"fāʿil – subject","مفعول به":"mafʿūl bihi – object"},"x":["اسم الاستفهام «أيّ» هنا مبتدأ مرفوع، و«أفضلُ» خبره.","The question word أيّ is the topic (nominative); أفضلُ is its predicate."]},
"الجناس في «ويوم تقوم الساعة يقسم المجرمون ما لبثوا غير ساعة»:":{"e":"The jinās (الجناس – paronomasia) in this verse is:","o":{"تام":"tāmm – complete","ناقص":"nāqiṣ – incomplete","طباق":"ṭibāq – antithesis","مقابلة":"muqābala – contrast"},"x":["«الساعة» الأولى القيامة والثانية الزمن، واتفقا لفظًا تمامًا: جناس تام.","«as-sāʿa» first means the Hour, then a period of time — identical words: complete jinās."]}
}
;
  function prep() { const z = state.fuQ; if (!z || !z.pl265 || !z.qs) return 0; let ch = 0;
    z.qs.forEach(q => { if (q.k !== "mcq265") return; if (!q.ar281) { q.ar281 = q.t; q.te281 = q.te || ""; } const f = FU[q.ar281];
      if (f && !q.f281) { q.f281 = 1; (q.opts || []).forEach(o => { if (Array.isArray(o) && !o[1] && f.o && f.o[o[0]]) o[1] = f.o[o[0]]; }); if (!q.te281) q.te281 = f.e; ch = 1; }
      const want = !AR() && q.te281 ? q.te281 : q.ar281; if (q.t !== want) { q.t = want; q.te = ""; ch = 1; } });
    return ch; }
  function explain() { const z = state.fuQ; if (!z || !z.pl265 || z.pick == null) return; const q = z.qs[z.n]; if (!q || q.k !== "mcq265") return; const box = document.querySelector("#app .fures"); if (!box || box.nextElementSibling && box.nextElementSibling.classList.contains("ex281")) return;
    const f = FU[q.ar281]; const ans = q.opts[q.ans] || []; let x = f && f.x ? (AR() ? f.x[0] : f.x[1]) : (AR() ? `الإجابة الصحيحة: «${ans[0]}»${ans[1] ? " — " + ans[1] : ""}.` : `The correct answer is «${ans[0]}»${ans[1] ? " (" + ans[1] + ")" : ""}.`);
    box.insertAdjacentHTML("afterend", `<div class="ex281" dir="${AR() ? "rtl" : "ltr"}">💡 ${E(x)}</div>`); }
  css(`.ex281{margin-top:.5rem;padding:.55rem .75rem;border-radius:12px;background:color-mix(in srgb,var(--accent) 9%,var(--card));line-height:1.8}`);

  /* (6) وقف بدري */
  if (window.pl265 && pl265.pick) { const _p = pl265.pick; pl265.pick = function () { const r = _p.apply(this, arguments); try { const q = state.fuQ; if (q && q.qs && FF("v281.stop")) { const done = q.n + 1, wrong = done - q.ok; if (wrong > q.qs.length * .5) { q.stop281 = 1; } } } catch (e) {} return r; }; }
  if (typeof fuNext === "function") { const _n = fuNext; fuNext = function () { const q = state.fuQ; if (q && q.pl265 && q.stop281) { q.n = q.qs.length - 1; } return _n.apply(this, arguments); }; }


  let busy = 0;
  const _r = render; render = function () { const o = _r.apply(this, arguments); if (busy) return o; try { if (prep()) { busy = 1; try { _r.apply(this, arguments); } finally { busy = 0; } } explain(); } catch (e) {} return o; };
})();
