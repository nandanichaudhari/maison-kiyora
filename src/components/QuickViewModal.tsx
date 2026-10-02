import React, { useState } from 'react';
import { Product } from '../types';
import { PerfumeBottleVisual } from './PerfumeBottleVisual';
import { X, Heart, Star, ShieldCheck, Sparkles, Plus, Minus } from 'lucide-react';

interface QuickViewModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  isWishlisted: boolean;
  onToggleWishlist: (product: Product) => void;
  onAddToBag: (product: Product, size: '50ml' | '100ml', quantity: number) => void;
}

export const QuickViewModal: React.FC<QuickViewModalProps> = ({
  product,
  isOpen,
  onClose,
  isWishlisted,
  onToggleWishlist,
  onAddToBag,
}) => {
  const [selectedSize, setSelectedSize] = useState<'50ml' | '100ml'>('100ml');
  const [quantity, setQuantity] = useState<number>(1);

  if (!isOpen || !product) return null;

  const currentPrice =
    selectedSize === '50ml'
      ? Math.round(product.price * 0.7)
      : product.price;

  const handleAdd = () => {
    onAddToBag(product, selectedSize, quantity);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#211C19]/65 backdrop-blur-md animate-in fade-in duration-300">
      <div className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto bg-[#F5F0E8] border border-[#B69A69]/40 rounded-xs shadow-2xl p-6 sm:p-10">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 text-[#8C8175] hover:text-[#211C19] p-1.5 transition-colors z-20 cursor-pointer"
          aria-label="Close dialog"
        >
          <X size={22} />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* LEFT: FLACON SHOWCASE */}
          <div className="md:col-span-6 flex flex-col items-center justify-center relative p-6 bg-radial from-white/60 to-transparent rounded-xs border border-[#D8C9B5]/40">
            <PerfumeBottleVisual
              name={product.name}
              size="hero"
              className="max-h-[380px]"
              interactive={true}
            />

            <div className="mt-4 flex items-center gap-2 text-[11px] font-sans text-[#8C8175]">
              <Sparkles size={12} className="text-[#B69A69]" />
              <span>Complimentary 2ml discovery vial included</span>
            </div>
          </div>

          {/* RIGHT: DETAILS & ACTIONS */}
          <div className="md:col-span-6 flex flex-col">
            {/* Classification */}
            <p className="text-[11px] font-sans tracking-[0.24em] uppercase text-[#8C8175] font-medium mb-1">
              {product.classification}
            </p>

            {/* Name */}
            <h2 className="font-serif text-3xl sm:text-4xl text-[#211C19] font-normal tracking-wide mb-3">
              {product.name}
            </h2>

            {/* Ratings & Price */}
            <div className="flex items-center justify-between pb-4 border-b border-[#D8C9B5]/40 mb-4">
              <div className="flex items-center gap-1.5 text-xs text-[#8C8175]">
                <div className="flex text-[#B69A69]">
                  <Star size={13} fill="currentColor" strokeWidth={0} />
                </div>
                <span className="font-medium text-[#211C19]">{product.rating}</span>
                <span>({product.reviewCount} connoisseur reviews)</span>
              </div>

              <div className="text-xl font-sans font-medium text-[#211C19] tabular-nums">
                ₹{currentPrice.toLocaleString('en-IN')}
              </div>
            </div>

            {/* Description */}
            <p className="text-xs sm:text-sm text-[#312A26] font-light leading-relaxed mb-6">
              {product.description}
            </p>

            {/* Olfactory Pyramid */}
            <div className="p-3.5 bg-white/50 rounded-xs border border-[#D8C9B5]/40 space-y-2 mb-6 text-xs">
              <div>
                <strong className="font-serif tracking-wider text-[#211C19]">TOP: </strong>
                <span className="text-[#8C8175]">{product.topNotes.join(' · ')}</span>
              </div>
              <div>
                <strong className="font-serif tracking-wider text-[#211C19]">HEART: </strong>
                <span className="text-[#8C8175]">{product.heartNotes.join(' · ')}</span>
              </div>
              <div>
                <strong className="font-serif tracking-wider text-[#211C19]">BASE: </strong>
                <span className="text-[#8C8175]">{product.baseNotes.join(' · ')}</span>
              </div>
            </div>

            {/* Size Selector */}
            <div className="mb-6">
              <span className="text-[11px] font-sans tracking-[0.2em] uppercase text-[#8C8175] block mb-2">
                SELECT FLACON VOLUME
              </span>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setSelectedSize('100ml')}
                  className={`p-3 text-left rounded-xs border transition-all cursor-pointer ${
                    selectedSize === '100ml'
                      ? 'border-[#211C19] bg-[#211C19] text-[#F5F0E8]'
                      : 'border-[#D8C9B5] bg-white/60 text-[#211C19]'
                  }`}
                >
                  <p className="font-sans font-medium text-xs">100 ML / 3.4 FL.OZ</p>
                  <p className="text-[11px] opacity-80 mt-0.5">Signature Architectural Crystal</p>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedSize('50ml')}
                  className={`p-3 text-left rounded-xs border transition-all cursor-pointer ${
                    selectedSize === '50ml'
                      ? 'border-[#211C19] bg-[#211C19] text-[#F5F0E8]'
                      : 'border-[#D8C9B5] bg-white/60 text-[#211C19]'
                  }`}
                >
                  <p className="font-sans font-medium text-xs">50 ML / 1.7 FL.OZ</p>
                  <p className="text-[11px] opacity-80 mt-0.5">Travel Flacon</p>
                </button>
              </div>
            </div>

            {/* Quantity and Actions */}
            <div className="flex items-center gap-3">
              {/* Stepper */}
              <div className="flex items-center border border-[#D8C9B5] rounded-xs bg-white text-xs">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-3 text-[#211C19] hover:bg-[#F5F0E8]"
                  aria-label="Decrease quantity"
                >
                  <Minus size={12} />
                </button>
                <span className="px-3 font-sans font-medium text-[#211C19]">{quantity}</span>
                <button
                  type="button"
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-3 text-[#211C19] hover:bg-[#F5F0E8]"
                  aria-label="Increase quantity"
                >
                  <Plus size={12} />
                </button>
              </div>

              {/* Add to Bag */}
              <button
                type="button"
                onClick={handleAdd}
                className="flex-1 btn-luxury-primary text-xs py-3.5 cursor-pointer"
              >
                ADD TO BAG · ₹{(currentPrice * quantity).toLocaleString('en-IN')}
              </button>

              {/* Wishlist Toggle */}
              <button
                type="button"
                onClick={() => onToggleWishlist(product)}
                className={`p-3.5 rounded-xs border transition-colors cursor-pointer ${
                  isWishlisted
                    ? 'border-[#942b41] text-[#942b41] bg-white'
                    : 'border-[#D8C9B5] text-[#211C19] hover:border-[#211C19] bg-white'
                }`}
                aria-label="Toggle wishlist"
              >
                <Heart
                  size={16}
                  fill={isWishlisted ? 'currentColor' : 'none'}
                  strokeWidth={1.75}
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
