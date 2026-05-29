import { supabase } from '@/lib/supabase';
import type { LocalizedString } from '@/i18n/localized';
import { isPaymentMethod } from './constants';
import type { FooterColumn, SiteSettings, SocialLink } from './types';
import type { SiteSettingsFormValues } from './schemas';

interface SiteSettingsRow {
  id: boolean;
  tagline_i18n: LocalizedString | null;
  copyright_i18n: LocalizedString | null;
  contact_email: string | null;
  contact_phone: string | null;
  contact_address_i18n: LocalizedString | null;
  columns: FooterColumn[] | null;
  socials: SocialLink[] | null;
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
    columns: Array.isArray(row.columns) ? row.columns : [],
    socials: Array.isArray(row.socials) ? row.socials : [],
    payment_methods: (row.payment_methods ?? []).filter(isPaymentMethod),
  };
}

function cleanLocalized(value: LocalizedString | undefined): LocalizedString {
  const out: LocalizedString = {};
  if (!value) return out;
  for (const [k, v] of Object.entries(value)) {
    if (v && v.trim().length > 0) out[k as keyof LocalizedString] = v.trim();
  }
  return out;
}

function buildPayload(values: SiteSettingsFormValues) {
  const columns = (values.columns ?? [])
    .map((col) => ({
      title: cleanLocalized(col.title),
      links: (col.links ?? [])
        .filter((l) => l.url.trim().length > 0)
        .map((l) => ({ label: cleanLocalized(l.label), url: l.url.trim() })),
    }))
    .filter((col) => col.links.length > 0 || Object.keys(col.title).length > 0);

  const socials = (values.socials ?? []).filter((s) => s.url.trim().length > 0);

  return {
    id: true,
    tagline_i18n: cleanLocalized(values.tagline),
    copyright_i18n: cleanLocalized(values.copyright),
    contact_email: values.contact_email?.trim() || null,
    contact_phone: values.contact_phone?.trim() || null,
    contact_address_i18n: cleanLocalized(values.contact_address),
    columns,
    socials,
    payment_methods: values.payment_methods ?? [],
  };
}

export async function getSiteSettings(): Promise<SiteSettings> {
  const { data, error } = await supabase
    .from('site_settings')
    .select('*')
    .eq('id', true)
    .maybeSingle();
  if (error) throw error;
  if (!data) {
    return {
      tagline: {},
      copyright: {},
      contact_email: null,
      contact_phone: null,
      contact_address: {},
      columns: [],
      socials: [],
      payment_methods: [],
    };
  }
  return rowToSettings(data as SiteSettingsRow);
}

export async function updateSiteSettings(
  values: SiteSettingsFormValues,
): Promise<SiteSettings> {
  // Upsert keeps it robust whether the singleton row exists yet or not.
  const { data, error } = await supabase
    .from('site_settings')
    .upsert(buildPayload(values), { onConflict: 'id' })
    .select()
    .single();
  if (error) throw error;
  return rowToSettings(data as SiteSettingsRow);
}
