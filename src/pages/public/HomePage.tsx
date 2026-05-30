import { useTranslation } from 'react-i18next';
import { ArrowRight } from 'lucide-react';
import { useServices } from '@/features/services/hooks/useServices';
import { usePortfolio } from '@/features/portfolio/hooks/usePortfolio';
import { ServiceCard } from '@/features/services/components/ServiceCard';
import { PortfolioCard } from '@/features/portfolio/components/PortfolioCard';
import { LocalizedLink } from '@/i18n/hooks';
import { Reveal } from '@/components/shared/Reveal';

function SectionHead({
  title,
  link,
  linkLabel,
}: {
  title: string;
  link: string;
  linkLabel: string;
}) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-4">
      <h2 className="flex items-center gap-3 font-display text-4xl font-extrabold leading-[1.02] tracking-tight text-balance sm:text-5xl">
        <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-lime" aria-hidden />
        {title}
      </h2>
      <LocalizedLink
        to={link}
        className="group hidden items-center gap-1.5 text-[15px] font-medium text-foreground/70 transition-colors hover:text-foreground sm:inline-flex"
      >
        {linkLabel}
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
      </LocalizedLink>
    </div>
  );
}

export function HomePage() {
  const { t } = useTranslation();
  const services = useServices(true);
  const portfolio = usePortfolio(true);

  return (
    <>
      {/* ── HERO ── floats with an equal gap on all four sides */}
      <section className="relative overflow-hidden px-3 pb-3 pt-3 sm:px-4 sm:pb-4 sm:pt-4">
        <div className="relative overflow-hidden rounded-panel bg-surface px-6 pb-6 pt-16 sm:px-12 sm:pb-12 sm:pt-24">
          <div aria-hidden className="bg-spark pointer-events-none absolute inset-0 opacity-50" />
          <div
            aria-hidden
            className="glow-violet pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-violet/20 blur-3xl"
          />

          <div className="relative max-w-4xl">
            <p className="flex animate-rise-in items-center gap-2 font-mono text-xs uppercase tracking-[0.22em] text-foreground/60">
              <span className="h-2 w-2 rounded-full bg-lime" />
              {t('home.kicker')}
            </p>
            <h1
              className="mt-6 animate-rise-in font-display text-[clamp(2.25rem,5vw,4rem)] font-extrabold leading-[1.05] tracking-tight text-balance"
              style={{ animationDelay: '80ms' }}
            >
              {t('home.title')}
            </h1>
            <p
              className="mt-7 max-w-xl animate-rise-in text-lg leading-relaxed text-muted-foreground sm:text-xl"
              style={{ animationDelay: '160ms' }}
            >
              {t('home.subtitle')}
            </p>
            <div
              className="mt-10 flex animate-rise-in flex-wrap gap-3"
              style={{ animationDelay: '240ms' }}
            >
              <LocalizedLink
                to="/contact"
                className="group inline-flex h-[52px] items-center gap-2 rounded-full bg-primary px-8 text-base font-semibold text-primary-foreground transition-all duration-200 ease-brand hover:-translate-y-0.5 hover:bg-violet-deep"
              >
                {t('home.ctaDiscuss')}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </LocalizedLink>
              <LocalizedLink
                to="/portfolio"
                className="inline-flex h-[52px] items-center rounded-full border border-white/20 px-8 text-base font-semibold text-foreground transition-colors hover:bg-white/[0.06]"
              >
                {t('home.ctaPortfolio')}
              </LocalizedLink>
            </div>
          </div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section className="container py-20 sm:py-28">
        <Reveal>
          <SectionHead
            title={t('home.servicesTitle')}
            link="/services"
            linkLabel={t('home.allServices')}
          />
        </Reveal>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {(services.data ?? []).slice(0, 6).map((service, i) => (
            <Reveal key={service.id} delay={i * 70}>
              <ServiceCard service={service} index={i} />
            </Reveal>
          ))}
          {services.isLoading &&
            Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="h-52 animate-pulse rounded-card border border-white/10 bg-surface"
              />
            ))}
        </div>
      </section>

      {/* ── PORTFOLIO ── */}
      <section className="container pb-20 sm:pb-28">
        <Reveal>
          <SectionHead
            title={t('home.casesTitle')}
            link="/portfolio"
            linkLabel={t('home.allCases')}
          />
        </Reveal>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {(portfolio.data ?? []).slice(0, 3).map((item, i) => (
            <Reveal key={item.id} delay={i * 70}>
              <PortfolioCard item={item} />
            </Reveal>
          ))}
          {portfolio.isLoading &&
            Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="aspect-[4/3] animate-pulse rounded-card border border-white/10 bg-surface"
              />
            ))}
        </div>
      </section>
    </>
  );
}
