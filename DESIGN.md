---
name: WebStudio
description: Студия веб-разработки — сайты, дизайн, поддержка.
colors:
  white: "#FFFFFF"
  navy: "#0F172A"
  muted-bg: "#F1F5F9"
  muted-text: "#64748B"
  border-line: "#E2E8F0"
  near-white: "#F8FAFC"
  void: "#070D1E"
  surface-dark: "#1E293B"
  text-dark: "#94A3B8"
  destructive: "#EF4444"
typography:
  display:
    fontFamily: "Unbounded, Inter, ui-sans-serif, sans-serif"
    fontSize: "clamp(2.6rem, 7vw, 4.5rem)"
    fontWeight: 700
    lineHeight: 1.02
    letterSpacing: "-0.025em"
  headline:
    fontFamily: "Unbounded, Inter, ui-sans-serif, sans-serif"
    fontSize: "clamp(1.875rem, 5vw, 3rem)"
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: "-0.025em"
  title:
    fontFamily: "Unbounded, Inter, ui-sans-serif, sans-serif"
    fontSize: "15px"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "-0.02em"
  body:
    fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif"
    fontSize: "15px"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "ui-monospace, SFMono-Regular, monospace"
    fontSize: "11px"
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: "0.14em"
rounded:
  sm: "8px"
  md: "10px"
  lg: "16px"
  full: "9999px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "48px"
  section: "96px"
components:
  button-primary:
    backgroundColor: "{colors.navy}"
    textColor: "{colors.near-white}"
    rounded: "{rounded.md}"
    padding: "12px 24px"
    height: "48px"
  button-primary-hover:
    backgroundColor: "{colors.navy}"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.navy}"
    rounded: "{rounded.md}"
    padding: "12px 24px"
    height: "48px"
---

# Design System: WebStudio

## 1. Overview

**Creative North Star: "The Technical Portfolio Specimen"**

WebStudio продаёт через демонстрацию — и сам сайт является лучшим кейсом студии. Дизайн читается как технический паспорт, написанный специалистом, который мог бы его исполнить. Каждый типографический выбор — это одновременно и функциональное решение, и доказательство компетентности.

Система строится на двух шрифтах с максимальным контрастом: `Unbounded` (геометрический, сжатый, уверенный) несёт всё структурное — заголовки, числовые акценты, watermark. `Inter` — рабочий шрифт для описаний и тела. Монохромный navy/white цвет отказывается от акцентного цвета: иерархия строится через scale и weight, а не через hue. Портфолио-карточки — острые, без скруглений, с grid-текстурой — читаются как листы технического задания. Услуги — список-строки со slide-in hover, а не карточки.

Параллакс — в основе кинетики: hero-контент медленно поднимается при скролле, footer-wordmark вплывает снизу, marquee движется против скролла. Это не декор — это сигнал того, как студия работает: всё реагирует.

Система отвергает: корпоративный Enterprise-стиль (navy + золото, serif-пафос), AI-шаблонные агентства 2024 (amber CTA, кремово-жёлтые фоны, glassmorphism, gradient text), ощущение фриланс-биржи с карточками-равнотравием.

**Key Characteristics:**
- Monochromatic: primary = foreground; акцентного цвета нет — иерархия через scale и opacity
- `Unbounded` для всего структурного, `Inter` для всего рабочего — максимальный шрифтовой контраст
- Портфолио-карточки острые (нет border-radius), с bg-grid-текстурой и edge-gradients
- Услуги как list-rows со slide-in hover — не card grid
- Scroll-driven parallax на 3+ слоях в hero; footer wordmark дрейфует снизу
- Полная dark-mode поддержка через CSS custom properties

## 2. Colors: The Monochrome Signal

Система работает в двух состояниях (light/dark) без акцентного цвета. Глубина — через opacity и surface layering.

### Primary (Light)
- **White** (`#FFFFFF`): Основной фон в светлом режиме.
- **Navy** (`#0F172A`): Основной текст, primary-кнопки, foreground. Почти-чёрный с лёгким синим сдвигом.

### Primary (Dark)
- **Void** (`#070D1E`): Основной фон тёмного режима. Глубокий navy, не нейтральный чёрный.
- **Near-white** (`#F8FAFC`): Основной текст в тёмном режиме и текст на primary-кнопках.

