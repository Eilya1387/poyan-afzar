import React from "react";
import Link from "next/link";
import { ArrowLeft, Clock } from "lucide-react";

const articles = [
  {
    id: 1,
    title: "راهنمای جامع خرید قطعات کامپیوتر برای اسمبل سیستم گیمینگ در سال ۱۴۰۳",
    desc: "نکات کلیدی برای انتخاب بهترین پردازنده، کارت گرافیک و مادربرد متناسب با بودجه و نیازهای کاری یا گیمینگ شما...",
    badge: "راهنمای خرید • ۵ دقیقه مطالعه",
    date: "۱۶ خرداد ۱۴۰۳",
    image: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=600&q=80",
    href: "#",
  },
  {
    id: 2,
    title: "مقایسه تخصصی بهترین ساعت‌های هوشمند بازار در رده‌های قیمتی مختلف",
    desc: "بررسی جامع قابلیت‌های ورزشی، پایش سلامت، عمر باتری و ارزش خرید ساعت‌های هوشمند برندهای مطرح...",
    badge: "بررسی تخصصی • ۷ دقیقه مطالعه",
    date: "۱۲ خرداد ۱۴۰۳",
    image: "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=600&q=80",
    href: "#",
  },
  {
    id: 3,
    title: "چگونه از باتری گوشی موبایل و لپ‌تاپ خود به بهترین شکل محافظت کنیم؟",
    desc: "آشنایی با اصول صحیح شارژ کردن، دمای استاندارد و عادت‌های درست استفاده جهت افزایش طول عمر باتری دستگاه‌ها...",
    badge: "آموزش • ۴ دقیقه مطالعه",
    date: "۸ خرداد ۱۴۰۳",
    image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=600&q=80",
    href: "#",
  },
];

export function BlogSection() {
  return (
    <section className="py-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-base sm:text-lg font-black text-[#0b1528] dark:text-white">
          مجله تکنولوژی و راهنمای خرید
        </h2>
        <Link
          href="#"
          className="text-xs sm:text-sm font-bold text-[#2563eb] dark:text-blue-400 hover:text-[#1d4ed8] dark:hover:text-blue-300 flex items-center gap-1 transition-colors cursor-pointer"
        >
          <span>همه مقالات</span>
          <ArrowLeft className="w-4 h-4" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {articles.map((article) => (
          <article
            key={article.id}
            className="bg-white dark:bg-[#111827] rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col justify-between hover:border-slate-300 dark:hover:border-slate-700 hover:shadow-md dark:hover:shadow-black/40 transition-all duration-200 group cursor-pointer"
          >
            <div>
              <div className="relative aspect-16/10 overflow-hidden bg-slate-100 dark:bg-slate-800">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </div>

              <div className="p-5">
                <span className="inline-block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-2">
                  {article.badge}
                </span>

                <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 leading-snug mb-2 group-hover:text-[#2563eb] dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                  {article.title}
                </h3>

                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed line-clamp-3">
                  {article.desc}
                </p>
              </div>
            </div>

            <div className="px-5 pb-5 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
              <span className="text-slate-600 dark:text-slate-400 font-medium">{article.date}</span>
              <Link
                href={article.href}
                className="font-bold text-[#2563eb] dark:text-blue-400 hover:text-[#1d4ed8] dark:hover:text-blue-300 transition-colors cursor-pointer"
              >
                ادامه مطلب
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
