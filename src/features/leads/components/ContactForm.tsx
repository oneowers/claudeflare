import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslation } from 'react-i18next';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useServices } from '@/features/services/hooks/useServices';
import { contactFormSchema, type ContactFormValues } from '../schemas';
import { useCreateLead } from '../hooks/useCreateLead';
import { useCurrentLanguage } from '@/i18n/hooks';
import { pickLocale } from '@/i18n/localized';

export function ContactForm() {
  const { t } = useTranslation();
  const lang = useCurrentLanguage();
  const services = useServices(true);
  const createLead = useCreateLead();

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      message: '',
      service_id: '',
      website: '',
    },
  });

  if (createLead.isSuccess) {
    return (
      <div className="rounded-lg border border-border/60 bg-muted/30 p-8">
        <h3 className="text-xl font-semibold tracking-tight">
          {t('contact.form.successTitle')}
        </h3>
        <p className="mt-2 text-sm text-muted-foreground">
          {t('contact.form.successMessage')}
        </p>
        <Button
          variant="outline"
          className="mt-4"
          onClick={() => {
            form.reset();
            createLead.reset();
          }}
        >
          {t('contact.form.sendAnother')}
        </Button>
      </div>
    );
  }

  return (
    <form
      onSubmit={form.handleSubmit((v) => createLead.mutate(v))}
      className="space-y-5"
      noValidate
    >
      {/* Honeypot — скрытое поле, не должно заполняться. */}
      <div className="hidden" aria-hidden>
        <label>
          Website
          <input
            type="text"
            tabIndex={-1}
            autoComplete="off"
            {...form.register('website')}
          />
        </label>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="space-y-1.5">
          <Label htmlFor="name">{t('contact.form.name')} *</Label>
          <Input
            id="name"
            placeholder={t('contact.form.namePlaceholder')}
            {...form.register('name')}
          />
          {form.formState.errors.name && (
            <p className="text-xs text-destructive">
              {t(form.formState.errors.name.message ?? '')}
            </p>
          )}
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="email">{t('contact.form.email')} *</Label>
          <Input
            id="email"
            type="email"
            placeholder={t('contact.form.emailPlaceholder')}
            {...form.register('email')}
          />
          {form.formState.errors.email && (
            <p className="text-xs text-destructive">
              {t(form.formState.errors.email.message ?? '')}
            </p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="space-y-1.5">
          <Label htmlFor="phone">{t('contact.form.phone')}</Label>
          <Input
            id="phone"
            type="tel"
            placeholder={t('contact.form.phonePlaceholder')}
            {...form.register('phone')}
          />
          {form.formState.errors.phone && (
            <p className="text-xs text-destructive">
              {t(form.formState.errors.phone.message ?? '')}
            </p>
          )}
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="service_id">{t('contact.form.service')}</Label>
          <select
            id="service_id"
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
            disabled={services.isLoading}
            {...form.register('service_id')}
          >
            <option value="">{t('contact.form.serviceEmpty')}</option>
            {(services.data ?? []).map((s) => (
              <option key={s.id} value={s.id}>
                {pickLocale(s.name, lang) ?? s.slug}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="message">{t('contact.form.message')} *</Label>
        <Textarea
          id="message"
          rows={6}
          placeholder={t('contact.form.messagePlaceholder')}
          {...form.register('message')}
        />
        {form.formState.errors.message && (
          <p className="text-xs text-destructive">
            {t(form.formState.errors.message.message ?? '')}
          </p>
        )}
      </div>

      <Button type="submit" size="lg" disabled={createLead.isPending}>
        {createLead.isPending
          ? t('contact.form.submitting')
          : t('contact.form.submit')}
      </Button>
    </form>
  );
}
