"use client";

import React, { useState } from "react";
import { Star, CheckCircle2, PenSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductReview, RatingDistributionItem } from "@/lib/products";

interface ProductReviewsProps {
  rating: number;
  reviewsCount: number;
  distribution: RatingDistributionItem[];
  reviews: ProductReview[];
}

export function ProductReviews({
  rating,
  reviewsCount,
  distribution,
  reviews,
}: ProductReviewsProps) {
  const [showModal, setShowModal] = useState(false);
  const [userName, setUserName] = useState("");
  const [userComment, setUserComment] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const formatPersianNumber = (num: number) => {
    const persianDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
    return num
      .toLocaleString("fa-IR")
      .replace(/[0-9]/g, (w) => persianDigits[+w]);
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (userName.trim() && userComment.trim()) {
      setSubmitted(true);
      setTimeout(() => {
        setShowModal(false);
        setSubmitted(false);
        setUserName("");
        setUserComment("");
      }, 1500);
    }
  };

  return (
    <section id="reviews" className="rounded-2xl border border-slate-200 bg-white p-6 md:p-8 space-y-6 shadow-2xs text-right">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
        <div>
          <h2 className="text-base sm:text-lg md:text-xl font-black text-slate-900">
            امتیاز و نظرات کاربران
          </h2>
          <p className="text-xs text-slate-400 font-medium mt-1">
            بر اساس نظرات خریداران واقعی در پویان افزار
          </p>
        </div>

        <Button
          variant="primary"
          size="md"
          type="button"
          onClick={() => setShowModal(true)}
          className="self-start sm:self-auto font-bold gap-2 text-xs"
          rightIcon={<PenSquare className="w-4 h-4" />}
        >
          ثبت نظر جدید
        </Button>
      </div>

      <div className="rounded-2xl bg-slate-50/60 border border-slate-200/80 p-5 sm:p-6 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        <div className="md:col-span-8 space-y-2.5 px-2 order-2 md:order-1">
          {distribution.map((item) => (
            <div key={item.stars} className="flex items-center gap-3 text-xs">
              <span className="w-12 text-slate-500 font-bold shrink-0">
                {formatPersianNumber(item.stars)} ستاره
              </span>
              <div className="flex-1 bg-slate-200/80 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-[#0b1528] h-full rounded-full transition-all duration-500"
                  style={{ width: `${item.percent}%` }}
                />
              </div>
              <span className="w-10 text-slate-400 font-medium text-left shrink-0">
                {formatPersianNumber(item.percent)}٪
              </span>
            </div>
          ))}
        </div>

        <div className="md:col-span-4 flex flex-col items-center justify-center text-center p-2 border-b md:border-b-0 md:border-r border-slate-200 order-1 md:order-2">
          <div className="text-3xl sm:text-4xl font-black text-slate-900 mb-1.5 tracking-tight">
            {formatPersianNumber(rating)} از ۵
          </div>
          <div className="flex items-center gap-1 mb-2">
            {[1, 2, 3, 4, 5].map((s) => (
              <Star
                key={s}
                className="w-4 h-4 fill-amber-400 text-amber-400"
              />
            ))}
          </div>
          <span className="text-xs text-slate-400 font-medium">
            از مجموع {formatPersianNumber(reviewsCount)} ثبت نظر
          </span>
        </div>
      </div>

      <div className="divide-y divide-slate-100 pt-2">
        {reviews.map((rev) => (
          <div key={rev.id} className="py-5 first:pt-2 space-y-2.5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="font-black text-sm text-slate-900">
                  {rev.user}
                </span>
                {rev.verified && (
                  <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-200/60">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                    خریدار تایید شده
                  </span>
                )}
              </div>
              <span className="text-xs text-slate-400 font-medium">
                {rev.date}
              </span>
            </div>

            <div className="flex items-center gap-0.5">
              {Array.from({ length: rev.rating }).map((_, i) => (
                <Star
                  key={i}
                  className="w-3.5 h-3.5 fill-amber-400 text-amber-400"
                />
              ))}
            </div>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {rev.comment}
            </p>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 max-w-md w-full shadow-2xl space-y-4">
            <h3 className="text-base font-black text-slate-900">
              ثبت نظر درباره محصول
            </h3>

            {submitted ? (
              <div className="bg-emerald-50 text-emerald-700 p-4 rounded-xl text-center text-xs font-bold border border-emerald-200">
                نظر شما با موفقیت ثبت شد و پس از بررسی منتشر خواهد شد.
              </div>
            ) : (
              <form onSubmit={handleReviewSubmit} className="space-y-3.5">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    نام و نام خانوادگی
                  </label>
                  <input
                    type="text"
                    required
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    placeholder="مثال: علی محمدی"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-[#2563eb]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    متن نظر شما
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={userComment}
                    onChange={(e) => setUserComment(e.target.value)}
                    placeholder="نقاط قوت، ضعف و تجربه کاربری خود را بنویسید..."
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-[#2563eb]"
                  />
                </div>

                <div className="flex items-center justify-end gap-2 pt-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => setShowModal(false)}
                  >
                    انصراف
                  </Button>
                  <Button
                    type="submit"
                    variant="primary"
                    size="sm"
                  >
                    ارسال نظر
                  </Button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
