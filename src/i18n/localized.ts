import { z } from 'zod';
import type { Language } from './config';
import { DEFAULT_LANGUAGE, SUPPORTED_LANGUAGES } from './config';

export type LocalizedString = Partial<Record<Language, string>>;
export type LocalizedStringArray = Partial<Record<Language, string[]>>;

/**
 * Pick the best translation for the current language.
 * Falls back to RU (the default language), then any non-empty value.
 */
export function pickLocale<T>(
  value: Partial<Record<Language, T>> | undefined | null,
  lang: Language,
  fallback: Language = DEFAULT_LANGUAGE,
): T | undefined {
  if (!value) return undefined;
  if (isNonEmpty(value[lang])) return value[lang];
  if (isNonEmpty(value[fallback])) return value[fallback];
  for (const candidate of SUPPORTED_LANGUAGES) {
    if (isNonEmpty(value[candidate])) return value[candidate];
  }
  return undefined;
}

function isNonEmpty<T>(value: T | undefined): value is T {
  if (value === undefined || value === null) return false;
  if (typeof value === 'string') return value.trim().length > 0;
  if (Array.isArray(value)) return value.length > 0;
  return true;
}

/** Empty placeholder used as a form-level default. */
export const emptyLocalizedString: LocalizedString = { ru: '', en: '', uz: '' };
export const emptyLocalizedArray: LocalizedStringArray = {
  ru: [],
  en: [],
  uz: [],
};

/**
 * Zod schema for a localized string where RU is required (acts as the fallback)
 * and EN/UZ are optional.
 */
export function requiredLocalizedString(min: number, max: number) {
  return z.object({
    ru: z.string().min(min).max(max),
    en: z
      .string()
      .max(max)
      .optional()
      .or(z.literal('')),
    uz: z
      .string()
      .max(max)
      .optional()
      .or(z.literal('')),
  });
}

/** Zod schema for an optional localized string — every language is optional. */
export function optionalLocalizedString(max: number) {
  const field = z
    .string()
    .max(max)
    .optional()
    .or(z.literal(''));
  return z.object({
    ru: field,
    en: field,
    uz: field,
  });
}

/**
 * Zod schema for a localized array of short strings (e.g. features, tags).
 */
export function localizedStringArray(maxItems: number, maxItemLength: number) {
  const items = z.array(z.string().min(1).max(maxItemLength)).max(maxItems);
  return z.object({
    ru: items.default([]),
    en: items.default([]),
    uz: items.default([]),
  });
}
