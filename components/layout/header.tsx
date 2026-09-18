"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Search,
  ShoppingCart,
  Heart,
  LogIn,
  User,
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
import { useAuth } from "@/components/auth/auth-context";
import { useCartStore, useFavoritesStore } from "@/lib/store";

export interface HeaderProps {
  cartCount?: number;
  searchQuery?: string;
  onSearchChange?: (val: string) => void;
}

const navLinks = [
  { name: "خانه", href: "/" },
  { name: "محصولات", href: "/products" },
  { name: "موبایل و لوازم جانبی", href: "/products" },
  { name: "کامپیوتر و قطعات", href: "/products" },
  { name: "گیمینگ", href: "/products" },
  { name: "تخفیف‌ها", href: "/products" },
  { name: "درباره ما", href: "#" },
  { name: "تماس با ما", href: "#" },
];

const categories = [
  { name: "موبایل و تبلت", href: "/products", icon: Smartphone },
  { name: "قاب و محافظ", href: "/products", icon: Shield },
  { name: "شارژر و کابل", href: "/products", icon: Zap },
  { name: "هدفون و هندزفری", href: "/products", icon: Headphones },
  { name: "ساعت هوشمند", href: "/products", icon: Watch },
  { name: "کیبورد و ماوس", href: "/products", icon: Keyboard },
  { name: "قطعات کامپیوتر", href: "/products", icon: Cpu },
  { name: "تجهیزات گیمینگ", href: "/products", icon: Gamepad2 },
];

