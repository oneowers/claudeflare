import { useCurrentLanguage } from '@/i18n/hooks';
import { pickLocale } from '@/i18n/localized';
import { MediaCard } from '@/components/shared/MediaCard';
import type { PortfolioItem } from '../types';

interface PortfolioCardProps {
  item: PortfolioItem;
}

export function PortfolioCard({ item }: PortfolioCardProps) {
  const lang = useCurrentLanguage();
  const title = pickLocale(item.title, lang) ?? '';
  const description =
    pickLocale(item.description, lang) ??
    (item.technologies.length > 0 ? item.technologies.slice(0, 4).join(' · ') : null);

  return (
    <MediaCard
      to={`/portfolio/${item.slug}`}
      title={title}
      description={description}
      imageUrl={item.image_url}
      badge={item.client}
      hoverZoom
    />
  );
}
