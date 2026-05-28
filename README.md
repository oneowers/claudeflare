# План проекта: WebStudio — сайт студии веб-разработки

Сайт-витрина студии: продаёт пакеты услуг по разработке, показывает портфолио, собирает лиды через форму, имеет закрытую админку для управления контентом.

---

## 1. Стек (финальный)

|Слой|Технология|Зачем|
|---|---|---|
|Сборка|**Vite 5**|Мгновенный dev-сервер, ESM из коробки|
|Язык|**TypeScript**|Типы спасают на больших формах и API|
|UI-фреймворк|**React 18**|—|
|Стили|**Tailwind CSS**|Утилиты, без CSS-файлов|
|Компоненты|**shadcn/ui** (на Radix UI)|Копируешь в проект, владеешь кодом|
|Иконки|**lucide-react**|Идут в комплекте с shadcn|
|Роутинг|**React Router v6**|SPA-навигация|
|Формы|**React Hook Form** + **Zod**|Валидация на клиенте и сервере одинаковая|
|Серверный кэш|**TanStack Query (React Query) v5**|Кэш, инвалидация, оптимистик-апдейты|
|Загрузка файлов|**react-dropzone**|Drag & drop картинок|
|Анимации|**Motion (Framer Motion)**|Микро-интеракции|
|Backend-as-a-service|**Supabase**|Auth + Postgres + Storage + Realtime|
|Защита|**Cloudflare**|DDoS, WAF, Bot Fight Mode, кэш|
|Тесты|**Vitest** + **React Testing Library**|Юнит + компонентные|
|E2E (опционально)|**Playwright**|Критичные сценарии|
|Хостинг|**Cloudflare Pages** (или Vercel)|Бесплатный CI/CD из GitHub|

Все позиции имеют бесплатный тариф, достаточный для запуска.

---

## 2. Карта страниц

### Публичная часть

|Маршрут|Назначение|Ключевые блоки|
|---|---|---|
|`/`|Главная|Hero, превью услуг, лучшие кейсы, отзывы, CTA-форма|
|`/services`|Все услуги|Сетка карточек услуг из БД|
|`/services/:slug`|Детальная услуга|Описание, цена, что входит, FAQ, CTA|
|`/portfolio`|Портфолио|Сетка кейсов с фильтром по технологиям|
|`/portfolio/:slug`|Кейс|Галерея, задача, решение, ссылка на проект|
|`/about`|О студии|Команда, процесс, ценности|
|`/contact`|Контакты|Форма + контактные данные + карта|
|`/blog` (опц.)|Блог|Список статей|
|`/blog/:slug` (опц.)|Статья|MDX-контент|
|`*`|404|Ошибка|

### Админка (защищена через Supabase Auth + middleware)

|Маршрут|Назначение|
|---|---|
|`/admin/login`|Вход (email + magic link или password)|
|`/admin`|Дашборд: счётчики лидов, услуг, последние заявки|
|`/admin/services`|Список услуг (таблица с пагинацией, поиск)|
|`/admin/services/new`|Создать услугу|
|`/admin/services/:id/edit`|Редактировать услугу|
|`/admin/portfolio`|Список кейсов портфолио|
|`/admin/portfolio/new`|Новый кейс|
|`/admin/portfolio/:id/edit`|Редактировать кейс|
|`/admin/leads`|Заявки из формы контактов|
|`/admin/leads/:id`|Карточка лида (изменить статус, заметки)|

---

## 3. Структура проекта

