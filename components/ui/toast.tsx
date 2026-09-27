"use client";

import React, { useState, useEffect, useRef } from "react";
import { CheckCircle2, AlertCircle, AlertTriangle, Info, X } from "lucide-react";

export type ToastVariant = "success" | "error" | "warning" | "info" | "default";

export interface ToastItem {
  id: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  variant?: ToastVariant;
  duration?: number;
  icon?: React.ReactNode;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export type ToastInput =
  | string
  | {
      title: React.ReactNode;
      description?: React.ReactNode;
      variant?: ToastVariant;
      duration?: number;
      icon?: React.ReactNode;
      action?: {
        label: string;
        onClick: () => void;
      };
    };

type ToastListener = (toasts: ToastItem[]) => void;

let toastsState: ToastItem[] = [];
const listeners = new Set<ToastListener>();

function notify() {
  listeners.forEach((listener) => listener([...toastsState]));
}

export function dismissToast(id: string) {
  toastsState = toastsState.filter((t) => t.id !== id);
  notify();
}

export function clearToasts() {
  toastsState = [];
  notify();
}

export function showToast(input: ToastInput, variant: ToastVariant = "default"): string {
  const id = `toast-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
  let toastObj: ToastItem;

  if (typeof input === "string" || React.isValidElement(input)) {
    toastObj = {
      id,
      title: input,
      variant,
      duration: 3800,
    };
  } else {
    toastObj = {
      id,
      title: input.title,
      description: input.description,
      variant: input.variant || variant,
      duration: input.duration ?? 3800,
      icon: input.icon,
      action: input.action,
    };
  }

  // Keep a maximum of 4 toasts at once to prevent screen clutter
  toastsState = [toastObj, ...toastsState].slice(0, 4);
  notify();
  return id;
}

export const toast = Object.assign(
  (input: ToastInput) => showToast(input, "default"),
  {
    success: (
      title: React.ReactNode,
      description?: React.ReactNode,
      options?: Partial<ToastItem>
    ) =>
      showToast(
        {
          title,
          description,
          variant: "success",
          ...options,
        },
        "success"
      ),
    error: (
      title: React.ReactNode,
      description?: React.ReactNode,
      options?: Partial<ToastItem>
    ) =>
      showToast(
        {
          title,
          description,
          variant: "error",
          ...options,
        },
        "error"
      ),
    warning: (
      title: React.ReactNode,
      description?: React.ReactNode,
      options?: Partial<ToastItem>
    ) =>
      showToast(
        {
          title,
          description,
          variant: "warning",
          ...options,
        },
        "warning"
      ),
    info: (
      title: React.ReactNode,
      description?: React.ReactNode,
      options?: Partial<ToastItem>
    ) =>
      showToast(
        {
          title,
          description,
          variant: "info",
          ...options,
        },
        "info"
      ),
    dismiss: dismissToast,
    clear: clearToasts,
  }
);

export function useToast() {
  const [toasts, setToasts] = useState<ToastItem[]>(toastsState);

  useEffect(() => {
    const handler: ToastListener = (newToasts) => setToasts(newToasts);
    listeners.add(handler);
    return () => {
      listeners.delete(handler);
    };
  }, []);

  return { toasts, toast, dismissToast, clearToasts };
}

interface ToastCardProps {
  toast: ToastItem;
  onDismiss: (id: string) => void;
}

function ToastCard({ toast, onDismiss }: ToastCardProps) {
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(100);
  const duration = toast.duration ?? 3800;
  const startTimeRef = useRef(Date.now());
  const remainingTimeRef = useRef(duration);

  useEffect(() => {
    if (duration <= 0) return;

    let frameId: number;
    let start = Date.now();

    const update = () => {
      if (!isPaused) {
        const elapsed = Date.now() - start;
        const newRemaining = Math.max(0, remainingTimeRef.current - elapsed);
        const percent = (newRemaining / duration) * 100;
        setProgress(percent);

        if (newRemaining <= 0) {
          onDismiss(toast.id);
          return;
        }
      }
      frameId = requestAnimationFrame(update);
    };

    frameId = requestAnimationFrame(update);

    return () => {
      cancelAnimationFrame(frameId);
    };
  }, [duration, isPaused, onDismiss, toast.id]);

  const handleMouseEnter = () => {
    setIsPaused(true);
    remainingTimeRef.current = (progress / 100) * duration;
  };

  const handleMouseLeave = () => {
    setIsPaused(false);
  };

  const getVariantStyles = () => {
    switch (toast.variant) {
      case "success":
        return {
          icon: <CheckCircle2 className="w-5 h-5 text-emerald-600 stroke-[2.4]" />,
          iconBg: "bg-emerald-50 border-emerald-200/80 text-emerald-600",
          progressBg: "bg-emerald-500",
          borderAccent: "border-l-4 border-l-emerald-500",
        };
      case "error":
        return {
          icon: <AlertCircle className="w-5 h-5 text-rose-600 stroke-[2.4]" />,
          iconBg: "bg-rose-50 border-rose-200/80 text-rose-600",
          progressBg: "bg-rose-500",
          borderAccent: "border-l-4 border-l-rose-500",
        };
      case "warning":
        return {
          icon: <AlertTriangle className="w-5 h-5 text-amber-600 stroke-[2.4]" />,
          iconBg: "bg-amber-50 border-amber-200/80 text-amber-600",
          progressBg: "bg-amber-500",
          borderAccent: "border-l-4 border-l-amber-500",
        };
      case "info":
        return {
          icon: <Info className="w-5 h-5 text-[#2563eb] stroke-[2.4]" />,
          iconBg: "bg-blue-50 border-blue-200/80 text-[#2563eb]",
          progressBg: "bg-[#2563eb]",
          borderAccent: "border-l-4 border-l-[#2563eb]",
        };
      default:
        return {
          icon: <CheckCircle2 className="w-5 h-5 text-slate-700 stroke-[2.2]" />,
          iconBg: "bg-slate-100 border-slate-200 text-slate-700",
          progressBg: "bg-[#0b1528]",
          borderAccent: "border-l-4 border-l-[#0b1528]",
        };
    }
  };

  const styles = getVariantStyles();

  return (
    <div
      role="status"
      aria-live="polite"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`pointer-events-auto relative overflow-hidden bg-white/95 backdrop-blur-xl border border-slate-200/90 rounded-2xl shadow-[0_12px_36px_-6px_rgba(11,21,40,0.16),0_2px_8px_rgba(0,0,0,0.04)] p-3.5 sm:p-4 text-right transition-all duration-300 transform animate-toast-in ${styles.borderAccent}`}
    >
      <div className="flex items-start gap-3">
        {/* Icon */}
        <div
          className={`w-9 h-9 rounded-xl border flex items-center justify-center shrink-0 shadow-2xs ${styles.iconBg}`}
        >
          {toast.icon || styles.icon}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0 pt-0.5">
          <div className="text-xs sm:text-sm font-black text-slate-900 leading-snug">
            {toast.title}
          </div>
          {toast.description && (
            <div className="text-[11px] sm:text-xs text-slate-500 font-medium leading-relaxed mt-1">
              {toast.description}
            </div>
          )}

          {toast.action && (
            <button
              type="button"
              onClick={() => {
                toast.action?.onClick();
                onDismiss(toast.id);
              }}
              className="mt-2 text-xs font-black text-[#2563eb] hover:text-[#1d4ed8] underline cursor-pointer"
            >
              {toast.action.label}
            </button>
          )}
        </div>

        {/* Close button */}
        <button
          type="button"
          onClick={() => onDismiss(toast.id)}
          aria-label="بستن اعلان"
          className="w-6 h-6 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 flex items-center justify-center transition-colors cursor-pointer shrink-0 -mr-1"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Progress Bar */}
      {duration > 0 && (
        <div className="absolute bottom-0 left-0 right-0 h-0.75 bg-slate-100 overflow-hidden">
          <div
            className={`h-full transition-all duration-75 ${styles.progressBg}`}
            style={{ width: `${progress}%` }}
          />
        </div>
      )}
    </div>
  );
}

export function Toaster() {
  const { toasts, dismissToast } = useToast();

  if (toasts.length === 0) return null;

  return (
    <div
      aria-label="اعلان‌های سیستم"
      className="fixed top-4 sm:top-6 left-1/2 -translate-x-1/2 sm:left-6 sm:translate-x-0 sm:right-auto z-9999 pointer-events-none flex flex-col gap-2.5 max-w-[92vw] sm:max-w-md w-full"
    >
      {toasts.map((item) => (
        <ToastCard key={item.id} toast={item} onDismiss={dismissToast} />
      ))}
    </div>
  );
}
