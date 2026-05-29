import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowLeft } from 'lucide-react';
import { useTestReportById } from '@/features/test-reports/hooks/useTestReport';
import { TestReportForm } from '@/features/test-reports/components/TestReportForm';
import { LocalizedLink } from '@/i18n/hooks';

export function TestReportFormPage() {
  const { id } = useParams();
  const { t } = useTranslation();
  const isEdit = Boolean(id);
  const { data, isLoading, error } = useTestReportById(id);

  return (
    <div className="space-y-6">
      <LocalizedLink
        to="/admin/test-reports"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        {t('admin.testReports.form.backToList')}
      </LocalizedLink>

      <header>
        <h1 className="text-3xl font-semibold tracking-tight">
          {isEdit
            ? t('admin.testReports.form.editTitle')
            : t('admin.testReports.form.newTitle')}
        </h1>
      </header>

      {isEdit && isLoading && (
        <div className="h-64 animate-pulse rounded-lg bg-muted/40" />
      )}
      {isEdit && error && (
        <p className="text-sm text-destructive">
          {t('admin.testReports.form.loadError')}
        </p>
      )}
      {(!isEdit || data) && <TestReportForm report={data ?? undefined} />}
    </div>
  );
}
