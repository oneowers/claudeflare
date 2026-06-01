import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { i18n } from '@/i18n';
import { signInWithPasskey } from '../api';
import { getPasskeyErrorTranslationKey } from '../passkeyErrors';

export function usePasskeySignIn() {
  return useMutation({
    mutationFn: signInWithPasskey,
    onError: (error: unknown) => {
      const translationKey = getPasskeyErrorTranslationKey(error);
      if (translationKey === 'admin.login.passkey.errors.disabled') return;
      toast.error(i18n.t(translationKey));
    },
  });
}
