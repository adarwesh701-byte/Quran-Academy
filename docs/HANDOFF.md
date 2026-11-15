# أكاديمية إتقان — دليل تسليم المشروع (لمهندس أو لأي ذكاء اصطناعي)

الملف ده بيشرح إزاي أي حد (مهندس، أو Claude من حساب تاني، أو أي AI) يكمّل المشروع من نفس النقطة.

## 1) المشروع متكوّن من إيه
| الجزء | فين | مين يقدر يدخله |
|---|---|---|
| الكود كله | GitHub: `adarwesh701-byte/Quran-Academy` (ملف واحد `index.html` + `sw.js` + `en_natural.json` + `docs/`) | انت (المالك) + أي حد تضيفه Collaborator |
| الاستضافة | Vercel — بيتنشر لوحده من فرع `main` | حساب Vercel بتاعك |
| الداتابيز والتخزين والدوال | Supabase project `ymycfxmigvvermsdnagm` | حساب Supabase بتاعك |
| الاستنساخ | `docs/itqan_voice_colab.ipynb` + `docs/vgen.py` + `docs/vupload.py` على Google Colab | أي حساب جوجل |

## 2) تدّي حد صلاحية (من غير ما تديله كلمة سرك أبدًا)
1. **GitHub:** الريبو ← Settings ← Collaborators ← Add people ← إيميله/اسمه ← Write.
2. **Supabase:** Organization ← Team ← Invite ← إيميله ← Developer (مش Owner).
3. **Vercel:** Team Settings ← Members ← Invite (لو محتاج يشوف النشر بس).
4. **لما يخلص:** شيل صلاحياته من نفس الأماكن.
> متديش أبدًا: كلمة سر حسابك، مفتاح `service_role` بتاع Supabase في رسالة، أو مفاتيح الدفع.

## 3) تدّيه لـ AI تاني يكمّل
- **Claude (اشتراك تاني أو Claude Code):** افتح محادثة جديدة ← اربط GitHub ← قوله:
  «اقرا `docs/HANDOFF.md` في الريبو `adarwesh701-byte/Quran-Academy` وكمّل من (اكتب الطلب). اتبع طريقة الإصدارات المكتوبة فيه، واتكلم معايا مصري.»
  ولو عايزه يعدّل الداتابيز: اربط Supabase من الـ Connectors.
- **AI مجاني (زي Gemini أو ChatGPT):** ابعتله الملف ده + الجزء اللي عايز تعدّله من `index.html` (مش الملف كله — كبير). خليه يكتب «بلوك نسخة جديدة» زي اللي تحت، والصقه انت قبل سطر `// بدء التشغيل`، وارفع على GitHub (من الموقع نفسه: Add file ← Upload).

## 4) طريقة الإصدارات (الأمان: كل تعديل في بلوك لوحده، والقديم مايتمسحش)
1. اكتب بلوك جديد: `/* ===== vNNN: وصف ===== */ (function(){ ... })();`
2. حطه قبل السطر `// بدء التشغيل` في `index.html`.
3. غيّر `const UI_VERSION = "YYYY-MM-DD-vNNN"`، وغيّر `itqan-vNNN` في `sw.js`.
4. اختبر: انسخ السكربت الرئيسي (اللي بعد سطر supabase-js) لملف وشغّل `node --check`.
5. اعمل Commit وPush على `main`، وVercel بينشر في دقيقة.
6. **لو حاجة باظت:** في Vercel ← Deployments ← اختار النسخة اللي قبلها ← Promote to Production. ده بيرجّع الموقع في ثانية.

## 5) أهم الدوال اللي جوه الكود
`state`، `render`، `navigate(route)`، `go16(route,arg)`، `useData(key,fn)`، `sb` (Supabase)، `setv/saveSetting16` (إعدادات الموقع)، `ownerSettings()` (صفحة الإعدادات — كل نسخة بتضيف كارت)، `realRole()`، `toast`، `esc`، `L()`، `ART` (الصور)، `vlHash` (هاش الأصوات)، `DT` و`EN146` (الترجمة).

## 6) جداول مهمة في Supabase
`profiles`، `content_sections`، `contents`، `books`/`book_rows`، `art_assets` (الصور: pending ← review ← done)، `voice_lines` و`vclone_jobs` (الأصوات)، `tr_en` (الترجمة الإنجليزي)، `text_requests` (طلبات تصحيح الكلام)، `student_tasks` و`notifications`، `private_settings` (المفاتيح السرية).

## 7) قواعد المالك
- الكلام مع المالك بالمصري، والأسئلة مرقّمة.
- الإنجليزي لازم يبان أصلي مش مترجم. القرآن، وأي حاجة بين «» أو ﴿﴾، والكلمات العربية اللي بتتعلّم، تفضل عربي.
- أي صورة بالذكاء الاصطناعي مش بتظهر للطلاب غير بعد موافقة المالك. الأصوات المستنسخة بتتنشر على طول.
- القرآن عمره ما يتعمل بالذكاء الاصطناعي، والكتب الحديثة اللي ليها حقوق ماتتنشرش كاملة.

## 8) اللي لسه مفتوح
راجع آخر رسالة في المحادثة مع Claude (قايمة «اللي ما خلصش»).
