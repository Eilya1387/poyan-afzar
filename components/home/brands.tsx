import React from "react";

const brands = [
  { name: "Apple", slug: "apple" },
  { name: "Samsung", slug: "samsung" },
  { name: "Xiaomi", slug: "xiaomi" },
  { name: "Logitech", slug: "logitech" },
  { name: "Razer", slug: "razer" },
  { name: "Anker", slug: "anker" },
];

export function Brands() {
  return (
    <section className="py-8">
      <div className="text-center mb-6">
        <h2 className="text-base sm:text-lg font-black text-[#0b1528]">
          محبوب‌ترین برندهای جهان
        </h2>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
        {brands.map((brand) => (
          <div
            key={brand.name}
            className="bg-white rounded-2xl border border-slate-200 p-5 flex items-center justify-center hover:border-slate-300 hover:shadow-xs transition-all duration-200 cursor-pointer group"
          >
            <span className="text-base font-extrabold text-slate-700 tracking-wide group-hover:text-[#2563eb] transition-colors">
              {brand.name}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
