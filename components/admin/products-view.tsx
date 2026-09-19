"use client";

import React, { useState, useMemo, useRef } from "react";
import { useAdminStore } from "@/lib/admin-store";
import { formatPriceFa, toPersianDigits } from "@/lib/formatters";
import { AdminProduct, AdminProductSpec } from "@/types/admin";
import { ConfirmModal } from "./confirm-modal";
import { Button } from "@/components/ui/button";
import {
  Search,
  Plus,
  Edit2,
  Trash2,
  Eye,
  Package,
  Layers,
  CheckCircle2,
  AlertTriangle,
  X,
  PlusCircle,
  MinusCircle,
  Image as ImageIcon,
  UploadCloud,
  FileImage,
  Link as LinkIcon,
  Loader2,
  Grid,
  List,
} from "lucide-react";

export function ProductsView() {
  const products = useAdminStore((state) => state.products);
  const categories = useAdminStore((state) => state.categories);
  const brands = useAdminStore((state) => state.brands);
  const addProduct = useAdminStore((state) => state.addProduct);
  const updateProduct = useAdminStore((state) => state.updateProduct);
  const deleteProduct = useAdminStore((state) => state.deleteProduct);

  // States
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedBrand, setSelectedBrand] = useState<string>("all");
  const [stockFilter, setStockFilter] = useState<string>("all");
  const [viewMode, setViewMode] = useState<"table" | "grid">("table");

  // Modal States
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<AdminProduct | null>(null);
  const [deletingProductId, setDeletingProductId] = useState<string | null>(null);

  // Form Fields
  const [formTitle, setFormTitle] = useState("");
  const [formEnTitle, setFormEnTitle] = useState("");
  const [formCategory, setFormCategory] = useState(categories[0]?.id || "gpu");
  const [formBrand, setFormBrand] = useState(brands[0]?.id || "asus");
  const [formPrice, setFormPrice] = useState<number>(10000000);
  const [formOriginalPrice, setFormOriginalPrice] = useState<number>(12000000);
  const [formStock, setFormStock] = useState<number>(10);
  const [formMinStock, setFormMinStock] = useState<number>(3);
  const [formImage, setFormImage] = useState("/images/products/asus-rog-4070ti.jpg");
  const [formDescription, setFormDescription] = useState("");
  const [formWarranty, setFormWarranty] = useState("۱۸ ماهه گارانتی اصلی");
  const [formSeller, setFormSeller] = useState("پویان افزار");
  const [formBadgeText, setFormBadgeText] = useState("");
  const [formBadgeType, setFormBadgeType] = useState<"discount" | "in-stock" | "hot">("in-stock");
  const [formSpecs, setFormSpecs] = useState<AdminProductSpec[]>([
    { label: "حافظه / مشخصه اصلی", value: "مقدار نمونه" },
  ]);

  // File Upload State & Ref
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDraggingFile, setIsDraggingFile] = useState(false);
  const [isProcessingImage, setIsProcessingImage] = useState(false);

  const presetImages = [
    { label: "ایسوس 4070ti", url: "/images/products/asus-rog-4070ti.jpg" },
    { label: "ام‌اس‌آی 4060ti", url: "/images/products/msi-4060ti.jpg" },
    { label: "گیگابایت 4080", url: "/images/products/gigabyte-4080.jpg" },
    { label: "انویدیا 4090", url: "/images/products/nvidia-4090.jpg" },
    { label: "ایسوس تاف 4070", url: "/images/products/asus-tuf-4070.jpg" },
    { label: "گیگابایت 4060", url: "/images/products/gigabyte-4060.jpg" },
  ];

  // Process uploaded image file from device with canvas optimization
  const processImageFile = (file: File) => {
    if (!file.type.startsWith("image/")) {
      alert("لطفاً یک فایل تصویری معتبر (JPG, PNG, WEBP, ...) انتخاب نمایید.");
      return;
    }

    setIsProcessingImage(true);
    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      if (!dataUrl) {
        setIsProcessingImage(false);
        return;
      }

      // Optimize image dimensions via canvas so localStorage stays lightweight
      const img = new Image();
      img.onload = () => {
        const maxWidth = 800;
        const maxHeight = 800;
        let { width, height } = img;

        if (width > maxWidth || height > maxHeight) {
          if (width > height) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          } else {
            width = Math.round((width * maxHeight) / height);
            height = maxHeight;
          }
        }

        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
          const optimizedUrl = canvas.toDataURL("image/jpeg", 0.85);
          setFormImage(optimizedUrl);
        } else {
          setFormImage(dataUrl);
        }
        setIsProcessingImage(false);
      };
      img.onerror = () => {
        setFormImage(dataUrl);
        setIsProcessingImage(false);
      };
      img.src = dataUrl;
    };
    reader.onerror = () => {
      setIsProcessingImage(false);
    };
    reader.readAsDataURL(file);
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processImageFile(file);
    }
    if (e.target) {
      e.target.value = "";
    }
  };

  const handleDropFile = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDraggingFile(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      processImageFile(file);
    }
  };

  const handleDragOverFile = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDraggingFile(true);
  };

  const handleDragLeaveFile = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDraggingFile(false);
  };

  // Open Create Modal
  const handleOpenCreateModal = () => {
    setEditingProduct(null);
    setFormTitle("");
    setFormEnTitle("");
    setFormCategory(categories[0]?.id || "gpu");
    setFormBrand(brands[0]?.id || "asus");
    setFormPrice(15000000);
    setFormOriginalPrice(15000000);
    setFormStock(10);
    setFormMinStock(3);
    setFormImage(presetImages[0].url);
    setFormDescription("");
    setFormWarranty("۱۸ ماهه گارانتی اصلی");
    setFormSeller("پویان افزار");
    setFormBadgeText("");
    setFormBadgeType("in-stock");
    setFormSpecs([
      { label: "حافظه ویدیویی", value: "8GB" },
      { label: "رابط کاربری", value: "PCIe 4.0" },
    ]);
    setIsFormModalOpen(true);
  };

  // Open Edit Modal
  const handleOpenEditModal = (product: AdminProduct) => {
    setEditingProduct(product);
    setFormTitle(product.title);
    setFormEnTitle(product.enTitle || "");
    setFormCategory(product.category);
    setFormBrand(product.brand);
    setFormPrice(product.price);
    setFormOriginalPrice(product.originalPrice || product.price);
    setFormStock(product.stock);
    setFormMinStock(product.minStockThreshold);
    setFormImage(product.image);
    setFormDescription(product.description || "");
    setFormWarranty(product.warranty || "۱۸ ماهه گارانتی اصلی");
    setFormSeller(product.seller || "پویان افزار");
    setFormBadgeText(product.badge?.text || "");
    setFormBadgeType(product.badge?.type || "in-stock");
    setFormSpecs(product.specs && product.specs.length > 0 ? product.specs : [{ label: "", value: "" }]);
    setIsFormModalOpen(true);
  };

  // Add spec row
  const handleAddSpecRow = () => {
    setFormSpecs([...formSpecs, { label: "", value: "" }]);
  };

  // Remove spec row
  const handleRemoveSpecRow = (idx: number) => {
    setFormSpecs(formSpecs.filter((_, i) => i !== idx));
  };

  // Update spec
  const handleUpdateSpec = (idx: number, field: "label" | "value", val: string) => {
    const updated = [...formSpecs];
    updated[idx][field] = val;
    setFormSpecs(updated);
  };

  // Save product
  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    const catObj = categories.find((c) => c.id === formCategory);
    const brandObj = brands.find((b) => b.id === formBrand);

    const productPayload = {
      title: formTitle,
      enTitle: formEnTitle,
      category: formCategory,
      categoryName: catObj?.name || formCategory,
      brand: formBrand,
      brandFa: brandObj?.nameFa || formBrand,
      price: Number(formPrice),
      originalPrice: Number(formOriginalPrice),
      stock: Number(formStock),
      minStockThreshold: Number(formMinStock),
      image: formImage,
      inStock: Number(formStock) > 0,
      rating: editingProduct?.rating || 5.0,
      reviewsCount: editingProduct?.reviewsCount || 0,
      description: formDescription,
      warranty: formWarranty,
      seller: formSeller,
      specs: formSpecs.filter((s) => s.label.trim() !== ""),
      badge: formBadgeText.trim()
        ? { text: formBadgeText, type: formBadgeType }
        : undefined,
    };

    if (editingProduct) {
      updateProduct(editingProduct.id, productPayload);
    } else {
      addProduct(productPayload);
    }

    setIsFormModalOpen(false);
  };

  // Filtered products
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchSearch =
        p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (p.enTitle && p.enTitle.toLowerCase().includes(searchTerm.toLowerCase()));

      if (!matchSearch) return false;

      if (selectedCategory !== "all" && p.category !== selectedCategory) return false;
      if (selectedBrand !== "all" && p.brand !== selectedBrand) return false;

      if (stockFilter === "in-stock" && p.stock <= 0) return false;
      if (stockFilter === "low-stock" && p.stock > p.minStockThreshold) return false;
      if (stockFilter === "out-of-stock" && p.stock > 0) return false;

      return true;
    });
  }, [products, searchTerm, selectedCategory, selectedBrand, stockFilter]);

  return (
    <div className="space-y-6 select-none animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            مدیریت محصولات فروشگاه
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 font-medium">
            لیست تمام کالاهای موجود در سایت با قابلیت ویرایش، قیمت‌گذاری و افزودن کالای جدید
          </p>
        </div>

        <Button
          size="sm"
          variant="secondary"
          onClick={handleOpenCreateModal}
          rightIcon={<Plus className="w-4 h-4" />}
        >
          افزودن محصول جدید
        </Button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-2xs space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {/* Search */}
          <div className="relative lg:col-span-2">
            <Search className="w-4 h-4 absolute inset-y-0 right-3 my-auto text-slate-400 pointer-events-none" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="جستجوی نام یا مدل کالا..."
              className="w-full pr-9 pl-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
            />
          </div>

          {/* Category Filter */}
          <div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            >
              <option value="all">همه دسته‌بندی‌ها</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          {/* Brand Filter */}
          <div>
            <select
              value={selectedBrand}
              onChange={(e) => setSelectedBrand(e.target.value)}
              className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            >
              <option value="all">همه برندها</option>
              {brands.map((b) => (
                <option key={b.id} value={b.id}>
                  {b.nameFa} ({b.name})
                </option>
              ))}
            </select>
          </div>

          {/* Stock Filter */}
          <div>
            <select
              value={stockFilter}
              onChange={(e) => setStockFilter(e.target.value)}
              className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            >
              <option value="all">همه موجودی‌ها</option>
              <option value="in-stock">کالاهای موجود</option>
              <option value="low-stock">رو به اتمام (موجودی کم)</option>
              <option value="out-of-stock">ناموجود شده</option>
            </select>
          </div>
        </div>

        {/* View toggle & count */}
        <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs text-slate-500">
          <span>
            نمایش <strong className="text-slate-800">{toPersianDigits(filteredProducts.length)}</strong> محصول از مجموع{" "}
            <strong className="text-slate-800">{toPersianDigits(products.length)}</strong> محصول
          </span>

          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
            <button
              onClick={() => setViewMode("table")}
              className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                viewMode === "table" ? "bg-white text-blue-600 shadow-2xs" : "text-slate-500 hover:text-slate-800"
              }`}
              title="نمایش جدولی"
            >
              <List className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode("grid")}
              className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                viewMode === "grid" ? "bg-white text-blue-600 shadow-2xs" : "text-slate-500 hover:text-slate-800"
              }`}
              title="نمایش کارت‌ها"
            >
              <Grid className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Product Content: Table or Grid */}
      {viewMode === "table" ? (
        <div className="bg-white rounded-2xl border border-slate-100 shadow-2xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-right text-xs">
              <thead>
                <tr className="bg-slate-50/80 text-slate-500 font-bold border-b border-slate-100">
                  <th className="py-3.5 px-4">تصویر</th>
                  <th className="py-3.5 px-4">عنوان محصول</th>
                  <th className="py-3.5 px-4">دسته‌بندی</th>
                  <th className="py-3.5 px-4">برند</th>
                  <th className="py-3.5 px-4">قیمت اصلی</th>
                  <th className="py-3.5 px-4">قیمت نهایی</th>
                  <th className="py-3.5 px-4 text-center">موجودی انبار</th>
                  <th className="py-3.5 px-4 text-center">وضعیت</th>
                  <th className="py-3.5 px-4 text-center">عملیات</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredProducts.length === 0 ? (
                  <tr>
                    <td colSpan={9} className="py-12 text-center text-slate-400">
                      <Package className="w-10 h-10 mx-auto mb-2 text-slate-300" />
                      <p className="font-bold text-sm text-slate-600">محصولی پیدا نشد</p>
                    </td>
                  </tr>
                ) : (
                  filteredProducts.map((p) => {
                    const isLowStock = p.stock > 0 && p.stock <= p.minStockThreshold;
                    const isOutOfStock = p.stock === 0;

                    return (
                      <tr
                        key={p.id}
                        className="hover:bg-slate-50/70 transition-colors font-medium text-slate-700"
                      >
                        <td className="py-3 px-4">
                          <div className="w-12 h-12 rounded-xl bg-slate-100 overflow-hidden border border-slate-200 shrink-0">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={p.image}
                              alt={p.title}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                (e.target as HTMLImageElement).src = "/images/products/asus-rog-4070ti.jpg";
                              }}
                            />
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <div>
                            <h4 className="font-bold text-slate-900 line-clamp-1">{p.title}</h4>
                            {p.enTitle && (
                              <p className="text-[11px] text-slate-400 mt-0.5 line-clamp-1" dir="ltr">
                                {p.enTitle}
                              </p>
                            )}
                          </div>
                        </td>
                        <td className="py-3 px-4 font-bold text-slate-600">
                          {p.categoryName || p.category}
                        </td>
                        <td className="py-3 px-4 font-bold text-slate-600">
                          {p.brandFa || p.brand}
                        </td>
                        <td className="py-3 px-4 text-slate-400 line-through">
                          {p.originalPrice && p.originalPrice > p.price
                            ? `${formatPriceFa(p.originalPrice)}`
                            : "-"}
                        </td>
                        <td className="py-3 px-4 font-black text-slate-900">
                          {formatPriceFa(p.price)} تومان
                        </td>
                        <td className="py-3 px-4 text-center">
                          <span
                            className={`font-bold px-2.5 py-1 rounded-lg ${
                              isOutOfStock
                                ? "bg-rose-50 text-rose-600"
                                : isLowStock
                                ? "bg-amber-50 text-amber-600"
                                : "bg-slate-100 text-slate-800"
                            }`}
                          >
                            {toPersianDigits(p.stock)} عدد
                          </span>
                        </td>
                        <td className="py-3 px-4 text-center">
                          {isOutOfStock ? (
                            <span className="font-semibold text-rose-600">ناموجود</span>
                          ) : isLowStock ? (
                            <span className="font-semibold text-amber-600">رو به اتمام</span>
                          ) : (
                            <span className="font-semibold text-emerald-600">موجود</span>
                          )}
                        </td>
                        <td className="py-3 px-4 text-center">
                          <div className="flex items-center justify-center gap-1.5">
                            <button
                              onClick={() => handleOpenEditModal(p)}
                              className="p-1.5 rounded-lg text-slate-500 hover:text-blue-600 hover:bg-blue-50 transition-colors cursor-pointer"
                              title="ویرایش محصول"
                            >
                              <Edit2 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => setDeletingProductId(p.id)}
                              className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                              title="حذف محصول"
                            >
                              <Trash2 className="w-4 h-4" />
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
      ) : (
        /* Grid Mode */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredProducts.map((p) => (
            <div
              key={p.id}
              className="bg-white rounded-2xl border border-slate-100 p-4 shadow-2xs hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div>
                <div className="w-full h-44 rounded-xl bg-slate-50 overflow-hidden mb-3 border border-slate-100 relative">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={p.image}
                    alt={p.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex items-center justify-between text-[11px] text-slate-500 font-bold mb-1">
                  <span>{p.categoryName || p.category}</span>
                  <span>{p.brandFa || p.brand}</span>
                </div>

                <h4 className="font-bold text-xs text-slate-900 line-clamp-2 leading-relaxed mb-2">
                  {p.title}
                </h4>
              </div>

              <div className="pt-3 border-t border-slate-100">
                <div className="flex items-baseline justify-between mb-3">
                  <span className="text-[11px] font-bold text-slate-500">
                    موجودی: {toPersianDigits(p.stock)}
                  </span>
                  <span className="font-black text-slate-900 text-sm">
                    {formatPriceFa(p.price)} تومان
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleOpenEditModal(p)}
                    className="flex-1 py-1.5 px-3 bg-slate-50 hover:bg-blue-50 text-slate-700 hover:text-blue-600 rounded-xl text-xs font-bold border border-slate-200 hover:border-blue-200 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                    <span>ویرایش</span>
                  </button>
                  <button
                    onClick={() => setDeletingProductId(p.id)}
                    className="p-1.5 bg-slate-50 hover:bg-rose-50 text-slate-400 hover:text-rose-600 rounded-xl border border-slate-200 hover:border-rose-200 transition-colors cursor-pointer"
                    title="حذف"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add / Edit Product Modal */}
      {isFormModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fade-in">
          <div
            className="w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden max-h-[90vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <h3 className="text-base font-black text-slate-900">
                {editingProduct ? "ویرایش محصول" : "افزودن محصول جدید به فروشگاه"}
              </h3>
              <button
                onClick={() => setIsFormModalOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSaveProduct} className="p-6 overflow-y-auto space-y-5 text-xs flex-1">
              {/* Product Title */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-700 font-bold mb-1.5">
                    نام محصول (فارسی) *
                  </label>
                  <input
                    type="text"
                    required
                    value={formTitle}
                    onChange={(e) => setFormTitle(e.target.value)}
                    placeholder="مثال: کارت گرافیک ایسوس مدل ROG Strix RTX 4070 Ti"
                    className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-800"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1.5">
                    عنوان انگلیسی / اسلاگ
                  </label>
                  <input
                    type="text"
                    value={formEnTitle}
                    onChange={(e) => setFormEnTitle(e.target.value)}
                    placeholder="ASUS ROG Strix RTX 4070 Ti"
                    className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-mono text-slate-800"
                    dir="ltr"
                  />
                </div>
              </div>

              {/* Category & Brand */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-700 font-bold mb-1.5">
                    دسته‌بندی کالا *
                  </label>
                  <select
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value)}
                    className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-800"
                  >
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1.5">
                    برند سازنده *
                  </label>
                  <select
                    value={formBrand}
                    onChange={(e) => setFormBrand(e.target.value)}
                    className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-800"
                  >
                    {brands.map((b) => (
                      <option key={b.id} value={b.id}>
                        {b.nameFa} ({b.name})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Pricing & Stock */}
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                <div>
                  <label className="block text-slate-700 font-bold mb-1.5">
                    قیمت قبل تخفیف (تومان)
                  </label>
                  <input
                    type="number"
                    value={formOriginalPrice}
                    onChange={(e) => setFormOriginalPrice(Number(e.target.value))}
                    className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-black text-slate-800"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1.5">
                    قیمت فروش نهایی (تومان) *
                  </label>
                  <input
                    type="number"
                    required
                    value={formPrice}
                    onChange={(e) => setFormPrice(Number(e.target.value))}
                    className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-black text-blue-600"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1.5">
                    تعداد موجودی انبار *
                  </label>
                  <input
                    type="number"
                    min="0"
                    required
                    value={formStock}
                    onChange={(e) => setFormStock(Number(e.target.value))}
                    className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-800"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1.5">
                    حداقل هشدار موجودی
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={formMinStock}
                    onChange={(e) => setFormMinStock(Number(e.target.value))}
                    className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-800"
                  />
                </div>
              </div>

              {/* Image Picker with Device Upload, Drag & Drop, Presets & Direct URL */}
              <div className="space-y-3 p-4 bg-slate-50/80 rounded-2xl border border-slate-200">
                <div className="flex items-center justify-between">
                  <label className="block text-slate-800 font-bold">
                    تصویر محصول *
                  </label>
                  <span className="text-[11px] text-slate-500 font-medium">
                    آپلود از دستگاه یا انتخاب از تصاویر آماده
                  </span>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 items-start">
                  {/* Preview Box */}
                  <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-2xl bg-white border-2 border-dashed border-slate-200 overflow-hidden shrink-0 flex items-center justify-center p-2 shadow-xs group">
                    {isProcessingImage ? (
                      <div className="flex flex-col items-center justify-center text-blue-600 gap-1.5">
                        <Loader2 className="w-6 h-6 animate-spin" />
                        <span className="text-[10px] font-bold">پردازش...</span>
                      </div>
                    ) : formImage ? (
                      <>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={formImage}
                          alt="پیش‌نمایش تصویر کالا"
                          className="w-full h-full object-contain"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = "/images/products/asus-rog-4070ti.jpg";
                          }}
                        />
                        <button
                          type="button"
                          onClick={() => setFormImage("")}
                          title="حذف تصویر"
                          className="absolute top-1.5 left-1.5 p-1 rounded-lg bg-rose-600 text-white opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer shadow-xs"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </>
                    ) : (
                      <div className="text-center text-slate-400">
                        <FileImage className="w-8 h-8 mx-auto mb-1 opacity-50" />
                        <span className="text-[10px] font-bold">بدون تصویر</span>
                      </div>
                    )}
                  </div>

                  {/* Actions: Upload & Presets & URL */}
                  <div className="flex-1 w-full space-y-2.5">
                    {/* Hidden Native File Input */}
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleFileInputChange}
                      accept="image/png, image/jpeg, image/webp, image/svg+xml, image/gif"
                      className="hidden"
                    />

                    {/* Upload Dropzone */}
                    <div
                      onDragOver={handleDragOverFile}
                      onDragLeave={handleDragLeaveFile}
                      onDrop={handleDropFile}
                      onClick={() => fileInputRef.current?.click()}
                      className={`w-full p-3 rounded-xl border-2 border-dashed transition-all cursor-pointer flex items-center justify-center gap-3 text-right select-none ${
                        isDraggingFile
                          ? "border-blue-500 bg-blue-50/80 text-blue-700 scale-[0.99]"
                          : "border-slate-300 bg-white hover:border-blue-400 hover:bg-blue-50/40 text-slate-700"
                      }`}
                    >
                      <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                        <UploadCloud className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        <p className="text-xs font-bold text-slate-800">
                          انتخاب عکس از گوشی / کامپیوتر یا رها کردن اینجا (Drag & Drop)
                        </p>
                        <p className="text-[11px] text-slate-500 mt-0.5">
                          فرمت‌های JPG, PNG, WEBP با بهینه‌سازی خودکار حجم
                        </p>
                      </div>
                    </div>

                    {/* Preset Quick Images */}
                    <div>
                      <span className="text-[11px] font-bold text-slate-500 block mb-1">
                        یا انتخاب سریع تصویر نمونه:
                      </span>
                      <div className="flex flex-wrap items-center gap-1.5">
                        {presetImages.map((img) => (
                          <button
                            type="button"
                            key={img.url}
                            onClick={() => setFormImage(img.url)}
                            className={`px-2.5 py-1 rounded-lg border text-[11px] font-bold transition-all cursor-pointer ${
                              formImage === img.url
                                ? "bg-blue-600 text-white border-blue-600 shadow-xs"
                                : "bg-white text-slate-600 border-slate-200 hover:bg-slate-100"
                            }`}
                          >
                            {img.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Manual URL Input */}
                    <div className="relative">
                      <input
                        type="text"
                        required
                        value={formImage}
                        onChange={(e) => setFormImage(e.target.value)}
                        placeholder="آدرس تصویر (URL مستقیم یا مسیر وب)"
                        className="w-full pl-8 pr-3 py-2 bg-white border border-slate-200 rounded-xl font-mono text-[11px] text-slate-800 placeholder:text-slate-400"
                        dir="ltr"
                      />
                      <LinkIcon className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Warranty & Seller */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-700 font-bold mb-1.5">گارانتی</label>
                  <input
                    type="text"
                    value={formWarranty}
                    onChange={(e) => setFormWarranty(e.target.value)}
                    placeholder="مثال: ۱۸ ماهه اصلی"
                    className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-bold mb-1.5">فروشنده</label>
                  <input
                    type="text"
                    value={formSeller}
                    onChange={(e) => setFormSeller(e.target.value)}
                    placeholder="پویان افزار"
                    className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium"
                  />
                </div>
              </div>

              {/* Specifications Builder */}
              <div className="space-y-3 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-800">مشخصات فنی و کلیدی محصول</span>
                  <button
                    type="button"
                    onClick={handleAddSpecRow}
                    className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 hover:text-blue-800 cursor-pointer"
                  >
                    <PlusCircle className="w-3.5 h-3.5" />
                    <span>افزودن ردیف مشخصه</span>
                  </button>
                </div>

                <div className="space-y-2">
                  {formSpecs.map((spec, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <input
                        type="text"
                        placeholder="عنوان (مثلا: نوع حافظه)"
                        value={spec.label}
                        onChange={(e) => handleUpdateSpec(idx, "label", e.target.value)}
                        className="flex-1 px-3 py-2 bg-white border border-slate-200 rounded-xl font-medium"
                      />
                      <input
                        type="text"
                        placeholder="مقدار (مثلا: GDDR6X 16GB)"
                        value={spec.value}
                        onChange={(e) => handleUpdateSpec(idx, "value", e.target.value)}
                        className="flex-1 px-3 py-2 bg-white border border-slate-200 rounded-xl font-medium"
                      />
                      {formSpecs.length > 1 && (
                        <button
                          type="button"
                          onClick={() => handleRemoveSpecRow(idx)}
                          className="p-2 text-rose-500 hover:bg-rose-50 rounded-xl transition-colors cursor-pointer"
                        >
                          <MinusCircle className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-slate-700 font-bold mb-1.5">توضیحات و معرفی محصول</label>
                <textarea
                  rows={3}
                  value={formDescription}
                  onChange={(e) => setFormDescription(e.target.value)}
                  placeholder="توضیحات تکمیلی محصول جهت نمایش در سایت..."
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-medium leading-relaxed"
                />
              </div>

              {/* Actions */}
              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
                <Button
                  type="button"
                  variant="ghost"
                  size="md"
                  onClick={() => setIsFormModalOpen(false)}
                >
                  انصراف
                </Button>
                <Button
                  type="submit"
                  variant="secondary"
                  size="md"
                >
                  {editingProduct ? "بروزرسانی محصول" : "ثبت و انتشار محصول"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={!!deletingProductId}
        title="حذف محصول"
        message="آیا از حذف این محصول مطمئن هستید؟ این کالا از لیست فروشگاه خارج خواهد شد."
        confirmText="بله، حذف شود"
        variant="danger"
        onConfirm={() => {
          if (deletingProductId) {
            deleteProduct(deletingProductId);
            setDeletingProductId(null);
          }
        }}
        onCancel={() => setDeletingProductId(null)}
      />
    </div>
  );
}
