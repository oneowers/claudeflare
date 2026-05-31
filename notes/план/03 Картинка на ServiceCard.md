---
created: 2026-05-29
tags:
  - план
  - webstudio
  - ui
status: todo
сложность: 🟢 просто
влияние: конверсия
---

# 03 — Картинка на ServiceCard

← [[02 Sitemap и robots.txt]] | [[План улучшений]] | следующий: [[04 Error Boundary]]

## Проблема

`ServiceCard` показывает только название, описание и цену. Поле `image_url` есть в типе `Service`, но карточка его игнорирует. `PortfolioCard` уже отображает картинку — нужно привести к единообразию.

## Что сделать

В `src/features/services/components/ServiceCard.tsx` добавить блок с картинкой над контентом — по аналогии с `PortfolioCard`:

```tsx
{service.image_url && (
  <div className="aspect-video overflow-hidden rounded-t-lg bg-muted">
    <img
      src={service.image_url}
      alt={pickLocale(service.name, lang) ?? ''}
      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
      loading="lazy"
    />
  </div>
)}
```

Если `image_url` нет — карточка остаётся текстовой (как сейчас), деградация graceful.

## Связи
- [[Домен Услуги]] — `ServiceCard` живёт в `src/features/services/components/`.
- [[Загрузка изображений]] — откуда берётся `image_url`.
