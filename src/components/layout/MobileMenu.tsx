import * as Dialog from '@radix-ui/react-dialog';
import { X, ArrowRight } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { cn } from '@/lib/utils';
import { LocalizedLink, useLocalizedPath } from '@/i18n/hooks';
import { LanguageSwitcher } from '@/i18n/LanguageSwitcher';

interface NavItem {
  to: string;
  label: string;
  end?: boolean;
}

interface MobileMenuProps {
  children: React.ReactNode;
  nav: NavItem[];
}

export function MobileMenu({ children, nav }: MobileMenuProps) {
  const { t } = useTranslation();
  const localize = useLocalizedPath();

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>{children}</Dialog.Trigger>
      <Dialog.Portal>
        {/* Scrim */}
        <Dialog.Overlay className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 duration-300" />

        {/* Panel */}
        <Dialog.Content
          aria-describedby={undefined}
          className={cn(
            'fixed inset-y-0 right-0 z-[101] flex w-[min(320px,100vw)] flex-col',
            'bg-[#0A0908] border-l border-white/[0.09]',
            'shadow-[−20px_0_60px_rgba(0,0,0,0.5)]',
            'data-[state=open]:animate-in data-[state=closed]:animate-out',
            'data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right',
            'duration-[280ms] [animation-timing-function:cubic-bezier(0.16,1,0.3,1)]',
          )}
        >
          <Dialog.Title className="sr-only">Навигация</Dialog.Title>

          {/* Header row */}
          <div className="flex items-center justify-between border-b border-white/[0.09] px-5 py-4">
            <Dialog.Close asChild>
              <LocalizedLink to="/" className="flex items-center gap-2">
                <span className="grid h-8 w-8 place-items-center rounded-lg bg-primary text-sm font-bold text-primary-foreground">
                  W
                </span>
                <span className="text-base font-bold tracking-tight text-white">WebStudio</span>
              </LocalizedLink>
            </Dialog.Close>

            <Dialog.Close asChild>
              <button
                className="grid h-9 w-9 place-items-center rounded-lg text-white/50 transition-colors hover:bg-white/[0.08] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                aria-label={t('nav.close')}
              >
                <X className="h-5 w-5" />
              </button>
            </Dialog.Close>
          </div>

          {/* Nav links */}
          <nav className="flex-1 overflow-y-auto py-1" aria-label="Основная навигация">
            {nav.map((item) => (
              <Dialog.Close key={item.to} asChild>
                <NavLink
                  to={localize(item.to)}
                  end={item.end}
                  className={({ isActive }) =>
                    cn(
                      'flex h-12 items-center px-5 text-base font-medium transition-colors',
                      isActive
                        ? 'text-white'
                        : 'text-white/55 hover:bg-white/[0.05] hover:text-white',
                    )
                  }
                >
                  {item.label}
                </NavLink>
              </Dialog.Close>
            ))}
          </nav>

          {/* Footer */}
          <div className="flex flex-col gap-3 border-t border-white/[0.09] px-5 py-5">
            <LanguageSwitcher className="text-white/55" />
            <Dialog.Close asChild>
              <LocalizedLink
                to="/contact"
                className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-full bg-primary text-sm font-medium text-primary-foreground transition-transform hover:-translate-y-0.5 active:scale-[0.97]"
              >
                <span className="grid h-6 w-6 place-items-center rounded-[7px] bg-primary-foreground/15">
                  <ArrowRight className="h-3.5 w-3.5" />
                </span>
                {t('nav.discussProject')}
              </LocalizedLink>
            </Dialog.Close>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
