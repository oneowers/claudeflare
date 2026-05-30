import { useTranslation } from 'react-i18next';
import { ArrowUpRight } from 'lucide-react';
import { formatPrice } from '@/lib/utils';
import { LocalizedLink, useCurrentLanguage } from '@/i18n/hooks';
import { pickLocale } from '@/i18n/localized';
import type { Service } from '../types';

interface ServiceCardProps {
  service: Service;
}

export function ServiceCard({ service }: ServiceCardProps) {
  const { t } = useTranslation();
  const lang = useCurrentLanguage();
  const title = pickLocale(service.name, lang) ?? '';

  return (
    <LocalizedLink
      to={`/services/${service.slug}`}
      className="group flex flex-col rounded-card border border-white/10 bg-surface p-7 transition-all duration-300 ease-brand hover:-translate-y-1 hover:border-white/20"
    >
      <div className="flex items-start justify-between gap-3">
        <h3 className="font-display text-2xl font-bold leading-[1.1] tracking-tight text-balance">
          {title}
        </h3>
        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-white/[0.06] text-foreground/70 transition-all duration-300 group-hover:bg-violet group-hover:text-white">
          <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </span>
      </div>

      <p className="mt-3 flex-1 text-[15px] leading-relaxed text-muted-foreground">
        {pickLocale(service.short_description, lang)}
      </p>

      <div className="mt-7 flex items-baseline gap-2">
        <span className="text-xs uppercase tracking-wide text-foreground/60">
          {t('common.from')}
        </span>
        <span className="font-display text-xl font-bold tabular-nums">
          {formatPrice(service.price_from, service.currency)}
        </span>
      </div>
    </LocalizedLink>
  );
}
