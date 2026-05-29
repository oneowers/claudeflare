import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';
import { createCategory } from '../api';
import { categoriesKeys } from '../queryKeys';
import type { CategoryFormValues } from '../schemas';

export function useCreateCategory() {
  const qc = useQueryClient();
  const { t } = useTranslation();
  return useMutation({
    mutationFn: (values: CategoryFormValues) => createCategory(values),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: categoriesKeys.all });
      toast.success(t('admin.categories.form.createSuccess'));
    },
    onError: (e: Error) => toast.error(e.message),
  });
}
