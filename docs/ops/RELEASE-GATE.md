# بوابة الإطلاق — أكاديمية إتقان

## الهدف
منع نشر تحديث يكسر الموقع. هذه البوابة تفحص الملفات والاختبارات المتاحة داخل المستودع؛ ولا تعني وحدها أن Vercel أو Supabase أصبحا محميين من النشر.

## سير العمل المعتمد
1. كل تغيير يدخل عبر Pull Request إلى `main`.
2. يجب نجاح GitHub Actions: `Quality gate / static-and-unit-tests`.
3. إعداد Branch protection في GitHub ليكون هذا الفحص Required، ومنع direct pushes إلى `main`.
4. إعداد Vercel Git integration بحيث تكون Production Branch هي `main`، وأن تُشترط نتيجة الفحص قبل ترقية Production. إعداد هذا الشرط من لوحة Vercel/GitHub يدويًا؛ لا يمكن تفعيله من ملفات المستودع وحدها.
5. النشر إلى Preview أولًا، ثم اختبار تسجيل الدخول والتنقل والصوت واللغات والاختبارات على Preview.
6. لا تنفذ Database migrations أو تغييرات Secrets أو إعدادات دفع في نفس PR الخاص بتغيير الواجهة إلا بخطة منفصلة ومراجعة واضحة.
7. احتفظ بآخر Deployment سليم، واستخدم Rollback من Vercel عند فشل الإصدار. تراجع Vercel لا يعكس تغييرات قاعدة البيانات؛ لذلك يجب أن تكون migrations متوافقة للخلف وقابلة للتراجع.
8. إصدار تطبيقات Desktop/Android أصبح يدويًا عبر `workflow_dispatch` بدل إصدار Release تلقائي عند كل Push.

## ما تفحصه Quality Gate حاليًا
- JSON parsing.
- JavaScript syntax للملفات `.js`.
- Python compilation.
- اختبارات وحدة لسياسة روابط وصلاحيات Electron.

## ما لا تفحصه بعد
- صلاحية TypeScript/Deno Edge Functions.
- متصفح حقيقي وE2E.
- Supabase RLS وRPC وStorage.
- Paymob/PayPal Sandbox.
- أداء Lighthouse وCore Web Vitals.
- Android/iOS/Windows/macOS الفعلية.

لا تعتمد الإصدار إذا فشل أي مسار حرج أو لم يُختبر.
