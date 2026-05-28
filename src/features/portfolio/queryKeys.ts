export const portfolioKeys = {
  all: ['portfolio'] as const,
  list: (filters?: { publishedOnly?: boolean }) =>
    [...portfolioKeys.all, 'list', filters ?? {}] as const,
  detail: (idOrSlug: string) =>
    [...portfolioKeys.all, 'detail', idOrSlug] as const,
};
