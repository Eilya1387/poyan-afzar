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

export function normalizeProduct(p: any): Product {
  const priceNum = typeof p.priceNumber === "number" ? p.priceNumber : typeof p.price === "number" ? p.price : 0;
  const priceStr = p.priceString || (priceNum ? priceNum.toLocaleString("fa-IR") : String(p.price || ""));
  const origPriceNum = typeof p.originalPrice === "number" ? p.originalPrice : (p.priceNumber && p.discountPercent ? Math.round(p.priceNumber / (1 - p.discountPercent / 100)) : undefined);
  const oldPriceStr = p.oldPrice || (origPriceNum && origPriceNum > priceNum ? origPriceNum.toLocaleString("fa-IR") : undefined);
  const discountStr = p.discount || (p.discountPercent > 0 ? `٪${p.discountPercent} تخفیف` : "");

  return {
    ...p,
    price: priceStr,
    priceNumber: priceNum,
    originalPrice: origPriceNum,
    oldPrice: oldPriceStr,
    discount: discountStr,
    description: p.description || p.introDesc || "",
    category: p.category || p.categorySlug || "",
    categorySlug: p.categorySlug || p.category || "",
    brand: p.brand || p.brandSlug || "",
    brandSlug: p.brandSlug || p.brand || "",
    images: Array.isArray(p.images) && p.images.length > 0 ? p.images : (p.image ? [p.image] : []),
    colors: Array.isArray(p.colors) ? p.colors : [],
    badges: Array.isArray(p.badges) ? p.badges : [],
    highlights: Array.isArray(p.highlights) ? p.highlights : [],
    featureCards: Array.isArray(p.featureCards) ? p.featureCards : [],
    technicalSpecs: Array.isArray(p.technicalSpecs) ? p.technicalSpecs : (Array.isArray(p.specs) ? p.specs : []),
    ratingDistribution: Array.isArray(p.ratingDistribution) ? p.ratingDistribution : [],
    reviews: Array.isArray(p.reviews) ? p.reviews : [],
    relatedProductIds: Array.isArray(p.relatedProductIds) ? p.relatedProductIds : [],
  };
}

export const fallbackProducts: Product[] = [];
export const products: Product[] = [];

export function getAllProducts(): Product[] {
  return products;
}

export function getProductById(id: string): Product | undefined {
  return undefined;
}

export function getRelatedProducts(product: Product): Product[] {
  return [];
}

// ================= Async API Fetchers (Strict Backend Connection) =================

export async function fetchProducts(params?: {
  page?: number;
  limit?: number;
  search?: string;
  q?: string;
  category?: string;
  brand?: string;
  minPrice?: number;
  maxPrice?: number;
  inStock?: boolean;
  onlyInStock?: boolean;
  minRating?: number;
  sort?: string;
}): Promise<{ items: Product[]; total: number }> {
  try {
    const query = new URLSearchParams();
    if (params) {
      if (params.page !== undefined) query.append("page", String(params.page));
      if (params.limit !== undefined) query.append("limit", String(params.limit));

      const searchText = params.q || params.search;
      if (searchText) query.append("q", searchText.trim());

      if (params.category) query.append("category", params.category);
      if (params.brand) query.append("brand", params.brand);
      if (params.minPrice !== undefined) query.append("minPrice", String(params.minPrice));
      if (params.maxPrice !== undefined) query.append("maxPrice", String(params.maxPrice));
      if (params.minRating !== undefined) query.append("minRating", String(params.minRating));

      const inStock = params.onlyInStock !== undefined ? params.onlyInStock : params.inStock;
      if (inStock !== undefined) query.append("onlyInStock", String(inStock));

      if (params.sort) {
        let sortVal = params.sort.toLowerCase().trim();
        if (sortVal === "best_seller" || sortVal === "bestseller" || sortVal === "popular") {
          sortVal = "best-seller";
        } else if (sortVal === "price_asc" || sortVal === "cheapest") {
          sortVal = "cheapest";
        } else if (sortVal === "price_desc" || sortVal === "expensive") {
          sortVal = "expensive";
        } else if (sortVal === "newest") {
          sortVal = "newest";
        } else if (sortVal === "discount") {
          sortVal = "discount";
        }
        query.append("sort", sortVal);
      }
    }
    const qStr = query.toString();
    const url = `${API_BASE_URL}/api/products${qStr ? `?${qStr}` : ""}`;
    const res = await fetch(url, { next: { revalidate: 30 } });
    if (!res.ok) throw new Error(`HTTP error ${res.status}`);
    const json = await res.json();
    const list = Array.isArray(json.data)
      ? json.data
      : json.data?.items || json.data?.products || [];
    const normalized = list.map(normalizeProduct);
    const total = json.meta?.total || json.data?.total || normalized.length;
    return { items: normalized, total };
  } catch (err) {
    console.error("fetchProducts error:", err);
    return { items: [], total: 0 };
  }
}

export async function fetchProductById(id: string): Promise<Product | null> {
  try {
    const res = await fetch(`${API_BASE_URL}/api/products/${encodeURIComponent(id)}`, {
      next: { revalidate: 30 },
    });
    if (!res.ok) {
      if (res.status === 404) return null;
      throw new Error(`HTTP error ${res.status}`);
    }
    const json = await res.json();
    return json.data ? normalizeProduct(json.data) : null;
  } catch (err) {
    console.error("fetchProductById error:", err);
    return null;
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
  } catch (err) {
    console.error("fetchFlashDeals error:", err);
    return [];
  }
}

export async function fetchRelatedProducts(id: string): Promise<Product[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/api/products/${encodeURIComponent(id)}/related`, {
      next: { revalidate: 30 },
    });
    if (!res.ok) throw new Error(`HTTP error ${res.status}`);
    const json = await res.json();
    return Array.isArray(json.data) ? json.data.map(normalizeProduct) : [];
  } catch (err) {
    console.error("fetchRelatedProducts error:", err);
    return [];
  }
}
