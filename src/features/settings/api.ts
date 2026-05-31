import { supabase } from '@/lib/supabase';
import type { LocalizedString } from '@/i18n/localized';
import type { FooterColumn, SiteSettings, Social } from './types';
import type { SettingsFormValues } from './schemas';

/** Singleton row — the table is keyed on a boolean `id` that is always true. */
const SINGLETON = true;

interface SiteSettingsRow {
  id: boolean;
  tagline_i18n: LocalizedString | null;
  copyright_i18n: LocalizedString | null;
  contact_email: string | null;
  contact_phone: string | null;
  contact_address_i18n: LocalizedString | null;
  columns: FooterColumn[] | null;
  socials: Social[] | null;
  payment_methods: string[] | null;
  updated_at: string;
}

function rowToSettings(row: SiteSettingsRow): SiteSettings {
  return {
    tagline: row.tagline_i18n ?? {},
    copyright: row.copyright_i18n ?? {},
    contact_email: row.contact_email,
    contact_phone: row.contact_phone,
    contact_address: row.contact_address_i18n ?? {},
    columns: row.columns ?? [],
    socials: row.socials ?? [],
    payment_methods: row.payment_methods ?? [],
    updated_at: row.updated_at,
  };
}

/** Drop empty/blank language entries so we never persist `{ en: '' }`. */
function cleanLocalized(value: LocalizedString): LocalizedString {
  const out: LocalizedString = {};
  for (const [k, v] of Object.entries(value)) {
    if (v && v.trim().length > 0) out[k as keyof LocalizedString] = v.trim();
  }
  return out;
}

export async function getSiteSettings(): Promise<SiteSettings> {
  const { data, error } = await supabase
    .from('site_settings')
    .select('*')
    .eq('id', SINGLETON)
    .single();
  if (error) throw error;
  return rowToSettings(data as SiteSettingsRow);
}

export async function updateSiteSettings(
  values: SettingsFormValues,
): Promise<SiteSettings> {
  const payload = {
    tagline_i18n: cleanLocalized(values.tagline),
    copyright_i18n: cleanLocalized(values.copyright),
    contact_email: values.contact_email?.trim() || null,
    contact_phone: values.contact_phone?.trim() || null,
    contact_address_i18n: cleanLocalized(values.contact_address),
    columns: values.columns.map((col) => ({
      title: cleanLocalized(col.title),
      links: col.links.map((link) => ({
        url: link.url.trim(),
        label: cleanLocalized(link.label),
      })),
    })),
    socials: values.socials.map((s) => ({
      platform: s.platform.trim(),
      url: s.url.trim(),
    })),
    payment_methods: values.payment_methods,
    updated_at: new Date().toISOString(),
  };

  const { data, error } = await supabase
    .from('site_settings')
    .update(payload)
    .eq('id', SINGLETON)
    .select()
    .single();
  if (error) throw error;
  return rowToSettings(data as SiteSettingsRow);
}
