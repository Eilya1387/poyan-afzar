"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Search, Package, Check, Truck, Home, Loader2, ArrowLeft, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { ordersApi, OrderDetail } from "@/lib/api/orders";

function TrackOrderContent() {
  const searchParams = useSearchParams();
  const initialCode = searchParams.get("code") || searchParams.get("trackingCode") || "";

  const [trackingCode, setTrackingCode] = useState(initialCode);
  const [order, setOrder] = useState<OrderDetail | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTracking = async (codeToTrack: string) => {
    const clean = codeToTrack.trim().replace(/[#\s]/g, "");
    if (!clean) return;

    setLoading(true);
    setError(null);
    setOrder(null);

    try {
      const res = await ordersApi.trackOrder(clean);
      setOrder(res);
    } catch (err: any) {
      setError(err?.message || "سفارشی با این کد رهگیری یافت نشد.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (initialCode) {
      fetchTracking(initialCode);
    }
  }, [initialCode]);

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    fetchTracking(trackingCode);
  };

  const formatPrice = (num?: number) => {
    if (!num) return "۰";
    const persianDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
    return num.toLocaleString("fa-IR").replace(/[0-9]/g, (w) => persianDigits[+w]);
  };

  const toPersianDigits = (n: number | string) => {
    const persianDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
    return n.toString().replace(/[0-9]/g, (w) => persianDigits[+w]);
  };

  return (
    <div className="max-w-3xl w-full mx-auto px-4 py-12 text-right">
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xl space-y-6">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#2563eb] flex items-center justify-center mx-auto">
            <Package className="w-6 h-6" />
          </div>
          <h1 className="text-xl font-black text-slate-900">
            پیگیری وضعیت سفارش
          </h1>
          <p className="text-xs text-slate-500">
            کد رهگیری سفارش خود (مثال: TK-69BCBD67) را وارد کنید تا از آخرین وضعیت آماده‌سازی و ارسال مطلع شوید
          </p>
        </div>

        <form onSubmit={handleTrack} className="flex gap-2 max-w-md mx-auto">
          <input
            type="text"
            required
            value={trackingCode}
            onChange={(e) => setTrackingCode(e.target.value)}
            placeholder="مثال: TK-49F5EB32"
            className="flex-1 bg-slate-50 border border-slate-200 focus:border-[#2563eb] rounded-xl px-4 py-2.5 text-xs text-slate-800 font-mono focus:outline-none"
            dir="ltr"
          />
          <Button
            type="submit"
            variant="primary"
            size="md"
            disabled={loading}
            className="font-bold text-xs px-6 shrink-0"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "رهگیری"}
          </Button>
        </form>

        {error && (
          <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs text-center font-bold">
            {error}
          </div>
        )}

        {order && (
          <div className="space-y-6 pt-6 border-t border-slate-100 animate-fade-in">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-slate-50 rounded-2xl p-4 border border-slate-100">
              <div className="space-y-1">
                <span className="text-xs text-slate-500">کد رهگیری:</span>
                <div className="font-mono font-black text-sm text-[#2563eb]" dir="ltr">
                  #{order.trackingCode}
                </div>
              </div>

              <div className="space-y-1">
                <span className="text-xs text-slate-500">وضعیت سفارش:</span>
                <div>
                  <span className="bg-blue-50 text-[#2563eb] text-xs font-black px-3 py-1 rounded-full border border-blue-100 inline-block">
                    {order.statusFa || order.paymentStatusFa || order.paymentStatus}
                  </span>
                </div>
              </div>

              <div className="space-y-1">
                <span className="text-xs text-slate-500">مبلغ کل فاکتور:</span>
                <div className="font-bold text-slate-900 text-sm">
                  {formatPrice(order.finalAmount || order.amount)} تومان
                </div>
              </div>
            </div>

            {/* Cohesive 5-Step Progress Bar */}
            {(() => {
              const payStatus = (order.paymentStatus || "").toUpperCase();
              const shipStatus = (order.shippingStatus || "").toUpperCase();

              const isDelivered = shipStatus === "DELIVERED";
              const isShipping = shipStatus === "SHIPPING";
              const isPreparing = shipStatus === "PREPARING" || shipStatus === "PROCESSING";
              const isPaid = payStatus === "PAID" || isPreparing || isShipping || isDelivered;

              // Step active calculation: If delivered, ALL 5 steps are true
              const step1Done = true; // Order Placed
              const step2Done = isDelivered || isPaid; // Payment Confirmed
              const step3Done = isDelivered || isPreparing || isShipping; // Order Processing
              const step4Done = isDelivered || isShipping; // Preparing & Shipping
              const step5Done = isDelivered; // Delivered

              const steps = [
                { id: 1, label: "ثبت سفارش", done: step1Done, current: !isPaid },
                { id: 2, label: "تایید پرداخت", done: step2Done, current: isPaid && !isPreparing && !isShipping && !isDelivered },
                { id: 3, label: "پردازش سفارش", done: step3Done, current: isPreparing && !isShipping && !isDelivered },
                { id: 4, label: "آماده‌سازی و ارسال", done: step4Done, current: isShipping && !isDelivered },
                { id: 5, label: "تحویل مرسوله", done: step5Done, current: isDelivered },
              ];

              return (
                <div className="bg-slate-50/70 rounded-2xl p-4 sm:p-6 border border-slate-100">
                  <div className="relative">
                    {/* Horizontal Connector Line */}
                    <div className="absolute top-4 sm:top-5 left-13 right-13 h-1 bg-slate-200 -translate-y-1/2 z-0">
                      <div
                        className="h-full bg-emerald-500 transition-all duration-500 rounded-full"
                        style={{
                          width: isDelivered
                            ? "100%"
                            : isShipping
                            ? "75%"
                            : isPreparing
                            ? "50%"
                            : isPaid
                            ? "25%"
                            : "0%",
                        }}
                      />
                    </div>

                    {/* Step Nodes */}
                    <div className="grid grid-cols-5 gap-1 sm:gap-2 text-center relative z-10">
                      {steps.map((s) => (
                        <div key={s.id} className="flex flex-col items-center gap-2">
                          <div
                            className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                              s.done
                                ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/20 ring-4 ring-emerald-50"
                                : s.current
                                ? "bg-[#2563eb] text-white shadow-md shadow-blue-500/30 ring-4 ring-blue-100 animate-pulse"
                                : "bg-white border-2 border-slate-200 text-slate-400"
                            }`}
                          >
                            {s.done ? (
                              <Check className="w-4 h-4 sm:w-5 sm:h-5 stroke-3" />
                            ) : (
                              <span className="text-xs font-bold font-mono">{toPersianDigits(s.id)}</span>
                            )}
                          </div>
                          <span
                            className={`text-[10px] sm:text-xs font-bold leading-tight ${
                              s.done
                                ? "text-emerald-700"
                                : s.current
                                ? "text-[#2563eb] font-black"
                                : "text-slate-400"
                            }`}
                          >
                            {s.label}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })()}

            {order.items && order.items.length > 0 && (
              <div className="space-y-3 pt-4 border-t border-slate-100">
                <h3 className="text-xs font-black text-slate-800">اقلام سفارش:</h3>
                <div className="divide-y divide-slate-100 border border-slate-100 rounded-2xl p-2 bg-white">
                  {order.items.map((item, idx) => (
                    <div key={idx} className="py-2.5 px-3 flex items-center justify-between text-xs gap-3">
                      <div className="flex items-center gap-2.5">
                        {item.image && (
                          <img src={item.image} alt={item.title} className="w-10 h-10 object-contain rounded-lg bg-slate-50 p-1 border border-slate-200" />
                        )}
                        <div>
                          <Link
                            href={`/products/${item.productId}`}
                            className="font-bold text-slate-800 hover:text-[#2563eb] transition-colors inline-flex items-center gap-1 cursor-pointer"
                          >
                            <span>{item.title}</span>
                            <ExternalLink className="w-3 h-3 text-slate-400" />
                          </Link>
                          {item.color && <span className="text-[10px] text-slate-400 block">رنگ: {item.color}</span>}
                        </div>
                      </div>
                      <span className="text-slate-500 font-mono">تعداد: {toPersianDigits(item.quantity)}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default function TrackOrderPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#f8fafc]">
      <Header />
      <main className="flex-1">
        <Suspense fallback={<div className="py-20 text-center"><Loader2 className="w-8 h-8 animate-spin text-[#2563eb] mx-auto" /></div>}>
          <TrackOrderContent />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
