import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowLeft } from 'lucide-react';
import { useServiceById } from '@/features/services/hooks/useService';
import { ServiceForm } from '@/features/services/components/ServiceForm';
import { LocalizedLink } from '@/i18n/hooks';

export function ServiceFormPage() {
  const { id } = useParams();
  const { t } = useTranslation();
  const isEdit = Boolean(id);
  const { data, isLoading, error } = useServiceById(id);

  return (
    <div className="space-y-6">
      <LocalizedLink
        to="/admin/services"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        {t('admin.services.form.backToList')}
      </LocalizedLink>

      <header>
        <h1 className="text-3xl font-semibold tracking-tight">
          {isEdit
            ? t('admin.services.form.editTitle')
            : t('admin.services.form.newTitle')}
        </h1>
      </header>

      {isEdit && isLoading && (
        <div className="h-96 animate-pulse rounded-lg bg-muted/40" />
      )}
      {isEdit && error && (
        <p className="text-sm text-destructive">
          {t('admin.services.form.loadError')}
        </p>
      )}
      {(!isEdit || data) && <ServiceForm service={data ?? undefined} />}
    </div>
  );
}
