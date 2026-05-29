import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { listCategories } from '../api';
import { categoriesKeys } from '../queryKeys';
import type { Category } from '../types';

export function useCategories() {
  return useQuery({
    queryKey: categoriesKeys.list(),
    queryFn: listCategories,
  });
}

/** Categories indexed by id, for resolving a category from a stored id. */
export function useCategoryMap(): Record<string, Category> {
  const { data } = useCategories();
  return useMemo(() => {
    const map: Record<string, Category> = {};
    for (const c of data ?? []) map[c.id] = c;
    return map;
  }, [data]);
}
