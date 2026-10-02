import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { Coupon } from '../../types';
import {
  Tag,
  Plus,
  Trash2,
  Check,
  X,
  Save,
  Calendar,
  Percent,
  DollarSign,
  AlertCircle,
} from 'lucide-react';

export const AdminCoupons: React.FC = () => {
  const { coupons, addCoupon, updateCoupon, deleteCoupon } = useStore();

  const [isCreatingModalOpen, setIsCreatingModalOpen] = useState(false);
  const [formData, setFormData] = useState<Partial<Coupon>>({
    code: '',
    type: 'percentage',
    value: 10,
    minCartValue: 3000,
    maxDiscount: 1500,
    usageLimit: 100,
    active: true,
    startDate: '2026-10-01',
    endDate: '2026-12-31',
  });

  const handleCreateCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.code || !formData.value) return;

    const newCoupon: Coupon = {
      code: formData.code.trim().toUpperCase(),
      type: formData.type || 'percentage',
      value: Number(formData.value),
      minCartValue: Number(formData.minCartValue || 0),
      maxDiscount: formData.maxDiscount ? Number(formData.maxDiscount) : undefined,
      usageLimit: Number(formData.usageLimit || 100),
      usedCount: 0,
      startDate: formData.startDate || '2026-10-01',
      endDate: formData.endDate || '2026-12-31',
      active: formData.active ?? true,
    };

    addCoupon(newCoupon);
    setIsCreatingModalOpen(false);
    setFormData({
      code: '',
      type: 'percentage',
      value: 10,
      minCartValue: 3000,
      maxDiscount: 1500,
      usageLimit: 100,
      active: true,
      startDate: '2026-10-01',
      endDate: '2026-12-31',
    });
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300 font-sans">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#D8C9B5]/40">
        <div>
          <span className="text-[10px] font-sans tracking-[0.22em] uppercase text-[#8C8175] font-semibold">
            PROMOTIONAL PRIVILEGES & INCENTIVES
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl text-[#211C19] mt-0.5">
            Coupons & Promo Codes ({coupons.length})
          </h1>
        </div>

        <button
          type="button"
          onClick={() => setIsCreatingModalOpen(true)}
          className="btn-luxury-primary text-xs py-2.5 px-5 cursor-pointer flex items-center gap-2 self-start sm:self-auto"
        >
          <Plus size={15} />
          <span>ISSUE NEW PROMO CODE</span>
        </button>
      </div>

      {/* Coupons Table */}
      <div className="bg-white/80 backdrop-blur-sm border border-[#D8C9B5]/70 rounded-xs shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-sans border-collapse">
            <thead>
              <tr className="bg-[#FAF7F2] border-b border-[#D8C9B5] text-[#8C8175] text-[10px] tracking-widest uppercase">
                <th className="py-3 px-4 font-semibold">Code</th>
                <th className="py-3 px-4 font-semibold">Discount Type</th>
                <th className="py-3 px-4 font-semibold">Benefit Value</th>
                <th className="py-3 px-4 font-semibold">Min Spend</th>
                <th className="py-3 px-4 font-semibold">Usage Limit</th>
                <th className="py-3 px-4 font-semibold">Valid Period</th>
                <th className="py-3 px-4 font-semibold text-center">Status</th>
                <th className="py-3 px-4 font-semibold text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#D8C9B5]/30">
              {coupons.map((c) => (
                <tr key={c.code} className="hover:bg-[#FAF7F2]/80 transition-colors">
                  <td className="py-3.5 px-4 font-mono font-bold text-sm text-[#211C19]">
                    {c.code}
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="capitalize text-[#312A26] font-medium">{c.type}</span>
                  </td>
                  <td className="py-3.5 px-4 font-semibold text-[#211C19] tabular-nums">
                    {c.type === 'percentage' ? `${c.value}% OFF` : `₹${c.value} FLAT OFF`}
                    {c.maxDiscount && (
                      <span className="text-[10px] text-[#8C8175] block font-normal">
                        Max ₹{c.maxDiscount}
                      </span>
                    )}
                  </td>
                  <td className="py-3.5 px-4 text-[#8C8175] tabular-nums">
                    {c.minCartValue > 0 ? `₹${c.minCartValue.toLocaleString('en-IN')}` : 'No Minimum'}
                  </td>
                  <td className="py-3.5 px-4 text-[#8C8175]">
                    <span className="tabular-nums font-medium text-[#211C19]">{c.usedCount}</span> /{' '}
                    <span className="tabular-nums">{c.usageLimit}</span> used
                  </td>
                  <td className="py-3.5 px-4 text-[#8C8175] whitespace-nowrap text-[11px]">
                    {c.startDate} → {c.endDate}
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    <button
                      type="button"
                      onClick={() => updateCoupon({ ...c, active: !c.active })}
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border uppercase tracking-wider cursor-pointer ${
                        c.active
                          ? 'bg-[#3b5e39]/10 text-[#3b5e39] border-[#3b5e39]/30'
                          : 'bg-stone-200 text-stone-700 border-stone-300'
                      }`}
                    >
                      {c.active ? 'Active' : 'Inactive'}
                    </button>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <button
                      type="button"
                      onClick={() => deleteCoupon(c.code)}
                      className="p-1.5 text-[#8C8175] hover:text-[#942b41] transition-colors cursor-pointer"
                      title="Delete Coupon"
                    >
                      <Trash2 size={14} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* =================================================================== */}
      {/* ISSUE COUPON MODAL */}
      {/* =================================================================== */}
      {isCreatingModalOpen && (
        <div className="fixed inset-0 z-50 bg-[#211C19]/60 backdrop-blur-xs flex items-center justify-center p-4 font-sans">
          <div className="bg-[#FAF7F2] max-w-lg w-full border border-[#D8C9B5] rounded-xs shadow-2xl p-6 relative">
            <button
              type="button"
              onClick={() => setIsCreatingModalOpen(false)}
              className="absolute top-4 right-4 p-2 text-[#8C8175] hover:text-[#211C19]"
            >
              <X size={18} />
            </button>

            <span className="text-[10px] font-sans tracking-widest uppercase text-[#B69A69] font-semibold block mb-1">
              PROMOTIONAL CONFIGURATION
            </span>
            <h2 className="font-serif text-2xl text-[#211C19] mb-4">Issue New Promo Code</h2>

            <form onSubmit={handleCreateCoupon} className="space-y-4">
              <div>
                <label className="text-[10px] uppercase tracking-wider text-[#8C8175] font-semibold block mb-1">
                  Coupon Code *
                </label>
                <input
                  type="text"
                  required
                  value={formData.code || ''}
                  onChange={(e) => setFormData({ ...formData, code: e.target.value.toUpperCase() })}
                  placeholder="e.g. KIYORA20"
                  className="w-full px-3 py-2 text-xs bg-white border border-[#D8C9B5] rounded-xs focus:border-[#211C19] focus:outline-hidden font-mono uppercase font-bold"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] uppercase tracking-wider text-[#8C8175] font-semibold block mb-1">
                    Discount Type
                  </label>
                  <select
                    value={formData.type || 'percentage'}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value as any })}
                    className="w-full px-3 py-2 text-xs bg-white border border-[#D8C9B5] rounded-xs focus:border-[#211C19] focus:outline-hidden"
                  >
                    <option value="percentage">Percentage (%)</option>
                    <option value="fixed">Fixed Amount (₹)</option>
                  </select>
                </div>
                <div>
                  <label className="text-[10px] uppercase tracking-wider text-[#8C8175] font-semibold block mb-1">
                    Discount Value *
                  </label>
                  <input
                    type="number"
                    min={1}
                    required
                    value={formData.value || ''}
                    onChange={(e) => setFormData({ ...formData, value: Number(e.target.value) })}
                    placeholder={formData.type === 'percentage' ? '10' : '500'}
                    className="w-full px-3 py-2 text-xs bg-white border border-[#D8C9B5] rounded-xs focus:border-[#211C19] focus:outline-hidden tabular-nums font-bold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] uppercase tracking-wider text-[#8C8175] font-semibold block mb-1">
                    Min Cart Spend (₹)
                  </label>
                  <input
                    type="number"
                    min={0}
                    value={formData.minCartValue || ''}
                    onChange={(e) => setFormData({ ...formData, minCartValue: Number(e.target.value) })}
                    className="w-full px-3 py-2 text-xs bg-white border border-[#D8C9B5] rounded-xs focus:border-[#211C19] focus:outline-hidden tabular-nums"
                  />
                </div>
                <div>
                  <label className="text-[10px] uppercase tracking-wider text-[#8C8175] font-semibold block mb-1">
                    Max Discount Cap (₹)
                  </label>
                  <input
                    type="number"
                    min={0}
                    value={formData.maxDiscount || ''}
                    onChange={(e) => setFormData({ ...formData, maxDiscount: Number(e.target.value) })}
                    placeholder="Optional"
                    className="w-full px-3 py-2 text-xs bg-white border border-[#D8C9B5] rounded-xs focus:border-[#211C19] focus:outline-hidden tabular-nums"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] uppercase tracking-wider text-[#8C8175] font-semibold block mb-1">
                    Usage Cap Limit
                  </label>
                  <input
                    type="number"
                    min={1}
                    value={formData.usageLimit || 100}
                    onChange={(e) => setFormData({ ...formData, usageLimit: Number(e.target.value) })}
                    className="w-full px-3 py-2 text-xs bg-white border border-[#D8C9B5] rounded-xs focus:border-[#211C19] focus:outline-hidden tabular-nums"
                  />
                </div>
                <div>
                  <label className="text-[10px] uppercase tracking-wider text-[#8C8175] font-semibold block mb-1">
                    Valid Until
                  </label>
                  <input
                    type="date"
                    value={formData.endDate || '2026-12-31'}
                    onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-white border border-[#D8C9B5] rounded-xs focus:border-[#211C19] focus:outline-hidden"
                  />
                </div>
              </div>

              <div className="pt-3 border-t border-[#D8C9B5] flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsCreatingModalOpen(false)}
                  className="btn-luxury-outline text-xs py-2 px-4 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-luxury-primary text-xs py-2 px-5 cursor-pointer flex items-center gap-1.5"
                >
                  <Save size={13} />
                  <span>ACTIVATE PROMO CODE</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
