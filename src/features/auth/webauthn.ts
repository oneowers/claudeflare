interface CredentialDescriptorJSON {
  id: string;
  transports?: string[];
  type: PublicKeyCredentialType;
}

interface CredentialCreationOptionsJSON
  extends Omit<
    PublicKeyCredentialCreationOptions,
    'challenge' | 'excludeCredentials' | 'user'
  > {
  challenge: string;
  excludeCredentials?: CredentialDescriptorJSON[];
  user: Omit<PublicKeyCredentialUserEntity, 'id'> & { id: string };
}

interface CredentialRequestOptionsJSON
  extends Omit<
    PublicKeyCredentialRequestOptions,
    'allowCredentials' | 'challenge'
  > {
  allowCredentials?: CredentialDescriptorJSON[];
  challenge: string;
}

export interface RegistrationCredentialJSON {
  authenticatorAttachment?: AuthenticatorAttachment;
  clientExtensionResults: AuthenticationExtensionsClientOutputs;
  id: string;
  rawId: string;
  response: {
    attestationObject: string;
    clientDataJSON: string;
    transports?: AuthenticatorTransport[];
  };
  type: PublicKeyCredentialType;
}

export interface AuthenticationCredentialJSON {
  authenticatorAttachment?: AuthenticatorAttachment;
  clientExtensionResults: AuthenticationExtensionsClientOutputs;
  id: string;
  rawId: string;
  response: {
    authenticatorData: string;
    clientDataJSON: string;
    signature: string;
    userHandle?: string;
  };
  type: PublicKeyCredentialType;
}

export function isWebAuthnSupported() {
  return (
    typeof window !== 'undefined' &&
    !!window.PublicKeyCredential &&
    typeof navigator.credentials?.create === 'function' &&
    typeof navigator.credentials?.get === 'function'
  );
}

export function arrayBufferToBase64Url(buffer: ArrayBuffer) {
  const bytes = new Uint8Array(buffer);
  let binary = '';

  for (const byte of bytes) {
    binary += String.fromCharCode(byte);
  }

  return btoa(binary)
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}

export function base64UrlToArrayBuffer(value: string) {
  const base64 = value.replace(/-/g, '+').replace(/_/g, '/');
  const padded = base64.padEnd(Math.ceil(base64.length / 4) * 4, '=');
  const binary = atob(padded);
  const bytes = Uint8Array.from(binary, (character) => character.charCodeAt(0));

  return bytes.buffer;
}

function decodeDescriptor(
  descriptor: CredentialDescriptorJSON,
): PublicKeyCredentialDescriptor {
  return {
    ...descriptor,
    id: base64UrlToArrayBuffer(descriptor.id),
    transports: descriptor.transports as AuthenticatorTransport[] | undefined,
  };
}

export function deserializeCreationOptions(
  options: CredentialCreationOptionsJSON,
): PublicKeyCredentialCreationOptions {
  return {
    ...options,
    challenge: base64UrlToArrayBuffer(options.challenge),
    excludeCredentials: options.excludeCredentials?.map(decodeDescriptor),
    user: {
      ...options.user,
      id: base64UrlToArrayBuffer(options.user.id),
    },
  };
}

export function deserializeRequestOptions(
  options: CredentialRequestOptionsJSON,
): PublicKeyCredentialRequestOptions {
  return {
    ...options,
    allowCredentials: options.allowCredentials?.map(decodeDescriptor),
    challenge: base64UrlToArrayBuffer(options.challenge),
  };
}

export function serializeRegistrationCredential(
  credential: PublicKeyCredential,
): RegistrationCredentialJSON {
  const response = credential.response as AuthenticatorAttestationResponse;
  const attachment = credential.authenticatorAttachment as
    | AuthenticatorAttachment
    | null;

  return {
    id: credential.id,
    rawId: credential.id,
    type: 'public-key',
    response: {
      attestationObject: arrayBufferToBase64Url(response.attestationObject),
      clientDataJSON: arrayBufferToBase64Url(response.clientDataJSON),
      transports: response.getTransports?.() as
        | AuthenticatorTransport[]
        | undefined,
    },
    clientExtensionResults: credential.getClientExtensionResults(),
    authenticatorAttachment: attachment ?? undefined,
  };
}

export function serializeAuthenticationCredential(
  credential: PublicKeyCredential,
): AuthenticationCredentialJSON {
  const response = credential.response as AuthenticatorAssertionResponse;
  const attachment = credential.authenticatorAttachment as
    | AuthenticatorAttachment
    | null;

  return {
    id: credential.id,
    rawId: credential.id,
    type: 'public-key',
    response: {
      authenticatorData: arrayBufferToBase64Url(response.authenticatorData),
      clientDataJSON: arrayBufferToBase64Url(response.clientDataJSON),
      signature: arrayBufferToBase64Url(response.signature),
      userHandle: response.userHandle
        ? arrayBufferToBase64Url(response.userHandle)
        : undefined,
    },
    clientExtensionResults: credential.getClientExtensionResults(),
    authenticatorAttachment: attachment ?? undefined,
  };
}
