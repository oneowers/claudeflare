// Supported payment systems. Mix of international + CIS/Uzbek systems,
// matching the currencies the studio invoices in (USD/EUR/UZS/RUB).
export const PAYMENT_METHODS = [
  'visa',
  'mastercard',
  'mir',
  'paypal',
  'humo',
  'uzcard',
  'payme',
  'click',
] as const;

export type PaymentMethod = (typeof PAYMENT_METHODS)[number];

export const PAYMENT_LABELS: Record<PaymentMethod, string> = {
  visa: 'Visa',
  mastercard: 'Mastercard',
  mir: 'МИР',
  paypal: 'PayPal',
  humo: 'Humo',
  uzcard: 'Uzcard',
  payme: 'Payme',
  click: 'Click',
};

export function isPaymentMethod(v: string): v is PaymentMethod {
  return (PAYMENT_METHODS as readonly string[]).includes(v);
}

// Social platforms with a known icon.
export const SOCIAL_PLATFORMS = [
  'telegram',
  'instagram',
  'facebook',
  'linkedin',
  'youtube',
  'github',
  'x',
] as const;

export type SocialPlatform = (typeof SOCIAL_PLATFORMS)[number];

export const SOCIAL_LABELS: Record<SocialPlatform, string> = {
  telegram: 'Telegram',
  instagram: 'Instagram',
  facebook: 'Facebook',
  linkedin: 'LinkedIn',
  youtube: 'YouTube',
  github: 'GitHub',
  x: 'X',
};
