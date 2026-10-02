import React, { useState } from 'react';
import { CartItem } from '../types';
import { PerfumeBottleVisual } from './PerfumeBottleVisual';
import { Trash2, Plus, Minus, Check, ArrowRight, ShieldCheck, Gift, X } from 'lucide-react';

interface CartPageProps {
  items: CartItem[];
  onUpdateQuantity: (productId: string, delta: number) => void;
  onRemoveItem: (productId: string) => void;
  onProceedToCheckout: () => void;
  onContinueShopping: () => void;
}

export const CartPage: React.FC<CartPageProps> = ({
  items,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
  onContinueShopping,
}) => {
  const [promoInput, setPromoInput] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<string | null>('KIYORA10');
  const [promoError, setPromoError] = useState<string | null>(null);
  const [giftWrap, setGiftWrap] = useState(false);

  // Subtotal calculation
  const subtotal = items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);

  // Dynamic Free Shipping threshold (₹6,000)
  const freeShippingThreshold = 6000;
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);
  const progressPercent = Math.min(100, (subtotal / freeShippingThreshold) * 100);

  // Discount calculation
  const discountPercent = appliedPromo === 'KIYORA10' ? 0.1 : 0;
  const discountAmount = Math.round(subtotal * discountPercent);

  // Shipping cost
  const shippingCost = subtotal === 0 || remainingForFreeShipping === 0 ? 0 : 250;
  const giftWrapCost = giftWrap ? 450 : 0;
  const taxes = 0; // Tax included in MRP as per luxury standard
  const orderTotal = Math.max(0, subtotal - discountAmount + shippingCost + giftWrapCost);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    setPromoError(null);
    if (promoInput.trim().toUpperCase() === 'KIYORA10') {
      setAppliedPromo('KIYORA10');
      setPromoInput('');
    } else {
      setPromoError('Invalid privilege code. Please verify and try again.');
    }
  };

  const handleRemovePromo = () => {
    setAppliedPromo(null);
  };

  return (
    <div className="pt-28 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 animate-in fade-in duration-300">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs font-sans tracking-[0.16em] uppercase text-[#8C8175] mb-6">
        <button
          type="button"
          onClick={onContinueShopping}
          className="hover:text-[#211C19] transition-colors cursor-pointer"
        >
          HOME
        </button>
        <span>/</span>
        <span className="text-[#211C19] font-medium">YOUR BAG</span>
      </nav>

      <div className="mb-10 pb-6 border-b border-[#D8C9B5]/40 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h1 className="font-serif text-4xl sm:text-5xl font-normal text-[#211C19] tracking-tight">
            YOUR BAG
          </h1>
          <p className="text-xs sm:text-sm text-[#8C8175] font-light mt-1">
            {items.reduce((acc, i) => acc + i.quantity, 0)} signature creations selected
          </p>
        </div>

        <button
          type="button"
          onClick={onContinueShopping}
          className="text-xs font-sans tracking-[0.2em] uppercase text-[#8C8175] hover:text-[#211C19] underline cursor-pointer"
        >
          CONTINUE SHOPPING
        </button>
      </div>

      {items.length === 0 ? (
        <div className="py-24 text-center max-w-md mx-auto">
          <h3 className="font-serif text-3xl text-[#211C19] mb-3">
            Your Bag is Empty
          </h3>
          <p className="text-xs text-[#8C8175] font-light leading-relaxed mb-8">
            Experience our 28% Extrait de Parfum creations, masterfully blended with raw botanicals from Grasse, Kashmir, and Florence.
          </p>
          <button
            type="button"
            onClick={onContinueShopping}
            className="btn-luxury-primary text-xs py-3.5 px-8 cursor-pointer"
          >
            DISCOVER THE COLLECTION
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* LEFT: PRODUCTS LIST */}
          <div className="lg:col-span-8 space-y-6">
            {/* 25. FREE SHIPPING PROGRESS INDICATOR */}
            <div className="p-4 rounded-xs bg-[#E3D7C7]/40 border border-[#D8C9B5]/60">
              <div className="flex items-center justify-between text-xs font-sans text-[#211C19] mb-2">
                {remainingForFreeShipping > 0 ? (
                  <span>
                    ADD <strong className="font-semibold tabular-nums">₹{remainingForFreeShipping.toLocaleString('en-IN')}</strong> MORE FOR FREE SHIPPING
                  </span>
                ) : (
                  <span className="text-[#3b5e39] font-medium flex items-center gap-1.5">
                    <Check size={14} strokeWidth={2.5} /> FREE SHIPPING UNLOCKED
                  </span>
                )}
                <span className="text-[11px] text-[#8C8175]">
                  Insured Air Express
                </span>
              </div>
              <div className="w-full bg-[#D8C9B5]/60 h-1.5 rounded-full overflow-hidden">
                <div
                  className="bg-[#211C19] h-full transition-all duration-500"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>

            {/* Products Table */}
            <div className="divide-y divide-[#D8C9B5]/40 border-y border-[#D8C9B5]/40">
              {items.map((item) => (
                <div
                  key={`${item.product.id}-${item.size}`}
                  className="py-6 flex flex-col sm:flex-row gap-6 items-start sm:items-center justify-between"
                >
                  <div className="flex items-center gap-5">
                    {/* Flacon Thumbnail */}
                    <div className="w-20 h-24 sm:w-24 sm:h-28 bg-white/70 rounded-xs border border-[#D8C9B5]/50 flex items-center justify-center shrink-0">
                      <PerfumeBottleVisual
                        name={item.product.name}
                        size="sm"
                        className="w-14 h-18"
                        interactive={false}
                      />
                    </div>

                    <div>
                      <p className="text-[11px] font-sans text-[#8C8175] tracking-widest uppercase">
                        {item.product.classification}
                      </p>
                      <h3 className="font-serif text-xl sm:text-2xl text-[#211C19] mt-0.5">
                        {item.product.name}
                      </h3>
                      <p className="text-xs font-sans text-[#211C19] font-medium mt-1">
                        Size: <span className="uppercase">{item.size}</span> · Extrait 28%
                      </p>
                      <p className="text-xs font-sans text-[#8C8175] mt-0.5 tabular-nums">
                        Unit: ₹{item.unitPrice.toLocaleString('en-IN')}
                      </p>
                    </div>
                  </div>

                  {/* Quantity Stepper & Price */}
                  <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto">
                    {/* Stepper */}
                    <div className="flex items-center border border-[#D8C9B5] rounded-xs bg-white text-xs">
                      <button
                        type="button"
                        onClick={() => onUpdateQuantity(item.product.id, -1)}
                        className="px-2.5 py-1.5 text-[#211C19] hover:bg-[#F5F0E8] cursor-pointer"
                        aria-label="Decrease quantity"
                      >
                        <Minus size={12} />
                      </button>
                      <span className="px-3 font-sans font-medium text-[#211C19] tabular-nums">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => onUpdateQuantity(item.product.id, 1)}
                        className="px-2.5 py-1.5 text-[#211C19] hover:bg-[#F5F0E8] cursor-pointer"
                        aria-label="Increase quantity"
                      >
                        <Plus size={12} />
                      </button>
                    </div>

                    {/* Line Total */}
                    <div className="text-right min-w-[90px]">
                      <span className="font-sans font-medium text-base text-[#211C19] tabular-nums block">
                        ₹{(item.unitPrice * item.quantity).toLocaleString('en-IN')}
                      </span>
                      <button
                        type="button"
                        onClick={() => onRemoveItem(item.product.id)}
                        className="text-[11px] font-sans text-[#8C8175] hover:text-[#942b41] underline cursor-pointer mt-0.5"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Gift Wrap Add-on */}
            <div className="p-4 rounded-xs bg-white/50 border border-[#D8C9B5]/50 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Gift size={18} className="text-[#B69A69]" />
                <div>
                  <p className="text-xs font-sans font-medium text-[#211C19]">
                    Artisanal Gift Presentation (+₹450)
                  </p>
                  <p className="text-[11px] text-[#8C8175]">
                    Rigid gold-embossed coffret, deckle-edge calligraphy card, and wax seal.
                  </p>
                </div>
              </div>
              <input
                type="checkbox"
                checked={giftWrap}
                onChange={(e) => setGiftWrap(e.target.checked)}
                className="accent-[#211C19] w-4 h-4 cursor-pointer"
              />
            </div>
          </div>

          {/* RIGHT: ORDER SUMMARY */}
          <div className="lg:col-span-4 bg-white/60 backdrop-blur-sm p-6 sm:p-8 rounded-xs border border-[#D8C9B5]/60 sticky top-28 space-y-6">
            <h2 className="font-serif text-2xl text-[#211C19]">
              ORDER SUMMARY
            </h2>

            {/* 24. PROMO CODE */}
            <div>
              <span className="text-[11px] font-sans uppercase tracking-widest text-[#8C8175] block mb-2 font-medium">
                PRIVILEGE CODE
              </span>
              {appliedPromo ? (
                <div className="p-2.5 rounded-xs bg-[#E3D7C7]/50 border border-[#B69A69]/40 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-mono font-medium text-[#211C19]">
                      {appliedPromo}
                    </span>
                    <span className="text-[11px] text-[#3b5e39] block">
                      10% Circle Privilege Applied
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={handleRemovePromo}
                    className="p-1 text-[#8C8175] hover:text-[#942b41] cursor-pointer"
                    aria-label="Remove promo code"
                  >
                    <X size={14} />
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyPromo} className="flex gap-2">
                  <input
                    type="text"
                    value={promoInput}
                    onChange={(e) => setPromoInput(e.target.value)}
                    placeholder="Enter code (e.g. KIYORA10)"
                    className="flex-1 px-3 py-2 text-xs bg-white border border-[#D8C9B5] text-[#211C19] uppercase placeholder:normal-case rounded-xs focus:outline-hidden"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 text-xs font-sans tracking-wider uppercase bg-[#211C19] text-white rounded-xs cursor-pointer hover:bg-[#312A26]"
                  >
                    APPLY
                  </button>
                </form>
              )}
              {promoError && (
                <p className="text-[11px] text-[#942b41] mt-1">{promoError}</p>
              )}
            </div>

            {/* Price Calculations */}
            <div className="space-y-2.5 text-xs font-sans text-[#8C8175] pt-4 border-t border-[#D8C9B5]/40">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="text-[#211C19] font-medium tabular-nums">
                  ₹{subtotal.toLocaleString('en-IN')}
                </span>
              </div>

              {discountAmount > 0 && (
                <div className="flex justify-between text-[#3b5e39]">
                  <span>Privilege Discount</span>
                  <span className="tabular-nums">-₹{discountAmount.toLocaleString('en-IN')}</span>
                </div>
              )}

              {giftWrap && (
                <div className="flex justify-between">
                  <span>Gift Coffret & Calligraphy</span>
                  <span className="text-[#211C19] tabular-nums">₹450</span>
                </div>
              )}

              <div className="flex justify-between">
                <span>Insured Express Courier</span>
                <span className="tabular-nums">
                  {shippingCost === 0 ? 'Complimentary' : '₹250'}
                </span>
              </div>

              <div className="flex justify-between">
                <span>Applicable Taxes</span>
                <span className="text-[#3b5e39]">Included in MRP</span>
              </div>

              <div className="pt-4 border-t border-[#D8C9B5]/50 flex justify-between items-baseline text-sm">
                <span className="font-serif text-lg text-[#211C19]">Total</span>
                <span className="font-sans text-xl font-semibold text-[#211C19] tabular-nums">
                  ₹{orderTotal.toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            {/* Checkout Action */}
            <button
              type="button"
              onClick={onProceedToCheckout}
              className="w-full btn-luxury-primary text-xs py-4 tracking-[0.2em] cursor-pointer"
            >
              PROCEED TO CHECKOUT
            </button>

            {/* Trust note */}
            <div className="pt-2 text-center text-[11px] text-[#8C8175] flex items-center justify-center gap-1.5">
              <ShieldCheck size={14} className="text-[#B69A69]" />
              <span>Complimentary 2ml discovery vial included with every flacon</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