```
webstudio/
├── .env.local                 # секреты, в .gitignore
├── .env.example               # шаблон без значений, коммитится
├── .gitignore
├── index.html
├── package.json
├── tailwind.config.ts
├── tsconfig.json
├── vite.config.ts
├── vitest.config.ts
├── public/
│   ├── favicon.svg
│   └── og-image.png
└── src/
    ├── main.tsx
    ├── App.tsx
    ├── router.tsx
    ├── styles/
    │   └── globals.css        # tailwind directives + CSS-переменные shadcn
    ├── lib/
    │   ├── supabase.ts        # инициализация клиента
    │   ├── queryClient.ts     # настройка React Query
    │   ├── utils.ts           # cn(), formatPrice(), slugify()
    │   └── env.ts             # типизированный парсер import.meta.env
    ├── components/
    │   ├── ui/                # компоненты shadcn (button, input, dialog, ...)
    │   ├── layout/
    │   │   ├── PublicLayout.tsx
    │   │   ├── AdminLayout.tsx
    │   │   ├── Header.tsx
    │   │   ├── Footer.tsx
    │   │   └── AdminSidebar.tsx
    │   └── shared/
    │       ├── ImageDropzone.tsx
    │       ├── DataTable.tsx
    │       └── ConfirmDialog.tsx
    ├── features/              # вертикальные срезы по доменам
    │   ├── auth/
    │   │   ├── hooks/
    │   │   │   ├── useSession.ts
    │   │   │   └── useSignIn.ts
    │   │   ├── components/
    │   │   │   └── ProtectedRoute.tsx
    │   │   └── api.ts
    │   ├── services/
    │   │   ├── api.ts         # вызовы Supabase
    │   │   ├── schemas.ts     # zod-схемы
    │   │   ├── types.ts
    │   │   ├── hooks/
    │   │   │   ├── useServices.ts
    │   │   │   ├── useService.ts
    │   │   │   ├── useCreateService.ts
    │   │   │   ├── useUpdateService.ts
    │   │   │   └── useDeleteService.ts
    │   │   └── components/
    │   │       ├── ServiceCard.tsx
    │   │       ├── ServiceForm.tsx
    │   │       └── ServicesTable.tsx
    │   ├── portfolio/         # та же структура
    │   └── leads/             # та же структура
    ├── pages/
    │   ├── public/
    │   │   ├── HomePage.tsx
    │   │   ├── ServicesPage.tsx
    │   │   ├── ServiceDetailPage.tsx
    │   │   ├── PortfolioPage.tsx
    │   │   ├── PortfolioDetailPage.tsx
    │   │   ├── AboutPage.tsx
    │   │   ├── ContactPage.tsx
    │   │   └── NotFoundPage.tsx
    │   └── admin/
    │       ├── LoginPage.tsx
    │       ├── DashboardPage.tsx
    │       ├── ServicesListPage.tsx
    │       ├── ServiceFormPage.tsx
    │       ├── PortfolioListPage.tsx
    │       ├── PortfolioFormPage.tsx
    │       └── LeadsPage.tsx
    └── tests/
        ├── setup.ts
        └── utils/
            └── renderWithProviders.tsx
```

**Принцип:** `features/` — бизнес-логика по доменам, `pages/` — только компоновка готовых блоков. Это позволяет переиспользовать `ServiceCard` и на главной, и в админке.

---

## 4. Схема БД (Supabase / Postgres)

### 4.1 Таблицы

```sql
-- Профили (расширение auth.users для роли)
create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  role text not null default 'user' check (role in ('user', 'admin')),
  full_name text,
  created_at timestamptz not null default now()
);

-- Услуги (то, что вы продаёте)
create table public.services (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  short_description text not null,
  description text,
  price_from numeric(10, 2) not null,
  currency text not null default 'USD',
  features jsonb not null default '[]'::jsonb,  -- ["Дизайн", "Адаптив", ...]
  image_url text,
  is_published boolean not null default false,
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Портфолио
create table public.portfolio (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  client text,
  description text,
  image_url text,
  project_url text,
  technologies text[] not null default '{}',
  is_published boolean not null default false,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

-- Лиды (заявки из формы)
create table public.leads (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text,
  message text not null,
  service_id uuid references public.services(id) on delete set null,
  status text not null default 'new' check (status in ('new', 'in_progress', 'closed', 'spam')),
  notes text,
  created_at timestamptz not null default now()
);

-- Триггер обновления updated_at
create or replace function public.touch_updated_at()
returns trigger language plpgsql as $$
begin new.updated_at = now(); return new; end;
$$;

create trigger services_touch
  before update on public.services
  for each row execute function public.touch_updated_at();

-- Индексы
create index leads_status_idx on public.leads(status, created_at desc);
create index services_published_idx on public.services(is_published, sort_order);
```

### 4.2 Хелпер для проверки роли

