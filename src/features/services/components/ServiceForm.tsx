import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslation } from 'react-i18next';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { ImageDropzone } from '@/components/shared/ImageDropzone';
import { slugify } from '@/lib/utils';
import { serviceSchema, type ServiceFormValues } from '../schemas';
import { useCreateService } from '../hooks/useCreateService';
import { useUpdateService } from '../hooks/useUpdateService';
import type { Service } from '../types';
import { FeaturesInput } from './FeaturesInput';
import { useLocalizedNavigate } from '@/i18n/hooks';
import { LocaleTabs } from '@/i18n/LocaleTabs';
import { SUPPORTED_LANGUAGES, type Language } from '@/i18n/config';

interface ServiceFormProps {
  service?: Service;
}

const FALLBACK: ServiceFormValues['name'] = { ru: '', en: '', uz: '' };

export function ServiceForm({ service }: ServiceFormProps) {
  const navigate = useLocalizedNavigate();
  const { t } = useTranslation();
  const [activeLang, setActiveLang] = useState<Language>('ru');
  const isEdit = Boolean(service);
  const create = useCreateService();
  const update = useUpdateService(service?.id ?? '');

  const form = useForm<ServiceFormValues>({
    resolver: zodResolver(serviceSchema),
    defaultValues: {
      name: { ...FALLBACK, ...(service?.name ?? {}) },
      slug: service?.slug ?? '',
      short_description: { ...FALLBACK, ...(service?.short_description ?? {}) },
      description: { ...FALLBACK, ...(service?.description ?? {}) },
      price_from: service?.price_from ?? 0,
      currency: service?.currency ?? 'USD',
      features: {
        ru: service?.features?.ru ?? [],
        en: service?.features?.en ?? [],
        uz: service?.features?.uz ?? [],
      },
      is_published: service?.is_published ?? false,
      sort_order: service?.sort_order ?? 0,
    },
  });

  const onSubmit = (values: ServiceFormValues) => {
    const onSuccess = () => navigate('/admin/services');
    if (isEdit) update.mutate(values, { onSuccess });
    else create.mutate(values, { onSuccess });
  };

  const isPending = create.isPending || update.isPending;

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
    invalid[lang] = Boolean(
      form.formState.errors.name?.[lang] ||
        form.formState.errors.short_description?.[lang] ||
        form.formState.errors.description?.[lang],
    );
  }

  const isRu = activeLang === 'ru';

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="max-w-2xl space-y-6">
      <div className="space-y-3 rounded-lg border border-border/60 bg-muted/20 p-4">
        <div className="flex items-center justify-between">
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            {t('common.languageSwitcher')}
          </p>
          <LocaleTabs
            active={activeLang}
            onChange={setActiveLang}
            invalid={invalid}
          />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor={`name-${activeLang}`}>
            {t('admin.services.form.fields.name')}
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

        <div className="space-y-1.5">
          <Label htmlFor={`short_description-${activeLang}`}>
            {t('admin.services.form.fields.shortDescription')}
            {isRu && ' *'}
          </Label>
          <Textarea
            id={`short_description-${activeLang}`}
            key={`short-${activeLang}`}
            rows={2}
            {...form.register(`short_description.${activeLang}` as const)}
          />
          {form.formState.errors.short_description?.[activeLang] && (
            <p className="text-xs text-destructive">
              {err(form.formState.errors.short_description[activeLang]?.message)}
            </p>
          )}
        </div>

        <div className="space-y-1.5">
          <Label htmlFor={`description-${activeLang}`}>
            {t('admin.services.form.fields.description')}
          </Label>
          <Textarea
            id={`description-${activeLang}`}
            key={`desc-${activeLang}`}
            rows={6}
            {...form.register(`description.${activeLang}` as const)}
          />
        </div>

        <div className="space-y-1.5">
          <Label>{t('admin.services.form.fields.features')}</Label>
          <Controller
            control={form.control}
            name={`features.${activeLang}` as const}
            render={({ field }) => (
              <FeaturesInput
                value={field.value ?? []}
                onChange={field.onChange}
              />
            )}
          />
        </div>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="slug">{t('admin.services.form.fields.slug')} *</Label>
        <Input
          id="slug"
          {...form.register('slug')}
          placeholder={t('admin.services.form.fields.slugPlaceholder')}
        />
        {form.formState.errors.slug && (
          <p className="text-xs text-destructive">
            {err(form.formState.errors.slug.message)}
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-[1fr_140px_120px]">
        <div className="space-y-1.5">
          <Label htmlFor="price_from">{t('admin.services.form.fields.priceFrom')} *</Label>
          <Input
            id="price_from"
            type="number"
            step="0.01"
            min="0"
            {...form.register('price_from')}
          />
          {form.formState.errors.price_from && (
            <p className="text-xs text-destructive">
              {err(form.formState.errors.price_from.message)}
            </p>
          )}
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="currency">{t('admin.services.form.fields.currency')}</Label>
          <select
            id="currency"
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
            {...form.register('currency')}
          >
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="UZS">UZS</option>
            <option value="RUB">RUB</option>
          </select>
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="sort_order">{t('admin.services.form.fields.sortOrder')}</Label>
          <Input id="sort_order" type="number" min="0" {...form.register('sort_order')} />
        </div>
      </div>

      <div className="space-y-1.5">
        <Label>{t('admin.services.form.fields.image')}</Label>
        <Controller
          control={form.control}
          name="image"
          render={({ field }) => (
            <ImageDropzone
              initialUrl={service?.image_url ?? undefined}
              onFile={(file) => field.onChange(file)}
            />
          )}
        />
      </div>

      <div className="flex items-center gap-3 rounded-md border border-border/60 bg-muted/30 px-4 py-3">
        <Controller
          control={form.control}
          name="is_published"
          render={({ field }) => (
            <Switch checked={field.value} onCheckedChange={field.onChange} />
          )}
        />
        <div className="flex-1 text-sm">
          <p className="font-medium">{t('admin.services.form.publishToggle')}</p>
          <p className="text-xs text-muted-foreground">
            {t('admin.services.form.publishHint')}
          </p>
        </div>
      </div>

      <div className="flex gap-3">
        <Button type="submit" disabled={isPending}>
          {isPending
            ? t('common.saving')
            : isEdit
              ? t('admin.services.form.submitEdit')
              : t('admin.services.form.submitCreate')}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => navigate('/admin/services')}
        >
          {t('common.cancel')}
        </Button>
      </div>
    </form>
  );
}
