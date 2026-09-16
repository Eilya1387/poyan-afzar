"use client";

import React from "react";
import Image from "next/image";
import { ShieldCheck, ArrowLeft, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="pt-6 pb-4">
      <div className="rounded-3xl bg-slate-100/70 border border-slate-200/80 p-6 sm:p-8 md:p-12 overflow-hidden relative">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-100/40 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-slate-200/50 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          <div className="lg:col-span-5 order-2 lg:order-1">
            <div className="relative rounded-2xl overflow-hidden border border-slate-200/80 shadow-md bg-white aspect-4/3 group">
              <div className="absolute inset-0 bg-linear-to-tr from-slate-900/10 via-transparent to-transparent z-10" />
              <img
                src="https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=1200&q=80"
                alt="تجهیزات دیجیتال تک‌مارکت"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                loading="eager"
              />
              <div className="absolute top-4 right-4 z-20 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/50 shadow-sm flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                <span className="text-[11px] font-bold text-slate-800">
                  تخفیف‌های ویژه فعال
                </span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 order-1 lg:order-2 flex flex-col items-start text-right">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 text-[#0284c7] text-xs font-bold mb-5 border border-blue-200/60 shadow-xs">
              <ShieldCheck className="w-4 h-4 text-[#0284c7]" />
              <span>ضمانت اصالت و بالاترین کیفیت</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#0b1528] leading-[1.3] tracking-tight mb-4">
              انتخاب مطمئن برای خرید کالای دیجیتال
            </h1>

            <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-xl mb-8">
              لوازم جانبی موبایل، قطعات کامپیوتر و تجهیزات گیمینگ با ضمانت اصالت کالا و ارسال سریع به سراسر کشور.
            </p>

            <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
              <Button
                variant="primary"
                size="lg"
                className="w-full sm:w-auto font-bold px-8 shadow-md hover:shadow-lg"
              >
                مشاهده محصولات
              </Button>

              <Button
                variant="outline"
                size="lg"
                className="w-full sm:w-auto font-semibold px-8"
              >
                پیشنهادهای ویژه
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
