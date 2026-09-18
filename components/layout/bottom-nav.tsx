"use client";

import React, { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Home, LayoutGrid, ShoppingBag, Flame, User } from "lucide-react";
import { useAuth } from "@/components/auth/auth-context";
import { useCartStore } from "@/lib/store";

interface NavItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: number;
}

export function BottomNav() {
  const router = useRouter();
  const pathname = usePathname();
  const { isLoggedIn } = useAuth();
  const cartCount = useCartStore((state) => state.getItemsCount());

  const [activeId, setActiveId] = useState("home");

  const navItems: NavItem[] = [
    { id: "home", label: "خانه", icon: Home },
    { id: "categories", label: "دسته‌بندی", icon: LayoutGrid },
    { id: "cart", label: "سبد خرید", icon: ShoppingBag, badge: cartCount },
    { id: "deals", label: "شگفت‌انگیز", icon: Flame },
    { id: "profile", label: "پروفایل", icon: User },
  ];

  useEffect(() => {
    if (pathname === "/login" || pathname === "/panel") {
      setActiveId("profile");
    } else if (pathname === "/cart") {
      setActiveId("cart");
    } else if (pathname === "/") {
      setActiveId("home");
    }
  }, [pathname]);

  const activeIndex = navItems.findIndex((item) => item.id === activeId);

  const handleItemClick = (id: string) => {
    setActiveId(id);
    if (id === "profile") {
      if (isLoggedIn) {
        router.push("/panel");
      } else {
        router.push("/login");
      }
    } else if (id === "cart") {
      router.push("/cart");
    } else if (id === "home") {
      router.push("/");
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

          return (
            <button
              key={item.id}
              onClick={() => handleItemClick(item.id)}
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

                {item.badge !== undefined && (
                  <span
                    className={`absolute -top-2.5 -right-2 text-[10px] font-black rounded-full w-4.5 h-4.5 flex items-center justify-center shadow-xs transition-colors ${
                      isActive
                        ? "bg-white text-[#2563eb]"
                        : "bg-red-500 text-white"
                    }`}
                  >
                    {item.badge}
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
            </button>
          );
        })}
      </div>
    </nav>
  );
}
