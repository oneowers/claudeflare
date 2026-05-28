# CLAUDE.md

Файл для Claude Code. Содержит правила работы с этим проектом. Полная спецификация — в `PLAN.md`.

## Проект

**WebStudio** — SPA-сайт студии веб-разработки. Публичная часть: услуги, портфолио, форма контактов. Закрытая админка: CRUD услуг и портфолио, обработка лидов.

Архитектура: чистый клиентский SPA + Supabase как backend. Никакого SSR, никаких API-роутов в репозитории.

## Команды

```bash
npm run dev          # dev-сервер (Vite, http://localhost:5173)
npm run build        # production-сборка в dist/
npm run preview      # локальный просмотр build
npm run test         # Vitest в watch-режиме
npm run test:run     # один прогон (для CI)
npm run test:ui      # Vitest UI
npm run lint         # ESLint
npm run typecheck    # tsc --noEmit
```

Перед коммитом всегда прогонять: `npm run typecheck && npm run lint && npm run test:run`.

## Стек

- **Vite 5 + React 18 + TypeScript (strict)**
- **Tailwind CSS + shadcn/ui** (поверх Radix) + **lucide-react**
- **React Router v6** для маршрутизации
- **React Hook Form + Zod** для форм и валидации
- **TanStack Query v5** для серверного состояния
- **Supabase JS** для auth, БД и storage
- **react-dropzone** для загрузки файлов
- **sonner** для toast-уведомлений
- **Vitest + React Testing Library** для тестов

Алиас пути: `@/` → `src/`.

## Архитектура

Feature-sliced. Бизнес-логика — в `src/features/{домен}/`, страницы — только композиция.

```
src/
├── features/{domain}/
│   ├── api.ts           # вызовы Supabase
│   ├── schemas.ts       # Zod-схемы (единый источник истины для форм и БД)
│   ├── types.ts         # выводные TS-типы
│   ├── hooks/           # React Query хуки
│   └── components/      # UI компоненты домена
├── pages/               # только компоновка, без логики
├── components/
│   ├── ui/              # shadcn — не редактировать без причины
│   ├── layout/          # PublicLayout, AdminLayout
│   └── shared/          # переиспользуемые блоки
└── lib/                 # supabase.ts, queryClient.ts, utils.ts, env.ts
```

**Правила слоёв:**

- Компоненты не вызывают `api.ts` напрямую — только через хуки React Query.
- Страницы не делают сетевых запросов — только используют хуки.
- shadcn-компоненты в `components/ui/` не редактировать после установки без явной причины (объяснить в commit body).

## Безопасность — жёсткие правила

1. **Никогда не выкладывать `service_role` ключ на клиент.** Только `VITE_SUPABASE_ANON_KEY`.
2. **RLS включён на всех таблицах.** Никогда не отключать. Если новая миграция создаёт таблицу — сразу `enable row level security` + политики.
3. **ProtectedRoute — это UX, а не безопасность.** Реальная защита — RLS на стороне Supabase. Не полагаться на клиентские проверки роли для скрытия данных.
4. **Только `VITE_*` переменные доходят до клиента.** Любой секрет без префикса считать серверным.
5. `dangerouslySetInnerHTML` — запрещено без `DOMPurify`.
6. `.env.local` в `.gitignore` — перед каждым пушем `git status` проверять, что секреты не утекли.

## Конвенции кода

- TypeScript `strict: true`. `any` — запрещён, использовать `unknown` или конкретный тип.
- Только функциональные компоненты, без классовых.
- Именованные экспорты для компонентов и хуков (`export function ServiceCard`).
- Тестовые файлы рядом с исходником: `ServiceCard.tsx` + `ServiceCard.test.tsx`.
- Условные Tailwind-классы — через `cn()` из `@/lib/utils`. Не делать `className={`...${x}...`}` руками.
- Query keys — константные объекты (`servicesKeys.list({...})`), не строки на месте.
- Формы — всегда RHF + `zodResolver`. Никаких ручных `useState` для полей форм.
- Ошибки в мутациях — через `toast.error` (sonner). В `onError` мутации, не в `try/catch` компонента.

## React Query

- `staleTime: 60_000` по умолчанию (60 секунд).
- На каждую мутацию — `qc.invalidateQueries({ queryKey: ... })` в `onSuccess`.
- Не использовать `useEffect` для фетча данных — только `useQuery`.
- Оптимистичные апдейты — только для delete/toggle, не для create с картинкой.

## Формы

- Валидация — **только** через Zod. Никаких `if (!email.includes('@'))`.
- Submit: `form.handleSubmit((v) => mutate(v))`. Без `try/catch` — обработка в хуке мутации.
- Загрузка файлов — через `ImageDropzone` из `components/shared/`, обёртка над react-dropzone.

## Загрузка картинок

- Размер на клиенте: максимум **5 МБ** (плюс политика на бакете).
- Имя файла: `${crypto.randomUUID()}.${ext}` — никаких пользовательских имён.
- После upload — обязательно `getPublicUrl`, записывать URL в БД.
- При update услуги старая картинка **не удаляется** — это отдельный фоновый процесс (orphan cleanup). Не пытаться удалять синхронно.

## Тестирование

- Мокать **слой `api.ts`**, не `supabase` напрямую.
- Использовать `renderWithProviders` из `src/tests/utils/`.
- `userEvent` предпочтительнее `fireEvent`.
- Тестировать поведение (что видит пользователь), а не внутренности.
- Снапшот-тесты на UI — не использовать, слишком хрупкие.
- Приоритет покрытия: (1) Zod-схемы, (2) хуки React Query, (3) критические формы (контакты, создание услуги), (4) `ProtectedRoute`.

## Git

- Conventional Commits: `feat:`, `fix:`, `chore:`, `refactor:`, `test:`, `docs:`.
- `.env.local` никогда не коммитить.
- Изменения в `components/ui/*` (shadcn) — отдельным коммитом с объяснением в body.
- PR без проходящего `typecheck` + `lint` + `test:run` не мержить.

## Чего НЕ делать

- Не добавлять зависимости, не проверив размер бандла и альтернативы (`npx bundle-phobia <package>`).
- Не обходить React Query для «простых случаев» — теряется единообразие.
- Не создавать отдельные CSS-файлы (исключение — `globals.css` с CSS-переменными shadcn).
- Не создавать новые layout-компоненты — использовать `PublicLayout` / `AdminLayout`.
- Не класть бизнес-логику в `pages/`.
- Не писать серверный код (SSR, API-routes) — проект SPA. Серверная логика — только Supabase Edge Functions, отдельный репозиторий.

## Где что искать

- Архитектурные решения и обоснования — `PLAN.md`.
- Эталонная реализация feature — `src/features/services/` (использовать как образец при добавлении новых доменов).
- Схема БД и RLS-политики — `PLAN.md` раздел 4, миграции — `supabase/migrations/`.
- CSP и заголовки безопасности — `public/_headers`.

## Что спросить, если непонятно

Перед нетривиальным изменением — уточнить у пользователя:

- Если меняется RLS-политика или схема БД.
- Если добавляется новая зависимость > 50 KB.
- Если меняется структура `features/` или появляется новый верхнеуровневый слой.
- Если возникает желание отключить RLS «временно» — **остановиться и спросить**.