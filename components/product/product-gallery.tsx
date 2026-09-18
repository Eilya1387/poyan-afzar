"use client";

import React, { useState } from "react";

interface ProductGalleryProps {
  images: string[];
  title: string;
}

export function ProductGallery({ images, title }: ProductGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const displayImages = images.length > 0 ? images : [
    "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?auto=format&fit=crop&w=800&q=80"
  ];

  return (
    <div className="flex flex-col gap-3 sm:gap-4">
      <div className="relative aspect-square w-full rounded-2xl md:rounded-3xl border border-slate-200 bg-slate-100 overflow-hidden group shadow-2xs">
        <img
          src={displayImages[selectedIndex]}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      <div className="grid grid-cols-4 gap-2.5 sm:gap-3">
        {displayImages.slice(0, 4).map((img, idx) => {
          const isSelected = selectedIndex === idx;
          return (
            <button
              key={`${img}-${idx}`}
              type="button"
              onClick={() => setSelectedIndex(idx)}
              className={`relative aspect-square rounded-xl md:rounded-2xl border bg-slate-100 overflow-hidden transition-all duration-200 cursor-pointer ${
                isSelected
                  ? "border-[#2563eb] ring-2 ring-blue-500/20 shadow-xs"
                  : "border-slate-200 hover:border-slate-300"
              }`}
            >
              <img
                src={img}
                alt={`${title} - بند انگشتی ${idx + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}
