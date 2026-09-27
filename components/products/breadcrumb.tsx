"use client";

import React from "react";
import Link from "next/link";
import { ChevronLeft, Home } from "lucide-react";

export function Breadcrumb() {
  return (
    <nav aria-label="مسیر راهنما" className="flex items-center gap-2 text-xs font-medium text-slate-500 dark:text-slate-400 py-3 mb-2 flex-wrap">
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 hover:text-[#2563eb] dark:hover:text-blue-400 transition-colors cursor-pointer"
      >
        <Home className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500" />
        <span>خانه</span>
      </Link>
      <ChevronLeft className="w-3.5 h-3.5 text-slate-300 dark:text-slate-600 shrink-0" />
      <Link
        href="/products"
        className="hover:text-[#2563eb] dark:hover:text-blue-400 transition-colors cursor-pointer"
      >
        کامپیوتر و قطعات
      </Link>
      <ChevronLeft className="w-3.5 h-3.5 text-slate-300 dark:text-slate-600 shrink-0" />
      <span className="text-[#0b1528] dark:text-white font-bold">
        کارت گرافیک و پردازنده
      </span>
    </nav>
  );
}
