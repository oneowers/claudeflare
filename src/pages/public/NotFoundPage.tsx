import { useTranslation } from 'react-i18next';
import { LocalizedLink } from '@/i18n/hooks';
import { Seo } from '@/components/shared/Seo';

export function NotFoundPage() {
  const { t } = useTranslation();
  return (
    <>
      <Seo title={t('notFound.title')} noIndex />
      <section className="container flex flex-col items-start py-24">
        <p className="text-sm font-medium text-muted-foreground">
          {t('notFound.code')}
        </p>
        <h1 className="mt-2 text-5xl font-bold tracking-tight">
          {t('notFound.title')}
        </h1>
        <LocalizedLink
          to="/"
          className="mt-8 inline-flex h-10 items-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground hover:bg-primary/90"
        >
          {t('notFound.home')}
        </LocalizedLink>
      </section>
    </>
  );
}
