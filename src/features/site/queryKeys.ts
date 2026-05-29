export const siteKeys = {
  all: ['site-settings'] as const,
  settings: () => [...siteKeys.all, 'settings'] as const,
};
