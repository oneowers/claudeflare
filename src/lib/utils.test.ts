import { describe, it, expect } from 'vitest';
import { cn, formatPrice, slugify } from './utils';

describe('cn', () => {
  it('склеивает классы', () => {
    expect(cn('a', 'b')).toBe('a b');
  });
  it('последний tailwind-класс выигрывает', () => {
    expect(cn('p-2', 'p-4')).toBe('p-4');
  });
});

describe('formatPrice', () => {
  it('форматирует USD', () => {
    expect(formatPrice(1500, 'USD')).toMatch(/\$1,?500/);
  });
});

describe('slugify', () => {
  it('латинизирует кириллицу', () => {
    expect(slugify('Корпоративный сайт')).toBe('korporativnyi-sait');
  });
  it('убирает спецсимволы', () => {
    expect(slugify('Hello, World!')).toBe('hello-world');
  });
});
