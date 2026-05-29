import { useQuery } from '@tanstack/react-query';
import { getSiteSettings } from '../api';
import { siteKeys } from '../queryKeys';

export function useSiteSettings() {
  return useQuery({
    queryKey: siteKeys.settings(),
    queryFn: getSiteSettings,
    staleTime: 5 * 60_000,
  });
}
