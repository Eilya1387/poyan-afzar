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

            {/* Progress Steps */}
            <div className="grid grid-cols-4 gap-2 text-center pt-2">
              <div className="flex flex-col items-center gap-2">
                <div className="w-9 h-9 rounded-full bg-[#0b1528] text-white flex items-center justify-center shadow-xs">
                  <Check className="w-4 h-4 stroke-[2.5]" />
                </div>
                <span className="text-[11px] font-bold text-slate-800">ثبت سفارش</span>
              </div>

              <div className="flex flex-col items-center gap-2">
                <div className={`w-9 h-9 rounded-full flex items-center justify-center shadow-xs ${
                  order.paymentStatus === "PAID" || order.paymentStatus === "paid"
                    ? "bg-[#0b1528] text-white"
                    : "bg-slate-100 text-slate-400"
                }`}>
                  <Check className="w-4 h-4 stroke-[2.5]" />
                </div>
                <span className="text-[11px] font-bold text-slate-800">تایید پرداخت</span>
              </div>

              <div className="flex flex-col items-center gap-2">
                <div className={`w-9 h-9 rounded-full flex items-center justify-center shadow-md ${
                  order.shippingStatus === "shipping" || order.shippingStatus === "preparing"
                    ? "bg-[#2563eb] text-white ring-4 ring-blue-100"
                    : "bg-slate-100 text-slate-400"
                }`}>
                  <Truck className="w-4 h-4" />
                </div>
                <span className="text-[11px] font-black text-[#2563eb]">آماده‌سازی و ارسال</span>
              </div>

              <div className="flex flex-col items-center gap-2">
                <div className={`w-9 h-9 rounded-full flex items-center justify-center ${
                  order.shippingStatus === "delivered"
                    ? "bg-emerald-600 text-white"
                    : "bg-slate-100 text-slate-400"
                }`}>
                  <Home className="w-4 h-4" />
                </div>
                <span className="text-[11px] font-medium text-slate-400">تحویل مرسوله</span>
              </div>
            </div>

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
