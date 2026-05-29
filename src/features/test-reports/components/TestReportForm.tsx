import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslation } from 'react-i18next';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useLocalizedNavigate } from '@/i18n/hooks';
import { testReportSchema, type TestReportFormValues } from '../schemas';
import { useCreateTestReport } from '../hooks/useCreateTestReport';
import { useUpdateTestReport } from '../hooks/useUpdateTestReport';
import type { TestReport } from '../types';

interface TestReportFormProps {
  report?: TestReport;
}

function nowLocal() {
  const d = new Date();
  d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
  return d.toISOString().slice(0, 16);
}

export function TestReportForm({ report }: TestReportFormProps) {
  const navigate = useLocalizedNavigate();
  const { t } = useTranslation();
  const isEdit = Boolean(report);
  const create = useCreateTestReport();
  const update = useUpdateTestReport(report?.id ?? '');

  const form = useForm<TestReportFormValues>({
    resolver: zodResolver(testReportSchema),
    defaultValues: {
      title: report?.title ?? '',
      project: report?.project ?? '',
      type: report?.type ?? 'unit',
      status: report?.status ?? 'in_progress',
      total_tests: report?.total_tests ?? '',
      passed_tests: report?.passed_tests ?? '',
      coverage_pct: report?.coverage_pct ?? '',
      requests_per_sec: report?.requests_per_sec ?? '',
      error_rate: report?.error_rate ?? '',
      total_requests: report?.total_requests ?? '',
      duration_ms: report?.duration_ms ?? '',
      notes: report?.notes ?? '',
      run_at: report?.run_at
        ? new Date(report.run_at).toISOString().slice(0, 16)
        : nowLocal(),
    },
  });

  const isPending = create.isPending || update.isPending;
  const watchedType = form.watch('type');

  const onSubmit = (values: TestReportFormValues) => {
    const onSuccess = () => navigate('/admin/test-reports');
    if (isEdit) update.mutate(values, { onSuccess });
    else create.mutate(values, { onSuccess });
  };

  const err = (msg?: string) => (msg ? t(msg) : '');

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="max-w-2xl space-y-6">
      {/* Basic info */}
      <div className="space-y-4 rounded-lg border border-border/60 bg-muted/20 p-4">
        <div className="space-y-1.5">
          <Label htmlFor="title">{t('admin.testReports.form.fields.title')} *</Label>
          <Input id="title" {...form.register('title')} />
          {form.formState.errors.title && (
            <p className="text-xs text-destructive">{err(form.formState.errors.title.message)}</p>
          )}
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="project">{t('admin.testReports.form.fields.project')}</Label>
          <Input id="project" {...form.register('project')} placeholder={t('admin.testReports.form.fields.projectPlaceholder')} />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-[1fr_1fr_180px]">
          <div className="space-y-1.5">
            <Label htmlFor="type">{t('admin.testReports.form.fields.type')}</Label>
            <select
              id="type"
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              {...form.register('type')}
            >
              <option value="unit">{t('testType.unit')}</option>
              <option value="load">{t('testType.load')}</option>
            </select>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="status">{t('admin.testReports.form.fields.status')}</Label>
            <select
              id="status"
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              {...form.register('status')}
            >
              <option value="passed">{t('testStatus.passed')}</option>
              <option value="failed">{t('testStatus.failed')}</option>
              <option value="in_progress">{t('testStatus.in_progress')}</option>
              <option value="error">{t('testStatus.error')}</option>
            </select>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="run_at">{t('admin.testReports.form.fields.runAt')}</Label>
            <Input id="run_at" type="datetime-local" {...form.register('run_at')} />
          </div>
        </div>
      </div>

      {/* Metrics — unit */}
      {watchedType === 'unit' && (
        <div className="space-y-4 rounded-lg border border-border/60 bg-muted/20 p-4">
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            {t('admin.testReports.form.unitMetrics')}
          </p>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="space-y-1.5">
              <Label htmlFor="total_tests">{t('admin.testReports.form.fields.totalTests')}</Label>
              <Input id="total_tests" type="number" min="0" {...form.register('total_tests')} />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="passed_tests">{t('admin.testReports.form.fields.passedTests')}</Label>
              <Input id="passed_tests" type="number" min="0" {...form.register('passed_tests')} />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="coverage_pct">{t('admin.testReports.form.fields.coveragePct')}</Label>
              <div className="flex items-center gap-1.5">
                <Input id="coverage_pct" type="number" step="0.01" min="0" max="100" {...form.register('coverage_pct')} />
                <span className="text-sm text-muted-foreground">%</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Metrics — load */}
      {watchedType === 'load' && (
        <div className="space-y-4 rounded-lg border border-border/60 bg-muted/20 p-4">
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            {t('admin.testReports.form.loadMetrics')}
          </p>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="space-y-1.5">
              <Label htmlFor="requests_per_sec">{t('admin.testReports.form.fields.requestsPerSec')}</Label>
              <div className="flex items-center gap-1.5">
                <Input id="requests_per_sec" type="number" step="0.01" min="0" {...form.register('requests_per_sec')} />
                <span className="shrink-0 text-sm text-muted-foreground">rps</span>
              </div>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="total_requests">{t('admin.testReports.form.fields.totalRequests')}</Label>
              <Input id="total_requests" type="number" min="0" {...form.register('total_requests')} />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="error_rate">{t('admin.testReports.form.fields.errorRate')}</Label>
              <div className="flex items-center gap-1.5">
                <Input id="error_rate" type="number" step="0.01" min="0" max="100" {...form.register('error_rate')} />
                <span className="text-sm text-muted-foreground">%</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Shared metric + notes */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-[180px_1fr]">
        <div className="space-y-1.5">
          <Label htmlFor="duration_ms">{t('admin.testReports.form.fields.durationMs')}</Label>
          <div className="flex items-center gap-1.5">
            <Input id="duration_ms" type="number" min="0" {...form.register('duration_ms')} />
            <span className="shrink-0 text-sm text-muted-foreground">ms</span>
          </div>
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="notes">{t('admin.testReports.form.fields.notes')}</Label>
          <Textarea id="notes" rows={3} {...form.register('notes')} />
        </div>
      </div>

      <div className="flex gap-3">
        <Button type="submit" disabled={isPending}>
          {isPending
            ? t('common.saving')
            : isEdit
              ? t('admin.testReports.form.submitEdit')
              : t('admin.testReports.form.submitCreate')}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => navigate('/admin/test-reports')}
        >
          {t('common.cancel')}
        </Button>
      </div>
    </form>
  );
}
