# Test report — v297

## Automated, actually executed in this session
| Test | Result |
|---|---|
| Quality gate (`node scripts/quality-gate.mjs`) — JSON (872), JS syntax, Python, inline scripts, Electron, SW, PWA, workflows, payment helpers, audit SQL, **question banks (457 MCQs incl. 24 new)**, **Fusha UI guard** | PASS |
| Fusha UI guard: strong Egyptian markers in UI strings outside dialect curricula | v296: **943** → v297: **18** (remaining are regex patterns, single dictionary words, and the tribe name «دوس» in a hadith) |
| Route crawl (Chrome headless + Supabase stub): every route in `PAGES16`+`HASH_ROUTES`, desktop 1280×900 and mobile 390×844, Arabic and English | see table — **0 JavaScript errors** on all 4 runs |
| Subscription page E2E (`tools/e2e/e2e296.py`) re-run on v297 | PASS (4 plans, comparison, trial visibility rules, question guard, pricing link once) |
| Balagha unit E2E | PASS — `/Balagha` opens from its readable link, 6 lessons, unit test of 24 questions, perfect run scores 100% and is saved |

| run | v296 routes / routes with JS errors | v297 routes / routes with JS errors | empty pages (v297) | horizontal scroll (v297) |
|---|---|---|---|---|
| desktop-ar | 164 / 0 | 165 / 0 | 0 | 0 |
| desktop-en | 164 / 0 | 165 / 0 | 0 | 0 |
| mobile-ar | 164 / 0 | 165 / 0 | 0 | 0 |
| mobile-en | 164 / 0 | 165 / 0 | 0 | 0 |

Console errors (6 per run, identical in v296 and v297) are network fetches that the offline test harness blocks on purpose (CDN/media/Quran APIs) — not code errors.

## Not tested (needs the real environment)
- Real Supabase data, logged-in roles (owner/teacher/student/parent) on the live site, real phones/tablets, audio playback.
- Payments in Paymob/PayPal Sandbox (no sandbox credentials in this session).
- Production deploy (no git push from this session; owner approval required).
- The proposed DB migration (not applied — awaiting approval).
