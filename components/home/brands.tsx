"use client";

import React from "react";

const brandList = [
  { name: "Apple", file: "apple.svg" },
  { name: "Samsung", file: "samsung.svg" },
  { name: "Sony", file: "sony.svg" },
  { name: "Asus", file: "asus.svg" },
  { name: "Intel", file: "intel.svg" },
  { name: "Nvidia", file: "nvidia.svg" },
  { name: "AMD", file: "amd.svg" },
  { name: "Xiaomi", file: "xiaomi.svg" },
  { name: "Logitech", file: "logitech.svg" },
  { name: "Razer", file: "razer.svg" },
  { name: "JBL", file: "jbl.svg" },
  { name: "Bose", file: "bose.svg" },
  { name: "HyperX", file: "hyperx.svg" },
  { name: "Corsair", file: "corsair.svg" },
  { name: "SteelSeries", file: "steelseries.svg" },
  { name: "MSI", file: "msi.svg" },
  { name: "Lenovo", file: "lenovo.svg" },
  { name: "Dell", file: "dell.svg" },
  { name: "HP", file: "hp.svg" },
  { name: "PlayStation", file: "playstation.svg" },
  { name: "Huawei", file: "huawei.svg" },
  { name: "LG", file: "lg.svg" },
  { name: "SanDisk", file: "sandisk.svg" },
  { name: "Kingston", file: "kingstontechnology.svg" },
  { name: "Western Digital", file: "westerndigital.svg" },
  { name: "Toshiba", file: "toshiba.svg" },
];

export function Brands() {
  const doubleList = [...brandList, ...brandList];

  return (
    <section className="py-12 overflow-hidden">
      <div className="text-center mb-8">
        <h2 className="text-lg sm:text-xl font-black text-[#0b1528]">
          محبوب‌ترین برندهای جهان
        </h2>
        <p className="text-xs text-slate-500 font-medium mt-1">
          ارائه مستقیم محصولات اورجینال از معتبرترین برندهای تکنولوژی
        </p>
      </div>

      <div className="relative w-full overflow-hidden py-4" dir="ltr">
        <div className="absolute left-0 top-0 bottom-0 w-24 sm:w-44 bg-linear-to-r from-[#f8fafc] via-[#f8fafc]/80 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 sm:w-44 bg-linear-to-l from-[#f8fafc] via-[#f8fafc]/80 to-transparent z-10 pointer-events-none" />

        <div className="flex w-max animate-marquee gap-12 sm:gap-16 items-center">
          {doubleList.map((brand, idx) => (
            <div
              key={`${brand.name}-${idx}`}
              className="flex items-center justify-center h-16 sm:h-22 shrink-0 cursor-pointer group px-2 transition-transform duration-300 hover:scale-115"
              title={brand.name}
            >
              <img
                src={`/brands/${brand.file}`}
                alt={brand.name}
                className="h-10 sm:h-14 md:h-16 w-auto max-w-35 sm:max-w-42.5 object-contain opacity-70 group-hover:opacity-100 transition-all duration-300 group-hover:drop-shadow-sm"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
