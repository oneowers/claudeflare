import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { togglePartnerPublished } from '../api';
import { partnersKeys } from '../queryKeys';
import type { Partner } from '../types';

export function useTogglePartnerPublished() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, is_published }: { id: string; is_published: boolean }) =>
      togglePartnerPublished(id, is_published),
    onMutate: async ({ id, is_published }) => {
      await qc.cancelQueries({ queryKey: partnersKeys.all });
      const snapshots = qc.getQueriesData<Partner[]>({ queryKey: partnersKeys.all });
      qc.setQueriesData<Partner[] | undefined>(
        { queryKey: partnersKeys.all },
        (prev) => prev?.map((p) => (p.id === id ? { ...p, is_published } : p)),
      );
      return { snapshots };
    },
    onError: (e: Error, _vars, ctx) => {
      ctx?.snapshots.forEach(([key, value]) => qc.setQueryData(key, value));
      toast.error(e.message);
    },
    onSettled: () => qc.invalidateQueries({ queryKey: partnersKeys.all }),
  });
}
