import { useTranslation } from 'react-i18next';
import { ArrowUpRight } from 'lucide-react';
import { LocalizedLink, useCurrentLanguage } from '@/i18n/hooks';
import { pickLocale } from '@/i18n/localized';
import type { PortfolioItem } from '../types';
import type { Category } from '@/features/categories/types';

interface PortfolioCardProps {
  item: PortfolioItem;
  category?: Category;
  /** 1-based position in the list — rendered as a "02" index accent. */
  index?: number;
}

export function PortfolioCard({ item, category, index }: PortfolioCardProps) {
  const { t } = useTranslation();
  const lang = useCurrentLanguage();
  const title = pickLocale(item.title, lang) ?? '';
  const categoryLabel = category ? pickLocale(category.name, lang) ?? category.slug : null;
  const number = index != null ? String(index).padStart(2, '0') : null;
  // Avoid a redundant client line when it just repeats the project title.
  const client =
    item.client && item.client.trim().toLowerCase() !== title.trim().toLowerCase()
      ? item.client
      : null;

  return (
    <LocalizedLink
      to={`/portfolio/${item.slug}`}
      className="group relative flex flex-col overflow-hidden border border-foreground/10 bg-card outline-none transition-colors duration-300 ease-out hover:border-foreground/20 focus-visible:border-foreground/25"
    >
      {/* Faint grid texture — "table / sheet" feel */}
      <span aria-hidden className="bg-grid pointer-events-none absolute inset-0 opacity-60" />
      {/* Gradient highlight along the top & left edges */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-foreground/25 via-foreground/10 to-transparent opacity-70 transition-opacity duration-300 group-hover:opacity-100"
      />
      <span
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 w-px bg-gradient-to-b from-foreground/25 via-foreground/10 to-transparent opacity-70 transition-opacity duration-300 group-hover:opacity-100"
      />

      {/* Head: index accent + meta */}
      <div className="relative flex items-start gap-3 p-4 pb-3">
        {number && (
          <span className="select-none font-mono text-[28px] font-semibold leading-[0.8] tracking-tight text-foreground/15 tabular-nums">
            {number}
          </span>
        )}
        <div className="min-w-0 flex-1">
          {categoryLabel && (
            <p className="mb-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
              {categoryLabel}
            </p>
          )}
          <h3 className="font-display text-[15px] font-bold leading-tight tracking-tight">
            {title}
          </h3>
          {client && (
            <p className="mt-1 text-xs text-muted-foreground">{client}</p>
          )}
        </div>
        <ArrowUpRight className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground transition-[transform,color] duration-300 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground motion-reduce:transition-none" />
      </div>

      {/* Cover */}
      <div className="relative aspect-[16/10] overflow-hidden border-y border-foreground/10 bg-muted">
        {item.image_url ? (
          <img
            src={item.image_url}
            alt={title}
            className="h-full w-full object-cover"
            loading="lazy"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-xs text-muted-foreground">
            {t('portfolio.noImage')}
          </div>
        )}
      </div>

      {/* Tech footer */}
      {item.technologies.length > 0 && (
        <div className="relative flex flex-wrap gap-x-3 gap-y-1.5 p-4">
          {item.technologies.slice(0, 5).map((tech) => (
            <span
              key={tech}
              className="font-mono text-[11px] font-medium uppercase tracking-wide text-muted-foreground"
            >
              {tech}
            </span>
          ))}
        </div>
      )}
    </LocalizedLink>
  );
}
