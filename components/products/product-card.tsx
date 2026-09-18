"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Heart, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Product } from "@/lib/products";
import { useFavoritesStore } from "@/lib/store";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const router = useRouter();
  const { toggleFavorite, isFavorite } = useFavoritesStore();
  const isFav = isFavorite(product.id);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite({
      id: product.id,
      title: product.title,
      price: product.priceNumber,
      priceString: product.price,
      image: product.image,
      brand: product.brand,
    });
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    router.push(`/products/${product.id}`);
  };

  return (
    <Link
      href={`/products/${product.id}`}
      className="bg-white rounded-2xl border border-slate-200 p-2.5 sm:p-3.5 flex flex-col justify-between hover:border-slate-300 hover:shadow-md transition-all duration-200 group cursor-pointer"
    >
      <div>
        <div className="relative aspect-square rounded-xl overflow-hidden bg-slate-100 mb-2 sm:mb-2.5 border border-slate-100 flex items-center justify-center p-0">
          {product.discount && (
            <span className="absolute top-1.5 right-1.5 sm:top-2 sm:right-2 z-10 bg-red-500 text-white text-[10px] sm:text-[11px] font-bold px-1.5 py-0.5 rounded-md shadow-xs">
              {product.discount}
            </span>
          )}

          <div className="absolute top-1.5 left-1.5 sm:top-2 sm:left-2 z-10">
            <button
              type="button"
              onClick={handleFavoriteClick}
              aria-label="افزودن به علاقه‌مندی‌ها"
              className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-white/90 border border-slate-200 shadow-xs flex items-center justify-center text-slate-600 hover:text-red-500 transition-colors cursor-pointer"
            >
              <Heart
                className={`w-3.5 h-3.5 ${isFav ? "fill-red-500 text-red-500" : ""}`}
              />
            </button>
          </div>

          <img
            src={product.image}
            alt={product.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
        </div>

        <div className="text-[10px] sm:text-[11px] mb-1 font-medium text-slate-500 truncate">
          {product.brand}
        </div>

        <h3 className="text-[11px] sm:text-xs md:text-sm font-bold text-slate-800 line-clamp-2 h-7 sm:h-9 leading-tight group-hover:text-[#2563eb] transition-colors">
          {product.title}
        </h3>
      </div>

      <div className="mt-2.5 sm:mt-3 pt-2 sm:pt-2.5 border-t border-slate-100">
        <div className="flex items-center justify-between mb-2">
          {product.oldPrice ? (
            <span className="text-[10px] text-slate-400 line-through">
              {product.oldPrice}
            </span>
          ) : (
            <span />
          )}

          <div className="flex items-center gap-0.5 sm:gap-1 font-black text-xs sm:text-sm text-[#0b1528] truncate">
            <span>{product.price}</span>
            <span className="text-[9px] sm:text-[10px] font-medium text-slate-600">
              تومان
            </span>
          </div>
        </div>

        <Button
          variant="secondary"
          size="sm"
          type="button"
          onClick={handleAddToCart}
          className="w-full font-bold text-[11px] sm:text-xs py-2 rounded-xl gap-1.5 shadow-xs hover:shadow-md"
          rightIcon={<ShoppingCart className="w-3.5 h-3.5" />}
        >
          افزودن به سبد خرید
        </Button>
      </div>
    </Link>
  );
}
