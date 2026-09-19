"use client";

import React from "react";
import { AlertTriangle, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ConfirmModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  variant?: "danger" | "warning" | "primary";
  onConfirm: () => void;
  onCancel: () => void;
}

export function ConfirmModal({
  isOpen,
  title,
  message,
  confirmText = "تایید",
  cancelText = "انصراف",
  variant = "danger",
  onConfirm,
  onCancel,
}: ConfirmModalProps) {
  if (!isOpen) return null;

  const getConfirmButtonStyles = () => {
    switch (variant) {
      case "danger":
        return "bg-rose-600 hover:bg-rose-700 text-white border-rose-600 shadow-rose-200";
      case "warning":
        return "bg-amber-500 hover:bg-amber-600 text-white border-amber-500 shadow-amber-200";
      case "primary":
      default:
        return "bg-blue-600 hover:bg-blue-700 text-white border-blue-600 shadow-blue-200";
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fade-in">
      <div
        className="w-full max-w-md bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden transform transition-all animate-scale-up"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-3">
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
                  variant === "danger"
                    ? "bg-rose-50 text-rose-600 border border-rose-100"
                    : variant === "warning"
                    ? "bg-amber-50 text-amber-600 border border-amber-100"
                    : "bg-blue-50 text-blue-600 border border-blue-100"
                }`}
              >
                <AlertTriangle className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-800">{title}</h3>
                <p className="text-xs text-slate-500 mt-0.5">لطفاً برای ادامه عملیات تایید کنید</p>
              </div>
            </div>
            <button
              onClick={onCancel}
              className="text-slate-400 hover:text-slate-600 p-1.5 rounded-lg hover:bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="mt-4 text-sm text-slate-600 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-100">
            {message}
          </div>

          <div className="mt-6 flex items-center justify-end gap-3">
            <Button
              type="button"
              variant="ghost"
              size="md"
              onClick={onCancel}
            >
              {cancelText}
            </Button>
            <Button
              type="button"
              size="md"
              onClick={onConfirm}
              className={getConfirmButtonStyles()}
            >
              {confirmText}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
