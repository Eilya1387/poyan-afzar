import React from "react";
import { Truck, ShieldCheck, Headphones, RotateCcw } from "lucide-react";

const features = [
  {
    title: "ارسال سریع",
    desc: "تحویل در کمترین زمان",
    icon: Truck,
  },
  {
    title: "ضمانت اصالت",
    desc: "تضمین سلامت و اصالت کالا",
    icon: ShieldCheck,
  },
  {
    title: "پشتیبانی تخصصی",
    desc: "پاسخ‌گویی ۷ روز هفته",
    icon: Headphones,
  },
  {
    title: "بازگشت کالا",
    desc: "تا ۷ روز ضمانت بازگشت",
    icon: RotateCcw,
  },
];

export function Features() {
  return (
    <section className="py-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {features.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.title}
              className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 flex items-center justify-between hover:border-slate-300 hover:shadow-xs transition-all duration-200"
            >
              <div className="flex flex-col text-right">
                <span className="text-sm font-black text-slate-800">
                  {item.title}
                </span>
                <span className="text-xs text-slate-600 mt-1 font-medium">
                  {item.desc}
                </span>
              </div>

              <div className="w-11 h-11 rounded-xl bg-blue-50/80 border border-blue-100 flex items-center justify-center text-[#2563eb] shrink-0">
                <Icon className="w-5 h-5" />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
