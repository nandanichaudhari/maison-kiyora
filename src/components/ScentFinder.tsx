import React, { useState } from 'react';
import { Product } from '../types';
import { PerfumeBottleVisual } from './PerfumeBottleVisual';
import { Sparkles, X, Check, ArrowRight, RotateCcw } from 'lucide-react';

interface ScentFinderProps {
  products: Product[];
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
  onAddToBag: (product: Product) => void;
  onViewProduct: (product: Product) => void;
}

export const ScentFinder: React.FC<ScentFinderProps> = ({
  products,
  isOpen,
  onClose,
  onOpen,
  onAddToBag,
  onViewProduct,
}) => {
  const [step, setStep] = useState<number>(1);
  const [atmosphere, setAtmosphere] = useState<string>('');
  const [presence, setPresence] = useState<string>('');
  const [notes, setNotes] = useState<string>('');

  // Calculate matched product
  const getMatchedProduct = (): Product => {
    if (atmosphere === 'serene' || notes === 'sandalwood') {
      return products.find((p) => p.id === 'santal-blanc') || products[1];
    }
    if (atmosphere === 'grand' || notes === 'rose') {
      return products.find((p) => p.id === 'rose-imperiale') || products[2];
    }
    if (atmosphere === 'crisp' || notes === 'orris') {
      return products.find((p) => p.id === 'iris-celeste') || products[3];
    }
    if (atmosphere === 'leather') {
      return products.find((p) => p.id === 'cuir-nocturne') || products[4];
    }
    return products.find((p) => p.id === 'oody-raspberry') || products[0];
  };

  const matchedProduct = getMatchedProduct();

  const handleReset = () => {
    setStep(1);
    setAtmosphere('');
    setPresence('');
    setNotes('');
  };

  return (
    <>
      {/* =================================================================== */}
      {/* EDITORIAL BANNER SECTION (SECTION 16) */}
      {/* =================================================================== */}
      <section id="scent-finder" className="py-20 sm:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-xs overflow-hidden bg-radial from-[#FAF8F5] via-[#EEE6DA] to-[#E3D7C7]/80 p-8 sm:p-14 lg:p-20 border border-[#D8C9B5] shadow-sm">
          {/* Subtle champagne halo */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/40 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-8 lg:col-span-7 flex flex-col items-start">
              <span className="text-[10px] font-sans tracking-[0.26em] uppercase text-[#B69A69] font-semibold mb-3">
                OLFACTORY DIAGNOSTIC
              </span>

              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-[#211C19] mb-4">
                FIND YOUR SCENT
              </h2>

              <p className="text-base sm:text-lg text-[#312A26]/85 font-light mb-8 max-w-md">
                A fragrance made for your mood.
              </p>

              <button
                type="button"
                onClick={onOpen}
                className="btn-luxury-primary text-xs tracking-[0.2em] py-3.5 px-8 cursor-pointer group"
              >
                <span>TAKE THE QUIZ</span>
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </button>
            </div>

            <div className="md:col-span-4 lg:col-span-5 flex justify-center">
              {/* Glass Frosted Showcase Card */}
              <div className="p-7 rounded-xs glass-panel shadow-md flex flex-col items-center text-center max-w-xs space-y-3">
                <span className="w-8 h-8 rounded-full bg-[#B69A69]/15 text-[#B69A69] flex items-center justify-center font-serif text-xs font-semibold">
                  MK
                </span>
                <p className="font-serif text-lg text-[#211C19] tracking-wide">
                  Signature Scent Consultation
                </p>
                <p className="text-xs text-[#8C8175] font-sans leading-relaxed">
                  Three thoughtful questions to reveal the creation harmonizing with your chemistry and atmosphere.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =================================================================== */}
      {/* EDITORIAL QUIZ MODAL */}
      {/* =================================================================== */}
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-[#211C19]/65 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-300">
          <div className="bg-[#FAF8F5] max-w-2xl w-full border border-[#D8C9B5] rounded-xs shadow-2xl p-6 sm:p-10 relative font-sans max-h-[90vh] overflow-y-auto">
            {/* Close Button */}
            <button
              type="button"
              onClick={onClose}
              className="absolute top-5 right-5 p-2 text-[#8C8175] hover:text-[#211C19] transition-colors cursor-pointer"
              aria-label="Close Quiz"
            >
              <X size={20} strokeWidth={1.5} />
            </button>

            {/* Step Progress Dots */}
            <div className="flex items-center gap-2 mb-6">
              {[1, 2, 3, 4].map((s) => (
                <div
                  key={s}
                  className={`h-1 rounded-full transition-all duration-400 ${
                    step === s ? 'w-8 bg-[#B69A69]' : s < step ? 'w-4 bg-[#211C19]' : 'w-4 bg-[#D8C9B5]'
                  }`}
                />
              ))}
              <span className="text-[10px] font-mono uppercase text-[#8C8175] ml-2">
                {step <= 3 ? `Step ${step} of 3` : 'Your Scent Result'}
              </span>
            </div>

            {/* QUESTION 1: Atmosphere */}
            {step === 1 && (
              <div className="space-y-6">
                <div>
                  <span className="text-[10px] tracking-[0.24em] uppercase text-[#B69A69] font-medium block mb-1">
                    QUESTION 01
                  </span>
                  <h3 className="font-serif text-2xl sm:text-3xl text-[#211C19]">
                    What atmosphere calls to you?
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  {[
                    { id: 'opulent', label: 'Smoky, Opulent & Mysterious', sub: 'Smoldering woods and dark wild berries' },
                    { id: 'serene', label: 'Quiet, Creamy & Meditative', sub: 'Smooth Australian sandalwood and sun-warmed linen' },
                    { id: 'grand', label: 'Romantic, Aristocratic & Velvet', sub: 'Bulgarian roses and warm spice' },
                    { id: 'crisp', label: 'Powdery, Fresh & Architectural', sub: 'Florentine orris root and Italian bergamot' },
                  ].map((opt) => (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => {
                        setAtmosphere(opt.id);
                        setStep(2);
                      }}
                      className={`p-4 text-left rounded-xs border transition-all cursor-pointer ${
                        atmosphere === opt.id
                          ? 'border-[#211C19] bg-[#FAF7F2] shadow-xs'
                          : 'border-[#D8C9B5]/60 hover:border-[#B69A69] bg-white'
                      }`}
                    >
                      <p className="font-serif text-base text-[#211C19]">{opt.label}</p>
                      <p className="text-[11px] text-[#8C8175] mt-1">{opt.sub}</p>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* QUESTION 2: Presence */}
            {step === 2 && (
              <div className="space-y-6">
                <div>
                  <span className="text-[10px] tracking-[0.24em] uppercase text-[#B69A69] font-medium block mb-1">
                    QUESTION 02
                  </span>
                  <h3 className="font-serif text-2xl sm:text-3xl text-[#211C19]">
                    How do you prefer your sillage?
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  {[
                    { id: 'intimate', label: 'Close to Skin', sub: 'An intimate aura discovered only in close proximity' },
                    { id: 'statement', label: 'Room-Filling & Enveloping', sub: 'A commanding presence that lingers in your wake' },
                    { id: 'radiant', label: 'Warm & Dynamic', sub: 'Evolves gently with ambient temperature and movement' },
                    { id: 'eternal', label: '12+ Hour Extrait Density', sub: 'Uncompromising longevity and deep resinous drydown' },
                  ].map((opt) => (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => {
                        setPresence(opt.id);
                        setStep(3);
                      }}
                      className={`p-4 text-left rounded-xs border transition-all cursor-pointer ${
                        presence === opt.id
                          ? 'border-[#211C19] bg-[#FAF7F2] shadow-xs'
                          : 'border-[#D8C9B5]/60 hover:border-[#B69A69] bg-white'
                      }`}
                    >
                      <p className="font-serif text-base text-[#211C19]">{opt.label}</p>
                      <p className="text-[11px] text-[#8C8175] mt-1">{opt.sub}</p>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* QUESTION 3: Signature Note */}
            {step === 3 && (
              <div className="space-y-6">
                <div>
                  <span className="text-[10px] tracking-[0.24em] uppercase text-[#B69A69] font-medium block mb-1">
                    QUESTION 03
                  </span>
                  <h3 className="font-serif text-2xl sm:text-3xl text-[#211C19]">
                    Which raw harvest material enchants you?
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  {[
                    { id: 'oud', label: 'Cambodian Agarwood (Oud)', sub: 'Smoked, deep, hypnotic wood resin' },
                    { id: 'sandalwood', label: 'Australian Sandalwood', sub: 'Milky, warm, peaceful sacred timber' },
                    { id: 'rose', label: 'Damascena Velvet Rose', sub: 'Rich, honeyed, crimson floral absolute' },
                    { id: 'orris', label: 'Florentine Orris Root', sub: 'Aged in Tuscan cellars, silver powdery elegance' },
                  ].map((opt) => (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => {
                        setNotes(opt.id);
                        setStep(4);
                      }}
                      className={`p-4 text-left rounded-xs border transition-all cursor-pointer ${
                        notes === opt.id
                          ? 'border-[#211C19] bg-[#FAF7F2] shadow-xs'
                          : 'border-[#D8C9B5]/60 hover:border-[#B69A69] bg-white'
                      }`}
                    >
                      <p className="font-serif text-base text-[#211C19]">{opt.label}</p>
                      <p className="text-[11px] text-[#8C8175] mt-1">{opt.sub}</p>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* STEP 4: RECOMMENDATION RESULT */}
            {step === 4 && (
              <div className="text-center space-y-6 animate-in zoom-in-95 duration-400">
                <div>
                  <span className="text-[10px] tracking-[0.28em] uppercase text-[#B69A69] font-semibold block mb-1">
                    YOUR OLFACTORY AFFINITY
                  </span>
                  <h3 className="font-serif text-3xl sm:text-4xl text-[#211C19]">
                    {matchedProduct.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#8C8175] font-light mt-1">
                    {matchedProduct.subtitle}
                  </p>
                </div>

                {/* Bottle Display */}
                <div className="flex justify-center py-2">
                  <PerfumeBottleVisual
                    name={matchedProduct.name}
                    liquidColor={matchedProduct.liquidColor}
                    liquidHighlight={matchedProduct.liquidHighlight}
                    size="md"
                    interactive={false}
                  />
                </div>

                <div className="max-w-md mx-auto p-4 bg-white/70 border border-[#D8C9B5] rounded-xs text-xs text-[#312A26] leading-relaxed">
                  {matchedProduct.description}
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      onAddToBag(matchedProduct);
                      onClose();
                    }}
                    className="w-full sm:w-auto btn-luxury-primary cursor-pointer"
                  >
                    ADD TO BAG · ₹{matchedProduct.price.toLocaleString('en-IN')}
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      onViewProduct(matchedProduct);
                      onClose();
                    }}
                    className="w-full sm:w-auto btn-luxury-outline cursor-pointer"
                  >
                    VIEW CREATION DETAILS
                  </button>
                </div>

                <div>
                  <button
                    type="button"
                    onClick={handleReset}
                    className="text-xs text-[#8C8175] hover:text-[#211C19] flex items-center justify-center gap-1 mx-auto cursor-pointer"
                  >
                    <RotateCcw size={12} />
                    <span>Retake Consultation</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};
