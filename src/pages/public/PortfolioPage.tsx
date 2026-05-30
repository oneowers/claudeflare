import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { usePortfolio } from '@/features/portfolio/hooks/usePortfolio';
import { PortfolioCard } from '@/features/portfolio/components/PortfolioCard';
import { cn } from '@/lib/utils';

/** Round image-thumbnail filter chip with a label underneath. */
function CircleFilter({
  label,
  image,
  fallback,
  active,
  onClick,
}: {
  label: string;
  image: string | null;
  fallback: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className="group flex shrink-0 flex-col items-center gap-2.5 outline-none"
    >
      <span
        className={cn(
          'relative grid h-16 w-16 place-items-center overflow-hidden rounded-full transition-all duration-300 ease-brand',
          'ring-2 ring-offset-2 ring-offset-background',
          active
            ? 'ring-lime'
            : 'ring-transparent group-hover:ring-white/30 group-focus-visible:ring-white/40',
        )}
      >
        {image ? (
          <img
            src={image}
            alt=""
            className="h-full w-full object-cover transition-transform duration-500 ease-brand group-hover:scale-110"
            loading="lazy"
          />
        ) : (
          <span className="flex h-full w-full items-center justify-center bg-violet font-display text-lg font-extrabold uppercase text-white">
            {fallback}
          </span>
        )}
        {!active && (
          <span className="absolute inset-0 bg-black/35 transition-opacity duration-300 group-hover:opacity-0" />
        )}
      </span>
      <span
        className={cn(
          'max-w-[5rem] truncate text-xs font-medium transition-colors',
          active ? 'text-foreground' : 'text-foreground/55 group-hover:text-foreground',
        )}
      >
        {label}
      </span>
    </button>
  );
}

export function PortfolioPage() {
  const { t } = useTranslation();
  const { data, isLoading, error } = usePortfolio(true);
  const [activeTech, setActiveTech] = useState<string | null>(null);

  // Each tech filter carries a thumbnail: the first project image using it.
  const techs = useMemo(() => {
    const map = new Map<string, string | null>();
    (data ?? []).forEach((item) =>
      item.technologies.forEach((tech) => {
        if (!map.has(tech) || (!map.get(tech) && item.image_url)) {
          map.set(tech, map.get(tech) || item.image_url);
        }
      }),
    );
    return Array.from(map.entries())
      .sort((a, b) => a[0].localeCompare(b[0]))
      .map(([name, image]) => ({ name, image }));
  }, [data]);

  const allImage = useMemo(
    () => (data ?? []).find((i) => i.image_url)?.image_url ?? null,
    [data],
  );

  const filtered = useMemo(() => {
    if (!data) return [];
    if (!activeTech) return data;
    return data.filter((item) => item.technologies.includes(activeTech));
  }, [data, activeTech]);

  return (
    <section className="container py-20 sm:py-28">
      <header className="max-w-3xl">
        <p className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-foreground/60">
          <span className="h-2 w-2 rounded-full bg-lime" />
          {t('portfolio.kicker')}
        </p>
        <h1 className="mt-5 font-display text-[clamp(2.4rem,7vw,5rem)] font-extrabold uppercase leading-[0.98] tracking-tight text-balance">
          {t('portfolio.title')}
        </h1>
      </header>

      {techs.length > 0 && (
        <div className="mt-10 flex flex-nowrap gap-5 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <CircleFilter
            label={t('portfolio.all')}
            image={allImage}
            fallback="✳"
            active={activeTech === null}
            onClick={() => setActiveTech(null)}
          />
          {techs.map((tech) => (
            <CircleFilter
              key={tech.name}
              label={tech.name}
              image={tech.image}
              fallback={tech.name.charAt(0)}
              active={activeTech === tech.name}
              onClick={() => setActiveTech(tech.name)}
            />
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
