import { api } from "./client";
import { Product } from "@/lib/products";

export interface GetProductsParams {
  page?: number;
  limit?: number;
  search?: string;
  category?: string;
  brand?: string;
  minPrice?: number;
  maxPrice?: number;
  inStock?: boolean;
  sort?: "newest" | "price_asc" | "price_desc" | "popular" | "best_seller" | "discount" | string;
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

export const productsApi = {
  // Get all / search / filter products
  getProducts: async (params?: GetProductsParams): Promise<{ items: Product[]; total: number }> => {
    const res = await api.get<any>("/api/products", {
      params: params as Record<string, any>,
      skipAuth: true,
    });
    // Backend returns data as array or { items, total }
    if (Array.isArray(res.data)) {
      return { items: res.data, total: res.meta?.total || res.data.length };
    }
    if (res.data?.items) {
      return { items: res.data.items, total: res.data.total || res.data.items.length };
    }
    return { items: [], total: 0 };
  },

  // Get single product by id or slug
  getProduct: async (id: string): Promise<Product> => {
    const res = await api.get<Product>(`/api/products/${encodeURIComponent(id)}`, {
      skipAuth: true,
    });
    return res.data;
  },

  // Get flash deals
  getFlashDeals: async (): Promise<Product[]> => {
    const res = await api.get<Product[]>("/api/products/flash-deals", {
      skipAuth: true,
    });
    return Array.isArray(res.data) ? res.data : [];
  },

  // Get related products
  getRelatedProducts: async (id: string): Promise<Product[]> => {
    const res = await api.get<Product[]>(`/api/products/${encodeURIComponent(id)}/related`, {
      skipAuth: true,
    });
    return Array.isArray(res.data) ? res.data : [];
  },

  // Admin create product
  createProduct: async (productData: any): Promise<Product> => {
    const res = await api.post<Product>("/api/products", productData, {
      useAdminToken: true,
    });
    return res.data;
  },

  // Admin update product
  updateProduct: async (id: string, updates: any): Promise<Product> => {
    const res = await api.patch<Product>(`/api/products/${encodeURIComponent(id)}`, updates, {
      useAdminToken: true,
    });
    return res.data;
  },

  // Admin delete product
  deleteProduct: async (id: string): Promise<{ success: boolean }> => {
    const res = await api.delete(`/api/products/${encodeURIComponent(id)}`, {
      useAdminToken: true,
    });
    return res.data || { success: true };
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
