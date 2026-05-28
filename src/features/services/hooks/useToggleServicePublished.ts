import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { toggleServicePublished } from '../api';
import { servicesKeys } from '../queryKeys';
import type { Service } from '../types';

export function useToggleServicePublished() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, is_published }: { id: string; is_published: boolean }) =>
      toggleServicePublished(id, is_published),
    onMutate: async ({ id, is_published }) => {
      await qc.cancelQueries({ queryKey: servicesKeys.all });
      const snapshots = qc.getQueriesData<Service[]>({
        queryKey: servicesKeys.all,
      });
      qc.setQueriesData<Service[] | undefined>(
        { queryKey: servicesKeys.all },
        (prev) =>
          prev?.map((s) => (s.id === id ? { ...s, is_published } : s)),
      );
      return { snapshots };
    },
    onError: (e: Error, _vars, ctx) => {
      ctx?.snapshots.forEach(([key, value]) => qc.setQueryData(key, value));
      toast.error(e.message);
    },
    onSettled: () => qc.invalidateQueries({ queryKey: servicesKeys.all }),
  });
}
