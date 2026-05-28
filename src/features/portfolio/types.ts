import type { LocalizedString } from '@/i18n/localized';

export interface PortfolioItem {
  id: string;
  slug: string;
  title: LocalizedString;
  client: string | null;
  description: LocalizedString | null;
  image_url: string | null;
  project_url: string | null;
  technologies: string[];
  is_published: boolean;
  sort_order: number;
  created_at: string;
}
