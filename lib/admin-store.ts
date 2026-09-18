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

// Initial Demo Products
const defaultProducts: AdminProduct[] = [
  {
    id: "samsung-s24-ultra",
    title: "گوشی هوشمند سامسونگ S24 Ultra",
    enTitle: "Samsung Galaxy S24 Ultra 5G",
    category: "mobile",
    categoryName: "گوشی موبایل",
    brand: "samsung",
    brandFa: "سامسونگ",
    price: 64900000,
    originalPrice: 68000000,
    stock: 2,
    minStockThreshold: 5,
    image: "/images/products/asus-rog-4070ti.jpg",
    inStock: true,
    rating: 4.9,
    reviewsCount: 38,
    description: "پرچمدار قدرتمند سامسونگ با دوربین ۲۰۰ مگاپیکسلی و تراشه اسنپ‌دراگون ۸ نسل ۳ با هوش مصنوعی گلکسی AI.",
    specs: [
      { label: "حافظه داخلی", value: "۵۱۲ گیگابایت" },
      { label: "حافظه رم", value: "۱۲ گیگابایت" },
      { label: "اندازه صفحه", value: "۶.۸ اینچ Dynamic AMOLED 2X" },
    ],
    warranty: "۱۸ ماهه گارانتی شرکتی + کد رجیستری",
    seller: "پویان افزار رسمی",
    badge: { text: "٪۵ تخفیف", type: "discount" },
    createdAt: "1403/08/10",
  },
  {
    id: "macbook-pro-m3",
    title: "لپ‌تاپ مک‌بوک پرو M3 Pro",
    enTitle: "Apple MacBook Pro 14 M3 Pro",
    category: "laptop",
    categoryName: "لپ‌تاپ",
    brand: "apple",
    brandFa: "اپل",
    price: 115000000,
    originalPrice: 122000000,
    stock: 1,
    minStockThreshold: 4,
    image: "/images/products/gigabyte-4080.jpg",
    inStock: true,
    rating: 5.0,
    reviewsCount: 22,
    description: "لپ‌تاپ فوق‌حرفه‌ای اپل با تراشه قدرتمند M3 Pro، ۱۸ گیگابایت رم یکپارچه و ۵۱۲ گیگابایت SSD فوق سریع.",
    specs: [
      { label: "پردازنده", value: "Apple M3 Pro (11-core CPU)" },
      { label: "رم", value: "18GB Unified Memory" },
      { label: "صفحه نمایش", value: "Liquid Retina XDR 14.2 inch" },
    ],
    warranty: "گارانتی ۱۸ ماهه بازرگانی سیب",
    seller: "پویان افزار پریمیوم",
    badge: { text: "موجودی محدود", type: "hot" },
    createdAt: "1403/07/20",
  },
  {
    id: "sony-wh-1000xm5",
    title: "هدفون بی‌سیم سونی WH-1000XM5",
    enTitle: "Sony WH-1000XM5 Wireless Headphones",
    category: "audio",
    categoryName: "هدفون و صوتی",
    brand: "sony",
    brandFa: "سونی",
    price: 18400000,
    originalPrice: 20500000,
    stock: 4,
    minStockThreshold: 6,
    image: "/images/products/msi-4060ti.jpg",
    inStock: true,
    rating: 4.8,
    reviewsCount: 54,
    description: "بهترین هدفون نویز کنسلینگ بازار با باتری قدرتمند تا ۳۰ ساعت و کیفیت صدای بی‌نظیر Hi-Res Audio.",
    specs: [
      { label: "نوع اتصال", value: "بی‌سیم بلوتوث 5.2 / با سیم AUX" },
      { label: "عمر باتری", value: "تا ۳۰ ساعت با نویز کنسلینگ روشن" },
      { label: "حذف نویز فعال", value: "تراشه اختصاصی Integrated Processor V1" },
    ],
    warranty: "۱۲ ماهه گارانتی ایران سونی",
    seller: "پویان افزار اکسپرس",
    badge: { text: "٪۱۰ تخفیف", type: "discount" },
    createdAt: "1403/06/15",
  },
  {
    id: "asus-rog-4070ti",
    title: "کارت گرافیک ایسوس مدل ROG Strix RTX 4070 Ti O12G",
    enTitle: "ASUS ROG Strix GeForce RTX 4070 Ti 12GB GDDR6X",
    category: "gpu",
    categoryName: "کارت گرافیک",
    brand: "asus",
    brandFa: "ایسوس",
    price: 42900000,
    originalPrice: 48500000,
    stock: 7,
    minStockThreshold: 3,
    image: "/images/products/asus-rog-4070ti.jpg",
    inStock: true,
    rating: 4.8,
    reviewsCount: 24,
    description: "کارت گرافیک قدرتمند ایسوس مناسب اجرای تمام بازی‌های روز با رزولوشن 4K و قابلیت رهگیری پرتو (Ray Tracing).",
    specs: [
      { label: "حافظه ویدیویی", value: "12GB GDDR6X" },
      { label: "رابط حافظه", value: "192-bit" },
      { label: "پاور پیشنهادی", value: "750W" },
    ],
    warranty: "۳۶ ماهه گارانتی اصلی سازگار / حامی",
    seller: "پویان افزار گیمینگ",
    badge: { text: "٪۱۲ تخفیف", type: "discount" },
    createdAt: "1403/05/10",
  },
  {
    id: "msi-4060ti",
    title: "کارت گرافیک ام‌اس‌آی مدل RTX 4060 Ti Gaming X 8G",
    enTitle: "MSI GeForce RTX 4060 Ti GAMING X 8G",
    category: "gpu",
    categoryName: "کارت گرافیک",
    brand: "msi",
    brandFa: "ام‌اس‌آی",
    price: 26400000,
    originalPrice: 28000000,
    stock: 12,
    minStockThreshold: 5,
    image: "/images/products/msi-4060ti.jpg",
    inStock: true,
    rating: 4.6,
    reviewsCount: 18,
    description: "کارت گرافیک اقتصادی و پرتوان با سیستم خنک‌کننده Twin Frozr 9 و نورپردازی RGB چشم‌نواز.",
    specs: [
      { label: "حافظه ویدیویی", value: "8GB GDDR6" },
      { label: "فرکانس بوست", value: "2640 MHz" },
      { label: "پاور پیشنهادی", value: "550W" },
    ],
    warranty: "۳۰ ماهه ماتریس",
    seller: "پویان افزار",
    badge: { text: "موجود", type: "in-stock" },
    createdAt: "1403/06/01",
  },
  {
    id: "gigabyte-4080",
    title: "کارت گرافیک گیگابایت مدل GeForce RTX 4080 EAGLE OC",
    enTitle: "GIGABYTE GeForce RTX 4080 16GB EAGLE OC",
    category: "gpu",
    categoryName: "کارت گرافیک",
    brand: "gigabyte",
    brandFa: "گیگابایت",
    price: 66200000,
    originalPrice: 72000000,
    stock: 5,
    minStockThreshold: 3,
    image: "/images/products/gigabyte-4080.jpg",
    inStock: true,
    rating: 4.9,
    reviewsCount: 42,
    description: "کارت گرافیک رده‌بالا با سیستم خنک‌کننده WINDFORCE و ۱۶ گیگابایت حافظه GDDR6X برای سنگین‌ترین پردازش‌های هوش مصنوعی و گیمینگ.",
    specs: [
      { label: "حافظه ویدیویی", value: "16GB GDDR6X" },
      { label: "رابط حافظه", value: "256-bit" },
      { label: "پاور پیشنهادی", value: "850W" },
    ],
    warranty: "۳۶ ماهه آواژنگ",
    seller: "پویان افزار",
    badge: { text: "٪۸ تخفیف", type: "discount" },
    createdAt: "1403/05/14",
  },
  {
    id: "nvidia-4090",
    title: "کارت گرافیک ان‌ویدیا مدل RTX 4090 Founders Edition",
    enTitle: "NVIDIA GeForce RTX 4090 24GB Founders Edition",
    category: "gpu",
    categoryName: "کارت گرافیک",
    brand: "nvidia",
    brandFa: "ان‌ویدیا",
    price: 92000000,
    originalPrice: 92000000,
    stock: 3,
    minStockThreshold: 2,
    image: "/images/products/nvidia-4090.jpg",
    inStock: true,
    rating: 5.0,
    reviewsCount: 59,
    description: "غول بی‌رقیب پردازش گرافیکی دنیا با ۲۴ گیگابایت حافظه GDDR6X و معماری فوق‌پیشرفته Ada Lovelace.",
    specs: [
      { label: "حافظه ویدیویی", value: "24GB GDDR6X" },
      { label: "هسته‌های CUDA", value: "16384" },
      { label: "پاور پیشنهادی", value: "1000W" },
    ],
    warranty: "گارانتی طلایی ۱ ساله تعویض",
    seller: "پویان افزار واردات مستقیم",
    badge: { text: "موجود", type: "in-stock" },
    createdAt: "1403/04/01",
  },
];

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
const defaultOrders: AdminOrder[] = [
  {
    id: "#PA-9842",
    customerName: "علی رضایی",
    customerPhone: "۰۹۱۲۳۴۵۶۷۸۹",
    customerEmail: "ali.rezaei@example.com",
    customerAddress: "تهران، خیابان ولیعصر، نرسیده به میدان ونک، پلاک ۲۳، واحد ۴",
    date: "۲۵ آذر ۱۴۰۳",
    createdAt: "1403/09/25 14:30",
    amount: 4250000,
    paymentStatus: "paid",
    shippingStatus: "shipping",
    items: [
      { productId: "tsco-th5345", title: "هدفون بی سیم تسکو مدل TH 5345", price: 1650000, quantity: 1, image: "/images/products/asus-rog-4070ti.jpg" },
      { productId: "xiaomi-keyboard-mech", title: "کیبورد مکانیکال شیائومی", price: 2600000, quantity: 1, image: "/images/products/msi-4060ti.jpg" },
    ],
    trackingCode: "TRK-9842-8711",
  },
  {
    id: "#PA-9841",
    customerName: "سارا محمدی",
    customerPhone: "۰۹۱۹۸۷۶۵۴۳۲",
    customerEmail: "sara.mohammadi@example.com",
    customerAddress: "اصفهان، خیابان چهارباغ بالا، مجتمع کوثر، طبقه ۳",
    date: "۲۵ آذر ۱۴۰۳",
    createdAt: "1403/09/25 11:15",
    amount: 1800000,
    paymentStatus: "paid",
    shippingStatus: "preparing",
    items: [
      { productId: "sony-wh-1000xm5", title: "لوازم جانبی و کابل Type-C سونی", price: 1800000, quantity: 1, image: "/images/products/msi-4060ti.jpg" },
    ],
    trackingCode: "TRK-9841-4520",
  },
  {
    id: "#PA-9840",
    customerName: "رضا کریمی",
    customerPhone: "۰۹۳۵۱۱۱۲۲۳۳",
    customerEmail: "reza.karimi@example.com",
    customerAddress: "شیراز، بلوار ارم، کوچه ۱۲، پلاک ۸",
    date: "۲۴ آذر ۱۴۰۳",
    createdAt: "1403/09/24 18:40",
    amount: 12900000,
    paymentStatus: "paid",
    shippingStatus: "delivered",
    items: [
      { productId: "msi-4060ti", title: "کارت گرافیک ام‌اس‌آی RTX 4060 Ti", price: 12900000, quantity: 1, image: "/images/products/msi-4060ti.jpg" },
    ],
    trackingCode: "TRK-9840-9901",
  },
  {
    id: "#PA-9839",
    customerName: "زهرا احمدی",
    customerPhone: "۰۹۱۲۹۹۹۸۸۷۷",
    customerEmail: "zahra.ahmadi@example.com",
    customerAddress: "مشهد، بلوار سجاد، خیابان بهار، ساختمان صبا",
    date: "۲۴ آذر ۱۴۰۳",
    createdAt: "1403/09/24 09:20",
    amount: 650000,
    paymentStatus: "failed",
    shippingStatus: "cancelled",
    items: [
      { productId: "mouse-pad-gaming", title: "پد ماوس گیمینگ ضد آب سایز بزرگ", price: 650000, quantity: 1, image: "/images/products/gigabyte-4080.jpg" },
    ],
    notes: "تراکنش ناموفق از درگاه بانکی سامان - عدم تکمیل پرداخت",
  },
  {
    id: "#PA-9838",
    customerName: "محمدرضا اکبری",
    customerPhone: "۰۹۱۸۴۴۴۵۵۶۶",
    customerEmail: "m.akbari@example.com",
    customerAddress: "تبریز، خیابان آزادی، کوچه گلستان، پلاک ۱۵",
    date: "۲۳ آذر ۱۴۰۳",
    createdAt: "1403/09/23 16:50",
    amount: 42900000,
    paymentStatus: "paid",
    shippingStatus: "delivered",
    items: [
      { productId: "asus-rog-4070ti", title: "کارت گرافیک ایسوس ROG Strix RTX 4070 Ti", price: 42900000, quantity: 1, image: "/images/products/asus-rog-4070ti.jpg" },
    ],
    trackingCode: "TRK-9838-1209",
  },
  {
    id: "#PA-9837",
    customerName: "مریم حسینی",
    customerPhone: "۰۹۳۳۷۷۷۸۸۹۹",
    customerEmail: "maryam.hosseini@example.com",
    customerAddress: "کرج، گوهردشت، بلوار رستاخیز، خیابان نهم",
    date: "۲۳ آذر ۱۴۰۳",
    createdAt: "1403/09/23 10:10",
    amount: 18400000,
    paymentStatus: "paid",
    shippingStatus: "delivered",
    items: [
      { productId: "sony-wh-1000xm5", title: "هدفون بی‌سیم سونی WH-1000XM5", price: 18400000, quantity: 1, image: "/images/products/msi-4060ti.jpg" },
    ],
    trackingCode: "TRK-9837-7723",
  },
];

