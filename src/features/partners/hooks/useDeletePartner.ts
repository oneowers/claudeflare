import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';
import { deletePartner } from '../api';
import { partnersKeys } from '../queryKeys';
import type { Partner } from '../types';

export function useDeletePartner() {
  const qc = useQueryClient();
  const { t } = useTranslation();
  return useMutation({
    mutationFn: (id: string) => deletePartner(id),
    onMutate: async (id) => {
      await qc.cancelQueries({ queryKey: partnersKeys.all });
      const snapshots = qc.getQueriesData<Partner[]>({ queryKey: partnersKeys.all });
      qc.setQueriesData<Partner[] | undefined>(
        { queryKey: partnersKeys.all },
        (prev) => prev?.filter((p) => p.id !== id),
      );
      return { snapshots };
    },
    onError: (e: Error, _id, ctx) => {
      ctx?.snapshots.forEach(([key, value]) => qc.setQueryData(key, value));
      toast.error(e.message);
    },
    onSuccess: () => toast.success(t('admin.partners.form.deleteSuccess')),
    onSettled: () => qc.invalidateQueries({ queryKey: partnersKeys.all }),
  });
}
