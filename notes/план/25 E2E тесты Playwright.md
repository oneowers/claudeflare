---
created: 2026-05-29
tags:
  - план
  - webstudio
  - тестирование
  - dx
status: todo
сложность: 🔴 сложно
влияние: надёжность релизов
---

# 25 — E2E тесты с Playwright

← [[24 Sentry мониторинг]] | [[План улучшений]]

## Проблема

Unit и интеграционные тесты (Vitest) проверяют компоненты изолированно. Нет автоматической проверки того, что **весь пользовательский сценарий** работает от начала до конца.

## Что сделать

1. Установить Playwright:
   ```bash
   npm init playwright@latest
   ```
   Выбрать TypeScript, папку `e2e/`, добавить в CI.

2. Написать 4 критичных сценария:

### Сценарий 1 — Публичная форма
```ts
test('пользователь отправляет заявку', async ({ page }) => {
  await page.goto('/ru/contact');
  await page.fill('[id="name"]', 'Тест Тестов');
  await page.fill('[id="email"]', 'test@example.com');
  await page.fill('[id="message"]', 'Хочу сайт');
  await page.click('button[type="submit"]');
  await expect(page.getByText(/заявка принята/i)).toBeVisible();
});
```

### Сценарий 2 — Вход в админку
```ts
test('админ входит в систему', async ({ page }) => {
  await page.goto('/ru/admin/login');
  await page.fill('[id="email"]', process.env.E2E_ADMIN_EMAIL!);
  await page.fill('[id="password"]', process.env.E2E_ADMIN_PASSWORD!);
  await page.click('button[type="submit"]');
  await expect(page).toHaveURL(/\/admin$/);
});
```

### Сценарий 3 — CRUD услуги
Создать услугу в админке → проверить появление на публичной странице.

### Сценарий 4 — Смена языка
Переключить язык → проверить, что URL и контент изменились.

3. Переменные для E2E в `.env.local`:
   ```
   E2E_ADMIN_EMAIL=...
   E2E_ADMIN_PASSWORD=...
   ```
   Никогда не коммитить. Добавить в `.gitignore` если не там.

## Связи
- [[Разработка и тесты]] — общий подход к тестированию.
- [[Маршрутизация]] — все тестируемые маршруты.
- [[Домен Авторизация]] — сценарий входа.
- [[Домен Лиды]] — сценарий формы.
- [[Деплой и окружение]] — CI/CD, Playwright в GitHub Actions.
