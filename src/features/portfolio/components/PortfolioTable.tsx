import { useTranslation } from 'react-i18next';
import { Pencil, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { ConfirmDialog } from '@/components/shared/ConfirmDialog';
import type { PortfolioItem } from '../types';
import { useTogglePortfolioPublished } from '../hooks/useTogglePortfolioPublished';
import { useDeletePortfolio } from '../hooks/useDeletePortfolio';
import { LocalizedLink, useCurrentLanguage } from '@/i18n/hooks';
import { pickLocale } from '@/i18n/localized';

interface PortfolioTableProps {
  items: PortfolioItem[];
}

export function PortfolioTable({ items }: PortfolioTableProps) {
  const { t } = useTranslation();
  const lang = useCurrentLanguage();
  const togglePublished = useTogglePortfolioPublished();
  const remove = useDeletePortfolio();

  if (items.length === 0) {
    return (
      <div className="rounded-lg border border-dashed border-border/60 p-12 text-center text-sm text-muted-foreground">
        {t('admin.portfolio.empty')}
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-lg border border-border/60">
      <table className="w-full text-sm">
        <thead className="bg-muted/50 text-left text-xs uppercase tracking-wider text-muted-foreground">
          <tr>
            <th className="px-4 py-3 font-medium">{t('admin.portfolio.table.case')}</th>
            <th className="px-4 py-3 font-medium">{t('admin.portfolio.table.client')}</th>
            <th className="px-4 py-3 font-medium">{t('admin.portfolio.table.published')}</th>
            <th className="px-4 py-3" />
          </tr>
        </thead>
        <tbody className="divide-y divide-border/60">
          {items.map((item) => {
            const title = pickLocale(item.title, lang) ?? item.slug;
            return (
              <tr key={item.id} className="bg-background">
                <td className="px-4 py-3">
                  <div className="font-medium">{title}</div>
                  <div className="text-xs text-muted-foreground">/{item.slug}</div>
                </td>
                <td className="px-4 py-3 text-muted-foreground">
                  {item.client ?? '—'}
                </td>
                <td className="px-4 py-3">
                  <Switch
                    checked={item.is_published}
                    onCheckedChange={(v) =>
                      togglePublished.mutate({ id: item.id, is_published: v })
                    }
                  />
                </td>
                <td className="px-4 py-3">
                  <div className="flex justify-end gap-1">
                    <Button asChild variant="ghost" size="icon" aria-label={t('common.edit')}>
                      <LocalizedLink to={`/admin/portfolio/${item.id}/edit`}>
                        <Pencil className="h-4 w-4" />
                      </LocalizedLink>
                    </Button>
                    <ConfirmDialog
                      title={t('admin.portfolio.deleteTitle')}
                      description={t('admin.portfolio.deleteDescription', { title })}
                      confirmLabel={t('common.delete')}
                      cancelLabel={t('common.cancel')}
                      onConfirm={() => remove.mutate(item.id)}
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
