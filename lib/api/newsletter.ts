import { api } from "./client";

export const newsletterApi = {
  subscribe: async (email: string): Promise<{ success: boolean; message: string }> => {
    const res = await api.post<{ success: boolean; message: string }>("/api/newsletter/subscribe", { email }, { skipAuth: true });
    return res.data || res;
  },

  unsubscribe: async (email: string, token?: string): Promise<{ success: boolean; message: string }> => {
    const res = await api.post<{ success: boolean; message: string }>("/api/newsletter/unsubscribe", { email, token });
    return res.data || res;
  },
};
