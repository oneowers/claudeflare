export const LEAD_STATUSES = ['new', 'in_progress', 'closed', 'spam'] as const;
export type LeadStatus = (typeof LEAD_STATUSES)[number];

export interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  message: string;
  service_id: string | null;
  status: LeadStatus;
  notes: string | null;
  created_at: string;
}
