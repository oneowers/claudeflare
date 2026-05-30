import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface PageHeroProps {
  /** Small mono kicker above the title. */
  kicker?: string;
  title: string;
  lead?: string;
  /** Right-aligned slot (e.g. a price pill, CTA, back link). */
  aside?: ReactNode;
  /** Extra content under the lead (chips, meta). */
  children?: ReactNode;
  className?: string;
}

/**
 * Floating dark hero panel — the PROSTO signature for page headers.
 * Big uppercase Unbounded title, spark texture, optional aside slot.
 */
export function PageHero({ kicker, title, lead, aside, children, className }: PageHeroProps) {
  return (
    <section className={cn('px-3 pt-6 sm:px-4', className)}>
      <div className="relative overflow-hidden rounded-panel bg-surface px-6 py-14 sm:px-12 sm:py-20">
        <div aria-hidden className="bg-spark pointer-events-none absolute inset-0 opacity-50" />
        <div
          aria-hidden
          className="glow-violet pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-violet/15 blur-3xl"
        />
        <div className="relative flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            {kicker && (
              <p className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-foreground/60">
                <span className="h-2 w-2 rounded-full bg-lime" />
                {kicker}
              </p>
            )}
            <h1 className="mt-5 font-display text-[clamp(2.4rem,7vw,5rem)] font-extrabold uppercase leading-[0.98] tracking-tight text-balance">
              {title}
            </h1>
            {lead && (
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
                {lead}
              </p>
            )}
            {children}
          </div>
          {aside && <div className="shrink-0">{aside}</div>}
        </div>
      </div>
    </section>
  );
}
