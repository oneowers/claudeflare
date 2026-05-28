import { describe, it, expect, vi, beforeEach } from 'vitest';
import { screen } from '@testing-library/react';
import { Outlet, Route, Routes } from 'react-router-dom';
import { renderWithProviders } from '@/tests/utils/renderWithProviders';
import { ProtectedRoute } from './ProtectedRoute';
import { supabase } from '@/lib/supabase';

// The router mounts ProtectedRoute under /:lang. Mirror that in tests so the
// `useParams<{ lang }>()` lookup inside ProtectedRoute returns a real value.
function TestRoutes() {
  return (
    <Routes>
      <Route path="/:lang" element={<Outlet />}>
        <Route element={<ProtectedRoute />}>
          <Route path="admin" element={<div>secret content</div>} />
        </Route>
        <Route path="admin/login" element={<div>login page</div>} />
      </Route>
    </Routes>
  );
}

describe('ProtectedRoute', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('редиректит на /:lang/admin/login без сессии', async () => {
    vi.mocked(supabase.auth.getSession).mockResolvedValue({
      data: { session: null },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any);

    renderWithProviders(<TestRoutes />, '/ru/admin');

    expect(await screen.findByText('login page')).toBeInTheDocument();
    expect(screen.queryByText('secret content')).not.toBeInTheDocument();
  });

  it('пропускает к контенту при наличии сессии', async () => {
    vi.mocked(supabase.auth.getSession).mockResolvedValue({
      data: {
        session: {
          access_token: 'token',
          refresh_token: 'rt',
          expires_in: 3600,
          token_type: 'bearer',
          user: { id: 'user-1', email: 'a@a.com' },
        },
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any);

    renderWithProviders(<TestRoutes />, '/ru/admin');

    expect(await screen.findByText('secret content')).toBeInTheDocument();
  });
});
