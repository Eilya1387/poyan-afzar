"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Heart, Star, Plus, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { products } from "@/lib/products";
import { useCartStore, useFavoritesStore } from "@/lib/store";

const tabs = ["همه", "موبایل", "لپ‌تاپ"];

export function BestSellers() {
  const [activeTab, setActiveTab] = useState("همه");
  const addItem = useCartStore((state) => state.addItem);
  const { toggleFavorite, isFavorite } = useFavoritesStore();
  const [addedId, setAddedId] = useState<string | null>(null);

  const filteredProducts =
    activeTab === "همه"
      ? products.slice(0, 8)
      : products.filter((p) => p.category === activeTab);

  const handleAddToCart = (e: React.MouseEvent, product: (typeof products)[0]) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({
      id: product.id,
      title: product.title,
      price: product.priceNumber,
      image: product.image,
      seller: product.seller,
      guarantee: product.guarantee,
      inStockText: product.stockText,
    });
    setAddedId(product.id);
    setTimeout(() => setAddedId(null), 1500);
  };

  const handleToggleFavorite = (e: React.MouseEvent, product: (typeof products)[0]) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite({
      id: product.id,
      title: product.title,
      price: product.priceNumber,
      priceString: product.price,
      image: product.image,
      brand: product.brand,
      rating: product.rating,
    });
  };

  return (
    <section className="py-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-lg sm:text-xl font-black text-[#0b1528]">
            پرفروش‌ترین محصولات
          </h2>
          <p className="text-xs text-slate-600 font-medium mt-1">
            محبوب‌ترین کالاهای دیجیتال بر اساس انتخاب خریداران
          </p>
        </div>

        <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl self-start sm:self-auto">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeTab === tab
                  ? "bg-white text-slate-900 shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="flex md:grid md:grid-cols-4 gap-3 md:gap-4 overflow-x-auto md:overflow-x-visible pb-2 md:pb-0 snap-x snap-mandatory scroll-smooth no-scrollbar">
        {filteredProducts.map((product) => (
          <Link
            key={product.id}
            href={`/products/${product.id}`}
            className="w-[39%] sm:w-50 md:w-auto shrink-0 md:shrink snap-start bg-white rounded-2xl border border-slate-200 p-2.5 sm:p-4 flex flex-col justify-between hover:border-slate-300 hover:shadow-md transition-all duration-200 group cursor-pointer"
          >
            <div>
              <div className="relative aspect-square rounded-xl overflow-hidden bg-slate-100 mb-2 sm:mb-3 border border-slate-100 flex items-center justify-center p-0">
                <span className="absolute top-1.5 right-1.5 sm:top-2.5 sm:right-2.5 z-10 bg-red-500 text-white text-[10px] sm:text-[11px] font-bold px-1.5 py-0.5 rounded-md shadow-xs">
                  {product.discount}
                </span>

                <div className="absolute top-1.5 left-1.5 sm:top-2.5 sm:left-2.5 z-10 flex flex-col gap-1">
                  <button
                    type="button"
                    onClick={(e) => handleToggleFavorite(e, product)}
                    aria-label="افزودن به علاقه‌مندی‌ها"
                    className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-white/90 border border-slate-200 shadow-xs flex items-center justify-center text-slate-600 hover:text-red-500 transition-colors cursor-pointer"
                  >
                    <Heart
                      className={`w-3 h-3 sm:w-3.5 sm:h-3.5 ${
                        isFavorite(product.id) ? "fill-red-500 text-red-500" : ""
                      }`}
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

            <div className="mt-2.5 sm:mt-4 pt-2 sm:pt-3 border-t border-slate-100">
              <div className="flex items-center justify-between gap-1 sm:gap-2">
                <Button
                  href="/products"
                  variant="secondary"
                  size="sm"
                  type="button"
                  onClick={(e) => handleAddToCart(e, product)}
                  className="rounded-lg sm:rounded-xl px-2 sm:px-4 py-1 text-xs font-bold gap-1 cursor-pointer shadow-xs hover:shadow-md shrink-0"
                >
                  {addedId === product.id ? (
                    <Check className="w-3.5 h-3.5" />
                  ) : (
                    <Plus className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  )}
                  <span>{addedId === product.id ? "افزوده شد" : "خرید"}</span>
                </Button>

                <div className="flex items-center gap-0.5 sm:gap-1 font-black text-xs sm:text-sm md:text-base text-[#0b1528] truncate">
                  <span>{product.price}</span>
                  <span className="text-[9px] sm:text-[10px] font-medium text-slate-600">
                    تومان
                  </span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
