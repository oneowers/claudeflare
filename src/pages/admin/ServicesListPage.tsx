import { useTranslation } from 'react-i18next';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useServices } from '@/features/services/hooks/useServices';
import { ServicesTable } from '@/features/services/components/ServicesTable';
import { LocalizedLink } from '@/i18n/hooks';

export function ServicesListPage() {
  const { t } = useTranslation();
  const { data, isLoading, error } = useServices();

  return (
    <div className="space-y-6">
      <header className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">
            {t('admin.services.title')}
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {t('admin.services.subtitle')}
          </p>
        </div>
        <Button asChild>
          <LocalizedLink to="/admin/services/new">
            <Plus className="h-4 w-4" />
            {t('admin.services.create')}
          </LocalizedLink>
        </Button>
      </header>

      {isLoading && (
        <div className="h-40 animate-pulse rounded-lg border border-border/60 bg-muted/40" />
      )}
      {error && (
        <p className="text-sm text-destructive">{t('admin.services.loadError')}</p>
      )}
      {data && <ServicesTable services={data} />}
    </div>
  );
}
