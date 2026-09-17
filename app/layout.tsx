import type { Metadata } from "next";
import { Vazirmatn } from "next/font/google";
import { ThemeProvider } from "@/components/theme/theme-provider";
import "./globals.css";

const vazir = Vazirmatn({
  subsets: ["arabic", "latin"],
  variable: "--font-vazir",
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  title: "پویان افزار | فروشگاه تخصصی لوازم جانبی موبایل و قطعات کامپیوتر",
  description: "مرجع تخصصی خرید لوازم جانبی موبایل، قطعات کامپیوتر و تجهیزات گیمینگ با ضمانت اصالت کالا و ارسال سریع به سراسر کشور.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fa" dir="rtl" className={`${vazir.variable} font-sans`}>
      <body className="min-h-screen flex flex-col bg-[#f8fafc] text-slate-900 antialiased selection:bg-blue-100 selection:text-blue-900">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
