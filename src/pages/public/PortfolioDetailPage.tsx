import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ExternalLink, ArrowLeft } from 'lucide-react';
import { usePortfolioBySlug } from '@/features/portfolio/hooks/usePortfolio';
import { LocalizedLink, useCurrentLanguage } from '@/i18n/hooks';
import { pickLocale } from '@/i18n/localized';
import { PageHero } from '@/components/shared/PageHero';

export function PortfolioDetailPage() {
  const { slug } = useParams();
  const { t } = useTranslation();
  const lang = useCurrentLanguage();
  const { data: item, isLoading, error } = usePortfolioBySlug(slug);

  if (isLoading) {
    return (
      <div className="px-3 pt-6 sm:px-4">
        <div className="rounded-panel bg-surface px-6 py-14 sm:px-12 sm:py-20">
          <div className="h-5 w-24 animate-pulse rounded-full bg-white/10" />
          <div className="mt-6 h-14 w-2/3 animate-pulse rounded-2xl bg-white/10" />
        </div>
      </div>
    );
  }

  if (error || !item) {
    return (
      <section className="container py-24">
        <h1 className="font-display text-3xl font-extrabold uppercase tracking-tight">
          {t('portfolio.detail.notFound')}
        </h1>
        <LocalizedLink
          to="/portfolio"
          className="mt-6 inline-flex items-center gap-1.5 text-sm text-foreground/65 transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          {t('portfolio.detail.back')}
        </LocalizedLink>
      </section>
    );
  }

  const title = pickLocale(item.title, lang) ?? '';
  const description = pickLocale(item.description, lang);

  return (
    <>
      <PageHero kicker={item.client ?? t('nav.portfolio')} title={title}>
        {item.technologies.length > 0 && (
          <div className="mt-7 flex flex-wrap gap-2">
            {item.technologies.map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-white/15 px-3 py-1 text-sm text-foreground/70"
              >
                {tech}
              </span>
            ))}
          </div>
        )}
      </PageHero>

      <section className="container py-16 sm:py-20">
        {item.image_url && (
          <div className="overflow-hidden rounded-card border border-white/10 bg-surface p-2">
            <img
              src={item.image_url}
              alt={title}
              className="aspect-[16/9] w-full rounded-[1.125rem] object-cover"
            />
          </div>
        )}

        {description && (
          <div className="mx-auto mt-12 max-w-2xl whitespace-pre-wrap text-lg leading-relaxed text-muted-foreground">
            {description}
          </div>
        )}

        <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-8">
          <LocalizedLink
            to="/portfolio"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground/65 transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            {t('portfolio.detail.back')}
          </LocalizedLink>

          {item.project_url && (
            <a
              href={item.project_url}
              target="_blank"
              rel="noreferrer noopener"
              className="group inline-flex h-11 items-center gap-2 rounded-full bg-primary px-6 text-sm font-semibold text-primary-foreground transition-colors hover:bg-violet-deep"
            >
              {t('portfolio.detail.openProject')}
              <ExternalLink className="h-4 w-4" />
            </a>
          )}
        </div>
      </section>
    </>
  );
}