// Initial Demo Customers
const defaultCustomers: AdminCustomer[] = [
  {
    id: "USR-1042",
    firstName: "علی",
    lastName: "رضایی",
    phone: "۰۹۱۲۳۴۵۶۷۸۹",
    email: "ali.rezaei@example.com",
    ordersCount: 4,
    totalSpent: 18450000,
    registerDate: "۱۴۰۳/۰۴/۱۲",
    status: "active",
    city: "تهران",
    address: "خیابان ولیعصر، نرسیده به میدان ونک، پلاک ۲۳، واحد ۴",
  },
  {
    id: "USR-1041",
    firstName: "سارا",
    lastName: "محمدی",
    phone: "۰۹۱۹۸۷۶۵۴۳۲",
    email: "sara.mohammadi@example.com",
    ordersCount: 2,
    totalSpent: 4200000,
    registerDate: "۱۴۰۳/۰۶/۰۱",
    status: "active",
    city: "اصفهان",
    address: "خیابان چهارباغ بالا، مجتمع کوثر، طبقه ۳",
  },
  {
    id: "USR-1040",
    firstName: "رضا",
    lastName: "کریمی",
    phone: "۰۹۳۵۱۱۱۲۲۳۳",
    email: "reza.karimi@example.com",
    ordersCount: 6,
    totalSpent: 84000000,
    registerDate: "۱۴۰۲/۱۱/۱۵",
    status: "active",
    city: "شیراز",
    address: "بلوار ارم، کوچه ۱۲، پلاک ۸",
  },
  {
    id: "USR-1039",
    firstName: "زهرا",
    lastName: "احمدی",
    phone: "۰۹۱۲۹۹۹۸۸۷۷",
    email: "zahra.ahmadi@example.com",
    ordersCount: 1,
    totalSpent: 650000,
    registerDate: "۱۴۰۳/۰۸/۲۲",
    status: "active",
    city: "مشهد",
    address: "بلوار سجاد، خیابان بهار، ساختمان صبا",
  },
  {
    id: "USR-1038",
    firstName: "محمدرضا",
    lastName: "اکبری",
    phone: "۰۹۱۸۴۴۴۵۵۶۶",
    email: "m.akbari@example.com",
    ordersCount: 5,
    totalSpent: 112000000,
    registerDate: "۱۴۰۲/۰۹/۱۰",
    status: "active",
    city: "تبریز",
    address: "خیابان آزادی، کوچه گلستان، پلاک ۱۵",
  },
  {
    id: "USR-1037",
    firstName: "مریم",
    lastName: "حسینی",
    phone: "۰۹۳۳۷۷۷۸۸۹۹",
    email: "maryam.hosseini@example.com",
    ordersCount: 3,
    totalSpent: 26800000,
    registerDate: "۱۴۰۳/۰۲/۱۸",
    status: "active",
    city: "کرج",
    address: "گوهردشت، بلوار رستاخیز، خیابان نهم",
  },
  {
    id: "USR-1036",
    firstName: "امیرحسین",
    lastName: "تقوی",
    phone: "۰۹۱۰۵۵۵۲۲۱۱",
    email: "amir.taghavi@example.com",
    ordersCount: 8,
    totalSpent: 165000000,
    registerDate: "۱۴۰۲/۰۵/۰۵",
    status: "active",
    city: "تهران",
    address: "سعادت‌آباد، میدان کاج، خیابان نهم شرقی",
  },
];

