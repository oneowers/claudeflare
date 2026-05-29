import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';
import { updatePartner } from '../api';
import { partnersKeys } from '../queryKeys';
import type { PartnerFormValues } from '../schemas';

export function useUpdatePartner(id: string) {
  const qc = useQueryClient();
  const { t } = useTranslation();
  return useMutation({
    mutationFn: (values: PartnerFormValues) => updatePartner(id, values),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: partnersKeys.all });
      toast.success(t('admin.partners.form.updateSuccess'));
    },
    onError: (e: Error) => toast.error(e.message),
  });
}
