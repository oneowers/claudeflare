import { forwardRef, type SelectHTMLAttributes } from 'react';
import { useTranslation } from 'react-i18next';
import { useCurrentLanguage } from '@/i18n/hooks';
import { pickLocale } from '@/i18n/localized';
import { useCategories } from '../hooks/useCategories';

type CategorySelectProps = SelectHTMLAttributes<HTMLSelectElement>;

/** Native select listing all categories plus a "no category" option. */
export const CategorySelect = forwardRef<HTMLSelectElement, CategorySelectProps>(
  function CategorySelect(props, ref) {
    const { t } = useTranslation();
    const lang = useCurrentLanguage();
    const { data: categories } = useCategories();

    return (
      <select
        ref={ref}
        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
        {...props}
      >
        <option value="">{t('admin.common.categoryNone')}</option>
        {(categories ?? []).map((c) => (
          <option key={c.id} value={c.id}>
            {pickLocale(c.name, lang) ?? c.slug}
          </option>
        ))}
      </select>
    );
  },
);
