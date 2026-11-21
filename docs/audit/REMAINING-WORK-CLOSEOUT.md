# Itqan Academy — remaining work and closeout register

Date: 20 November 2026. This register distinguishes repository work from tasks requiring owner access, source materials, or real devices. It is not a claim that production has been audited or deployed.

## A. Work completed in the repository patch series

- Static validation for JSON, JavaScript, Python, inline scripts, and workflow YAML.
- Electron URL allowlist and navigation guards, with unit tests.
- Service Worker host/request-routing checks and tests; authenticated Supabase reads bypass the shared cache.
- PWA manifest/precache asset checks.
- Android/Desktop release workflow consistency checks; release publishing is manual rather than automatic on every push.
- Archived payment callback validation hardening and tests. These backup functions are not proven to be the deployed functions.
- Read-only Supabase metadata inventory SQL and a safe handoff procedure.
- Restore, release, incident, and security-test runbooks.

## B. Requires the actual Supabase project owner/export

1. Run `SUPABASE-READONLY-AUDIT.sql` in the correct project and provide the 12 result sets.
2. Export schema/migrations for `public` and relevant `storage` objects. Do not include row data.
3. Export source for every deployed Edge Function, especially auth, payments, TTS, media signing, attendance/classroom, booking, and AI.
4. Provide Auth provider and redirect/CAPTCHA/rate-limit configuration as names/settings only; never send secret values.
5. Provide Storage bucket metadata and policies. Do not provide private objects or student media.
6. Confirm the canonical production hostname and which Supabase project is production vs staging.

No service-role key, JWT secret, database password, payment secret, student record, or private media is needed for this review.

## C. Content and curriculum tasks explicitly still open in MASTER_BACKLOG.md

| Area | Recorded status | Needed to finish |
|---|---|---|
| Arabic Between Your Hands remaining units | PARTIAL | Source book/unit files, reviewed text, exercises, and validation unit by unit |
| Arabic Between Your Hands missing volumes/chapters | BLOCKED | Missing source PDFs/files; some large files were not available in the prior session |
| Arabic Between Our Hands / children 1–9 | TODO | Owner's PDFs and a content-by-content comparison with existing v258/v273 data |
| Egyptian colloquial curricula | TODO | Anstona, Kalemni Beshweesh, ECA Advanced 1–3, Lisan Masri source files |
| Grammar, morphology, rhetoric | TODO | Four source PDFs and structured extraction/review |
| Placement and per-student level unlock in unified curriculum | PARTIAL | Define owner workflow and test authorization/progress behavior |
| Full English authored content | PARTIAL | Original English source content, not automatic translation |
| Arabic/Islamic content review | TODO | Complete source inventory and qualified content review |
| ZAD books and Islamic biographies | TODO | Source content and rights/approved material |
| Teacher/owner student registration in student page | TODO | Product behavior and role/permission acceptance criteria |
| AI agent in My Space | TODO | Provider, budget, safety boundaries, and owner approval |
| Free-drag experience builder | TODO | Interaction spec and browser/device acceptance tests |

## D. Real-world validation still required

- Run the release workflow manually and inspect the generated artifacts.
- Install and test Android APK on supported physical devices; verify offline launch and update behavior.
- Build and launch Desktop on each supported OS; test external-link handling and offline fallback.
- Verify iOS project existence and ownership before deciding whether any native iOS work is needed.
- Test payment flows in Paymob and PayPal sandbox using test credentials configured privately by the owner.
- Configure GitHub branch protection and require the quality-gate check; configure equivalent Vercel deployment protection.
- Restore a backup into an isolated staging project and run a documented recovery drill.
- Run authenticated/unauthenticated RLS tests using synthetic accounts, not real student records.

## E. Acceptance gate before production release

A production release is not approved until all of the following have evidence:

- Supabase RLS, grants, Storage policies, SECURITY DEFINER functions, and deployed Edge Functions reviewed.
- Owner/admin/teacher/student permissions tested with synthetic accounts.
- Payment webhooks verified for signature, amount, currency, integration/account identity, idempotency, and atomic order transition.
- Quran audio path regression-tested and confirmed excluded from Azure TTS.
- Curriculum, language switching, and original-language content regression-tested.
- PWA offline behavior and authenticated cache isolation tested on real devices.
- Android/Desktop builds installed and smoke-tested; iOS scope confirmed.
- Backup restore completed in staging; monitoring and incident contacts configured.

## F. What this patch does not do

It does not connect to or modify the live Supabase project, deploy Edge Functions, configure GitHub/Vercel account settings, charge/capture payments, generate missing curriculum source content, or certify the application as secure. Those actions require owner-controlled systems, source materials, or explicit production authorization.
