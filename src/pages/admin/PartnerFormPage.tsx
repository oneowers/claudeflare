import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowLeft } from 'lucide-react';
import { usePartnerById } from '@/features/partners/hooks/usePartners';
import { PartnerForm } from '@/features/partners/components/PartnerForm';
import { LocalizedLink } from '@/i18n/hooks';

export function PartnerFormPage() {
  const { id } = useParams();
  const { t } = useTranslation();
  const isEdit = Boolean(id);
  const { data, isLoading, error } = usePartnerById(id);

  return (
    <div className="space-y-6">
      <LocalizedLink
        to="/admin/partners"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        {t('admin.partners.form.backToList')}
      </LocalizedLink>

      <header>
        <h1 className="text-3xl font-semibold tracking-tight">
          {isEdit
            ? t('admin.partners.form.editTitle')
            : t('admin.partners.form.newTitle')}
        </h1>
      </header>

      {isEdit && isLoading && (
        <div className="h-64 animate-pulse rounded-lg bg-muted/40" />
      )}
      {isEdit && error && (
        <p className="text-sm text-destructive">
          {t('admin.partners.form.loadError')}
        </p>
      )}
      {(!isEdit || data) && <PartnerForm partner={data ?? undefined} />}
    </div>
  );
}
