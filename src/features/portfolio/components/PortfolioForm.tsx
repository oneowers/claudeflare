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
import { portfolioSchema, type PortfolioFormValues } from '../schemas';
import { useCreatePortfolio } from '../hooks/useCreatePortfolio';
import { useUpdatePortfolio } from '../hooks/useUpdatePortfolio';
import type { PortfolioItem } from '../types';
import { TagInput } from './TagInput';
import { useLocalizedNavigate } from '@/i18n/hooks';
import { LocaleTabs } from '@/i18n/LocaleTabs';
import { SUPPORTED_LANGUAGES, type Language } from '@/i18n/config';

interface PortfolioFormProps {
  item?: PortfolioItem;
}

const FALLBACK = { ru: '', en: '', uz: '' };

export function PortfolioForm({ item }: PortfolioFormProps) {
  const navigate = useLocalizedNavigate();
  const { t } = useTranslation();
  const [activeLang, setActiveLang] = useState<Language>('ru');
  const isEdit = Boolean(item);
  const create = useCreatePortfolio();
  const update = useUpdatePortfolio(item?.id ?? '');

  const form = useForm<PortfolioFormValues>({
    resolver: zodResolver(portfolioSchema),
    defaultValues: {
      title: { ...FALLBACK, ...(item?.title ?? {}) },
      description: { ...FALLBACK, ...(item?.description ?? {}) },
      slug: item?.slug ?? '',
      client: item?.client ?? '',
      project_url: item?.project_url ?? '',
      technologies: item?.technologies ?? [],
      is_published: item?.is_published ?? false,
      sort_order: item?.sort_order ?? 0,
    },
  });

  const isPending = create.isPending || update.isPending;

  const onSubmit = (values: PortfolioFormValues) => {
    const onSuccess = () => navigate('/admin/portfolio');
    if (isEdit) update.mutate(values, { onSuccess });
    else create.mutate(values, { onSuccess });
  };

  const handleTitleBlur = () => {
    if (!form.getValues('slug') && form.getValues('title.ru')) {
      form.setValue('slug', slugify(form.getValues('title.ru')), {
        shouldValidate: true,
      });
    }
  };

  const err = (msg?: string) => (msg ? t(msg) : '');

  const invalid: Partial<Record<Language, boolean>> = {};
  for (const lang of SUPPORTED_LANGUAGES) {
    invalid[lang] = Boolean(
      form.formState.errors.title?.[lang] ||
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
          <Label htmlFor={`title-${activeLang}`}>
            {t('admin.portfolio.form.fields.title')}
            {isRu && ' *'}
          </Label>
          <Input
            id={`title-${activeLang}`}
            key={`title-${activeLang}`}
            {...form.register(`title.${activeLang}` as const, {
              onBlur: isRu ? handleTitleBlur : undefined,
            })}
          />
          {form.formState.errors.title?.[activeLang] && (
            <p className="text-xs text-destructive">
              {err(form.formState.errors.title[activeLang]?.message)}
            </p>
          )}
        </div>

        <div className="space-y-1.5">
          <Label htmlFor={`description-${activeLang}`}>
            {t('admin.portfolio.form.fields.description')}
          </Label>
          <Textarea
            id={`description-${activeLang}`}
            key={`desc-${activeLang}`}
            rows={6}
            {...form.register(`description.${activeLang}` as const)}
          />
        </div>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="slug">{t('admin.portfolio.form.fields.slug')} *</Label>
        <Input id="slug" {...form.register('slug')} />
        {form.formState.errors.slug && (
          <p className="text-xs text-destructive">{err(form.formState.errors.slug.message)}</p>
        )}
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="space-y-1.5">
          <Label htmlFor="client">{t('admin.portfolio.form.fields.client')}</Label>
          <Input id="client" {...form.register('client')} />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="project_url">{t('admin.portfolio.form.fields.projectUrl')}</Label>
          <Input id="project_url" type="url" {...form.register('project_url')} />
          {form.formState.errors.project_url && (
            <p className="text-xs text-destructive">
              {err(form.formState.errors.project_url.message)}
            </p>
          )}
        </div>
      </div>

      <div className="space-y-1.5">
        <Label>{t('admin.portfolio.form.fields.technologies')}</Label>
        <Controller
          control={form.control}
          name="technologies"
          render={({ field }) => (
            <TagInput
              value={field.value ?? []}
              onChange={field.onChange}
              placeholder={t('admin.portfolio.form.fields.technologiesPlaceholder')}
            />
          )}
        />
      </div>

      <div className="space-y-1.5">
        <Label>{t('admin.portfolio.form.fields.image')}</Label>
        <Controller
          control={form.control}
          name="image"
          render={({ field }) => (
            <ImageDropzone
              initialUrl={item?.image_url ?? undefined}
              onFile={(file) => field.onChange(file)}
            />
          )}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label htmlFor="sort_order">{t('admin.portfolio.form.fields.sortOrder')}</Label>
          <Input id="sort_order" type="number" min="0" {...form.register('sort_order')} />
        </div>
        <div className="flex items-center gap-3 rounded-md border border-border/60 bg-muted/30 px-4 py-2">
          <Controller
            control={form.control}
            name="is_published"
            render={({ field }) => (
              <Switch checked={field.value} onCheckedChange={field.onChange} />
            )}
          />
          <div className="text-sm">{t('admin.portfolio.form.publishToggle')}</div>
        </div>
      </div>

      <div className="flex gap-3">
        <Button type="submit" disabled={isPending}>
          {isPending
            ? t('common.saving')
            : isEdit
              ? t('admin.portfolio.form.submitEdit')
              : t('admin.portfolio.form.submitCreate')}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => navigate('/admin/portfolio')}
        >
          {t('common.cancel')}
        </Button>
      </div>
    </form>
  );
}
