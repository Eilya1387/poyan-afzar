"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  User,
  Truck,
  CheckCircle2,
  Heart,
  Wallet,
  ShoppingBag,
  MapPin,
  Bell,
  Lock,
  LogOut,
  LayoutGrid,
  ShieldCheck,
  ArrowLeft,
  RotateCw,
  Home,
  Briefcase,
  Plus,
  Trash2,
  Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "./auth-context";
import { useFavoritesStore, useAddressStore, useCartStore } from "@/lib/store";
import { AddressModal } from "./address-modal";

type TabType = "dashboard" | "orders" | "favorites" | "addresses" | "wallet" | "notifications" | "profile" | "security";

export function UserPanelView() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user, isLoggedIn, isLoaded, logout } = useAuth();
  const { favorites, removeFavorite } = useFavoritesStore();
  const { addresses, removeAddress, setDefaultAddress } = useAddressStore();
  const addItem = useCartStore((state) => state.addItem);

  const [activeTab, setActiveTab] = useState<TabType>("dashboard");
  const [addressModalOpen, setAddressModalOpen] = useState(false);

  useEffect(() => {
    const tabParam = searchParams.get("tab") as TabType | null;
    if (tabParam) {
      setActiveTab(tabParam);
    }
  }, [searchParams]);

  const toPersianDigits = (n: number | string) => {
    const persianDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
    return n.toString().replace(/[0-9]/g, (w) => persianDigits[+w]);
  };

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  if (!isLoaded) {
    return (
      <div className="max-w-md mx-auto py-24 text-center">
        <span className="inline-block w-8 h-8 border-3 border-[#2563eb] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const displayName = user ? `${user.firstName} ${user.lastName}` : "ایلیا";
  const displayPhone = user?.phone || "۰۹۱۲۳۴۵۶۷۸۹";

  return (
    <div className="space-y-6 text-right">
      <nav aria-label="مسیر راهنما" className="py-2 text-xs text-slate-500">
        <ol className="flex items-center gap-2">
          <li>
            <Link href="/" className="hover:text-[#2563eb] transition-colors cursor-pointer">
              خانه
            </Link>
          </li>
          <li className="text-slate-300">/</li>
          <li className="text-slate-800 font-bold" aria-current="page">
            حساب کاربری
          </li>
        </ol>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <div className="lg:col-span-8 xl:col-span-9 order-2 lg:order-1 space-y-6">
          {activeTab === "dashboard" && (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                <div className="bg-white rounded-2xl border border-slate-200/90 p-4 sm:p-5 flex items-center justify-between shadow-2xs">
                  <div className="flex flex-col text-right">
                    <span className="text-[11px] sm:text-xs font-bold text-slate-500">
                      سفارش‌های فعال
                    </span>
                    <div className="flex items-baseline gap-1 mt-1.5">
                      <span className="text-xl sm:text-2xl font-black text-slate-900">
                        {toPersianDigits(2)}
                      </span>
                      <span className="text-[11px] text-slate-400 font-medium">در جریان</span>
                    </div>
                  </div>
                  <div className="w-11 h-11 rounded-xl bg-blue-50 text-[#2563eb] flex items-center justify-center shrink-0">
                    <Truck className="w-5 h-5" />
                  </div>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200/90 p-4 sm:p-5 flex items-center justify-between shadow-2xs">
                  <div className="flex flex-col text-right">
                    <span className="text-[11px] sm:text-xs font-bold text-slate-500">
                      سفارش‌های تحویل شده
                    </span>
                    <div className="flex items-baseline gap-1 mt-1.5">
                      <span className="text-xl sm:text-2xl font-black text-slate-900">
                        {toPersianDigits(14)}
                      </span>
                      <span className="text-[11px] text-slate-400 font-medium">کل سفارش‌ها</span>
                    </div>
                  </div>
                  <div className="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200/90 p-4 sm:p-5 flex items-center justify-between shadow-2xs">
                  <div className="flex flex-col text-right">
                    <span className="text-[11px] sm:text-xs font-bold text-slate-500">
                      علاقه‌مندی‌ها
                    </span>
                    <div className="flex items-baseline gap-1 mt-1.5">
                      <span className="text-xl sm:text-2xl font-black text-slate-900">
                        {toPersianDigits(favorites.length || 5)}
                      </span>
                      <span className="text-[11px] text-slate-400 font-medium">کالا</span>
                    </div>
                  </div>
                  <div className="w-11 h-11 rounded-xl bg-rose-50 text-rose-500 flex items-center justify-center shrink-0">
                    <Heart className="w-5 h-5" />
                  </div>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200/90 p-4 sm:p-5 flex items-center justify-between shadow-2xs">
                  <div className="flex flex-col text-right">
                    <span className="text-[11px] sm:text-xs font-bold text-slate-500">
                      کیف پول
                    </span>
                    <div className="flex items-baseline gap-1 mt-1.5">
                      <span className="text-base sm:text-lg font-black text-slate-900">
                        ۱,۲۵۰,۰۰۰
                      </span>
                      <span className="text-[10px] text-slate-400 font-medium">تومان</span>
                    </div>
                  </div>
                  <div className="w-11 h-11 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                    <Wallet className="w-5 h-5" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-2xs space-y-6">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xs sm:text-sm font-bold text-slate-500">
                      پیگیری آخرین سفارش
                    </span>
                    <span className="text-sm sm:text-base font-black text-slate-900" dir="ltr">
                      #TK-89423
                    </span>
                  </div>

                  <span className="bg-blue-50 text-[#2563eb] text-xs font-black px-3 py-1 rounded-full border border-blue-100/60 shadow-2xs">
                    در حال پردازش
                  </span>
                </div>

                <div className="relative pt-4 pb-2">
                  <div className="absolute top-9 left-6 right-6 h-0.5 bg-slate-200 -translate-y-1/2 z-0 hidden sm:block" />
                  <div className="absolute top-9 right-6 w-1/2 h-0.5 bg-[#0b1528] -translate-y-1/2 z-0 hidden sm:block" />

                  <div className="grid grid-cols-5 gap-2 text-center relative z-10">
                    <div className="flex flex-col items-center gap-2">
                      <div className="w-10 h-10 rounded-full bg-[#0b1528] text-white flex items-center justify-center shadow-xs">
                        <Check className="w-5 h-5 stroke-[2.5]" />
                      </div>
                      <span className="text-[11px] font-bold text-slate-800">ثبت سفارش</span>
                    </div>

                    <div className="flex flex-col items-center gap-2">
                      <div className="w-10 h-10 rounded-full bg-[#0b1528] text-white flex items-center justify-center shadow-xs">
                        <Check className="w-5 h-5 stroke-[2.5]" />
                      </div>
                      <span className="text-[11px] font-bold text-slate-800">تایید پرداخت</span>
                    </div>

                    <div className="flex flex-col items-center gap-2">
                      <div className="w-10 h-10 rounded-full bg-[#2563eb] text-white flex items-center justify-center shadow-md ring-4 ring-blue-100">
                        <RotateCw className="w-5 h-5 animate-spin" />
                      </div>
                      <span className="text-[11px] font-black text-[#2563eb]">آماده‌سازی</span>
                    </div>

                    <div className="flex flex-col items-center gap-2">
                      <div className="w-10 h-10 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center">
                        <Truck className="w-5 h-5" />
                      </div>
                      <span className="text-[11px] font-medium text-slate-400">ارسال</span>
                    </div>

                    <div className="flex flex-col items-center gap-2">
                      <div className="w-10 h-10 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center">
                        <Home className="w-5 h-5" />
                      </div>
                      <span className="text-[11px] font-medium text-slate-400">تحویل</span>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex justify-start">
                  <button
                    type="button"
                    onClick={() => setActiveTab("orders")}
                    className="text-xs font-bold text-[#2563eb] hover:text-[#1d4ed8] flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <span>مشاهده جزئیات کامل سفارش</span>
                    <ArrowLeft className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-2xs space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <h2 className="text-sm sm:text-base font-black text-slate-900">
                    سفارش‌های اخیر
                  </h2>
                  <button
                    type="button"
                    onClick={() => setActiveTab("orders")}
                    className="text-xs font-bold text-[#2563eb] hover:underline cursor-pointer"
                  >
                    همه سفارش‌ها
                  </button>
                </div>

                <div className="overflow-x-auto no-scrollbar">
                  <table className="w-full text-xs text-right whitespace-nowrap">
                    <thead>
                      <tr className="text-slate-400 font-bold border-b border-slate-100">
                        <th className="py-3 px-2 font-medium">شماره سفارش</th>
                        <th className="py-3 px-2 font-medium">تاریخ</th>
                        <th className="py-3 px-2 font-medium">مبلغ (تومان)</th>
                        <th className="py-3 px-2 font-medium">وضعیت</th>
                        <th className="py-3 px-2 font-medium text-center">عملیات</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      <tr>
                        <td className="py-3.5 px-2 font-bold text-slate-900" dir="ltr">#TK-89423</td>
                        <td className="py-3.5 px-2 text-slate-600 font-medium">۱۴ فروردین ۱۴۰۳</td>
                        <td className="py-3.5 px-2 font-bold text-slate-900">۳,۴۵۰,۰۰۰</td>
                        <td className="py-3.5 px-2">
                          <span className="inline-block bg-blue-50 text-[#2563eb] text-[11px] font-bold px-2.5 py-0.5 rounded-full">
                            در حال پردازش
                          </span>
                        </td>
                        <td className="py-3.5 px-2 text-center">
                          <button
                            type="button"
                            onClick={() => setActiveTab("orders")}
                            className="font-bold text-[#2563eb] hover:underline cursor-pointer"
                          >
                            مشاهده جزئیات
                          </button>
                        </td>
                      </tr>
                      <tr>
                        <td className="py-3.5 px-2 font-bold text-slate-900" dir="ltr">#TK-88102</td>
                        <td className="py-3.5 px-2 text-slate-600 font-medium">۲ فروردین ۱۴۰۳</td>
                        <td className="py-3.5 px-2 font-bold text-slate-900">۸۹۰,۰۰۰</td>
                        <td className="py-3.5 px-2">
                          <span className="inline-block bg-emerald-50 text-emerald-700 text-[11px] font-bold px-2.5 py-0.5 rounded-full">
                            تحویل شده
                          </span>
                        </td>
                        <td className="py-3.5 px-2 text-center">
                          <button
                            type="button"
                            onClick={() => setActiveTab("orders")}
                            className="font-bold text-[#2563eb] hover:underline cursor-pointer"
                          >
                            مشاهده جزئیات
                          </button>
                        </td>
                      </tr>
                      <tr>
                        <td className="py-3.5 px-2 font-bold text-slate-900" dir="ltr">#TK-87541</td>
                        <td className="py-3.5 px-2 text-slate-600 font-medium">۲۸ اسفند ۱۴۰۲</td>
                        <td className="py-3.5 px-2 font-bold text-slate-900">۱۲,۲۰۰,۰۰۰</td>
                        <td className="py-3.5 px-2">
                          <span className="inline-block bg-rose-50 text-rose-600 text-[11px] font-bold px-2.5 py-0.5 rounded-full">
                            لغو شده
                          </span>
                        </td>
                        <td className="py-3.5 px-2 text-center">
                          <button
                            type="button"
                            onClick={() => setActiveTab("orders")}
                            className="font-bold text-[#2563eb] hover:underline cursor-pointer"
                          >
                            مشاهده جزئیات
                          </button>
                        </td>
                      </tr>
                      <tr>
                        <td className="py-3.5 px-2 font-bold text-slate-900" dir="ltr">#TK-86930</td>
                        <td className="py-3.5 px-2 text-slate-600 font-medium">۱۵ اسفند ۱۴۰۲</td>
                        <td className="py-3.5 px-2 font-bold text-slate-900">۱,۴۵۰,۰۰۰</td>
                        <td className="py-3.5 px-2">
                          <span className="inline-block bg-indigo-50 text-indigo-600 text-[11px] font-bold px-2.5 py-0.5 rounded-full">
                            ارسال شده
                          </span>
                        </td>
                        <td className="py-3.5 px-2 text-center">
                          <button
                            type="button"
                            onClick={() => setActiveTab("orders")}
                            className="font-bold text-[#2563eb] hover:underline cursor-pointer"
                          >
                            مشاهده جزئیات
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-2xs space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                    <h2 className="text-sm font-black text-slate-900">
                      علاقه‌مندی‌های اخیر
                    </h2>
                    <button
                      type="button"
                      onClick={() => setActiveTab("favorites")}
                      className="text-xs font-bold text-[#2563eb] hover:underline cursor-pointer"
                    >
                      همه
                    </button>
                  </div>

                  <div className="space-y-3">
                    {favorites.slice(0, 2).map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center justify-between gap-3 p-2.5 rounded-xl border border-slate-100 bg-slate-50/40 hover:bg-slate-50 transition-colors"
                      >
                        <button
                          type="button"
                          onClick={() => removeFavorite(item.id)}
                          className="text-red-500 hover:text-red-600 p-1 cursor-pointer"
                          aria-label="حذف از علاقه‌مندی‌ها"
                        >
                          <Heart className="w-4 h-4 fill-red-500 text-red-500" />
                        </button>

                        <div className="flex flex-col items-end flex-1 min-w-0">
                          <h3 className="text-xs font-bold text-slate-800 line-clamp-1">
                            {item.title}
                          </h3>
                          <span className="text-[11px] font-black text-[#0b1528] mt-1">
                            {item.priceString} تومان
                          </span>
                        </div>

                        <div className="w-14 h-14 rounded-xl overflow-hidden bg-slate-100 shrink-0 border border-slate-200/80">
                          <img
                            src={item.image}
                            alt={item.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-2xs space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                    <h2 className="text-sm font-black text-slate-900">
                      آدرس‌های ثبت شده
                    </h2>
                    <button
                      type="button"
                      onClick={() => setActiveTab("addresses")}
                      className="text-xs font-bold text-[#2563eb] hover:underline cursor-pointer"
                    >
                      مدیریت
                    </button>
                  </div>

                  <div className="space-y-3">
                    {addresses.slice(0, 2).map((addr) => (
                      <div
                        key={addr.id}
                        className="p-3 rounded-xl border border-slate-100 bg-slate-50/40 text-right space-y-1.5"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] text-slate-400 font-mono">
                            کد پستی: {toPersianDigits(addr.postalCode)}
                          </span>
                          <div className="flex items-center gap-1.5">
                            <span className="text-xs font-black text-slate-800">{addr.title}</span>
                            {addr.id === "addr-home" ? (
                              <Home className="w-3.5 h-3.5 text-slate-500" />
                            ) : (
                              <Briefcase className="w-3.5 h-3.5 text-slate-500" />
                            )}
                          </div>
                        </div>
                        <p className="text-[11px] text-slate-600 font-medium leading-relaxed">
                          {addr.fullAddress}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}

          {activeTab === "addresses" && (
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div>
                  <h2 className="text-base font-black text-slate-900">آدرس‌های تحویل سفارش</h2>
                  <p className="text-xs text-slate-400 font-medium mt-0.5">
                    مدیریت نشانی‌ها جهت ارسال سریع سفارشات
                  </p>
                </div>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => setAddressModalOpen(true)}
                  className="font-bold text-xs gap-1.5"
                  rightIcon={<Plus className="w-4 h-4" />}
                >
                  افزودن آدرس جدید
                </Button>
              </div>

              <div className="space-y-4">
                {addresses.map((addr) => (
                  <div
                    key={addr.id}
                    className={`p-4 rounded-2xl border transition-all ${
                      addr.isDefault
                        ? "border-[#2563eb] bg-blue-50/30 ring-1 ring-blue-500/20"
                        : "border-slate-200 bg-slate-50/40"
                    }`}
                  >
                    <div className="flex items-center justify-between pb-2 border-b border-slate-100/80 mb-2">
                      <div className="flex items-center gap-2">
                        {!addr.isDefault && (
                          <button
                            type="button"
                            onClick={() => setDefaultAddress(addr.id)}
                            className="text-xs font-bold text-[#2563eb] hover:underline cursor-pointer"
                          >
                            انتخاب به عنوان پیش‌فرض
                          </button>
                        )}
                        <button
                          type="button"
                          onClick={() => removeAddress(addr.id)}
                          className="text-slate-400 hover:text-red-500 p-1 cursor-pointer transition-colors"
                          aria-label="حذف آدرس"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="flex items-center gap-2">
                        {addr.isDefault && (
                          <span className="bg-emerald-50 text-emerald-700 text-[10px] font-black px-2.5 py-0.5 rounded-full border border-emerald-200">
                            پیش‌فرض
                          </span>
                        )}
                        <span className="text-sm font-black text-slate-900">{addr.title}</span>
                      </div>
                    </div>

                    <p className="text-xs text-slate-700 leading-relaxed font-medium mb-3">
                      {addr.fullAddress}
                    </p>

                    <div className="flex flex-wrap items-center justify-between gap-3 text-[11px] text-slate-500 pt-1">
                      <span>تحویل‌گیرنده: {addr.receiverName} ({toPersianDigits(addr.receiverPhone)})</span>
                      <span className="font-mono">کد پستی: {toPersianDigits(addr.postalCode)}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "favorites" && (
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs space-y-6">
              <div className="pb-4 border-b border-slate-100">
                <h2 className="text-base font-black text-slate-900">لیست علاقه‌مندی‌ها</h2>
                <p className="text-xs text-slate-400 font-medium mt-0.5">
                  کالاهایی که برای خرید ذخیره کرده‌اید
                </p>
              </div>

              {favorites.length === 0 ? (
                <div className="py-12 text-center text-slate-400 text-xs">
                  هیچ محصولی در لیست علاقه‌مندی‌های شما وجود ندارد.
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {favorites.map((item) => (
                    <div
                      key={item.id}
                      className="bg-white rounded-2xl border border-slate-200 p-3.5 flex items-center justify-between gap-3 hover:shadow-xs transition-shadow"
                    >
                      <button
                        type="button"
                        onClick={() => removeFavorite(item.id)}
                        className="text-red-500 hover:text-red-600 p-1.5 cursor-pointer"
                        aria-label="حذف از علاقه‌مندی"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>

                      <div className="flex-1 text-right">
                        <h3 className="text-xs font-bold text-slate-900 line-clamp-2 leading-snug">
                          {item.title}
                        </h3>
                        <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-100">
                          <Button
                            variant="secondary"
                            size="sm"
                            onClick={() => {
                              addItem({
                                id: item.id,
                                title: item.title,
                                price: item.price,
                                image: item.image,
                              });
                            }}
                            className="text-[11px] font-bold px-3 py-1"
                          >
                            خرید
                          </Button>
                          <span className="text-xs font-black text-slate-900">
                            {item.priceString} تومان
                          </span>
                        </div>
                      </div>

                      <div className="w-16 h-16 rounded-xl overflow-hidden bg-slate-100 shrink-0 border border-slate-200/80">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === "orders" && (
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs space-y-6">
              <div className="pb-4 border-b border-slate-100">
                <h2 className="text-base font-black text-slate-900">تاریخچه سفارش‌ها</h2>
                <p className="text-xs text-slate-400 font-medium mt-0.5">
                  تمام سفارش‌های ثبت شده در فروشگاه پویان افزار
                </p>
              </div>

              <div className="space-y-4">
                <div className="rounded-2xl border border-slate-200 p-4 space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-100">
                    <span className="bg-blue-50 text-[#2563eb] text-xs font-black px-3 py-1 rounded-full">
                      در حال پردازش
                    </span>
                    <div className="flex items-center gap-3 text-xs font-bold text-slate-700">
                      <span>۱۴ فروردین ۱۴۰۳</span>
                      <span className="font-mono text-slate-900" dir="ltr">#TK-89423</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-xs pt-1">
                    <span className="font-bold text-slate-900">مبلغ کل: ۳,۴۵۰,۰۰۰ تومان</span>
                    <span className="text-slate-500 font-medium">شامل ۲ کالا • تحویل اکسپرس</span>
                  </div>
                </div>

                <div className="rounded-2xl border border-slate-200 p-4 space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-100">
                    <span className="bg-emerald-50 text-emerald-700 text-xs font-black px-3 py-1 rounded-full">
                      تحویل شده
                    </span>
                    <div className="flex items-center gap-3 text-xs font-bold text-slate-700">
                      <span>۲ فروردین ۱۴۰۳</span>
                      <span className="font-mono text-slate-900" dir="ltr">#TK-88102</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-xs pt-1">
                    <span className="font-bold text-slate-900">مبلغ کل: ۸۹۰,۰۰۰ تومان</span>
                    <span className="text-slate-500 font-medium">شامل ۱ کالا • تحویل عادی</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "wallet" && (
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs space-y-6">
              <div className="pb-4 border-b border-slate-100">
                <h2 className="text-base font-black text-slate-900">کیف پول اعتباری</h2>
                <p className="text-xs text-slate-400 font-medium mt-0.5">
                  موجودی کیف پول برای پرداخت‌های سریع و کش‌بک خریدها
                </p>
              </div>

              <div className="bg-linear-to-tr from-[#0b1528] to-[#1e3a8a] text-white p-6 rounded-3xl space-y-4 shadow-lg">
                <span className="text-xs text-blue-200 font-bold">موجودی فعلی</span>
                <div className="text-3xl font-black tracking-tight">
                  ۱,۲۵۰,۰۰۰ <span className="text-xs font-normal">تومان</span>
                </div>
                <div className="pt-2">
                  <Button variant="secondary" size="md" className="font-black text-xs">
                    افزایش موجودی
                  </Button>
                </div>
              </div>
            </div>
          )}

          {(activeTab === "notifications" || activeTab === "profile" || activeTab === "security") && (
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs space-y-4">
              <h2 className="text-base font-black text-slate-900">
                {activeTab === "notifications" && "اعلان‌ها"}
                {activeTab === "profile" && "اطلاعات حساب کاربری"}
                {activeTab === "security" && "امنیت و رمز عبور"}
              </h2>
              <div className="p-4 rounded-xl bg-slate-50 text-xs text-slate-600 leading-relaxed">
                اطلاعات این بخش با حساب تایید شده شما فعال است.
              </div>
            </div>
          )}
        </div>

        <div className="lg:col-span-4 xl:col-span-3 order-1 lg:order-2">
          <div className="bg-white rounded-3xl border border-slate-200/90 p-5 shadow-2xs space-y-5 sticky top-24">
            <div className="flex flex-col items-center text-center pb-4 border-b border-slate-100">
              <div className="w-16 h-16 rounded-full bg-[#1e293b] text-white flex items-center justify-center mb-3 shadow-sm">
                <User className="w-8 h-8 text-slate-200" />
              </div>

              <h2 className="text-base font-black text-slate-900 mb-0.5">
                سلام، {displayName}
              </h2>

              <p className="text-xs text-slate-400 font-mono mb-3" dir="ltr">
                {toPersianDigits(displayPhone)}
              </p>

              <div className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-700 text-[11px] font-bold px-3 py-1 rounded-full border border-emerald-200/70 shadow-2xs">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>حساب تکمیل شده (۹۰٪)</span>
              </div>
            </div>

            <nav aria-label="منوی حساب کاربری" className="space-y-1">
              <button
                type="button"
                onClick={() => setActiveTab("dashboard")}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeTab === "dashboard"
                    ? "bg-[#0b1528] text-white shadow-sm"
                    : "text-slate-700 hover:bg-slate-50"
                }`}
              >
                <span>داشبورد</span>
                <LayoutGrid className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("orders")}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeTab === "orders"
                    ? "bg-[#0b1528] text-white shadow-sm"
                    : "text-slate-700 hover:bg-slate-50"
                }`}
              >
                <span>سفارش‌های من</span>
                <ShoppingBag className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("favorites")}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeTab === "favorites"
                    ? "bg-[#0b1528] text-white shadow-sm"
                    : "text-slate-700 hover:bg-slate-50"
                }`}
              >
                <span>علاقه‌مندی‌ها</span>
                <Heart className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("addresses")}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeTab === "addresses"
                    ? "bg-[#0b1528] text-white shadow-sm"
                    : "text-slate-700 hover:bg-slate-50"
                }`}
              >
                <span>آدرس‌های من</span>
                <MapPin className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("wallet")}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeTab === "wallet"
                    ? "bg-[#0b1528] text-white shadow-sm"
                    : "text-slate-700 hover:bg-slate-50"
                }`}
              >
                <span>کیف پول</span>
                <Wallet className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("notifications")}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeTab === "notifications"
                    ? "bg-[#0b1528] text-white shadow-sm"
                    : "text-slate-700 hover:bg-slate-50"
                }`}
              >
                <span>اعلان‌ها</span>
                <Bell className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("profile")}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeTab === "profile"
                    ? "bg-[#0b1528] text-white shadow-sm"
                    : "text-slate-700 hover:bg-slate-50"
                }`}
              >
                <span>اطلاعات حساب</span>
                <User className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("security")}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeTab === "security"
                    ? "bg-[#0b1528] text-white shadow-sm"
                    : "text-slate-700 hover:bg-slate-50"
                }`}
              >
                <span>امنیت و رمز عبور</span>
                <Lock className="w-4 h-4" />
              </button>

              <div className="pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={handleLogout}
                  className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold text-red-500 hover:bg-red-50 transition-colors cursor-pointer"
                >
                  <span>خروج از حساب</span>
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            </nav>
          </div>
        </div>
      </div>

      <AddressModal
        isOpen={addressModalOpen}
        onClose={() => setAddressModalOpen(false)}
      />
    </div>
  );
}
