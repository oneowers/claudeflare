import { useTranslation } from 'react-i18next';

export function AboutPage() {
  const { t } = useTranslation();
  return (
    <section className="container py-16">
      <h1 className="text-4xl font-bold tracking-tight">{t('about.title')}</h1>
      <p className="mt-3 max-w-2xl text-muted-foreground">{t('about.subtitle')}</p>
    </section>
  );
}
