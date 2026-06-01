import { describe, expect, it } from 'vitest';
import {
  arrayBufferToBase64Url,
  base64UrlToArrayBuffer,
  deserializeCreationOptions,
  deserializeRequestOptions,
  serializeAuthenticationCredential,
  serializeRegistrationCredential,
} from './webauthn';

function bytes(...values: number[]) {
  return new Uint8Array(values).buffer;
}

function toNumbers(buffer: BufferSource) {
  return Array.from(new Uint8Array(buffer as ArrayBuffer));
}

describe('webauthn helpers', () => {
  it('конвертирует ArrayBuffer в Base64URL и обратно', () => {
    const encoded = arrayBufferToBase64Url(bytes(251, 255, 0));

    expect(encoded).toBe('-_8A');
    expect(toNumbers(base64UrlToArrayBuffer(encoded))).toEqual([251, 255, 0]);
  });

  it('декодирует options для navigator.credentials.get()', () => {
    const options = deserializeRequestOptions({
      challenge: 'AQI',
      allowCredentials: [{ id: 'AwQ', type: 'public-key' }],
      userVerification: 'required',
    });

    expect(toNumbers(options.challenge)).toEqual([1, 2]);
    expect(toNumbers(options.allowCredentials?.[0].id ?? bytes())).toEqual([
      3, 4,
    ]);
    expect(options.userVerification).toBe('required');
  });

  it('декодирует options для navigator.credentials.create()', () => {
    const options = deserializeCreationOptions({
      challenge: 'AQI',
      pubKeyCredParams: [{ alg: -7, type: 'public-key' }],
      rp: { name: 'WebStudio' },
      user: { id: 'AwQ', displayName: 'Admin', name: 'admin@example.com' },
    });

    expect(toNumbers(options.challenge)).toEqual([1, 2]);
    expect(toNumbers(options.user.id)).toEqual([3, 4]);
  });

  it('сериализует assertion для проверки входа', () => {
    const credential = {
      id: 'credential-id',
      type: 'public-key',
      response: {
        authenticatorData: bytes(1),
        clientDataJSON: bytes(2),
        signature: bytes(3),
        userHandle: bytes(4),
      },
      getClientExtensionResults: () => ({}),
    } as unknown as PublicKeyCredential;

    expect(serializeAuthenticationCredential(credential)).toEqual({
      id: 'credential-id',
      rawId: 'credential-id',
      type: 'public-key',
      response: {
        authenticatorData: 'AQ',
        clientDataJSON: 'Ag',
        signature: 'Aw',
        userHandle: 'BA',
      },
      clientExtensionResults: {},
    });
  });

  it('сериализует attestation для регистрации', () => {
    const credential = {
      id: 'credential-id',
      type: 'public-key',
      response: {
        attestationObject: bytes(1),
        clientDataJSON: bytes(2),
        getTransports: () => ['internal'],
      },
      getClientExtensionResults: () => ({}),
    } as unknown as PublicKeyCredential;

    expect(serializeRegistrationCredential(credential)).toEqual({
      id: 'credential-id',
      rawId: 'credential-id',
      type: 'public-key',
      response: {
        attestationObject: 'AQ',
        clientDataJSON: 'Ag',
        transports: ['internal'],
      },
      clientExtensionResults: {},
    });
  });
});
