import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';
import { createLead } from '../api';
import { leadsKeys } from '../queryKeys';
import type { ContactFormValues } from '../schemas';

export function useCreateLead() {
  const qc = useQueryClient();
  const { t } = useTranslation();
  return useMutation({
    mutationFn: (values: ContactFormValues) => createLead(values),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: leadsKeys.all });
      toast.success(t('contact.form.sendSuccess'));
    },
    onError: () => toast.error(t('contact.form.sendError')),
  });
}
