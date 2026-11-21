-- v297 PROPOSED migration — NOT APPLIED. Supersedes PROPOSED-MIGRATION-v296.sql.
-- Run only after the owner's explicit written approval, preferably first on a Supabase branch/staging copy.
-- Review document: docs/audit/MIGRATION-REVIEW-v297.md
-- Scope: permissions/policies only. No table, column, row, Edge Function or payment data is changed.

begin;

-- 1) F-1: cron-only job functions must not be callable through /rest/v1/rpc by visitors or users.
--    pg_cron runs them as the database owner, so the schedule keeps working.
revoke execute on function public.lesson_policy_jobs() from public, anon, authenticated;
revoke execute on function public.hw_remind() from public, anon, authenticated;

-- 2) F-7: pin search_path on the two functions flagged by the Supabase linter.
alter function public.yearly_plans_auto() set search_path = public;
alter function public.geo196_guard() set search_path = public;

-- 3) F-4: competition_entries privacy.
--    Today the policy "entry read" (USING true) lets anyone read every row, including user_id and order_id.
--    New rule: a person reads only their own entry; the owner, staff with viewall, and the judges of that
--    competition read all entries. The public leaderboard keeps working through the existing
--    SECURITY DEFINER function comp_leaderboard(), which returns names/scores only.
drop policy if exists "entry read" on public.competition_entries;
create policy "entry read own or judge" on public.competition_entries
  for select to authenticated
  using (user_id = auth.uid() or public.is_owner() or public.is_comp_judge(competition_id));
-- anon no longer reads entries directly (leaderboard is via comp_leaderboard RPC).
revoke insert, update, delete, truncate, references, trigger on public.competition_entries from anon;

commit;

-- Verification after applying (read-only):
--   select policyname, roles, qual from pg_policies where tablename = 'competition_entries';
--   select has_function_privilege('anon','public.lesson_policy_jobs()','EXECUTE');  -- expect false
--   select jobname from cron.job where command like '%lesson_policy_jobs%';           -- still scheduled

-- Rollback (restores today's state exactly):
-- begin;
-- grant execute on function public.lesson_policy_jobs() to anon, authenticated;
-- grant execute on function public.hw_remind() to anon, authenticated;
-- alter function public.yearly_plans_auto() reset search_path;
-- alter function public.geo196_guard() reset search_path;
-- drop policy if exists "entry read own or judge" on public.competition_entries;
-- create policy "entry read" on public.competition_entries for select using (true);
-- grant insert, update, delete, truncate, references, trigger on public.competition_entries to anon;
-- commit;
