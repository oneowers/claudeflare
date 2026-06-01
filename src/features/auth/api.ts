import { supabase } from '@/lib/supabase';
import {
  deserializeCreationOptions,
  deserializeRequestOptions,
  isWebAuthnSupported,
  serializeAuthenticationCredential,
  serializeRegistrationCredential,
} from './webauthn';

export class PasskeyClientError extends Error {
  constructor(public readonly translationKey: string) {
    super(translationKey);
    this.name = 'PasskeyClientError';
  }
}

function assertPasskeyAvailable() {
  if (!isWebAuthnSupported()) {
    throw new PasskeyClientError('admin.login.passkey.errors.unsupported');
  }
  if (!window.isSecureContext) {
    throw new PasskeyClientError('admin.login.passkey.errors.insecureContext');
  }
}

function assertPublicKeyCredential(
  credential: Credential | null,
): PublicKeyCredential {
  if (!credential || credential.type !== 'public-key') {
    throw new PasskeyClientError('admin.login.passkey.errors.invalidCredential');
  }
  return credential as PublicKeyCredential;
}

export async function signInWithPassword(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) throw error;
  return data;
}

export async function signOut() {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}

export async function signInWithPasskey() {
  assertPasskeyAvailable();

  // 1. Supabase generates a one-time challenge. 2. The browser asks the
  // authenticator for consent. 3. Supabase verifies the signed assertion and
  // persists the issued session in the same client used by ProtectedRoute.
  const { data: start, error: startError } =
    await supabase.auth.passkey.startAuthentication();
  if (startError) throw startError;

  const credential = assertPublicKeyCredential(
    await navigator.credentials.get({
      publicKey: deserializeRequestOptions(start.options),
    }),
  );

  const { data, error } = await supabase.auth.passkey.verifyAuthentication({
    challengeId: start.challenge_id,
    credential: serializeAuthenticationCredential(credential),
  });
  if (error) throw error;
  if (!data.session) {
    throw new PasskeyClientError('admin.login.passkey.errors.missingSession');
  }

  return data;
}

export async function registerPasskey() {
  assertPasskeyAvailable();

  // Registration starts only after password sign-in, so Supabase can bind the
  // new public key to the current user. Biometric data never reaches the app.
  const { data: start, error: startError } =
    await supabase.auth.passkey.startRegistration();
  if (startError) throw startError;

  const credential = assertPublicKeyCredential(
    await navigator.credentials.create({
      publicKey: deserializeCreationOptions(start.options),
    }),
  );

  const { data, error } = await supabase.auth.passkey.verifyRegistration({
    challengeId: start.challenge_id,
    credential: serializeRegistrationCredential(credential),
  });
  if (error) throw error;

  return data;
}

export async function getCurrentProfile() {
  const { data: userData, error: userError } = await supabase.auth.getUser();
  if (userError) throw userError;
  if (!userData.user) return null;
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userData.user.id)
    .single();
  if (error) throw error;
  return data;
}
