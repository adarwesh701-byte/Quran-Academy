-- Itqan Academy — read-only Supabase security inventory
-- Run in Supabase SQL Editor using a project owner/admin account.
-- This script only reads metadata. It does NOT change data, roles, policies, or schema.
-- Review output locally; redact project-specific names before sharing publicly.

-- 1) Tables and whether Row Level Security is enabled/forced.
select
  n.nspname as schema_name,
  c.relname as table_name,
  c.relrowsecurity as rls_enabled,
  c.relforcerowsecurity as rls_forced,
  c.relkind as relation_kind
from pg_class c
join pg_namespace n on n.oid = c.relnamespace
where n.nspname in ('public', 'storage')
  and c.relkind in ('r', 'p', 'v', 'm')
order by n.nspname, c.relname;

-- 2) Existing RLS policies, including roles and expressions.
select
  schemaname,
  tablename,
  policyname,
  permissive,
  roles,
  cmd,
  qual as using_expression,
  with_check as check_expression
from pg_policies
where schemaname in ('public', 'storage')
order by schemaname, tablename, policyname;

-- 3) Explicit table privileges granted to API roles.
select
  table_schema,
  table_name,
  grantee,
  privilege_type,
  is_grantable
from information_schema.role_table_grants
where table_schema in ('public', 'storage')
  and grantee in ('anon', 'authenticated', 'service_role')
order by table_schema, table_name, grantee, privilege_type;

-- 4) Function execute grants visible through information_schema.
select
  specific_schema,
  routine_name,
  grantee,
  privilege_type,
  is_grantable
from information_schema.routine_privileges
where specific_schema in ('public', 'storage')
  and grantee in ('anon', 'authenticated', 'service_role')
order by specific_schema, routine_name, grantee;

-- 5) Views and their security_invoker option (where supported by the Postgres version).
select
  schemaname,
  viewname,
  coalesce((select option_value
            from pg_options_to_table(c.reloptions)
            where option_name = 'security_invoker'
            limit 1), 'false') as security_invoker
from pg_views v
join pg_namespace n on n.nspname = v.schemaname
join pg_class c on c.relnamespace = n.oid and c.relname = v.viewname
where v.schemaname = 'public'
order by v.viewname;

-- 6) Storage bucket metadata only; no object names or user files are exposed.
select id, name, public, file_size_limit, allowed_mime_types
from storage.buckets
order by name;

-- 7) Installed extensions in application schemas.
select e.extname, n.nspname as schema_name, e.extversion
from pg_extension e
join pg_namespace n on n.oid = e.extnamespace
order by e.extname;

-- 8) Schema-level privileges for API roles.
select
  n.nspname as schema_name,
  r.rolname as grantee,
  has_schema_privilege(r.rolname, n.oid, 'USAGE') as can_use_schema,
  has_schema_privilege(r.rolname, n.oid, 'CREATE') as can_create_in_schema
from pg_namespace n
cross join pg_roles r
where n.nspname in ('public', 'storage')
  and r.rolname in ('anon', 'authenticated', 'service_role')
order by n.nspname, r.rolname;

-- 9) SECURITY DEFINER functions and their configured search_path.
select
  n.nspname as schema_name,
  p.proname as function_name,
  pg_get_function_identity_arguments(p.oid) as identity_arguments,
  r.rolname as function_owner,
  p.prosecdef as security_definer,
  p.proconfig as function_settings,
  l.lanname as language
from pg_proc p
join pg_namespace n on n.oid = p.pronamespace
join pg_roles r on r.oid = p.proowner
join pg_language l on l.oid = p.prolang
where n.nspname in ('public', 'storage')
  and p.prosecdef
order by n.nspname, p.proname;

-- 10) Triggers on application and Storage tables.
select
  n.nspname as schema_name,
  c.relname as table_name,
  t.tgname as trigger_name,
  pg_get_triggerdef(t.oid, true) as trigger_definition,
  p.proname as trigger_function
from pg_trigger t
join pg_class c on c.oid = t.tgrelid
join pg_namespace n on n.oid = c.relnamespace
join pg_proc p on p.oid = t.tgfoid
where not t.tgisinternal
  and n.nspname in ('public', 'storage')
order by n.nspname, c.relname, t.tgname;

-- 11) Default privileges that may affect future objects.
select
  n.nspname as schema_name,
  r.rolname as grantor,
  d.defaclobjtype as object_type,
  d.defaclacl as default_acl
from pg_default_acl d
join pg_namespace n on n.oid = d.defaclnamespace
join pg_roles r on r.oid = d.defaclrole
where n.nspname in ('public', 'storage')
order by n.nspname, r.rolname, d.defaclobjtype;

-- 12) Publications and published tables (Realtime replication inventory).
select
  p.pubname as publication_name,
  schemaname as schema_name,
  tablename as table_name
from pg_publication_tables t
join pg_publication p on p.pubname = t.pubname
order by p.pubname, schemaname, tablename;
