---
created: 2026-05-29
tags:
  - план
  - webstudio
  - безопасность
  - storage
  - supabase
status: todo
сложность: 🔴 сложно
влияние: экономия Storage
---

# 22 — Orphan image cleanup

← [[21 Prefetch при hover]] | [[План улучшений]] | следующий: [[23 Rate limiting на форме]]

## Проблема

При обновлении услуги или кейса старая картинка не удаляется из Storage — остаётся навсегда. Со временем бакеты накапливают мегабайты неиспользуемых файлов.

Удалять синхронно при `update` нельзя — операция может упасть, и тогда запись в БД обновится, а файл останется. Правильный подход — фоновый cleanup.

## Что сделать

### Вариант A — Supabase pg_cron (рекомендуется)
SQL-функция + расписание через `pg_cron`:

```sql
-- Включить расширение
create extension if not exists pg_cron;

-- Функция: собрать все используемые URL
create or replace function cleanup_orphan_images()
returns void language plpgsql as $$
declare
  used_urls text[];
  all_files record;
begin
  select array_agg(image_url) into used_urls
  from (
    select image_url from public.services where image_url is not null
    union all
    select image_url from public.portfolio where image_url is not null
  ) t;
  
  -- Удалить файлы из Storage, которых нет в used_urls
  -- (через Supabase Storage API в Edge Function)
end;
$$;

-- Запускать ежедневно в 3:00
select cron.schedule('cleanup-images', '0 3 * * *', 'select cleanup_orphan_images()');
```

### Вариант B — Edge Function по расписанию
Supabase Cron (Dashboard → Edge Functions → Schedules) запускает Edge Function раз в сутки. Функция: получить список файлов из Storage → проверить, есть ли их URL в таблицах → удалить лишние.

## Связи
- [[Загрузка изображений]] — паттерн upload, откуда берутся orphan-файлы.
- [[Supabase и база данных]] — pg_cron, бакеты Storage.
- [[Безопасность RLS и CSP]] — `service_role` ключ нужен для удаления из Storage (только в Edge Function / pg_cron, не на клиенте).
