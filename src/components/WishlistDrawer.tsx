import React from 'react';
import { Product } from '../types';
import { PerfumeBottleVisual } from './PerfumeBottleVisual';
import { X, Trash2, ShoppingBag } from 'lucide-react';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  wishlistIds: string[];
  onRemoveFromWishlist: (product: Product) => void;
  onAddToBag: (product: Product) => void;
}

export const WishlistDrawer: React.FC<WishlistDrawerProps> = ({
  isOpen,
  onClose,
  products,
  wishlistIds,
  onRemoveFromWishlist,
  onAddToBag,
}) => {
  if (!isOpen) return null;

  const wishlistedProducts = products.filter((p) => wishlistIds.includes(p.id));

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-[#211C19]/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#F5F0E8] border-l border-[#B69A69]/30 flex flex-col justify-between shadow-2xl">
          {/* Header */}
          <div className="px-6 py-5 border-b border-[#D8C9B5]/50 flex items-center justify-between">
            <div className="flex items-baseline gap-2">
              <h2 className="font-serif text-xl text-[#211C19] tracking-wider">
                CURATED WISHLIST
              </h2>
              <span className="text-xs font-sans text-[#8C8175]">
                ({wishlistedProducts.length})
              </span>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="p-1 text-[#8C8175] hover:text-[#211C19] transition-colors"
              aria-label="Close wishlist"
            >
              <X size={20} />
            </button>
          </div>

          {/* List */}
          <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
            {wishlistedProducts.length === 0 ? (
              <div className="py-20 text-center flex flex-col items-center">
                <p className="font-serif text-xl text-[#211C19] mb-2">
                  No saved creations
                </p>
                <p className="text-xs text-[#8C8175] font-light max-w-xs mb-6">
                  Save your desired Maison Kiyora extraits to return to them whenever you wish.
                </p>
                <button
                  type="button"
                  onClick={onClose}
                  className="btn-luxury-outline text-xs py-2.5 px-6"
                >
                  DISCOVER FRAGRANCES
                </button>
              </div>
            ) : (
              wishlistedProducts.map((product) => (
                <div
                  key={product.id}
                  className="flex gap-4 p-3 bg-white/50 rounded-xs border border-[#D8C9B5]/40"
                >
                  <div className="w-16 h-20 bg-white/80 rounded-xs flex items-center justify-center shrink-0 border border-[#D8C9B5]/30">
                    <PerfumeBottleVisual
                      name={product.name}
                      size="sm"
                      className="w-12 h-16"
                      interactive={false}
                    />
                  </div>

                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between">
                        <h4 className="font-serif text-base text-[#211C19] leading-tight">
                          {product.name}
                        </h4>
                        <button
                          type="button"
                          onClick={() => onRemoveFromWishlist(product)}
                          className="text-[#8C8175] hover:text-[#942b41] transition-colors p-0.5"
                          aria-label="Remove from wishlist"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                      <p className="text-[11px] font-sans text-[#8C8175]">
                        {product.classification}
                      </p>
                    </div>

                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-[#D8C9B5]/30">
                      <span className="font-sans font-medium text-xs text-[#211C19] tabular-nums">
                        ₹{product.price.toLocaleString('en-IN')}
                      </span>

                      <button
                        type="button"
                        onClick={() => {
                          onAddToBag(product);
                          onRemoveFromWishlist(product);
                        }}
                        className="text-[10px] font-sans tracking-wider uppercase bg-[#211C19] text-[#F5F0E8] px-3 py-1.5 rounded-xs hover:bg-[#312A26] flex items-center gap-1"
                      >
                        <ShoppingBag size={11} />
                        <span>Move to Bag</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          <div className="p-6 border-t border-[#D8C9B5]/50 bg-[#F5F0E8]/90">
            <button
              type="button"
              onClick={onClose}
              className="w-full btn-luxury-outline text-xs py-3 text-center"
            >
              CONTINUE BROWSING
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
