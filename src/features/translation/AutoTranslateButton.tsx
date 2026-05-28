import { useTranslation } from 'react-i18next';
import { Languages } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { isTranslationConfigured } from './api';

interface AutoTranslateButtonProps {
  onClick: () => void;
  pending: boolean;
  /** True when the source-language fields have something to translate. */
  hasSource: boolean;
}

export function AutoTranslateButton({
  onClick,
  pending,
  hasSource,
}: AutoTranslateButtonProps) {
  const { t } = useTranslation();
  const configured = isTranslationConfigured();
  const disabled = pending || !configured || !hasSource;

  const title = !configured
    ? t('translate.notConfigured')
    : !hasSource
      ? t('translate.sourceEmpty')
      : undefined;

  return (
    <Button
      type="button"
      variant="outline"
      size="sm"
      onClick={onClick}
      disabled={disabled}
      title={title}
    >
      <Languages className="h-4 w-4" />
      {pending ? t('translate.translating') : t('translate.button')}
    </Button>
  );
}
