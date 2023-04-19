import Cookie from 'js-cookie';

export const AUTH_CRED = 'AUTH_CRED';

export function removeAuthCredentails() {
  Cookie.remove(AUTH_CRED);
}

export function setAuthCredentials(
  token: string | undefined,
  permissions: any
) {
  Cookie.set(AUTH_CRED, JSON.stringify({ token, permissions }));
}

export function getAuthCredentials(): {
  token: string | null;
  permissions: string[] | null;
} {
  let authCred = Cookie.get(AUTH_CRED);
  if (authCred) return { ...JSON.parse(authCred || '') };
  return { token: null, permissions: null };
}
