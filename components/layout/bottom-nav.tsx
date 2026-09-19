"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { Home, LayoutGrid, ShoppingBag, Flame, User } from "lucide-react";
import { useAuth } from "@/components/auth/auth-context";
import { useCartStore } from "@/lib/store";

interface NavItem {
  id: string;
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  isCart?: boolean;
}

const navItems: NavItem[] = [
  { id: "home", label: "خانه", href: "/", icon: Home },
  { id: "categories", label: "دسته‌بندی", href: "/products", icon: LayoutGrid },
  { id: "cart", label: "سبد خرید", href: "/cart", icon: ShoppingBag, isCart: true },
  { id: "deals", label: "شگفت‌انگیز", href: "/#flash-sale", icon: Flame },
  { id: "profile", label: "پروفایل", href: "/panel", icon: User },
];

function getActiveFromPath(path: string) {
  if (path === "/login" || path === "/panel") return "profile";
  if (path === "/cart") return "cart";
  if (path === "/products") return "categories";
  return "home";
}

export function BottomNav() {
  const router = useRouter();
  const pathname = usePathname();
  const { isLoggedIn } = useAuth();
  const cartCount = useCartStore((state) => state.getItemsCount());

  const [mounted, setMounted] = useState(false);
  const [activeId, setActiveId] = useState(() => getActiveFromPath(pathname || "/"));

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setActiveId(getActiveFromPath(pathname || "/"));
  }, [pathname]);

  const activeIndex = Math.max(0, navItems.findIndex((item) => item.id === activeId));

  const handleItemClick = (e: React.MouseEvent, item: NavItem) => {
    setActiveId(item.id);
    if (item.id === "profile") {
      e.preventDefault();
      if (isLoggedIn) {
        router.push("/panel");
      } else {
        router.push("/login");
      }
    } else if (item.id === "deals") {
      e.preventDefault();
      if (pathname === "/") {
        const el = document.getElementById("flash-sale");
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
        }
      } else {
        router.push("/#flash-sale");
      }
    }
  };

  return (
    <nav
      aria-label="ناوبری سریع موبایل"
      className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-2xl border-t border-slate-200 shadow-[0_-8px_30px_rgba(0,0,0,0.08)] px-2 pt-2 pb-3"
    >
      <div className="relative flex items-center justify-around max-w-md mx-auto h-16">
        <div
          className="absolute -top-6 bottom-5 rounded-xl bg-[#2563eb] shadow-[0_4px_16px_rgba(37,99,235,0.35)] transition-all duration-300 ease-out z-0 pointer-events-none"
          style={{
            right: `calc(${activeIndex * 20}% + 6px)`,
            width: "calc(22% - 20px)",
          }}
        />

        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeId === item.id;
          const badgeValue = mounted && item.isCart ? cartCount : undefined;

          return (
            <Link
              key={item.id}
              href={item.href}
              onClick={(e) => handleItemClick(e, item)}
              className="relative z-10 flex flex-col items-center justify-center flex-1 h-full py-1 focus:outline-none cursor-pointer group"
            >
              <div className="relative flex items-center justify-center">
                <Icon
                  className={`w-7 h-7 transition-all duration-200 ${
                    isActive
                      ? "text-white stroke-[2.4] scale-115 -translate-y-6"
                      : "text-slate-500 group-hover:text-slate-800 stroke-[1.8]"
                  }`}
                />

                {mounted && badgeValue !== undefined && badgeValue > 0 && (
                  <span
                    className={`absolute -top-2.5 -right-2 text-[10px] font-black rounded-full w-4.5 h-4.5 flex items-center justify-center shadow-xs transition-colors ${
                      isActive
                        ? "bg-white text-[#2563eb]"
                        : "bg-red-500 text-white"
                    }`}
                  >
                    {badgeValue}
                  </span>
                )}
              </div>

              <span
                className={`text-[10px] tracking-tight mt-1 transition-all duration-200 leading-none ${
                  isActive
                    ? "text-white font-black hidden"
                    : "text-slate-500 group-hover:text-slate-800 font-medium"
                }`}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
