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
  open: boolean;
  onOpenChange: (open: boolean) => void;
  nav: NavItem[];
}

export function MobileMenu({ open, onOpenChange, nav }: MobileMenuProps) {
  const { t } = useTranslation();
  const localize = useLocalizedPath();

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <Dialog.Content
          aria-describedby={undefined}
          className="fixed inset-y-3 right-3 z-[101] flex w-[min(20rem,calc(100vw-1.5rem))] flex-col rounded-panel border border-white/10 bg-surface p-6 duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right md:hidden"
        >
          <div className="flex items-center justify-between">
            <Dialog.Title className="font-display text-lg font-extrabold uppercase tracking-tight">
              {t('nav.menu')}
            </Dialog.Title>
            <Dialog.Close asChild>
              <button
                type="button"
                aria-label="Close"
                className="grid h-9 w-9 place-items-center rounded-full bg-white/[0.06] text-foreground transition-colors hover:bg-white/[0.12]"
              >
                <X className="h-5 w-5" />
              </button>
            </Dialog.Close>
          </div>

          <nav className="mt-8 flex flex-col gap-1">
            {nav.map((item) => (
              <Dialog.Close key={item.to} asChild>
                <NavLink
                  to={localize(item.to)}
                  end={item.end}
                  className={({ isActive }) =>
                    cn(
                      'rounded-full px-4 py-3 text-base font-medium transition-colors',
                      isActive
                        ? 'bg-white/[0.08] text-foreground'
                        : 'text-foreground/65 hover:bg-white/[0.05] hover:text-foreground',
                    )
                  }
                >
                  {item.label}
                </NavLink>
              </Dialog.Close>
            ))}
          </nav>

          <div className="mt-auto flex flex-col gap-3 pt-8">
            <Dialog.Close asChild>
              <LocalizedLink
                to="/contact"
                className="group inline-flex h-12 items-center justify-center gap-2 rounded-full bg-primary px-4 text-sm font-semibold text-primary-foreground transition-colors hover:bg-violet-deep"
              >
                {t('nav.discussProject')}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </LocalizedLink>
            </Dialog.Close>
            <LanguageSwitcher className="text-foreground/65" />
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
