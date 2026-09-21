"use client";

import React, { useState, useEffect } from "react";
import { Product, getRelatedProducts, fetchRelatedProducts } from "@/lib/products";
import { ProductGallery } from "./product-gallery";
import { ProductInfo } from "./product-info";
import { BuyBox } from "./buy-box";
import { ProductTabs } from "./product-tabs";
import { ProductIntro } from "./product-intro";
import { ProductSpecs } from "./product-specs";
import { ProductReviews } from "./product-reviews";
import { ProductQA } from "./product-qa";
import { RelatedProducts } from "./related-products";

interface ProductDetailViewProps {
  product: Product;
}

export function ProductDetailView({ product }: ProductDetailViewProps) {
  const [activeTab, setActiveTab] = useState("intro");
  const [relatedList, setRelatedList] = useState<Product[]>(getRelatedProducts(product));

  useEffect(() => {
    let mounted = true;
    async function loadRelated() {
      try {
        const res = await fetchRelatedProducts(product.id);
        if (mounted && res.length > 0) {
          setRelatedList(res);
        }
      } catch (e) {
        console.error("Failed to load related products:", e);
      }
    }
    loadRelated();
    return () => {
      mounted = false;
    };
  }, [product.id]);

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    const element = document.getElementById(tabId);
    if (element) {
      const yOffset = -140;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["intro", "specs", "reviews", "qa"];
      const scrollPosition = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.offsetTop <= scrollPosition) {
          setActiveTab(sections[i]);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="space-y-6 mt-5">

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
        <div className="lg:col-span-5 xl:col-span-4 order-1">
          <ProductGallery
            images={product.images}
            title={product.title}
          />
        </div>

        <div className="lg:col-span-4 xl:col-span-5 order-2">
          <ProductInfo
            brand={product.brand}
            code={product.code}
            title={product.title}
            enTitle={product.enTitle}
            rating={product.rating}
            reviewsCount={product.reviewsCount}
            stockText={product.stockText}
            colors={product.colors}
            guarantee={product.guarantee}
            highlights={product.highlights}
          />
        </div>

        <div className="lg:col-span-3 order-3">
          <BuyBox
            seller={product.seller}
            price={product.price}
            oldPrice={product.oldPrice}
            discount={product.discount}
            product={product}
          />
        </div>
      </div>

      <div className="pt-6 space-y-8">
        <ProductTabs
          activeTab={activeTab}
          onTabChange={handleTabChange}
        />

        <div className="space-y-8 pt-2">
          <ProductIntro
            title={product.introTitle}
            description={product.introDesc}
            cards={product.featureCards}
          />

          <ProductSpecs specs={product.technicalSpecs} />

          <ProductReviews
            productId={product.id}
            rating={product.rating}
            reviewsCount={product.reviewsCount}
            distribution={product.ratingDistribution || []}
            reviews={product.reviews || []}
          />

          <ProductQA productId={product.id} />
        </div>
      </div>

      <RelatedProducts products={relatedList} />
    </div>
  );
}
