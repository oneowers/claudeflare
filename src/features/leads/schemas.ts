import { z } from 'zod';
import { LEAD_STATUSES } from './types';

export const contactFormSchema = z.object({
  name: z.string().min(2).max(120),
  email: z.string().email(),
  phone: z
    .string()
    .max(40)
    .regex(/^[+\d\s()-]*$/u, 'validation.invalidPhone')
    .optional()
    .or(z.literal('')),
  message: z
    .string()
    .min(10, 'validation.messageTooShort')
    .max(4000),
  service_id: z.string().uuid().optional().or(z.literal('')),
  // honeypot — должно быть пустым
  website: z.string().max(0, 'spam').optional().or(z.literal('')),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;

export const leadUpdateSchema = z.object({
  status: z.enum(LEAD_STATUSES),
  notes: z.string().max(10_000).optional().or(z.literal('')),
});

export type LeadUpdateValues = z.infer<typeof leadUpdateSchema>;
