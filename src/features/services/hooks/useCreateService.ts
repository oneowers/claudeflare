import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';
import { createService } from '../api';
import { servicesKeys } from '../queryKeys';
import type { ServiceFormValues } from '../schemas';

export function useCreateService() {
  const qc = useQueryClient();
  const { t } = useTranslation();
  return useMutation({
    mutationFn: (values: ServiceFormValues) => createService(values),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: servicesKeys.all });
      toast.success(t('admin.services.form.createSuccess'));
    },
    onError: (e: Error) => toast.error(e.message),
  });
}
