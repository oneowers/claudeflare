---
created: 2026-05-29
tags:
  - план
  - webstudio
  - надёжность
status: todo
сложность: 🟢 просто
влияние: надёжность
---

# 04 — Error Boundary на страницах

← [[03 Картинка на ServiceCard]] | [[План улучшений]] | следующий: [[05 Lazy loading маршрутов]]

## Проблема

Если `useQuery` выбрасывает ошибку (Supabase недоступен, сеть упала) — React размонтирует дерево и пользователь видит белый экран без объяснений. Нет возможности «попробовать ещё раз».

## Что сделать

1. Установить `react-error-boundary`:
   ```bash
   npm install react-error-boundary
   ```
2. Создать `src/components/shared/ErrorPage.tsx` — страница с сообщением об ошибке и кнопкой «Обновить».
3. Обернуть публичные и админские маршруты в `router.tsx`:
   ```tsx
   import { ErrorBoundary } from 'react-error-boundary';
   
   {
     element: (
       <ErrorBoundary FallbackComponent={ErrorPage}>
         <PublicLayout />
       </ErrorBoundary>
     ),
     children: [...]
   }
   ```
4. В `ErrorPage` вызывать `resetErrorBoundary` при клике «Попробовать снова» — React Query переповторит запрос.
5. В шаге [[24 Sentry мониторинг]] — добавить `onError` в `ErrorBoundary` для логирования в Sentry.

## Связи
- [[Слой данных React Query]] — ошибки запросов сюда и всплывают.
- [[Shared компоненты]] — `ErrorPage` в `src/components/shared/`.
- [[24 Sentry мониторинг]] — интеграция для отправки ошибок.