### Neutral
- **Muted BG** (`#F1F5F9`): Вторичный фон, secondary/muted поверхности в светлом. Соответствует `--muted: 210 40% 96%`.
- **Muted Text** (`#64748B`): Вторичный текст, описания, meta-данные в светлом. WCAG AA ✓ на белом фоне.
- **Border Line** (`#E2E8F0`): Разделители и границы в светлом. Соответствует `--border: 214 32% 91%`.
- **Surface Dark** (`#1E293B`): Muted/secondary поверхности в тёмном.
- **Text Dark** (`#94A3B8`): Muted foreground в тёмном. WCAG AA ✓ на `#070D1E`.

### Semantic
- **Destructive** (`#EF4444`): Ошибки, деструктивные действия. Только для UI состояний.

### Named Rules

**The No-Accent Rule.** В системе нет отдельного акцентного цвета. Primary кнопка = foreground цвет (`#0F172A` в светлом, `#F8FAFC` в тёмном). Иерархия строится через scale, weight, и opacity — не через hue. Amber, teal, blue-600: запрещены как акценты.

**The Adaptive Rule.** Все цвета — через CSS custom properties. Никаких хардкодных hex в компонентах без явной причины. Tailwind-токены (`bg-primary`, `text-muted-foreground`) — всегда предпочтительнее arbitrary values.

**The Navy-Not-Black Rule.** Тёмный фон — `#070D1E`, не `#000000`. Foreground — `#0F172A`, не `#000000`. Холодный нейтральный чёрный выбивается из системы.

## 3. Typography

**Display Font:** Unbounded (Inter, ui-sans-serif — fallback)
**Body Font:** Inter (ui-sans-serif, system-ui — fallback)
**Mono:** системный ui-monospace / SFMono-Regular

**Character:** Unbounded — геометрический, сжатый, модернистский. Его узкое начертание при крупном кегле создаёт tension без агрессии. Inter — рабочий нейтралитет, высокая читаемость на любом размере. Пара работает на контрасте характеров: Unbounded — заявляет, Inter — объясняет.

### Hierarchy

- **Display** (Unbounded, 700, clamp 2.6rem→4.5rem, leading 1.02, tracking -0.025em): Hero H1. Плотная, уверенная. Ограничение ≤4.5rem (72px) — не кричит.
- **Headline** (Unbounded, 700, clamp 1.875rem→3rem, leading 1.1, tracking -0.025em): Section H2. Используется с `text-3xl md:text-5xl`.
- **Title** (Unbounded, 700, 15px, leading 1.2, tracking -0.02em): Заголовки портфолио-карточек и мелких блоков.
- **Body** (Inter, 400, 15px—18px, leading 1.6): Описания и параграфы. Hero subtitle: `text-lg leading-relaxed`. Card descriptions: `text-sm leading-relaxed`. Максимальная ширина строки: `max-w-xl` (~65ch).
- **Label** (monospace, 500, 11px, letter-spacing 0.14em, uppercase): Функциональные метки: категории карточек, tech-стеки, временные метки. `text-[10px]` для micro-labels в карточках, `text-[11px]` для tech-footer. Только для данных.

### Signature: Section Kicker

Устойчивый паттерн: числовой акцент `01` / `02` в Unbounded + uppercase mono строка рядом:

```
<span class="font-display text-foreground">01</span>
<span class="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">УСЛУГИ</span>
```

Этот паттерн — один раз на секцию, намеренный. Не над каждым заголовком, не без числа.

### Hero Kicker

Горизонтальная линия + uppercase tracking text:

```
<span class="h-px w-10 bg-foreground/40" />
<span class="text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">ТЕКСТ</span>
```

### Named Rules

**The Two-Font Rule.** Только Unbounded + Inter. Третий шрифт — никогда. Mono — системный (ui-monospace), не подключается отдельно.

**The Mono-as-Data Rule.** Monospace только для данных: tech-стеки, категории, временные метки, числовые коды. Mono как «атмосфера» — запрещён.

**The Display-for-Structure Rule.** Unbounded несёт: заголовки, section-числа, watermark, ценники. Inter несёт: описания, параграфы, навигационные ссылки, форм-лейблы. Если элемент — данные, он в Inter или Mono. Если структура — в Unbounded.

## 4. Elevation

Система плоская по умолчанию. Box-shadow не используется как декор: depth строится через border и surface-layering (opacity variants). Исключение — focus rings и dropdown-поверхности.

