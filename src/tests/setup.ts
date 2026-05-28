import '@testing-library/jest-dom/vitest';
import { cleanup } from '@testing-library/react';
import { afterEach, beforeAll, vi } from 'vitest';
import { i18n } from '@/i18n';

afterEach(() => cleanup());

// Force RU as the test language so assertions stay stable.
beforeAll(async () => {
  if (!i18n.isInitialized) {
    await new Promise<void>((resolve) =>
      i18n.on('initialized', () => resolve()),
    );
  }
  await i18n.changeLanguage('ru');
});

vi.mock('@/lib/supabase', () => ({
  supabase: {
    auth: {
      getSession: vi.fn().mockResolvedValue({ data: { session: null } }),
      onAuthStateChange: vi
        .fn()
        .mockReturnValue({ data: { subscription: { unsubscribe: vi.fn() } } }),
      signInWithPassword: vi.fn(),
      signOut: vi.fn(),
      getUser: vi.fn().mockResolvedValue({ data: { user: null } }),
    },
    from: vi.fn(),
    storage: { from: vi.fn() },
  },
}));
