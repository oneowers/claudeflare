---
created: 2026-05-29
tags:
  - план
  - webstudio
  - админка
status: todo
сложность: 🔴 сложно
влияние: удобство работы
---

# 15 — Drag-and-drop сортировка в админке

← [[14 Экспорт лидов в CSV]] | [[План улучшений]] | следующий: [[16 Предпросмотр из формы]]

## Проблема

Поле `sort_order` есть в услугах и портфолио, но менять порядок можно только вручную — вводить число в форме. Нет визуального drag-and-drop в таблицах.

## Что сделать

1. Установить `@dnd-kit/core` + `@dnd-kit/sortable`:
   ```bash
   npm install @dnd-kit/core @dnd-kit/sortable @dnd-kit/utilities
   ```
2. Обернуть `ServicesTable` и `PortfolioTable` в `<DndContext>` + `<SortableContext>`.
3. Каждая строка таблицы — `useSortable(id)`.
4. При окончании перетаскивания (`onDragEnd`) — пересчитать `sort_order` для всех затронутых элементов и вызвать `supabase.from(...).upsert([...])` пачкой.
5. Оптимистичный апдейт: обновить кеш React Query до получения ответа от сервера.

### Иконка drag handle
Добавить `GripVertical` из lucide в начало каждой строки — визуальный сигнал, что строку можно тащить.

## Связи
- [[Домен Услуги]] — `ServicesTable` в `src/features/services/components/`.
- [[Домен Портфолио]] — `PortfolioTable` аналогично.
- [[Слой данных React Query]] — оптимистичный апдейт, invalidate после upsert.
- [[Supabase и база данных]] — `upsert` обновляет несколько строк за один запрос.
