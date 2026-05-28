import { z } from 'zod';

const envSchema = z.object({
  VITE_SUPABASE_URL: z.string().url('VITE_SUPABASE_URL должен быть URL'),
  VITE_SUPABASE_ANON_KEY: z.string().min(1, 'VITE_SUPABASE_ANON_KEY обязателен'),
  // Optional: email passed to MyMemory to raise the free daily quota.
  // Not a secret — safe on the client.
  VITE_MYMEMORY_EMAIL: z
    .string()
    .email()
    .optional()
    .or(z.literal('')),
});

const parsed = envSchema.safeParse(import.meta.env);

if (!parsed.success) {
  console.error(
    'Некорректные переменные окружения:',
    parsed.error.flatten().fieldErrors,
  );
  throw new Error(
    'Заполните VITE_SUPABASE_URL и VITE_SUPABASE_ANON_KEY в .env.local',
  );
}

export const env = parsed.data;
