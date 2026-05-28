import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowLeft } from 'lucide-react';
import { usePortfolioById } from '@/features/portfolio/hooks/usePortfolio';
import { PortfolioForm } from '@/features/portfolio/components/PortfolioForm';
import { LocalizedLink } from '@/i18n/hooks';

export function PortfolioFormPage() {
  const { id } = useParams();
  const { t } = useTranslation();
  const isEdit = Boolean(id);
  const { data, isLoading, error } = usePortfolioById(id);

  return (
    <div className="space-y-6">
      <LocalizedLink
        to="/admin/portfolio"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        {t('admin.portfolio.form.backToList')}
      </LocalizedLink>

      <header>
        <h1 className="text-3xl font-semibold tracking-tight">
          {isEdit
            ? t('admin.portfolio.form.editTitle')
            : t('admin.portfolio.form.newTitle')}
        </h1>
      </header>

      {isEdit && isLoading && (
        <div className="h-96 animate-pulse rounded-lg bg-muted/40" />
      )}
      {isEdit && error && (
        <p className="text-sm text-destructive">
          {t('admin.portfolio.form.loadError')}
        </p>
      )}
      {(!isEdit || data) && <PortfolioForm item={data ?? undefined} />}
    </div>
  );
}
