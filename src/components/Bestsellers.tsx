import React, { useState } from 'react';
import { Product } from '../types';
import { ProductCard } from './ProductCard';

interface BestsellersProps {
  products: Product[];
  wishlistIds: string[];
  onToggleWishlist: (product: Product) => void;
  onQuickAdd: (product: Product) => void;
  onSelectProduct: (product: Product) => void;
  onViewAll: () => void;
}

export const Bestsellers: React.FC<BestsellersProps> = ({
  products,
  wishlistIds,
  onToggleWishlist,
  onQuickAdd,
  onSelectProduct,
  onViewAll,
}) => {
  const [activeFilter, setActiveFilter] = useState<string>('ALL');

  const filteredProducts =
    activeFilter === 'ALL'
      ? products
      : products.filter(
          (p) =>
            p.family.toUpperCase() === activeFilter ||
            p.classification.toUpperCase().includes(activeFilter)
        );

  return (
    <section id="bestsellers" className="py-20 sm:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12 sm:mb-16 border-b border-[#D8C9B5]/40 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="w-4 h-[1px] bg-[#B69A69]" />
            <span className="text-[11px] font-sans tracking-[0.24em] uppercase text-[#8C8175] font-medium">
              SIGNATURE CREATIONS
            </span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-[#211C19]">
            BESTSELLERS
          </h2>
        </div>

        {/* Clean Filter Controls & View All */}
        <div className="flex items-center gap-6">
          <div className="hidden md:flex items-center gap-4 text-xs font-sans tracking-widest text-[#8C8175]">
            {['ALL', 'WOODY', 'FLORAL', 'FRESH'].map((filter) => (
              <button
                key={filter}
                type="button"
                onClick={() => setActiveFilter(filter)}
                className={`transition-colors py-1 cursor-pointer ${
                  activeFilter === filter
                    ? 'text-[#211C19] border-b border-[#211C19] font-medium'
                    : 'hover:text-[#211C19]'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={onViewAll}
            className="text-xs font-sans tracking-[0.2em] uppercase text-[#211C19] hover:text-[#B69A69] transition-colors flex items-center gap-1.5 font-medium cursor-pointer group"
          >
            <span>VIEW ALL</span>
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </button>
        </div>
      </div>

      {/* Grid of Signature Perfumes */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4 sm:gap-6">
        {filteredProducts.slice(0, 5).map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            isWishlisted={wishlistIds.includes(product.id)}
            onToggleWishlist={onToggleWishlist}
            onQuickAdd={onQuickAdd}
            onSelectProduct={onSelectProduct}
          />
        ))}
      </div>
    </section>
  );
};
