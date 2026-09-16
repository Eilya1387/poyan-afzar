"use client";

import React, { useState, useEffect } from "react";
import { Flame, ShoppingCart, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const flashDeals = [
  {
    id: 1,
    title: "هدفون بی‌سیم گیمینگ مدل T-Pro Max",
    brand: "تسلا / Tesla",
    discount: "۲۵٪ تخفیف",
    oldPrice: "۱,۴۰۰,۰۰۰",
    price: "۱,۱۵۰,۰۰۰",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80",
    stockPercent: 35,
  },
  {
    id: 2,
    title: "شارژر دیواری ۶۵ وات دو پورت GaN",
    brand: "انکر / Anker",
    discount: "۱۸٪ تخفیف",
    oldPrice: "۱,۸۵۰,۰۰۰",
    price: "۱,۵۲۰,۰۰۰",
    image: "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=600&q=80",
    stockPercent: 20,
  },
  {
    id: 3,
    title: "کیبورد مکانیکال مخصوص بازی مدل G512",
    brand: "لاجیتک / Logitech",
    discount: "۳۰٪ تخفیف",
    oldPrice: "۵,۵۰۰,۰۰۰",
    price: "۳,۸۵۰,۰۰۰",
    image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=600&q=80",
    stockPercent: 15,
  },
  {
    id: 4,
    title: "اس‌اس‌دی اکسترنال مدل T7 Shield ظرفیت ۱ ترابایت",
    brand: "سامسونگ / Samsung",
    discount: "۱۵٪ تخفیف",
    oldPrice: "۴,۸۰۰,۰۰۰",
    price: "۴,۰۸۰,۰۰۰",
    image: "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?auto=format&fit=crop&w=600&q=80",
    stockPercent: 25,
  },
];

export function FlashSale() {
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
    <section className="py-4">
      <div className="bg-[#0b1528] rounded-3xl p-6 sm:p-8 text-white relative overflow-hidden shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800/80 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400">
              <Flame className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-black text-white">
                پیشنهاد شگفت‌انگیز تک‌مارکت
              </h2>
              <p className="text-xs text-slate-400 font-medium mt-0.5">
                تخفیف‌های ویژه روزانه با تعداد محدود
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto bg-slate-900/90 border border-slate-700/80 px-4 py-2 rounded-xl text-xs font-bold text-slate-300">
            <span>زمان باقی‌مانده:</span>
            <div className="flex items-center gap-1 font-mono text-sm font-bold text-white tracking-widest dir-ltr">
              <span>{formatNumber(timeLeft.seconds)}</span>
              <span className="text-slate-500">:</span>
              <span>{formatNumber(timeLeft.minutes)}</span>
              <span className="text-slate-500">:</span>
              <span>{formatNumber(timeLeft.hours)}</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {flashDeals.map((deal) => (
            <div
              key={deal.id}
              className="bg-white rounded-2xl p-4 text-slate-900 flex flex-col justify-between hover:shadow-lg transition-all duration-200 group"
            >
              <div>
                <div className="relative aspect-square rounded-xl overflow-hidden bg-slate-50 mb-3 border border-slate-100 flex items-center justify-center p-2">
                  <span className="absolute top-2 right-2 z-10 bg-red-500 text-white text-[11px] font-bold px-2 py-0.5 rounded-md shadow-xs">
                    {deal.discount}
                  </span>
                  <img
                    src={deal.image}
                    alt={deal.title}
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                </div>

                <div className="text-[11px] font-medium text-slate-600 mb-1">
                  {deal.brand}
                </div>

                <h3 className="text-xs sm:text-sm font-bold text-slate-800 line-clamp-2 h-10 leading-snug group-hover:text-[#2563eb] transition-colors">
                  {deal.title}
                </h3>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-semibold text-red-500">
                    موجودی محدود
                  </span>
                </div>
                <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden mb-3">
                  <div
                    className="bg-red-500 h-full rounded-full"
                    style={{ width: `${deal.stockPercent}%` }}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Button
                    variant="secondary"
                    size="icon"
                    className="rounded-xl w-9 h-9"
                    aria-label="افزودن به سبد خرید"
                  >
                    <ShoppingCart className="w-4 h-4" />
                  </Button>

                  <div className="flex flex-col items-end">
                    <span className="text-[11px] text-slate-600 line-through">
                      {deal.oldPrice}
                    </span>
                    <div className="flex items-center gap-1 font-black text-sm text-[#0b1528]">
                      <span>{deal.price}</span>
                      <span className="text-[10px] font-medium text-slate-600">
                        تومان
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
