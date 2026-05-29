import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';
import { deleteTestReport } from '../api';
import { testReportsKeys } from '../queryKeys';
import type { TestReport } from '../types';

export function useDeleteTestReport() {
  const qc = useQueryClient();
  const { t } = useTranslation();
  return useMutation({
    mutationFn: (id: string) => deleteTestReport(id),
    onMutate: async (id) => {
      await qc.cancelQueries({ queryKey: testReportsKeys.all });
      const snapshots = qc.getQueriesData<TestReport[]>({
        queryKey: testReportsKeys.all,
      });
      qc.setQueriesData<TestReport[] | undefined>(
        { queryKey: testReportsKeys.all },
        (prev) => prev?.filter((r) => r.id !== id),
      );
      return { snapshots };
    },
    onError: (e: Error, _id, ctx) => {
      ctx?.snapshots.forEach(([key, value]) => qc.setQueryData(key, value));
      toast.error(e.message);
    },
    onSuccess: () => toast.success(t('admin.testReports.form.deleteSuccess')),
    onSettled: () => qc.invalidateQueries({ queryKey: testReportsKeys.all }),
  });
}
