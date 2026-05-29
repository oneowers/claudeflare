import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslation } from 'react-i18next';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { ImageDropzone } from '@/components/shared/ImageDropzone';
import { useLocalizedNavigate } from '@/i18n/hooks';
import { partnerSchema, type PartnerFormValues } from '../schemas';
import { useCreatePartner } from '../hooks/useCreatePartner';
import { useUpdatePartner } from '../hooks/useUpdatePartner';
import type { Partner } from '../types';

interface PartnerFormProps {
  partner?: Partner;
}

export function PartnerForm({ partner }: PartnerFormProps) {
  const navigate = useLocalizedNavigate();
  const { t } = useTranslation();
  const isEdit = Boolean(partner);
  const create = useCreatePartner();
  const update = useUpdatePartner(partner?.id ?? '');

  const form = useForm<PartnerFormValues>({
    resolver: zodResolver(partnerSchema),
    defaultValues: {
      name: partner?.name ?? '',
      website_url: partner?.website_url ?? '',
      is_published: partner?.is_published ?? true,
      sort_order: partner?.sort_order ?? 0,
    },
  });

  const isPending = create.isPending || update.isPending;
  const err = (msg?: string) => (msg ? t(msg) : '');

  const onSubmit = (values: PartnerFormValues) => {
    const onSuccess = () => navigate('/admin/partners');
    if (isEdit) update.mutate(values, { onSuccess });
    else create.mutate(values, { onSuccess });
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="max-w-xl space-y-6">
      <div className="space-y-1.5">
        <Label htmlFor="name">{t('admin.partners.form.fields.name')} *</Label>
        <Input id="name" {...form.register('name')} />
        {form.formState.errors.name && (
          <p className="text-xs text-destructive">{err(form.formState.errors.name.message)}</p>
        )}
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="website_url">{t('admin.partners.form.fields.websiteUrl')}</Label>
        <Input id="website_url" type="url" {...form.register('website_url')} placeholder="https://" />
        {form.formState.errors.website_url && (
          <p className="text-xs text-destructive">{err(form.formState.errors.website_url.message)}</p>
        )}
      </div>

      <div className="space-y-1.5">
        <Label>{t('admin.partners.form.fields.logo')}</Label>
        <Controller
          control={form.control}
          name="logo"
          render={({ field }) => (
            <ImageDropzone
              initialUrl={partner?.logo_url ?? undefined}
              onFile={(file) => field.onChange(file)}
            />
          )}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label htmlFor="sort_order">{t('admin.partners.form.fields.sortOrder')}</Label>
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
          <div className="text-sm">{t('admin.partners.form.publishToggle')}</div>
        </div>
      </div>

      <div className="flex gap-3">
        <Button type="submit" disabled={isPending}>
          {isPending
            ? t('common.saving')
            : isEdit
              ? t('admin.partners.form.submitEdit')
              : t('admin.partners.form.submitCreate')}
        </Button>
        <Button type="button" variant="outline" onClick={() => navigate('/admin/partners')}>
          {t('common.cancel')}
        </Button>
      </div>
    </form>
  );
}
