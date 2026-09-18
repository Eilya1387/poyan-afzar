"use client";

import React, { useState } from "react";
import { Star, CheckCircle2, ShieldCheck, Circle } from "lucide-react";
import { ProductColor } from "@/lib/products";

interface ProductInfoProps {
  brand: string;
  code: string;
  title: string;
  enTitle: string;
  rating: number;
  reviewsCount: number;
  stockText: string;
  colors: ProductColor[];
  guarantee: string;
  highlights: string[];
}

export function ProductInfo({
  brand,
  code,
  title,
  enTitle,
  rating,
  reviewsCount,
  stockText,
  colors,
  guarantee,
  highlights,
}: ProductInfoProps) {
  const [selectedColor, setSelectedColor] = useState(colors[0]?.name || "");

  const formatPersianNumber = (num: number) => {
    const persianDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
    return num
      .toLocaleString("fa-IR")
      .replace(/[0-9]/g, (w) => persianDigits[+w]);
  };

  return (
    <div className="flex flex-col gap-5 text-right">
      <div>
        <div className="flex items-center justify-between gap-2 mb-2 text-xs">
          <span className="text-slate-400 font-medium">
            کد کالا: {code}
          </span>
          <span className="font-bold text-[#2563eb] hover:underline cursor-pointer">
            {brand}
          </span>
        </div>

        <h1 className="text-lg sm:text-xl md:text-2xl font-black text-slate-900 leading-snug mb-1">
          {title}
        </h1>

        <p className="text-xs text-slate-400 font-medium tracking-normal mb-3" dir="ltr">
          {enTitle}
        </p>

        <div className="flex items-center gap-2 text-xs">
          <div className="flex items-center gap-0.5">
            {[1, 2, 3, 4, 5].map((s) => (
              <Star
                key={s}
                className="w-4 h-4 fill-amber-400 text-amber-400"
              />
            ))}
          </div>
          <span className="font-bold text-slate-700">
            {formatPersianNumber(rating)}
          </span>
          <span className="text-slate-400">
            (از {formatPersianNumber(reviewsCount)} دیدگاه کاربران)
          </span>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-5 space-y-4 shadow-2xs">
        <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-emerald-600">
          <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
          <span>{stockText}</span>
        </div>

        {colors.length > 0 && (
          <div className="pt-3 border-t border-slate-100">
            <div className="text-xs font-bold text-slate-700 mb-2">
              انتخاب رنگ: <span className="text-slate-900 font-black">{selectedColor}</span>
            </div>

            <div className="flex items-center gap-2.5">
              {colors.map((c) => {
                const isSelected = selectedColor === c.name;
                return (
                  <button
                    key={c.name}
                    type="button"
                    onClick={() => setSelectedColor(c.name)}
                    aria-label={c.name}
                    title={c.name}
                    className={`w-7 h-7 rounded-full transition-all cursor-pointer flex items-center justify-center p-0.5 ${
                      isSelected
                        ? "ring-2 ring-[#2563eb] ring-offset-2"
                        : "ring-1 ring-slate-300 hover:ring-slate-400"
                    }`}
                  >
                    <span
                      className="w-full h-full rounded-full border border-slate-200 shadow-2xs"
                      style={{ backgroundColor: c.hex }}
                    />
                  </button>
                );
              })}
            </div>
          </div>
        )}

        <div className="pt-3 border-t border-slate-100">
          <div className="text-xs font-bold text-slate-700 mb-2">
            گارانتی:
          </div>
          <div className="flex items-center gap-2.5 p-3 rounded-xl border border-slate-200/90 bg-slate-50/70 text-xs font-semibold text-slate-800">
            <ShieldCheck className="w-4 h-4 text-[#2563eb] shrink-0" />
            <span>{guarantee}</span>
          </div>
        </div>
      </div>

      {highlights.length > 0 && (
        <div className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-5 space-y-3 shadow-2xs">
          <h2 className="text-xs sm:text-sm font-black text-slate-900">
            ویژگی‌های برجسته محصول:
          </h2>
          <ul className="space-y-2 text-xs sm:text-sm text-slate-700">
            {highlights.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2 leading-relaxed">
                <Circle className="w-2 h-2 fill-[#2563eb] text-[#2563eb] shrink-0 mt-1.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
