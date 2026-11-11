# تطبيق أكاديمية إتقان (Android / iOS)

الموقع جاهز يتحوّل لتطبيق، لأنه **PWA**: فيه `manifest.json` و`sw.js` وأيقونات في `icons/`.

## 1) التثبيت الفوري (من غير متاجر)
- **أندرويد / كمبيوتر (Chrome/Edge):** زر «ثبّت تطبيق الأكاديمية» بيظهر تحت في الموقع وفي القائمة.
- **آيفون (Safari):** زر المشاركة ⬆️ ← «إضافة إلى الشاشة الرئيسية».

## 2) نشر على Google Play و App Store (Capacitor)
التطبيق هيفتح نفس الموقع ونفس قاعدة البيانات (Supabase)، فأي تعديل على الموقع يظهر في التطبيق فورًا.

```bash
npm init -y
npm i @capacitor/core @capacitor/cli @capacitor/android @capacitor/ios
npx cap init "Itqan Academy" com.itqan.academy --web-dir=www
mkdir -p www && cp index.html manifest.json sw.js -r icons www/
```
في `capacitor.config.json` أضف:
```json
{ "server": { "url": "https://quran-academy-nine-dusky.vercel.app", "cleartext": false } }
```
ثم:
```bash
npx cap add android && npx cap open android   # Android Studio → Build → Generate Signed Bundle
npx cap add ios && npx cap open ios           # Xcode (يحتاج Mac + حساب Apple Developer)
```

### اللي هتحتاجه
- حساب Google Play Developer (رسوم مرة واحدة).
- حساب Apple Developer (اشتراك سنوي) + جهاز Mac للبناء.
- لإشعارات الموبايل الحقيقية (Push) لاحقًا: Firebase Cloud Messaging.
