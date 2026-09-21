import { api } from "./client";

export interface UserProfile {
  id: string;
  phone: string;
  firstName?: string | null;
  lastName?: string | null;
  name?: string | null;
  email?: string | null;
  avatar?: string | null;
  role?: string;
  nationalCode?: string | null;
  birthDate?: string | null;
  walletBalance?: number;
  ordersCount?: number;
  totalSpent?: number;
  addressesCount?: number;
}

export interface UserAddress {
  id: string;
  title: string;
  province: string;
  city: string;
  fullAddress: string;
  postalCode?: string;
  plaque?: string;
  unit?: string;
  receiverName: string;
  receiverPhone: string;
  isDefault: boolean;
}

export interface WalletTransaction {
  id: string;
  amount: number;
  type: "DEPOSIT" | "WITHDRAWAL" | "PURCHASE" | "REFUND";
  typeFa?: string;
  description?: string;
  createdAt: string;
}

export interface WalletData {
  balance: number;
  balanceFormatted?: string;
  transactions?: WalletTransaction[];
}

export const userApi = {
  // Profile
  getProfile: async (): Promise<UserProfile> => {
    const res = await api.get<UserProfile>("/api/users/profile");
    return res.data;
  },

  updateProfile: async (data: Partial<UserProfile>): Promise<UserProfile> => {
    const res = await api.patch<UserProfile>("/api/users/profile", data);
    return res.data;
  },

  // Wallet
  getWallet: async (): Promise<WalletData> => {
    const res = await api.get<WalletData>("/api/wallet");
    return res.data;
  },

  topUpWallet: async (amount: number): Promise<{ paymentUrl?: string; authority?: string; message?: string }> => {
    const res = await api.post("/api/wallet/top-up", { amount });
    return res.data;
  },

  // Addresses
  getAddresses: async (): Promise<UserAddress[]> => {
    const res = await api.get<UserAddress[]>("/api/addresses");
    return Array.isArray(res.data) ? res.data : [];
  },

  createAddress: async (data: Omit<UserAddress, "id" | "isDefault"> & { isDefault?: boolean }): Promise<UserAddress> => {
    const res = await api.post<UserAddress>("/api/addresses", data);
    return res.data;
  },

  updateAddress: async (id: string, updates: Partial<UserAddress>): Promise<UserAddress> => {
    const res = await api.patch<UserAddress>(`/api/addresses/${encodeURIComponent(id)}`, updates);
    return res.data;
  },

  deleteAddress: async (id: string): Promise<{ success: boolean }> => {
    const res = await api.delete(`/api/addresses/${encodeURIComponent(id)}`);
    return res.data || { success: true };
  },

  setDefaultAddress: async (id: string): Promise<UserAddress> => {
    const res = await api.patch<UserAddress>(`/api/addresses/${encodeURIComponent(id)}/default`, {});
    return res.data;
  },

  // Favorites
  getFavorites: async (): Promise<any[]> => {
    const res = await api.get<any[]>("/api/favorites");
    return Array.isArray(res.data) ? res.data : [];
  },

  addFavorite: async (productId: string) => {
    const res = await api.post(`/api/favorites/${encodeURIComponent(productId)}`, {});
    return res.data;
  },

  removeFavorite: async (productId: string) => {
    const res = await api.delete(`/api/favorites/${encodeURIComponent(productId)}`);
    return res.data;
  },

  toggleFavorite: async (productId: string): Promise<{ isFavorite: boolean }> => {
    const res = await api.post<{ isFavorite: boolean }>(`/api/favorites/${encodeURIComponent(productId)}/toggle`, {});
    return res.data;
  },

  checkFavorite: async (productId: string): Promise<boolean> => {
    try {
      const res = await api.get<{ isFavorite: boolean }>(`/api/favorites/${encodeURIComponent(productId)}/check`);
      return !!res.data?.isFavorite;
    } catch {
      return false;
    }
  },
};
