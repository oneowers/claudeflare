import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';
import { updateService } from '../api';
import { servicesKeys } from '../queryKeys';
import type { ServiceFormValues } from '../schemas';

export function useUpdateService(id: string) {
  const qc = useQueryClient();
  const { t } = useTranslation();
  return useMutation({
    mutationFn: (values: ServiceFormValues) => updateService(id, values),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: servicesKeys.all });
      toast.success(t('admin.services.form.updateSuccess'));
    },
    onError: (e: Error) => toast.error(e.message),
  });
}
