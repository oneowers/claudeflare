import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';
import { deleteCategory } from '../api';
import { categoriesKeys } from '../queryKeys';
import { servicesKeys } from '@/features/services/queryKeys';
import { portfolioKeys } from '@/features/portfolio/queryKeys';
import type { Category } from '../types';

export function useDeleteCategory() {
  const qc = useQueryClient();
  const { t } = useTranslation();
  return useMutation({
    mutationFn: (id: string) => deleteCategory(id),
    onMutate: async (id) => {
      await qc.cancelQueries({ queryKey: categoriesKeys.all });
      const snapshots = qc.getQueriesData<Category[]>({
        queryKey: categoriesKeys.all,
      });
      qc.setQueriesData<Category[] | undefined>(
        { queryKey: categoriesKeys.all },
        (prev) => prev?.filter((c) => c.id !== id),
      );
      return { snapshots };
    },
    onError: (e: Error, _id, ctx) => {
      ctx?.snapshots.forEach(([key, value]) => qc.setQueryData(key, value));
      toast.error(e.message);
    },
    onSuccess: () => toast.success(t('admin.categories.form.deleteSuccess')),
    onSettled: () => {
      // The FK is `on delete set null`, so referencing items lose their category.
      qc.invalidateQueries({ queryKey: categoriesKeys.all });
      qc.invalidateQueries({ queryKey: servicesKeys.all });
      qc.invalidateQueries({ queryKey: portfolioKeys.all });
    },
  });
}
