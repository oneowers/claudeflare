export const testReportsKeys = {
  all: ['test-reports'] as const,
  list: (filters?: { type?: string; status?: string }) =>
    [...testReportsKeys.all, 'list', filters ?? {}] as const,
  detail: (id: string) => [...testReportsKeys.all, 'detail', id] as const,
};
