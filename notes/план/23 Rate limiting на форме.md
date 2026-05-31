---
created: 2026-05-29
tags:
  - план
  - webstudio
  - безопасность
status: todo
сложность: 🟡 средне
влияние: защита от спама
---

# 23 — Rate limiting на форме контактов

← [[22 Orphan image cleanup]] | [[План улучшений]] | следующий: [[24 Sentry мониторинг]]

## Проблема

В `ContactForm` уже есть honeypot-поле `website` — первый уровень защиты. Но нет серверного ограничения: бот может отправить сотни заявок, обходя honeypot.

## Что сделать

### Подход: Edge Function как прокси для insert

Вместо прямого `supabase.from('leads').insert(...)` — POST в Edge Function, которая проверяет rate limit по IP.

1. Создать `supabase/functions/submit-lead/index.ts`:
```ts
import { serve } from 'https://deno.land/std/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

// Простой in-memory rate limiter (для production — Redis/Upstash)
const ipCounts = new Map<string, { count: number; resetAt: number }>();

serve(async (req) => {
  const ip = req.headers.get('x-forwarded-for') ?? 'unknown';
  const now = Date.now();
  const window = 60 * 60 * 1000; // 1 час
  const limit = 5;

  const entry = ipCounts.get(ip) ?? { count: 0, resetAt: now + window };
  if (now > entry.resetAt) { entry.count = 0; entry.resetAt = now + window; }
  if (entry.count >= limit) {
    return new Response('Too many requests', { status: 429 });
  }
  entry.count++;
  ipCounts.set(ip, entry);

  const body = await req.json();
  const supabase = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
  );
  const { error } = await supabase.from('leads').insert(body);
  if (error) return new Response(error.message, { status: 400 });
  return new Response('ok');
});
```

2. В `src/features/leads/api.ts` — заменить прямой insert на `fetch('/functions/v1/submit-lead', ...)`.

### Важно
`in-memory` Map сбрасывается при рестарте функции. Для надёжного rate limit в production — использовать Upstash Redis (serverless KV).

## Связи
- [[Домен Лиды]] — `api.ts`, форма.
- [[Безопасность RLS и CSP]] — `service_role` нужен только внутри Edge Function.
- [[Supabase и база данных]] — Edge Functions.
