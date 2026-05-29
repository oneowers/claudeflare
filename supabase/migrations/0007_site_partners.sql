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
