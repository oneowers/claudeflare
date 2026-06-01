import { useLocation, useNavigate } from 'react-router-dom';
import { PasskeyAuth } from '@/features/auth/components/PasskeyAuth';
import { useLocalizedPath } from '@/i18n/hooks';

export function LoginPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const localize = useLocalizedPath();
  const finishAuthentication = () => {
    const from = (location.state as { from?: { pathname?: string } })?.from?.pathname;
    navigate(from ?? localize('/admin'), { replace: true });
  };

  return <PasskeyAuth onAuthenticated={finishAuthentication} />;
}
