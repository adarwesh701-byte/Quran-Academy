# Itqan Academy — remaining verification blockers

This list is intentionally explicit: a repository patch cannot safely complete work that requires production credentials, deployed service configuration, owner decisions, or real devices.

## P0 — must be verified before production security sign-off

- [ ] Supabase: inspect all `public` tables, RLS enabled/forced state, policies, grants, views, RPCs, triggers, and Storage policies using `SUPABASE-READONLY-AUDIT.sql`.
- [ ] Supabase: obtain the source of every deployed Edge Function and compare it with the three archived copies in `backup/edge-functions/`.
- [ ] Confirm that every client-callable RPC independently checks the caller's role/ownership; never trust hidden UI buttons as authorization.
- [ ] Confirm `private_settings`, owner profiles, payment settings, API keys, and private media cannot be read by `anon` or ordinary `authenticated` users.
- [ ] Test Auth redirect allowlists, email confirmation, password reset, OAuth callbacks, session revocation, and rate limits in a staging project.
- [ ] Payment: run Paymob and PayPal Sandbox success/failure/replay/duplicate/refund/amount-mismatch/currency-mismatch tests against the deployed functions.
- [ ] Payment: replace the two-step order/activation update with a schema-confirmed atomic transaction/RPC and idempotency guard before production reliance.

## P1 — application and release readiness

- [ ] Generate and commit lockfiles for Android and Desktop; switch CI from `npm install` to `npm ci` after confirming platform compatibility.
- [ ] Execute the manual GitHub Actions preview workflow; install the Android debug APK and each desktop package on real target OS versions.
- [ ] Decide whether Android should keep the current remote `server.url` or move to the bundled local `www` app; test login, OAuth, deep links, camera/microphone, file upload, push/notifications, and offline before changing it.
- [ ] Run browser E2E tests for Owner, Teacher, Student, Parent, logged-out visitor, and disabled/suspended accounts.
- [ ] Test account switching and logout on shared devices; verify no user-specific content persists in Cache API, IndexedDB, localStorage, or media cache.
- [ ] Test Quran audio playback, reciter selection, tajweed/mushaf pages, lesson audio, and all existing voice providers on real devices. Do not route Quran recitation through Azure TTS.
- [ ] Produce a CSP Report-Only report in staging, map every required script/connect/frame/media source, then stage enforcement without breaking inline app behavior.
- [ ] Enable GitHub branch protection / required quality-gate status and Vercel deployment protection in the actual account settings.
- [ ] Confirm the canonical production domain with the owner, then align canonical/OG/robots/sitemap, Capacitor, Electron, Auth redirects, and OAuth allowlists.

## P2 — product/content backlog still open in `MASTER_BACKLOG.md`

- [ ] Complete remaining Arabic curriculum text, reviewed exercises, and assessments; preserve source attribution and existing lesson structure.
- [ ] Finish Arabic for Children levels and remaining chapters using the supplied source books; do not invent lesson content.
- [ ] Finish Egyptian colloquial tracks and the grammar/morphology/rhetoric books from source files.
- [ ] Complete placement tests and per-student level unlocking across the unified curriculum.
- [ ] Finish remaining UI formal-Arabic coverage while keeping the Egyptian dialect section unchanged.
- [ ] Complete owner-to-student teacher assignment and remaining classroom/admin workflows.
- [ ] Finish Islamic books/figures and other TODO entries in `MASTER_BACKLOG.md`.

## What this patch actually verifies

- Static syntax and JSON validity; zero duplicate JSON keys in the one-off scan of the 869 JSON files.
- 21 automated Node tests pass, including Electron navigation policy, Service Worker cache isolation, PWA asset paths, release workflow consistency, archived payment-validation helpers, and read-only SQL safety.
- GitHub workflow YAML parses locally and the Patch4 ZIP integrity check passes.

No production deployment, database change, payment test against a provider, real-device test, penetration test, or disaster-recovery restore has been performed in this environment.
