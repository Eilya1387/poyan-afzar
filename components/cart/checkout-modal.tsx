"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  X,
  MapPin,
  Plus,
  CheckCircle2,
  CreditCard,
  Wallet,
  Truck,
  ArrowRight,
  ShieldCheck,
  ReceiptText,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/toast";
import { useCartStore, useAddressStore } from "@/lib/store";
import { useAuth } from "@/components/auth/auth-context";
import { AddressModal } from "@/components/auth/address-modal";
import { ordersApi } from "@/lib/api/orders";

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CheckoutModal({ isOpen, onClose }: CheckoutModalProps) {
  const router = useRouter();
  const { items, getRawTotal, getDiscountTotal, getFinalTotal, clearCart } = useCartStore();
  const { addresses } = useAddressStore();
  const { user } = useAuth();

  const [selectedAddressId, setSelectedAddressId] = useState<string>(
    addresses.find((a) => a.isDefault)?.id || addresses[0]?.id || ""
  );
  const [paymentMethod, setPaymentMethod] = useState<"gateway" | "wallet">("gateway");
  const [addressModalOpen, setAddressModalOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [trackingCode, setTrackingCode] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const toPersianDigits = (n: number | string) => {
    const persianDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
    return n.toString().replace(/[0-9]/g, (w) => persianDigits[+w]);
  };

  const formatPrice = (num: number) => {
    const persianDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
    return num.toLocaleString("fa-IR").replace(/[0-9]/g, (w) => persianDigits[+w]);
  };

  const handlePay = async () => {
    if (addresses.length === 0 || !selectedAddressId) {
      setAddressModalOpen(true);
      return;
    }

    const selectedAddr = addresses.find((a) => a.id === selectedAddressId) || addresses[0];
    if (!selectedAddr) {
      setErrorMessage("لطفاً آدرس تحویل سفارش را انتخاب کنید.");
      return;
    }

    setIsProcessing(true);
    setErrorMessage(null);

    try {
      const res = await ordersApi.createOrder({
        items: items.map((it) => ({
          productId: it.id,
          quantity: it.quantity,
          color: it.color,
        })),
        customerName: user ? `${user.firstName} ${user.lastName}`.trim() : (selectedAddr.receiverName || "کاربر خریدار"),
        customerPhone: user?.phone || selectedAddr.receiverPhone || "09123456789",
        customerEmail: user?.email || undefined,
        shippingAddress: {
          province: selectedAddr.province || "تهران",
          city: selectedAddr.city || "تهران",
          fullAddress: selectedAddr.fullAddress,
          postalCode: selectedAddr.postalCode || "1234567890",
          receiverName: selectedAddr.receiverName || (user ? `${user.firstName} ${user.lastName}`.trim() : "کاربر"),
          receiverPhone: selectedAddr.receiverPhone || (user?.phone || "09123456789"),
        },
        paymentMethod: paymentMethod,
      });

      const orderData: any = res.data || res;
      const code = orderData.trackingCode || orderData.order?.trackingCode;

      if (!code) {
        throw new Error(orderData.message || "خطا در دریافت کد رهگیری سفارش");
      }

      setTrackingCode(code);
      clearCart();
      toast.success("سفارش شما با موفقیت ثبت شد!", `کد رهگیری: ${code}`);

      if (paymentMethod === "gateway" && orderData.paymentUrl) {
        if (orderData.paymentUrl.startsWith("http://localhost") || orderData.paymentUrl.includes("/payment/verify")) {
          window.location.href = orderData.paymentUrl;
          return;
        } else {
          window.location.href = orderData.paymentUrl;
          return;
        }
      }

      setOrderComplete(true);
    } catch (err: any) {
      const msg = err?.message || "خطا در ثبت و پرداخت سفارش. لطفاً دوباره تلاش کنید.";
      setErrorMessage(msg);
      toast.error("خطا در ثبت سفارش", msg);
    } finally {
      setIsProcessing(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="bg-white dark:bg-[#111827] rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 max-w-2xl w-full shadow-2xl text-right my-8 animate-in fade-in zoom-in-95 duration-200">
        {!orderComplete ? (
          <>
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800 mb-6">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-[#2563eb] dark:text-blue-400 flex items-center justify-center">
                  <ReceiptText className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-black text-slate-900 dark:text-white">
                    تکمیل و نهایی‌سازی سفارش
                  </h3>
                  <p className="text-xs text-slate-400 dark:text-slate-500 font-medium">
                    بررسی فاکتور، آدرس تحویل و درگاه پرداخت
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="w-8 h-8 rounded-full border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-400 dark:text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-6">
              <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-900/60 p-4 space-y-3">
                <h4 className="text-xs font-black text-slate-800 dark:text-slate-200">
                  فاکتور خرید
                </h4>

                <div className="divide-y divide-slate-100 dark:divide-slate-800 text-xs">
                  {items.map((item) => (
                    <div key={item.id} className="py-2.5 flex items-center justify-between">
                      <span className="font-bold text-slate-800 dark:text-slate-200 truncate max-w-70">
                        {item.title} ({toPersianDigits(item.quantity)} عدد)
                      </span>
                      <span className="font-black text-slate-900 dark:text-white">
                        {formatPrice(item.price * item.quantity)} تومان
                      </span>
                    </div>
                  ))}
                </div>

                <div className="border-t border-slate-200 dark:border-slate-800 pt-3 space-y-1.5 text-xs">
                  <div className="flex items-center justify-between text-slate-500 dark:text-slate-400">
                    <span>جمع کل کالاها</span>
                    <span className="font-bold">{formatPrice(getRawTotal())} تومان</span>
                  </div>
                  {getDiscountTotal() > 0 && (
                    <div className="flex items-center justify-between text-emerald-600 dark:text-emerald-400 font-bold">
                      <span>تخفیف کل</span>
                      <span>{formatPrice(getDiscountTotal())}- تومان</span>
                    </div>
                  )}
                  <div className="flex items-center justify-between text-slate-500 dark:text-slate-400">
                    <span>هزینه ارسال اکسپرس</span>
                    <span className="font-bold text-emerald-600 dark:text-emerald-400">رایگان</span>
                  </div>
                  <div className="flex items-center justify-between text-slate-900 dark:text-white text-sm font-black pt-2 border-t border-slate-200 dark:border-slate-800">
                    <span>مبلغ قابل پرداخت</span>
                    <span className="text-[#2563eb] dark:text-blue-400 text-base">{formatPrice(getFinalTotal())} تومان</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-black text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-[#2563eb] dark:text-blue-400" />
                    <span>انتخاب آدرس تحویل</span>
                  </h4>

                  <button
                    type="button"
                    onClick={() => setAddressModalOpen(true)}
                    className="text-xs font-bold text-[#2563eb] dark:text-blue-400 hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>افزودن آدرس جدید</span>
                  </button>
                </div>

                {addresses.length === 0 ? (
                  <div className="p-4 rounded-2xl border border-amber-200 dark:border-amber-900/60 bg-amber-50/60 dark:bg-amber-950/30 text-center space-y-2">
                    <p className="text-xs text-amber-800 dark:text-amber-300 font-bold">
                      شما هنوز آدرسی ثبت نکرده‌اید.
                    </p>
                    <Button
                      type="button"
                      variant="primary"
                      size="sm"
                      onClick={() => setAddressModalOpen(true)}
                      className="text-xs font-bold"
                    >
                      ثبت آدرس تحویل
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-2.5">
                    {addresses.map((addr) => (
                      <label
                        key={addr.id}
                        className={`flex items-start gap-3 p-3.5 rounded-2xl border cursor-pointer transition-all ${
                          selectedAddressId === addr.id
                            ? "border-[#2563eb] dark:border-blue-500 bg-blue-50/40 dark:bg-blue-950/40 ring-1 ring-[#2563eb] dark:ring-blue-500"
                            : "border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-white dark:bg-slate-900/50"
                        }`}
                      >
                        <input
                          type="radio"
                          name="shipping-address"
                          value={addr.id}
                          checked={selectedAddressId === addr.id}
                          onChange={() => setSelectedAddressId(addr.id)}
                          className="mt-1 text-[#2563eb] focus:ring-blue-500"
                        />
                        <div className="flex-1 text-right text-xs space-y-1">
                          <div className="flex items-center justify-between">
                            <span className="font-black text-slate-900 dark:text-white">{addr.title}</span>
                            <span className="text-[10px] text-slate-400 dark:text-slate-500 font-mono">
                              کد پستی: {toPersianDigits(addr.postalCode)}
                            </span>
                          </div>
                          <p className="text-slate-600 dark:text-slate-300 font-medium leading-relaxed">
                            {addr.fullAddress}
                          </p>
                        </div>
                      </label>
                    ))}
                  </div>
                )}
              </div>

              <div className="space-y-3">
                <h4 className="text-xs font-black text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                  <CreditCard className="w-4 h-4 text-[#2563eb] dark:text-blue-400" />
                  <span>انتخاب شیوه پرداخت</span>
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
                  <label
                    className={`p-3 rounded-2xl border cursor-pointer flex items-center gap-2.5 transition-all ${
                      paymentMethod === "gateway"
                        ? "border-[#2563eb] dark:border-blue-500 bg-blue-50/40 dark:bg-blue-950/40 ring-1 ring-[#2563eb] dark:ring-blue-500"
                        : "border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50"
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment-method"
                      value="gateway"
                      checked={paymentMethod === "gateway"}
                      onChange={() => setPaymentMethod("gateway")}
                      className="text-[#2563eb] focus:ring-blue-500"
                    />
                    <div className="flex flex-col">
                      <span className="font-bold text-slate-800 dark:text-slate-200">درگاه پرداخت اینترنتی</span>
                      <span className="text-[10px] text-slate-400 dark:text-slate-500">اتصال به کلیه کارت‌های عضو شتاب</span>
                    </div>
                  </label>

                  <label
                    className={`p-3 rounded-2xl border cursor-pointer flex items-center gap-2.5 transition-all ${
                      paymentMethod === "wallet"
                        ? "border-[#2563eb] dark:border-blue-500 bg-blue-50/40 dark:bg-blue-950/40 ring-1 ring-[#2563eb] dark:ring-blue-500"
                        : "border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50"
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment-method"
                      value="wallet"
                      checked={paymentMethod === "wallet"}
                      onChange={() => setPaymentMethod("wallet")}
                      className="text-[#2563eb] focus:ring-blue-500"
                    />
                    <div className="flex flex-col">
                      <span className="font-bold text-slate-800 dark:text-slate-200">کیف پول کاربری</span>
                      <span className="text-[10px] text-slate-400 dark:text-slate-500">پرداخت سریع از موجودی حساب</span>
                    </div>
                  </label>
                </div>
              </div>

              {errorMessage && (
                <div className="p-3 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 text-rose-700 dark:text-rose-300 text-xs font-bold rounded-xl text-center">
                  {errorMessage}
                </div>
              )}

              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <Button
                  type="button"
                  variant="outline"
                  size="md"
                  onClick={onClose}
                  className="font-bold text-xs"
                >
                  انصراف
                </Button>

                <Button
                  type="button"
                  variant="primary"
                  size="lg"
                  isLoading={isProcessing}
                  onClick={handlePay}
                  className="font-black text-sm px-8 shadow-md"
                >
                  پرداخت و ثبت نهایی سفارش
                </Button>
              </div>
            </div>
          </>
        ) : (
          <div className="py-8 text-center space-y-5">
            <div className="w-16 h-16 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto border-4 border-emerald-100 dark:border-emerald-900 shadow-md">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <h3 className="text-xl font-black text-slate-900 dark:text-white">
              سفارش شما با موفقیت ثبت شد!
            </h3>

            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto leading-relaxed">
              پرداخت با موفقیت انجام شد و سفارش شما در فرآیند آماده‌سازی قرار گرفت.
            </p>

            <div className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 max-w-xs mx-auto text-xs font-bold text-slate-800 dark:text-slate-200 space-y-1">
              <div>کد رهگیری سفارش:</div>
              <div className="text-base font-black text-[#2563eb] dark:text-blue-400 tracking-wider font-mono" dir="ltr">
                #{trackingCode}
              </div>
            </div>

            <div className="pt-4 flex items-center justify-center gap-3">
              <Link href="/panel">
                <Button variant="primary" size="md" onClick={onClose} className="font-bold text-xs">
                  مشاهده در پنل کاربری
                </Button>
              </Link>
              <Link href="/">
                <Button variant="outline" size="md" onClick={onClose} className="font-bold text-xs">
                  بازگشت به خانه
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>

      <AddressModal
        isOpen={addressModalOpen}
        onClose={() => setAddressModalOpen(false)}
        onSuccess={(id) => {
          if (addresses.length > 0) {
            setSelectedAddressId(addresses[addresses.length - 1].id);
          }
        }}
      />
    </div>
  );
}
