"use client";

import React, { useState, useMemo } from "react";
import { useAdminStore } from "@/lib/admin-store";
import { formatPriceFa, toPersianDigits } from "@/lib/formatters";
import { AdminCustomer } from "@/types/admin";
import { Button } from "@/components/ui/button";
import {
  Users,
  Search,
  Plus,
  Eye,
  ShieldAlert,
  ShieldCheck,
  UserCheck,
  UserX,
  Phone,
  Mail,
  MapPin,
  Calendar,
  ShoppingBag,
  X,
  CreditCard,
} from "lucide-react";

export function CustomersView() {
  const customers = useAdminStore((state) => state.customers);
  const orders = useAdminStore((state) => state.orders);
  const toggleCustomerStatus = useAdminStore((state) => state.toggleCustomerStatus);
  const addCustomer = useAdminStore((state) => state.addCustomer);

  // States
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState<AdminCustomer | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Form Fields
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("تهران");
  const [address, setAddress] = useState("");

  const handleCreateCustomer = (e: React.FormEvent) => {
    e.preventDefault();
    addCustomer({
      firstName,
      lastName,
      phone,
      email: email || `${phone}@customer.ir`,
      city,
      address,
      status: "active",
    });
    setIsAddModalOpen(false);
    setFirstName("");
    setLastName("");
    setPhone("");
    setEmail("");
    setAddress("");
  };

  // Filtered customers
  const filteredCustomers = useMemo(() => {
    return customers.filter((c) => {
      const fullName = `${c.firstName} ${c.lastName}`.toLowerCase();
      const matchSearch =
        fullName.includes(searchTerm.toLowerCase()) ||
        c.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.phone.includes(searchTerm) ||
        c.city.toLowerCase().includes(searchTerm.toLowerCase());

      return matchSearch;
    });
  }, [customers, searchTerm]);

  return (
    <div className="space-y-6 select-none animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            مدیریت مشتریان و خریداران
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 font-medium">
            لیست کاربران ثبت‌نام شده، سوابق سفارشات و مدیریت وضعیت حساب کاربری
          </p>
        </div>

        <Button
          size="sm"
          variant="secondary"
          onClick={() => setIsAddModalOpen(true)}
          rightIcon={<Plus className="w-4 h-4" />}
        >
          افزودن کاربر جدید
        </Button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-2xs">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 absolute inset-y-0 right-3 my-auto text-slate-400 pointer-events-none" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="جستجو با نام، شناسه ID، تلفن..."
              className="w-full pr-9 pl-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            />
          </div>

          <div className="text-xs text-slate-500 font-bold">
            مجموع مشتریان: <span className="text-slate-900">{toPersianDigits(customers.length)} نفر</span>
          </div>
        </div>
      </div>

      {/* Customers Table */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-right text-xs">
            <thead>
              <tr className="bg-slate-50/80 text-slate-500 font-bold border-b border-slate-100">
                <th className="py-3.5 px-4">شناسه کاربر (ID)</th>
                <th className="py-3.5 px-4">نام و نام خانوادگی</th>
                <th className="py-3.5 px-4">تلفن همراه</th>
                <th className="py-3.5 px-4">شهر</th>
                <th className="py-3.5 px-4 text-center">تعداد سفارش</th>
                <th className="py-3.5 px-4">مجموع خرید</th>
                <th className="py-3.5 px-4">تاریخ عضویت</th>
                <th className="py-3.5 px-4 text-center">وضعیت حساب</th>
                <th className="py-3.5 px-4 text-center">عملیات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredCustomers.length === 0 ? (
                <tr>
                  <td colSpan={9} className="py-12 text-center text-slate-400">
                    <Users className="w-10 h-10 mx-auto mb-2 text-slate-300" />
                    <p className="font-bold text-sm text-slate-600">مشتری با این مشخصات یافت نشد</p>
                  </td>
                </tr>
              ) : (
                filteredCustomers.map((c) => {
                  const isBlocked = c.status === "blocked";

                  return (
                    <tr
                      key={c.id}
                      className="hover:bg-slate-50/70 transition-colors font-medium text-slate-700"
                    >
                      <td className="py-3.5 px-4 font-black text-slate-900 font-mono">
                        {c.id}
                      </td>
                      <td className="py-3.5 px-4 font-bold text-slate-900">
                        {c.firstName} {c.lastName}
                      </td>
                      <td className="py-3.5 px-4 text-slate-600 font-mono" dir="ltr">
                        {c.phone}
                      </td>
                      <td className="py-3.5 px-4 text-slate-600">
                        {c.city}
                      </td>
                      <td className="py-3.5 px-4 text-center font-bold text-slate-800">
                        {toPersianDigits(c.ordersCount)} سفارش
                      </td>
                      <td className="py-3.5 px-4 font-black text-slate-900">
                        {formatPriceFa(c.totalSpent)} تومان
                      </td>
                      <td className="py-3.5 px-4 text-slate-500">
                        {c.registerDate}
                      </td>
                      <td className="py-3.5 px-4 text-center">
                        {isBlocked ? (
                          <span className="font-semibold text-rose-600">مسدود شده</span>
                        ) : (
                          <span className="font-semibold text-emerald-600">فعال</span>
                        )}
                      </td>
                      <td className="py-3.5 px-4 text-center">
                        <div className="flex items-center justify-center gap-1.5">
                          <button
                            onClick={() => setSelectedCustomer(c)}
                            className="p-1.5 rounded-lg text-slate-500 hover:text-blue-600 hover:bg-blue-50 transition-colors cursor-pointer"
                            title="مشاهده پروفایل و سوابق"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => toggleCustomerStatus(c.id)}
                            className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                              isBlocked
                                ? "text-emerald-600 hover:bg-emerald-50"
                                : "text-slate-400 hover:text-rose-600 hover:bg-rose-50"
                            }`}
                            title={isBlocked ? "رفع مسدودی" : "مسدود سازی کاربر"}
                          >
                            {isBlocked ? <UserCheck className="w-4 h-4" /> : <UserX className="w-4 h-4" />}
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Customer Profile & History Modal */}
      {selectedCustomer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fade-in">
          <div
            className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden max-h-[85vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center font-black text-lg shadow-md shadow-blue-500/20">
                  {selectedCustomer.firstName.substring(0, 1)}
                </div>
                <div>
                  <h3 className="text-base font-black text-slate-900">
                    پروفایل {selectedCustomer.firstName} {selectedCustomer.lastName}
                  </h3>
                  <span className="text-xs text-slate-400 font-mono">شناسه: {selectedCustomer.id}</span>
                </div>
              </div>

              <button
                onClick={() => setSelectedCustomer(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-5 text-xs flex-1">
              {/* Customer Info Card */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-100 text-slate-600">
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-slate-400" />
                  <span className="font-bold text-slate-800">شماره تماس:</span>
                  <span dir="ltr" className="font-mono">{selectedCustomer.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-slate-400" />
                  <span className="font-bold text-slate-800">ایمیل:</span>
                  <span>{selectedCustomer.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-slate-400" />
                  <span className="font-bold text-slate-800">تاریخ عضویت:</span>
                  <span>{selectedCustomer.registerDate}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-slate-400" />
                  <span className="font-bold text-slate-800">مجموع خرید:</span>
                  <span className="font-black text-slate-900">{formatPriceFa(selectedCustomer.totalSpent)} تومان</span>
                </div>
                <div className="sm:col-span-2 flex items-start gap-2 pt-2 border-t border-slate-200/60">
                  <MapPin className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                  <span className="font-bold text-slate-800 shrink-0">آدرس:</span>
                  <span>{selectedCustomer.city} - {selectedCustomer.address}</span>
                </div>
              </div>

              {/* Purchase History */}
              <div>
                <h4 className="font-bold text-slate-900 text-sm mb-3">سوابق سفارشات این کاربر</h4>
                <div className="space-y-2">
                  {orders
                    .filter((o) =>
                      o.customerPhone === selectedCustomer.phone ||
                      o.customerName.includes(selectedCustomer.lastName)
                    )
                    .map((order) => (
                      <div
                        key={order.id}
                        className="p-3.5 bg-white rounded-xl border border-slate-100 flex items-center justify-between"
                      >
                        <div>
                          <div className="flex items-center gap-2 font-bold text-slate-800">
                            <span>سفارش {order.id}</span>
                            <span className="text-xs text-slate-400">({order.date})</span>
                          </div>
                          <p className="text-slate-500 text-[11px] mt-0.5">
                            {toPersianDigits(order.items.length)} قلم کالا
                          </p>
                        </div>

                        <span className="font-black text-slate-900">
                          {formatPriceFa(order.amount)} تومان
                        </span>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Customer Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fade-in">
          <div
            className="w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between">
              <h3 className="text-base font-black text-slate-900">افزودن مشتری جدید</h3>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateCustomer} className="p-6 space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-bold mb-1.5">نام *</label>
                  <input
                    type="text"
                    required
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="مثال: پوریا"
                    className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-bold mb-1.5">نام خانوادگی *</label>
                  <input
                    type="text"
                    required
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="مثال: رضایی"
                    className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1.5">شماره موبایل *</label>
                <input
                  type="text"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="۰۹۱۲۰۰۰۰۰۰۰"
                  className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-mono"
                  dir="ltr"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1.5">ایمیل</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="user@example.com"
                  className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-mono"
                  dir="ltr"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1.5">شهر</label>
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="تهران"
                  className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1.5">آدرس کامل</label>
                <textarea
                  rows={2}
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="خیابان، پلاک، واحد..."
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-medium"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3">
                <Button
                  type="button"
                  variant="ghost"
                  size="md"
                  onClick={() => setIsAddModalOpen(false)}
                >
                  انصراف
                </Button>
                <Button
                  type="submit"
                  variant="secondary"
                  size="md"
                >
                  ثبت کاربر
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
