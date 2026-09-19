"use client";

import React, { useState } from "react";
import { useAdminStore } from "@/lib/admin-store";
import { toPersianDigits } from "@/lib/formatters";
import { AdminReview } from "@/types/admin";
import { ConfirmModal } from "./confirm-modal";
import { Button } from "@/components/ui/button";
import {
  MessageSquare,
  Star,
  CheckCircle,
  XCircle,
  Clock,
  Trash2,
  ThumbsUp,
  ThumbsDown,
  ShoppingBag,
  Search,
} from "lucide-react";

export function ReviewsView() {
  const reviews = useAdminStore((state) => state.reviews);
  const approveReview = useAdminStore((state) => state.approveReview);
  const rejectReview = useAdminStore((state) => state.rejectReview);
  const deleteReview = useAdminStore((state) => state.deleteReview);

  // States
  const [filterTab, setFilterTab] = useState<"all" | "pending" | "approved" | "rejected">("pending");
  const [searchTerm, setSearchTerm] = useState("");
  const [rejectingReviewId, setRejectingReviewId] = useState<string | null>(null);
  const [deletingReviewId, setDeletingReviewId] = useState<string | null>(null);

  const pendingCount = reviews.filter((r) => r.status === "pending").length;
  const approvedCount = reviews.filter((r) => r.status === "approved").length;
  const rejectedCount = reviews.filter((r) => r.status === "rejected").length;

  const filteredReviews = reviews.filter((r) => {
    if (filterTab !== "all" && r.status !== filterTab) return false;
    if (
      searchTerm &&
      !r.userName.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !r.productTitle.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !r.comment.toLowerCase().includes(searchTerm.toLowerCase())
    ) {
      return false;
    }
    return true;
  });

  return (
    <div className="space-y-6 select-none animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            مدیریت نظرات کاربران
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 font-medium">
            تایید دیدگاه‌ها برای انتشار در سایت یا رد نظرات با تاییدیه هشدار
          </p>
        </div>
      </div>

      {/* Stats and Filter Tabs */}
      <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-2xs space-y-3">
        <div className="flex flex-col md:flex-row items-center justify-between gap-3">
          {/* Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
            {[
              { id: "pending", label: "در انتظار بررسی", count: pendingCount, color: "amber" },
              { id: "approved", label: "تایید شده (روی سایت)", count: approvedCount, color: "emerald" },
              { id: "rejected", label: "رد شده", count: rejectedCount, color: "rose" },
              { id: "all", label: "همه دیدگاه‌ها", count: reviews.length, color: "blue" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setFilterTab(tab.id as any)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
                  filterTab === tab.id
                    ? "bg-[#2563eb] text-white shadow-xs"
                    : "bg-slate-50 hover:bg-slate-100 text-slate-600"
                }`}
              >
                <span>{tab.label}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                    filterTab === tab.id
                      ? "bg-white/20 text-white"
                      : "bg-slate-200 text-slate-700"
                  }`}
                >
                  {toPersianDigits(tab.count)}
                </span>
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="relative w-full md:w-64">
            <Search className="w-4 h-4 absolute inset-y-0 right-3 my-auto text-slate-400 pointer-events-none" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="جستجو در نظرات..."
              className="w-full pr-9 pl-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            />
          </div>
        </div>
      </div>

      {/* Reviews List */}
      <div className="space-y-3">
        {filteredReviews.length === 0 ? (
          <div className="py-16 text-center bg-white rounded-2xl border border-slate-100 shadow-2xs">
            <MessageSquare className="w-10 h-10 mx-auto mb-2 text-slate-300" />
            <p className="font-bold text-slate-700 text-sm">دیدگاهی در این بخش وجود ندارد</p>
          </div>
        ) : (
          filteredReviews.map((review) => (
            <div
              key={review.id}
              className="bg-white rounded-2xl border border-slate-100 p-5 shadow-2xs hover:shadow-md transition-shadow space-y-3"
            >
              {/* Header info */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-slate-100 text-slate-700 font-black flex items-center justify-center text-sm shrink-0">
                    {review.userName.substring(0, 1)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900 text-sm">{review.userName}</span>
                      <span className="text-xs text-slate-400">• {review.date}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-0.5">
                      <ShoppingBag className="w-3.5 h-3.5 text-blue-600" />
                      <span className="font-medium text-slate-700">{review.productTitle}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 self-end sm:self-auto">
                  {/* Rating Stars */}
                  <div className="flex items-center gap-0.5 text-amber-400">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < review.rating ? "fill-amber-400" : "text-slate-200"
                        }`}
                      />
                    ))}
                  </div>

                  {/* Status */}
                  {review.status === "pending" && (
                    <span className="text-xs font-semibold text-amber-600">در انتظار بررسی</span>
                  )}
                  {review.status === "approved" && (
                    <span className="text-xs font-semibold text-emerald-600">تایید شده</span>
                  )}
                  {review.status === "rejected" && (
                    <span className="text-xs font-semibold text-rose-600">رد شده</span>
                  )}
                </div>
              </div>

              {/* Comment Body */}
              <p className="text-xs text-slate-700 leading-relaxed bg-slate-50/70 p-3.5 rounded-xl border border-slate-100">
                {review.comment}
              </p>

              {/* Action Buttons */}
              <div className="pt-2 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {review.status !== "approved" && (
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-emerald-200 text-emerald-700 hover:bg-emerald-50"
                      onClick={() => approveReview(review.id)}
                      rightIcon={<CheckCircle className="w-4 h-4 text-emerald-600" />}
                    >
                      تایید و انتشار در سایت
                    </Button>
                  )}

                  {review.status !== "rejected" && (
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-rose-200 text-rose-700 hover:bg-rose-50"
                      onClick={() => setRejectingReviewId(review.id)}
                      rightIcon={<XCircle className="w-4 h-4 text-rose-600" />}
                    >
                      رد نظر
                    </Button>
                  )}
                </div>

                <button
                  onClick={() => setDeletingReviewId(review.id)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                  title="حذف نظر"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Reject Warning Modal */}
      <ConfirmModal
        isOpen={!!rejectingReviewId}
        title="رد دیدگاه کاربر"
        message="آیا مطمئنی رد بشه؟ این دیدگاه تایید نخواهد شد و برای عموم کاربران در سایت نمایش داده نمی‌شود."
        confirmText="بله، رد شود"
        variant="warning"
        onConfirm={() => {
          if (rejectingReviewId) {
            rejectReview(rejectingReviewId);
            setRejectingReviewId(null);
          }
        }}
        onCancel={() => setRejectingReviewId(null)}
      />

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={!!deletingReviewId}
        title="حذف کامل نظر"
        message="آیا از حذف کامل این نظر از پایگاه داده اطمینان دارید؟"
        confirmText="بله، حذف کن"
        variant="danger"
        onConfirm={() => {
          if (deletingReviewId) {
            deleteReview(deletingReviewId);
            setDeletingReviewId(null);
          }
        }}
        onCancel={() => setDeletingReviewId(null)}
      />
    </div>
  );
}
