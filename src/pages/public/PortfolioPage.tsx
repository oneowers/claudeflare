import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { usePortfolio } from '@/features/portfolio/hooks/usePortfolio';
import { PortfolioCard } from '@/features/portfolio/components/PortfolioCard';
import { cn } from '@/lib/utils';

export function PortfolioPage() {
  const { t } = useTranslation();
  const { data, isLoading, error } = usePortfolio(true);
  const [activeTech, setActiveTech] = useState<string | null>(null);

  const techs = useMemo(() => {
    const set = new Set<string>();
    (data ?? []).forEach((item) => item.technologies.forEach((tech) => set.add(tech)));
    return Array.from(set).sort();
  }, [data]);

  const filtered = useMemo(() => {
    if (!data) return [];
    if (!activeTech) return data;
    return data.filter((item) => item.technologies.includes(activeTech));
  }, [data, activeTech]);

  return (
    <section className="container py-20 sm:py-28">
      <header className="max-w-3xl">
        <p className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-foreground/40">
          <span className="h-2 w-2 rounded-full bg-lime" />
          {t('portfolio.kicker')}
        </p>
        <h1 className="mt-5 font-display text-[clamp(2.4rem,7vw,5rem)] font-extrabold uppercase leading-[0.98] tracking-tight text-balance">
          {t('portfolio.title')}
        </h1>
      </header>

      {techs.length > 0 && (
        <div className="mt-10 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setActiveTech(null)}
            className={cn(
              'rounded-full px-4 py-2 text-sm font-medium transition-colors',
              activeTech === null
                ? 'bg-primary text-primary-foreground'
                : 'border border-white/15 text-foreground/65 hover:bg-white/[0.06] hover:text-foreground',
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
                'rounded-full px-4 py-2 text-sm font-medium transition-colors',
                activeTech === tech
                  ? 'bg-primary text-primary-foreground'
                  : 'border border-white/15 text-foreground/65 hover:bg-white/[0.06] hover:text-foreground',
              )}
            >
              {tech}
            </button>
          ))}
        </div>
      )}

      <div className="mt-10">
        {isLoading && (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="aspect-[4/3] animate-pulse rounded-card border border-white/10 bg-surface" />
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
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((item) => (
              <PortfolioCard key={item.id} item={item} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
