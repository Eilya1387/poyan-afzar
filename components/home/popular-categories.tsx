import React from "react";
import Link from "next/link";
import {
  Smartphone,
  Shield,
  Zap,
  Headphones,
  Watch,
  Keyboard,
  Cpu,
  HardDrive,
  ArrowLeft,
} from "lucide-react";

const categories = [
  { name: "موبایل و تبلت", icon: Smartphone, href: "#" },
  { name: "قاب و محافظ", icon: Shield, href: "#" },
  { name: "شارژر و کابل", icon: Zap, href: "#" },
  { name: "هدفون و هندزفری", icon: Headphones, href: "#" },
  { name: "ساعت هوشمند", icon: Watch, href: "#" },
  { name: "کیبورد و ماوس", icon: Keyboard, href: "#" },
  { name: "قطعات کامپیوتر", icon: Cpu, href: "#" },
  { name: "ذخیره‌سازی", icon: HardDrive, href: "#" },
];

export function PopularCategories() {
  return (
    <section className="py-6">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-base sm:text-lg font-black text-[#0b1528]">
          دسته‌بندی‌های محبوب
        </h2>
        <Link
          href="#"
          className="text-xs sm:text-sm font-bold text-[#2563eb] hover:text-[#1d4ed8] flex items-center gap-1 transition-colors"
        >
          <span>مشاهده همه</span>
          <ArrowLeft className="w-4 h-4" />
        </Link>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 sm:gap-4">
        {categories.map((cat) => {
          const Icon = cat.icon;
          return (
            <Link
              key={cat.name}
              href={cat.href}
              className="bg-white rounded-2xl border border-slate-200 p-4 flex flex-col items-center justify-center gap-3.5 hover:border-[#2563eb] hover:shadow-md transition-all duration-200 group text-center cursor-pointer"
            >
              <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center text-slate-700 group-hover:bg-blue-50 group-hover:text-[#2563eb] transition-colors">
                <Icon className="w-6 h-6 stroke-[1.6]" />
              </div>
              <span className="text-xs font-bold text-slate-800 group-hover:text-[#2563eb] transition-colors leading-tight">
                {cat.name}
              </span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
