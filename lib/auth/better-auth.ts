import { createAuthClient } from "better-auth/client";
import { API_BASE_URL, setAccessToken, setRefreshToken, setAdminToken, clearAllTokens, clearAdminTokens } from "../api/config";
import { api } from "../api/client";

// Better Auth Client configuration
export const authClient = createAuthClient({
  baseURL: API_BASE_URL,
  fetchOptions: {
    credentials: "omit",
  },
});

export interface AuthUser {
  id: string;
  phone?: string;
  firstName?: string | null;
  lastName?: string | null;
  name?: string;
  email?: string | null;
  role?: string;
  avatar?: string | null;
  walletBalance?: number;
  isNewUser?: boolean;
}

export interface AuthResponseData {
  user: AuthUser;
  accessToken: string;
  refreshToken?: string;
  tokenType?: string;
  expiresIn?: string;
}

export const authApi = {
  // 1. Send OTP
  sendOtp: async (phone: string) => {
    const res = await api.post<{
      sent: boolean;
      expiresInSeconds: number;
      message: string;
      devCode?: string;
    }>("/api/auth/otp/send", { phone }, { skipAuth: true });
    return res.data;
  },

  // 2. Verify OTP & Register/Login
  verifyOtp: async (payload: {
    phone: string;
    code: string;
    name?: string;
    firstName?: string;
    lastName?: string;
  }) => {
    const res = await api.post<AuthResponseData>(
      "/api/auth/otp/verify",
      {
        phone: payload.phone,
        code: payload.code,
        otp: payload.code,
        name: payload.name,
        firstName: payload.firstName,
        lastName: payload.lastName,
      },
      { skipAuth: true }
    );

    if (res.data?.accessToken) {
      setAccessToken(res.data.accessToken);
    }
    if (res.data?.refreshToken) {
      setRefreshToken(res.data.refreshToken);
    }

    return res.data;
  },

  // 3. Admin Login
  adminLogin: async (credentials: { username: string; password: string }) => {
    const res = await api.post<AuthResponseData>(
      "/api/auth/admin/login",
      credentials,
      { skipAuth: true }
    );

    if (res.data?.accessToken) {
      setAdminToken(res.data.accessToken);
    }
    return res.data;
  },

  // 4. Get Current User Profile (GET /api/auth/me)
  getMe: async () => {
    const res = await api.get<AuthUser>("/api/auth/me");
    return res.data;
  },

  // 5. Refresh Access Token
  refresh: async (refreshToken: string) => {
    const res = await api.post<{
      accessToken: string;
      refreshToken?: string;
    }>("/api/auth/refresh", { refreshToken }, { skipAuth: true });

    if (res.data?.accessToken) {
      setAccessToken(res.data.accessToken);
    }
    if (res.data?.refreshToken) {
      setRefreshToken(res.data.refreshToken);
    }
    return res.data;
  },

  // 6. Logout
  logout: async () => {
    try {
      await api.post("/api/auth/logout", {});
    } catch {
      // Ignore network errors during logout
    } finally {
      clearAllTokens();
      clearAdminTokens();
    }
  },
};
