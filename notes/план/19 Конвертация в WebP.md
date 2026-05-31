---
created: 2026-05-29
tags:
  - план
  - webstudio
  - производительность
  - storage
status: todo
сложность: 🟡 средне
влияние: скорость загрузки
---

# 19 — Конвертация изображений в WebP при загрузке

← [[18 Галерея изображений]] | [[План улучшений]] | следующий: [[20 og:image для деталей]]

## Проблема

Файлы грузятся «как есть» в Supabase Storage — JPEG/PNG без оптимизации. WebP на 30–70% легче при том же визуальном качестве.

## Что сделать

Конвертировать на клиенте через Canvas перед `upload`. Добавить утилиту `src/lib/imageUtils.ts`:

```ts
export async function toWebP(file: File, quality = 0.85): Promise<File> {
  // Пропустить если уже WebP
  if (file.type === 'image/webp') return file;
  
  const img = new Image();
  const url = URL.createObjectURL(file);
  await new Promise((res, rej) => {
    img.onload = res; img.onerror = rej; img.src = url;
  });
  URL.revokeObjectURL(url);

  const canvas = document.createElement('canvas');
  canvas.width = img.width;
  canvas.height = img.height;
  canvas.getContext('2d')!.drawImage(img, 0, 0);

  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => blob
        ? resolve(new File([blob], `${crypto.randomUUID()}.webp`, { type: 'image/webp' }))
        : reject(new Error('Canvas toBlob failed')),
      'image/webp',
      quality,
    );
  });
}
```

В `api.ts` каждого домена перед `upload`:
```ts
const optimized = await toWebP(file);
// затем загрузить optimized вместо file
```

### Ограничение
Safari до 14 не поддерживает WebP в Canvas. Современные браузеры — без проблем. Можно добавить проверку `canvas.toDataURL('image/webp').startsWith('data:image/webp')`.

## Связи
- [[Загрузка изображений]] — паттерн загрузки, в `api.ts` вызывается `uploadServiceImage`.
- [[Домен Услуги]], [[Домен Портфолио]] — оба используют загрузку файлов.
- [[22 Orphan image cleanup]] — пара: оптимизируем при загрузке + чистим старые файлы.
- [[21 Prefetch при hover]] — вместе дают ощущение мгновенного открытия страниц.
