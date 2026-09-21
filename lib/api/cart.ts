import { api } from "./client";

export interface CartCalculationItem {
  productId: string;
  quantity: number;
  color?: string;
}

export interface CalculatedCartResult {
  items: Array<{
    productId: string;
    title: string;
    enTitle?: string;
    image?: string;
    unitPrice: number;
    unitOriginalPrice?: number;
    requestedQuantity: number;
    effectiveQuantity: number;
    availableStock: number;
    inStock: boolean;
    itemDiscount: number;
    lineTotal: number;
    hasStockIssue: boolean;
  }>;
  totalItems: number;
  rawTotal: number;
  productDiscountTotal: number;
  subtotal: number;
  couponCode?: string | null;
  couponDiscount: number;
  couponDetails?: {
    valid: boolean;
    couponId?: string;
    code: string;
    title?: string;
    discountAmount: number;
    percent?: number;
    type?: string;
    message?: string;
  };
  couponError?: string | null;
  shippingFee: number;
  freeShippingThreshold: number;
  finalAmount: number;
  canCheckout: boolean;
}

export interface CouponValidationResult {
  valid: boolean;
  code: string;
  title?: string;
  discountAmount: number;
  percent?: number;
  type?: string;
  message?: string;
}

export const cartApi = {
  calculate: async (
    items: CartCalculationItem[],
    couponCode?: string | null
  ): Promise<CalculatedCartResult> => {
    const payload: { items: CartCalculationItem[]; couponCode?: string } = { items };
    if (couponCode) {
      payload.couponCode = couponCode;
    }
    const res = await api.post<CalculatedCartResult>("/api/cart/calculate", payload);
    return res.data;
  },

  validateCoupon: async (
    code: string,
    subtotal?: number,
    items?: Array<{ productId: string; quantity: number }>
  ): Promise<CouponValidationResult> => {
    const payload: any = { code };
    if (subtotal !== undefined) payload.subtotal = subtotal;
    if (items) payload.items = items;

    const res = await api.post<CouponValidationResult>("/api/coupons/validate", payload);
    return res.data;
  },
};
