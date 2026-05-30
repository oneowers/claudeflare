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
      className="group block overflow-hidden rounded-card border border-white/10 bg-surface transition-all duration-300 ease-brand hover:-translate-y-1 hover:border-white/20"
    >
      {/* Media */}
      <div className="relative m-2 aspect-[4/3] overflow-hidden rounded-[1.125rem] bg-surface-elevated">
        {item.image_url ? (
          <img
            src={item.image_url}
            alt={title}
            className="h-full w-full object-cover transition-transform duration-500 ease-brand group-hover:scale-[1.04]"
            loading="lazy"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-xs text-muted-foreground">
            {t('portfolio.noImage')}
          </div>
        )}
        {/* Project tag — violet pill */}
        {item.client && (
          <span className="badge-pill absolute left-3 top-3 bg-violet text-white">
            {item.client}
          </span>
        )}
      </div>

      {/* Body */}
      <div className="space-y-2 px-5 pb-6 pt-3">
        <h3 className="font-display text-xl font-bold leading-tight tracking-tight text-balance">
          {title}
        </h3>
        {item.technologies.length > 0 && (
          <p className="text-sm text-muted-foreground">
            {item.technologies.slice(0, 4).join(' · ')}
          </p>
        )}
      </div>
    </LocalizedLink>
  );
}
