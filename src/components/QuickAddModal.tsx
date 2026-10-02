import React, { useState } from 'react';
import { Product, ProductSize } from '../types';
import { PerfumeBottleVisual } from './PerfumeBottleVisual';
import { X, Check } from 'lucide-react';

interface QuickAddModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToBag: (product: Product, size: ProductSize, quantity: number) => void;
}

export const QuickAddModal: React.FC<QuickAddModalProps> = ({
  product,
  isOpen,
  onClose,
  onAddToBag,
}) => {
  const [selectedSize, setSelectedSize] = useState<ProductSize>('100ml');

  if (!isOpen || !product) return null;

  const currentVariant = product.variants.find((v) => v.size === selectedSize);
  const currentPrice = currentVariant ? currentVariant.price : product.price;

  const handleAdd = () => {
    onAddToBag(product, selectedSize, 1);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#211C19]/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-sm bg-[#FAF8F5]/92 backdrop-blur-2xl border border-white/80 rounded-xs shadow-2xl p-6 sm:p-7">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 text-[#8C8175] hover:text-[#211C19] p-1.5 transition-colors cursor-pointer"
          aria-label="Close"
        >
          <X size={18} strokeWidth={1.5} />
        </button>

        <div className="flex flex-col items-center text-center">
          <div className="w-24 h-32 mb-3">
            <PerfumeBottleVisual
              name={product.name}
              size="sm"
              className="w-full h-full"
              interactive={false}
            />
          </div>

          <p className="text-[9.5px] font-sans tracking-[0.24em] uppercase text-[#B69A69] font-medium">
            QUICK ADD
          </p>
          <h3 className="font-serif text-xl sm:text-2xl text-[#211C19] mt-0.5 mb-1 font-normal tracking-wide">
            {product.name}
          </h3>
          <p className="text-[11px] text-[#8C8175] font-light tracking-wide mb-5">
            {product.classification}
          </p>

          <div className="w-full mb-5">
            <span className="text-[9.5px] font-sans uppercase tracking-[0.2em] text-[#8C8175] block mb-2 font-medium">
              AVAILABLE SIZES
            </span>
            <div className="grid grid-cols-3 gap-2">
              {product.variants.map((v) => (
                <button
                  key={v.size}
                  type="button"
                  onClick={() => setSelectedSize(v.size)}
                  className={`py-2 px-1 text-xs font-sans rounded-xs border transition-all duration-300 cursor-pointer ${
                    selectedSize === v.size
                      ? 'bg-[#211C19] text-[#F5F0E8] border-[#211C19] font-medium shadow-2xs'
                      : 'bg-white/60 text-[#211C19] border-[#D8C9B5]/80 hover:border-[#B69A69]'
                  }`}
                >
                  <span className="block font-medium uppercase text-[11px]">{v.size}</span>
                  <span className="text-[10px] opacity-80 tabular-nums">
                    ₹{v.price.toLocaleString('en-IN')}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <button
            type="button"
            onClick={handleAdd}
            className="w-full btn-luxury-primary text-xs py-3.5 cursor-pointer shadow-md"
          >
            ADD TO BAG · ₹{currentPrice.toLocaleString('en-IN')}
          </button>
        </div>
      </div>
    </div>
  );
};
