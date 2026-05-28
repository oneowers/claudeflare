import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { signInWithPassword } from '../api';

export function useSignIn() {
  return useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      signInWithPassword(email, password),
    onError: (e: Error) => toast.error(e.message),
  });
}
