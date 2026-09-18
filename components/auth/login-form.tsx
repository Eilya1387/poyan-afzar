"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Smartphone, ArrowRight, CheckCircle2, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "./auth-context";

type Step = "phone" | "otp" | "name";

export function LoginForm() {
  const router = useRouter();
  const { login } = useAuth();

  const [step, setStep] = useState<Step>("phone");
  const [phone, setPhone] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [otpError, setOtpError] = useState("");
  const [timer, setTimer] = useState(120);
  const [canResend, setCanResend] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [nameError, setNameError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const otpInputsRef = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (step === "otp" && timer > 0) {
      interval = setInterval(() => {
        setTimer((t) => t - 1);
      }, 1000);
    } else if (timer === 0) {
      setCanResend(true);
    }
    return () => clearInterval(interval);
  }, [step, timer]);

  const toPersianDigits = (n: number | string) => {
    const persianDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
    return n.toString().replace(/[0-9]/g, (w) => persianDigits[+w]);
  };

  const handlePhoneSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanPhone = phone.trim().replace(/[۰-۹]/g, (d) =>
      String("۰۱۲۳۴۵۶۷۸۹".indexOf(d))
    );

    if (!/^09[0-9]{9}$/.test(cleanPhone)) {
      setPhoneError("لطفاً یک شماره موبایل معتبر ۱۱ رقمی (مثال: ۰۹۱۲۳۴۵۶۷۸۹) وارد کنید");
      return;
    }

    setPhoneError("");
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      setStep("otp");
      setTimer(120);
      setCanResend(false);
      setTimeout(() => {
        otpInputsRef.current[0]?.focus();
      }, 100);
    }, 400);
  };

  const handleOtpChange = (index: number, value: string) => {
    const cleanValue = value.slice(-1).replace(/[۰-۹]/g, (d) =>
      String("۰۱۲۳۴۵۶۷۸۹".indexOf(d))
    );

    if (!/^[0-9]?$/.test(cleanValue)) return;

    const newOtp = [...otp];
    newOtp[index] = cleanValue;
    setOtp(newOtp);
    setOtpError("");

    if (cleanValue && index < 3) {
      otpInputsRef.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      otpInputsRef.current[index - 1]?.focus();
    }
  };

  const handleOtpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const enteredOtp = otp.join("");

    if (enteredOtp.length !== 4) {
      setOtpError("کد تأیید ۴ رقمی را به طور کامل وارد کنید");
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setStep("name");
    }, 400);
  };

  const handleResendOtp = () => {
    if (!canResend) return;
    setTimer(120);
    setCanResend(false);
    setOtp(["", "", "", ""]);
    setOtpError("");
    otpInputsRef.current[0]?.focus();
  };

  const handleNameSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!firstName.trim() || !lastName.trim()) {
      setNameError("لطفاً نام و نام خانوادگی خود را کامل وارد کنید");
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      login({
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        phone: phone.trim(),
      });
      setIsLoading(false);
      router.push("/");
    }, 400);
  };

  const formatTimer = () => {
    const minutes = Math.floor(timer / 60);
    const seconds = timer % 60;
    return `${toPersianDigits(minutes)}:${toPersianDigits(
      seconds < 10 ? `0${seconds}` : seconds
    )}`;
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xl p-6 sm:p-8 text-right">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2.5 group cursor-pointer mb-5">
            <div className="w-10 h-10 rounded-xl bg-[#0b1528] flex items-center justify-center text-white font-black text-xl shadow-xs group-hover:bg-[#162544] transition-colors">
              <span className="text-[#38bdf8]">پ</span>
            </div>
            <span className="text-2xl font-black tracking-tight text-[#0b1528]">
              پویان <span className="text-[#2563eb]">افزار</span>
            </span>
          </Link>

          <div className="flex items-center justify-center gap-1.5 mb-3">
            <div
              className={`h-1.5 rounded-full transition-all duration-300 ${
                step === "phone"
                  ? "w-8 bg-[#2563eb]"
                  : "w-2.5 bg-emerald-500"
              }`}
            />
            <div
              className={`h-1.5 rounded-full transition-all duration-300 ${
                step === "otp"
                  ? "w-8 bg-[#2563eb]"
                  : step === "name"
                  ? "w-2.5 bg-emerald-500"
                  : "w-2.5 bg-slate-200"
              }`}
            />
            <div
              className={`h-1.5 rounded-full transition-all duration-300 ${
                step === "name" ? "w-8 bg-[#2563eb]" : "w-2.5 bg-slate-200"
              }`}
            />
          </div>

          <h1 className="text-lg sm:text-xl font-black text-slate-900">
            {step === "phone" && "ورود یا ثبت‌نام"}
            {step === "otp" && "کد تأیید را وارد کنید"}
            {step === "name" && "اطلاعات حساب کاربری"}
          </h1>

          <p className="text-xs text-slate-500 font-medium mt-1">
            {step === "phone" && "برای ادامه، لطفاً شماره موبایل خود را وارد نمایید"}
            {step === "otp" && `کد ۴ رقمی به شماره ${toPersianDigits(phone)} ارسال شد`}
            {step === "name" && "لطفاً نام و نام خانوادگی خود را جهت ساخت پروفایل وارد کنید"}
          </p>
        </div>

        {step === "phone" && (
          <form onSubmit={handlePhoneSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-2">
                شماره موبایل
              </label>
              <div className="relative">
                <input
                  type="tel"
                  dir="ltr"
                  autoFocus
                  required
                  value={phone}
                  onChange={(e) => {
                    setPhone(e.target.value);
                    setPhoneError("");
                  }}
                  placeholder="۰۹xxxxxxxxx"
                  className={`w-full bg-slate-50 border rounded-2xl py-3 px-4 pl-11 text-left text-sm font-bold text-slate-800 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 transition-all ${
                    phoneError
                      ? "border-red-400 focus:ring-red-100"
                      : "border-slate-200 focus:border-[#2563eb] focus:ring-blue-100"
                  }`}
                />
                <Smartphone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
              </div>
              {phoneError && (
                <p className="text-[11px] text-red-500 font-bold mt-1.5">{phoneError}</p>
              )}
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              isLoading={isLoading}
              className="w-full font-black text-sm rounded-xl py-3 shadow-md hover:shadow-lg"
            >
              دریافت کد تأیید
            </Button>

            <p className="text-[11px] text-slate-400 text-center leading-relaxed">
              با ورود به پویان افزار، کلیه قوانین و مقررات را می‌پذیرید.
            </p>
          </form>
        )}

        {step === "otp" && (
          <form onSubmit={handleOtpSubmit} className="space-y-6">
            <div className="flex justify-center gap-3" dir="ltr">
              {otp.map((digit, idx) => (
                <input
                  key={idx}
                  ref={(el) => {
                    otpInputsRef.current[idx] = el;
                  }}
                  type="tel"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleOtpChange(idx, e.target.value)}
                  onKeyDown={(e) => handleOtpKeyDown(idx, e)}
                  className="w-13 h-14 text-center text-xl font-black rounded-2xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-[#2563eb] focus:ring-2 focus:ring-blue-100 focus:outline-none transition-all text-slate-900"
                />
              ))}
            </div>

            {otpError && (
              <p className="text-[11px] text-red-500 font-bold text-center">{otpError}</p>
            )}

            <div className="flex items-center justify-between text-xs pt-1">
              <button
                type="button"
                onClick={() => {
                  setStep("phone");
                  setOtp(["", "", "", ""]);
                  setOtpError("");
                }}
                className="text-[#2563eb] hover:underline font-bold flex items-center gap-1 cursor-pointer"
              >
                <ArrowRight className="w-3.5 h-3.5" />
                <span>تغییر شماره</span>
              </button>

              <div className="text-slate-500 font-medium flex items-center gap-1">
                {canResend ? (
                  <button
                    type="button"
                    onClick={handleResendOtp}
                    className="text-[#2563eb] hover:underline font-bold flex items-center gap-1 cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>ارسال مجدد کد</span>
                  </button>
                ) : (
                  <span>ارسال مجدد تا {formatTimer()}</span>
                )}
              </div>
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              isLoading={isLoading}
              className="w-full font-black text-sm rounded-xl py-3 shadow-md hover:shadow-lg"
            >
              تأیید و ادامه
            </Button>
          </form>
        )}

        {step === "name" && (
          <form onSubmit={handleNameSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                نام
              </label>
              <input
                type="text"
                autoFocus
                required
                value={firstName}
                onChange={(e) => {
                  setFirstName(e.target.value);
                  setNameError("");
                }}
                placeholder="مثال: علی"
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3 px-4 text-xs sm:text-sm font-bold text-slate-800 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:border-[#2563eb] focus:ring-2 focus:ring-blue-100 transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                نام خانوادگی
              </label>
              <input
                type="text"
                required
                value={lastName}
                onChange={(e) => {
                  setLastName(e.target.value);
                  setNameError("");
                }}
                placeholder="مثال: محمدی"
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3 px-4 text-xs sm:text-sm font-bold text-slate-800 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:border-[#2563eb] focus:ring-2 focus:ring-blue-100 transition-all"
              />
            </div>

            {nameError && (
              <p className="text-[11px] text-red-500 font-bold">{nameError}</p>
            )}

            <Button
              type="submit"
              variant="primary"
              size="lg"
              isLoading={isLoading}
              className="w-full font-black text-sm rounded-xl py-3 shadow-md hover:shadow-lg mt-2"
              rightIcon={<CheckCircle2 className="w-4 h-4" />}
            >
              تکمیل ثبت‌نام و ورود
            </Button>
          </form>
        )}
      </div>
    </div>
  );
}
