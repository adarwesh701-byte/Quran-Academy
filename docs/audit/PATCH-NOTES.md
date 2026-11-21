# Patch notes — v295 audit copy

1. Hardened Electron navigation checks to use exact HTTPS host allowlists instead of string-prefix/substring checks.
2. Restricted Electron permission requests/checks to the Academy's HTTPS origins and an explicit permission list.
3. External links are opened only for HTTP(S)/mailto protocols; unsafe schemes are blocked.
4. Hardened the archived Paymob webhook implementation: POST-only webhook route, strict 128-character hexadecimal HMAC validation, constant-time comparison, explicit EGP currency match, and exact expected amount in piastres. This is an archived function only; it has not been deployed or tested against Paymob Sandbox.
5. No production configuration, live database, deployed Edge Function, Quran content, or student data was changed.

`node --check apps/desktop/main.js` and the navigation/permission behavior harness passed. Build/package and real Electron navigation tests still need to be run in the target OS environments.

## دفعة إضافية — حوكمة الإصدارات والاختبارات التشغيلية
6. فصل سياسة روابط Electron في `apps/desktop/security.js` لتصبح قابلة للاختبار دون تشغيل Electron، مع منع النطاقات الفرعية غير المدرجة وبيانات الاعتماد داخل URL وبروتوكولات غير آمنة.
7. إضافة اختبارات Node المدمجة في `apps/desktop/test/security.test.js` لسياسة النطاقات والصلاحيات والروابط الخارجية.
8. إضافة `scripts/quality-gate.mjs` وGitHub Actions workflow لفحص JSON وJavaScript وPython وكتل JavaScript المضمنة وJSON-LD واختبارات Electron.
9. جعل إصدار التطبيقات من `apps.yml` يدويًا فقط عبر `workflow_dispatch` لتجنب نشر Release تلقائيًا عند كل Push.
10. إضافة خطط موثقة لاختبار الاختراق المصرح به في Staging، ومراقبة التشغيل والاستجابة للحوادث، وتجربة الواجهات حسب الدور، واختبار التعافي من الكوارث.
11. إزالة تعليمات إرسال نسخة البيانات الاحتياطية إلى Claude، وإزالة SQL المباشر لترقية المالك من دليل الاستعادة العام.

التحقق المحلي بعد هذه الدفعة: Quality Gate نجح. هذا لا يثبت نجاح E2E أو فحص Supabase/Production أو مزودي الدفع.


## دفعة إضافية — عزل كاش Supabase والتحقق من حزم التطبيقات
12. منع Service Worker من قراءة/تخزين ردود REST الخاصة بالجلسات المسجلة؛ الكاش دون إنترنت أصبح يقتصر على الطلبات التي يكون فيها Authorization مساويًا لمفتاح anon العام الموجود في apikey.
13. إضافة اختبارات سلوكية تثبت أن ردود RLS الخاصة لا تدخل Cache API، مع استمرار إتاحة تخزين قراءات anon العامة.
14. إصلاح ترتيب تجهيز حزمة Android بإنشاء `www/` قبل نسخ ملفات الويب إليها؛ كان مجلد webDir غير مضمون الوجود في بيئة CI النظيفة.
15. إضافة اختبارات اتساق لخطوات Android/Desktop release وملفات الأصول، وضمها إلى Quality Gate.

الاختبارات تثبت سلوك الكود محليًا فقط؛ لم يتم اختبار بناء APK فعليًا أو تشغيل تطبيق على جهاز، ولم يتم تغيير `server.url` الحالي في Capacitor حتى لا يتغير سلوك التطبيق المنشور دون اختبار توافق.

16. تجهيز استعلام SQL للقراءة فقط لحصر RLS والسياسات والمنح والدوال والـ Views وبيانات Storage الوصفية، مع دليل تسليم آمن لمراجعة Supabase دون تصدير بيانات الطلاب أو الأسرار.

17. تشديد التحقق في نسخة Edge Function الاحتياطية للدفع: PayPal يتطلب المبلغ المطابق بالضبط لأقرب سنت بدل قبول أي زيادة، وPaymob يتطلب integration_id ضمن قائمة التكاملات المصرح بها بالإضافة إلى المبلغ والعملة وحالة المعاملة. أضيفت اختبارات مستقلة لهذه الشروط. هذه نسخة backup فقط ولم يثبت أنها منشورة.
