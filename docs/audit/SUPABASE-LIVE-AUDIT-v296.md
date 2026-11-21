# Supabase live read-only audit — v296 (20 Nov 2026)

Project: `ymycfxmigvvermsdnagm` (quran-academy-db, eu-west-2, Postgres 17). Method: Supabase security advisors + read-only catalog queries (`pg_proc`, `pg_policies`, `pg_class`, `cron.job`) + reading deployed Edge Function source. **Nothing was changed in the database or in any Edge Function.** No student rows were read (only counts on one empty table).

## Summary
| Area | Result |
|---|---|
| RLS enabled on every `public` table | ✅ yes (0 tables without RLS) |
| Table with RLS but no policy | `contents_links_backup266` (deny-all — OK, it's a backup) |
| Tables readable by everyone (`USING true`) | books, competition_entries, competition_judges, lib_pages200, library_items, my_recitations (empty), sanad_chains, site_settings, tafsir_tr, tr_en, ui_i18n; authenticated-only: khatmas, khatma_parts, maqam_scores, room_closed. All look like intentionally public content **except** `competition_entries` (exposes `user_id`, `display_name`, `country`, `order_id` publicly) — see F-4 |
| `site_settings` holds no keys named key/secret/token/password/api/webhook/smtp | ✅ |
| SECURITY DEFINER functions | 88 executable by `anon`, 189 by `authenticated` (advisor WARN). Most check `auth.uid()`/`is_owner()` inside — reviewed below |
| Leaked-password protection (HaveIBeenPwned) | ❌ off (Auth setting — owner toggles in dashboard) |
| `pg_net` in `public` schema, 2 functions with mutable `search_path` | WARN |

## Findings
| ID | Severity | Finding | Fix |
|---|---|---|---|
| F-1 | MEDIUM | Cron-only job functions are callable by anyone through `/rest/v1/rpc/...` with no caller check: `lesson_policy_jobs()` (sets `itqan.bypass`, auto-marks attendance after 2 days, creates recurring lessons, releases slots), `hw_remind()`. Running them early mostly repeats cron work, but it lets an anonymous caller trigger writes/notifications at will. | `REVOKE EXECUTE … FROM anon, authenticated` (cron runs as `postgres`, unaffected). In `docs/audit/PROPOSED-MIGRATION-v296.sql`. |
| F-2 | MEDIUM | `signup_check(email, phone)` is anon-callable and returns `email_taken` / `phone_taken` → account enumeration. | Product decision: keep (better signup UX) or return a generic answer + rate-limit. Not changed. |
| F-3 | LOW | Info helpers that take an arbitrary user id are anon-callable: `price_factor(p_user)`, `content_discount(p_uid)`, `can_review(p_user)`, `room_presence_seconds(...)`. Need a valid UUID (not guessable), leak only booleans/numbers. | Revoke from `anon` after checking the client never calls them logged-out (proposed, commented). |
| F-4 | LOW–MEDIUM | `competition_entries` is world-readable including `user_id` and `order_id`. | Replace the `true` policy with a view that exposes only display_name/country/rank, or restrict columns. Needs owner decision (public leaderboard). |
| F-5 | MEDIUM | Deployed `payments` Edge Function (v7) differs from the hardened copy in `backup/edge-functions/payments/`: Paymob callback does **not** check `currency === "EGP"`, compares HMAC with `!==` (not constant-time), and marks paid + activates in two non-atomic REST calls. PayPal capture checks status, custom_id, USD and amount ✅. | Deploy the hardened copy **after** a Paymob sandbox test. Not deployed (payments = needs owner approval). |
| F-6 | LOW | `purge-uploads` is triggered by cron with the public anon key (`verify_jwt` passes with anon). Anyone can trigger it, but it only deletes files older than 3 days (same as cron), so impact is extra load only. | Move to the `x-art-key` header pattern used by other cron functions. |
| F-7 | LOW | `yearly_plans_auto`, `geo196_guard` have mutable `search_path`; `pg_net` in `public`. | `ALTER FUNCTION … SET search_path = public` (in proposed migration). |
| F-8 | INFO | Trigger functions are listed as anon-executable; calling a trigger function via RPC fails by design, so no impact. | none |
| F-9 | INFO | Auth leaked-password protection is off. | Owner: Dashboard → Auth → Passwords → enable. |

## Not checked (still open)
Storage bucket policies; every one of the 24 Edge Functions in detail (only `payments` and `purge-uploads` read); Auth redirect/OAuth settings; RLS behaviour with synthetic accounts (needs a staging project); backups/restore drill.

## Edge Functions deployed (24)
lesson-rec, art-gen, dom-check, secure-media, send-email, azure-tts, book-import, lesson-report, paypal-capture, ai, phone-login, book-tr, calendar, purge-uploads, tr-run, geo, bayan, tafsir-tr, tts, vclone, translate, gcal-busy, turath, vinbox, payments. Functions with `verify_jwt=false` must do their own auth (most cron ones use the `x-art-key` header from `art_cfg`).
