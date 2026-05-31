---
created: 2026-05-29
tags:
  - план
  - webstudio
  - seo
status: todo
сложность: 🟢 просто
влияние: поисковики
---

# 01 — SEO мета на каждой странице

← [[План улучшений]] | следующий: [[02 Sitemap и robots.txt]]

## Проблема

Сейчас `<title>`, `<meta name="description">`, `og:title`, `og:description`, `og:image` нигде не выставляются. Страница всегда называется «WebStudio» (из `index.html`). Поисковик не знает, о чём каждая страница.

## Что сделать

1. Установить `react-helmet-async`:
   ```bash
   npm install react-helmet-async
   ```
2. Обернуть `<App>` в `<HelmetProvider>` в `src/main.tsx`.
3. В `PublicLayout` добавить дефолтный `<Helmet>` (title-суффикс `| WebStudio`).
4. На каждой странице переопределять:
   - `HomePage` — общий заголовок студии.
   - `ServicesPage` — «Услуги | WebStudio».
   - `ServiceDetailPage` — `{название услуги} | WebStudio` + `og:image` из `image_url`.
   - `PortfolioPage`, `PortfolioDetailPage` — аналогично.
   - `ContactPage`, `AboutPage` — статические строки.
5. `og:locale` выставлять из текущего языка (`ru_RU` / `en_US` / `uz_UZ`).

## Связи
- [[Shared компоненты]] — `PublicLayout` куда добавляем дефолт.
- [[Маршрутизация]] — список страниц, которые нужно покрыть.
- [[20 og:image для деталей]] — продолжение: динамический og:image.
- [[Локализация i18n]] — og:locale зависит от языка в URL.
