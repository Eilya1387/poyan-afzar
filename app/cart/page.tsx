"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Trash2,
  Plus,
  Minus,
  Truck,
  ShieldCheck,
  Headphones,
  Lock,
  ChevronLeft,
  Home,
  CheckCircle2,
  Store,
  Tag,
  Package,
  ArrowRight,
} from "lucide-react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { BottomNav } from "@/components/layout/bottom-nav";
import { useCartStore } from "@/lib/cart-store";
import { formatPriceFa, toPersianDigits } from "@/lib/formatters";
import { recommendedCartProducts } from "@/data/products";
import { Product } from "@/types/product";

export default function CartPage() {
  const [mounted, setMounted] = useState(false);
  const [couponInput, setCouponInput] = useState("");
  const [couponStatus, setCouponStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });
  const [addedRecId, setAddedRecId] = useState<string | number | null>(null);

  const {
    items,
    removeItem,
    updateQuantity,
    clearCart,
    applyCoupon,
    removeCoupon,
    couponCode,
    getTotalItems,
    getRawProductTotal,
    getProductDiscount,
    getTotalPrice,
    addItem,
  } = useCartStore();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen flex flex-col bg-[#f8fafc] text-slate-900">
        <Header />
        <main className="flex-1 max-w-[1360px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-12 flex items-center justify-center">
          <div className="text-sm font-bold text-slate-500">در حال بارگذاری سبد خرید...</div>
        </main>
        <Footer />
        <BottomNav />
      </div>
    );
  }

  const totalItems = getTotalItems();
  const rawTotal = getRawProductTotal();
  const discountTotal = getProductDiscount();
  const totalPrice = getTotalPrice();

  // Free shipping threshold logic (e.g. 5,000,000 تومان)
  const FREE_SHIPPING_THRESHOLD = 5000000;
  const remainingForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - totalPrice);
  const freeShippingPercent = Math.min(
    100,
    Math.round((totalPrice / FREE_SHIPPING_THRESHOLD) * 100)
  );

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput.trim()) {
      setCouponStatus({
        type: "error",
        message: "لطفاً کد تخفیف را وارد کنید.",
      });
      return;
    }
    const res = applyCoupon(couponInput);
    if (res.success) {
      setCouponStatus({ type: "success", message: res.message });
      setCouponInput("");
    } else {
      setCouponStatus({ type: "error", message: res.message });
    }
  };

  const handleAddRecommended = (prod: Product) => {
    addItem(prod, 1);
    setAddedRecId(prod.id);
    setTimeout(() => {
      setAddedRecId(null);
    }, 1200);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f8fafc] text-slate-900 pb-16 md:pb-0">
      {/* Top Header */}
      <Header />

      {/* Main Cart Content */}
      <main className="flex-1 max-w-[1360px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        {/* Breadcrumb Navigation */}
        <nav aria-label="مسیر راهنما" className="flex items-center gap-2 text-xs font-medium text-slate-500 mb-4">
          <Link href="/" className="inline-flex items-center gap-1 text-slate-500 hover:text-[#2563eb] transition-colors">
            <Home className="w-3.5 h-3.5" />
            <span>خانه</span>
          </Link>
          <ChevronLeft className="w-3.5 h-3.5 text-slate-300 shrink-0" />
          <span className="text-[#0b1528] font-bold">سبد خرید</span>
        </nav>

        {/* Page Title & Clear Cart Row */}
        <div className="flex items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <h1 className="text-xl sm:text-2xl font-black text-[#0b1528] tracking-tight">
              سبد خرید شما
            </h1>
            <span className="bg-blue-50 text-blue-600 px-3.5 py-1 rounded-full text-xs sm:text-sm font-bold">
              {toPersianDigits(totalItems)} کالا در سبد خرید
            </span>
          </div>

          {items.length > 0 && (
            <button
              type="button"
              onClick={clearCart}
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-rose-500 hover:text-rose-700 transition-colors cursor-pointer"
            >
              <Trash2 className="w-4 h-4" />
              <span>خالی کردن سبد خرید</span>
            </button>
          )}
        </div>

        {items.length === 0 ? (
          /* Empty Cart State */
          <div className="bg-white border border-slate-200/90 rounded-2xl p-12 text-center my-8 shadow-2xs flex flex-col items-center justify-center">
            <div className="w-20 h-20 rounded-3xl bg-blue-50 border border-blue-100 flex items-center justify-center mb-4 text-[#2563eb]">
              <Package className="w-10 h-10 stroke-[1.5]" />
            </div>
            <h2 className="text-lg font-bold text-[#0b1528] mb-1">
              سبد خرید شما خالی است!
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 max-w-sm mb-6">
              می‌توانید برای مشاهده محصولات و کالاهای دیجیتال به فروشگاه سر بزنید.
            </p>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 bg-[#0b1528] text-white text-xs sm:text-sm font-bold px-6 py-3 rounded-xl hover:bg-slate-800 transition-colors shadow-md"
            >
              <span>مشاهده محصولات فروشگاه</span>
              <ArrowRight className="w-4 h-4 rotate-180" />
            </Link>
          </div>
        ) : (
          /* Main 2-Column Grid: Cart Items (Right) + Order Summary Sidebar (Left) */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start mb-12">
            {/* Right Column: Free Shipping Bar + Cart Item Cards + Coupon Box (lg:col-span-8) */}
            <div className="lg:col-span-8 space-y-4">
              {/* Free Shipping Progress Card */}
              <div className="bg-white border border-slate-200/90 rounded-2xl p-4 sm:p-5 shadow-2xs">
                <div className="flex items-center justify-between text-xs sm:text-sm font-bold text-[#0b1528]">
                  <span className="text-slate-500">
                    {toPersianDigits(freeShippingPercent)}٪
                  </span>
                  <div className="flex items-center gap-2">
                    <Truck className="w-4 h-4 text-[#0b1528]" />
                    <span>
                      {remainingForFreeShipping > 0 ? (
                        <>
                          فقط{" "}
                          <strong className="text-[#0b1528] font-black">
                            {formatPriceFa(remainingForFreeShipping)} تومان
                          </strong>{" "}
                          تا ارسال رایگان فاصله دارید
                        </>
                      ) : (
                        <span className="text-emerald-600 font-bold">
                          ارسال سفارش شما کاملاً رایگان شد! 🎉
                        </span>
                      )}
                    </span>
                  </div>
                </div>

                {/* Progress bar track */}
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden mt-3">
                  <div
                    className="bg-[#0b1528] h-full rounded-full transition-all duration-300"
                    style={{ width: `${freeShippingPercent}%` }}
                  />
                </div>
              </div>

              {/* Cart Items Stack */}
              <div className="space-y-3.5">
                {items.map((item) => {
                  const product = item.product;
                  return (
                    <div
                      key={product.id}
                      className="bg-white border border-slate-200/90 rounded-2xl p-4 sm:p-5 shadow-2xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                    >
                      {/* Product Image & Info */}
                      <div className="flex items-start gap-3.5 flex-1 min-w-0">
                        {/* Thumbnail */}
                        <div className="w-20 h-20 sm:w-24 sm:h-24 bg-[#f8fafc] border border-slate-200/70 rounded-xl p-2 shrink-0 flex items-center justify-center relative">
                          <Image
                            src={product.image}
                            alt={product.title}
                            width={80}
                            height={80}
                            className="object-contain max-h-full"
                          />
                        </div>

                        {/* Details */}
                        <div className="space-y-1.5 flex-1 min-w-0">
                          <h3 className="text-xs sm:text-sm font-bold text-[#0b1528] leading-snug">
                            {product.title}
                          </h3>

                          {/* Attributes (Color / Warranty) */}
                          <div className="flex items-center gap-3 text-[11px] sm:text-xs text-slate-500 font-medium flex-wrap">
                            {product.color && (
                              <span>رنگ: {product.color}</span>
                            )}
                            {product.color && product.warranty && (
                              <span className="text-slate-300">|</span>
                            )}
                            {product.warranty && (
                              <span>گارانتی: {product.warranty}</span>
                            )}
                          </div>

                          {/* Seller info */}
                          <div className="flex items-center gap-1.5 text-[11px] sm:text-xs text-slate-500 font-medium">
                            <Store className="w-3.5 h-3.5 text-slate-400" />
                            <span>فروشنده: {product.seller || "تک‌مارکت اکسپرس"}</span>
                          </div>

                          {/* Stock status */}
                          <div className="flex items-center gap-1 text-[11px] sm:text-xs font-bold text-emerald-600">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>{product.deliveryText || "موجود در انبار - ارسال فردا"}</span>
                          </div>
                        </div>
                      </div>

                      {/* Price & Quantity Selector */}
                      <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto gap-3 sm:gap-4 pt-3 sm:pt-0 border-t sm:border-t-0 border-slate-100 shrink-0">
                        {/* Price */}
                        <div className="text-right sm:text-left">
                          {product.originalPrice && product.originalPrice > product.price && (
                            <div className="text-[11px] text-slate-400 line-through font-medium">
                              {formatPriceFa(product.originalPrice)} تومان
                            </div>
                          )}
                          <div className="text-sm sm:text-base font-black text-[#0b1528]">
                            {formatPriceFa(product.price * item.quantity)}
                            <span className="text-[11px] text-slate-500 font-normal mr-1">
                              تومان
                            </span>
                          </div>
                        </div>

                        {/* Quantity Counter + Trash Icon */}
                        <div className="flex items-center gap-2">
                          <div className="flex items-center border border-slate-200/90 rounded-xl bg-slate-50/70 p-0.5">
                            <button
                              type="button"
                              onClick={() => updateQuantity(product.id, item.quantity - 1)}
                              className="w-7 h-7 flex items-center justify-center text-slate-600 hover:text-rose-600 rounded-lg hover:bg-white transition-colors cursor-pointer"
                              aria-label="کاهش تعداد"
                            >
                              <Minus className="w-3.5 h-3.5" />
                            </button>
                            <span className="w-7 text-center text-xs font-black text-[#0b1528]">
                              {toPersianDigits(item.quantity)}
                            </span>
                            <button
                              type="button"
                              onClick={() => updateQuantity(product.id, item.quantity + 1)}
                              className="w-7 h-7 flex items-center justify-center text-slate-600 hover:text-blue-600 rounded-lg hover:bg-white transition-colors cursor-pointer"
                              aria-label="افزایش تعداد"
                            >
                              <Plus className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          <button
                            type="button"
                            onClick={() => removeItem(product.id)}
                            className="w-8 h-8 flex items-center justify-center text-slate-400 hover:text-rose-600 rounded-xl hover:bg-rose-50 transition-colors cursor-pointer"
                            title="حذف کالا"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Coupon / Discount Code Box */}
              <div className="bg-white border border-slate-200/90 rounded-2xl p-4 sm:p-5 shadow-2xs">
                <form onSubmit={handleApplyCoupon} className="flex flex-col sm:flex-row items-stretch gap-2.5">
                  <div className="relative flex-1">
                    <input
                      type="text"
                      value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value)}
                      placeholder="کد تخفیف خود را وارد کنید..."
                      className="w-full bg-slate-50 border border-slate-200/90 rounded-xl py-3 pr-4 pl-4 text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-100"
                    />
                  </div>

                  <button
                    type="submit"
                    className="bg-[#0052cc] hover:bg-blue-700 text-white font-bold text-xs sm:text-sm px-6 py-3 rounded-xl flex items-center justify-center gap-2 shadow-xs cursor-pointer active:scale-98 transition-all shrink-0"
                  >
                    <Tag className="w-4 h-4" />
                    <span>اعمال تخفیف</span>
                  </button>
                </form>

                {couponStatus.message && (
                  <div
                    className={`mt-2.5 text-xs font-semibold ${
                      couponStatus.type === "success"
                        ? "text-emerald-600"
                        : "text-rose-500"
                    }`}
                  >
                    {couponStatus.message}
                  </div>
                )}

                {couponCode && (
                  <div className="mt-2.5 flex items-center justify-between bg-emerald-50 border border-emerald-200 rounded-xl px-3 py-2 text-xs font-bold text-emerald-700">
                    <span>کد فعال: {couponCode}</span>
                    <button
                      type="button"
                      onClick={removeCoupon}
                      className="text-rose-500 hover:text-rose-700 underline text-[11px]"
                    >
                      حذف کد
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Left Column: Order Summary (lg:col-span-4 sticky) */}
            <div className="lg:col-span-4 sticky top-24">
              <div className="bg-white border border-slate-200/90 rounded-2xl p-5 sm:p-6 shadow-2xs space-y-4">
                {/* Title */}
                <h2 className="text-sm sm:text-base font-black text-[#0b1528]">
                  خلاصه وضعیت سفارش
                </h2>

                <div className="h-px bg-slate-100" />

                {/* Subtotals */}
                <div className="space-y-3 text-xs sm:text-sm">
                  {/* Items Total */}
                  <div className="flex items-center justify-between text-slate-600">
                    <span>مبلغ کالاها ({toPersianDigits(totalItems)} کالا)</span>
                    <span className="font-bold text-slate-800">
                      {formatPriceFa(rawTotal)} تومان
                    </span>
                  </div>

                  {/* Product Discount */}
                  <div className="flex items-center justify-between text-emerald-600 font-bold">
                    <span>تخفیف محصولات</span>
                    <span>
                      {discountTotal > 0 ? `${formatPriceFa(discountTotal)}- تومان` : "۰ تومان"}
                    </span>
                  </div>

                  {/* Shipping Fee */}
                  <div className="flex items-center justify-between text-slate-600">
                    <span>هزینه ارسال</span>
                    <span className="font-bold text-slate-800">رایگان</span>
                  </div>
                </div>

                <div className="h-px bg-slate-100" />

                {/* Final Total */}
                <div className="flex items-center justify-between text-xs sm:text-sm">
                  <span className="font-bold text-slate-700">مبلغ قابل پرداخت</span>
                  <div className="text-left">
                    <span className="text-base sm:text-lg font-black text-[#0b1528]">
                      {formatPriceFa(totalPrice)}
                    </span>
                    <span className="text-xs text-slate-500 font-medium mr-1">
                      تومان
                    </span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-2.5 pt-2">
                  <button
                    type="button"
                    onClick={() => alert("در حال انتقال به درگاه پرداخت شاپرک...")}
                    className="w-full bg-[#1d63ea] hover:bg-blue-700 text-white font-bold py-3.5 px-4 rounded-xl text-xs sm:text-sm flex items-center justify-center shadow-md cursor-pointer transition-all active:scale-98"
                  >
                    ادامه و ثبت سفارش
                  </button>

                  <Link
                    href="/products"
                    className="w-full border border-slate-200 bg-slate-50/70 hover:bg-slate-100 text-slate-700 py-3 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center cursor-pointer transition-colors text-center"
                  >
                    ادامه خرید
                  </Link>
                </div>

                {/* Trust & Guarantee Badges */}
                <div className="border-t border-slate-100 pt-4 space-y-2.5 text-[11px] sm:text-xs text-slate-500 font-medium">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0" />
                    <span>ضمانت اصالت کالا و ۷ روز مهلت بازگشت</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Headphones className="w-4 h-4 text-blue-600 shrink-0" />
                    <span>پشتیبانی ۲۴ ساعته در ۷ روز هفته</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Lock className="w-4 h-4 text-blue-600 shrink-0" />
                    <span>پرداخت امن و رمزنگاری شده</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Recommended Products Carousel / Section ("محصولات پیشنهادی برای شما") */}
        <section className="mt-8 mb-12">
          {/* Section Header */}
          <div className="flex items-center gap-2 mb-4">
            <Package className="w-5 h-5 text-[#2563eb]" />
            <h2 className="text-base sm:text-lg font-black text-[#0b1528]">
              محصولات پیشنهادی برای شما
            </h2>
          </div>

          {/* 3 Recommended Items Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
            {recommendedCartProducts.map((prod) => {
              const isJustAdded = addedRecId === prod.id;
              return (
                <div
                  key={prod.id}
                  className="bg-white border border-slate-200/90 rounded-2xl p-4 sm:p-5 shadow-2xs flex flex-col justify-between"
                >
                  <div>
                    {/* Image */}
                    <div className="relative w-full aspect-4/3 bg-[#f8fafc] rounded-xl overflow-hidden flex items-center justify-center p-3 mb-3">
                      <Image
                        src={prod.image}
                        alt={prod.title}
                        fill
                        sizes="(max-width: 640px) 100vw, 33vw"
                        className="object-contain"
                      />
                    </div>

                    {/* Title */}
                    <h3 className="text-xs sm:text-sm font-bold text-slate-800 leading-snug line-clamp-2 min-h-[38px] mb-2 text-center">
                      {prod.title}
                    </h3>

                    {/* Price */}
                    <div className="text-center text-xs sm:text-sm font-black text-[#0b1528] mb-4">
                      {formatPriceFa(prod.price)} تومان
                    </div>
                  </div>

                  {/* Add to Cart Button */}
                  <button
                    type="button"
                    onClick={() => handleAddRecommended(prod)}
                    className={`w-full py-2.5 px-3 rounded-xl border text-xs sm:text-sm font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                      isJustAdded
                        ? "bg-emerald-600 text-white border-emerald-600 shadow-xs"
                        : "border-slate-200 bg-white hover:bg-slate-50 text-slate-700"
                    }`}
                  >
                    {isJustAdded ? (
                      <>
                        <CheckCircle2 className="w-4 h-4" />
                        <span>افزوده شد</span>
                      </>
                    ) : (
                      <>
                        <span>+ افزودن به سبد</span>
                      </>
                    )}
                  </button>
                </div>
              );
            })}
          </div>
        </section>
      </main>

      {/* Footer & Bottom Navigation */}
      <Footer />
      <BottomNav />
    </div>
  );
}