import productsData from "@/data/products.json";
import { API_BASE_URL } from "./api/config";

export interface ProductColor {
  name: string;
  hex: string;
}

export interface FeatureCard {
  title: string;
  desc: string;
  icon: string;
}

export interface TechnicalSpec {
  label: string;
  value: string;
}

export interface RatingDistributionItem {
  stars: number;
  percent: number;
}

export interface ProductReview {
  id: number | string;
  user: string;
  verified: boolean;
  date: string;
  rating: number;
  comment: string;
  avatar?: string;
}

export interface Product {
  id: string;
  title: string;
  enTitle: string;
  brand: string;
  brandFa?: string;
  brandSlug?: string;
  category: string;
  categoryName: string;
  categorySlug?: string;
  code: string;
  price: string;
  priceNumber: number;
  oldPrice?: string;
  originalPrice?: number | null;
  discount: string;
  discountPercent: number;
  rating: number;
  reviewsCount: number;
  inStock: boolean;
  stockText: string;
  seller: string;
  guarantee: string;
  warranty?: string;
  colors: ProductColor[];
  image: string;
  images: string[];
  badges: string[];
  highlights: string[];
  introTitle: string;
  introDesc: string;
  description?: string;
  featureCards: FeatureCard[];
  technicalSpecs: TechnicalSpec[];
  ratingDistribution?: RatingDistributionItem[];
  reviews?: ProductReview[];
  relatedProductIds?: string[];
  stock?: number;
  minStockThreshold?: number;
  createdAt?: string;
}

function normalizeProduct(p: any): Product {
  const priceNum = typeof p.priceNumber === "number" ? p.priceNumber : typeof p.price === "number" ? p.price : 0;
  const priceStr = p.priceString || (priceNum ? priceNum.toLocaleString("fa-IR") : String(p.price || ""));
  return {
    ...p,
    price: priceStr,
    priceNumber: priceNum,
    description: p.description || p.introDesc || "",
    oldPrice: p.oldPrice || (p.originalPrice ? p.originalPrice.toLocaleString("fa-IR") : undefined),
  };
}

export const fallbackProducts: Product[] = productsData as Product[];
export const products: Product[] = fallbackProducts;

export function getAllProducts(): Product[] {
  return fallbackProducts;
}

export function getProductById(id: string): Product | undefined {
  return fallbackProducts.find((p) => p.id === id);
}

export function getRelatedProducts(product: Product): Product[] {
  const relIds = product.relatedProductIds || [];
  return relIds
    .map((id) => fallbackProducts.find((p) => p.id === id))
    .filter((p): p is Product => p !== undefined);
}

// ================= Async API Fetchers (Strict Backend Connection) =================

export async function fetchProducts(params?: {
  page?: number;
  limit?: number;
  search?: string;
  category?: string;
  brand?: string;
  minPrice?: number;
  maxPrice?: number;
  inStock?: boolean;
  sort?: string;
}): Promise<{ items: Product[]; total: number }> {
  try {
    const query = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([k, v]) => {
        if (v !== undefined && v !== null && v !== "") {
          query.append(k, String(v));
        }
      });
    }
    const qStr = query.toString();
    const url = `${API_BASE_URL}/api/products${qStr ? `?${qStr}` : ""}`;
    const res = await fetch(url, { next: { revalidate: 60 } });
    if (!res.ok) throw new Error(`HTTP error ${res.status}`);
    const json = await res.json();
    const list = Array.isArray(json.data)
      ? json.data
      : json.data?.items || json.data?.products || [];
    const normalized = list.map(normalizeProduct);
    const total = json.meta?.total || json.data?.total || normalized.length;
    return { items: normalized.length > 0 ? normalized : fallbackProducts, total };
  } catch {
    return { items: fallbackProducts, total: fallbackProducts.length };
  }
}

export async function fetchProductById(id: string): Promise<Product | null> {
  try {
    const res = await fetch(`${API_BASE_URL}/api/products/${encodeURIComponent(id)}`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) {
      if (res.status === 404) return null;
      throw new Error(`HTTP error ${res.status}`);
    }
    const json = await res.json();
    return json.data ? normalizeProduct(json.data) : null;
  } catch {
    return getProductById(id) || null;
  }
}

export async function fetchFlashDeals(): Promise<Product[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/api/products/flash-deals`, {
      next: { revalidate: 30 },
    });
    if (!res.ok) throw new Error(`HTTP error ${res.status}`);
    const json = await res.json();
    return Array.isArray(json.data) ? json.data.map(normalizeProduct) : [];
  } catch {
    return fallbackProducts.filter((p) => p.discountPercent > 0).slice(0, 4);
  }
}

export async function fetchRelatedProducts(id: string): Promise<Product[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/api/products/${encodeURIComponent(id)}/related`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) throw new Error(`HTTP error ${res.status}`);
    const json = await res.json();
    return Array.isArray(json.data) ? json.data.map(normalizeProduct) : [];
  } catch {
    const product = getProductById(id);
    return product ? getRelatedProducts(product) : [];
  }
}
