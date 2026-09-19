"use client";

import React, { useState, useMemo } from "react";
import { useAdminStore } from "@/lib/admin-store";
import { formatPriceFa, toPersianDigits } from "@/lib/formatters";
import { AdminProduct } from "@/types/admin";
import { Button } from "@/components/ui/button";
import {
  Warehouse,
  Search,
  Plus,
  Minus,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Edit,
  Package,
  Layers,
  ArrowUpRight,
  TrendingDown,
  X,
  Save,
} from "lucide-react";

export function InventoryView() {
  const products = useAdminStore((state) => state.products);
  const updateStock = useAdminStore((state) => state.updateStock);
  const quickAdjustStock = useAdminStore((state) => state.quickAdjustStock);
  const categories = useAdminStore((state) => state.categories);

  // States
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState<"all" | "low" | "out">("all");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [editingProduct, setEditingProduct] = useState<AdminProduct | null>(null);
  const [newStockInput, setNewStockInput] = useState<number>(0);
  const [newThresholdInput, setNewThresholdInput] = useState<number>(3);

  // Statistics
  const totalStockCount = products.reduce((sum, p) => sum + p.stock, 0);
  const lowStockCount = products.filter((p) => p.stock > 0 && p.stock <= p.minStockThreshold).length;
  const outOfStockCount = products.filter((p) => p.stock === 0).length;
  const totalInventoryValue = products.reduce((sum, p) => sum + p.price * p.stock, 0);

  // Open Edit Modal
  const handleOpenEdit = (p: AdminProduct) => {
    setEditingProduct(p);
    setNewStockInput(p.stock);
    setNewThresholdInput(p.minStockThreshold || 3);
  };

  const handleSaveStock = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;
    updateStock(editingProduct.id, Number(newStockInput));
    setEditingProduct(null);
  };

  // Filtered Products
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchSearch =
        p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (p.enTitle && p.enTitle.toLowerCase().includes(searchTerm.toLowerCase()));

      if (!matchSearch) return false;
      if (selectedCategory !== "all" && p.category !== selectedCategory) return false;

      if (filterType === "low") {
        return p.stock > 0 && p.stock <= p.minStockThreshold;
      }
      if (filterType === "out") {
        return p.stock === 0;
      }
      return true;
    });
  }, [products, searchTerm, filterType, selectedCategory]);

  return (
    <div className="space-y-6 select-none animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            مدیریت موجودی انبار
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 font-medium">
            پایش موجودی کالاها، شارژ سریع انبار و تنظیم حد هشدار اتمام کالا
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500">کل اقلام در انبار</span>
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <Warehouse className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-1.5">
            <span className="text-2xl font-black text-slate-900">
              {toPersianDigits(totalStockCount)}
            </span>
            <span className="text-xs text-slate-400 font-bold">عدد کالا</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500">کالاهای رو به اتمام</span>
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <AlertTriangle className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-1.5">
            <span className="text-2xl font-black text-amber-600">
              {toPersianDigits(lowStockCount)}
            </span>
            <span className="text-xs text-slate-400 font-bold">مدل کالا</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500">کالاهای ناموجود</span>
            <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center">
              <XCircle className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-1.5">
            <span className="text-2xl font-black text-rose-600">
              {toPersianDigits(outOfStockCount)}
            </span>
            <span className="text-xs text-slate-400 font-bold">مدل کالا</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500">ارزش ریالی موجودی انبار</span>
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <ArrowUpRight className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-1.5">
            <span className="text-xl font-black text-slate-900">
              {formatPriceFa(totalInventoryValue)}
            </span>
            <span className="text-xs text-slate-400 font-bold">تومان</span>
          </div>
        </div>
      </div>

      {/* Filter Tabs & Search */}
      <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-2xs space-y-3">
        <div className="flex flex-col md:flex-row items-center justify-between gap-3">
          {/* Tabs */}
          <div className="flex items-center gap-1.5 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
            {[
              { id: "all", label: "همه کالاها", count: products.length },
              { id: "low", label: "نیازمند شارژ (رو به اتمام)", count: lowStockCount },
              { id: "out", label: "ناموجود", count: outOfStockCount },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setFilterType(tab.id as "all" | "low" | "out")}
                className={`px-3 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
                  filterType === tab.id
                    ? "bg-[#2563eb] text-white shadow-xs"
                    : "bg-slate-50 hover:bg-slate-100 text-slate-600"
                }`}
              >
                <span>{tab.label}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                    filterType === tab.id
                      ? "bg-white/20 text-white"
                      : "bg-slate-200 text-slate-700"
                  }`}
                >
                  {toPersianDigits(tab.count)}
                </span>
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 w-full md:w-auto">
            {/* Category */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            >
              <option value="all">همه دسته‌ها</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>

            {/* Search */}
            <div className="relative w-full md:w-64">
              <Search className="w-4 h-4 absolute inset-y-0 right-3 my-auto text-slate-400 pointer-events-none" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="جستجو در انبار..."
                className="w-full pr-9 pl-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Inventory Table */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-right text-xs">
            <thead>
              <tr className="bg-slate-50/80 text-slate-500 font-bold border-b border-slate-100">
                <th className="py-3.5 px-4">کالا</th>
                <th className="py-3.5 px-4">دسته‌بندی</th>
                <th className="py-3.5 px-4">قیمت واحد</th>
                <th className="py-3.5 px-4 text-center">موجودی فعلی</th>
                <th className="py-3.5 px-4 text-center">تغییر سریع</th>
                <th className="py-3.5 px-4 text-center">حد هشدار</th>
                <th className="py-3.5 px-4 text-center">وضعیت انبار</th>
                <th className="py-3.5 px-4 text-center">عملیات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-slate-400">
                    <Warehouse className="w-10 h-10 mx-auto mb-2 text-slate-300" />
                    <p className="font-bold text-sm text-slate-600">کالایی یافت نشد</p>
                  </td>
                </tr>
              ) : (
                filteredProducts.map((p) => {
                  const isLow = p.stock > 0 && p.stock <= p.minStockThreshold;
                  const isOut = p.stock === 0;

                  return (
                    <tr
                      key={p.id}
                      className="hover:bg-slate-50/70 transition-colors font-medium text-slate-700"
                    >
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-11 h-11 rounded-xl bg-slate-100 border border-slate-200 overflow-hidden shrink-0">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={p.image}
                              alt={p.title}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div>
                            <h4 className="font-bold text-slate-900 line-clamp-1">{p.title}</h4>
                            <span className="text-[11px] text-slate-400">{p.brandFa || p.brand}</span>
                          </div>
                        </div>
                      </td>

                      <td className="py-3 px-4 font-bold text-slate-600">
                        {p.categoryName || p.category}
                      </td>

                      <td className="py-3 px-4 font-black text-slate-900">
                        {formatPriceFa(p.price)} تومان
                      </td>

                      <td className="py-3 px-4 text-center">
                        <span
                          className={`font-black text-sm px-3 py-1 rounded-xl ${
                            isOut
                              ? "bg-rose-50 text-rose-600 border border-rose-100"
                              : isLow
                              ? "bg-amber-50 text-amber-700 border border-amber-100"
                              : "bg-slate-100 text-slate-800"
                          }`}
                        >
                          {toPersianDigits(p.stock)}
                        </span>
                      </td>

                      <td className="py-3 px-4 text-center">
                        <div className="inline-flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
                          <button
                            onClick={() => quickAdjustStock(p.id, 1)}
                            className="p-1 rounded-lg bg-white hover:bg-emerald-50 text-emerald-600 shadow-2xs transition-colors cursor-pointer"
                            title="افزایش ۱ عدد"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => quickAdjustStock(p.id, -1)}
                            disabled={p.stock === 0}
                            className="p-1 rounded-lg bg-white hover:bg-rose-50 text-rose-600 shadow-2xs transition-colors disabled:opacity-40 cursor-pointer"
                            title="کاهش ۱ عدد"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>

                      <td className="py-3 px-4 text-center font-bold text-slate-500">
                        {toPersianDigits(p.minStockThreshold)} عدد
                      </td>

                      <td className="py-3 px-4 text-center">
                        {isOut ? (
                          <span className="font-semibold text-rose-600">ناموجود</span>
                        ) : isLow ? (
                          <span className="font-semibold text-amber-600">رو به اتمام</span>
                        ) : (
                          <span className="font-semibold text-emerald-600">موجود</span>
                        )}
                      </td>

                      <td className="py-3 px-4 text-center">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleOpenEdit(p)}
                        >
                          شارژ / ویرایش
                        </Button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit Stock Modal */}
      {editingProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fade-in">
          <div
            className="w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h3 className="text-base font-black text-slate-900">
                  شارژ و ویرایش موجودی انبار
                </h3>
                <p className="text-xs text-slate-500 mt-0.5 line-clamp-1">
                  {editingProduct.title}
                </p>
              </div>
              <button
                onClick={() => setEditingProduct(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveStock} className="p-6 space-y-4 text-xs">
              <div>
                <label className="block text-slate-700 font-bold mb-1.5">
                  تعداد موجودی جدید در انبار *
                </label>
                <input
                  type="number"
                  min="0"
                  required
                  value={newStockInput}
                  onChange={(e) => setNewStockInput(Number(e.target.value))}
                  className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-black text-slate-900 text-sm"
                />
              </div>

              {/* Quick Add Presets */}
              <div className="space-y-1.5">
                <span className="text-[11px] text-slate-500 font-bold">شارژ سریع افزایشی:</span>
                <div className="flex items-center gap-2">
                  {[+5, +10, +20, +50].map((delta) => (
                    <button
                      type="button"
                      key={delta}
                      onClick={() => setNewStockInput((prev) => prev + delta)}
                      className="flex-1 py-1.5 bg-slate-50 hover:bg-blue-50 text-slate-700 hover:text-blue-600 border border-slate-200 rounded-xl font-bold text-xs transition-colors cursor-pointer"
                    >
                      {delta}+ عدد
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3">
                <Button
                  type="button"
                  variant="ghost"
                  size="md"
                  onClick={() => setEditingProduct(null)}
                >
                  انصراف
                </Button>
                <Button
                  type="submit"
                  variant="secondary"
                  size="md"
                  rightIcon={<Save className="w-3.5 h-3.5" />}
                >
                  ذخیره موجودی
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
