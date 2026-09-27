"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  ShoppingCart,
  Heart,
  Truck,
  ShieldCheck,
  Plus,
  Minus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/toast";
import { Product } from "@/lib/products";
import { useCartStore, useFavoritesStore } from "@/lib/store";
import { useAuth } from "@/components/auth/auth-context";
import { userApi } from "@/lib/api/user";

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
  const router = useRouter();
  const { isLoggedIn } = useAuth();
  const [mounted, setMounted] = useState(false);
  const addItem = useCartStore((state) => state.addItem);
  const { toggleFavorite, isFavorite } = useFavoritesStore();

  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isFav = mounted && product ? isFavorite(product.id) : false;

  const handleIncrement = () => setQuantity((q) => q + 1);
  const handleDecrement = () => setQuantity((q) => (q > 1 ? q - 1 : 1));

  const handleAddToCart = () => {
    if (!isLoggedIn) {
      router.push(`/login?redirect=/products/${product?.id || ""}`);
      return;
    }

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
      toast.success("به سبد خرید اضافه شد", `${product.title} به سبد خرید افزوده شد.`, {
        action: {
          label: "مشاهده سبد خرید",
          onClick: () => router.push("/cart"),
        },
      });
    }
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const handleToggleFavorite = () => {
    if (!isLoggedIn) {
      router.push("/login");
      return;
    }

    if (product) {
      const willBeFav = !isFav;
      toggleFavorite({
        id: product.id,
        title: product.title,
        price: product.priceNumber,
        priceString: product.price,
        image: product.image,
        brand: product.brand,
        rating: product.rating,
      });
      userApi.toggleFavorite(product.id).catch(() => {});

      if (willBeFav) {
        toast.success("به علاقه‌مندی‌ها اضافه شد", `${product.title} به لیست علاقه‌مندی‌های شما افزوده شد.`);
      } else {
        toast.info("از علاقه‌مندی‌ها حذف شد", `${product.title} از لیست علاقه‌مندی‌های شما حذف گردید.`);
      }
    }
  };

  const toPersianDigits = (n: number) => {
    const persianDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
    return n.toString().replace(/[0-9]/g, (w) => persianDigits[+w]);
  };

  return (
    <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#111827] p-5 shadow-xs sticky top-24 space-y-5 text-right">
      <div className=" pt-4">
        {discount && oldPrice && (
          <div className="flex items-center justify-between mb-1.5">
            <span className="bg-red-500 text-white text-[11px] font-bold px-2 py-0.5 rounded-md shadow-2xs">
              {discount}
            </span>
            <span className="text-xs text-slate-400 dark:text-slate-500 line-through font-medium">
              {oldPrice}
            </span>
          </div>
        )}

        <div className="flex items-baseline justify-between gap-1.5">
          <span className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
            {price}
          </span>
          <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">تومان</span>
        </div>
      </div>

      <div className="flex items-center justify-between border-t border-slate-100 dark:border-slate-800 pt-4">
        <div className="inline-flex items-center border border-slate-200 dark:border-slate-700 rounded-xl bg-slate-50/50 dark:bg-slate-800/50 p-1">
          <button
            type="button"
            onClick={handleDecrement}
            disabled={quantity <= 1}
            aria-label="کاهش تعداد"
            className="w-7 h-7 rounded-lg bg-white dark:bg-slate-700 border border-slate-200/80 dark:border-slate-600 shadow-2xs flex items-center justify-center text-slate-700 dark:text-slate-200 hover:text-[#2563eb] dark:hover:text-blue-400 hover:border-blue-200 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
          >
            <Minus className="w-3.5 h-3.5" />
          </button>
          <span className="w-9 text-center text-xs font-black text-slate-800 dark:text-slate-200 select-none">
            {toPersianDigits(quantity)}
          </span>
          <button
            type="button"
            onClick={handleIncrement}
            aria-label="افزایش تعداد"
            className="w-7 h-7 rounded-lg bg-white dark:bg-slate-700 border border-slate-200/80 dark:border-slate-600 shadow-2xs flex items-center justify-center text-slate-700 dark:text-slate-200 hover:text-[#2563eb] dark:hover:text-blue-400 hover:border-blue-200 transition-colors cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
          </button>
        </div>
        <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">تعداد</span>
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
