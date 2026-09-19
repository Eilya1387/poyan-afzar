"use client";

import React, { useState } from "react";
import { useAdminStore } from "@/lib/admin-store";
import { formatPriceFa, toPersianDigits } from "@/lib/formatters";
import { Button } from "@/components/ui/button";
import {
  BarChart3,
  TrendingUp,
  DollarSign,
  ShoppingBag,
  Download,
  Calendar,
  Layers,
  ArrowUpRight,
  Sparkles,
} from "lucide-react";

export function ReportsView() {
  const salesChart = useAdminStore((state) => state.salesChart);
  const orders = useAdminStore((state) => state.orders);
  const products = useAdminStore((state) => state.products);

  const [dateRange, setDateRange] = useState("7days");
  const [downloadNotice, setDownloadNotice] = useState<string | null>(null);

  // Calculations
  const totalRevenue = orders.reduce((sum, o) => (o.shippingStatus !== "cancelled" ? sum + o.amount : sum), 0);
  const totalOrdersCount = orders.length;
  const avgOrderValue = totalOrdersCount > 0 ? Math.round(totalRevenue / totalOrdersCount) : 0;
  const maxSales = Math.max(...salesChart.map((d) => d.amount), 1);

  const handleExport = (type: "excel" | "pdf") => {
    setDownloadNotice(`گزارش مالی و فروش در قالب فایل ${type.toUpperCase()} با موفقیت آماده و دانلود شد.`);
    setTimeout(() => {
      setDownloadNotice(null);
    }, 4000);
  };

  // Category breakdown
  const categorySales = [
    { name: "کارت گرافیک و پردازنده", count: 18, revenue: 142000000, percent: 45 },
    { name: "مانیتور و نمایشگر", count: 12, revenue: 86500000, percent: 28 },
    { name: "لوازم جانبی و گیمینگ", count: 34, revenue: 54000000, percent: 17 },
    { name: "حافظه رم و SSD", count: 22, revenue: 31500000, percent: 10 },
  ];

  return (
    <div className="space-y-6 select-none animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            گزارشات و آنالیز فروش
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 font-medium">
            نمودارهای تحلیلی، میزان درآمد، میانگین فاکتور و خروجی گزارش مالی
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant="secondary"
            onClick={() => handleExport("excel")}
            rightIcon={<Download className="w-4 h-4" />}
          >
            خروجی Excel
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => handleExport("pdf")}
            rightIcon={<Download className="w-4 h-4" />}
          >
            خروجی PDF
          </Button>
        </div>
      </div>

      {downloadNotice && (
        <div className="p-4 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-2xl text-xs font-bold flex items-center justify-between animate-fade-in">
          <span>{downloadNotice}</span>
          <button
            onClick={() => setDownloadNotice(null)}
            className="text-emerald-700 hover:text-emerald-900"
          >
            ✕
          </button>
        </div>
      )}

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500">درآمد کل ناخالص</span>
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <DollarSign className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-1.5">
            <span className="text-2xl font-black text-slate-900">
              {formatPriceFa(totalRevenue)}
            </span>
            <span className="text-xs text-slate-400 font-bold">تومان</span>
          </div>
          <div className="mt-2 text-[11px] text-emerald-600 font-bold flex items-center gap-1">
            <ArrowUpRight className="w-3.5 h-3.5" />
            <span>۱۲٪ رشد نسبت به هفته گذشته</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500">میانگین ارزش هر سفارش (AOV)</span>
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <TrendingUp className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-1.5">
            <span className="text-2xl font-black text-slate-900">
              {formatPriceFa(avgOrderValue)}
            </span>
            <span className="text-xs text-slate-400 font-bold">تومان</span>
          </div>
          <div className="mt-2 text-[11px] text-blue-600 font-bold">
            میانگین سبد خرید کاربران فروشگاه
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500">تعداد کل سفارشات ثبت‌شده</span>
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
              <ShoppingBag className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-1.5">
            <span className="text-2xl font-black text-slate-900">
              {toPersianDigits(totalOrdersCount)}
            </span>
            <span className="text-xs text-slate-400 font-bold">سفارش</span>
          </div>
          <div className="mt-2 text-[11px] text-slate-500 font-bold">
            {toPersianDigits(orders.filter((o) => o.shippingStatus === "delivered").length)} سفارش تحویل موفق
          </div>
        </div>
      </div>

      {/* Main Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Weekly Revenue Bar Chart */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-5 border border-slate-100 shadow-2xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-black text-slate-900">نمودار روند فروش روزانه</h3>
              <p className="text-xs text-slate-400 mt-0.5">بررسی حجم فروش در ۷ روز اخیر</p>
            </div>

            <div className="flex items-center gap-1 bg-slate-50 p-1 rounded-xl border border-slate-200">
              <button
                onClick={() => setDateRange("7days")}
                className={`px-3 py-1 text-xs font-bold rounded-lg transition-colors ${
                  dateRange === "7days" ? "bg-white shadow-2xs text-blue-600" : "text-slate-500"
                }`}
              >
                ۷ روزه
              </button>
              <button
                onClick={() => setDateRange("30days")}
                className={`px-3 py-1 text-xs font-bold rounded-lg transition-colors ${
                  dateRange === "30days" ? "bg-white shadow-2xs text-blue-600" : "text-slate-500"
                }`}
              >
                ۳۰ روزه
              </button>
            </div>
          </div>

          {/* Visual Chart */}
          <div className="h-64 flex items-end justify-between gap-3 pt-8 pb-4 px-2">
            {salesChart.map((d, index) => {
              const heightPercent = Math.round((d.amount / maxSales) * 100);
              const isHighest = d.amount === maxSales;

              return (
                <div key={index} className="flex-1 flex flex-col items-center h-full justify-end group">
                  <div className="text-[11px] font-bold text-slate-400 mb-2 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    {formatPriceFa(d.amount)} ت
                  </div>

                  <div className="w-full max-w-[42px] bg-slate-100 rounded-t-xl overflow-hidden relative flex items-end h-full">
                    <div
                      style={{ height: `${Math.max(12, heightPercent)}%` }}
                      className={`w-full transition-all duration-500 rounded-t-xl group-hover:brightness-95 ${
                        isHighest ? "bg-[#2563eb]" : "bg-blue-400/80"
                      }`}
                    />
                  </div>

                  <span className="text-[11px] font-bold text-slate-600 mt-2.5">{d.dayName}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Categories Breakdown */}
        <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-2xs space-y-4">
          <div>
            <h3 className="text-base font-black text-slate-900">سهم فروش دسته‌بندی‌ها</h3>
            <p className="text-xs text-slate-400 mt-0.5">تفکیک درآمد حاصله بر اساس گروه کالا</p>
          </div>

          <div className="space-y-4 pt-2">
            {categorySales.map((cat, idx) => (
              <div key={idx} className="space-y-1.5 text-xs">
                <div className="flex items-center justify-between font-bold">
                  <span className="text-slate-800">{cat.name}</span>
                  <span className="text-slate-900">%{toPersianDigits(cat.percent)}</span>
                </div>

                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div
                    style={{ width: `${cat.percent}%` }}
                    className={`h-full rounded-full ${
                      idx === 0
                        ? "bg-blue-600"
                        : idx === 1
                        ? "bg-emerald-500"
                        : idx === 2
                        ? "bg-purple-500"
                        : "bg-amber-500"
                    }`}
                  />
                </div>

                <div className="flex items-center justify-between text-[11px] text-slate-400">
                  <span>{toPersianDigits(cat.count)} قلم فروخته شده</span>
                  <span>{formatPriceFa(cat.revenue)} تومان</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
