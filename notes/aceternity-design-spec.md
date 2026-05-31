# Дизайн-референс: Aceternity «Productized Agency»

Разбор шаблона <https://ui.aceternity.com/template-preview/productized-agency-template>
(живой исходник: `productized-agency-template-acetern.vercel.app`).
Цель — перенести визуальный язык на наш сайт WebStudio.

## 1. Общее впечатление

Премиальная студия веб-разработки. Два контрастных мира на одной странице:

- **Тёмный кинематографичный hero** — почти чёрный фон с тёплым оранжевым «восходом» (radial-glow у нижней кромки) и гигантским полупрозрачным водяным знаком-логотипом.
- **Светлый «бумажный» контент** — тёплый off-white фон (`#f0efec`), мягкие карточки, много воздуха, акценты янтарём/жёлтым.

Стиль: editorial + utilitarian. Крупная типографика, моноширинные подписи-метки, скруглённые карточки, аккуратные тонкие границы. Никакого неона и фиолетовых градиентов.

## 2. Цветовая палитра

### Базовые токены (из CSS живого шаблона)

| Назначение | HEX | Заметка |
|---|---|---|
| `--color-background` / offwhite | `#f0efec` | тёплый светлый фон контента |
| `--color-primary` | `#ffcc00` (`#fc0`) | фирменный жёлтый — кнопки, акценты |
| `--color-foreground` | `#000000` | основной текст |
| heading | `#343434` | заголовки (не чистый чёрный) |
| muted-foreground | `#8b8b8b` | вторичный текст |
| secondary (bg) | `#f7f7f7` | светлые карточки/поля |
| natural-black | `#000000` | тёмные карточки/секции |
| natural-white | `#ffffff` | белые карточки |
| dusty-green | `#447e68` | приглушённый зелёный акцент (кейсы) |
| dusty-red | `#ff6464` | мягкий красный (negative/«traditional») |

### Hero glow и тёплая гамма (оранжевый «восход»)

Градиент от янтаря к огню: `#FFBC00 → #FFA312 → #FF8D1B → #FF6200 → #EB1000`.
Плюс мягкий `#FA9A63` / `#F0C17B` для рассеянного свечения.

### Системные «traffic-light» точки (mac-окна в мокапах)

`#FF5F57` (red) · `#FFBD2E` (yellow) · `#28C840` (green).

## 3. Типографика

- **Inter** — основной шрифт (заголовки и текст). Веса: 400 / 500 / 600 / 700.
- **Geist Mono** и **DM Mono** — моноширинные для меток, бейджей, цен, технических подписей («New components every week», «$4995/mo»).

Приём: крупный плотный заголовок (Inter, `font-semibold`/`bold`, tight leading) + мелкая моно-метка над ним. Цены — моноширинным.

Заголовки большие: hero ~`text-6xl`+, секции ~`text-4xl`. Цвет заголовков `#343434`, не чёрный.

## 4. Радиусы, границы, тени

- Радиусы: `sm .25rem` · `md .375rem` · `lg .5rem` · `xl .75rem` · `2xl 1rem` · `3xl 1.5rem`.
  Карточки — преимущественно `rounded-2xl` (`1rem`).
- Кнопки-pill: `rounded-full`.
- Границы: очень тонкие, низкоконтрастные — `border-white/10`, `border-white/20` на тёмном; `black/5–10` на светлом. Кольца `ring-black/5`.
- Тени мягкие и низкие: `shadow-black/10` (тонкая, рассеянная). Без тяжёлых drop-shadow.

## 5. Фоновые паттерны и эффекты

- **Grid-линии**: `linear-gradient(to right,#181816 1px,transparent 1px)` + аналог по вертикали — тонкая тёмная сетка на тёмных блоках.
- **Dot-pattern**: `radial-gradient(circle,#000 10%,transparent 100%)` повтором — точечная текстура.
- **Radial-mask**: контент маскируется радиальным градиентом (затухание к краям) — `mask-radial`.
- **Hero glow**: большой `radial-gradient` тёплого оранжевого у нижней кромки экрана + огромный приглушённый текст-логотип позади.
- **Линейные градиенты-фейды**: `linear-gradient(90deg,#fff 0%, transparent 100%)` для плавного схода логотипов/контента.

## 6. Структура страницы (порядок секций)

