import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { ArrowRight, ArrowDown } from 'lucide-react';
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type Variants,
} from 'framer-motion';
import { useServices } from '@/features/services/hooks/useServices';
import { usePortfolio } from '@/features/portfolio/hooks/usePortfolio';
import { ServiceCard } from '@/features/services/components/ServiceCard';
import { PortfolioCard } from '@/features/portfolio/components/PortfolioCard';
import { LocalizedLink } from '@/i18n/hooks';
import { Seo } from '@/components/shared/Seo';
import { Reveal, Parallax } from '@/components/shared/Motion';

const EASE = [0.22, 1, 0.36, 1] as const;

const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
};

const rise: Variants = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.85, ease: EASE } },
};

function HeroBackground({ progress }: { progress: ReturnType<typeof useScroll>['scrollYProgress'] }) {
  const gridY = useTransform(progress, [0, 1], ['0%', '18%']);
  const blobAY = useTransform(progress, [0, 1], ['0%', '-32%']);
  const blobBY = useTransform(progress, [0, 1], ['0%', '24%']);
  const wordY = useTransform(progress, [0, 1], ['0%', '46%']);
  const wordOpacity = useTransform(progress, [0, 0.85], [1, 0]);

  return (
    <>
      <motion.div
        style={{ y: gridY }}
        className="bg-grid mask-fade-y absolute inset-x-0 -top-24 bottom-0 -z-30"
        aria-hidden
      />
      <motion.div
        style={{ y: blobAY }}
        className="absolute -left-32 top-10 -z-20 h-[34rem] w-[34rem] rounded-full bg-primary/10 blur-3xl dark:bg-primary/20"
        aria-hidden
      />
      <motion.div
        style={{ y: blobBY }}
        className="absolute -right-24 bottom-0 -z-20 h-[28rem] w-[28rem] rounded-full bg-accent-foreground/5 blur-3xl dark:bg-accent/30"
        aria-hidden
      />
      <motion.span
        style={{ y: wordY, opacity: wordOpacity }}
        className="text-outline pointer-events-none absolute -bottom-6 left-1/2 -z-10 -translate-x-1/2 select-none whitespace-nowrap font-display text-[20vw] font-extrabold leading-none tracking-tighter md:-bottom-10"
        aria-hidden
      >
        WEBSTUDIO
      </motion.span>
    </>
  );
}

