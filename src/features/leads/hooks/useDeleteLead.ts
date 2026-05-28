import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';
import { deleteLead } from '../api';
import { leadsKeys } from '../queryKeys';

export function useDeleteLead() {
  const qc = useQueryClient();
  const { t } = useTranslation();
  return useMutation({
    mutationFn: (id: string) => deleteLead(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: leadsKeys.all });
      toast.success(t('admin.leads.detail.deleteSuccess'));
    },
    onError: (e: Error) => toast.error(e.message),
  });
}
