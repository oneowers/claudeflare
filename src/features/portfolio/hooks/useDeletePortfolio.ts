import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';
import { deletePortfolio } from '../api';
import { portfolioKeys } from '../queryKeys';
import type { PortfolioItem } from '../types';

export function useDeletePortfolio() {
  const qc = useQueryClient();
  const { t } = useTranslation();
  return useMutation({
    mutationFn: (id: string) => deletePortfolio(id),
    onMutate: async (id) => {
      await qc.cancelQueries({ queryKey: portfolioKeys.all });
      const snapshots = qc.getQueriesData<PortfolioItem[]>({
        queryKey: portfolioKeys.all,
      });
      qc.setQueriesData<PortfolioItem[] | undefined>(
        { queryKey: portfolioKeys.all },
        (prev) => prev?.filter((p) => p.id !== id),
      );
      return { snapshots };
    },
    onError: (e: Error, _id, ctx) => {
      ctx?.snapshots.forEach(([key, value]) => qc.setQueryData(key, value));
      toast.error(e.message);
    },
    onSuccess: () => toast.success(t('admin.portfolio.form.deleteSuccess')),
    onSettled: () => qc.invalidateQueries({ queryKey: portfolioKeys.all }),
  });
}
