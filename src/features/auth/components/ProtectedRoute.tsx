import { Navigate, Outlet, useLocation, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { DEFAULT_LANGUAGE, isLanguage } from '@/i18n/config';
import { useSession } from '../hooks/useSession';

export function ProtectedRoute() {
  const { session, loading } = useSession();
  const location = useLocation();
  const { t } = useTranslation();
  const { lang } = useParams<{ lang?: string }>();
  const currentLang =
    lang && isLanguage(lang) ? lang : DEFAULT_LANGUAGE;

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center text-sm text-muted-foreground">
        {t('common.loading')}
      </div>
    );
  }

  if (!session) {
    return (
      <Navigate
        to={`/${currentLang}/admin/login`}
        replace
        state={{ from: location }}
      />
    );
  }

  return <Outlet />;
}
