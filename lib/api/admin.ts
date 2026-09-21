import { api } from "./client";
import {
  AdminOrder,
  AdminProduct,
  AdminCustomer,
  AdminDiscount,
  AdminReview,
  SalesDayData,
} from "@/types/admin";

export interface AdminOverviewData {
  kpis: {
    todaySales: number;
    todaySalesFormatted?: string;
    todayOrders: number;
    totalProducts: number;
    lowStockCount: number;
    pendingReviewsCount: number;
    activeUsersCount: number;
  };
  salesChart: SalesDayData[];
  recentOrders: AdminOrder[];
  lowStockProducts: any[];
  pendingReviews: any[];
}

export interface AdminInventoryResponse {
  products: AdminProduct[];
  stats: {
    totalItems: number;
    inStockCount: number;
    lowStockCount: number;
    outOfStockCount: number;
    totalInventoryValue: number;
    totalInventoryValueFormatted?: string;
  };
  total: number;
  page?: number;
  limit?: number;
}

export interface AdminOrdersResponse {
  orders: AdminOrder[];
  total: number;
  page?: number;
  limit?: number;
}

export interface AdminCustomersResponse {
  customers: AdminCustomer[];
  total: number;
}

export interface AdminReviewsResponse {
  reviews: AdminReview[];
  counts: {
    all: number;
    pending: number;
    approved: number;
    rejected: number;
  };
  total: number;
}

export interface AdminQaItem {
  id: string;
  productId: string;
  productTitle?: string;
  question: string;
  answer?: string | null;
  author?: string;
  userName?: string;
  userPhone?: string;
  isPublished: boolean;
  published?: boolean;
  createdAt: string;
}

export interface AdminQaResponse {
  questions: AdminQaItem[];
  total: number;
}

export interface AdminSubscriber {
  id: string;
  email: string;
  isActive: boolean;
  createdAt: string;
}

export interface AdminReportsData {
  totalRevenue: number;
  totalRevenueFormatted?: string;
  totalOrdersCount: number;
  avgOrderValue: number;
  avgOrderValueFormatted?: string;
  categorySales: Array<{ name: string; value: number; count: number }>;
  paymentMethods: Array<{ method: string; count: number; total: number }>;
  topSellingProducts: Array<{ id: string; title: string; soldCount: number; revenue: number }>;
}

