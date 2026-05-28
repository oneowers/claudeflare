import { useQuery } from '@tanstack/react-query';
import { getLead, listLeads } from '../api';
import { leadsKeys } from '../queryKeys';
import type { LeadStatus } from '../types';

export function useLeads(status: LeadStatus | 'all' = 'all') {
  return useQuery({
    queryKey: leadsKeys.list({ status }),
    queryFn: () => listLeads({ status }),
  });
}

export function useLead(id: string | undefined) {
  return useQuery({
    queryKey: leadsKeys.detail(id ?? ''),
    queryFn: () => getLead(id!),
    enabled: Boolean(id),
  });
}
