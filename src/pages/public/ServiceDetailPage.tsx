import { useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  type Variants,
} from 'framer-motion';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { useServiceBySlug } from '@/features/services/hooks/useService';
import { formatPrice } from '@/lib/utils';
import { LocalizedLink, useCurrentLanguage } from '@/i18n/hooks';
import { pickLocale } from '@/i18n/localized';
import { Reveal } from '@/components/shared/Motion';
import { Seo } from '@/components/shared/Seo';

/* ─── helpers ─────────────────────────────────────────────────── */

const EASE = [0.22, 1, 0.36, 1] as const;

const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};
const rise: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
};

/* ─── Section number with counter-parallax ───────────────────── */

function SectionNum({ num }: { num: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], ['10%', '-10%']);

  return (
    <div ref={ref} className="relative pointer-events-none select-none overflow-hidden" aria-hidden>
      <motion.span
        className="block font-display font-black leading-none text-foreground/[0.05]"
        style={
          reduce
            ? { fontSize: 'clamp(6rem, 20vw, 14rem)' }
            : { fontSize: 'clamp(6rem, 20vw, 14rem)', y }
        }
      >
        {num}
      </motion.span>
    </div>
  );
}

/* ─── Loading skeleton ───────────────────────────────────────── */

function ServiceDetailSkeleton() {
  return (
    <div>
      <div className="relative flex min-h-[75vh] items-end overflow-hidden bg-muted/30">
        <div className="absolute inset-0 bg-grid opacity-20" />
        <div className="relative z-10 container pb-16 pt-32">
          <div className="h-4 w-20 animate-pulse rounded bg-muted" />
          <div className="mt-6 h-14 w-2/3 animate-pulse rounded bg-muted" />
          <div className="mt-4 h-6 w-1/2 animate-pulse rounded bg-muted" />
        </div>
      </div>
      <div className="container py-20 space-y-6">
        <div className="h-4 w-32 animate-pulse rounded bg-muted/50" />
        <div className="h-6 w-full max-w-2xl animate-pulse rounded bg-muted/50" />
        <div className="h-6 w-4/5 max-w-xl animate-pulse rounded bg-muted/40" />
      </div>
    </div>
  );
}

/* ─── Main page ───────────────────────────────────────────────── */

