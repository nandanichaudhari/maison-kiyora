import React from 'react';
import { Product } from '../types';
import { PerfumeBottleVisual } from './PerfumeBottleVisual';
import { Heart, Star } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  isWishlisted: boolean;
  onToggleWishlist: (product: Product) => void;
  onQuickAdd: (product: Product) => void;
  onSelectProduct: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  isWishlisted,
  onToggleWishlist,
  onQuickAdd,
  onSelectProduct,
}) => {
  // Family descriptor formatted cleanly (e.g. "Woody · Fruity · Warm")
  const familyDescriptor =
    product.subtitle.length < 32
      ? product.subtitle
      : product.family === 'Woody'
      ? 'Woody · Resinous · Warm'
      : product.family === 'Floral'
      ? 'Floral · Velvet · Elegant'
      : product.family === 'Fresh'
      ? 'Fresh · Powdery · Tuscan Orris'
      : product.family === 'Citrus'
      ? 'Citrus · Radiant · Solaire'
      : `${product.family} · ${product.classification}`;

  return (
    <div
      onClick={() => onSelectProduct(product)}
      className="group relative flex flex-col bg-[#FAF8F5]/80 backdrop-blur-md rounded-xs border border-[#D8C9B5]/60 hover:border-[#B69A69]/70 transition-all duration-700 ease-out overflow-hidden shadow-2xs hover:shadow-xl cursor-pointer"
    >
      {/* Top Floating Badge & Wishlist Action Bar */}
      <div className="absolute top-3.5 inset-x-3.5 flex items-center justify-between z-20 pointer-events-none">
        <div>
          {product.badge && (
            <span className="inline-block text-[9px] font-sans font-semibold tracking-[0.22em] uppercase px-2 py-0.5 rounded-2xs bg-[#211C19] text-[#F5F0E8] shadow-2xs">
              {product.badge}
            </span>
          )}
        </div>

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist(product);
          }}
          className={`pointer-events-auto w-8 h-8 rounded-full bg-white/70 backdrop-blur-md border border-white/70 flex items-center justify-center transition-all duration-300 cursor-pointer shadow-2xs ${
            isWishlisted
              ? 'text-[#942b41] bg-white opacity-100'
              : 'text-[#211C19] opacity-75 hover:opacity-100 hover:text-[#942b41] hover:bg-white'
          }`}
          aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart
            size={14}
            fill={isWishlisted ? 'currentColor' : 'none'}
            strokeWidth={1.5}
          />
        </button>
      </div>

      {/* Main Large Product Flacon Presentation Stage */}
      <div className="pt-10 pb-6 px-4 flex items-center justify-center relative min-h-[270px] sm:min-h-[300px] overflow-hidden bg-radial from-white/40 via-transparent to-transparent">
        {/* Subtle background champagne depth glow */}
        <div className="absolute w-36 h-36 rounded-full bg-[#B69A69]/10 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

        <div className="transition-transform duration-700 ease-out group-hover:scale-[1.03] group-hover:-translate-y-1.5">
          <PerfumeBottleVisual
            name={product.name}
            liquidColor={product.liquidColor}
            liquidHighlight={product.liquidHighlight}
            size="md"
            interactive={false}
          />
        </div>

        {/* Hover Quick Add Action Overlay Button (Appears on Hover) */}
        <div className="absolute inset-x-4 bottom-3 opacity-0 group-hover:opacity-100 transition-all duration-400 ease-out transform translate-y-2 group-hover:translate-y-0 z-30">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onQuickAdd(product);
            }}
            className="w-full py-2.5 text-[10.5px] font-sans font-medium tracking-[0.2em] uppercase bg-[#211C19] text-[#F5F0E8] hover:bg-[#312A26] border border-[#211C19] hover:border-[#B69A69] shadow-lg transition-all duration-300 cursor-pointer flex items-center justify-center gap-1.5"
          >
            <span>ADD TO BAG</span>
          </button>
        </div>
      </div>

      {/* Product Details Section (Section 12 & 13) */}
      <div className="p-5 pt-3 flex flex-col flex-1 justify-between border-t border-[#D8C9B5]/40 bg-white/40">
        <div>
          {/* Fragrance Family (e.g. Woody · Fruity · Warm) */}
          <p className="text-[11px] font-sans text-[#8C8175] tracking-wide mb-1 truncate">
            {familyDescriptor}
          </p>

          {/* Product Name in Elegant Serif */}
          <h3 className="font-serif text-lg sm:text-xl font-medium tracking-[0.04em] text-[#211C19] group-hover:text-[#B69A69] transition-colors duration-300">
            {product.name}
          </h3>
        </div>

        {/* Price & Rating (e.g. ₹4,999 · ★★★★★ 124) */}
        <div className="mt-4 pt-3 border-t border-[#D8C9B5]/35 flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="font-sans font-medium text-sm sm:text-base text-[#211C19] tabular-nums tracking-tight">
              ₹{product.price.toLocaleString('en-IN')}
            </span>
            {product.originalPrice && product.originalPrice > product.price && (
              <span className="font-sans text-[11px] text-[#8C8175] line-through tabular-nums">
                ₹{product.originalPrice.toLocaleString('en-IN')}
              </span>
            )}
          </div>

          {/* Stars & Review count */}
          <div className="flex items-center gap-1">
            <div className="flex items-center text-[#B69A69]">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star
                  key={s}
                  size={11}
                  fill="currentColor"
                  strokeWidth={0}
                />
              ))}
            </div>
            <span className="text-[10px] text-[#8C8175] font-sans tabular-nums ml-0.5">
              {product.reviewCount || 124}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
