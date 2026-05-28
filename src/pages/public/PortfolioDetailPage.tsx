import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ExternalLink } from 'lucide-react';
import { usePortfolioBySlug } from '@/features/portfolio/hooks/usePortfolio';
import { LocalizedLink, useCurrentLanguage } from '@/i18n/hooks';
import { pickLocale } from '@/i18n/localized';

export function PortfolioDetailPage() {
  const { slug } = useParams();
  const { t } = useTranslation();
  const lang = useCurrentLanguage();
  const { data: item, isLoading, error } = usePortfolioBySlug(slug);

  if (isLoading) {
    return (
      <section className="container py-16">
        <div className="h-10 w-1/2 animate-pulse rounded bg-muted" />
        <div className="mt-6 aspect-[16/9] animate-pulse rounded-lg bg-muted" />
      </section>
    );
  }

  if (error || !item) {
    return (
      <section className="container py-16">
        <h1 className="text-3xl font-semibold">{t('portfolio.detail.notFound')}</h1>
        <LocalizedLink
          to="/portfolio"
          className="mt-4 inline-block text-sm text-muted-foreground hover:text-foreground"
        >
          {t('portfolio.detail.back')}
        </LocalizedLink>
      </section>
    );
  }

  const title = pickLocale(item.title, lang) ?? '';
  const description = pickLocale(item.description, lang);

  return (
    <section className="container py-16">
      <header className="max-w-3xl">
        {item.client && (
          <p className="text-sm font-medium text-muted-foreground">{item.client}</p>
        )}
        <h1 className="mt-2 text-4xl font-bold tracking-tight md:text-5xl">
          {title}
        </h1>
        {item.technologies.length > 0 && (
          <p className="mt-4 text-sm text-muted-foreground">
            {item.technologies.join(' · ')}
          </p>
        )}
      </header>

      {item.image_url && (
        <div className="mt-10 overflow-hidden rounded-lg border border-border/60">
          <img
            src={item.image_url}
            alt={title}
            className="aspect-[16/9] w-full object-cover"
          />
        </div>
      )}

      {description && (
        <div className="prose prose-sm mt-10 max-w-3xl whitespace-pre-wrap text-foreground/90">
          {description}
        </div>
      )}

      {item.project_url && (
        <div className="mt-10">
          <a
            href={item.project_url}
            target="_blank"
            rel="noreferrer noopener"
            className="inline-flex h-11 items-center gap-2 rounded-md border border-input bg-background px-5 text-sm font-medium hover:bg-accent"
          >
            {t('portfolio.detail.openProject')}
            <ExternalLink className="h-4 w-4" />
          </a>
        </div>
      )}
    </section>
  );
}
