import { useRef, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from 'framer-motion';
import { ArrowRight, ArrowDown } from 'lucide-react';
import { useServices } from '@/features/services/hooks/useServices';
import { useCategories, useCategoryMap } from '@/features/categories/hooks/useCategories';
import { LocalizedLink, useCurrentLanguage } from '@/i18n/hooks';
import { pickLocale } from '@/i18n/localized';
import { formatPrice, cn } from '@/lib/utils';
import { Reveal } from '@/components/shared/Motion';
import { Seo } from '@/components/shared/Seo';
import type { Service } from '@/features/services/types';
import type { Category } from '@/features/categories/types';

/* ─── Per-service section ─────────────────────────────────────── */

function ServiceSection({
  service,
  category,
  index,
}: {
  service: Service;
  category?: Category;
  index: number;
}) {
  const { t } = useTranslation();
  const lang = useCurrentLanguage();
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  // Giant background number drifts counter to scroll (appears "behind" content)
  const numY = useTransform(scrollYProgress, [0, 1], ['12%', '-12%']);
  // Image moves at 1.3× scroll speed (creates depth vs static content)
  const imgY = useTransform(scrollYProgress, [0, 1], ['-10%', '10%']);

  const name = pickLocale(service.name, lang) ?? '';
  const shortDesc = pickLocale(service.short_description, lang) ?? '';
  const description = service.description ? pickLocale(service.description, lang) : null;
  const features = pickLocale(service.features, lang) ?? [];
  const categoryLabel = category ? pickLocale(category.name, lang) ?? category.slug : null;
  const num = String(index + 1).padStart(2, '0');
  const hasImage = !!service.image_url;
  const isEven = index % 2 === 0;

  return (
    <section
      ref={ref}
      className="relative overflow-hidden border-t border-foreground/10"
    >
      {/* ── Background index number — parallax counter-scroll ── */}
      <motion.span
        aria-hidden
        style={reduce ? undefined : { y: numY }}
        className={cn(
          'pointer-events-none absolute top-1/2 -translate-y-1/2 select-none font-display font-black leading-none',
          'text-[clamp(8rem,22vw,20rem)] text-foreground/[0.04]',
          isEven
            ? '-right-[5vw]'
            : '-left-[5vw]',
        )}
      >
        {num}
      </motion.span>

      {/* ── Layout grid ── */}
      <div
        className={cn(
          'relative grid lg:min-h-[85vh]',
          hasImage ? 'lg:grid-cols-2' : 'lg:grid-cols-[1fr_1.2fr]',
        )}
      >
        {/* Image column */}
        {hasImage && (
          <div
            className={cn(
              'relative hidden overflow-hidden lg:block',
              isEven ? 'order-2' : 'order-1',
            )}
          >
            <motion.div
              style={reduce ? undefined : { y: imgY }}
              className="absolute inset-0 scale-110"
            >
              <img
                src={service.image_url!}
                alt={name}
                className="h-full w-full object-cover"
                loading="lazy"
              />
              {/* Gradient scrim toward content */}
              <div
                className={cn(
                  'absolute inset-0',
                  isEven
                    ? 'bg-gradient-to-l from-background/40 to-transparent'
                    : 'bg-gradient-to-r from-background/40 to-transparent',
                )}
              />
            </motion.div>
          </div>
        )}

        {/* Content column */}
        <div
          className={cn(
            'relative flex flex-col justify-between px-6 py-16 md:px-12 md:py-24 lg:px-16',
            hasImage && !isEven ? 'order-2' : 'order-1',
            !hasImage && 'lg:col-start-1',
          )}
        >
          <Reveal>
            {/* Top row: number + category */}
            <div className="flex items-center gap-4">
              <span className="font-mono text-sm font-bold tracking-[0.2em] text-foreground/20">
                {num}
              </span>
              {categoryLabel && (
                <>
                  <span className="h-px w-6 bg-foreground/15" />
                  <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                    {categoryLabel}
                  </span>
                </>
              )}
            </div>

            {/* Service name */}
            <h2 className="mt-6 font-display text-4xl font-bold leading-[1.05] tracking-tight text-foreground md:text-5xl lg:text-[clamp(2.5rem,4.5vw,3.75rem)] [text-wrap:balance]">
              {name}
            </h2>

            {/* Short description */}
            <p className="mt-5 max-w-lg text-base leading-relaxed text-muted-foreground md:text-lg">
              {shortDesc}
            </p>

            {/* Full description (if different from short) */}
            {description && description !== shortDesc && (
              <p className="mt-3 max-w-lg text-sm leading-relaxed text-muted-foreground/70">
                {description}
              </p>
            )}
          </Reveal>

          <Reveal delay={0.1}>
            <div className="mt-10 space-y-10">
              {/* Features list */}
              {features.length > 0 && (
                <div>
                  <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.2em] text-foreground/30">
                    {t('services.detail.whatIncluded')}
                  </p>
                  <ul
                    className={cn(
                      'grid gap-x-8 gap-y-2.5',
                      features.length > 4 ? 'sm:grid-cols-2' : 'grid-cols-1',
                    )}
                  >
                    {features.map((feature, fi) => (
                      <li
                        key={fi}
                        className="flex items-start gap-3 text-sm text-muted-foreground"
                      >
                        <span className="mt-[3px] shrink-0 font-mono text-[10px] font-bold text-foreground/25">
                          {String(fi + 1).padStart(2, '0')}
                        </span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Price + CTA */}
              <div className="flex flex-wrap items-end gap-6 border-t border-foreground/10 pt-8">
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                    {t('services.detail.priceFrom')}
                  </p>
                  <p className="mt-1 font-display text-3xl font-bold tabular-nums tracking-tight text-foreground">
                    {formatPrice(service.price_from, service.currency)}
                  </p>
                </div>

                <div className="ml-auto flex items-center gap-3">
                  <LocalizedLink
                    to={`/services/${service.slug}`}
                    className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {t('services.detail.back').replace('← Back to services', 'Details')}
                  </LocalizedLink>

                  <LocalizedLink
                    to="/contact"
                    className="group inline-flex h-11 items-center gap-2 rounded-md bg-primary px-5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
                  >
                    {t('services.detail.discuss')}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </LocalizedLink>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ─── Hero section ────────────────────────────────────────────── */

function ServicesHero({ count }: { count: number }) {
  const { t } = useTranslation();
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  const watermarkY = useTransform(scrollYProgress, [0, 1], ['0%', '40%']);
  const watermarkOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '28%']);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  const stagger = {
    hidden: {},
    show: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
  };
  const rise = {
    hidden: { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0, transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] } },
  };

  return (
    <section
      ref={ref}
      className="relative flex min-h-[70vh] flex-col items-center justify-center overflow-hidden border-b border-foreground/10 px-6 py-24 text-center"
    >
      {/* Grid texture */}
      <div
        aria-hidden
        className="bg-grid mask-fade-y pointer-events-none absolute inset-x-0 -top-16 bottom-0 opacity-50"
      />

      {/* Watermark — parallaxes upward on scroll */}
      <motion.span
        aria-hidden
        style={
          reduce
            ? { fontSize: 'clamp(5rem, 18vw, 16rem)' }
            : { fontSize: 'clamp(5rem, 18vw, 16rem)', y: watermarkY, opacity: watermarkOpacity }
        }
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 select-none whitespace-nowrap font-display font-black leading-none text-foreground/[0.035]"
      >
        SERVICES
      </motion.span>

      {/* Foreground content */}
      <motion.div
        style={reduce ? undefined : { y: contentY, opacity: contentOpacity }}
        className="relative z-10"
      >
        <motion.div variants={stagger} initial={reduce ? false : 'hidden'} animate="show">
          {/* Kicker */}
          <motion.p
            variants={rise}
            className="flex items-center justify-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground"
          >
            <span className="h-px w-8 bg-foreground/30" />
            {t('services.kicker')}
            <span className="h-px w-8 bg-foreground/30" />
          </motion.p>

          {/* Headline */}
          <motion.h1
            variants={rise}
            className="mt-5 font-display text-[clamp(2.8rem,8vw,5.5rem)] font-bold leading-[1.02] tracking-tight [text-wrap:balance]"
          >
            {t('services.title')}
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={rise}
            className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg"
          >
            {t('services.subtitle')}
          </motion.p>

          {/* Service count badge */}
          {count > 0 && (
            <motion.div
              variants={rise}
              className="mt-7 inline-flex items-center gap-2 rounded-full border border-foreground/10 px-4 py-1.5"
            >
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                {count} {count === 1 ? 'service' : 'services'}
              </span>
            </motion.div>
          )}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={reduce ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-muted-foreground/50"
        aria-hidden
      >
        <ArrowDown className="h-5 w-5 animate-bounce" />
      </motion.div>
    </section>
  );
}

/* ─── Main page ───────────────────────────────────────────────── */

export function ServicesPage() {
  const { t } = useTranslation();
  const lang = useCurrentLanguage();
  const { data, isLoading, error } = useServices(true);
  const { data: categories } = useCategories();
  const categoryMap = useCategoryMap();
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const filtered = useMemo(() => {
    if (!data) return [];
    if (!activeCategory) return data;
    return data.filter((s) => s.category_id === activeCategory);
  }, [data, activeCategory]);

  return (
    <>
      <Seo title={t('nav.services')} description={t('services.subtitle')} />

      {/* Hero */}
      <ServicesHero count={data?.length ?? 0} />

      {/* Sticky category filter — matches the header pill: same width & radius, 2px gap below it */}
      {categories && categories.length > 0 && (
        <div className="sticky top-[78px] z-30 px-4">
          <div className="mx-auto flex h-16 w-full max-w-6xl items-center gap-1 overflow-x-auto rounded-2xl border border-border/60 bg-background/70 px-4 shadow-xl shadow-foreground/[0.06] backdrop-blur-xl supports-[backdrop-filter]:bg-background/55 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <button
              type="button"
              onClick={() => setActiveCategory(null)}
              className={cn(
                'shrink-0 rounded-full px-4 py-1.5 text-sm font-medium transition-colors',
                activeCategory === null
                  ? 'bg-foreground text-background'
                  : 'text-muted-foreground hover:bg-foreground/[0.06] hover:text-foreground',
              )}
            >
              {t('portfolio.all')}
            </button>
            {categories.map((c) => {
              const label = pickLocale(c.name, lang) ?? c.slug;
              const isActive = activeCategory === c.id;
              return (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setActiveCategory(c.id)}
                  className={cn(
                    'shrink-0 whitespace-nowrap rounded-full px-4 py-1.5 text-sm font-medium transition-colors',
                    isActive
                      ? 'bg-foreground text-background'
                      : 'text-muted-foreground hover:bg-foreground/[0.06] hover:text-foreground',
                  )}
                >
                  {label}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Loading skeletons */}
      {isLoading && (
        <div>
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="border-t border-foreground/10 px-6 py-20 md:px-12 md:py-28"
            >
              <div className="h-4 w-16 animate-pulse rounded bg-muted/50" />
              <div className="mt-6 h-12 w-3/5 animate-pulse rounded bg-muted/50" />
              <div className="mt-4 h-5 w-2/5 animate-pulse rounded bg-muted/40" />
              <div className="mt-10 grid grid-cols-2 gap-3">
                {Array.from({ length: 6 }).map((_, j) => (
                  <div key={j} className="h-4 animate-pulse rounded bg-muted/30" />
                ))}
              </div>
              <div className="mt-10 flex items-center gap-4">
                <div className="h-9 w-32 animate-pulse rounded bg-muted/50" />
                <div className="ml-auto h-11 w-36 animate-pulse rounded bg-muted/50" />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="container py-24">
          <p className="text-sm text-destructive">{t('services.loadError')}</p>
        </div>
      )}

      {/* Empty */}
      {data && filtered.length === 0 && (
        <div className="container py-24">
          <p className="text-sm text-muted-foreground">{t('services.empty')}</p>
        </div>
      )}

      {/* Service sections */}
      {filtered.map((service, i) => (
        <ServiceSection
          key={service.id}
          service={service}
          index={i}
          category={service.category_id ? categoryMap[service.category_id] : undefined}
        />
      ))}

      {/* Bottom CTA band */}
      {filtered.length > 0 && (
        <Reveal>
          <div className="border-t border-foreground/10 py-16">
            <div className="container flex flex-wrap items-center justify-between gap-6">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                  {t('services.kicker')}
                </p>
                <p className="mt-1 font-display text-2xl font-bold tracking-tight md:text-3xl">
                  {t('home.ctaBannerTitle')}
                </p>
              </div>
              <LocalizedLink
                to="/contact"
                className="group inline-flex h-12 items-center gap-2 rounded-md bg-primary px-6 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
              >
                {t('services.detail.discuss')}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </LocalizedLink>
            </div>
          </div>
        </Reveal>
      )}
    </>
  );
}
