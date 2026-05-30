import { useTranslation } from 'react-i18next';
import { ArrowRight, ArrowUp } from 'lucide-react';
import { LocalizedLink } from '@/i18n/hooks';

export function Footer() {
  const { t } = useTranslation();
  const year = new Date().getFullYear();

  const scrollTop = () =>
    window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className="px-3 pb-3 sm:px-4 sm:pb-4">
      {/* — Big CTA band — */}
      <section className="relative overflow-hidden rounded-panel bg-violet px-6 py-16 text-center sm:px-12 sm:py-24">
        <div aria-hidden className="bg-spark pointer-events-none absolute inset-0 opacity-40" />
        <p className="relative font-mono text-xs uppercase tracking-[0.2em] text-white/70">
          {t('home.ctaBannerSubtitle')}
        </p>
        <h2 className="relative mx-auto mt-4 max-w-3xl font-display text-4xl font-extrabold uppercase leading-[1.02] tracking-tight text-white text-balance sm:text-6xl">
          {t('home.ctaBannerTitle')}
        </h2>
        <LocalizedLink
          to="/contact"
          className="group relative mt-9 inline-flex h-[52px] items-center gap-2 rounded-full bg-white px-8 text-base font-semibold text-ink transition-all duration-200 ease-brand hover:-translate-y-0.5"
        >
          {t('home.ctaBannerButton')}
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </LocalizedLink>
      </section>

      {/* — Footer proper — */}
      <div className="relative mt-3 overflow-hidden rounded-panel bg-surface px-6 py-12 sm:px-12 sm:py-16">
        <div className="flex flex-col gap-12 lg:flex-row lg:justify-between">
          {/* Brand */}
          <div className="max-w-sm">
            <LocalizedLink
              to="/"
              className="inline-flex items-center gap-1.5 font-display text-2xl font-extrabold uppercase tracking-tight"
            >
              WebStudio
              <span className="h-2 w-2 rounded-full bg-lime" />
            </LocalizedLink>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              {t('footer.tagline')}
            </p>
          </div>

          {/* Nav columns */}
          <nav className="grid grid-cols-2 gap-x-12 gap-y-3 text-[15px] sm:grid-cols-3">
            <LocalizedLink to="/services" className="text-foreground/70 transition-colors hover:text-foreground">
              {t('nav.services')}
            </LocalizedLink>
            <LocalizedLink to="/portfolio" className="text-foreground/70 transition-colors hover:text-foreground">
              {t('nav.portfolio')}
            </LocalizedLink>
            <LocalizedLink to="/about" className="text-foreground/70 transition-colors hover:text-foreground">
              {t('nav.about')}
            </LocalizedLink>
            <LocalizedLink to="/contact" className="text-foreground/70 transition-colors hover:text-foreground">
              {t('nav.contact')}
            </LocalizedLink>
          </nav>
        </div>

        {/* Bottom row */}
        <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-6">
          <p className="text-sm text-foreground/40">© {year} WebStudio</p>
          <button
            type="button"
            onClick={scrollTop}
            aria-label="Up"
            className="grid h-11 w-11 place-items-center rounded-full bg-white/[0.06] text-foreground transition-colors hover:bg-white/[0.12]"
          >
            <ArrowUp className="h-5 w-5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
