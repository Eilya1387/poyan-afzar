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
      {/* Right button (Previous in RTL) */}
      <button
        type="button"
        disabled={currentPage === 1}
        onClick={() => onPageChange && onPageChange(currentPage - 1)}
        className="w-10 h-10 rounded-xl border border-slate-200/80 bg-white hover:bg-slate-50 disabled:opacity-30 disabled:pointer-events-none flex items-center justify-center text-slate-700 transition-all shadow-xs cursor-pointer active:scale-95"
        aria-label="صفحه قبلی"
      >
        <ChevronRight className="w-4 h-4" />
      </button>

      {/* Pages */}
      {pages.map((page, idx) => {
        if (page === "ellipsis") {
          return (
            <span
              key={`ellipsis-${idx}`}
              className="w-8 h-10 flex items-center justify-center text-slate-400 text-sm font-bold"
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
                ? "bg-[#0b1528] text-white shadow-md ring-1 ring-[#0b1528]"
                : "border border-slate-200/80 bg-white text-slate-700 hover:bg-slate-50 hover:border-slate-300 shadow-2xs"
            }`}
          >
            {toPersianDigits(page)}
          </button>
        );
      })}

      {/* Left button (Next in RTL) */}
      <button
        type="button"
        onClick={() => onPageChange && onPageChange(currentPage + 1)}
        className="w-10 h-10 rounded-xl border border-slate-200/80 bg-white hover:bg-slate-50 flex items-center justify-center text-slate-700 transition-all shadow-xs cursor-pointer active:scale-95"
        aria-label="صفحه بعدی"
      >
        <ChevronLeft className="w-4 h-4" />
      </button>
    </div>
  );
}
