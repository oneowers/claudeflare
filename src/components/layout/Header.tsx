import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { cn } from '@/lib/utils';
import { LocalizedLink, useLocalizedPath } from '@/i18n/hooks';
import { LanguageSwitcher } from '@/i18n/LanguageSwitcher';

export function Header() {
  const { t } = useTranslation();
  const localize = useLocalizedPath();

  const nav = [
    { to: '/', label: t('nav.home'), end: true },
    { to: '/services', label: t('nav.services') },
    { to: '/portfolio', label: t('nav.portfolio') },
    { to: '/about', label: t('nav.about') },
    { to: '/contact', label: t('nav.contact') },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <LocalizedLink to="/" className="flex items-baseline gap-1.5">
          <span className="text-xl font-bold tracking-tight">WebStudio</span>
          <span className="h-1.5 w-1.5 rounded-full bg-primary" />
        </LocalizedLink>

        <nav className="hidden gap-1 md:flex">
          {nav.map((item) => (
            <NavLink
              key={item.to}
              to={localize(item.to)}
              end={item.end}
              className={({ isActive }) =>
                cn(
                  'rounded-md px-3 py-2 text-sm font-medium transition-colors',
                  isActive
                    ? 'text-foreground'
                    : 'text-muted-foreground hover:text-foreground',
                )
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <LanguageSwitcher className="hidden sm:inline-flex" />
          <LocalizedLink
            to="/contact"
            className="inline-flex h-9 items-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            {t('nav.discussProject')}
          </LocalizedLink>
        </div>
      </div>
    </header>
  );
}
