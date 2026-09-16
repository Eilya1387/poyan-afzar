import React from "react";

export type BadgeVariant = "default" | "danger" | "success" | "warning" | "brand" | "outline";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  children: React.ReactNode;
  className?: string;
}

export function Badge({
  children,
  variant = "default",
  className = "",
  ...props
}: BadgeProps) {
  const baseStyles =
    "inline-flex items-center justify-center font-medium rounded-md px-2 py-0.5 text-xs transition-colors";

  const variantStyles: Record<BadgeVariant, string> = {
    default: "bg-slate-100 text-slate-700",
    brand: "bg-blue-50 text-blue-600 border border-blue-100",
    danger: "bg-red-500 text-white font-semibold",
    success: "bg-emerald-50 text-emerald-700 border border-emerald-100",
    warning: "bg-amber-50 text-amber-700 border border-amber-100",
    outline: "border border-slate-200 text-slate-700 bg-white",
  };

  return (
    <span
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {children}
    </span>
  );
}
