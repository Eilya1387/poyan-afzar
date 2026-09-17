import React from "react";
import Link from "next/link";
import {
  PhoneCall,
  ShieldCheck,
  CheckCircle,
} from "lucide-react";

function TelegramIcon({ className }: { className?: string }) {
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
      <path d="m22 2-7 20-4-9-9-4Z" />
      <path d="M22 2 11 13" />
    </svg>
  );
}

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

function TwitterIcon({ className }: { className?: string }) {
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
      <path d="M4 4l11.733 16h4.267l-11.733 -16z" />
      <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" />
    </svg>
  );
}

function ShareIcon({ className }: { className?: string }) {
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
      <circle cx="18" cy="5" r="3" />
      <circle cx="6" cy="12" r="3" />
      <circle cx="18" cy="19" r="3" />
      <line x1="8.59" x2="15.42" y1="13.51" y2="17.49" />
      <line x1="15.41" x2="8.59" y1="6.51" y2="10.49" />
    </svg>
  );
}

export function Footer() {
  return (
    <footer className="bg-white border-t border-slate-200 mt-12 pt-12 pb-24 md:pb-8 text-slate-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12 pb-10">
          <div className="lg:col-span-4 flex flex-col items-center lg:items-start text-center lg:text-right">
            <Link href="/" className="flex items-center gap-2.5 mb-4 group cursor-pointer">
              <div className="w-10 h-10 rounded-xl bg-[#0b1528] flex items-center justify-center text-white font-black text-xl shadow-xs group-hover:bg-[#162544] transition-colors">
                <span className="text-[#38bdf8]">پ</span>
              </div>
              <span className="text-2xl font-black tracking-tight text-[#0b1528]">
                پویان <span className="text-[#2563eb]">افزار</span>
              </span>
            </Link>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-sm mb-6">
              پویان افزار، مرجع تخصصی تامین و فروش لوازم جانبی موبایل، قطعات کامپیوتر و تجهیزات گیمینگ با ضمانت اصالت و بهترین قیمت در سراسر کشور.
            </p>

            <div className="flex items-center gap-2.5 justify-center lg:justify-start">
              <a
                href="#"
                aria-label="تلگرام پویان افزار"
                className="w-9 h-9 rounded-xl border border-slate-200 flex items-center justify-center text-slate-600 hover:text-[#2563eb] hover:border-[#2563eb] hover:bg-blue-50/50 transition-all cursor-pointer"
              >
                <TelegramIcon className="w-4 h-4" />
              </a>
              <a
                href="#"
                aria-label="اینستاگرام پویان افزار"
                className="w-9 h-9 rounded-xl border border-slate-200 flex items-center justify-center text-slate-600 hover:text-pink-600 hover:border-pink-500 hover:bg-pink-50/50 transition-all cursor-pointer"
              >
                <InstagramIcon className="w-4 h-4" />
              </a>
              <a
                href="#"
                aria-label="توییتر پویان افزار"
                className="w-9 h-9 rounded-xl border border-slate-200 flex items-center justify-center text-slate-600 hover:text-[#2563eb] hover:border-[#2563eb] hover:bg-blue-50/50 transition-all cursor-pointer"
              >
                <TwitterIcon className="w-4 h-4" />
              </a>
              <a
                href="#"
                aria-label="اشتراک‌گذاری"
                className="w-9 h-9 rounded-xl border border-slate-200 flex items-center justify-center text-slate-600 hover:text-[#2563eb] hover:border-[#2563eb] hover:bg-blue-50/50 transition-all cursor-pointer"
              >
                <ShareIcon className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div className="lg:col-span-2 text-center lg:text-right">
            <h3 className="text-sm font-black text-slate-900 mb-4">
              خدمات مشتریان
            </h3>
            <ul className="space-y-2.5 text-xs sm:text-sm text-slate-600 flex flex-col items-center lg:items-start">
              <li>
                <Link
                  href="#"
                  className="hover:text-[#2563eb] transition-colors cursor-pointer"
                >
                  پاسخ به سوالات متداول
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-[#2563eb] transition-colors cursor-pointer"
                >
                  رویه‌های بازگرداندن کالا
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-[#2563eb] transition-colors cursor-pointer"
                >
                  شرایط استفاده از خدمات
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-[#2563eb] transition-colors cursor-pointer"
                >
                  حریم خصوصی کاربران
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-[#2563eb] transition-colors cursor-pointer"
                >
                  گزارش خطا
                </Link>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-2 text-center lg:text-right">
            <h3 className="text-sm font-black text-slate-900 mb-4">
              دسته‌بندی‌های اصلی
            </h3>
            <ul className="space-y-2.5 text-xs sm:text-sm text-slate-600 flex flex-col items-center lg:items-start">
              <li>
                <Link
                  href="#"
                  className="hover:text-[#2563eb] transition-colors cursor-pointer"
                >
                  موبایل و تبلت
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-[#2563eb] transition-colors cursor-pointer"
                >
                  قطعات کامپیوتر
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-[#2563eb] transition-colors cursor-pointer"
                >
                  تجهیزات گیمینگ
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-[#2563eb] transition-colors cursor-pointer"
                >
                  لوازم جانبی صوتی
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-[#2563eb] transition-colors cursor-pointer"
                >
                  شارژر و کابل
                </Link>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-4 flex flex-col items-center lg:items-start text-center lg:text-right">
            <h3 className="text-sm font-black text-slate-900 mb-4">
              نمادها و اعتماد
            </h3>

            <div className="flex items-center gap-3 mb-5 justify-center lg:justify-start">
              <div className="w-24 h-24 rounded-2xl border border-slate-200 bg-slate-50/70 p-2.5 flex flex-col items-center justify-center text-center hover:border-slate-300 transition-colors cursor-pointer">
                <CheckCircle className="w-6 h-6 text-[#2563eb] mb-1" />
                <span className="text-[10px] font-bold text-slate-700 leading-tight">
                  نماد اعتماد الکترونیکی
                </span>
              </div>

              <div className="w-24 h-24 rounded-2xl border border-slate-200 bg-slate-50/70 p-2.5 flex flex-col items-center justify-center text-center hover:border-slate-300 transition-colors cursor-pointer">
                <ShieldCheck className="w-6 h-6 text-emerald-600 mb-1" />
                <span className="text-[10px] font-bold text-slate-700 leading-tight">
                  فاند ساماندهی
                </span>
              </div>
            </div>

            <div className="inline-flex items-center gap-2 text-xs font-bold text-slate-700 bg-slate-50 border border-slate-200 px-3.5 py-2 rounded-xl">
              <PhoneCall className="w-4 h-4 text-[#2563eb]" />
              <span>تلفن پشتیبانی: ۰۲۱-۹۱۰۰۰۰۰۰</span>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-100 pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-600 text-center md:text-right">
          <div>
            تمامی حقوق برای فروشگاه پویان افزار محفوظ است © ۱۴۰۳
          </div>

          <div className="flex items-center gap-1.5 text-xs text-slate-700 font-medium">
            <span>قدرت گرفته از</span>
            <a
              href="https://wexun.ir"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-[#0b1528] hover:text-[#2563eb] transition-colors cursor-pointer underline underline-offset-4 decoration-blue-500/40"
            >
              WeXuN Team
            </a>
          </div>

          <div className="flex items-center gap-4 flex-wrap justify-center">
            <Link
              href="#"
              className="hover:text-[#2563eb] transition-colors cursor-pointer"
            >
              قوانین و مقررات
            </Link>
            <Link
              href="#"
              className="hover:text-[#2563eb] transition-colors cursor-pointer"
            >
              حریم خصوصی
            </Link>
            <Link
              href="#"
              className="hover:text-[#2563eb] transition-colors cursor-pointer"
            >
              سوالات متداول
            </Link>
            <Link
              href="#"
              className="hover:text-[#2563eb] transition-colors cursor-pointer"
            >
              ارتباط با پشتیبانی
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
