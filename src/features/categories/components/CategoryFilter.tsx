import { useTranslation } from 'react-i18next';
import { cn } from '@/lib/utils';
import { useCurrentLanguage } from '@/i18n/hooks';
import { pickLocale } from '@/i18n/localized';
import type { Category } from '../types';

interface CategoryFilterProps {
  categories: Category[];
  active: string | null;
  onChange: (id: string | null) => void;
}

export function CategoryFilter({
  categories,
  active,
  onChange,
}: CategoryFilterProps) {
  const { t } = useTranslation();
  const lang = useCurrentLanguage();

  if (categories.length === 0) return null;

  const chip = (isActive: boolean) =>
    cn(
      'rounded-md px-3 py-1.5 text-sm transition-colors',
      isActive
        ? 'bg-primary text-primary-foreground'
        : 'border border-border/60 text-muted-foreground hover:text-foreground',
    );

  return (
    <div className="flex flex-wrap gap-2">
      <button
        type="button"
        onClick={() => onChange(null)}
        className={chip(active === null)}
      >
        {t('categories.all')}
      </button>
      {categories.map((category) => (
        <button
          key={category.id}
          type="button"
          onClick={() => onChange(category.id)}
          className={chip(active === category.id)}
        >
          {pickLocale(category.name, lang) ?? category.slug}
        </button>
      ))}
    </div>
  );
}
