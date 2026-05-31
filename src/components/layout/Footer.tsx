import { useTranslation } from 'react-i18next';
import { ArrowRight, ArrowUp } from 'lucide-react';
import { LocalizedLink, useCurrentLanguage } from '@/i18n/hooks';
import { pickLocale } from '@/i18n/localized';
import { useSiteSettings } from '@/features/settings/hooks/useSiteSettings';

/** Renders an internal localized route or an external/mailto/tel link. */
function FooterNavLink({ url, label }: { url: string; label: string }) {
  const cls = 'text-foreground/70 transition-colors hover:text-foreground';
  const external = /^(https?:|mailto:|tel:)/.test(url);
  if (external) {
    return (
      <a href={url} target={url.startsWith('http') ? '_blank' : undefined} rel="noreferrer" className={cls}>
        {label}
      </a>
    );
  }
  return (
    <LocalizedLink to={url} className={cls}>
      {label}
    </LocalizedLink>
  );
}

export function Footer() {
  const { t } = useTranslation();
  const lang = useCurrentLanguage();
  const { data: settings } = useSiteSettings();
  const year = new Date().getFullYear();

  const tagline = pickLocale(settings?.tagline, lang) ?? t('footer.tagline');
  const copyright = (
    pickLocale(settings?.copyright, lang) ?? '© {{year}} WebStudio'
  ).replace('{{year}}', String(year));
  const columns = settings?.columns ?? [];
  const socials = settings?.socials ?? [];
  const email = settings?.contact_email;
  const phone = settings?.contact_phone;
  const address = pickLocale(settings?.contact_address, lang);
  const payments = settings?.payment_methods ?? [];

  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

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
          {/* Brand + tagline + contacts */}
          <div className="max-w-sm">
            <LocalizedLink
              to="/"
              className="inline-flex items-center gap-1.5 font-display text-2xl font-extrabold uppercase tracking-tight"
            >
              WebStudio
              <span className="h-2 w-2 rounded-full bg-lime" />
            </LocalizedLink>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{tagline}</p>

            {(email || phone || address) && (
              <div className="mt-6 space-y-1.5 text-sm text-foreground/70">
                {email && (
                  <a href={`mailto:${email}`} className="block transition-colors hover:text-foreground">
                    {email}
                  </a>
                )}
                {phone && (
                  <a href={`tel:${phone.replace(/[^\d+]/g, '')}`} className="block transition-colors hover:text-foreground">
                    {phone}
                  </a>
                )}
                {address && <p className="text-foreground/55">{address}</p>}
              </div>
            )}
          </div>

          {/* Dynamic nav columns */}
          {columns.length > 0 ? (
            <nav className="grid grid-cols-2 gap-x-12 gap-y-8 sm:grid-cols-3">
              {columns.map((col, ci) => (
                <div key={ci} className="space-y-3">
                  {pickLocale(col.title, lang) && (
                    <p className="text-xs font-semibold uppercase tracking-wider text-foreground/45">
                      {pickLocale(col.title, lang)}
                    </p>
                  )}
                  <ul className="space-y-2.5 text-[15px]">
                    {col.links.map((link, li) => (
                      <li key={li}>
                        <FooterNavLink url={link.url} label={pickLocale(link.label, lang) ?? link.url} />
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </nav>
          ) : (
            <nav className="grid grid-cols-2 gap-x-12 gap-y-3 text-[15px] sm:grid-cols-3">
              <FooterNavLink url="/services" label={t('nav.services')} />
              <FooterNavLink url="/portfolio" label={t('nav.portfolio')} />
              <FooterNavLink url="/about" label={t('nav.about')} />
              <FooterNavLink url="/contact" label={t('nav.contact')} />
            </nav>
          )}
        </div>

        {/* Socials + payment methods */}
        {(socials.length > 0 || payments.length > 0) && (
          <div className="mt-12 flex flex-wrap items-center justify-between gap-x-8 gap-y-5">
            {socials.length > 0 && (
              <div className="flex flex-wrap gap-2.5">
                {socials.map((s, i) => (
                  <a
                    key={i}
                    href={s.url}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-full border border-white/12 px-4 py-1.5 text-sm capitalize text-foreground/70 transition-colors hover:border-white/25 hover:text-foreground"
                  >
                    {s.platform}
                  </a>
                ))}
              </div>
            )}
            {payments.length > 0 && (
              <div className="flex flex-wrap gap-2 text-xs uppercase tracking-wide text-foreground/40">
                {payments.map((p) => (
                  <span key={p} className="rounded bg-white/[0.05] px-2.5 py-1">
                    {p}
                  </span>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Bottom row */}
        <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-6">
          <p className="text-sm text-foreground/60">{copyright}</p>
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
