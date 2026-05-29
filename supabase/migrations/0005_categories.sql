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
