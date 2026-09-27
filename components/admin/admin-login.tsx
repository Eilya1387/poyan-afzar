"use client";

import React, { useState } from "react";
import { useAdminStore } from "@/lib/admin-store";
import { Button } from "@/components/ui/button";
import { Lock, User, ShieldCheck, ArrowLeft, Eye, EyeOff, Store } from "lucide-react";
import Link from "next/link";

export function AdminLogin() {
  const [username, setUsername] = useState("admin@poyanafzar.ir");
  const [password, setPassword] = useState("admin123");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const login = useAdminStore((state) => state.login);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const result = await login(username, password);
      if (!result.success) {
        setError(result.message || "اطلاعات ورود اشتباه است.");
      }
    } catch (err: any) {
      setError(err?.message || "خطا در اتصال به سرور احراز هویت");
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickFill = () => {
    setUsername("admin@poyanafzar.ir");
    setPassword("admin123");
    setError(null);
  };

  return (
    <div
      className="min-h-screen w-full flex items-center justify-center p-4 bg-slate-50 dark:bg-[#0b0f19] text-slate-900 dark:text-white relative"
      dir="rtl"
    >
      <div className="w-full max-w-md z-10">
        {/* Top Logo / Brand Info */}
        <div className="text-center mb-6">
          <Link href="/" className="inline-flex items-center gap-2.5 group cursor-pointer mb-4">
            <div className="w-11 h-11 rounded-2xl bg-[#0b1528] dark:bg-slate-800 border border-transparent dark:border-slate-700 flex items-center justify-center text-white font-black text-2xl shadow-xs group-hover:bg-[#162544] transition-colors">
              <span className="text-[#38bdf8]">پ</span>
            </div>
            <span className="text-2xl font-black tracking-tight text-[#0b1528] dark:text-white">
              پویان <span className="text-[#2563eb] dark:text-blue-400">افزار</span>
            </span>
          </Link>

          <div className="flex items-center justify-center gap-1.5 text-blue-600 dark:text-blue-400 text-xs font-bold mb-2">
            <ShieldCheck className="w-4 h-4" />
            <span>کنترل پنل مدیریت سامانه</span>
          </div>

          <h1 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white">
            ورود به حساب مدیریت
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-xs mt-1 font-medium">
            لطفاً نام کاربری و رمز عبور مدیر سامانه را وارد نمایید
          </p>
        </div>

        {/* Card Form */}
        <div className="bg-white dark:bg-[#111827] border border-slate-200/90 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl text-right">
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 text-rose-700 dark:text-rose-400 text-xs font-medium flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-rose-500 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* Username */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                نام کاربری
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="admin@poyanafzar.ir"
                required
                className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-900 hover:bg-slate-100/50 dark:hover:bg-slate-800 focus:bg-white dark:focus:bg-slate-900 border border-slate-200 dark:border-slate-700 focus:border-blue-600 focus:ring-4 focus:ring-blue-500/10 rounded-xl text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 text-sm font-semibold transition-all"
                dir="ltr"
              />
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                  <Lock className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                  رمز عبور
                </label>
                <button
                  type="button"
                  onClick={handleQuickFill}
                  className="text-[11px] text-blue-600 dark:text-blue-400 hover:text-blue-800 transition-colors font-bold cursor-pointer"
                >
                  تکمیل خودکار (پیش‌فرض)
                </button>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full px-3.5 py-2.5 pl-10 bg-slate-50 dark:bg-slate-900 hover:bg-slate-100/50 dark:hover:bg-slate-800 focus:bg-white dark:focus:bg-slate-900 border border-slate-200 dark:border-slate-700 focus:border-blue-600 focus:ring-4 focus:ring-blue-500/10 rounded-xl text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 text-sm font-semibold transition-all"
                  dir="ltr"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors cursor-pointer"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Quick Demo Hint */}
            <div className="p-3 bg-blue-50/70 dark:bg-blue-950/40 border border-blue-100 dark:border-blue-900/60 rounded-2xl flex items-center justify-between text-xs text-blue-900 dark:text-blue-200">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
                <span>
                  حساب پیش‌فرض مدیر:{" "}
                  <strong className="font-mono text-blue-700 dark:text-blue-300">admin@poyanafzar.ir</strong> /{" "}
                  <strong className="font-mono text-blue-700 dark:text-blue-300">admin123</strong>
                </span>
              </div>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              variant="secondary"
              size="lg"
              isLoading={isLoading}
              leftIcon={<ArrowLeft className="w-4 h-4" />}
              className="w-full mt-2 font-black shadow-md shadow-blue-600/15"
            >
              ورود به پنل مدیریت
            </Button>
          </form>

          {/* Back to store */}
          <div className="mt-6 pt-5 border-t border-slate-100 dark:border-slate-800 text-center">
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 w-full py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
            >
              <Store className="w-4 h-4 text-slate-500 dark:text-slate-400" />
              <span>بازگشت به صفحه اصلی فروشگاه</span>
            </Link>
          </div>
        </div>

        {/* Footer info */}
        <p className="text-center text-xs text-slate-400 dark:text-slate-500 mt-6 font-medium">
          تمامی حقوق برای فروشگاه پویان افزار محفوظ است © ۱۴۰۴
        </p>
      </div>
    </div>
  );
}
