"use client";

import React, { useState, useEffect } from "react";
import { useAdminStore } from "@/lib/admin-store";
import { formatPriceFa, toPersianDigits, getPersianFullDate, getPersianTodayDate } from "@/lib/formatters";
import { AdminOrder, AdminReview } from "@/types/admin";
import { ConfirmModal } from "./confirm-modal";
import { Button } from "@/components/ui/button";
import {
  TrendingUp,
  CreditCard,
  ShoppingCart,
  Receipt,
  UserPlus,
  Calendar,
  Download,
  Eye,
  Star,
  Layers,
  ChevronLeft,
  CheckCircle,
  FileSpreadsheet,
} from "lucide-react";

interface DashboardViewProps {
  onSelectOrder?: (order: AdminOrder) => void;
}

export function DashboardView({ onSelectOrder }: DashboardViewProps) {
  const setActiveTab = useAdminStore((state) => state.setActiveTab);
  const products = useAdminStore((state) => state.products);
  const orders = useAdminStore((state) => state.orders);
  const reviews = useAdminStore((state) => state.reviews);
  const salesChart = useAdminStore((state) => state.salesChart);
  const kpis = useAdminStore((state) => state.kpis);
  const approveReview = useAdminStore((state) => state.approveReview);
  const rejectReview = useAdminStore((state) => state.rejectReview);
  const fetchAdminData = useAdminStore((state) => state.fetchAdminData);

  useEffect(() => {
    fetchAdminData();
  }, [fetchAdminData]);

  // States
  const [rejectingReviewId, setRejectingReviewId] = useState<string | null>(null);
  const [hoveredBarIndex, setHoveredBarIndex] = useState<number | null>(null);
  const [isExporting, setIsExporting] = useState(false);
  const [exportSuccess, setExportSuccess] = useState(false);

  // Dynamic KPIs from Backend
  const todaySales = kpis?.todaySales || 0;
  const todayOrdersCount = kpis?.todayOrdersCount || 0;
  const monthRevenue = kpis?.monthRevenue || kpis?.totalRevenue || 0;
  const totalCustomers = kpis?.totalCustomers || 0;

  // Filter low-stock items
  const lowStockProducts = products
    .filter((p) => p.stock <= p.minStockThreshold || p.stock === 0)
    .slice(0, 4);

  // Pending reviews
  const pendingReviews = reviews
    .filter((r) => r.status === "pending")
    .slice(0, 3);

  const pendingCount = reviews.filter((r) => r.status === "pending").length;

  // Recent 4 orders
  const recentOrders = orders.slice(0, 4);

  // Max sales amount for chart scale
  const maxSales = Math.max(...salesChart.map((d) => d.amount), 1000000);

  const handleExport = async () => {
    setIsExporting(true);
    try {
      const { API_BASE_URL, getAdminToken } = await import("@/lib/api/config");
      const token = getAdminToken();
      const res = await fetch(`${API_BASE_URL}/api/admin/reports/export`, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      if (res.ok) {
        const blob = await res.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `poyan-dashboard-report-${Date.now()}.csv`;
        document.body.appendChild(a);
        a.click();
        a.remove();
        window.URL.revokeObjectURL(url);
        setExportSuccess(true);
        setTimeout(() => setExportSuccess(false), 3000);
      }
    } catch {
      // Ignore
    } finally {
      setIsExporting(false);
    }
  };

  const handleConfirmReject = () => {
    if (rejectingReviewId) {
      rejectReview(rejectingReviewId);
      setRejectingReviewId(null);
    }
  };

  const renderPaymentStatus = (status: AdminOrder["paymentStatus"]) => {
    switch (status) {
      case "paid":
        return <span className="font-semibold text-emerald-600">پرداخت شده</span>;
      case "failed":
        return <span className="font-semibold text-rose-600">ناموفق</span>;
      case "pending":
      default:
        return <span className="font-semibold text-amber-600">در انتظار</span>;
    }
  };

  const renderShippingStatus = (status: AdminOrder["shippingStatus"]) => {
    switch (status) {
      case "shipping":
        return <span className="font-semibold text-blue-600">در حال ارسال</span>;
      case "preparing":
        return <span className="font-semibold text-amber-600">آماده‌سازی</span>;
      case "delivered":
        return <span className="font-semibold text-emerald-600">تحویل شده</span>;
      case "cancelled":
      default:
        return <span className="font-semibold text-slate-500">لغو شده</span>;
    }
  };

  return (
    <div className="space-y-6 animate-fade-in select-none">
      {/* Top Title & Actions Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            داشبورد مدیریت
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 font-medium">
            خلاصه وضعیت فروش و فعالیت‌های امروز فروشگاه
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Date Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-slate-700 text-xs font-bold shadow-2xs">
            <Calendar className="w-4 h-4 text-blue-600" />
            <span>{getPersianFullDate()}</span>
          </div>

          {/* Export Report Button */}
          <Button
            size="sm"
            variant="secondary"
            onClick={handleExport}
            isLoading={isExporting}
            rightIcon={exportSuccess ? <CheckCircle className="w-4 h-4 text-emerald-300" /> : <Download className="w-4 h-4" />}
          >
            {exportSuccess ? "گزارش دریافت شد" : "خروجی گزارش"}
          </Button>
        </div>
      </div>

      {/* 4 Stat Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-5">
        {/* Card 1: فروش امروز */}
        <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-2xs hover:shadow-md transition-shadow relative overflow-hidden">
          <div className="flex items-start justify-between">
            <div className="w-11 h-11 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100/60">
              <CreditCard className="w-5 h-5" />
            </div>
            <p className="text-xs font-bold text-slate-500">فروش امروز</p>
          </div>

          <div className="mt-4">
            <div className="flex items-baseline gap-1.5">
              <span className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                {formatPriceFa(todaySales)}
              </span>
              <span className="text-xs font-bold text-slate-400">تومان</span>
            </div>

            <div className="mt-2.5 flex items-center gap-1.5 text-xs font-bold text-slate-500">
              <span>گزارش رسمی سرور</span>
            </div>
          </div>
        </div>

        {/* Card 2: تعداد سفارش امروز */}
        <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-2xs hover:shadow-md transition-shadow relative overflow-hidden">
          <div className="flex items-start justify-between">
            <div className="w-11 h-11 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100/60">
              <ShoppingCart className="w-5 h-5" />
            </div>
            <p className="text-xs font-bold text-slate-500">سفارشات امروز</p>
          </div>

          <div className="mt-4">
            <div className="flex items-baseline gap-1.5">
              <span className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                {toPersianDigits(todayOrdersCount)}
              </span>
              <span className="text-xs font-bold text-slate-400">سفارش</span>
            </div>

            <div className="mt-2.5 flex items-center gap-1.5 text-xs font-bold text-slate-500">
              <span>ثبت شده در سیستم</span>
            </div>
          </div>
        </div>

        {/* Card 3: درآمد ماه */}
        <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-2xs hover:shadow-md transition-shadow relative overflow-hidden">
          <div className="flex items-start justify-between">
            <div className="w-11 h-11 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100/60">
              <Receipt className="w-5 h-5" />
            </div>
            <p className="text-xs font-bold text-slate-500">درآمد ماه</p>
          </div>

          <div className="mt-4">
            <div className="flex items-baseline gap-1.5">
              <span className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                {formatPriceFa(monthRevenue)}
              </span>
              <span className="text-xs font-bold text-slate-400">تومان</span>
            </div>

            <div className="mt-2.5 flex items-center gap-1.5 text-xs font-bold text-slate-500">
              <span>گردش مالی کل</span>
            </div>
          </div>
        </div>

        {/* Card 4: مشتریان */}
        <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-2xs hover:shadow-md transition-shadow relative overflow-hidden">
          <div className="flex items-start justify-between">
            <div className="w-11 h-11 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100/60">
              <UserPlus className="w-5 h-5" />
            </div>
            <p className="text-xs font-bold text-slate-500">کل خریداران</p>
          </div>

          <div className="mt-4">
            <div className="flex items-baseline gap-1.5">
              <span className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                {toPersianDigits(totalCustomers)}
              </span>
              <span className="text-xs font-bold text-slate-400">مشتری</span>
            </div>

            <div className="mt-2.5 flex items-center gap-1.5 text-xs font-bold text-slate-500">
              <span>کاربران فعال سامانه</span>
            </div>
          </div>
        </div>
      </div>

      {/* Middle Row: Sales Chart (Left/Right) & Low Stock (Side) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Sales Chart (8 cols on desktop) */}
        <div className="lg:col-span-8 bg-white rounded-2xl p-6 border border-slate-100 shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div>
              <h2 className="text-base font-bold text-slate-900">
                نمودار فروش ۷ روز گذشته
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                روند درآمد و تراکنش‌های فروشگاه در هفته اخیر
              </p>
            </div>
            <div className="flex items-center gap-2 text-xs font-bold text-slate-600">
              <span className="w-2.5 h-2.5 rounded-full bg-[#2563eb]" />
              <span>فروش (تومان)</span>
            </div>
          </div>

          {/* Bar Chart Representation */}
          <div className="pt-8 pb-4">
            <div className="flex items-end justify-between gap-2 sm:gap-4 h-56 px-2 sm:px-6">
              {salesChart.map((day, idx) => {
                const heightPercent = Math.round((day.amount / maxSales) * 100);
                const isToday = day.isToday || idx === 0;
                const isHovered = hoveredBarIndex === idx;

                return (
                  <div
                    key={day.dateStr}
                    className="flex-1 flex flex-col items-center gap-2 h-full justify-end group relative cursor-pointer"
                    onMouseEnter={() => setHoveredBarIndex(idx)}
                    onMouseLeave={() => setHoveredBarIndex(null)}
                  >
                    {/* Tooltip on hover */}
                    {isHovered && (
                      <div className="absolute -top-10 bg-slate-900 text-white text-[11px] font-bold py-1 px-2.5 rounded-lg shadow-lg whitespace-nowrap z-20 pointer-events-none animate-scale-up">
                        {formatPriceFa(day.amount)} تومان ({toPersianDigits(day.ordersCount)} سفارش)
                      </div>
                    )}

                    {/* Bar Pill */}
                    <div className="w-full max-w-13 bg-slate-100 rounded-t-xl h-full flex items-end overflow-hidden">
                      <div
                        style={{ height: `${heightPercent}%` }}
                        className={`w-full rounded-t-xl transition-all duration-300 ${
                          isToday
                            ? "bg-[#2563eb] shadow-md shadow-blue-500/20"
                            : "bg-[#e8f0fe] hover:bg-blue-200"
                        }`}
                      />
                    </div>

                    {/* Day Label */}
                    <span
                      className={`text-xs font-bold transition-colors ${
                        isToday ? "text-[#2563eb]" : "text-slate-500"
                      }`}
                    >
                      {day.dayName}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Low Stock Alerts (4 cols on desktop) */}
        <div className="lg:col-span-4 bg-white rounded-2xl p-6 border border-slate-100 shadow-2xs flex flex-col justify-between">
          <div>
            <div className="pb-4 border-b border-slate-100">
              <h2 className="text-base font-bold text-slate-900">
                محصولات رو به اتمام
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                نیازمند شارژ سریع انبار
              </p>
            </div>

            {/* List */}
            <div className="py-3 space-y-3">
              {lowStockProducts.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 border border-slate-100/80 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 border border-blue-100/60">
                      <ShoppingCart className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-slate-800 line-clamp-1">
                        {item.title}
                      </h4>
                      <p className="text-xs font-bold text-rose-600 mt-0.5">
                        موجودی: {toPersianDigits(item.stock)} عدد
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => setActiveTab("inventory")}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-200/60 transition-colors cursor-pointer"
                    title="مدیریت موجودی"
                  >
                    <Layers className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Footer Action */}
          <Button
            variant="outline"
            size="sm"
            onClick={() => setActiveTab("inventory")}
            className="w-full mt-3"
          >
            مشاهده همه موجودی انبار
          </Button>
        </div>
      </div>

      {/* Bottom Row: Recent Orders & Pending Reviews */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Recent Orders Table (8 cols on desktop) */}
        <div className="lg:col-span-8 bg-white rounded-2xl p-6 border border-slate-100 shadow-2xs">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div>
              <h2 className="text-base font-bold text-slate-900">آخرین سفارش‌ها</h2>
              <p className="text-xs text-slate-500 mt-0.5">
                سفارش‌های ثبت شده اخیر در فروشگاه
              </p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setActiveTab("orders")}
              leftIcon={<ChevronLeft className="w-3.5 h-3.5" />}
              className="text-[#2563eb] hover:text-blue-800"
            >
              مشاهده همه
            </Button>
          </div>

          {/* Orders Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-right text-xs">
              <thead>
                <tr className="text-slate-500 font-bold border-b border-slate-100">
                  <th className="py-3 px-3">شماره سفارش</th>
                  <th className="py-3 px-3">نام مشتری</th>
                  <th className="py-3 px-3">تاریخ</th>
                  <th className="py-3 px-3">مبلغ (تومان)</th>
                  <th className="py-3 px-3 text-center">وضعیت پرداخت</th>
                  <th className="py-3 px-3 text-center">وضعیت ارسال</th>
                  <th className="py-3 px-3 text-center">عملیات</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100/80">
                {recentOrders.map((order) => (
                  <tr
                    key={order.id}
                    className="hover:bg-slate-50/70 transition-colors font-medium text-slate-700"
                  >
                    <td className="py-3.5 px-3 font-bold text-slate-900">
                      {order.id}
                    </td>
                    <td className="py-3.5 px-3 font-semibold text-slate-800">
                      {order.customerName}
                    </td>
                    <td className="py-3.5 px-3 text-slate-500">
                      {order.date}
                    </td>
                    <td className="py-3.5 px-3 font-bold text-slate-900">
                      {formatPriceFa(order.amount)}
                    </td>
                    <td className="py-3.5 px-3 text-center">
                      {renderPaymentStatus(order.paymentStatus)}
                    </td>
                    <td className="py-3 px-4 text-center">
                      {renderShippingStatus(order.shippingStatus)}
                    </td>
                    <td className="py-3.5 px-3 text-center">
                      <button
                        onClick={() => {
                          if (onSelectOrder) {
                            onSelectOrder(order);
                          } else {
                            setActiveTab("orders");
                          }
                        }}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-colors cursor-pointer"
                        title="مشاهده جزئیات سفارش"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pending Reviews Widget (4 cols on desktop) */}
        <div className="lg:col-span-4 bg-white rounded-2xl p-6 border border-slate-100 shadow-2xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-base font-bold text-slate-900">
                    نظرات در انتظار تایید
                  </h2>
                  {pendingCount > 0 && (
                    <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-blue-50 text-[#2563eb] border border-blue-100">
                      {toPersianDigits(pendingCount)} جدید
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-500 mt-0.5">
                  بررسی نظرات کاربران
                </p>
              </div>
            </div>

            {/* Reviews Cards List */}
            <div className="py-3 space-y-3">
              {pendingReviews.length === 0 ? (
                <div className="text-center py-8 text-slate-400">
                  <CheckCircle className="w-8 h-8 text-emerald-500 mx-auto mb-2" />
                  <p className="text-xs font-bold text-slate-600">نظر جدیدی در صف بررسی نیست</p>
                </div>
              ) : (
                pendingReviews.map((review) => (
                  <div
                    key={review.id}
                    className="p-3.5 rounded-xl border border-slate-100 bg-slate-50/50 space-y-2.5"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-800">
                        {review.userName}
                      </span>
                      {/* 5 Stars */}
                      <div className="flex items-center gap-0.5 text-amber-400">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`w-3 h-3 ${
                              i < review.rating ? "fill-amber-400" : "text-slate-300"
                            }`}
                          />
                        ))}
                      </div>
                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                      {review.comment}
                    </p>

                    <div className="flex items-center gap-2 pt-1">
                      <Button
                        size="sm"
                        variant="secondary"
                        onClick={() => approveReview(review.id)}
                        className="flex-1"
                      >
                        تایید
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setRejectingReviewId(review.id)}
                        className="flex-1 hover:text-rose-600 hover:border-rose-200"
                      >
                        رد
                      </Button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Footer Action */}
          <Button
            variant="outline"
            size="sm"
            onClick={() => setActiveTab("reviews")}
            className="w-full mt-3"
          >
            مدیریت همه نظرات
          </Button>
        </div>
      </div>

      {/* Reject Review Confirmation Modal */}
      <ConfirmModal
        isOpen={!!rejectingReviewId}
        title="رد نظر کاربر"
        message="آیا از رد کردن این نظر مطمئن هستید؟ با رد کردن، نظر منتشر نخواهد شد و به لیست نظرات رد شده منتقل می‌شود."
        confirmText="بله، رد شود"
        cancelText="انصراف"
        variant="danger"
        onConfirm={handleConfirmReject}
        onCancel={() => setRejectingReviewId(null)}
      />

      {/* Footer copyright */}
      <div className="pt-6 border-t border-slate-200/80 text-center text-xs text-slate-500 font-medium">
        تمامی حقوق برای فروشگاه پویان افزار محفوظ است © ۱۴۰۴
      </div>
    </div>
  );
}
