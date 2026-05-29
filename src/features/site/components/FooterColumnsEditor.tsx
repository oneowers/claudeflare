import { useTranslation } from 'react-i18next';
import { Plus, Trash2, GripVertical } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import type { Language } from '@/i18n/config';
import type { FooterColumn } from '../types';

interface FooterColumnsEditorProps {
  value: FooterColumn[];
  onChange: (cols: FooterColumn[]) => void;
  activeLang: Language;
}

const emptyColumn = (): FooterColumn => ({ title: {}, links: [] });

export function FooterColumnsEditor({
  value,
  onChange,
  activeLang,
}: FooterColumnsEditorProps) {
  const { t } = useTranslation();

  const update = (next: FooterColumn[]) => onChange(next);

  const patchColumn = (idx: number, patch: Partial<FooterColumn>) =>
    update(value.map((c, i) => (i === idx ? { ...c, ...patch } : c)));

  const setColTitle = (idx: number, text: string) =>
    patchColumn(idx, {
      title: { ...value[idx].title, [activeLang]: text },
    });

  const setLink = (
    colIdx: number,
    linkIdx: number,
    patch: Partial<{ label: string; url: string }>,
  ) => {
    const links = value[colIdx].links.map((l, i) => {
      if (i !== linkIdx) return l;
      return {
        label: patch.label !== undefined ? { ...l.label, [activeLang]: patch.label } : l.label,
        url: patch.url !== undefined ? patch.url : l.url,
      };
    });
    patchColumn(colIdx, { links });
  };

  const addLink = (colIdx: number) =>
    patchColumn(colIdx, { links: [...value[colIdx].links, { label: {}, url: '' }] });

  const removeLink = (colIdx: number, linkIdx: number) =>
    patchColumn(colIdx, {
      links: value[colIdx].links.filter((_, i) => i !== linkIdx),
    });

  return (
    <div className="space-y-4">
      {value.map((col, colIdx) => (
        <div
          key={colIdx}
          className="space-y-3 rounded-lg border border-border/60 bg-background p-4"
        >
          <div className="flex items-end gap-2">
            <div className="flex-1 space-y-1.5">
              <Label htmlFor={`col-title-${colIdx}`}>
                {t('admin.settings.footer.columnTitle')}
              </Label>
              <Input
                id={`col-title-${colIdx}`}
                value={col.title[activeLang] ?? ''}
                onChange={(e) => setColTitle(colIdx, e.target.value)}
                placeholder={t('admin.settings.footer.columnTitlePlaceholder')}
              />
            </div>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => update(value.filter((_, i) => i !== colIdx))}
              aria-label={t('admin.settings.footer.removeColumn')}
            >
              <Trash2 className="h-4 w-4 text-destructive" />
            </Button>
          </div>

          <div className="space-y-2 border-l-2 border-border/60 pl-3">
            {col.links.map((link, linkIdx) => (
              <div key={linkIdx} className="flex items-center gap-2">
                <GripVertical className="h-4 w-4 shrink-0 text-muted-foreground/40" />
                <Input
                  value={link.label[activeLang] ?? ''}
                  onChange={(e) => setLink(colIdx, linkIdx, { label: e.target.value })}
                  placeholder={t('admin.settings.footer.linkLabel')}
                  className="flex-1"
                />
                <Input
                  value={link.url}
                  onChange={(e) => setLink(colIdx, linkIdx, { url: e.target.value })}
                  placeholder="/about"
                  className="flex-1"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => removeLink(colIdx, linkIdx)}
                  aria-label={t('common.delete')}
                >
                  <Trash2 className="h-4 w-4 text-muted-foreground" />
                </Button>
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => addLink(colIdx)}
            >
              <Plus className="h-3.5 w-3.5" />
              {t('admin.settings.footer.addLink')}
            </Button>
          </div>
        </div>
      ))}

      <Button
        type="button"
        variant="outline"
        onClick={() => update([...value, emptyColumn()])}
      >
        <Plus className="h-4 w-4" />
        {t('admin.settings.footer.addColumn')}
      </Button>
    </div>
  );
}
