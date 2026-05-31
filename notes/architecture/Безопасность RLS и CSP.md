---
created: 2026-05-29
tags:
  - architecture
  - webstudio
  - security
---
# Безопасность RLS и CSP

Два уровня защиты в [[Архитектура WebStudio|WebStudio]]: RLS на базе и HTTP-заголовки на хостинге.

## Row Level Security (Supabase)

RLS включён на всех четырёх таблицах — **никогда не отключать**. [[Маршрутизация|ProtectedRoute]] — это UX, а не реальный барьер. Реальный барьер — здесь.

### Политики

**`profiles`**
- SELECT: только свой профиль (`auth.uid() = id`) или `is_admin()`.
- UPDATE: только свой.

**`services` / `portfolio`**
- SELECT: `is_published = true` ИЛИ `is_admin()` — публичные видят только опубликованное.
- ALL (insert/update/delete): только `is_admin()`.

**`leads`**
- INSERT: `with check (true)` — анонимный пользователь может создать заявку.
- SELECT/UPDATE/DELETE: только `is_admin()`.

`is_admin()` — SQL-функция `security definer` из `profiles.role`. Новая таблица → сразу `enable row level security` + политики.

## HTTP-заголовки (public/_headers, Vercel)

```
Content-Security-Policy:
  default-src 'self'
  script-src 'self'
  style-src 'self' 'unsafe-inline' https://fonts.googleapis.com
  img-src 'self' data: https://*.supabase.co
  connect-src 'self' https://*.supabase.co wss://*.supabase.co
              https://api.mymemory.translated.net  ← [[Локализация i18n|автоперевод]]
  font-src 'self' data: https://fonts.gstatic.com
  frame-ancestors 'none'
X-Frame-Options: DENY
X-Content-Type-Options: nosniff
Referrer-Policy: strict-origin-when-cross-origin
Strict-Transport-Security: max-age=15768000; includeSubDomains
Permissions-Policy: geolocation=(), microphone=(), camera=()
```

## Правила кода
- Только `VITE_SUPABASE_ANON_KEY` на клиенте. `service_role` — никогда.
- `dangerouslySetInnerHTML` запрещён без `DOMPurify`.
- `.env.local` не коммитить — перед пушем проверять `git status`.
- Серверная логика (Edge Functions) — отдельный репозиторий, не здесь.
