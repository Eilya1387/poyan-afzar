"use client";

import React, { forwardRef } from "react";

export type ButtonVariant = "primary" | "secondary" | "outline" | "ghost" | "icon";
export type ButtonSize = "sm" | "md" | "lg" | "icon";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      className = "",
      variant = "primary",
      size = "md",
      isLoading = false,
      leftIcon,
      rightIcon,
      disabled,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center font-bold tracking-tight transition-all duration-200 select-none cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none active:scale-[0.97]";

    const variantStyles: Record<ButtonVariant, string> = {
      primary:
        "bg-linear-to-b from-[#15233c] to-[#0b1528] text-white border border-slate-700/50 shadow-[0_2px_8px_rgba(11,21,40,0.2)] hover:shadow-[0_4px_16px_rgba(11,21,40,0.3)] hover:brightness-110",
      secondary:
        "bg-linear-to-b from-[#3b82f6] to-[#2563eb] text-white border border-blue-400/30 shadow-[0_2px_10px_rgba(37,99,235,0.25)] hover:shadow-[0_4px_16px_rgba(37,99,235,0.38)] hover:brightness-110",
      outline:
        "border border-slate-200/90 bg-white text-slate-800 shadow-2xs hover:bg-slate-50 hover:border-slate-300 hover:shadow-xs",
      ghost: "text-slate-700 hover:bg-slate-100 hover:text-slate-900",
      icon: "border border-slate-200/90 bg-white text-slate-700 shadow-2xs hover:bg-slate-50 hover:border-slate-300 hover:text-slate-900 hover:shadow-xs",
    };

    const sizeStyles: Record<ButtonSize, string> = {
      sm: "text-xs px-3 py-1.5 rounded-lg gap-1.5 h-8",
      md: "text-sm px-4 py-2 rounded-xl gap-2 h-10",
      lg: "text-base px-6 py-2.5 rounded-xl gap-2.5 h-12",
      icon: "p-2 rounded-xl h-10 w-10 gap-0",
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
        {...props}
      >
        {isLoading ? (
          <span className="inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
        ) : (
          <>
            {rightIcon && <span className="inline-flex shrink-0">{rightIcon}</span>}
            {children}
            {leftIcon && <span className="inline-flex shrink-0">{leftIcon}</span>}
          </>
        )}
      </button>
    );
  }
);

Button.displayName = "Button";
