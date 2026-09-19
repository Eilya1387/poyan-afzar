import React from "react";
import type { Metadata } from "next";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { CartView } from "@/components/cart/cart-view";

export const metadata: Metadata = {
  title: "سبد خرید | پویان افزار",
  description: "مشاهده و مدیریت سبد خرید در فروشگاه اینترنتی پویان افزار",
};

export default function CartPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#f8fafc]">
      <Header />
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <CartView />
      </main>
      <Footer />
    </div>
  );
}
