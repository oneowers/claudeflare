import { useQuery } from '@tanstack/react-query';
import { getCategoryById } from '../api';
import { categoriesKeys } from '../queryKeys';

export function useCategoryById(id: string | undefined) {
  return useQuery({
    queryKey: categoriesKeys.detail(id ?? ''),
    queryFn: () => getCategoryById(id!),
    enabled: Boolean(id),
  });
}
