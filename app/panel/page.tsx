import React, { Suspense } from "react";
import type { Metadata } from "next";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { UserPanelView } from "@/components/auth/user-panel-view";

export const metadata: Metadata = {
  title: "پنل کاربری | پویان افزار",
  description: "مدیریت حساب کاربری و سوابق خرید در فروشگاه اینترنتی پویان افزار",
};

export default function PanelPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#f8fafc]">
      <Header />
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <Suspense fallback={
          <div className="max-w-md mx-auto py-24 text-center">
            <span className="inline-block w-8 h-8 border-3 border-[#2563eb] border-t-transparent rounded-full animate-spin" />
          </div>
        }>
          <UserPanelView />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
