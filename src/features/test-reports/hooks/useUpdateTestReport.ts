import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';
import { updateTestReport } from '../api';
import { testReportsKeys } from '../queryKeys';
import type { TestReportFormValues } from '../schemas';

export function useUpdateTestReport(id: string) {
  const qc = useQueryClient();
  const { t } = useTranslation();
  return useMutation({
    mutationFn: (values: TestReportFormValues) => updateTestReport(id, values),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: testReportsKeys.all });
      toast.success(t('admin.testReports.form.updateSuccess'));
    },
    onError: (e: Error) => toast.error(e.message),
  });
}
