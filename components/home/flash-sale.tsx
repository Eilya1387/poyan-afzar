"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Flame, ShoppingCart, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { products } from "@/lib/products";
import { useCartStore } from "@/lib/store";

const flashDeals = products.slice(0, 6);

export function FlashSale() {
  const addItem = useCartStore((state) => state.addItem);
  const [addedId, setAddedId] = useState<string | null>(null);

  const handleAddToCart = (e: React.MouseEvent, deal: (typeof products)[0]) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({
      id: deal.id,
      title: deal.title,
      price: deal.priceNumber,
      image: deal.image,
      seller: deal.seller,
      guarantee: deal.guarantee,
      inStockText: deal.stockText,
    });
    setAddedId(deal.id);
    setTimeout(() => setAddedId(null), 1500);
  };

  const [timeLeft, setTimeLeft] = useState({
    hours: 6,
    minutes: 42,
    seconds: 18,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        }
        if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        }
        if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatNumber = (n: number) => {
    const persianDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
    return n
      .toString()
      .padStart(2, "0")
      .split("")
      .map((d) => persianDigits[parseInt(d, 10)])
      .join("");
  };

  return (
    <section id="flash-sale" className="py-4 scroll-mt-24">
      <div className="bg-[#0b1528] rounded-3xl p-4 sm:p-6 md:p-8 text-white relative overflow-hidden shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 sm:pb-6 border-b border-slate-800/80 mb-4 sm:mb-6">
          <div className="flex items-center gap-3">
            <div>
              <h2 className="text-base sm:text-xl font-black text-white">
                پیشنهاد شگفت‌انگیز پویان افزار
              </h2>
              <p className="text-[11px] sm:text-xs text-slate-400 font-medium mt-0.5">
                تخفیف‌های ویژه روزانه با تعداد محدود
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto bg-slate-900/90 border border-slate-700/80 px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl text-xs font-bold text-slate-300">
            <span className="text-[11px] sm:text-xs">زمان باقی‌مانده:</span>
            <div className="flex items-center gap-1 font-mono text-xs sm:text-sm font-bold text-white tracking-widest dir-ltr">
              <span>{formatNumber(timeLeft.seconds)}</span>
              <span className="text-slate-500">:</span>
              <span>{formatNumber(timeLeft.minutes)}</span>
              <span className="text-slate-500">:</span>
              <span>{formatNumber(timeLeft.hours)}</span>
            </div>
          </div>
        </div>

        <div className="flex md:grid md:grid-cols-3 lg:grid-cols-6 gap-3 overflow-x-auto md:overflow-x-visible pb-2 md:pb-0 snap-x snap-mandatory scroll-smooth no-scrollbar">
          {flashDeals.map((deal) => (
            <Link
              key={deal.id}
              href={`/products/${deal.id}`}
              className="w-[39%] sm:w-50 md:w-auto shrink-0 md:shrink snap-start bg-white rounded-2xl p-2.5 sm:p-3 text-slate-900 flex flex-col justify-between hover:shadow-lg transition-all duration-200 group cursor-pointer border border-transparent hover:border-blue-100"
            >
              <div>
                <div className="relative aspect-square rounded-xl overflow-hidden bg-slate-100 mb-2 border border-slate-100 flex items-center justify-center p-0">
                  <span className="absolute top-1.5 right-1.5 z-10 bg-red-500 text-white text-[10px] font-black px-1.5 py-0.5 rounded-md shadow-xs">
                    {deal.discount}
                  </span>
                  <img
                    src={deal.image}
                    alt={deal.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                </div>

                <div className="text-[10px] font-medium text-slate-500 mb-0.5 truncate">
                  {deal.brand}
                </div>

                <h3 className="text-[11px] sm:text-xs font-bold text-slate-800 line-clamp-2 h-7 sm:h-8 leading-tight group-hover:text-[#2563eb] transition-colors">
                  {deal.title}
                </h3>
              </div>

              <div className="mt-2.5 pt-2 border-t border-slate-100">
                <span className="block text-[10px] text-slate-400 line-through text-left">
                  {deal.oldPrice}
                </span>

                <div className="flex items-center justify-between mt-1 gap-1">
                  <Button
                    variant="secondary"
                    size="icon"
                    onClick={(e) => handleAddToCart(e, deal)}
                    className="rounded-lg w-7 h-7 sm:w-8 sm:h-8 cursor-pointer shadow-xs hover:shadow-sm shrink-0"
                    aria-label="افزودن به سبد خرید"
                  >
                    {addedId === deal.id ? (
                      <Check className="w-3.5 h-3.5" />
                    ) : (
                      <ShoppingCart className="w-3.5 h-3.5" />
                    )}
                  </Button>

                  <div className="flex items-center gap-0.5 font-black text-xs sm:text-sm text-[#0b1528] truncate">
                    <span>{deal.price}</span>
                    <span className="text-[9px] font-medium text-slate-500">
                      تومان
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
