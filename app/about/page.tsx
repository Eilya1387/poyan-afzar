import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import {
  ShieldCheck,
  Truck,
  Headphones,
  Award,
  Layers,
  Cpu,
  CheckCircle2,
  Sparkles,
  ArrowLeft,
} from "lucide-react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "درباره ما | پویان افزار",
  description: "آشنایی با فروشگاه تخصصی لوازم جانبی موبایل، قطعات کامپیوتر و تجهیزات دیجیتال پویان افزار",
};

const stats = [
  { value: "+۵,۰۰۰", label: "تنوع کالای دیجیتال" },
  { value: "۱۰۰٪", label: "ضمانت اصالت و سلامت" },
  { value: "+۲۵,۰۰۰", label: "مشتری راضی و فعال" },
  { value: "۲ ساعته", label: "ارسال اکسپرس در تهران" },
];

const values = [
  {
    icon: ShieldCheck,
    title: "تضمین اصالت ۱۰۰ درصدی کالا",
    desc: "تمام محصولات عرضه‌شده در پویان افزار دارای شماره سریال معتبر و قابل استعلام در وب‌سایت سازنده بوده و از مجاری رسمی و معتبر وارد کشور می‌شوند.",
  },
  {
    icon: Award,
    title: "بهترین قیمت با حذف واسطه‌ها",
    desc: "با تأمین مستقیم از برترین برندهای بین‌المللی، محصولات با کمترین حاشیه سود و مناسب‌ترین قیمت نهایی به دست مصرف‌کننده می‌رسند.",
  },
  {
    icon: Truck,
    title: "ارسال سریع و مطمئن",
    desc: "سیستم ارسال اکسپرس اختصاصی پویان افزار سفارش‌ها را در سریع‌ترین زمان ممکن و در بسته‌بندی‌های استاندارد ضدضربه تحویل می‌دهد.",
  },
  {
    icon: Headphones,
    title: "مشاوره و پشتیبانی تخصصی",
    desc: "تیم کارشناسان فنی پیش و پس از خرید در کنار شما هستند تا بهترین انتخاب را متناسب با نیاز فنی و بودجه خود انجام دهید.",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#f8fafc] text-slate-900 pb-16 md:pb-0 text-right">
      <Header />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 space-y-12">
        <section className="space-y-6">
          <div className="space-y-1 text-right">
            <h2 className="text-lg sm:text-xl md:text-2xl font-black text-slate-900">
              ارزش‌ها و تعهدات ما
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 font-medium">
              چرا هزاران کاربر و متخصص سخت‌افزار به پویان افزار اعتماد می‌کنند؟
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
            {values.map((v) => {
              const Icon = v.icon;
              return (
                <div
                  key={v.title}
                  className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-2xs space-y-3 transition-all hover:border-slate-300"
                >
                  <div className="w-11 h-11 rounded-xl bg-blue-50 text-[#2563eb] flex items-center justify-center">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-sm sm:text-base font-black text-slate-900">
                    {v.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {v.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        <section className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 md:p-10 shadow-2xs space-y-6">
          <div className="space-y-2">
            <h2 className="text-base sm:text-lg md:text-xl font-black text-slate-900">
              دسته‌بندی‌های تخصصی تحت پوشش
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 font-medium leading-relaxed">
              ما در پویان افزار تمامی ملزومات حرفه‌ای، اداری و شخصی را از برندهای پیشرو مانند Apple، Samsung، Sony، Razer، Logitech، Asus و Anker با بالاترین کیفیت عرضه می‌کنیم:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs sm:text-sm font-bold text-slate-700">
            <div className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200/60">
              <CheckCircle2 className="w-4 h-4 text-[#2563eb] shrink-0" />
              <span>موبایل، تبلت و لوازم جانبی هوشمند</span>
            </div>
            <div className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200/60">
              <CheckCircle2 className="w-4 h-4 text-[#2563eb] shrink-0" />
              <span>قطعات کامپیوتر، کارت گرافیک و پردازنده</span>
            </div>
            <div className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200/60">
              <CheckCircle2 className="w-4 h-4 text-[#2563eb] shrink-0" />
              <span>تجهیزات تخصصی گیمینگ و استریم</span>
            </div>
            <div className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200/60">
              <CheckCircle2 className="w-4 h-4 text-[#2563eb] shrink-0" />
              <span>هدفون، هندزفری و اسپیکرهای پرچمدار</span>
            </div>
            <div className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200/60">
              <CheckCircle2 className="w-4 h-4 text-[#2563eb] shrink-0" />
              <span>انواع حافظه ذخیره‌سازی، SSD و فلش مموری</span>
            </div>
            <div className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200/60">
              <CheckCircle2 className="w-4 h-4 text-[#2563eb] shrink-0" />
              <span>آداپتور، کابل و شارژرهای دیواری پیشرفته GaN</span>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
