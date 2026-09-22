import { api } from "./client";

export interface CreateOrderPayload {
  items: Array<{
    productId: string;
    quantity: number;
    color?: string;
    price?: number;
  }>;
  addressId?: string;
  shippingAddress?: {
    province: string;
    city: string;
    fullAddress: string;
    postalCode?: string;
    receiverName: string;
    receiverPhone: string;
    plaque?: string;
    unit?: string;
  };
  paymentMethod?: "gateway" | "wallet" | "cod" | "GATEWAY" | "WALLET" | "COD";
  couponCode?: string;
  customerName?: string;
  customerPhone?: string;
  customerEmail?: string;
  notes?: string;
}

export interface OrderItem {
  id?: string;
  productId: string;
  title: string;
  price: number;
  quantity: number;
  image?: string;
  color?: string;
}

export interface OrderDetail {
  id: string;
  trackingCode: string;
  customerName: string;
  customerPhone: string;
  customerEmail?: string | null;
  customerAddress?: string;
  shippingAddress?: any;
  amount: number;
  totalAmount?: number;
  discountAmount?: number;
  shippingAmount?: number;
  finalAmount: number;
  priceFormatted?: string;
  itemsCount?: number;
  paymentStatus: string;
  shippingStatus: string;
  paymentMethod?: string;
  paymentUrl?: string;
  authority?: string;
  statusFa?: string;
  paymentStatusFa?: string;
  shippingStatusFa?: string;
  date?: string;
  createdAt: string;
  notes?: string | null;
  items: OrderItem[];
}

export const ordersApi = {
  createOrder: async (payload: CreateOrderPayload) => {
    const res = await api.post<{
      success: boolean;
      orderId: string;
      trackingCode: string;
      amount: number;
      finalAmount: number;
      paymentStatus: string;
      shippingStatus: string;
      paymentMethod: string;
      paymentUrl?: string;
      authority?: string;
      message: string;
      order: OrderDetail;
    }>("/api/orders", payload);
    return res;
  },

  getMyOrders: async (): Promise<OrderDetail[]> => {
    const res = await api.get<any>("/api/orders/my-orders");
    if (Array.isArray(res.data)) return res.data;
    if (Array.isArray(res.data?.orders)) return res.data.orders;
    if (Array.isArray(res.orders)) return res.orders;
    return [];
  },

  trackOrder: async (trackingCode: string): Promise<OrderDetail> => {
    const clean = String(trackingCode).trim().replace(/^[#\s]+/, "");
    const res = await api.get<any>(`/api/orders/track/${encodeURIComponent(clean)}`, {
      skipAuth: true,
    });
    return res.data || res;
  },

  getOrder: async (idOrTrackingCode: string): Promise<OrderDetail> => {
    const clean = String(idOrTrackingCode).trim().replace(/^[#\s]+/, "");
    const res = await api.get<any>(`/api/orders/${encodeURIComponent(clean)}`);
    return res.data || res;
  },

  cancelOrder: async (id: string, reason?: string) => {
    const res = await api.post(`/api/orders/${encodeURIComponent(id)}/cancel`, { reason });
    return res.data;
  },
};
