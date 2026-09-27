import type { Metadata } from "next";
import { Vazirmatn } from "next/font/google";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { AuthProvider } from "@/components/auth/auth-context";
import { BottomNav } from "@/components/layout/bottom-nav";
import { Toaster } from "@/components/ui/toast";
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
    <html
      lang="fa"
      dir="rtl"
      suppressHydrationWarning
      className={`${vazir.variable} font-sans`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var saved = localStorage.getItem('poyan_theme') || localStorage.getItem('tekmarket_theme');
                  var theme = saved === 'dark' ? 'dark' : 'light';
                  if (theme === 'dark') {
                    document.documentElement.classList.add('dark');
                    document.documentElement.setAttribute('data-theme', 'dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                    document.documentElement.setAttribute('data-theme', 'light');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="min-h-screen flex flex-col bg-[#f8fafc] text-slate-900 dark:bg-[#0b0f19] dark:text-slate-100 antialiased selection:bg-blue-100 dark:selection:bg-blue-900/60 selection:text-blue-900 dark:selection:text-blue-100 transition-colors duration-200">
        <ThemeProvider>
          <AuthProvider>
            {children}
            <BottomNav />
            <Toaster />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
