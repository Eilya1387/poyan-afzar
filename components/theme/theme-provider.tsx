"use client";

import React, { createContext, useContext, useEffect, useState, useTransition } from "react";
import { Sun, Moon } from "lucide-react";

export type ThemeMode = "light" | "dark";

export interface ThemeTokens {
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

export const lightTokens: ThemeTokens = {
  primary: "#0b1528",
  primaryHover: "#162544",
  accent: "#2563eb",
  accentLight: "#eff6ff",
  accentHover: "#1d4ed8",
  danger: "#ef4444",
  dangerLight: "#fef2f2",
  success: "#10b981",
  successLight: "#ecfdf5",
  background: "#f8fafc",
  surface: "#ffffff",
  surfaceAlt: "#f1f5f9",
  border: "#e2e8f0",
  borderLight: "#f8fafc",
  textPrimary: "#0f172a",
  textSecondary: "#475569",
  textMuted: "#94a3b8",
};

export const darkTokens: ThemeTokens = {
  primary: "#1e293b",
  primaryHover: "#334155",
  accent: "#3b82f6",
  accentLight: "#1e3a8a",
  accentHover: "#60a5fa",
  danger: "#f87171",
  dangerLight: "#450a0a",
  success: "#34d399",
  successLight: "#064e3b",
  background: "#0b0f19",
  surface: "#111827",
  surfaceAlt: "#1f2937",
  border: "#1f2937",
  borderLight: "#111827",
  textPrimary: "#f8fafc",
  textSecondary: "#cbd5e1",
  textMuted: "#64748b",
};

interface ThemeContextValue {
  mode: ThemeMode;
  tokens: ThemeTokens;
  toggleTheme: (event?: React.MouseEvent | MouseEvent) => void;
  setMode: (mode: ThemeMode, event?: React.MouseEvent | MouseEvent) => void;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

function applyThemeToDOM(targetMode: ThemeMode) {
  if (typeof document === "undefined") return;
  const root = document.documentElement;
  root.setAttribute("data-theme", targetMode);
  if (targetMode === "dark") {
    root.classList.add("dark");
    if (document.body) document.body.classList.add("dark");
  } else {
    root.classList.remove("dark");
    if (document.body) document.body.classList.remove("dark");
  }
  try {
    localStorage.setItem("poyan_theme", targetMode);
    localStorage.setItem("tekmarket_theme", targetMode);
  } catch {
    // localStorage might be unavailable in private browsing
  }
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [mode, setModeState] = useState<ThemeMode>("light");
  const [, startTransition] = useTransition();

  useEffect(() => {
    try {
      const saved = (localStorage.getItem("poyan_theme") ||
        localStorage.getItem("tekmarket_theme")) as ThemeMode | null;
      if (saved === "dark") {
        setModeState("dark");
        applyThemeToDOM("dark");
      } else {
        setModeState("light");
        applyThemeToDOM("light");
      }
    } catch {
      setModeState("light");
      applyThemeToDOM("light");
    }
  }, []);

  const changeThemeWithTransition = (
    nextMode: ThemeMode,
    event?: React.MouseEvent | MouseEvent
  ) => {
    if (nextMode === mode) return;

    // Check if View Transition API is supported and user hasn't reduced motion
    const isViewTransitionSupported =
      typeof document !== "undefined" &&
      "startViewTransition" in document &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!isViewTransitionSupported) {
      setModeState(nextMode);
      applyThemeToDOM(nextMode);
      return;
    }

    // Determine click / reveal origin coordinates (Telegram style)
    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;

    if (
      event &&
      typeof event.clientX === "number" &&
      typeof event.clientY === "number" &&
      (event.clientX !== 0 || event.clientY !== 0)
    ) {
      x = event.clientX;
      y = event.clientY;
    } else if (event && (event.currentTarget || event.target)) {
      const el = (event.currentTarget || event.target) as HTMLElement;
      if (el && typeof el.getBoundingClientRect === "function") {
        const rect = el.getBoundingClientRect();
        x = rect.left + rect.width / 2;
        y = rect.top + rect.height / 2;
      }
    }

    const endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    );

    const doc = document as unknown as {
      startViewTransition: (cb: () => void) => { ready: Promise<void> };
    };

