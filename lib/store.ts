import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface CartItem {
  id: string;
  title: string;
  price: number;
  oldPrice?: number;
  discount?: string;
  image: string;
  color?: string;
  guarantee?: string;
  seller?: string;
  inStockText?: string;
  quantity: number;
}

interface CartStore {
  items: CartItem[];
  couponCode: string | null;
  couponDiscount: number;
  addItem: (item: Omit<CartItem, "quantity">, quantity?: number) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, delta: number) => void;
  setQuantity: (id: string, qty: number) => void;
  clearCart: () => void;
  applyCoupon: (code: string) => boolean;
  removeCoupon: () => void;
  getRawTotal: () => number;
  getDiscountTotal: () => number;
  getFinalTotal: () => number;
  getItemsCount: () => number;
}

const initialCartItems: CartItem[] = [
  {
    id: "tesco-th-5345",
    title: "هدفون بی سیم تسکو مدل TH 5345",
    price: 1650000,
    oldPrice: 1850000,
    discount: "۱۱٪",
    color: "مشکی",
    guarantee: "۱۸ ماهه",
    seller: "پویان افزار اکسپرس",
    inStockText: "موجود در انبار - ارسال فردا",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80",
    quantity: 1,
  },
  {
    id: "xiaomi-mechanical-kb",
    title: "کیبورد مکانیکال مخصوص بازی شیائومی",
    price: 2400000,
    color: "سفید خاکستری",
    guarantee: "۱۲ ماهه شرکتی",
    seller: "پویان افزار اکسپرس",
    inStockText: "موجود در انبار مرکزی",
    image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=600&q=80",
    quantity: 2,
  },
];

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: initialCartItems,
      couponCode: null,
      couponDiscount: 0,

      addItem: (item, quantity = 1) => {
        set((state) => {
          const existing = state.items.find((i) => i.id === item.id);
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.id === item.id ? { ...i, quantity: i.quantity + quantity } : i
              ),
            };
          }
          return {
            items: [...state.items, { ...item, quantity }],
          };
        });
      },

      removeItem: (id) => {
        set((state) => ({
          items: state.items.filter((i) => i.id !== id),
        }));
      },

      updateQuantity: (id, delta) => {
        set((state) => ({
          items: state.items
            .map((i) => {
              if (i.id === id) {
                const newQty = i.quantity + delta;
                return newQty > 0 ? { ...i, quantity: newQty } : null;
              }
              return i;
            })
            .filter((i): i is CartItem => i !== null),
        }));
      },

      setQuantity: (id, qty) => {
        set((state) => ({
          items: state.items
            .map((i) => (i.id === id ? (qty > 0 ? { ...i, quantity: qty } : null) : i))
            .filter((i): i is CartItem => i !== null),
        }));
      },

      clearCart: () => {
        set({ items: [], couponCode: null, couponDiscount: 0 });
      },

      applyCoupon: (code) => {
        const clean = code.trim().toLowerCase();
        if (clean === "off10" || clean === "takhfif" || clean === "wexun") {
          set({ couponCode: code, couponDiscount: 200000 });
          return true;
        }
        return false;
      },

      removeCoupon: () => {
        set({ couponCode: null, couponDiscount: 0 });
      },

      getRawTotal: () => {
        return get().items.reduce((sum, item) => sum + (item.oldPrice || item.price) * item.quantity, 0);
      },

      getDiscountTotal: () => {
        const productDiscount = get().items.reduce((sum, item) => {
          if (item.oldPrice && item.oldPrice > item.price) {
            return sum + (item.oldPrice - item.price) * item.quantity;
          }
          return sum;
        }, 0);
        return productDiscount + get().couponDiscount;
      },

      getFinalTotal: () => {
        const total = get().items.reduce((sum, item) => sum + item.price * item.quantity, 0);
        return Math.max(0, total - get().couponDiscount);
      },

      getItemsCount: () => {
        return get().items.reduce((sum, item) => sum + item.quantity, 0);
      },
    }),
    {
      name: "poyan_cart_store",
    }
  )
);

