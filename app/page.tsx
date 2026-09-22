import React from "react";
import { Header } from "@/components/layout/header";
import { Hero } from "@/components/home/hero";
import { PopularCategories } from "@/components/home/popular-categories";
import { FlashSale } from "@/components/home/flash-sale";
import { BestSellers } from "@/components/home/best-sellers";
import { Brands } from "@/components/home/brands";
// import { BlogSection } from "@/components/home/blog-section";
import { Footer } from "@/components/layout/footer";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-[#f8fafc]">
      <Header />
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
        <div className="animate-fade-in-up">
          <Hero />
        </div>
        <div className="animate-fade-in-up animation-delay-100">
          <PopularCategories />
        </div>
        <div className="animate-fade-in-up animation-delay-200">
          <FlashSale />
        </div>
        <div className="animate-fade-in-up">
          <BestSellers />
        </div>
        <div className="animate-fade-in-up">
          <Brands />
        </div>
        {/* <div className="animate-fade-in-up">
          <BlogSection />
        </div> */}
      </main>
      <Footer />
    </div>
  );
}