    const transition = doc.startViewTransition(() => {
      startTransition(() => {
        setModeState(nextMode);
      });
      applyThemeToDOM(nextMode);
    });

    transition.ready
      .then(() => {
        const clipPath = [
          `circle(0px at ${x}px ${y}px)`,
          `circle(${endRadius}px at ${x}px ${y}px)`,
        ];

        document.documentElement.animate(
          {
            clipPath: clipPath,
          },
          {
            duration: 750,
            easing: "cubic-bezier(0.4, 0, 0.2, 1)",
            pseudoElement: "::view-transition-new(root)",
          }
        );
      })
      .catch(() => {
        // graceful fallback if animation fails
      });
  };

  const toggleTheme = (event?: React.MouseEvent | MouseEvent) => {
    const next = mode === "light" ? "dark" : "light";
    changeThemeWithTransition(next, event);
  };

  const handleSetMode = (
    newMode: ThemeMode,
    event?: React.MouseEvent | MouseEvent
  ) => {
    changeThemeWithTransition(newMode, event);
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

interface ThemeToggleProps {
  className?: string;
  variant?: "icon" | "pill" | "subtle";
  showLabel?: boolean;
}

export function ThemeToggle({
  className = "",
  variant = "icon",
  showLabel = false,
}: ThemeToggleProps) {
  const { mode, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div
        className={`w-9 h-9 rounded-xl bg-slate-100 dark:bg-slate-800 animate-pulse ${className}`}
        aria-hidden="true"
      />
    );
  }

  const isDark = mode === "dark";

  if (variant === "pill") {
    return (
      <button
        type="button"
        onClick={(e) => toggleTheme(e)}
        className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border transition-all cursor-pointer ${
          isDark
            ? "bg-slate-800/90 border-slate-700 text-amber-300 hover:bg-slate-800 shadow-sm"
            : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100 hover:text-blue-600"
        } ${className}`}
        title={isDark ? "تغییر به حالت روز (روشن)" : "تغییر به حالت شب (تاریک)"}
        aria-label={isDark ? "حالت روز" : "حالت شب"}
      >
        <div className="relative w-4 h-4">
          <Sun
            className={`w-4 h-4 text-amber-400 absolute inset-0 transition-all duration-300 ${
              isDark ? "rotate-0 scale-100 opacity-100" : "-rotate-90 scale-0 opacity-0"
            }`}
          />
          <Moon
            className={`w-4 h-4 text-slate-600 absolute inset-0 transition-all duration-300 ${
              !isDark ? "rotate-0 scale-100 opacity-100" : "rotate-90 scale-0 opacity-0"
            }`}
          />
        </div>
        {showLabel && (
          <span className="text-xs font-bold select-none">
            {isDark ? "حالت شب" : "حالت روز"}
          </span>
        )}
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={(e) => toggleTheme(e)}
      className={`relative p-2 rounded-xl border transition-all duration-200 flex items-center justify-center cursor-pointer group ${
        isDark
          ? "bg-slate-800/90 border-slate-700/80 text-amber-300 hover:text-amber-200 hover:border-amber-400/40 hover:bg-slate-800 shadow-xs"
          : "bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-600 hover:text-blue-600 hover:border-blue-200"
      } ${className}`}
      title={isDark ? "تغییر به حالت روز" : "تغییر به حالت شب"}
      aria-label={isDark ? "تغییر به حالت روز" : "تغییر به حالت شب"}
    >
      <div className="relative w-5 h-5 flex items-center justify-center">
        <Sun
          className={`w-5 h-5 text-amber-400 absolute transition-all duration-300 transform ${
            isDark
              ? "rotate-0 scale-100 opacity-100"
              : "-rotate-90 scale-0 opacity-0"
          }`}
        />
        <Moon
          className={`w-5 h-5 text-slate-700 dark:text-slate-300 group-hover:text-blue-600 absolute transition-all duration-300 transform ${
            !isDark
              ? "rotate-0 scale-100 opacity-100"
              : "rotate-90 scale-0 opacity-0"
          }`}
        />
      </div>
      {showLabel && (
        <span className="text-xs font-bold mr-1.5 select-none text-slate-700 dark:text-slate-200">
          {isDark ? "حالت شب" : "حالت روز"}
        </span>
      )}
    </button>
  );
}