// Initial Demo Discounts
const defaultDiscounts: AdminDiscount[] = [
  {
    id: "dsc-01",
    title: "تخفیف ویژه کارت گرافیک ایسوس ۴۰۷۰تی",
    productId: "asus-rog-4070ti",
    productTitle: "کارت گرافیک ایسوس مدل ROG Strix RTX 4070 Ti O12G",
    type: "percentage",
    percent: 12,
    amount: 5600000,
    originalPrice: 48500000,
    finalPrice: 42900000,
    startDate: "1403/09/20",
    endDate: "1403/09/30",
    isActive: true,
    usageCount: 14,
  },
  {
    id: "dsc-02",
    title: "تخفیف جشنواره زمستانه سونی XM5",
    productId: "sony-wh-1000xm5",
    productTitle: "هدفون بی‌سیم سونی WH-1000XM5",
    type: "fixed",
    percent: 10,
    amount: 2100000,
    originalPrice: 20500000,
    finalPrice: 18400000,
    startDate: "1403/09/15",
    endDate: "1403/10/01",
    isActive: true,
    usageCount: 8,
  },
  {
    id: "dsc-coupon-01",
    title: "کد تخفیف اولین خرید فروشگاه",
    code: "WELCOME1403",
    type: "percentage",
    percent: 10,
    amount: 500000,
    startDate: "1403/01/01",
    endDate: "1403/12/29",
    isActive: true,
    usageCount: 142,
    maxUsage: 500,
  },
  {
    id: "dsc-coupon-02",
    title: "کد تخفیف شب یلدا ویژه خرید بالای ۵ میلیون",
    code: "YALDA-TECH",
    type: "fixed",
    percent: 15,
    amount: 750000,
    startDate: "1403/09/25",
    endDate: "1403/10/05",
    isActive: true,
    usageCount: 29,
    maxUsage: 100,
  },
];

