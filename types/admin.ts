export interface AdminUser {
  username: string;
  name: string;
  role: string;
  avatar?: string;
}

export type PaymentStatus = "paid" | "pending" | "failed";
export type ShippingStatus = "shipping" | "preparing" | "delivered" | "cancelled";

export interface OrderItem {
  productId: string;
  title: string;
  price: number;
  quantity: number;
  image: string;
}

export interface AdminOrder {
  id: string;
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  customerAddress: string;
  date: string;
  createdAt: string;
  amount: number;
  paymentStatus: PaymentStatus;
  shippingStatus: ShippingStatus;
  items: OrderItem[];
  trackingCode?: string;
  notes?: string;
}

export interface AdminProductSpec {
  label: string;
  value: string;
}

export interface AdminProduct {
  id: string;
  title: string;
  enTitle?: string;
  category: string;
  categoryName?: string;
  brand: string;
  brandFa?: string;
  price: number;
  originalPrice?: number;
  stock: number;
  minStockThreshold: number;
  image: string;
  images?: string[];
  inStock: boolean;
  rating: number;
  reviewsCount: number;
  description: string;
  specs: AdminProductSpec[];
  warranty?: string;
  seller?: string;
  badge?: {
    text: string;
    type: "discount" | "in-stock" | "hot";
  };
  createdAt: string;
}

export interface AdminCategory {
  id: string;
  name: string;
  nameEn: string;
  icon: string;
  image?: string;
  description: string;
  productCount?: number;
}

export interface AdminBrand {
  id: string;
  name: string;
  nameFa: string;
  logo: string;
  country: string;
  description: string;
  isActive: boolean;
  productCount?: number;
}

export interface AdminCustomer {
  id: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  ordersCount: number;
  totalSpent: number;
  registerDate: string;
  status: "active" | "blocked";
  city: string;
  address: string;
}

export type DiscountType = "percentage" | "fixed";

export interface AdminDiscount {
  id: string;
  title: string;
  productId?: string;
  productTitle?: string;
  code?: string;
  type: DiscountType;
  percent: number;
  amount: number;
  originalPrice?: number;
  finalPrice?: number;
  startDate: string;
  endDate: string;
  isActive: boolean;
  usageCount: number;
  maxUsage?: number;
}

export type ReviewStatus = "pending" | "approved" | "rejected";

export interface AdminReview {
  id: string;
  userName: string;
  userAvatar?: string;
  productId: string;
  productTitle: string;
  rating: number;
  comment: string;
  date: string;
  status: ReviewStatus;
}

export interface SalesDayData {
  dayName: string;
  dateStr: string;
  amount: number;
  ordersCount: number;
  isToday?: boolean;
}

export type AdminTab =
  | "dashboard"
  | "orders"
  | "products"
  | "categories"
  | "brands"
  | "inventory"
  | "customers"
  | "discounts"
  | "reviews"
  | "qa"
  | "reports";

export interface AdminQaItem {
  id: string;
  productId: string;
  productTitle?: string;
  productImage?: string;
  userName?: string;
  userPhone?: string;
  question: string;
  answer?: string | null;
  answeredBy?: string | null;
  isPublished: boolean;
  hasAnswer?: boolean;
  date?: string;
  createdAt: string;
}
