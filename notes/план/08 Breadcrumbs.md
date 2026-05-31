---
created: 2026-05-29
tags:
  - план
  - webstudio
  - ux
  - seo
status: todo
сложность: 🟢 просто
влияние: навигация / seo
---

# 08 — Breadcrumbs на страницах деталей

← [[07 Фильтр в портфолио]] | [[План улучшений]] | следующий: [[09 Top progress bar]]

## Проблема

`ServiceDetailPage` и `PortfolioDetailPage` не показывают, где пользователь находится в иерархии. Нет кнопки «назад к списку» — только браузерный Back.

## Что сделать

1. Создать `src/components/shared/Breadcrumbs.tsx` — принимает массив `{ label, href? }`:
   ```tsx
   <Breadcrumbs items={[
     { label: t('nav.home'), href: '/' },
     { label: t('nav.services'), href: '/services' },
     { label: serviceName },
   ]} />
   ```
2. Ссылки через `<LocalizedLink>` — чтобы язык сохранялся.
3. Разделитель — `/` или `>` через lucide `ChevronRight`.
4. Добавить в `ServiceDetailPage` и `PortfolioDetailPage` над заголовком.

### Бонус: JSON-LD BreadcrumbList
Добавить структурированные данные для поисковиков:
```html
<script type="application/ld+json">
{ "@context": "...", "@type": "BreadcrumbList", "itemListElement": [...] }
</script>
```
Через `react-helmet-async` (шаг [[01 SEO мета]]).

## Связи
- [[Маршрутизация]] — иерархия маршрутов.
- [[Shared компоненты]] — новый компонент `Breadcrumbs`.
- [[Локализация i18n]] — `LocalizedLink` для ссылок.
- [[01 SEO мета]] — JSON-LD через Helmet.
