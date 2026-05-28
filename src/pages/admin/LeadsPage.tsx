import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLeads } from '@/features/leads/hooks/useLeads';
import { LeadsTable } from '@/features/leads/components/LeadsTable';
import type { LeadStatus } from '@/features/leads/types';
import { LEAD_STATUSES } from '@/features/leads/types';
import { cn } from '@/lib/utils';

type Filter = LeadStatus | 'all';

export function LeadsPage() {
  const { t } = useTranslation();
  const [filter, setFilter] = useState<Filter>('all');
  const { data, isLoading, error } = useLeads(filter);

  const tabs: { value: Filter; label: string }[] = [
    { value: 'all', label: t('admin.leads.tabs.all') },
    ...LEAD_STATUSES.map((s) => ({ value: s, label: t(`leadStatus.${s}`) })),
  ];

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-semibold tracking-tight">
          {t('admin.leads.title')}
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {t('admin.leads.subtitle')}
        </p>
      </header>

      <div className="flex flex-wrap gap-2 border-b border-border/60 pb-3">
        {tabs.map((tab) => (
          <button
            key={tab.value}
            type="button"
            onClick={() => setFilter(tab.value)}
            className={cn(
              'rounded-md px-3 py-1.5 text-sm transition-colors',
              filter === tab.value
                ? 'bg-primary text-primary-foreground'
                : 'text-muted-foreground hover:text-foreground',
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {isLoading && (
        <div className="h-40 animate-pulse rounded-lg border border-border/60 bg-muted/40" />
      )}
      {error && (
        <p className="text-sm text-destructive">{t('admin.leads.loadError')}</p>
      )}
      {data && <LeadsTable leads={data} />}
    </div>
  );
}
