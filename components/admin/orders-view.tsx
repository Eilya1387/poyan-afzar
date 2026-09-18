"use client";

import React, { useState, useMemo } from "react";
import { useAdminStore } from "@/lib/admin-store";
import { formatPriceFa, toPersianDigits } from "@/lib/formatters";
import { AdminOrder, PaymentStatus, ShippingStatus } from "@/types/admin";
import { ConfirmModal } from "./confirm-modal";
import { Button } from "@/components/ui/button";
import {
  Search,
  Filter,
  Eye,
  CheckCircle,
  Truck,
  Package,
  XCircle,
  Clock,
  Printer,
  X,
  Phone,
  MapPin,
  Mail,
  Plus,
  Trash2,
  Save,
} from "lucide-react";

interface OrdersViewProps {
  selectedOrderProp?: AdminOrder | null;
  onClearSelectedOrder?: () => void;
}

export function OrdersView({ selectedOrderProp, onClearSelectedOrder }: OrdersViewProps) {
  const orders = useAdminStore((state) => state.orders);
  const products = useAdminStore((state) => state.products);
  const updateOrderStatus = useAdminStore((state) => state.updateOrderStatus);
  const deleteOrder = useAdminStore((state) => state.deleteOrder);
  const addOrder = useAdminStore((state) => state.addOrder);

  // Filters & State
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [activeOrderModal, setActiveOrderModal] = useState<AdminOrder | null>(selectedOrderProp || null);
  const [deletingOrderId, setDeletingOrderId] = useState<string | null>(null);
  const [isNewOrderModalOpen, setIsNewOrderModalOpen] = useState(false);

  // New Order Form State
  const [newOrderCustomer, setNewOrderCustomer] = useState("");
  const [newOrderPhone, setNewOrderPhone] = useState("");
  const [newOrderAddress, setNewOrderAddress] = useState("");
  const [newOrderSelectedProduct, setNewOrderSelectedProduct] = useState(products[0]?.id || "");
  const [newOrderQty, setNewOrderQty] = useState(1);

  // Edit status in modal state
  const [modalPaymentStatus, setModalPaymentStatus] = useState<PaymentStatus>("paid");
  const [modalShippingStatus, setModalShippingStatus] = useState<ShippingStatus>("preparing");
  const [modalTrackingCode, setModalTrackingCode] = useState("");
  const [modalNotes, setModalNotes] = useState("");
  const [isSavedNotice, setIsSavedNotice] = useState(false);

  // Sync modal when opened
  const handleOpenOrder = (order: AdminOrder) => {
    setActiveOrderModal(order);
    setModalPaymentStatus(order.paymentStatus);
    setModalShippingStatus(order.shippingStatus);
    setModalTrackingCode(order.trackingCode || "");
    setModalNotes(order.notes || "");
    setIsSavedNotice(false);
  };

  const handleCloseModal = () => {
    setActiveOrderModal(null);
    if (onClearSelectedOrder) onClearSelectedOrder();
  };

  const handleSaveStatus = () => {
    if (!activeOrderModal) return;
    updateOrderStatus(activeOrderModal.id, {
      paymentStatus: modalPaymentStatus,
      shippingStatus: modalShippingStatus,
      notes: modalNotes,
    });
    setIsSavedNotice(true);
    setTimeout(() => setIsSavedNotice(false), 2000);
  };

  const handleQuickApprove = (orderId: string) => {
    updateOrderStatus(orderId, {
      paymentStatus: "paid",
      shippingStatus: "shipping",
    });
  };

  const handleCreateNewOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const prod = products.find((p) => p.id === newOrderSelectedProduct);
    if (!prod) return;

    const amount = prod.price * newOrderQty;
    addOrder({
      customerName: newOrderCustomer,
      customerPhone: newOrderPhone,
      customerAddress: newOrderAddress,
      amount,
      paymentStatus: "paid",
      shippingStatus: "preparing",
      items: [
        {
          productId: prod.id,
          title: prod.title,
          price: prod.price,
          quantity: newOrderQty,
          image: prod.image,
        },
      ],
      trackingCode: `TRK-${Math.floor(1000 + Math.random() * 9000)}`,
    });

    setIsNewOrderModalOpen(false);
    setNewOrderCustomer("");
    setNewOrderPhone("");
    setNewOrderAddress("");
  };

  // Filtered Orders
  const filteredOrders = useMemo(() => {
    return orders.filter((o) => {
      const matchSearch =
        o.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        o.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        o.customerPhone.includes(searchTerm);

      if (!matchSearch) return false;

      if (statusFilter === "all") return true;
      if (statusFilter === "paid") return o.paymentStatus === "paid";
      if (statusFilter === "failed") return o.paymentStatus === "failed";
      if (statusFilter === "preparing") return o.shippingStatus === "preparing";
      if (statusFilter === "shipping") return o.shippingStatus === "shipping";
      if (statusFilter === "delivered") return o.shippingStatus === "delivered";
      if (statusFilter === "cancelled") return o.shippingStatus === "cancelled";

      return true;
    });
  }, [orders, searchTerm, statusFilter]);

  const renderPaymentStatus = (status: PaymentStatus) => {
    switch (status) {
      case "paid":
        return (
          <span className="inline-flex items-center gap-1.5 font-semibold text-emerald-600">
            <CheckCircle className="w-3.5 h-3.5" />
            پرداخت شده
          </span>
        );
      case "failed":
        return (
          <span className="inline-flex items-center gap-1.5 font-semibold text-rose-600">
            <XCircle className="w-3.5 h-3.5" />
            ناموفق
          </span>
        );
      case "pending":
      default:
        return (
          <span className="inline-flex items-center gap-1.5 font-semibold text-amber-600">
            <Clock className="w-3.5 h-3.5" />
            در انتظار پرداخت
          </span>
        );
    }
  };

  const renderShippingStatus = (status: ShippingStatus) => {
    switch (status) {
      case "shipping":
        return (
          <span className="inline-flex items-center gap-1.5 font-semibold text-blue-600">
            <Truck className="w-3.5 h-3.5" />
            در حال ارسال
          </span>
        );
      case "preparing":
        return (
          <span className="inline-flex items-center gap-1.5 font-semibold text-amber-600">
            <Package className="w-3.5 h-3.5" />
            آماده‌سازی
          </span>
        );
      case "delivered":
        return (
          <span className="inline-flex items-center gap-1.5 font-semibold text-emerald-600">
            <CheckCircle className="w-3.5 h-3.5" />
            تحویل شده
          </span>
        );
      case "cancelled":
      default:
        return (
          <span className="inline-flex items-center gap-1.5 font-semibold text-slate-500">
            <XCircle className="w-3.5 h-3.5" />
            لغو شده
          </span>
        );
    }
  };

  return (
    <div className="space-y-6 select-none animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            مدیریت سفارش‌ها
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 font-medium">
            بررسی، تایید و پیگیری مرسولات ثبت شده مشتریان
          </p>
        </div>

        <Button
          size="sm"
          variant="secondary"
          onClick={() => setIsNewOrderModalOpen(true)}
          rightIcon={<Plus className="w-4 h-4" />}
        >
          ثبت سفارش دستی
        </Button>
      </div>

      {/* Filter Tabs & Search */}
      <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-2xs space-y-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Status Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 scrollbar-none">
            {[
              { id: "all", label: "همه سفارش‌ها", count: orders.length },
              { id: "preparing", label: "در حال آماده‌سازی", count: orders.filter((o) => o.shippingStatus === "preparing").length },
              { id: "shipping", label: "در حال ارسال", count: orders.filter((o) => o.shippingStatus === "shipping").length },
              { id: "delivered", label: "تحویل شده", count: orders.filter((o) => o.shippingStatus === "delivered").length },
              { id: "paid", label: "پرداخت شده", count: orders.filter((o) => o.paymentStatus === "paid").length },
              { id: "failed", label: "ناموفق / لغو شده", count: orders.filter((o) => o.paymentStatus === "failed" || o.shippingStatus === "cancelled").length },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setStatusFilter(tab.id)}
                className={`px-3 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
                  statusFilter === tab.id
                    ? "bg-[#2563eb] text-white shadow-xs"
                    : "bg-slate-50 hover:bg-slate-100 text-slate-600"
                }`}
              >
                <span>{tab.label}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                    statusFilter === tab.id
                      ? "bg-white/20 text-white"
                      : "bg-slate-200 text-slate-700"
                  }`}
                >
                  {toPersianDigits(tab.count)}
                </span>
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 absolute inset-y-0 right-3 my-auto text-slate-400 pointer-events-none" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="جستجو با شماره سفارش، نام یا تلفن..."
              className="w-full pr-9 pl-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
            />
          </div>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-right text-xs">
            <thead>
              <tr className="bg-slate-50/80 text-slate-500 font-bold border-b border-slate-100">
                <th className="py-3.5 px-4">شماره سفارش</th>
                <th className="py-3.5 px-4">نام مشتری</th>
                <th className="py-3.5 px-4">تلفن تماس</th>
                <th className="py-3.5 px-4">تاریخ ثبت</th>
                <th className="py-3.5 px-4">تعداد اقلام</th>
                <th className="py-3.5 px-4">مبلغ کل (تومان)</th>
                <th className="py-3.5 px-4 text-center">وضعیت پرداخت</th>
                <th className="py-3.5 px-4 text-center">وضعیت ارسال</th>
                <th className="py-3.5 px-4 text-center">عملیات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan={9} className="py-12 text-center text-slate-400">
                    <Package className="w-10 h-10 mx-auto mb-2 text-slate-300" />
                    <p className="font-bold text-sm text-slate-600">سفارشی با این مشخصات یافت نشد</p>
                  </td>
                </tr>
              ) : (
                filteredOrders.map((order) => (
                  <tr
                    key={order.id}
                    className="hover:bg-slate-50/70 transition-colors font-medium text-slate-700"
                  >
                    <td className="py-4 px-4 font-black text-slate-900">
                      {order.id}
                    </td>
                    <td className="py-4 px-4 font-bold text-slate-800">
                      {order.customerName}
                    </td>
                    <td className="py-4 px-4 text-slate-500 font-mono" dir="ltr">
                      {order.customerPhone}
                    </td>
                    <td className="py-4 px-4 text-slate-500">
                      {order.date}
                    </td>
                    <td className="py-4 px-4 font-bold text-slate-700">
                      {toPersianDigits(
                        order.items.reduce((sum, item) => sum + item.quantity, 0)
                      )}{" "}
                      عدد
                    </td>
                    <td className="py-4 px-4 font-black text-slate-900">
                      {formatPriceFa(order.amount)}
                    </td>
                    <td className="py-4 px-4 text-center">
                      {renderPaymentStatus(order.paymentStatus)}
                    </td>
                    <td className="py-4 px-4 text-center">
                      {renderShippingStatus(order.shippingStatus)}
                    </td>
                    <td className="py-4 px-4 text-center">
                      <div className="flex items-center justify-center gap-1.5">
                        {order.shippingStatus === "preparing" && (
                          <button
                            onClick={() => handleQuickApprove(order.id)}
                            className="px-2.5 py-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 rounded-lg text-[11px] font-bold transition-colors cursor-pointer"
                            title="تایید و ارسال سریع"
                          >
                            تایید ارسال
                          </button>
                        )}
                        <button
                          onClick={() => handleOpenOrder(order)}
                          className="p-1.5 rounded-lg text-slate-500 hover:text-blue-600 hover:bg-blue-50 transition-colors cursor-pointer"
                          title="مشاهده جزئیات کامل"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setDeletingOrderId(order.id)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                          title="حذف سفارش"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Order Detail Modal */}
      {activeOrderModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fade-in">
          <div
            className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden max-h-[90vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-black text-slate-900">
                    جزئیات سفارش {activeOrderModal.id}
                  </h3>
                  {renderPaymentStatus(activeOrderModal.paymentStatus)}
                  {renderShippingStatus(activeOrderModal.shippingStatus)}
                </div>
                <p className="text-xs text-slate-500 mt-0.5">
                  ثبت شده در تاریخ {activeOrderModal.date}
                </p>
              </div>

              <button
                onClick={handleCloseModal}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto space-y-6 flex-1 text-xs">
              {/* Customer Info Box */}
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 space-y-2.5">
                <h4 className="font-bold text-slate-800 text-sm">اطلاعات خریدار و ارسال</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1 text-slate-600">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-700">نام خریدار:</span>
                    <span>{activeOrderModal.customerName}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-slate-400" />
                    <span className="font-bold text-slate-700">تلفن:</span>
                    <span dir="ltr">{activeOrderModal.customerPhone}</span>
                  </div>
                  {activeOrderModal.customerEmail && (
                    <div className="flex items-center gap-2 sm:col-span-2">
                      <Mail className="w-3.5 h-3.5 text-slate-400" />
                      <span className="font-bold text-slate-700">ایمیل:</span>
                      <span>{activeOrderModal.customerEmail}</span>
                    </div>
                  )}
                  <div className="flex items-start gap-2 sm:col-span-2">
                    <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                    <span className="font-bold text-slate-700 shrink-0">آدرس تحویل:</span>
                    <span className="leading-relaxed">{activeOrderModal.customerAddress}</span>
                  </div>
                </div>
              </div>

              {/* Items List */}
              <div>
                <h4 className="font-bold text-slate-800 text-sm mb-3">اقلام سفارش</h4>
                <div className="space-y-2.5">
                  {activeOrderModal.items.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-3 rounded-xl border border-slate-100 bg-white hover:bg-slate-50 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-slate-100 overflow-hidden shrink-0 border border-slate-200">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={item.image}
                            alt={item.title}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = "/images/products/asus-rog-4070ti.jpg";
                            }}
                          />
                        </div>
                        <div>
                          <h5 className="font-bold text-slate-800 line-clamp-1">{item.title}</h5>
                          <p className="text-slate-400 text-[11px] mt-0.5">
                            قیمت واحد: {formatPriceFa(item.price)} تومان × {toPersianDigits(item.quantity)}
                          </p>
                        </div>
                      </div>

                      <span className="font-black text-slate-900 text-sm whitespace-nowrap">
                        {formatPriceFa(item.price * item.quantity)} تومان
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Status and Action Control Box */}
              <div className="p-4 bg-blue-50/50 rounded-2xl border border-blue-100 space-y-4">
                <h4 className="font-bold text-blue-900 text-sm">تغییر و مدیریت وضعیت سفارش</h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-700 font-bold mb-1.5">وضعیت پرداخت</label>
                    <select
                      value={modalPaymentStatus}
                      onChange={(e) => setModalPaymentStatus(e.target.value as PaymentStatus)}
                      className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-slate-800 font-bold focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="paid">پرداخت شده</option>
                      <option value="pending">در انتظار پرداخت</option>
                      <option value="failed">ناموفق</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-slate-700 font-bold mb-1.5">وضعیت ارسال</label>
                    <select
                      value={modalShippingStatus}
                      onChange={(e) => setModalShippingStatus(e.target.value as ShippingStatus)}
                      className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-slate-800 font-bold focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="preparing">در حال آماده‌سازی</option>
                      <option value="shipping">در حال ارسال (پست/پیک)</option>
                      <option value="delivered">تحویل داده شده</option>
                      <option value="cancelled">لغو شده</option>
                    </select>
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-slate-700 font-bold mb-1.5">کد رهگیری پستی</label>
                    <input
                      type="text"
                      value={modalTrackingCode}
                      onChange={(e) => setModalTrackingCode(e.target.value)}
                      placeholder="مثال: TRK-9842-8711"
                      className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-slate-800 font-mono"
                      dir="ltr"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => window.print()}
                    rightIcon={<Printer className="w-3.5 h-3.5" />}
                  >
                    چاپ فاکتور
                  </Button>

                  <Button
                    type="button"
                    variant="secondary"
                    size="sm"
                    onClick={handleSaveStatus}
                    rightIcon={<Save className="w-3.5 h-3.5" />}
                  >
                    {isSavedNotice ? "تغییرات ذخیره شد ✓" : "ذخیره تغییرات"}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* New Order Modal */}
      {isNewOrderModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fade-in">
          <div
            className="w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between">
              <h3 className="text-base font-black text-slate-900">ثبت سفارش دستی جدید</h3>
              <button
                onClick={() => setIsNewOrderModalOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateNewOrder} className="p-6 space-y-4 text-xs">
              <div>
                <label className="block text-slate-700 font-bold mb-1.5">نام و نام خانوادگی مشتری</label>
                <input
                  type="text"
                  required
                  value={newOrderCustomer}
                  onChange={(e) => setNewOrderCustomer(e.target.value)}
                  placeholder="مثال: امید مرادی"
                  className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1.5">شماره موبایل</label>
                <input
                  type="text"
                  required
                  value={newOrderPhone}
                  onChange={(e) => setNewOrderPhone(e.target.value)}
                  placeholder="۰۹۱۲۰۰۰۰۰۰۰"
                  className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-mono"
                  dir="ltr"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1.5">انتخاب محصول</label>
                <select
                  value={newOrderSelectedProduct}
                  onChange={(e) => setNewOrderSelectedProduct(e.target.value)}
                  className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium"
                >
                  {products.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.title} ({formatPriceFa(p.price)} تومان)
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1.5">تعداد</label>
                <input
                  type="number"
                  min="1"
                  value={newOrderQty}
                  onChange={(e) => setNewOrderQty(parseInt(e.target.value) || 1)}
                  className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1.5">آدرس کامل پستی</label>
                <textarea
                  required
                  rows={3}
                  value={newOrderAddress}
                  onChange={(e) => setNewOrderAddress(e.target.value)}
                  placeholder="تهران، خیابان آزادی..."
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-medium"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3">
                <Button
                  type="button"
                  variant="ghost"
                  size="md"
                  onClick={() => setIsNewOrderModalOpen(false)}
                >
                  انصراف
                </Button>
                <Button
                  type="submit"
                  variant="secondary"
                  size="md"
                >
                  ثبت سفارش
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={!!deletingOrderId}
        title="حذف سفارش"
        message="آیا از حذف این سفارش مطمئن هستید؟ این عملیات قابل بازگشت نیست."
        confirmText="بله، حذف شود"
        variant="danger"
        onConfirm={() => {
          if (deletingOrderId) {
            deleteOrder(deletingOrderId);
            setDeletingOrderId(null);
          }
        }}
        onCancel={() => setDeletingOrderId(null)}
      />
    </div>
  );
}
