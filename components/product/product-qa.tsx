"use client";

import React, { useState, useEffect } from "react";
import { HelpCircle, ChevronDown, MessageSquarePlus, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { productsApi } from "@/lib/api/products";
import { useAuth } from "@/components/auth/auth-context";

interface QAItem {
  id: number | string;
  question: string;
  answer?: string | null;
  author?: string;
}

const defaultQA: QAItem[] = [
  {
    id: 1,
    question: "آیا این محصول نسخه اصل اپل است و سریال نامبر در سایت اپل قابل استعلام است؟",
    answer: "بله، تمام محصولات ارائه‌شده در پویان افزار دارای ضمانت اصالت ۱۰۰ درصدی بوده و شماره سریال آن مستقیماً در سایت رسمی checkcoverage.apple.com قابل بررسی است.",
    author: "کارشناس فنی پویان افزار"
  },
  {
    id: 2,
    question: "آیا پورت کیس این مدل تایپ‌سی است یا لایتنینگ؟",
    answer: "این محصول دارای پورت استاندارد Type-C روی کیس شارژ به همراه پشتیبانی از شارژ بی‌سیم MagSafe است.",
    author: "پشتیبانی پویان افزار"
  },
  {
    id: 3,
    question: "آیا قابلیت حذف نویز فعال (ANC) با گوشی‌های اندرویدی هم کار می‌کند؟",
    answer: "بله، حذف نویز فعال، حالت شفافیت و کنترل لمسی به صورت مستقل روی سخت‌افزار هدفون تعبیه شده و با اتصال به هر دستگاه بلوتوثی به طور کامل فعال است.",
    author: "کارشناس فنی پویان افزار"
  }
];

export function ProductQA({ productId }: { productId?: string }) {
  const { user } = useAuth();
  const [qaList, setQaList] = useState<QAItem[]>(defaultQA);
  const [openId, setOpenId] = useState<number | string | null>(1);
  const [questionText, setQuestionText] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  useEffect(() => {
    if (!productId) return;
    const currentProductId: string = productId;
    let isMounted = true;
    async function loadQa() {
      try {
        const list = await productsApi.getQa(currentProductId);
        if (isMounted && list && list.length > 0) {
          setQaList(
            list.map((q) => ({
              id: q.id,
              question: q.question,
              answer: q.answer || "کارشناسان پویان افزار به زودی به این پرسش پاسخ خواهند داد.",
              author: q.author || "کارشناس فنی پویان افزار",
            }))
          );
          if (list[0]) setOpenId(list[0].id);
        }
      } catch (err) {
        console.error("Failed to load QA:", err);
      }
    }
    loadQa();
    return () => {
      isMounted = false;
    };
  }, [productId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!questionText.trim()) return;

    setLoading(true);
    try {
      if (productId) {
        const authorName = user ? `${user.firstName} ${user.lastName}` : undefined;
        await productsApi.createQa(productId, {
          question: questionText.trim(),
          userName: authorName,
        });
      }
      setSent(true);
      setQuestionText("");
      setTimeout(() => {
        setSent(false);
      }, 3000);
    } catch (err) {
      console.error("Failed to submit QA:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="qa" className="rounded-2xl border border-slate-200 bg-white p-6 md:p-8 space-y-6 shadow-2xs text-right">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
        <div>
          <h2 className="text-base sm:text-lg md:text-xl font-black text-slate-900">
            پرسش و پاسخ کاربران
          </h2>
          <p className="text-xs text-slate-400 font-medium mt-1">
            سؤالات خود را درباره این محصول بپرسید
          </p>
        </div>
      </div>

      <div className="space-y-3">
        {qaList.map((item) => {
          const isOpen = openId === item.id;
          return (
            <div
              key={item.id}
              className="rounded-xl border border-slate-200 overflow-hidden transition-colors"
            >
              <button
                type="button"
                onClick={() => setOpenId(isOpen ? null : item.id)}
                className="w-full p-4 flex items-center justify-between gap-3 text-right bg-slate-50/50 hover:bg-slate-50 transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-2.5">
                  <HelpCircle className="w-4 h-4 text-[#2563eb] shrink-0" />
                  <span className="text-xs sm:text-sm font-bold text-slate-800">
                    {item.question}
                  </span>
                </div>
                <ChevronDown
                  className={`w-4 h-4 text-slate-400 transition-transform duration-200 shrink-0 ${
                    isOpen ? "rotate-180 text-[#2563eb]" : ""
                  }`}
                />
              </button>

              {isOpen && (
                <div className="p-4 bg-white border-t border-slate-100 text-xs sm:text-sm text-slate-600 leading-relaxed space-y-2">
                  <p>{item.answer}</p>
                  {item.author && (
                    <div className="text-[11px] text-[#2563eb] font-bold text-left">
                      — {item.author}
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <form onSubmit={handleSubmit} className="rounded-xl border border-slate-200/90 bg-slate-50/60 p-4 sm:p-5 space-y-3">
        <label className="block text-xs font-bold text-slate-700">
          پرسش شما درباره این کالا
        </label>
        <div className="flex flex-col sm:flex-row gap-2">
          <input
            type="text"
            required
            value={questionText}
            onChange={(e) => setQuestionText(e.target.value)}
            placeholder="پرسش خود را بنویسید..."
            className="flex-1 bg-white border border-slate-200 rounded-xl px-4 py-2 text-xs text-slate-900 focus:outline-none focus:border-[#2563eb]"
          />
          <Button
            type="submit"
            variant="primary"
            size="md"
            disabled={loading}
            className="text-xs font-bold shrink-0"
            rightIcon={loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <MessageSquarePlus className="w-4 h-4" />}
          >
            {sent ? "ثبت شد (در انتظار تایید)" : "ارسال پرسش"}
          </Button>
        </div>
      </form>
    </section>
  );
}
