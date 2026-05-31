---
created: 2026-05-29
tags:
  - план
  - webstudio
  - seo
status: todo
сложность: 🟢 просто
влияние: вирусность / соцсети
---

# 20 — og:image для страниц деталей

← [[19 Конвертация в WebP]] | [[План улучшений]] | следующий: [[21 Prefetch при hover]]

## Проблема

Когда ссылку на услугу или кейс постят в Telegram, VK, Slack — превью показывает общее og:image сайта (или ничего), не картинку конкретной услуги. Это снижает CTR.

## Зависимость

Требует выполнения [[01 SEO мета]] (подключение `react-helmet-async`).

## Что сделать

В `ServiceDetailPage`, после загрузки данных:
```tsx
const name = pickLocale(service.name, lang) ?? service.slug;

<Helmet>
  <title>{name} | WebStudio</title>
  <meta name="description" content={pickLocale(service.short_description, lang)} />
  <meta property="og:title" content={name} />
  <meta property="og:description" content={pickLocale(service.short_description, lang)} />
  {service.image_url && (
    <meta property="og:image" content={service.image_url} />
  )}
  <meta property="og:type" content="website" />
</Helmet>
```

В `PortfolioDetailPage` — аналогично с `item.image_url`.

### Пока данные грузятся
В `<Suspense>` / пока `isLoading` — в `<head>` ничего не выставляется. Это нормально: боты обычно ждут гидратацию или используют статичный `og:image` из layout.

## Связи
- [[01 SEO мета]] — базовая настройка `react-helmet-async`.
- [[Домен Услуги]] — `ServiceDetailPage`.
- [[Домен Портфолио]] — `PortfolioDetailPage`.
- [[Загрузка изображений]] — `image_url` из Storage.
