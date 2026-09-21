"use client";

import React, { useState, useEffect, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Header } from "@/components/layout/header";
import { ProductCard } from "@/components/products/product-card";
import { Footer } from "@/components/layout/footer";
import { Product, fetchProducts } from "@/lib/products";
import { toPersianDigits } from "@/lib/formatters";
import { Loader2 } from "lucide-react";

type SortType = "best-seller" | "newest" | "cheapest" | "expensive";

function ProductsContent() {
  const searchParams = useSearchParams();
  const initialSearch = searchParams.get("search") || "";
  const initialCategory = searchParams.get("category") || "";

  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [currentSort, setCurrentSort] = useState<SortType>("best-seller");
  const [productsList, setProductsList] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = searchParams.get("search");
    if (q !== null) {
      setSearchQuery(q);
    }
  }, [searchParams]);

  useEffect(() => {
    let isMounted = true;
    async function loadProducts() {
      setLoading(true);
      try {
        const res = await fetchProducts({
          search: searchQuery.trim() || undefined,
          category: initialCategory || undefined,
          onlyInStock: true,
        });
        if (isMounted) {
          setProductsList(res.items);
        }
      } catch (err) {
        console.error("Failed to load products from API:", err);
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    loadProducts();
    return () => {
      isMounted = false;
    };
  }, [searchQuery, initialCategory]);

  const displayedProducts = useMemo(() => {
    let list = [...productsList];

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q)
      );
    }

    switch (currentSort) {
      case "cheapest":
        list.sort((a, b) => a.priceNumber - b.priceNumber);
        break;
      case "expensive":
        list.sort((a, b) => b.priceNumber - a.priceNumber);
        break;
      case "newest":
        list.reverse();
        break;
      case "best-seller":
      default:
        list.sort((a, b) => (b.reviewsCount || 0) - (a.reviewsCount || 0));
        break;
    }

    return list;
  }, [productsList, searchQuery, currentSort]);

  const sortOptions: { id: SortType; label: string }[] = [
    { id: "best-seller", label: "پرفروش‌ترین" },
    { id: "newest", label: "جدیدترین" },
    { id: "cheapest", label: "ارزان‌ترین" },
    { id: "expensive", label: "گران‌ترین" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#f8fafc] text-slate-900 pb-16 md:pb-0">
      <Header
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/90 shadow-2xs">
          <div>
            <h1 className="text-lg sm:text-xl font-black text-[#0b1528] tracking-tight">
              محصولات
            </h1>
            <p className="text-xs text-slate-500 font-medium mt-0.5">
              نمایش {toPersianDigits(displayedProducts.length)} محصول با ضمانت اصالت
            </p>
          </div>

          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl self-start sm:self-auto overflow-x-auto no-scrollbar">
            {sortOptions.map((opt) => (
              <button
                key={opt.id}
                type="button"
                onClick={() => setCurrentSort(opt.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                  currentSort === opt.id
                    ? "bg-white text-slate-900 shadow-xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="py-20 flex flex-col items-center justify-center gap-3 text-slate-500">
            <Loader2 className="w-8 h-8 animate-spin text-[#2563eb]" />
            <span className="text-sm font-medium">در حال دریافت جدیدترین لیست محصولات از سرور...</span>
          </div>
        ) : displayedProducts.length === 0 ? (
          <div className="bg-white rounded-3xl border border-slate-200/90 py-16 px-6 text-center text-slate-500 space-y-3">
            <div className="w-14 h-14 rounded-2xl bg-blue-50 text-[#2563eb] flex items-center justify-center mx-auto">
              <Loader2 className="w-7 h-7" />
            </div>
            <p className="text-base font-black text-slate-800">
              {searchQuery ? "محصولی مطابق با جستجوی شما یافت نشد." : "در حال حاضر هیچ محصولی در فروشگاه ثبت نشده است."}
            </p>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              {searchQuery ? "عبارت دیگری را جستجو کنید یا فیلترها را حذف نمایید." : "محصولات پس از ثبت در پنل مدیریت در این بخش نمایش داده خواهند شد."}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-5">
            {displayedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><Loader2 className="w-8 h-8 animate-spin text-[#2563eb]" /></div>}>
      <ProductsContent />
    </Suspense>
  );
}
