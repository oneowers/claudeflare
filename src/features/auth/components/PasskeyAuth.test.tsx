import { afterAll, beforeEach, describe, expect, it, vi } from 'vitest';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from '@/tests/utils/renderWithProviders';
import { usePasskeySignIn } from '../hooks/usePasskeySignIn';
import { useRegisterPasskey } from '../hooks/useRegisterPasskey';
import { useSession } from '../hooks/useSession';
import { useSignIn } from '../hooks/useSignIn';
import { PasskeyAuth } from './PasskeyAuth';

vi.mock('../hooks/usePasskeySignIn', () => ({ usePasskeySignIn: vi.fn() }));
vi.mock('../hooks/useRegisterPasskey', () => ({ useRegisterPasskey: vi.fn() }));
vi.mock('../hooks/useSession', () => ({ useSession: vi.fn() }));
vi.mock('../hooks/useSignIn', () => ({ useSignIn: vi.fn() }));

const originalPublicKeyCredential = Object.getOwnPropertyDescriptor(
  window,
  'PublicKeyCredential',
);
const originalCredentials = Object.getOwnPropertyDescriptor(
  navigator,
  'credentials',
);

function setWebAuthnSupport(supported: boolean) {
  Object.defineProperty(window, 'PublicKeyCredential', {
    configurable: true,
    value: supported ? vi.fn() : undefined,
  });
  Object.defineProperty(navigator, 'credentials', {
    configurable: true,
    value: supported ? { create: vi.fn(), get: vi.fn() } : undefined,
  });
}

function mutationResult(mutate = vi.fn()) {
  return { isPending: false, mutate };
}

describe('PasskeyAuth', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(useSession).mockReturnValue({
      loading: false,
      session: null,
    } as ReturnType<typeof useSession>);
    vi.mocked(usePasskeySignIn).mockReturnValue(
      mutationResult() as unknown as ReturnType<typeof usePasskeySignIn>,
    );
    vi.mocked(useRegisterPasskey).mockReturnValue(
      mutationResult() as unknown as ReturnType<typeof useRegisterPasskey>,
    );
    vi.mocked(useSignIn).mockReturnValue(
      mutationResult() as unknown as ReturnType<typeof useSignIn>,
    );
  });

  afterAll(() => {
    if (originalPublicKeyCredential) {
      Object.defineProperty(
        window,
        'PublicKeyCredential',
        originalPublicKeyCredential,
      );
    } else {
      Reflect.deleteProperty(window, 'PublicKeyCredential');
    }
    if (originalCredentials) {
      Object.defineProperty(navigator, 'credentials', originalCredentials);
    } else {
      Reflect.deleteProperty(navigator, 'credentials');
    }
  });

  it('показывает Passkey как основной способ входа в поддерживаемом браузере', async () => {
    setWebAuthnSupport(true);
    const user = userEvent.setup();

    renderWithProviders(<PasskeyAuth onAuthenticated={vi.fn()} />);

    expect(
      screen.getByRole('heading', { name: 'С возвращением' }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Продолжить с Passkey' }),
    ).toBeInTheDocument();
    expect(screen.queryByLabelText('Email')).not.toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Войти по паролю' }));

    expect(screen.getByLabelText('Email')).toBeInTheDocument();
  });

  it('сразу показывает password fallback без поддержки WebAuthn', () => {
    setWebAuthnSupport(false);

    renderWithProviders(<PasskeyAuth onAuthenticated={vi.fn()} />);

    expect(
      screen.getByRole('heading', { name: 'Вход по паролю' }),
    ).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(
      screen.getByText('Этот браузер не поддерживает Passkey. Войдите по паролю.'),
    ).toBeInTheDocument();
  });

  it('предлагает создать Passkey после успешного входа по паролю', async () => {
    setWebAuthnSupport(true);
    const user = userEvent.setup();
    const mutate = vi.fn(
      (
        _values: unknown,
        options?: {
          onSuccess?: () => void;
        },
      ) => options?.onSuccess?.(),
    );
    vi.mocked(useSignIn).mockReturnValue(
      mutationResult(mutate) as unknown as ReturnType<typeof useSignIn>,
    );

    renderWithProviders(<PasskeyAuth onAuthenticated={vi.fn()} />);

    await user.click(screen.getByRole('button', { name: 'Войти по паролю' }));
    await user.type(screen.getByLabelText('Email'), 'admin@example.com');
    await user.type(screen.getByLabelText('Пароль'), 'password');
    await user.click(screen.getByRole('button', { name: 'Войти' }));

    expect(
      screen.getByRole('heading', { name: 'Ускорьте следующий вход' }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', {
        name: 'Включить вход по Face ID / отпечатку',
      }),
    ).toBeInTheDocument();
  });

  it('переводит на password fallback, если backend ещё не включил Passkey', async () => {
    setWebAuthnSupport(true);
    const user = userEvent.setup();
    const mutate = vi.fn(
      (
        _variables: undefined,
        options?: {
          onError?: (error: Error & { code?: string }) => void;
        },
      ) => options?.onError?.(
        Object.assign(new Error('Passkeys are disabled'), {
          code: 'passkey_disabled',
        }),
      ),
    );
    vi.mocked(usePasskeySignIn).mockReturnValue(
      mutationResult(mutate) as unknown as ReturnType<typeof usePasskeySignIn>,
    );

    renderWithProviders(<PasskeyAuth onAuthenticated={vi.fn()} />);

    await user.click(
      screen.getByRole('button', { name: 'Продолжить с Passkey' }),
    );

    expect(
      screen.getByRole('heading', { name: 'Вход по паролю' }),
    ).toBeInTheDocument();
  });
});
