import type { LocalizedString } from '@/i18n/localized';

export interface Category {
  id: string;
  slug: string;
  name: LocalizedString;
  sort_order: number;
  created_at: string;
  updated_at: string;
}
