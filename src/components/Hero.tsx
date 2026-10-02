import React from 'react';
import { PerfumeBottleVisual } from './PerfumeBottleVisual';

interface HeroProps {
  onDiscover: () => void;
  onOurStory: () => void;
  onExploreProduct: (id: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onDiscover, onOurStory, onExploreProduct }) => {
  return (
    <>
      <section
        id="hero"
        className="relative min-h-[90vh] sm:min-h-screen pt-28 sm:pt-32 pb-16 lg:pb-24 flex items-center justify-center bg-[#F5F0E8] overflow-hidden"
      >
        {/* Cinematic Studio Lighting: Warm Studio Ambience */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {/* Soft directional studio key light from upper right */}
          <div className="absolute -top-32 right-0 w-[600px] lg:w-[850px] h-[600px] lg:h-[850px] bg-radial from-[#FBF8F3] via-[#EEE6DA]/50 to-transparent rounded-full blur-3xl opacity-80" />

          {/* Subtle horizontal champagne light reflection behind the flacon */}
          <div className="absolute top-[42%] right-[5%] lg:right-[15%] w-[380px] lg:w-[580px] h-[70px] hero-light-streak pointer-events-none" />

          {/* Very delicate botanical contour silhouette */}
          <svg
            className="absolute -right-8 top-[18%] w-[340px] h-[480px] text-[#A89A8A]/10 blur-[1px] transform rotate-6 pointer-events-none hidden lg:block"
            viewBox="0 0 200 300"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M100 20 C110 50 150 70 170 110 C150 120 120 100 110 90 C120 120 150 150 160 190 C140 190 120 170 105 150 C110 180 130 220 135 260 C120 250 105 230 100 210 C95 230 80 250 65 260 C70 220 90 180 95 150 C80 170 60 190 40 190 C50 150 80 120 90 90 C80 100 50 120 30 110 C50 70 90 50 100 20 Z" />
          </svg>

          {/* Clean baseline architectural divider line */}
          <div className="absolute inset-x-0 bottom-0 h-[1px] bg-gradient-to-r from-transparent via-[#D8C9B5]/40 to-transparent" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          {/* Responsive Layout: On mobile cleanly stacked, on desktop 12-column editorial split */}
          <div className="flex flex-col lg:grid lg:grid-cols-12 gap-10 lg:gap-8 items-center">
            {/* LEFT: EDITORIAL CAMPAIGN TYPOGRAPHY */}
            <div className="w-full lg:col-span-6 flex flex-col items-start text-left max-w-xl">
              {/* Eyebrow */}
              <div className="flex flex-col gap-1 mb-5 sm:mb-6">
                <span className="text-[10px] sm:text-[11px] font-sans tracking-[0.28em] uppercase text-[#B69A69] font-semibold">
                  MODERN PERFUMERY
                </span>
                <span className="text-[9px] sm:text-[10px] font-sans tracking-[0.22em] uppercase text-[#8C8175]">
                  ROOTED IN ART
                </span>
              </div>

              {/* Large Classic Serif Heading */}
              <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-[76px] font-normal leading-[1.03] tracking-[-0.015em] text-[#211C19] mb-5 sm:mb-6">
                A SCENT
                <br />
                <span className="italic font-light text-[#211C19]/90">THAT STAYS.</span>
              </h1>

              {/* Short Supporting Sentence (1-2 lines) */}
              <p className="text-base sm:text-lg text-[#312A26]/85 font-light leading-relaxed mb-8 sm:mb-10 max-w-md">
                More than a fragrance.
                <br />
                A feeling to remember.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 sm:gap-4 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={onDiscover}
                  className="btn-luxury-primary cursor-pointer text-center"
                >
                  DISCOVER THE COLLECTION
                </button>

                <button
                  type="button"
                  onClick={onOurStory}
                  className="btn-luxury-outline cursor-pointer text-center"
                >
                  OUR STORY
                </button>
              </div>

              {/* Subtle Campaign Credential */}
              <div className="mt-8 sm:mt-12 pt-5 sm:pt-6 border-t border-[#D8C9B5]/40 flex items-center gap-6 w-full">
                <div>
                  <span className="text-[9px] font-sans tracking-[0.24em] uppercase text-[#8C8175] block">
                    ATELIER CREATION
                  </span>
                  <button
                    type="button"
                    onClick={() => onExploreProduct('oody-raspberry')}
                    className="text-xs font-serif tracking-wider text-[#211C19] hover:text-[#B69A69] transition-colors mt-0.5 cursor-pointer flex items-center gap-1.5"
                  >
                    <span>OODY RASPBERRY — EXTRAIT</span>
                    <span className="text-[10px] text-[#B69A69]">→</span>
                  </button>
                </div>
                <div className="h-6 w-[1px] bg-[#D8C9B5]/50" />
                <div>
                  <span className="text-[9px] font-sans tracking-[0.24em] uppercase text-[#8C8175] block">
                    CONCENTRATION
                  </span>
                  <span className="text-xs font-sans tracking-wide text-[#312A26]">
                    28% Pure Absolutes
                  </span>
                </div>
              </div>
            </div>

            {/* RIGHT: CINEMATIC MAISON KIYORA PRODUCT FLACON */}
            <div className="w-full lg:col-span-6 flex flex-col items-center justify-center relative pt-4 sm:pt-8 lg:pt-0">
              {/* Product Presentation Pedestal & Glass Reflection Stage */}
              <div
                onClick={() => onExploreProduct('oody-raspberry')}
                className="relative cursor-pointer flex flex-col items-center justify-center group"
                title="Explore Oody Raspberry"
              >
                {/* Flacon */}
                <PerfumeBottleVisual
                  name="OODY RASPBERRY"
                  size="hero"
                  interactive={true}
                  className="transition-transform duration-700 ease-out"
                />

                {/* Subtle Reflected Base Mirroring below */}
                <div className="w-[180px] sm:w-[220px] h-[35px] -mt-4 opacity-25 blur-[1.5px] transform scale-y-[-0.35] flacon-reflection pointer-events-none hidden sm:block">
                  <div className="w-full h-full bg-gradient-to-b from-[#8a2b38] to-transparent rounded-t-xl" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =================================================================== */}
      {/* SECTION 11: HERO TRANSITION — CRAFTED FOR THE SENSES */}
      {/* =================================================================== */}
      <section className="bg-[#F5F0E8] py-16 sm:py-24 text-center relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 flex flex-col items-center">
          {/* Thin Champagne Hairline */}
          <div className="w-16 sm:w-24 h-[1px] bg-[#B69A69]/60 mb-6 sm:mb-8" />

          {/* Centered Spaced Text */}
          <h2 className="font-serif text-xl sm:text-2xl md:text-3xl text-[#211C19] font-light tracking-[0.22em] uppercase leading-relaxed">
            CRAFTED FOR
            <br />
            THE SENSES
          </h2>

          <p className="text-xs sm:text-sm text-[#8C8175] font-light tracking-widest uppercase mt-4 max-w-md">
            Distilled in Grasse · Bottled in Architectural Crystal
          </p>

          <div className="w-8 sm:w-12 h-[1px] bg-[#D8C9B5]/60 mt-6 sm:mt-8" />
        </div>
      </section>
    </>
  );
};
