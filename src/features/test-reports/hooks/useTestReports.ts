import { useQuery } from '@tanstack/react-query';
import { listTestReports } from '../api';
import { testReportsKeys } from '../queryKeys';

export function useTestReports({
  type,
  status,
}: { type?: string; status?: string } = {}) {
  return useQuery({
    queryKey: testReportsKeys.list({ type, status }),
    queryFn: () => listTestReports({ type, status }),
  });
}
