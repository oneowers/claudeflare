import { LocalizedLink } from '@/i18n/hooks';
import { cn } from '@/lib/utils';

interface MediaCardProps {
  to: string;
  title: string;
  description?: string | null;
  imageUrl?: string | null;
  /** Pill label over the media, top-left (e.g. price, client). */
  badge?: string | null;
  /** Letter/short text shown on the violet fallback when no image. */
  fallbackMark?: string;
}

/**
 * PROSTO media card — the single card shape used across Services and Portfolio.
 * Dark container, inset rounded media (image or violet fallback), translucent
 * pill badge top-left, display title + secondary description below.
 */
export function MediaCard({ to, title, description, imageUrl, badge, fallbackMark }: MediaCardProps) {
  return (
    <LocalizedLink
      to={to}
      className="group flex h-full flex-col overflow-hidden rounded-card border border-white/10 bg-surface transition-all duration-300 ease-brand hover:-translate-y-1 hover:border-white/20"
    >
      {/* Media */}
      <div className="relative m-2 aspect-[4/3] overflow-hidden rounded-[1.125rem]">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={title}
            className="h-full w-full object-cover transition-transform duration-500 ease-brand group-hover:scale-[1.04]"
            loading="lazy"
          />
        ) : (
          <div
            className={cn(
              'flex h-full w-full items-center justify-center bg-violet',
              'transition-transform duration-500 ease-brand group-hover:scale-[1.04]',
            )}
          >
            <span
              aria-hidden
              className="font-display text-6xl font-extrabold uppercase text-white/85"
            >
              {fallbackMark ?? title.charAt(0)}
            </span>
          </div>
        )}

        {badge && (
          <span className="badge-pill absolute left-3 top-3 bg-black/35 text-white backdrop-blur-md">
            {badge}
          </span>
        )}
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col px-5 pb-6 pt-3">
        <h3 className="font-display text-2xl font-bold leading-tight tracking-tight text-balance">
          {title}
        </h3>
        {description && (
          <p className="mt-2 line-clamp-2 text-[15px] leading-relaxed text-muted-foreground">
            {description}
          </p>
        )}
      </div>
    </LocalizedLink>
  );
}
