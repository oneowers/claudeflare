---
created: 2026-05-29
tags:
  - план
  - webstudio
  - ux
status: todo
сложность: 🟢 просто
влияние: ощущение скорости
---

# 09 — Top progress bar при навигации

← [[08 Breadcrumbs]] | [[План улучшений]] | следующий: [[10 Улучшить 404]]

## Проблема

При переходе между страницами (особенно с lazy-загрузкой, шаг [[05 Lazy loading маршрутов]]) нет никакого визуального отклика — пользователь не знает, что что-то происходит.

## Что сделать

1. Установить `nprogress`:
   ```bash
   npm install nprogress
   npm install -D @types/nprogress
   ```
2. Подписаться на события React Router в `App.tsx` или корневом компоненте.  
   Удобнее всего через хук `useNavigation` из React Router v6:
   ```tsx
   import { useNavigation } from 'react-router-dom';
   import NProgress from 'nprogress';
   import 'nprogress/nprogress.css';

   function NavigationProgress() {
     const { state } = useNavigation();
     useEffect(() => {
       if (state === 'loading') NProgress.start();
       else NProgress.done();
     }, [state]);
     return null;
   }
   ```
3. Подключить `<NavigationProgress />` внутри `RouterProvider` (через layout или прямо в `App`).
4. Переопределить цвет полоски под цвет `--primary` проекта в `globals.css`:
   ```css
   #nprogress .bar { background: hsl(var(--primary)); }
   ```

## Связи
- [[Маршрутизация]] — `useNavigation` работает внутри `RouterProvider`.
- [[05 Lazy loading маршрутов]] — прогресс-бар особенно нужен при ленивой загрузке.
- [[Точка входа и провайдеры]] — место подключения компонента.
