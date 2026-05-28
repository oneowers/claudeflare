import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  isLanguage,
  LANGUAGE_SHORT,
  SUPPORTED_LANGUAGES,
  type Language,
} from './config';
import { useCurrentLanguage } from './hooks';

interface LanguageSwitcherProps {
  className?: string;
  variant?: 'inline' | 'compact';
}

export function LanguageSwitcher({
  className,
  variant = 'inline',
}: LanguageSwitcherProps) {
  const current = useCurrentLanguage();
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();

  const switchTo = (next: Language) => {
    const parts = location.pathname.split('/').filter(Boolean);
    if (parts[0] && isLanguage(parts[0])) parts[0] = next;
    else parts.unshift(next);
    navigate(`/${parts.join('/')}${location.search}${location.hash}`, {
      replace: true,
    });
  };

  if (variant === 'compact') {
    return (
      <select
        aria-label={t('common.languageSwitcher')}
        value={current}
        onChange={(e) => switchTo(e.target.value as Language)}
        className={cn(
          'h-9 rounded-md border border-input bg-background px-2 text-sm',
          className,
        )}
      >
        {SUPPORTED_LANGUAGES.map((lang) => (
          <option key={lang} value={lang}>
            {LANGUAGE_SHORT[lang]}
          </option>
        ))}
      </select>
    );
  }

  return (
    <div
      className={cn('inline-flex items-center gap-1 text-xs', className)}
      role="group"
      aria-label={t('common.languageSwitcher')}
    >
      <Globe className="mr-1 h-3.5 w-3.5 text-muted-foreground" />
      {SUPPORTED_LANGUAGES.map((lang) => (
        <button
          key={lang}
          type="button"
          onClick={() => switchTo(lang)}
          className={cn(
            'rounded px-1.5 py-0.5 font-medium uppercase transition-colors',
            current === lang
              ? 'text-foreground'
              : 'text-muted-foreground hover:text-foreground',
          )}
          aria-current={current === lang ? 'true' : undefined}
        >
          {LANGUAGE_SHORT[lang]}
        </button>
      ))}
    </div>
  );
}
