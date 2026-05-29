import { useTranslation } from 'react-i18next';
import { Mail, Send } from 'lucide-react';
import { ContactForm } from '@/features/leads/components/ContactForm';
import { Seo } from '@/components/shared/Seo';

export function ContactPage() {
  const { t } = useTranslation();
  return (
    <>
      <Seo title={t('nav.contact')} description={t('contact.subtitle')} />
      <section className="container py-16">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr]">
          <header>
            <p className="text-sm font-medium text-muted-foreground">
              {t('contact.kicker')}
            </p>
            <h1 className="mt-2 text-4xl font-bold tracking-tight md:text-5xl">
              {t('contact.title')}
            </h1>
            <p className="mt-4 max-w-md text-base text-muted-foreground">
              {t('contact.subtitle')}
            </p>

            <div className="mt-8 space-y-3 text-sm">
              <a
                href="mailto:hello@webstudio.dev"
                className="flex items-center gap-3 text-foreground hover:text-foreground/80"
              >
                <Mail className="h-4 w-4 text-muted-foreground" />
                hello@webstudio.dev
              </a>
              <p className="flex items-center gap-3 text-muted-foreground">
                <Send className="h-4 w-4" />
                {t('contact.replyTime')}
              </p>
            </div>
          </header>

          <div className="rounded-lg border border-border/60 bg-background p-6 md:p-8">
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}
