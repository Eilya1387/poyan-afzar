"use client";

import React, { useRef } from "react";
import { ChevronRight, ChevronLeft, Sparkles } from "lucide-react";
import { Product } from "@/lib/products";
import { ProductCard } from "@/components/products/product-card";

interface RelatedProductsProps {
  products: Product[];
}

export function RelatedProducts({ products }: RelatedProductsProps) {
  const sliderRef = useRef<HTMLDivElement>(null);

  if (!products || products.length === 0) return null;

  const scroll = (direction: "left" | "right") => {
    if (sliderRef.current) {
      const scrollAmount = direction === "left" ? -300 : 300;
      sliderRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <section className="py-8 text-right select-none animate-fade-in">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-blue-50 text-[#2563eb] flex items-center justify-center">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg md:text-xl font-black text-slate-900">
              محصولات مشابه و پیشنهادی
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              کالاهای مرتبط و هم‌رده پیشنهادی کارشناسان پویان افزار
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => scroll("right")}
            className="w-9 h-9 rounded-xl border border-slate-200 hover:border-slate-300 bg-white flex items-center justify-center text-slate-600 hover:text-[#2563eb] transition-colors shadow-2xs cursor-pointer"
            aria-label="قبلی"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => scroll("left")}
            className="w-9 h-9 rounded-xl border border-slate-200 hover:border-slate-300 bg-white flex items-center justify-center text-slate-600 hover:text-[#2563eb] transition-colors shadow-2xs cursor-pointer"
            aria-label="بعدی"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div
        ref={sliderRef}
        className="flex gap-4 overflow-x-auto pb-4 pt-1 snap-x snap-mandatory scroll-smooth no-scrollbar"
      >
        {products.map((product) => (
          <div
            key={product.id}
            className="w-65 sm:w-70 md:w-75 shrink-0 snap-start"
          >
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </section>
  );
}
