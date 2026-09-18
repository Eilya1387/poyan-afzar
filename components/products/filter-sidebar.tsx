"use client";

import React from "react";
import { FilterState } from "@/types/product";
import { Star, Check, RotateCcw, Sliders, Layers, Tag, DollarSign, Award } from "lucide-react";
import { formatPriceFa } from "@/lib/formatters";

interface FilterSidebarProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  onReset: () => void;
}

const availableCategories = [
  { id: "gpu", label: "کارت گرافیک (GPU)", count: "۸" },
  { id: "cpu", label: "پردازنده مرکزی (CPU)", count: "۳" },
  { id: "motherboard", label: "مادربرد (Motherboard)", count: "۲" },
];

const availableBrands = [
  { id: "ASUS", labelFa: "ایسوس", label: "ASUS (ایسوس)" },
  { id: "MSI", labelFa: "ام‌اس‌آی", label: "MSI (ام‌اس‌آی)" },
  { id: "Gigabyte", labelFa: "گیگابایت", label: "Gigabyte (گیگابایت)" },
  { id: "NVIDIA", labelFa: "ان‌ویدیا", label: "NVIDIA (ان‌ویدیا)" },
];

export function FilterSidebar({
  filters,
  onFilterChange,
  onReset,
}: FilterSidebarProps) {
  const toggleOnlyInStock = () => {
    onFilterChange({
      ...filters,
      onlyInStock: !filters.onlyInStock,
    });
  };

  const toggleCategory = (catId: string) => {
    const exists = filters.categories.includes(catId);
    const updated = exists
      ? filters.categories.filter((c) => c !== catId)
      : [...filters.categories, catId];
    onFilterChange({
      ...filters,
      categories: updated,
    });
  };

  const toggleBrand = (brandId: string) => {
    const exists = filters.brands.includes(brandId);
    const updated = exists
      ? filters.brands.filter((b) => b !== brandId)
      : [...filters.brands, brandId];
    onFilterChange({
      ...filters,
      brands: updated,
    });
  };

  const toggleMinRating = (rating: number) => {
    onFilterChange({
      ...filters,
      minRating: filters.minRating === rating ? null : rating,
    });
  };

  const handleMinPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    if (val <= filters.maxPrice) {
      onFilterChange({
        ...filters,
        minPrice: val,
      });
    }
  };

  const handleMaxPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    if (val >= filters.minPrice) {
      onFilterChange({
        ...filters,
        maxPrice: val,
      });
    }
  };

  const MIN_LIMIT = 10000000;
  const MAX_LIMIT = 100000000;
  const minPercent = ((filters.minPrice - MIN_LIMIT) / (MAX_LIMIT - MIN_LIMIT)) * 100;
  const maxPercent = ((filters.maxPrice - MIN_LIMIT) / (MAX_LIMIT - MIN_LIMIT)) * 100;

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs space-y-5 sticky top-24">
      {/* Sidebar Header */}
      <div className="flex items-center justify-between pb-1 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-xl bg-blue-50 text-[#2563eb] flex items-center justify-center font-bold">
            <Sliders className="w-4 h-4" />
          </div>
          <h2 className="text-sm font-extrabold text-[#0b1528]">
            فیلتر پیشرفته
          </h2>
        </div>
        <button
          type="button"
          onClick={onReset}
          className="inline-flex items-center gap-1 text-xs text-rose-500 font-bold transition-colors cursor-pointer px-2 py-1 rounded-lg"
        >
          <RotateCcw className="w-3 h-3" />
          <span>بازنشانی</span>
        </button>
      </div>

      {/* Only in stock toggle */}
      <div className="flex items-center justify-between py-1 bg-slate-50 px-3 py-2.5 rounded-xl border border-slate-200/50">
        <span className="text-xs sm:text-sm font-bold text-slate-800">
          فقط کالاهای موجود
        </span>
        <button
          type="button"
          role="switch"
          aria-checked={filters.onlyInStock}
          onClick={toggleOnlyInStock}
          className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
            filters.onlyInStock ? "bg-[#2563eb]" : "bg-slate-300"
          }`}
        >
          <span
            className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out ${
              filters.onlyInStock ? "-translate-x-5" : "translate-x-0"
            }`}
          />
        </button>
      </div>

      {/* Categories */}
      <div className="space-y-3">
        <div className="flex items-center gap-1.5 text-xs font-bold text-[#0b1528]">
          <Layers className="w-3.5 h-3.5 text-[#2563eb]" />
          <span>دسته‌بندی‌ها</span>
        </div>
        <div className="space-y-2">
          {availableCategories.map((cat) => {
            const isChecked = filters.categories.includes(cat.id);
            return (
              <label
                key={cat.id}
                className="flex items-center justify-between gap-3 text-xs sm:text-sm text-slate-700 cursor-pointer select-none p-1.5 rounded-xl"
                onClick={() => toggleCategory(cat.id)}
              >
                <div className="flex items-center gap-2.5">
                  <div
                    className={`w-4 h-4 rounded-md border flex items-center justify-center transition-all ${
                      isChecked
                        ? "bg-[#2563eb] border-[#2563eb] text-white shadow-xs"
                        : "border-slate-300 bg-white"
                    }`}
                  >
                    {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                  </div>
                  <span className={isChecked ? "font-bold text-[#0b1528]" : "font-medium text-slate-700"}>
                    {cat.label}
                  </span>
                </div>
              </label>
            );
          })}
        </div>
      </div>

      <div className="h-px bg-slate-100" />

      {/* Brands */}
      <div className="space-y-3">
        <div className="flex items-center gap-1.5 text-xs font-bold text-[#0b1528]">
          <Tag className="w-3.5 h-3.5 text-[#2563eb]" />
          <span>برند سازنده</span>
        </div>
        <div className="space-y-2">
          {availableBrands.map((brand) => {
            const isChecked = filters.brands.includes(brand.id);
            return (
              <label
                key={brand.id}
                className="flex items-center justify-between gap-3 text-xs sm:text-sm text-slate-700 cursor-pointer select-none p-1.5 rounded-xl"
                onClick={() => toggleBrand(brand.id)}
              >
                <div className="flex items-center gap-2.5">
                  <div
                    className={`w-4 h-4 rounded-md border flex items-center justify-center transition-all ${
                      isChecked
                        ? "bg-[#2563eb] border-[#2563eb] text-white shadow-xs"
                        : "border-slate-300 bg-white"
                    }`}
                  >
                    {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                  </div>
                  <span className={isChecked ? "font-bold text-[#0b1528]" : "font-medium text-slate-700"}>
                    {brand.label}
                  </span>
                </div>
              </label>
            );
          })}
        </div>
      </div>

      <div className="h-px bg-slate-100" />

      {/* Price Range */}
      <div className="space-y-3">
        <div className="flex items-center gap-1.5 text-xs font-bold text-[#0b1528]">
          <DollarSign className="w-3.5 h-3.5 text-[#2563eb]" />
          <span>محدوده قیمت (تومان)</span>
        </div>

        {/* Inputs */}
        <div className="grid grid-cols-2 gap-2">
          <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-2.5 text-right">
            <span className="text-[10px] text-slate-500 font-semibold block mb-0.5">حداکثر</span>
            <span className="text-xs font-black text-[#0b1528]">
              {formatPriceFa(filters.maxPrice)}
            </span>
          </div>

          <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-2.5 text-right">
            <span className="text-[10px] text-slate-500 font-semibold block mb-0.5">حداقل</span>
            <span className="text-xs font-black text-[#0b1528]">
              {formatPriceFa(filters.minPrice)}
            </span>
          </div>
        </div>

        {/* Dual Range Slider */}
        <div className="relative pt-3 pb-2 px-1">
          {/* Slider track background */}
          <div className="h-2 w-full bg-slate-100 rounded-full relative overflow-hidden">
            {/* Active highlight */}
            <div
              className="absolute h-full bg-linear-to-r from-blue-500 to-[#2563eb] rounded-full"
              style={{
                right: `${minPercent}%`,
                left: `${100 - maxPercent}%`,
              }}
            />
          </div>

          {/* Range inputs */}
          <input
            type="range"
            min={MIN_LIMIT}
            max={MAX_LIMIT}
            step={1000000}
            value={filters.minPrice}
            onChange={handleMinPriceChange}
            aria-label="حداقل قیمت"
            className="absolute top-2.5 right-0 w-full h-2 opacity-0 cursor-pointer pointer-events-auto"
          />
          <input
            type="range"
            min={MIN_LIMIT}
            max={MAX_LIMIT}
            step={1000000}
            value={filters.maxPrice}
            onChange={handleMaxPriceChange}
            aria-label="حداکثر قیمت"
            className="absolute top-2.5 right-0 w-full h-2 opacity-0 cursor-pointer pointer-events-auto"
          />
        </div>
      </div>

      <div className="h-px bg-slate-100" />

      {/* User Rating */}
      <div className="space-y-3">
        <div className="flex items-center gap-1.5 text-xs font-bold text-[#0b1528]">
          <Award className="w-3.5 h-3.5 text-[#2563eb]" />
          <span>امتیاز خریداران</span>
        </div>
        <label
          className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-700 cursor-pointer select-none p-1.5 rounded-xl"
          onClick={() => toggleMinRating(4)}
        >
          <div
            className={`w-4 h-4 rounded-md border flex items-center justify-center transition-all ${
              filters.minRating === 4
                ? "bg-[#2563eb] border-[#2563eb] text-white shadow-xs"
                : "border-slate-300 bg-white"
            }`}
          >
            {filters.minRating === 4 && <Check className="w-3 h-3 stroke-[3]" />}
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center text-amber-400 gap-0.5">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <Star className="w-3.5 h-3.5 text-slate-200 fill-slate-200" />
            </div>
            <span className="text-xs font-bold text-[#0b1528]">۴ ستاره و بالاتر</span>
          </div>
        </label>
      </div>
    </div>
  );
}
