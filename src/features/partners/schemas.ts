import { z } from 'zod';

export const partnerSchema = z.object({
  name: z.string().min(2).max(120),
  website_url: z.string().url('validation.invalidUrl').optional().or(z.literal('')),
  is_published: z.boolean().default(true),
  sort_order: z.coerce.number().int().min(0).default(0),
  logo: z.instanceof(File).optional(),
});

export type PartnerFormValues = z.infer<typeof partnerSchema>;
