import React, { useState, useEffect, useRef } from 'react';
import { useStore } from '../../context/StoreContext';
import { Search, X, Package, ShoppingBag, User, Tag, ArrowRight } from 'lucide-react';

interface AdminCommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateTab: (tab: string) => void;
  onSelectOrder?: (orderId: string) => void;
  onSelectProduct?: (productId: string) => void;
}

export const AdminCommandPalette: React.FC<AdminCommandPaletteProps> = ({
  isOpen,
  onClose,
  onNavigateTab,
  onSelectOrder,
  onSelectProduct,
}) => {
  const { products, orders, customers, coupons } = useStore();
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const clean = query.trim().toLowerCase();

  const matchingProducts = clean
    ? products.filter(
        (p) =>
          p.name.toLowerCase().includes(clean) ||
          p.sku.toLowerCase().includes(clean) ||
          p.classification.toLowerCase().includes(clean)
      ).slice(0, 4)
    : [];

  const matchingOrders = clean
    ? orders.filter(
        (o) =>
          o.orderId.toLowerCase().includes(clean) ||
          o.shippingAddress.firstName.toLowerCase().includes(clean) ||
          o.shippingAddress.lastName.toLowerCase().includes(clean) ||
          o.shippingAddress.email.toLowerCase().includes(clean)
      ).slice(0, 4)
    : [];

  const matchingCustomers = clean
    ? customers.filter(
        (c) =>
          c.name.toLowerCase().includes(clean) ||
          c.email.toLowerCase().includes(clean) ||
          c.phone.includes(clean)
      ).slice(0, 3)
    : [];

  const matchingCoupons = clean
    ? coupons.filter((c) => c.code.toLowerCase().includes(clean)).slice(0, 2)
    : [];

  const hasResults =
    matchingProducts.length > 0 ||
    matchingOrders.length > 0 ||
    matchingCustomers.length > 0 ||
    matchingCoupons.length > 0;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-24 px-4 bg-[#211C19]/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl bg-[#FAF7F2] border border-[#D8C9B5] rounded-xs shadow-2xl overflow-hidden font-sans">
        {/* Input Bar */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-[#D8C9B5]/60 bg-white">
          <Search size={18} className="text-[#B69A69]" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search products, orders, customers, coupons... (ESC to close)"
            className="flex-1 text-xs bg-transparent text-[#211C19] placeholder:text-[#8C8175] focus:outline-hidden"
          />
          <button
            type="button"
            onClick={onClose}
            className="text-[#8C8175] hover:text-[#211C19] p-1 cursor-pointer"
          >
            <X size={16} />
          </button>
        </div>

        {/* Results / Suggestions */}
        <div className="max-h-[60vh] overflow-y-auto p-4 space-y-4">
          {!clean && (
            <div className="space-y-3">
              <span className="text-[10px] font-sans tracking-widest uppercase text-[#8C8175] block font-semibold">
                QUICK ACCESS JUMP
              </span>
              <div className="grid grid-cols-2 gap-2 text-xs">
                {[
                  { label: 'Orders & Shipments', tab: 'orders' },
                  { label: 'Products & Inventory', tab: 'products' },
                  { label: 'Customer Directory', tab: 'customers' },
                  { label: 'Coupons & Vouchers', tab: 'coupons' },
                  { label: 'Review Moderation', tab: 'reviews' },
                  { label: 'Store Settings', tab: 'settings' },
                ].map((item) => (
                  <button
                    key={item.tab}
                    type="button"
                    onClick={() => {
                      onNavigateTab(item.tab);
                      onClose();
                    }}
                    className="p-2.5 rounded-xs bg-white border border-[#D8C9B5]/60 text-left text-[#211C19] hover:border-[#211C19] transition-colors cursor-pointer flex items-center justify-between"
                  >
                    <span>{item.label}</span>
                    <ArrowRight size={12} className="text-[#8C8175]" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {clean && !hasResults && (
            <div className="py-8 text-center text-xs text-[#8C8175]">
              No matches found for "{query}".
            </div>
          )}

          {/* Products Result */}
          {matchingProducts.length > 0 && (
            <div>
              <span className="text-[10px] font-sans tracking-widest uppercase text-[#8C8175] block mb-2 font-semibold">
                PRODUCTS
              </span>
              <div className="space-y-1">
                {matchingProducts.map((p) => (
                  <div
                    key={p.id}
                    onClick={() => {
                      if (onSelectProduct) onSelectProduct(p.id);
                      onNavigateTab('products');
                      onClose();
                    }}
                    className="p-2.5 rounded-xs bg-white hover:bg-[#F5F0E8] border border-[#D8C9B5]/40 flex items-center justify-between cursor-pointer"
                  >
                    <div className="flex items-center gap-2.5">
                      <Package size={14} className="text-[#B69A69]" />
                      <span className="text-xs font-serif font-medium text-[#211C19]">{p.name}</span>
                      <span className="text-[10px] font-mono text-[#8C8175]">{p.sku}</span>
                    </div>
                    <span className="text-xs font-medium tabular-nums">
                      ₹{p.price.toLocaleString('en-IN')}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Orders Result */}
          {matchingOrders.length > 0 && (
            <div>
              <span className="text-[10px] font-sans tracking-widest uppercase text-[#8C8175] block mb-2 font-semibold">
                ORDERS
              </span>
              <div className="space-y-1">
                {matchingOrders.map((o) => (
                  <div
                    key={o.orderId}
                    onClick={() => {
                      if (onSelectOrder) onSelectOrder(o.orderId);
                      onNavigateTab('orders');
                      onClose();
                    }}
                    className="p-2.5 rounded-xs bg-white hover:bg-[#F5F0E8] border border-[#D8C9B5]/40 flex items-center justify-between cursor-pointer"
                  >
                    <div className="flex items-center gap-2.5">
                      <ShoppingBag size={14} className="text-[#B69A69]" />
                      <span className="text-xs font-mono font-medium text-[#211C19]">{o.orderId}</span>
                      <span className="text-xs text-[#8C8175]">
                        {o.shippingAddress.firstName} {o.shippingAddress.lastName}
                      </span>
                    </div>
                    <span className="text-[10px] uppercase font-sans font-medium px-2 py-0.5 rounded-xs bg-[#3b5e39]/10 text-[#3b5e39]">
                      {o.orderStatus}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Customers Result */}
          {matchingCustomers.length > 0 && (
            <div>
              <span className="text-[10px] font-sans tracking-widest uppercase text-[#8C8175] block mb-2 font-semibold">
                CUSTOMERS
              </span>
              <div className="space-y-1">
                {matchingCustomers.map((c) => (
                  <div
                    key={c.id}
                    onClick={() => {
                      onNavigateTab('customers');
                      onClose();
                    }}
                    className="p-2.5 rounded-xs bg-white hover:bg-[#F5F0E8] border border-[#D8C9B5]/40 flex items-center justify-between cursor-pointer"
                  >
                    <div className="flex items-center gap-2.5">
                      <User size={14} className="text-[#B69A69]" />
                      <span className="text-xs font-medium text-[#211C19]">{c.name}</span>
                      <span className="text-xs text-[#8C8175]">{c.email}</span>
                    </div>
                    <span className="text-xs text-[#8C8175]">{c.totalOrders} Orders</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Coupons Result */}
          {matchingCoupons.length > 0 && (
            <div>
              <span className="text-[10px] font-sans tracking-widest uppercase text-[#8C8175] block mb-2 font-semibold">
                VOUCHERS & COUPONS
              </span>
              <div className="space-y-1">
                {matchingCoupons.map((c) => (
                  <div
                    key={c.code}
                    onClick={() => {
                      onNavigateTab('coupons');
                      onClose();
                    }}
                    className="p-2.5 rounded-xs bg-white hover:bg-[#F5F0E8] border border-[#D8C9B5]/40 flex items-center justify-between cursor-pointer"
                  >
                    <div className="flex items-center gap-2.5">
                      <Tag size={14} className="text-[#B69A69]" />
                      <span className="text-xs font-mono font-bold text-[#211C19]">{c.code}</span>
                      <span className="text-xs text-[#8C8175]">
                        {c.value}{c.type === 'percentage' ? '%' : '₹'} off
                      </span>
                    </div>
                    <span className="text-[10px] text-[#3b5e39] font-medium">Active</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="px-4 py-2 border-t border-[#D8C9B5]/50 bg-white/70 flex justify-between text-[11px] text-[#8C8175]">
          <span>Type to search across the entire store database</span>
          <span className="font-mono">ESC to dismiss</span>
        </div>
      </div>
    </div>
  );
};
