import { useTranslation } from 'react-i18next';
import { usePartners } from '../hooks/usePartners';
import type { Partner } from '../types';

function LogoItem({ partner }: { partner: Partner }) {
  const inner = partner.logo_url ? (
    <img
      src={partner.logo_url}
      alt={partner.name}
      loading="lazy"
      className="max-h-9 max-w-[120px] object-contain opacity-70 grayscale transition-all duration-300 group-hover:opacity-100 group-hover:grayscale-0"
    />
  ) : (
    <span className="text-sm font-semibold tracking-tight text-muted-foreground transition-colors group-hover:text-foreground">
      {partner.name}
    </span>
  );

  const className =
    'group flex h-12 items-center justify-center px-2';

  if (partner.website_url) {
    return (
      <a
        href={partner.website_url}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
        title={partner.name}
      >
        {inner}
      </a>
    );
  }
  return (
    <div className={className} title={partner.name}>
      {inner}
    </div>
  );
}

export function TrustedBy() {
  const { t } = useTranslation();
  const { data } = usePartners(true);

  if (!data || data.length === 0) return null;

  return (
    <section className="border-t border-border/60 bg-muted/20">
      <div className="container py-12">
        <p className="text-center text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
          {t('trustedBy.title')}
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-10 gap-y-6 md:gap-x-16">
          {data.map((partner) => (
            <LogoItem key={partner.id} partner={partner} />
          ))}
        </div>
      </div>
    </section>
  );
}