Портфолио-карточки в rest: `border border-foreground/10`, нет тени. Hover не даёт тень — только усиление border до `border-foreground/20` и подсветку edge-gradients.

ServiceCard hover: background-fill `bg-foreground/[0.04]` как structural depth signal — не тень.

CTA banner: `rounded-2xl bg-primary` — elevation через цветовой контраст, не через тень.

### Named Rules

**The Flat-By-Default Rule.** Компоненты в покое: border, без shadow. Тень — только для systemic-elevation (dropdown, sheet, modal). Никогда `border + box-shadow` одновременно в default-состоянии.

**The Opacity-Layering Rule.** Глубина = opacity. `foreground/10` для subtle bounds, `foreground/15` для section dividers, `foreground/20` на hover, `foreground/[0.04]` для hover-fill. Эта шкала — вместо цветовых поверхностей.

## 5. Components

### Buttons

Два варианта: primary (dark fill) и ghost (border only). Оба — `rounded-md` (~10px), высота `h-12` (48px).

- **Primary** (`bg-primary text-primary-foreground, rounded-md, h-12, px-6`): В светлом — navy фон, near-white текст. В тёмном — near-white фон, navy текст. Hover: `bg-primary/90`. Иконка ArrowRight с `group-hover:translate-x-1`.
- **Ghost** (`border border-input bg-background/60, rounded-md, h-12, px-6, backdrop-blur`): Tertiary action. `backdrop-blur` даёт лёгкий glass-effect поверх hero — единственный допустимый blur в системе.

Никаких amber/colored кнопок. Primary = foreground. Это намеренно.

### Portfolio Cards (Work Cards)

Самый характерный компонент системы. Острые прямоугольники без border-radius.

- **Container**: `border border-foreground/10 bg-card overflow-hidden` — нет скруглений
- **Grid texture**: `bg-grid` utility (`linear-gradient` 72px grid at `foreground/0.045`) на `opacity-60` — читается как технический лист
- **Edge gradients**: `h-px bg-gradient-to-r from-foreground/25 via-foreground/10 to-transparent` по верхнему краю + вертикальный аналог по левому — усиливаются до `opacity-100` на hover
- **Index accent**: Геометрический `font-mono text-[28px] font-semibold text-foreground/15` — декоративный, нечитаемый как данные
- **Category label**: `font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground`
- **Title**: `font-display text-[15px] font-bold`
- **Image**: `aspect-[16/10]`, `border-y border-foreground/10`; нет hover-scale — карточка не «зумится»
- **Tech footer**: `font-mono text-[11px] uppercase tracking-wide text-muted-foreground`
- **Arrow**: `ArrowUpRight h-4 w-4`, translates `-0.5px` по Y и `+0.5px` по X на hover

Hover: только edge-gradient усиление и border `→ foreground/20`. Никакого translateY, никакой тени, никакого overlay.

### Service List Rows

Услуги — список, не grid. Каждая строка `border-t border-foreground/15 py-7 md:py-8`.

- **Slide-in**: На hover `padding-left: 20px` с `transition-[padding-left] duration-500 ease-[0.22,1,0.36,1]`
- **Background fill**: абсолютный span `w-0 → w-full bg-foreground/[0.04]` с тем же transition
- **Index**: `font-display text-xs font-semibold tracking-[0.1em] text-muted-foreground`
- **Title**: `font-display text-2xl md:text-3xl font-semibold`
- **Price**: `font-display text-lg md:text-xl font-medium`; label над ценой: `text-[10px] uppercase tracking-[0.18em]`

### Navigation

Scroll-aware morphing: прозрачная в top → при скролле сжимается в centered glassmorphism pill.

- **Прозрачная**: `fixed inset-x-0 top-0`, логотип + ссылки + CTA
- **Scrolled pill**: `backdrop-blur-xl bg-muted/40 border border-border/60 rounded-xl shadow-lg`

Header живёт поверх hero — nav-ссылки белые/прозрачные когда hero под ними.

### Hero Background System

Трёхслойный параллакс-фон:

1. **Grid layer**: `bg-grid mask-fade-y` дрейфует `0%→18%` на скролл
2. **Blobs**: два `bg-primary/10 blur-3xl rounded-full` — blob A вверх `-32%`, blob B вниз `+24%`
3. **Watermark word**: `font-display text-[20vw] font-extrabold text-outline` (css: `color: transparent; -webkit-text-stroke: 1.5px foreground/10`), дрейфует вверх `0%→46%` и исчезает к opacity 0

