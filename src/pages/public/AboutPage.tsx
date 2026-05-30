import { useTranslation } from 'react-i18next';

export function AboutPage() {
  const { t } = useTranslation();
  return (
    <section className="container py-20 sm:py-28">
      <p className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-foreground/40">
        <span className="h-2 w-2 rounded-full bg-lime" />
        {t('about.subtitle')}
      </p>
      <h1 className="mt-5 max-w-4xl font-display text-[clamp(2.6rem,7vw,5.5rem)] font-extrabold uppercase leading-[0.98] tracking-tight text-balance">
        {t('about.title')}
      </h1>
    </section>
  );
}
