import type { LeadStatus } from './types';

export const leadsKeys = {
  all: ['leads'] as const,
  list: (filters?: { status?: LeadStatus | 'all' }) =>
    [...leadsKeys.all, 'list', filters ?? {}] as const,
  detail: (id: string) => [...leadsKeys.all, 'detail', id] as const,
};
