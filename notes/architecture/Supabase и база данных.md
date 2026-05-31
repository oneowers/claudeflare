---
created: 2026-05-29
tags:
  - architecture
  - webstudio
  - infra
  - supabase
---

# Supabase и база данных

Backend [[Архитектура WebStudio|WebStudio]] целиком на Supabase. Клиент инициализирован в `src/lib/supabase.ts` через `VITE_SUPABASE_URL` + `VITE_SUPABASE_ANON_KEY` (только `anon` ключ — `service_role` на клиент никогда не попадает).

## Таблицы (миграция 0001_init.sql)

| Таблица | Ключевые поля | Назначение |
|---|---|---|
| `profiles` | `id → auth.users`, `role` (user/admin) | Роли; создаётся автоматически триггером `on_auth_user_created` |
| `services` | `slug`, `name`, `price_from`, `currency`, `is_published`, `sort_order` | [[Домен Услуги]] |
| `portfolio` | `slug`, `title`, `client`, `technologies[]`, `is_published` | [[Домен Портфолио]] |
| `leads` | `name`, `email`, `message`, `service_id → services`, `status` | [[Домен Лиды]] |

Все UUID первичные ключи (`gen_random_uuid()`). `services` имеет триггер `touch_updated_at`.

## Хелпер `is_admin()`
SQL-функция `public.is_admin()` — проверяет `profiles.role = 'admin'` для текущего `auth.uid()`. Используется во всех RLS-политиках (см. [[Безопасность RLS и CSP]]).

## Локализованные колонки (миграция 0004)
`services` и `portfolio` имеют `*_i18n` JSONB-колонки (`name_i18n`, `short_description_i18n` и др.). Старые текстовые колонки (`name`, `description`) — legacy-зеркало для обратной совместимости. Слой `api.ts` делает `hydrate()` — приоритет у `*_i18n`. Подробнее — [[Локализация i18n]].

## Storage
Два бакета для картинок — `service-images` и аналог для портфолио. Имена файлов генерируются через `crypto.randomUUID()`. Подробнее — [[Загрузка изображений]].

## Индексы
- `leads_status_idx` на `(status, created_at desc)`
- `services_published_idx` на `(is_published, sort_order)`
- `portfolio_published_idx` на `(is_published, sort_order)`
