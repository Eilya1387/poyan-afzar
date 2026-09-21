"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Heart, Star, Plus, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Product, fetchProducts } from "@/lib/products";
import { useCartStore, useFavoritesStore } from "@/lib/store";
import { useAuth } from "@/components/auth/auth-context";
import { userApi } from "@/lib/api/user";

const tabs = [
  { id: "all", label: "همه" },
  { id: "mobile", label: "موبایل" },
  { id: "laptop", label: "لپ‌تاپ" },
  { id: "gpu", label: "کارت گرافیک" },
];

export function BestSellers() {
  const router = useRouter();
  const { isLoggedIn } = useAuth();
  const [activeTab, setActiveTab] = useState("all");
  const [itemsList, setItemsList] = useState<Product[]>([]);
  const addItem = useCartStore((state) => state.addItem);
  const { toggleFavorite, isFavorite } = useFavoritesStore();
  const [addedId, setAddedId] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    async function loadBestSellers() {
      try {
        const res = await fetchProducts({ limit: 20, sort: "best-seller", onlyInStock: true });
        if (mounted) {
          setItemsList(res.items);
        }
      } catch (err) {
        console.error("Failed to load best sellers:", err);
      }
    }
    loadBestSellers();
    return () => {
      mounted = false;
    };
  }, []);

  const filteredProducts =
    activeTab === "all"
      ? itemsList.slice(0, 8)
      : itemsList.filter(
          (p) =>
            p.category === activeTab ||
            p.categorySlug === activeTab ||
            p.categoryName?.toLowerCase().includes(activeTab)
        ).slice(0, 8);

  const handleAddToCart = (e: React.MouseEvent, product: Product) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isLoggedIn) {
      router.push("/login?redirect=/cart");
      return;
    }

    addItem({
      id: product.id,
      title: product.title,
      price: product.priceNumber,
      image: product.image,
      seller: product.seller,
      guarantee: product.guarantee,
      inStockText: product.stockText,
    });
    setAddedId(product.id);
    setTimeout(() => setAddedId(null), 1500);
  };

  const handleToggleFavorite = (e: React.MouseEvent, product: Product) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isLoggedIn) {
      router.push("/login");
      return;
    }

    toggleFavorite({
      id: product.id,
      title: product.title,
      price: product.priceNumber,
      priceString: String(product.price),
      image: product.image,
      brand: product.brand,
      rating: product.rating,
    });
    userApi.toggleFavorite(product.id).catch(() => {});
  };

  return (
    <section className="py-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-lg sm:text-xl font-black text-[#0b1528]">
            پرفروش‌ترین محصولات
          </h2>
          <p className="text-xs text-slate-600 font-medium mt-1">
            محبوب‌ترین کالاهای دیجیتال بر اساس انتخاب خریداران
          </p>
        </div>

        <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl self-start sm:self-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeTab === tab.id
                  ? "bg-white text-slate-900 shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {itemsList.length === 0 ? (
        <div className="bg-white rounded-3xl border border-slate-200/90 p-8 sm:p-12 text-center space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#2563eb] flex items-center justify-center mx-auto">
            <Plus className="w-6 h-6" />
          </div>
          <h3 className="text-sm sm:text-base font-black text-slate-800">
            در حال حاضر محصولی در این بخش ثبت نشده است
          </h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            محصولات به زودی توسط مدیریت فروشگاه اضافه و در دسترس قرار خواهند گرفت.
          </p>
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200/80 p-6 text-center text-xs text-slate-500">
          محصولی در این دسته‌بندی یافت نشد.
        </div>
      ) : (
        <div className="flex md:grid md:grid-cols-4 gap-3 md:gap-4 overflow-x-auto md:overflow-x-visible pb-2 md:pb-0 snap-x snap-mandatory scroll-smooth no-scrollbar">
          {filteredProducts.map((product) => (
            <Link
              key={product.id}
              href={`/products/${product.id}`}
              className="w-[39%] sm:w-50 md:w-auto shrink-0 md:shrink snap-start bg-white rounded-2xl border border-slate-200 p-2.5 sm:p-4 flex flex-col justify-between hover:border-slate-300 hover:shadow-md transition-all duration-200 group cursor-pointer"
            >
              <div>
                <div className="relative aspect-square rounded-xl overflow-hidden bg-slate-100 mb-2 sm:mb-3 border border-slate-100 flex items-center justify-center p-0">
                  {product.discount && (
                    <span className="absolute top-1.5 right-1.5 sm:top-2.5 sm:right-2.5 z-10 bg-red-500 text-white text-[10px] sm:text-[11px] font-bold px-1.5 py-0.5 rounded-md shadow-xs">
                      {product.discount}
                    </span>
                  )}

                  <div className="absolute top-1.5 left-1.5 sm:top-2.5 sm:left-2.5 z-10 flex flex-col gap-1">
                    <button
                      type="button"
                      onClick={(e) => handleToggleFavorite(e, product)}
                      aria-label="افزودن به علاقه‌مندی‌ها"
                      className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-white/90 border border-slate-200 shadow-xs flex items-center justify-center text-slate-600 hover:text-red-500 transition-colors cursor-pointer"
                    >
                      <Heart
                        className={`w-3 h-3 sm:w-3.5 sm:h-3.5 ${
                          isFavorite(product.id) ? "fill-red-500 text-red-500" : ""
                        }`}
                      />
                    </button>
                  </div>

                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                </div>

                <div className="text-[10px] sm:text-[11px] mb-1 font-medium text-slate-500 truncate">
                  {product.brand}
                </div>

                <h3 className="text-[11px] sm:text-xs md:text-sm font-bold text-slate-800 line-clamp-2 h-7 sm:h-10 leading-tight group-hover:text-[#2563eb] transition-colors">
                  {product.title}
                </h3>
              </div>

              <div className="mt-2.5 sm:mt-4 pt-2 sm:pt-3 border-t border-slate-100">
                <div className="flex items-center justify-between max-sm:justify-center gap-1 sm:gap-2">
                  <Button
                    variant="secondary"
                    size="sm"
                    type="button"
                    onClick={(e) => handleAddToCart(e, product)}
                    className="rounded-lg sm:rounded-xl px-2 sm:px-4 py-1 text-xs font-bold gap-1 cursor-pointer shadow-xs hover:shadow-md shrink-0 max-sm:hidden"
                  >
                    {addedId === product.id ? (
                      <Check className="w-3.5 h-3.5" />
                    ) : (
                      <Plus className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    )}
                    <span>{addedId === product.id ? "افزوده شد" : "خرید"}</span>
                  </Button>

                  <div className="flex items-center gap-0.5 sm:gap-1 font-black text-xs sm:text-sm md:text-base text-[#0b1528] truncate">
                    <span>{product.price}</span>
                    <span className="text-[9px] sm:text-[10px] font-medium text-slate-600">
                      تومان
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}
