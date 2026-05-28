import { useQuery } from '@tanstack/react-query';
import { countLeadsByStatus } from '../api';
import { leadsKeys } from '../queryKeys';

export function useLeadCounts() {
  return useQuery({
    queryKey: [...leadsKeys.all, 'counts'] as const,
    queryFn: countLeadsByStatus,
    staleTime: 30_000,
  });
}
