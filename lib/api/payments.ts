import { api } from "./client";

export interface CreatePaymentPayload {
  orderId?: string;
  amount?: number;
  gatewayProvider?: "MOCK" | "ZARINPAL";
  callbackUrl?: string;
  description?: string;
}

export interface PaymentVerifyResult {
  success: boolean;
  orderId?: string;
  trackingCode?: string;
  amount?: number;
  refId?: string;
  cardPan?: string;
  message?: string;
}

export const paymentsApi = {
  createPayment: async (payload: CreatePaymentPayload) => {
    const res = await api.post<{
      success: boolean;
      paymentUrl: string;
      authority: string;
      orderId?: string;
      amount?: number;
    }>("/api/payments/create", payload);
    return res;
  },

  verifyPayment: async (authority: string, status: string = "OK"): Promise<PaymentVerifyResult> => {
    const res = await api.get<PaymentVerifyResult>("/api/payments/verify", {
      params: { authority, status },
      skipAuth: true,
    });
    return (res.data || res) as unknown as PaymentVerifyResult;
  },

  verifyPaymentPost: async (authority: string, status: string = "OK"): Promise<PaymentVerifyResult> => {
    const res = await api.post<PaymentVerifyResult>(
      "/api/payments/verify",
      { authority, status },
      { skipAuth: true }
    );
    return (res.data || res) as unknown as PaymentVerifyResult;
  },
};
