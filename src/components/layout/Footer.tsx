import { useTranslation } from 'react-i18next';
import { LocalizedLink } from '@/i18n/hooks';
import { LanguageSwitcher } from '@/i18n/LanguageSwitcher';

export function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="border-t border-border/60 bg-muted/30">
      <div className="container flex flex-col gap-6 py-12 md:flex-row md:items-start md:justify-between">
        <div className="max-w-sm">
          <LocalizedLink to="/" className="text-lg font-bold tracking-tight">
            WebStudio
          </LocalizedLink>
          <p className="mt-2 text-sm text-muted-foreground">{t('footer.tagline')}</p>
          <div className="mt-4 sm:hidden">
            <LanguageSwitcher />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-8 text-sm md:grid-cols-3">
          <div>
            <p className="mb-3 font-medium">{t('footer.studio')}</p>
            <ul className="space-y-2 text-muted-foreground">
              <li><LocalizedLink to="/about" className="hover:text-foreground">{t('footer.aboutUs')}</LocalizedLink></li>
              <li><LocalizedLink to="/portfolio" className="hover:text-foreground">{t('footer.works')}</LocalizedLink></li>
              <li><LocalizedLink to="/services" className="hover:text-foreground">{t('nav.services')}</LocalizedLink></li>
            </ul>
          </div>
          <div>
            <p className="mb-3 font-medium">{t('footer.contacts')}</p>
            <ul className="space-y-2 text-muted-foreground">
              <li><LocalizedLink to="/contact" className="hover:text-foreground">{t('footer.write')}</LocalizedLink></li>
              <li><a href="mailto:hello@webstudio.dev" className="hover:text-foreground">hello@webstudio.dev</a></li>
            </ul>
          </div>
          <div className="col-span-2 md:col-span-1">
            <p className="mb-3 font-medium">{t('footer.legal')}</p>
            <ul className="space-y-2 text-muted-foreground">
              <li><a href="#" className="hover:text-foreground">{t('footer.privacy')}</a></li>
            </ul>
          </div>
        </div>
      </div>
      <div className="border-t border-border/60">
        <div className="container flex items-center justify-between py-4 text-xs text-muted-foreground">
          <span>{t('footer.copyright', { year: new Date().getFullYear() })}</span>
          <span>{t('footer.madeBy')}</span>
        </div>
      </div>
    </footer>
  );
}
