import React from "react";
import { Zap, Headphones, BatteryCharging, Shield, Cpu, Sparkles } from "lucide-react";
import { FeatureCard } from "@/lib/products";

interface ProductIntroProps {
  title: string;
  description: string;
  cards: FeatureCard[];
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Zap,
  Headphones,
  BatteryCharging,
  Shield,
  Cpu,
  Sparkles,
};

export function ProductIntro({ title, description, cards }: ProductIntroProps) {
  return (
    <section id="intro" className="rounded-2xl border border-slate-200 bg-white p-6 md:p-8 space-y-6 shadow-2xs text-right">
      <div>
        <h2 className="text-base sm:text-lg md:text-xl font-black text-slate-900 mb-3">
          {title}
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
          {description}
        </p>
      </div>

      {cards.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          {cards.map((card, idx) => {
            const IconComponent = iconMap[card.icon] || Sparkles;
            return (
              <div
                key={idx}
                className="rounded-2xl border border-slate-200/90 bg-slate-50/50 p-4 sm:p-5 flex flex-col justify-between gap-3 text-right hover:border-slate-300 hover:shadow-2xs transition-all duration-200"
              >
                <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-[#2563eb]">
                  <IconComponent className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xs sm:text-sm font-black text-slate-800 mb-1">
                    {card.title}
                  </h3>
                  <p className="text-[11px] sm:text-xs text-slate-500 leading-normal font-medium">
                    {card.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
