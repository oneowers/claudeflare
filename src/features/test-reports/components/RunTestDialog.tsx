import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Play, Loader2 } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { env } from '@/lib/env';
import { UNIT_CHECKS } from '../runner/unitChecks';
import { useRunTest } from '../hooks/useRunTest';
import type { TestType } from '../types';

const DEFAULT_LOAD_URL = `${env.VITE_SUPABASE_URL}/rest/v1/categories?select=id&limit=1`;

export function RunTestDialog() {
  const { t } = useTranslation();
  const { run, isRunning, progress } = useRunTest();
  const [open, setOpen] = useState(false);

  const [type, setType] = useState<TestType>('unit');
  const [url, setUrl] = useState(DEFAULT_LOAD_URL);
  const [totalRequests, setTotalRequests] = useState(50);
  const [concurrency, setConcurrency] = useState(10);

  const handleRun = async () => {
    const isSupabase = url.startsWith(env.VITE_SUPABASE_URL);
    const headers: Record<string, string> = isSupabase
      ? {
          apikey: env.VITE_SUPABASE_ANON_KEY,
          Authorization: `Bearer ${env.VITE_SUPABASE_ANON_KEY}`,
        }
      : {};

    const result = await run({
      type,
      title:
        type === 'unit'
          ? t('admin.testReports.run.unitTitle')
          : t('admin.testReports.run.loadTitle'),
      project: type === 'load' ? url : null,
      load:
        type === 'load'
          ? {
              url,
              headers,
              totalRequests: Math.max(1, Math.min(1000, totalRequests)),
              concurrency: Math.max(1, Math.min(50, concurrency)),
            }
          : undefined,
    });
    if (result) setOpen(false);
  };

  const pct = Math.round((progress?.ratio ?? 0) * 100);

  return (
    <Dialog open={open} onOpenChange={(v) => !isRunning && setOpen(v)}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Play className="h-4 w-4" />
          {t('admin.testReports.run.button')}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t('admin.testReports.run.title')}</DialogTitle>
          <DialogDescription>{t('admin.testReports.run.description')}</DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-2">
          {/* Type */}
          <div className="space-y-1.5">
            <Label htmlFor="run-type">{t('admin.testReports.form.fields.type')}</Label>
            <select
              id="run-type"
              disabled={isRunning}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              value={type}
              onChange={(e) => setType(e.target.value as TestType)}
            >
              <option value="unit">{t('testType.unit')}</option>
              <option value="load">{t('testType.load')}</option>
            </select>
          </div>

          {type === 'unit' ? (
            <p className="rounded-md border border-border/60 bg-muted/30 px-3 py-2 text-xs text-muted-foreground">
              {t('admin.testReports.run.unitHint', { count: UNIT_CHECKS.length })}
            </p>
          ) : (
            <>
              <div className="space-y-1.5">
                <Label htmlFor="run-url">{t('admin.testReports.run.targetUrl')}</Label>
                <Input
                  id="run-url"
                  disabled={isRunning}
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="run-total">{t('admin.testReports.run.totalRequests')}</Label>
                  <Input
                    id="run-total"
                    type="number"
                    min="1"
                    max="1000"
                    disabled={isRunning}
                    value={totalRequests}
                    onChange={(e) => setTotalRequests(Number(e.target.value))}
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="run-conc">{t('admin.testReports.run.concurrency')}</Label>
                  <Input
                    id="run-conc"
                    type="number"
                    min="1"
                    max="50"
                    disabled={isRunning}
                    value={concurrency}
                    onChange={(e) => setConcurrency(Number(e.target.value))}
                  />
                </div>
              </div>
            </>
          )}

          {/* Progress */}
          {isRunning && (
            <div className="space-y-1.5">
              <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                <div
                  className="h-full bg-primary transition-all duration-150"
                  style={{ width: `${pct}%` }}
                />
              </div>
              <p className="truncate text-xs text-muted-foreground">
                {pct}% · {progress?.label}
              </p>
            </div>
          )}
        </div>

        <DialogFooter>
          <Button type="button" variant="outline" disabled={isRunning} onClick={() => setOpen(false)}>
            {t('common.cancel')}
          </Button>
          <Button type="button" disabled={isRunning} onClick={handleRun}>
            {isRunning ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                {t('admin.testReports.run.running')}
              </>
            ) : (
              <>
                <Play className="h-4 w-4" />
                {t('admin.testReports.run.start')}
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
