import { useQuery } from '@tanstack/react-query';
import { getServiceById, getServiceBySlug } from '../api';
import { servicesKeys } from '../queryKeys';

export function useServiceBySlug(slug: string | undefined) {
  return useQuery({
    queryKey: servicesKeys.detail(slug ?? ''),
    queryFn: () => getServiceBySlug(slug!),
    enabled: Boolean(slug),
  });
}

export function useServiceById(id: string | undefined) {
  return useQuery({
    queryKey: servicesKeys.detail(id ?? ''),
    queryFn: () => getServiceById(id!),
    enabled: Boolean(id),
  });
}
