export interface Product {
  id: string | number;
  brand: string;
  brandFa?: string;
  title: string;
  category?: string;
  badge?: {
    text: string;
    type: "discount" | "in-stock" | "hot";
  };
  originalPrice?: number;
  price: number;
  rating?: number;
  reviewsCount?: number;
  inStock?: boolean;
  image: string;
  color?: string;
  warranty?: string;
  seller?: string;
  deliveryText?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export type SortType =
  | "best-seller"
  | "newest"
  | "cheapest"
  | "expensive"
  | "discount";

export interface FilterState {
  onlyInStock: boolean;
  categories: string[];
  brands: string[];
  minPrice: number;
  maxPrice: number;
  minRating: number | null;
}
