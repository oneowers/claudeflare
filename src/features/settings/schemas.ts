import { z } from 'zod';
import { optionalLocalizedString } from '@/i18n/localized';

const footerLinkSchema = z.object({
  url: z.string().min(1).max(200),
  label: optionalLocalizedString(120),
});

const footerColumnSchema = z.object({
  title: optionalLocalizedString(120),
  links: z.array(footerLinkSchema).max(12).default([]),
});

const socialSchema = z.object({
  platform: z.string().min(1).max(40),
  url: z.string().url().max(300),
});

export const settingsSchema = z.object({
  tagline: optionalLocalizedString(500),
  copyright: optionalLocalizedString(200),
  contact_email: z.string().email().max(160).optional().or(z.literal('')),
  contact_phone: z.string().max(60).optional().or(z.literal('')),
  contact_address: optionalLocalizedString(400),
  columns: z.array(footerColumnSchema).max(6).default([]),
  socials: z.array(socialSchema).max(12).default([]),
  payment_methods: z.array(z.string().min(1).max(40)).max(20).default([]),
});

export type SettingsFormValues = z.infer<typeof settingsSchema>;
