import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Plus, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface TagInputProps {
  value: string[];
  onChange: (value: string[]) => void;
  placeholder?: string;
}

export function TagInput({ value, onChange, placeholder }: TagInputProps) {
  const { t } = useTranslation();
  const [draft, setDraft] = useState('');

  const add = () => {
    const trimmed = draft.trim();
    if (!trimmed || value.includes(trimmed)) return;
    onChange([...value, trimmed]);
    setDraft('');
  };

  return (
    <div className="space-y-2">
      <div className="flex gap-2">
        <Input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              add();
            }
          }}
          placeholder={placeholder}
        />
        <Button type="button" variant="outline" onClick={add}>
          <Plus className="h-4 w-4" />
        </Button>
      </div>
      {value.length > 0 && (
        <ul className="flex flex-wrap gap-2">
          {value.map((item, idx) => (
            <li
              key={item}
              className="inline-flex items-center gap-1.5 rounded-md bg-secondary px-2.5 py-1 text-xs"
            >
              {item}
              <button
                type="button"
                onClick={() => onChange(value.filter((_, i) => i !== idx))}
                className="text-muted-foreground hover:text-foreground"
                aria-label={`${t('common.delete')} ${item}`}
              >
                <X className="h-3 w-3" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
