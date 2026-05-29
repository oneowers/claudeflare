import { useTranslation } from 'react-i18next';
import { Pencil, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { ConfirmDialog } from '@/components/shared/ConfirmDialog';
import { LocalizedLink } from '@/i18n/hooks';
import type { Partner } from '../types';
import { useDeletePartner } from '../hooks/useDeletePartner';
import { useTogglePartnerPublished } from '../hooks/useTogglePartnerPublished';

interface PartnersTableProps {
  partners: Partner[];
}

export function PartnersTable({ partners }: PartnersTableProps) {
  const { t } = useTranslation();
  const remove = useDeletePartner();
  const togglePublished = useTogglePartnerPublished();

  if (partners.length === 0) {
    return (
      <div className="rounded-lg border border-dashed border-border/60 p-12 text-center text-sm text-muted-foreground">
        {t('admin.partners.empty')}
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-lg border border-border/60">
      <table className="w-full text-sm">
        <thead className="bg-muted/50 text-left text-xs uppercase tracking-wider text-muted-foreground">
          <tr>
            <th className="px-4 py-3 font-medium">{t('admin.partners.table.company')}</th>
            <th className="px-4 py-3 font-medium">{t('admin.partners.table.published')}</th>
            <th className="px-4 py-3" />
          </tr>
        </thead>
        <tbody className="divide-y divide-border/60">
          {partners.map((p) => (
            <tr key={p.id} className="bg-background">
              <td className="px-4 py-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-16 shrink-0 items-center justify-center overflow-hidden rounded border border-border/60 bg-muted/40">
                    {p.logo_url ? (
                      <img src={p.logo_url} alt={p.name} className="max-h-8 max-w-[56px] object-contain" />
                    ) : (
                      <span className="text-xs text-muted-foreground">—</span>
                    )}
                  </div>
                  <div>
                    <div className="font-medium">{p.name}</div>
                    {p.website_url && (
                      <div className="text-xs text-muted-foreground">{p.website_url}</div>
                    )}
                  </div>
                </div>
              </td>
              <td className="px-4 py-3">
                <Switch
                  checked={p.is_published}
                  onCheckedChange={(v) => togglePublished.mutate({ id: p.id, is_published: v })}
                />
              </td>
              <td className="px-4 py-3">
                <div className="flex justify-end gap-1">
                  <Button asChild variant="ghost" size="icon" aria-label={t('common.edit')}>
                    <LocalizedLink to={`/admin/partners/${p.id}/edit`}>
                      <Pencil className="h-4 w-4" />
                    </LocalizedLink>
                  </Button>
                  <ConfirmDialog
                    title={t('admin.partners.deleteTitle')}
                    description={t('admin.partners.deleteDescription', { name: p.name })}
                    confirmLabel={t('common.delete')}
                    cancelLabel={t('common.cancel')}
                    onConfirm={() => remove.mutate(p.id)}
                  >
                    <Button variant="ghost" size="icon" aria-label={t('common.delete')}>
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </ConfirmDialog>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
