"use client";

import React, { useState } from "react";
import { useAdminStore } from "@/lib/admin-store";
import { AdminCategory } from "@/types/admin";
import { formatPriceFa, toPersianDigits } from "@/lib/formatters";
import { ConfirmModal } from "./confirm-modal";
import { Button } from "@/components/ui/button";
import {
  Shapes,
  Plus,
  Edit2,
  Trash2,
  Layers,
  Package,
  X,
  CheckCircle,
  MoveRight,
  FolderOpen,
} from "lucide-react";

export function CategoriesView() {
  const categories = useAdminStore((state) => state.categories);
  const products = useAdminStore((state) => state.products);
  const addCategory = useAdminStore((state) => state.addCategory);
  const updateCategory = useAdminStore((state) => state.updateCategory);
  const deleteCategory = useAdminStore((state) => state.deleteCategory);
  const updateProduct = useAdminStore((state) => state.updateProduct);

  // States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCat, setEditingCat] = useState<AdminCategory | null>(null);
  const [deletingCatId, setDeletingCatId] = useState<string | null>(null);
  const [selectedCatProducts, setSelectedCatProducts] = useState<AdminCategory | null>(null);

  // Form Fields
  const [name, setName] = useState("");
  const [nameEn, setNameEn] = useState("");
  const [description, setDescription] = useState("");
  const [icon, setIcon] = useState("Shapes");

  const handleOpenAdd = () => {
    setEditingCat(null);
    setName("");
    setNameEn("");
    setDescription("");
    setIcon("Shapes");
    setIsModalOpen(true);
  };

  const handleOpenEdit = (cat: AdminCategory) => {
    setEditingCat(cat);
    setName(cat.name);
    setNameEn(cat.nameEn);
    setDescription(cat.description);
    setIcon(cat.icon);
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingCat) {
      updateCategory(editingCat.id, {
        name,
        nameEn,
        description,
        icon,
      });
    } else {
      addCategory({
        name,
        nameEn,
        description,
        icon,
      });
    }
    setIsModalOpen(false);
  };

  // Move product to another category
  const handleMoveProductCategory = (productId: string, targetCatId: string) => {
    const targetCat = categories.find((c) => c.id === targetCatId);
    if (!targetCat) return;
    updateProduct(productId, {
      category: targetCatId,
      categoryName: targetCat.name,
    });
  };

  return (
    <div className="space-y-6 select-none animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            مدیریت دسته‌بندی‌ها
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 font-medium">
            دسته‌بندی‌های کالا، تعریف شاخه‌ها و تخصیص محصولات به دسته‌های مربوطه
          </p>
        </div>

        <Button
          size="sm"
          variant="secondary"
          onClick={handleOpenAdd}
          rightIcon={<Plus className="w-4 h-4" />}
        >
          افزودن دسته‌بندی جدید
        </Button>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map((cat) => {
          const catProducts = products.filter((p) => p.category === cat.id);

          return (
            <div
              key={cat.id}
              className="bg-white rounded-2xl border border-slate-100 p-5 shadow-2xs hover:shadow-md transition-shadow flex flex-col justify-between space-y-4"
            >
              <div>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100/60">
                      <Shapes className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 text-sm">{cat.name}</h3>
                      <p className="text-xs text-slate-400 mt-0.5" dir="ltr">
                        {cat.nameEn}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleOpenEdit(cat)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                      title="ویرایش دسته‌بندی"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setDeletingCatId(cat.id)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                      title="حذف دسته‌بندی"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <p className="text-xs text-slate-500 mt-3 line-clamp-2 leading-relaxed">
                  {cat.description || "بدون توضیحات"}
                </p>
              </div>

              {/* Footer info & action */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs font-medium text-slate-500">
                  {toPersianDigits(catProducts.length)} محصول
                </span>

                <button
                  onClick={() => setSelectedCatProducts(cat)}
                  className="text-xs font-bold text-blue-600 hover:text-blue-800 transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <FolderOpen className="w-3.5 h-3.5" />
                  <span>مشاهده و تغییر محصولات</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Products inside category manager modal */}
      {selectedCatProducts && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fade-in">
          <div
            className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden max-h-[85vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <div>
                <h3 className="text-base font-black text-slate-900">
                  محصولات دسته‌بندی: {selectedCatProducts.name}
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  می‌توانید دسته کالاهای زیر را به دسته‌بندی دیگری منتقل کنید
                </p>
              </div>
              <button
                onClick={() => setSelectedCatProducts(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-3 flex-1 text-xs">
              {products.filter((p) => p.category === selectedCatProducts.id).length === 0 ? (
                <div className="py-12 text-center text-slate-400">
                  <Package className="w-10 h-10 mx-auto mb-2 text-slate-300" />
                  <p className="font-bold">هنوز محصولی در این دسته‌بندی ثبت نشده است</p>
                </div>
              ) : (
                products
                  .filter((p) => p.category === selectedCatProducts.id)
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
                            {formatPriceFa(product.price)} تومان
                          </span>
                        </div>
                      </div>

                      {/* Change Category Dropdown */}
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] text-slate-400 font-medium">تغییر دسته:</span>
                        <select
                          value={product.category}
                          onChange={(e) => handleMoveProductCategory(product.id, e.target.value)}
                          className="px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        >
                          {categories.map((c) => (
                            <option key={c.id} value={c.id}>
                              {c.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  ))
              )}
            </div>
          </div>
        </div>
      )}

      {/* Add/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fade-in">
          <div
            className="w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between">
              <h3 className="text-base font-black text-slate-900">
                {editingCat ? "ویرایش دسته‌بندی" : "افزودن دسته‌بندی جدید"}
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
                  نام فارسی دسته‌بندی *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="مثال: مانیتور و نمایشگر"
                  className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1.5">
                  عنوان انگلیسی / شناسه (Slug) *
                </label>
                <input
                  type="text"
                  required
                  value={nameEn}
                  onChange={(e) => setNameEn(e.target.value)}
                  placeholder="Monitors"
                  className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-mono"
                  dir="ltr"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1.5">توضیحات کوتاه</label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="توضیح کوتاه درباره کالاهای این دسته..."
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-medium"
                />
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
                  {editingCat ? "بروزرسانی" : "ایجاد دسته‌بندی"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={!!deletingCatId}
        title="حذف دسته‌بندی"
        message="آیا از حذف این دسته‌بندی مطمئن هستید؟"
        confirmText="بله، حذف شود"
        variant="danger"
        onConfirm={() => {
          if (deletingCatId) {
            deleteCategory(deletingCatId);
            setDeletingCatId(null);
          }
        }}
        onCancel={() => setDeletingCatId(null)}
      />
    </div>
  );
}
