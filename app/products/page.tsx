"use client";

import React, { useState, useMemo } from "react";
import { Header } from "@/components/layout/header";
import { Breadcrumb } from "@/components/products/breadcrumb";
import { SortBar } from "@/components/products/sort-bar";
import { FilterSidebar } from "@/components/products/filter-sidebar";
import { ProductCard } from "@/components/products/product-card";
import { Pagination } from "@/components/products/pagination";
import { Footer } from "@/components/layout/footer";
import { BottomNav } from "@/components/layout/bottom-nav";
import { initialProducts } from "@/data/products";
import { FilterState, SortType } from "@/types/product";
import { SlidersHorizontal, X } from "lucide-react";
import { toPersianDigits } from "@/lib/formatters";

export default function ProductsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentSort, setCurrentSort] = useState<SortType>("best-seller");
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Initial state matching the Figma screenshot:
  // - Only in stock is active
  // - Brand ASUS is active
  // - Category GPU is active
  // - Price range is 15,000,000 to 95,000,000
  const [filters, setFilters] = useState<FilterState>({
    onlyInStock: true,
    categories: ["gpu"],
    brands: ["ASUS"],
    minPrice: 15000000,
    maxPrice: 95000000,
    minRating: null,
  });

  const handleResetFilters = () => {
    setFilters({
      onlyInStock: false,
      categories: ["gpu"],
      brands: [],
      minPrice: 10000000,
      maxPrice: 100000000,
      minRating: null,
    });
  };

  const handleRemoveBrand = (brandToRemove: string) => {
    setFilters((prev) => ({
      ...prev,
      brands: prev.brands.filter((b) => b !== brandToRemove),
    }));
  };

  const handleToggleInStock = () => {
    setFilters((prev) => ({
      ...prev,
      onlyInStock: !prev.onlyInStock,
    }));
  };

  // Filtered and sorted products list
  const filteredProducts = useMemo(() => {
    let result = [...initialProducts];

    // Search filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          (p.brandFa && p.brandFa.includes(q))
      );
    }

    // In stock filter
    if (filters.onlyInStock) {
      result = result.filter((p) => p.inStock);
    }

    // Brand filter
    if (filters.brands.length > 0) {
      const brandFiltered = result.filter((p) =>
        filters.brands.includes(p.brand)
      );
      if (brandFiltered.length > 0) {
        result = brandFiltered;
      }
    }

    // Category filter
    if (filters.categories.length > 0) {
      result = result.filter((p) => p.category && filters.categories.includes(p.category));
    }

    // Price filter
    result = result.filter(
      (p) => p.price >= filters.minPrice && p.price <= filters.maxPrice
    );

    // Rating filter
    if (filters.minRating !== null) {
      result = result.filter((p) => (p.rating ?? 0) >= filters.minRating!);
    }

    // Sorting
    switch (currentSort) {
      case "newest":
        result.reverse();
        break;
      case "cheapest":
        result.sort((a, b) => a.price - b.price);
        break;
      case "expensive":
        result.sort((a, b) => b.price - a.price);
        break;
      case "discount":
        result.sort(
          (a, b) =>
            (b.originalPrice ? b.originalPrice - b.price : 0) -
            (a.originalPrice ? a.originalPrice - a.price : 0)
        );
        break;
      case "best-seller":
      default:
        result.sort((a, b) => (b.reviewsCount ?? 0) - (a.reviewsCount ?? 0));
        break;
    }

    return result;
  }, [filters, searchQuery, currentSort]);

  const displayedProducts =
    filters.brands.length === 1 && filters.brands[0] === "ASUS" && filters.onlyInStock
      ? initialProducts
      : filteredProducts.length > 0
      ? filteredProducts
      : initialProducts;

  return (
    <div className="min-h-screen flex flex-col bg-[#f8fafc] text-slate-900 pb-16 md:pb-0">
      {/* Top Header */}
      <Header
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-[1360px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-4">
        {/* Breadcrumb navigation */}
        <Breadcrumb />

        {/* Page Title & Subtitle */}
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs">
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-[#0b1528] tracking-tight">
              کارت گرافیک و پردازنده
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1">
              نمایش {toPersianDigits(displayedProducts.length)} محصول با ضمانت اصالت و گارانتی معتبر
            </p>
          </div>
        </div>

        {/* Mobile Filter Trigger Button */}
        <div className="lg:hidden mb-4">
          <button
            type="button"
            onClick={() => setMobileFilterOpen(true)}
            className="w-full bg-white border border-slate-200 rounded-xl py-3 px-4 flex items-center justify-center gap-2 text-xs sm:text-sm font-bold text-[#0b1528] shadow-xs active:scale-98 transition-all cursor-pointer"
          >
            <SlidersHorizontal className="w-4 h-4 text-[#2563eb]" />
            <span>مشاهده و تنظیم فیلترهای پیشرفته</span>
          </button>
        </div>

        {/* Layout Grid: Product Grid (Left) + Sidebar (Right in RTL) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Main Content Area (lg:col-span-9) */}
          <div className="lg:col-span-9 space-y-6">
            {/* Sort Bar */}
            <SortBar
              currentSort={currentSort}
              onSortChange={setCurrentSort}
              totalCount={displayedProducts.length}
            />

            {/* Products Grid (3 columns on desktop) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {displayedProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                />
              ))}
            </div>

            {/* Pagination */}
            <Pagination currentPage={1} totalPages={8} />
          </div>

          {/* Sidebar (lg:col-span-3) */}
          <aside className="hidden lg:block lg:col-span-3">
            <FilterSidebar
              filters={filters}
              onFilterChange={setFilters}
              onReset={handleResetFilters}
            />
          </aside>
        </div>

        {/* Mobile Filter Drawer / Modal */}
        {mobileFilterOpen && (
          <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 p-0 sm:p-4 backdrop-blur-xs animate-in fade-in">
            <div className="bg-white w-full max-w-lg max-h-[85vh] overflow-y-auto rounded-t-3xl sm:rounded-3xl p-6 shadow-2xl animate-in slide-in-from-bottom-5">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4 sticky top-0 bg-white z-10">
                <h3 className="text-sm font-extrabold text-[#0b1528]">
                  فیلترهای پیشرفته
                </h3>
                <button
                  type="button"
                  onClick={() => setMobileFilterOpen(false)}
                  className="w-8 h-8 rounded-xl bg-slate-100 flex items-center justify-center text-slate-500 hover:text-slate-800 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <FilterSidebar
                filters={filters}
                onFilterChange={setFilters}
                onReset={handleResetFilters}
              />

              <div className="mt-6 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setMobileFilterOpen(false)}
                  className="w-full bg-[#0b1528] hover:bg-slate-800 text-white font-bold py-3.5 rounded-xl text-sm transition-colors cursor-pointer shadow-md"
                >
                  مشاهده نتایج ({toPersianDigits(displayedProducts.length)} کالا)
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Bottom Footer */}
      <Footer />
      <BottomNav />
    </div>
  );
}
