import { useTranslation } from 'react-i18next';
import { useServices } from '@/features/services/hooks/useServices';
import { ServiceCard } from '@/features/services/components/ServiceCard';

export function ServicesPage() {
  const { t } = useTranslation();
  const { data, isLoading, error } = useServices(true);

  return (
    <section className="container py-16">
      <header className="max-w-2xl">
        <p className="text-sm font-medium text-muted-foreground">
          {t('services.kicker')}
        </p>
        <h1 className="mt-2 text-4xl font-bold tracking-tight md:text-5xl">
          {t('services.title')}
        </h1>
        <p className="mt-4 text-base text-muted-foreground">
          {t('services.subtitle')}
        </p>
      </header>

      <div className="mt-12">
        {isLoading && (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="h-48 animate-pulse rounded-lg border border-border/60 bg-muted/40"
              />
            ))}
          </div>
        )}

        {error && (
          <p className="text-sm text-destructive">{t('services.loadError')}</p>
        )}

        {data && data.length === 0 && (
          <p className="text-sm text-muted-foreground">{t('services.empty')}</p>
        )}

        {data && data.length > 0 && (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {data.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
