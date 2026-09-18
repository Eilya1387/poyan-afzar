import React from "react";
import type { Metadata } from "next";
import { LoginForm } from "@/components/auth/login-form";

export const metadata: Metadata = {
  title: "ورود و ثبت‌نام | پویان افزار",
  description: "ورود به حساب کاربری یا ثبت‌نام در فروشگاه اینترنتی پویان افزار",
};

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col justify-center items-center px-4 py-12">
      <LoginForm />
    </div>
  );
}
