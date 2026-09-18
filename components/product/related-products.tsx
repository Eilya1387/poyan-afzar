import React from "react";
import Link from "next/link";
import { Heart, Star, Plus } from "lucide-react";
import { Product } from "@/lib/products";
import { Button } from "@/components/ui/button";

interface RelatedProductsProps {
  products: Product[];
}

export function RelatedProducts({ products }: RelatedProductsProps) {
  if (!products || products.length === 0) return null;

  return (
    <section className="py-8 text-right">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-base sm:text-lg md:text-xl font-black text-slate-900">
          محصولات مشابه و پیشنهادی
        </h2>
      </div>

      <div className="flex md:grid md:grid-cols-4 gap-3 md:gap-4 overflow-x-auto md:overflow-x-visible pb-2 md:pb-0 snap-x snap-mandatory scroll-smooth no-scrollbar">
        {products.map((product) => (
          <div
            key={product.id}
            className="relative w-[39%] sm:w-50 md:w-auto shrink-0 md:shrink snap-start bg-white rounded-2xl border border-slate-200 p-2.5 sm:p-4 flex flex-col justify-between hover:border-slate-300 hover:shadow-md transition-all duration-200 group"
          >
            <Link
              href={`/products/${product.id}`}
              className="absolute inset-0 z-0 rounded-2xl"
              aria-label={product.title}
            />

            <div className="relative z-1 pointer-events-none">
              <div className="relative aspect-square rounded-xl overflow-hidden bg-slate-100 mb-2 sm:mb-3 border border-slate-100 flex items-center justify-center p-0">
                <span className="absolute top-1.5 right-1.5 sm:top-2.5 sm:right-2.5 z-10 bg-red-500 text-white text-[10px] sm:text-[11px] font-bold px-1.5 py-0.5 rounded-md shadow-xs">
                  {product.discount}
                </span>

                <div className="absolute top-1.5 left-1.5 sm:top-2.5 sm:left-2.5 z-10 flex flex-col gap-1 pointer-events-auto">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                    }}
                    aria-label="افزودن به علاقه‌مندی‌ها"
                    className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-white/90 border border-slate-200 shadow-xs flex items-center justify-center text-slate-600 hover:text-red-500 transition-colors cursor-pointer"
                  >
                    <Heart className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                  </button>
                </div>

                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
              </div>

              <div className="flex items-center justify-between text-[10px] sm:text-[11px] mb-1">
                <span className="font-medium text-slate-600 truncate">
                  {product.brand}
                </span>
                <div className="flex items-center gap-1 text-slate-600 font-medium shrink-0">
                  <Star className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-amber-400 text-amber-400" />
                  <span className="font-bold text-slate-700">
                    {product.rating}
                  </span>
                </div>
              </div>

              <h3 className="text-[11px] sm:text-xs md:text-sm font-bold text-slate-800 line-clamp-2 h-7 sm:h-10 leading-tight group-hover:text-[#2563eb] transition-colors">
                {product.title}
              </h3>
            </div>

            <div className="relative z-1 mt-2.5 sm:mt-4 pt-2 sm:pt-3 border-t border-slate-100">
              <div className="flex items-center justify-between gap-1 sm:gap-2">
                <Button
                  variant="secondary"
                  size="sm"
                  type="button"
                  className="rounded-lg sm:rounded-xl px-2 sm:px-4 py-1 text-xs font-bold gap-1 cursor-pointer shadow-xs hover:shadow-md shrink-0 relative z-10"
                >
                  <Plus className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  <span>خرید</span>
                </Button>

                <div className="flex items-center gap-0.5 sm:gap-1 font-black text-xs sm:text-sm md:text-base text-[#0b1528] truncate">
                  <span>{product.price}</span>
                  <span className="text-[9px] sm:text-[10px] font-medium text-slate-600">
                    تومان
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
