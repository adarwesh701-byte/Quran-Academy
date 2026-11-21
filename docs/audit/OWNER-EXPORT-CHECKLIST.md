# Owner export checklist — safe handoff

Use the correct Supabase project and keep all exports local until secrets and personal data are removed.

- [ ] Run `SUPABASE-READONLY-AUDIT.sql`; export all 12 metadata result sets as CSV.
- [ ] Export schema/migrations only (no table rows, no auth users).
- [ ] Export all deployed Edge Function source directories.
- [ ] Export Auth configuration names and non-secret settings only.
- [ ] Export Storage bucket configuration and `storage.objects` policies, not object contents.
- [ ] Identify production and staging project references and canonical domain.
- [ ] Remove `.env`, access tokens, private keys, service-role keys, JWT secrets, database URLs/passwords, payment secrets, user rows, emails, phone numbers, and private media.
- [ ] Replace secret values with `[REDACTED]` while preserving variable names and function/table/policy names.
- [ ] Do not run SQL copied from chat that changes roles, policies, grants, triggers, owner accounts, or payment states.

Safe artifacts to hand over: metadata CSVs, schema-only SQL, migrations, Edge Function source with secrets redacted, and screenshots of non-secret settings.
