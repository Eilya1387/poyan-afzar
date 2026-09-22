"use client";

import React, { useState } from "react";
import { useAdminStore } from "@/lib/admin-store";
import { formatPriceFa, toPersianDigits } from "@/lib/formatters";
import { AdminDiscount, DiscountType } from "@/types/admin";
import { ConfirmModal } from "./confirm-modal";
import { Button } from "@/components/ui/button";
import { PersianDatePicker } from "@/components/ui/persian-date-picker";
import {
  Tag,
  Plus,
  Trash2,
  Calendar,
  Sparkles,
  ShoppingBag,
  Ticket,
  ArrowRightLeft,
  X,
} from "lucide-react";

export function DiscountsView() {
  const discounts = useAdminStore((state) => state.discounts);
  const products = useAdminStore((state) => state.products);
  const addDiscount = useAdminStore((state) => state.addDiscount);
  const deleteDiscount = useAdminStore((state) => state.deleteDiscount);
  const toggleDiscount = useAdminStore((state) => state.toggleDiscount);

  // States
  const [activeTab, setActiveTab] = useState<"product" | "coupon">("product");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deletingDiscountId, setDeletingDiscountId] = useState<string | null>(null);

  // Form State
  const [discountType, setDiscountType] = useState<"product" | "coupon">("product");
  const [title, setTitle] = useState("");
  const [selectedProductId, setSelectedProductId] = useState<string>(products[0]?.id || "");
  const [code, setCode] = useState("");
  const [percent, setPercent] = useState<number>(10);
  const [amount, setAmount] = useState<number>(0);
  const [maxUsage, setMaxUsage] = useState<number>(100);
  const [startDate, setStartDate] = useState("۱۴۰۴/۰۱/۰۱");
  const [endDate, setEndDate] = useState("۱۴۰۴/۰۱/۱۵");

  // Current selected product for calculations
  const currentProduct = products.find((p) => p.id === selectedProductId) || products[0];
  const productPrice = currentProduct ? currentProduct.price : 0;

  // Auto-calculation logic between Amount and Percent
  const handlePercentChange = (val: string) => {
    const num = Number(val) || 0;
    setPercent(num);
    if (productPrice > 0) {
      const calcAmount = Math.round((productPrice * num) / 100);
      setAmount(calcAmount);
    }
  };

  const handleAmountChange = (val: string) => {
    const num = Number(val) || 0;
    setAmount(num);
    if (productPrice > 0) {
      const calcPercent = Math.round((num / productPrice) * 100);
      setPercent(calcPercent);
    }
  };

  // When selected product changes, recalculate
  const handleProductSelect = (prodId: string) => {
    setSelectedProductId(prodId);
    const prod = products.find((p) => p.id === prodId);
    if (prod && percent > 0) {
      const calcAmount = Math.round((prod.price * percent) / 100);
      setAmount(calcAmount);
    }
  };

  // Open modal for Product Discount
  const handleOpenProductDiscount = () => {
    setDiscountType("product");
    setTitle("تخفیف شگفت‌انگیز");
    setSelectedProductId(products[0]?.id || "");
    const initialPercent = 15;
    setPercent(initialPercent);
    if (products[0]) {
      setAmount(Math.round((products[0].price * initialPercent) / 100));
    }
    setStartDate("۱۴۰۴/۰۱/۰۱");
    setEndDate("۱۴۰۴/۰۱/۲۵");
    setIsModalOpen(true);
  };

  // Open modal for Coupon Code
  const handleOpenCouponDiscount = () => {
    setDiscountType("coupon");
    setTitle("کد تخفیف ویژه عید");
    setCode("TAK1404");
    setPercent(10);
    setAmount(100000);
    setMaxUsage(50);
    setStartDate("۱۴۰۴/۰۱/۰۱");
    setEndDate("۱۴۰۴/۰۱/۳۰");
    setIsModalOpen(true);
  };

  // Submit discount
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const dType: DiscountType = percent > 0 ? "percentage" : "fixed";

    addDiscount({
      title,
      type: dType,
      code: discountType === "coupon" ? code.toUpperCase() : undefined,
      productId: discountType === "product" ? selectedProductId : undefined,
      productTitle: discountType === "product" ? currentProduct?.title : undefined,
      percent: percent || 0,
      amount: amount || 0,
      originalPrice: discountType === "product" ? productPrice : undefined,
      finalPrice: discountType === "product" ? Math.max(0, productPrice - amount) : undefined,
      maxUsage: discountType === "coupon" ? maxUsage : undefined,
      startDate,
      endDate,
      isActive: true,
    });

    setIsModalOpen(false);
  };

  const productDiscounts = discounts.filter((d) => !d.code && (d.productId || d.productTitle));
  const couponDiscounts = discounts.filter((d) => !!d.code);

  const displayedDiscounts = activeTab === "product" ? productDiscounts : couponDiscounts;

  return (
    <div className="space-y-6 select-none animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            مدیریت جشنواره‌ها و تخفیف‌ها
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 font-medium">
            اعمال تخفیف روی کالاها (با محاسبه هوشمند درصد و تومان)، تاریخ انقضا و کدهای تخفیف سبد خرید
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant="secondary"
            onClick={handleOpenProductDiscount}
            rightIcon={<Tag className="w-4 h-4" />}
          >
            تخفیف روی محصول
          </Button>
          <Button
            size="sm"
            variant="primary"
            onClick={handleOpenCouponDiscount}
            rightIcon={<Ticket className="w-4 h-4" />}
          >
            ساخت کد تخفیف
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-3">
        <button
          onClick={() => setActiveTab("product")}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
            activeTab === "product"
              ? "bg-[#2563eb] text-white shadow-xs"
              : "bg-white text-slate-600 hover:bg-slate-50 border border-slate-200/70"
          }`}
        >
          <Tag className="w-4 h-4" />
          <span>تخفیف‌های کالایی</span>
          <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-white/20">
            {toPersianDigits(productDiscounts.length)}
          </span>
        </button>

        <button
          onClick={() => setActiveTab("coupon")}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
            activeTab === "coupon"
              ? "bg-purple-600 text-white shadow-xs"
              : "bg-white text-slate-600 hover:bg-slate-50 border border-slate-200/70"
          }`}
        >
          <Ticket className="w-4 h-4" />
          <span>کدهای تخفیف (کوپن‌ها)</span>
          <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-white/20">
            {toPersianDigits(couponDiscounts.length)}
          </span>
        </button>
      </div>

      {/* Discounts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {displayedDiscounts.length === 0 ? (
          <div className="col-span-full py-16 text-center bg-white rounded-2xl border border-slate-100">
            <Sparkles className="w-10 h-10 mx-auto mb-2 text-slate-300" />
            <p className="font-bold text-slate-700 text-sm">هیچ تخفیفی در این بخش ثبت نشده است</p>
            <p className="text-xs text-slate-400 mt-1">
              با دکمه‌های بالا تخفیف جدید ایجاد کنید
            </p>
          </div>
        ) : (
          displayedDiscounts.map((discount) => (
            <div
              key={discount.id}
              className={`bg-white rounded-2xl border p-5 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between space-y-4 ${
                discount.isActive ? "border-slate-100" : "border-slate-200 opacity-60 bg-slate-50/50"
              }`}
            >
              <div>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2.5">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center font-black text-sm ${
                        !discount.code
                          ? "bg-rose-50 text-rose-600"
                          : "bg-purple-50 text-purple-600"
                      }`}
                    >
                      {discount.percent ? `%${toPersianDigits(discount.percent)}` : <Tag className="w-5 h-5" />}
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 text-sm">{discount.title}</h3>
                      {discount.code && (
                        <span
                          className="inline-block px-2 py-0.5 mt-1 bg-purple-50 text-purple-700 border border-purple-200 rounded-md font-mono text-xs font-bold"
                          dir="ltr"
                        >
                          {discount.code}
                        </span>
                      )}
                    </div>
                  </div>

                  <button
                    onClick={() => setDeletingDiscountId(discount.id)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                {/* Target Product / Rules */}
                {!discount.code && discount.productTitle && (
                  <div className="mt-3 p-2.5 bg-slate-50 rounded-xl border border-slate-100 flex items-center gap-2">
                    <ShoppingBag className="w-4 h-4 text-blue-600 shrink-0" />
                    <span className="text-xs text-slate-700 font-bold line-clamp-1">
                      {discount.productTitle}
                    </span>
                  </div>
                )}

                {discount.amount > 0 && (
                  <p className="text-xs text-slate-600 font-medium mt-2">
                    مبلغ تخفیف: <span className="font-bold text-slate-900">{formatPriceFa(discount.amount)} تومان</span>
                  </p>
                )}

                <div className="mt-3 flex items-center gap-4 text-xs text-slate-500">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    <span>انقضا: {discount.endDate}</span>
                  </div>
                  {discount.maxUsage && (
                    <span>
                      استفاده: {toPersianDigits(discount.usageCount || 0)} / {toPersianDigits(discount.maxUsage)}
                    </span>
                  )}
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                {discount.isActive ? (
                  <span className="text-xs font-semibold text-emerald-600">فعال</span>
                ) : (
                  <span className="text-xs font-medium text-slate-400">غیرفعال</span>
                )}

                <button
                  onClick={() => toggleDiscount(discount.id)}
                  className="text-xs font-bold text-blue-600 hover:text-blue-800 transition-colors cursor-pointer"
                >
                  {discount.isActive ? "غیرفعال‌سازی" : "فعال‌سازی"}
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Add Discount Modal (with 2-Way Realtime Calculation) */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fade-in">
          <div
            className="w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-100 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50 rounded-t-3xl">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-blue-600" />
                <h3 className="text-base font-black text-slate-900">
                  {discountType === "product" ? "تعریف تخفیف روی محصول" : "تعریف کد تخفیف سبد خرید"}
                </h3>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
              <div>
                <label className="block text-slate-700 font-bold mb-1.5">عنوان تخفیف / مناسبت *</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="مثال: فروش ویژه نوروزی"
                  className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-800"
                />
              </div>

              {discountType === "coupon" ? (
                <>
                  <div>
                    <label className="block text-slate-700 font-bold mb-1.5">کد تخفیف (Coupon Code) *</label>
                    <input
                      type="text"
                      required
                      value={code}
                      onChange={(e) => setCode(e.target.value)}
                      placeholder="مثال: OFF50"
                      className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-mono text-slate-900 uppercase font-black"
                      dir="ltr"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-slate-700 font-bold mb-1.5">درصد تخفیف (%)</label>
                      <input
                        type="number"
                        min="1"
                        max="100"
                        value={percent}
                        onChange={(e) => setPercent(Number(e.target.value))}
                        placeholder="10"
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-bold"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-700 font-bold mb-1.5">سقف تعداد استفاده</label>
                      <input
                        type="number"
                        value={maxUsage}
                        onChange={(e) => setMaxUsage(Number(e.target.value))}
                        placeholder="100"
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-bold"
                      />
                    </div>
                  </div>
                </>
              ) : (
                <>
                  {/* Product selector */}
                  <div>
                    <label className="block text-slate-700 font-bold mb-1.5">انتخاب محصول مورد نظر *</label>
                    <select
                      value={selectedProductId}
                      onChange={(e) => handleProductSelect(e.target.value)}
                      className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-800"
                    >
                      {products.map((p) => (
                        <option key={p.id} value={p.id}>
                          {p.title} - ({formatPriceFa(p.price)} تومان)
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* 2-Way Calculator Box */}
                  <div className="p-4 bg-blue-50/60 rounded-2xl border border-blue-100 space-y-3">
                    <div className="flex items-center justify-between text-blue-900 font-bold">
                      <span className="flex items-center gap-1.5">
                        <ArrowRightLeft className="w-4 h-4 text-blue-600" />
                        محاسبه‌گر دوطرفه تخفیف
                      </span>
                      <span className="text-[11px] text-blue-700">
                        قیمت پایه: {formatPriceFa(productPrice)} تومان
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-slate-700 font-bold mb-1 text-[11px]">
                          درصد تخفیف (%)
                        </label>
                        <input
                          type="number"
                          min="1"
                          max="99"
                          value={percent}
                          onChange={(e) => handlePercentChange(e.target.value)}
                          placeholder="مثال: ۱۵"
                          className="w-full px-3 py-2 bg-white border border-blue-200 rounded-xl font-black text-slate-900 text-center"
                        />
                      </div>

                      <div>
                        <label className="block text-slate-700 font-bold mb-1 text-[11px]">
                          مقدار تخفیف (تومان)
                        </label>
                        <input
                          type="number"
                          value={amount}
                          onChange={(e) => handleAmountChange(e.target.value)}
                          placeholder="مثال: ۵۰۰۰۰۰"
                          className="w-full px-3 py-2 bg-white border border-blue-200 rounded-xl font-black text-slate-900 text-center"
                        />
                      </div>
                    </div>

                    {/* Result calculation preview */}
                    {productPrice > 0 && amount > 0 && (
                      <div className="pt-2 border-t border-blue-200/60 flex items-center justify-between text-xs">
                        <span className="text-slate-600 font-bold">قیمت پس از تخفیف:</span>
                        <span className="font-black text-emerald-600 text-sm">
                          {formatPriceFa(Math.max(0, productPrice - amount))} تومان
                        </span>
                      </div>
                    )}
                  </div>
                </>
              )}

              {/* Dates with Persian Calendar */}
              <div className="grid grid-cols-2 gap-3">
                <PersianDatePicker
                  label="تاریخ شروع"
                  value={startDate}
                  onChange={setStartDate}
                  placeholder="۱۴۰۵/۰۱/۰۱"
                />
                <PersianDatePicker
                  label="تاریخ انقضا"
                  value={endDate}
                  onChange={setEndDate}
                  placeholder="۱۴۰۵/۰۱/۳۰"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3">
                <Button
                  type="button"
                  variant="ghost"
                  size="md"
                  onClick={() => setIsModalOpen(false)}
                >
                  انصراف
                </Button>
                <Button
                  type="submit"
                  variant="secondary"
                  size="md"
                >
                  ثبت و اعمال تخفیف
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={!!deletingDiscountId}
        title="حذف تخفیف"
        message="آیا از حذف این مورد تخفیف اطمینان دارید؟ در صورت حذف، قیمت کالا به حالت اولیه بازمی‌گردد."
        confirmText="بله، حذف شود"
        variant="danger"
        onConfirm={() => {
          if (deletingDiscountId) {
            deleteDiscount(deletingDiscountId);
            setDeletingDiscountId(null);
          }
        }}
        onCancel={() => setDeletingDiscountId(null)}
      />
    </div>
  );
}
