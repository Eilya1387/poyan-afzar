"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { newsletterApi } from "@/lib/api/newsletter";
import { Loader2 } from "lucide-react";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setLoading(true);
    setError(null);
    try {
      await newsletterApi.subscribe(email.trim());
      setSubscribed(true);
    } catch (err: any) {
      setError(err?.message || "خطا در ثبت ایمیل. لطفاً مجدداً تلاش نمایید.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-6">
      <div className="bg-slate-100/70 border border-slate-200/80 rounded-3xl p-6 sm:p-8 flex flex-col lg:flex-row items-center justify-between gap-6">
        <div className="text-right w-full lg:w-auto">
          <h2 className="text-base sm:text-lg font-black text-[#0b1528]">
            از تخفیف‌ها و جدیدترین محصولات باخبر شوید!
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 font-medium mt-1">
            با ثبت‌نام در خبرنامه پویان افزار، اولین نفری باشید که از جشنواره‌های تخفیف مطلع می‌شوید.
          </p>
        </div>

        <div className="w-full lg:w-auto shrink-0">
          {subscribed ? (
            <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-center">
              ایمیل شما با موفقیت ثبت شد. متشکریم!
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row items-stretch gap-2.5 w-full max-w-md"
            >
              <div className="flex-1">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="آدرس ایمیل خود را وارد کنید..."
                  className="w-full bg-white border border-slate-200 focus:border-[#2563eb] rounded-xl px-4 py-2.5 text-xs sm:text-sm text-slate-800 placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all min-w-60"
                />
                {error && (
                  <p className="text-rose-600 text-xs mt-1 text-right">{error}</p>
                )}
              </div>
              <Button
                type="submit"
                variant="primary"
                size="md"
                disabled={loading}
                className="font-bold px-6 shrink-0 h-10"
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "عضویت"}
              </Button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
