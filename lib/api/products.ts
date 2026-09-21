import { api } from "./client";
import { Product, fetchProducts, normalizeProduct } from "@/lib/products";

export interface GetProductsParams {
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
  sort?: "newest" | "cheapest" | "expensive" | "best-seller" | "discount" | string;
}

export interface ProductReviewItem {
  id: number | string;
  user: string;
  userName?: string;
  verified: boolean;
  date: string;
  rating: number;
  comment: string;
  avatar?: string;
  status?: string;
}

export interface ProductQaItem {
  id: number | string;
  question: string;
  answer?: string | null;
  author?: string;
  userName?: string;
  createdAt?: string;
  published?: boolean;
}

export function sanitizeProductDto(raw: any): Record<string, any> {
  const dto: Record<string, any> = {};

  if (raw.id !== undefined && raw.id !== null) {
    dto.id = String(raw.id).trim();
  }
  if (raw.title !== undefined) {
    dto.title = String(raw.title).trim();
  }
  if (raw.enTitle !== undefined && raw.enTitle !== null && String(raw.enTitle).trim() !== "") {
    dto.enTitle = String(raw.enTitle).trim();
  }
  if (raw.code !== undefined && raw.code !== null && String(raw.code).trim() !== "") {
    dto.code = String(raw.code).trim();
  }

  const catSlug = raw.categorySlug || raw.category;
  if (catSlug) {
    dto.categorySlug = String(catSlug).trim();
  }

  const bSlug = raw.brandSlug || raw.brand;
  if (bSlug) {
    dto.brandSlug = String(bSlug).trim();
  }

  if (raw.price !== undefined && raw.price !== null) {
    dto.price = Number(raw.price);
  }
  if (raw.originalPrice !== undefined && raw.originalPrice !== null && raw.originalPrice !== "") {
    dto.originalPrice = Number(raw.originalPrice);
  }
  if (raw.stock !== undefined && raw.stock !== null) {
    const stockNum = Number(raw.stock);
    dto.stock = stockNum;
    dto.inStock = stockNum > 0;
    dto.stockText = stockNum > 0 ? (raw.stockText || "موجود در انبار پویان افزار") : "ناموجود";
  }
  if (raw.minStockThreshold !== undefined && raw.minStockThreshold !== null) {
    dto.minStockThreshold = Number(raw.minStockThreshold);
  }
  if (raw.image) {
    dto.image = String(raw.image).trim();
    dto.images = Array.isArray(raw.images) && raw.images.length > 0 ? raw.images : [dto.image];
  }
  if (Array.isArray(raw.images) && raw.images.length > 0) {
    dto.images = raw.images.map((img: any) => String(img).trim()).filter(Boolean);
  }

  const warrantyVal = raw.warranty || raw.guarantee;
  if (warrantyVal) {
    dto.warranty = String(warrantyVal).trim();
  }
  if (raw.seller) {
    dto.seller = String(raw.seller).trim();
  }
  if (raw.description !== undefined && raw.description !== null) {
    dto.description = String(raw.description).trim();
  }
  if (raw.introTitle !== undefined && raw.introTitle !== null) {
    dto.introTitle = String(raw.introTitle).trim();
  }
  if (raw.introDesc !== undefined && raw.introDesc !== null) {
    dto.introDesc = String(raw.introDesc).trim();
  }

  if (Array.isArray(raw.specs) || Array.isArray(raw.technicalSpecs)) {
    const rawSpecs = Array.isArray(raw.specs) ? raw.specs : raw.technicalSpecs;
    const cleanSpecs = rawSpecs
      .filter((s: any) => s && typeof s.label === "string" && s.label.trim() !== "")
      .map((s: any) => ({
        label: String(s.label).trim(),
        value: String(s.value || "").trim(),
      }));
    if (cleanSpecs.length > 0) {
      dto.specs = cleanSpecs;
    }
  }

  if (Array.isArray(raw.colors) && raw.colors.length > 0) {
    const cleanColors = raw.colors
      .filter((c: any) => c && typeof c.name === "string" && c.name.trim() !== "")
      .map((c: any) => ({
        name: String(c.name).trim(),
        hex: String(c.hex || "#000000").trim(),
      }));
    if (cleanColors.length > 0) {
      dto.colors = cleanColors;
    }
  }

  if (raw.badge && typeof raw.badge === "object" && raw.badge.text) {
    dto.badge = {
      text: String(raw.badge.text).trim(),
      type: ["discount", "in-stock", "hot"].includes(raw.badge.type) ? raw.badge.type : "in-stock",
    };
  }

  if (Array.isArray(raw.badges) && raw.badges.length > 0) {
    dto.badges = raw.badges.map((b: any) => String(b).trim()).filter(Boolean);
  }

  if (Array.isArray(raw.highlights) && raw.highlights.length > 0) {
    dto.highlights = raw.highlights.map((h: any) => String(h).trim()).filter(Boolean);
  }

  if (Array.isArray(raw.featureCards) && raw.featureCards.length > 0) {
    dto.featureCards = raw.featureCards
      .filter((fc: any) => fc && fc.title)
      .map((fc: any) => ({
        title: String(fc.title).trim(),
        desc: String(fc.desc || "").trim(),
        icon: String(fc.icon || "Zap").trim(),
      }));
  }

  return dto;
}

