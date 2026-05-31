---
created: 2026-05-29
tags:
  - architecture
  - webstudio
  - patterns
---

# Паттерн feature-slice

Организация кода в [[Архитектура WebStudio|WebStudio]]. Эталонный домен — `src/features/services/` (использовать как образец).

## Структура домена
```
src/features/{domain}/
├── api.ts          ← ТОЛЬКО здесь вызовы Supabase
├── schemas.ts      ← Zod-схемы (единый источник для форм И БД)
├── types.ts        ← TS-типы (выводятся из схем через z.infer)
├── queryKeys.ts    ← константные query keys
├── hooks/
│   ├── useList*.ts     ← useQuery для списков
│   ├── useGet*.ts      ← useQuery для одной записи
│   ├── useCreate*.ts   ← useMutation → invalidate
│   ├── useUpdate*.ts   ← useMutation → invalidate
│   ├── useDelete*.ts   ← useMutation → invalidate
│   └── useToggle*.ts   ← useMutation (оптимистично)
└── components/
    ├── *Table.tsx       ← таблица для админки
    ├── *Form.tsx        ← форма (RHF + zodResolver)
    ├── *Card.tsx        ← карточка для публичной части
    └── ...
```

## Правила слоёв
1. `pages/` — только компоновка компонентов и хуков, ноль бизнес-логики.
2. `components/` — используют хуки, но не вызывают `api.ts` напрямую.
3. `hooks/` — мост между компонентами и `api.ts`, обёртки `useQuery`/`useMutation`.
4. `api.ts` — единственное место `supabase.from(...)`. Всегда `async`, бросает ошибку через `if (error) throw error`.

## Формы
- Всегда `useForm({ resolver: zodResolver(schema) })`.
- `form.handleSubmit((v) => mutate(v))` — без `try/catch` в компоненте.
- Ошибки мутаций — `toast.error` в `onError` хука. Успех → `qc.invalidateQueries`.

## Тесты
- Мокать `api.ts`, не `supabase` напрямую.
- `renderWithProviders` из `src/tests/utils/`.
- Приоритет покрытия: Zod-схемы → хуки → критичные формы.

## Применённые домены
[[Домен Услуги]] · [[Домен Портфолио]] · [[Домен Лиды]] · [[Домен Авторизация]]
