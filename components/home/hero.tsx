"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import { ChevronRight, ChevronLeft, ShoppingBag } from "lucide-react";

interface Slide {
  id: number;
  title: string;
  subtitle: string;
  badge: string;
  image: string;
  buttonText: string;
  imagePosition?: string;
}

const slides: Slide[] = [
  {
    id: 1,
    title: "غول‌های پردازشی و کارت گرافیک‌های نسل جدید",
    subtitle: "ارتقای سیستم گیمینگ و رندرینگ با ضمانت اصالت و برترین برندهای روز",
    badge: "سخت‌افزار حرفه‌ای",
    image: "/images/gpu.webp",
    buttonText: "مشاهده و خرید",
  },
  {
    id: 2,
    title: "جشنواره هدفون و تجهیزات صوتی پیشرفته",
    subtitle: "تجربه صدای فراگیر و شفاف با برترین هدفون‌های گیمینگ و استودیویی",
    badge: "تخفیف شگفت‌انگیز",
    image: "/images/head.webp",
    buttonText: "مشاهده و خرید",
    imagePosition: "object-[50%_20%]",
  },
  {
    id: 3,
    title: "جدیدترین گوشی‌های هوشمند و لوازم جانبی اصلی",
    subtitle: "خرید انواع گوشی، شارژر بی‌سیم و ایرپاد با ضمانت اصالت و ارسال سریع",
    badge: "پرفروش‌ترین‌های هفته",
    image: "/images/iph.webp",
    buttonText: "مشاهده و خرید",
  },
  {
    id: 4,
    title: "کیبورد مکانیکال و ماوس‌های حرفه‌ای گیمینگ",
    subtitle: "سرعت پاسخ‌دهی بالا، سوییچ‌های اختصاصی و ارگونومی بی‌نظیر برای گیمرها",
    badge: "ویژه گیمرها",
    image: "/images/key.webp",
    buttonText: "مشاهده و خرید",
  },
  {
    id: 5,
    title: "ساعت‌های هوشمند و گجت‌های پوشیدنی",
    subtitle: "پایش دقیق سلامتی و طراحی مدرن و مقاوم با بهترین قیمت بازار",
    badge: "پیشنهاد اختصاصی",
    image: "/images/wa.webp",
    buttonText: "مشاهده و خرید",
  },
];

const extendedSlides = [slides[slides.length - 1], ...slides, slides[0]];

