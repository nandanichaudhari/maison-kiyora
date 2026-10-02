import React, { useState } from 'react';
import { Product, OlfactoryFamily } from '../types';
import { PerfumeBottleVisual } from './PerfumeBottleVisual';
import { ArrowUpRight } from 'lucide-react';

interface CollectionFeatureProps {
  products: Product[];
  onShopCollection: () => void;
  onSelectProduct: (product: Product) => void;
  onAddToBag: (product: Product) => void;
}

export const CollectionFeature: React.FC<CollectionFeatureProps> = ({
  products,
  onShopCollection,
  onSelectProduct,
  onAddToBag,
}) => {
  const categories: { label: string; family: OlfactoryFamily; sub: string }[] = [
    { label: 'WOODY', family: 'Woody', sub: 'Smoked agarwood & warm Australian sandalwood' },
    { label: 'FLORAL', family: 'Floral', sub: 'Nocturnal Bulgarian rose & Grasse centifolia' },
    { label: 'CITRUS', family: 'Citrus', sub: 'Cold-pressed Calabrian bergamot & orange flower' },
    { label: 'SPICY', family: 'Spicy', sub: 'Rare saffron threads & crushed pink peppercorn' },
    { label: 'FRESH', family: 'Fresh', sub: 'Aged Florentine orris root & crystalline dew' },
  ];

  const [selectedCategory, setSelectedCategory] = useState<OlfactoryFamily>('Woody');

  const activeCategoryConfig = categories.find((c) => c.family === selectedCategory) || categories[0];

  // Match perfume to category
  const matchingProduct =
    products.find((p) => p.family === selectedCategory) ||
    products.find((p) => p.classification.toLowerCase().includes(selectedCategory.toLowerCase())) ||
    products[0];

  return (
    <section id="collections" className="py-20 sm:py-32 bg-[#F5F0E8] border-t border-[#D8C9B5]/40 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading & Short Text */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12 sm:mb-16 border-b border-[#D8C9B5]/40 pb-6">
          <div>
            <span className="text-[10px] font-sans tracking-[0.26em] uppercase text-[#B69A69] font-semibold block mb-2">
              THE OLFACTORY ANTHOLOGY
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#211C19]">
              EXPLORE THE COLLECTION
            </h2>
            <p className="text-sm sm:text-base text-[#8C8175] font-light mt-1.5">
              Five unique scents.
            </p>
          </div>

          {/* Interactive Underline Category Tabs (Section 15) */}
          <div className="flex items-center gap-6 sm:gap-8 overflow-x-auto pb-1 sm:pb-0">
            {categories.map((cat) => {
              const isSelected = selectedCategory === cat.family;
              return (
                <button
                  key={cat.label}
                  type="button"
                  onClick={() => setSelectedCategory(cat.family)}
                  className={`relative py-1.5 text-xs font-sans tracking-[0.22em] uppercase transition-colors cursor-pointer whitespace-nowrap ${
                    isSelected
                      ? 'text-[#211C19] font-semibold'
                      : 'text-[#8C8175] hover:text-[#211C19]'
                  }`}
                >
                  <span>{cat.label}</span>
                  <span
                    className={`absolute bottom-0 left-0 h-[1.5px] bg-[#B69A69] transition-all duration-400 ease-out ${
                      isSelected ? 'w-full' : 'w-0'
                    }`}
                  />
                </button>
              );
            })}
          </div>
        </div>

        {/* Large Editorial Showcase Stage with Transparent Glass Overlay Panel */}
        <div className="relative rounded-xs overflow-hidden bg-radial from-[#FBF8F3] via-[#EEE6DA] to-[#E3D7C7]/70 border border-[#D8C9B5]/70 p-6 sm:p-12 lg:p-16 shadow-lg">
          {/* Subtle champagne light glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-[#B69A69]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* LEFT / CENTER: TRANSPARENT GLASS OVERLAY PANEL */}
            <div className="lg:col-span-6 flex flex-col items-start order-2 lg:order-1">
              <div className="glass-panel p-8 sm:p-10 rounded-xs border border-white/80 max-w-lg w-full shadow-xl space-y-6">
                <div>
                  <span className="text-[10px] font-sans tracking-[0.24em] uppercase text-[#B69A69] font-medium block mb-2">
                    FAMILY: {activeCategoryConfig.label}
                  </span>
                  <h3 className="font-serif text-3xl sm:text-4xl text-[#211C19] font-light leading-snug">
                    {matchingProduct.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#8C8175] font-light mt-2 leading-relaxed">
                    {activeCategoryConfig.sub}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#D8C9B5]/40 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] uppercase font-sans tracking-widest text-[#8C8175] block">
                      SIGNATURE FORMULATION
                    </span>
                    <span className="font-serif text-xl font-medium text-[#211C19]">
                      ₹{matchingProduct.price.toLocaleString('en-IN')}
                    </span>
                  </div>
                  <span className="text-xs font-sans text-[#8C8175] tracking-wider uppercase">
                    100ml Extrait
                  </span>
                </div>

                <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                  <button
                    type="button"
                    onClick={() => onSelectProduct(matchingProduct)}
                    className="btn-luxury-primary text-center"
                  >
                    DISCOVER FRAGRANCE
                  </button>

                  <button
                    type="button"
                    onClick={onShopCollection}
                    className="btn-luxury-outline text-center flex items-center justify-center gap-1.5"
                  >
                    <span>VIEW ALL SCENTS</span>
                    <ArrowUpRight size={13} />
                  </button>
                </div>
              </div>
            </div>

            {/* RIGHT: LARGE REAL MAISON KIYORA PERFUME FLACON */}
            <div className="lg:col-span-6 flex flex-col items-center justify-center order-1 lg:order-2">
              <div
                onClick={() => onSelectProduct(matchingProduct)}
                className="cursor-pointer group flex flex-col items-center justify-center transition-transform duration-700 ease-out hover:scale-[1.02]"
              >
                <PerfumeBottleVisual
                  name={matchingProduct.name}
                  liquidColor={matchingProduct.liquidColor}
                  liquidHighlight={matchingProduct.liquidHighlight}
                  size="hero"
                  interactive={true}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
