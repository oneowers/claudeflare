import { describe, it, expect, vi, beforeEach } from 'vitest';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from '@/tests/utils/renderWithProviders';
import { ContactForm } from './ContactForm';

vi.mock('@/features/leads/api', () => ({
  createLead: vi.fn().mockResolvedValue({ id: 'lead-1' }),
}));

vi.mock('@/features/services/api', () => ({
  listServices: vi.fn().mockResolvedValue([]),
}));

vi.mock('sonner', () => ({
  toast: { success: vi.fn(), error: vi.fn() },
}));

import { createLead } from '@/features/leads/api';

describe('ContactForm', () => {
  beforeEach(() => vi.clearAllMocks());

  it('показывает ошибку при коротком сообщении', async () => {
    renderWithProviders(<ContactForm />);

    await userEvent.type(screen.getByLabelText(/имя/i), 'Иван');
    await userEvent.type(screen.getByLabelText(/email/i), 'ivan@example.com');
    await userEvent.type(screen.getByLabelText(/сообщение/i), 'мало');
    await userEvent.click(screen.getByRole('button', { name: /отправить/i }));

    expect(
      await screen.findByText(/расскажите чуть подробнее/i),
    ).toBeInTheDocument();
    expect(createLead).not.toHaveBeenCalled();
  });

  it('отправляет валидную заявку', async () => {
    renderWithProviders(<ContactForm />);

    await userEvent.type(screen.getByLabelText(/имя/i), 'Иван');
    await userEvent.type(screen.getByLabelText(/email/i), 'ivan@example.com');
    await userEvent.type(
      screen.getByLabelText(/сообщение/i),
      'Нужен сайт для нового продукта, бюджет обсуждаемый.',
    );
    await userEvent.click(screen.getByRole('button', { name: /отправить/i }));

    expect(await screen.findByText(/заявка отправлена/i)).toBeInTheDocument();
    expect(createLead).toHaveBeenCalledOnce();
  });
});
