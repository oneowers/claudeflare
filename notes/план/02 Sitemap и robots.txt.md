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

# 02 — Sitemap и robots.txt

← [[01 SEO мета]] | [[План улучшений]] | следующий: [[03 Картинка на ServiceCard]]

## Проблема

В `public/` нет `sitemap.xml` и `robots.txt`. Поисковики не знают, какие страницы индексировать и где найти карту сайта.

## Что сделать

### `public/robots.txt`
```
User-agent: *
Allow: /
Sitemap: https://your-domain.com/sitemap.xml
```

### `public/sitemap.xml`
Статический XML со всеми публичными маршрутами для трёх языков:
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>https://domain.com/ru</loc><priority>1.0</priority></url>
  <url><loc>https://domain.com/ru/services</loc></url>
  <url><loc>https://domain.com/ru/portfolio</loc></url>
  <url><loc>https://domain.com/ru/about</loc></url>
  <url><loc>https://domain.com/ru/contact</loc></url>
  <!-- en, uz — аналогично -->
</urlset>
```

### Динамические URL (опционально, сложнее)
Для страниц услуг и кейсов по `slug` — нужен скрипт генерации sitemap при сборке (читает из Supabase и генерирует файл). Можно сделать позже.

## Связи
- [[Деплой и окружение]] — файлы из `public/` попадают в `dist/` при сборке.
- [[Маршрутизация]] — полный список публичных маршрутов.
- [[01 SEO мета]] — вместе дают полную SEO-базу.
