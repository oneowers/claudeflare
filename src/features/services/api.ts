import { supabase } from '@/lib/supabase';
import type { LocalizedString, LocalizedStringArray } from '@/i18n/localized';
import type { Service } from './types';
import type { ServiceFormValues } from './schemas';

const BUCKET = 'service-images';

interface ServiceRow {
  id: string;
  slug: string;
  name: string | null;
  short_description: string | null;
  description: string | null;
  features: string[] | null;
  name_i18n: LocalizedString | null;
  short_description_i18n: LocalizedString | null;
  description_i18n: LocalizedString | null;
  features_i18n: LocalizedStringArray | null;
  category_id: string | null;
  price_from: number;
  currency: Service['currency'];
  image_url: string | null;
  is_published: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

function rowToService(row: ServiceRow): Service {
  return {
    id: row.id,
    slug: row.slug,
    name: hydrate(row.name_i18n, { ru: row.name ?? '' }),
    short_description: hydrate(row.short_description_i18n, {
      ru: row.short_description ?? '',
    }),
    description: hasAny(row.description_i18n)
      ? row.description_i18n!
      : row.description
        ? { ru: row.description }
        : null,
    features: hydrateArray(row.features_i18n, { ru: row.features ?? [] }),
    category_id: row.category_id,
    price_from: Number(row.price_from),
    currency: row.currency,
    image_url: row.image_url,
    is_published: row.is_published,
    sort_order: row.sort_order,
    created_at: row.created_at,
    updated_at: row.updated_at,
  };
}

function hydrate(
  i18n: LocalizedString | null | undefined,
  legacy: LocalizedString,
): LocalizedString {
  if (hasAny(i18n)) return i18n!;
  return legacy;
}

function hydrateArray(
  i18n: LocalizedStringArray | null | undefined,
  legacy: LocalizedStringArray,
): LocalizedStringArray {
  if (i18n && Object.keys(i18n).length > 0) return i18n;
  return legacy;
}

function hasAny(value: LocalizedString | null | undefined): boolean {
  if (!value) return false;
  return Object.values(value).some((v) => v && v.trim().length > 0);
}

function cleanLocalized(value: LocalizedString): LocalizedString {
  const out: LocalizedString = {};
  for (const [k, v] of Object.entries(value)) {
    if (v && v.trim().length > 0) out[k as keyof LocalizedString] = v.trim();
  }
  return out;
}

function cleanLocalizedArray(value: LocalizedStringArray): LocalizedStringArray {
  const out: LocalizedStringArray = {};
  for (const [k, v] of Object.entries(value)) {
    if (v && v.length > 0) out[k as keyof LocalizedStringArray] = v;
  }
  return out;
}

export async function listServices({
  publishedOnly = false,
}: { publishedOnly?: boolean } = {}): Promise<Service[]> {
  let q = supabase
    .from('services')
    .select('*')
    .order('sort_order', { ascending: true })
    .order('created_at', { ascending: false });
  if (publishedOnly) q = q.eq('is_published', true);
  const { data, error } = await q;
  if (error) throw error;
  return (data ?? []).map((r) => rowToService(r as ServiceRow));
}

export async function getServiceBySlug(slug: string): Promise<Service> {
  const { data, error } = await supabase
    .from('services')
    .select('*')
    .eq('slug', slug)
    .single();
  if (error) throw error;
  return rowToService(data as ServiceRow);
}

export async function getServiceById(id: string): Promise<Service> {
  const { data, error } = await supabase
    .from('services')
    .select('*')
    .eq('id', id)
    .single();
  if (error) throw error;
  return rowToService(data as ServiceRow);
}

async function uploadServiceImage(file: File): Promise<string> {
  const ext = file.name.split('.').pop()?.toLowerCase() ?? 'jpg';
  const path = `${crypto.randomUUID()}.${ext}`;
  const { error } = await supabase.storage
    .from(BUCKET)
    .upload(path, file, { cacheControl: '31536000', upsert: false });
  if (error) throw error;
  const { data } = supabase.storage.from(BUCKET).getPublicUrl(path);
  return data.publicUrl;
}

function buildPayload(values: ServiceFormValues, image_url?: string) {
  const name = cleanLocalized(values.name);
  const short = cleanLocalized(values.short_description);
  const desc = cleanLocalized(values.description);
  const features = cleanLocalizedArray(values.features);
  return {
    slug: values.slug,
    // Localized columns (source of truth).
    name_i18n: name,
    short_description_i18n: short,
    description_i18n: hasAny(desc) ? desc : null,
    features_i18n: features,
    // Legacy single-language mirrors for backward compat.
    name: name.ru ?? Object.values(name)[0] ?? '',
    short_description: short.ru ?? Object.values(short)[0] ?? '',
    description: desc.ru ?? null,
    features: features.ru ?? [],
    category_id: values.category_id || null,
    price_from: values.price_from,
    currency: values.currency,
    sort_order: values.sort_order,
    is_published: values.is_published,
    ...(image_url ? { image_url } : {}),
  };
}

export async function createService(values: ServiceFormValues): Promise<Service> {
  const image_url = values.image ? await uploadServiceImage(values.image) : undefined;
  const payload = buildPayload(values, image_url);
  const { data, error } = await supabase
    .from('services')
    .insert(payload)
    .select()
    .single();
  if (error) throw error;
  return rowToService(data as ServiceRow);
}

export async function updateService(
  id: string,
  values: ServiceFormValues,
): Promise<Service> {
  const image_url = values.image ? await uploadServiceImage(values.image) : undefined;
  const payload = buildPayload(values, image_url);
  const { data, error } = await supabase
    .from('services')
    .update(payload)
    .eq('id', id)
    .select()
    .single();
  if (error) throw error;
  return rowToService(data as ServiceRow);
}

export async function deleteService(id: string): Promise<void> {
  const { error } = await supabase.from('services').delete().eq('id', id);
  if (error) throw error;
}

export async function toggleServicePublished(
  id: string,
  is_published: boolean,
): Promise<Service> {
  const { data, error } = await supabase
    .from('services')
    .update({ is_published })
    .eq('id', id)
    .select()
    .single();
  if (error) throw error;
  return rowToService(data as ServiceRow);
}
