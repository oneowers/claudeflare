import { useQuery } from '@tanstack/react-query';
import { getSiteSettings } from '../api';
import { settingsKeys } from '../queryKeys';

export function useSiteSettings() {
  return useQuery({
    queryKey: settingsKeys.detail(),
    queryFn: getSiteSettings,
    // Settings change rarely — keep them fresh for the whole session.
    staleTime: 5 * 60_000,
  });
}