```sql
create or replace function public.is_admin()
returns boolean language sql security definer set search_path = public as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid() and role = 'admin'
  );
$$;
```

### 4.3 RLS-политики

```sql
-- Включаем RLS на всех таблицах
alter table public.profiles enable row level security;
alter table public.services enable row level security;
alter table public.portfolio enable row level security;
alter table public.leads enable row level security;

-- profiles: каждый видит свой профиль, админ видит все
create policy "profiles_select_own" on public.profiles
  for select using (auth.uid() = id or public.is_admin());

-- services: публичные видят только опубликованные, админ — всё
create policy "services_select_public" on public.services
  for select using (is_published = true or public.is_admin());

create policy "services_admin_write" on public.services
  for all using (public.is_admin()) with check (public.is_admin());

-- portfolio: то же самое
create policy "portfolio_select_public" on public.portfolio
  for select using (is_published = true or public.is_admin());

create policy "portfolio_admin_write" on public.portfolio
  for all using (public.is_admin()) with check (public.is_admin());

-- leads: любой может создать (INSERT), читать/менять только админ
create policy "leads_anon_insert" on public.leads
  for insert with check (true);

create policy "leads_admin_select" on public.leads
  for select using (public.is_admin());

create policy "leads_admin_update" on public.leads
  for update using (public.is_admin()) with check (public.is_admin());

create policy "leads_admin_delete" on public.leads
  for delete using (public.is_admin());
```

### 4.4 Storage-бакеты

В Supabase Dashboard → Storage создать два бакета:

- `service-images` — публичный read
- `portfolio-images` — публичный read

Политики для каждого:

```sql
-- Читать может любой (анонимный включительно)
create policy "service_images_public_read" on storage.objects
  for select using (bucket_id = 'service-images');

-- Загружать/менять/удалять — только админ
create policy "service_images_admin_write" on storage.objects
  for insert with check (bucket_id = 'service-images' and public.is_admin());

create policy "service_images_admin_update" on storage.objects
  for update using (bucket_id = 'service-images' and public.is_admin());

create policy "service_images_admin_delete" on storage.objects
  for delete using (bucket_id = 'service-images' and public.is_admin());
```

(Аналогично для `portfolio-images`.)

---

## 5. CRUD-воркфлоу: создание услуги от формы до экрана

### 5.1 Zod-схема (`features/services/schemas.ts`)

```ts
import { z } from 'zod';

export const serviceSchema = z.object({
  name: z.string().min(3, 'Минимум 3 символа').max(120),
  slug: z.string().regex(/^[a-z0-9-]+$/, 'Только латиница, цифры и дефис'),
  short_description: z.string().min(10).max(280),
  description: z.string().optional(),
  price_from: z.coerce.number().positive('Цена должна быть > 0'),
  currency: z.enum(['USD', 'EUR', 'UZS', 'RUB']).default('USD'),
  features: z.array(z.string().min(1)).default([]),
  is_published: z.boolean().default(false),
  image: z.instanceof(File).optional(),     // на форме
  image_url: z.string().url().optional(),   // в БД
});

export type ServiceFormValues = z.infer<typeof serviceSchema>;
```

### 5.2 API-слой (`features/services/api.ts`)

```ts
import { supabase } from '@/lib/supabase';
import type { ServiceFormValues } from './schemas';

export async function listServices({ publishedOnly = false } = {}) {
  let q = supabase.from('services').select('*').order('sort_order');
  if (publishedOnly) q = q.eq('is_published', true);
  const { data, error } = await q;
  if (error) throw error;
  return data;
}

export async function getServiceBySlug(slug: string) {
  const { data, error } = await supabase
    .from('services').select('*').eq('slug', slug).single();
  if (error) throw error;
  return data;
}

async function uploadImage(file: File): Promise<string> {
  const ext = file.name.split('.').pop();
  const path = `${crypto.randomUUID()}.${ext}`;
  const { error } = await supabase.storage
    .from('service-images')
    .upload(path, file, { cacheControl: '31536000', upsert: false });
  if (error) throw error;
  const { data } = supabase.storage.from('service-images').getPublicUrl(path);
  return data.publicUrl;
}

export async function createService(values: ServiceFormValues) {
  const { image, ...rest } = values;
  const image_url = image ? await uploadImage(image) : undefined;
  const { data, error } = await supabase
    .from('services')
    .insert({ ...rest, image_url })
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function updateService(id: string, values: Partial<ServiceFormValues>) {
  const { image, ...rest } = values;
  const patch: Record<string, unknown> = { ...rest };
  if (image) patch.image_url = await uploadImage(image);
  const { data, error } = await supabase
    .from('services').update(patch).eq('id', id).select().single();
  if (error) throw error;
  return data;
}

export async function deleteService(id: string) {
  const { error } = await supabase.from('services').delete().eq('id', id);
  if (error) throw error;
}
```

