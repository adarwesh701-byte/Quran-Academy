# HANDOFF — أكاديمية إتقان (quran-itqan.com)

آخر تحديث: 20 نوفمبر 2026 · **النسخة الحالية: v300** (`UI_VERSION = "2026-11-21-v300"`) · آخر بلوك: `docs/blocks/v300.js` · ZIP: `itqan-academy-v297-complete.zip` (بدأت من v296-batch01)

> الملف ده نقطة البداية لأي محادثة جديدة. معاه:
> - `MASTER_BACKLOG.md`: كل المهام بحالتها الحقيقية وأولويتها والخطوة الجاية.
> - `CHANGELOG.md`: كل نسخة اتعملت إيه.
> - `docs/HANDOFF_v278.md`: **خريطة النسخ التقنية** (v264 → v294) بالتفاصيل: كل بلوك بيعمل إيه، وأسماء الدوال والإعدادات.
> - `docs/ITQAN_ORDERS_TABLE.md`: كل أوردر من أول يوم (Notion 1–4 + الشات) بحالته.

## 1) المعمارية
| الحاجة | القيمة |
|---|---|
| الواجهة | ملف واحد `index.html` (~5.5 ميجا، Vanilla JS، من غير build). كل ميزة = بلوك IIFE `/* ===== vNNN: … ===== */` قبل آخر `// بدء التشغيل`، بيلفّ `render` أو `DOMAINS` أو `readHash`… |
| الاستضافة | Vercel — أي push على `main` في `adarwesh701-byte/Quran-Academy` بيتنشر في دقيقة. `vercel.json`: rewrite `/:slug` → `index.html` (اللينكات المقروءة) + headers |
| الخلفية | Supabase project `ymycfxmigvvermsdnagm` (Auth + Postgres + Storage `academy_public` + Edge Functions). `site_settings` (id=1، عمود `data` JSON) قراءة للكل وكتابة للمالك بس (RLS `is_owner()`) |
| الميديا الكبيرة | فرع `media` (orphan، مش بيتنشر على Vercel) ومتقدّم عن طريق jsDelivr: `https://cdn.jsdelivr.net/gh/adarwesh701-byte/Quran-Academy@media/<path>` و raw.githubusercontent احتياطي. بعد تحديث ملف index اعمل purge لـ `https://purge.jsdelivr.net/gh/adarwesh701-byte/Quran-Academy@media/<path>` |
| Service Worker | `sw.js` (`itqan-vNNN`) — كل نسخة بتغيّر الرقم |
| الأدوار | owner / teacher / student / guest + صلاحيات staff187 (admin/viewall…) |
| اللغات | عربي (فصحى في الواجهة) + إنجليزي. العامية المصرية في منهجها بس |

## 2) طريقة الإصدار (بالترتيب)
1. اكتب البلوك في `/home/claude/vNNN.js` واختبره محليًا (`tools/runm.py` أو `tools/runh.py` بالـ stub في `tools/release/stub.js`).
2. `python3 /home/claude/tools/rel.py NNN vNNN.js '<سطر VER>' "<رسالة>" <آخر نسخة ليها سطر VER>` — بيدخّل البلوك، ويغيّر `UI_VERSION` و`sw.js`، ويعمل `node --check`، ويعمل أرشيف.
   - ⚠️ اتأكد إن سطر فحص التحديث `t.match(/const UI_VERSION = "([^"]+)"/)` ما اتلمسش.
3. `git commit` (برسالة فيها سطور الـ attribution) ثم `git -c push.negotiate=true push origin main`.
4. اتأكد على الموقع الحقيقي (نسخة الـ JS `UI_VERSION`).
- انشر قليل: Vercel المجاني بيحسب نقل البيانات — جمّع التعديلات.

## 3) دروس مهمة اتعلمناها (ماتكررهاش)
- **أي كود بيرتّب أو بيكتب في DOM لازم يكون idempotent** (ماتكتبش نفس القيمة تاني). v284: بلوكين بيرتبوا الرئيسية عكس بعض 60 مرة/ثانية فالضغطات ماكانتش بتتحسب. v289: `navFix` كان بيكتب نفس الكلام كل 150ms. اختبر churn بـ MutationObserver.
- `PAGES16` و`HASH_ROUTES` `const` مش على `window` — استخدم `typeof PAGES16 !== "undefined"`.
- مستمعين `popstate` على window بيشتغلوا بترتيب التسجيل — عشان كده فيه `window.__pop288` في أول الـ script.
- الـ CSS محتاج specificity عالية (الموقع فيه قواعد كتير بـ `!important`).
- الـ rAF والمؤقتات بتقف في التابات اللي في الخلفية — اعمل مؤقت احتياطي.

