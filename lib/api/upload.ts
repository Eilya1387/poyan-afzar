import { api } from "./client";

export interface UploadResult {
  url: string;
  filename?: string;
  originalName?: string;
  size?: number;
  mimetype?: string;
}

export const uploadApi = {
  uploadImage: async (file: File): Promise<UploadResult> => {
    const formData = new FormData();
    formData.append("file", file);
    const res = await api.post<UploadResult>("/api/upload/image", formData, { useAdminToken: true });
    return res.data;
  },

  uploadProductImage: async (file: File): Promise<UploadResult> => {
    const formData = new FormData();
    formData.append("file", file);
    const res = await api.post<UploadResult>("/api/upload/product", formData, { useAdminToken: true });
    return res.data;
  },

  uploadBrandImage: async (file: File): Promise<UploadResult> => {
    const formData = new FormData();
    formData.append("file", file);
    const res = await api.post<UploadResult>("/api/upload/brand", formData, { useAdminToken: true });
    return res.data;
  },

  uploadImages: async (files: File[], folder: string = "products"): Promise<UploadResult[]> => {
    const formData = new FormData();
    files.forEach((f) => formData.append("files", f));
    const res = await api.post<UploadResult[]>("/api/upload/images", formData, {
      params: { folder },
      useAdminToken: true,
    });
    return Array.isArray(res.data) ? res.data : [];
  },
};
