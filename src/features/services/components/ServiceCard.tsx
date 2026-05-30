import { useTranslation } from 'react-i18next';
import { ArrowUpRight } from 'lucide-react';
import { formatPrice } from '@/lib/utils';
import { LocalizedLink, useCurrentLanguage } from '@/i18n/hooks';
import { pickLocale } from '@/i18n/localized';
import { cn } from '@/lib/utils';
import type { Service } from '../types';

type Tone = 'dark' | 'violet' | 'cream';

interface ServiceCardProps {
  service: Service;
  /** Position in the grid; drives the dark/violet/cream feed rhythm. */
  index?: number;
}

/** Deterministic feed rhythm: mostly dark, a violet beat, a rare cream accent. */
function toneFor(index?: number): Tone {
  if (index == null) return 'dark';
  const slot = index % 6;
  if (slot === 1) return 'violet';
  if (slot === 4) return 'cream';
  return 'dark';
}

const TONE: Record<
  Tone,
  { card: string; title: string; body: string; label: string; price: string; chip: string }
> = {
  dark: {
    card: 'border border-white/10 bg-surface hover:border-white/20',
    title: 'text-foreground',
    body: 'text-muted-foreground',
    label: 'text-foreground/60',
    price: 'text-foreground',
    chip: 'bg-white/[0.06] text-foreground/70 group-hover:bg-violet group-hover:text-white',
  },
  violet: {
    card: 'bg-violet hover:bg-violet-deep',
    title: 'text-white',
    body: 'text-white/80',
    label: 'text-white/65',
    price: 'text-white',
    chip: 'bg-white/15 text-white group-hover:bg-white group-hover:text-violet',
  },
  cream: {
    card: 'bg-cream hover:bg-cream/90',
    title: 'text-ink',
    body: 'text-ink/70',
    label: 'text-ink/55',
    price: 'text-ink',
    chip: 'bg-ink/10 text-ink group-hover:bg-ink group-hover:text-cream',
  },
};

export function ServiceCard({ service, index }: ServiceCardProps) {
  const { t } = useTranslation();
  const lang = useCurrentLanguage();
  const title = pickLocale(service.name, lang) ?? '';
  const tone = TONE[toneFor(index)];

  return (
    <LocalizedLink
      to={`/services/${service.slug}`}
      className={cn(
        'group flex flex-col rounded-card p-7 transition-all duration-300 ease-brand hover:-translate-y-1',
        tone.card,
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <h3 className={cn('font-display text-2xl font-bold leading-[1.1] tracking-tight text-balance', tone.title)}>
          {title}
        </h3>
        <span
          className={cn(
            'grid h-9 w-9 shrink-0 place-items-center rounded-full transition-all duration-300',
            tone.chip,
          )}
        >
          <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </span>
      </div>

      <p className={cn('mt-3 flex-1 text-[15px] leading-relaxed', tone.body)}>
        {pickLocale(service.short_description, lang)}
      </p>

      <div className="mt-7 flex items-baseline gap-2">
        <span className={cn('text-xs uppercase tracking-wide', tone.label)}>
          {t('common.from')}
        </span>
        <span className={cn('font-display text-xl font-bold tabular-nums', tone.price)}>
          {formatPrice(service.price_from, service.currency)}
        </span>
      </div>
    </LocalizedLink>
  );
}
