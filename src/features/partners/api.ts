import { supabase } from '@/lib/supabase';
import type { Partner } from './types';
import type { PartnerFormValues } from './schemas';

const BUCKET = 'partner-logos';

interface PartnerRow {
  id: string;
  name: string;
  logo_url: string | null;
  website_url: string | null;
  is_published: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

function rowToPartner(row: PartnerRow): Partner {
  return {
    id: row.id,
    name: row.name,
    logo_url: row.logo_url,
    website_url: row.website_url,
    is_published: row.is_published,
    sort_order: row.sort_order,
    created_at: row.created_at,
    updated_at: row.updated_at,
  };
}

async function uploadLogo(file: File): Promise<string> {
  const ext = file.name.split('.').pop()?.toLowerCase() ?? 'png';
  const path = `${crypto.randomUUID()}.${ext}`;
  const { error } = await supabase.storage
    .from(BUCKET)
    .upload(path, file, { cacheControl: '31536000', upsert: false });
  if (error) throw error;
  const { data } = supabase.storage.from(BUCKET).getPublicUrl(path);
  return data.publicUrl;
}

function buildPayload(values: PartnerFormValues, logo_url?: string) {
  return {
    name: values.name.trim(),
    website_url: values.website_url?.trim() || null,
    is_published: values.is_published,
    sort_order: values.sort_order,
    ...(logo_url ? { logo_url } : {}),
  };
}

export async function listPartners({
  publishedOnly = false,
}: { publishedOnly?: boolean } = {}): Promise<Partner[]> {
  let q = supabase
    .from('partners')
    .select('*')
    .order('sort_order', { ascending: true })
    .order('created_at', { ascending: false });
  if (publishedOnly) q = q.eq('is_published', true);
  const { data, error } = await q;
  if (error) throw error;
  return (data ?? []).map((r) => rowToPartner(r as PartnerRow));
}

export async function getPartnerById(id: string): Promise<Partner> {
  const { data, error } = await supabase
    .from('partners')
    .select('*')
    .eq('id', id)
    .single();
  if (error) throw error;
  return rowToPartner(data as PartnerRow);
}

export async function createPartner(values: PartnerFormValues): Promise<Partner> {
  const logo_url = values.logo ? await uploadLogo(values.logo) : undefined;
  const { data, error } = await supabase
    .from('partners')
    .insert(buildPayload(values, logo_url))
    .select()
    .single();
  if (error) throw error;
  return rowToPartner(data as PartnerRow);
}

export async function updatePartner(
  id: string,
  values: PartnerFormValues,
): Promise<Partner> {
  const logo_url = values.logo ? await uploadLogo(values.logo) : undefined;
  const { data, error } = await supabase
    .from('partners')
    .update(buildPayload(values, logo_url))
    .eq('id', id)
    .select()
    .single();
  if (error) throw error;
  return rowToPartner(data as PartnerRow);
}

export async function deletePartner(id: string): Promise<void> {
  const { error } = await supabase.from('partners').delete().eq('id', id);
  if (error) throw error;
}

export async function togglePartnerPublished(
  id: string,
  is_published: boolean,
): Promise<Partner> {
  const { data, error } = await supabase
    .from('partners')
    .update({ is_published })
    .eq('id', id)
    .select()
    .single();
  if (error) throw error;
  return rowToPartner(data as PartnerRow);
}
