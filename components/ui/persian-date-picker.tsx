"use client";

import React, { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { Calendar as CalendarIcon, ChevronRight, ChevronLeft, X, Sparkles } from "lucide-react";

interface PersianDatePickerProps {
  value: string;
  onChange: (dateStr: string) => void;
  label?: string;
  placeholder?: string;
  required?: boolean;
  className?: string;
}

const PERSIAN_MONTHS = [
  "فروردین",
  "اردیبهشت",
  "خرداد",
  "تیر",
  "مرداد",
  "شهریور",
  "مهر",
  "آبان",
  "آذر",
  "دی",
  "بهمن",
  "اسفند",
];

const PERSIAN_WEEK_DAYS = ["ش", "ی", "د", "س", "چ", "پ", "ج"];

const toPersianDigits = (n: number | string): string => {
  const digits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
  return String(n).replace(/[0-9]/g, (w) => digits[+w]);
};

const toEnglishDigits = (str: string): string => {
  const persianDigits = "۰۱۲۳۴۵۶۷۸۹";
  return String(str).replace(/[۰-۹]/g, (w) => String(persianDigits.indexOf(w)));
};

// Helper to get current Jalali year, month (1-12), and day (1-31)
function getTodayJalali(): { year: number; month: number; day: number } {
  try {
    const parts = new Intl.DateTimeFormat("en-US-u-ca-persian", {
      year: "numeric",
      month: "numeric",
      day: "numeric",
    }).formatToParts(new Date());

    const year = Number(parts.find((p) => p.type === "year")?.value || 1405);
    const month = Number(parts.find((p) => p.type === "month")?.value || 1);
    const day = Number(parts.find((p) => p.type === "day")?.value || 1);

    return { year, month, day };
  } catch {
    return { year: 1405, month: 1, day: 1 };
  }
}

// Parse a date string like "1404/01/15" or "۱۴۰۴/۰۱/۱۵"
function parseJalaliString(str: string): { year: number; month: number; day: number } | null {
  if (!str) return null;
  const en = toEnglishDigits(str).trim();
  const parts = en.split(/[/\\.-]/).map((p) => Number(p.trim()));
  if (parts.length === 3 && !isNaN(parts[0]) && !isNaN(parts[1]) && !isNaN(parts[2])) {
    return {
      year: parts[0] < 100 ? parts[0] + 1400 : parts[0],
      month: Math.min(12, Math.max(1, parts[1])),
      day: Math.min(31, Math.max(1, parts[2])),
    };
  }
  return null;
}

// Format to "1404/01/15" (with Persian digits)
function formatJalali(year: number, month: number, day: number): string {
  const m = String(month).padStart(2, "0");
  const d = String(day).padStart(2, "0");
  return toPersianDigits(`${year}/${m}/${d}`);
}

export function PersianDatePicker({
  value,
  onChange,
  label,
  placeholder = "۱۴۰۵/۰۱/۰۱",
  required = false,
  className = "",
}: PersianDatePickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);

  const today = getTodayJalali();
  const parsed = parseJalaliString(value) || today;

  const [viewYear, setViewYear] = useState<number>(parsed.year);
  const [viewMonth, setViewMonth] = useState<number>(parsed.month);

  const [coords, setCoords] = useState<{
    top: number;
    left: number;
    width: number;
    placement: "bottom" | "top";
  }>({
    top: 0,
    left: 0,
    width: 300,
    placement: "bottom",
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (value) {
      const p = parseJalaliString(value);
      if (p) {
        setViewYear(p.year);
        setViewMonth(p.month);
      }
    }
  }, [value]);

  const updatePosition = () => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const popoverHeight = 350;
    const popoverWidth = 300;

    // Check if there is enough space below in viewport
    const spaceBelow = window.innerHeight - rect.bottom;
    const placeTop = spaceBelow < popoverHeight && rect.top > popoverHeight;

    // Calculate left so it aligns with the right edge in RTL
    let left = rect.right - popoverWidth;
    if (left < 10) left = 10;
    if (left + popoverWidth > window.innerWidth - 10) {
      left = window.innerWidth - popoverWidth - 10;
    }

    const top = placeTop
      ? Math.max(10, rect.top - popoverHeight - 8)
      : Math.min(window.innerHeight - popoverHeight - 10, rect.bottom + 8);

    setCoords({
      top,
      left,
      width: popoverWidth,
      placement: placeTop ? "top" : "bottom",
    });
  };

  const toggleOpen = () => {
    if (!isOpen) {
      updatePosition();
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  };

  // Close when clicked outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as Node;
      if (
        containerRef.current &&
        !containerRef.current.contains(target) &&
        popoverRef.current &&
        !popoverRef.current.contains(target)
      ) {
        setIsOpen(false);
      }
    }

    function handleScrollOrResize() {
      if (isOpen) {
        updatePosition();
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      window.addEventListener("scroll", handleScrollOrResize, true);
      window.addEventListener("resize", handleScrollOrResize);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("scroll", handleScrollOrResize, true);
      window.removeEventListener("resize", handleScrollOrResize);
    };
  }, [isOpen]);

  const daysInMonth = viewMonth <= 6 ? 31 : viewMonth <= 11 ? 30 : 29;

  const handlePrevMonth = () => {
    if (viewMonth === 1) {
      setViewMonth(12);
      setViewYear((y) => y - 1);
    } else {
      setViewMonth((m) => m - 1);
    }
  };

  const handleNextMonth = () => {
    if (viewMonth === 12) {
      setViewMonth(1);
      setViewYear((y) => y + 1);
    } else {
      setViewMonth((m) => m + 1);
    }
  };

  const handleSelectDay = (day: number) => {
    const formatted = formatJalali(viewYear, viewMonth, day);
    onChange(formatted);
    setIsOpen(false);
  };

  // Quick Presets
  const applyPreset = (daysOffset: number) => {
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + daysOffset);

    try {
      const parts = new Intl.DateTimeFormat("en-US-u-ca-persian", {
        year: "numeric",
        month: "numeric",
        day: "numeric",
      }).formatToParts(targetDate);

      const y = Number(parts.find((p) => p.type === "year")?.value || viewYear);
      const m = Number(parts.find((p) => p.type === "month")?.value || viewMonth);
      const d = Number(parts.find((p) => p.type === "day")?.value || 1);

      const formatted = formatJalali(y, m, d);
      onChange(formatted);
      setViewYear(y);
      setViewMonth(m);
      setIsOpen(false);
    } catch {
      // Fallback
    }
  };

  const popoverContent = isOpen && mounted ? (
    <div
      ref={popoverRef}
      style={{
        position: "fixed",
        top: `${coords.top}px`,
        left: `${coords.left}px`,
        width: `${coords.width}px`,
        zIndex: 99999,
      }}
      className="bg-white rounded-3xl shadow-2xl border border-slate-200 p-4 text-right select-none animate-in fade-in zoom-in-95 duration-150"
      onClick={(e) => e.stopPropagation()}
    >
      {/* Calendar Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-3">
        <button
          type="button"
          onClick={handleNextMonth}
          className="p-1.5 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors cursor-pointer"
          title="ماه بعد"
        >
          <ChevronRight className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-1.5 font-bold text-xs text-slate-900">
          <span className="text-blue-600 font-black">{PERSIAN_MONTHS[viewMonth - 1]}</span>
          <span>{toPersianDigits(viewYear)}</span>
        </div>

        <button
          type="button"
          onClick={handlePrevMonth}
          className="p-1.5 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors cursor-pointer"
          title="ماه قبل"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
      </div>

      {/* Week Days Header */}
      <div className="grid grid-cols-7 gap-1 text-center mb-2">
        {PERSIAN_WEEK_DAYS.map((day, idx) => (
          <span
            key={day}
            className={`text-[11px] font-bold py-1 ${
              idx === 6 ? "text-rose-500" : "text-slate-400"
            }`}
          >
            {day}
          </span>
        ))}
      </div>

      {/* Days Grid */}
      <div className="grid grid-cols-7 gap-1 text-center">
        {Array.from({ length: daysInMonth }).map((_, idx) => {
          const dayNum = idx + 1;
          const isSelected =
            parsed?.year === viewYear &&
            parsed?.month === viewMonth &&
            parsed?.day === dayNum;
          const isToday =
            today.year === viewYear &&
            today.month === viewMonth &&
            today.day === dayNum;

          return (
            <button
              key={dayNum}
              type="button"
              onClick={() => handleSelectDay(dayNum)}
              className={`h-8 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center ${
                isSelected
                  ? "bg-[#2563eb] text-white shadow-md shadow-blue-500/30 scale-105"
                  : isToday
                  ? "border border-blue-500 text-blue-600 bg-blue-50/50 hover:bg-blue-100 font-black"
                  : "text-slate-700 hover:bg-slate-100 hover:text-slate-900"
              }`}
            >
              {toPersianDigits(dayNum)}
            </button>
          );
        })}
      </div>

      {/* Quick Presets */}
      <div className="pt-3 mt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-1">
        <button
          type="button"
          onClick={() => applyPreset(0)}
          className="px-2 py-1 text-[10px] font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition-colors cursor-pointer"
        >
          امروز
        </button>
        <button
          type="button"
          onClick={() => applyPreset(7)}
          className="px-2 py-1 text-[10px] font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition-colors cursor-pointer"
        >
          ۱ هفته بعد
        </button>
        <button
          type="button"
          onClick={() => applyPreset(30)}
          className="px-2 py-1 text-[10px] font-bold bg-blue-50 hover:bg-blue-100 text-[#2563eb] rounded-lg transition-colors cursor-pointer"
        >
          ۱ ماه بعد
        </button>
        <button
          type="button"
          onClick={() => applyPreset(90)}
          className="px-2 py-1 text-[10px] font-bold bg-purple-50 hover:bg-purple-100 text-purple-700 rounded-lg transition-colors cursor-pointer"
        >
          ۳ ماه بعد
        </button>
      </div>
    </div>
  ) : null;

  return (
    <div ref={containerRef} className={`relative text-right ${className}`}>
      {label && (
        <label className="block text-slate-700 font-bold mb-1.5 text-xs">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}

      {/* Input Display Button */}
      <div
        onClick={toggleOpen}
        className="flex items-center justify-between px-3.5 py-2.5 bg-slate-50 hover:bg-slate-100/80 border border-slate-200 rounded-xl font-mono text-xs text-slate-800 cursor-pointer transition-all select-none group focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/20 shadow-2xs"
      >
        <span className="font-bold text-slate-800 text-xs tracking-wider dir-ltr">
          {value ? toPersianDigits(value) : <span className="text-slate-400 font-sans">{placeholder}</span>}
        </span>
        <div className="flex items-center gap-1.5 text-slate-400 group-hover:text-blue-600 transition-colors">
          <CalendarIcon className="w-4 h-4" />
        </div>
      </div>

      {/* Portal Popover */}
      {mounted && typeof document !== "undefined" && popoverContent
        ? createPortal(popoverContent, document.body)
        : null}
    </div>
  );
}