export interface FavoriteItem {
  id: string;
  title: string;
  price: number;
  priceString: string;
  image: string;
  brand?: string;
  rating?: number;
}

interface FavoritesStore {
  favorites: FavoriteItem[];
  toggleFavorite: (item: FavoriteItem) => void;
  removeFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
}

const initialFavorites: FavoriteItem[] = [
  {
    id: "redragon-gaming-kb",
    title: "کیبورد مکانیکال گیمینگ رداگون",
    price: 2650000,
    priceString: "۲,۶۵۰,۰۰۰",
    image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=600&q=80",
    brand: "رداگون",
  },
  {
    id: "sony-wh-1000xm4",
    title: "هدفون بلوتوثی سونی WH-1000XM4",
    price: 9800000,
    priceString: "۹,۸۰۰,۰۰۰",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80",
    brand: "سونی",
  },
];

export const useFavoritesStore = create<FavoritesStore>()(
  persist(
    (set, get) => ({
      favorites: initialFavorites,

      toggleFavorite: (item) => {
        set((state) => {
          const exists = state.favorites.some((f) => f.id === item.id);
          if (exists) {
            return { favorites: state.favorites.filter((f) => f.id !== item.id) };
          }
          return { favorites: [...state.favorites, item] };
        });
      },

      removeFavorite: (id) => {
        set((state) => ({
          favorites: state.favorites.filter((f) => f.id !== id),
        }));
      },

      isFavorite: (id) => {
        return get().favorites.some((f) => f.id === id);
      },
    }),
    {
      name: "poyan_favorites_store",
    }
  )
);

export interface AddressItem {
  id: string;
  title: string;
  province: string;
  city: string;
  fullAddress: string;
  postalCode: string;
  receiverName: string;
  receiverPhone: string;
  isDefault: boolean;
}

interface AddressStore {
  addresses: AddressItem[];
  addAddress: (address: Omit<AddressItem, "id">) => void;
  removeAddress: (id: string) => void;
  setDefaultAddress: (id: string) => void;
}

const initialAddresses: AddressItem[] = [
  {
    id: "addr-home",
    title: "منزل (پیش‌فرض)",
    province: "تهران",
    city: "تهران",
    fullAddress: "تهران، خیابان ولیعصر، تقاطع میرداماد، پلاک ۱۲، واحد ۴",
    postalCode: "۱۲۳۴۵۶۷۸۹۰",
    receiverName: "ایلیا محمدی",
    receiverPhone: "۰۹۱۲۳۴۵۶۷۸۹",
    isDefault: true,
  },
  {
    id: "addr-work",
    title: "محل کار",
    province: "تهران",
    city: "تهران",
    fullAddress: "تهران، شهرک غرب، بلوار دادمان، ساختمان آریا، طبقه ۳",
    postalCode: "۹۸۷۶۵۴۳۲۱۰",
    receiverName: "ایلیا محمدی",
    receiverPhone: "۰۹۱۲۳۴۵۶۷۸۹",
    isDefault: false,
  },
];

export const useAddressStore = create<AddressStore>()(
  persist(
    (set) => ({
      addresses: initialAddresses,

      addAddress: (address) => {
        const newId = `addr-${Date.now()}`;
        set((state) => ({
          addresses: [
            ...state.addresses.map((a) => (address.isDefault ? { ...a, isDefault: false } : a)),
            { ...address, id: newId },
          ],
        }));
      },

      removeAddress: (id) => {
        set((state) => ({
          addresses: state.addresses.filter((a) => a.id !== id),
        }));
      },

      setDefaultAddress: (id) => {
        set((state) => ({
          addresses: state.addresses.map((a) => ({
            ...a,
            isDefault: a.id === id,
          })),
        }));
      },
    }),
    {
      name: "poyan_address_store",
    }
  )
);
