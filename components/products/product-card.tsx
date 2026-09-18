"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ShoppingCart, Star, Check } from "lucide-react";
import { Product } from "@/types/product";
import { formatPriceFa, toPersianDigits } from "@/lib/formatters";
import { useCartStore } from "@/lib/cart-store";

interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
}

export function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const [isAdded, setIsAdded] = useState(false);
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = () => {
    addItem(product, 1);
    setIsAdded(true);
    if (onAddToCart) {
      onAddToCart(product);
    }
    setTimeout(() => {
      setIsAdded(false);
    }, 1400);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 p-4 sm:p-5 flex flex-col justify-between shadow-2xs">
      <div>
        {/* Top Image Container - No badges, no hover zoom */}
        <div className="relative w-full aspect-4/3 bg-[#f8fafc] rounded-xl overflow-hidden flex items-center justify-center p-3 mb-4">
          {/* Product Image */}
          <div className="relative w-full h-full">
            <Image
              src={product.image}
              alt={product.title}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-contain"
            />
          </div>
        </div>

        {/* Brand Tag */}
        <div className="text-left text-xs font-bold text-slate-400 mb-1" dir="ltr">
          {product.brand}
        </div>

        {/* Title */}
        <h3 className="text-xs sm:text-sm font-bold text-slate-800 leading-snug line-clamp-2 min-h-[40px] sm:min-h-[42px] mb-2.5">
          {product.title}
        </h3>

        {/* Rating and Reviews */}
        <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-4">
          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
          <span className="font-bold text-slate-700">
            {toPersianDigits((product.rating ?? 5).toFixed(1))}
          </span>
          <span className="text-slate-400 text-[11px]">
            ({toPersianDigits(product.reviewsCount ?? 0)} دیدگاه)
          </span>
        </div>
      </div>

      {/* Price and Add to Cart Section */}
      <div className="pt-3 border-t border-slate-100">
        <div className="flex flex-col items-start min-h-[44px] justify-center mb-3.5">
          {product.originalPrice && (
            <span className="text-[11px] sm:text-xs text-slate-400 line-through font-medium">
              {formatPriceFa(product.originalPrice)} تومان
            </span>
          )}
          <div className="flex items-baseline gap-1">
            <span className="text-base sm:text-lg font-black text-[#0b1528] tracking-tight">
              {formatPriceFa(product.price)}
            </span>
            <span className="text-xs font-semibold text-slate-500">
              تومان
            </span>
          </div>
        </div>

        {/* Professional Add to Cart Button with sleek hover animation */}
        <button
          type="button"
          onClick={handleAddToCart}
          className={`group/btn w-full py-2.5 px-4 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 select-none cursor-pointer transition-all duration-200 active:scale-[0.97] ${
            isAdded
              ? "bg-emerald-600 text-white shadow-xs scale-[0.99]"
              : "bg-linear-to-b from-[#3b82f6] to-[#2563eb] text-white border border-blue-400/30 shadow-[0_2px_8px_rgba(37,99,235,0.22)] hover:shadow-[0_4px_16px_rgba(37,99,235,0.38)] hover:brightness-110"
          }`}
        >
          {isAdded ? (
            <>
              <Check className="w-4 h-4 animate-in zoom-in-50 duration-150" />
              <span>به سبد افزوده شد</span>
            </>
          ) : (
            <>
              <ShoppingCart className="w-4 h-4 transition-transform duration-200 group-hover/btn:-translate-x-0.5" />
              <span>افزودن به سبد خرید</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
