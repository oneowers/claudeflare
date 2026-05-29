import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTestReports } from '@/features/test-reports/hooks/useTestReports';
import { TestReportsTable } from '@/features/test-reports/components/TestReportsTable';
import { RunTestDialog } from '@/features/test-reports/components/RunTestDialog';
import { LocalizedLink } from '@/i18n/hooks';
import type { TestType, TestStatus } from '@/features/test-reports/types';

export function TestReportsListPage() {
  const { t } = useTranslation();
  const [activeType, setActiveType] = useState<TestType | null>(null);
  const [activeStatus, setActiveStatus] = useState<TestStatus | null>(null);
  const { data, isLoading, error } = useTestReports({
    type: activeType ?? undefined,
    status: activeStatus ?? undefined,
  });

  return (
    <div className="space-y-6">
      <header className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">
            {t('admin.testReports.title')}
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {t('admin.testReports.subtitle')}
          </p>
        </div>
        <div className="flex gap-2">
          <RunTestDialog />
          <Button asChild>
            <LocalizedLink to="/admin/test-reports/new">
              <Plus className="h-4 w-4" />
              {t('admin.testReports.create')}
            </LocalizedLink>
          </Button>
        </div>
      </header>

      {isLoading && (
        <div className="h-40 animate-pulse rounded-lg border border-border/60 bg-muted/40" />
      )}
      {error && (
        <p className="text-sm text-destructive">{t('admin.testReports.loadError')}</p>
      )}
      {data && (
        <TestReportsTable
          reports={data}
          activeType={activeType}
          activeStatus={activeStatus}
          onTypeChange={setActiveType}
          onStatusChange={setActiveStatus}
        />
      )}
    </div>
  );
}
