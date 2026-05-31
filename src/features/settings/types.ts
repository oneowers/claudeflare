import type { LocalizedString } from '@/i18n/localized';

export interface FooterLink {
  url: string;
  label: LocalizedString;
}

export interface FooterColumn {
  title: LocalizedString;
  links: FooterLink[];
}

export interface Social {
  platform: string;
  url: string;
}

/** Site-wide settings — currently the footer / contact block. Single row. */
export interface SiteSettings {
  tagline: LocalizedString;
  copyright: LocalizedString;
  contact_email: string | null;
  contact_phone: string | null;
  contact_address: LocalizedString;
  columns: FooterColumn[];
  socials: Social[];
  payment_methods: string[];
  updated_at: string;
}
