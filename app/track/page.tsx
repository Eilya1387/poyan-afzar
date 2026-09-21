"use client";

import React, { useState } from "react";
import { Search, Package, Check, Truck, Home, Loader2, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { ordersApi, OrderDetail } from "@/lib/api/orders";

export default function TrackOrderPage() {
  const [trackingCode, setTrackingCode] = useState("");
  const [order, setOrder] = useState<OrderDetail | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleTrack = async (e: React.FormEvent) => {
    e.preventDefault();
    const clean = trackingCode.trim().replace("#", "");
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

  const formatPrice = (num?: number) => {
    if (!num) return "۰";
    const persianDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
    return num.toLocaleString("fa-IR").replace(/[0-9]/g, (w) => persianDigits[+w]);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f8fafc]">
      <Header />
      <main className="flex-1 max-w-3xl w-full mx-auto px-4 py-12 text-right">
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xl space-y-6">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#2563eb] flex items-center justify-center mx-auto">
              <Package className="w-6 h-6" />
            </div>
            <h1 className="text-xl font-black text-slate-900">
              پیگیری سفارش
            </h1>
            <p className="text-xs text-slate-500">
              کد رهگیری سفارش خود را وارد کنید تا از آخرین وضعیت ارسال مطلع شوید
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
            <div className="space-y-6 pt-6 border-t border-slate-100">
              <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-50 rounded-2xl p-4 border border-slate-100">
                <div className="space-y-1">
                  <span className="text-xs text-slate-500">کد رهگیری:</span>
                  <div className="font-mono font-black text-sm text-[#2563eb]" dir="ltr">
                    #{order.trackingCode}
                  </div>
                </div>

                <div className="space-y-1">
                  <span className="text-xs text-slate-500">وضعیت فعلی:</span>
                  <div>
                    <span className="bg-blue-50 text-[#2563eb] text-xs font-black px-3 py-1 rounded-full border border-blue-100">
                      {order.statusFa || order.paymentStatusFa || order.paymentStatus}
                    </span>
                  </div>
                </div>

                <div className="space-y-1">
                  <span className="text-xs text-slate-500">مبلغ سفارش:</span>
                  <div className="font-bold text-slate-900 text-sm">
                    {formatPrice(order.finalAmount || order.amount)} تومان
                  </div>
                </div>
              </div>

              {/* Progress Steps */}
              <div className="grid grid-cols-4 gap-2 text-center pt-2">
                <div className="flex flex-col items-center gap-2">
                  <div className="w-9 h-9 rounded-full bg-[#0b1528] text-white flex items-center justify-center">
                    <Check className="w-4 h-4" />
                  </div>
                  <span className="text-[11px] font-bold text-slate-800">ثبت سفارش</span>
                </div>

                <div className="flex flex-col items-center gap-2">
                  <div className={`w-9 h-9 rounded-full flex items-center justify-center ${
                    order.paymentStatus === "PAID" || order.paymentStatus === "paid"
                      ? "bg-[#0b1528] text-white"
                      : "bg-slate-100 text-slate-400"
                  }`}>
                    <Check className="w-4 h-4" />
                  </div>
                  <span className="text-[11px] font-bold text-slate-800">پرداخت</span>
                </div>

                <div className="flex flex-col items-center gap-2">
                  <div className="w-9 h-9 rounded-full bg-[#2563eb] text-white flex items-center justify-center">
                    <Truck className="w-4 h-4" />
                  </div>
                  <span className="text-[11px] font-bold text-[#2563eb]">ارسال</span>
                </div>

                <div className="flex flex-col items-center gap-2">
                  <div className="w-9 h-9 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center">
                    <Home className="w-4 h-4" />
                  </div>
                  <span className="text-[11px] font-medium text-slate-400">تحویل</span>
                </div>
              </div>

              {order.items && order.items.length > 0 && (
                <div className="space-y-3 pt-4 border-t border-slate-100">
                  <h3 className="text-xs font-bold text-slate-700">اقلام سفارش:</h3>
                  <div className="divide-y divide-slate-100">
                    {order.items.map((item, idx) => (
                      <div key={idx} className="py-2.5 flex items-center justify-between text-xs">
                        <span className="font-bold text-slate-800">{item.title}</span>
                        <span className="text-slate-500 font-mono">تعداد: {item.quantity}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
