import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Check, ArrowRight } from 'lucide-react';
import { useServiceBySlug } from '@/features/services/hooks/useService';
import { formatPrice } from '@/lib/utils';
import { LocalizedLink, useCurrentLanguage } from '@/i18n/hooks';
import { pickLocale } from '@/i18n/localized';

export function ServiceDetailPage() {
  const { slug } = useParams();
  const { t } = useTranslation();
  const lang = useCurrentLanguage();
  const { data: service, isLoading, error } = useServiceBySlug(slug);

  if (isLoading) {
    return (
      <section className="container py-16">
        <div className="h-12 w-2/3 animate-pulse rounded bg-muted" />
        <div className="mt-4 h-5 w-1/2 animate-pulse rounded bg-muted" />
      </section>
    );
  }

  if (error || !service) {
    return (
      <section className="container py-16">
        <h1 className="text-3xl font-semibold">{t('services.detail.notFound')}</h1>
        <LocalizedLink
          to="/services"
          className="mt-4 inline-block text-sm text-muted-foreground hover:text-foreground"
        >
          {t('services.detail.back')}
        </LocalizedLink>
      </section>
    );
  }

  const name = pickLocale(service.name, lang) ?? '';
  const shortDesc = pickLocale(service.short_description, lang) ?? '';
  const description = pickLocale(service.description, lang);
  const features = pickLocale(service.features, lang) ?? [];

  return (
    <section className="container py-16">
      <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr]">
        <article>
          <p className="text-sm font-medium text-muted-foreground">
            {t('services.detail.kicker')}
          </p>
          <h1 className="mt-2 text-4xl font-bold tracking-tight md:text-5xl">
            {name}
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            {shortDesc}
          </p>

          {description && (
            <div className="prose prose-sm mt-8 max-w-none whitespace-pre-wrap text-foreground/90">
              {description}
            </div>
          )}

          {features.length > 0 && (
            <div className="mt-10">
              <h2 className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
                {t('services.detail.whatIncluded')}
              </h2>
              <ul className="mt-4 space-y-2">
                {features.map((feat) => (
                  <li key={feat} className="flex items-start gap-3">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </article>

        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-lg border border-border/60 bg-muted/20 p-6">
            <p className="text-xs uppercase tracking-wider text-muted-foreground">
              {t('services.detail.priceFrom')}
            </p>
            <p className="mt-1 text-3xl font-semibold">
              {formatPrice(service.price_from, service.currency)}
            </p>
            <p className="mt-3 text-sm text-muted-foreground">
              {t('services.detail.priceNote')}
            </p>
            <LocalizedLink
              to="/contact"
              className="mt-6 inline-flex h-11 w-full items-center justify-center gap-2 rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              {t('services.detail.discuss')}
              <ArrowRight className="h-4 w-4" />
            </LocalizedLink>
          </div>
        </aside>
      </div>
    </section>
  );
}
