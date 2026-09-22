"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
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
  { name: "پیگیری سفارش", href: "/track" },
  { name: "درباره ما", href: "/about" },
  { name: "تماس با ما", href: "/contact" },
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
  const router = useRouter();
  const { user, isLoggedIn, isLoaded } = useAuth();
  const storeCartCount = useCartStore((state) => state.getItemsCount());
  const favoritesCount = useFavoritesStore((state) => state.favorites.length);
  const [mounted, setMounted] = useState(false);
  const [categoryDropdownOpen, setCategoryDropdownOpen] = useState(false);
  const [internalSearchQuery, setInternalSearchQuery] = useState("");
  const [isSticky, setIsSticky] = useState(false);

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

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const q = searchQuery.trim();
    if (!q) return;
    router.push(`/products?search=${encodeURIComponent(q)}`);
  };

  const userDisplayName = user
    ? (user.firstName
        ? `${user.firstName} ${user.lastName || ""}`.trim()
        : user.name || user.phone || "حساب کاربری")
    : "حساب کاربری";

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
      {isSticky && <div className="h-20 sm:h-32 w-full pointer-events-none" aria-hidden="true" />}
      <header
        className={`w-full ${
          isSticky
            ? "fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md shadow-md border-b border-slate-200/80 animate-slide-down"
            : "relative bg-white border-b border-slate-200"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20 gap-3 sm:gap-4">
            <div className="flex items-center gap-4 lg:gap-8 shrink-0">
              <Link href="/" className="flex items-center gap-2.5 group cursor-pointer shrink-0">
                <img
                  src="/logo-poyan-afraz.webp"
                  alt="پویان افزار"
                  className="w-9 h-9 sm:w-10 sm:h-10 object-contain rounded-xl shadow-2xs group-hover:scale-105 transition-transform"
                />
                <div className="flex flex-col">
                  <span className="text-lg sm:text-xl font-black tracking-tight text-[#0b1528]">
                    پویان <span className="text-[#2563eb]">افزار</span>
                  </span>
                  <span className="hidden sm:block text-[10px] text-slate-600 font-medium -mt-1">
                    مرجع تخصصی کالای دیجیتال
                  </span>
                </div>
              </Link>

            <nav className="hidden xl:flex items-center gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-sm font-medium transition-colors hover:text-[#2563eb] cursor-pointer text-slate-600"
                >
                  {link.name}
                </Link>
              ))}
            </nav>
          </div>

          <div className="flex flex-1 max-w-md mx-1 sm:mx-4">
            <form onSubmit={handleSearchSubmit} className="relative w-full">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => handleSearchChange(e.target.value)}
                placeholder="جستجوی کالا، برند یا مدل..."
                className="w-full bg-slate-50 hover:bg-slate-100/80 focus:bg-white border border-slate-200 focus:border-[#2563eb] rounded-xl py-2 sm:py-2.5 pr-9 sm:pr-11 pl-4 text-xs sm:text-sm text-slate-800 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all"
              />
              <button
                type="submit"
                className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 p-1 text-slate-500 hover:text-[#2563eb] transition-colors cursor-pointer"
                title="جستجو"
                aria-label="جستجو"
              >
                <Search className="w-4 h-4" />
              </button>
            </form>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
            <div className="hidden md:flex items-center">
              {isLoaded ? (
                isLoggedIn ? (
                  <Link href="/panel">
                    <Button
                      variant="primary"
                      size="md"
                      className="rounded-xl font-bold gap-1.5 sm:gap-2 cursor-pointer shadow-sm hover:shadow-md max-w-32 sm:max-w-44 text-xs sm:text-sm px-2.5 sm:px-4"
                      leftIcon={<User className="w-4 h-4 text-blue-300 shrink-0" />}
                    >
                      <span className="truncate">{userDisplayName}</span>
                    </Button>
                  </Link>
                ) : (
                  <Link href="/login">
                    <Button
                      variant="primary"
                      size="md"
                      className="rounded-xl font-semibold gap-1.5 sm:gap-2 cursor-pointer shadow-sm hover:shadow-md text-xs sm:text-sm px-2.5 sm:px-4"
                      leftIcon={<LogIn className="w-4 h-4 shrink-0" />}
                    >
                      <span>ورود / ثبت‌نام</span>
                    </Button>
                  </Link>
                )
              ) : (
                <div className="w-20 sm:w-28 h-9 sm:h-10 rounded-xl bg-slate-100 animate-pulse" />
              )}
            </div>

            <Link href={isLoggedIn ? "/panel?tab=favorites" : "/login?redirect=/panel?tab=favorites"}>
              <Button
                variant="icon"
                size="icon"
                className="relative text-slate-700 hover:text-red-500 cursor-pointer"
                aria-label="علاقه‌مندی‌ها"
              >
                <Heart className="w-5 h-5" />
                {mounted && favoritesCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-[11px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-xs">
                    {favoritesCount}
                  </span>
                )}
              </Button>
            </Link>

            <Link
              href={isLoggedIn ? "/cart" : "/login?redirect=/cart"}
              className="hidden md:inline-flex"
            >
              <Button
                variant="icon"
                size="icon"
                className="relative text-slate-700 hover:text-[#2563eb] cursor-pointer"
                aria-label="سبد خرید"
              >
                <ShoppingCart className="w-5 h-5" />
                {mounted && cartCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-[#2563eb] text-white text-[11px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-xs">
                    {cartCount}
                  </span>
                )}
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="hidden md:block border-t border-slate-100 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-12">
            <div className="relative">
              <button
                type="button"
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
