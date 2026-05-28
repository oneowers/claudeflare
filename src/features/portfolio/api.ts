import { supabase } from '@/lib/supabase';
import type { LocalizedString } from '@/i18n/localized';
import type { PortfolioItem } from './types';
import type { PortfolioFormValues } from './schemas';

const BUCKET = 'portfolio-images';

interface PortfolioRow {
  id: string;
  slug: string;
  title: string | null;
  client: string | null;
  description: string | null;
  title_i18n: LocalizedString | null;
  description_i18n: LocalizedString | null;
  image_url: string | null;
  project_url: string | null;
  technologies: string[];
  is_published: boolean;
  sort_order: number;
  created_at: string;
}

function rowToItem(row: PortfolioRow): PortfolioItem {
  return {
    id: row.id,
    slug: row.slug,
    title: hydrate(row.title_i18n, { ru: row.title ?? '' }),
    client: row.client,
    description: hasAny(row.description_i18n)
      ? row.description_i18n!
      : row.description
        ? { ru: row.description }
        : null,
    image_url: row.image_url,
    project_url: row.project_url,
    technologies: row.technologies ?? [],
    is_published: row.is_published,
    sort_order: row.sort_order,
    created_at: row.created_at,
  };
}

function hydrate(
  i18n: LocalizedString | null | undefined,
  legacy: LocalizedString,
): LocalizedString {
  if (hasAny(i18n)) return i18n!;
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

export async function listPortfolio({
  publishedOnly = false,
}: { publishedOnly?: boolean } = {}): Promise<PortfolioItem[]> {
  let q = supabase
    .from('portfolio')
    .select('*')
    .order('sort_order', { ascending: true })
    .order('created_at', { ascending: false });
  if (publishedOnly) q = q.eq('is_published', true);
  const { data, error } = await q;
  if (error) throw error;
  return (data ?? []).map((r) => rowToItem(r as PortfolioRow));
}

export async function getPortfolioBySlug(slug: string): Promise<PortfolioItem> {
  const { data, error } = await supabase
    .from('portfolio')
    .select('*')
    .eq('slug', slug)
    .single();
  if (error) throw error;
  return rowToItem(data as PortfolioRow);
}

export async function getPortfolioById(id: string): Promise<PortfolioItem> {
  const { data, error } = await supabase
    .from('portfolio')
    .select('*')
    .eq('id', id)
    .single();
  if (error) throw error;
  return rowToItem(data as PortfolioRow);
}

async function uploadPortfolioImage(file: File): Promise<string> {
  const ext = file.name.split('.').pop()?.toLowerCase() ?? 'jpg';
  const path = `${crypto.randomUUID()}.${ext}`;
  const { error } = await supabase.storage
    .from(BUCKET)
    .upload(path, file, { cacheControl: '31536000', upsert: false });
  if (error) throw error;
  const { data } = supabase.storage.from(BUCKET).getPublicUrl(path);
  return data.publicUrl;
}

function buildPayload(values: PortfolioFormValues, image_url?: string) {
  const title = cleanLocalized(values.title);
  const desc = cleanLocalized(values.description);
  return {
    slug: values.slug,
    title_i18n: title,
    description_i18n: hasAny(desc) ? desc : null,
    // Legacy mirrors.
    title: title.ru ?? Object.values(title)[0] ?? '',
    description: desc.ru ?? null,
    client: values.client?.trim() ? values.client.trim() : null,
    project_url: values.project_url?.trim() ? values.project_url.trim() : null,
    technologies: values.technologies,
    sort_order: values.sort_order,
    is_published: values.is_published,
    ...(image_url ? { image_url } : {}),
  };
}

export async function createPortfolio(
  values: PortfolioFormValues,
): Promise<PortfolioItem> {
  const image_url = values.image
    ? await uploadPortfolioImage(values.image)
    : undefined;
  const payload = buildPayload(values, image_url);
  const { data, error } = await supabase
    .from('portfolio')
    .insert(payload)
    .select()
    .single();
  if (error) throw error;
  return rowToItem(data as PortfolioRow);
}

export async function updatePortfolio(
  id: string,
  values: PortfolioFormValues,
): Promise<PortfolioItem> {
  const image_url = values.image
    ? await uploadPortfolioImage(values.image)
    : undefined;
  const payload = buildPayload(values, image_url);
  const { data, error } = await supabase
    .from('portfolio')
    .update(payload)
    .eq('id', id)
    .select()
    .single();
  if (error) throw error;
  return rowToItem(data as PortfolioRow);
}

export async function deletePortfolio(id: string): Promise<void> {
  const { error } = await supabase.from('portfolio').delete().eq('id', id);
  if (error) throw error;
}

export async function togglePortfolioPublished(
  id: string,
  is_published: boolean,
): Promise<PortfolioItem> {
  const { data, error } = await supabase
    .from('portfolio')
    .update({ is_published })
    .eq('id', id)
    .select()
    .single();
  if (error) throw error;
  return rowToItem(data as PortfolioRow);
}