### 5.3 React Query-хуки (`features/services/hooks/`)

```ts
// useServices.ts
import { useQuery } from '@tanstack/react-query';
import { listServices } from '../api';

export const servicesKeys = {
  all: ['services'] as const,
  list: (filters?: { publishedOnly?: boolean }) =>
    [...servicesKeys.all, 'list', filters] as const,
  detail: (id: string) => [...servicesKeys.all, 'detail', id] as const,
};

export function useServices(publishedOnly = false) {
  return useQuery({
    queryKey: servicesKeys.list({ publishedOnly }),
    queryFn: () => listServices({ publishedOnly }),
    staleTime: 60_000,
  });
}
```

```ts
// useCreateService.ts
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { createService } from '../api';
import { servicesKeys } from './useServices';
import type { ServiceFormValues } from '../schemas';

export function useCreateService() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (values: ServiceFormValues) => createService(values),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: servicesKeys.all });
      toast.success('Услуга создана');
    },
    onError: (e: Error) => toast.error(e.message),
  });
}
```

### 5.4 Форма (`features/services/components/ServiceForm.tsx`)

```tsx
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { serviceSchema, type ServiceFormValues } from '../schemas';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { ImageDropzone } from '@/components/shared/ImageDropzone';
import { useCreateService } from '../hooks/useCreateService';

export function ServiceForm() {
  const { mutate, isPending } = useCreateService();
  const form = useForm<ServiceFormValues>({
    resolver: zodResolver(serviceSchema),
    defaultValues: { currency: 'USD', is_published: false, features: [] },
  });

  return (
    <form
      onSubmit={form.handleSubmit((v) => mutate(v))}
      className="space-y-6 max-w-2xl"
    >
      <Input {...form.register('name')} placeholder="Название" />
      <Input {...form.register('slug')} placeholder="slug-na-latinitse" />
      <Textarea {...form.register('short_description')} placeholder="Короткое описание" />
      <Input type="number" step="0.01" {...form.register('price_from')} placeholder="Цена от" />

      <ImageDropzone
        onFile={(file) => form.setValue('image', file, { shouldValidate: true })}
      />

      <div className="flex items-center gap-3">
        <Switch
          checked={form.watch('is_published')}
          onCheckedChange={(v) => form.setValue('is_published', v)}
        />
        <span>Опубликовать</span>
      </div>

      <Button type="submit" disabled={isPending}>
        {isPending ? 'Сохраняем…' : 'Создать услугу'}
      </Button>
    </form>
  );
}
```

### 5.5 Dropzone-компонент (`components/shared/ImageDropzone.tsx`)

