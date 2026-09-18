export interface Province {
  id: number;
  name: string;
  cities: string[];
}

export const iranProvinces: Province[] = [
  {
    id: 1,
    name: "تهران",
    cities: ["تهران", "شهریار", "اسلامشهر", "ورامین", "دماوند", "پردیس", "ری", "رباط کریم", "قدس", "پاکدشت"],
  },
  {
    id: 2,
    name: "اصفهان",
    cities: ["اصفهان", "کاشان", "خمینی‌شهر", "نجف‌آباد", "شاهین‌شهر", "لنجان", "فلاورجان", "مبارکه"],
  },
  {
    id: 3,
    name: "فارس",
    cities: ["شیراز", "مرودشت", "جهرم", "فسا", "کازرون", "لارستان", "آباده", "داراب"],
  },
  {
    id: 4,
    name: "خراسان رضوی",
    cities: ["مشهد", "نیشابور", "سبزوار", "تربت حیدریه", "قوچان", "کاشمر", "چناران", "سرخس"],
  },
  {
    id: 5,
    name: "آذربایجان شرقی",
    cities: ["تبریز", "مراغه", "مرند", "میانه", "اهر", "بناب", "سراب", "آذرشهر"],
  },
  {
    id: 6,
    name: "البرز",
    cities: ["کرج", "فردیس", "کمال‌شهر", "نظرآباد", "محمدشهر", "هشتگرد", "اشتهارد"],
  },
  {
    id: 7,
    name: "خوزستان",
    cities: ["اهواز", "دزفول", "آبادان", "بندر ماهشهر", "خرمشهر", "شوشتر", "اندیمشک", "ایذه"],
  },
  {
    id: 8,
    name: "مازندران",
    cities: ["ساری", "بابل", "آمل", "قائم‌شهر", "بابلسر", "چالوس", "تنکابن", "نوشهر", "رامسر"],
  },
  {
    id: 9,
    name: "گیلان",
    cities: ["رشت", "بندر انزلی", "لاهیجان", "لنگرود", "فومن", "تالش", "آستارا", "صومعه‌سرا"],
  },
  {
    id: 10,
    name: "قم",
    cities: ["قم", "قنوات", "جعفریه", "کهک"],
  },
  {
    id: 11,
    name: "یزد",
    cities: ["یزد", "میبد", "اردکان", "مهریز", "بافق", "ابرکوه"],
  },
  {
    id: 12,
    name: "کرمان",
    cities: ["کرمان", "سیرجان", "رفسنجان", "جیرفت", "بم", "زرند"],
  },
  {
    id: 13,
    name: "مرکزی",
    cities: ["اراک", "ساوه", "خمین", "محلات", "دلیجان", "شازند"],
  },
];

export async function fetchProvinces(): Promise<Province[]> {
  await new Promise((resolve) => setTimeout(resolve, 80));
  return iranProvinces;
}

export async function fetchCitiesByProvince(provinceName: string): Promise<string[]> {
  await new Promise((resolve) => setTimeout(resolve, 60));
  const found = iranProvinces.find((p) => p.name === provinceName);
  return found ? found.cities : [];
}
