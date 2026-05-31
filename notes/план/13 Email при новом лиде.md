---
created: 2026-05-29
tags:
  - план
  - webstudio
  - бизнес
  - supabase
status: todo
сложность: 🔴 сложно
влияние: бизнес-процесс
---

# 13 — Email-уведомление при новом лиде

← [[12 Анимации появления секций]] | [[План улучшений]] | следующий: [[14 Экспорт лидов в CSV]]

## Проблема

Когда пользователь отправляет форму [[Домен Лиды|контактов]], заявка молча ложится в БД. Никто из команды не знает о новом лиде без ручного захода в админку.

## Что сделать

Supabase Edge Function + Resend (или SendGrid).

### 1. Создать Edge Function
```
supabase/functions/notify-new-lead/index.ts
```

```ts
import { serve } from 'https://deno.land/std/http/server.ts';

serve(async (req) => {
  const { record } = await req.json(); // payload от webhook
  await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${Deno.env.get('RESEND_API_KEY')}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: 'noreply@yourdomain.com',
      to: 'admin@yourdomain.com',
      subject: `Новая заявка от ${record.name}`,
      html: `<p><b>${record.name}</b> (${record.email})<br>${record.message}</p>`,
    }),
  });
  return new Response('ok');
});
```

### 2. Настроить Database Webhook
В Supabase Dashboard → Database → Webhooks: триггер на `INSERT` в `leads`, вызывает Edge Function.

### 3. Добавить секрет
```bash
supabase secrets set RESEND_API_KEY=re_...
```

### Альтернатива
Вместо Resend можно использовать SendGrid или SMTP через Deno `nodemailer`.

## Связи
- [[Домен Лиды]] — таблица `leads`, куда приходят заявки.
- [[Supabase и база данных]] — Edge Functions и Webhooks.
- [[Безопасность RLS и CSP]] — `RESEND_API_KEY` — серверный секрет, не `VITE_*`.
- [[23 Rate limiting на форме]] — пара: уведомления + защита от спама = полноценная обработка лидов.
