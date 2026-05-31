export const settingsKeys = {
  all: ['site-settings'] as const,
  detail: () => [...settingsKeys.all, 'detail'] as const,
};
