import React from 'react';
import { X, Sparkles } from 'lucide-react';

interface StoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onShop: () => void;
}

export const StoryModal: React.FC<StoryModalProps> = ({ isOpen, onClose, onShop }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#211C19]/60 backdrop-blur-md animate-in fade-in duration-300">
      <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-[#F5F0E8] border border-[#B69A69]/40 rounded-xs shadow-2xl p-6 sm:p-12">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-6 right-6 text-[#8C8175] hover:text-[#211C19] p-1 cursor-pointer"
          aria-label="Close story"
        >
          <X size={22} />
        </button>

        {/* Story Content */}
        <div className="flex flex-col items-center text-center">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-5 h-[1px] bg-[#B69A69]" />
            <span className="text-[10px] font-sans tracking-[0.25em] uppercase text-[#8C8175] font-medium">
              MAISON KIYORA · HAUTE PARFUMERIE
            </span>
            <span className="w-5 h-[1px] bg-[#B69A69]" />
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl text-[#211C19] mb-4">
            The Philosophy of Pure Scent
          </h2>

          <p className="font-serif italic text-lg text-[#B69A69] mb-8">
            "We do not create fragrances for rooms. We formulate emotional anchors that endure."
          </p>

          <div className="space-y-6 text-sm text-[#312A26] font-light leading-relaxed text-left max-w-xl">
            <p>
              Maison Kiyora was founded on a singular conviction: that modern fragrance has been hurried, diluted, and stripped of tactile mystery. We returned to the sacred discipline of slow perfumery.
            </p>

            <p>
              Each formula is blended in Grasse, France, using wild-harvested botanicals and aged resin extractions. We allow every flacon a mandatory eight-week cellar maceration period, allowing volatile top notes to seamlessly marry with deep base resins.
            </p>

            <div className="p-6 my-6 bg-[#EEE7DC]/70 border-l-2 border-[#B69A69] rounded-xs">
              <h4 className="font-serif text-base text-[#211C19] mb-1">
                The 28% Extrait Standard
              </h4>
              <p className="text-xs text-[#8C8175]">
                Unlike conventional eaux de toilette containing less than 12% perfume oil, every Maison Kiyora bottle is formulated at a minimum 28% concentration — yielding unrivaled tenacity and skin affinity that evolves over 12+ hours.
              </p>
            </div>

            <p>
              Our architectural flacons are pressed from heavy French optical crystal, weighted to rest intentionally in the hand, and sealed with a solid brushed champagne gold cap.
            </p>
          </div>

          <div className="mt-10 pt-6 border-t border-[#D8C9B5]/60 flex flex-col sm:flex-row items-center justify-between w-full max-w-xl gap-4">
            <div>
              <p className="font-serif text-base text-[#211C19]">Maison Kiyora Atelier</p>
              <p className="text-xs text-[#8C8175]">Paris · New Delhi</p>
            </div>

            <button
              type="button"
              onClick={() => {
                onClose();
                onShop();
              }}
              className="btn-luxury-primary text-xs py-3 px-6 cursor-pointer"
            >
              EXPLORE THE CREATIONS
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
