import React from 'react';
import { CartItem } from '../types';
import { PerfumeBottleVisual } from './PerfumeBottleVisual';
import { X, Trash2, Plus, Minus, Check, ArrowRight } from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: string, delta: number) => void;
  onRemoveItem: (productId: string) => void;
  onViewCart: () => void;
  onCheckout: () => void;
  freeShippingThreshold?: number;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onViewCart,
  onCheckout,
  freeShippingThreshold = 6000,
}) => {
  if (!isOpen) return null;

  const rawSubtotal = items.reduce(
    (sum, item) => sum + item.unitPrice * item.quantity,
    0
  );

  const neededForFreeShipping = Math.max(0, freeShippingThreshold - rawSubtotal);
  const progressPercent = Math.min(100, (rawSubtotal / freeShippingThreshold) * 100);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-[#211C19]/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        {/* Translucent ivory glass, backdrop blur, subtle border, soft shadow */}
        <div className="w-screen max-w-md bg-[#F5F0E8]/90 backdrop-blur-xl border-l border-[#B69A69]/30 flex flex-col justify-between shadow-2xl">
          {/* TOP BAR */}
          <div className="px-6 py-5 border-b border-[#D8C9B5]/50 flex items-center justify-between">
            <div className="flex items-baseline gap-2">
              <h2 className="font-serif text-xl text-[#211C19] tracking-wider">
                SHOPPING BAG
              </h2>
              <span className="text-xs font-sans text-[#8C8175] font-light">
                ({items.reduce((acc, item) => acc + item.quantity, 0)} items)
              </span>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="p-1 text-[#8C8175] hover:text-[#211C19] transition-colors cursor-pointer"
              aria-label="Close bag"
            >
              <X size={20} />
            </button>
          </div>

          {/* FREE SHIPPING PROGRESS BAR */}
          <div className="px-6 py-3 bg-[#E3D7C7]/40 border-b border-[#D8C9B5]/50">
            <div className="flex items-center justify-between text-[11px] font-sans text-[#211C19] mb-1.5">
              {neededForFreeShipping > 0 ? (
                <span>
                  Add <strong className="font-semibold">₹{neededForFreeShipping.toLocaleString('en-IN')}</strong> more for free shipping
                </span>
              ) : (
                <span className="text-[#3b5e39] font-medium flex items-center gap-1">
                  <Check size={12} strokeWidth={2.5} /> Free shipping unlocked
                </span>
              )}
              <span className="text-[10px] text-[#8C8175]">
                Above ₹{freeShippingThreshold.toLocaleString('en-IN')}
              </span>
            </div>
            <div className="w-full bg-[#D8C9B5]/60 h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-[#211C19] h-full transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* CART ITEMS LIST */}
          <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
            {items.length === 0 ? (
              <div className="py-20 text-center flex flex-col items-center">
                <p className="font-serif text-xl text-[#211C19] mb-2">
                  Your bag is empty
                </p>
                <p className="text-xs text-[#8C8175] font-light max-w-xs mb-6">
                  Discover our signature extraits de parfum crafted with Grasse and Florentine essences.
                </p>
                <button
                  type="button"
                  onClick={onClose}
                  className="btn-luxury-outline text-xs py-2.5 px-6 cursor-pointer"
                >
                  EXPLORE CREATIONS
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={`${item.product.id}-${item.size}`}
                  className="flex gap-4 p-3 bg-white/60 rounded-xs border border-[#D8C9B5]/40"
                >
                  {/* Flacon Miniature */}
                  <div className="w-16 h-20 bg-white/80 rounded-xs flex items-center justify-center shrink-0 border border-[#D8C9B5]/30">
                    <PerfumeBottleVisual
                      name={item.product.name}
                      size="sm"
                      className="w-12 h-16"
                      interactive={false}
                    />
                  </div>

                  {/* Item Details */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between">
                        <h4 className="font-serif text-base text-[#211C19] tracking-wide leading-tight">
                          {item.product.name}
                        </h4>
                        <button
                          type="button"
                          onClick={() => onRemoveItem(item.product.id)}
                          className="text-[#8C8175] hover:text-[#942b41] transition-colors p-0.5 cursor-pointer"
                          aria-label="Remove item"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                      <p className="text-[11px] font-sans text-[#8C8175] uppercase">
                        {item.size} · Extrait de Parfum
                      </p>
                    </div>

                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-[#D8C9B5]/30">
                      {/* Quantity Stepper */}
                      <div className="flex items-center border border-[#D8C9B5] rounded-xs bg-white text-xs">
                        <button
                          type="button"
                          onClick={() => onUpdateQuantity(item.product.id, -1)}
                          className="px-2 py-1 text-[#211C19] hover:bg-[#F5F0E8] cursor-pointer"
                          aria-label="Decrease quantity"
                        >
                          <Minus size={11} />
                        </button>
                        <span className="px-2 font-sans font-medium text-[#211C19] tabular-nums">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => onUpdateQuantity(item.product.id, 1)}
                          className="px-2 py-1 text-[#211C19] hover:bg-[#F5F0E8] cursor-pointer"
                          aria-label="Increase quantity"
                        >
                          <Plus size={11} />
                        </button>
                      </div>

                      <span className="font-sans font-medium text-xs text-[#211C19] tabular-nums">
                        ₹{(item.unitPrice * item.quantity).toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* BOTTOM SUMMARY & ACTIONS */}
          {items.length > 0 && (
            <div className="px-6 py-5 border-t border-[#D8C9B5]/50 bg-[#F5F0E8]/90 space-y-3">
              <div className="flex justify-between items-baseline text-sm font-sans pb-2">
                <span className="uppercase tracking-widest text-xs text-[#8C8175] font-medium">
                  SUBTOTAL
                </span>
                <span className="font-sans font-semibold text-lg text-[#211C19] tabular-nums">
                  ₹{rawSubtotal.toLocaleString('en-IN')}
                </span>
              </div>

              <p className="text-[11px] text-[#8C8175] font-light">
                Taxes and complimentary shipping calculated at checkout.
              </p>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onViewCart();
                  }}
                  className="btn-luxury-outline text-xs py-3.5 tracking-wider cursor-pointer"
                >
                  VIEW CART
                </button>

                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onCheckout();
                  }}
                  className="btn-luxury-primary text-xs py-3.5 tracking-wider cursor-pointer"
                >
                  CHECKOUT
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
