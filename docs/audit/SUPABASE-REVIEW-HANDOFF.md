# Supabase audit handoff — Itqan Academy

## What can be reviewed from this repository

The frontend uses the Supabase project URL and public anon key in `index.html`. That is expected for a browser client; it is not a substitute for database security. Access control must be enforced by RLS, grants, storage policies, and trusted Edge Functions. The Service Worker now caches only REST reads whose `Authorization` header exactly matches the request's public `apikey`; authenticated/RLS-scoped reads bypass the shared offline cache.

## Read-only metadata inventory

1. Open the Supabase Dashboard for the correct Itqan Academy project.
2. Open SQL Editor and run `SUPABASE-READONLY-AUDIT.sql`.
3. Export the result grids locally. The script contains SELECT statements only and does not alter project state.
4. Also export the database schema/migrations and the source of every deployed Edge Function from the dashboard/CLI. Edge Function source cannot be fully inventoried by the SQL script.
5. Do not export student rows, auth user lists, private storage objects, access tokens, service-role keys, payment secrets, or `.env` values.

## Required material for a complete review

- The seven result sets from the read-only SQL inventory.
- Schema/migrations for `public` and relevant `storage` objects, with secrets removed.
- Deployed Edge Function source for authentication-sensitive operations, payment callbacks/capture, TTS, media signing, classroom/attendance, booking, and any AI endpoints.
- The names and configuration (not secret values) of enabled Auth providers, redirect URL allowlists, CAPTCHA/rate-limit settings, and webhook endpoints.
- Storage bucket names, public/private status, MIME/size limits, and policies.

## Redaction rules

Never send service-role keys, JWT signing secrets, database passwords, OAuth client secrets, Paymob/PayPal secrets, student records, email/phone lists, or private media. Replace secret values with `[REDACTED]`; keep table/column/policy/function names so the review remains useful. Do not run unreviewed SQL that changes roles, grants, policies, triggers, or owner accounts.

## Important limitation

No live Supabase project was accessed or changed as part of this repository patch. Until the metadata and deployed function source are reviewed, production RLS, Storage security, RPC authorization, and payment webhook correctness remain **unverified**.
