"use client";

import React, { useState, useEffect } from "react";
import { X, MapPin, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { fetchProvinces, fetchCitiesByProvince, Province } from "@/lib/iran-cities";
import { useAddressStore } from "@/lib/store";

interface AddressModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: (addressId: string) => void;
}

export function AddressModal({ isOpen, onClose, onSuccess }: AddressModalProps) {
  const addAddress = useAddressStore((state) => state.addAddress);

  const [provinces, setProvinces] = useState<Province[]>([]);
  const [selectedProvince, setSelectedProvince] = useState("");
  const [cities, setCities] = useState<string[]>([]);
  const [selectedCity, setSelectedCity] = useState("");
  const [title, setTitle] = useState("منزل");
  const [fullAddress, setFullAddress] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [receiverName, setReceiverName] = useState("");
  const [receiverPhone, setReceiverPhone] = useState("");
  const [isDefault, setIsDefault] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (isOpen) {
      fetchProvinces().then((data) => {
        setProvinces(data);
        if (data.length > 0) {
          setSelectedProvince(data[0].name);
          setCities(data[0].cities);
          setSelectedCity(data[0].cities[0] || "");
        }
      });
    }
  }, [isOpen]);

  const handleProvinceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const pName = e.target.value;
    setSelectedProvince(pName);
    fetchCitiesByProvince(pName).then((cList) => {
      setCities(cList);
      setSelectedCity(cList[0] || "");
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullAddress.trim() || !postalCode.trim() || !receiverName.trim() || !receiverPhone.trim()) {
      setError("لطفاً تمامی فیلدهای الزامی را تکمیل کنید");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const addressData = {
        title: title.trim(),
        province: selectedProvince,
        city: selectedCity,
        fullAddress: `${selectedProvince}، ${selectedCity}، ${fullAddress.trim()}`,
        postalCode: postalCode.trim(),
        receiverName: receiverName.trim(),
        receiverPhone: receiverPhone.trim(),
        isDefault,
      };

      try {
        const { userApi } = await import("@/lib/api/user");
        const created = await userApi.createAddress(addressData);
        addAddress({
          ...addressData,
          id: created.id || `addr-${Date.now()}`,
        } as any);
        if (onSuccess) onSuccess(created.id);
      } catch {
        addAddress(addressData);
        if (onSuccess) onSuccess("new");
      }

      setIsLoading(false);
      onClose();
    } catch {
      setIsLoading(false);
      setError("خطا در ثبت آدرس");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl border border-slate-200 p-6 max-w-lg w-full shadow-2xl text-right my-8 animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-5">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-blue-50 text-[#2563eb] flex items-center justify-center">
              <MapPin className="w-5 h-5" />
            </div>
            <h3 className="text-base font-black text-slate-900">
              افزودن آدرس جدید
            </h3>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 text-xs p-3 rounded-xl mb-4 font-bold">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-700 mb-1.5">استان</label>
              <select
                value={selectedProvince}
                onChange={handleProvinceChange}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-slate-900 font-bold focus:bg-white focus:outline-none focus:border-[#2563eb]"
              >
                {provinces.map((p) => (
                  <option key={p.id} value={p.name}>
                    {p.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1.5">شهر</label>
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-slate-900 font-bold focus:bg-white focus:outline-none focus:border-[#2563eb]"
              >
                {cities.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1.5">نشانی پستی دقیق</label>
            <textarea
              rows={2}
              required
              value={fullAddress}
              onChange={(e) => setFullAddress(e.target.value)}
              placeholder="خیابان، کوچه، پلاک، طبقه، واحد..."
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-900 font-medium focus:bg-white focus:outline-none focus:border-[#2563eb]"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-700 mb-1.5">کد پستی (۱۰ رقمی)</label>
              <input
                type="text"
                dir="ltr"
                maxLength={10}
                required
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
                placeholder="۱۲۳۴۵۶۷۸۹۰"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-left text-slate-900 font-bold focus:bg-white focus:outline-none focus:border-[#2563eb]"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1.5">عنوان آدرس</label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="مثال: منزل، محل کار"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-slate-900 font-bold focus:bg-white focus:outline-none focus:border-[#2563eb]"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-700 mb-1.5">نام و نام خانوادگی تحویل‌گیرنده</label>
              <input
                type="text"
                required
                value={receiverName}
                onChange={(e) => setReceiverName(e.target.value)}
                placeholder="نام تحویل‌گیرنده"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-slate-900 font-bold focus:bg-white focus:outline-none focus:border-[#2563eb]"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1.5">شماره تماس تحویل‌گیرنده</label>
              <input
                type="tel"
                dir="ltr"
                required
                value={receiverPhone}
                onChange={(e) => setReceiverPhone(e.target.value)}
                placeholder="۰۹xxxxxxxxx"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-left text-slate-900 font-bold focus:bg-white focus:outline-none focus:border-[#2563eb]"
              />
            </div>
          </div>

          <div className="flex items-center gap-2 pt-1">
            <input
              type="checkbox"
              id="default-address"
              checked={isDefault}
              onChange={(e) => setIsDefault(e.target.checked)}
              className="w-4 h-4 rounded text-[#2563eb] focus:ring-blue-500 border-slate-300 cursor-pointer"
            />
            <label htmlFor="default-address" className="text-xs font-bold text-slate-700 cursor-pointer">
              تنظیم به عنوان آدرس پیش‌فرض
            </label>
          </div>

          <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-slate-100">
            <Button
              type="button"
              variant="outline"
              size="md"
              onClick={onClose}
              className="font-bold text-xs"
            >
              انصراف
            </Button>
            <Button
              type="submit"
              variant="primary"
              size="md"
              isLoading={isLoading}
              className="font-bold text-xs"
              rightIcon={<Plus className="w-4 h-4" />}
            >
              ثبت آدرس
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
