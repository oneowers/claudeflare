import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import {
  DEFAULT_LANGUAGE,
  SUPPORTED_LANGUAGES,
  type Language,
} from '@/i18n/config';
import { useCurrentLanguage } from '@/i18n/hooks';
import {
  DEFAULT_DESCRIPTION,
  DEFAULT_OG_IMAGE,
  SITE_NAME,
  SITE_URL,
} from '@/lib/site';

const OG_LOCALES: Record<Language, string> = {
  ru: 'ru_RU',
  en: 'en_US',
  uz: 'uz_UZ',
};

interface SeoProps {
  title?: string;
  description?: string | null;
  image?: string | null;
  type?: 'website' | 'article';
  noIndex?: boolean;
}

export function Seo({
  title,
  description,
  image,
  type = 'website',
  noIndex = false,
}: SeoProps) {
  const lang = useCurrentLanguage();
  const location = useLocation();
  const pageTitle = buildTitle(title);
  const pageDescription = description?.trim() || DEFAULT_DESCRIPTION;
  const canonicalPath = stripTrailingSlash(location.pathname);
  const canonicalUrl = `${SITE_URL}${canonicalPath}`;
  const imageUrl = toAbsoluteUrl(image || DEFAULT_OG_IMAGE);
  const pathWithoutLang = stripLanguagePrefix(canonicalPath);

  return (
    <Helmet htmlAttributes={{ lang }}>
      <title>{pageTitle}</title>
      <meta name="description" content={pageDescription} />
      {noIndex && <meta name="robots" content="noindex,nofollow" />}
      <link rel="canonical" href={canonicalUrl} />

      {SUPPORTED_LANGUAGES.map((alternateLang) => (
        <link
          key={alternateLang}
          rel="alternate"
          hrefLang={alternateLang}
          href={`${SITE_URL}/${alternateLang}${pathWithoutLang}`}
        />
      ))}
      <link
        rel="alternate"
        hrefLang="x-default"
        href={`${SITE_URL}/${DEFAULT_LANGUAGE}${pathWithoutLang}`}
      />

      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:type" content={type} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={pageDescription} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:locale" content={OG_LOCALES[lang]} />
      <meta property="og:image" content={imageUrl} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={pageDescription} />
      <meta name="twitter:image" content={imageUrl} />
    </Helmet>
  );
}

function buildTitle(title?: string): string {
  const cleanTitle = title?.trim();
  if (!cleanTitle) return `${SITE_NAME} - web development studio`;
  if (cleanTitle.includes(SITE_NAME)) return cleanTitle;
  return `${cleanTitle} | ${SITE_NAME}`;
}

function toAbsoluteUrl(url: string): string {
  if (/^https?:\/\//i.test(url)) return url;
  return `${SITE_URL}${url.startsWith('/') ? url : `/${url}`}`;
}

function stripTrailingSlash(pathname: string): string {
  if (pathname === '/') return '';
  return pathname.endsWith('/') ? pathname.slice(0, -1) : pathname;
}

function stripLanguagePrefix(pathname: string): string {
  const pattern = new RegExp(`^/(${SUPPORTED_LANGUAGES.join('|')})(?=/|$)`);
  const stripped = pathname.replace(pattern, '');
  return stripped || '';
}
