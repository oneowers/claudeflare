import { PasskeyClientError } from './api';

const ERROR_KEYS: Record<string, string> = {
  AbortError: 'admin.login.passkey.errors.cancelled',
  NotAllowedError: 'admin.login.passkey.errors.cancelled',
  SecurityError: 'admin.login.passkey.errors.insecureContext',
  email_not_confirmed: 'admin.login.passkey.errors.accountUnavailable',
  passkey_disabled: 'admin.login.passkey.errors.disabled',
  phone_not_confirmed: 'admin.login.passkey.errors.accountUnavailable',
  too_many_passkeys: 'admin.login.passkey.errors.tooMany',
  user_banned: 'admin.login.passkey.errors.accountUnavailable',
  webauthn_credential_exists: 'admin.login.passkey.errors.alreadyRegistered',
  webauthn_challenge_expired: 'admin.login.passkey.errors.expired',
  webauthn_challenge_not_found: 'admin.login.passkey.errors.expired',
  webauthn_credential_not_found: 'admin.login.passkey.errors.notRegistered',
  webauthn_verification_failed: 'admin.login.passkey.errors.verification',
};

export function getPasskeyErrorTranslationKey(error: unknown) {
  if (error instanceof PasskeyClientError) {
    return error.translationKey;
  }

  if (error instanceof Error) {
    const keyedError = error as Error & { code?: string };
    return (
      (keyedError.code && ERROR_KEYS[keyedError.code]) ??
      ERROR_KEYS[keyedError.name] ??
      'admin.login.passkey.errors.generic'
    );
  }

  return 'admin.login.passkey.errors.generic';
}
