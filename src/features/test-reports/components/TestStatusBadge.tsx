import { useTranslation } from 'react-i18next';
import { cn } from '@/lib/utils';
import type { TestStatus } from '../types';

const statusStyles: Record<TestStatus, string> = {
  passed: 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20 dark:text-emerald-400',
  failed: 'bg-destructive/10 text-destructive border-destructive/20',
  in_progress: 'bg-amber-500/10 text-amber-600 border-amber-500/20 dark:text-amber-400',
  error: 'bg-destructive/15 text-destructive border-destructive/30',
};

interface TestStatusBadgeProps {
  status: TestStatus;
  className?: string;
}

export function TestStatusBadge({ status, className }: TestStatusBadgeProps) {
  const { t } = useTranslation();
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium',
        statusStyles[status],
        className,
      )}
    >
      {t(`testStatus.${status}`)}
    </span>
  );
}
