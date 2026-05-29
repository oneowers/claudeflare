import { useTranslation } from 'react-i18next';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCategories } from '@/features/categories/hooks/useCategories';
import { CategoriesTable } from '@/features/categories/components/CategoriesTable';
import { LocalizedLink } from '@/i18n/hooks';

export function CategoriesListPage() {
  const { t } = useTranslation();
  const { data, isLoading, error } = useCategories();

  return (
    <div className="space-y-6">
      <header className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">
            {t('admin.categories.title')}
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {t('admin.categories.subtitle')}
          </p>
        </div>
        <Button asChild>
          <LocalizedLink to="/admin/categories/new">
            <Plus className="h-4 w-4" />
            {t('admin.categories.create')}
          </LocalizedLink>
        </Button>
      </header>

      {isLoading && (
        <div className="h-40 animate-pulse rounded-lg border border-border/60 bg-muted/40" />
      )}
      {error && (
        <p className="text-sm text-destructive">{t('admin.categories.loadError')}</p>
      )}
      {data && <CategoriesTable categories={data} />}
    </div>
  );
}
