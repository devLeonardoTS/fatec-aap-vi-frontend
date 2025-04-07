import { api } from "../api";

export async function setAuthorizationCookie(token: string) {
  document.cookie = `BEARER-TOKEN=${token}; Path=/; SameSite=Strict; Secure;`;
  api.defaults.headers.common["Authorization"] = token;
}

export function getAuthorizationCookie(): string | null {
  const cookie = document.cookie
    .split(";")
    .find((c) => c.trim().startsWith("BEARER-TOKEN"));
  return cookie ? cookie.split("=")[1] : null;
}

export async function deleteAuthorizationCookie() {
  document.cookie = `BEARER-TOKEN=; Path=/; SameSite=Strict; Secure; expires=Thu, 01 Jan 1970 00:00:00 GMT;`;

  api.defaults.headers.common["Authorization"] = "";
}
