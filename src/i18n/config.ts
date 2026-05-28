export const SUPPORTED_LANGUAGES = ['ru', 'en', 'uz'] as const;
export type Language = (typeof SUPPORTED_LANGUAGES)[number];

export const DEFAULT_LANGUAGE: Language = 'ru';

export const LANGUAGE_LABELS: Record<Language, string> = {
  ru: 'Русский',
  en: 'English',
  uz: 'O‘zbekcha',
};

export const LANGUAGE_SHORT: Record<Language, string> = {
  ru: 'RU',
  en: 'EN',
  uz: 'UZ',
};

export function isLanguage(value: string): value is Language {
  return (SUPPORTED_LANGUAGES as readonly string[]).includes(value);
}
