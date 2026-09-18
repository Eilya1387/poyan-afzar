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
    <div className="w-full bg-white border border-slate-200/80 rounded-2xl p-3 sm:px-4 sm:py-3.5 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3.5 shadow-xs">
      {/* Right: Sort Title and Options */}
      <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
        <div className="flex items-center gap-1.5 text-xs sm:text-sm font-extrabold text-[#0b1528] shrink-0 ml-1">
          <div className="w-6 h-6 rounded-lg bg-blue-50 text-[#2563eb] flex items-center justify-center">
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
                className={`text-xs px-3 py-1.5 rounded-xl font-bold cursor-pointer select-none active:scale-95 ${
                  isActive
                    ? "bg-[#0b1528] text-white shadow-sm ring-1 ring-[#0b1528]"
                    : "text-slate-600 bg-transparent"
                }`}
              >
                {opt.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Left: Total Count found */}
      <div className="inline-flex items-center justify-end gap-1.5 text-xs font-semibold text-slate-500 bg-slate-50 border border-slate-200/70 px-3 py-1.5 rounded-xl self-start sm:self-center shrink-0">
        <Sparkles className="w-3.5 h-3.5 text-[#2563eb]" />
        <span>
          <strong className="text-[#0b1528] font-black">{toPersianDigits(totalCount)}</strong> کالا
        </span>
      </div>
    </div>
  );
}
