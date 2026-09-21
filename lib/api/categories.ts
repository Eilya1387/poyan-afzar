import { api } from "./client";

export interface Category {
  id: string;
  name: string;
  nameEn?: string;
  slug?: string;
  icon?: string;
  description?: string;
  productCount?: number;
  image?: string;
  createdAt?: string;
}

export const categoriesApi = {
  getCategories: async (): Promise<Category[]> => {
    const res = await api.get<Category[]>("/api/categories", { skipAuth: true });
    return Array.isArray(res.data) ? res.data : [];
  },

  getCategory: async (id: string): Promise<Category> => {
    const res = await api.get<Category>(`/api/categories/${encodeURIComponent(id)}`, { skipAuth: true });
    return res.data;
  },

  createCategory: async (data: Partial<Category>): Promise<Category> => {
    const res = await api.post<Category>("/api/categories", data, { useAdminToken: true });
    return res.data;
  },

  updateCategory: async (id: string, updates: Partial<Category>): Promise<Category> => {
    const res = await api.patch<Category>(`/api/categories/${encodeURIComponent(id)}`, updates, { useAdminToken: true });
    return res.data;
  },

  deleteCategory: async (id: string): Promise<{ success: boolean }> => {
    const res = await api.delete(`/api/categories/${encodeURIComponent(id)}`, { useAdminToken: true });
    return res.data || { success: true };
  },
};
