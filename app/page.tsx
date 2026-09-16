import React from "react";
import { Header } from "@/components/layout/header";
import { Hero } from "@/components/home/hero";
import { Features } from "@/components/home/features";
import { PopularCategories } from "@/components/home/popular-categories";
import { FlashSale } from "@/components/home/flash-sale";
import { BestSellers } from "@/components/home/best-sellers";
import { Brands } from "@/components/home/brands";
import { BlogSection } from "@/components/home/blog-section";
import { Newsletter } from "@/components/home/newsletter";
import { Footer } from "@/components/layout/footer";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-[#f8fafc]">
      <Header />
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 space-y-2">
        <Hero />
        <Features />
        <PopularCategories />
        <FlashSale />
        <BestSellers />
        <Brands />
        <BlogSection />
        <Newsletter />
      </main>
      <Footer />
    </div>
  );
}

