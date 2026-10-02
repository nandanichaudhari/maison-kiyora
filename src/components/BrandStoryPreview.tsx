import React from 'react';
import { ArrowRight } from 'lucide-react';
import { PerfumeBottleVisual } from './PerfumeBottleVisual';

interface BrandStoryPreviewProps {
  onOpenStory: () => void;
}

export const BrandStoryPreview: React.FC<BrandStoryPreviewProps> = ({ onOpenStory }) => {
  return (
    <section className="py-20 sm:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="relative rounded-xs overflow-hidden bg-radial from-[#FBF8F3] via-[#EEE6DA] to-[#E3D7C7]/70 border border-[#D8C9B5]/60 p-8 sm:p-14 lg:p-20 shadow-md">
        {/* Subtle decorative hairline ring */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] border border-[#B69A69]/15 rounded-full pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left: Heading and short lines */}
          <div className="lg:col-span-8 flex flex-col items-start text-left">
            <span className="text-[10px] font-sans tracking-[0.26em] uppercase text-[#B69A69] font-semibold mb-3">
              PHILOSOPHY & FOUNDING
            </span>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-[#211C19] mb-4">
              THE ART OF SCENT
            </h2>

            <p className="text-base sm:text-lg text-[#312A26]/85 font-light max-w-lg mb-8 leading-relaxed">
              Fragrance created to become part of your story.
              <br />
              Formulated in Grasse with patience, precision, and silence.
            </p>

            <button
              type="button"
              onClick={onOpenStory}
              className="btn-luxury-outline text-xs tracking-[0.2em] py-3.5 px-8 cursor-pointer flex items-center gap-2 group"
            >
              <span>OUR STORY</span>
              <ArrowRight size={13} className="text-[#B69A69] transition-transform group-hover:translate-x-1" />
            </button>
          </div>

          {/* Right: Small subtle flacon accent */}
          <div className="lg:col-span-4 hidden lg:flex justify-center pointer-events-none">
            <div className="w-40 h-52 flex items-center justify-center opacity-85">
              <PerfumeBottleVisual
                name="SANTAL BLANC"
                size="sm"
                interactive={false}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
