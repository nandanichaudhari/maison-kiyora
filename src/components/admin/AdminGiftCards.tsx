import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { GiftCard } from '../../types';
import {
  Gift,
  Plus,
  Copy,
  Check,
  X,
  Save,
  CreditCard,
  Send,
  Calendar,
} from 'lucide-react';

export const AdminGiftCards: React.FC = () => {
  const { giftCards, addGiftCard } = useStore();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const [formData, setFormData] = useState<Partial<GiftCard>>({
    recipientName: '',
    recipientEmail: '',
    initialBalance: 5000,
    expiryDate: '2027-10-01',
  });

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const handleIssue = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.recipientName || !formData.recipientEmail || !formData.initialBalance) return;

    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const code = `GC-KIYORA-${randomSuffix}`;

    const newCard: GiftCard = {
      id: `gc-${Date.now()}`,
      code,
      initialBalance: Number(formData.initialBalance),
      currentBalance: Number(formData.initialBalance),
      recipientName: formData.recipientName,
      recipientEmail: formData.recipientEmail,
      expiryDate: formData.expiryDate || '2027-10-01',
      status: 'Active',
      createdAt: '01 Oct 2026',
    };

    addGiftCard(newCard);
    setIsModalOpen(false);
    setFormData({
      recipientName: '',
      recipientEmail: '',
      initialBalance: 5000,
      expiryDate: '2027-10-01',
    });
  };

  const totalOutstanding = giftCards.reduce(
    (acc, gc) => acc + (gc.status === 'Active' ? gc.currentBalance : 0),
    0
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-300 font-sans">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#D8C9B5]/40">
        <div>
          <span className="text-[10px] font-sans tracking-[0.22em] uppercase text-[#8C8175] font-semibold">
            LUXURY PRESENTATION COFFRETS & VOUCHERS
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl text-[#211C19] mt-0.5">
            Digital Gift Cards ({giftCards.length})
          </h1>
        </div>

        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="btn-luxury-primary text-xs py-2.5 px-5 cursor-pointer flex items-center gap-2 self-start sm:self-auto"
        >
          <Plus size={15} />
          <span>ISSUE GIFT CARD</span>
        </button>
      </div>

      {/* Summary Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white/70 backdrop-blur-sm border border-[#D8C9B5]/60 rounded-xs p-5 shadow-2xs">
          <span className="text-[10px] uppercase font-sans tracking-widest text-[#8C8175] block">
            TOTAL ISSUED CARDS
          </span>
          <p className="font-serif text-3xl text-[#211C19] tabular-nums mt-1">{giftCards.length}</p>
        </div>
        <div className="bg-white/70 backdrop-blur-sm border border-[#D8C9B5]/60 rounded-xs p-5 shadow-2xs">
          <span className="text-[10px] uppercase font-sans tracking-widest text-[#8C8175] block">
            OUTSTANDING BALANCE VALUE
          </span>
          <p className="font-sans font-semibold text-2xl text-[#B69A69] tabular-nums mt-1">
            ₹{totalOutstanding.toLocaleString('en-IN')}
          </p>
        </div>
        <div className="bg-white/70 backdrop-blur-sm border border-[#D8C9B5]/60 rounded-xs p-5 shadow-2xs">
          <span className="text-[10px] uppercase font-sans tracking-widest text-[#8C8175] block">
            ACTIVE STATUS
          </span>
          <p className="font-serif text-3xl text-[#3b5e39] tabular-nums mt-1">
            {giftCards.filter((g) => g.status === 'Active').length}
          </p>
        </div>
      </div>

      {/* Gift Cards Table */}
      <div className="bg-white/80 backdrop-blur-sm border border-[#D8C9B5]/70 rounded-xs shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-sans border-collapse">
            <thead>
              <tr className="bg-[#FAF7F2] border-b border-[#D8C9B5] text-[#8C8175] text-[10px] tracking-widest uppercase">
                <th className="py-3 px-4 font-semibold">Gift Card Voucher</th>
                <th className="py-3 px-4 font-semibold">Recipient</th>
                <th className="py-3 px-4 font-semibold text-right">Initial Value</th>
                <th className="py-3 px-4 font-semibold text-right">Available Balance</th>
                <th className="py-3 px-4 font-semibold">Issued Date</th>
                <th className="py-3 px-4 font-semibold">Expiry</th>
                <th className="py-3 px-4 font-semibold text-center">Status</th>
                <th className="py-3 px-4 font-semibold text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#D8C9B5]/30">
              {giftCards.map((gc) => (
                <tr key={gc.id} className="hover:bg-[#FAF7F2]/80 transition-colors">
                  <td className="py-3.5 px-4 font-mono font-bold text-sm text-[#211C19]">
                    <div className="flex items-center gap-2">
                      <span>{gc.code}</span>
                      <button
                        type="button"
                        onClick={() => handleCopy(gc.code)}
                        className="text-[#8C8175] hover:text-[#211C19] p-1 cursor-pointer"
                        title="Copy Gift Card Code"
                      >
                        {copiedCode === gc.code ? (
                          <Check size={12} className="text-[#3b5e39]" />
                        ) : (
                          <Copy size={12} />
                        )}
                      </button>
                    </div>
                  </td>
                  <td className="py-3.5 px-4">
                    <p className="font-medium text-[#211C19]">{gc.recipientName}</p>
                    <p className="text-[11px] text-[#8C8175]">{gc.recipientEmail}</p>
                  </td>
                  <td className="py-3.5 px-4 text-right text-[#8C8175] tabular-nums">
                    ₹{gc.initialBalance.toLocaleString('en-IN')}
                  </td>
                  <td className="py-3.5 px-4 text-right font-medium text-[#211C19] tabular-nums">
                    ₹{gc.currentBalance.toLocaleString('en-IN')}
                  </td>
                  <td className="py-3.5 px-4 text-[#8C8175] whitespace-nowrap">{gc.createdAt}</td>
                  <td className="py-3.5 px-4 text-[#8C8175] whitespace-nowrap">{gc.expiryDate}</td>
                  <td className="py-3.5 px-4 text-center">
                    <span
                      className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold border tracking-wider uppercase ${
                        gc.status === 'Active'
                          ? 'bg-[#3b5e39]/10 text-[#3b5e39] border-[#3b5e39]/30'
                          : 'bg-stone-200 text-stone-700 border-stone-300'
                      }`}
                    >
                      {gc.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <button
                      type="button"
                      onClick={() => handleCopy(gc.code)}
                      className="text-xs text-[#211C19] hover:text-[#B69A69] underline cursor-pointer"
                    >
                      Copy Voucher
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* =================================================================== */}
      {/* ISSUE DIGITAL GIFT CARD MODAL */}
      {/* =================================================================== */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-[#211C19]/60 backdrop-blur-xs flex items-center justify-center p-4 font-sans">
          <div className="bg-[#FAF7F2] max-w-md w-full border border-[#D8C9B5] rounded-xs shadow-2xl p-6 relative">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 p-2 text-[#8C8175] hover:text-[#211C19]"
            >
              <X size={18} />
            </button>

            <span className="text-[10px] font-sans tracking-widest uppercase text-[#B69A69] font-semibold block mb-1">
              DIGITAL CONCIERGE VOUCHER
            </span>
            <h2 className="font-serif text-2xl text-[#211C19] mb-4">Issue Gift Card</h2>

            <form onSubmit={handleIssue} className="space-y-4">
              <div>
                <label className="text-[10px] uppercase tracking-wider text-[#8C8175] font-semibold block mb-1">
                  Recipient Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.recipientName || ''}
                  onChange={(e) => setFormData({ ...formData, recipientName: e.target.value })}
                  placeholder="e.g. Lady Vivienne Montgomery"
                  className="w-full px-3 py-2 text-xs bg-white border border-[#D8C9B5] rounded-xs focus:border-[#211C19] focus:outline-hidden"
                />
              </div>

              <div>
                <label className="text-[10px] uppercase tracking-wider text-[#8C8175] font-semibold block mb-1">
                  Recipient Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={formData.recipientEmail || ''}
                  onChange={(e) => setFormData({ ...formData, recipientEmail: e.target.value })}
                  placeholder="vivienne@montgomery.luxury"
                  className="w-full px-3 py-2 text-xs bg-white border border-[#D8C9B5] rounded-xs focus:border-[#211C19] focus:outline-hidden"
                />
              </div>

              <div>
                <label className="text-[10px] uppercase tracking-wider text-[#8C8175] font-semibold block mb-1.5">
                  Select Denomination (₹) *
                </label>
                <div className="grid grid-cols-3 gap-2 mb-2">
                  {[2500, 5000, 10000].map((amt) => (
                    <button
                      key={amt}
                      type="button"
                      onClick={() => setFormData({ ...formData, initialBalance: amt })}
                      className={`py-2 rounded-2xs text-xs font-mono font-medium border cursor-pointer ${
                        formData.initialBalance === amt
                          ? 'bg-[#211C19] text-[#F5F0E8] border-[#211C19]'
                          : 'bg-white border-[#D8C9B5] text-[#312A26]'
                      }`}
                    >
                      ₹{amt.toLocaleString('en-IN')}
                    </button>
                  ))}
                </div>
                <input
                  type="number"
                  min={500}
                  required
                  value={formData.initialBalance || ''}
                  onChange={(e) => setFormData({ ...formData, initialBalance: Number(e.target.value) })}
                  className="w-full px-3 py-2 text-xs bg-white border border-[#D8C9B5] rounded-xs focus:border-[#211C19] focus:outline-hidden tabular-nums font-bold"
                  placeholder="Custom amount"
                />
              </div>

              <div>
                <label className="text-[10px] uppercase tracking-wider text-[#8C8175] font-semibold block mb-1">
                  Expiry Date
                </label>
                <input
                  type="date"
                  value={formData.expiryDate || '2027-10-01'}
                  onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-white border border-[#D8C9B5] rounded-xs focus:border-[#211C19] focus:outline-hidden"
                />
              </div>

              <div className="pt-3 border-t border-[#D8C9B5] flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="btn-luxury-outline text-xs py-2 px-4 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-luxury-primary text-xs py-2 px-5 cursor-pointer flex items-center gap-1.5"
                >
                  <Save size={13} />
                  <span>ISSUE & DISPATCH CODE</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
