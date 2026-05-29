import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';
import { createPartner } from '../api';
import { partnersKeys } from '../queryKeys';
import type { PartnerFormValues } from '../schemas';

export function useCreatePartner() {
  const qc = useQueryClient();
  const { t } = useTranslation();
  return useMutation({
    mutationFn: (values: PartnerFormValues) => createPartner(values),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: partnersKeys.all });
      toast.success(t('admin.partners.form.createSuccess'));
    },
    onError: (e: Error) => toast.error(e.message),
  });
}
