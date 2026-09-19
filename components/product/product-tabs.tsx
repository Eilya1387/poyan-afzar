"use client";

import React, { useState } from "react";

interface ProductTabsProps {
  reviewsCount: number;
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

export function ProductTabs({
  activeTab,
  onTabChange,
}: {
  activeTab: string;
  onTabChange: (tabId: string) => void;
}) {
  const tabs = [
    { id: "intro", label: "معرفی محصول" },
    { id: "specs", label: "مشخصات فنی" },
  ];

  return (
    <div className="border-b border-slate-200 sticky top-0 z-20 bg-[#f8fafc]/95 backdrop-blur-md">
      <div className="flex items-center gap-2 sm:gap-6 overflow-x-auto no-scrollbar py-1">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => onTabChange(tab.id)}
              className={`pb-3 pt-2 text-xs sm:text-sm font-black whitespace-nowrap transition-all border-b-2 cursor-pointer ${
                isActive
                  ? "border-[#2563eb] text-[#2563eb]"
                  : "border-transparent text-slate-500 hover:text-slate-800"
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
