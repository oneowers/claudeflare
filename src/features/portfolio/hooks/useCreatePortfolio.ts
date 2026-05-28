import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';
import { createPortfolio } from '../api';
import { portfolioKeys } from '../queryKeys';
import type { PortfolioFormValues } from '../schemas';

export function useCreatePortfolio() {
  const qc = useQueryClient();
  const { t } = useTranslation();
  return useMutation({
    mutationFn: (values: PortfolioFormValues) => createPortfolio(values),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: portfolioKeys.all });
      toast.success(t('admin.portfolio.form.createSuccess'));
    },
    onError: (e: Error) => toast.error(e.message),
  });
}
