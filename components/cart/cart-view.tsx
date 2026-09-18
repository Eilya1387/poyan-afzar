"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Trash2,
  Plus,
  Minus,
  Truck,
  ShieldCheck,
  Headphones,
  Lock,
  Tag,
  ShoppingBag,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/lib/store";
import { CheckoutModal } from "./checkout-modal";

const suggestedProducts = [
  {
    id: "logitech-ergonomic-mouse",
    title: "ماوس بی‌سیم ارگونومیک لاجیتک",
    price: 450000,
    priceString: "۴۵۰,۰۰۰",
    image:
      "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=600&q=80",
    brand: "لاجیتک",
  },
  {
    id: "usbc-braided-cable",
    title: "کابل تبدیل USB به USB-C کنفی",
    price: 180000,
    priceString: "۱۸۰,۰۰۰",
    image:
      "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=600&q=80",
    brand: "انکر",
  },
  {
    id: "gel-mouse-pad",
    title: "پد ماوس طبی مدل ژله‌ای",
    price: 125000,
    priceString: "۱۲۵,۰۰۰",
    image:
      "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&w=600&q=80",
    brand: "تسکو",
  },
];

export function CartView() {
  const {
    items,
    updateQuantity,
    removeItem,
    clearCart,
    applyCoupon,
    couponCode,
    couponDiscount,
    removeCoupon,
    getRawTotal,
    getDiscountTotal,
    getFinalTotal,
    getItemsCount,
    addItem,
  } = useCartStore();

  const [inputCoupon, setInputCoupon] = useState("");
  const [couponError, setCouponError] = useState("");
  const [couponSuccess, setCouponSuccess] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);

  const toPersianDigits = (n: number | string) => {
    const persianDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
    return n.toString().replace(/[0-9]/g, (w) => persianDigits[+w]);
  };

  const formatPrice = (num: number) => {
    const persianDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
    return num
      .toLocaleString("fa-IR")
      .replace(/[0-9]/g, (w) => persianDigits[+w]);
  };

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputCoupon.trim()) return;
    const success = applyCoupon(inputCoupon);
    if (success) {
      setCouponSuccess(true);
      setCouponError("");
    } else {
      setCouponError(
        "کد تخفیف وارد شده معتبر نیست (کدهای معتبر: off10, takhfif, wexun)",
      );
      setCouponSuccess(false);
    }
  };

  const itemsCount = getItemsCount();

  return (
    <div className="space-y-6 text-right">
      <nav aria-label="مسیر راهنما" className="py-2 text-xs text-slate-500">
        <ol className="flex items-center gap-2">
          <li>
            <Link
              href="/"
              className="hover:text-[#2563eb] transition-colors cursor-pointer"
            >
              خانه
            </Link>
          </li>
          <li className="text-slate-300">/</li>
          <li className="text-slate-800 font-bold" aria-current="page">
            سبد خرید
          </li>
        </ol>
      </nav>

      <div className="flex flex-wrap items-center justify-between gap-4 pb-2 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <h1 className="text-xl sm:text-2xl font-black text-slate-900">
            سبد خرید شما
          </h1>
          {itemsCount > 0 && (
            <span className="bg-blue-50 text-[#2563eb] text-xs font-black px-3 py-1 rounded-full border border-blue-100/60 shadow-2xs">
              {toPersianDigits(itemsCount)} کالا در سبد خرید
            </span>
          )}
        </div>

        {items.length > 0 && (
          <button
            type="button"
            onClick={clearCart}
            className="text-xs font-bold text-red-500 hover:text-red-600 flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Trash2 className="w-4 h-4" />
            <span>خالی کردن سبد خرید</span>
          </button>
        )}
      </div>

      {items.length === 0 ? (
        <div className="bg-white rounded-3xl border border-slate-200/90 p-12 text-center space-y-4 shadow-xs">
          <div className="w-16 h-16 rounded-3xl bg-blue-50 text-[#2563eb] flex items-center justify-center mx-auto">
            <ShoppingBag className="w-8 h-8" />
          </div>
          <h2 className="text-lg font-black text-slate-900">
            سبد خرید شما خالی است
          </h2>
          <p className="text-xs text-slate-400 max-w-xs mx-auto leading-relaxed">
            می‌توانید برای مشاهده محصولات و کالاهای دیجیتال به صفحه فروشگاه
            مراجعه کنید.
          </p>
          <Link href="/" className="inline-block pt-2">
            <Button variant="primary" size="lg" className="font-bold px-8">
              مشاهده محصولات
            </Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          <div className="lg:col-span-8 order-2 lg:order-1 space-y-5">
            <div className="bg-white rounded-2xl border border-slate-200/90 p-4 sm:p-5 shadow-2xs space-y-3">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2 text-slate-700 font-bold">
                  <Truck className="w-4 h-4 text-[#2563eb]" />
                  <span>فقط ۲۰۰,۰۰۰ تومان تا ارسال رایگان فاصله دارید</span>
                </div>
                <span className="font-black text-slate-800">۷۵٪</span>
              </div>
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div className="bg-[#0b1528] h-full rounded-full transition-all duration-500 w-3/4" />
              </div>
            </div>

            <div className="space-y-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl border border-slate-200/90 p-4 sm:p-5 shadow-2xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-all hover:border-slate-300"
                >
                  <div className="flex items-start gap-4 flex-1">
                    <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-slate-100 shrink-0 border border-slate-200/80 overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="space-y-1.5 flex-1 text-right">
                      <h3 className="text-xs sm:text-sm font-black text-slate-900 leading-snug">
                        {item.title}
                      </h3>

                      <div className="flex flex-wrap items-center gap-3 text-[11px] text-slate-500 font-medium">
                        {item.color && <span>رنگ: {item.color}</span>}
                        {item.guarantee && (
                          <span className="flex items-center gap-1">
                            <ShieldCheck className="w-3.5 h-3.5 text-slate-400" />
                            <span>گارانتی: {item.guarantee}</span>
                          </span>
                        )}
                      </div>

                      <div className="text-[11px] font-bold text-emerald-600 flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                        <span>
                          {item.inStockText || "موجود در انبار - ارسال فردا"}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto border-t sm:border-t-0 pt-3 sm:pt-0 border-slate-100 gap-3">
                    <div className="text-right sm:text-left">
                      {item.oldPrice && item.oldPrice > item.price && (
                        <div className="text-[11px] text-slate-400 line-through">
                          {formatPrice(item.oldPrice * item.quantity)} تومان
                        </div>
                      )}
                      <div className="text-sm sm:text-base font-black text-slate-900">
                        {formatPrice(item.price * item.quantity)}{" "}
                        <span className="text-xs font-normal">تومان</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => removeItem(item.id)}
                        className="w-8 h-8 rounded-xl border border-slate-200 text-slate-400 hover:text-red-500 hover:border-red-200 flex items-center justify-center transition-colors cursor-pointer"
                        aria-label="حذف کالا"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>

                      <div className="inline-flex items-center border border-slate-200 rounded-xl bg-slate-50/50 p-0.5">
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, 1)}
                          className="w-7 h-7 rounded-lg bg-white border border-slate-200/80 flex items-center justify-center text-slate-700 hover:text-[#2563eb] transition-colors cursor-pointer"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                        <span className="w-8 text-center text-xs font-black text-slate-900 select-none">
                          {toPersianDigits(item.quantity)}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, -1)}
                          disabled={item.quantity <= 1}
                          className="w-7 h-7 rounded-lg bg-white border border-slate-200/80 flex items-center justify-center text-slate-700 hover:text-[#2563eb] disabled:opacity-40 transition-colors cursor-pointer"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-white rounded-2xl border border-slate-200/90 p-4 sm:p-5 shadow-2xs space-y-3">
              <form onSubmit={handleApplyCoupon} className="flex gap-2">
                <input
                  type="text"
                  value={inputCoupon}
                  onChange={(e) => {
                    setInputCoupon(e.target.value);
                    setCouponError("");
                  }}
                  placeholder="کد تخفیف خود را وارد کنید..."
                  className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 font-bold focus:bg-white focus:outline-none focus:border-[#2563eb]"
                />
                <Button
                  type="submit"
                  variant="secondary"
                  size="md"
                  className="font-bold text-xs shrink-0 gap-1.5"
                  rightIcon={<Tag className="w-4 h-4" />}
                >
                  اعمال تخفیف
                </Button>
              </form>

              {couponError && (
                <p className="text-[11px] text-red-500 font-bold">
                  {couponError}
                </p>
              )}
              {couponSuccess && (
                <p className="text-[11px] text-emerald-600 font-bold">
                  کد تخفیف ۲۰۰,۰۰۰ تومانی با موفقیت اعمال شد!
                </p>
              )}
            </div>
          </div>

          <div className="lg:col-span-4 order-1 lg:order-2 sticky top-24 space-y-4">
            <div className="bg-white rounded-3xl border border-slate-200/90 p-5 sm:p-6 shadow-2xs space-y-5">
              <h2 className="text-sm font-black text-slate-900 pb-3 border-b border-slate-100">
                خلاصه وضعیت سفارش
              </h2>

              <div className="space-y-3 text-xs">
                <div className="flex items-center justify-between text-slate-600">
                  <span>مبلغ کالاها ({toPersianDigits(itemsCount)} کالا)</span>
                  <span className="font-bold text-slate-800">
                    {formatPrice(getRawTotal())} تومان
                  </span>
                </div>

                {getDiscountTotal() > 0 && (
                  <div className="flex items-center justify-between text-emerald-600 font-bold">
                    <span>تخفیف محصولات</span>
                    <span>{formatPrice(getDiscountTotal())}- تومان</span>
                  </div>
                )}

                <div className="flex items-center justify-between text-slate-600">
                  <span>هزینه ارسال</span>
                  <span className="font-bold text-emerald-600">رایگان</span>
                </div>

                <div className="border-t border-slate-100 pt-3 flex items-baseline justify-between text-slate-900">
                  <span className="text-xs font-bold text-slate-600">
                    مبلغ قابل پرداخت
                  </span>
                  <div className="flex items-baseline gap-1">
                    <span className="text-xl sm:text-2xl font-black text-slate-900">
                      {formatPrice(getFinalTotal())}
                    </span>
                    <span className="text-xs font-medium text-slate-500">
                      تومان
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-2 pt-2">
                <Button
                  variant="secondary"
                  size="lg"
                  onClick={() => setCheckoutOpen(true)}
                  className="w-full font-black text-sm shadow-md"
                >
                  ادامه و ثبت سفارش
                </Button>

                <Link href="/" className="block">
                  <Button
                    variant="outline"
                    size="lg"
                    className="w-full font-bold text-xs"
                  >
                    ادامه خرید
                  </Button>
                </Link>
              </div>

              <div className="pt-4 border-t border-slate-100 space-y-2.5 text-[11px] text-slate-500 font-medium">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>ضمانت اصالت کالا و ۷ روز مهلت بازگشت</span>
                </div>
                <div className="flex items-center gap-2">
                  <Headphones className="w-4 h-4 text-[#2563eb] shrink-0" />
                  <span>پشتیبانی ۲۴ ساعته در ۷ روز هفته</span>
                </div>
                <div className="flex items-center gap-2">
                  <Lock className="w-4 h-4 text-indigo-600 shrink-0" />
                  <span>پرداخت امن و رمزنگاری شده</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="pt-10">
        <div className="flex items-center gap-2 mb-5">
          <ShoppingBag className="w-5 h-5 text-[#2563eb]" />
          <h2 className="text-base sm:text-lg font-black text-slate-900">
            محصولات پیشنهادی برای شما
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {suggestedProducts.map((p) => (
            <div
              key={p.id}
              className="bg-white rounded-2xl border border-slate-200 p-4 flex flex-col justify-between hover:border-slate-300 hover:shadow-xs transition-all"
            >
              <div>
                <div className="aspect-square rounded-xl bg-slate-100 overflow-hidden mb-3 border border-slate-100">
                  <img
                    src={p.image}
                    alt={p.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                <h3 className="text-xs sm:text-sm font-bold text-slate-800 line-clamp-1 mb-2">
                  {p.title}
                </h3>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-slate-100 mt-2">
                <span className="text-xs sm:text-sm font-black text-slate-900">
                  {p.priceString} تومان
                </span>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    addItem({
                      id: p.id,
                      title: p.title,
                      price: p.price,
                      image: p.image,
                      seller: "پویان افزار اکسپرس",
                      inStockText: "موجود در انبار",
                    });
                  }}
                  className="font-bold text-xs gap-1"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>افزودن به سبد</span>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <CheckoutModal
        isOpen={checkoutOpen}
        onClose={() => setCheckoutOpen(false)}
      />
    </div>
  );
}
