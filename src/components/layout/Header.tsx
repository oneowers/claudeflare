import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { cn } from '@/lib/utils';
import { LocalizedLink, useLocalizedPath } from '@/i18n/hooks';
import { LanguageSwitcher } from '@/i18n/LanguageSwitcher';
import { ThemeToggle } from '@/components/theme/ThemeToggle';

export function Header() {
  const { t } = useTranslation();
  const localize = useLocalizedPath();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const nav = [
    { to: '/', label: t('nav.home'), end: true },
    { to: '/services', label: t('nav.services') },
    { to: '/portfolio', label: t('nav.portfolio') },
    { to: '/about', label: t('nav.about') },
    { to: '/contact', label: t('nav.contact') },
  ];

  return (
    <header
      className={cn(
        'sticky top-0 z-40 transition-all duration-500 ease-out motion-reduce:transition-none',
        scrolled ? 'px-4 pt-3' : 'border-b border-border/60',
      )}
    >
      <div
        className={cn(
          'mx-auto flex w-full items-center justify-between transition-all duration-500 ease-out motion-reduce:transition-none',
          scrolled
            ? 'h-16 max-w-6xl rounded-2xl border border-border/60 bg-background/70 px-8 shadow-xl shadow-foreground/[0.06] backdrop-blur-xl supports-[backdrop-filter]:bg-background/55'
            : 'container h-20 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60',
        )}
      >
        <LocalizedLink to="/" className="flex items-baseline gap-2">
          <span className="text-2xl font-black tracking-tight">WebStudio</span>
          <span className="h-2 w-2 rounded-full bg-primary" />
        </LocalizedLink>

        <nav className="hidden gap-2 md:flex">
          {nav.map((item) => (
            <NavLink
              key={item.to}
              to={localize(item.to)}
              end={item.end}
              className={({ isActive }) =>
                cn(
                  'whitespace-nowrap rounded-md px-4 py-2.5 text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-foreground/[0.06] text-foreground'
                    : 'text-muted-foreground hover:bg-foreground/[0.04] hover:text-foreground',
                )
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-5">
          <ThemeToggle />
          <LanguageSwitcher className="hidden sm:inline-flex" />
          <LocalizedLink
            to="/contact"
            className="inline-flex h-11 items-center whitespace-nowrap rounded-md bg-primary px-6 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
          >
            {t('nav.discussProject')}
          </LocalizedLink>
        </div>
      </div>
    </header>
  );
}
