# Test report — v296 (batch01)

| Test | Result |
|---|---|
| Quality gate (`node scripts/quality-gate.mjs`): JSON 869 files, JS syntax, Python 14 files, inline scripts, Electron, SW, PWA, workflows, payment helpers, audit SQL | PASS |
| Question bank validation (433 fixed MCQs) | PASS — 0 errors |
| Browser E2E (`tools/e2e/e2e296.py`, Chrome headless + Supabase stub), desktop 1280×900 and mobile 390×844 | PASS — /Subscribe opens from its readable link, 4 plans, server-priced buttons, comparison grid, paused plan hidden from students, no owner controls for visitors, trial card hidden for visitors and before the free hour, shown after it, start button hidden while server not ready, question guard dedupes/drops, pricing link inserted once (idempotent), no page errors, no horizontal scroll on mobile |
| Real devices, real Supabase data, real payments | NOT TESTED (needs owner/devices/sandbox) |
| Production deploy | NOT DONE — no git network in this session |

Raw E2E output:
```json
{
 "desktop": {
  "dbgSecs": "[{\"id\":\"s-maq\",\"title\":{\"ar\":\"المقامات\",\"en\":\"Maqamat\"},\"price\":12},{\"id\":\"s-ar\",\"title\":{\"ar\":\"اللغة العربية\",\"en\":\"Arabic\"},\"price\":10},{\"id\":\"s-taj\",\"title\":{\"ar\":\"التجويد\",\"en\":\"Tajweed\"},\"price\":",
  "dbgType": "[{\"id\":\"s-maq\",\"title\":{\"ar\":\"المقامات\",\"en\":\"Maqamat\"},\"price\":12},{\"id\":\"s-ar\",\"title\":{\"ar\":\"اللغة العربية\",\"en\":\"Ara",
  "route": "subscribe",
  "url": "/Subscribe",
  "cards": 4,
  "cardTitles": [
   "Full content",
   "Maqamat",
   "Arabic language",
   "Tajweed"
  ],
  "prices": [
   "$12 / 30 days",
   "$10 / 30 days"
  ],
  "subscribeBtns": [
   "Monthly · $20",
   "Yearly · $150",
   "🔓 Subscribe to Maqamat",
   "🔓 Subscribe to Arabic language"
  ],
  "tajweedNotForSale": false,
  "compareRows": 5,
  "trialShownToGuest": false,
  "trialShownAfterHour": true,
  "trialStartBtnWhenServerOff": false,
  "trialHiddenBeforeHour": true,
  "noOwnerControlsForGuest": true,
  "pausedHidden": true,
  "q1Opts": [
   "كتاب",
   "قلم",
   "بيت"
  ],
  "afterDropLen": 2,
  "q2now": "q3",
  "q3OptsKeepDiacritics": 3,
  "qg": {
   "checked": 3,
   "fixed": 1,
   "dropped": 1
  },
  "pricingLinkCount": 1,
  "pretty": "/Subscribe",
  "fromPath": "#/subscribe",
  "ver": "2026-11-20-v296",
  "pageErrors": []
 },
 "mobile": {
  "dbgSecs": "[{\"id\":\"s-maq\",\"title\":{\"ar\":\"المقامات\",\"en\":\"Maqamat\"},\"price\":12},{\"id\":\"s-ar\",\"title\":{\"ar\":\"اللغة العربية\",\"en\":\"Arabic\"},\"price\":10},{\"id\":\"s-taj\",\"title\":{\"ar\":\"التجويد\",\"en\":\"Tajweed\"},\"price\":",
  "dbgType": "[{\"id\":\"s-maq\",\"title\":{\"ar\":\"المقامات\",\"en\":\"Maqamat\"},\"price\":12},{\"id\":\"s-ar\",\"title\":{\"ar\":\"اللغة العربية\",\"en\":\"Ara",
  "route": "subscribe",
  "url": "/Subscribe",
  "cards": 4,
  "cardTitles": [
   "Full content",
   "Maqamat",
   "Arabic language",
   "Tajweed"
  ],
  "prices": [
   "$12 / 30 days",
   "$10 / 30 days"
  ],
  "subscribeBtns": [
   "Monthly · $20",
   "Yearly · $150",
   "🔓 Subscribe to Maqamat",
   "🔓 Subscribe to Arabic language"
  ],
  "tajweedNotForSale": false,
  "compareRows": 5,
  "trialShownToGuest": false,
  "trialShownAfterHour": true,
  "trialStartBtnWhenServerOff": false,
  "trialHiddenBeforeHour": true,
  "noOwnerControlsForGuest": true,
  "pausedHidden": true,
  "q1Opts": [
   "كتاب",
   "قلم",
   "بيت"
  ],
  "afterDropLen": 2,
  "q2now": "q3",
  "q3OptsKeepDiacritics": 3,
  "qg": {
   "checked": 3,
   "fixed": 1,
   "dropped": 1
  },
  "pricingLinkCount": 1,
  "pretty": "/Subscribe",
  "fromPath": "#/subscribe",
  "ver": "2026-11-20-v296",
  "hScroll": false,
  "pageErrors": []
 }
}
```
