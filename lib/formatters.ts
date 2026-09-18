export function toPersianDigits(n: number | string): string {
  if (n === null || n === undefined) return "";
  const farsiDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
  return n
    .toString()
    .replace(/\d/g, (x) => farsiDigits[parseInt(x, 10)]);
}

export function formatPriceFa(price: number): string {
  const formatted = price.toLocaleString("en-US");
  return toPersianDigits(formatted);
}

/**
 * دریافت تاریخ امروز به تقویم هجری شمسی (مثال: ۱۴۰۳/۱۲/۲۹ یا امروز)
 */
export function getPersianTodayDate(date: Date = new Date()): string {
  try {
    const formatter = new Intl.DateTimeFormat("fa-IR-u-ca-persian", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
    return formatter.format(date);
  } catch {
    return "۱۴۰۴/۰۱/۰۱";
  }
}

/**
 * دریافت تاریخ کامل همراه با نام روز هفته (مثال: شنبه ۲۹ شهریور ۱۴۰۴)
 */
export function getPersianFullDate(date: Date = new Date()): string {
  try {
    const formatter = new Intl.DateTimeFormat("fa-IR-u-ca-persian", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });
    return formatter.format(date);
  } catch {
    return "امروز";
  }
}

/**
 * قالب‌بندی هر تاریخ، رشته ISO یا تاریخ شمسی به رقم‌های فارسی استاندارد
 */
export function formatPersianDate(input: string | number | Date): string {
  if (!input) return "";
  try {
    const date = typeof input === "string" || typeof input === "number" ? new Date(input) : input;
    if (isNaN(date.getTime())) {
      return toPersianDigits(String(input));
    }
    return new Intl.DateTimeFormat("fa-IR-u-ca-persian", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).format(date);
  } catch {
    return toPersianDigits(String(input));
  }
}
