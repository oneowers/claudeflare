import { useCurrentLanguage } from '@/i18n/hooks';
import { pickLocale } from '@/i18n/localized';
import { cn } from '@/lib/utils';
import type { Category } from '../types';

interface CategoryBadgeProps {
  category: Category | undefined;
  className?: string;
}

export function CategoryBadge({ category, className }: CategoryBadgeProps) {
  const lang = useCurrentLanguage();
  if (!category) return null;
  const label = pickLocale(category.name, lang) ?? category.slug;
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border border-border/60 bg-muted px-2.5 py-0.5 text-xs font-medium text-muted-foreground',
        className,
      )}
    >
      {label}
    </span>
  );
}
