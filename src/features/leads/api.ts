import { supabase } from '@/lib/supabase';
import type { Lead, LeadStatus } from './types';
import type { ContactFormValues, LeadUpdateValues } from './schemas';

export async function listLeads({
  status,
}: { status?: LeadStatus | 'all' } = {}): Promise<Lead[]> {
  let q = supabase
    .from('leads')
    .select('*')
    .order('created_at', { ascending: false });
  if (status && status !== 'all') q = q.eq('status', status);
  const { data, error } = await q;
  if (error) throw error;
  return (data ?? []) as Lead[];
}

export async function getLead(id: string): Promise<Lead> {
  const { data, error } = await supabase
    .from('leads')
    .select('*')
    .eq('id', id)
    .single();
  if (error) throw error;
  return data as Lead;
}

export async function createLead(values: ContactFormValues): Promise<Lead> {
  if (values.website) {
    // Honeypot заполнен — пишем как spam, но не выдаём боту 4xx.
    const { data, error } = await supabase
      .from('leads')
      .insert({
        name: values.name,
        email: values.email,
        phone: values.phone || null,
        message: values.message,
        service_id: values.service_id || null,
        status: 'spam',
      })
      .select()
      .single();
    if (error) throw error;
    return data as Lead;
  }

  const { data, error } = await supabase
    .from('leads')
    .insert({
      name: values.name,
      email: values.email,
      phone: values.phone || null,
      message: values.message,
      service_id: values.service_id || null,
    })
    .select()
    .single();
  if (error) throw error;
  return data as Lead;
}

export async function updateLead(
  id: string,
  values: LeadUpdateValues,
): Promise<Lead> {
  const { data, error } = await supabase
    .from('leads')
    .update({
      status: values.status,
      notes: values.notes?.trim() ? values.notes : null,
    })
    .eq('id', id)
    .select()
    .single();
  if (error) throw error;
  return data as Lead;
}

export async function deleteLead(id: string): Promise<void> {
  const { error } = await supabase.from('leads').delete().eq('id', id);
  if (error) throw error;
}

export async function countLeadsByStatus(): Promise<Record<LeadStatus, number>> {
  const counts: Record<LeadStatus, number> = {
    new: 0,
    in_progress: 0,
    closed: 0,
    spam: 0,
  };
  const statuses: LeadStatus[] = ['new', 'in_progress', 'closed', 'spam'];
  for (const status of statuses) {
    const { count, error } = await supabase
      .from('leads')
      .select('id', { count: 'exact', head: true })
      .eq('status', status);
    if (error) throw error;
    counts[status] = count ?? 0;
  }
  return counts;
}
