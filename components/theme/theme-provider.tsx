"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

type ThemeMode = "light" | "dark";

interface ThemeTokens {
  primary: string;
  primaryHover: string;
  accent: string;
  accentLight: string;
  accentHover: string;
  danger: string;
  dangerLight: string;
  success: string;
  successLight: string;
  background: string;
  surface: string;
  surfaceAlt: string;
  border: string;
  borderLight: string;
  textPrimary: string;
  textSecondary: string;
  textMuted: string;
}

const lightTokens: ThemeTokens = {
  primary: "#0b1528",
  primaryHover: "#162544",
  accent: "#2563eb",
  accentLight: "#eff6ff",
  accentHover: "#1d4ed8",
  danger: "#ef4444",
  dangerLight: "#fef2f2",
  success: "#10b981",
  successLight: "#ecfdf5",
  background: "#ffffff",
  surface: "#f8fafc",
  surfaceAlt: "#f1f5f9",
  border: "#e2e8f0",
  borderLight: "#f8fafc",
  textPrimary: "#0f172a",
  textSecondary: "#475569",
  textMuted: "#94a3b8",
};

const darkTokens: ThemeTokens = {
  primary: "#1e293b",
  primaryHover: "#334155",
  accent: "#3b82f6",
  accentLight: "#1e3a8a",
  accentHover: "#60a5fa",
  danger: "#f87171",
  dangerLight: "#450a0a",
  success: "#34d399",
  successLight: "#064e3b",
  background: "#090d16",
  surface: "#0f172a",
  surfaceAlt: "#1e293b",
  border: "#334155",
  borderLight: "#1e293b",
  textPrimary: "#f8fafc",
  textSecondary: "#cbd5e1",
  textMuted: "#64748b",
};

interface ThemeContextValue {
  mode: ThemeMode;
  tokens: ThemeTokens;
  toggleTheme: () => void;
  setMode: (mode: ThemeMode) => void;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = useState<ThemeMode>("light");

  useEffect(() => {
    const saved = localStorage.getItem("tekmarket_theme") as ThemeMode | null;
    if (saved === "light" || saved === "dark") {
      setMode(saved);
      document.documentElement.setAttribute("data-theme", saved);
    } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setMode("dark");
      document.documentElement.setAttribute("data-theme", "dark");
    }
  }, []);

  const handleSetMode = (newMode: ThemeMode) => {
    setMode(newMode);
    localStorage.setItem("tekmarket_theme", newMode);
    document.documentElement.setAttribute("data-theme", newMode);
  };

  const toggleTheme = () => {
    const next = mode === "light" ? "dark" : "light";
    handleSetMode(next);
  };

  const tokens = mode === "light" ? lightTokens : darkTokens;

  return (
    <ThemeContext.Provider
      value={{
        mode,
        tokens,
        toggleTheme,
        setMode: handleSetMode,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return ctx;
}