export const adminApi = {
  // Overview & Analytics
  getOverview: async (): Promise<AdminOverviewData> => {
    const res = await api.get<AdminOverviewData>("/api/admin/analytics/overview", { useAdminToken: true });
    return res.data;
  },

  getKpis: async () => {
    const res = await api.get("/api/admin/analytics/kpis", { useAdminToken: true });
    return res.data;
  },

  getSalesChart: async (days: number = 7): Promise<SalesDayData[]> => {
    const res = await api.get<SalesDayData[]>("/api/admin/analytics/sales-chart", {
      params: { days },
      useAdminToken: true,
    });
    return Array.isArray(res.data) ? res.data : [];
  },

  getRecentOrders: async (): Promise<AdminOrder[]> => {
    const res = await api.get<AdminOrder[]>("/api/admin/analytics/recent-orders", { useAdminToken: true });
    return Array.isArray(res.data) ? res.data : [];
  },

  // Inventory
  getInventory: async (params?: { page?: number; limit?: number; search?: string; status?: string }): Promise<AdminInventoryResponse> => {
    const res = await api.get<AdminInventoryResponse>("/api/admin/inventory", {
      params,
      useAdminToken: true,
    });
    return res.data;
  },

  getInventoryAlerts: async () => {
    const res = await api.get("/api/admin/inventory/alerts", { useAdminToken: true });
    return res.data;
  },

  updateStock: async (
    id: string,
    payload: { stock?: number; delta?: number; minStockThreshold?: number }
  ) => {
    const res = await api.patch(`/api/admin/inventory/${encodeURIComponent(id)}/stock`, payload, {
      useAdminToken: true,
    });
    return res.data;
  },

  // Orders
  getOrders: async (params?: { page?: number; limit?: number; status?: string; search?: string }): Promise<AdminOrdersResponse> => {
    const res = await api.get<AdminOrdersResponse>("/api/admin/orders", {
      params,
      useAdminToken: true,
    });
    return res.data;
  },

  getOrder: async (id: string): Promise<AdminOrder> => {
    const res = await api.get<AdminOrder>(`/api/admin/orders/${encodeURIComponent(id)}`, { useAdminToken: true });
    return res.data;
  },

  createOrder: async (data: any): Promise<AdminOrder> => {
    const res = await api.post<AdminOrder>("/api/admin/orders", data, { useAdminToken: true });
    return res.data;
  },

  updateOrderStatus: async (
    id: string,
    payload: {
      paymentStatus?: string;
      shippingStatus?: string;
      notes?: string;
      trackingCode?: string;
    }
  ) => {
    const res = await api.patch(`/api/admin/orders/${encodeURIComponent(id)}/status`, payload, {
      useAdminToken: true,
    });
    return res.data;
  },

  updateOrder: async (id: string, updates: any) => {
    const res = await api.patch(`/api/admin/orders/${encodeURIComponent(id)}`, updates, {
      useAdminToken: true,
    });
    return res.data;
  },

  deleteOrder: async (id: string) => {
    const res = await api.delete(`/api/admin/orders/${encodeURIComponent(id)}`, { useAdminToken: true });
    return res.data || { success: true };
  },

  // Customers
  getCustomers: async (params?: { page?: number; limit?: number; search?: string }): Promise<AdminCustomersResponse> => {
    const res = await api.get<AdminCustomersResponse>("/api/admin/customers", {
      params,
      useAdminToken: true,
    });
    return res.data;
  },

  getCustomer: async (id: string): Promise<AdminCustomer> => {
    const res = await api.get<AdminCustomer>(`/api/admin/customers/${encodeURIComponent(id)}`, { useAdminToken: true });
    return res.data;
  },

  createCustomer: async (payload: any): Promise<AdminCustomer> => {
    const res = await api.post<AdminCustomer>("/api/admin/customers", payload, { useAdminToken: true });
    return res.data;
  },

  updateCustomerStatus: async (id: string, isActive: boolean) => {
    const res = await api.patch(`/api/admin/customers/${encodeURIComponent(id)}/status`, { isActive }, {
      useAdminToken: true,
    });
    return res.data;
  },

  // Discounts
  getDiscounts: async (): Promise<AdminDiscount[]> => {
    const res = await api.get<AdminDiscount[]>("/api/discounts", { useAdminToken: true });
    return Array.isArray(res.data) ? res.data : [];
  },

  createDiscount: async (data: any): Promise<AdminDiscount> => {
    const res = await api.post<AdminDiscount>("/api/discounts", data, { useAdminToken: true });
    return res.data;
  },

  updateDiscount: async (id: string, updates: any): Promise<AdminDiscount> => {
    const res = await api.patch<AdminDiscount>(`/api/discounts/${encodeURIComponent(id)}`, updates, {
      useAdminToken: true,
    });
    return res.data;
  },

  toggleDiscount: async (id: string): Promise<AdminDiscount> => {
    const res = await api.patch<AdminDiscount>(`/api/discounts/${encodeURIComponent(id)}/toggle`, {}, {
      useAdminToken: true,
    });
    return res.data;
  },

  deleteDiscount: async (id: string) => {
    const res = await api.delete(`/api/discounts/${encodeURIComponent(id)}`, { useAdminToken: true });
    return res.data || { success: true };
  },

  // Reviews
  getReviews: async (params?: { page?: number; limit?: number; status?: string }): Promise<AdminReviewsResponse> => {
    const res = await api.get<AdminReviewsResponse>("/api/admin/reviews", {
      params,
      useAdminToken: true,
    });
    return res.data;
  },

  approveReview: async (id: string) => {
    const res = await api.patch(`/api/admin/reviews/${encodeURIComponent(id)}/approve`, {}, {
      useAdminToken: true,
    });
    return res.data;
  },

  rejectReview: async (id: string) => {
    const res = await api.patch(`/api/admin/reviews/${encodeURIComponent(id)}/reject`, {}, {
      useAdminToken: true,
    });
    return res.data;
  },

  deleteReview: async (id: string) => {
    const res = await api.delete(`/api/admin/reviews/${encodeURIComponent(id)}`, { useAdminToken: true });
    return res.data || { success: true };
  },

  // QA
  getQa: async (params?: { page?: number; limit?: number }): Promise<AdminQaResponse> => {
    const res = await api.get<AdminQaResponse>("/api/admin/qa", {
      params,
      useAdminToken: true,
    });
    return res.data;
  },

  answerQa: async (id: string, answer: string) => {
    const res = await api.patch(`/api/admin/qa/${encodeURIComponent(id)}/answer`, { answer }, {
      useAdminToken: true,
    });
    return res.data;
  },

  publishQa: async (id: string, isPublished: boolean) => {
    const res = await api.patch(`/api/admin/qa/${encodeURIComponent(id)}/publish`, { isPublished }, {
      useAdminToken: true,
    });
    return res.data;
  },

  deleteQa: async (id: string) => {
    const res = await api.delete(`/api/admin/qa/${encodeURIComponent(id)}`, { useAdminToken: true });
    return res.data || { success: true };
  },

  // Newsletter
  getNewsletterSubscribers: async (): Promise<{ subscribers: AdminSubscriber[]; total: number }> => {
    const res = await api.get<{ subscribers: AdminSubscriber[]; total: number }>("/api/admin/newsletter/subscribers", {
      useAdminToken: true,
    });
    return res.data;
  },

  deleteNewsletterSubscriber: async (id: string) => {
    const res = await api.delete(`/api/admin/newsletter/subscribers/${encodeURIComponent(id)}`, {
      useAdminToken: true,
    });
    return res.data || { success: true };
  },

  // Reports
  getReportsAnalytics: async (): Promise<AdminReportsData> => {
    const res = await api.get<AdminReportsData>("/api/admin/reports/analytics", { useAdminToken: true });
    return res.data;
  },
};
