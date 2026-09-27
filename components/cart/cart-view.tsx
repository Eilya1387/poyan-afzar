"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
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
import { toast } from "@/components/ui/toast";
import { useCartStore } from "@/lib/store";
import { CheckoutModal } from "./checkout-modal";
import { cartApi } from "@/lib/api/cart";
import { useAuth } from "@/components/auth/auth-context";
import { Loader2 } from "lucide-react";

export function CartView() {
  const router = useRouter();
  const { isLoggedIn, isLoaded } = useAuth();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isLoaded && !isLoggedIn) {
      router.push("/login?redirect=/cart");
    }
  }, [isLoaded, isLoggedIn, router]);

  const {
    items,
    updateQuantity,
    removeItem,
    clearCart,
    applyCoupon,
    setCouponDiscount,
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
  const [couponSuccessMessage, setCouponSuccessMessage] = useState<string | null>(null);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [couponLoading, setCouponLoading] = useState(false);

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

  const rawTotal = getRawTotal();
  const FREE_SHIPPING_THRESHOLD = 2000000;
  const remainingForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - rawTotal);
  const freeShippingPercent = Math.min(100, Math.round((rawTotal / FREE_SHIPPING_THRESHOLD) * 100));
  const isFreeShipping = rawTotal >= FREE_SHIPPING_THRESHOLD;

  const handleApplyCoupon = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanCode = inputCoupon.trim();
    if (!cleanCode) return;

    setCouponLoading(true);
    setCouponError("");
    setCouponSuccessMessage(null);

    try {
      const res = await cartApi.validateCoupon(cleanCode, rawTotal);
      if (res.valid) {
        const discountAmt = res.discountAmount || 0;
        setCouponDiscount(cleanCode, discountAmt);
        const msg =
          res.message ||
          `کد تخفیف ${res.code} به مبلغ ${formatPrice(discountAmt)} تومان با موفقیت اعمال شد.`;
        setCouponSuccessMessage(msg);
        toast.success("کد تخفیف اعمال شد", msg);
        setInputCoupon("");
      } else {
        const errTxt = res.message || "کد تخفیف وارد شده نامعتبر است";
        setCouponError(errTxt);
        toast.error("کد تخفیف نامعتبر است", errTxt);
      }
    } catch (err: any) {
      const localSuccess = applyCoupon(cleanCode);
      if (localSuccess) {
        const msg = `کد تخفیف ${cleanCode} با موفقیت اعمال شد.`;
        setCouponSuccessMessage(msg);
        toast.success("کد تخفیف اعمال شد", msg);
        setInputCoupon("");
      } else {
        const errTxt = err?.message || "کد تخفیف وارد شده معتبر نیست";
        setCouponError(errTxt);
        toast.error("کد تخفیف نامعتبر است", errTxt);
      }
    } finally {
      setCouponLoading(false);
    }
  };

  const itemsCount = mounted ? getItemsCount() : 0;

  return (
    <div className="space-y-6 text-right pt-4">
      <div className="flex flex-wrap items-center justify-between gap-4 pb-2 border-b border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-3">
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
            سبد خرید شما
          </h1>
          {mounted && itemsCount > 0 && (
            <span className="bg-blue-50 dark:bg-blue-950/60 text-[#2563eb] dark:text-blue-400 text-xs font-black px-3 py-1 rounded-full border border-blue-100/60 dark:border-blue-900/60 shadow-2xs">
              {toPersianDigits(itemsCount)} کالا در سبد خرید
            </span>
          )}
        </div>

        {mounted && items.length > 0 && (
          <button
            type="button"
            onClick={clearCart}
            className="text-xs font-bold text-red-500 hover:text-red-600 dark:text-rose-400 dark:hover:text-rose-300 flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Trash2 className="w-4 h-4" />
            <span>خالی کردن سبد خرید</span>
          </button>
        )}
      </div>

      {!mounted ? (
        <div className="py-20 text-center">
          <Loader2 className="w-8 h-8 animate-spin text-[#2563eb] dark:text-blue-400 mx-auto" />
        </div>
      ) : items.length === 0 ? (
        <div className="bg-white dark:bg-[#111827] rounded-3xl border border-slate-200/90 dark:border-slate-800 p-12 text-center space-y-4 shadow-xs">
          <div className="w-16 h-16 rounded-3xl bg-blue-50 dark:bg-blue-950/60 text-[#2563eb] dark:text-blue-400 flex items-center justify-center mx-auto">
            <ShoppingBag className="w-8 h-8" />
          </div>
          <h2 className="text-lg font-black text-slate-900 dark:text-white">
            سبد خرید شما خالی است
          </h2>
          <p className="text-xs text-slate-400 dark:text-slate-500 max-w-xs mx-auto leading-relaxed">
            می‌توانید برای مشاهده محصولات و کالاهای دیجیتال به صفحه فروشگاه
            مراجعه کنید.
          </p>
          <Link href="/products" className="inline-block pt-2">
            <Button variant="primary" size="lg" className="font-bold px-8">
              مشاهده محصولات
            </Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          <div className="lg:col-span-8 order-2 lg:order-1 space-y-5">
            {/* Free Shipping Progress Bar */}
            <div className="bg-white dark:bg-[#111827] rounded-2xl border border-slate-200/90 dark:border-slate-800 p-4 sm:p-5 shadow-2xs space-y-3">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300 font-bold">
                  <Truck className="w-4 h-4 text-[#2563eb] dark:text-blue-400" />
                  {isFreeShipping ? (
                    <span className="text-emerald-600 dark:text-emerald-400">ارسال برای این سفارش کاملاً رایگان است! 🎉</span>
                  ) : (
                    <span>فقط {formatPrice(remainingForFreeShipping)} تومان تا ارسال رایگان فاصله دارید</span>
                  )}
                </div>
                <span className="font-black text-slate-800 dark:text-slate-200">{toPersianDigits(freeShippingPercent)}٪</span>
              </div>
              <div className="w-full bg-slate-100 dark:bg-slate-800 h-2.5 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${isFreeShipping ? "bg-emerald-500" : "bg-[#2563eb] dark:bg-blue-500"}`}
                  style={{ width: `${freeShippingPercent}%` }}
                />
              </div>
            </div>

            <div className="space-y-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="bg-white dark:bg-[#111827] rounded-2xl border border-slate-200/90 dark:border-slate-800 p-4 sm:p-5 shadow-2xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-all hover:border-slate-300 dark:hover:border-slate-700"
                >
                  <div className="flex items-start gap-4 flex-1">
                    <Link
                      href={`/products/${item.id}`}
                      className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-slate-50 dark:bg-slate-800 shrink-0 border border-slate-200/80 dark:border-slate-700/80 p-2 flex items-center justify-center overflow-hidden group/img hover:opacity-90 transition-opacity cursor-pointer"
                    >
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-contain group-hover/img:scale-105 transition-transform"
                      />
                    </Link>

                    <div className="space-y-1.5 flex-1 text-right">
                      <Link
                        href={`/products/${item.id}`}
                        className="text-xs sm:text-sm font-black text-slate-900 dark:text-white leading-snug hover:text-[#2563eb] dark:hover:text-blue-400 transition-colors cursor-pointer inline-block"
                      >
                        {item.title}
                      </Link>

                      <div className="flex flex-wrap items-center gap-3 text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                        {item.color && <span>رنگ: {item.color}</span>}
                        {item.guarantee && (
                          <span className="flex items-center gap-1">
                            <ShieldCheck className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500" />
                            <span>گارانتی: {item.guarantee}</span>
                          </span>
                        )}
                      </div>

                      <div className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                        <span>
                          {item.inStockText || "موجود در انبار - ارسال سریع"}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto border-t sm:border-t-0 pt-3 sm:pt-0 border-slate-100 dark:border-slate-800 gap-3">
                    <div className="text-right sm:text-left">
                      {item.oldPrice && item.oldPrice > item.price && (
                        <div className="text-[11px] text-slate-400 dark:text-slate-500 line-through">
                          {formatPrice(item.oldPrice * item.quantity)} تومان
                        </div>
                      )}
                      <div className="text-sm sm:text-base font-black text-slate-900 dark:text-white">
                        {formatPrice(item.price * item.quantity)}{" "}
                        <span className="text-xs font-normal text-slate-500 dark:text-slate-400">تومان</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          removeItem(item.id);
                          toast.info("کالا از سبد خرید حذف شد.");
                        }}
                        className="w-8 h-8 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-400 dark:text-slate-500 hover:text-red-500 dark:hover:text-rose-400 hover:border-red-200 dark:hover:border-rose-800 flex items-center justify-center transition-colors cursor-pointer"
                        aria-label="حذف کالا"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>

                      <div className="inline-flex items-center border border-slate-200 dark:border-slate-700 rounded-xl bg-slate-50/50 dark:bg-slate-800/50 p-0.5">
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, 1)}
                          className="w-7 h-7 rounded-lg bg-white dark:bg-slate-700 border border-slate-200/80 dark:border-slate-600 flex items-center justify-center text-slate-700 dark:text-slate-200 hover:text-[#2563eb] dark:hover:text-blue-400 transition-colors cursor-pointer"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                        <span className="w-8 text-center text-xs font-black text-slate-900 dark:text-white select-none">
                          {toPersianDigits(item.quantity)}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, -1)}
                          disabled={item.quantity <= 1}
                          className="w-7 h-7 rounded-lg bg-white dark:bg-slate-700 border border-slate-200/80 dark:border-slate-600 flex items-center justify-center text-slate-700 dark:text-slate-200 hover:text-[#2563eb] dark:hover:text-blue-400 disabled:opacity-40 transition-colors cursor-pointer"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-white dark:bg-[#111827] rounded-2xl border border-slate-200/90 dark:border-slate-800 p-4 sm:p-5 shadow-2xs space-y-3">
              <form onSubmit={handleApplyCoupon} className="flex gap-2">
                <input
                  type="text"
                  value={inputCoupon}
                  onChange={(e) => {
                    setInputCoupon(e.target.value);
                    setCouponError("");
                  }}
                  placeholder="کد تخفیف خود را وارد کنید..."
                  className="flex-1 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-xs text-slate-900 dark:text-white font-bold focus:bg-white dark:focus:bg-slate-850 focus:outline-none focus:border-[#2563eb]"
                />
                <Button
                  type="submit"
                  variant="secondary"
                  size="md"
                  disabled={couponLoading}
                  className="font-bold text-xs shrink-0 gap-1.5"
                  rightIcon={couponLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Tag className="w-4 h-4" />}
                >
                  اعمال تخفیف
                </Button>
              </form>

              {couponError && (
                <p className="text-[11px] text-red-500 font-bold">
                  {couponError}
                </p>
              )}
              {couponSuccessMessage && (
                <div className="flex items-center justify-between bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 rounded-xl p-2.5 text-xs font-bold">
                  <span>{couponSuccessMessage}</span>
                  <button
                    type="button"
                    onClick={() => {
                      removeCoupon();
                      setCouponSuccessMessage(null);
                    }}
                    className="text-xs text-red-500 dark:text-rose-400 hover:underline cursor-pointer"
                  >
                    حذف کوپن
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="lg:col-span-4 order-1 lg:order-2 sticky top-24 space-y-4">
            <div className="bg-white dark:bg-[#111827] rounded-3xl border border-slate-200/90 dark:border-slate-800 p-5 sm:p-6 shadow-2xs space-y-5">
              <h2 className="text-sm font-black text-slate-900 dark:text-white pb-3 border-b border-slate-100 dark:border-slate-800">
                خلاصه وضعیت سفارش
              </h2>

              <div className="space-y-3 text-xs">
                <div className="flex items-center justify-between text-slate-600 dark:text-slate-400">
                  <span>مبلغ کالاها ({toPersianDigits(itemsCount)} کالا)</span>
                  <span className="font-bold text-slate-800 dark:text-slate-200">
                    {formatPrice(rawTotal)} تومان
                  </span>
                </div>

                {getDiscountTotal() > 0 && (
                  <div className="flex items-center justify-between text-emerald-600 dark:text-emerald-400 font-bold">
                    <span>تخفیف</span>
                    <span>{formatPrice(getDiscountTotal())}- تومان</span>
                  </div>
                )}

                <div className="flex items-center justify-between text-slate-600 dark:text-slate-400">
                  <span>هزینه ارسال</span>
                  <span className={`font-bold ${isFreeShipping ? "text-emerald-600 dark:text-emerald-400" : "text-slate-800 dark:text-slate-200"}`}>
                    {isFreeShipping ? "رایگان" : `${formatPrice(45000)} تومان`}
                  </span>
                </div>

                <div className="border-t border-slate-100 dark:border-slate-800 pt-3 flex items-baseline justify-between text-slate-900 dark:text-white">
                  <span className="text-xs font-bold text-slate-600 dark:text-slate-400">
                    مبلغ قابل پرداخت
                  </span>
                  <div className="flex items-baseline gap-1">
                    <span className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                      {formatPrice(getFinalTotal() + (isFreeShipping ? 0 : 45000))}
                    </span>
                    <span className="text-xs font-medium text-slate-500 dark:text-slate-400">تومان</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2 pt-2">
                <Button
                  variant="primary"
                  size="lg"
                  onClick={() => setCheckoutOpen(true)}
                  className="w-full font-black text-sm py-3.5 shadow-md hover:shadow-lg rounded-2xl"
                >
                  ادامه و ثبت سفارش
                </Button>

                <Link href="/products" className="block">
                  <Button
                    variant="outline"
                    size="lg"
                    className="w-full font-bold text-xs"
                  >
                    ادامه خرید
                  </Button>
                </Link>
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-2.5 text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <span>ضمانت اصالت کالا و ۷ روز مهلت بازگشت</span>
                </div>
                <div className="flex items-center gap-2">
                  <Headphones className="w-4 h-4 text-[#2563eb] dark:text-blue-400 shrink-0" />
                  <span>پشتیبانی ۲۴ ساعته در ۷ روز هفته</span>
                </div>
                <div className="flex items-center gap-2">
                  <Lock className="w-4 h-4 text-indigo-600 dark:text-indigo-400 shrink-0" />
                  <span>پرداخت امن و رمزنگاری شده</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <CheckoutModal
        isOpen={checkoutOpen}
        onClose={() => setCheckoutOpen(false)}
      />
    </div>
  );
}
