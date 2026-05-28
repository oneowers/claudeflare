import { useTranslation } from 'react-i18next';
import { cn } from '@/lib/utils';
import { LANGUAGE_SHORT, SUPPORTED_LANGUAGES, type Language } from './config';

interface LocaleTabsProps {
  active: Language;
  onChange: (lang: Language) => void;
  /** Highlight languages that have unfilled required fields. */
  invalid?: Partial<Record<Language, boolean>>;
  className?: string;
}

export function LocaleTabs({
  active,
  onChange,
  invalid,
  className,
}: LocaleTabsProps) {
  const { t } = useTranslation();
  return (
    <div
      role="tablist"
      aria-label={t('common.languageSwitcher')}
      className={cn(
        'inline-flex rounded-md border border-border/60 bg-muted/30 p-1',
        className,
      )}
    >
      {SUPPORTED_LANGUAGES.map((lang) => {
        const isActive = lang === active;
        const hasError = invalid?.[lang];
        return (
          <button
            key={lang}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(lang)}
            className={cn(
              'rounded px-3 py-1 text-xs font-medium uppercase transition-colors',
              isActive
                ? 'bg-background text-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground',
              hasError && 'text-destructive',
            )}
          >
            {LANGUAGE_SHORT[lang]}
          </button>
        );
      })}
    </div>
  );
}
