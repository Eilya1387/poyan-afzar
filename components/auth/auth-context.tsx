"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { authApi } from "@/lib/auth/better-auth";
import { getAccessToken, setAccessToken, setRefreshToken, clearAllTokens } from "@/lib/api/config";
import { userApi } from "@/lib/api/user";

export interface User {
  id?: string;
  firstName?: string;
  lastName?: string;
  name?: string;
  phone: string;
  email?: string | null;
  role?: string;
  walletBalance?: number;
  avatar?: string | null;
  nationalCode?: string | null;
}

interface AuthContextType {
  user: User | null;
  isLoggedIn: boolean;
  isLoaded: boolean;
  login: (userData: User, accessToken?: string, refreshToken?: string) => void;
  logout: () => Promise<void>;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const loadCurrentUser = async () => {
    try {
      const stored = localStorage.getItem("poyan_user");
      if (stored) {
        setUser(JSON.parse(stored));
      }

      const token = getAccessToken();
      if (token) {
        try {
          const profile = await userApi.getProfile();
          if (profile) {
            const freshUser: User = {
              id: profile.id,
              firstName: profile.firstName || "",
              lastName: profile.lastName || "",
              name: profile.name || `${profile.firstName || ""} ${profile.lastName || ""}`.trim(),
              phone: profile.phone,
              email: profile.email,
              role: profile.role,
              walletBalance: profile.walletBalance ?? 0,
              avatar: profile.avatar,
              nationalCode: profile.nationalCode,
            };
            setUser(freshUser);
            localStorage.setItem("poyan_user", JSON.stringify(freshUser));
          }
        } catch {
          try {
            const me = await authApi.getMe();
            if (me) {
              const freshUser: User = {
                id: me.id,
                firstName: me.firstName || "",
                lastName: me.lastName || "",
                name: me.name || `${me.firstName || ""} ${me.lastName || ""}`.trim(),
                phone: me.phone || "",
                email: me.email,
                role: me.role,
                walletBalance: me.walletBalance ?? 0,
                avatar: me.avatar,
              };
              setUser(freshUser);
              localStorage.setItem("poyan_user", JSON.stringify(freshUser));
            }
          } catch {
            // Keep local stored
          }
        }
      }
    } catch {
      setUser(null);
    } finally {
      setIsLoaded(true);
    }
  };

  useEffect(() => {
    loadCurrentUser();
  }, []);

  const login = (userData: User, accessToken?: string, refreshToken?: string) => {
    if (accessToken) setAccessToken(accessToken);
    if (refreshToken) setRefreshToken(refreshToken);
    setUser(userData);
    localStorage.setItem("poyan_user", JSON.stringify(userData));
  };

  const logout = async () => {
    setUser(null);
    localStorage.removeItem("poyan_user");
    await authApi.logout();
  };

  const refreshProfile = async () => {
    try {
      const profile = await userApi.getProfile();
      if (profile) {
        const freshUser: User = {
          id: profile.id,
          firstName: profile.firstName || "",
          lastName: profile.lastName || "",
          name: profile.name || `${profile.firstName || ""} ${profile.lastName || ""}`.trim(),
          phone: profile.phone,
          email: profile.email,
          role: profile.role,
          walletBalance: profile.walletBalance ?? 0,
          avatar: profile.avatar,
          nationalCode: profile.nationalCode,
        };
        setUser(freshUser);
        localStorage.setItem("poyan_user", JSON.stringify(freshUser));
      }
    } catch (err) {
      console.error("Failed to refresh profile:", err);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn: !!user,
        isLoaded,
        login,
        logout,
        refreshProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
