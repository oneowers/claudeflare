import { useQuery } from '@tanstack/react-query';
import { getPartnerById, listPartners } from '../api';
import { partnersKeys } from '../queryKeys';

export function usePartners(publishedOnly = false) {
  return useQuery({
    queryKey: partnersKeys.list({ publishedOnly }),
    queryFn: () => listPartners({ publishedOnly }),
  });
}

export function usePartnerById(id: string | undefined) {
  return useQuery({
    queryKey: partnersKeys.detail(id ?? ''),
    queryFn: () => getPartnerById(id!),
    enabled: Boolean(id),
  });
}
