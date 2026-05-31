---
created: 2026-05-29
tags:
  - architecture
  - webstudio
  - data
---

# Слой данных React Query

Единственный способ ходить за серверным состоянием в [[Архитектура WebStudio|WebStudio]]. `useEffect` для фетча запрещён.

## Клиент
`src/lib/queryClient.ts` — `QueryClient` с дефолтами:
- `staleTime: 60_000` (60 с), `gcTime: 5 мин`
- `retry: 1` для запросов, `retry: 0` для мутаций
- `refetchOnWindowFocus: false`

Провайдер подключается в [[Точка входа и провайдеры]].

## Строгое разделение слоёв
```
Страница (pages/)   — только композиция, без сети
   ↓ использует
Хук (features/*/hooks/) — useQuery / useMutation
   ↓ вызывает
api.ts (features/*)  — единственное место вызовов Supabase
   ↓
Supabase            — см. [[Supabase и база данных]]
```
- Компоненты **не** вызывают `api.ts` напрямую — только через хуки.
- Страницы **не** делают сетевых запросов.

## Конвенции
- **Query keys** — константные объекты в `queryKeys.ts` каждого домена (`servicesKeys.list({...})`), не строки на месте.
- На каждую мутацию — `qc.invalidateQueries({ queryKey })` в `onSuccess`.
- Ошибки мутаций — через `toast.error` в `onError` хука, не в `try/catch` компонента.
- Оптимистичные апдейты — только для delete/toggle.

Этот слой реализован одинаково во всех доменах: [[Домен Услуги]], [[Домен Портфолио]], [[Домен Лиды]], [[Домен Авторизация]]. Эталон формы слоя — [[Паттерн feature-slice]].
