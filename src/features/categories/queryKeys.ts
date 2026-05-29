export const categoriesKeys = {
  all: ['categories'] as const,
  list: () => [...categoriesKeys.all, 'list'] as const,
  detail: (id: string) => [...categoriesKeys.all, 'detail', id] as const,
};