```tsx
import { useDropzone } from 'react-dropzone';
import { useState } from 'react';
import { UploadCloud } from 'lucide-react';

const MAX_SIZE = 5 * 1024 * 1024; // 5 МБ

export function ImageDropzone({ onFile }: { onFile: (file: File) => void }) {
  const [preview, setPreview] = useState<string | null>(null);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { 'image/png': ['.png'], 'image/jpeg': ['.jpg', '.jpeg'], 'image/webp': ['.webp'] },
    maxSize: MAX_SIZE,
    multiple: false,
    onDrop: (files) => {
      const f = files[0];
      if (!f) return;
      setPreview(URL.createObjectURL(f));
      onFile(f);
    },
  });

  return (
    <div
      {...getRootProps()}
      className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition
        ${isDragActive ? 'border-primary bg-primary/5' : 'border-muted-foreground/30'}`}
    >
      <input {...getInputProps()} />
      {preview ? (
        <img src={preview} alt="" className="mx-auto max-h-48 rounded" />
      ) : (
        <div className="flex flex-col items-center gap-2 text-muted-foreground">
          <UploadCloud className="w-8 h-8" />
          <p>Перетащите картинку сюда или кликните</p>
          <p className="text-xs">PNG / JPG / WEBP, до 5 МБ</p>
        </div>
      )}
    </div>
  );
}
```

### 5.6 Алгоритм работы при создании (последовательность)

1. Пользователь заполняет форму, бросает картинку в Dropzone — `react-hook-form` хранит значение.
2. Клик «Создать» → `handleSubmit` запускает `zodResolver`, который валидирует объект против `serviceSchema`. Если ошибки — поля подсвечиваются.
3. Если валидация прошла — вызывается `mutate(values)` из `useCreateService`.
4. Внутри `createService`: сначала `uploadImage(file)` отправляет файл в бакет `service-images`, получает публичный URL.
5. Запись в `services` через `supabase.from('services').insert({...})`. RLS проверяет `is_admin()` — если не админ, INSERT упадёт.
6. `onSuccess` мутации вызывает `qc.invalidateQueries({ queryKey: servicesKeys.all })` → React Query помечает кэш списка как устаревший и автоматически перезапрашивает.
7. Компонент списка перерендеривается, новая услуга появляется без перезагрузки страницы.
8. `toast.success` показывает уведомление.

---

## 6. Аутентификация и защищённые маршруты

### 6.1 Клиент Supabase (`lib/supabase.ts`)

```ts
import { createClient } from '@supabase/supabase-js';
import { env } from './env';

export const supabase = createClient(
  env.VITE_SUPABASE_URL,
  env.VITE_SUPABASE_ANON_KEY,
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
    },
  }
);
```

### 6.2 Хук сессии (`features/auth/hooks/useSession.ts`)

```ts
import { useEffect, useState } from 'react';
import type { Session } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase';

export function useSession() {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setLoading(false);
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => setSession(s));
    return () => sub.subscription.unsubscribe();
  }, []);

  return { session, loading };
}
```

### 6.3 ProtectedRoute

```tsx
import { Navigate, Outlet } from 'react-router-dom';
import { useSession } from '../hooks/useSession';

export function ProtectedRoute() {
  const { session, loading } = useSession();
  if (loading) return <div className="p-8">Загрузка…</div>;
  if (!session) return <Navigate to="/admin/login" replace />;
  return <Outlet />;
}
```

В роутере:

```tsx
<Route element={<ProtectedRoute />}>
  <Route path="/admin" element={<AdminLayout />}>
    <Route index element={<DashboardPage />} />
    <Route path="services" element={<ServicesListPage />} />
    ...
  </Route>
</Route>
```

**Важно:** клиентский ProtectedRoute — это UX, а не безопасность. Реальную защиту даёт RLS на стороне БД. Если кто-то откроет `/admin` через DevTools, он не сможет получить или изменить данные — Supabase вернёт пустой массив или ошибку.

---

## 7. Безопасность — чек-лист

### Supabase

- [ ] RLS включён на **всех** таблицах (`alter table … enable row level security`). Проверить: Dashboard → Database → Tables → колонка RLS.
- [ ] Политики покрывают SELECT, INSERT, UPDATE, DELETE по отдельности.
- [ ] Используется только `anon` ключ на клиенте. **Никогда не выкладывать `service_role` ключ во фронтенд.**
- [ ] В Storage-бакетах настроено: read всем, write только админу.
- [ ] В Supabase Dashboard → Authentication → URL Configuration указаны точные redirect-URL (production + localhost).
- [ ] Включена защита от утечки паролей (Auth → Policies).

### Переменные окружения

- [ ] `.env.local` в `.gitignore` (по умолчанию уже включён в шаблоне Vite — **проверить вручную**).
- [ ] `.env.example` без значений закоммичен — чтобы команда знала, какие переменные нужны.
- [ ] Только переменные с префиксом `VITE_` попадают на клиент. Бэкенд-секреты — никогда.
- [ ] При деплое — секреты задаются в дашборде хостинга (Cloudflare Pages → Settings → Environment Variables).

`.env.example`:

```
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

