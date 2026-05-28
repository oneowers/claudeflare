export const servicesKeys = {
  all: ['services'] as const,
  list: (filters?: { publishedOnly?: boolean }) =>
    [...servicesKeys.all, 'list', filters ?? {}] as const,
  detail: (idOrSlug: string) =>
    [...servicesKeys.all, 'detail', idOrSlug] as const,
};
