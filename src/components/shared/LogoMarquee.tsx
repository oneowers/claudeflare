import { LocalizedLink } from '@/i18n/hooks';
import { cn } from '@/lib/utils';

export interface LogoMarqueeItem {
  id: string;
  /** Localized route to the project detail page. */
  to: string;
  /** Client/brand name — wordmark fallback when no logo image. */
  label: string;
  logoUrl: string | null;
}

interface LogoMarqueeProps {
  items: LogoMarqueeItem[];
  className?: string;
}

/** One pill — a `rounded-full` rectangle holding the brand logo (or wordmark). */
function LogoPill({ item, tabbable }: { item: LogoMarqueeItem; tabbable: boolean }) {
  return (
    <LocalizedLink
      to={item.to}
      tabIndex={tabbable ? undefined : -1}
      aria-hidden={tabbable ? undefined : true}
      title={item.label}
      className="flex h-[88px] shrink-0 items-center justify-center rounded-full border border-white/10 bg-surface-elevated px-9"
    >
      {item.logoUrl ? (
        <img
          src={item.logoUrl}
          alt={item.label}
          loading="lazy"
          className="h-11 w-auto max-w-[180px] object-contain"
        />
      ) : (
        <span className="whitespace-nowrap font-display text-xl font-extrabold uppercase tracking-tight text-foreground/75">
          {item.label}
        </span>
      )}
    </LocalizedLink>
  );
}

function PillRow({ items, tabbable }: { items: LogoMarqueeItem[]; tabbable: boolean }) {
  // pr-4 mirrors the inter-item gap so the seam between the two rows — and the
  // wrap-around on loop — keeps the exact same spacing.
  return (
    <div className="flex shrink-0 items-center gap-4 pr-4">
      {items.map((item, i) => (
        <LogoPill key={`${item.id}-${i}`} item={item} tabbable={tabbable} />
      ))}
    </div>
  );
}

/**
 * PROSTO partners marquee — a seamless, smoothly-scrolling strip of logo pills.
 * Two identical rows translate by -50% (see tailwind `animate-marquee`) for an
 * unbroken loop; freezes under prefers-reduced-motion.
 */
export function LogoMarquee({ items, className }: LogoMarqueeProps) {
  if (items.length === 0) return null;

  // Repeat so even a handful of logos fill the row before it's duplicated.
  const reps = Math.max(1, Math.ceil(8 / items.length));
  const filled = Array.from({ length: reps }, () => items).flat();

  return (
    <div className={cn('relative overflow-hidden mask-fade-x', className)}>
      <div className="flex w-max animate-marquee motion-reduce:animate-none">
        <PillRow items={filled} tabbable />
        <PillRow items={filled} tabbable={false} />
      </div>
    </div>
  );
}
