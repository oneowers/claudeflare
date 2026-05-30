import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Check, ArrowRight, ArrowLeft } from 'lucide-react';
import { useServiceBySlug } from '@/features/services/hooks/useService';
import { formatPrice } from '@/lib/utils';
import { LocalizedLink, useCurrentLanguage } from '@/i18n/hooks';
import { pickLocale } from '@/i18n/localized';
import { PageHero } from '@/components/shared/PageHero';

export function ServiceDetailPage() {
  const { slug } = useParams();
  const { t } = useTranslation();
  const lang = useCurrentLanguage();
  const { data: service, isLoading, error } = useServiceBySlug(slug);

  if (isLoading) {
    return (
      <div className="px-3 pt-6 sm:px-4">
        <div className="rounded-panel bg-surface px-6 py-14 sm:px-12 sm:py-20">
          <div className="h-5 w-24 animate-pulse rounded-full bg-white/10" />
          <div className="mt-6 h-14 w-2/3 animate-pulse rounded-2xl bg-white/10" />
          <div className="mt-4 h-6 w-1/2 animate-pulse rounded-full bg-white/10" />
        </div>
      </div>
    );
  }

  if (error || !service) {
    return (
      <section className="container py-24">
        <h1 className="font-display text-3xl font-extrabold uppercase tracking-tight">
          {t('services.detail.notFound')}
        </h1>
        <LocalizedLink
          to="/services"
          className="mt-6 inline-flex items-center gap-1.5 text-sm text-foreground/65 transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
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
    <>
      <PageHero
        kicker={t('services.detail.kicker')}
        title={name}
        lead={shortDesc}
        aside={
          <div className="rounded-card border border-white/10 bg-surface-elevated p-6 text-center lg:text-right">
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-foreground/45">
              {t('services.detail.priceFrom')}
            </p>
            <p className="mt-2 font-display text-3xl font-extrabold tabular-nums tracking-tight">
              {formatPrice(service.price_from, service.currency)}
            </p>
            <LocalizedLink
              to="/contact"
              className="group mt-5 inline-flex h-11 w-full items-center justify-center gap-2 rounded-full bg-primary px-6 text-sm font-semibold text-primary-foreground transition-colors hover:bg-violet-deep"
            >
              {t('services.detail.discuss')}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </LocalizedLink>
          </div>
        }
      />

      <section className="container grid gap-12 py-16 sm:py-20 lg:grid-cols-[1.5fr_1fr]">
        {/* Description */}
        <article>
          {description && (
            <div className="max-w-2xl whitespace-pre-wrap text-lg leading-relaxed text-muted-foreground">
              {description}
            </div>
          )}

          {features.length > 0 && (
            <div className="mt-12">
              <h2 className="font-display text-xl font-bold uppercase tracking-tight">
                {t('services.detail.whatIncluded')}
              </h2>
              <ul className="mt-6 divide-y divide-white/[0.07]">
                {features.map((feat) => (
                  <li key={feat} className="flex items-start gap-3 py-4">
                    <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-violet/15 text-violet">
                      <Check className="h-3.5 w-3.5" />
                    </span>
                    <span className="text-[15px] leading-relaxed text-foreground/85">{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </article>

        {/* Aside note */}
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-card border border-white/10 bg-surface p-6">
            <p className="text-sm leading-relaxed text-muted-foreground">
              {t('services.detail.priceNote')}
            </p>
            <LocalizedLink
              to="/services"
              className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-foreground/65 transition-colors hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4" />
              {t('services.detail.back')}
            </LocalizedLink>
          </div>
        </aside>
      </section>
    </>
  );
}
