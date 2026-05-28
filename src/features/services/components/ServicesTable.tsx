import { useTranslation } from 'react-i18next';
import { Pencil, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { formatPrice } from '@/lib/utils';
import type { Service } from '../types';
import { useToggleServicePublished } from '../hooks/useToggleServicePublished';
import { useDeleteService } from '../hooks/useDeleteService';
import { ConfirmDialog } from '@/components/shared/ConfirmDialog';
import { LocalizedLink, useCurrentLanguage } from '@/i18n/hooks';
import { pickLocale } from '@/i18n/localized';

interface ServicesTableProps {
  services: Service[];
}

export function ServicesTable({ services }: ServicesTableProps) {
  const { t } = useTranslation();
  const lang = useCurrentLanguage();
  const togglePublished = useToggleServicePublished();
  const remove = useDeleteService();

  if (services.length === 0) {
    return (
      <div className="rounded-lg border border-dashed border-border/60 p-12 text-center text-sm text-muted-foreground">
        {t('admin.services.empty')}
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-lg border border-border/60">
      <table className="w-full text-sm">
        <thead className="bg-muted/50 text-left text-xs uppercase tracking-wider text-muted-foreground">
          <tr>
            <th className="px-4 py-3 font-medium">{t('admin.services.table.name')}</th>
            <th className="px-4 py-3 font-medium">{t('admin.services.table.price')}</th>
            <th className="px-4 py-3 font-medium">{t('admin.services.table.published')}</th>
            <th className="px-4 py-3" />
          </tr>
        </thead>
        <tbody className="divide-y divide-border/60">
          {services.map((s) => {
            const name = pickLocale(s.name, lang) ?? s.slug;
            return (
              <tr key={s.id} className="bg-background">
                <td className="px-4 py-3">
                  <div className="font-medium">{name}</div>
                  <div className="text-xs text-muted-foreground">/{s.slug}</div>
                </td>
                <td className="px-4 py-3 tabular-nums">
                  {formatPrice(s.price_from, s.currency)}
                </td>
                <td className="px-4 py-3">
                  <Switch
                    checked={s.is_published}
                    onCheckedChange={(v) =>
                      togglePublished.mutate({ id: s.id, is_published: v })
                    }
                  />
                </td>
                <td className="px-4 py-3">
                  <div className="flex justify-end gap-1">
                    <Button asChild variant="ghost" size="icon" aria-label={t('common.edit')}>
                      <LocalizedLink to={`/admin/services/${s.id}/edit`}>
                        <Pencil className="h-4 w-4" />
                      </LocalizedLink>
                    </Button>
                    <ConfirmDialog
                      title={t('admin.services.deleteTitle')}
                      description={t('admin.services.deleteDescription', { name })}
                      confirmLabel={t('common.delete')}
                      cancelLabel={t('common.cancel')}
                      onConfirm={() => remove.mutate(s.id)}
                    >
                      <Button variant="ghost" size="icon" aria-label={t('common.delete')}>
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </ConfirmDialog>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
