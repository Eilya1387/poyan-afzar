"use client";

import React, { useState } from "react";
import { Heart, Repeat, Star, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

const tabs = ["همه", "موبایل", "لپ‌تاپ"];

const bestSellerProducts = [
  {
    id: 1,
    category: "موبایل",
    title: "گوشی موبایل اپل مدل iPhone 13 پارت نامبر CH",
    brand: "اپل / Apple",
    rating: "۴.۸",
    reviews: "۲۶",
    discount: "۱۰٪",
    oldPrice: "۳۸,۵۰۰,۰۰۰",
    price: "۳۴,۶۵۰,۰۰۰",
    inStock: true,
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 2,
    category: "لپ‌تاپ",
    title: "ماوس گیمینگ بی‌سیم ریزر مدل DeathAdder V3 Pro",
    brand: "ریزر / Razer",
    rating: "۴.۷",
    reviews: "۸۹",
    discount: "۱۲٪",
    oldPrice: "۶,۲۰۰,۰۰۰",
    price: "۵,۴۵۰,۰۰۰",
    inStock: true,
    image: "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 3,
    category: "موبایل",
    title: "ساعت هوشمند شیائومی مدل Watch S1 Active",
    brand: "شیائومی / Xiaomi",
    rating: "۴.۶",
    reviews: "۱۲۰",
    discount: "۸٪",
    oldPrice: "۴,۵۰۰,۰۰۰",
    price: "۴,۱۴۰,۰۰۰",
    inStock: true,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 4,
    category: "موبایل",
    title: "هندزفری بلوتوثی جی‌بی‌ال مدل Tune 230NC TWS",
    brand: "جی‌بی‌ال / JBL",
    rating: "۴.۹",
    reviews: "۳۱۵",
    discount: "۲۰٪",
    oldPrice: "۳,۵۰۰,۰۰۰",
    price: "۲,۸۰۰,۰۰۰",
    inStock: true,
    image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=600&q=80",
  },
];

export function BestSellers() {
  const [activeTab, setActiveTab] = useState("همه");

  const filteredProducts =
    activeTab === "همه"
      ? bestSellerProducts
      : bestSellerProducts.filter((p) => p.category === activeTab);

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
              className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
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

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-2xl border border-slate-200 p-4 flex flex-col justify-between hover:border-slate-300 hover:shadow-md transition-all duration-200 group"
          >
            <div>
              <div className="relative aspect-square rounded-xl overflow-hidden bg-slate-50 mb-3 border border-slate-100 flex items-center justify-center p-3">
                <span className="absolute top-2.5 right-2.5 z-10 bg-red-500 text-white text-[11px] font-bold px-2 py-0.5 rounded-md shadow-xs">
                  {product.discount}
                </span>

                <div className="absolute top-2.5 left-2.5 z-10 flex flex-col gap-1.5">
                  <button
                    aria-label="افزودن به علاقه‌مندی‌ها"
                    className="w-7 h-7 rounded-lg bg-white/90 border border-slate-200 shadow-xs flex items-center justify-center text-slate-600 hover:text-red-500 transition-colors"
                  >
                    <Heart className="w-3.5 h-3.5" />
                  </button>
                  <button
                    aria-label="مقایسه محصول"
                    className="w-7 h-7 rounded-lg bg-white/90 border border-slate-200 shadow-xs flex items-center justify-center text-slate-600 hover:text-[#2563eb] transition-colors"
                  >
                    <Repeat className="w-3.5 h-3.5" />
                  </button>
                </div>

                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
              </div>

              <div className="flex items-center justify-between text-[11px] mb-1.5">
                <span className="font-medium text-slate-600">
                  {product.brand}
                </span>
                <div className="flex items-center gap-1 text-slate-600 font-medium">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span className="font-bold text-slate-700">
                    {product.rating}
                  </span>
                  <span>({product.reviews})</span>
                </div>
              </div>

              <h3 className="text-xs sm:text-sm font-bold text-slate-800 line-clamp-2 h-10 leading-snug group-hover:text-[#2563eb] transition-colors">
                {product.title}
              </h3>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100">
              <div className="flex items-center justify-between mb-2.5">
                <span className="text-[11px] font-medium text-emerald-600 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  موجود در انبار
                </span>
                <span className="text-[11px] text-slate-600 line-through">
                  {product.oldPrice}
                </span>
              </div>

              <div className="flex items-center justify-between gap-2">
                <Button
                  variant="secondary"
                  size="sm"
                  className="rounded-xl px-4 font-bold gap-1"
                >
                  <Plus className="w-4 h-4" />
                  <span>خرید</span>
                </Button>

                <div className="flex items-center gap-1 font-black text-sm sm:text-base text-[#0b1528]">
                  <span>{product.price}</span>
                  <span className="text-[10px] font-medium text-slate-600">
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
