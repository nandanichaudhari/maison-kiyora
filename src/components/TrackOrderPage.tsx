import React, { useState } from 'react';
import { Order } from '../types';
import { Search, Check, Truck, Package, Clock, ShieldCheck } from 'lucide-react';

interface TrackOrderPageProps {
  orders: Order[];
  initialOrderId?: string;
  onContinueShopping: () => void;
}

export const TrackOrderPage: React.FC<TrackOrderPageProps> = ({
  orders,
  initialOrderId = '',
  onContinueShopping,
}) => {
  const [searchId, setSearchId] = useState(initialOrderId);
  const [matchedOrder, setMatchedOrder] = useState<Order | null>(
    orders.find((o) => o.orderId.toLowerCase() === initialOrderId.toLowerCase()) ||
      orders[0] ||
      null
  );
  const [hasSearched, setHasSearched] = useState(!!initialOrderId || orders.length > 0);

  const timelineSteps = [
    { title: 'ORDER PLACED', key: 'Order Placed' },
    { title: 'CONFIRMED', key: 'Confirmed' },
    { title: 'PACKED', key: 'Packed' },
    { title: 'SHIPPED', key: 'Shipped' },
    { title: 'OUT FOR DELIVERY', key: 'Out for Delivery' },
    { title: 'DELIVERED', key: 'Delivered' },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setHasSearched(true);
    const found = orders.find(
      (o) => o.orderId.trim().toLowerCase() === searchId.trim().toLowerCase()
    );
    setMatchedOrder(found || null);
  };

  // Determine which step is currently reached
  const getCurrentStepIndex = (status: string) => {
    switch (status) {
      case 'Order Placed':
        return 0;
      case 'Confirmed':
        return 1;
      case 'Packed':
        return 2;
      case 'Shipped':
        return 3;
      case 'Out for Delivery':
        return 4;
      case 'Delivered':
        return 5;
      default:
        return 1;
    }
  };

  const activeIndex = matchedOrder ? getCurrentStepIndex(matchedOrder.orderStatus) : 1;

  return (
    <div className="pt-28 pb-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 animate-in fade-in duration-300">
      <div className="text-center max-w-xl mx-auto mb-10">
        <span className="text-[10px] font-sans tracking-[0.24em] uppercase text-[#8C8175] font-semibold">
          LOGISTICS & ATELIER DISPATCH
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#211C19] mt-1 mb-2">
          TRACK YOUR ORDER
        </h1>
        <p className="text-xs sm:text-sm text-[#8C8175] font-light">
          Monitor the preparation and transit of your Maison Kiyora creations.
        </p>
      </div>

      {/* Search Input Bar */}
      <form
        onSubmit={handleSearch}
        className="max-w-md mx-auto mb-12 flex gap-2 p-1.5 bg-white/70 border border-[#D8C9B5] rounded-xs shadow-xs"
      >
        <div className="flex-1 flex items-center pl-3 gap-2">
          <Search size={16} className="text-[#8C8175]" />
          <input
            type="text"
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
            placeholder="Enter Order # (e.g. MK-2026-8924)"
            className="w-full text-xs font-sans bg-transparent text-[#211C19] focus:outline-hidden uppercase placeholder:normal-case"
          />
        </div>
        <button
          type="submit"
          className="px-6 py-2.5 text-xs font-sans tracking-wider uppercase bg-[#211C19] text-[#F5F0E8] rounded-xs cursor-pointer hover:bg-[#312A26]"
        >
          TRACK ORDER
        </button>
      </form>

      {/* Tracking Results View */}
      {hasSearched && (
        <>
          {matchedOrder ? (
            <div className="bg-white/60 backdrop-blur-sm border border-[#D8C9B5]/60 rounded-xs p-6 sm:p-10 shadow-xs space-y-10">
              {/* Order Status Banner */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#D8C9B5]/40">
                <div>
                  <span className="text-[10px] font-sans tracking-widest uppercase text-[#8C8175]">
                    ORDER NUMBER
                  </span>
                  <p className="font-mono text-lg font-semibold text-[#211C19]">
                    {matchedOrder.orderId}
                  </p>
                </div>

                <div>
                  <span className="text-[10px] font-sans tracking-widest uppercase text-[#8C8175]">
                    COURIER PARTNER
                  </span>
                  <p className="text-xs font-sans font-medium text-[#211C19]">
                    {matchedOrder.courier} (Air Express)
                  </p>
                </div>

                <div>
                  <span className="text-[10px] font-sans tracking-widest uppercase text-[#8C8175]">
                    TRACKING WAYBILL
                  </span>
                  <p className="font-mono text-xs text-[#B69A69]">
                    {matchedOrder.trackingNumber}
                  </p>
                </div>
              </div>

              {/* 33. SUBTLE PROGRESS TIMELINE */}
              <div>
                <span className="text-[10px] font-sans tracking-[0.2em] uppercase text-[#8C8175] block mb-6 font-semibold">
                  DISPATCH TIMELINE
                </span>

                <div className="relative">
                  {/* Connecting Horizontal Line (desktop) */}
                  <div className="hidden md:block absolute top-3.5 left-4 right-4 h-[1px] bg-[#D8C9B5]" />

                  <div className="grid grid-cols-2 md:grid-cols-6 gap-6 relative z-10">
                    {timelineSteps.map((step, idx) => {
                      const isComplete = idx <= activeIndex;
                      const isCurrent = idx === activeIndex;

                      return (
                        <div
                          key={step.title}
                          className="flex flex-col items-start md:items-center text-left md:text-center"
                        >
                          <div
                            className={`w-7 h-7 rounded-full flex items-center justify-center text-xs mb-2 transition-colors ${
                              isComplete
                                ? 'bg-[#211C19] text-[#F5F0E8]'
                                : 'bg-[#FAF7F2] border border-[#D8C9B5] text-[#8C8175]'
                            }`}
                          >
                            {isComplete ? (
                              <Check size={12} strokeWidth={2.5} />
                            ) : (
                              <span className="text-[10px]">{idx + 1}</span>
                            )}
                          </div>
                          <span
                            className={`text-[10px] font-sans tracking-wider uppercase ${
                              isCurrent
                                ? 'font-semibold text-[#211C19]'
                                : isComplete
                                ? 'text-[#211C19]'
                                : 'text-[#8C8175]'
                            }`}
                          >
                            {step.title}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Delivery Details Details */}
              <div className="p-4 bg-[#FAF7F2] rounded-xs border border-[#D8C9B5]/50 flex flex-col sm:flex-row justify-between text-xs gap-3">
                <div>
                  <span className="text-[#8C8175] block text-[10px] uppercase">
                    Estimated Delivery
                  </span>
                  <span className="font-serif text-base text-[#211C19]">
                    {matchedOrder.estimatedDelivery}
                  </span>
                </div>
                <div>
                  <span className="text-[#8C8175] block text-[10px] uppercase">
                    Delivery Address
                  </span>
                  <span className="text-[#211C19]">
                    {matchedOrder.shippingAddress.address}, {matchedOrder.shippingAddress.city} - {matchedOrder.shippingAddress.pinCode}
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-8 bg-white/60 border border-[#D8C9B5] rounded-xs text-center max-w-md mx-auto">
              <p className="font-serif text-lg text-[#211C19] mb-1">
                Order Not Found
              </p>
              <p className="text-xs text-[#8C8175] mb-4">
                Please verify your order number format (e.g. MK-2026-8924).
              </p>
              <button
                type="button"
                onClick={onContinueShopping}
                className="btn-luxury-outline text-xs py-2 px-6"
              >
                RETURN TO BOUTIQUE
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};
