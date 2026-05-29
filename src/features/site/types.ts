import type { LocalizedString } from '@/i18n/localized';
import type { PaymentMethod } from './constants';

export interface FooterLink {
  label: LocalizedString;
  url: string;
}

export interface FooterColumn {
  title: LocalizedString;
  links: FooterLink[];
}

export interface SocialLink {
  platform: string;
  url: string;
}

export interface SiteSettings {
  tagline: LocalizedString;
  copyright: LocalizedString;
  contact_email: string | null;
  contact_phone: string | null;
  contact_address: LocalizedString;
  columns: FooterColumn[];
  socials: SocialLink[];
  payment_methods: PaymentMethod[];
}
