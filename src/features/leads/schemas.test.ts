import { describe, it, expect } from 'vitest';
import { contactFormSchema, leadUpdateSchema } from './schemas';

describe('contactFormSchema', () => {
  const base = {
    name: 'Иван',
    email: 'ivan@example.com',
    phone: '',
    message: 'Хочу новый сайт для компании',
    service_id: '',
    website: '',
  };

  it('принимает корректную заявку', () => {
    expect(contactFormSchema.safeParse(base).success).toBe(true);
  });

  it('отклоняет короткое сообщение', () => {
    expect(
      contactFormSchema.safeParse({ ...base, message: 'короткое' }).success,
    ).toBe(false);
  });

  it('отклоняет невалидный email', () => {
    expect(
      contactFormSchema.safeParse({ ...base, email: 'не-почта' }).success,
    ).toBe(false);
  });

  it('принимает телефон с +()-', () => {
    const r = contactFormSchema.safeParse({
      ...base,
      phone: '+998 (90) 123-4567',
    });
    expect(r.success).toBe(true);
  });

  it('отклоняет телефон с буквами', () => {
    expect(
      contactFormSchema.safeParse({ ...base, phone: 'abc' }).success,
    ).toBe(false);
  });

  it('honeypot website должен быть пустой', () => {
    const r = contactFormSchema.safeParse({ ...base, website: 'spam-bot' });
    expect(r.success).toBe(false);
  });
});

describe('leadUpdateSchema', () => {
  it('принимает любой из допустимых статусов', () => {
    for (const status of ['new', 'in_progress', 'closed', 'spam'] as const) {
      expect(leadUpdateSchema.safeParse({ status, notes: '' }).success).toBe(
        true,
      );
    }
  });

  it('отклоняет неизвестный статус', () => {
    expect(
      leadUpdateSchema.safeParse({ status: 'archived', notes: '' }).success,
    ).toBe(false);
  });
});