export function ServiceDetailPage() {
  const { slug } = useParams();
  const { t } = useTranslation();
  const lang = useCurrentLanguage();
  const { data: service, isLoading, error } = useServiceBySlug(slug);

  /* Hero scroll parallax */
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const reduce = useReducedMotion();
  const imgY = useTransform(heroProgress, [0, 1], ['0%', '28%']);
  const titleY = useTransform(heroProgress, [0, 1], ['0%', '-18%']);
  const titleOpacity = useTransform(heroProgress, [0, 0.75], [1, 0]);

  if (isLoading) return <ServiceDetailSkeleton />;

  if (error || !service) {
    return (
      <>
        <Seo title={t('services.detail.notFound')} noIndex />
        <section className="container py-24">
          <h1 className="font-display text-4xl font-bold">{t('services.detail.notFound')}</h1>
          <LocalizedLink
            to="/services"
            className="mt-6 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            {t('services.detail.back')}
          </LocalizedLink>
        </section>
      </>
    );
  }

  const name = pickLocale(service.name, lang) ?? '';
  const shortDesc = pickLocale(service.short_description, lang) ?? '';
  const description = pickLocale(service.description, lang);
  const features = pickLocale(service.features, lang) ?? [];

  return (
    <>
      <Seo
        title={name}
        description={shortDesc || description}
        image={service.image_url}
        type="article"
      />

      {/* ══════════════════════════════════════════════════════════
          HERO — full-viewport, image behind, parallax
      ══════════════════════════════════════════════════════════ */}
      <section
        ref={heroRef}
        className="relative flex min-h-[92vh] flex-col overflow-hidden"
      >
        {/* Parallax image */}
        {service.image_url ? (
          <motion.div
            style={reduce ? undefined : { y: imgY }}
            className="absolute inset-0 scale-110"
            aria-hidden
          >
            <img
              src={service.image_url}
              alt=""
              className="h-full w-full object-cover"
            />
            {/* Scrim layers */}
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-background/15" />
            <div className="absolute inset-0 bg-gradient-to-r from-background/40 to-transparent" />
          </motion.div>
        ) : (
          /* Fallback: grid bg */
          <div className="absolute inset-0" aria-hidden>
            <div className="bg-grid absolute inset-0 opacity-30" />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
          </div>
        )}

        {/* Back link — top */}
        <div className="relative z-10 container pt-24">
          <LocalizedLink
            to="/services"
            className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-foreground/40 transition-colors hover:text-foreground"
          >
            <span className="h-px w-6 bg-current" />
            {t('services.detail.back')}
          </LocalizedLink>
        </div>

        {/* Hero text — parallaxes up as you scroll */}
        <motion.div
          style={reduce ? undefined : { y: titleY, opacity: titleOpacity }}
          className="relative z-10 container mt-auto pb-20 pt-12"
        >
          <motion.div
            variants={stagger}
            initial={reduce ? false : 'hidden'}
            animate="show"
          >
            <motion.p variants={rise} className="font-mono text-[10px] uppercase tracking-[0.2em] text-foreground/40">
              {t('services.detail.kicker')}
            </motion.p>

            <motion.h1
              variants={rise}
              className="mt-4 font-display text-[clamp(2.4rem,7.5vw,5.5rem)] font-bold leading-[1.02] tracking-tight text-foreground [text-wrap:balance]"
            >
              {name}
            </motion.h1>

            <motion.p
              variants={rise}
              className="mt-5 max-w-2xl text-lg leading-relaxed text-foreground/60"
            >
              {shortDesc}
            </motion.p>

            {/* Price pill in hero */}
            <motion.div variants={rise} className="mt-8 flex flex-wrap items-center gap-4">
              <div className="inline-flex items-baseline gap-2 rounded-full border border-foreground/15 bg-background/60 px-5 py-2.5 backdrop-blur-sm">
                <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-foreground/40">
                  {t('services.detail.priceFrom')}
                </span>
                <span className="font-display text-2xl font-bold tabular-nums tracking-tight">
                  {formatPrice(service.price_from, service.currency)}
                </span>
              </div>

              <LocalizedLink
                to="/contact"
                className="group inline-flex h-12 items-center gap-2 rounded-md bg-primary px-6 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
              >
                {t('services.detail.discuss')}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </LocalizedLink>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.8 }}
          className="absolute bottom-7 right-10 flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.2em] text-foreground/25"
          aria-hidden
        >
          scroll
          <span className="h-px w-8 bg-current" />
        </motion.div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          01 — OVERVIEW
      ══════════════════════════════════════════════════════════ */}
      {description && (
        <section className="relative border-t border-foreground/10 py-24 overflow-hidden">
          <div className="container">
            <div className="grid gap-12 lg:grid-cols-[auto_1fr] lg:gap-20">
              {/* Section number — counter-parallax */}
              <div className="hidden lg:block">
                <SectionNum num="01" />
              </div>

              <div>
                <Reveal>
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-foreground/30">
                    01 — Overview
                  </p>
                  <h2 className="mt-4 font-display text-3xl font-bold tracking-tight md:text-4xl">
                    About this service
                  </h2>
                </Reveal>

                <Reveal delay={0.1}>
                  <div className="mt-8 max-w-3xl space-y-5 text-base leading-relaxed text-muted-foreground whitespace-pre-wrap md:text-lg">
                    {description}
                  </div>
                </Reveal>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ══════════════════════════════════════════════════════════
          02 — FEATURES  (zigzag: number RIGHT)
      ══════════════════════════════════════════════════════════ */}
      {features.length > 0 && (
        <section className="relative border-t border-foreground/10 py-24 overflow-hidden">
          <div className="container">
            <div className="grid gap-12 lg:grid-cols-[1fr_auto] lg:gap-20">

              {/* Content — left */}
              <div>
                <Reveal>
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-foreground/30">
                    02 — {t('services.detail.whatIncluded')}
                  </p>
                  <h2 className="mt-4 font-display text-3xl font-bold tracking-tight md:text-4xl">
                    {t('services.detail.whatIncluded')}
                  </h2>
                </Reveal>

                {/* Feature list — row per item with border dividers */}
                <ul className="mt-10 divide-y divide-foreground/[0.07]">
                  {features.map((feat, fi) => (
                    <Reveal key={fi} delay={fi * 0.05}>
                      <li className="group flex items-start gap-6 py-5 transition-colors hover:bg-foreground/[0.02] -mx-3 px-3 rounded-lg">
                        <span className="mt-0.5 w-8 shrink-0 font-mono text-[11px] font-bold tabular-nums tracking-[0.12em] text-foreground/20">
                          {String(fi + 1).padStart(2, '0')}
                        </span>
                        <span className="mt-px h-px w-5 shrink-0 translate-y-[0.55em] bg-foreground/15 transition-all duration-300 group-hover:w-8 group-hover:bg-foreground/30" />
                        <p className="text-base leading-relaxed text-foreground/75">
                          {feat}
                        </p>
                      </li>
                    </Reveal>
                  ))}
                </ul>
              </div>

              {/* Section number — right */}
              <div className="hidden lg:block">
                <SectionNum num="02" />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ══════════════════════════════════════════════════════════
          03 — PRICING + CTA
      ══════════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden border-t border-foreground/10 py-24">
        {/* Background grid */}
        <div aria-hidden className="bg-grid pointer-events-none absolute inset-0 opacity-25" />

        <div className="container relative">
          <div className="grid gap-12 lg:grid-cols-[auto_1fr] lg:gap-20">
            {/* Section number */}
            <div className="hidden lg:block">
              <SectionNum num="03" />
            </div>

            <div>
              <Reveal>
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-foreground/30">
                  03 — {t('services.detail.priceFrom')}
                </p>
                <h2 className="mt-4 font-display text-3xl font-bold tracking-tight md:text-4xl">
                  Investment
                </h2>
              </Reveal>

              <Reveal delay={0.1}>
                <div className="mt-10 grid gap-6 lg:grid-cols-2">
                  {/* Price block */}
                  <div className="flex flex-col justify-between rounded-2xl border border-foreground/10 bg-muted/20 p-8">
                    <div>
                      <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                        {t('services.detail.priceFrom')}
                      </p>
                      <p className="mt-2 font-display text-5xl font-black tabular-nums tracking-tight text-foreground">
                        {formatPrice(service.price_from, service.currency)}
                      </p>
                      <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                        {t('services.detail.priceNote')}
                      </p>
                    </div>
                    <div className="mt-8 h-px bg-foreground/10" />
                    <ul className="mt-5 space-y-2">
                      {[
                        'Fixed scope, no scope creep',
                        'Delivery on agreed timeline',
                        'Post-launch support included',
                      ].map((item) => (
                        <li key={item} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                          <span className="mt-1 shrink-0 font-mono text-[8px] font-bold text-foreground/30">
                            →
                          </span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* CTA block */}
                  <div className="flex flex-col justify-between rounded-2xl border border-primary/30 bg-primary/[0.06] p-8">
                    <div>
                      <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                        Ready to start?
                      </p>
                      <h3 className="mt-3 font-display text-2xl font-bold tracking-tight">
                        {t('home.ctaBannerTitle')}
                      </h3>
                      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                        {t('home.ctaBannerSubtitle')}
                      </p>
                    </div>
                    <LocalizedLink
                      to="/contact"
                      className="group mt-8 inline-flex h-12 w-full items-center justify-center gap-2 rounded-md bg-primary text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
                    >
                      {t('services.detail.discuss')}
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </LocalizedLink>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          Footer nav — back + all services
      ══════════════════════════════════════════════════════════ */}
      <Reveal>
        <div className="border-t border-foreground/10">
          <div className="container flex items-center justify-between py-8">
            <LocalizedLink
              to="/services"
              className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:text-foreground"
            >
              <span className="h-px w-6 bg-current" />
              {t('services.detail.back')}
            </LocalizedLink>
            <LocalizedLink
              to="/contact"
              className="group inline-flex items-center gap-1.5 text-sm font-medium text-foreground transition-opacity hover:opacity-70"
            >
              {t('services.detail.discuss')}
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </LocalizedLink>
          </div>
        </div>
      </Reveal>
    </>
  );
}
