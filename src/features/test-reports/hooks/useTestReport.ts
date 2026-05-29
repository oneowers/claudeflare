import { useQuery } from '@tanstack/react-query';
import { getTestReportById } from '../api';
import { testReportsKeys } from '../queryKeys';

export function useTestReportById(id: string | undefined) {
  return useQuery({
    queryKey: testReportsKeys.detail(id ?? ''),
    queryFn: () => getTestReportById(id!),
    enabled: Boolean(id),
  });
}
