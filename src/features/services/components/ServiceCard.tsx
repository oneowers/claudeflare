import { useCurrentLanguage } from '@/i18n/hooks';
import { pickLocale } from '@/i18n/localized';
import { formatPrice } from '@/lib/utils';
import { MediaCard } from '@/components/shared/MediaCard';
import type { Service } from '../types';

interface ServiceCardProps {
  service: Service;
}

export function ServiceCard({ service }: ServiceCardProps) {
  const lang = useCurrentLanguage();
  const title = pickLocale(service.name, lang) ?? '';

  return (
    <MediaCard
      to={`/services/${service.slug}`}
      title={title}
      description={pickLocale(service.short_description, lang)}
      imageUrl={service.image_url}
      badge={`от ${formatPrice(service.price_from, service.currency)}`}
    />
  );
}
