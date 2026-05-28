import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ConfirmDialog } from '@/components/shared/ConfirmDialog';
import { Trash2 } from 'lucide-react';
import { leadUpdateSchema, type LeadUpdateValues } from '../schemas';
import { useUpdateLead } from '../hooks/useUpdateLead';
import { useDeleteLead } from '../hooks/useDeleteLead';
import type { Lead } from '../types';
import { LEAD_STATUSES } from '../types';
import { LeadStatusBadge } from './LeadStatusBadge';

interface LeadDetailProps {
  lead: Lead;
  onDeleted?: () => void;
}

export function LeadDetail({ lead, onDeleted }: LeadDetailProps) {
  const { t } = useTranslation();
  const update = useUpdateLead(lead.id);
  const remove = useDeleteLead();

  const form = useForm<LeadUpdateValues>({
    resolver: zodResolver(leadUpdateSchema),
    defaultValues: {
      status: lead.status,
      notes: lead.notes ?? '',
    },
  });

  return (
    <div className="grid gap-8 lg:grid-cols-[2fr_1fr]">
      <article className="space-y-6">
        <header className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">{lead.name}</h1>
            <p className="text-sm text-muted-foreground">
              <a href={`mailto:${lead.email}`} className="hover:text-foreground">
                {lead.email}
              </a>
              {lead.phone && (
                <>
                  {' · '}
                  <a href={`tel:${lead.phone}`} className="hover:text-foreground">
                    {lead.phone}
                  </a>
                </>
              )}
            </p>
          </div>
          <LeadStatusBadge status={lead.status} />
        </header>

        <section className="rounded-lg border border-border/60 bg-muted/20 p-5">
          <h2 className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            {t('admin.leads.detail.message')}
          </h2>
          <p className="mt-2 whitespace-pre-wrap text-sm leading-relaxed">
            {lead.message}
          </p>
        </section>
      </article>

      <aside>
        <form
          onSubmit={form.handleSubmit((v) => update.mutate(v))}
          className="space-y-4 rounded-lg border border-border/60 p-5"
        >
          <div className="space-y-1.5">
            <Label htmlFor="status">{t('admin.leads.detail.noteStatus')}</Label>
            <select
              id="status"
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              {...form.register('status')}
            >
              {LEAD_STATUSES.map((s) => (
                <option key={s} value={s}>
                  {t(`leadStatus.${s}`)}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="notes">{t('admin.leads.detail.notes')}</Label>
            <Textarea id="notes" rows={5} {...form.register('notes')} />
          </div>

          <Button type="submit" disabled={update.isPending} className="w-full">
            {update.isPending
              ? t('admin.leads.detail.saving')
              : t('admin.leads.detail.save')}
          </Button>

          <ConfirmDialog
            title={t('admin.leads.detail.deleteTitle')}
            description={t('admin.leads.detail.deleteDescription')}
            confirmLabel={t('common.delete')}
            cancelLabel={t('common.cancel')}
            onConfirm={() => remove.mutateAsync(lead.id).then(() => onDeleted?.())}
          >
            <Button type="button" variant="outline" className="w-full text-destructive">
              <Trash2 className="h-4 w-4" />
              {t('common.delete')}
            </Button>
          </ConfirmDialog>
        </form>
      </aside>
    </div>
  );
}
