import { describe, it, expect } from 'vitest';
import { portfolioSchema } from './schemas';

const base = {
  title: { ru: 'Магазин косметики', en: 'Cosmetics shop', uz: 'Kosmetika do‘koni' },
  description: { ru: '', en: '', uz: '' },
  slug: 'cosmetics-shop',
  client: '',
  project_url: '',
  technologies: ['React', 'Postgres'],
  is_published: true,
  sort_order: 0,
};

describe('portfolioSchema', () => {
  it('принимает минимальный валидный объект', () => {
    expect(portfolioSchema.safeParse(base).success).toBe(true);
  });

  it('требует RU-заголовок минимум 3 символа', () => {
    expect(
      portfolioSchema.safeParse({
        ...base,
        title: { ...base.title, ru: 'ab' },
      }).success,
    ).toBe(false);
  });

  it('пустые EN/UZ допустимы', () => {
    expect(
      portfolioSchema.safeParse({
        ...base,
        title: { ru: 'Только русский', en: '', uz: '' },
      }).success,
    ).toBe(true);
  });

  it('требует slug в латинице', () => {
    expect(
      portfolioSchema.safeParse({ ...base, slug: 'кейс' }).success,
    ).toBe(false);
  });

  it('пустая ссылка на проект — это нормально', () => {
    expect(
      portfolioSchema.safeParse({ ...base, project_url: '' }).success,
    ).toBe(true);
  });

  it('невалидная ссылка отклоняется', () => {
    expect(
      portfolioSchema.safeParse({ ...base, project_url: 'not-a-url' }).success,
    ).toBe(false);
  });

  it('принимает валидную ссылку', () => {
    expect(
      portfolioSchema.safeParse({ ...base, project_url: 'https://example.com' })
        .success,
    ).toBe(true);
  });
});
