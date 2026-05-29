import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Navigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useSignIn } from '@/features/auth/hooks/useSignIn';
import { useSession } from '@/features/auth/hooks/useSession';
import { useLocalizedNavigate, useLocalizedPath } from '@/i18n/hooks';
import { LanguageSwitcher } from '@/i18n/LanguageSwitcher';
import { Seo } from '@/components/shared/Seo';

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});
type LoginValues = z.infer<typeof loginSchema>;

export function LoginPage() {
  const { session, loading } = useSession();
  const location = useLocation();
  const navigate = useLocalizedNavigate();
  const localize = useLocalizedPath();
  const signIn = useSignIn();
  const { t } = useTranslation();

  const form = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  });

  if (loading) return null;
  if (session) {
    const from = (location.state as { from?: { pathname?: string } })?.from?.pathname;
    return <Navigate to={from ?? localize('/admin')} replace />;
  }

  return (
    <>
      <Seo title={t('admin.login.title')} noIndex />
      <div className="flex min-h-screen items-center justify-center bg-muted/30 px-4">
        <div className="w-full max-w-sm rounded-lg border border-border/60 bg-background p-8 shadow-sm">
          <div className="flex items-start justify-between gap-3">
            <h1 className="text-2xl font-semibold tracking-tight">
              {t('admin.login.title')}
            </h1>
            <LanguageSwitcher variant="compact" />
          </div>
          <p className="mt-1 text-sm text-muted-foreground">
            {t('admin.login.subtitle')}
          </p>
          <form
            onSubmit={form.handleSubmit((v) =>
              signIn.mutate(v, { onSuccess: () => navigate('/admin', { replace: true }) }),
            )}
            className="mt-6 space-y-4"
          >
            <div className="space-y-1.5">
              <Label htmlFor="email">{t('admin.login.email')}</Label>
              <Input id="email" type="email" {...form.register('email')} />
              {form.formState.errors.email && (
                <p className="text-xs text-destructive">
                  {t(form.formState.errors.email.message ?? '')}
                </p>
              )}
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="password">{t('admin.login.password')}</Label>
              <Input id="password" type="password" {...form.register('password')} />
              {form.formState.errors.password && (
                <p className="text-xs text-destructive">
                  {t(form.formState.errors.password.message ?? '')}
                </p>
              )}
            </div>
            <Button type="submit" className="w-full" disabled={signIn.isPending}>
              {signIn.isPending ? t('admin.login.submitting') : t('admin.login.submit')}
            </Button>
          </form>
        </div>
      </div>
    </>
  );
}
