import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { usePortfolio } from '@/features/portfolio/hooks/usePortfolio';
import { PortfolioCard } from '@/features/portfolio/components/PortfolioCard';
import { useCategories, useCategoryMap } from '@/features/categories/hooks/useCategories';
import { CategoryFilter } from '@/features/categories/components/CategoryFilter';
import { cn } from '@/lib/utils';
import { Seo } from '@/components/shared/Seo';

export function PortfolioPage() {
  const { t } = useTranslation();
  const { data, isLoading, error } = usePortfolio(true);
  const { data: categories } = useCategories();
  const categoryMap = useCategoryMap();
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [activeTech, setActiveTech] = useState<string | null>(null);

  const techs = useMemo(() => {
    const set = new Set<string>();
    (data ?? []).forEach((item) => item.technologies.forEach((tech) => set.add(tech)));
    return Array.from(set).sort();
  }, [data]);

  const filtered = useMemo(() => {
    if (!data) return [];
    return data.filter((item) => {
      if (activeCategory && item.category_id !== activeCategory) return false;
      if (activeTech && !item.technologies.includes(activeTech)) return false;
      return true;
    });
  }, [data, activeCategory, activeTech]);

  return (
    <>
      <Seo title={t('nav.portfolio')} description={t('portfolio.title')} />
      <section className="container py-16">
      <header className="max-w-2xl">
        <p className="text-sm font-medium text-muted-foreground">
          {t('portfolio.kicker')}
        </p>
        <h1 className="mt-2 text-4xl font-bold tracking-tight md:text-5xl">
          {t('portfolio.title')}
        </h1>
      </header>

      {categories && categories.length > 0 && (
        <div className="mt-10">
          <CategoryFilter
            categories={categories}
            active={activeCategory}
            onChange={(id) => {
              setActiveCategory(id);
              setActiveTech(null);
            }}
          />
        </div>
      )}

      {techs.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setActiveTech(null)}
            className={cn(
              'rounded-md px-3 py-1.5 text-sm transition-colors',
              activeTech === null
                ? 'bg-secondary text-secondary-foreground'
                : 'border border-border/60 text-muted-foreground hover:text-foreground',
            )}
          >
            {t('portfolio.all')}
          </button>
          {techs.map((tech) => (
            <button
              key={tech}
              type="button"
              onClick={() => setActiveTech(tech)}
              className={cn(
                'rounded-md px-3 py-1.5 text-sm transition-colors',
                activeTech === tech
                  ? 'bg-secondary text-secondary-foreground'
                  : 'border border-border/60 text-muted-foreground hover:text-foreground',
              )}
            >
              {tech}
            </button>
          ))}
        </div>
      )}

      <div className="mt-10">
        {isLoading && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="aspect-[4/3] animate-pulse rounded-lg bg-muted/40" />
            ))}
          </div>
        )}

        {error && (
          <p className="text-sm text-destructive">{t('portfolio.loadError')}</p>
        )}

        {data && filtered.length === 0 && (
          <p className="text-sm text-muted-foreground">{t('portfolio.empty')}</p>
        )}

        {filtered.length > 0 && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((item, i) => (
              <PortfolioCard
                key={item.id}
                item={item}
                index={i + 1}
                category={item.category_id ? categoryMap[item.category_id] : undefined}
              />
            ))}
          </div>
        )}
      </div>
      </section>
    </>
  );
}
