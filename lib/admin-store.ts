"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { getPersianFullDate, getPersianTodayDate } from "@/lib/formatters";
import {
  AdminUser,
  AdminOrder,
  AdminProduct,
  AdminCategory,
  AdminBrand,
  AdminCustomer,
  AdminDiscount,
  AdminReview,
  SalesDayData,
  AdminTab,
  PaymentStatus,
  ShippingStatus,
} from "@/types/admin";
import { authApi } from "./auth/better-auth";
import { adminApi } from "./api/admin";
import { productsApi } from "./api/products";
import { categoriesApi } from "./api/categories";
import { brandsApi } from "./api/brands";
import { clearAdminTokens } from "./api/config";

// Initial Demo Products
const defaultProducts: AdminProduct[] = [];

// Initial Demo Categories
const defaultCategories: AdminCategory[] = [
  { id: "gpu", name: "کارت گرافیک", nameEn: "Graphics Card", icon: "CircuitBoard", description: "کارت‌های گرافیک گیمینگ و رندرینگ انویدیا و ای‌ام‌دی", productCount: 6 },
  { id: "cpu", name: "پردازنده", nameEn: "Processor (CPU)", icon: "Cpu", description: "پردازنده‌های نسل جدید اینتل Core و ای‌ام‌دی Ryzen", productCount: 8 },
  { id: "motherboard", name: "مادربرد", nameEn: "Motherboard", icon: "Layers", description: "مادربردهای حرفه‌ای ایسوس، گیگابایت و ام‌اس‌آی", productCount: 5 },
  { id: "ram", name: "رم کامپیوتر", nameEn: "RAM Memory", icon: "Server", description: "رم‌های پرسرعت DDR4 و DDR5 گیمینگ", productCount: 9 },
  { id: "ssd", name: "حافظه اس‌اس‌دی", nameEn: "SSD & Storage", icon: "HardDrive", description: "حافظه‌های پرسرعت NVMe M.2 و SATA", productCount: 11 },
  { id: "laptop", name: "لپ‌تاپ", nameEn: "Laptops", icon: "Laptop", description: "انواع لپ‌تاپ‌های گیمینگ، مهندسی، اداری و مک‌بوک", productCount: 4 },
  { id: "mobile", name: "گوشی موبایل", nameEn: "Smartphones", icon: "Smartphone", description: "گوشی‌های پرچمدار و میان‌رده سامسونگ، اپل و شیائومی", productCount: 7 },
  { id: "audio", name: "صوتی و هدفون", nameEn: "Audio & Headphones", icon: "Headphones", description: "هدفون‌های بی‌سیم، هندزفری و اسپیکرهای حرفه‌ای", productCount: 14 },
  { id: "accessories", name: "لوازم جانبی", nameEn: "Accessories", icon: "MousePointer", description: "ماوس، کیبورد، پد ماوس، کابل و تبدیل‌های اورجینال", productCount: 20 },
];

// Initial Demo Brands
const defaultBrands: AdminBrand[] = [
  { id: "asus", name: "ASUS", nameFa: "ایسوس", logo: "/brands/asus.svg", country: "تایوان", description: "بزرگترین تولیدکننده مادربرد و قطعات گیمینگ ROG در دنیا", isActive: true, productCount: 8 },
  { id: "msi", name: "MSI", nameFa: "ام‌اس‌آی", logo: "/brands/msi.svg", country: "تایوان", description: "تولیدکننده معتبر لپ‌تاپ و کارت گرافیک‌های تخصصی گیمینگ", isActive: true, productCount: 5 },
  { id: "gigabyte", name: "GIGABYTE", nameFa: "گیگابایت", logo: "/brands/gigabyte.svg", country: "تایوان", description: "برند پیشرو در تولید قطعات سخت‌افزاری باکیفیت و سرور", isActive: true, productCount: 4 },
  { id: "nvidia", name: "NVIDIA", nameFa: "ان‌ویدیا", logo: "/brands/nvidia.svg", country: "آمریکا", description: "رهبر جهانی تراشه‌های هوش مصنوعی و کارت‌های گرافیک GeForce", isActive: true, productCount: 3 },
  { id: "apple", name: "Apple", nameFa: "اپل", logo: "/brands/apple.svg", country: "آمریکا", description: "تولیدکننده مک‌بوک، آیفون، آی‌پد و اکوسیستم اختصاصی اپل", isActive: true, productCount: 6 },
  { id: "samsung", name: "Samsung", nameFa: "سامسونگ", logo: "/brands/samsung.svg", country: "کره جنوبی", description: "غول فناوری و بزرگترین تولیدکننده گوشی و نمایشگر در جهان", isActive: true, productCount: 7 },
  { id: "sony", name: "Sony", nameFa: "سونی", logo: "/brands/sony.svg", country: "ژاپن", description: "نام‌آشناترین برند در زمینه تجهیزات صوتی و کنسول‌های بازی پلی‌استیشن", isActive: true, productCount: 4 },
  { id: "intel", name: "Intel", nameFa: "اینتل", logo: "/brands/intel.svg", country: "آمریکا", description: "تولیدکننده پردازنده‌های دسکتاپ و سرور سری Core و Xeon", isActive: true, productCount: 5 },
  { id: "amd", name: "AMD", nameFa: "ای‌ام‌دی", logo: "/brands/amd.svg", country: "آمریکا", description: "سازنده پردازنده‌های Ryzen و کارت‌های گرافیک Radeon", isActive: true, productCount: 3 },
];

