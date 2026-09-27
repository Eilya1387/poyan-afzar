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
        <h2 className="text-base sm:text-lg font-black text-[#0b1528] dark:text-white">
          دسته‌بندی‌های محبوب
        </h2>
        <Link
          href="/products"
          className="text-xs sm:text-sm font-bold text-[#2563eb] dark:text-blue-400 hover:text-[#1d4ed8] dark:hover:text-blue-300 flex items-center gap-1 transition-colors"
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
              className="bg-white dark:bg-[#111827] rounded-2xl border border-slate-200 dark:border-slate-800/80 p-4 flex flex-col items-center justify-center gap-3.5 hover:border-[#2563eb] dark:hover:border-blue-500 hover:shadow-md dark:hover:shadow-blue-950/30 transition-all duration-200 group text-center cursor-pointer"
            >
              <div className="w-12 h-12 rounded-xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-700 dark:text-slate-300 group-hover:bg-blue-50 dark:group-hover:bg-blue-950/60 group-hover:text-[#2563eb] dark:group-hover:text-blue-400 transition-colors">
                <Icon className="w-6 h-6 stroke-[1.6]" />
              </div>
              <span className="text-xs font-bold text-slate-800 dark:text-slate-200 group-hover:text-[#2563eb] dark:group-hover:text-blue-400 transition-colors leading-tight">
                {cat.name}
              </span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
