---
target: homepage
total_score: 29
p0_count: 1
p1_count: 3
timestamp: 2026-05-29T18-35-27Z
slug: src-pages-public-homepage-tsx
---
# Critique — Главная страница (src-pages-public-homepage-tsx)

Цель: главная (HomePage.tsx + Header/Footer/PublicLayout/ServiceCard/PortfolioCard/globals.css). Два изолированных ассессмента: design review + детектор/браузер. Dev-сервер :5173, проверены 1440px и 375px.

## Design Health Score

| # | Эвристика | Балл | Ключевая проблема |
|---|-----------|------|-------------------|
| 1 | Visibility of System Status | 3 | Скелетоны есть, но нет error/empty на грид-секциях |
| 2 | Match System / Real World | 4 | Русский-first, живой язык, ноль buzzword'ов |
| 3 | User Control & Freedom | 3 | Нет мобильной навигации |
| 4 | Consistency & Standards | 2 | Две системы kicker'ов, три радиуса карточек |
| 5 | Error Prevention | 3 | На главной мало что ломать |
| 6 | Recognition over Recall | 3 | Active-state над hero почти невидим |
| 7 | Flexibility & Efficiency | 3 | Двойной CTA, переключатель языка — ок |
| 8 | Aesthetic & Minimalist | 3 | Минус за пустые декор-квадраты в кнопках |
| 9 | Error Recovery | 2 | Нет error-UI для упавших fetch на главной |
| 10 | Help & Documentation | 3 | Маркетинг-страница |
| Итого | | 29/40 | GOOD (нижняя граница) |

## Anti-Patterns Verdict

LLM-оценка: PASS на hero, мягкий FAIL ниже сгиба. Hero авторский (дуга-горизонт, звёзды, watermark, асимметрия). Ниже hero — откат в шаблон AI-агентств 2024 из анти-референсов: eyebrow над каждой секцией (HomePage.tsx:72,105), идентичные карточки lg:grid-cols-3, ghost-card (border+shadow-soft, ServiceCard.tsx:18), Inter как body.

Детектор: detect.mjs --json по 6 markup-файлам → [], exit 0, ноль находок. Движок настоящий, regex-режим для TSX. Оговорка: regex не оценивает вычисляемый контраст из токенов, градиенты, motion — поэтому браузерные/ручные находки в его слепой зоне.

Браузер: консоль без ошибок, битых картинок нет, оверфлоу нет на 1440px и 375px. Overlay-инъекция не применялась (URL-скан требует puppeteer).

## Overall Impression

Сильный hero пристёгнут к генерик-шаблонному body. Контраст между ними — сам по себе tell. Кривая: пик (hero) → провал (карточки) → неплохой финал (тёмный CTA). Возможность — дотянуть середину до уровня hero.

## What's Working

1. Дуга hero — настоящая подпись (ручной радиал + drop-shadow, globals.css:114-124).
2. Дисциплина копирайта и chunking, низкая когнитивная нагрузка.
3. Чистая архитектура темы (dark-scope с токенами).
4. Скролл-переход хедера.

## Priority Issues

[P0] Пустые декор-квадраты в кнопках читаются как сломанный UI. Header.tsx:82, HomePage.tsx:146 — пустой bg-primary-foreground/15 внутри жёлтого CTA. Фикс: глиф или удалить. → polish

[P1] Eyebrow-над-каждой-секцией + идентичный грид = AI-шаблон из анти-референсов. HomePage.tsx:72,105. Фикс: убрать kicker, сломать симметрию грида. → typeset + layout

[P1] muted-foreground (#8b8b8b ≈3.5:1) фейлит AA по всему body и kicker'ам. globals.css:24. Фикс: затемнить до ~0 0% 42%. → audit/colorize

[P1] Нет мобильной навигации. Header.tsx:50 (hidden md:flex). Фикс: Sheet + триггер. → adapt

[P2] Сабтайтл hero (white/70) сталкивается с яркой дугой на узких экранах. HomePage.tsx:43. Фикс: scrim или опустить дугу на мобайле. → adapt

## Persona Red Flags

- Jordan: пустые квадраты = «не доделан»; плоская иерархия карточек.
- Riley: упавшие запросы → молчаливые пустые секции; на ~700px навигация исчезает.
- Casey: нет мобильного меню; сабтайтл на дуге теряет контраст.
- Sam: muted-foreground 3.5:1 фейлит AA; dark-mode --border:100% white хрупок; декор корректно aria-hidden; CTA 14.8:1 ок.
- Покупатель mid-size: hero=премиум, затем генерик-body+Inter понижает оценку craft; kicker-на-каждой-секции = «шаблон».

## Minor Observations

- index.html грузит 3 семейства, DM Mono вероятно не рендерится — лишний payload.
- Footer «Privacy» href="#" (Footer.tsx:43) — мёртвая ссылка.
- Hero text-[5.5rem] в пределах ≤6rem; rounded-3xl=24px ниже бана 32px — прошли.
- Нет prefers-reduced-motion на animate-rise/hover-transform — a11y-полиш + memory-правило проекта.
- --border: 0 0% 100% в dark — латентный баг.

## Questions to Consider

1. Если бы клиент видел только то, что ниже сгиба — поверил бы, что вы craft-студия?
2. Почему самый интересный шрифт (Geist Mono) самый мелкий на странице?
3. Пустой квадрат в жёлтой кнопке — та ли это деталь на клике, который платит?
