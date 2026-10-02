import React from 'react';
import { Sparkles, Package, ShieldCheck, Truck } from 'lucide-react';

export const TrustBar: React.FC = () => {
  const benefits = [
    { label: 'CRAFTED FRAGRANCES', icon: Sparkles },
    { label: 'PREMIUM PACKAGING', icon: Package },
    { label: 'SECURE CHECKOUT', icon: ShieldCheck },
    { label: 'FAST DELIVERY', icon: Truck },
  ];

  return (
    <section
      id="benefits"
      className="border-y border-[#D8C9B5]/40 bg-[#F5F0E8]/70 backdrop-blur-xs py-5 sm:py-6"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 items-center">
          {benefits.map((benefit, idx) => {
            const Icon = benefit.icon;
            return (
              <div
                key={idx}
                className="flex items-center justify-center gap-2.5 text-[#211C19]/80 py-1"
              >
                <Icon size={14} className="text-[#B69A69] shrink-0" strokeWidth={1.75} />
                <span className="text-[10px] sm:text-[11px] font-sans font-medium tracking-[0.2em] uppercase whitespace-nowrap text-[#211C19]">
                  {benefit.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
