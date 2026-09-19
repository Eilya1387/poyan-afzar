"use client";

import React from "react";
import { useAdminStore } from "@/lib/admin-store";
import { AdminTab } from "@/types/admin";
import { toPersianDigits } from "@/lib/formatters";
import {
  LayoutDashboard,
  ShoppingBag,
  Package,
  Shapes,
  Award,
  Warehouse,
  Users,
  Tag,
  MessageSquare,
  BarChart3,
  LogOut,
  X,
} from "lucide-react";

interface AdminSidebarProps {
  isOpenMobile?: boolean;
  onCloseMobile?: () => void;
}

interface NavItem {
  id: AdminTab;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: number | string;
}

export function AdminSidebar({ isOpenMobile, onCloseMobile }: AdminSidebarProps) {
  const activeTab = useAdminStore((state) => state.activeTab);
  const setActiveTab = useAdminStore((state) => state.setActiveTab);
  const logout = useAdminStore((state) => state.logout);
  const reviews = useAdminStore((state) => state.reviews);
  const products = useAdminStore((state) => state.products);
  const orders = useAdminStore((state) => state.orders);

  const pendingReviewsCount = reviews.filter((r) => r.status === "pending").length;
  const lowStockCount = products.filter((p) => p.stock <= p.minStockThreshold).length;
  const pendingOrdersCount = orders.filter((o) => o.shippingStatus === "preparing" || o.shippingStatus === "shipping").length;

  const navItems: NavItem[] = [
    { id: "dashboard", label: "داشبورد", icon: LayoutDashboard },
    { id: "orders", label: "سفارش‌ها", icon: ShoppingBag, badge: pendingOrdersCount > 0 ? toPersianDigits(pendingOrdersCount) : undefined },
    { id: "products", label: "محصولات", icon: Package },
    { id: "categories", label: "دسته‌بندی‌ها", icon: Shapes },
    { id: "brands", label: "برندها", icon: Award },
    { id: "inventory", label: "موجودی انبار", icon: Warehouse, badge: lowStockCount > 0 ? toPersianDigits(lowStockCount) : undefined },
    { id: "customers", label: "مشتریان", icon: Users },
    { id: "discounts", label: "تخفیف‌ها", icon: Tag },
    { id: "reviews", label: "نظرات", icon: MessageSquare, badge: pendingReviewsCount > 0 ? `${toPersianDigits(pendingReviewsCount)} جدید` : undefined },
    { id: "reports", label: "گزارش‌ها", icon: BarChart3 },
  ];

  const handleSelectTab = (tab: AdminTab) => {
    setActiveTab(tab);
    if (onCloseMobile) onCloseMobile();
  };

  const content = (
    <div className="flex flex-col h-full bg-[#0f172a] text-slate-200 select-none">
      {/* Sidebar Header / Logo */}
      <div className="px-5 py-5 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#0b1528] border border-slate-700/80 flex items-center justify-center text-white font-black text-lg shadow-sm">
            <span className="text-[#38bdf8]">پ</span>
          </div>
          <div>
            <h2 className="text-sm font-black text-white tracking-tight">پنل مدیریت پویان افزار</h2>
            <p className="text-[11px] text-slate-400 font-medium">نسخه فروشگاهی</p>
          </div>
        </div>

        {onCloseMobile && (
          <button
            onClick={onCloseMobile}
            className="lg:hidden p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Nav List */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-1 scrollbar-thin scrollbar-thumb-slate-700">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => handleSelectTab(item.id)}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-150 cursor-pointer ${
                isActive
                  ? "bg-[#2563eb] text-white shadow-sm font-bold"
                  : "text-slate-300 hover:bg-slate-800/80 hover:text-white"
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon className={`w-4 h-4 sm:w-5 sm:h-5 ${isActive ? "text-white" : "text-slate-400"}`} />
                <span>{item.label}</span>
              </div>

              {item.badge !== undefined && (
                <span
                  className={`text-xs font-semibold ${
                    isActive ? "text-white" : "text-slate-400"
                  }`}
                >
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Sidebar Footer / Logout */}
      <div className="p-3.5 border-t border-slate-800">
        <button
          onClick={logout}
          className="w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-rose-300 hover:text-rose-100 hover:bg-rose-500/10 transition-all cursor-pointer"
        >
          <LogOut className="w-4 h-4 text-rose-400" />
          <span>خروج از حساب</span>
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Persistent Sidebar (Fixed to Right Edge) */}
      <aside className="hidden lg:block w-64 h-screen fixed top-0 right-0 bottom-0 z-30 border-l border-slate-800 bg-[#0f172a] shadow-lg">
        {content}
      </aside>

      {/* Mobile Drawer */}
      {isOpenMobile && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div
            className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs transition-opacity"
            onClick={onCloseMobile}
          />
          <div className="relative w-72 max-w-full h-full z-10 shadow-2xl animate-slide-in-right">
            {content}
          </div>
        </div>
      )}
    </>
  );
}
