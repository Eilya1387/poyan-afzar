"use client";

import React, { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { CheckCircle2, XCircle, Loader2, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { paymentsApi, PaymentVerifyResult } from "@/lib/api/payments";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

function PaymentVerifyContent() {
  const searchParams = useSearchParams();
  const authority = searchParams.get("authority") || "";
  const status = searchParams.get("status") || "OK";

  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState<PaymentVerifyResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function verify() {
      if (!authority) {
        setError("کد شناسه پرداخت یافت نشد.");
        setLoading(false);
        return;
      }

      try {
        const res = await paymentsApi.verifyPayment(authority, status);
        setResult(res);
      } catch (err: any) {
        setError(err?.message || "خطا در تأیید تراکنش پرداخت");
      } finally {
        setLoading(false);
      }
    }
    verify();
  }, [authority, status]);

  const toPersianDigits = (n: number | string) => {
    const persianDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
    return n.toString().replace(/[0-9]/g, (w) => persianDigits[+w]);
  };

  const formatPrice = (num?: number) => {
    if (!num) return "۰";
    const persianDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
    return num.toLocaleString("fa-IR").replace(/[0-9]/g, (w) => persianDigits[+w]);
  };

  return (
    <div className="max-w-md w-full mx-auto my-12 bg-white rounded-3xl border border-slate-200 p-8 shadow-xl text-center space-y-6">
      {loading ? (
        <div className="py-12 space-y-4">
          <Loader2 className="w-12 h-12 animate-spin text-[#2563eb] mx-auto" />
          <h2 className="text-base font-black text-slate-800">
            در حال تأیید تراکنش با درگاه بانکی...
          </h2>
          <p className="text-xs text-slate-400">لطفاً صفحه را نبندید</p>
        </div>
      ) : error || !result?.success ? (
        <div className="space-y-4">
          <div className="w-16 h-16 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center mx-auto border-4 border-rose-100">
            <XCircle className="w-10 h-10" />
          </div>
          <h2 className="text-lg font-black text-slate-900">
            پرداخت ناموفق بود
          </h2>
          <p className="text-xs text-slate-500">
            {error || result?.message || "تراکنش توسط کاربر لغو شد یا مشکلی در پرداخت به وجود آمد."}
          </p>
          <div className="pt-4 flex items-center justify-center gap-3">
            <Link href="/cart">
              <Button variant="primary" size="md" className="font-bold text-xs">
                بازگشت به سبد خرید
              </Button>
            </Link>
            <Link href="/">
              <Button variant="outline" size="md" className="font-bold text-xs">
                صفحه اصلی
              </Button>
            </Link>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto border-4 border-emerald-100">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <h2 className="text-lg font-black text-slate-900">
            پرداخت با موفقیت انجام شد
          </h2>
          <p className="text-xs text-slate-500">
            {result.message || "سفارش شما با موفقیت تایید گردید و در صف پردازش انبار قرار گرفت."}
          </p>

          <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100 text-xs space-y-2 text-right">
            {result.trackingCode && (
              <div className="flex items-center justify-between">
                <span className="text-slate-500">کد رهگیری:</span>
                <span className="font-mono font-black text-[#2563eb]" dir="ltr">#{result.trackingCode}</span>
              </div>
            )}
            {result.refId && (
              <div className="flex items-center justify-between">
                <span className="text-slate-500">شماره ارجاع بانک:</span>
                <span className="font-mono font-bold text-slate-800" dir="ltr">{result.refId}</span>
              </div>
            )}
            {result.amount && (
              <div className="flex items-center justify-between">
                <span className="text-slate-500">مبلغ تراکنش:</span>
                <span className="font-black text-slate-900">{formatPrice(result.amount)} تومان</span>
              </div>
            )}
            {result.cardPan && (
              <div className="flex items-center justify-between">
                <span className="text-slate-500">شماره کارت:</span>
                <span className="font-mono text-slate-600" dir="ltr">{result.cardPan}</span>
              </div>
            )}
          </div>

          <div className="pt-4 flex items-center justify-center gap-3">
            <Link href="/panel?tab=orders">
              <Button variant="primary" size="md" className="font-bold text-xs">
                مشاهده سفارش‌ها
              </Button>
            </Link>
            <Link href="/">
              <Button variant="outline" size="md" className="font-bold text-xs">
                صفحه اصلی
              </Button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default function PaymentVerifyPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#f8fafc]">
      <Header />
      <main className="flex-1 flex items-center justify-center p-4">
        <Suspense fallback={<div className="py-20 text-center"><Loader2 className="w-8 h-8 animate-spin mx-auto text-[#2563eb]" /></div>}>
          <PaymentVerifyContent />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
