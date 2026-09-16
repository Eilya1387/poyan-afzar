"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
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
            با ثبت‌نام در خبرنامه تک‌مارکت، اولین نفری باشید که از جشنواره‌های تخفیف مطلع می‌شوید.
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
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="آدرس ایمیل خود را وارد کنید..."
                className="bg-white border border-slate-200 focus:border-[#2563eb] rounded-xl px-4 py-2.5 text-xs sm:text-sm text-slate-800 placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all min-w-60"
              />
              <Button
                type="submit"
                variant="primary"
                size="md"
                className="font-bold px-6 shrink-0"
              >
                عضویت
              </Button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
