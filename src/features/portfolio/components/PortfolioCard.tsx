import { useTranslation } from 'react-i18next';
import { ArrowUpRight } from 'lucide-react';
import { LocalizedLink, useCurrentLanguage } from '@/i18n/hooks';
import { pickLocale } from '@/i18n/localized';
import { cn } from '@/lib/utils';
import type { PortfolioItem } from '../types';
import type { Category } from '@/features/categories/types';

interface PortfolioCardProps {
  item: PortfolioItem;
  category?: Category;
  index?: number;
  className?: string;
}

export function PortfolioCard({ item, category, index, className }: PortfolioCardProps) {
  const { t } = useTranslation();
  const lang = useCurrentLanguage();
  const title = pickLocale(item.title, lang) ?? '';
  const description = item.description ? pickLocale(item.description, lang) : null;
  const categoryLabel = category ? pickLocale(category.name, lang) ?? category.slug : null;
  const number = index != null ? String(index).padStart(2, '0') : null;

  return (
    <LocalizedLink
      to={`/portfolio/${item.slug}`}
      className={cn(
        'group relative block aspect-[4/3] overflow-hidden rounded-xl bg-muted',
        'outline-none focus-visible:ring-2 focus-visible:ring-foreground/40 focus-visible:ring-offset-2',
        className,
      )}
    >
      {/* Image: block-level fill so aspect-ratio drives height correctly.
          scale-[1.02] permanently overscans ~2% per edge to crop thin
          white letterbox lines that may be baked into the image content. */}
      {item.image_url ? (
        <img
          src={item.image_url}
          alt={title}
          className="block h-full w-full scale-[1.02] object-cover transition-[filter] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:blur-[5px]"
          loading="lazy"
        />
      ) : (
        <div className="h-full w-full bg-grid opacity-30" />
      )}

      {/* Index + category badges — fade out on hover */}
      {number && (
        <span className="absolute left-3.5 top-3.5 font-mono text-[10px] font-semibold tracking-[0.12em] text-foreground/30 transition-opacity duration-200 group-hover:opacity-0">
          {number}
        </span>
      )}
      {categoryLabel && (
        <span className="absolute right-3.5 top-3.5 font-mono text-[10px] uppercase tracking-[0.14em] text-foreground/20 transition-opacity duration-200 group-hover:opacity-0">
          {categoryLabel}
        </span>
      )}

      {/* Hover overlay: mid-gray, not dark not light */}
      <div
        className="absolute inset-0 flex flex-col justify-end p-5 opacity-0 backdrop-blur-[2px] transition-opacity duration-300 group-hover:opacity-75"
        style={{ background: 'rgb(120 120 120 / 0.75)' }}
      >
        {/* Content slides up on hover */}
        <div className="translate-y-3 space-y-3 transition-transform duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-0">
          {/* Title */}
          <div>
            <h3 className="font-display text-lg font-bold leading-tight tracking-tight text-white [text-wrap:balance]">
              {title}
            </h3>
            {description && (
              <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-white/70">
                {description}
              </p>
            )}
          </div>

          {/* Footer: view link + tech */}
          <div className="flex items-center justify-between gap-3 border-t border-white/20 pt-3">
            <span className="flex items-center gap-1.5 text-sm font-medium text-white">
              {t('portfolio.viewProject')}
              <ArrowUpRight className="h-4 w-4 shrink-0 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </span>
            {item.technologies.length > 0 && (
              <p className="shrink-0 text-right font-mono text-[10px] uppercase tracking-[0.1em] text-white/55">
                {item.technologies.slice(0, 3).join(' · ')}
              </p>
            )}
          </div>
        </div>
      </div>
    </LocalizedLink>
  );
}
