import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { ReactNode } from 'react';
import { useCreateService } from './useCreateService';

vi.mock('../api', () => ({
  createService: vi.fn(),
}));

vi.mock('sonner', () => ({
  toast: { success: vi.fn(), error: vi.fn() },
}));

import { createService } from '../api';
import { toast } from 'sonner';

function wrapper({ children }: { children: ReactNode }) {
  const qc = new QueryClient({
    defaultOptions: { queries: { retry: false }, mutations: { retry: false } },
  });
  return <QueryClientProvider client={qc}>{children}</QueryClientProvider>;
}

const sampleFormValues = {
  name: { ru: 'Услуга', en: 'Service', uz: 'Xizmat' },
  slug: 's',
  short_description: { ru: 'короткое описание', en: '', uz: '' },
  description: { ru: '', en: '', uz: '' },
  price_from: 100,
  currency: 'USD' as const,
  features: { ru: [], en: [], uz: [] },
  is_published: false,
  sort_order: 0,
};

describe('useCreateService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('вызывает createService и показывает success-toast', async () => {
    vi.mocked(createService).mockResolvedValue({
      id: '1',
      slug: 's',
      name: { ru: 'Услуга' },
      short_description: { ru: 'короткое описание' },
      description: null,
      price_from: 100,
      currency: 'USD',
      features: { ru: [] },
      image_url: null,
      is_published: false,
      sort_order: 0,
      created_at: '',
      updated_at: '',
    });

    const { result } = renderHook(() => useCreateService(), { wrapper });

    result.current.mutate(sampleFormValues);

    await waitFor(() => expect(createService).toHaveBeenCalledOnce());
    await waitFor(() => expect(toast.success).toHaveBeenCalled());
  });

  it('при ошибке вызывает toast.error', async () => {
    vi.mocked(createService).mockRejectedValue(new Error('RLS denied'));

    const { result } = renderHook(() => useCreateService(), { wrapper });

    result.current.mutate(sampleFormValues);

    await waitFor(() => expect(toast.error).toHaveBeenCalledWith('RLS denied'));
  });
});
