"use client";

import React from "react";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { toPersianDigits } from "@/lib/formatters";

interface PaginationProps {
  currentPage?: number;
  totalPages?: number;
  onPageChange?: (page: number) => void;
}

export function Pagination({
  currentPage = 1,
  onPageChange,
}: PaginationProps) {
  const pages = [1, 2, 3, "ellipsis", 8] as const;

  return (
    <div className="flex items-center justify-center gap-1.5 sm:gap-2 my-10 select-none">
      <button
        type="button"
        disabled={currentPage === 1}
        onClick={() => onPageChange && onPageChange(currentPage - 1)}
        className="w-10 h-10 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-[#111827] hover:bg-slate-50 dark:hover:bg-slate-800 disabled:opacity-30 disabled:pointer-events-none flex items-center justify-center text-slate-700 dark:text-slate-300 transition-all shadow-xs cursor-pointer active:scale-95"
        aria-label="صفحه قبلی"
      >
        <ChevronRight className="w-4 h-4" />
      </button>

      {pages.map((page, idx) => {
        if (page === "ellipsis") {
          return (
            <span
              key={`ellipsis-${idx}`}
              className="w-8 h-10 flex items-center justify-center text-slate-400 dark:text-slate-600 text-sm font-bold"
            >
              ...
            </span>
          );
        }

        const isActive = currentPage === page;

        return (
          <button
            key={page}
            type="button"
            onClick={() => onPageChange && onPageChange(page)}
            className={`w-10 h-10 rounded-xl text-xs sm:text-sm font-black flex items-center justify-center transition-all duration-150 cursor-pointer active:scale-95 ${
              isActive
                ? "bg-[#0b1528] dark:bg-blue-600 text-white shadow-md ring-1 ring-[#0b1528] dark:ring-blue-600"
                : "border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-[#111827] text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 hover:border-slate-300 dark:hover:border-slate-700 shadow-2xs"
            }`}
          >
            {toPersianDigits(page)}
          </button>
        );
      })}

      <button
        type="button"
        onClick={() => onPageChange && onPageChange(currentPage + 1)}
        className="w-10 h-10 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-[#111827] hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center justify-center text-slate-700 dark:text-slate-300 transition-all shadow-xs cursor-pointer active:scale-95"
        aria-label="صفحه بعدی"
      >
        <ChevronLeft className="w-4 h-4" />
      </button>
    </div>
  );
}
