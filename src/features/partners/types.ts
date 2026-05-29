export interface Partner {
  id: string;
  name: string;
  logo_url: string | null;
  website_url: string | null;
  is_published: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}
