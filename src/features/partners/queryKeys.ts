export const partnersKeys = {
  all: ['partners'] as const,
  list: (filters?: { publishedOnly?: boolean }) =>
    [...partnersKeys.all, 'list', filters ?? {}] as const,
  detail: (id: string) => [...partnersKeys.all, 'detail', id] as const,
};
