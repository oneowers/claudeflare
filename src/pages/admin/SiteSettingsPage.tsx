import { useTranslation } from 'react-i18next';
import { useSiteSettings } from '@/features/site/hooks/useSiteSettings';
import { SiteSettingsForm } from '@/features/site/components/SiteSettingsForm';

export function SiteSettingsPage() {
  const { t } = useTranslation();
  const { data, isLoading, error } = useSiteSettings();

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-semibold tracking-tight">
          {t('admin.settings.title')}
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {t('admin.settings.subtitle')}
        </p>
      </header>

      {isLoading && (
        <div className="h-96 animate-pulse rounded-lg bg-muted/40" />
      )}
      {error && (
        <p className="text-sm text-destructive">{t('admin.settings.loadError')}</p>
      )}
      {data && <SiteSettingsForm settings={data} />}
    </div>
  );
}
