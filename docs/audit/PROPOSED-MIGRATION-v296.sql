-- v296 PROPOSED migration — NOT APPLIED. Needs the owner's explicit OK before running on production.
-- Source: docs/audit/SUPABASE-LIVE-AUDIT-v296.md (findings F-1, F-3, F-7).
-- Safe by design: only removes EXECUTE from API roles on functions that are run by pg_cron (as postgres)
-- and pins search_path. No data, policy or table is changed. Roll back with the GRANT lines at the bottom.

begin;

-- F-1: cron-only jobs must not be callable from the browser
revoke execute on function public.lesson_policy_jobs() from anon, authenticated, public;
revoke execute on function public.hw_remind() from anon, authenticated, public;

-- F-7: pin search_path
alter function public.yearly_plans_auto() set search_path = public;
alter function public.geo196_guard() set search_path = public;

-- F-3 (optional, after confirming index.html never calls these while logged out):
-- revoke execute on function public.price_factor(uuid) from anon;
-- revoke execute on function public.content_discount(uuid) from anon;
-- revoke execute on function public.can_review(uuid) from anon;
-- revoke execute on function public.room_presence_seconds(text, uuid, uuid, timestamptz, timestamptz) from anon;

commit;

-- Rollback:
-- grant execute on function public.lesson_policy_jobs() to anon, authenticated;
-- grant execute on function public.hw_remind() to anon, authenticated;
