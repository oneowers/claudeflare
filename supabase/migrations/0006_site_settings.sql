-- Site-wide settings (footer, contacts, socials, payment methods).
-- The table already exists in the live database (created out-of-band); this
-- migration captures it in source so fresh environments match, and documents
-- its RLS. All statements are idempotent — safe to re-run.

-- Single-row table: `id` is a boolean pinned to true, so there is exactly one
-- settings row to read and update.
create table if not exists public.site_settings (
  id                   boolean primary key default true check (id),
  tagline_i18n         jsonb not null default '{}'::jsonb,
  copyright_i18n       jsonb not null default '{}'::jsonb,
  contact_email        text,
  contact_phone        text,
  contact_address_i18n jsonb not null default '{}'::jsonb,
  columns              jsonb not null default '[]'::jsonb,
  socials              jsonb not null default '[]'::jsonb,
  payment_methods      jsonb not null default '[]'::jsonb,
  updated_at           timestamptz not null default now()
);

-- Ensure the singleton row exists (no-op if already present).
insert into public.site_settings (id) values (true)
on conflict (id) do nothing;

-- =========================================================================
-- RLS: world-readable (footer is public), writable by admins only.
-- =========================================================================
alter table public.site_settings enable row level security;

drop policy if exists "site_settings_public_read" on public.site_settings;
create policy "site_settings_public_read" on public.site_settings
  for select using (true);

drop policy if exists "site_settings_admin_write" on public.site_settings;
create policy "site_settings_admin_write" on public.site_settings
  for all using (public.is_admin()) with check (public.is_admin());
