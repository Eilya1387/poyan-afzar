"use client";

import React, { useState } from "react";
import { useAdminStore } from "@/lib/admin-store";
import { toPersianDigits } from "@/lib/formatters";
import { ThemeToggle } from "@/components/theme/theme-provider";
import {
  Search,
  Bell,
  Menu,
  ExternalLink,
  CheckCircle,
  AlertTriangle,
  ShoppingBag,
  MessageSquare,
} from "lucide-react";
import Link from "next/link";

interface AdminHeaderProps {
  onOpenMobileMenu?: () => void;
}

export function AdminHeader({ onOpenMobileMenu }: AdminHeaderProps) {
  const searchQuery = useAdminStore((state) => state.searchQuery);
  const setSearchQuery = useAdminStore((state) => state.setSearchQuery);
  const adminUser = useAdminStore((state) => state.adminUser);
  const reviews = useAdminStore((state) => state.reviews);
  const products = useAdminStore((state) => state.products);
  const orders = useAdminStore((state) => state.orders);
  const setActiveTab = useAdminStore((state) => state.setActiveTab);

  const [showNotifications, setShowNotifications] = useState(false);

  const pendingReviews = reviews.filter((r) => r.status === "pending");
  const lowStock = products.filter((p) => p.stock <= p.minStockThreshold);
  const pendingOrders = orders.filter((o) => o.shippingStatus === "preparing" || o.shippingStatus === "shipping");

  const totalAlerts = pendingReviews.length + lowStock.length + pendingOrders.length;

  return (
    <header className="sticky top-0 z-20 bg-white dark:bg-[#111827] border-b border-slate-200/80 dark:border-slate-800 px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between gap-4 select-none">
      {/* Search Input Bar (Center/Right in RTL) */}
      <div className="flex items-center gap-3 flex-1 max-w-lg">
        <button
          onClick={onOpenMobileMenu}
          className="lg:hidden p-2 rounded-xl text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          aria-label="باز کردن منو"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="relative w-full">
          <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-slate-400">
            <Search className="w-4 h-4" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="جستجوی سفارش، محصول یا مشتری..."
            className="w-full pl-4 pr-10 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200/80 dark:border-slate-700 rounded-xl text-xs sm:text-sm text-slate-800 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute inset-y-0 left-0 pl-3 flex items-center text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
            >
              پاک کردن
            </button>
          )}
        </div>
      </div>

      {/* Actions & User Profile (Left in RTL) */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Theme Toggle */}
        <ThemeToggle />

        {/* Visit Shop Link */}
        <Link
          href="/"
          target="_blank"
          className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50/60 dark:hover:bg-slate-800 rounded-xl border border-slate-200/70 dark:border-slate-700 transition-colors"
          title="مشاهده صفحه فروشگاه در تب جدید"
        >
          <span>مشاهده فروشگاه</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </Link>

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2 rounded-xl text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            aria-label="اعلان‌ها"
          >
            <Bell className="w-5 h-5" />
            {totalAlerts > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-blue-600 ring-2 ring-white dark:ring-slate-900" />
            )}
          </button>

          {/* Notifications Dropdown */}
          {showNotifications && (
            <>
              <div
                className="fixed inset-0 z-40"
                onClick={() => setShowNotifications(false)}
              />
              <div className="absolute left-0 mt-2 w-80 sm:w-88 bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-800 p-4 z-50 animate-scale-up">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                  <span className="text-sm font-bold text-slate-800 dark:text-white">اعلان‌های سیستم</span>
                  <span className="text-xs text-blue-600 dark:text-blue-400 font-bold">
                    {toPersianDigits(totalAlerts)} مورد جدید
                  </span>
                </div>

                <div className="py-2 space-y-2 max-h-80 overflow-y-auto">
                  {pendingReviews.length > 0 && (
                    <div
                      onClick={() => {
                        setActiveTab("reviews");
                        setShowNotifications(false);
                      }}
                      className="p-2.5 rounded-xl bg-blue-50/60 dark:bg-blue-950/40 hover:bg-blue-50 dark:hover:bg-blue-900/40 cursor-pointer transition-colors flex items-start gap-3"
                    >
                      <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 shrink-0">
                        <MessageSquare className="w-4 h-4" />
                      </div>
                      <div className="text-xs">
                        <p className="font-bold text-slate-800 dark:text-white">
                          {pendingReviews.length} نظر در انتظار بررسی
                        </p>
                        <p className="text-slate-500 dark:text-slate-400 mt-0.5">
                          نظرات جدید کاربران نیازمند تایید هستند.
                        </p>
                      </div>
                    </div>
                  )}

                  {lowStock.length > 0 && (
                    <div
                      onClick={() => {
                        setActiveTab("inventory");
                        setShowNotifications(false);
                      }}
                      className="p-2.5 rounded-xl bg-amber-50/60 dark:bg-amber-950/40 hover:bg-amber-50 dark:hover:bg-amber-900/40 cursor-pointer transition-colors flex items-start gap-3"
                    >
                      <div className="p-2 rounded-lg bg-amber-100 dark:bg-amber-900 text-amber-600 dark:text-amber-400 shrink-0">
                        <AlertTriangle className="w-4 h-4" />
                      </div>
                      <div className="text-xs">
                        <p className="font-bold text-slate-800 dark:text-white">
                          {lowStock.length} کالا رو به اتمام
                        </p>
                        <p className="text-slate-500 dark:text-slate-400 mt-0.5">
                          موجودی انبار به حد هشدار رسیده است.
                        </p>
                      </div>
                    </div>
                  )}

                  {pendingOrders.length > 0 && (
                    <div
                      onClick={() => {
                        setActiveTab("orders");
                        setShowNotifications(false);
                      }}
                      className="p-2.5 rounded-xl bg-emerald-50/60 dark:bg-emerald-950/40 hover:bg-emerald-50 dark:hover:bg-emerald-900/40 cursor-pointer transition-colors flex items-start gap-3"
                    >
                      <div className="p-2 rounded-lg bg-emerald-100 dark:bg-emerald-900 text-emerald-600 dark:text-emerald-400 shrink-0">
                        <ShoppingBag className="w-4 h-4" />
                      </div>
                      <div className="text-xs">
                        <p className="font-bold text-slate-800 dark:text-white">
                          {pendingOrders.length} سفارش نیازمند اقدام
                        </p>
                        <p className="text-slate-500 dark:text-slate-400 mt-0.5">
                          سفارش‌های در حال آماده‌سازی و ارسال.
                        </p>
                      </div>
                    </div>
                  )}

                  {totalAlerts === 0 && (
                    <div className="text-center py-6 text-slate-400">
                      <CheckCircle className="w-8 h-8 text-emerald-500 mx-auto mb-2" />
                      <p className="text-xs font-medium">همه اعلان‌ها بررسی شده‌اند</p>
                    </div>
                  )}
                </div>
              </div>
            </>
          )}
        </div>

        {/* User Profile Info */}
        <div className="flex items-center gap-3 pr-2 border-r border-slate-200 dark:border-slate-800">
          <div className="w-9 h-9 rounded-full bg-linear-to-tr from-blue-600 to-blue-400 p-0.5 shadow-xs">
            <div className="w-full h-full rounded-full bg-slate-800 flex items-center justify-center text-white text-xs font-bold">
              م
            </div>
          </div>
          <div className="hidden sm:block text-right">
            <p className="text-xs font-bold text-slate-800 dark:text-white leading-tight">
              {adminUser?.name || "مدیر سیستم"}
            </p>
            <p className="text-[11px] text-slate-400 font-medium">پویان افزار</p>
          </div>
        </div>
      </div>
    </header>
  );
}
