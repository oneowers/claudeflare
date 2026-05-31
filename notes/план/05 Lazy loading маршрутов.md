---
created: 2026-05-29
tags:
  - план
  - webstudio
  - производительность
status: todo
сложность: 🟢 просто
влияние: скорость загрузки
---

# 05 — Lazy loading маршрутов

← [[04 Error Boundary]] | [[План улучшений]] | следующий: [[06 Поиск в услугах]]

## Проблема

В `src/router.tsx` все 15+ страниц импортируются статически в самом верху файла. Vite собирает их в один chunk — пользователь грузит весь JS приложения, включая всю admin-зону, даже если просто зашёл на главную.

## Что сделать

Заменить статические импорты страниц на `lazy`:

```tsx
// Было
import { HomePage } from '@/pages/public/HomePage';

// Стало
const HomePage = lazy(() =>
  import('@/pages/public/HomePage').then(m => ({ default: m.HomePage }))
);
```

Обернуть `<Outlet>` в layout-ах (или корневой элемент роутера) в `<Suspense>`:
```tsx
<Suspense fallback={<PageSkeleton />}>
  <Outlet />
</Suspense>
```

Создать `src/components/shared/PageSkeleton.tsx` — простой анимированный placeholder на время загрузки чанка.

### Приоритет lazy-загрузки
- Admin-зона — в первую очередь (тяжёлые формы, таблицы).
- Страницы деталей (`ServiceDetailPage`, `PortfolioDetailPage`) — во вторую.
- Главная, услуги, портфолио — можно оставить eager или тоже сделать lazy.

## Связи
- [[Маршрутизация]] — `src/router.tsx`, там нужны изменения.
- [[Shared компоненты]] — `PageSkeleton` в `src/components/shared/`.
- [[Деплой и окружение]] — Vite автоматически разбивает lazy-импорты на отдельные чанки.
