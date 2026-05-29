import { useTranslation } from 'react-i18next';
import { Seo } from '@/components/shared/Seo';

export function AboutPage() {
  const { t } = useTranslation();
  return (
    <>
      <Seo title={t('nav.about')} description={t('about.subtitle')} />
      <section className="container py-16">
        <h1 className="text-4xl font-bold tracking-tight">{t('about.title')}</h1>
        <p className="mt-3 max-w-2xl text-muted-foreground">{t('about.subtitle')}</p>
      </section>
    </>
  );
}
