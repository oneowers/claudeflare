-- Per-language JSONB columns for translatable content.
-- Legacy single-language columns are kept for backward compatibility and as
-- a redundant store of the primary language (RU). New code reads/writes the
-- *_i18n columns; both stay in sync via the API layer.

-- =========================================================================
-- services
-- =========================================================================

alter table public.services
  add column if not exists name_i18n              jsonb not null default '{}'::jsonb,
  add column if not exists short_description_i18n jsonb not null default '{}'::jsonb,
  add column if not exists description_i18n       jsonb,
  add column if not exists features_i18n          jsonb not null default '{}'::jsonb;

-- Backfill: treat existing text as Russian.
update public.services
   set name_i18n = jsonb_build_object('ru', name)
 where name_i18n = '{}'::jsonb and name is not null;

update public.services
   set short_description_i18n = jsonb_build_object('ru', short_description)
 where short_description_i18n = '{}'::jsonb and short_description is not null;

update public.services
   set description_i18n = jsonb_build_object('ru', description)
 where description_i18n is null and description is not null;

update public.services
   set features_i18n = jsonb_build_object('ru', features)
 where features_i18n = '{}'::jsonb and features is not null;

-- =========================================================================
-- portfolio
-- =========================================================================

alter table public.portfolio
  add column if not exists title_i18n       jsonb not null default '{}'::jsonb,
  add column if not exists description_i18n jsonb;

update public.portfolio
   set title_i18n = jsonb_build_object('ru', title)
 where title_i18n = '{}'::jsonb and title is not null;

update public.portfolio
   set description_i18n = jsonb_build_object('ru', description)
 where description_i18n is null and description is not null;
