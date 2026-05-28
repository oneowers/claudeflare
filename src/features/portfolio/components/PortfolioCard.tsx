import { useTranslation } from 'react-i18next';
import { LocalizedLink, useCurrentLanguage } from '@/i18n/hooks';
import { pickLocale } from '@/i18n/localized';
import type { PortfolioItem } from '../types';

interface PortfolioCardProps {
  item: PortfolioItem;
}

export function PortfolioCard({ item }: PortfolioCardProps) {
  const { t } = useTranslation();
  const lang = useCurrentLanguage();
  const title = pickLocale(item.title, lang) ?? '';

  return (
    <LocalizedLink
      to={`/portfolio/${item.slug}`}
      className="group block overflow-hidden rounded-lg border border-border/60 transition-colors hover:border-foreground/30"
    >
      <div className="aspect-[4/3] overflow-hidden bg-muted">
        {item.image_url ? (
          <img
            src={item.image_url}
            alt={title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-xs text-muted-foreground">
            {t('portfolio.noImage')}
          </div>
        )}
      </div>
      <div className="space-y-2 p-4">
        <div className="flex items-baseline justify-between gap-3">
          <h3 className="font-medium leading-tight">{title}</h3>
          {item.client && (
            <span className="shrink-0 text-xs text-muted-foreground">
              {item.client}
            </span>
          )}
        </div>
        {item.technologies.length > 0 && (
          <p className="text-xs text-muted-foreground">
            {item.technologies.slice(0, 4).join(' · ')}
          </p>
        )}
      </div>
    </LocalizedLink>
  );
}
