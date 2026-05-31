import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';
import { updateSiteSettings } from '../api';
import { settingsKeys } from '../queryKeys';
import type { SettingsFormValues } from '../schemas';

export function useUpdateSiteSettings() {
  const qc = useQueryClient();
  const { t } = useTranslation();
  return useMutation({
    mutationFn: (values: SettingsFormValues) => updateSiteSettings(values),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: settingsKeys.all });
      toast.success(t('admin.settings.saveSuccess'));
    },
    onError: (e: Error) => toast.error(e.message),
  });
}
