import { useTranslation } from 'react-i18next';
import { cn } from '@/lib/utils';
import type { LeadStatus } from '../types';

const STATUS_STYLES: Record<LeadStatus, string> = {
  new: 'bg-blue-100 text-blue-900 dark:bg-blue-950 dark:text-blue-200',
  in_progress: 'bg-amber-100 text-amber-900 dark:bg-amber-950 dark:text-amber-200',
  closed: 'bg-emerald-100 text-emerald-900 dark:bg-emerald-950 dark:text-emerald-200',
  spam: 'bg-muted text-muted-foreground',
};

interface LeadStatusBadgeProps {
  status: LeadStatus;
  className?: string;
}

export function LeadStatusBadge({ status, className }: LeadStatusBadgeProps) {
  const { t } = useTranslation();
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium',
        STATUS_STYLES[status],
        className,
      )}
    >
      {t(`leadStatus.${status}`)}
    </span>
  );
}
