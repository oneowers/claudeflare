import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';
import { updatePortfolio } from '../api';
import { portfolioKeys } from '../queryKeys';
import type { PortfolioFormValues } from '../schemas';

export function useUpdatePortfolio(id: string) {
  const qc = useQueryClient();
  const { t } = useTranslation();
  return useMutation({
    mutationFn: (values: PortfolioFormValues) => updatePortfolio(id, values),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: portfolioKeys.all });
      toast.success(t('admin.portfolio.form.updateSuccess'));
    },
    onError: (e: Error) => toast.error(e.message),
  });
}
