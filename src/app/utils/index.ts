

export function randomBytes(size: number) {
    return crypto.getRandomValues(new Uint8Array(size));
  }

export function base64url(bytes: Uint8Array) {
    return btoa(String.fromCharCode(...bytes))
      .replace(/=/g, '')
      .replace(/\+/g, '-')
      .replace(/\//g, '_');
  }

export async function generateCodeChallenge(code_verifier: string) {
    const codeVerifierBytes = new TextEncoder().encode(code_verifier);
    const hashBuffer = await crypto.subtle.digest('SHA-256', codeVerifierBytes);
    return base64url(new Uint8Array(hashBuffer));
  }
