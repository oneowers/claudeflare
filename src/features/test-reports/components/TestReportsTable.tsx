import { useTranslation } from 'react-i18next';
import { Pencil, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ConfirmDialog } from '@/components/shared/ConfirmDialog';
import { LocalizedLink } from '@/i18n/hooks';
import { cn } from '@/lib/utils';
import { TestStatusBadge } from './TestStatusBadge';
import { useDeleteTestReport } from '../hooks/useDeleteTestReport';
import type { TestReport, TestType, TestStatus } from '../types';

interface TestReportsTableProps {
  reports: TestReport[];
  activeType: TestType | null;
  activeStatus: TestStatus | null;
  onTypeChange: (t: TestType | null) => void;
  onStatusChange: (s: TestStatus | null) => void;
}

const TEST_TYPES: TestType[] = ['unit', 'load'];
const TEST_STATUSES: TestStatus[] = ['passed', 'failed', 'in_progress', 'error'];

function chip(active: boolean) {
  return cn(
    'rounded-md px-2.5 py-1 text-xs font-medium transition-colors',
    active
      ? 'bg-primary text-primary-foreground'
      : 'border border-border/60 text-muted-foreground hover:text-foreground',
  );
}

function fmt(n: number | null, suffix = '') {
  if (n == null) return '—';
  return `${n}${suffix}`;
}

export function TestReportsTable({
  reports,
  activeType,
  activeStatus,
  onTypeChange,
  onStatusChange,
}: TestReportsTableProps) {
  const { t } = useTranslation();
  const remove = useDeleteTestReport();

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex flex-wrap gap-1.5">
          <button type="button" className={chip(activeType === null)} onClick={() => onTypeChange(null)}>
            {t('testReports.allTypes')}
          </button>
          {TEST_TYPES.map((tp) => (
            <button key={tp} type="button" className={chip(activeType === tp)} onClick={() => onTypeChange(tp)}>
              {t(`testType.${tp}`)}
            </button>
          ))}
        </div>
        <div className="h-4 w-px bg-border/60" />
        <div className="flex flex-wrap gap-1.5">
          <button type="button" className={chip(activeStatus === null)} onClick={() => onStatusChange(null)}>
            {t('testReports.allStatuses')}
          </button>
          {TEST_STATUSES.map((st) => (
            <button key={st} type="button" className={chip(activeStatus === st)} onClick={() => onStatusChange(st)}>
              {t(`testStatus.${st}`)}
            </button>
          ))}
        </div>
      </div>

      {reports.length === 0 ? (
        <div className="rounded-lg border border-dashed border-border/60 p-12 text-center text-sm text-muted-foreground">
          {t('admin.testReports.empty')}
        </div>
      ) : (
        <div className="overflow-hidden rounded-lg border border-border/60">
          <table className="w-full text-sm">
            <thead className="bg-muted/50 text-left text-xs uppercase tracking-wider text-muted-foreground">
              <tr>
                <th className="px-4 py-3 font-medium">{t('admin.testReports.table.title')}</th>
                <th className="px-4 py-3 font-medium">{t('admin.testReports.table.type')}</th>
                <th className="px-4 py-3 font-medium">{t('admin.testReports.table.status')}</th>
                <th className="px-4 py-3 font-medium">{t('admin.testReports.table.metrics')}</th>
                <th className="px-4 py-3 font-medium">{t('admin.testReports.table.runAt')}</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {reports.map((r) => (
                <tr key={r.id} className="bg-background">
                  <td className="px-4 py-3">
                    <div className="font-medium">{r.title}</div>
                    {r.project && (
                      <div className="text-xs text-muted-foreground">{r.project}</div>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <span className="rounded border border-border/60 bg-muted px-2 py-0.5 text-xs">
                      {t(`testType.${r.type}`)}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <TestStatusBadge status={r.status} />
                  </td>
                  <td className="px-4 py-3 text-xs text-muted-foreground tabular-nums">
                    {r.type === 'unit' ? (
                      <span>
                        {r.passed_tests != null && r.total_tests != null
                          ? `${r.passed_tests}/${r.total_tests} ${t('admin.testReports.table.tests')}`
                          : '—'}
                        {r.coverage_pct != null && ` · ${r.coverage_pct}%`}
                      </span>
                    ) : (
                      <span>
                        {fmt(r.requests_per_sec, ' rps')}
                        {r.error_rate != null && ` · ${r.error_rate}% err`}
                      </span>
                    )}
                    {r.duration_ms != null && (
                      <span className="ml-1 text-muted-foreground/70">
                        {r.duration_ms >= 1000
                          ? ` ${(r.duration_ms / 1000).toFixed(1)}s`
                          : ` ${r.duration_ms}ms`}
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-xs text-muted-foreground">
                    {new Date(r.run_at).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex justify-end gap-1">
                      <Button asChild variant="ghost" size="icon" aria-label={t('common.edit')}>
                        <LocalizedLink to={`/admin/test-reports/${r.id}/edit`}>
                          <Pencil className="h-4 w-4" />
                        </LocalizedLink>
                      </Button>
                      <ConfirmDialog
                        title={t('admin.testReports.deleteTitle')}
                        description={t('admin.testReports.deleteDescription', { title: r.title })}
                        confirmLabel={t('common.delete')}
                        cancelLabel={t('common.cancel')}
                        onConfirm={() => remove.mutate(r.id)}
                      >
                        <Button variant="ghost" size="icon" aria-label={t('common.delete')}>
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </ConfirmDialog>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
