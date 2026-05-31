---
created: 2026-05-29
tags:
  - план
  - webstudio
  - мониторинг
  - dx
status: todo
сложность: 🟡 средне
влияние: наблюдаемость
---

# 24 — Мониторинг ошибок (Sentry)

← [[23 Rate limiting на форме]] | [[План улучшений]] | следующий: [[25 E2E тесты Playwright]]

## Проблема

Клиентские JS-ошибки нигде не фиксируются. Узнать о проблеме можно только если пользователь сообщит или если зайти в Supabase Logs.

## Что сделать

1. Зарегистрироваться на [sentry.io](https://sentry.io) → создать проект React → получить DSN.

2. Установить:
   ```bash
   npm install @sentry/react
   ```

3. В `src/main.tsx` перед `ReactDOM.createRoot`:
   ```ts
   import * as Sentry from '@sentry/react';

   Sentry.init({
     dsn: env.VITE_SENTRY_DSN,
     environment: import.meta.env.MODE, // 'development' | 'production'
     tracesSampleRate: 0.2, // 20% транзакций для performance
     enabled: import.meta.env.PROD, // не спамить в dev
   });
   ```

4. Добавить `VITE_SENTRY_DSN` в `.env.local` и `.env.example`. Обновить `src/lib/env.ts`:
   ```ts
   VITE_SENTRY_DSN: z.string().url().optional().or(z.literal('')),
   ```

5. Связать с [[04 Error Boundary]]:
   ```tsx
   <ErrorBoundary
     FallbackComponent={ErrorPage}
     onError={(error, info) => Sentry.captureException(error, { extra: info })}
   >
   ```

6. Обернуть `createBrowserRouter` в `Sentry.wrapCreateBrowserRouter` для трассировки навигации.

## Связи
- [[Деплой и окружение]] — новая переменная `VITE_SENTRY_DSN`.
- [[04 Error Boundary]] — интеграция `onError` → Sentry.
- [[Точка входа и провайдеры]] — `src/main.tsx`, место инициализации.
- [[25 E2E тесты Playwright]] — пара: Sentry ловит ошибки в prod, E2E предотвращает их в CI.
