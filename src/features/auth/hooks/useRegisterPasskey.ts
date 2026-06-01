import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { i18n } from '@/i18n';
import { registerPasskey } from '../api';
import { getPasskeyErrorTranslationKey } from '../passkeyErrors';

export function useRegisterPasskey() {
  return useMutation({
    mutationFn: registerPasskey,
    onSuccess: () => toast.success(i18n.t('admin.login.passkey.enroll.success')),
    onError: (error: unknown) =>
      toast.error(i18n.t(getPasskeyErrorTranslationKey(error))),
  });
}
