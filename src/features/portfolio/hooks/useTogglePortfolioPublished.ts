import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { togglePortfolioPublished } from '../api';
import { portfolioKeys } from '../queryKeys';
import type { PortfolioItem } from '../types';

export function useTogglePortfolioPublished() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, is_published }: { id: string; is_published: boolean }) =>
      togglePortfolioPublished(id, is_published),
    onMutate: async ({ id, is_published }) => {
      await qc.cancelQueries({ queryKey: portfolioKeys.all });
      const snapshots = qc.getQueriesData<PortfolioItem[]>({
        queryKey: portfolioKeys.all,
      });
      qc.setQueriesData<PortfolioItem[] | undefined>(
        { queryKey: portfolioKeys.all },
        (prev) => prev?.map((p) => (p.id === id ? { ...p, is_published } : p)),
      );
      return { snapshots };
    },
    onError: (e: Error, _vars, ctx) => {
      ctx?.snapshots.forEach(([key, value]) => qc.setQueryData(key, value));
      toast.error(e.message);
    },
    onSettled: () => qc.invalidateQueries({ queryKey: portfolioKeys.all }),
  });
}
