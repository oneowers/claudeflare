import { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';
import { saveRunResult } from '../api';
import { testReportsKeys } from '../queryKeys';
import type { TestType } from '../types';
import type { RunProgress, RunResult } from '../runner/types';
import { runUnitChecks } from '../runner/unitChecks';
import { runLoadTest, type LoadTestOptions } from '../runner/loadTest';

export interface RunConfig {
  type: TestType;
  title: string;
  project: string | null;
  load?: LoadTestOptions;
}

export function useRunTest() {
  const qc = useQueryClient();
  const { t } = useTranslation();
  const [isRunning, setIsRunning] = useState(false);
  const [progress, setProgress] = useState<RunProgress | null>(null);

  const run = async (config: RunConfig): Promise<RunResult | null> => {
    setIsRunning(true);
    setProgress({ ratio: 0, label: '' });
    try {
      const result =
        config.type === 'unit'
          ? await runUnitChecks(setProgress)
          : await runLoadTest(config.load!, setProgress);

      await saveRunResult({
        title: config.title,
        project: config.project,
        type: config.type,
        result,
      });

      qc.invalidateQueries({ queryKey: testReportsKeys.all });

      if (result.status === 'passed') {
        toast.success(t('admin.testReports.run.successPassed'));
      } else {
        toast.warning(t('admin.testReports.run.successFailed'));
      }
      return result;
    } catch (e) {
      toast.error((e as Error).message);
      return null;
    } finally {
      setIsRunning(false);
    }
  };

  return { run, isRunning, progress };
}
