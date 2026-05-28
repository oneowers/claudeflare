import { useTranslation } from 'react-i18next';
import { useLeadCounts } from '@/features/leads/hooks/useLeadCounts';
import { useLeads } from '@/features/leads/hooks/useLeads';
import { useServices } from '@/features/services/hooks/useServices';
import { usePortfolio } from '@/features/portfolio/hooks/usePortfolio';
import { LEAD_STATUSES } from '@/features/leads/types';
import { LeadsTable } from '@/features/leads/components/LeadsTable';
import { LocalizedLink } from '@/i18n/hooks';

export function DashboardPage() {
  const { t } = useTranslation();
  const counts = useLeadCounts();
  const services = useServices();
  const portfolio = usePortfolio();
  const recentLeads = useLeads('new');

  const recent = (recentLeads.data ?? []).slice(0, 5);

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl font-semibold tracking-tight">
          {t('admin.dashboard.title')}
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {t('admin.dashboard.subtitle')}
        </p>
      </header>

      <section className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {LEAD_STATUSES.map((status) => (
          <LocalizedLink
            key={status}
            to="/admin/leads"
            className="rounded-lg border border-border/60 bg-background p-5 transition-colors hover:border-foreground/30"
          >
            <p className="text-xs uppercase tracking-wider text-muted-foreground">
              {t(`leadStatus.${status}`)}
            </p>
            <p className="mt-2 text-3xl font-semibold tabular-nums">
              {counts.data?.[status] ?? '—'}
            </p>
          </LocalizedLink>
        ))}
      </section>

      <section className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <LocalizedLink
          to="/admin/services"
          className="rounded-lg border border-border/60 bg-background p-5 transition-colors hover:border-foreground/30"
        >
          <p className="text-xs uppercase tracking-wider text-muted-foreground">
            {t('admin.dashboard.servicesCount')}
          </p>
          <p className="mt-2 text-3xl font-semibold tabular-nums">
            {services.data?.length ?? '—'}
          </p>
        </LocalizedLink>
        <LocalizedLink
          to="/admin/portfolio"
          className="rounded-lg border border-border/60 bg-background p-5 transition-colors hover:border-foreground/30"
        >
          <p className="text-xs uppercase tracking-wider text-muted-foreground">
            {t('admin.dashboard.portfolioCount')}
          </p>
          <p className="mt-2 text-3xl font-semibold tabular-nums">
            {portfolio.data?.length ?? '—'}
          </p>
        </LocalizedLink>
      </section>

      <section className="space-y-4">
        <div className="flex items-end justify-between">
          <h2 className="text-lg font-semibold tracking-tight">
            {t('admin.dashboard.newLeadsTitle')}
          </h2>
          <LocalizedLink
            to="/admin/leads"
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            {t('admin.dashboard.allLeads')}
          </LocalizedLink>
        </div>
        {recentLeads.isLoading && (
          <div className="h-32 animate-pulse rounded-lg border border-border/60 bg-muted/40" />
        )}
        {recent.length > 0 && <LeadsTable leads={recent} />}
        {recentLeads.data && recent.length === 0 && (
          <p className="text-sm text-muted-foreground">
            {t('admin.dashboard.noNewLeads')}
          </p>
        )}
      </section>
    </div>
  );
}