export const productsApi = {
  // Get all / search / filter products
  getProducts: async (params?: GetProductsParams): Promise<{ items: Product[]; total: number }> => {
    return fetchProducts(params);
  },

  // Get single product by id or slug
  getProduct: async (id: string): Promise<Product> => {
    const res = await api.get<Product>(`/api/products/${encodeURIComponent(id)}`, {
      skipAuth: true,
    });
    return normalizeProduct(res.data);
  },

  // Get flash deals
  getFlashDeals: async (): Promise<Product[]> => {
    const res = await api.get<Product[]>("/api/products/flash-deals", {
      skipAuth: true,
    });
    return Array.isArray(res.data) ? res.data.map(normalizeProduct) : [];
  },

  // Get related products
  getRelatedProducts: async (id: string): Promise<Product[]> => {
    const res = await api.get<Product[]>(`/api/products/${encodeURIComponent(id)}/related`, {
      skipAuth: true,
    });
    return Array.isArray(res.data) ? res.data.map(normalizeProduct) : [];
  },

  // Admin create product
  createProduct: async (productData: any): Promise<Product> => {
    const cleanDto = sanitizeProductDto(productData);
    const res = await api.post<Product>("/api/products", cleanDto, {
      useAdminToken: true,
    });
    return normalizeProduct(res.data);
  },

  // Admin update product
  updateProduct: async (id: string, updates: any): Promise<Product> => {
    const cleanDto = sanitizeProductDto(updates);
    delete cleanDto.id;
    const res = await api.patch<Product>(`/api/products/${encodeURIComponent(id)}`, cleanDto, {
      useAdminToken: true,
    });
    return normalizeProduct(res.data);
  },

  // Admin delete product
  deleteProduct: async (id: string): Promise<{ success: boolean; message?: string }> => {
    try {
      const res = await api.delete(`/api/products/${encodeURIComponent(id)}`, {
        useAdminToken: true,
      });
      return res.data || { success: true };
    } catch (err: any) {
      if (err?.statusCode === 404) {
        return { success: true, message: "کالا از قبل حذف شده است" };
      }
      throw err;
    }
  },

  // Product Reviews
  getReviews: async (productId: string): Promise<{ reviews: ProductReviewItem[]; distribution?: any; rating?: number; reviewsCount?: number }> => {
    const res = await api.get<any>(`/api/products/${encodeURIComponent(productId)}/reviews`, {
      skipAuth: true,
    });
    if (Array.isArray(res.data)) {
      return { reviews: res.data };
    }
    return {
      reviews: res.data?.reviews || [],
      distribution: res.data?.distribution || res.data?.ratingDistribution,
      rating: res.data?.rating,
      reviewsCount: res.data?.reviewsCount,
    };
  },

  createReview: async (
    productId: string,
    reviewData: { rating: number; comment: string; userName?: string; userAvatar?: string }
  ) => {
    const res = await api.post(`/api/products/${encodeURIComponent(productId)}/reviews`, reviewData);
    return res.data;
  },

  // Product Q&A
  getQa: async (productId: string): Promise<ProductQaItem[]> => {
    const res = await api.get<ProductQaItem[]>(`/api/products/${encodeURIComponent(productId)}/qa`, {
      skipAuth: true,
    });
    return Array.isArray(res.data) ? res.data : [];
  },

  createQa: async (productId: string, payload: { question: string; userName?: string }) => {
    const res = await api.post(`/api/products/${encodeURIComponent(productId)}/qa`, payload);
    return res.data;
  },
};
