import { z } from 'zod';
import {
  optionalLocalizedString,
  requiredLocalizedString,
} from '@/i18n/localized';

export const portfolioSchema = z.object({
  title: requiredLocalizedString(3, 160),
  description: optionalLocalizedString(10_000),
  slug: z
    .string()
    .min(2)
    .max(80)
    .regex(/^[a-z0-9-]+$/, 'validation.invalidSlug'),
  client: z.string().max(120).optional().or(z.literal('')),
  project_url: z.string().url().optional().or(z.literal('')),
  technologies: z.array(z.string().min(1).max(60)).max(30).default([]),
  category_id: z.string().uuid().optional().or(z.literal('')),
  is_published: z.boolean().default(false),
  sort_order: z.coerce.number().int().min(0).default(0),
  image: z.instanceof(File).optional(),
});

export type PortfolioFormValues = z.infer<typeof portfolioSchema>;
