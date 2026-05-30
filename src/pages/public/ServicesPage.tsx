import { useTranslation } from 'react-i18next';
import { useServices } from '@/features/services/hooks/useServices';
import { ServiceCard } from '@/features/services/components/ServiceCard';
import { PageHero } from '@/components/shared/PageHero';
import { Reveal } from '@/components/shared/Reveal';

export function ServicesPage() {
  const { t } = useTranslation();
  const { data, isLoading, error } = useServices(true);

  return (
    <>
      <PageHero
        kicker={t('services.kicker')}
        title={t('services.title')}
        lead={t('services.subtitle')}
      />

      <section className="container py-16 sm:py-20">
        {isLoading && (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="h-52 animate-pulse rounded-card border border-white/10 bg-surface"
              />
            ))}
          </div>
        )}

        {error && (
          <p className="text-sm text-destructive">{t('services.loadError')}</p>
        )}

        {data && data.length === 0 && (
          <p className="text-muted-foreground">{t('services.empty')}</p>
        )}

        {data && data.length > 0 && (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {data.map((service, i) => (
              <Reveal key={service.id} delay={i * 60}>
                <ServiceCard service={service} index={i} />
              </Reveal>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