### HTTPS и заголовки

- [ ] Сайт работает строго по HTTPS (Cloudflare даёт бесплатный SSL и редирект 80→443).
- [ ] Включён HSTS (Cloudflare → SSL/TLS → Edge Certificates → HSTS, max-age минимум 6 месяцев).
- [ ] Настроен CSP. Пример заголовка через `_headers` файл Cloudflare Pages:

```
/*
  Content-Security-Policy: default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https://*.supabase.co; connect-src 'self' https://*.supabase.co wss://*.supabase.co; font-src 'self' data:; frame-ancestors 'none'; base-uri 'self'; form-action 'self'
  X-Frame-Options: DENY
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: geolocation=(), microphone=(), camera=()
```

### Cloudflare (внешний периметр)

- [ ] Домен заведён в Cloudflare, оранжевое облако включено (трафик идёт через прокси).
- [ ] **Bot Fight Mode** → ON (бесплатно, режет ботов).
- [ ] **WAF Managed Rules** → ON (на платном тарифе; на бесплатном — Free Managed Ruleset).
- [ ] **Rate Limiting** на `/api/*` и форму контактов (бесплатный тариф даёт 1 правило: 10 req/min на IP для `/contact`).
- [ ] **Always Use HTTPS** → ON.
- [ ] **Min TLS Version** → 1.2 или 1.3.

### Защита от спама в форме

- [ ] **Cloudflare Turnstile** (бесплатная альтернатива reCAPTCHA) на форме контактов.
- [ ] Honeypot-поле в форме (скрытый input — если заполнен, лид помечается `status='spam'`).
- [ ] Проверка длины и формата email/телефона на клиенте (Zod) и на сервере (CHECK-констрейнты или Edge Function).

### Зависимости

- [ ] `npm audit` запускается в CI на каждый PR.
- [ ] Dependabot или Renovate настроен в GitHub — автоматические PR на обновления.
- [ ] Опционально: **Snyk** (бесплатный тариф для open source / небольших команд).

### Прочее

- [ ] В `tsconfig.json`: `"strict": true`.
- [ ] ESLint + `eslint-plugin-security` + `@typescript-eslint/no-explicit-any`.
- [ ] Никогда не вставлять пользовательский HTML через `dangerouslySetInnerHTML`. Если нужен rich-text — `DOMPurify`.

---

## 8. Тестирование

### 8.1 Установка

```bash
npm i -D vitest @vitest/ui jsdom @testing-library/react @testing-library/jest-dom @testing-library/user-event
```

### 8.2 `vitest.config.ts`

```ts
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: { alias: { '@': path.resolve(__dirname, './src') } },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/tests/setup.ts'],
    css: true,
  },
});
```

### 8.3 `src/tests/setup.ts`

```ts
import '@testing-library/jest-dom/vitest';
import { cleanup } from '@testing-library/react';
import { afterEach } from 'vitest';

afterEach(() => cleanup());
```

### 8.4 Хелпер для рендера с провайдерами

```tsx
// src/tests/utils/renderWithProviders.tsx
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import type { ReactElement } from 'react';

export function renderWithProviders(ui: ReactElement, route = '/') {
  const qc = new QueryClient({ defaultOptions: { queries: { retry: false } } });
  return render(
    <QueryClientProvider client={qc}>
      <MemoryRouter initialEntries={[route]}>{ui}</MemoryRouter>
    </QueryClientProvider>
  );
}
```

### 8.5 Что и как тестировать

**Юнит — утилиты и Zod-схемы:**

```ts
// services.schema.test.ts
import { describe, it, expect } from 'vitest';
import { serviceSchema } from '@/features/services/schemas';

describe('serviceSchema', () => {
  it('требует имя минимум 3 символа', () => {
    const r = serviceSchema.safeParse({ name: 'ab', slug: 'ok', short_description: 'aaaaaaaaaa', price_from: 100 });
    expect(r.success).toBe(false);
  });
  it('не пропускает кириллицу в slug', () => {
    const r = serviceSchema.safeParse({ name: 'Сайт', slug: 'сайт', short_description: 'aaaaaaaaaa', price_from: 100 });
    expect(r.success).toBe(false);
  });
});
```

