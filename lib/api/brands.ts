import { api } from "./client";

export interface Brand {
  id: string;
  name: string;
  nameFa: string;
  slug?: string;
  logo?: string;
  country?: string;
  description?: string;
  isActive?: boolean;
  productCount?: number;
}

export const brandsApi = {
  getBrands: async (): Promise<Brand[]> => {
    const res = await api.get<Brand[]>("/api/brands", { skipAuth: true });
    return Array.isArray(res.data) ? res.data : [];
  },

  getBrand: async (id: string): Promise<Brand> => {
    const res = await api.get<Brand>(`/api/brands/${encodeURIComponent(id)}`, { skipAuth: true });
    return res.data;
  },

  createBrand: async (data: Partial<Brand>): Promise<Brand> => {
    const res = await api.post<Brand>("/api/brands", data, { useAdminToken: true });
    return res.data;
  },

  updateBrand: async (id: string, updates: Partial<Brand>): Promise<Brand> => {
    const res = await api.patch<Brand>(`/api/brands/${encodeURIComponent(id)}`, updates, { useAdminToken: true });
    return res.data;
  },

  deleteBrand: async (id: string): Promise<{ success: boolean }> => {
    const res = await api.delete(`/api/brands/${encodeURIComponent(id)}`, { useAdminToken: true });
    return res.data || { success: true };
  },
};
