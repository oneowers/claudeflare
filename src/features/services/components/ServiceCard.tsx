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
  return (
    <LocalizedLink
      to={`/services/${service.slug}`}
      className="group relative flex h-full flex-col rounded-lg border border-border/60 bg-background p-6 transition-colors hover:border-foreground/30"
    >
      <div className="flex items-start justify-between gap-4">
        <h3 className="text-lg font-semibold tracking-tight">
          {pickLocale(service.name, lang)}
        </h3>
        <ArrowUpRight className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground" />
      </div>
      <p className="mt-2 text-sm text-muted-foreground">
        {pickLocale(service.short_description, lang)}
      </p>
      <div className="mt-auto flex items-end justify-between pt-6">
        <span className="text-xs uppercase tracking-wider text-muted-foreground">
          {t('common.from')}
        </span>
        <span className="text-base font-medium">
          {formatPrice(service.price_from, service.currency)}
        </span>
      </div>
    </LocalizedLink>
  );
}
