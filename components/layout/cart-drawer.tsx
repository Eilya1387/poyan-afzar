"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  X,
  ShoppingCart,
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  ShieldCheck,
  Truck,
  CheckCircle2,
} from "lucide-react";
import { useCartStore } from "@/lib/cart-store";
import { formatPriceFa, toPersianDigits } from "@/lib/formatters";

export function CartDrawer() {
  const {
    items,
    isOpen,
    closeCart,
    updateQuantity,
    removeItem,
    clearCart,
    getTotalPrice,
    getTotalItems,
  } = useCartStore();

  const [mounted, setMounted] = React.useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Prevent background scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Handle ESC key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        closeCart();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, closeCart]);

  if (!mounted || !isOpen) {
    return null;
  }

  const totalItemsCount = getTotalItems();
  const totalPrice = getTotalPrice();

  return (
    <div className="fixed inset-0 z-50 overflow-hidden select-none">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity duration-300 animate-in fade-in"
        onClick={closeCart}
        aria-hidden="true"
      />

      <div className="fixed inset-y-0 left-0 max-w-full flex pl-0 sm:pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col transform transition-transform duration-300 ease-in-out animate-in slide-in-from-left">
          {/* Header */}
          <div className="px-5 py-4.5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-blue-50 text-[#2563eb] flex items-center justify-center">
                <ShoppingCart className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-base font-black text-[#0b1528]">
                  سبد خرید شما
                </h2>
                <p className="text-xs text-slate-500 font-medium">
                  {toPersianDigits(totalItemsCount)} کالا در سبد
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              {items.length > 0 && (
                <button
                  type="button"
                  onClick={clearCart}
                  title="خالی کردن سبد خرید"
                  className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors cursor-pointer"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
              <button
                type="button"
                onClick={closeCart}
                className="p-2 text-slate-400 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
                aria-label="بستن"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto px-5 py-4 space-y-3.5 divide-y divide-slate-100">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-16 px-4">
                <div className="w-20 h-20 rounded-3xl bg-blue-50/70 border border-blue-100/80 flex items-center justify-center mb-4 text-[#2563eb]">
                  <ShoppingCart className="w-10 h-10 stroke-[1.5]" />
                </div>
                <h3 className="text-base font-bold text-[#0b1528] mb-1">
                  سبد خرید شما خالی است
                </h3>
                <p className="text-xs text-slate-500 max-w-xs mb-6">
                  می‌توانید برای مشاهده محصولات و کالاهای جذاب به فروشگاه سر بزنید.
                </p>
                <button
                  type="button"
                  onClick={closeCart}
                  className="inline-flex items-center gap-2 bg-[#0b1528] text-white text-xs font-bold px-5 py-2.5 rounded-xl hover:bg-slate-800 transition-colors shadow-sm"
                >
                  <span>مشاهده کاتالوگ محصولات</span>
                  <ArrowRight className="w-4 h-4 rotate-180" />
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.product.id}
                  className="pt-3.5 first:pt-0 flex gap-3.5 items-start"
                >
                  {/* Thumbnail Image */}
                  <div className="w-20 h-20 bg-slate-50 rounded-xl border border-slate-200/80 p-1.5 shrink-0 flex items-center justify-center relative">
                    <Image
                      src={item.product.image}
                      alt={item.product.title}
                      width={70}
                      height={70}
                      className="object-contain max-h-full"
                    />
                  </div>

                  {/* Info & Actions */}
                  <div className="flex-1 min-w-0 flex flex-col justify-between h-full">
                    <div>
                      <div className="flex items-center justify-between gap-1 mb-1">
                        <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md">
                          {item.product.brandFa || item.product.brand}
                        </span>
                        <button
                          type="button"
                          onClick={() => removeItem(item.product.id)}
                          className="text-slate-400 hover:text-rose-600 p-1 rounded-md transition-colors"
                          title="حذف از سبد"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <h4 className="text-xs font-bold text-[#0b1528] line-clamp-2 leading-snug">
                        {item.product.title}
                      </h4>
                    </div>

                    <div className="flex items-center justify-between mt-3">
                      {/* Quantity Selector */}
                      <div className="flex items-center border border-slate-200 rounded-lg bg-slate-50 overflow-hidden">
                        <button
                          type="button"
                          onClick={() =>
                            updateQuantity(item.product.id, item.quantity + 1)
                          }
                          className="w-7 h-7 flex items-center justify-center text-slate-600 hover:text-blue-600 hover:bg-slate-100 transition-colors cursor-pointer"
                          aria-label="افزایش تعداد"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                        <span className="w-7 text-center text-xs font-black text-[#0b1528]">
                          {toPersianDigits(item.quantity)}
                        </span>
                        <button
                          type="button"
                          onClick={() =>
                            updateQuantity(item.product.id, item.quantity - 1)
                          }
                          className="w-7 h-7 flex items-center justify-center text-slate-600 hover:text-rose-600 hover:bg-slate-100 transition-colors cursor-pointer"
                          aria-label="کاهش تعداد"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Price */}
                      <div className="text-left">
                        <span className="text-xs font-black text-[#0b1528]">
                          {formatPriceFa(item.product.price * item.quantity)}
                        </span>
                        <span className="text-[10px] text-slate-500 mr-1 font-medium">
                          تومان
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout Summary */}
          {items.length > 0 && (
            <div className="p-5 border-t border-slate-200/80 bg-slate-50/70 space-y-3.5">
              {/* Shipping & Guarantee notices */}
              <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-500 font-semibold">
                <div className="flex items-center gap-1.5">
                  <Truck className="w-3.5 h-3.5 text-blue-600" />
                  <span>ارسال سریع سراسری</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>ضمانت اصالت و سلامت</span>
                </div>
              </div>

              {/* Total Price */}
              <div className="flex items-center justify-between pt-2 border-t border-slate-200">
                <span className="text-xs font-bold text-slate-600">
                  مبلغ کل قابل پرداخت:
                </span>
                <div className="text-left">
                  <span className="text-base font-black text-[#0b1528]">
                    {formatPriceFa(totalPrice)}
                  </span>
                  <span className="text-xs text-slate-500 font-bold mr-1">
                    تومان
                  </span>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                type="button"
                onClick={() => {
                  alert("سفارش شما با موفقیت ثبت شد!");
                  closeCart();
                }}
                className="w-full py-3.5 px-4 rounded-xl bg-linear-to-b from-[#3b82f6] to-[#2563eb] text-white font-bold text-sm flex items-center justify-center gap-2 border border-blue-400/30 shadow-[0_2px_8px_rgba(37,99,235,0.25)] hover:shadow-[0_4px_16px_rgba(37,99,235,0.4)] hover:brightness-110 active:scale-[0.98] transition-all cursor-pointer"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>ثبت سفارش و ادامه تسویه‌حساب</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}