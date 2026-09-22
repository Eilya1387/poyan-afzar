"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useAdminStore } from "@/lib/admin-store";
import { formatPriceFa, toPersianDigits } from "@/lib/formatters";
import { AdminQaItem } from "@/types/admin";
import { ConfirmModal } from "./confirm-modal";
import { Button } from "@/components/ui/button";
import {
  HelpCircle,
  MessageSquare,
  Search,
  CheckCircle,
  XCircle,
  Eye,
  Trash2,
  Send,
  ExternalLink,
  Clock,
  User,
  Package,
  Loader2,
} from "lucide-react";

export function QaView() {
  const qa = useAdminStore((state) => state.qa);
  const fetchAdminData = useAdminStore((state) => state.fetchAdminData);
  const answerQa = useAdminStore((state) => state.answerQa);
  const togglePublishQa = useAdminStore((state) => state.togglePublishQa);
  const deleteQa = useAdminStore((state) => state.deleteQa);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterTab, setFilterTab] = useState<"all" | "pending" | "answered" | "published">("all");
  const [answeringId, setAnsweringId] = useState<string | null>(null);
  const [answerText, setAnswerText] = useState("");
  const [isSubmittingAnswer, setIsSubmittingAnswer] = useState(false);
  const [deletingQaId, setDeletingQaId] = useState<string | null>(null);

  useEffect(() => {
    fetchAdminData();
  }, [fetchAdminData]);

  const pendingCount = qa.filter((q) => !q.hasAnswer && !q.answer).length;
  const answeredCount = qa.filter((q) => q.hasAnswer || Boolean(q.answer)).length;
  const publishedCount = qa.filter((q) => q.isPublished).length;

  const filteredQa = qa.filter((q) => {
    const isAnswered = q.hasAnswer || Boolean(q.answer);
    if (filterTab === "pending" && isAnswered) return false;
    if (filterTab === "answered" && !isAnswered) return false;
    if (filterTab === "published" && !q.isPublished) return false;

    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase().trim();
      const matchQ = q.question?.toLowerCase().includes(term);
      const matchP = q.productTitle?.toLowerCase().includes(term);
      const matchU = q.userName?.toLowerCase().includes(term);
      if (!matchQ && !matchP && !matchU) return false;
    }

    return true;
  });

  const handleOpenAnswer = (item: AdminQaItem) => {
    setAnsweringId(item.id);
    setAnswerText(item.answer || "");
  };

  const handleSaveAnswer = async (id: string) => {
    if (!answerText.trim()) return;
    setIsSubmittingAnswer(true);
    try {
      await answerQa(id, answerText.trim());
      setAnsweringId(null);
      setAnswerText("");
    } catch (err: any) {
      alert(err?.message || "خطا در ثبت پاسخ");
    } finally {
      setIsSubmittingAnswer(false);
    }
  };

  const handleTogglePublish = async (item: AdminQaItem) => {
    try {
      await togglePublishQa(item.id, !item.isPublished);
    } catch (err: any) {
      alert(err?.message || "خطا در تغییر وضعیت انتشار");
    }
  };

  const handleConfirmDelete = async () => {
    if (deletingQaId) {
      try {
        await deleteQa(deletingQaId);
        setDeletingQaId(null);
      } catch (err: any) {
        alert(err?.message || "خطا در حذف پرسش");
      }
    }
  };

  return (
    <div className="space-y-6 select-none animate-fade-in text-right">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            مدیریت پرسش و پاسخ کاربران
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 font-medium">
            مشاهده، پاسخ‌دهی و انتشار سوالات ثبت‌شده کاربران در صفحه محصولات
          </p>
        </div>

        {/* Stats Summary */}
        <div className="flex items-center gap-2">
          <span className="px-3 py-1.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-xs font-bold">
            {toPersianDigits(pendingCount)} در انتظار پاسخ
          </span>
          <span className="px-3 py-1.5 rounded-xl bg-blue-50 border border-blue-200 text-blue-800 text-xs font-bold">
            {toPersianDigits(publishedCount)} منتشر شده
          </span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-2xs space-y-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          {/* Tabs */}
          <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl w-full sm:w-auto overflow-x-auto no-scrollbar">
            <button
              onClick={() => setFilterTab("all")}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                filterTab === "all" ? "bg-white text-slate-900 shadow-2xs" : "text-slate-600 hover:text-slate-900"
              }`}
            >
              همه ({toPersianDigits(qa.length)})
            </button>
            <button
              onClick={() => setFilterTab("pending")}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                filterTab === "pending" ? "bg-white text-amber-600 shadow-2xs" : "text-slate-600 hover:text-slate-900"
              }`}
            >
              بدون پاسخ ({toPersianDigits(pendingCount)})
            </button>
            <button
              onClick={() => setFilterTab("answered")}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                filterTab === "answered" ? "bg-white text-blue-600 shadow-2xs" : "text-slate-600 hover:text-slate-900"
              }`}
            >
              پاسخ داده شده ({toPersianDigits(answeredCount)})
            </button>
            <button
              onClick={() => setFilterTab("published")}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                filterTab === "published" ? "bg-white text-emerald-600 shadow-2xs" : "text-slate-600 hover:text-slate-900"
              }`}
            >
              منتشر شده ({toPersianDigits(publishedCount)})
            </button>
          </div>

          {/* Search Input */}
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 absolute inset-y-0 right-3 my-auto text-slate-400 pointer-events-none" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="جستجو در پرسش، کاربر یا کالا..."
              className="w-full pr-9 pl-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 font-medium"
            />
          </div>
        </div>
      </div>

      {/* QA Cards List */}
      <div className="space-y-4">
        {filteredQa.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-100 p-12 text-center text-slate-400 space-y-2">
            <HelpCircle className="w-10 h-10 mx-auto text-slate-300" />
            <p className="font-bold text-sm text-slate-600">پرسشی یافت نشد</p>
            <p className="text-xs">هیچ موردی مطابق با فیلترهای انتخابی شما وجود ندارد.</p>
          </div>
        ) : (
          filteredQa.map((item) => {
            const hasAns = item.hasAnswer || Boolean(item.answer);
            const isEditing = answeringId === item.id;

            return (
              <div
                key={item.id}
                className="bg-white rounded-2xl border border-slate-100 shadow-2xs p-5 space-y-4 hover:border-slate-200 transition-all"
              >
                {/* Top Info Bar */}
                <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-blue-50 text-[#2563eb] flex items-center justify-center font-bold text-xs shrink-0">
                      <HelpCircle className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-black text-xs text-slate-900">
                          {item.userName || "کاربر پویان افزار"}
                        </span>
                        <span className="text-[10px] text-slate-400">
                          {item.date || new Intl.DateTimeFormat("fa-IR").format(new Date(item.createdAt))}
                        </span>
                      </div>
                      {item.productTitle && (
                        <Link
                          href={`/products/${item.productId}`}
                          target="_blank"
                          className="inline-flex items-center gap-1 text-[11px] font-bold text-[#2563eb] hover:underline mt-0.5"
                        >
                          <Package className="w-3 h-3" />
                          <span>کالا: {item.productTitle}</span>
                          <ExternalLink className="w-2.5 h-2.5" />
                        </Link>
                      )}
                    </div>
                  </div>

                  {/* Badges & Publish Toggle */}
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-[10px] font-black px-2.5 py-1 rounded-full border ${
                        hasAns
                          ? "bg-blue-50 text-blue-700 border-blue-200"
                          : "bg-amber-50 text-amber-700 border-amber-200"
                      }`}
                    >
                      {hasAns ? "پاسخ داده شده" : "در انتظار پاسخ"}
                    </span>

                    <button
                      type="button"
                      onClick={() => handleTogglePublish(item)}
                      className={`text-[10px] font-black px-2.5 py-1 rounded-full border cursor-pointer transition-colors ${
                        item.isPublished
                          ? "bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100"
                          : "bg-slate-100 text-slate-600 border-slate-200 hover:bg-slate-200"
                      }`}
                      title="کلیک برای تغییر وضعیت انتشار در سایت"
                    >
                      {item.isPublished ? "✓ منتشر شده در سایت" : "غیرفعال در سایت"}
                    </button>
                  </div>
                </div>

                {/* Question Text */}
                <div className="bg-slate-50/70 p-3.5 rounded-xl border border-slate-100">
                  <span className="text-[11px] font-bold text-slate-500 block mb-1">متن پرسش:</span>
                  <p className="text-xs sm:text-sm text-slate-800 font-medium leading-relaxed">
                    {item.question}
                  </p>
                </div>

                {/* Answer Section */}
                {isEditing ? (
                  <div className="bg-blue-50/50 p-4 rounded-xl border border-blue-100 space-y-3">
                    <label className="text-xs font-black text-slate-800 block">
                      پاسخ کارشناس مدیریت:
                    </label>
                    <textarea
                      rows={3}
                      value={answerText}
                      onChange={(e) => setAnswerText(e.target.value)}
                      placeholder="متن پاسخ خود را به این پرسش وارد نمایید..."
                      className="w-full p-3 bg-white border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-[#2563eb]"
                    />
                    <div className="flex justify-end gap-2">
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => setAnsweringId(null)}
                      >
                        انصراف
                      </Button>
                      <Button
                        type="button"
                        variant="primary"
                        size="sm"
                        disabled={isSubmittingAnswer}
                        onClick={() => handleSaveAnswer(item.id)}
                        rightIcon={isSubmittingAnswer ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Send className="w-3.5 h-3.5" />}
                      >
                        ثبت پاسخ و انتشار
                      </Button>
                    </div>
                  </div>
                ) : item.answer ? (
                  <div className="bg-emerald-50/40 p-3.5 rounded-xl border border-emerald-100 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-black text-emerald-800">
                        پاسخ ارسال‌شده ({item.answeredBy || "کارشناس فنی پویان افزار"}):
                      </span>
                      <button
                        type="button"
                        onClick={() => handleOpenAnswer(item)}
                        className="text-[11px] font-bold text-[#2563eb] hover:underline cursor-pointer"
                      >
                        ویرایش پاسخ
                      </button>
                    </div>
                    <p className="text-xs text-slate-700 leading-relaxed font-medium">
                      {item.answer}
                    </p>
                  </div>
                ) : (
                  <div className="flex justify-start">
                    <Button
                      type="button"
                      variant="secondary"
                      size="sm"
                      onClick={() => handleOpenAnswer(item)}
                      className="text-xs font-bold gap-1.5"
                      rightIcon={<MessageSquare className="w-3.5 h-3.5" />}
                    >
                      ثبت پاسخ برای این سوال
                    </Button>
                  </div>
                )}

                {/* Footer Action Buttons */}
                <div className="flex items-center justify-end pt-2 border-t border-slate-100 gap-2">
                  <button
                    type="button"
                    onClick={() => setDeletingQaId(item.id)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer text-xs font-bold flex items-center gap-1"
                    title="حذف پرسش"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>حذف پرسش</span>
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={Boolean(deletingQaId)}
        title="حذف پرسش کاربر"
        message="آیا از حذف دائمی این پرسش اطمینان دارید؟ این عملیات قابل بازگشت نیست."
        confirmText="بله، حذف شود"
        variant="danger"
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeletingQaId(null)}
      />
    </div>
  );
}
