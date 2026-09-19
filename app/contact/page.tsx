import React from "react";
import type { Metadata } from "next";
import {
  Phone,
  MapPin,
  Clock,
  Mail,
  Send,
  ShieldCheck,
  Building2,
  PhoneCall,
} from "lucide-react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

export const metadata: Metadata = {
  title: "تماس با ما | پویان افزار",
  description: "اطلاعات تماس، نشانی دفتر مرکزی، شماره‌های تلفن و ساعات کاری فروشگاه پویان افزار",
};

export default function ContactPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#f8fafc] text-slate-900 pb-16 md:pb-0 text-right">
      <Header />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 space-y-10">
        <section className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-10 shadow-2xs space-y-3 text-right">


          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            تماس با پویان افزار
          </h1>

          <p className="text-xs sm:text-sm text-slate-500 font-medium max-w-2xl leading-relaxed">
            کارشناسان ما در ساعات اداری آماده پاسخگویی به پرسش‌های شما درباره محصولات، ارائه مشاوره تخصصی پیش از خرید و پیگیری وضعیت سفارش‌ها هستند.
          </p>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-2xs space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-11 h-11 rounded-xl bg-blue-50 text-[#2563eb] flex items-center justify-center">
                <Phone className="w-5 h-5" />
              </div>
              <h2 className="text-base font-black text-slate-900">
                تماس تلفنی با پشتیبانی
              </h2>
              <p className="text-xs text-slate-500 leading-relaxed font-medium">
                برای ارتباط با بخش فروش، پشتیبانی فنی و پیگیری سفارشات با خطوط ویژه ما تماس بگیرید:
              </p>
              <div className="space-y-1 pt-1 font-mono text-sm font-bold text-slate-900" dir="ltr">
                <div>۰۲۱-۸۸۷۷۶۶۵۵</div>
                <div>۰۲۱-۹۱۰۰۰۰۰۰</div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100">
              <a href="tel:02188776655" className="block">
                <Button variant="primary" size="md" className="w-full font-bold text-xs gap-2">
                  <PhoneCall className="w-4 h-4" />
                  <span>تماس مستقیم با واحد فروش</span>
                </Button>
              </a>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-2xs space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <MapPin className="w-5 h-5" />
              </div>
              <h2 className="text-base font-black text-slate-900">
                دفتر مرکزی و تحویل حضوری
              </h2>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                تهران، خیابان ولیعصر، نرسیده به تقاطع میرداماد، مجتمع تجاری پویان، طبقه ۳، واحد ۱۲
              </p>
              <div className="text-xs text-slate-400 font-mono" dir="ltr">
                کد پستی: ۱۹۶۸۶۳۴۵۱۱
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/60 text-xs text-slate-600 leading-relaxed font-medium">
                تحویل حضوری سفارش‌های ثبت‌شده با هماهنگی قبلی واحد فروش امکان‌پذیر است.
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-2xs space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-11 h-11 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                <Clock className="w-5 h-5" />
              </div>
              <h2 className="text-base font-black text-slate-900">
                ساعات کاری و پاسخگویی
              </h2>
              <div className="space-y-2 text-xs text-slate-600">
                <div className="flex items-center justify-between pb-1.5 border-b border-slate-100">
                  <span className="font-bold text-slate-700">شنبه تا چهارشنبه:</span>
                  <span className="font-bold text-slate-900">۹:۰۰ الی ۱۸:۰۰</span>
                </div>
                <div className="flex items-center justify-between pb-1.5 border-b border-slate-100">
                  <span className="font-bold text-slate-700">پنج‌شنبه‌ها:</span>
                  <span className="font-bold text-slate-900">۹:۰۰ الی ۱۴:۰۰</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-700">جمعه و تعطیلات رسمی:</span>
                  <span className="text-slate-400 font-medium">پشتیبانی تلگرام</span>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100">
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-600">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>پاسخگویی سریع در تمامی روزهای کاری</span>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-2xs space-y-6">
          <div className="space-y-1">
            <h2 className="text-base sm:text-lg font-black text-slate-900">
              ارتباط در پیام‌رسان‌ها و شبکه‌های اجتماعی
            </h2>
            <p className="text-xs text-slate-500 font-medium">
              جهت دریافت مشاوره آنلاین، استعلام قیمت همکاری یا اطلاع از جشنواره‌های تخفیف:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <a
              href="https://t.me/poyanafzar"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-4 rounded-2xl border border-slate-200 hover:border-blue-300 hover:bg-blue-50/40 transition-all group cursor-pointer"
            >
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#2563eb] flex items-center justify-center group-hover:bg-[#2563eb] group-hover:text-white transition-colors">
                <Send className="w-5 h-5" />
              </div>
              <div className="text-right">
                <div className="text-xs font-black text-slate-900">پشتیبانی تلگرام</div>
                <div className="text-[11px] text-slate-400 font-mono" dir="ltr">@poyanafzar</div>
              </div>
            </a>

            <a
              href="https://instagram.com/poyanafzar"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-4 rounded-2xl border border-slate-200 hover:border-pink-300 hover:bg-pink-50/40 transition-all group cursor-pointer"
            >
              <div className="w-10 h-10 rounded-xl bg-pink-50 text-pink-600 flex items-center justify-center group-hover:bg-pink-600 group-hover:text-white transition-colors">
                <InstagramIcon className="w-5 h-5" />
              </div>
              <div className="text-right">
                <div className="text-xs font-black text-slate-900">اینستاگرام رسمی</div>
                <div className="text-[11px] text-slate-400 font-mono" dir="ltr">@poyanafzar</div>
              </div>
            </a>

            <a
              href="mailto:info@poyanafzar.ir"
              className="flex items-center gap-3 p-4 rounded-2xl border border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-all group cursor-pointer"
            >
              <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center group-hover:bg-slate-800 group-hover:text-white transition-colors">
                <Mail className="w-5 h-5" />
              </div>
              <div className="text-right">
                <div className="text-xs font-black text-slate-900">پست الکترونیکی</div>
                <div className="text-[11px] text-slate-400 font-mono" dir="ltr">info@poyanafzar.ir</div>
              </div>
            </a>
          </div>
        </section>

        <section className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-2xs space-y-4">
          <div className="flex items-center gap-2">
            <Building2 className="w-5 h-5 text-[#2563eb]" />
            <h2 className="text-base sm:text-lg font-black text-slate-900">
              موقعیت مکانی دفتر مرکزی
            </h2>
          </div>

          <div className="relative w-full h-48 sm:h-64 rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 flex items-center justify-center text-center p-6">
            <div className="space-y-2 max-w-md">
              <div className="w-10 h-10 rounded-full bg-[#2563eb] text-white flex items-center justify-center mx-auto shadow-md">
                <MapPin className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-black text-slate-900">
                دفتر مرکزی پویان افزار
              </h3>
              <p className="text-xs text-slate-500 font-medium leading-relaxed">
                تهران، خیابان ولیعصر، نرسیده به تقاطع میرداماد، مجتمع تجاری پویان، طبقه ۳، واحد ۱۲
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
