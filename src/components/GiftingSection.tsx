import React, { useState } from 'react';
import { Gift, Feather, Shield, X, Check } from 'lucide-react';

interface GiftingSectionProps {
  onAddGiftWrapToCart?: () => void;
}

export const GiftingSection: React.FC<GiftingSectionProps> = ({ onAddGiftWrapToCart }) => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [selectedGiftOption, setSelectedGiftOption] = useState<string | null>(null);

  const giftingTiers = [
    {
      id: 'calligraphy',
      title: 'Calligraphy Message Card',
      price: 'Complimentary',
      icon: Feather,
      desc: 'Handwritten on deckle-edged cotton paper, finished with a signature champagne gold wax seal.',
    },
    {
      id: 'coffret',
      title: 'Artisanal Presentation Coffret',
      price: '₹450',
      icon: Gift,
      desc: 'Rigid warm-sand gift box embossed with gold foil typography and tied with espresso grosgrain ribbon.',
    },
    {
      id: 'travel-sleeve',
      title: 'Saffiano Leather Travel Flacon',
      price: '₹1,200',
      icon: Shield,
      desc: 'A bespoke 10ml travel-ready atomizer enveloped in hand-stitched caramel Saffiano leather.',
    },
  ];

  return (
    <>
      <section id="gifting" className="py-20 sm:py-28 bg-[#F5F0E8] border-t border-[#D8C9B5]/40 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-xs overflow-hidden bg-radial from-[#FBF8F3] via-[#EEE6DA] to-[#E3D7C7]/80 p-8 sm:p-14 lg:p-20 border border-[#B69A69]/40 shadow-lg">
            {/* Subtle champagne border highlight (Section 18) */}
            <div className="absolute inset-2 sm:inset-3 border border-[#B69A69]/20 pointer-events-none rounded-2xs" />

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              {/* Left Column: Heading and CTA */}
              <div className="lg:col-span-6 flex flex-col items-start">
                <span className="text-[10px] font-sans tracking-[0.26em] uppercase text-[#B69A69] font-semibold mb-3">
                  ART OF PRESENTATION
                </span>

                <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-[#211C19] mb-3">
                  THE PERFECT GIFT
                </h2>

                <p className="text-base sm:text-lg text-[#312A26]/85 font-light mb-8">
                  Make it memorable.
                </p>

                <button
                  type="button"
                  onClick={() => setModalOpen(true)}
                  className="btn-luxury-primary cursor-pointer text-center"
                >
                  EXPLORE GIFTING
                </button>
              </div>

              {/* Right Column: Glass Overlay Panel (Section 18) */}
              <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-6 rounded-xs glass-panel shadow-sm border border-white/70">
                  <Feather size={20} className="text-[#B69A69] mb-3" />
                  <h3 className="font-serif text-lg text-[#211C19] mb-1">
                    Bespoke Inscription
                  </h3>
                  <p className="text-xs text-[#8C8175] font-light leading-relaxed">
                    Personalized message inscribed on heavyweight cotton stock with signature wax seal.
                  </p>
                </div>

                <div className="p-6 rounded-xs glass-panel shadow-sm border border-white/70">
                  <Gift size={20} className="text-[#B69A69] mb-3" />
                  <h3 className="font-serif text-lg text-[#211C19] mb-1">
                    Signature Coffret
                  </h3>
                  <p className="text-xs text-[#8C8175] font-light leading-relaxed">
                    Fluted protective presentation coffret with champagne satin interior and grosgrain ties.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gifting Options Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-[#211C19]/65 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-300 font-sans">
          <div className="bg-[#FAF8F5] max-w-xl w-full border border-[#D8C9B5] rounded-xs shadow-2xl p-6 sm:p-10 relative">
            <button
              type="button"
              onClick={() => setModalOpen(false)}
              className="absolute top-5 right-5 p-2 text-[#8C8175] hover:text-[#211C19] transition-colors cursor-pointer"
            >
              <X size={20} strokeWidth={1.5} />
            </button>

            <span className="text-[10px] font-sans tracking-[0.26em] uppercase text-[#B69A69] font-semibold block mb-1">
              HAUTE PARFUMERIE
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl text-[#211C19] mb-6">
              Complimentary & Artisanal Gifting
            </h2>

            <div className="space-y-3 mb-8">
              {giftingTiers.map((tier) => {
                const Icon = tier.icon;
                const isSelected = selectedGiftOption === tier.id;
                return (
                  <div
                    key={tier.id}
                    onClick={() => setSelectedGiftOption(tier.id)}
                    className={`p-4 rounded-xs border transition-all cursor-pointer flex items-start gap-4 ${
                      isSelected
                        ? 'border-[#211C19] bg-white shadow-xs'
                        : 'border-[#D8C9B5]/60 hover:border-[#B69A69] bg-[#FAF8F5]'
                    }`}
                  >
                    <div className="w-10 h-10 rounded-full bg-[#F5F0E8] border border-[#D8C9B5] flex items-center justify-center shrink-0 mt-0.5">
                      <Icon size={18} className="text-[#B69A69]" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-serif text-base text-[#211C19] font-medium">{tier.title}</h4>
                        <span className="text-xs font-sans font-semibold text-[#211C19] tabular-nums">
                          {tier.price}
                        </span>
                      </div>
                      <p className="text-xs text-[#8C8175] font-light mt-1 leading-relaxed">
                        {tier.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#D8C9B5]/40">
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="btn-luxury-outline text-xs py-2 px-5 cursor-pointer"
              >
                Close
              </button>
              <button
                type="button"
                onClick={() => {
                  onAddGiftWrapToCart?.();
                  setModalOpen(false);
                }}
                className="btn-luxury-primary text-xs py-2 px-6 cursor-pointer"
              >
                ADD TO CURRENT ORDER
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