export function Hero() {
  const [currentIndex, setCurrentIndex] = useState(1);
  const [withTransition, setWithTransition] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const nextSlide = useCallback(() => {
    setWithTransition(true);
    setCurrentIndex((prev) => prev + 1);
  }, []);

  const prevSlide = useCallback(() => {
    setWithTransition(true);
    setCurrentIndex((prev) => prev - 1);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  const handleTransitionEnd = () => {
    if (currentIndex >= extendedSlides.length - 1) {
      setWithTransition(false);
      setCurrentIndex(1);
    } else if (currentIndex <= 0) {
      setWithTransition(false);
      setCurrentIndex(extendedSlides.length - 2);
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    touchEndX.current = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) > 35) {
      if (diff > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    }
  };

  const realIndex = (currentIndex - 1 + slides.length) % slides.length;

  const getTransform = () => {
    if (isMobile) {
      const slideWidth = 72;
      const initialOffset = 14;
      const offset = initialOffset - currentIndex * slideWidth;
      return `translateX(${offset}%)`;
    }
    return `translateX(-${currentIndex * 100}%)`;
  };

  return (
    <section className="pt-2 md:pt-6 pb-2 md:pb-4">
      <div className="relative w-full overflow-hidden rounded-2xl md:rounded-3xl">
        <div
          dir="ltr"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          onTransitionEnd={handleTransitionEnd}
          className={`flex ${
            withTransition
              ? "transition-transform duration-500 ease-out"
              : "transition-none"
          }`}
          style={{
            transform: getTransform(),
          }}
        >
          {extendedSlides.map((slide, idx) => (
            <div
              key={`${slide.id}-${idx}`}
              className={`shrink-0 ${
                isMobile ? "w-[72%] px-1.5" : "w-full px-0"
              }`}
            >
              <div className="relative w-full aspect-[16/9] sm:aspect-[2/1] md:aspect-[2.25/1] lg:aspect-[2.4/1] rounded-2xl md:rounded-3xl overflow-hidden bg-slate-900 shadow-sm md:shadow-md">
                <img
                  src={slide.image}
                  alt={slide.title}
                  className={`w-full h-full object-cover select-none brightness-[0.89] md:brightness-[0.91] ${
                    slide.imagePosition || "object-center"
                  }`}
                  loading="lazy"
                />

                {/* Slight subtle dark overlay for enhanced contrast and readability */}
                <div className="absolute inset-0 bg-black/25 md:bg-gradient-to-l md:from-black/55 md:via-black/25 md:to-transparent pointer-events-none" />

                <div
                  dir="rtl"
                  className="absolute inset-y-0 right-0 left-0 md:left-auto md:w-3/5 lg:w-1/2 p-4 sm:p-6 md:py-8 md:pr-20 md:pl-6 lg:pr-24 lg:pl-8 flex flex-col justify-end md:justify-center items-start text-right z-10 pointer-events-none"
                >
                  <h2 className="text-xs sm:text-lg md:text-2xl lg:text-3xl font-black text-white leading-snug mb-1 md:mb-2 line-clamp-1 md:line-clamp-2 pointer-events-auto drop-shadow-md">
                    {slide.title}
                  </h2>

                  <p className="hidden md:block text-xs sm:text-sm md:text-base text-slate-100 leading-relaxed mb-3 md:mb-4 max-w-lg pointer-events-auto drop-shadow">
                    {slide.subtitle}
                  </p>

                  <Link
                    href="/products"
                    className="mt-1 sm:mt-2 inline-flex items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs md:text-sm font-black px-3.5 py-1.5 sm:px-4 sm:py-2 md:px-5 md:py-2.5 rounded-lg sm:rounded-xl bg-white text-slate-900 shadow-md hover:bg-slate-100 transition-all cursor-pointer pointer-events-auto hover:shadow-lg hover:-translate-y-0.5"
                  >
                    <ShoppingBag className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#2563eb]" />
                    <span>{slide.buttonText}</span>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div
          dir="rtl"
          className="hidden md:flex items-center justify-between absolute inset-y-0 inset-x-4 md:inset-x-6 pointer-events-none z-20"
        >
          <button
            onClick={prevSlide}
            aria-label="اسلاید قبلی"
            className="w-10 h-10 lg:w-11 lg:h-11 rounded-full bg-white/85 hover:bg-white text-slate-800 shadow-lg backdrop-blur-md flex items-center justify-center pointer-events-auto transition-all duration-200 cursor-pointer hover:scale-105"
          >
            <ChevronRight className="w-5 h-5 lg:w-6 lg:h-6 stroke-[2.2]" />
          </button>

          <button
            onClick={nextSlide}
            aria-label="اسلاید بعدی"
            className="w-10 h-10 lg:w-11 lg:h-11 rounded-full bg-white/85 hover:bg-white text-slate-800 shadow-lg backdrop-blur-md flex items-center justify-center pointer-events-auto transition-all duration-200 cursor-pointer hover:scale-105"
          >
            <ChevronLeft className="w-5 h-5 lg:w-6 lg:h-6 stroke-[2.2]" />
          </button>
        </div>

        <div className="hidden md:flex absolute bottom-5 left-1/2 -translate-x-1/2 items-center gap-1.5 z-20">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                setWithTransition(true);
                setCurrentIndex(idx + 1);
              }}
              aria-label={`رفتن به اسلاید ${idx + 1}`}
              className={`transition-all duration-300 rounded-full cursor-pointer ${
                realIndex === idx
                  ? "w-5 sm:w-6 h-1.5 bg-[#2563eb]"
                  : "w-1.5 h-1.5 bg-white/60 hover:bg-white"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
