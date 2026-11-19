/* ================= v265: اختبار تحديد المستوى الجديد في كل الأقسام (N4) — لكل مستوى 10 أسئلة أو أكتر متنوعة زي أسئلة الوحدات بالظبط (سماع، معنى، كمّل الجملة، كتابة بخط الإيد، كلام بالتسجيل، «قولها بالعربي»، اختيارات) ومن وحدات مختلفة من نفس المستوى · 70% أو أكتر ← يعدّي للمستوى اللي بعده · أقل من 50% ← يبدأ من المستوى ده · بين 50 و70 ← يعيد المستوى بأسئلة تانية مختلفة · الأقسام: الفصحى، العامية المصرية، عربي الأطفال، التجويد، القراءات، العلوم الشرعية، المقامات · أسئلة العامية اتكتبت من جديد: السؤال عربي، والإجابة عربي وجنبها الإنجليزي، واختيار واحد بس صح (من غير ترجمة آلية) ================= */
(function () {
  const FF = k => { try { return window.ff254(k); } catch (e) { return true; } };
  const AR = () => state.lang === "ar"; const T = (a, e) => AR() ? a : e;
  const css = s => document.head.insertAdjacentHTML("beforeend", `<style>${s}</style>`);
  const E = s => { try { return esc(s); } catch (e) { return String(s == null ? "" : s); } };
  const J = v => E(JSON.stringify(v));
  const rnd = a => a.slice().sort(() => Math.random() - .5);
  const nA = s => { try { return normAr(s); } catch (e) { return String(s || "").replace(/[ً-ْٰ]/g, ""); } };
  const fr = s => { try { return window.franco254 ? window.franco254(s) : ""; } catch (e) { return ""; } };
  window.pl265 = window.pl265 || {};

  /* ---------- بنوك أسئلة (للأقسام اللي مفيهاش وحدات حوار) — [سؤال عربي, سؤال إنجليزي, [[عربي, إنجليزي]…], رقم الصح] ---------- */
  const B = (t, te, o) => ({ t, te, o, a: 0 });
  /* العامية: تعبيرات — اختيار واحد بس صح، وكل إجابة عربي وجنبها الإنجليزي */
  const EGX = [
    [B("«إزيك؟» يعني إيه؟", "What does «إزيك؟» mean?", [["بتسأل عن حاله", "How are you?"], ["بتسأله هو فين", "Where are you?"], ["بتسأله اسمه إيه", "What's your name?"], ["بتشكره", "Thank you"]]),
     B("الرد على «صباح الخير»:", "Reply to «صباح الخير»:", [["صباح النور", "Good morning to you"], ["مع السلامة", "Goodbye"], ["تصبح على خير", "Good night"], ["البقية في حياتك", "My condolences"]]),
     B("«عايز» معناها:", "«عايز» means:", [["عاوز / محتاج", "I want"], ["عندي", "I have"], ["رايح", "I'm going"], ["باكل", "I'm eating"]]),
     B("«فين؟» بتسأل بيها عن:", "«فين؟» asks about:", [["المكان", "Where?"], ["الوقت", "When?"], ["السبب", "Why?"], ["الشخص", "Who?"]]),
     B("الرد على «شكرًا»:", "Reply to «شكرًا»:", [["العفو", "You're welcome"], ["صباح النور", "Good morning"], ["البقية في حياتك", "My condolences"], ["عقبالك", "May it be your turn"]])],
    [B("«بكام ده؟» بتسأل بيها عن:", "«بكام ده؟» asks about:", [["السعر", "How much is this?"], ["المكان", "Where is this?"], ["الوقت", "What time is it?"], ["صاحبه", "Whose is this?"]]),
     B("«أنا مش فاهم» يعني:", "«أنا مش فاهم» means:", [["مش فاهم الكلام", "I don't understand"], ["فاهم كويس", "I understand well"], ["عايز آكل", "I'm hungry"], ["مش موجود", "I'm not here"]]),
     B("«امبارح» يعني:", "«امبارح» means:", [["اليوم اللي فات", "Yesterday"], ["بكرة", "Tomorrow"], ["النهارده", "Today"], ["دلوقتي", "Now"]]),
     B("«الساعة كام؟» بتسأل بيها عن:", "«الساعة كام؟» asks:", [["الوقت دلوقتي", "What time is it?"], ["المدة", "How long?"], ["مكان الساعة", "Where is the watch?"], ["السعر", "How much?"]]),
     B("الرد على «تسلم إيدك»:", "Reply to «تسلم إيدك»:", [["الله يسلمك", "God keep you (thank you too)"], ["البقية في حياتك", "My condolences"], ["صباح النور", "Good morning"], ["عقبالك", "May it be your turn"]])],
    [B("«عقبالك» بتتقال في:", "«عقبالك» is said at:", [["الفرح والمناسبات السعيدة", "Weddings & happy occasions"], ["العزاء", "A funeral (condolences)"], ["الشغل", "Work"], ["أول ما تسلّم على حد", "When greeting someone"]]),
     B("«البقية في حياتك» بتتقال في:", "«البقية في حياتك» is said at:", [["العزاء", "Condolences"], ["الفرح", "A wedding"], ["النجاح", "Success"], ["السفر", "Travel"]]),
     B("«على راسي» يعني:", "«على راسي» means:", [["بكل سرور / من عينيا", "Gladly / with pleasure"], ["راسي واجعاني", "My head hurts"], ["أنا تعبان", "I'm tired"], ["مش موافق", "I refuse"]]),
     B("نفي «بحب»:", "Negative of «بحب»:", [["مابحبش", "I don't like"], ["هحب", "I will like"], ["حبيت", "I liked"], ["بحب قوي", "I really like"]]),
     B("المستقبل من «أروح»:", "Future of «أروح»:", [["هروح", "I will go"], ["رحت", "I went"], ["باروح", "I go (usually)"], ["روح!", "Go!"]])],
    [B("«القرد في عين أمه غزال» يعني:", "«القرد في عين أمه غزال» means:", [["كل أم شايفة ابنها أحلى حاجة", "Every mother thinks her child is the best"], ["القرد حيوان جميل", "A monkey is a pretty animal"], ["الأم بتحب الحيوانات", "The mother loves animals"], ["الغزال أسرع من القرد", "A gazelle is faster than a monkey"]]),
     B("«خليها على الله» يعني:", "«خليها على الله» means:", [["سيبها على ربنا وماتقلقش", "Leave it to God, don't worry"], ["ادفع الحساب", "Pay the bill"], ["اقفل الباب", "Close the door"], ["امشي بسرعة", "Walk fast"]]),
     B("«اللي اختشوا ماتوا» بتتقال على حد:", "«اللي اختشوا ماتوا» is said about someone:", [["بيتصرف من غير كسوف ولا حيا", "Acting shamelessly"], ["مات من شوية", "Who just died"], ["مكسوف جدًا", "Who is very shy"], ["بيعتذر", "Who is apologizing"]]),
     B("«قلبه أبيض» يعني:", "«قلبه أبيض» means:", [["طيب ومابيشيلش في قلبه", "Kind-hearted, holds no grudges"], ["عيان في قلبه", "Has a heart condition"], ["بيخاف بسرعة", "Gets scared easily"], ["زعلان", "Sad"]]),
     B("«على قد لحافك مد رجليك» يعني:", "«على قد لحافك مد رجليك» means:", [["اصرف على قد فلوسك", "Live within your means"], ["نام بدري", "Go to bed early"], ["اشتري لحاف جديد", "Buy a new blanket"], ["اتمرّن كل يوم", "Exercise every day"]])]
  ];
  /* أسئلة زيادة (5 لكل مستوى) — بتتضاف على أسئلة LVQ الموجودة */
  const M = (t, o) => ({ t, o: o.map(x => [x, ""]), a: 0 });
  const XTRA = {
    tajweed: [
      [M("حروف المد عددها:", ["٣", "٢", "٥", "٧"]), M("«الشدّة» معناها:", ["حرف مكرّر: الأول ساكن والتاني متحرك", "حرف ممدود", "حرف ساكن بس", "حرف مابيتنطقش"]), M("التنوين في النطق:", ["نون ساكنة زايدة في آخر الاسم نطقًا لا كتابةً", "ميم ساكنة", "مد بالألف", "همزة"]), M("الاستعاذة قبل القراءة:", ["أعوذ بالله من الشيطان الرجيم", "سبحان الله", "الله أكبر", "لا إله إلا الله"]), M("علامة السكون:", ["دايرة صغيرة فوق الحرف", "خط فوق الحرف", "خط تحت الحرف", "نقطتين"])],
      [M("حكم «مَنْ آمَنَ»:", ["إظهار حلقي", "إدغام", "إخفاء", "إقلاب"]), M("حكم «مِن رَّبِّهِمْ»:", ["إدغام بغير غنة", "إدغام بغنة", "إظهار", "إخفاء"]), M("حكم «يَنصُرُ»:", ["إخفاء حقيقي", "إظهار", "إدغام", "إقلاب"]), M("حروف الإدغام بغنة:", ["ي ن م و", "ل ر", "ء هـ ع ح غ خ", "ب"]), M("حكم «تَرْمِيهِم بِحِجَارَةٍ»:", ["إخفاء شفوي", "إظهار شفوي", "إدغام متماثلين", "إقلاب"])],
      [M("اللام في «الشَّمْس»:", ["شمسية (بتتدغم)", "قمرية (بتظهر)", "مفخّمة", "ساكنة ظاهرة"]), M("المد المنفصل:", ["حرف مد آخر كلمة والهمزة أول اللي بعدها", "حرف مد بعده همزة في نفس الكلمة", "حرف مد بعده سكون أصلي", "مد بدل"]), M("مقدار المد الطبيعي:", ["حركتان", "٤ حركات", "٦ حركات", "حركة واحدة"]), M("مقدار المد اللازم:", ["٦ حركات", "حركتان", "٢ أو ٤", "٤ بس"]), M("القلقلة بتكون في:", ["الحرف الساكن من «قطب جد»", "الحرف المتحرك من «قطب جد»", "المشدّد بس", "المفتوح بس"])],
      [M("لام لفظ الجلالة بتتفخّم بعد:", ["فتح أو ضم", "كسر", "سكون بس", "تنوين"]), M("الراء المكسورة:", ["مرقّقة", "مفخّمة", "يجوز الوجهان", "مقلقلة"]), M("حروف الاستعلاء:", ["خص ضغط قظ", "قطب جد", "ي ن م و", "ء هـ ع ح غ خ"]), M("المد العارض للسكون يجوز فيه:", ["٢ أو ٤ أو ٦ حركات", "حركتان بس", "٦ بس", "٤ بس"]), M("حكم «أَنۢبِئْهُم»:", ["إقلاب", "إخفاء", "إظهار", "إدغام"])],
      [M("حروف الصفير:", ["ص ز س", "ق ط ب ج د", "ل ر", "ي و"]), M("حرف التكرير:", ["الراء", "اللام", "النون", "الميم"]), M("حرف الاستطالة:", ["الضاد", "الظاء", "الطاء", "الصاد"]), M("حرف التفشّي:", ["الشين", "السين", "الثاء", "الفاء"]), M("حروف الهمس مجموعة في:", ["فحثه شخص سكت", "قطب جد", "خص ضغط قظ", "لن عمر"])],
      [M("الإدغام في «قَد تَّبَيَّنَ»:", ["متجانسين", "متماثلين", "متقاربين", "مافيش إدغام"]), M("السكت عند حفص في «عِوَجًا ۜ قَيِّمًا»:", ["سكتة لطيفة من غير تنفّس", "وقف وتنفّس", "وصل من غير سكت", "مد"]), M("مواضع السكت المشهورة لحفص (الشاطبية):", ["أربعة", "اتنين", "ستة", "عشرة"]), M("الإمالة عند حفص في:", ["مَجْرَاهَا", "مُوسَى", "الْهُدَى", "النَّار"]), M("التسهيل عند حفص في:", ["ءَا۬عْجَمِيٌّ", "ءَأَنذَرْتَهُمْ", "ءَامَنُوا", "أَأَنتَ"])]],
    qiraat: [
      [M("عدد رواة كل قارئ من العشرة:", ["راويان", "راوي واحد", "تلاتة", "أربعة"]), M("القارئ الكوفي اللي حفص راويه:", ["عاصم", "حمزة", "الكسائي", "خلف"]), M("إمام أهل المدينة:", ["نافع", "ابن كثير", "أبو عمرو", "ابن عامر"]), M("إمام أهل مكة:", ["ابن كثير", "نافع", "عاصم", "يعقوب"]), M("إمام أهل الشام:", ["ابن عامر", "الكسائي", "حمزة", "أبو جعفر"])],
      [M("راويا ابن كثير:", ["البزي وقنبل", "قالون وورش", "هشام وابن ذكوان", "خلف وخلاد"]), M("راويا أبي عمرو:", ["الدوري والسوسي", "شعبة وحفص", "روح ورويس", "ابن وردان وابن جماز"]), M("راويا حمزة:", ["خلف وخلاد", "البزي وقنبل", "قالون وورش", "هشام وابن ذكوان"]), M("راويا الكسائي:", ["أبو الحارث والدوري", "روح ورويس", "البزي وقنبل", "شعبة وحفص"]), M("راويا يعقوب:", ["رويس وروح", "إسحاق وإدريس", "ابن وردان وابن جماز", "قالون وورش"])],
      [M("راويا أبي جعفر:", ["ابن وردان وابن جماز", "روح ورويس", "إسحاق وإدريس", "هشام وابن ذكوان"]), M("راويا خلف العاشر:", ["إسحاق وإدريس", "خلف وخلاد", "الدوري والسوسي", "البزي وقنبل"]), M("القرّاء التلاتة المتمّمين للعشرة:", ["أبو جعفر ويعقوب وخلف العاشر", "نافع وعاصم وحمزة", "ابن كثير وأبو عمرو وابن عامر", "الكسائي وحمزة وعاصم"]), M("متن الشاطبية في:", ["القراءات السبع", "القراءات التلاتة المتممة", "التجويد بس", "رسم المصحف"]), M("متن الدرّة في:", ["القراءات التلاتة المتممة للعشر", "القراءات السبع", "التجويد", "الوقف"])],
      [M("صلة ميم الجمع قبل المتحرك مشهورة عن:", ["ابن كثير", "حفص", "حمزة", "ابن عامر"]), M("ورش بيقرا «يُؤْمِنُونَ»:", ["يُومنون (إبدال الهمزة واو)", "يؤمنون بالتحقيق", "يَمنون", "يؤمّنون"]), M("تقليل ذوات الياء مشهور عن:", ["ورش", "حفص", "ابن كثير", "قالون"]), M("«مَالِكِ يَوْمِ الدِّينِ» بالألف قراءة:", ["عاصم والكسائي ويعقوب وخلف", "نافع وابن كثير", "أبو عمرو وحمزة", "ابن عامر بس"]), M("«السراط» بالسين قراءة:", ["قنبل ورويس", "حفص", "ورش", "شعبة"])],
      [M("إشمام الصاد زايًا في «الصراط» (كل القرآن) لـ:", ["خلف عن حمزة", "حفص", "قالون", "الدوري"]), M("ياءات الإضافة هي:", ["ياء المتكلم الزايدة", "الياء الأصلية", "ياء النسب", "ياء المد"]), M("«عليهُمْ» بضم الهاء قراءة:", ["حمزة ويعقوب", "حفص", "نافع", "ابن كثير"]), M("السكت على الساكن قبل الهمز مشهور عن:", ["خلف عن حمزة", "قالون", "البزي", "ابن ذكوان"]), M("ابن عامر قارئ:", ["الشام", "الكوفة", "البصرة", "مكة"])],
      [M("طيّبة النشر نظمها:", ["ابن الجزري", "الشاطبي", "السخاوي", "الداني"]), M("«التيسير في القراءات السبع» لـ:", ["أبي عمرو الداني", "ابن مجاهد", "ابن الجزري", "مكي بن أبي طالب"]), M("أول من سبّع السبعة:", ["ابن مجاهد", "الداني", "الشاطبي", "ابن الجزري"]), M("«موافقة الرسم ولو احتمالًا» يعني:", ["موافقة أحد المصاحف العثمانية ولو تقديرًا", "موافقة الإملاء الحديث", "موافقة المصحف المطبوع", "موافقة كتب التفسير"]), M("القراءة الشاذة:", ["اللي فقدت شرط من شروط القبول", "أي قراءة غير حفص", "القراءة السريعة", "قراءة أهل المغرب"])]],
    maqamat: [
      [M("المقامات الأساسية المشهورة في التلاوة عددها:", ["٨", "٢", "٢٠", "١٢"]), M("الاختصار المشهور لترتيب المقامات:", ["صنعب سحرك", "قطب جد", "ينمو", "خص ضغط قظ"]), M("القرار هو:", ["الدرجة اللي المقام بيبدأ ويقفل عليها", "أعلى درجة", "الدرجة الخامسة", "التحويل"]), M("الجواب هو:", ["نفس القرار بس أعلى بأوكتاف", "الدرجة التانية", "الغمّاز", "القفلة"]), M("أشهر مقام في افتتاح التلاوة:", ["البياتي", "الصبا", "السيكاه", "الكرد"]), M("«مرتّل» و«مجوّد» يعني:", ["طرق أداء التلاوة", "أسماء مقامات", "أسماء قرّاء", "أحكام تجويد"]), M("السلّم من القرار للجواب فيه:", ["٨ درجات", "٥ درجات", "١٢ درجة", "٣ درجات"]), M("«الآهات» هي:", ["غناء السلّم بصوت «آه» من غير كلام", "آيات معيّنة", "الأذان", "التجويد"]), M("«الجنس» هو:", ["مجموعة ٣ أو ٤ أو ٥ درجات بيتكوّن منها المقام", "آية", "قارئ", "سورة"]), M("المقام بيتكوّن من:", ["جنسين (أو أكتر)", "جنس واحد بس دايمًا", "درجتين", "أوكتافين"])],
      [M("الغمّاز هو:", ["الدرجة اللي بيبدأ منها الجنس التاني", "القرار", "الجواب", "آخر درجة"]), M("قرار البياتي على:", ["الدوكاه (Re)", "الرست (Do)", "السيكاه", "النوا"]), M("قرار الرست على:", ["الرست (Do)", "الدوكاه", "العشيران", "الحسيني"]), M("قرار السيكاه على:", ["السيكاه (Mi½♭)", "الدوكاه", "الرست", "الجهاركاه"]), M("المقام المعروف بالحزن والشجن:", ["الصبا", "العجم", "الرست", "النهاوند"]), M("قرار الصبا على:", ["الدوكاه (Re)", "الرست (Do)", "النوا (Sol)", "العجم"]), M("قرار الحجاز على:", ["الدوكاه (Re)", "الرست (Do)", "السيكاه", "الجهاركاه (Fa)"]), M("قرار الكرد على:", ["الدوكاه (Re)", "الرست (Do)", "السيكاه", "النوا (Sol)"]), M("قرار النهاوند على:", ["الرست (Do)", "الدوكاه (Re)", "السيكاه", "الحسيني (La)"]), M("العجم في التلاوة بيبدأ من:", ["الرست (Do)", "الدوكاه (Re)", "السيكاه", "النوا (Sol)"])],
      [M("العجم قريب من سلّم:", ["الماجور (الكبير)", "المينور (الصغير)", "الصبا", "الحجاز"]), M("النهاوند قريب من سلّم:", ["المينور (الصغير)", "الماجور", "السيكاه", "الرست"]), M("فيه تلات أرباع تون بين أول درجتين:", ["البياتي", "العجم", "النهاوند", "الكرد"]), M("الحجاز مميّز بـ:", ["تون ونص بين الدرجة التانية والتالتة", "ربع تون بس", "تون كامل دايمًا", "أوكتاف"]), M("الكرد بيبدأ بـ:", ["نص تون بين القرار والدرجة التانية", "تون ونص", "تلات أرباع تون", "تون"]), M("«التحويل» يعني:", ["الانتقال من مقام لمقام في نفس التلاوة", "تغيير القارئ", "الوقف", "المد"]), M("«القفلة» هي:", ["الرجوع للقرار في آخر الجملة", "أعلى نغمة", "أول التلاوة", "السكت"]), M("«جواب الجواب»:", ["أعلى من القرار بأوكتافين", "تحت القرار", "الغمّاز", "الدرجة التالتة"]), M("البياتي فيه:", ["ربع تون في الدرجة التانية (Mi½♭)", "مافيهوش أرباع خالص", "دييز في القرار", "تون ونص في أوله"]), M("قرار السيكاه درجة:", ["فيها ربع تون", "طبيعية من غير علامات", "دييز كامل", "بيمول كامل"])]]
  };

  /* ---------- الأقسام ---------- */
  const SECS = () => [
    ["fusha", "📘", T("العربية الفصحى", "Standard Arabic"), "units"], ["egyptian", "🇪🇬", T("العامية المصرية", "Egyptian Arabic"), "units"], ["kidsar", "🧒", T("عربي للأطفال", "Kids' Arabic"), "kids"],
    ["tajweed", "🕌", T("التجويد", "Tajweed"), "bank"], ["qiraat", "📜", T("القراءات", "Qira'at"), "bank"], ["ilm", "🎓", T("العلوم الشرعية", "Islamic sciences"), "bank"], ["maqamat", "🎼", T("المقامات", "Maqamat"), "bank"]];
  const secOf = id => SECS().find(s => s[0] === id);
  function levels(sec) { const s = secOf(sec); if (!s) return [];
    if (s[3] === "units") { const r0 = state.route; state.route = sec; let L = []; try { L = fuLvls() || []; } catch (e) {} state.route = r0; return L.filter(x => Array.isArray(x) && x.length); }
    if (s[3] === "kids") { const K = window.KAL258 || {}; const ks = Object.keys(K).map(Number).filter(n => Array.isArray(K[n]) && K[n].length).sort((a, b) => a - b); if (!ks.length && typeof KA !== "undefined") return [KA]; return ks.map(n => K[n]); }
    if (sec === "maqamat") return XTRA.maqamat.map((x, i) => i);
    return (LVQ[sec] && LVQ[sec].q || []).map((x, i) => i); }
  const lvName = (sec, i) => { const s = secOf(sec); if (s && s[3] === "bank" && sec !== "maqamat") { try { return lvLbl(sec, LVB[i]) + (lvSub(sec, LVB[i]) ? " · " + lvSub(sec, LVB[i]) : ""); } catch (e) {} } return T("المستوى ", "Level ") + (i + 1); };

  /* ---------- توليد أسئلة المستوى من الوحدات (نفس أنواع أسئلة الوحدات v250) ---------- */
  function normUnits(sec, units) { const kids = sec === "kidsar";
    return units.map(u => ({ w: (u[2] || []).filter(Array.isArray).map(w => kids ? { ar: w[0], fr: fr(w[0]), en: w[1] } : { ar: w[0], fr: w[1], en: w[2] }).filter(w => w.ar && w.en),
      l: (u[3] || []).filter(Array.isArray).map(l => kids ? { ar: l[1], fr: fr(l[1]), en: l[2] } : { ar: l[1], fr: l[2], en: l[3] }).filter(l => l.ar) })); }
  function genUnits(sec, L, used) { const lv = levels(sec)[L] || []; const U = normUnits(sec, lv); const allW = U.flatMap(u => u.w); const allL = U.flatMap(u => u.l);
    const fresh = (arr, key) => { const f = arr.filter(x => !used.has(key(x))); return rnd(f.length >= 3 ? f : arr); };
    /* كلمات من وحدات مختلفة: لفّ على الوحدات بالدور */
    const pickW = n => { const out = []; const byU = rnd(U.map(u => fresh(u.w, x => "w:" + x.ar))).filter(a => a.length); let i = 0; while (out.length < n && byU.some(a => a.length)) { const a = byU[i++ % byU.length]; const w = a.shift(); if (w && !out.some(x => x.ar === w.ar)) out.push(w); } return out; };
    const pickL = n => fresh(allL, x => "l:" + x.ar).filter(l => l.ar.split(/\s+/).length >= 2).slice(0, n);
    const distW = (ans, n = 3) => rnd(allW.concat(levels(sec).flat().length ? [] : [])).map(x => x.ar).filter((x, i, a) => a.indexOf(x) === i && nA(x) !== nA(ans) && !/[\/…]/.test(x)).slice(0, n);
    const distM = (ans, n = 3) => rnd(allW).map(x => x.en).filter((x, i, a) => a.indexOf(x) === i && x !== ans && !/[\/…]/.test(x) && x.toLowerCase() !== String(ans).toLowerCase()).slice(0, n);
    const qs = []; const W = pickW(8); const Ls = pickL(4);
    W.slice(0, 3).forEach(w => { qs.push({ k: "listen2", say: w.ar, ans: w.ar, ansM: w.en, opts: rnd([w.ar, ...distW(w.ar)]), optsM: rnd([w.en, ...distM(w.en)]) }); used.add("w:" + w.ar); });
    W.slice(3, 6).forEach(w => { qs.push({ k: "mean2", word: w.ar, fr: w.fr, ans: w.en, opts: rnd([w.en, ...distM(w.en)]) }); used.add("w:" + w.ar); });
    Ls.slice(0, 2).forEach(l => { const ws = String(l.ar).replace(/[.؟?!،,«»]/g, "").split(/\s+/).filter(x => nA(x).length > 2); if (!ws.length) return; const g = ws[Math.floor(Math.random() * ws.length)]; qs.push({ k: "gap2", line: l.ar, blank: String(l.ar).replace(g, "_____"), en: l.en, ans: g, opts: rnd([g, ...distW(g)]) }); used.add("l:" + l.ar); });
    W.slice(6, 8).forEach(w => { qs.push({ k: "hw", say: w.ar, ans: w.ar, ansM: w.en, fr: w.fr }); used.add("w:" + w.ar); });
    Ls.slice(2, 3).forEach(l => { qs.push({ k: "speak2", line: l.ar, fr: l.fr, en: l.en }); used.add("l:" + l.ar); });
    Ls.slice(3, 4).forEach(l => { if (l.en) { qs.push({ k: "sayen", line: l.ar, fr: l.fr, en: l.en }); used.add("l:" + l.ar); } });
    /* أسئلة تعبيرات (العامية) أو أسئلة الفصحى العامة من نفس المستوى */
    const nL = levels(sec).length; const bank = sec === "egyptian" ? EGX : null; const bi = Math.min(bank ? bank.length - 1 : 0, Math.floor(L * (bank ? bank.length : 1) / Math.max(1, nL)));
    if (bank) rnd(bank[bi].filter(b => !used.has("b:" + b.t))).slice(0, 2).forEach(b => { qs.push(mcq(b)); used.add("b:" + b.t); });
    if (sec === "fusha" && LVQ.fusha) { const bands = LVQ.fusha.q; const k = Math.min(bands.length - 1, Math.floor(L * bands.length / Math.max(1, nL))); rnd(bands[k].filter(q => !used.has("b:" + q[0]))).slice(0, 2).forEach(q => { qs.push(mcq({ t: q[0], te: "", o: q[1].map(x => [x, ""]), a: q[2] })); used.add("b:" + q[0]); }); }
    return rnd(qs.filter(q => !/speak2|sayen/.test(q.k))).concat(qs.filter(q => /speak2|sayen/.test(q.k))); }
  const mcq = b => { const o = b.o.map((x, i) => ({ x, ok: i === b.a })); const r = rnd(o); return { k: "mcq265", t: b.t, te: b.te || "", opts: r.map(y => y.x), ans: r.findIndex(y => y.ok) }; };
  function genBank(sec, L, used) { let base = [];
    if (sec === "maqamat") base = XTRA.maqamat[L] || [];
    else { base = ((LVQ[sec] && LVQ[sec].q[L]) || []).map(q => ({ t: q[0], o: q[1].map(x => [x, ""]), a: q[2] })).concat((XTRA[sec] || [])[L] || []); }
    if (sec === "ilm" && typeof ILM !== "undefined") { /* أسئلة الدروس نفسها من نفس الجزء من المنهج */ const n = levels(sec).length; Object.values(ILM).forEach(t => { const lv = t.lv || []; const a = Math.floor(L * lv.length / n), b = Math.floor((L + 1) * lv.length / n); lv.slice(a, Math.max(b, a + 1)).forEach(ls => (ls[3] || []).forEach(q => base.push({ t: q[0], o: q[1].map(x => [x, ""]), a: q[2] }))); }); }
    const f = base.filter(b => !used.has("b:" + b.t)); const pool = f.length >= 10 ? f : base; const pick = rnd(pool).slice(0, Math.max(10, Math.min(12, pool.length))); pick.forEach(b => used.add("b:" + b.t)); return pick.map(mcq); }
  function genLevel(z) { const s = secOf(z.sec); return s[3] === "bank" ? genBank(z.sec, z.L, z.used) : genUnits(z.sec, z.L, z.used); }

  /* ---------- المحرك ---------- */
  pl265.start = sec => { const z = state.pl265 = { sec, L: 0, used: new Set(), log: [], tries: {} }; state.lvT = null; round(); go16("level"); };
  function round() { const z = state.pl265; z.stage = "q"; const qs = genLevel(z); state.fuQ = { u: "pl265", pl265: 1, v250: 1, qs, n: 0, ok: 0, pick: null, t0: Date.now() }; try { render(); } catch (e) {} try { fuAuto(); } catch (e) {} window.scrollTo({ top: 0 }); }
  function finish() { const z = state.pl265, q = state.fuQ; const sc = q.qs.length ? Math.round(q.ok / q.qs.length * 100) : 0; z.tries[z.L] = (z.tries[z.L] || 0) + 1; z.log.push({ L: z.L, sc }); const nL = levels(z.sec).length;
    if (sc >= 70) { if (z.L + 1 < nL) { z.stage = "pass"; z.next = z.L + 1; } else { z.stage = "done"; z.res = z.L; z.top = 1; } }
    else if (sc < 50 || z.tries[z.L] >= 2) { z.stage = "done"; z.res = z.L; }
    else { z.stage = "retry"; }
    z.sc = sc; state.fuQ = null; try { clearInterval(fuAuto.t); } catch (e) {} if (z.stage === "done") save(); render(); window.scrollTo({ top: 0 }); }
  pl265.next = () => { const z = state.pl265; if (z.stage === "pass") z.L = z.next; round(); };
  pl265.quit = () => { if (!confirm(T("تخرج من الاختبار؟", "Quit the test?"))) return; state.pl265 = null; state.fuQ = null; try { clearInterval(fuAuto.t); } catch (e) {} render(); };
  function save() { const z = state.pl265; const L = z.res; let all = {}; try { all = JSON.parse(localStorage.getItem("itqan_place265") || "{}"); } catch (e) {} all[z.sec] = { L, at: Date.now(), log: z.log }; try { localStorage.setItem("itqan_place265", JSON.stringify(all)); } catch (e) {}
    if (z.sec === "kidsar") { const top = Object.keys(window.KAL258 || {}).map(Number).sort((a, b) => a - b)[L] || L + 1; try { localStorage.setItem("ka_place258", String(top)); } catch (e) {} }
    try { if (typeof LVB !== "undefined" && LVQ[z.sec]) lvSave(z.sec, LVB[Math.min(L, LVB.length - 1)], z.sc); } catch (e) {}
    if (state.auth && state.auth.user && state.auth.profile) { const md = Object.assign({}, state.auth.profile.metadata || {}); md.place265 = Object.assign({}, md.place265 || {}, { [z.sec]: L }); state.auth.profile.metadata = md; sb.from("profiles").update({ metadata: md }).eq("id", state.auth.user.id).then(() => {}, () => {}); } }
  pl265.go = () => { const z = state.pl265; const L = z.res; state.pl265 = null;
    if (z.sec === "fusha" || z.sec === "egyptian") { state.fuLv = L; state.fuPl = null; state.fuU = null; go16(z.sec); return; }
    if (z.sec === "kidsar") { go16("kidsar"); return; } if (z.sec === "maqamat") { location.hash = "#/d/maqamat"; return; }
    try { const g = LV_START[z.sec](LVB[Math.min(L, LVB.length - 1)]); g.go(); } catch (e) { go16(z.sec === "tajweed" ? "tjb" : z.sec); } };

  /* بعد آخر سؤال: النتيجة بتتحسب هنا مش في الوحدة */
  const _nx = fuNext; fuNext = function () { const q = state.fuQ; if (!q || !q.pl265) return _nx.apply(this, arguments); q.n++; q.pick = null; if (q.n >= q.qs.length) return finish(); render(); try { fuAuto(); } catch (e) {} };
  pl265.pick = i => { const q = state.fuQ; if (!q || q.pick != null) return; const x = q.qs[q.n]; q.pick = i; const ok = i === x.ans; if (ok) q.ok++; else (q.wrong = q.wrong || []).push(x); try { sfxSafe(ok ? "correct" : "wrong"); } catch (e) {} try { clearInterval(fuAuto.t); } catch (e) {} render(); };
  /* صوت العامية بلهجة مصرية جوه الاختبار */
  try { const _s = rdSay; rdSay = function () { const z = state.pl265; if (!z || z.sec !== "egyptian") return _s.apply(this, arguments); const r0 = state.route; state.route = "egyptian"; try { return _s.apply(this, arguments); } finally { state.route = r0; } }; } catch (e) {}

  /* ---------- الصفحة ---------- */
  function mcqView(q) { const z = state.fuQ; const x = q; const shown = z.pick != null && z.pick !== undefined;
    return `<div class="card fuq notr"><div class="row" style="justify-content:space-between;align-items:center"><b>${z.n + 1} / ${z.qs.length}</b><span id="fuT" class="fut">⏱️ ${z.left || ""}</span></div>
      <h3 class="q265" lang="ar" dir="rtl">${E(x.t)}</h3>${x.te ? `<div class="qe265" dir="ltr">${E(x.te)}</div>` : ""}
      <div class="fuopts">${x.opts.map((o, i) => `<button class="opt o265 ${shown ? (i === x.ans ? "ok" : z.pick === i ? "bad" : "") : ""}" ${shown ? "disabled" : ""} onclick="pl265.pick(${i})"><span class="a265" lang="ar" dir="rtl">${E(o[0])}</span>${o[1] ? `<span class="e265" dir="ltr">${E(o[1])}</span>` : ""}</button>`).join("")}</div>
      ${shown ? `<div class="fures ${z.pick === x.ans ? "ok" : ""}">${z.pick === x.ans ? T("✅ صح!", "✅ Correct!") : z.pick === "__timeout" ? T("⏰ الوقت خلص", "⏰ Time's up") : T("❌ الإجابة الصحيحة:", "❌ Correct answer:")} ${z.pick !== x.ans ? `<b>${E(x.opts[x.ans][0])}${x.opts[x.ans][1] ? " — " + E(x.opts[x.ans][1]) : ""}</b>` : ""}</div><div style="text-align:center;margin-top:.6rem"><button class="btn btn-p" onclick="fuNext()">${T("التالي ←", "Next →")}</button></div>` : ""}</div>`; }
  function page() { const z = state.pl265;
    if (!z) { const A = (() => { try { return JSON.parse(localStorage.getItem("itqan_place265") || "{}"); } catch (e) { return {}; } })();
      return pageWrap("🎯", T("حدد مستواك", "Find your level"), T("10 أسئلة أو أكتر لكل مستوى من الوحدات نفسها: سماع وكلام وكتابة واختيارات. 70% تعدّي للمستوى اللي بعده · أقل من 50% تبدأ منه · بين 50 و70 تعيده بأسئلة تانية.", "10+ questions per level drawn from the units themselves: listening, speaking, writing, choices. 70% moves you up · under 50% starts you there · 50–70 retries with new questions."),
        `<div class="g265">${SECS().map(s => `<button class="c265" onclick="pl265.start('${s[0]}')"><span>${s[1]}</span><b>${E(s[2])}</b>${A[s[0]] ? `<small>✅ ${E(lvName(s[0], A[s[0]].L))}</small>` : `<small>${levels(s[0]).length} ${T("مستويات", "levels")}</small>`}</button>`).join("")}</div>`, 900); }
    const s = secOf(z.sec); const nL = levels(z.sec).length;
    const steps = `<div class="st265">${Array.from({ length: nL }, (_, i) => { const l = z.log.filter(x => x.L === i).slice(-1)[0]; return `<span class="${i === z.L ? "cur" : l ? (l.sc >= 70 ? "ok" : "") : ""}">${i + 1}</span>`; }).join("")}</div>`;
    let body = "";
    if (z.stage === "q" && state.fuQ) { const q = state.fuQ.qs[state.fuQ.n]; body = q && q.k === "mcq265" ? mcqView(q) : (typeof fuQView === "function" ? fuQView() : ""); body += `<button class="btn btn-o" style="margin-top:.8rem" onclick="pl265.quit()">✖ ${T("خروج", "Quit")}</button>`; }
    else if (z.stage === "pass") body = `<div class="card r265"><div style="font-size:3rem">🌟</div><h2>${z.sc}%</h2><p>${T(`عدّيت ${lvName(z.sec, z.L)} — يلا على ${lvName(z.sec, z.next)}`, `You passed ${lvName(z.sec, z.L)} — on to ${lvName(z.sec, z.next)}`)}</p><button class="btn btn-p btn-lg" onclick="pl265.next()">${T("المستوى اللي بعده ←", "Next level →")}</button></div>`;
    else if (z.stage === "retry") body = `<div class="card r265"><div style="font-size:3rem">💪</div><h2>${z.sc}%</h2><p>${T("قريب! هنعيد المستوى ده بأسئلة تانية مختلفة.", "Close! Let's retry this level with different questions.")}</p><button class="btn btn-p btn-lg" onclick="pl265.next()">🔁 ${T("أسئلة تانية", "New questions")}</button></div>`;
    else if (z.stage === "done") body = `<div class="card r265"><div style="font-size:3rem">🎯</div><h2>${T("مستواك", "Your level")}: ${E(lvName(z.sec, z.res))}</h2><p class="muted">${z.top ? T("عدّيت كل المستويات — ابدأ من آخر مستوى وكمّل.", "You passed every level — start at the last one.") : T(`هتبدأ من ${lvName(z.sec, z.res)}، واللي قبله اتفتحلك.`, `You'll start at ${lvName(z.sec, z.res)}; everything before it is open.`)}</p><div class="xs muted">${z.log.map(l => `${E(lvName(z.sec, l.L))}: ${l.sc}%`).join(" · ")}</div><div class="row" style="gap:.5rem;justify-content:center;margin-top:1rem;flex-wrap:wrap"><button class="btn btn-p btn-lg" onclick="pl265.go()">▶ ${T("ابدأ من مستواك", "Start at your level")}</button><button class="btn btn-o" onclick="state.pl265=null;render()">🎯 ${T("قسم تاني", "Another section")}</button></div></div>`;
    return pageWrap(s[1], T("حدد مستواك — ", "Find your level — ") + s[2], lvName(z.sec, z.L), steps + body, 820); }

  /* ---------- الربط ---------- */
  try { const _ls = lvStart; lvStart = function (sec) { if (!FF("v265.place")) return _ls.apply(this, arguments); return pl265.start(sec === "nooraniya" ? "tajweed" : sec); }; } catch (e) {}
  /* الصفحة بتترسم مكان renderLevel القديمة (v116) عشان كل تعديلات الشرايط تفضل شغالة */
  try { const _rl = renderLevel; renderLevel = function () { if (!FF("v265.place")) return _rl.apply(this, arguments); try { return page(); } catch (e) { console.error("v265", e); return `<div class="err">${E(e.message)}</div>`; } }; } catch (e) { console.warn("v265 renderLevel", e); }
  window.EGX265 = EGX; window.XTRA265 = XTRA;
  css(`.g265{display:grid;grid-template-columns:repeat(auto-fill,minmax(170px,1fr));gap:.7rem}.c265{display:flex;flex-direction:column;align-items:center;gap:.3rem;padding:1.1rem .6rem;border:1px solid var(--line);border-radius:18px;background:var(--card);cursor:pointer;font:inherit;color:inherit;transition:transform .15s}.c265:hover{transform:translateY(-3px);border-color:var(--accent)}.c265 span{font-size:2.2rem}.c265 small{color:var(--muted)}
  .st265{display:flex;gap:.3rem;justify-content:center;margin:.2rem 0 .8rem;flex-wrap:wrap}.st265 span{width:2rem;height:2rem;border-radius:50%;display:grid;place-items:center;border:2px solid var(--line);font-weight:700;font-size:.85rem}.st265 .cur{border-color:var(--accent);background:var(--accent);color:#fff}.st265 .ok{border-color:#16a34a;color:#16a34a}
  .q265{font-family:'Amiri',serif;font-size:1.5rem;margin:.6rem 0 .1rem;text-align:start}.qe265{color:var(--muted);font-size:.9rem;margin-bottom:.4rem}
  .o265{display:flex!important;justify-content:space-between;align-items:center;gap:.8rem;text-align:start}.o265 .a265{font-family:'Amiri',serif;font-size:1.25rem}.o265 .e265{font-size:.85rem;color:var(--muted)}.o265.ok{border-color:#16a34a!important;background:#dcfce7}.o265.bad{border-color:#dc2626!important;background:#fee2e2}
  .r265{text-align:center;padding:1.6rem 1rem}`);
})();
