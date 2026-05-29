-- ============================================================
-- WebStudio: pending migrations 0005–0007, bundled for the
-- Supabase Dashboard SQL Editor. Idempotent — safe to re-run.
-- Paste the whole file and click RUN.
-- ============================================================

-- >>>>>>>>>> 0005_categories.sql <<<<<<<<<<

-- Categories taxonomy shared by services and portfolio.
-- Admin-managed (CRUD), publicly readable. Localized name via name_i18n,
-- with a legacy single-language `name` mirror kept in sync by the API layer
-- (same convention as services/portfolio, see 0004_content_i18n.sql).

-- =========================================================================
-- 1. Table
-- =========================================================================

create table if not exists public.categories (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  name_i18n jsonb not null default '{}'::jsonb,
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

drop trigger if exists categories_touch on public.categories;
create trigger categories_touch
  before update on public.categories
  for each row execute function public.touch_updated_at();

create index if not exists categories_sort_idx on public.categories(sort_order);

-- =========================================================================
-- 2. Foreign keys on services & portfolio
-- =========================================================================

alter table public.services
  add column if not exists category_id uuid references public.categories(id) on delete set null;

alter table public.portfolio
  add column if not exists category_id uuid references public.categories(id) on delete set null;

create index if not exists services_category_idx on public.services(category_id);
create index if not exists portfolio_category_idx on public.portfolio(category_id);

-- =========================================================================
-- 3. RLS
-- =========================================================================

alter table public.categories enable row level security;

-- Categories are public taxonomy: anyone can read.
drop policy if exists "categories_select_public" on public.categories;
create policy "categories_select_public" on public.categories
  for select using (true);

drop policy if exists "categories_admin_write" on public.categories;
create policy "categories_admin_write" on public.categories
  for all using (public.is_admin()) with check (public.is_admin());

-- =========================================================================
-- 4. Grants
-- =========================================================================

grant select on public.categories to anon, authenticated;
grant insert, update, delete on public.categories to authenticated;

-- =========================================================================
-- 5. Seed default categories
-- =========================================================================

insert into public.categories (slug, name, name_i18n, sort_order) values
  ('web',     'Веб',     '{"ru":"Веб","en":"Web","uz":"Veb"}'::jsonb,             0),
  ('gamedev', 'Геймдев', '{"ru":"Геймдев","en":"Game dev","uz":"Geymdev"}'::jsonb, 1),
  ('motion',  'Моушн',   '{"ru":"Моушн","en":"Motion","uz":"Moushn"}'::jsonb,      2),
  ('3d',      '3D',      '{"ru":"3D","en":"3D","uz":"3D"}'::jsonb,                 3)
on conflict (slug) do nothing;

-- >>>>>>>>>> 0006_test_reports.sql <<<<<<<<<<

-- QA dashboard: test run history for unit and load tests.
-- Admin-only: no public RLS policy (internal tool).

-- =========================================================================
-- 1. Table
-- =========================================================================

create table if not exists public.test_reports (
  id            uuid primary key default gen_random_uuid(),
  title         text not null,
  project       text,
  type          text not null default 'unit' check (type in ('unit', 'load')),
  status        text not null default 'in_progress' check (status in ('passed', 'failed', 'in_progress', 'error')),
  -- unit-test metrics
  total_tests   int,
  passed_tests  int,
  coverage_pct  numeric(5, 2),
  -- load-test metrics
  requests_per_sec numeric(10, 2),
  error_rate       numeric(5, 2),
  total_requests   int,
  -- shared
  duration_ms   int,
  notes         text,
  run_at        timestamptz not null default now(),
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

drop trigger if exists test_reports_touch on public.test_reports;
create trigger test_reports_touch
  before update on public.test_reports
  for each row execute function public.touch_updated_at();

create index if not exists test_reports_type_idx  on public.test_reports(type, run_at desc);
create index if not exists test_reports_status_idx on public.test_reports(status, run_at desc);

-- =========================================================================
-- 2. RLS — admin-only, no anonymous access
-- =========================================================================

alter table public.test_reports enable row level security;

drop policy if exists "test_reports_admin_all" on public.test_reports;
create policy "test_reports_admin_all" on public.test_reports
  for all using (public.is_admin()) with check (public.is_admin());

-- =========================================================================
-- 3. Grants (default privileges from 0003 cover future tables, but be explicit)
-- =========================================================================

grant select, insert, update, delete on public.test_reports to authenticated;

-- >>>>>>>>>> 0007_site_partners.sql <<<<<<<<<<

-- Editable footer (site_settings singleton) + "trusted by" partners.

-- =========================================================================
-- 1. site_settings — single editable row driving the footer
-- =========================================================================

create table if not exists public.site_settings (
  id                   boolean primary key default true check (id = true),
  tagline_i18n         jsonb not null default '{}'::jsonb,
  copyright_i18n       jsonb not null default '{}'::jsonb,
  contact_email        text,
  contact_phone        text,
  contact_address_i18n jsonb not null default '{}'::jsonb,
  -- columns: [{ "title": {ru,en,uz}, "links": [{ "label": {ru,en,uz}, "url": "..." }] }]
  columns              jsonb not null default '[]'::jsonb,
  -- socials: [{ "platform": "telegram", "url": "..." }]
  socials              jsonb not null default '[]'::jsonb,
  -- payment_methods: ["visa","mastercard","mir","humo","uzcard","payme","click","paypal"]
  payment_methods      text[] not null default '{}',
  updated_at           timestamptz not null default now()
);

drop trigger if exists site_settings_touch on public.site_settings;
create trigger site_settings_touch
  before update on public.site_settings
  for each row execute function public.touch_updated_at();

-- Seed the single row so the footer always has a record to read/update.
insert into public.site_settings (id, tagline_i18n, copyright_i18n, columns, payment_methods)
values (
  true,
  '{"ru":"Делаем сайты и веб-приложения, которые работают на цели бизнеса.","en":"We build websites and web apps that move business goals.","uz":"Biznes maqsadlariga xizmat qiladigan saytlar yaratamiz."}'::jsonb,
  '{"ru":"© {{year}} WebStudio","en":"© {{year}} WebStudio","uz":"© {{year}} WebStudio"}'::jsonb,
  '[
    {"title":{"ru":"Студия","en":"Studio","uz":"Studiya"},"links":[
      {"label":{"ru":"О нас","en":"About us","uz":"Biz haqimizda"},"url":"/about"},
      {"label":{"ru":"Работы","en":"Work","uz":"Ishlar"},"url":"/portfolio"},
      {"label":{"ru":"Услуги","en":"Services","uz":"Xizmatlar"},"url":"/services"}
    ]},
    {"title":{"ru":"Контакты","en":"Contact","uz":"Aloqa"},"links":[
      {"label":{"ru":"Написать","en":"Write to us","uz":"Yozish"},"url":"/contact"}
    ]}
  ]'::jsonb,
  '{visa,mastercard,mir,humo,uzcard,payme,click}'
)
on conflict (id) do nothing;

alter table public.site_settings enable row level security;

drop policy if exists "site_settings_select_public" on public.site_settings;
create policy "site_settings_select_public" on public.site_settings
  for select using (true);

drop policy if exists "site_settings_admin_write" on public.site_settings;
create policy "site_settings_admin_write" on public.site_settings
  for all using (public.is_admin()) with check (public.is_admin());

grant select on public.site_settings to anon, authenticated;
grant insert, update, delete on public.site_settings to authenticated;

-- =========================================================================
-- 2. partners — companies that trust us ("нам доверяют")
-- =========================================================================

create table if not exists public.partners (
  id           uuid primary key default gen_random_uuid(),
  name         text not null,
  logo_url     text,
  website_url  text,
  is_published boolean not null default true,
  sort_order   int not null default 0,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);

drop trigger if exists partners_touch on public.partners;
create trigger partners_touch
  before update on public.partners
  for each row execute function public.touch_updated_at();

create index if not exists partners_published_idx on public.partners(is_published, sort_order);

alter table public.partners enable row level security;

drop policy if exists "partners_select_public" on public.partners;
create policy "partners_select_public" on public.partners
  for select using (is_published = true or public.is_admin());

drop policy if exists "partners_admin_write" on public.partners;
create policy "partners_admin_write" on public.partners
  for all using (public.is_admin()) with check (public.is_admin());

grant select on public.partners to anon, authenticated;
grant insert, update, delete on public.partners to authenticated;

-- =========================================================================
-- 3. Storage bucket for partner logos
-- =========================================================================

insert into storage.buckets (id, name, public)
values ('partner-logos', 'partner-logos', true)
on conflict (id) do nothing;

drop policy if exists "partner_logos_public_read" on storage.objects;
create policy "partner_logos_public_read" on storage.objects
  for select using (bucket_id = 'partner-logos');

drop policy if exists "partner_logos_admin_insert" on storage.objects;
create policy "partner_logos_admin_insert" on storage.objects
  for insert with check (bucket_id = 'partner-logos' and public.is_admin());

drop policy if exists "partner_logos_admin_update" on storage.objects;
create policy "partner_logos_admin_update" on storage.objects
  for update using (bucket_id = 'partner-logos' and public.is_admin());

drop policy if exists "partner_logos_admin_delete" on storage.objects;
create policy "partner_logos_admin_delete" on storage.objects
  for delete using (bucket_id = 'partner-logos' and public.is_admin());
