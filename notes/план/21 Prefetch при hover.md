---
created: 2026-05-29
tags:
  - план
  - webstudio
  - производительность
status: todo
сложность: 🟡 средне
влияние: воспринимаемая скорость
---

# 21 — Prefetch данных при hover на карточки

← [[20 og:image для деталей]] | [[План улучшений]] | следующий: [[22 Orphan image cleanup]]

## Проблема

При клике на `ServiceCard` или `PortfolioCard` сначала происходит навигация, потом начинается запрос данных — пользователь видит скелетон. Между наведением мыши и кликом обычно 100–300 мс — этого хватает, чтобы данные уже загрузились.

## Что сделать

В `ServiceCard` добавить `onMouseEnter`:
```tsx
import { queryClient } from '@/lib/queryClient';
import { getServiceBySlug } from '../api';
import { servicesKeys } from '../queryKeys';

// В компоненте:
const prefetch = () => {
  queryClient.prefetchQuery({
    queryKey: servicesKeys.detail(service.slug),
    queryFn: () => getServiceBySlug(service.slug),
    staleTime: 60_000,
  });
};

<LocalizedLink
  to={`/services/${service.slug}`}
  onMouseEnter={prefetch}
  // ...
>
```

Для `PortfolioCard` — аналогично с `getPortfolioBySlug` и `portfolioKeys.detail(slug)`.

### Нюансы
- `prefetchQuery` — идемпотентен: если данные свежие, повторный запрос не делается.
- На мобильных устройствах `onMouseEnter` не срабатывает — это нормально, там prefetch не нужен.
- Не нужно добавлять никакого state — `queryClient` сам управляет кешем.

## Связи
- [[Слой данных React Query]] — `prefetchQuery`, `queryClient`.
- [[Домен Услуги]] — `ServiceCard`, `servicesKeys`.
- [[Домен Портфолио]] — `PortfolioCard`, `portfolioKeys`.
