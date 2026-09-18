import productsData from "@/data/products.json";

export interface ProductColor {
  name: string;
  hex: string;
}

export interface FeatureCard {
  title: string;
  desc: string;
  icon: string;
}

export interface TechnicalSpec {
  label: string;
  value: string;
}

export interface RatingDistributionItem {
  stars: number;
  percent: number;
}

export interface ProductReview {
  id: number;
  user: string;
  verified: boolean;
  date: string;
  rating: number;
  comment: string;
}

export interface Product {
  id: string;
  title: string;
  enTitle: string;
  brand: string;
  category: string;
  categoryName: string;
  code: string;
  price: string;
  priceNumber: number;
  oldPrice: string;
  discount: string;
  discountPercent: number;
  rating: number;
  reviewsCount: number;
  inStock: boolean;
  stockText: string;
  seller: string;
  guarantee: string;
  colors: ProductColor[];
  image: string;
  images: string[];
  badges: string[];
  highlights: string[];
  introTitle: string;
  introDesc: string;
  featureCards: FeatureCard[];
  technicalSpecs: TechnicalSpec[];
  ratingDistribution: RatingDistributionItem[];
  reviews: ProductReview[];
  relatedProductIds: string[];
}

export const products: Product[] = productsData as Product[];

export function getAllProducts(): Product[] {
  return products;
}

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export function getRelatedProducts(product: Product): Product[] {
  return product.relatedProductIds
    .map((id) => products.find((p) => p.id === id))
    .filter((p): p is Product => p !== undefined);
}
