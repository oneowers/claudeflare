import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { LayoutDashboard, Briefcase, Image, Inbox, LogOut, Tags, FlaskConical, Building2, Settings } from 'lucide-react';
import { cn } from '@/lib/utils';
import { supabase } from '@/lib/supabase';
import { LanguageSwitcher } from '@/i18n/LanguageSwitcher';
import { useLocalizedPath } from '@/i18n/hooks';
import { ThemeToggle } from '@/components/theme/ThemeToggle';

export function AdminSidebar() {
  const { t } = useTranslation();
  const localize = useLocalizedPath();

  const items = [
    { to: '/admin', label: t('admin.nav.dashboard'), icon: LayoutDashboard, end: true },
    { to: '/admin/services', label: t('admin.nav.services'), icon: Briefcase },
    { to: '/admin/portfolio', label: t('admin.nav.portfolio'), icon: Image },
    { to: '/admin/leads', label: t('admin.nav.leads'), icon: Inbox },
    { to: '/admin/categories', label: t('admin.nav.categories'), icon: Tags },
    { to: '/admin/test-reports', label: t('admin.nav.testReports'), icon: FlaskConical },
    { to: '/admin/partners', label: t('admin.nav.partners'), icon: Building2 },
    { to: '/admin/settings', label: t('admin.nav.settings'), icon: Settings },
  ];

  return (
    <aside className="hidden w-60 shrink-0 border-r border-border/60 bg-muted/30 md:flex md:flex-col">
      <div className="flex h-16 items-center justify-between border-b border-border/60 px-6">
        <span className="text-sm font-semibold tracking-tight">
          {t('admin.header')}
        </span>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <LanguageSwitcher variant="compact" />
        </div>
      </div>
      <nav className="flex-1 space-y-1 px-3 py-4">
        {items.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={localize(to)}
            end={end}
            className={({ isActive }) =>
              cn(
                'flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors',
                isActive
                  ? 'bg-background text-foreground shadow-sm'
                  : 'text-muted-foreground hover:bg-background/60 hover:text-foreground',
              )
            }
          >
            <Icon className="h-4 w-4" />
            {label}
          </NavLink>
        ))}
      </nav>
      <div className="border-t border-border/60 p-3">
        <button
          type="button"
          onClick={() => supabase.auth.signOut()}
          className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-background/60 hover:text-foreground"
        >
          <LogOut className="h-4 w-4" />
          {t('admin.logout')}
        </button>
      </div>
    </aside>
  );
}
