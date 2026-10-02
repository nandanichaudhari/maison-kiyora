import React from 'react';
import { Order } from '../types';
import { PerfumeBottleVisual } from './PerfumeBottleVisual';
import { Check, Package, ArrowRight, ShieldCheck } from 'lucide-react';

interface OrderConfirmationPageProps {
  order: Order | null;
  onTrackOrder: (orderId: string) => void;
  onContinueShopping: () => void;
}

export const OrderConfirmationPage: React.FC<OrderConfirmationPageProps> = ({
  order,
  onTrackOrder,
  onContinueShopping,
}) => {
  if (!order) {
    return (
      <div className="pt-32 pb-24 text-center max-w-md mx-auto px-4">
        <h2 className="font-serif text-3xl text-[#211C19] mb-3">No Active Order</h2>
        <button
          type="button"
          onClick={onContinueShopping}
          className="btn-luxury-primary text-xs py-3 px-6 mt-4"
        >
          EXPLORE THE COLLECTION
        </button>
      </div>
    );
  }

  const primaryItem = order.items[0]?.product;

  return (
    <div className="pt-28 pb-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 animate-in fade-in duration-300">
      <div className="text-center mb-10">
        <div className="w-14 h-14 rounded-full bg-[#B69A69]/20 border border-[#B69A69] text-[#B69A69] flex items-center justify-center mx-auto mb-4">
          <Check size={26} strokeWidth={2} />
        </div>

        <span className="text-[10px] font-sans tracking-[0.24em] uppercase text-[#8C8175] font-semibold">
          PAYMENT CONFIRMED
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl text-[#211C19] mt-1 mb-2">
          ORDER CONFIRMED
        </h1>
        <p className="text-xs sm:text-sm text-[#8C8175] font-light max-w-md mx-auto">
          Thank you for choosing Maison Kiyora. Your creation is being carefully prepared in our fragrance cellar.
        </p>
      </div>

      {/* Confirmation Card */}
      <div className="bg-white/60 backdrop-blur-sm border border-[#D8C9B5]/60 rounded-xs p-6 sm:p-10 shadow-xs mb-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center pb-8 border-b border-[#D8C9B5]/40">
          {/* Packaging / Flacon Visual */}
          <div className="md:col-span-4 flex justify-center">
            <div className="w-36 h-48 bg-white rounded-xs border border-[#D8C9B5]/40 flex items-center justify-center p-2 shadow-xs">
              {primaryItem ? (
                <PerfumeBottleVisual
                  name={primaryItem.name}
                  size="sm"
                  className="w-full h-full"
                  interactive={false}
                />
              ) : (
                <Package size={40} className="text-[#B69A69]" />
              )}
            </div>
          </div>

          {/* Core Order Metadata */}
          <div className="md:col-span-8 space-y-3 text-xs font-sans">
            <div>
              <span className="text-[#8C8175] uppercase tracking-widest text-[10px] block">
                ORDER IDENTIFIER
              </span>
              <span className="font-mono text-base font-semibold text-[#211C19]">
                {order.orderId}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-1">
              <div>
                <span className="text-[#8C8175] uppercase tracking-widest text-[10px] block">
                  ESTIMATED ARRIVAL
                </span>
                <span className="text-sm font-medium text-[#211C19]">
                  {order.estimatedDelivery}
                </span>
              </div>
              <div>
                <span className="text-[#8C8175] uppercase tracking-widest text-[10px] block">
                  PAYMENT STATUS
                </span>
                <span className="text-sm font-medium text-[#3b5e39] flex items-center gap-1">
                  <Check size={12} strokeWidth={2.5} /> {order.paymentStatus}
                </span>
              </div>
            </div>

            <div>
              <span className="text-[#8C8175] uppercase tracking-widest text-[10px] block">
                DELIVERY RECIPIENT
              </span>
              <span className="text-xs text-[#211C19]">
                {order.shippingAddress.firstName} {order.shippingAddress.lastName} · {order.shippingAddress.address}, {order.shippingAddress.city} - {order.shippingAddress.pinCode}
              </span>
            </div>
          </div>
        </div>

        {/* Itemized summary */}
        <div className="pt-6 space-y-3">
          <span className="text-[10px] font-sans tracking-widest uppercase text-[#8C8175] block mb-2 font-medium">
            CREATIONS IN THIS DISPATCH
          </span>
          {order.items.map((i) => (
            <div key={`${i.product.id}-${i.size}`} className="flex justify-between text-xs">
              <span className="text-[#211C19]">
                {i.product.name} ({i.size}) × {i.quantity}
              </span>
              <span className="font-sans font-medium text-[#211C19] tabular-nums">
                ₹{(i.unitPrice * i.quantity).toLocaleString('en-IN')}
              </span>
            </div>
          ))}

          <div className="pt-3 border-t border-[#D8C9B5]/40 flex justify-between text-sm font-serif">
            <span>Total Paid</span>
            <span className="font-sans font-semibold text-base tabular-nums">
              ₹{order.total.toLocaleString('en-IN')}
            </span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <button
          type="button"
          onClick={() => onTrackOrder(order.orderId)}
          className="w-full sm:w-auto btn-luxury-primary text-xs py-3.5 px-8 cursor-pointer"
        >
          TRACK YOUR ORDER
        </button>

        <button
          type="button"
          onClick={onContinueShopping}
          className="w-full sm:w-auto btn-luxury-outline text-xs py-3.5 px-8 cursor-pointer"
        >
          CONTINUE SHOPPING
        </button>
      </div>
    </div>
  );
};