// Initial Demo Reviews (Matching Figma screenshot exactly + extras)
const defaultReviews: AdminReview[] = [
  {
    id: "rev-01",
    userName: "محمدرضا اکبری",
    productId: "asus-rog-4070ti",
    productTitle: "کارت گرافیک ایسوس ROG Strix RTX 4070 Ti",
    rating: 5,
    comment: "محصول بسیار باکیفیتی هست و دقیقا همون چیزی بود که سفارش داده بودم. ارسال هم به موقع انجام شد.",
    date: "۲۵ آذر ۱۴۰۳",
    status: "pending",
  },
  {
    id: "rev-02",
    userName: "مریم حسینی",
    productId: "sony-wh-1000xm5",
    productTitle: "هدفون بی‌سیم سونی WH-1000XM5",
    rating: 5,
    comment: "بسته‌بندی خیلی عالی بود و از خرید خودم از پویان افزار کاملا راضی هستم. پیشنهاد می‌کنم.",
    date: "۲۴ آذر ۱۴۰۳",
    status: "pending",
  },
  {
    id: "rev-03",
    userName: "امیرحسین تقوی",
    productId: "macbook-pro-m3",
    productTitle: "لپ‌تاپ مک‌بوک پرو M3 Pro",
    rating: 4,
    comment: "کیفیت دستگاه و عملکرد پردازنده فوق‌العاده‌ست. فقط گارانتی دیر در سامانه ثبت شد که با پشتیبانی تماس گرفتم و سریع حل کردند.",
    date: "۲۴ آذر ۱۴۰۳",
    status: "pending",
  },
  {
    id: "rev-04",
    userName: "رضا کریمی",
    productId: "msi-4060ti",
    productTitle: "کارت گرافیک ام‌اس‌آی RTX 4060 Ti",
    rating: 5,
    comment: "دما توی بازی‌ها فوق‌العاده پایینه و فن‌ها در حالت عادی اصلا صدا نمیدن. خرید این کارت رو توصیه می‌کنم.",
    date: "۲۲ آذر ۱۴۰۳",
    status: "approved",
  },
  {
    id: "rev-05",
    userName: "کامران مرادی",
    productId: "gigabyte-4080",
    productTitle: "کارت گرافیک گیگابایت RTX 4080",
    rating: 2,
    comment: "کالای نامربوط تبلیغاتی و اسپم.",
    date: "۲۰ آذر ۱۴۰۳",
    status: "rejected",
  },
];

