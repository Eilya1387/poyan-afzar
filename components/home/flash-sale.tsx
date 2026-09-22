"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Flame, ShoppingCart, Check, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Product, fetchFlashDeals } from "@/lib/products";
import { useCartStore } from "@/lib/store";
import { useAuth } from "@/components/auth/auth-context";

export function FlashSale() {
  const router = useRouter();
  const { isLoggedIn } = useAuth();
  const addItem = useCartStore((state) => state.addItem);
  const [deals, setDeals] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [addedId, setAddedId] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    async function loadDeals() {
      try {
        const liveDeals = await fetchFlashDeals();
        if (mounted) {
          setDeals(liveDeals);
        }
      } catch (err) {
        console.error("Failed to load flash deals:", err);
      } finally {
        if (mounted) setLoading(false);
      }
    }
    loadDeals();
    return () => {
      mounted = false;
    };
  }, []);

  const handleAddToCart = (e: React.MouseEvent, deal: Product) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isLoggedIn) {
      router.push("/login?redirect=/cart");
      return;
    }

    addItem({
      id: deal.id,
      title: deal.title,
      price: deal.priceNumber,
      image: deal.image,
      seller: deal.seller,
      guarantee: deal.guarantee,
      inStockText: deal.stockText,
    });
    setAddedId(deal.id);
    setTimeout(() => setAddedId(null), 1500);
  };

  if (!loading && deals.length === 0) {
    return null;
  }

  if (loading) {
    return (
      <section id="flash-sale" className="py-4 scroll-mt-24">
        <div className="bg-[#0b1528] rounded-3xl p-6 sm:p-8 text-white flex items-center justify-center gap-3">
          <Loader2 className="w-5 h-5 animate-spin text-[#38bdf8]" />
          <span className="text-xs text-slate-300">در حال دریافت پیشنهادات شگفت‌انگیز...</span>
        </div>
      </section>
    );
  }

  return (
    <section id="flash-sale" className="py-4 scroll-mt-24">
      <div className="bg-[#0b1528] rounded-3xl p-4 sm:p-6 md:p-8 text-white relative overflow-hidden shadow-xl">
        <div className="flex items-center justify-between gap-3 pb-4 sm:pb-6 border-b border-slate-800/80 mb-4 sm:mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-red-500/20 border border-red-500/30 flex items-center justify-center text-red-400 shrink-0 shadow-xs">
              <Flame className="w-5 h-5 fill-red-400" />
            </div>
            <div>
              <h2 className="text-base sm:text-xl font-black text-white">
                پیشنهاد شگفت‌انگیز پویان افزار
              </h2>
              <p className="text-[11px] sm:text-xs text-slate-400 font-medium mt-0.5">
                تخفیف‌های ویژه روزانه با تعداد محدود
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 bg-red-500/10 border border-red-500/20 px-3 py-1.5 rounded-xl text-xs font-black text-red-400">
            <span>تخفیف شگفت‌انگیز</span>
          </div>
        </div>

        <div className="flex md:grid md:grid-cols-3 lg:grid-cols-6 gap-3 overflow-x-auto md:overflow-x-visible pb-2 md:pb-0 snap-x snap-mandatory scroll-smooth no-scrollbar">
          {deals.map((deal) => (
            <Link
              key={deal.id}
              href={`/products/${deal.id}`}
              className="w-[39%] sm:w-50 md:w-auto shrink-0 md:shrink snap-start bg-white rounded-2xl p-2.5 sm:p-3 text-slate-900 flex flex-col justify-between hover:shadow-lg transition-all duration-200 group cursor-pointer border border-transparent hover:border-blue-100"
            >
              <div>
                <div className="relative aspect-square rounded-xl overflow-hidden bg-slate-100 mb-2 border border-slate-100 flex items-center justify-center p-0">
                  <span className="absolute top-1.5 right-1.5 z-10 bg-red-500 text-white text-[10px] font-black px-1.5 py-0.5 rounded-md shadow-xs">
                    {deal.discount}
                  </span>
                  <img
                    src={deal.image}
                    alt={deal.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                </div>

                <div className="text-[10px] font-medium text-slate-500 mb-0.5 truncate">
                  {deal.brand}
                </div>

                <h3 className="text-[11px] sm:text-xs font-bold text-slate-800 line-clamp-2 h-7 sm:h-8 leading-tight group-hover:text-[#2563eb] transition-colors">
                  {deal.title}
                </h3>
              </div>

              <div className="mt-2.5 pt-2 border-t border-slate-100 ">
                <span className="block text-[10px] text-slate-400 line-through text-left max-sm:text-center">
                  {deal.oldPrice}
                </span>

                <div className="flex items-center justify-between max-sm:justify-center mt-1 gap-1 ">
                  <Button
                    variant="secondary"
                    size="icon"
                    type="button"
                    onClick={(e) => handleAddToCart(e, deal)}
                    className="rounded-lg w-7 h-7 sm:w-8 sm:h-8 cursor-pointer shadow-xs hover:shadow-sm shrink-0 relative z-10 max-sm:hidden"
                    aria-label="افزودن به سبد خرید"
                  >
                    {addedId === deal.id ? (
                      <Check className="w-3.5 h-3.5" />
                    ) : (
                      <ShoppingCart className="w-3.5 h-3.5" />
                    )}
                  </Button>

                  <div className="flex items-center gap-0.5 font-black text-xs sm:text-sm text-[#0b1528] truncate">
                    <span>{deal.price}</span>
                    <span className="text-[9px] font-medium text-slate-500">
                      تومان
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
