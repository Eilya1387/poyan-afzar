"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Search,
  ShoppingCart,
  Heart,
  LogIn,
  Menu,
  ChevronDown,
  Smartphone,
  Shield,
  Zap,
  Headphones,
  Watch,
  Keyboard,
  Cpu,
  Gamepad2,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const navLinks = [
  { name: "خانه", href: "#", active: true },
  { name: "موبایل و لوازم جانبی", href: "#" },
  { name: "کامپیوتر و قطعات", href: "#" },
  { name: "گیمینگ", href: "#" },
  { name: "تخفیف‌ها", href: "#" },
  { name: "درباره ما", href: "#" },
];

const categories = [
  { name: "موبایل و تبلت", href: "#", icon: Smartphone },
  { name: "قاب و محافظ", href: "#", icon: Shield },
  { name: "شارژر و کابل", href: "#", icon: Zap },
  { name: "هدفون و هندزفری", href: "#", icon: Headphones },
  { name: "ساعت هوشمند", href: "#", icon: Watch },
  { name: "کیبورد و ماوس", href: "#", icon: Keyboard },
  { name: "قطعات کامپیوتر", href: "#", icon: Cpu },
  { name: "تجهیزات گیمینگ", href: "#", icon: Gamepad2 },
];

export function Header() {
  const [categoryDropdownOpen, setCategoryDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsSticky(window.scrollY > 50);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="hidden md:block w-full">
      {isSticky && <div className="h-32 w-full pointer-events-none" aria-hidden="true" />}
      <header
        className={`w-full ${
          isSticky
            ? "fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md shadow-md border-b border-slate-200/80 animate-slide-down"
            : "relative bg-white border-b border-slate-200"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20 gap-4">
            <div className="flex items-center gap-8">
              <Link href="/" className="flex items-center gap-2.5 group cursor-pointer">
                <div className="w-10 h-10 rounded-xl bg-[#0b1528] flex items-center justify-center text-white font-black text-xl shadow-xs group-hover:bg-[#162544] transition-colors">
                  <span className="text-[#38bdf8]">پ</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-xl font-black tracking-tight text-[#0b1528]">
                    پویان <span className="text-[#2563eb]">افزار</span>
                  </span>
                  <span className="text-[10px] text-slate-600 font-medium -mt-1">
                    مرجع تخصصی کالای دیجیتال
                  </span>
                </div>
              </Link>

            <nav className="hidden xl:flex items-center gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-sm font-medium transition-colors hover:text-[#2563eb] cursor-pointer ${
                    link.active
                      ? "text-[#0b1528] font-bold"
                      : "text-slate-600"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </nav>
          </div>

          <div className="flex flex-1 max-w-md mx-4">
            <div className="relative w-full">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="جستجوی در میان هزاران کالا..."
                className="w-full bg-slate-50 hover:bg-slate-100/80 focus:bg-white border border-slate-200 focus:border-[#2563eb] rounded-xl py-2.5 pr-11 pl-4 text-sm text-slate-800 placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all"
              />
              <Search className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600" />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="primary"
              size="md"
              className="rounded-xl font-semibold gap-2 cursor-pointer shadow-sm hover:shadow-md"
              leftIcon={<LogIn className="w-4 h-4" />}
            >
              ورود / ثبت‌نام
            </Button>

            <Button
              variant="icon"
              size="icon"
              className="relative text-slate-700 hover:text-red-500 cursor-pointer"
              aria-label="علاقه‌مندی‌ها"
            >
              <Heart className="w-5 h-5" />
            </Button>

            <Button
              variant="icon"
              size="icon"
              className="relative text-slate-700 hover:text-[#2563eb] cursor-pointer"
              aria-label="سبد خرید"
            >
              <ShoppingCart className="w-5 h-5" />
              <span className="absolute -top-1.5 -right-1.5 bg-[#2563eb] text-white text-[11px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-xs">
                2
              </span>
            </Button>
          </div>
        </div>
      </div>

      <div className="border-t border-slate-100 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-12">
            <div className="relative">
              <button
                onClick={() => setCategoryDropdownOpen(!categoryDropdownOpen)}
                className="flex items-center gap-2.5 text-sm font-bold text-slate-800 hover:text-[#2563eb] py-2 px-3 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer"
              >
                <Menu className="w-5 h-5 text-slate-600" />
                <span>دسته‌بندی‌های کالا</span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-200 ${
                    categoryDropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {categoryDropdownOpen && (
                <div className="absolute right-0 top-full mt-1 w-64 bg-white border border-slate-200 rounded-2xl shadow-xl py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  {categories.map((cat) => {
                    const Icon = cat.icon;
                    return (
                      <Link
                        key={cat.name}
                        href={cat.href}
                        onClick={() => setCategoryDropdownOpen(false)}
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-700 hover:bg-blue-50 hover:text-[#2563eb] transition-colors cursor-pointer"
                      >
                        <Icon className="w-4 h-4 text-slate-600" />
                        <span>{cat.name}</span>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>

            <div className="flex items-center gap-6 overflow-x-auto no-scrollbar py-1">
              {categories.map((cat) => (
                <Link
                  key={cat.name}
                  href={cat.href}
                  className="text-xs font-medium text-slate-600 hover:text-[#0b1528] whitespace-nowrap transition-colors cursor-pointer"
                >
                  {cat.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </header>
    </div>
  );
}
