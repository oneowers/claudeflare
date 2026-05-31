---
created: 2026-05-29
tags:
  - план
  - webstudio
  - админка
status: todo
сложность: 🟡 средне
влияние: удобство работы
---

# 14 — Экспорт лидов в CSV

← [[13 Email при новом лиде]] | [[План улучшений]] | следующий: [[15 Drag-and-drop сортировка]]

## Проблема

В `LeadsPage` нет экспорта. Чтобы передать список заявок в CRM или Excel — нужно вручную копировать данные из таблицы.

## Что сделать

Без новых зависимостей — генерировать CSV вручную через Blob:

```ts
function exportLeadsToCSV(leads: Lead[]) {
  const headers = ['Имя', 'Email', 'Телефон', 'Сообщение', 'Статус', 'Дата'];
  const rows = leads.map(l => [
    l.name, l.email, l.phone ?? '', l.message,
    l.status, new Date(l.created_at).toLocaleDateString('ru'),
  ]);
  const csv = [headers, ...rows]
    .map(r => r.map(v => `"${String(v).replace(/"/g, '""')}"`).join(','))
    .join('\n');
  const blob = new Blob(['﻿' + csv], { type: 'text/csv;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = 'leads.csv'; a.click();
  URL.revokeObjectURL(url);
}
```

`﻿` (BOM) — нужен, чтобы Excel правильно открывал UTF-8.

Добавить кнопку «Скачать CSV» в `LeadsPage` рядом с фильтром статуса. Экспортировать **текущий отфильтрованный** список (что видит пользователь).

## Связи
- [[Домен Лиды]] — `LeadsPage`, `LeadsTable`.
- [[Слой данных React Query]] — данные берутся из `useLeads(status)`.
