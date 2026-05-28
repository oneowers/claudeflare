import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';
import { updateLead } from '../api';
import { leadsKeys } from '../queryKeys';
import type { LeadUpdateValues } from '../schemas';

export function useUpdateLead(id: string) {
  const qc = useQueryClient();
  const { t } = useTranslation();
  return useMutation({
    mutationFn: (values: LeadUpdateValues) => updateLead(id, values),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: leadsKeys.all });
      toast.success(t('admin.leads.detail.updateSuccess'));
    },
    onError: (e: Error) => toast.error(e.message),
  });
}
