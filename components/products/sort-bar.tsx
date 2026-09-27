"use client";

import React from "react";
import { ArrowDownUp, Sparkles } from "lucide-react";
import { SortType } from "@/types/product";
import { toPersianDigits } from "@/lib/formatters";

interface SortBarProps {
  currentSort: SortType;
  onSortChange: (sort: SortType) => void;
  totalCount: number;
}

const sortOptions: { id: SortType; label: string }[] = [
  { id: "best-seller", label: "پرفروش‌ترین" },
  { id: "newest", label: "جدیدترین" },
  { id: "cheapest", label: "ارزان‌ترین" },
  { id: "expensive", label: "گران‌ترین" },
  { id: "discount", label: "بیشترین تخفیف" },
];

export function SortBar({
  currentSort,
  onSortChange,
  totalCount,
}: SortBarProps) {
  return (
    <div className="w-full bg-white dark:bg-[#111827] border border-slate-200/80 dark:border-slate-800 rounded-2xl p-3 sm:px-4 sm:py-3.5 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3.5 shadow-xs">
      <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
        <div className="flex items-center gap-1.5 text-xs sm:text-sm font-extrabold text-[#0b1528] dark:text-white shrink-0 ml-1">
          <div className="w-6 h-6 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-[#2563eb] dark:text-blue-400 flex items-center justify-center">
            <ArrowDownUp className="w-3.5 h-3.5" />
          </div>
          <span>مرتب‌سازی:</span>
        </div>

        <div className="flex items-center gap-1 sm:gap-1.5 flex-wrap">
          {sortOptions.map((opt) => {
            const isActive = currentSort === opt.id;
            return (
              <button
                key={opt.id}
                type="button"
                onClick={() => onSortChange(opt.id)}
                className={`text-xs px-3 py-1.5 rounded-xl font-bold cursor-pointer select-none active:scale-95 transition-colors ${
                  isActive
                    ? "bg-[#0b1528] dark:bg-blue-600 text-white shadow-sm ring-1 ring-[#0b1528] dark:ring-blue-600"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white bg-transparent"
                }`}
              >
                {opt.label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
