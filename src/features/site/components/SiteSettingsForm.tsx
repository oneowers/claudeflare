import { useState } from 'react';
import { useForm, useFieldArray, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslation } from 'react-i18next';
import { Plus, Trash2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { LocaleTabs } from '@/i18n/LocaleTabs';
import { type Language } from '@/i18n/config';
import { cn } from '@/lib/utils';
import { siteSettingsSchema, type SiteSettingsFormValues } from '../schemas';
import { useUpdateSiteSettings } from '../hooks/useUpdateSiteSettings';
import { PAYMENT_METHODS, PAYMENT_LABELS, SOCIAL_PLATFORMS, SOCIAL_LABELS } from '../constants';
import type { SiteSettings } from '../types';
import { FooterColumnsEditor } from './FooterColumnsEditor';
import { PaymentIcon } from './PaymentIcons';
import { SocialIcon } from './SocialIcon';

interface SiteSettingsFormProps {
  settings: SiteSettings;
}

export function SiteSettingsForm({ settings }: SiteSettingsFormProps) {
  const { t } = useTranslation();
  const [activeLang, setActiveLang] = useState<Language>('ru');
  const update = useUpdateSiteSettings();

  const form = useForm<SiteSettingsFormValues>({
    resolver: zodResolver(siteSettingsSchema),
    defaultValues: {
      tagline: settings.tagline ?? {},
      copyright: settings.copyright ?? {},
      contact_email: settings.contact_email ?? '',
      contact_phone: settings.contact_phone ?? '',
      contact_address: settings.contact_address ?? {},
      columns: settings.columns ?? [],
      socials: settings.socials?.length
        ? (settings.socials as SiteSettingsFormValues['socials'])
        : [],
      payment_methods: settings.payment_methods as SiteSettingsFormValues['payment_methods'],
    },
  });

  const socials = useFieldArray({ control: form.control, name: 'socials' });
  const err = (msg?: string) => (msg ? t(msg) : '');

  const onSubmit = (values: SiteSettingsFormValues) => update.mutate(values);

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="max-w-3xl space-y-8">
      <LocaleTabs active={activeLang} onChange={setActiveLang} />

      {/* Brand text */}
      <section className="space-y-4 rounded-lg border border-border/60 bg-muted/20 p-4">
        <h2 className="text-sm font-semibold">{t('admin.settings.footer.brand')}</h2>
        <div className="space-y-1.5">
          <Label htmlFor={`tagline-${activeLang}`}>{t('admin.settings.footer.tagline')}</Label>
          <Textarea
            id={`tagline-${activeLang}`}
            key={`tagline-${activeLang}`}
            rows={2}
            {...form.register(`tagline.${activeLang}` as const)}
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor={`copyright-${activeLang}`}>{t('admin.settings.footer.copyright')}</Label>
          <Input
            id={`copyright-${activeLang}`}
            key={`copyright-${activeLang}`}
            {...form.register(`copyright.${activeLang}` as const)}
          />
          <p className="text-xs text-muted-foreground">{t('admin.settings.footer.copyrightHint')}</p>
        </div>
      </section>

      {/* Contacts */}
      <section className="space-y-4 rounded-lg border border-border/60 bg-muted/20 p-4">
        <h2 className="text-sm font-semibold">{t('admin.settings.footer.contacts')}</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="space-y-1.5">
            <Label htmlFor="contact_email">{t('admin.settings.footer.email')}</Label>
            <Input id="contact_email" type="email" {...form.register('contact_email')} />
            {form.formState.errors.contact_email && (
              <p className="text-xs text-destructive">{err(form.formState.errors.contact_email.message)}</p>
            )}
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="contact_phone">{t('admin.settings.footer.phone')}</Label>
            <Input id="contact_phone" {...form.register('contact_phone')} />
          </div>
        </div>
        <div className="space-y-1.5">
          <Label htmlFor={`address-${activeLang}`}>{t('admin.settings.footer.address')}</Label>
          <Input
            id={`address-${activeLang}`}
            key={`address-${activeLang}`}
            {...form.register(`contact_address.${activeLang}` as const)}
          />
        </div>
      </section>

      {/* Footer link columns */}
      <section className="space-y-4 rounded-lg border border-border/60 bg-muted/20 p-4">
        <h2 className="text-sm font-semibold">{t('admin.settings.footer.columns')}</h2>
        <Controller
          control={form.control}
          name="columns"
          render={({ field }) => (
            <FooterColumnsEditor
              value={field.value ?? []}
              onChange={field.onChange}
              activeLang={activeLang}
            />
          )}
        />
      </section>

      {/* Social links */}
      <section className="space-y-4 rounded-lg border border-border/60 bg-muted/20 p-4">
        <h2 className="text-sm font-semibold">{t('admin.settings.footer.socials')}</h2>
        <div className="space-y-2">
          {socials.fields.map((f, idx) => (
            <div key={f.id} className="flex items-center gap-2">
              <SocialIcon
                platform={form.watch(`socials.${idx}.platform`)}
                className="h-4 w-4 shrink-0 text-muted-foreground"
              />
              <select
                className="h-10 w-40 rounded-md border border-input bg-background px-3 text-sm"
                {...form.register(`socials.${idx}.platform` as const)}
              >
                {SOCIAL_PLATFORMS.map((p) => (
                  <option key={p} value={p}>
                    {SOCIAL_LABELS[p]}
                  </option>
                ))}
              </select>
              <Input
                placeholder="https://t.me/webstudio"
                className="flex-1"
                {...form.register(`socials.${idx}.url` as const)}
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => socials.remove(idx)}
                aria-label={t('common.delete')}
              >
                <Trash2 className="h-4 w-4 text-muted-foreground" />
              </Button>
            </div>
          ))}
          {form.formState.errors.socials && (
            <p className="text-xs text-destructive">{t('validation.invalidUrl')}</p>
          )}
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => socials.append({ platform: 'telegram', url: '' })}
          >
            <Plus className="h-3.5 w-3.5" />
            {t('admin.settings.footer.addSocial')}
          </Button>
        </div>
      </section>

      {/* Payment methods */}
      <section className="space-y-4 rounded-lg border border-border/60 bg-muted/20 p-4">
        <h2 className="text-sm font-semibold">{t('admin.settings.footer.payments')}</h2>
        <p className="text-xs text-muted-foreground">{t('admin.settings.footer.paymentsHint')}</p>
        <Controller
          control={form.control}
          name="payment_methods"
          render={({ field }) => {
            const selected = new Set(field.value ?? []);
            const toggle = (m: (typeof PAYMENT_METHODS)[number]) => {
              const next = new Set(selected);
              if (next.has(m)) next.delete(m);
              else next.add(m);
              field.onChange(PAYMENT_METHODS.filter((x) => next.has(x)));
            };
            return (
              <div className="flex flex-wrap gap-2">
                {PAYMENT_METHODS.map((m) => {
                  const active = selected.has(m);
                  return (
                    <button
                      key={m}
                      type="button"
                      onClick={() => toggle(m)}
                      className={cn(
                        'flex items-center gap-2 rounded-lg border px-2.5 py-2 transition-colors',
                        active
                          ? 'border-primary bg-primary/5 ring-1 ring-primary/30'
                          : 'border-border/60 opacity-60 hover:opacity-100',
                      )}
                    >
                      <PaymentIcon method={m} />
                      <span className="text-xs font-medium">{PAYMENT_LABELS[m]}</span>
                    </button>
                  );
                })}
              </div>
            );
          }}
        />
      </section>

      <div className="flex gap-3">
        <Button type="submit" disabled={update.isPending}>
          {update.isPending ? t('common.saving') : t('admin.settings.save')}
        </Button>
      </div>
    </form>
  );
}
