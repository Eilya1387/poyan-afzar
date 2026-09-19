"use client";

import React, { useState, useRef } from "react";
import { useAdminStore } from "@/lib/admin-store";
import { AdminBrand } from "@/types/admin";
import { toPersianDigits, formatPriceFa } from "@/lib/formatters";
import { ConfirmModal } from "./confirm-modal";
import { Button } from "@/components/ui/button";
import {
  Award,
  Plus,
  Edit2,
  Trash2,
  Globe,
  CheckCircle,
  XCircle,
  X,
  Package,
  FolderOpen,
  UploadCloud,
  FileImage,
  Link as LinkIcon,
} from "lucide-react";

export function BrandsView() {
  const brands = useAdminStore((state) => state.brands);
  const products = useAdminStore((state) => state.products);
  const addBrand = useAdminStore((state) => state.addBrand);
  const updateBrand = useAdminStore((state) => state.updateBrand);
  const deleteBrand = useAdminStore((state) => state.deleteBrand);

  // States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBrand, setEditingBrand] = useState<AdminBrand | null>(null);
  const [deletingBrandId, setDeletingBrandId] = useState<string | null>(null);
  const [selectedBrandProducts, setSelectedBrandProducts] = useState<AdminBrand | null>(null);

  // Form Fields
  const [name, setName] = useState("");
  const [nameFa, setNameFa] = useState("");
  const [country, setCountry] = useState("تایوان");
  const [description, setDescription] = useState("");
  const [logo, setLogo] = useState("/brands/asus.svg");
  const [isActive, setIsActive] = useState(true);

  // File Upload Ref
  const logoInputRef = useRef<HTMLInputElement>(null);

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      if (dataUrl) {
        setLogo(dataUrl);
      }
    };
    reader.readAsDataURL(file);
    if (e.target) {
      e.target.value = "";
    }
  };

  const handleOpenAdd = () => {
    setEditingBrand(null);
    setName("");
    setNameFa("");
    setCountry("تایوان");
    setDescription("");
    setLogo("/brands/asus.svg");
    setIsActive(true);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (brand: AdminBrand) => {
    setEditingBrand(brand);
    setName(brand.name);
    setNameFa(brand.nameFa);
    setCountry(brand.country);
    setDescription(brand.description);
    setLogo(brand.logo);
    setIsActive(brand.isActive);
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingBrand) {
      updateBrand(editingBrand.id, {
        name,
        nameFa,
        country,
        description,
        logo,
        isActive,
      });
    } else {
      addBrand({
        name,
        nameFa,
        country,
        description,
        logo,
        isActive,
      });
    }
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6 select-none animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            مدیریت برندها
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 font-medium">
            برندها و کمپانی‌های تولیدکننده قطعات، کشور مبدا و محصولات وابسته
          </p>
        </div>

        <Button
          size="sm"
          variant="secondary"
          onClick={handleOpenAdd}
          rightIcon={<Plus className="w-4 h-4" />}
        >
          افزودن برند جدید
        </Button>
      </div>

      {/* Brands Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {brands.map((brand) => {
          const brandProducts = products.filter(
            (p) => p.brand === brand.id || p.brand.toLowerCase() === brand.name.toLowerCase()
          );

          return (
            <div
              key={brand.id}
              className="bg-white rounded-2xl border border-slate-100 p-5 shadow-2xs hover:shadow-md transition-shadow flex flex-col justify-between space-y-4"
            >
              <div>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center p-2 font-black text-slate-800 text-lg">
                      {brand.name.substring(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold text-slate-900 text-sm">{brand.nameFa}</h3>
                        <span className="text-[11px] font-semibold text-slate-500" dir="ltr">
                          ({brand.name})
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5 text-slate-400 text-xs mt-0.5">
                        <Globe className="w-3.5 h-3.5" />
                        <span>کشور سازنده: {brand.country}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleOpenEdit(brand)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                      title="ویرایش برند"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setDeletingBrandId(brand.id)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                      title="حذف برند"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <p className="text-xs text-slate-500 mt-3 line-clamp-2 leading-relaxed">
                  {brand.description || "بدون توضیحات"}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs font-medium text-slate-500">
                  {toPersianDigits(brandProducts.length)} کالا در فروشگاه
                </span>

                <button
                  onClick={() => setSelectedBrandProducts(brand)}
                  className="text-xs font-bold text-blue-600 hover:text-blue-800 transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <FolderOpen className="w-3.5 h-3.5" />
                  <span>کالاهای این برند</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Brand Products Modal */}
      {selectedBrandProducts && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fade-in">
          <div
            className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden max-h-[85vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <div>
                <h3 className="text-base font-black text-slate-900">
                  محصولات برند {selectedBrandProducts.nameFa} ({selectedBrandProducts.name})
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  کالاهای ثبت شده تحت این برند در فروشگاه
                </p>
              </div>
              <button
                onClick={() => setSelectedBrandProducts(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-3 flex-1 text-xs">
              {products.filter(
                (p) =>
                  p.brand === selectedBrandProducts.id ||
                  p.brand.toLowerCase() === selectedBrandProducts.name.toLowerCase()
              ).length === 0 ? (
                <div className="py-12 text-center text-slate-400">
                  <Package className="w-10 h-10 mx-auto mb-2 text-slate-300" />
                  <p className="font-bold">هنوز محصولی برای این برند ثبت نشده است</p>
                </div>
              ) : (
                products
                  .filter(
                    (p) =>
                      p.brand === selectedBrandProducts.id ||
                      p.brand.toLowerCase() === selectedBrandProducts.name.toLowerCase()
                  )
                  .map((product) => (
                    <div
                      key={product.id}
                      className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-between gap-3"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-white border border-slate-200 overflow-hidden shrink-0">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={product.image}
                            alt={product.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <h4 className="font-bold text-slate-900 line-clamp-1">{product.title}</h4>
                          <span className="text-[11px] text-slate-500 font-bold">
                            موجودی: {toPersianDigits(product.stock)} عدد
                          </span>
                        </div>
                      </div>

                      <span className="font-black text-slate-900 text-xs">
                        {formatPriceFa(product.price)} تومان
                      </span>
                    </div>
                  ))
              )}
            </div>
          </div>
        </div>
      )}

      {/* Add / Edit Brand Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fade-in">
          <div
            className="w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between">
              <h3 className="text-base font-black text-slate-900">
                {editingBrand ? "ویرایش برند" : "افزودن برند جدید"}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
              <div>
                <label className="block text-slate-700 font-bold mb-1.5">
                  نام انگلیسی برند (Brand Name) *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="مثال: Razer"
                  className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-mono"
                  dir="ltr"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1.5">
                  نام فارسی برند *
                </label>
                <input
                  type="text"
                  required
                  value={nameFa}
                  onChange={(e) => setNameFa(e.target.value)}
                  placeholder="مثال: ریزر"
                  className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1.5">
                  کشور سازنده / خاستگاه *
                </label>
                <input
                  type="text"
                  required
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  placeholder="مثال: آمریکا، ژاپن، تایوان"
                  className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1.5">توضیحات برند</label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="درباره برند و تخصص..."
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-medium"
                />
              </div>

              {/* Logo Picker / Upload */}
              <div className="space-y-2">
                <label className="block text-slate-700 font-bold mb-1.5">لوگوی برند</label>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center overflow-hidden shrink-0 p-1">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={logo || "/brands/asus.svg"}
                      alt="پیش‌نمایش لوگو"
                      className="max-h-full max-w-full object-contain"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "/brands/asus.svg";
                      }}
                    />
                  </div>

                  <input
                    type="file"
                    ref={logoInputRef}
                    onChange={handleLogoUpload}
                    accept="image/*"
                    className="hidden"
                  />

                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => logoInputRef.current?.click()}
                    leftIcon={<UploadCloud className="w-4 h-4" />}
                  >
                    آپلود لوگو از دیوایس
                  </Button>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3">
                <Button
                  type="button"
                  variant="ghost"
                  size="md"
                  onClick={() => setIsModalOpen(false)}
                >
                  انصراف
                </Button>
                <Button
                  type="submit"
                  variant="secondary"
                  size="md"
                >
                  {editingBrand ? "بروزرسانی برند" : "ایجاد برند"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={!!deletingBrandId}
        title="حذف برند"
        message="آیا از حذف این برند مطمئن هستید؟"
        confirmText="بله، حذف شود"
        variant="danger"
        onConfirm={() => {
          if (deletingBrandId) {
            deleteBrand(deletingBrandId);
            setDeletingBrandId(null);
          }
        }}
        onCancel={() => setDeletingBrandId(null)}
      />
    </div>
  );
}
