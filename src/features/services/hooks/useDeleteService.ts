import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';
import { deleteService } from '../api';
import { servicesKeys } from '../queryKeys';
import type { Service } from '../types';

export function useDeleteService() {
  const qc = useQueryClient();
  const { t } = useTranslation();
  return useMutation({
    mutationFn: (id: string) => deleteService(id),
    onMutate: async (id) => {
      await qc.cancelQueries({ queryKey: servicesKeys.all });
      const snapshots = qc.getQueriesData<Service[]>({
        queryKey: servicesKeys.all,
      });
      qc.setQueriesData<Service[] | undefined>(
        { queryKey: servicesKeys.all },
        (prev) => prev?.filter((s) => s.id !== id),
      );
      return { snapshots };
    },
    onError: (e: Error, _id, ctx) => {
      ctx?.snapshots.forEach(([key, value]) => qc.setQueryData(key, value));
      toast.error(e.message);
    },
    onSuccess: () => toast.success(t('admin.services.form.deleteSuccess')),
    onSettled: () => qc.invalidateQueries({ queryKey: servicesKeys.all }),
  });
}
