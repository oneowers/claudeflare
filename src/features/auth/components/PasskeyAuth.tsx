import { useEffect, useRef, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { Fingerprint, KeyRound, LoaderCircle, LockKeyhole, ShieldCheck } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { LanguageSwitcher } from '@/i18n/LanguageSwitcher';
import { usePasskeySignIn } from '../hooks/usePasskeySignIn';
import { useRegisterPasskey } from '../hooks/useRegisterPasskey';
import { useSession } from '../hooks/useSession';
import { useSignIn } from '../hooks/useSignIn';
import { getPasskeyErrorTranslationKey } from '../passkeyErrors';
import { loginSchema, type LoginValues } from '../schemas';
import { isWebAuthnSupported } from '../webauthn';

type AuthView = 'enroll' | 'passkey' | 'password';

interface PasskeyAuthProps {
  onAuthenticated: () => void;
}

function IconFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-16 w-16 items-center justify-center rounded-full border border-violet/30 bg-violet/10 text-violet">
      {children}
    </div>
  );
}

function PendingLabel({ children }: { children: React.ReactNode }) {
  return (
    <>
      <LoaderCircle className="animate-spin" />
      {children}
    </>
  );
}

export function PasskeyAuth({ onAuthenticated }: PasskeyAuthProps) {
  const { t } = useTranslation();
  const { session, loading } = useSession();
  const supportsPasskeys = isWebAuthnSupported();
  const [view, setView] = useState<AuthView>(
    supportsPasskeys ? 'passkey' : 'password',
  );
  const [passkeyUnavailable, setPasskeyUnavailable] = useState(false);
  const passwordFlowStarted = useRef(false);
  const signIn = useSignIn();
  const passkeySignIn = usePasskeySignIn();
  const registerPasskey = useRegisterPasskey();
  const form = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  });

  useEffect(() => {
    if (!loading && session && !passwordFlowStarted.current) {
      onAuthenticated();
    }
  }, [loading, onAuthenticated, session]);

  if (loading || (session && !passwordFlowStarted.current)) return null;

  const submitPassword = form.handleSubmit((values) => {
    passwordFlowStarted.current = true;
    signIn.mutate(values, {
      onSuccess: () => {
        if (supportsPasskeys) {
          setView('enroll');
          return;
        }
        onAuthenticated();
      },
      onError: () => {
        passwordFlowStarted.current = false;
      },
    });
  });

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background px-4 py-16">
      <div className="absolute inset-0 bg-spark" aria-hidden="true" />
      <div
        className="absolute -left-32 top-1/4 h-72 w-72 rounded-full bg-violet/15 blur-3xl"
        aria-hidden="true"
      />
      <div className="absolute right-4 top-4 z-10 sm:right-8 sm:top-8">
        <LanguageSwitcher variant="compact" />
      </div>

      <main className="panel relative w-full max-w-md p-6 shadow-2xl shadow-black/30 sm:p-8">
        {view === 'passkey' && (
          <>
            <IconFrame>
              <Fingerprint className="h-8 w-8" strokeWidth={1.8} />
            </IconFrame>
            <p className="mt-6 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-lime">
              <LockKeyhole className="h-3.5 w-3.5" />
              {t('admin.login.passkey.secureLabel')}
            </p>
            <h1 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">
              {t('admin.login.passkey.title')}
            </h1>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              {t('admin.login.passkey.subtitle')}
            </p>

            <Button
              type="button"
              className="mt-8 w-full"
              size="lg"
              disabled={passkeySignIn.isPending}
              onClick={() =>
                passkeySignIn.mutate(undefined, {
                  onSuccess: onAuthenticated,
                  onError: (error) => {
                    if (
                      getPasskeyErrorTranslationKey(error) ===
                      'admin.login.passkey.errors.disabled'
                    ) {
                      setPasskeyUnavailable(true);
                      setView('password');
                    }
                  },
                })
              }
            >
              {passkeySignIn.isPending ? (
                <PendingLabel>{t('admin.login.passkey.signingIn')}</PendingLabel>
              ) : (
                <>
                  <Fingerprint />
                  {t('admin.login.passkey.continue')}
                </>
              )}
            </Button>
            <button
              type="button"
              className="mt-5 w-full text-center text-sm font-medium text-muted-foreground underline decoration-white/20 underline-offset-4 transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              onClick={() => setView('password')}
            >
              {t('admin.login.passkey.usePassword')}
            </button>
            <p className="mt-8 flex gap-2 border-t border-white/10 pt-5 text-xs leading-5 text-muted-foreground">
              <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-lime" />
              {t('admin.login.passkey.privacy')}
            </p>
          </>
        )}

        {view === 'password' && (
          <>
            <IconFrame>
              <KeyRound className="h-7 w-7" strokeWidth={1.8} />
            </IconFrame>
            <h1 className="mt-6 text-2xl font-semibold tracking-tight sm:text-3xl">
              {t('admin.login.passwordFallback.title')}
            </h1>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              {t(
                passkeyUnavailable
                  ? 'admin.login.passkey.errors.disabled'
                  : supportsPasskeys
                  ? 'admin.login.passwordFallback.subtitle'
                  : 'admin.login.passkey.unsupported',
              )}
            </p>

            <form onSubmit={submitPassword} className="mt-7 space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="email">{t('admin.login.email')}</Label>
                <Input
                  id="email"
                  type="email"
                  autoComplete="username"
                  {...form.register('email')}
                />
                {form.formState.errors.email && (
                  <p className="text-xs text-destructive">
                    {t(form.formState.errors.email.message ?? '')}
                  </p>
                )}
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="password">{t('admin.login.password')}</Label>
                <Input
                  id="password"
                  type="password"
                  autoComplete="current-password"
                  {...form.register('password')}
                />
                {form.formState.errors.password && (
                  <p className="text-xs text-destructive">
                    {t(form.formState.errors.password.message ?? '')}
                  </p>
                )}
              </div>
              <Button
                type="submit"
                className="w-full"
                size="lg"
                disabled={signIn.isPending}
              >
                {signIn.isPending ? (
                  <PendingLabel>{t('admin.login.submitting')}</PendingLabel>
                ) : (
                  t('admin.login.submit')
                )}
              </Button>
            </form>

            {supportsPasskeys && !passkeyUnavailable && (
              <button
                type="button"
                className="mt-5 w-full text-center text-sm font-medium text-muted-foreground underline decoration-white/20 underline-offset-4 transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                onClick={() => setView('passkey')}
              >
                {t('admin.login.passwordFallback.usePasskey')}
              </button>
            )}
          </>
        )}

        {view === 'enroll' && (
          <>
            <IconFrame>
              <ShieldCheck className="h-8 w-8" strokeWidth={1.8} />
            </IconFrame>
            <p className="mt-6 text-xs font-semibold uppercase tracking-[0.18em] text-lime">
              {t('admin.login.passkey.enroll.optional')}
            </p>
            <h1 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">
              {t('admin.login.passkey.enroll.title')}
            </h1>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              {t('admin.login.passkey.enroll.subtitle')}
            </p>
            <Button
              type="button"
              className="mt-8 w-full"
              size="lg"
              disabled={registerPasskey.isPending}
              onClick={() =>
                registerPasskey.mutate(undefined, {
                  onSuccess: onAuthenticated,
                })
              }
            >
              {registerPasskey.isPending ? (
                <PendingLabel>
                  {t('admin.login.passkey.enroll.registering')}
                </PendingLabel>
              ) : (
                <>
                  <Fingerprint />
                  {t('admin.login.passkey.enroll.enable')}
                </>
              )}
            </Button>
            <button
              type="button"
              className="mt-5 w-full text-center text-sm font-medium text-muted-foreground underline decoration-white/20 underline-offset-4 transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              onClick={onAuthenticated}
            >
              {t('admin.login.passkey.enroll.skip')}
            </button>
            <p className="mt-8 flex gap-2 border-t border-white/10 pt-5 text-xs leading-5 text-muted-foreground">
              <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-lime" />
              {t('admin.login.passkey.privacy')}
            </p>
          </>
        )}
      </main>
    </div>
  );
}