// Initial Demo Orders (Matching Figma screenshot exactly + extras)
const defaultOrders: AdminOrder[] = [];

// Initial Demo Customers
const defaultCustomers: AdminCustomer[] = [];

// Initial Demo Discounts
const defaultDiscounts: AdminDiscount[] = [];

// Initial Demo Reviews (Matching Figma screenshot exactly + extras)
const defaultReviews: AdminReview[] = [];

// Initial 7-day Sales Data matching screenshot
const defaultSalesChart: SalesDayData[] = [];

interface AdminState {
  // Auth
  isAuthenticated: boolean;
  adminUser: AdminUser | null;
  activeTab: AdminTab;
  searchQuery: string;

  // Data Collections
  products: AdminProduct[];
  categories: AdminCategory[];
  brands: AdminBrand[];
  orders: AdminOrder[];
  customers: AdminCustomer[];
  discounts: AdminDiscount[];
  reviews: AdminReview[];
  salesChart: SalesDayData[];

  // Auth Actions
  login: (username: string, pass: string) => Promise<{ success: boolean; message?: string }>;
  logout: () => void;
  setActiveTab: (tab: AdminTab) => void;
  setSearchQuery: (query: string) => void;

  // Product Actions
  addProduct: (product: Omit<AdminProduct, "id" | "createdAt">) => AdminProduct;
  updateProduct: (id: string, updates: Partial<AdminProduct>) => void;
  deleteProduct: (id: string) => void;
  updateStock: (id: string, newStock: number) => void;
  quickAdjustStock: (id: string, delta: number) => void;

  // Category Actions
  addCategory: (category: Omit<AdminCategory, "id">) => void;
  updateCategory: (id: string, updates: Partial<AdminCategory>) => void;
  deleteCategory: (id: string) => void;

  // Brand Actions
  addBrand: (brand: Omit<AdminBrand, "id">) => void;
  updateBrand: (id: string, updates: Partial<AdminBrand>) => void;
  deleteBrand: (id: string) => void;

  // Order Actions
  addOrder: (order: Omit<AdminOrder, "id" | "date" | "createdAt">) => AdminOrder;
  updateOrderStatus: (
    id: string,
    status: { paymentStatus?: PaymentStatus; shippingStatus?: ShippingStatus; notes?: string }
  ) => void;
  deleteOrder: (id: string) => void;

  // Customer Actions
  addCustomer: (customer: Omit<AdminCustomer, "id" | "registerDate" | "ordersCount" | "totalSpent">) => void;
  updateCustomer: (id: string, updates: Partial<AdminCustomer>) => void;
  toggleCustomerStatus: (id: string) => void;

  // Discount Actions
  addDiscount: (discount: Omit<AdminDiscount, "id" | "usageCount">) => void;
  updateDiscount: (id: string, updates: Partial<AdminDiscount>) => void;
  toggleDiscount: (id: string) => void;
  deleteDiscount: (id: string) => void;
  applyDiscountToProduct: (
    productId: string,
    discountConfig: {
      type: "percentage" | "fixed";
      percent: number;
      amount: number;
      startDate: string;
      endDate: string;
      title?: string;
    }
  ) => void;

