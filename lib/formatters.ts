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
export function formatPersianDate(input?: string | number | Date | null): string {
  if (!input) return "نامحدود";
  const str = String(input).trim();
  if (!str || str === "null" || str === "undefined") return "نامحدود";

  if (str.includes("۱۴۰") || str.includes("140")) {
    return toPersianDigits(str);
  }

  try {
    const date = typeof input === "string" || typeof input === "number" ? new Date(input) : (input as Date);
    if (isNaN(date.getTime())) {
      return toPersianDigits(str);
    }
    return new Intl.DateTimeFormat("fa-IR-u-ca-persian", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).format(date);
  } catch {
    return toPersianDigits(str);
  }
}

/**
 * تبدیل رشته تاریخ شمسی به رشته ISO گرگوری جهت ارسال به بکند
 */
export function jalaliToGregorianISO(jalaliStr?: string | null): string | undefined {
  if (!jalaliStr) return undefined;
  const str = String(jalaliStr).trim();
  if (!str) return undefined;
  if (str.includes("T") && str.includes("Z")) return str;

  const persianDigits = "۰۱۲۳۴۵۶۷۸۹";
  const clean = str.replace(/[۰-۹]/g, (w) => String(persianDigits.indexOf(w))).trim();
  const parts = clean.split(/[/\\.-]/).map(Number);
  if (parts.length !== 3 || isNaN(parts[0]) || isNaN(parts[1]) || isNaN(parts[2])) {
    try {
      const d = new Date(str);
      if (!isNaN(d.getTime())) return d.toISOString();
    } catch {}
    return undefined;
  }
  const [jy, jm, jd] = parts;

  let gy = jy <= 979 ? 621 : 1600;
  let jYear = jy <= 979 ? jy : jy - 979;
  let days =
    365 * jYear +
    Math.floor(jYear / 33) * 8 +
    Math.floor(((jYear % 33) + 3) / 4) +
    78 +
    jd +
    (jm < 7 ? (jm - 1) * 31 : (jm - 7) * 30 + 186);
  gy += 400 * Math.floor(days / 146097);
  days %= 146097;
  if (days >= 36525) {
    days--;
    gy += 100 * Math.floor(days / 36524);
    days %= 36524;
    if (days >= 366) days++;
  }
  gy += 4 * Math.floor(days / 1461);
  days %= 1461;
  if (days >= 366) {
    days--;
    gy += Math.floor(days / 365);
    days %= 365;
  }
  let gm = 0;
  let gd = 0;
  const sal_a = [
    0,
    31,
    (gy % 4 === 0 && gy % 100 !== 0) || gy % 400 === 0 ? 29 : 28,
    31,
    30,
    31,
    30,
    31,
    31,
    30,
    31,
    30,
    31,
  ];
  for (gm = 0; gm < 13; gm++) {
    const v = sal_a[gm];
    if (days < v) break;
    days -= v;
  }
  gd = days + 1;
  return new Date(Date.UTC(gy, gm - 1, gd, 12, 0, 0)).toISOString();
}
