import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useServices } from '@/features/services/hooks/useServices';
import { ServiceCard } from '@/features/services/components/ServiceCard';
import { useCategories, useCategoryMap } from '@/features/categories/hooks/useCategories';
import { CategoryFilter } from '@/features/categories/components/CategoryFilter';
import { Seo } from '@/components/shared/Seo';

export function ServicesPage() {
  const { t } = useTranslation();
  const { data, isLoading, error } = useServices(true);
  const { data: categories } = useCategories();
  const categoryMap = useCategoryMap();
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const filtered = useMemo(() => {
    if (!data) return [];
    if (!activeCategory) return data;
    return data.filter((s) => s.category_id === activeCategory);
  }, [data, activeCategory]);

  return (
    <>
      <Seo title={t('nav.services')} description={t('services.subtitle')} />
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

      {categories && categories.length > 0 && (
        <div className="mt-10">
          <CategoryFilter
            categories={categories}
            active={activeCategory}
            onChange={setActiveCategory}
          />
        </div>
      )}

      <div className="mt-10">
        {isLoading && (
          <div className="border-b border-foreground/15">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="border-t border-foreground/15 py-8">
                <div className="h-8 w-2/5 animate-pulse rounded bg-muted/50" />
                <div className="mt-3 h-4 w-3/5 animate-pulse rounded bg-muted/40" />
              </div>
            ))}
          </div>
        )}

        {error && (
          <p className="text-sm text-destructive">{t('services.loadError')}</p>
        )}

        {data && filtered.length === 0 && (
          <p className="text-sm text-muted-foreground">{t('services.empty')}</p>
        )}

        {filtered.length > 0 && (
          <div className="border-b border-foreground/15">
            {filtered.map((service, i) => (
              <ServiceCard
                key={service.id}
                service={service}
                index={i}
                category={service.category_id ? categoryMap[service.category_id] : undefined}
              />
            ))}
          </div>
        )}
      </div>
      </section>
    </>
  );
}
