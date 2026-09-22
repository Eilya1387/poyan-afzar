"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { getPersianFullDate, getPersianTodayDate, jalaliToGregorianISO } from "@/lib/formatters";
import {
  AdminUser,
  AdminOrder,
  AdminProduct,
  AdminCategory,
  AdminBrand,
  AdminCustomer,
  AdminDiscount,
  AdminReview,
  AdminQaItem,
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
  qa: AdminQaItem[];
  salesChart: SalesDayData[];
  kpis: any;
  reportsData: any;

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
    status: {
      paymentStatus?: PaymentStatus;
      shippingStatus?: ShippingStatus;
      notes?: string;
      trackingCode?: string;
    }
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

  // QA Actions
  answerQa: (id: string, answer: string) => Promise<void>;
  togglePublishQa: (id: string, isPublished: boolean) => Promise<void>;
  deleteQa: (id: string) => Promise<void>;

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
      qa: [],
      salesChart: defaultSalesChart,
      kpis: null,
      reportsData: null,

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
          const [overview, inv, allProds, ords, custs, discs, revs, qaRes, reportsRes, cats, brnds] = await Promise.allSettled([
            adminApi.getOverview(),
            adminApi.getInventory(),
            productsApi.getProducts({ limit: 100 }),
            adminApi.getOrders(),
            adminApi.getCustomers(),
            adminApi.getDiscounts(),
            adminApi.getReviews(),
            adminApi.getQa(),
            adminApi.getReportsAnalytics(),
            categoriesApi.getCategories(),
            brandsApi.getBrands(),
          ]);

          if (overview.status === "fulfilled" && overview.value) {
            if (overview.value.salesChart) set({ salesChart: overview.value.salesChart });
            if (overview.value.kpis) set({ kpis: overview.value.kpis });
          }
          if (allProds.status === "fulfilled" && allProds.value?.items && allProds.value.items.length > 0) {
            const mappedProds: AdminProduct[] = allProds.value.items.map((p) => ({
              id: p.id,
              title: p.title,
              enTitle: p.enTitle,
              category: p.categorySlug || p.category,
              categoryName: p.categoryName,
              brand: p.brandSlug || p.brand,
              brandFa: p.brandFa,
              price: p.priceNumber || Number(p.price) || 0,
              originalPrice: p.originalPrice || undefined,
              stock: p.stock ?? (p.inStock ? 10 : 0),
              minStockThreshold: p.minStockThreshold ?? 3,
              image: p.image,
              images: Array.isArray(p.images) && p.images.length > 0 ? p.images : [p.image],
              inStock: p.inStock,
              rating: p.rating || 5,
              reviewsCount: p.reviewsCount || 0,
              description: p.description || p.introDesc || "",
              specs: (p.technicalSpecs || []).map((s) => ({ label: s.label, value: s.value })),
              warranty: p.warranty || p.guarantee,
              seller: p.seller,
              badge: p.discount ? { text: p.discount, type: "discount" } : undefined,
              createdAt: p.createdAt || new Intl.DateTimeFormat("fa-IR").format(new Date()),
            }));
            set({ products: mappedProds });
          } else if (inv.status === "fulfilled" && inv.value?.products) {
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
          if (qaRes.status === "fulfilled" && qaRes.value?.questions) {
            set({ qa: qaRes.value.questions });
          }
          if (reportsRes.status === "fulfilled" && reportsRes.value) {
            set({ reportsData: reportsRes.value });
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
        const slug = productData.enTitle
          ? productData.enTitle.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")
          : `prod-${Date.now().toString(36)}`;
        const id = slug || `prod-${Date.now().toString(36)}`;
        const now = new Intl.DateTimeFormat("fa-IR").format(new Date());
        const prodImages = Array.isArray(productData.images) && productData.images.length > 0 ? productData.images : [productData.image];
        const newProduct: AdminProduct = {
          ...productData,
          id,
          createdAt: now,
          images: prodImages,
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

        const dto = {
          id,
          title: productData.title,
          enTitle: productData.enTitle || productData.title,
          code: `TK-${Math.floor(100000 + Math.random() * 900000)}`,
          categorySlug: productData.category,
          brandSlug: productData.brand,
          price: Number(productData.price),
          originalPrice: Number(productData.originalPrice || productData.price),
          stock: Number(productData.stock || 0),
          minStockThreshold: Number(productData.minStockThreshold || 3),
          inStock: Number(productData.stock || 0) > 0,
          stockText: Number(productData.stock || 0) > 0 ? "موجود در انبار پویان افزار" : "ناموجود",
          seller: productData.seller || "پویان افزار",
          guarantee: productData.warranty || "گارانتی ۱۸ ماهه شرکتی + ضمانت اصالت کالا",
          image: productData.image,
          images: prodImages,
          description: productData.description || "",
          introTitle: productData.title,
          introDesc: productData.description || "",
          specs: productData.specs || [],
          technicalSpecs: productData.specs || [],
          colors: [{ name: "مشکی", hex: "#000000" }],
          badges: productData.badge?.text ? [productData.badge.text] : ["ضمانت اصالت"],
        };

        productsApi.createProduct(dto).then(() => {
          get().fetchAdminData();
        }).catch((err) => {
          console.error("Error creating product on backend:", err);
        });

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
              if (updates.images) {
                updated.images = updates.images;
              }
              return updated;
            }
            return p;
          }),
        }));

        productsApi.updateProduct(id, updates).then(() => {
          get().fetchAdminData();
        }).catch((err) => {
          console.error("Error updating product on backend:", err);
        });
      },

      deleteProduct: (id) => {
        set((state) => ({
          products: state.products.filter((p) => p.id !== id),
        }));

        productsApi.deleteProduct(id).then(() => {
          get().fetchAdminData();
        }).catch((err) => {
          console.error("Error deleting product on backend:", err);
        });
      },

      updateStock: (id, newStock) => {
        const stockVal = Math.max(0, newStock);
        set((state) => ({
          products: state.products.map((p) =>
            p.id === id ? { ...p, stock: stockVal, inStock: stockVal > 0 } : p
          ),
        }));

        adminApi.updateStock(id, { stock: stockVal }).then(() => {
          get().fetchAdminData();
        }).catch((err) => {
          console.error("Error updating stock on backend:", err);
        });
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

        adminApi.updateStock(id, { delta }).then(() => {
          get().fetchAdminData();
        }).catch((err) => {
          console.error("Error adjusting stock on backend:", err);
        });
      },

      // Category Actions
      addCategory: (categoryData) => {
        const slug = categoryData.nameEn?.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
        const id = slug || `cat-${Date.now().toString(36)}`;
        const newCategory: AdminCategory = {
          ...categoryData,
          id,
          productCount: 0,
        };
        set((state) => ({
          categories: [...state.categories, newCategory],
        }));

        categoriesApi.createCategory({
          id,
          name: categoryData.name,
          nameEn: categoryData.nameEn,
          description: categoryData.description,
          icon: categoryData.icon,
        }).then(() => {
          get().fetchAdminData();
        }).catch((err) => {
          console.error("Error creating category on backend:", err);
        });
      },

      updateCategory: (id, updates) => {
        set((state) => ({
          categories: state.categories.map((c) =>
            c.id === id ? { ...c, ...updates } : c
          ),
        }));

        categoriesApi.updateCategory(id, updates).then(() => {
          get().fetchAdminData();
        }).catch((err) => {
          console.error("Error updating category on backend:", err);
        });
      },

      deleteCategory: (id) => {
        set((state) => ({
          categories: state.categories.filter((c) => c.id !== id),
        }));

        categoriesApi.deleteCategory(id).then(() => {
          get().fetchAdminData();
        }).catch((err) => {
          console.error("Error deleting category on backend:", err);
        });
      },

      // Brand Actions
      addBrand: (brandData) => {
        const slug = brandData.name?.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
        const id = slug || `brand-${Date.now().toString(36)}`;
        const newBrand: AdminBrand = {
          ...brandData,
          id,
          productCount: 0,
        };
        set((state) => ({
          brands: [...state.brands, newBrand],
        }));

        brandsApi.createBrand({
          id,
          name: brandData.name,
          nameFa: brandData.nameFa,
          logo: brandData.logo || "/brands/asus.svg",
          country: brandData.country || "نامشخص",
          description: brandData.description,
        }).then(() => {
          get().fetchAdminData();
        }).catch((err) => {
          console.error("Error creating brand on backend:", err);
        });
      },

      updateBrand: (id, updates) => {
        set((state) => ({
          brands: state.brands.map((b) =>
            b.id === id ? { ...b, ...updates } : b
          ),
        }));

        brandsApi.updateBrand(id, updates).then(() => {
          get().fetchAdminData();
        }).catch((err) => {
          console.error("Error updating brand on backend:", err);
        });
      },

      deleteBrand: (id) => {
        set((state) => ({
          brands: state.brands.filter((b) => b.id !== id),
        }));

        brandsApi.deleteBrand(id).then(() => {
          get().fetchAdminData();
        }).catch((err) => {
          console.error("Error deleting brand on backend:", err);
        });
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

      updateOrderStatus: (id, { paymentStatus, shippingStatus, notes, trackingCode }) => {
        set((state) => ({
          orders: state.orders.map((o) => {
            if (o.id === id) {
              return {
                ...o,
                ...(paymentStatus ? { paymentStatus } : {}),
                ...(shippingStatus ? { shippingStatus } : {}),
                ...(notes !== undefined ? { notes } : {}),
                ...(trackingCode ? { trackingCode } : {}),
              };
            }
            return o;
          }),
        }));

        adminApi.updateOrderStatus(id, { paymentStatus, shippingStatus, notes, trackingCode }).then(() => {
          get().fetchAdminData();
        }).catch((err) => {
          console.error("Error updating order status on backend:", err);
        });
      },

      deleteOrder: (id) => {
        set((state) => ({
          orders: state.orders.filter((o) => o.id !== id),
        }));

        adminApi.deleteOrder(id).then(() => {
          get().fetchAdminData();
        }).catch((err) => {
          console.error("Error deleting order on backend:", err);
        });
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

        adminApi.createCustomer({
          firstName: customerData.firstName,
          lastName: customerData.lastName,
          phone: customerData.phone,
          email: customerData.email,
          city: customerData.city || "تهران",
          address: customerData.address,
          status: customerData.status === "blocked" ? "BLOCKED" : "ACTIVE",
        }).then(() => {
          get().fetchAdminData();
        }).catch((err) => {
          console.error("Error creating customer on backend:", err);
        });
      },

      updateCustomer: (id, updates) => {
        set((state) => ({
          customers: state.customers.map((c) =>
            c.id === id ? { ...c, ...updates } : c
          ),
        }));
      },

      toggleCustomerStatus: (id) => {
        const cust = get().customers.find((c) => c.id === id);
        const newIsActive = cust?.status !== "active";
        set((state) => ({
          customers: state.customers.map((c) =>
            c.id === id
              ? { ...c, status: newIsActive ? "active" : "blocked" }
              : c
          ),
        }));

        adminApi.updateCustomerStatus(id, newIsActive).then(() => {
          get().fetchAdminData();
        }).catch((err) => {
          console.error("Error toggling customer status on backend:", err);
        });
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

        adminApi.createDiscount({
          title: discountData.title,
          code: discountData.code,
          type: discountData.type === "fixed" ? "FIXED" : "PERCENTAGE",
          percent: discountData.percent || 0,
          amount: discountData.amount || 0,
          maxUsage: discountData.maxUsage,
          startDate: jalaliToGregorianISO(discountData.startDate),
          endDate: jalaliToGregorianISO(discountData.endDate),
          productId: discountData.productId !== "all" ? discountData.productId : undefined,
          isActive: discountData.isActive ?? true,
        }).then(() => {
          get().fetchAdminData();
        }).catch((err) => {
          console.error("Error creating discount on backend:", err);
        });
      },

      updateDiscount: (id, updates) => {
        set((state) => ({
          discounts: state.discounts.map((d) =>
            d.id === id ? { ...d, ...updates } : d
          ),
        }));

        const dto: any = { ...updates };
        if (updates.type) {
          dto.type = updates.type === "fixed" ? "FIXED" : "PERCENTAGE";
        }
        if (updates.startDate !== undefined) {
          dto.startDate = jalaliToGregorianISO(updates.startDate);
        }
        if (updates.endDate !== undefined) {
          dto.endDate = jalaliToGregorianISO(updates.endDate);
        }
        if (updates.productId === "all") {
          dto.productId = null;
        }

        adminApi.updateDiscount(id, dto).then(() => {
          get().fetchAdminData();
        }).catch((err) => {
          console.error("Error updating discount on backend:", err);
        });
      },

      toggleDiscount: (id) => {
        set((state) => ({
          discounts: state.discounts.map((d) =>
            d.id === id ? { ...d, isActive: !d.isActive } : d
          ),
        }));

        adminApi.toggleDiscount(id).then(() => {
          get().fetchAdminData();
        }).catch((err) => {
          console.error("Error toggling discount on backend:", err);
        });
      },

      deleteDiscount: (id) => {
        set((state) => ({
          discounts: state.discounts.filter((d) => d.id !== id),
        }));

        adminApi.deleteDiscount(id).then(() => {
          get().fetchAdminData();
        }).catch((err) => {
          console.error("Error deleting discount on backend:", err);
        });
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

        const discountId = `dsc-prod-${productId}`;
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
        const existingDiscountIndex = get().discounts.findIndex(
          (d) => d.id === discountId || d.productId === productId
        );
        if (existingDiscountIndex >= 0) {
          updatedDiscounts[existingDiscountIndex] = discountItem;
        } else {
          updatedDiscounts = [discountItem, ...updatedDiscounts];
        }

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

        adminApi.createDiscount({
          title: discountItem.title,
          type: config.type === "fixed" ? "FIXED" : "PERCENTAGE",
          percent: percent || 0,
          amount: amount || 0,
          productId: productId,
          isActive: true,
        }).then(() => {
          get().fetchAdminData();
        }).catch((err) => {
          console.error("Error creating product discount on backend:", err);
        });
      },

      // Review Actions
      approveReview: (id) => {
        set((state) => ({
          reviews: state.reviews.map((r) =>
            r.id === id ? { ...r, status: "approved" } : r
          ),
        }));

        adminApi.approveReview(id).then(() => {
          get().fetchAdminData();
        }).catch((err) => {
          console.error("Error approving review on backend:", err);
        });
      },

      rejectReview: (id) => {
        set((state) => ({
          reviews: state.reviews.map((r) =>
            r.id === id ? { ...r, status: "rejected" } : r
          ),
        }));

        adminApi.rejectReview(id).then(() => {
          get().fetchAdminData();
        }).catch((err) => {
          console.error("Error rejecting review on backend:", err);
        });
      },

      deleteReview: (id) => {
        set((state) => ({
          reviews: state.reviews.filter((r) => r.id !== id),
        }));

        adminApi.deleteReview(id).then(() => {
          get().fetchAdminData();
        }).catch((err) => {
          console.error("Error deleting review on backend:", err);
        });
      },

      // QA Actions
      answerQa: async (id: string, answer: string) => {
        await adminApi.answerQa(id, answer);
        await get().fetchAdminData();
      },

      togglePublishQa: async (id: string, isPublished: boolean) => {
        await adminApi.publishQa(id, isPublished);
        await get().fetchAdminData();
      },

      deleteQa: async (id: string) => {
        await adminApi.deleteQa(id);
        await get().fetchAdminData();
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
