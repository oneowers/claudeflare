import { useTranslation } from 'react-i18next';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { usePortfolio } from '@/features/portfolio/hooks/usePortfolio';
import { PortfolioTable } from '@/features/portfolio/components/PortfolioTable';
import { LocalizedLink } from '@/i18n/hooks';

export function PortfolioListPage() {
  const { t } = useTranslation();
  const { data, isLoading, error } = usePortfolio();

  return (
    <div className="space-y-6">
      <header className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">
            {t('admin.portfolio.title')}
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {t('admin.portfolio.subtitle')}
          </p>
        </div>
        <Button asChild>
          <LocalizedLink to="/admin/portfolio/new">
            <Plus className="h-4 w-4" />
            {t('admin.portfolio.create')}
          </LocalizedLink>
        </Button>
      </header>

      {isLoading && (
        <div className="h-40 animate-pulse rounded-lg border border-border/60 bg-muted/40" />
      )}
      {error && (
        <p className="text-sm text-destructive">{t('admin.portfolio.loadError')}</p>
      )}
      {data && <PortfolioTable items={data} />}
    </div>
  );
}
