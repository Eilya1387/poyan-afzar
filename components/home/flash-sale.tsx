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
  },
  {
    id: 2,
    title: "شارژر دیواری ۶۵ وات دو پورت GaN",
    brand: "انکر / Anker",
    discount: "۱۸٪ تخفیف",
    oldPrice: "۱,۸۵۰,۰۰۰",
    price: "۱,۵۲۰,۰۰۰",
    image: "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 3,
    title: "کیبورد مکانیکال مخصوص بازی مدل G512",
    brand: "لاجیتک / Logitech",
    discount: "۳۰٪ تخفیف",
    oldPrice: "۵,۵۰۰,۰۰۰",
    price: "۳,۸۵۰,۰۰۰",
    image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 4,
    title: "اس‌اس‌دی اکسترنال مدل T7 Shield ظرفیت ۱ ترابایت",
    brand: "سامسونگ / Samsung",
    discount: "۱۵٪ تخفیف",
    oldPrice: "۴,۸۰۰,۰۰۰",
    price: "۴,۰۸۰,۰۰۰",
    image: "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 5,
    title: "هندزفری بی‌سیم انکر مدل Liberty 4 NC",
    brand: "انکر / Anker",
    discount: "۲۲٪ تخفیف",
    oldPrice: "۳,۹۰۰,۰۰۰",
    price: "۳,۰۴۰,۰۰۰",
    image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 6,
    title: "پاوربانک ۲۰۰۰۰ میلی‌آمپر باسئوس ۶۵ وات",
    brand: "باسئوس / Baseus",
    discount: "۱۴٪ تخفیف",
    oldPrice: "۲,۸۰۰,۰۰۰",
    price: "۲,۴۰۰,۰۰۰",
    image: "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=600&q=80",
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
      <div className="bg-[#0b1528] rounded-3xl p-4 sm:p-6 md:p-8 text-white relative overflow-hidden shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 sm:pb-6 border-b border-slate-800/80 mb-4 sm:mb-6">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400 shrink-0">
              <Flame className="w-5 h-5 text-blue-400" />
            </div>
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
            <div
              key={deal.id}
              className="w-[39%] sm:w-50 md:w-auto shrink-0 md:shrink snap-start bg-white rounded-2xl p-2.5 sm:p-3 text-slate-900 flex flex-col justify-between hover:shadow-lg transition-all duration-200 group cursor-pointer border border-transparent hover:border-blue-100"
            >
              <div>
                <div className="relative aspect-square rounded-xl overflow-hidden bg-slate-50 mb-2 border border-slate-100 flex items-center justify-center p-1.5">
                  <span className="absolute top-1.5 right-1.5 z-10 bg-red-500 text-white text-[10px] font-black px-1.5 py-0.5 rounded-md shadow-xs">
                    {deal.discount}
                  </span>
                  <img
                    src={deal.image}
                    alt={deal.title}
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
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
                    className="rounded-lg w-7 h-7 sm:w-8 sm:h-8 cursor-pointer shadow-xs hover:shadow-sm shrink-0"
                    aria-label="افزودن به سبد خرید"
                  >
                    <ShoppingCart className="w-3.5 h-3.5" />
                  </Button>

                  <div className="flex items-center gap-0.5 font-black text-xs sm:text-sm text-[#0b1528] truncate">
                    <span>{deal.price}</span>
                    <span className="text-[9px] font-medium text-slate-500">
                      تومان
                    </span>
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
