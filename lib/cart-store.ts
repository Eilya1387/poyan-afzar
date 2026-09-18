import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { CartItem, Product } from "@/types/product";
import { useState, useEffect } from "react";

interface CartStore {
  items: CartItem[];
  isOpen: boolean;
  couponCode: string | null;
  couponDiscount: number;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: string | number) => void;
  updateQuantity: (productId: string | number, quantity: number) => void;
  clearCart: () => void;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
  getTotalItems: () => number;
  getRawProductTotal: () => number;
  getProductDiscount: () => number;
  getTotalPrice: () => number;
  getItemQuantity: (productId: string | number) => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [
        // Items matching Figma demo
        {
          product: {
            id: "tsco-th5345",
            brand: "TSCO",
            brandFa: "تسکو",
            title: "هدفون بی سیم تسکو مدل TH 5345",
            category: "headphones",
            price: 1650000,
            originalPrice: 1850000,
            color: "مشکی",
            warranty: "۱۸ ماهه",
            seller: "تک‌مارکت اکسپرس",
            deliveryText: "موجود در انبار - ارسال فردا",
            inStock: true,
            image: "/images/products/asus-rog-4070ti.jpg",
          },
          quantity: 1,
        },
        {
          product: {
            id: "xiaomi-keyboard-mech",
            brand: "Xiaomi",
            brandFa: "شیائومی",
            title: "کیبورد مکانیکال مخصوص بازی شیائومی",
            category: "keyboard",
            price: 2400000,
            color: "سفید خاکستری",
            warranty: "۱۲ ماهه شرکتی",
            seller: "تک‌مارکت اکسپرس",
            deliveryText: "موجود در انبار مرکزی",
            inStock: true,
            image: "/images/products/msi-4060ti.jpg",
          },
          quantity: 2,
        },
      ],
      isOpen: false,
      couponCode: null,
      couponDiscount: 0,

      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),

      addItem: (product: Product, quantity: number = 1) => {
        set((state) => {
          const existingIndex = state.items.findIndex(
            (item) => String(item.product.id) === String(product.id)
          );

          if (existingIndex > -1) {
            const newItems = [...state.items];
            newItems[existingIndex] = {
              ...newItems[existingIndex],
              quantity: newItems[existingIndex].quantity + quantity,
            };
            return { items: newItems };
          } else {
            return {
              items: [...state.items, { product, quantity }],
            };
          }
        });
      },

      removeItem: (productId: string | number) => {
        set((state) => ({
          items: state.items.filter(
            (item) => String(item.product.id) !== String(productId)
          ),
        }));
      },

      updateQuantity: (productId: string | number, quantity: number) => {
        if (quantity <= 0) {
          get().removeItem(productId);
          return;
        }

        set((state) => ({
          items: state.items.map((item) =>
            String(item.product.id) === String(productId)
              ? { ...item, quantity }
              : item
          ),
        }));
      },

      clearCart: () => {
        set({ items: [], couponCode: null, couponDiscount: 0 });
      },

      applyCoupon: (code: string) => {
        const trimmed = code.trim().toUpperCase();
        if (!trimmed) {
          return { success: false, message: "لطفاً کد تخفیف را وارد کنید." };
        }
        if (trimmed === "OFF20" || trimmed === "TAKMARKET" || trimmed === "POYAN" || trimmed === "DISCOUNT") {
          set({ couponCode: trimmed, couponDiscount: 100000 });
          return { success: true, message: "کد تخفیف با موفقیت اعمال شد." };
        }
        // General promotional code
        set({ couponCode: trimmed, couponDiscount: 50000 });
        return { success: true, message: `کد تخفیف ${trimmed} اعمال شد.` };
      },

      removeCoupon: () => {
        set({ couponCode: null, couponDiscount: 0 });
      },

      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },

      getRawProductTotal: () => {
        return get().items.reduce((total, item) => {
          const itemBasePrice = item.product.originalPrice || item.product.price;
          return total + itemBasePrice * item.quantity;
        }, 0);
      },

      getProductDiscount: () => {
        const discountFromProducts = get().items.reduce((total, item) => {
          if (item.product.originalPrice && item.product.originalPrice > item.product.price) {
            return total + (item.product.originalPrice - item.product.price) * item.quantity;
          }
          return total;
        }, 0);
        return discountFromProducts + get().couponDiscount;
      },

      getTotalPrice: () => {
        const total = get().items.reduce(
          (sum, item) => sum + item.product.price * item.quantity,
          0
        );
        return Math.max(0, total - get().couponDiscount);
      },

      getItemQuantity: (productId: string | number) => {
        const item = get().items.find(
          (item) => String(item.product.id) === String(productId)
        );
        return item ? item.quantity : 0;
      },
    }),
    {
      name: "poyan-afzar-cart-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

/**
 * Custom hook to safely access cart count on client-side without Next.js SSR hydration mismatch
 */
export function useCartCount() {
  const [mounted, setMounted] = useState(false);
  const items = useCartStore((state) => state.items);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return 3; // fallback matching initial server state
  }

  return items.reduce((total, item) => total + item.quantity, 0);
}
