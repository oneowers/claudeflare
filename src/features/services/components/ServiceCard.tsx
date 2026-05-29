import { useTranslation } from 'react-i18next';
import { ArrowUpRight } from 'lucide-react';
import { formatPrice } from '@/lib/utils';
import { LocalizedLink, useCurrentLanguage } from '@/i18n/hooks';
import { pickLocale } from '@/i18n/localized';
import { CategoryBadge } from '@/features/categories/components/CategoryBadge';
import type { Service } from '../types';
import type { Category } from '@/features/categories/types';

interface ServiceCardProps {
  service: Service;
  category?: Category;
  index?: number;
}

export function ServiceCard({ service, category, index }: ServiceCardProps) {
  const { t } = useTranslation();
  const lang = useCurrentLanguage();
  const title = pickLocale(service.name, lang) ?? '';

  return (
    <LocalizedLink
      to={`/services/${service.slug}`}
      className="group relative block overflow-hidden border-t border-foreground/15 py-7 transition-[padding-left] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:pl-5 md:py-8"
    >
      <span
        className="pointer-events-none absolute inset-y-0 left-0 w-0 bg-foreground/[0.04] transition-[width] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:w-full"
        aria-hidden
      />

      <div className="relative flex items-start gap-4">
        {typeof index === 'number' && (
          <span className="mt-2 font-display text-xs font-semibold tracking-[0.1em] text-muted-foreground">
            {String(index + 1).padStart(2, '0')}
          </span>
        )}

        <div className="min-w-0 flex-1">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between sm:gap-8">
            <div className="min-w-0">
              <h3 className="font-display text-2xl font-semibold leading-[1.1] tracking-tight md:text-3xl">
                {title}
              </h3>
              {category && (
                <div className="mt-3">
                  <CategoryBadge category={category} />
                </div>
              )}
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground">
                {pickLocale(service.short_description, lang)}
              </p>
            </div>

            <div className="flex shrink-0 items-center justify-between gap-4 sm:flex-col sm:items-end sm:justify-start sm:gap-1 sm:text-right">
              <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
                {t('common.from')}
              </span>
              <span className="whitespace-nowrap font-display text-lg font-medium md:text-xl">
                {formatPrice(service.price_from, service.currency)}
              </span>
            </div>
          </div>
        </div>

        <ArrowUpRight className="mt-1.5 hidden h-5 w-5 shrink-0 text-muted-foreground transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-foreground lg:block" />
      </div>
    </LocalizedLink>
  );
}
