import { useState } from 'react';
import {
  useForm,
  useFieldArray,
  Controller,
  type Control,
  type UseFormRegister,
} from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslation } from 'react-i18next';
import { Plus, Trash2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { LocaleTabs } from '@/i18n/LocaleTabs';
import { type Language } from '@/i18n/config';
import type { LocalizedString } from '@/i18n/localized';
import { TagInput } from '@/features/portfolio/components/TagInput';
import { settingsSchema, type SettingsFormValues } from '../schemas';
import { useUpdateSiteSettings } from '../hooks/useUpdateSiteSettings';
import type { SiteSettings } from '../types';

const FALLBACK: LocalizedString = { ru: '', en: '', uz: '' };
const fill = (v?: LocalizedString): LocalizedString => ({ ...FALLBACK, ...(v ?? {}) });

interface SettingsFormProps {
  settings: SiteSettings;
}

/** Card wrapper to group a section of the form. */
function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="space-y-4 rounded-lg border border-border/60 bg-muted/20 p-5">
      <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
        {title}
      </h2>
      {children}
    </section>
  );
}

export function SettingsForm({ settings }: SettingsFormProps) {
  const { t } = useTranslation();
  const [lang, setLang] = useState<Language>('ru');
  const update = useUpdateSiteSettings();

  const form = useForm<SettingsFormValues>({
    resolver: zodResolver(settingsSchema),
    defaultValues: {
      tagline: fill(settings.tagline),
      copyright: fill(settings.copyright),
      contact_email: settings.contact_email ?? '',
      contact_phone: settings.contact_phone ?? '',
      contact_address: fill(settings.contact_address),
      columns: settings.columns.map((c) => ({
        title: fill(c.title),
        links: c.links.map((l) => ({ url: l.url, label: fill(l.label) })),
      })),
      socials: settings.socials,
      payment_methods: settings.payment_methods,
    },
  });

  const columns = useFieldArray({ control: form.control, name: 'columns' });
  const socials = useFieldArray({ control: form.control, name: 'socials' });

  const onSubmit = (values: SettingsFormValues) => update.mutate(values);

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="max-w-3xl space-y-6">
      <LocaleTabs active={lang} onChange={setLang} />

      <Section title={t('admin.settings.sections.general')}>
        <div className="space-y-1.5">
          <Label htmlFor="tagline">{t('admin.settings.fields.tagline')}</Label>
          <Textarea
            id="tagline"
            key={`tagline-${lang}`}
            rows={2}
            {...form.register(`tagline.${lang}` as const)}
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="copyright">{t('admin.settings.fields.copyright')}</Label>
          <Input id="copyright" key={`copyright-${lang}`} {...form.register(`copyright.${lang}` as const)} />
          <p className="text-xs text-muted-foreground">{t('admin.settings.fields.copyrightHint')}</p>
        </div>
      </Section>

      <Section title={t('admin.settings.sections.contacts')}>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-1.5">
            <Label htmlFor="contact_email">{t('admin.settings.fields.email')}</Label>
            <Input id="contact_email" type="email" {...form.register('contact_email')} />
            {form.formState.errors.contact_email && (
              <p className="text-xs text-destructive">{t('admin.settings.fields.emailInvalid')}</p>
            )}
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="contact_phone">{t('admin.settings.fields.phone')}</Label>
            <Input id="contact_phone" {...form.register('contact_phone')} />
          </div>
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="contact_address">{t('admin.settings.fields.address')}</Label>
          <Textarea
            id="contact_address"
            key={`address-${lang}`}
            rows={2}
            {...form.register(`contact_address.${lang}` as const)}
          />
        </div>
      </Section>

      <Section title={t('admin.settings.sections.columns')}>
        <div className="space-y-4">
          {columns.fields.map((field, ci) => (
            <div key={field.id} className="space-y-3 rounded-md border border-border/60 bg-background/40 p-4">
              <div className="flex items-center gap-2">
                <Input
                  key={`col-${ci}-${lang}`}
                  placeholder={t('admin.settings.fields.columnTitle')}
                  {...form.register(`columns.${ci}.title.${lang}` as const)}
                />
                <Button type="button" variant="ghost" size="icon" onClick={() => columns.remove(ci)}>
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
              </div>
              <ColumnLinks control={form.control} register={form.register} columnIndex={ci} lang={lang} />
            </div>
          ))}
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => columns.append({ title: { ...FALLBACK }, links: [] })}
          >
            <Plus className="mr-1.5 h-4 w-4" />
            {t('admin.settings.fields.addColumn')}
          </Button>
        </div>
      </Section>

      <Section title={t('admin.settings.sections.socials')}>
        <div className="space-y-3">
          {socials.fields.map((field, si) => (
            <div key={field.id} className="flex items-center gap-2">
              <Input
                className="max-w-[160px]"
                placeholder={t('admin.settings.fields.platform')}
                {...form.register(`socials.${si}.platform` as const)}
              />
              <Input placeholder="https://…" {...form.register(`socials.${si}.url` as const)} />
              <Button type="button" variant="ghost" size="icon" onClick={() => socials.remove(si)}>
                <Trash2 className="h-4 w-4 text-destructive" />
              </Button>
            </div>
          ))}
          {form.formState.errors.socials && (
            <p className="text-xs text-destructive">{t('admin.settings.fields.socialUrlInvalid')}</p>
          )}
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => socials.append({ platform: '', url: '' })}
          >
            <Plus className="mr-1.5 h-4 w-4" />
            {t('admin.settings.fields.addSocial')}
          </Button>
        </div>
      </Section>

      <Section title={t('admin.settings.sections.payments')}>
        <Controller
          control={form.control}
          name="payment_methods"
          render={({ field }) => (
            <TagInput
              value={field.value ?? []}
              onChange={field.onChange}
              placeholder={t('admin.settings.fields.paymentPlaceholder')}
            />
          )}
        />
      </Section>

      <div className="flex gap-3">
        <Button type="submit" disabled={update.isPending}>
          {update.isPending ? t('common.saving') : t('admin.settings.save')}
        </Button>
      </div>
    </form>
  );
}

/** Nested field array: the links inside one footer column. */
function ColumnLinks({
  control,
  register,
  columnIndex,
  lang,
}: {
  control: Control<SettingsFormValues>;
  register: UseFormRegister<SettingsFormValues>;
  columnIndex: number;
  lang: Language;
}) {
  const { t } = useTranslation();
  const links = useFieldArray({ control, name: `columns.${columnIndex}.links` });

  return (
    <div className="space-y-2 pl-1">
      {links.fields.map((field, li) => (
        <div key={field.id} className="flex items-center gap-2">
          <Input
            key={`link-label-${columnIndex}-${li}-${lang}`}
            className="max-w-[200px]"
            placeholder={t('admin.settings.fields.linkLabel')}
            {...register(`columns.${columnIndex}.links.${li}.label.${lang}` as const)}
          />
          <Input
            placeholder={t('admin.settings.fields.linkUrl')}
            {...register(`columns.${columnIndex}.links.${li}.url` as const)}
          />
          <Button type="button" variant="ghost" size="icon" onClick={() => links.remove(li)}>
            <Trash2 className="h-4 w-4 text-destructive" />
          </Button>
        </div>
      ))}
      <Button
        type="button"
        variant="ghost"
        size="sm"
        className="text-muted-foreground"
        onClick={() => links.append({ url: '', label: { ...FALLBACK } })}
      >
        <Plus className="mr-1.5 h-4 w-4" />
        {t('admin.settings.fields.addLink')}
      </Button>
    </div>
  );
}
