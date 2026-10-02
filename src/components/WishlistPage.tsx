import React from 'react';
import { Product } from '../types';
import { PerfumeBottleVisual } from './PerfumeBottleVisual';
import { Trash2, ShoppingBag, Heart, ArrowRight } from 'lucide-react';

interface WishlistPageProps {
  products: Product[];
  wishlistIds: string[];
  onRemoveFromWishlist: (product: Product) => void;
  onAddToBag: (product: Product) => void;
  onSelectProduct: (product: Product) => void;
  onExploreCollection: () => void;
  onNavigateHome: () => void;
}

export const WishlistPage: React.FC<WishlistPageProps> = ({
  products,
  wishlistIds,
  onRemoveFromWishlist,
  onAddToBag,
  onSelectProduct,
  onExploreCollection,
  onNavigateHome,
}) => {
  const wishlistedProducts = products.filter((p) => wishlistIds.includes(p.id));

  return (
    <div className="pt-28 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 animate-in fade-in duration-300">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs font-sans tracking-[0.16em] uppercase text-[#8C8175] mb-6">
        <button
          type="button"
          onClick={onNavigateHome}
          className="hover:text-[#211C19] transition-colors cursor-pointer"
        >
          HOME
        </button>
        <span>/</span>
        <span className="text-[#211C19] font-medium">WISHLIST</span>
      </nav>

      <div className="mb-10 pb-6 border-b border-[#D8C9B5]/40 flex items-baseline justify-between">
        <div>
          <h1 className="font-serif text-4xl sm:text-5xl font-normal text-[#211C19] tracking-tight">
            YOUR WISHLIST
          </h1>
          <p className="text-xs sm:text-sm text-[#8C8175] font-light mt-1">
            {wishlistedProducts.length} saved {wishlistedProducts.length === 1 ? 'creation' : 'creations'}
          </p>
        </div>
      </div>

      {wishlistedProducts.length === 0 ? (
        <div className="py-24 text-center max-w-md mx-auto">
          <div className="w-12 h-12 rounded-full bg-[#FAF7F2] border border-[#D8C9B5] text-[#8C8175] flex items-center justify-center mx-auto mb-4">
            <Heart size={20} strokeWidth={1.5} />
          </div>
          <h2 className="font-serif text-3xl text-[#211C19] mb-2">
            YOUR WISHLIST IS EMPTY
          </h2>
          <p className="text-xs text-[#8C8175] font-light leading-relaxed mb-8">
            Discover your next signature scent from our curated library of extraits de parfum.
          </p>
          <button
            type="button"
            onClick={onExploreCollection}
            className="btn-luxury-primary text-xs py-3.5 px-8 cursor-pointer"
          >
            EXPLORE COLLECTION
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {wishlistedProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white/60 backdrop-blur-sm border border-[#D8C9B5]/50 rounded-xs p-5 flex flex-col justify-between hover:border-[#B69A69] transition-all shadow-xs"
            >
              <div>
                {/* Flacon Visual */}
                <div
                  onClick={() => onSelectProduct(product)}
                  className="py-6 flex items-center justify-center cursor-pointer relative bg-radial from-white/40 to-transparent min-h-[220px]"
                >
                  <PerfumeBottleVisual
                    name={product.name}
                    size="md"
                    className="w-40 h-56"
                    interactive={true}
                  />
                </div>

                <div className="pt-2">
                  <p className="text-[11px] font-sans text-[#8C8175] tracking-widest uppercase">
                    {product.classification}
                  </p>
                  <h3
                    onClick={() => onSelectProduct(product)}
                    className="font-serif text-xl text-[#211C19] mt-0.5 hover:text-[#B69A69] transition-colors cursor-pointer"
                  >
                    {product.name}
                  </h3>
                  <div className="flex items-center justify-between mt-2">
                    <span className="font-sans font-medium text-sm text-[#211C19] tabular-nums">
                      ₹{product.price.toLocaleString('en-IN')}
                    </span>
                    <span className="text-[11px] font-sans text-[#3b5e39] font-medium">
                      ✓ In Stock
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 mt-4 border-t border-[#D8C9B5]/40 flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => onAddToBag(product)}
                  className="flex-1 btn-luxury-primary text-[11px] py-2.5 px-3 flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <ShoppingBag size={13} />
                  <span>ADD TO BAG</span>
                </button>

                <button
                  type="button"
                  onClick={() => onRemoveFromWishlist(product)}
                  className="p-2.5 rounded-xs border border-[#D8C9B5] text-[#8C8175] hover:text-[#942b41] hover:border-[#942b41] transition-colors cursor-pointer"
                  aria-label="Remove from wishlist"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