  // Review Actions
  approveReview: (id: string) => void;
  rejectReview: (id: string) => void;
  deleteReview: (id: string) => void;

  // Sync with Backend
  fetchAdminData: () => Promise<void>;

  // Reset to default Demo
  resetToDefaults: () => void;
}

export const useAdminStore = create<AdminState>()(
  persist(
    (set, get) => ({
      // Default Auth state - defaults to false, but ready with admin/admin
      isAuthenticated: false,
      adminUser: null,
      activeTab: "dashboard",
      searchQuery: "",

      products: defaultProducts,
      categories: defaultCategories,
      brands: defaultBrands,
      orders: defaultOrders,
      customers: defaultCustomers,
      discounts: defaultDiscounts,
      reviews: defaultReviews,
      salesChart: defaultSalesChart,

      login: async (username: string, pass: string) => {
        const trimmedUser = username.trim();
        const trimmedPass = pass.trim();

        try {
          const res = await authApi.adminLogin({ username: trimmedUser, password: trimmedPass });
          if (!res?.accessToken) {
            return { success: false, message: "توکن دسترسی دریافت نشد" };
          }
          const u = res.user;
          const user: AdminUser = {
            username: (u as any).username || u.phone || trimmedUser,
            name: u.name || "مدیر سیستم",
            role: (u.role as any) || "مدیر ارشد",
            avatar: u.avatar || "/images/admin-avatar.webp",
          };
          set({
            isAuthenticated: true,
            adminUser: user,
          });
          await get().fetchAdminData();
          return { success: true };
        } catch (err: any) {
          return {
            success: false,
            message: err?.message || "نام کاربری یا رمز عبور اشتباه است",
          };
        }
      },

      logout: () => {
        clearAdminTokens();
        set({
          isAuthenticated: false,
          adminUser: null,
          activeTab: "dashboard",
          products: [],
          orders: [],
          customers: [],
          discounts: [],
          reviews: [],
          salesChart: [],
        });
      },

      fetchAdminData: async () => {
        const token = typeof window !== "undefined" ? localStorage.getItem("poyan_admin_token") : null;
        if (!token) {
          return;
        }

        try {
          const [overview, inv, ords, custs, discs, revs, cats, brnds] = await Promise.allSettled([
            adminApi.getOverview(),
            adminApi.getInventory(),
            adminApi.getOrders(),
            adminApi.getCustomers(),
            adminApi.getDiscounts(),
            adminApi.getReviews(),
            categoriesApi.getCategories(),
            brandsApi.getBrands(),
          ]);

          if (overview.status === "fulfilled" && overview.value?.salesChart) {
            set({ salesChart: overview.value.salesChart });
          }
          if (inv.status === "fulfilled" && inv.value?.products) {
            set({ products: inv.value.products });
          }
          if (ords.status === "fulfilled" && ords.value?.orders) {
            set({ orders: ords.value.orders });
          }
          if (custs.status === "fulfilled" && custs.value?.customers) {
            set({ customers: custs.value.customers });
          }
          if (discs.status === "fulfilled" && Array.isArray(discs.value)) {
            set({ discounts: discs.value });
          }
          if (revs.status === "fulfilled" && revs.value?.reviews) {
            set({ reviews: revs.value.reviews });
          }
          if (cats.status === "fulfilled" && Array.isArray(cats.value)) {
            set({ categories: cats.value as any });
          }
          if (brnds.status === "fulfilled" && Array.isArray(brnds.value)) {
            set({ brands: brnds.value as any });
          }
        } catch (err) {
          console.error("Failed to fetch admin data from backend:", err);
        }
      },

      setActiveTab: (tab) => set({ activeTab: tab }),
      setSearchQuery: (query) => set({ searchQuery: query }),

      // Product Actions
      addProduct: (productData) => {
        const id = `prod-${Date.now().toString(36)}`;
        const now = new Intl.DateTimeFormat("fa-IR").format(new Date());
        const newProduct: AdminProduct = {
          ...productData,
          id,
          createdAt: now,
          inStock: productData.stock > 0,
        };

        set((state) => ({
          products: [newProduct, ...state.products],
          categories: state.categories.map((c) =>
            c.id === productData.category
              ? { ...c, productCount: (c.productCount || 0) + 1 }
              : c
          ),
        }));
        return newProduct;
      },

      updateProduct: (id, updates) => {
        set((state) => ({
          products: state.products.map((p) => {
            if (p.id === id) {
              const updated = { ...p, ...updates };
              if (updates.stock !== undefined) {
                updated.inStock = updates.stock > 0;
              }
              return updated;
            }
            return p;
          }),
        }));
      },

      deleteProduct: (id) => {
        set((state) => ({
          products: state.products.filter((p) => p.id !== id),
        }));
      },

      updateStock: (id, newStock) => {
        const stockVal = Math.max(0, newStock);
        set((state) => ({
          products: state.products.map((p) =>
            p.id === id ? { ...p, stock: stockVal, inStock: stockVal > 0 } : p
          ),
        }));
      },

      quickAdjustStock: (id, delta) => {
        set((state) => ({
          products: state.products.map((p) => {
            if (p.id === id) {
              const newStock = Math.max(0, p.stock + delta);
              return { ...p, stock: newStock, inStock: newStock > 0 };
            }
            return p;
          }),
        }));
      },

      // Category Actions
      addCategory: (categoryData) => {
        const id = categoryData.nameEn.toLowerCase().replace(/\s+/g, "-") || `cat-${Date.now().toString(36)}`;
        const newCategory: AdminCategory = {
          ...categoryData,
          id,
          productCount: 0,
        };
        set((state) => ({
          categories: [...state.categories, newCategory],
        }));
      },

      updateCategory: (id, updates) => {
        set((state) => ({
          categories: state.categories.map((c) =>
            c.id === id ? { ...c, ...updates } : c
          ),
        }));
      },

      deleteCategory: (id) => {
        set((state) => ({
          categories: state.categories.filter((c) => c.id !== id),
        }));
      },

      // Brand Actions
      addBrand: (brandData) => {
        const id = brandData.name.toLowerCase().replace(/\s+/g, "-") || `brand-${Date.now().toString(36)}`;
        const newBrand: AdminBrand = {
          ...brandData,
          id,
          productCount: 0,
        };
        set((state) => ({
          brands: [...state.brands, newBrand],
        }));
      },

      updateBrand: (id, updates) => {
        set((state) => ({
          brands: state.brands.map((b) =>
            b.id === id ? { ...b, ...updates } : b
          ),
        }));
      },

      deleteBrand: (id) => {
        set((state) => ({
          brands: state.brands.filter((b) => b.id !== id),
        }));
      },

      // Order Actions
      addOrder: (orderData) => {
        const randomNum = Math.floor(1000 + Math.random() * 9000);
        const orderId = `#PA-${randomNum}`;
        const persianDate = getPersianFullDate(new Date());

        const newOrder: AdminOrder = {
          ...orderData,
          id: orderId,
          date: persianDate,
          createdAt: new Date().toISOString(),
        };

        set((state) => ({
          orders: [newOrder, ...state.orders],
        }));
        return newOrder;
      },

      updateOrderStatus: (id, { paymentStatus, shippingStatus, notes }) => {
        set((state) => ({
          orders: state.orders.map((o) => {
            if (o.id === id) {
              return {
                ...o,
                ...(paymentStatus ? { paymentStatus } : {}),
                ...(shippingStatus ? { shippingStatus } : {}),
                ...(notes !== undefined ? { notes } : {}),
              };
            }
            return o;
          }),
        }));
      },

      deleteOrder: (id) => {
        set((state) => ({
          orders: state.orders.filter((o) => o.id !== id),
        }));
      },

      // Customer Actions
      addCustomer: (customerData) => {
        const randomId = `USR-${Math.floor(1000 + Math.random() * 9000)}`;
        const persianDate = getPersianTodayDate(new Date());
        const newCustomer: AdminCustomer = {
          ...customerData,
          id: randomId,
          ordersCount: 0,
          totalSpent: 0,
          registerDate: persianDate,
        };
        set((state) => ({
          customers: [newCustomer, ...state.customers],
        }));
      },

      updateCustomer: (id, updates) => {
        set((state) => ({
          customers: state.customers.map((c) =>
            c.id === id ? { ...c, ...updates } : c
          ),
        }));
      },

      toggleCustomerStatus: (id) => {
        set((state) => ({
          customers: state.customers.map((c) =>
            c.id === id
              ? { ...c, status: c.status === "active" ? "blocked" : "active" }
              : c
          ),
        }));
      },

      // Discount Actions
      addDiscount: (discountData) => {
        const id = `dsc-${Date.now().toString(36)}`;
        const newDiscount: AdminDiscount = {
          ...discountData,
          id,
          usageCount: 0,
        };
        set((state) => ({
          discounts: [newDiscount, ...state.discounts],
        }));
      },

      updateDiscount: (id, updates) => {
        set((state) => ({
          discounts: state.discounts.map((d) =>
            d.id === id ? { ...d, ...updates } : d
          ),
        }));
      },

      toggleDiscount: (id) => {
        set((state) => ({
          discounts: state.discounts.map((d) =>
            d.id === id ? { ...d, isActive: !d.isActive } : d
          ),
        }));
      },

      deleteDiscount: (id) => {
        set((state) => ({
          discounts: state.discounts.filter((d) => d.id !== id),
        }));
      },

      applyDiscountToProduct: (productId, config) => {
        const product = get().products.find((p) => p.id === productId);
        if (!product) return;

        const originalPrice = product.originalPrice || product.price;
        let finalPrice = originalPrice;
        let percent = config.percent;
        let amount = config.amount;

        if (config.type === "percentage") {
          amount = Math.round((originalPrice * config.percent) / 100);
          finalPrice = originalPrice - amount;
        } else {
          amount = config.amount;
          percent = Math.round((amount / originalPrice) * 100);
          finalPrice = originalPrice - amount;
        }

        // 1. Create or update in discounts table
        const discountId = `dsc-prod-${productId}`;
        const existingDiscountIndex = get().discounts.findIndex(
          (d) => d.id === discountId || d.productId === productId
        );

        const discountItem: AdminDiscount = {
          id: discountId,
          title: config.title || `تخفیف ویژه ${product.title}`,
          productId: product.id,
          productTitle: product.title,
          type: config.type,
          percent,
          amount,
          originalPrice,
          finalPrice,
          startDate: config.startDate,
          endDate: config.endDate,
          isActive: true,
          usageCount: 0,
        };

        let updatedDiscounts = [...get().discounts];
        if (existingDiscountIndex >= 0) {
          updatedDiscounts[existingDiscountIndex] = discountItem;
        } else {
          updatedDiscounts = [discountItem, ...updatedDiscounts];
        }

        // 2. Update product price and badge
        const updatedProducts = get().products.map((p) => {
          if (p.id === productId) {
            return {
              ...p,
              originalPrice,
              price: finalPrice,
              badge: {
                text: `٪${percent} تخفیف`,
                type: "discount" as const,
              },
            };
          }
          return p;
        });

        set({
          discounts: updatedDiscounts,
          products: updatedProducts,
        });
      },

      // Review Actions
      approveReview: (id) => {
        set((state) => ({
          reviews: state.reviews.map((r) =>
            r.id === id ? { ...r, status: "approved" } : r
          ),
        }));
      },

      rejectReview: (id) => {
        set((state) => ({
          reviews: state.reviews.map((r) =>
            r.id === id ? { ...r, status: "rejected" } : r
          ),
        }));
      },

      deleteReview: (id) => {
        set((state) => ({
          reviews: state.reviews.filter((r) => r.id !== id),
        }));
      },

      resetToDefaults: () => {
        set({
          products: defaultProducts,
          categories: defaultCategories,
          brands: defaultBrands,
          orders: defaultOrders,
          customers: defaultCustomers,
          discounts: defaultDiscounts,
          reviews: defaultReviews,
          salesChart: defaultSalesChart,
        });
      },
    }),
    {
      name: "poyan-admin-storage-v2",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        isAuthenticated: state.isAuthenticated,
        adminUser: state.adminUser,
        activeTab: state.activeTab,
        products: state.products,
        categories: state.categories,
        brands: state.brands,
        orders: state.orders,
        customers: state.customers,
        discounts: state.discounts,
        reviews: state.reviews,
        salesChart: state.salesChart,
      }),
    }
  )
);
