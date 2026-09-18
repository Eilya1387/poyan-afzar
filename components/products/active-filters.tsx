"use client";

import React from "react";
import { X, Trash2, Filter } from "lucide-react";

interface ActiveFiltersProps {
  activeBrands: string[];
  onlyInStock: boolean;
  onRemoveBrand: (brand: string) => void;
  onToggleInStock: () => void;
  onClearAll: () => void;
}

export function ActiveFilters({
  activeBrands,
  onlyInStock,
  onRemoveBrand,
  onToggleInStock,
  onClearAll,
}: ActiveFiltersProps) {
  const hasActiveFilters = activeBrands.length > 0 || onlyInStock;

  if (!hasActiveFilters) {
    return null;
  }

  return (
    <div className="flex items-center gap-2.5 flex-wrap py-2">
      <div className="inline-flex items-center gap-1.5 text-xs text-slate-500 font-bold">
        <Filter className="w-3.5 h-3.5 text-slate-400" />
        <span>فیلترهای اعمال‌شده:</span>
      </div>

      {activeBrands.map((brand) => (
        <button
          key={brand}
          type="button"
          onClick={() => onRemoveBrand(brand)}
          className="inline-flex items-center gap-1.5 bg-blue-50/80 hover:bg-rose-50 border border-blue-200/80 hover:border-rose-200 text-[#2563eb] hover:text-rose-600 text-xs font-bold px-3 py-1.5 rounded-xl transition-all duration-150 group cursor-pointer shadow-2xs"
          title={`حذف فیلتر ${brand}`}
        >
          <span>برند: {brand}</span>
          <X className="w-3.5 h-3.5 text-blue-400 group-hover:text-rose-500 transition-colors" />
        </button>
      ))}

      {onlyInStock && (
        <button
          type="button"
          onClick={onToggleInStock}
          className="inline-flex items-center gap-1.5 bg-emerald-50/80 hover:bg-rose-50 border border-emerald-200/80 hover:border-rose-200 text-emerald-700 hover:text-rose-600 text-xs font-bold px-3 py-1.5 rounded-xl transition-all duration-150 group cursor-pointer shadow-2xs"
          title="حذف فیلتر فقط کالاهای موجود"
        >
          <span>فقط کالاهای موجود</span>
          <X className="w-3.5 h-3.5 text-emerald-500 group-hover:text-rose-500 transition-colors" />
        </button>
      )}

      <button
        type="button"
        onClick={onClearAll}
        className="inline-flex items-center gap-1 text-xs text-rose-500 hover:text-rose-700 font-bold transition-colors mr-2 cursor-pointer hover:underline"
      >
        <Trash2 className="w-3.5 h-3.5" />
        <span>حذف همه فیلترها</span>
      </button>
    </div>
  );
}
