import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';
import { updateSiteSettings } from '../api';
import { siteKeys } from '../queryKeys';
import type { SiteSettingsFormValues } from '../schemas';

export function useUpdateSiteSettings() {
  const qc = useQueryClient();
  const { t } = useTranslation();
  return useMutation({
    mutationFn: (values: SiteSettingsFormValues) => updateSiteSettings(values),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: siteKeys.all });
      toast.success(t('admin.settings.saveSuccess'));
    },
    onError: (e: Error) => toast.error(e.message),
  });
}
