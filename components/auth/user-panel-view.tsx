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
  ShoppingCart,
  Package,
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
import { ordersApi, OrderDetail } from "@/lib/api/orders";
import { userApi, UserAddress, WalletData } from "@/lib/api/user";
import { Loader2 } from "lucide-react";

type TabType = "dashboard" | "orders" | "favorites" | "addresses" | "wallet" | "notifications" | "profile" | "security";

export function UserPanelView() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user, isLoggedIn, isLoaded, logout, refreshProfile } = useAuth();
  const { favorites, removeFavorite } = useFavoritesStore();
  const { addresses, removeAddress, setDefaultAddress } = useAddressStore();
  const addItem = useCartStore((state) => state.addItem);
  const cartCount = useCartStore((state) => state.getItemsCount());

  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState<TabType>("dashboard");
  const [addressModalOpen, setAddressModalOpen] = useState(false);

  // Live Backend Data States
  const [liveOrders, setLiveOrders] = useState<OrderDetail[]>([]);
  const [loadingOrders, setLoadingOrders] = useState(false);
  const [liveAddresses, setLiveAddresses] = useState<UserAddress[]>([]);
  const [liveWallet, setLiveWallet] = useState<WalletData | null>(null);

  // Profile Form State
  const [firstNameInput, setFirstNameInput] = useState(user?.firstName || "");
  const [lastNameInput, setLastNameInput] = useState(user?.lastName || "");
  const [emailInput, setEmailInput] = useState(user?.email || "");
  const [nationalCodeInput, setNationalCodeInput] = useState(user?.nationalCode || "");
  const [savingProfile, setSavingProfile] = useState(false);
  const [profileSuccessMsg, setProfileSuccessMsg] = useState<string | null>(null);

  // Wallet Top-up Modal State
  const [showTopUpModal, setShowTopUpModal] = useState(false);
  const [topUpAmount, setTopUpAmount] = useState("500000");
  const [topUpLoading, setTopUpLoading] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (user) {
      setFirstNameInput(user.firstName || "");
      setLastNameInput(user.lastName || "");
      setEmailInput(user.email || "");
      setNationalCodeInput(user.nationalCode || "");
    }
  }, [user]);

  // Load backend data
  const fetchPanelData = async () => {
    try {
      setLoadingOrders(true);
      const [ordersData, addressesData, walletData] = await Promise.allSettled([
        ordersApi.getMyOrders(),
        userApi.getAddresses(),
        userApi.getWallet(),
      ]);

      if (ordersData.status === "fulfilled" && Array.isArray(ordersData.value)) {
        setLiveOrders(ordersData.value);
      }
      if (addressesData.status === "fulfilled" && Array.isArray(addressesData.value)) {
        setLiveAddresses(addressesData.value);
      }
      if (walletData.status === "fulfilled" && walletData.value) {
        setLiveWallet(walletData.value);
      }
    } catch (err) {
      console.error("Error fetching user panel data:", err);
    } finally {
      setLoadingOrders(false);
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      fetchPanelData();
    }
  }, [isLoggedIn, activeTab]);

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

  const formatPrice = (num: number) => {
    const persianDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
    return num.toLocaleString("fa-IR").replace(/[0-9]/g, (w) => persianDigits[+w]);
  };

  const handleLogout = async () => {
    await logout();
    router.push("/");
  };

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingProfile(true);
    setProfileSuccessMsg(null);
    try {
      await userApi.updateProfile({
        firstName: firstNameInput.trim(),
        lastName: lastNameInput.trim(),
        email: emailInput.trim() || undefined,
        nationalCode: nationalCodeInput.trim() || undefined,
      });
      await refreshProfile();
      setProfileSuccessMsg("اطلاعات حساب کاربری با موفقیت به‌روزرسانی شد.");
      setTimeout(() => setProfileSuccessMsg(null), 3000);
    } catch (err: any) {
      alert(err?.message || "خطا در ذخیره اطلاعات");
    } finally {
      setSavingProfile(false);
    }
  };

  const handleTopUp = async () => {
    const amt = parseInt(topUpAmount, 10);
    if (!amt || amt < 10000) {
      alert("حداقل مبلغ شارژ ۱۰,۰۰۰ تومان می‌باشد");
      return;
    }
    setTopUpLoading(true);
    try {
      const res = await userApi.topUpWallet(amt);
      if (res.paymentUrl) {
        window.location.href = res.paymentUrl;
      } else {
        alert("درخواست شارژ با موفقیت ثبت شد");
        setShowTopUpModal(false);
        fetchPanelData();
      }
    } catch (err: any) {
      alert(err?.message || "خطا در اتصال به درگاه پرداخت");
    } finally {
      setTopUpLoading(false);
    }
  };

  const handleCancelOrder = async (orderId: string) => {
    if (!confirm("آیا از لغو این سفارش اطمینان دارید؟")) return;
    try {
      await ordersApi.cancelOrder(orderId);
      alert("سفارش با موفقیت لغو شد.");
      fetchPanelData();
    } catch (err: any) {
      alert(err?.message || "امکان لغو این سفارش وجود ندارد.");
    }
  };

  const handleDeleteAddress = async (addrId: string) => {
    if (!confirm("آیا از حذف این آدرس اطمینان دارید؟")) return;
    try {
      await userApi.deleteAddress(addrId);
      removeAddress(addrId);
      setLiveAddresses((prev) => prev.filter((a) => a.id !== addrId));
    } catch {
      removeAddress(addrId);
    }
  };

  const handleSetDefaultAddress = async (addrId: string) => {
    try {
      await userApi.setDefaultAddress(addrId);
      setDefaultAddress(addrId);
      setLiveAddresses((prev) =>
        prev.map((a) => ({ ...a, isDefault: a.id === addrId }))
      );
    } catch {
      setDefaultAddress(addrId);
    }
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
    <div className="space-y-4 sm:space-y-6 text-right pt-2 sm:pt-4">
      {/* Mobile User Header */}
      <div className="lg:hidden bg-white rounded-2xl border border-slate-200/90 p-4 shadow-2xs">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-12 h-12 rounded-2xl bg-[#0b1528] text-white flex items-center justify-center shrink-0 shadow-xs">
              <User className="w-6 h-6 text-slate-200" />
            </div>
            <div className="min-w-0">
              <h2 className="text-sm font-black text-slate-900 truncate">
                سلام، {displayName}
              </h2>
              <p className="text-[11px] text-slate-400 font-mono mt-0.5" dir="ltr">
                {toPersianDigits(displayPhone)}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <Link
              href="/cart"
              className="flex items-center gap-1.5 px-3 py-2 bg-blue-50 hover:bg-blue-100 text-[#2563eb] rounded-xl text-xs font-black transition-colors"
            >
              <ShoppingCart className="w-4 h-4" />
              <span>سبد خرید</span>
              {mounted && cartCount > 0 && (
                <span className="bg-[#2563eb] text-white text-[10px] w-4.5 h-4.5 rounded-full flex items-center justify-center font-bold">
                  {toPersianDigits(cartCount)}
                </span>
              )}
            </Link>

            <button
              type="button"
              onClick={handleLogout}
              className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-colors cursor-pointer"
              title="خروج از حساب"
              aria-label="خروج از حساب"
            >
              <LogOut className="w-4.5 h-4.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Scrollable Tabs */}
      <div className="lg:hidden -mx-4 px-4 py-1.5 overflow-x-auto no-scrollbar border-b border-slate-200/80 bg-[#f8fafc]">
        <div className="flex items-center gap-2 min-w-max pb-1">
          <button
            type="button"
            onClick={() => setActiveTab("dashboard")}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold shrink-0 transition-all cursor-pointer ${
              activeTab === "dashboard"
                ? "bg-[#0b1528] text-white shadow-xs"
                : "bg-white text-slate-600 border border-slate-200/90 hover:bg-slate-50"
            }`}
          >
            <LayoutGrid className="w-3.5 h-3.5" />
            <span>داشبورد</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("orders")}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold shrink-0 transition-all cursor-pointer ${
              activeTab === "orders"
                ? "bg-[#0b1528] text-white shadow-xs"
                : "bg-white text-slate-600 border border-slate-200/90 hover:bg-slate-50"
            }`}
          >
            <Package className="w-3.5 h-3.5" />
            <span>سفارش‌های من</span>
          </button>

          <Link
            href="/cart"
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold shrink-0 bg-white text-slate-600 border border-slate-200/90 hover:bg-blue-50 hover:text-[#2563eb] transition-all cursor-pointer"
          >
            <ShoppingCart className="w-3.5 h-3.5" />
            <span>سبد خرید</span>
            {mounted && cartCount > 0 && (
              <span className="bg-red-500 text-white text-[10px] w-4.5 h-4.5 rounded-full flex items-center justify-center font-bold">
                {toPersianDigits(cartCount)}
              </span>
            )}
          </Link>

          <button
            type="button"
            onClick={() => setActiveTab("favorites")}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold shrink-0 transition-all cursor-pointer ${
              activeTab === "favorites"
                ? "bg-[#0b1528] text-white shadow-xs"
                : "bg-white text-slate-600 border border-slate-200/90 hover:bg-slate-50"
            }`}
          >
            <Heart className="w-3.5 h-3.5" />
            <span>علاقه‌مندی‌ها</span>
            {mounted && favorites.length > 0 && (
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                activeTab === "favorites" ? "bg-white/20 text-white" : "bg-slate-100 text-slate-600"
              }`}>
                {toPersianDigits(favorites.length)}
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("addresses")}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold shrink-0 transition-all cursor-pointer ${
              activeTab === "addresses"
                ? "bg-[#0b1528] text-white shadow-xs"
                : "bg-white text-slate-600 border border-slate-200/90 hover:bg-slate-50"
            }`}
          >
            <MapPin className="w-3.5 h-3.5" />
            <span>آدرس‌های من</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("wallet")}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold shrink-0 transition-all cursor-pointer ${
              activeTab === "wallet"
                ? "bg-[#0b1528] text-white shadow-xs"
                : "bg-white text-slate-600 border border-slate-200/90 hover:bg-slate-50"
            }`}
          >
            <Wallet className="w-3.5 h-3.5" />
            <span>کیف پول</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Desktop Persistent Sidebar */}
        <div className="hidden lg:block lg:col-span-4 xl:col-span-3">
          <div className="bg-white rounded-3xl border border-slate-200/90 p-5 shadow-2xs space-y-5 sticky top-24">
            <div className="flex flex-col items-center text-center pb-4 border-b border-slate-100">
              <div className="w-16 h-16 rounded-full bg-[#0b1528] text-white flex items-center justify-center mb-3 shadow-sm">
                <User className="w-8 h-8 text-slate-200" />
              </div>

              <h2 className="text-base font-black text-slate-900 mb-0.5">
                سلام، {displayName}
              </h2>

              <p className="text-xs text-slate-400 font-mono mb-1" dir="ltr">
                {toPersianDigits(displayPhone)}
              </p>
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
                <Package className="w-4 h-4" />
              </button>

              <Link
                href="/cart"
                className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-50 hover:text-[#2563eb] transition-all cursor-pointer group"
              >
                <div className="flex items-center gap-2">
                  <span>سبد خرید</span>
                  {mounted && cartCount > 0 && (
                    <span className="bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.2 rounded-full">
                      {toPersianDigits(cartCount)}
                    </span>
                  )}
                </div>
                <ShoppingCart className="w-4 h-4 text-slate-400 group-hover:text-[#2563eb] transition-colors" />
              </Link>

              <button
                type="button"
                onClick={() => setActiveTab("favorites")}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeTab === "favorites"
                    ? "bg-[#0b1528] text-white shadow-sm"
                    : "text-slate-700 hover:bg-slate-50"
                }`}
              >
                <div className="flex items-center gap-2">
                  <span>علاقه‌مندی‌ها</span>
                  {mounted && favorites.length > 0 && (
                    <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded-full ${
                      activeTab === "favorites" ? "bg-white/20 text-white" : "bg-slate-100 text-slate-600"
                    }`}>
                      {toPersianDigits(favorites.length)}
                    </span>
                  )}
                </div>
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

        {/* Content Area */}
        <div className="lg:col-span-8 xl:col-span-9 space-y-6">
          {activeTab === "dashboard" && (
            <>
              {mounted && cartCount > 0 && (
                <div className="bg-blue-50/80 border border-blue-200/80 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#2563eb] text-white flex items-center justify-center shrink-0">
                      <ShoppingCart className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-xs font-bold text-slate-900">
                        شما {toPersianDigits(cartCount)} کالا در سبد خرید خود دارید
                      </h3>
                      <p className="text-[11px] text-slate-500 font-medium mt-0.5">
                        برای تکمیل و نهایی‌سازی سفارش خود اقدام کنید
                      </p>
                    </div>
                  </div>
                  <Link
                    href="/cart"
                    className="shrink-0 text-xs font-black text-white bg-[#2563eb] hover:bg-[#1d4ed8] px-4 py-2 rounded-xl transition-colors shadow-xs w-full sm:w-auto text-center"
                  >
                    مشاهده سبد خرید
                  </Link>
                </div>
              )}
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

                        <div className="w-14 h-14 rounded-xl overflow-hidden bg-slate-50 shrink-0 border border-slate-200/80 p-1 flex items-center justify-center">
                          <img
                            src={item.image}
                            alt={item.title}
                            className="w-full h-full object-contain"
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
                {(liveAddresses.length > 0 ? liveAddresses : addresses).map((addr) => (
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
                            onClick={() => handleSetDefaultAddress(addr.id)}
                            className="text-xs font-bold text-[#2563eb] hover:underline cursor-pointer"
                          >
                            انتخاب به عنوان پیش‌فرض
                          </button>
                        )}
                        <button
                          type="button"
                          onClick={() => handleDeleteAddress(addr.id)}
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
                      <span className="font-mono">کد پستی: {toPersianDigits(addr.postalCode || "")}</span>
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

                      <div className="w-16 h-16 rounded-xl overflow-hidden bg-slate-50 shrink-0 border border-slate-200/80 p-1 flex items-center justify-center">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-contain"
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
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div>
                  <h2 className="text-base font-black text-slate-900">تاریخچه سفارش‌ها</h2>
                  <p className="text-xs text-slate-400 font-medium mt-0.5">
                    تمام سفارش‌های ثبت شده در فروشگاه پویان افزار
                  </p>
                </div>
                {loadingOrders && <Loader2 className="w-4 h-4 animate-spin text-[#2563eb]" />}
              </div>

              <div className="space-y-4">
                {liveOrders.length === 0 ? (
                  <div className="py-12 text-center text-slate-400 text-xs">
                    هنوز سفارشی ثبت نشده است.
                  </div>
                ) : (
                  liveOrders.map((ord) => (
                    <div key={ord.id} className="rounded-2xl border border-slate-200 p-4 space-y-3">
                      <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-100">
                        <span className={`text-xs font-black px-3 py-1 rounded-full ${
                          ord.paymentStatus === "PAID" || ord.paymentStatus === "paid"
                            ? "bg-emerald-50 text-emerald-700"
                            : ord.paymentStatus === "CANCELLED" || ord.paymentStatus === "cancelled"
                            ? "bg-rose-50 text-rose-700"
                            : "bg-blue-50 text-[#2563eb]"
                        }`}>
                          {ord.statusFa || ord.paymentStatusFa || ord.paymentStatus}
                        </span>
                        <div className="flex items-center gap-3 text-xs font-bold text-slate-700">
                          <span>{ord.date || new Intl.DateTimeFormat("fa-IR").format(new Date(ord.createdAt))}</span>
                          <span className="font-mono text-slate-900" dir="ltr">#{ord.trackingCode}</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-xs pt-1">
                        <span className="font-bold text-slate-900">
                          مبلغ کل: {formatPrice(ord.finalAmount || ord.amount)} تومان
                        </span>
                        <div className="flex items-center gap-2">
                          <span className="text-slate-500 font-medium">
                            {ord.items?.length || 1} کالا
                          </span>
                          {(ord.paymentStatus === "PENDING" || ord.paymentStatus === "pending") && (
                            <button
                              type="button"
                              onClick={() => handleCancelOrder(ord.id)}
                              className="text-xs text-rose-600 hover:underline font-bold mr-2"
                            >
                              لغو سفارش
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))
                )}
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
                  {formatPrice(liveWallet?.balance ?? user?.walletBalance ?? 0)}{" "}
                  <span className="text-xs font-normal">تومان</span>
                </div>
                <div className="pt-2">
                  <Button
                    variant="secondary"
                    size="md"
                    onClick={() => setShowTopUpModal(true)}
                    className="font-black text-xs"
                  >
                    افزایش موجودی
                  </Button>
                </div>
              </div>

              {liveWallet?.transactions && liveWallet.transactions.length > 0 && (
                <div className="space-y-3 pt-4 border-t border-slate-100">
                  <h3 className="text-sm font-bold text-slate-800">گردش تراکنش‌های اخیر</h3>
                  <div className="divide-y divide-slate-100">
                    {liveWallet.transactions.map((tx) => (
                      <div key={tx.id} className="py-3 flex items-center justify-between text-xs">
                        <div>
                          <p className="font-bold text-slate-800">{tx.description || tx.typeFa || tx.type}</p>
                          <span className="text-slate-400 text-[10px]">
                            {new Intl.DateTimeFormat("fa-IR").format(new Date(tx.createdAt))}
                          </span>
                        </div>
                        <span className={`font-mono font-bold ${tx.amount > 0 ? "text-emerald-600" : "text-slate-700"}`}>
                          {tx.amount > 0 ? "+" : ""}{formatPrice(tx.amount)} تومان
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === "profile" && (
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs space-y-6">
              <div className="pb-4 border-b border-slate-100">
                <h2 className="text-base font-black text-slate-900">اطلاعات حساب کاربری</h2>
                <p className="text-xs text-slate-400 font-medium mt-0.5">
                  مشاهده و ویرایش مشخصات فردی
                </p>
              </div>

              {profileSuccessMsg && (
                <div className="p-3 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-xl text-xs font-bold">
                  {profileSuccessMsg}
                </div>
              )}

              <form onSubmit={handleSaveProfile} className="space-y-4 max-w-xl">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">نام</label>
                    <input
                      type="text"
                      required
                      value={firstNameInput}
                      onChange={(e) => setFirstNameInput(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-[#2563eb]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">نام خانوادگی</label>
                    <input
                      type="text"
                      required
                      value={lastNameInput}
                      onChange={(e) => setLastNameInput(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-[#2563eb]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">شماره موبایل</label>
                    <input
                      type="text"
                      disabled
                      value={toPersianDigits(user?.phone || "")}
                      className="w-full bg-slate-100 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-500 font-mono"
                      dir="ltr"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">کد ملی</label>
                    <input
                      type="text"
                      value={nationalCodeInput}
                      onChange={(e) => setNationalCodeInput(e.target.value)}
                      placeholder="۱۰ رقمی"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 font-mono focus:outline-none focus:border-[#2563eb]"
                      dir="ltr"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">ایمیل</label>
                  <input
                    type="email"
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    placeholder="example@mail.com"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 font-mono focus:outline-none focus:border-[#2563eb]"
                    dir="ltr"
                  />
                </div>

                <div className="pt-2">
                  <Button
                    type="submit"
                    variant="primary"
                    size="md"
                    disabled={savingProfile}
                    className="font-bold text-xs px-6"
                  >
                    {savingProfile ? <Loader2 className="w-4 h-4 animate-spin" /> : "ذخیره تغییرات"}
                  </Button>
                </div>
              </form>
            </div>
          )}

          {(activeTab === "notifications" || activeTab === "security") && (
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs space-y-4">
              <h2 className="text-base font-black text-slate-900">
                {activeTab === "notifications" && "اعلان‌ها"}
                {activeTab === "security" && "امنیت و رمز عبور"}
              </h2>
              <div className="p-4 rounded-xl bg-slate-50 text-xs text-slate-600 leading-relaxed">
                حساب شما با تایید دو مرحله‌ای پیامکی فعال و امن است.
              </div>
            </div>
          )}
        </div>
      </div>

      {showTopUpModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 max-w-sm w-full shadow-2xl space-y-4 text-right">
            <h3 className="text-base font-black text-slate-900">شارژ کیف پول</h3>
            <p className="text-xs text-slate-500">مبلغ مورد نظر برای افزایش موجودی را وارد کنید:</p>
            <input
              type="number"
              value={topUpAmount}
              onChange={(e) => setTopUpAmount(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm font-bold text-slate-800 focus:outline-none focus:border-[#2563eb]"
            />
            <div className="flex gap-2 text-xs">
              {[200000, 500000, 1000000].map((amt) => (
                <button
                  key={amt}
                  type="button"
                  onClick={() => setTopUpAmount(String(amt))}
                  className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-blue-50 text-slate-700 text-[11px] font-bold"
                >
                  {formatPrice(amt)}
                </button>
              ))}
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <Button type="button" variant="outline" size="sm" onClick={() => setShowTopUpModal(false)}>
                انصراف
              </Button>
              <Button type="button" variant="primary" size="sm" disabled={topUpLoading} onClick={handleTopUp}>
                {topUpLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : "اتصال به درگاه"}
              </Button>
            </div>
          </div>
        </div>
      )}

      <AddressModal
        isOpen={addressModalOpen}
        onClose={() => {
          setAddressModalOpen(false);
          fetchPanelData();
        }}
      />
    </div>
  );
}
