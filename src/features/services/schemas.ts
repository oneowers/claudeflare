import { z } from 'zod';
import {
  localizedStringArray,
  optionalLocalizedString,
  requiredLocalizedString,
} from '@/i18n/localized';

export const currencyEnum = z.enum(['USD', 'EUR', 'UZS', 'RUB']);

export const serviceSchema = z.object({
  name: requiredLocalizedString(3, 120),
  slug: z
    .string()
    .min(2)
    .max(80)
    .regex(/^[a-z0-9-]+$/, 'validation.invalidSlug'),
  short_description: requiredLocalizedString(10, 280),
  description: optionalLocalizedString(10_000),
  price_from: z.coerce.number().positive('validation.pricePositive'),
  currency: currencyEnum.default('USD'),
  features: localizedStringArray(20, 120),
  category_id: z.string().uuid().optional().or(z.literal('')),
  is_published: z.boolean().default(false),
  sort_order: z.coerce.number().int().min(0).default(0),
  image: z.instanceof(File).optional(),
});

export type ServiceFormValues = z.infer<typeof serviceSchema>;
