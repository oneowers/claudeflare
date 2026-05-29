import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';
import { updateCategory } from '../api';
import { categoriesKeys } from '../queryKeys';
import type { CategoryFormValues } from '../schemas';

export function useUpdateCategory(id: string) {
  const qc = useQueryClient();
  const { t } = useTranslation();
  return useMutation({
    mutationFn: (values: CategoryFormValues) => updateCategory(id, values),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: categoriesKeys.all });
      toast.success(t('admin.categories.form.updateSuccess'));
    },
    onError: (e: Error) => toast.error(e.message),
  });
}
