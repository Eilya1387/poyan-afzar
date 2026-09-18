import React from "react";
import { TechnicalSpec } from "@/lib/products";

interface ProductSpecsProps {
  specs: TechnicalSpec[];
}

export function ProductSpecs({ specs }: ProductSpecsProps) {
  return (
    <section id="specs" className="rounded-2xl border border-slate-200 bg-white p-6 md:p-8 space-y-6 shadow-2xs text-right">
      <h2 className="text-base sm:text-lg md:text-xl font-black text-slate-900">
        مشخصات فنی
      </h2>

      <div className="overflow-hidden rounded-xl border border-slate-200 text-xs sm:text-sm">
        <dl className="divide-y divide-slate-200">
          {specs.map((item, idx) => (
            <div
              key={idx}
              className="grid grid-cols-1 sm:grid-cols-12 transition-colors hover:bg-slate-50/40"
            >
              <dd className="sm:col-span-8 bg-white p-3.5 sm:px-5 font-bold text-slate-800 flex items-center border-b sm:border-b-0 sm:border-l border-slate-200 order-2 sm:order-1">
                {item.value}
              </dd>
              <dt className="sm:col-span-4 bg-slate-50/80 p-3.5 sm:px-5 font-semibold text-slate-600 flex items-center justify-start sm:justify-end order-1 sm:order-2">
                {item.label}
              </dt>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

