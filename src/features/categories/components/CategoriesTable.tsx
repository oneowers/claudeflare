import { useTranslation } from 'react-i18next';
import { Pencil, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ConfirmDialog } from '@/components/shared/ConfirmDialog';
import { LocalizedLink, useCurrentLanguage } from '@/i18n/hooks';
import { pickLocale } from '@/i18n/localized';
import type { Category } from '../types';
import { useDeleteCategory } from '../hooks/useDeleteCategory';

interface CategoriesTableProps {
  categories: Category[];
}

export function CategoriesTable({ categories }: CategoriesTableProps) {
  const { t } = useTranslation();
  const lang = useCurrentLanguage();
  const remove = useDeleteCategory();

  if (categories.length === 0) {
    return (
      <div className="rounded-lg border border-dashed border-border/60 p-12 text-center text-sm text-muted-foreground">
        {t('admin.categories.empty')}
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-lg border border-border/60">
      <table className="w-full text-sm">
        <thead className="bg-muted/50 text-left text-xs uppercase tracking-wider text-muted-foreground">
          <tr>
            <th className="px-4 py-3 font-medium">{t('admin.categories.table.name')}</th>
            <th className="px-4 py-3 font-medium">{t('admin.categories.table.sortOrder')}</th>
            <th className="px-4 py-3" />
          </tr>
        </thead>
        <tbody className="divide-y divide-border/60">
          {categories.map((c) => {
            const name = pickLocale(c.name, lang) ?? c.slug;
            return (
              <tr key={c.id} className="bg-background">
                <td className="px-4 py-3">
                  <div className="font-medium">{name}</div>
                  <div className="text-xs text-muted-foreground">/{c.slug}</div>
                </td>
                <td className="px-4 py-3 tabular-nums text-muted-foreground">
                  {c.sort_order}
                </td>
                <td className="px-4 py-3">
                  <div className="flex justify-end gap-1">
                    <Button asChild variant="ghost" size="icon" aria-label={t('common.edit')}>
                      <LocalizedLink to={`/admin/categories/${c.id}/edit`}>
                        <Pencil className="h-4 w-4" />
                      </LocalizedLink>
                    </Button>
                    <ConfirmDialog
                      title={t('admin.categories.deleteTitle')}
                      description={t('admin.categories.deleteDescription', { name })}
                      confirmLabel={t('common.delete')}
                      cancelLabel={t('common.cancel')}
                      onConfirm={() => remove.mutate(c.id)}
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
