import { useMutation } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';
import type { Language } from '@/i18n/config';
import { translateText } from './api';

export interface AutoTranslateRequest {
  source: Language;
  targets: Language[];
  /** Plain string fields keyed by name, e.g. { name: 'Сайт' }. */
  strings: Record<string, string>;
  /** Array-of-string fields keyed by name, e.g. { features: ['Дизайн'] }. */
  arrays?: Record<string, string[]>;
}

export interface AutoTranslatePayload {
  strings: Record<string, string>;
  arrays: Record<string, string[]>;
}

export interface AutoTranslateOutcome {
  results: Partial<Record<Language, AutoTranslatePayload>>;
  failedLangs: Language[];
}

/**
 * Translate a set of fields from one language into several targets.
 * Each target is translated independently: if one fails (quota hit,
 * network error, or an unsupported language) it is collected into
 * `failedLangs` and the rest still succeed.
 */
export function useAutoTranslate() {
  const { t } = useTranslation();

  return useMutation<AutoTranslateOutcome, Error, AutoTranslateRequest>({
    mutationFn: async ({ source, targets, strings, arrays }) => {
      const results: AutoTranslateOutcome['results'] = {};
      const failedLangs: Language[] = [];

      for (const target of targets) {
        try {
          const outStrings: Record<string, string> = {};
          for (const [key, value] of Object.entries(strings)) {
            outStrings[key] = value.trim()
              ? await translateText({ text: value, source, target })
              : '';
          }

          const outArrays: Record<string, string[]> = {};
          for (const [key, items] of Object.entries(arrays ?? {})) {
            outArrays[key] = await Promise.all(
              items.map((item) => translateText({ text: item, source, target })),
            );
          }

          results[target] = { strings: outStrings, arrays: outArrays };
        } catch {
          failedLangs.push(target);
        }
      }

      return { results, failedLangs };
    },
    onError: () => toast.error(t('translate.error')),
  });
}