## 4) اللي اتعمل في الجلسة دي (v283 → v295)
v284 إصلاح الضغطات · v285 موبايل/تابلت حقيقي · v286–287 منشئ التجربة + اختيار التحكم · v288 لينكات مقروءة + الشريطين الجانبيين · v289–292 تحميل ثابت + كاش + أداء · v290 السبورة العائمة · v293–294 محرك المناهج + «العربية بين يديك» · v295 القوائم بالضغط بس. التفاصيل في `CHANGELOG.md` و`docs/HANDOFF_v278.md`.

## 4.1) اللي اتعمل في v296 (batch01)
- صفحة `/Subscribe` (أربع خطط + مقارنة + تحكم المالك) — route `subscribe` في `PAGES16`، إعداداتها `site_settings.plans296 = { map:{maqamat,arabic,tajweed: sectionId}, off:{k:bool}, trial:{on,server} }`. Feature flags: `v296.plans`, `v296.trial`, `v296.qguard` (في `ff254`).
- عرض 7 أيام: واجهة بس، مقفول لحد `trial7` (الخادم).
- حارس الأسئلة على `quizView` + اختبار بنوك الأسئلة الثابتة في quality gate.
- تدقيق Supabase حي (قراءة بس) — `docs/audit/SUPABASE-LIVE-AUDIT-v296.md`.
- ⚠️ v296 **ما اتنشرش** على Vercel ولا اتعمل push (الجلسة دي من غير شبكة للـ git). أول خطوة في المحادثة الجاية: push الـ ZIP ده على `main`.

