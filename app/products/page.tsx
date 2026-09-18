"use client";

import React, { useState, useMemo } from "react";
import { Header } from "@/components/layout/header";
import { ProductCard } from "@/components/products/product-card";
import { Footer } from "@/components/layout/footer";
import { BottomNav } from "@/components/layout/bottom-nav";
import { getAllProducts } from "@/lib/products";
import { toPersianDigits } from "@/lib/formatters";

type SortType = "best-seller" | "newest" | "cheapest" | "expensive";

export default function ProductsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentSort, setCurrentSort] = useState<SortType>("best-seller");

  const allProducts = getAllProducts();

  const displayedProducts = useMemo(() => {
    let list = [...allProducts];

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
        list.sort((a, b) => b.reviewsCount - a.reviewsCount);
        break;
    }

    return list;
  }, [allProducts, searchQuery, currentSort]);

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

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-5">
          {displayedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </main>

      <Footer />
      <BottomNav />
    </div>
  );
}
