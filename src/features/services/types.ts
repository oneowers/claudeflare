import type { LocalizedString, LocalizedStringArray } from '@/i18n/localized';

export type Currency = 'USD' | 'EUR' | 'UZS' | 'RUB';

export interface Service {
  id: string;
  slug: string;
  name: LocalizedString;
  short_description: LocalizedString;
  description: LocalizedString | null;
  features: LocalizedStringArray;
  category_id: string | null;
  price_from: number;
  currency: Currency;
  image_url: string | null;
  is_published: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}
