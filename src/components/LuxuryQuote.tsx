import React from 'react';

export const LuxuryQuote: React.FC = () => {
  return (
    <section className="py-24 sm:py-36 bg-[#F5F0E8] text-center overflow-hidden relative">
      {/* Subtle ambient light gradient */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-radial from-[#FBF8F3] to-transparent rounded-full blur-2xl pointer-events-none opacity-60" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10 flex flex-col items-center">
        <span className="w-12 h-[1px] bg-[#B69A69]/60 mb-8 sm:mb-10" />

        <blockquote className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light text-[#211C19] leading-snug tracking-normal italic max-w-3xl">
          “A fragrance becomes part of the memory.”
        </blockquote>

        <p className="text-[10px] sm:text-[11px] font-sans tracking-[0.28em] uppercase text-[#8C8175] font-medium mt-8 sm:mt-10">
          MAISON KIYORA · PARIS & GRASSE
        </p>

        <span className="w-6 h-[1px] bg-[#D8C9B5]/60 mt-8 sm:mt-10" />
      </div>
    </section>
  );
};
