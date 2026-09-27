"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/toast";
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
      toast.success(
        "عضویت در خبرنامه با موفقیت انجام شد.",
        "از جدیدترین تخفیف‌ها و پیشنهادات ویژه پویان افزار باخبر خواهید شد."
      );
    } catch (err: any) {
      const msg = err?.message || "خطا در ثبت ایمیل. لطفاً مجدداً تلاش نمایید.";
      setError(msg);
      toast.error("خطا در عضویت خبرنامه", msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-6">
      <div className="bg-slate-100/70 dark:bg-[#111827] border border-slate-200/80 dark:border-slate-800 rounded-3xl p-6 sm:p-8 flex flex-col lg:flex-row items-center justify-between gap-6">
        <div className="text-right w-full lg:w-auto">
          <h2 className="text-base sm:text-lg font-black text-[#0b1528] dark:text-white">
            از تخفیف‌ها و جدیدترین محصولات باخبر شوید!
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-medium mt-1">
            با ثبت‌نام در خبرنامه پویان افزار، اولین نفری باشید که از جشنواره‌های تخفیف مطلع می‌شوید.
          </p>
        </div>

        <div className="w-full lg:w-auto shrink-0">
          {subscribed ? (
            <div className="bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 text-emerald-700 dark:text-emerald-300 px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-center">
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
                  className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:border-[#2563eb] rounded-xl px-4 py-2.5 text-xs sm:text-sm text-slate-800 dark:text-white placeholder:text-slate-600 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-950 transition-all min-w-60"
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
