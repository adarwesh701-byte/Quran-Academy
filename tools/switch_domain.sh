#!/bin/bash
# تحويل الموقع للدومين الجديد بأمر واحد — شغّله بس بعد ما الدومين يفتح الموقع فعلًا (Vercel ← Domains يقول Valid Configuration).
# usage: tools/switch_domain.sh quran-itqan.com      (ينفع يتشغّل أكتر من مرة من غير ما يكرر حاجة)
set -e
NEW=${1:-quran-itqan.com}
cd "$(dirname "$0")/.."
FILES="index.html sitemap.xml robots.txt apps/desktop/main.js apps/android/capacitor.config.json apps/android/www/index.html"
for f in $FILES; do
  [ -f "$f" ] || continue
  sed -i -e "s#itqan-maqamat-academy.vercel.app#$NEW#g" -e "s#quran-academy-nine-dusky.vercel.app#$NEW#g" "$f"
done
# الأسماء القديمة بتحوّل للدومين الجديد (308) — الروابط والتطبيقات القديمة هتفضل شغالة
NEW="$NEW" python3 tools/switch_domain_redirects.py
echo "✅ اتغيّر لـ $NEW — اعمل commit/push، وبعدين حدّث Supabase Auth (Site URL + Redirect URLs) وGoogle OAuth origins."
