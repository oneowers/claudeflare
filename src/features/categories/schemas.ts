import { z } from 'zod';
import { requiredLocalizedString } from '@/i18n/localized';

export const categorySchema = z.object({
  name: requiredLocalizedString(2, 60),
  slug: z
    .string()
    .min(2)
    .max(80)
    .regex(/^[a-z0-9-]+$/, 'validation.invalidSlug'),
  sort_order: z.coerce.number().int().min(0).default(0),
});

export type CategoryFormValues = z.infer<typeof categorySchema>;