**Компонентные — формы и UI:**

```tsx
// ServiceForm.test.tsx
import { describe, it, expect, vi } from 'vitest';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from '@/tests/utils/renderWithProviders';
import { ServiceForm } from '@/features/services/components/ServiceForm';

vi.mock('@/features/services/api', () => ({
  createService: vi.fn().mockResolvedValue({ id: '1' }),
}));

describe('ServiceForm', () => {
  it('показывает ошибки валидации при пустом сабмите', async () => {
    renderWithProviders(<ServiceForm />);
    await userEvent.click(screen.getByRole('button', { name: /создать/i }));
    expect(await screen.findByText(/минимум 3 символа/i)).toBeInTheDocument();
  });
});
```

**Что мокать:** все вызовы Supabase (через `vi.mock('@/features/services/api', ...)`). Тестировать поведение UI, а не реальную БД.

**Что покрыть в первую очередь:**

1. Zod-схемы (быстро, ловят регрессии).
2. Хуки React Query (правильно ли инвалидируется кэш).
3. Критические формы (контакты, создание услуги).
4. Логика `ProtectedRoute` (редирект, если нет сессии).

**E2E (Playwright) — опционально, для самого критичного:**

- Гость отправляет заявку → лид появляется в админке.
- Админ логинится → создаёт услугу → она видна на публичной странице.

### 8.6 Команды

```json
// package.json scripts
{
  "test": "vitest",
  "test:ui": "vitest --ui",
  "test:run": "vitest run",
  "test:coverage": "vitest run --coverage"
}
```

---

## 9. Деплой

1. Создать проект в Supabase, выполнить SQL из раздела 4 в SQL Editor.
2. Создать админский аккаунт через Supabase Auth, в таблице `profiles` вручную поставить `role = 'admin'`.
3. Залить код на GitHub.
4. Cloudflare Pages → Connect to Git → выбрать репозиторий.
    - Build command: `npm run build`
    - Output directory: `dist`
    - Environment variables: `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`.
5. Подключить кастомный домен через Cloudflare DNS.
6. Включить настройки безопасности из раздела 7.
7. Добавить файл `public/_headers` с CSP.
8. Прогнать `npm audit` и Lighthouse.

---

## 10. Дорожная карта по фазам

|Неделя|Что делаем|
|---|---|
|**1. Каркас**|Vite + TS + Tailwind + shadcn (init), роутер, layouts, Supabase-клиент, dev-сидинг БД|
|**2. Публичная часть**|HomePage с hero и блоком услуг (читает из Supabase), ServicesPage, ServiceDetailPage, дизайн-система|
|**3. Портфолио и контакты**|PortfolioPage, PortfolioDetailPage, ContactPage с формой и Turnstile, сохранение лидов|
|**4. Админка: auth + услуги**|LoginPage, ProtectedRoute, AdminLayout, ServicesListPage с таблицей, ServiceFormPage с Dropzone|
|**5. Админка: остальное**|Portfolio CRUD, LeadsPage с фильтром по статусу, DashboardPage с метриками|
|**6. Тесты и полировка**|Vitest-покрытие критических кусков, SEO (meta-теги, sitemap.xml, robots.txt), Lighthouse|
|**7. Деплой и защита**|Cloudflare Pages, домен, CSP-заголовки, WAF, Rate Limiting, мониторинг через Sentry (free tier)|

---

## 11. Что не вошло, но стоит обдумать позже

- **i18n** (`react-i18next`) — если планируете несколько языков.
- **Edge Functions** для отправки email при новом лиде (Resend бесплатно даёт 3000 писем/мес).
- **Sentry** для мониторинга ошибок на проде.
- **Plausible / Umami** для приватной аналитики (без cookie-баннера).
- **MDX** для блога, если делаете блог.
- **Sitemap и OG-картинки** генерируются на билде через скрипт.

---

Этот план полностью покрывает всё, что вы перечислили в вопросе — стек, CRUD-воркфлоу с картинками и React Query, безопасность Supabase + Cloudflare, тестирование Vitest + RTL — и добавляет конкретные SQL для RLS, готовый код хуков и формы, и пофазовую дорожную карту.