1. **Navbar** — лого слева; центр: Work · Products · Pricing · Blog; справа жёлтая pill-кнопка «Chat with Alex».
2. **Hero (тёмный)** — моно-бейдж «Aceternity UI · New components every week»; H1 «The best design and development agency in the world.»; справа подзаголовок «We design and build websites that drive results... No Calls. No BS. Just Results.» + жёлтая CTA. На фоне — оранжевый glow + watermark-логотип.
3. **Логотипы клиентов** — «Trusted by fast-growing startups», ряд серых лого (Cursor, Loopback, Kearney, Helium, Thrust…), затухание по краям.
4. **«Replace your Engineering Team»** — бенто-сетка карточек: тёмная карточка «Design and Development» с жёлтой кнопкой «View pricing», светлые карточки «Regular updates & progress tracking», тёмная «Hosting, Deployment & Maintenance» (карта мира с точками), «Get found on Google», «Components, Dashboards & Everything else».
5. **Projects** — гигантский фоновый заголовок «Projects»; сетка мокапов (планшет/телефон/лендинги) с подписями: «Funding launch page», «SaaS homepage refresh», «AI search landing page», «Conversion page redesign». Кнопки «View Project →».
6. **Design Philosophy / «Design and engineering in sync»** — «Disconnected teams» vs «Traditional Service Providers».
7. **Testimonials** — «Get to know our dream team»; карточки-отзывы с аватарами (Jason Ray CEO, Steve Wozniak CTO, Sarah Johnson, Michael Brown…), бейдж «Aceternity and Manu are Cracked Devs!».
8. **Extensive Pricing Plans** — три тарифа карточками:
   - *Components* (светлая) — «Tailored Website Components for Fast Moving Brands», $4995/mo, бейдж «All slots booked for November».
   - *Website Pages* (тёмная, выделенная) — $6995/mo, бейдж «2 Spots Available».
   - *Multi Pages* (светлая) — «Tailored Multi Page Websites», $12,499/mo.
   Каждый: жёлтая pill «Select Plan» + чек-лист фич (Custom Strategy & Wireframe, Development in Framer/Webflow, Smooth Animations, Unlimited Revisions, High-Fidelity Design in Figma, SEO…). Цены моно-шрифтом. Сверху справа «Doubts? Reach out... or chat with us».
9. **CTA / Book a call** — «Book a Free Call» / «Book a Paid Call».
10. **Footer** — навигация, Terms of Service, лого.

## 7. Кнопки

- **Primary**: жёлтый `#ffcc00` фон, тёмный текст, `rounded-full`, моно/medium шрифт, иногда с маленьким жёлтым квадратом-иконкой слева. Пример: «Select Plan», «Chat with Alex», «View pricing».
- **Secondary/ghost**: прозрачная с тонкой границей `border-white/20` на тёмном или светлый `#f7f7f7` с hover `secondary/75`.
- **Бейджи/метки**: pill с тонкой границей, моно-шрифт, мелкий, приглушённый («2 Spots Available» — зелёный акцент, «All slots booked» — красноватый).

## 8. Карточки

- `rounded-2xl`, `overflow-hidden`, `position:relative`.
- Светлые: фон `#fff` / `#f7f7f7`, тонкая граница `black/5`, мягкая тень.
- Тёмные (выделение): фон чёрный, текст белый, внутренние границы `white/10`, чек-листы серым.
- Внутри часто product-мокапы с mac-точками `#FF5F57/#FFBD2E/#28C840`.
- Бенто-раскладка: карточки разной высоты/ширины в одной сетке.

## 9. Перенос на наш стек (Tailwind + shadcn)

Маппинг на `tailwind.config.ts` / CSS-переменные shadcn (соблюдать наше правило: токены, **светлая И тёмная тема**, без хардкода):

```css
:root {
  --background: 48 14% 93%;     /* #f0efec offwhite */
  --foreground: 0 0% 20%;       /* #343434 heading */
  --primary: 48 100% 50%;       /* #ffcc00 */
  --primary-foreground: 0 0% 0%;
  --secondary: 0 0% 97%;        /* #f7f7f7 */
  --muted-foreground: 0 0% 55%; /* #8b8b8b */
  --accent-green: 158 30% 38%;  /* #447e68 dusty-green */
  --accent-red: 0 100% 70%;     /* #ff6464 dusty-red */
  --radius: 1rem;               /* 2xl карточки */
}
.dark {
  --background: 0 0% 0%;        /* hero black */
  --foreground: 0 0% 100%;
  --primary: 48 100% 50%;       /* жёлтый остаётся акцентом */
}
```

- Шрифты: подключить **Inter** (sans) + **Geist Mono**/**DM Mono** (метки, цены). У нас они идут как Google/self-host — добавить в `index.html`/`@font-face` и в `fontFamily` конфиг.
- Радиусы: `--radius: 1rem`, карточки `rounded-2xl`, кнопки `rounded-full`.
- Hero: тёмная секция + tailwind `bg-[radial-gradient(...)]` тёплого оранжевого снизу + крупный watermark-текст (`text-[20vw] text-white/5`).
- Grid/dot фоны: utility-классы с `linear-gradient` сеткой и `radial-gradient` точками + radial-mask по краям.
- Соблюдать: акцент = жёлтый, заголовки = `#343434` (не чёрный), вторичный текст = `#8b8b8b`, тонкие низкоконтрастные границы, мягкие тени.

## 10. Что НЕ копировать дословно

- Тексты-плейсхолдеры и цены тарифов — заменить на наши услуги.
- Логотипы клиентов/кейсы — наши реальные проекты из портфолио (Supabase-данные).
- «Chat with Alex» → наша форма контактов / лид-форма.
