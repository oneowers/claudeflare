-- WebStudio: initial schema, RLS, storage policies.
-- Apply via Supabase Dashboard SQL Editor or `supabase db push`.

-- =========================================================================
-- 1. Tables
-- =========================================================================

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  role text not null default 'user' check (role in ('user', 'admin')),
  full_name text,
  created_at timestamptz not null default now()
);

create table if not exists public.services (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  short_description text not null,
  description text,
  price_from numeric(10, 2) not null,
  currency text not null default 'USD' check (currency in ('USD', 'EUR', 'UZS', 'RUB')),
  features jsonb not null default '[]'::jsonb,
  image_url text,
  is_published boolean not null default false,
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.portfolio (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  client text,
  description text,
  image_url text,
  project_url text,
  technologies text[] not null default '{}',
  is_published boolean not null default false,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text,
  message text not null,
  service_id uuid references public.services(id) on delete set null,
  status text not null default 'new' check (status in ('new', 'in_progress', 'closed', 'spam')),
  notes text,
  created_at timestamptz not null default now()
);

-- =========================================================================
-- 2. Triggers
-- =========================================================================

create or replace function public.touch_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists services_touch on public.services;
create trigger services_touch
  before update on public.services
  for each row execute function public.touch_updated_at();

-- Auto-create profile on auth.users insert.
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, full_name)
  values (new.id, new.raw_user_meta_data->>'full_name')
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- =========================================================================
-- 3. Indexes
-- =========================================================================

create index if not exists leads_status_idx on public.leads(status, created_at desc);
create index if not exists services_published_idx on public.services(is_published, sort_order);
create index if not exists portfolio_published_idx on public.portfolio(is_published, sort_order);

-- =========================================================================
-- 4. Role helper
-- =========================================================================

create or replace function public.is_admin()
returns boolean language sql security definer set search_path = public as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid() and role = 'admin'
  );
$$;

-- =========================================================================
-- 5. RLS
-- =========================================================================

alter table public.profiles enable row level security;
alter table public.services enable row level security;
alter table public.portfolio enable row level security;
alter table public.leads enable row level security;

-- profiles
drop policy if exists "profiles_select_own" on public.profiles;
create policy "profiles_select_own" on public.profiles
  for select using (auth.uid() = id or public.is_admin());

drop policy if exists "profiles_update_own" on public.profiles;
create policy "profiles_update_own" on public.profiles
  for update using (auth.uid() = id) with check (auth.uid() = id);

-- services
drop policy if exists "services_select_public" on public.services;
create policy "services_select_public" on public.services
  for select using (is_published = true or public.is_admin());

drop policy if exists "services_admin_write" on public.services;
create policy "services_admin_write" on public.services
  for all using (public.is_admin()) with check (public.is_admin());

-- portfolio
drop policy if exists "portfolio_select_public" on public.portfolio;
create policy "portfolio_select_public" on public.portfolio
  for select using (is_published = true or public.is_admin());

drop policy if exists "portfolio_admin_write" on public.portfolio;
create policy "portfolio_admin_write" on public.portfolio
  for all using (public.is_admin()) with check (public.is_admin());

-- leads
drop policy if exists "leads_anon_insert" on public.leads;
create policy "leads_anon_insert" on public.leads
  for insert with check (true);

drop policy if exists "leads_admin_select" on public.leads;
create policy "leads_admin_select" on public.leads
  for select using (public.is_admin());

drop policy if exists "leads_admin_update" on public.leads;
create policy "leads_admin_update" on public.leads
  for update using (public.is_admin()) with check (public.is_admin());

drop policy if exists "leads_admin_delete" on public.leads;
create policy "leads_admin_delete" on public.leads
  for delete using (public.is_admin());
