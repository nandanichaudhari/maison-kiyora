import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { Customer, Order } from '../../types';
import {
  Users,
  Search,
  Crown,
  ShoppingBag,
  Mail,
  Phone,
  Calendar,
  MapPin,
  X,
  ExternalLink,
} from 'lucide-react';

interface AdminCustomersProps {
  onSelectOrder?: (orderId: string) => void;
}

export const AdminCustomers: React.FC<AdminCustomersProps> = ({ onSelectOrder }) => {
  const { customers, orders } = useStore();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTier, setSelectedTier] = useState<string>('All');
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);

  const filteredCustomers = customers.filter((c) => {
    const matchesTier = selectedTier === 'All' ? true : c.tier === selectedTier;
    const query = searchQuery.trim().toLowerCase();
    const matchesQuery =
      !query ||
      c.name.toLowerCase().includes(query) ||
      c.email.toLowerCase().includes(query) ||
      c.phone.includes(query);
    return matchesTier && matchesQuery;
  });

  const getCustomerOrders = (customerEmail: string): Order[] => {
    return orders.filter(
      (o) => o.shippingAddress.email.toLowerCase() === customerEmail.toLowerCase()
    );
  };

  const getTierBadge = (tier: string) => {
    switch (tier) {
      case 'VIP':
        return 'bg-[#211C19] text-[#F5F0E8] border-[#211C19]';
      case 'Patron':
        return 'bg-[#B69A69]/20 text-[#8c6b3e] border-[#B69A69]/40';
      default:
        return 'bg-[#F5F0E8] text-[#312A26] border-[#D8C9B5]';
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300 font-sans">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#D8C9B5]/40">
        <div>
          <span className="text-[10px] font-sans tracking-[0.22em] uppercase text-[#8C8175] font-semibold">
            CLIENTELE & CONNOISSEURS
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl text-[#211C19] mt-0.5">
            Clientele Directory ({customers.length})
          </h1>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 p-1 bg-white border border-[#D8C9B5] rounded-xs text-xs">
            <Crown size={14} className="text-[#B69A69] ml-1" />
            <span className="text-[#8C8175] text-[11px] pr-2">
              {customers.filter((c) => c.tier === 'VIP').length} VIP Patrons
            </span>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white/80 backdrop-blur-sm border border-[#D8C9B5]/70 rounded-xs p-4 shadow-2xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search
            size={14}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8C8175]"
          />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search client name, email, or phone..."
            className="w-full pl-9 pr-4 py-2 text-xs bg-[#FAF7F2] border border-[#D8C9B5] text-[#211C19] rounded-xs focus:border-[#211C19] focus:outline-hidden"
          />
        </div>

        <div className="flex items-center gap-2 text-xs">
          {['All', 'VIP', 'Patron', 'Connoisseur'].map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setSelectedTier(t)}
              className={`px-3 py-1.5 rounded-2xs font-sans tracking-wide cursor-pointer ${
                selectedTier === t
                  ? 'bg-[#211C19] text-[#F5F0E8] font-medium'
                  : 'bg-white border border-[#D8C9B5] text-[#8C8175] hover:text-[#211C19]'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Customer Table */}
      <div className="bg-white/80 backdrop-blur-sm border border-[#D8C9B5]/70 rounded-xs shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-sans border-collapse">
            <thead>
              <tr className="bg-[#FAF7F2] border-b border-[#D8C9B5] text-[#8C8175] text-[10px] tracking-widest uppercase">
                <th className="py-3 px-4 font-semibold">Client</th>
                <th className="py-3 px-4 font-semibold">Tier</th>
                <th className="py-3 px-4 font-semibold text-center">Orders</th>
                <th className="py-3 px-4 font-semibold text-right">Lifetime Spend</th>
                <th className="py-3 px-4 font-semibold">Last Acquisition</th>
                <th className="py-3 px-4 font-semibold">Member Since</th>
                <th className="py-3 px-4 font-semibold text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#D8C9B5]/30">
              {filteredCustomers.map((c) => (
                <tr
                  key={c.id}
                  onClick={() => setSelectedCustomer(c)}
                  className="hover:bg-[#FAF7F2]/80 transition-colors cursor-pointer group"
                >
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#211C19] text-[#F5F0E8] font-serif font-semibold text-xs flex items-center justify-center shrink-0">
                        {c.name
                          .split(' ')
                          .map((n) => n[0])
                          .join('')
                          .slice(0, 2)}
                      </div>
                      <div>
                        <p className="font-serif text-sm font-semibold text-[#211C19] group-hover:text-[#B69A69] transition-colors">
                          {c.name}
                        </p>
                        <p className="text-[11px] text-[#8C8175]">{c.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3.5 px-4">
                    <span
                      className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-semibold border tracking-wider uppercase ${getTierBadge(
                        c.tier
                      )}`}
                    >
                      {c.tier}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-center font-medium text-[#211C19] tabular-nums">
                    {c.totalOrders}
                  </td>
                  <td className="py-3.5 px-4 text-right font-medium text-[#211C19] tabular-nums">
                    ₹{c.totalSpend.toLocaleString('en-IN')}
                  </td>
                  <td className="py-3.5 px-4 text-[#8C8175] whitespace-nowrap">
                    {c.lastOrderDate}
                  </td>
                  <td className="py-3.5 px-4 text-[#8C8175] whitespace-nowrap">{c.joinedDate}</td>
                  <td className="py-3.5 px-4 text-right">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedCustomer(c);
                      }}
                      className="text-xs text-[#211C19] hover:text-[#B69A69] underline cursor-pointer"
                    >
                      Profile
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Customer Inspection Drawer */}
      {selectedCustomer && (
        <div className="fixed inset-0 z-50 bg-[#211C19]/60 backdrop-blur-xs flex justify-end animate-in fade-in duration-200">
          <div className="w-full max-w-xl bg-[#FAF7F2] h-full shadow-2xl overflow-y-auto flex flex-col justify-between border-l border-[#D8C9B5]">
            <div className="p-6 bg-white border-b border-[#D8C9B5] flex items-center justify-between sticky top-0 z-10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#211C19] text-[#F5F0E8] font-serif font-bold text-sm flex items-center justify-center">
                  {selectedCustomer.name
                    .split(' ')
                    .map((n) => n[0])
                    .join('')
                    .slice(0, 2)}
                </div>
                <div>
                  <h3 className="font-serif text-xl text-[#211C19]">{selectedCustomer.name}</h3>
                  <span
                    className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-semibold border tracking-wider uppercase mt-0.5 ${getTierBadge(
                      selectedCustomer.tier
                    )}`}
                  >
                    {selectedCustomer.tier} Member
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setSelectedCustomer(null)}
                className="p-2 text-[#8C8175] hover:text-[#211C19]"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-6 space-y-6 flex-1">
              {/* Stats overview */}
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-white border border-[#D8C9B5] rounded-xs">
                  <span className="text-[10px] uppercase tracking-wider text-[#8C8175] block">
                    LIFETIME SPEND
                  </span>
                  <p className="font-serif text-2xl text-[#211C19] tabular-nums mt-1">
                    ₹{selectedCustomer.totalSpend.toLocaleString('en-IN')}
                  </p>
                </div>
                <div className="p-4 bg-white border border-[#D8C9B5] rounded-xs">
                  <span className="text-[10px] uppercase tracking-wider text-[#8C8175] block">
                    TOTAL ORDERS
                  </span>
                  <p className="font-serif text-2xl text-[#211C19] tabular-nums mt-1">
                    {selectedCustomer.totalOrders}
                  </p>
                </div>
              </div>

              {/* Contact information */}
              <div className="p-4 bg-white border border-[#D8C9B5] rounded-xs space-y-2.5">
                <h4 className="text-[10px] uppercase font-sans tracking-widest text-[#8C8175] font-semibold mb-2">
                  Contact Coordinates
                </h4>
                <div className="flex items-center gap-2.5 text-xs text-[#211C19]">
                  <Mail size={14} className="text-[#B69A69]" />
                  <span>{selectedCustomer.email}</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs text-[#211C19]">
                  <Phone size={14} className="text-[#B69A69]" />
                  <span>{selectedCustomer.phone}</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs text-[#8C8175]">
                  <Calendar size={14} className="text-[#B69A69]" />
                  <span>Client since {selectedCustomer.joinedDate}</span>
                </div>
              </div>

              {/* Delivery addresses */}
              <div className="p-4 bg-white border border-[#D8C9B5] rounded-xs">
                <h4 className="text-[10px] uppercase font-sans tracking-widest text-[#8C8175] font-semibold mb-2">
                  Primary Delivery Address
                </h4>
                {selectedCustomer.addresses.length > 0 ? (
                  <div className="flex items-start gap-2.5 text-xs text-[#211C19] leading-relaxed">
                    <MapPin size={15} className="text-[#B69A69] shrink-0 mt-0.5" />
                    <div>
                      <p>{selectedCustomer.addresses[0].address}</p>
                      <p>
                        {selectedCustomer.addresses[0].city}, {selectedCustomer.addresses[0].state}{' '}
                        — {selectedCustomer.addresses[0].pinCode}
                      </p>
                    </div>
                  </div>
                ) : (
                  <p className="text-xs text-[#8C8175]">No saved addresses.</p>
                )}
              </div>

              {/* Order History */}
              <div className="p-4 bg-white border border-[#D8C9B5] rounded-xs space-y-3">
                <h4 className="text-[10px] uppercase font-sans tracking-widest text-[#8C8175] font-semibold">
                  Maison Kiyora Order History
                </h4>
                {getCustomerOrders(selectedCustomer.email).length === 0 ? (
                  <p className="text-xs text-[#8C8175] py-2">
                    No orders linked directly to this email in active cache.
                  </p>
                ) : (
                  <div className="divide-y divide-[#D8C9B5]/40 text-xs">
                    {getCustomerOrders(selectedCustomer.email).map((ord) => (
                      <div key={ord.orderId} className="py-2.5 flex items-center justify-between">
                        <div>
                          <p className="font-mono font-medium text-[#211C19]">{ord.orderId}</p>
                          <p className="text-[11px] text-[#8C8175]">
                            {ord.createdAt} · {ord.items.length} items
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium tabular-nums text-[#211C19]">
                            ₹{ord.total.toLocaleString('en-IN')}
                          </p>
                          <span className="text-[10px] text-[#3b5e39]">{ord.orderStatus}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="p-4 bg-white border-t border-[#D8C9B5] text-right">
              <button
                type="button"
                onClick={() => setSelectedCustomer(null)}
                className="btn-luxury-outline text-xs py-2 px-5 cursor-pointer"
              >
                Close Drawer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