export function HomePage() {
  const { t } = useTranslation();
  const services = useServices(true);
  const portfolio = usePortfolio(true);
  const reduce = useReducedMotion();

  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const contentY = useTransform(heroProgress, [0, 1], ['0%', '40%']);
  const contentOpacity = useTransform(heroProgress, [0, 0.7], [1, 0]);

  const marqueeRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: marqueeProgress } = useScroll({
    target: marqueeRef,
    offset: ['start end', 'end start'],
  });
  const marqueeX = useTransform(marqueeProgress, [0, 1], ['8%', '-32%']);

  const words = t('home.marquee', { returnObjects: true }) as string[];

  return (
    <>
      <Seo title={t('home.kicker')} description={t('home.subtitle')} />

      <section
        ref={heroRef}
        className="relative flex min-h-[92vh] items-center overflow-hidden"
      >
        <HeroBackground progress={heroProgress} />

        <motion.div
          style={reduce ? undefined : { y: contentY, opacity: contentOpacity }}
          className="container relative z-10 py-28"
        >
          <motion.div
            variants={stagger}
            initial={reduce ? false : 'hidden'}
            animate="show"
            className="max-w-4xl"
          >
            <motion.p
              variants={rise}
              className="flex items-center gap-3 text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground"
            >
              <span className="h-px w-10 bg-foreground/40" />
              {t('home.kicker')}
            </motion.p>
            <motion.h1
              variants={rise}
              className="mt-6 font-display text-[2.6rem] font-bold leading-[1.02] tracking-tight md:text-7xl"
            >
              {t('home.title')}
            </motion.h1>
            <motion.p
              variants={rise}
              className="mt-7 max-w-xl text-lg leading-relaxed text-muted-foreground"
            >
              {t('home.subtitle')}
            </motion.p>
            <motion.div variants={rise} className="mt-10 flex flex-wrap gap-3">
              <LocalizedLink
                to="/contact"
                className="group inline-flex h-12 items-center gap-2 rounded-md bg-primary px-6 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
              >
                {t('home.ctaDiscuss')}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </LocalizedLink>
              <LocalizedLink
                to="/portfolio"
                className="inline-flex h-12 items-center rounded-md border border-input bg-background/60 px-6 text-sm font-medium backdrop-blur transition-colors hover:bg-accent"
              >
                {t('home.ctaPortfolio')}
              </LocalizedLink>
            </motion.div>
          </motion.div>
        </motion.div>

        <motion.div
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-muted-foreground"
          aria-hidden
        >
          <ArrowDown className="h-5 w-5 animate-bounce" />
        </motion.div>
      </section>

      <div
        ref={marqueeRef}
        className="overflow-hidden border-y border-border/60 py-6"
      >
        <motion.div
          style={reduce ? undefined : { x: marqueeX }}
          className="flex w-max items-center gap-8 whitespace-nowrap"
        >
          {Array.from({ length: 3 }).flatMap((_, dup) =>
            words.map((word, i) => (
              <span
                key={`${dup}-${i}`}
                className="flex items-center gap-8 font-display text-2xl font-medium tracking-tight text-muted-foreground/70 md:text-4xl"
              >
                {word}
                <span className="h-1.5 w-1.5 rounded-full bg-primary/60" />
              </span>
            )),
          )}
        </motion.div>
      </div>

      <section className="container py-24">
        <Reveal className="flex items-end justify-between gap-4">
          <div>
            <p className="flex items-center gap-2 text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
              <span className="font-display text-foreground">01</span>
              {t('home.servicesKicker')}
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight md:text-5xl">
              {t('home.servicesTitle')}
            </h2>
          </div>
          <LocalizedLink
            to="/services"
            className="hidden text-sm font-medium text-muted-foreground transition-colors hover:text-foreground sm:inline-flex"
          >
            {t('home.allServices')}
          </LocalizedLink>
        </Reveal>

        <div className="mt-10 border-b border-foreground/15">
          {(services.data ?? []).slice(0, 6).map((service, i) => (
            <Reveal key={service.id} delay={i * 0.06}>
              <ServiceCard service={service} index={i} />
            </Reveal>
          ))}
          {services.isLoading &&
            Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="border-t border-foreground/15 py-8">
                <div className="h-8 w-2/5 animate-pulse rounded bg-muted/50" />
                <div className="mt-3 h-4 w-3/5 animate-pulse rounded bg-muted/40" />
              </div>
            ))}
        </div>
      </section>

      <section className="container py-24">
        <Reveal className="flex items-end justify-between gap-4">
          <div>
            <p className="flex items-center gap-2 text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
              <span className="font-display text-foreground">02</span>
              {t('home.casesKicker')}
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight md:text-5xl">
              {t('home.casesTitle')}
            </h2>
          </div>
          <LocalizedLink
            to="/portfolio"
            className="hidden text-sm font-medium text-muted-foreground transition-colors hover:text-foreground sm:inline-flex"
          >
            {t('home.allCases')}
          </LocalizedLink>
        </Reveal>

        <div className="mt-12 grid grid-cols-2 gap-2 lg:grid-cols-3">
          {(portfolio.data ?? []).slice(0, 3).map((item, i) => (
            <Reveal key={item.id} delay={i * 0.1}>
              <PortfolioCard item={item} index={i + 1} />
            </Reveal>
          ))}
          {portfolio.isLoading &&
            Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="aspect-[4/3] animate-pulse rounded-xl bg-muted/40" />
            ))}
        </div>
      </section>

      <section className="container py-24">
        <div
          className="relative overflow-hidden rounded-2xl border border-foreground/[0.08] bg-card"
          style={{
            '--mx': '-200px',
            '--my': '-200px',
            '--gx': '50%',
            '--gy': '50%',
            '--px': '0px',
            '--py': '0px',
            '--tilt-x': '0deg',
            '--tilt-y': '0deg',
          } as React.CSSProperties}
          onMouseMove={(e) => {
            const r = e.currentTarget.getBoundingClientRect();
            const mx = e.clientX - r.left;
            const my = e.clientY - r.top;
            e.currentTarget.style.setProperty('--mx', `${mx}px`);
            e.currentTarget.style.setProperty('--my', `${my}px`);
            e.currentTarget.style.setProperty('--gx', `${(mx / r.width) * 100}%`);
            e.currentTarget.style.setProperty('--gy', `${(my / r.height) * 100}%`);
            e.currentTarget.style.setProperty('--px', `${(mx - r.width / 2) * 0.04}px`);
            e.currentTarget.style.setProperty('--py', `${(my - r.height / 2) * 0.04}px`);
            e.currentTarget.style.setProperty('--tilt-x', `${((my / r.height) - 0.5) * -3}deg`);
            e.currentTarget.style.setProperty('--tilt-y', `${((mx / r.width) - 0.5) * 3}deg`);
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.setProperty('--mx', '-200px');
            e.currentTarget.style.setProperty('--my', '-200px');
            e.currentTarget.style.setProperty('--gx', '50%');
            e.currentTarget.style.setProperty('--gy', '50%');
            e.currentTarget.style.setProperty('--px', '0px');
            e.currentTarget.style.setProperty('--py', '0px');
            e.currentTarget.style.setProperty('--tilt-x', '0deg');
            e.currentTarget.style.setProperty('--tilt-y', '0deg');
          }}
        >
          {/* Cursor spotlight — hsl(220 60% 60%) blue glow */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{ background: 'radial-gradient(circle 420px at var(--gx) var(--gy), hsl(220 60% 60% / 0.08) 0%, transparent 70%)' }}
          />
          {/* Grid texture */}
          <div aria-hidden className="bg-grid pointer-events-none absolute inset-0 opacity-30" />
          {/* Cursor tracking dot */}
          <div
            aria-hidden
            className="pointer-events-none absolute h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full blur-md"
            style={{ left: 'var(--mx)', top: 'var(--my)', background: 'hsl(220 70% 65% / 0.32)' }}
          />
          {/* Top edge highlight */}
          <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-foreground/12 to-transparent" />
          {/* Left edge */}
          <div aria-hidden className="pointer-events-none absolute inset-y-0 left-0 w-px bg-gradient-to-b from-foreground/12 via-foreground/6 to-transparent" />

          {/* 3D tilt wrapper — subtle max 3deg */}
          <div
            style={{
              transform: 'perspective(1200px) rotateX(var(--tilt-x)) rotateY(var(--tilt-y))',
              transition: 'transform 300ms cubic-bezier(0.22, 1, 0.36, 1)',
              willChange: 'transform',
            } as React.CSSProperties}
          >
            <Reveal className="relative px-8 py-24 text-center md:px-16 md:py-32">
              {/* Arrow watermark — strongest parallax, moves opposite */}
              <span
                aria-hidden
                className="pointer-events-none absolute -right-4 top-1/2 select-none font-display text-[11rem] font-extrabold leading-none text-foreground/[0.05] md:text-[15rem]"
                style={{ transform: 'translateY(-50%) translate(calc(var(--px) * -3.5), calc(var(--py) * -3.5))' }}
              >
                →
              </span>
              {/* Corner accents */}
              <span
                aria-hidden
                className="pointer-events-none absolute left-8 top-8 font-mono text-sm text-foreground/10"
                style={{ transform: 'translate(calc(var(--px) * 2), calc(var(--py) * 2))' }}
              >
                ×
              </span>
              <span
                aria-hidden
                className="pointer-events-none absolute bottom-8 right-8 font-mono text-sm text-foreground/10"
                style={{ transform: 'translate(calc(var(--px) * -2), calc(var(--py) * -2))' }}
              >
                ×
              </span>

              <h2
                className="relative mx-auto max-w-2xl font-display text-3xl font-bold tracking-tight text-foreground md:text-5xl"
                style={{ transform: 'translate(calc(var(--px) * 0.4), calc(var(--py) * 0.4))' }}
              >
                {t('home.ctaBannerTitle')}
              </h2>
              <p
                className="relative mx-auto mt-5 max-w-lg text-muted-foreground"
                style={{ transform: 'translate(calc(var(--px) * 0.7), calc(var(--py) * 0.7))' }}
              >
                {t('home.ctaBannerSubtitle')}
              </p>
              <LocalizedLink
                to="/contact"
                className="group/cta mt-9 inline-flex h-12 items-center gap-2 rounded-md border border-foreground/15 px-6 text-sm font-medium text-foreground transition-colors hover:border-foreground/30 hover:bg-foreground/[0.05]"
                style={{ transform: 'translate(calc(var(--px) * 1.2), calc(var(--py) * 1.2))' }}
              >
                {t('home.ctaBannerButton')}
                <ArrowRight className="h-4 w-4 transition-transform group-hover/cta:translate-x-1" />
              </LocalizedLink>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}