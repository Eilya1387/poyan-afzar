"use client";

import React, { useState } from "react";
import {
  ShoppingCart,
  Heart,
  Truck,
  ShieldCheck,
  Plus,
  Minus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Product } from "@/lib/products";
import { useCartStore, useFavoritesStore } from "@/lib/store";

interface BuyBoxProps {
  seller: string;
  price: string;
  oldPrice?: string;
  discount?: string;
  product?: Product;
}

export function BuyBox({
  seller,
  price,
  oldPrice,
  discount,
  product,
}: BuyBoxProps) {
  const addItem = useCartStore((state) => state.addItem);
  const { toggleFavorite, isFavorite } = useFavoritesStore();

  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);

  const isFav = product ? isFavorite(product.id) : false;

  const handleIncrement = () => setQuantity((q) => q + 1);
  const handleDecrement = () => setQuantity((q) => (q > 1 ? q - 1 : 1));

  const handleAddToCart = () => {
    if (product) {
      addItem(
        {
          id: product.id,
          title: product.title,
          price: product.priceNumber,
          oldPrice: product.oldPrice
            ? parseInt(product.oldPrice.replace(/[^0-9]/g, ""), 10)
            : undefined,
          discount: product.discount,
          image: product.image,
          seller: product.seller,
          guarantee: product.guarantee,
          color: product.colors[0]?.name,
          inStockText: product.stockText,
        },
        quantity,
      );
    }
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const handleToggleFavorite = () => {
    if (product) {
      toggleFavorite({
        id: product.id,
        title: product.title,
        price: product.priceNumber,
        priceString: product.price,
        image: product.image,
        brand: product.brand,
        rating: product.rating,
      });
    }
  };

  const toPersianDigits = (n: number) => {
    const persianDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
    return n.toString().replace(/[0-9]/g, (w) => persianDigits[+w]);
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs sticky top-24 space-y-5 text-right">
      <div className=" pt-4">
        {discount && oldPrice && (
          <div className="flex items-center justify-between mb-1.5">
            <span className="bg-red-500 text-white text-[11px] font-bold px-2 py-0.5 rounded-md shadow-2xs">
              {discount}
            </span>
            <span className="text-xs text-slate-400 line-through font-medium">
              {oldPrice}
            </span>
          </div>
        )}

        <div className="flex items-baseline justify-between gap-1.5">
          <span className="text-2xl font-black text-slate-900 tracking-tight">
            {price}
          </span>
          <span className="text-xs text-slate-500 font-medium">تومان</span>
        </div>
      </div>

      <div className="flex items-center justify-between border-t border-slate-100 pt-4">
        <div className="inline-flex items-center border border-slate-200 rounded-xl bg-slate-50/50 p-1">
          <button
            type="button"
            onClick={handleDecrement}
            disabled={quantity <= 1}
            aria-label="کاهش تعداد"
            className="w-7 h-7 rounded-lg bg-white border border-slate-200/80 shadow-2xs flex items-center justify-center text-slate-700 hover:text-[#2563eb] hover:border-blue-200 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
          >
            <Minus className="w-3.5 h-3.5" />
          </button>
          <span className="w-9 text-center text-xs font-black text-slate-800 select-none">
            {toPersianDigits(quantity)}
          </span>
          <button
            type="button"
            onClick={handleIncrement}
            aria-label="افزایش تعداد"
            className="w-7 h-7 rounded-lg bg-white border border-slate-200/80 shadow-2xs flex items-center justify-center text-slate-700 hover:text-[#2563eb] hover:border-blue-200 transition-colors cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
          </button>
        </div>
        <span className="text-xs text-slate-500 font-medium">تعداد</span>
      </div>

      <div className="space-y-2.5 pt-1">
        <Button
          variant="primary"
          size="lg"
          onClick={handleAddToCart}
          className="w-full font-black text-sm gap-2"
          rightIcon={<ShoppingCart className="w-4 h-4" />}
        >
          {isAdded ? "به سبد خرید اضافه شد!" : "افزودن به سبد خرید"}
        </Button>

        <Button
          variant="outline"
          size="md"
          type="button"
          onClick={handleToggleFavorite}
          className={`w-full font-semibold text-xs gap-1.5 ${
            isFav ? "text-red-500 border-red-200 bg-red-50/30" : ""
          }`}
          rightIcon={
            <Heart
              className={`w-4 h-4 ${isFav ? "fill-red-500 text-red-500" : ""}`}
            />
          }
        >
          {isFav ? "در لیست علاقه‌مندی‌ها" : "افزودن به علاقه‌مندی‌ها"}
        </Button>
      </div>
    </div>
  );
}
