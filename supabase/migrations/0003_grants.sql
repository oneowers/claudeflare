-- Explicit privileges for the Data API roles.
-- RLS filters rows; these GRANTs allow the role to touch the table in the first place.
-- Without these, the client gets "permission denied for table X" instead of an RLS denial.

-- Schema usage (Supabase usually grants this, but make it explicit).
grant usage on schema public to anon, authenticated;

-- services: anyone can read (RLS narrows to is_published=true for non-admins).
grant select on public.services to anon, authenticated;
grant insert, update, delete on public.services to authenticated;

-- portfolio: same.
grant select on public.portfolio to anon, authenticated;
grant insert, update, delete on public.portfolio to authenticated;

-- leads: anon can insert from the public form; everything else is admin-only via RLS.
grant insert on public.leads to anon, authenticated;
grant select, update, delete on public.leads to authenticated;

-- profiles: authenticated reads own row (RLS), admin reads all (RLS via is_admin()).
grant select, update on public.profiles to authenticated;

-- Default privileges for any future tables created by the migration role —
-- so new tables also get the right grants without having to remember.
alter default privileges in schema public
  grant select on tables to anon, authenticated;
alter default privileges in schema public
  grant insert, update, delete on tables to authenticated;
