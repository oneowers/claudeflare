import { useQuery } from '@tanstack/react-query';
import { listServices } from '../api';
import { servicesKeys } from '../queryKeys';

export function useServices(publishedOnly = false) {
  return useQuery({
    queryKey: servicesKeys.list({ publishedOnly }),
    queryFn: () => listServices({ publishedOnly }),
  });
}
