import { supabase } from '@/lib/supabase';
import type { LocalizedString } from '@/i18n/localized';
import type { Category } from './types';
import type { CategoryFormValues } from './schemas';

interface CategoryRow {
  id: string;
  slug: string;
  name: string | null;
  name_i18n: LocalizedString | null;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

function rowToCategory(row: CategoryRow): Category {
  return {
    id: row.id,
    slug: row.slug,
    name: hasAny(row.name_i18n) ? row.name_i18n! : { ru: row.name ?? '' },
    sort_order: row.sort_order,
    created_at: row.created_at,
    updated_at: row.updated_at,
  };
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

function buildPayload(values: CategoryFormValues) {
  const name = cleanLocalized(values.name);
  return {
    slug: values.slug,
    name_i18n: name,
    name: name.ru ?? Object.values(name)[0] ?? '',
    sort_order: values.sort_order,
  };
}

export async function listCategories(): Promise<Category[]> {
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .order('sort_order', { ascending: true })
    .order('created_at', { ascending: true });
  if (error) throw error;
  return (data ?? []).map((r) => rowToCategory(r as CategoryRow));
}

export async function getCategoryById(id: string): Promise<Category> {
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .eq('id', id)
    .single();
  if (error) throw error;
  return rowToCategory(data as CategoryRow);
}

export async function createCategory(
  values: CategoryFormValues,
): Promise<Category> {
  const { data, error } = await supabase
    .from('categories')
    .insert(buildPayload(values))
    .select()
    .single();
  if (error) throw error;
  return rowToCategory(data as CategoryRow);
}

export async function updateCategory(
  id: string,
  values: CategoryFormValues,
): Promise<Category> {
  const { data, error } = await supabase
    .from('categories')
    .update(buildPayload(values))
    .eq('id', id)
    .select()
    .single();
  if (error) throw error;
  return rowToCategory(data as CategoryRow);
}

export async function deleteCategory(id: string): Promise<void> {
  const { error } = await supabase.from('categories').delete().eq('id', id);
  if (error) throw error;
}
