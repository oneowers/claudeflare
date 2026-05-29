import { useTranslation } from 'react-i18next';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { usePartners } from '@/features/partners/hooks/usePartners';
import { PartnersTable } from '@/features/partners/components/PartnersTable';
import { LocalizedLink } from '@/i18n/hooks';

export function PartnersListPage() {
  const { t } = useTranslation();
  const { data, isLoading, error } = usePartners();

  return (
    <div className="space-y-6">
      <header className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">
            {t('admin.partners.title')}
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {t('admin.partners.subtitle')}
          </p>
        </div>
        <Button asChild>
          <LocalizedLink to="/admin/partners/new">
            <Plus className="h-4 w-4" />
            {t('admin.partners.create')}
          </LocalizedLink>
        </Button>
      </header>

      {isLoading && (
        <div className="h-40 animate-pulse rounded-lg border border-border/60 bg-muted/40" />
      )}
      {error && (
        <p className="text-sm text-destructive">{t('admin.partners.loadError')}</p>
      )}
      {data && <PartnersTable partners={data} />}
    </div>
  );
}
