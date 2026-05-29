import { z } from 'zod';
import { optionalLocalizedString } from '@/i18n/localized';
import { SOCIAL_PLATFORMS, PAYMENT_METHODS } from './constants';

const footerLinkSchema = z.object({
  label: optionalLocalizedString(80),
  // Allow relative (/about) or absolute (https://…) URLs.
  url: z.string().min(1, 'validation.required').max(500),
});

const footerColumnSchema = z.object({
  title: optionalLocalizedString(80),
  links: z.array(footerLinkSchema).max(12).default([]),
});

const socialSchema = z.object({
  platform: z.enum(SOCIAL_PLATFORMS),
  url: z.string().url('validation.invalidUrl').max(500),
});

export const siteSettingsSchema = z.object({
  tagline: optionalLocalizedString(280),
  copyright: optionalLocalizedString(160),
  contact_email: z.string().email('validation.invalidEmail').optional().or(z.literal('')),
  contact_phone: z.string().max(40).optional().or(z.literal('')),
  contact_address: optionalLocalizedString(200),
  columns: z.array(footerColumnSchema).max(6).default([]),
  socials: z.array(socialSchema).max(10).default([]),
  payment_methods: z.array(z.enum(PAYMENT_METHODS)).default([]),
});

export type SiteSettingsFormValues = z.infer<typeof siteSettingsSchema>;
