import { useTranslation } from 'react-i18next';
import { LocalizedLink } from '@/i18n/hooks';

export function NotFoundPage() {
  const { t } = useTranslation();
  return (
    <section className="container flex min-h-[70vh] flex-col items-center justify-center py-16 text-center">
      <p className="font-display text-[clamp(6rem,22vw,16rem)] font-extrabold uppercase leading-[0.85] tracking-tight text-violet">
        {t('notFound.code')}
      </p>
      <h1 className="mt-4 font-display text-2xl font-bold uppercase tracking-tight sm:text-3xl">
        {t('notFound.title')}
      </h1>
      <LocalizedLink
        to="/"
        className="mt-10 inline-flex h-12 items-center rounded-full bg-primary px-7 text-sm font-semibold text-primary-foreground transition-colors hover:bg-violet-deep"
      >
        {t('notFound.home')}
      </LocalizedLink>
    </section>
  );
}
