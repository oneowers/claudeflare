import { useCallback, useEffect } from 'react';
import {
  Link,
  type LinkProps,
  Navigate,
  Outlet,
  useLocation,
  useNavigate,
  type NavigateOptions,
  useParams,
} from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  DEFAULT_LANGUAGE,
  isLanguage,
  type Language,
  SUPPORTED_LANGUAGES,
} from './config';

export function useCurrentLanguage(): Language {
  const { lang } = useParams<{ lang?: string }>();
  return lang && isLanguage(lang) ? lang : DEFAULT_LANGUAGE;
}

export function useLocalizedPath() {
  const lang = useCurrentLanguage();
  return useCallback(
    (path: string) => {
      const normalized = path.startsWith('/') ? path : `/${path}`;
      return `/${lang}${normalized}`;
    },
    [lang],
  );
}

export function useLocalizedNavigate() {
  const navigate = useNavigate();
  const localize = useLocalizedPath();
  return useCallback(
    (path: string, options?: NavigateOptions) =>
      navigate(localize(path), options),
    [navigate, localize],
  );
}

interface LocalizedLinkProps extends Omit<LinkProps, 'to'> {
  to: string;
}

export function LocalizedLink({ to, ...rest }: LocalizedLinkProps) {
  const localize = useLocalizedPath();
  return <Link to={localize(to)} {...rest} />;
}

function detectInitialLanguage(): Language {
  const fromStorage =
    typeof window !== 'undefined' ? localStorage.getItem('i18nextLng') : null;
  const fromBrowser =
    typeof navigator !== 'undefined'
      ? navigator.language.split('-')[0]
      : DEFAULT_LANGUAGE;
  for (const candidate of [fromStorage, fromBrowser, DEFAULT_LANGUAGE]) {
    if (candidate && isLanguage(candidate)) return candidate;
  }
  return DEFAULT_LANGUAGE;
}

export function LanguageRedirect() {
  return <Navigate to={`/${detectInitialLanguage()}`} replace />;
}

export function LegacyPathRedirect() {
  const location = useLocation();
  const lang = detectInitialLanguage();
  const target = `/${lang}${location.pathname}${location.search}${location.hash}`;
  return <Navigate to={target} replace />;
}

export function LanguageBoundary() {
  const { lang } = useParams<{ lang?: string }>();
  const { i18n } = useTranslation();
  const valid = lang && isLanguage(lang);

  useEffect(() => {
    if (!valid || !lang) return;
    if (i18n.language !== lang) void i18n.changeLanguage(lang);
    document.documentElement.lang = lang;
  }, [lang, valid, i18n]);

  if (!valid) {
    return <Navigate to={`/${DEFAULT_LANGUAGE}`} replace />;
  }

  return <Outlet />;
}

export { SUPPORTED_LANGUAGES };
