"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Smartphone,
  Headphones,
  Keyboard,
  Cpu,
  HardDrive,
  Laptop,
  CircuitBoard,
  Layers,
  MousePointer,
  ArrowLeft,
} from "lucide-react";
import { categoriesApi, Category } from "@/lib/api/categories";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  gpu: CircuitBoard,
  cpu: Cpu,
  motherboard: Layers,
  ram: HardDrive,
  ssd: HardDrive,
  laptop: Laptop,
  mobile: Smartphone,
  audio: Headphones,
  accessories: MousePointer,
};

export function PopularCategories() {
  const [categoriesList, setCategoriesList] = useState<Category[]>([]);

  useEffect(() => {
    let mounted = true;
    categoriesApi.getCategories().then((list) => {
      if (mounted && list.length > 0) {
        setCategoriesList(list);
      }
    });
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <section className="py-6">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-base sm:text-lg font-black text-[#0b1528]">
          دسته‌بندی‌های محبوب
        </h2>
        <Link
          href="/products"
          className="text-xs sm:text-sm font-bold text-[#2563eb] hover:text-[#1d4ed8] flex items-center gap-1 transition-colors"
        >
          <span>مشاهده همه</span>
          <ArrowLeft className="w-4 h-4" />
        </Link>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 sm:gap-4">
        {categoriesList.map((cat) => {
          const Icon = iconMap[cat.id] || Cpu;
          return (
            <Link
              key={cat.id}
              href={`/products?category=${cat.id}`}
              className="bg-white rounded-2xl border border-slate-200 p-4 flex flex-col items-center justify-center gap-3.5 hover:border-[#2563eb] hover:shadow-md transition-all duration-200 group text-center cursor-pointer"
            >
              <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center text-slate-700 group-hover:bg-blue-50 group-hover:text-[#2563eb] transition-colors">
                <Icon className="w-6 h-6 stroke-[1.6]" />
              </div>
              <span className="text-xs font-bold text-slate-800 group-hover:text-[#2563eb] transition-colors leading-tight">
                {cat.name}
              </span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
