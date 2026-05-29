import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';
import { createTestReport } from '../api';
import { testReportsKeys } from '../queryKeys';
import type { TestReportFormValues } from '../schemas';

export function useCreateTestReport() {
  const qc = useQueryClient();
  const { t } = useTranslation();
  return useMutation({
    mutationFn: (values: TestReportFormValues) => createTestReport(values),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: testReportsKeys.all });
      toast.success(t('admin.testReports.form.createSuccess'));
    },
    onError: (e: Error) => toast.error(e.message),
  });
}
