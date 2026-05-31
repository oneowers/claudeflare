---
created: 2026-05-29
tags:
  - architecture
  - webstudio
  - frontend
  - components
---

# Shared компоненты

Переиспользуемые UI-блоки за пределами доменов. Всё в `src/components/`.

## Layouts (`src/components/layout/`)

Два layout'а — **новые не создавать**, переиспользовать эти.

**`PublicLayout`** — обёртка публичных страниц: `<Header>` + `<Outlet>` + `<Footer>`. Используется [[Маршрутизация|роутером]] для всей публичной зоны.

**`AdminLayout`** — обёртка админки: `<AdminSidebar>` + `<Outlet>`. Навигация по разделам (услуги, портфолио, лиды).

`Header` — лого, навигация, `<LanguageSwitcher>` (см. [[Локализация i18n]]).
`Footer` — контакты, ссылки.
`AdminSidebar` — ссылки на разделы + кнопка выхода (`supabase.auth.signOut`).

## Shared (`src/components/shared/`)

**`ImageDropzone`**
Обёртка над `react-dropzone`. Используется в формах всех доменов ([[Домен Услуги]], [[Домен Портфолио]]). Принимает `onFileSelect: (file: File) => void`, проверяет размер (макс. 5 МБ). Отдельно про загрузку — [[Загрузка изображений]].

**`ConfirmDialog`**
Модалка подтверждения деструктивных действий (удаление услуги, кейса). Обёртка над `shadcn/ui Dialog`. Принимает `onConfirm`, `title`, `description`. Используется в таблицах доменов вместо `window.confirm`.

**`EmptyState`**
Placeholder когда список пуст (нет услуг, нет кейсов). Принимает `title`, `description`, опциональный `action` (кнопка «Создать первый»).

## UI (`src/components/ui/`)

Компоненты **shadcn/ui** — `Button`, `Dialog`, `Input`, `Label`, `Switch`, `Textarea`. Генерируются CLI shadcn и хранятся в репозитории. **Не редактировать без явной причины** (если нужно — отдельный коммит с объяснением в body). Поверх Radix, стилизованы через Tailwind.

## Правило `cn()`
Условные классы — только через `cn()` из `@/lib/utils` (обёртка над `clsx` + `tailwind-merge`). Никаких template literals для className.
