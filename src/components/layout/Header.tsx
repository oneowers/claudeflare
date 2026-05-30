import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Menu, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LocalizedLink, useLocalizedPath } from '@/i18n/hooks';
import { LanguageSwitcher } from '@/i18n/LanguageSwitcher';
import { MobileMenu } from './MobileMenu';

export function Header() {
  const { t } = useTranslation();
  const localize = useLocalizedPath();
  const [open, setOpen] = useState(false);

  const nav = [
    { to: '/', label: t('nav.home'), end: true },
    { to: '/services', label: t('nav.services') },
    { to: '/portfolio', label: t('nav.portfolio') },
    { to: '/about', label: t('nav.about') },
    { to: '/contact', label: t('nav.contact') },
  ];

  return (
    <header className="sticky top-0 z-50 px-3 pt-3 sm:px-4 sm:pt-4">
      {/* Floating dark nav panel — PROSTO signature */}
      <div className="mx-auto flex h-16 max-w-[1240px] items-center justify-between gap-4 rounded-panel border border-white/10 bg-surface/85 px-4 backdrop-blur-xl sm:px-6">
        {/* Logo */}
        <LocalizedLink
          to="/"
          className="flex items-center gap-1.5 font-display text-lg font-extrabold uppercase tracking-tight text-foreground"
        >
          WebStudio
          <span className="h-2 w-2 rounded-full bg-lime" />
        </LocalizedLink>

        {/* Center nav */}
        <nav className="hidden items-center gap-1 md:flex">
          {nav.map((item) => (
            <NavLink
              key={item.to}
              to={localize(item.to)}
              end={item.end}
              className={({ isActive }) =>
                cn(
                  'rounded-full px-4 py-2 text-[15px] font-medium transition-colors',
                  isActive
                    ? 'bg-white/[0.08] text-foreground'
                    : 'text-foreground/65 hover:bg-white/[0.05] hover:text-foreground',
                )
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* Right cluster */}
        <div className="flex items-center gap-2 sm:gap-3">
          <LanguageSwitcher className="hidden text-foreground/65 sm:flex" />
          <LocalizedLink
            to="/contact"
            className="group hidden h-10 items-center gap-2 rounded-full bg-primary pl-5 pr-4 text-sm font-semibold text-primary-foreground transition-all duration-200 ease-brand hover:-translate-y-0.5 hover:bg-violet-deep sm:inline-flex"
          >
            {t('nav.discussProject')}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </LocalizedLink>
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="grid h-10 w-10 place-items-center rounded-full bg-white/[0.06] text-foreground transition-colors hover:bg-white/[0.12] md:hidden"
            aria-label={t('nav.services')}
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </div>

      <MobileMenu open={open} onOpenChange={setOpen} nav={nav} />
    </header>
  );
}