export function Header({
  cartCount: propCartCount,
  searchQuery: externalSearchQuery,
  onSearchChange,
}: HeaderProps = {}) {
  const { user, isLoggedIn, isLoaded } = useAuth();
  const storeCartCount = useCartStore((state) => state.getItemsCount());
  const favoritesCount = useFavoritesStore((state) => state.favorites.length);
  const [categoryDropdownOpen, setCategoryDropdownOpen] = useState(false);
  const [internalSearchQuery, setInternalSearchQuery] = useState("");
  const [isSticky, setIsSticky] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const cartCount = propCartCount !== undefined ? propCartCount : storeCartCount;

  const searchQuery =
    externalSearchQuery !== undefined ? externalSearchQuery : internalSearchQuery;

  const handleSearchChange = (val: string) => {
    if (onSearchChange) {
      onSearchChange(val);
    }
    setInternalSearchQuery(val);
  };

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
    <div className="w-full">
      {isSticky && <div className="h-28 md:h-32 w-full pointer-events-none" aria-hidden="true" />}
      <header
        className={`w-full ${
          isSticky
            ? "fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md shadow-md border-b border-slate-200/80 animate-slide-down"
            : "relative bg-white border-b border-slate-200"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Desktop Layout (md and above) */}
          <div className="hidden md:flex items-center justify-between h-20 gap-4 lg:gap-6">
            {/* Right: Logo & Nav Links */}
            <div className="flex items-center gap-4 lg:gap-6 2xl:gap-8 shrink-0">
              <Link href="/" className="flex items-center gap-2.5 group cursor-pointer shrink-0 whitespace-nowrap">
                <div className="w-10 h-10 rounded-xl bg-[#0b1528] flex items-center justify-center text-white font-black text-xl shadow-xs group-hover:bg-[#162544] transition-colors shrink-0">
                  <span className="text-[#38bdf8]">پ</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-xl font-black tracking-tight text-[#0b1528] whitespace-nowrap">
                    پویان <span className="text-[#2563eb]">افزار</span>
                  </span>
                  <span className="text-[10px] text-slate-600 font-medium -mt-1 whitespace-nowrap">
                    مرجع تخصصی کالای دیجیتال
                  </span>
                </div>
              </Link>

              <nav className="hidden 2xl:flex items-center gap-5 shrink-0">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="text-sm font-medium transition-colors hover:text-[#2563eb] cursor-pointer text-slate-600 whitespace-nowrap"
                  >
                    {link.name}
                  </Link>
                ))}
              </nav>
            </div>

            {/* Center: Search Bar (Expanded & Clear) */}
            <div className="flex-1 max-w-xl lg:max-w-2xl 2xl:max-w-3xl mx-3 lg:mx-6 min-w-0">
              <div className="relative w-full">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => handleSearchChange(e.target.value)}
                  placeholder="جستجو در میان هزاران کالای دیجیتال..."
                  className="w-full bg-slate-100/90 hover:bg-slate-100 focus:bg-white border border-slate-200 focus:border-[#2563eb] rounded-xl h-11 pr-12 pl-4 text-sm text-slate-900 placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all font-medium"
                />
                <Search className="absolute right-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 pointer-events-none" />
              </div>
            </div>

            {/* Left: User & Action Buttons */}
            <div className="flex items-center gap-3 shrink-0 whitespace-nowrap">
              {isLoaded ? (
                isLoggedIn ? (
                  <Button
                    href="/panel"
                    variant="primary"
                    size="md"
                    className="rounded-xl font-semibold gap-2 cursor-pointer shadow-xs hover:shadow-md whitespace-nowrap text-sm"
                    leftIcon={<User className="w-4 h-4 text-blue-400" />}
                  >
                    <span>پنل کاربری</span>
                  </Button>
                ) : (
                  <Button
                    href="/login"
                    variant="primary"
                    size="md"
                    className="rounded-xl font-semibold gap-2 cursor-pointer shadow-xs hover:shadow-md whitespace-nowrap text-sm"
                    leftIcon={<LogIn className="w-4 h-4" />}
                  >
                    <span>ورود / ثبت‌نام</span>
                  </Button>
                )
              ) : (
                <div className="w-28 h-10 rounded-xl bg-slate-100 animate-pulse shrink-0" />
              )}

              <Button
                href="/panel?tab=favorites"
                variant="icon"
                size="icon"
                className="relative text-slate-700 hover:text-red-500 cursor-pointer shrink-0"
                aria-label="علاقه‌مندی‌ها"
              >
                <Heart className="w-5 h-5" />
                {mounted && favoritesCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-[11px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-xs">
                    {favoritesCount}
                  </span>
                )}
              </Button>

              <Button
                href="/cart"
                variant="icon"
                size="icon"
                className="relative text-slate-700 hover:text-[#2563eb] cursor-pointer shrink-0"
                aria-label="سبد خرید"
              >
                <ShoppingCart className="w-5 h-5" />
                {mounted && cartCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-[#2563eb] text-white text-[11px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-xs">
                    {cartCount}
                  </span>
                )}
              </Button>
            </div>
          </div>

          {/* Mobile Layout (below md) */}
          <div className="md:hidden pt-3 pb-2.5 flex flex-col gap-2.5">
            {/* Mobile Row 1: Logo & Actions */}
            <div className="flex items-center justify-between gap-2">
              <Link href="/" className="flex items-center gap-2 group cursor-pointer shrink-0 whitespace-nowrap">
                <div className="w-9 h-9 rounded-xl bg-[#0b1528] flex items-center justify-center text-white font-black text-lg shadow-xs group-hover:bg-[#162544] transition-colors shrink-0">
                  <span className="text-[#38bdf8]">پ</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-base font-black tracking-tight text-[#0b1528] whitespace-nowrap">
                    پویان <span className="text-[#2563eb]">افزار</span>
                  </span>
                  <span className="text-[9px] text-slate-600 font-medium -mt-1 whitespace-nowrap">
                    مرجع تخصصی کالای دیجیتال
                  </span>
                </div>
              </Link>

              <div className="flex items-center gap-2 shrink-0 whitespace-nowrap">
                {isLoaded ? (
                  isLoggedIn ? (
                    <Button
                      href="/panel"
                      variant="primary"
                      size="sm"
                      className="rounded-xl font-semibold gap-1.5 cursor-pointer shadow-xs whitespace-nowrap text-xs px-3 h-10"
                      leftIcon={<User className="w-4 h-4 text-blue-400" />}
                    >
                      <span>پنل کاربری</span>
                    </Button>
                  ) : (
                    <Button
                      href="/login"
                      variant="primary"
                      size="sm"
                      className="rounded-xl font-semibold gap-1.5 cursor-pointer shadow-xs whitespace-nowrap text-xs px-3 h-10"
                      leftIcon={<LogIn className="w-4 h-4" />}
                    >
                      <span>ورود / ثبت‌نام</span>
                    </Button>
                  )
                ) : (
                  <div className="w-24 h-10 rounded-xl bg-slate-100 animate-pulse shrink-0" />
                )}

                <Button
                  href="/panel?tab=favorites"
                  variant="icon"
                  size="icon"
                  className="relative text-slate-700 hover:text-red-500 cursor-pointer shrink-0"
                  aria-label="علاقه‌مندی‌ها"
                >
                  <Heart className="w-5 h-5" />
                  {mounted && favoritesCount > 0 && (
                    <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-[11px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-xs">
                      {favoritesCount}
                    </span>
                  )}
                </Button>

                <Button
                  href="/cart"
                  variant="icon"
                  size="icon"
                  className="relative text-slate-700 hover:text-[#2563eb] cursor-pointer shrink-0"
                  aria-label="سبد خرید"
                >
                  <ShoppingCart className="w-5 h-5" />
                  {mounted && cartCount > 0 && (
                    <span className="absolute -top-1.5 -right-1.5 bg-[#2563eb] text-white text-[11px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-xs">
                      {cartCount}
                    </span>
                  )}
                </Button>
              </div>
            </div>

            {/* Mobile Row 2: Search Input */}
            <div className="relative w-full">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => handleSearchChange(e.target.value)}
                placeholder="جستجو در میان هزاران کالای دیجیتال..."
                className="w-full bg-slate-100/90 hover:bg-slate-100 focus:bg-white border border-slate-200 focus:border-[#2563eb] rounded-xl h-10 pr-10 pl-4 text-xs text-slate-900 placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all font-medium"
              />
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-slate-500 pointer-events-none" />
            </div>
          </div>
        </div>

        <div className="hidden md:block border-t border-slate-100 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-12 gap-4">
              <div className="relative shrink-0">
                <button
                  type="button"
                  onClick={() => setCategoryDropdownOpen(!categoryDropdownOpen)}
                  className="flex items-center gap-2.5 text-sm font-bold text-slate-800 hover:text-[#2563eb] py-2 px-3 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer whitespace-nowrap"
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
                          className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-700 hover:bg-blue-50 hover:text-[#2563eb] transition-colors cursor-pointer whitespace-nowrap"
                        >
                          <Icon className="w-4 h-4 text-slate-600 shrink-0" />
                          <span>{cat.name}</span>
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>

              <div className="flex items-center gap-4 xl:gap-6 overflow-x-auto no-scrollbar py-1 shrink-0">
                {categories.map((cat) => (
                  <Link
                    key={cat.name}
                    href={cat.href}
                    className="text-xs font-medium text-slate-600 hover:text-[#0b1528] whitespace-nowrap transition-colors cursor-pointer shrink-0"
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
