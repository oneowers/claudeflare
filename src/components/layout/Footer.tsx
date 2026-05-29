import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Mail, Phone, MapPin } from 'lucide-react';
import { LocalizedLink, useCurrentLanguage } from '@/i18n/hooks';
import { LanguageSwitcher } from '@/i18n/LanguageSwitcher';
import { pickLocale } from '@/i18n/localized';
import { useSiteSettings } from '@/features/site/hooks/useSiteSettings';
import { PaymentIcon } from '@/features/site/components/PaymentIcons';
import { SocialIcon } from '@/features/site/components/SocialIcon';
import type { FooterLink } from '@/features/site/types';
import type { Language } from '@/i18n/config';

function FooterNavLink({ link, lang }: { link: FooterLink; lang: Language }) {
  const label = pickLocale(link.label, lang) ?? link.url;
  const isInternal = link.url.startsWith('/');
  if (isInternal) {
    return (
      <LocalizedLink to={link.url} className="transition-colors hover:text-foreground">
        {label}
      </LocalizedLink>
    );
  }
  return (
    <a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      className="transition-colors hover:text-foreground"
    >
      {label}
    </a>
  );
}

export function Footer() {
  const { t } = useTranslation();
  const lang = useCurrentLanguage();
  const { data: settings } = useSiteSettings();
  const [drift, setDrift] = useState(0);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const max = document.documentElement.scrollHeight - window.innerHeight;
        const distFromBottom = max - window.scrollY;
        // progress across the last viewport of scroll → 0 (far) to 1 (at bottom)
        const progress = Math.min(Math.max(1 - distFromBottom / window.innerHeight, 0), 1);
        setDrift(progress * 72);
      });
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  const tagline = pickLocale(settings?.tagline, lang) ?? t('footer.tagline');
  const columns = settings?.columns ?? [];
  const socials = settings?.socials ?? [];
  const payments = settings?.payment_methods ?? [];
  const email = settings?.contact_email;
  const phone = settings?.contact_phone;
  const address = pickLocale(settings?.contact_address, lang);

  const copyrightRaw = pickLocale(settings?.copyright, lang);
  const year = String(new Date().getFullYear());
  const copyright = copyrightRaw
    ? copyrightRaw.replace('{{year}}', year)
    : t('footer.copyright', { year });

  return (
    <footer className="relative overflow-hidden border-t border-border/60 bg-muted/40">
      {/* Parallax wordmark drifting up as the footer is revealed */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 select-none overflow-hidden"
      >
        <span
          className="block whitespace-nowrap text-center font-display text-[22vw] font-extrabold leading-[0.8] tracking-tighter text-foreground/[0.04] will-change-transform"
          style={{ transform: `translateY(${28 - drift}px)` }}
        >
          WebStudio
        </span>
      </div>

      <div className="container relative z-10 grid grid-cols-1 gap-10 py-14 md:grid-cols-[1.4fr_2fr]">
        {/* Brand */}
        <div className="max-w-sm">
          <LocalizedLink to="/" className="text-lg font-bold tracking-tight">
            WebStudio
          </LocalizedLink>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{tagline}</p>

          {socials.length > 0 && (
            <div className="mt-5 flex gap-2">
              {socials.map((s, i) => (
                <a
                  key={`${s.platform}-${i}`}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.platform}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-border/60 text-muted-foreground transition-colors hover:border-foreground/30 hover:text-foreground"
                >
                  <SocialIcon platform={s.platform} className="h-4 w-4" />
                </a>
              ))}
            </div>
          )}

          <div className="mt-5 sm:hidden">
            <LanguageSwitcher />
          </div>
        </div>

        {/* Columns + contacts */}
        <div className="grid grid-cols-2 gap-8 text-sm md:grid-cols-3">
          {columns.map((col, idx) => (
            <div key={idx}>
              <p className="mb-3 font-medium">{pickLocale(col.title, lang)}</p>
              <ul className="space-y-2 text-muted-foreground">
                {col.links.map((link, li) => (
                  <li key={li}>
                    <FooterNavLink link={link} lang={lang} />
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {(email || phone || address) && (
            <div className="col-span-2 md:col-span-1">
              <p className="mb-3 font-medium">{t('footer.contacts')}</p>
              <ul className="space-y-2.5 text-muted-foreground">
                {email && (
                  <li>
                    <a href={`mailto:${email}`} className="inline-flex items-center gap-2 transition-colors hover:text-foreground">
                      <Mail className="h-3.5 w-3.5 shrink-0" />
                      {email}
                    </a>
                  </li>
                )}
                {phone && (
                  <li>
                    <a href={`tel:${phone.replace(/[^+\d]/g, '')}`} className="inline-flex items-center gap-2 transition-colors hover:text-foreground">
                      <Phone className="h-3.5 w-3.5 shrink-0" />
                      {phone}
                    </a>
                  </li>
                )}
                {address && (
                  <li className="inline-flex items-start gap-2">
                    <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                    <span>{address}</span>
                  </li>
                )}
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Payment methods */}
      {payments.length > 0 && (
        <div className="border-t border-border/60">
          <div className="container flex flex-wrap items-center gap-x-6 gap-y-3 py-5">
            <span className="text-xs uppercase tracking-wider text-muted-foreground">
              {t('footer.payments')}
            </span>
            <div className="flex flex-wrap items-center gap-2">
              {payments.map((m) => (
                <PaymentIcon key={m} method={m} />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Bottom bar */}
      <div className="border-t border-border/60">
        <div className="container flex items-center justify-between py-4 text-xs text-muted-foreground">
          <span>{copyright}</span>
          <span>{t('footer.madeBy')}</span>
        </div>
      </div>
    </footer>
  );
}