### Reveal & Parallax Utilities

`Motion.tsx` — два примитива:

- **`<Reveal>`**: `whileInView opacity:0→1, y:28→0, duration:0.75, ease:[0.22,1,0.36,1]`, `viewport:{once:true, margin:'-80px'}`. Поддерживает `delay` и `y`. `useReducedMotion` выключает анимацию.
- **`<Parallax>`**: scroll-driven `useTransform(scrollYProgress, [0,1], ['0%', `${distance}%`])`. `distance` — drift в процентах. `useReducedMotion` выключает.

### Footer Wordmark

`font-display text-[22vw] font-extrabold text-foreground/[0.04]`, дрейфует снизу вверх на `translateY(28 - drift)px` где `drift = progress * 72`. При полном скролле к низу страницы — wordmark поднимается на 72px. `prefers-reduced-motion` — без анимации.

### CTA Banner

`rounded-2xl bg-primary px-8 py-20 text-center`. Внутри — параллакс со сдвигом `-30%`: огромный `→` символ в Unbounded, `text-[14rem] text-primary-foreground opacity-[0.08]`. Кнопка: `bg-background text-foreground` (инверсия).

### Inputs / Fields

- **Стиль**: `border border-input rounded-md bg-background` (12px radius через `--radius`)
- **Focus**: `ring ring-ring` (foreground цвет)
- **Error**: `border-destructive`

## 6. Do's and Don'ts

### Do:
- **Do** использовать `font-display` (Unbounded) только для структурных элементов: h1, h2, card-titles, section-numbers, watermarks, prices.
- **Do** использовать `font-mono` исключительно для данных: tech-стеки, категории, timestamps, индексы. Никогда как «атмосфера».
- **Do** делать портфолио-карточки острыми — без `rounded-*` класса на контейнере. Скругление там = отступление от идентичности.
- **Do** строить depth через opacity: `foreground/10` (border) → `foreground/15` (divider) → `foreground/20` (hover) → `foreground/[0.04]` (fill). Это вместо цветовых поверхностей.
- **Do** применять `useReducedMotion()` перед каждой framer-motion анимацией. Передавать `initial={reduce ? false : ...}` или аналог.
- **Do** использовать `ease: [0.22, 1, 0.36, 1]` как стандартный easing. Это единственная easing-кривая системы.
- **Do** раскрывать hero background как минимум в два слоя: grid texture (`bg-grid`) + blob-glow. Пустой монохромный фон — потеря характера.
- **Do** использовать `bg-grid` utility на portfolio-карточках и hero — это подпись системы.
- **Do** держать тёмный bg как `--background: 222 47% 5%` (navy void), не чёрным `#000`.
- **Do** давать section-kickers числа (`01`, `02`) в `font-display` рядом с uppercase mono текстом — только на разделяющих секциях, не над каждым заголовком.

### Don't:
- **Don't** добавлять акцентный цвет (amber, teal, blue-600). Система монохромная намеренно. Primary = foreground. Точка.
- **Don't** скруглять портфолио-карточки. `rounded-2xl` или `rounded-lg` на `.PortfolioCard` нарушает характер технического листа.
- **Don't** делать grid карточек для услуг — ServiceCard это строки (rows), не tiles.
- **Don't** использовать `box-shadow` как декор на картах в default-состоянии. Border — достаточно.
- **Don't** ставить hover overlay (gradient scrim) на portfolio-карточки. Это паттерн старого дизайна — здесь hover работает через edge-gradients и border.
- **Don't** применять gradient text (`background-clip: text`). Запрещено.
- **Don't** использовать стороннюю иконку-библиотеку помимо `lucide-react`. Inline SVG — только для sidecar snippets.
- **Don't** делать bounce или elastic easing. Только `ease-out` с кривой `[0.22, 1, 0.36, 1]`.
- **Don't** использовать amber/yellow (#F5B517 и аналоги) — это цвет прошлой версии дизайна, несовместимой с текущей системой.
- **Don't** добавлять uppercase eyebrow над каждой секцией без числового акцента. Паттерн работает только с `01` / `02` — как структурный сигнал, не декоративный элемент.
- **Don't** создавать новые layout-компоненты. Использовать `PublicLayout` / `AdminLayout`. Параллакс и reveal — через `<Reveal>` и `<Parallax>` из `Motion.tsx`.
