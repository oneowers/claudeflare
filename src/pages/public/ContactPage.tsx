import { useTranslation } from 'react-i18next';
import { Mail, Send } from 'lucide-react';
import { ContactForm } from '@/features/leads/components/ContactForm';

export function ContactPage() {
  const { t } = useTranslation();
  return (
    <section className="container py-12 sm:py-16">
      <div className="grid gap-6 lg:grid-cols-[1fr_1.3fr]">
        {/* Left — violet statement panel */}
        <header className="relative flex flex-col justify-between overflow-hidden rounded-panel bg-violet p-8 sm:p-10">
          <div aria-hidden className="bg-spark pointer-events-none absolute inset-0 opacity-30" />
          <div className="relative">
            <p className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-white/70">
              <span className="h-2 w-2 rounded-full bg-lime" />
              {t('contact.kicker')}
            </p>
            <h1 className="mt-5 font-display text-4xl font-extrabold uppercase leading-[1.0] tracking-tight text-white sm:text-5xl">
              {t('contact.title')}
            </h1>
            <p className="mt-5 max-w-md text-base leading-relaxed text-white/80">
              {t('contact.subtitle')}
            </p>
          </div>

          <div className="relative mt-10 space-y-3 text-sm">
            <a
              href="mailto:hello@webstudio.dev"
              className="inline-flex items-center gap-3 text-white transition-opacity hover:opacity-80"
            >
              <Mail className="h-4 w-4" />
              hello@webstudio.dev
            </a>
            <p className="flex items-center gap-3 text-white/70">
              <Send className="h-4 w-4" />
              {t('contact.replyTime')}
            </p>
          </div>
        </header>

        {/* Right — form panel */}
        <div className="rounded-panel border border-white/10 bg-surface p-6 sm:p-10">
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
