import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslation } from 'react-i18next';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { slugify } from '@/lib/utils';
import { categorySchema, type CategoryFormValues } from '../schemas';
import { useCreateCategory } from '../hooks/useCreateCategory';
import { useUpdateCategory } from '../hooks/useUpdateCategory';
import type { Category } from '../types';
import { useLocalizedNavigate } from '@/i18n/hooks';
import { LocaleTabs } from '@/i18n/LocaleTabs';
import { SUPPORTED_LANGUAGES, type Language } from '@/i18n/config';

interface CategoryFormProps {
  category?: Category;
}

const FALLBACK: CategoryFormValues['name'] = { ru: '', en: '', uz: '' };

export function CategoryForm({ category }: CategoryFormProps) {
  const navigate = useLocalizedNavigate();
  const { t } = useTranslation();
  const [activeLang, setActiveLang] = useState<Language>('ru');
  const isEdit = Boolean(category);
  const create = useCreateCategory();
  const update = useUpdateCategory(category?.id ?? '');

  const form = useForm<CategoryFormValues>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: { ...FALLBACK, ...(category?.name ?? {}) },
      slug: category?.slug ?? '',
      sort_order: category?.sort_order ?? 0,
    },
  });

  const isPending = create.isPending || update.isPending;

  const onSubmit = (values: CategoryFormValues) => {
    const onSuccess = () => navigate('/admin/categories');
    if (isEdit) update.mutate(values, { onSuccess });
    else create.mutate(values, { onSuccess });
  };

  const handleNameBlur = () => {
    if (!form.getValues('slug') && form.getValues('name.ru')) {
      form.setValue('slug', slugify(form.getValues('name.ru')), {
        shouldValidate: true,
      });
    }
  };

  const err = (msg?: string) => (msg ? t(msg) : '');

  const invalid: Partial<Record<Language, boolean>> = {};
  for (const lang of SUPPORTED_LANGUAGES) {
    invalid[lang] = Boolean(form.formState.errors.name?.[lang]);
  }

  const isRu = activeLang === 'ru';

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="max-w-xl space-y-6">
      <div className="space-y-3 rounded-lg border border-border/60 bg-muted/20 p-4">
        <LocaleTabs active={activeLang} onChange={setActiveLang} invalid={invalid} />

        <div className="space-y-1.5">
          <Label htmlFor={`name-${activeLang}`}>
            {t('admin.categories.form.fields.name')}
            {isRu && ' *'}
          </Label>
          <Input
            id={`name-${activeLang}`}
            key={`name-${activeLang}`}
            {...form.register(`name.${activeLang}` as const, {
              onBlur: isRu ? handleNameBlur : undefined,
            })}
          />
          {form.formState.errors.name?.[activeLang] && (
            <p className="text-xs text-destructive">
              {err(form.formState.errors.name[activeLang]?.message)}
            </p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-[1fr_120px]">
        <div className="space-y-1.5">
          <Label htmlFor="slug">{t('admin.categories.form.fields.slug')} *</Label>
          <Input
            id="slug"
            {...form.register('slug')}
            placeholder={t('admin.categories.form.fields.slugPlaceholder')}
          />
          {form.formState.errors.slug && (
            <p className="text-xs text-destructive">
              {err(form.formState.errors.slug.message)}
            </p>
          )}
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="sort_order">
            {t('admin.categories.form.fields.sortOrder')}
          </Label>
          <Input id="sort_order" type="number" min="0" {...form.register('sort_order')} />
        </div>
      </div>

      <div className="flex gap-3">
        <Button type="submit" disabled={isPending}>
          {isPending
            ? t('common.saving')
            : isEdit
              ? t('admin.categories.form.submitEdit')
              : t('admin.categories.form.submitCreate')}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => navigate('/admin/categories')}
        >
          {t('common.cancel')}
        </Button>
      </div>
    </form>
  );
}
