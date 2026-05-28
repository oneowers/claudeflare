import { describe, it, expect } from 'vitest';
import { serviceSchema } from './schemas';

const base = {
  name: { ru: 'Корпоративный сайт', en: 'Corporate website', uz: 'Korporativ sayt' },
  slug: 'corp-site',
  short_description: {
    ru: 'Сайт с CMS и страницами услуг',
    en: 'Site with CMS and service pages',
    uz: 'CMS va xizmat sahifalari bilan sayt',
  },
  description: { ru: '', en: '', uz: '' },
  price_from: 2000,
  currency: 'USD' as const,
  features: { ru: ['Дизайн', 'Адаптив'], en: [], uz: [] },
  is_published: true,
  sort_order: 0,
};

describe('serviceSchema', () => {
  it('принимает валидный объект', () => {
    expect(serviceSchema.safeParse(base).success).toBe(true);
  });

  it('требует RU-имя минимум 3 символа', () => {
    const r = serviceSchema.safeParse({
      ...base,
      name: { ...base.name, ru: 'ab' },
    });
    expect(r.success).toBe(false);
  });

  it('пустое RU-имя — ошибка', () => {
    const r = serviceSchema.safeParse({
      ...base,
      name: { ...base.name, ru: '' },
    });
    expect(r.success).toBe(false);
  });

  it('пустые EN и UZ допустимы (RU как fallback)', () => {
    const r = serviceSchema.safeParse({
      ...base,
      name: { ru: 'Только русский', en: '', uz: '' },
    });
    expect(r.success).toBe(true);
  });

  it('не пропускает кириллицу в slug', () => {
    const r = serviceSchema.safeParse({ ...base, slug: 'сайт' });
    expect(r.success).toBe(false);
  });

  it('не пропускает пробелы в slug', () => {
    const r = serviceSchema.safeParse({ ...base, slug: 'foo bar' });
    expect(r.success).toBe(false);
  });

  it('требует price_from > 0', () => {
    expect(serviceSchema.safeParse({ ...base, price_from: 0 }).success).toBe(false);
    expect(serviceSchema.safeParse({ ...base, price_from: -1 }).success).toBe(false);
  });

  it('преобразует price_from из строки', () => {
    const r = serviceSchema.safeParse({ ...base, price_from: '1500' });
    expect(r.success).toBe(true);
    if (r.success) expect(r.data.price_from).toBe(1500);
  });

  it('отклоняет неизвестную валюту', () => {
    const r = serviceSchema.safeParse({ ...base, currency: 'XXX' });
    expect(r.success).toBe(false);
  });

  it('короткое RU short_description не проходит', () => {
    const r = serviceSchema.safeParse({
      ...base,
      short_description: { ...base.short_description, ru: 'мало' },
    });
    expect(r.success).toBe(false);
  });
});
