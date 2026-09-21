export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "https://api.poyanafzar.noteduco342.ir";

const ACCESS_TOKEN_KEY = "poyan_access_token";
const REFRESH_TOKEN_KEY = "poyan_refresh_token";
const ADMIN_TOKEN_KEY = "poyan_admin_token";

export function getAccessToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(ACCESS_TOKEN_KEY);
}

export function setAccessToken(token: string | null): void {
  if (typeof window === "undefined") return;
  if (token) {
    localStorage.setItem(ACCESS_TOKEN_KEY, token);
    document.cookie = `${ACCESS_TOKEN_KEY}=${encodeURIComponent(token)}; path=/; max-age=604800; SameSite=Lax`;
  } else {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    document.cookie = `${ACCESS_TOKEN_KEY}=; path=/; max-age=0; SameSite=Lax`;
  }
}

export function getRefreshToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(REFRESH_TOKEN_KEY);
}

export function setRefreshToken(token: string | null): void {
  if (typeof window === "undefined") return;
  if (token) {
    localStorage.setItem(REFRESH_TOKEN_KEY, token);
  } else {
    localStorage.removeItem(REFRESH_TOKEN_KEY);
  }
}

export function getAdminToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(ADMIN_TOKEN_KEY);
}

export function setAdminToken(token: string | null): void {
  if (typeof window === "undefined") return;
  if (token) {
    localStorage.setItem(ADMIN_TOKEN_KEY, token);
    document.cookie = `${ADMIN_TOKEN_KEY}=${encodeURIComponent(token)}; path=/; max-age=604800; SameSite=Lax`;
  } else {
    localStorage.removeItem(ADMIN_TOKEN_KEY);
    document.cookie = `${ADMIN_TOKEN_KEY}=; path=/; max-age=0; SameSite=Lax`;
  }
}

export function clearAllTokens(): void {
  setAccessToken(null);
  setRefreshToken(null);
}

export function clearAdminTokens(): void {
  setAdminToken(null);
}
