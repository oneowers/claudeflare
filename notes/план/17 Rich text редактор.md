---
created: 2026-05-29
tags:
  - план
  - webstudio
  - админка
  - ui
status: todo
сложность: 🔴 сложно
влияние: качество контента
---

# 17 — Rich text редактор для описаний

← [[16 Предпросмотр из формы]] | [[План улучшений]] | следующий: [[18 Галерея изображений]]

## Проблема

Поля `description` в услугах и портфолио — обычный `<Textarea>`. Форматировать текст нельзя: нет заголовков, списков, ссылок. Длинные описания выглядят как сплошной текст.

## Что сделать

### Подход: Markdown-редактор

Самый лёгкий вариант — MD-редактор с превью, хранить чистый Markdown в БД.

1. Проверить размер бандла: `npx bundle-phobia @uiw/react-md-editor`.
2. Установить `@uiw/react-md-editor`:
   ```bash
   npm install @uiw/react-md-editor
   ```
3. В форме заменить `<Textarea>` на `<MDEditor>` для поля `description`.
4. На публичной странице (`ServiceDetailPage`) рендерить через `react-markdown`:
   ```bash
   npm install react-markdown
   ```
   ```tsx
   <ReactMarkdown>{pickLocale(service.description, lang)}</ReactMarkdown>
   ```

### Важно: XSS
`react-markdown` по умолчанию безопасен (не рендерит `<script>`). Если добавить `rehype-raw` для HTML — обязательно добавить `rehype-sanitize`. Без этого `dangerouslySetInnerHTML`-риск. Связь: [[Безопасность RLS и CSP]].

### Альтернатива: Tiptap
Более богатый WYSIWYG-редактор, но тяжелее. Рассмотреть если Markdown недостаточен.

## Связи
- [[Домен Услуги]] — `ServiceForm`, `ServiceDetailPage`.
- [[Домен Портфолио]] — `PortfolioForm`, `PortfolioDetailPage`.
- [[Безопасность RLS и CSP]] — защита от XSS при рендере HTML.
- [[Локализация i18n]] — редактор нужен для каждой языковой вкладки через `LocaleTabs`.
- [[18 Галерея изображений]] — пара: богатый текст + галерея = полноценная страница кейса.
