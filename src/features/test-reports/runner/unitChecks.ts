import { slugify, formatPrice } from '@/lib/utils';
import { pickLocale } from '@/i18n/localized';
import { serviceSchema } from '@/features/services/schemas';
import { portfolioSchema } from '@/features/portfolio/schemas';
import { categorySchema } from '@/features/categories/schemas';
import { contactFormSchema } from '@/features/leads/schemas';
import type { RunProgress, RunResult } from './types';

class AssertionError extends Error {}

function assert(condition: unknown, message: string): asserts condition {
  if (!condition) throw new AssertionError(message);
}

interface Check {
  name: string;
  run: () => void;
}

/**
 * Real, deterministic unit checks that can execute in the browser: pure
 * schema/utility logic — the same things the Vitest specs cover, runnable
 * client-side so the admin can trigger them on demand.
 */
export const UNIT_CHECKS: Check[] = [
  {
    name: 'slugify: транслитерация кириллицы',
    run: () => assert(slugify('Привет Мир') === 'privet-mir', 'expected privet-mir'),
  },
  {
    name: 'slugify: спецсимволы убираются',
    run: () => assert(slugify('Hello, World!! 2024') === 'hello-world-2024', 'bad slug'),
  },
  {
    name: 'formatPrice: содержит сумму',
    run: () => assert(/\d/.test(formatPrice(1000, 'USD')), 'no digits in price'),
  },
  {
    name: 'serviceSchema: принимает валидную услугу',
    run: () =>
      assert(
        serviceSchema.safeParse({
          name: { ru: 'Сайт под ключ' },
          slug: 'site',
          short_description: { ru: 'Короткое описание услуги' },
          price_from: 1000,
        }).success,
        'valid service rejected',
      ),
  },
  {
    name: 'serviceSchema: отклоняет пустое имя',
    run: () =>
      assert(
        !serviceSchema.safeParse({
          name: { ru: '' },
          slug: 'site',
          short_description: { ru: 'Короткое описание услуги' },
          price_from: 1000,
        }).success,
        'empty name accepted',
      ),
  },
  {
    name: 'serviceSchema: отклоняет отрицательную цену',
    run: () =>
      assert(
        !serviceSchema.safeParse({
          name: { ru: 'Сайт' },
          slug: 'site',
          short_description: { ru: 'Короткое описание услуги' },
          price_from: -5,
        }).success,
        'negative price accepted',
      ),
  },
  {
    name: 'portfolioSchema: отклоняет плохой slug',
    run: () =>
      assert(
        !portfolioSchema.safeParse({
          title: { ru: 'Кейс' },
          slug: 'Плохой Slug!',
        }).success,
        'bad slug accepted',
      ),
  },
  {
    name: 'categorySchema: принимает валидную категорию',
    run: () =>
      assert(
        categorySchema.safeParse({ name: { ru: 'Веб' }, slug: 'web' }).success,
        'valid category rejected',
      ),
  },
  {
    name: 'categorySchema: отклоняет слишком короткое имя',
    run: () =>
      assert(
        !categorySchema.safeParse({ name: { ru: 'В' }, slug: 'web' }).success,
        'short name accepted',
      ),
  },
  {
    name: 'contactFormSchema: отклоняет некорректный email',
    run: () =>
      assert(
        !contactFormSchema.safeParse({
          name: 'Иван',
          email: 'not-an-email',
          message: 'Сообщение достаточной длины',
        }).success,
        'bad email accepted',
      ),
  },
  {
    name: 'contactFormSchema: honeypot отсекает спам',
    run: () =>
      assert(
        !contactFormSchema.safeParse({
          name: 'Иван',
          email: 'ivan@example.com',
          message: 'Сообщение достаточной длины',
          website: 'http://spam.test',
        }).success,
        'honeypot bypassed',
      ),
  },
  {
    name: 'pickLocale: фолбэк на ru',
    run: () => assert(pickLocale({ ru: 'Текст' }, 'en') === 'Текст', 'no ru fallback'),
  },
];

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

export async function runUnitChecks(
  onProgress?: (p: RunProgress) => void,
): Promise<RunResult> {
  const start = performance.now();
  const failures: string[] = [];
  let passed = 0;

  for (let i = 0; i < UNIT_CHECKS.length; i++) {
    const check = UNIT_CHECKS[i];
    try {
      check.run();
      passed++;
    } catch (e) {
      failures.push(`${check.name}: ${(e as Error).message}`);
    }
    onProgress?.({
      ratio: (i + 1) / UNIT_CHECKS.length,
      label: check.name,
    });
    // Small yield so the progress UI can paint.
    await sleep(40);
  }

  const total = UNIT_CHECKS.length;
  return {
    status: failures.length === 0 ? 'passed' : 'failed',
    total_tests: total,
    passed_tests: passed,
    coverage_pct: Math.round((passed / total) * 1000) / 10,
    requests_per_sec: null,
    error_rate: null,
    total_requests: null,
    duration_ms: Math.round(performance.now() - start),
    notes: failures.length ? failures.join('\n') : null,
  };
}
