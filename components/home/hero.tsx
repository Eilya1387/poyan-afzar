"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { ChevronRight, ChevronLeft, ShoppingBag } from "lucide-react";

interface Slide {
  id: number;
  title: string;
  subtitle: string;
  badge: string;
  image: string;
  buttonText: string;
}

const slides: Slide[] = [
  {
    id: 1,
    title: "جشنواره هدفون و تجهیزات صوتی گیمینگ",
    subtitle: "تا ۴۰٪ تخفیف ویژه برای برترین برندهای روز با ضمانت اصالت",
    badge: "تخفیف شگفت‌انگیز",
    image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=1600&q=80",
    buttonText: "مشاهده و خرید",
  },
  {
    id: 2,
    title: "جدیدترین گوشی‌ها و لوازم جانبی هوشمند",
    subtitle: "تضمین اصالت کالا همراه با ارسال اکسپرس و پشتیبانی ۲۴ ساعته",
    badge: "پرفروش‌ترین‌های هفته",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1600&q=80",
    buttonText: "مشاهده و خرید",
  },
  {
    id: 3,
    title: "سخت‌افزار و تجهیزات تخصصی کامپیوتر",
    subtitle: "کیبورد مکانیکال، ماوس‌های گیمینگ حرفه‌ای و حافظه‌های پرسرعت",
    badge: "ویژه گیمرها",
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1600&q=80",
    buttonText: "مشاهده و خرید",
  },
  {
    id: 4,
    title: "ساعت‌های هوشمند و گجت‌های پوشیدنی",
    subtitle: "بررسی و خرید جدیدترین گجت‌های هوشمند بازار با بهترین قیمت",
    badge: "پیشنهاد اختصاصی",
    image: "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=1600&q=80",
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
              <div className="relative w-full h-60 sm:h-72 md:h-96 lg:h-112 rounded-2xl md:rounded-3xl overflow-hidden bg-slate-900 shadow-sm md:shadow-md">
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="w-full h-full object-cover select-none"
                  loading="lazy"
                />

                <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/35 to-transparent md:bg-linear-to-l md:from-transparent md:via-black/45 md:to-black/85 pointer-events-none" />

                <div
                  dir="rtl"
                  className="absolute inset-y-0 right-0 left-0 md:left-auto md:w-2/3 lg:w-1/2 p-3 sm:p-6 md:p-16 flex flex-col justify-end md:justify-center items-start text-right z-10 pointer-events-none"
                >

                  <h2 className="text-xs sm:text-xl md:text-3xl font-black text-white leading-snug mb-1 md:mb-2 line-clamp-1 md:line-clamp-2 pointer-events-auto">
                    {slide.title}
                  </h2>

                  <p className="hidden md:block text-xs sm:text-sm text-slate-200 leading-relaxed mb-5 max-w-lg pointer-events-auto">
                    {slide.subtitle}
                  </p>

                  <button
                    type="button"
                    className="mt-0.5 sm:mt-1 inline-flex items-center gap-1.5 text-[11px] sm:text-xs md:text-sm font-black px-3 py-1 sm:px-4 sm:py-2 rounded-lg sm:rounded-xl bg-white text-slate-900 shadow-md hover:bg-slate-100 transition-all cursor-pointer pointer-events-auto"
                  >
                    <ShoppingBag className="w-3.5 h-3.5 text-[#2563eb]" />
                    <span>{slide.buttonText}</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div
          dir="rtl"
          className="hidden md:flex items-center justify-between absolute inset-y-0 inset-x-4 pointer-events-none"
        >
          <button
            onClick={prevSlide}
            aria-label="اسلاید قبلی"
            className="w-11 h-11 rounded-full bg-white/80 hover:bg-white text-slate-800 shadow-lg backdrop-blur-md flex items-center justify-center pointer-events-auto transition-all duration-200 cursor-pointer hover:scale-105"
          >
            <ChevronRight className="w-6 h-6 stroke-[2.2]" />
          </button>

          <button
            onClick={nextSlide}
            aria-label="اسلاید بعدی"
            className="w-11 h-11 rounded-full bg-white/80 hover:bg-white text-slate-800 shadow-lg backdrop-blur-md flex items-center justify-center pointer-events-auto transition-all duration-200 cursor-pointer hover:scale-105"
          >
            <ChevronLeft className="w-6 h-6 stroke-[2.2]" />
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