## 4.2) اللي اتعمل في v297
- **الفصحى في كل الواجهة:** أداة كاملة في `tools/fusha/` — `scan.js` (TypeScript scanner يستخرج كل نص عربي من السكربتات مع مواضعه)، `detect.py` (مؤشرات العامية)، `apply.py` (يطبّق خريطة `fusha_map_v297.json` على مواضع النصوص فقط ويستثني بيانات العامية/الخليجي وقاموس v208). أي نص جديد يُكتب بالفصحى، والاختبار `tests/fusha-ui-language.test.js` يفشل لو زادت مؤشرات العامية عن 18.
- ⚠️ الترجمة الإنجليزية لبعض النصوص بتيجي من `en_natural.json` بمفتاح النص العربي — أي تغيير في نص عربي لازم يتضاف له مفتاح جديد بنفس الترجمة (اتعمل لـ 294 نص).
- **/Balagha** (`v297.balagha`): بيانات الوحدة في `bal297.data`.
- **content-drafts/** = مسودات OCR للمالك فقط (مستثناة من النشر). مفيش حاجة منها بتظهر للطلاب.
- الأمان: `docs/audit/MIGRATION-REVIEW-v297.md` + `PROPOSED-MIGRATION-v297.sql` (مش متطبّق).
- ⚠️ v297 **ما اتنشرش** ولا اتعمل push.

## 5) المناهج (حالة حقيقية متحققة)
| المنهج | المكان | الحالة |
|---|---|---|
| العربية بين يديك | `#/ce293/abyb` (`/Curriculum_abyb`) — بيانات `media:ce/abyb/` | **L2U01 كامل بالنص المراجع** (حوارين + قراءة + سؤالين فهم مسموع بإجابات الكتاب). 38 وحدة تانية (L2U02–U15، L3U01–U15، L4: 01،02،03،05،06،07،09،11،14) = صوت أصلي متقسّم + صفحة الكتاب + مسودة OCR للمالك. ناقص: L1 كله، L2U16، L3U16، L4: 04،08،10،12،13،15،16 |
| العارض القديم للكتاب | `#/abyb280` | صفحات + صوت لكل شريحة (L2 15، L3 16، L4 9) |
| العربية بين يدي أولادنا 1–9 | v258/v273 (`kidsar`) | موجود جزئيًا (مش على المحرك الجديد) |
| العامية المصرية | `egyptian` + Azure TTS (v276) | ناقص كتب أنستونا/كلمني بشويش/Advanced |
| النحو والصرف والبلاغة | `nahw` | محتوى قليل — الكتب الأربعة موجودة ولسه ماتحولتش |

أدوات بناء المناهج (في `/home/claude/tools/` ونسخة في `tools/abyb/`): `ce_build.py` (OCR tesseract ara + silencedetect) · `align.py` (توزيع مقاطع الكلام على الجمل بالبرمجة الديناميكية حسب الطول) · `ce_units.py` (بيدمج النسخ اليدوي `HAND` وأسئلة الكتاب `QUIZ` ويكتب `media/ce/abyb/*.json`).

## 6) المصادر وأماكنها
- جهاز المالك (مربوط): `C:\Users\i\Downloads` — فيه `Arabya pptx/` (العربية بين يديك م1–4)، `#Arabic Between our kids/` (أولادنا 1–9)، `masrya/` (أنستونا، كلمني بشويش، ECA Advanced 1–3، لسان مصري)، `النحو والصرف والبلاغه/` (4 كتب).
- السحب من الجهاز (`device_stage_files`) بيقف للملفات الأكبر من ~33 ميجا — لازم المالك يصغّرها أو يرفعها في الشات.
- الكتب **مش في الريبو** (كبيرة وحقوقها خاصة بالمالك).

## 7) قواعد المالك (ثابتة)
- تفويض كامل في الكود والنشر وSupabase. ماتسألش «أكمّل؟». لو حاجة مش واضحة اختار الأنسب وقول اخترت إيه.
- ممنوع: كتابة كلمات سر/مفاتيح/كروت، الدفع، الموافقة على شروط باسمه، إرسال رسائل باسمه.
- الكلام معاه مصري، وآخر كل رد «📌 المطلوب منك» مرقّمة. واجهة الموقع فصحى (ماعدا منهج العامية).
- ماتمسحش أي ميزة — ضيف فوقها. القرآن مايتقراش بالـ AI. المصطلحات الإسلامية: فرانكو + عربي + معنى إنجليزي. مافيش أسماء مصادر على المحتوى ولا لينكات خارجية للمحتوى. الطالب بيسجّل بالمايك بس؛ صوت الجهاز للمالك والمعلم.
- كل تعديل يقدر المالك يختار ينطبق على مين (أنا/الكل/الطلاب/المعلمين/الزوار) — ده موجود في «منشئ التجربة».

## 8) المهمة الجاية الموصى بها
0. **push v296** على `main` واتأكد من `/Subscribe` على الموقع، واربط كل خطة بقسمها من الصفحة نفسها (وانت مالك).
0.1 لو المالك وافق: شغّل `docs/audit/PROPOSED-MIGRATION-v296.sql`، ثم اختبر `backup/edge-functions/payments` على Paymob sandbox وانشرها.
1. **العربية بين يديك**: نسخ ومراجعة الوحدات بنفس طريقة L2U01 (اقرا صورة الشريحة المضمّنة في الـ pptx، اكتب الجمل في `/tmp/<uid>*.json`، ضيفها لـ `HAND`/`QUIZ` في `ce_units.py`، شغّله، push لفرع `media`، purge).
2. نقل «أولادنا» للمحرك، ثم العامية، ثم النحو/الصرف/البلاغة (نفس شكل JSON: `lessons[].lines[]` + `quiz[]`).
3. باقي `MASTER_BACKLOG.md` بالأولوية.

## 9) الاختبار
- محلي: `tools/runh.py` (صفحة + stub)، `tools/runm.py` (بيقدّم فرع media محليًا)، `tools/nav.py` (لينكات/رجوع)، `tools/boot.py` (تسلسل التحميل)، `tools/prof.py` (CPU profile)، `tools/hov.py` (القوائم).
- على الموقع: المتصفح المدمج عند المالك (الـ pane ضيق ≈ موبايل، وبيشتغل كتاب في الخلفية فالمؤقتات بطيئة).
- مافيش اختبار على أجهزة موبايل حقيقية، ومافيش سماع للصوت (توقيتات الجمل اتحسبت آليًا).


## FINAL PROJECT SECURITY AUDIT — MUST NOT BE FORGOTTEN (v296)
- **اتفحص:** advisors الأمان، كل الجداول (RLS ✅ على الكل)، السياسات المفتوحة `true`، 277 دالة SECURITY DEFINER (مين يقدر يشغّلها وفيها تحقق ولا لا)، cron jobs، كود `payments` و`purge-uploads` المنشورين، وجود أسرار في `site_settings` (مفيش).
- **اتصلح:** في الكود بس — حارس الأسئلة، والتجربة المجانية مستحيل تفتح محتوى من المتصفح. **مفيش تغيير على الإنتاج.**
- **ما اتفحصش:** Storage policies، 22 Edge Function، إعدادات Auth/OAuth، RLS بحسابات تجريبية، استرجاع النسخة الاحتياطية، CSP على الموقع الحقيقي.
- **مطلوب:** موافقة المالك على `PROPOSED-MIGRATION-v296.sql`؛ Paymob/PayPal sandbox؛ staging project؛ تفعيل leaked-password protection في Auth.
- **المخاطر الباقية:** F-1 دوال cron مفتوحة، F-5 webhook Paymob المنشور مابيتحققش من العملة ومش ذرّي، F-4 بيانات المسابقات عامة، F-2 معرفة الإيميلات المسجلة.
- **اختبارات لازم تتعمل:** RLS بحسابات (مالك/معلم/طالب/ولي أمر/زائر)، دفع sandbox (نجاح/فشل/تكرار/مبلغ غلط/عملة غلط)، تبديل الحسابات على نفس الجهاز، الموقع على موبايل حقيقي.
- قبل الإطلاق النهائي: مراجعة أمنية مستقلة شاملة. المشروع **مش** مُعلن آمن بالكامل.


## FINAL PROJECT SECURITY AUDIT — MUST NOT BE FORGOTTEN (v297)
- **اتفحص (قراءة بس):** سياسات RLS لـ orders وcontent_access وfree_passes وcompetition_entries وprofiles وsite_settings وprivate_settings؛ صلاحيات الجداول؛ كل حاويات التخزين وسياساتها (13 حاوية)؛ دوال has_content_access وactivate_access وcreate_site_order وcreate_purchase196 وtrg_order_fulfil؛ كود دالة payments المنشورة.
- **النتيجة:** المستخدم مايقدرش يكتب في orders أو content_access؛ التفعيل بيحصل من مشغّل داخل نفس تحديث «paid» (ذرّي) ومشروط بـ neq.paid (مفيش تكرار)؛ اشتراك القسم بيفتح قسمه بس.
- **اتصلح:** في الكود بس (الفصحى، البلاغة، الاختبارات). **مفيش أي تغيير على الإنتاج.**
- **مستني موافقتك:** `docs/audit/PROPOSED-MIGRATION-v297.sql` (دوال cron، search_path، خصوصية competition_entries) — الشرح والمخاطر والتراجع في `MIGRATION-REVIEW-v297.md`.
- **مخاطر باقية:** webhook Paymob المنشور (عملة/مقارنة HMAC/integration_id) — النسخة المقوّاة جاهزة ومستنية Sandbox؛ حاوية `voice` عامة (عيّنات أصوات المستخدمين)؛ تعداد الحسابات عبر `signup_check`؛ السعر حسب الدولة على العرض بس مش على الخادم؛ leaked-password protection مقفول.
- **مش متفحص:** 22 Edge Function، إعدادات Auth/OAuth، RLS بحسابات تجريبية، استرجاع نسخة احتياطية، CSP على الموقع الحقيقي.

## v299 (21/11/2026)
الشريط العلوي أفقي + لوحة 🎚️ (`docs/blocks/v299.js`، `window.nav299`). التفاصيل في `CHANGELOG.md` وآخر قسم في `docs/ORDER_v298_STATUS.md`. ما اتنشرش.

## v298 (21/11/2026)
دفعة إصلاحات واجهة — التفاصيل والمتبقي في `docs/ORDER_v298_STATUS.md`. ما اتنشرش.

## v300 (21/11/2026)
المؤقت ⏱️ (13 شكلًا، `window.tm300`، حدث `tm300` على قناة الفصل) + 12 لعبة جديدة (`window.g300`، أنواعها في `GAMES` داخل `docs/blocks/v300.js`: `q_*` أسئلة، `a_*` أركيد محلي، `rps`، `c4`). يلفّ `gameStart/gameRender/gameRecv/rmMenu/rmRenderBar/rmOnEv/roomTeardown`. زر المؤقت يُحقن في `.rail288` بجانب بلاط «السبورة». التفاصيل في `CHANGELOG.md`. ما اتنشرش.