// Initial 7-day Sales Data matching screenshot
const defaultSalesChart: SalesDayData[] = [
  { dayName: "امروز", dateStr: "۲۵ آذر", amount: 48500000, ordersCount: 28, isToday: true },
  { dayName: "۲۴ آذر", dateStr: "۲۴ آذر", amount: 42000000, ordersCount: 24 },
  { dayName: "۲۳ آذر", dateStr: "۲۳ آذر", amount: 31000000, ordersCount: 18 },
  { dayName: "۲۲ آذر", dateStr: "۲۲ آذر", amount: 39500000, ordersCount: 21 },
  { dayName: "۲۱ آذر", dateStr: "۲۱ آذر", amount: 22000000, ordersCount: 14 },
  { dayName: "۲۰ آذر", dateStr: "۲۰ آذر", amount: 27000000, ordersCount: 16 },
  { dayName: "۱۹ آذر", dateStr: "۱۹ آذر", amount: 18500000, ordersCount: 11 },
];

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
  login: (username: string, pass: string) => { success: boolean; message?: string };
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

      login: (username: string, pass: string) => {
        const trimmedUser = username.trim().toLowerCase();
        const trimmedPass = pass.trim();

        if (trimmedUser === "admin" && trimmedPass === "admin") {
          const user: AdminUser = {
            username: "admin",
            name: "مدیر سیستم",
            role: "مدیر ارشد",
            avatar: "/images/admin-avatar.webp",
          };
          set({
            isAuthenticated: true,
            adminUser: user,
          });
          return { success: true };
        }
        return {
          success: false,
          message: "نام کاربری یا رمز عبور اشتباه است (هر دو admin می‌باشد)",
        };
      },

      logout: () => {
        set({
          isAuthenticated: false,
          adminUser: null,
          activeTab: "dashboard",
        });
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
      name: "poyan-admin-storage-v1",
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
