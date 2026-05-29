import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowLeft } from 'lucide-react';
import { useCategoryById } from '@/features/categories/hooks/useCategory';
import { CategoryForm } from '@/features/categories/components/CategoryForm';
import { LocalizedLink } from '@/i18n/hooks';

export function CategoryFormPage() {
  const { id } = useParams();
  const { t } = useTranslation();
  const isEdit = Boolean(id);
  const { data, isLoading, error } = useCategoryById(id);

  return (
    <div className="space-y-6">
      <LocalizedLink
        to="/admin/categories"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        {t('admin.categories.form.backToList')}
      </LocalizedLink>

      <header>
        <h1 className="text-3xl font-semibold tracking-tight">
          {isEdit
            ? t('admin.categories.form.editTitle')
            : t('admin.categories.form.newTitle')}
        </h1>
      </header>

      {isEdit && isLoading && (
        <div className="h-48 animate-pulse rounded-lg bg-muted/40" />
      )}
      {isEdit && error && (
        <p className="text-sm text-destructive">
          {t('admin.categories.form.loadError')}
        </p>
      )}
      {(!isEdit || data) && <CategoryForm category={data ?? undefined} />}
    </div>
  );
}
