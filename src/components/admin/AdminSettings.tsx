import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { StoreSettings } from '../../types';
import {
  Settings,
  Save,
  Check,
  Shield,
  CreditCard,
  Truck,
  Mail,
  UserCheck,
  History,
  Lock,
} from 'lucide-react';

export const AdminSettings: React.FC = () => {
  const { settings, updateSettings, auditLog } = useStore();

  const [formSettings, setFormSettings] = useState<StoreSettings>(settings);
  const [activeTab, setActiveTab] = useState<'general' | 'payments' | 'shipping' | 'team' | 'audit'>(
    'general'
  );
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings(formSettings);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const handleTogglePayment = (key: keyof StoreSettings['enabledPayments']) => {
    setFormSettings({
      ...formSettings,
      enabledPayments: {
        ...formSettings.enabledPayments,
        [key]: !formSettings.enabledPayments[key],
      },
    });
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300 font-sans">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#D8C9B5]/40">
        <div>
          <span className="text-[10px] font-sans tracking-[0.22em] uppercase text-[#8C8175] font-semibold">
            STORE ENGINE & ATELIER PREFERENCES
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl text-[#211C19] mt-0.5">
            Settings & Operations
          </h1>
        </div>

        {saveSuccess && (
          <div className="flex items-center gap-2 p-2.5 bg-[#3b5e39]/10 border border-[#3b5e39]/30 rounded-xs text-xs text-[#3b5e39] font-medium animate-in fade-in">
            <Check size={14} />
            <span>Preferences saved successfully</span>
          </div>
        )}
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-[#D8C9B5]/50 overflow-x-auto text-xs pb-1">
        {[
          { id: 'general', label: 'Boutique Profile' },
          { id: 'shipping', label: 'Shipping & Delivery' },
          { id: 'payments', label: 'Payment Gateways' },
          { id: 'team', label: 'Admin Team & Roles' },
          { id: 'audit', label: 'Security & Audit Trail' },
        ].map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setActiveTab(t.id as any)}
            className={`px-4 py-2 font-sans tracking-wide border-b-2 transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === t.id
                ? 'border-[#211C19] text-[#211C19] font-semibold'
                : 'border-transparent text-[#8C8175] hover:text-[#211C19]'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Tab 1: General */}
        {activeTab === 'general' && (
          <div className="bg-white/80 backdrop-blur-sm border border-[#D8C9B5]/70 rounded-xs p-6 shadow-2xs space-y-4">
            <h3 className="font-serif text-xl text-[#211C19]">Maison Kiyora Identity</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-[10px] uppercase tracking-wider text-[#8C8175] font-semibold block mb-1">
                  Store Brand Name
                </label>
                <input
                  type="text"
                  value={formSettings.storeName}
                  onChange={(e) =>
                    setFormSettings({ ...formSettings, storeName: e.target.value })
                  }
                  className="w-full px-3 py-2 text-xs bg-[#FAF7F2] border border-[#D8C9B5] rounded-xs focus:border-[#211C19] focus:outline-hidden"
                />
              </div>
              <div>
                <label className="text-[10px] uppercase tracking-wider text-[#8C8175] font-semibold block mb-1">
                  Concierge Support Email
                </label>
                <input
                  type="email"
                  value={formSettings.supportEmail}
                  onChange={(e) =>
                    setFormSettings({ ...formSettings, supportEmail: e.target.value })
                  }
                  className="w-full px-3 py-2 text-xs bg-[#FAF7F2] border border-[#D8C9B5] rounded-xs focus:border-[#211C19] focus:outline-hidden"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="text-[10px] uppercase tracking-wider text-[#8C8175] font-semibold block mb-1">
                  Customer Concierge Phone
                </label>
                <input
                  type="text"
                  value={formSettings.phone}
                  onChange={(e) =>
                    setFormSettings({ ...formSettings, phone: e.target.value })
                  }
                  className="w-full px-3 py-2 text-xs bg-[#FAF7F2] border border-[#D8C9B5] rounded-xs focus:border-[#211C19] focus:outline-hidden"
                />
              </div>
              <div>
                <label className="text-[10px] uppercase tracking-wider text-[#8C8175] font-semibold block mb-1">
                  Operating Currency
                </label>
                <input
                  type="text"
                  disabled
                  value={`${formSettings.currency} (Indian Rupee)`}
                  className="w-full px-3 py-2 text-xs bg-stone-100 border border-[#D8C9B5] rounded-xs text-[#211C19]"
                />
              </div>
              <div>
                <label className="text-[10px] uppercase tracking-wider text-[#8C8175] font-semibold block mb-1">
                  Atelier Timezone
                </label>
                <input
                  type="text"
                  value={formSettings.timezone}
                  onChange={(e) =>
                    setFormSettings({ ...formSettings, timezone: e.target.value })
                  }
                  className="w-full px-3 py-2 text-xs bg-[#FAF7F2] border border-[#D8C9B5] rounded-xs focus:border-[#211C19] focus:outline-hidden"
                />
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Shipping */}
        {activeTab === 'shipping' && (
          <div className="bg-white/80 backdrop-blur-sm border border-[#D8C9B5]/70 rounded-xs p-6 shadow-2xs space-y-4">
            <h3 className="font-serif text-xl text-[#211C19]">Logistics & Express Insured Freight</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-[10px] uppercase tracking-wider text-[#8C8175] font-semibold block mb-1">
                  Free Shipping Minimum Threshold (₹)
                </label>
                <input
                  type="number"
                  value={formSettings.freeShippingThreshold}
                  onChange={(e) =>
                    setFormSettings({
                      ...formSettings,
                      freeShippingThreshold: Number(e.target.value),
                    })
                  }
                  className="w-full px-3 py-2 text-xs bg-[#FAF7F2] border border-[#D8C9B5] rounded-xs focus:border-[#211C19] focus:outline-hidden tabular-nums font-medium"
                />
                <span className="text-[10px] text-[#8C8175] mt-1 block">
                  Orders exceeding this amount unlock complimentary BlueDart Express delivery.
                </span>
              </div>
              <div>
                <label className="text-[10px] uppercase tracking-wider text-[#8C8175] font-semibold block mb-1">
                  Standard Flat Shipping Fee (₹)
                </label>
                <input
                  type="number"
                  value={formSettings.standardShippingFee}
                  onChange={(e) =>
                    setFormSettings({
                      ...formSettings,
                      standardShippingFee: Number(e.target.value),
                    })
                  }
                  className="w-full px-3 py-2 text-xs bg-[#FAF7F2] border border-[#D8C9B5] rounded-xs focus:border-[#211C19] focus:outline-hidden tabular-nums"
                />
              </div>
            </div>

            <div className="pt-2">
              <label className="text-[10px] uppercase tracking-wider text-[#8C8175] font-semibold block mb-2">
                Official Carrier Integrations
              </label>
              <div className="p-3 bg-[#FAF7F2] border border-[#D8C9B5] rounded-xs text-xs space-y-1 text-[#312A26]">
                <p className="font-medium text-[#211C19]">Primary: BlueDart Air Express (Priority Flight Line)</p>
                <p className="text-[11px] text-[#8C8175]">Secondary: Delhivery Surface Cargo & DHL Express International</p>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Payments */}
        {activeTab === 'payments' && (
          <div className="bg-white/80 backdrop-blur-sm border border-[#D8C9B5]/70 rounded-xs p-6 shadow-2xs space-y-4">
            <h3 className="font-serif text-xl text-[#211C19]">Enabled Checkout Tender</h3>
            <p className="text-xs text-[#8C8175]">
              Toggle which payment methods are accepted during customer checkout.
            </p>

            <div className="divide-y divide-[#D8C9B5]/40 pt-2">
              {[
                {
                  key: 'upi' as const,
                  title: 'UPI Instant (GPay / PhonePe / Paytm / Cred)',
                  desc: 'Zero-touch instant UPI payment with zero friction.',
                },
                {
                  key: 'card' as const,
                  title: 'Credit & Debit Cards (Visa / Mastercard / Amex)',
                  desc: '3D Secure 2.0 encrypted card processing via Razorpay.',
                },
                {
                  key: 'netbanking' as const,
                  title: 'Net Banking (50+ Indian Premier Banks)',
                  desc: 'HDFC, ICICI, SBI, Axis direct institutional gateway.',
                },
                {
                  key: 'wallets' as const,
                  title: 'Digital Wallets',
                  desc: 'Mobikwik, Amazon Pay, and Paytm balance.',
                },
                {
                  key: 'cod' as const,
                  title: 'Cash on Delivery (COD) with OTP Verification',
                  desc: 'Hand-to-hand cash payment upon physical parcel reception.',
                },
              ].map((item) => (
                <div key={item.key} className="py-3 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-medium text-[#211C19]">{item.title}</p>
                    <p className="text-[11px] text-[#8C8175]">{item.desc}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleTogglePayment(item.key)}
                    className={`px-3 py-1 rounded-full text-[10px] font-bold border uppercase tracking-wider cursor-pointer ${
                      formSettings.enabledPayments[item.key]
                        ? 'bg-[#3b5e39]/10 text-[#3b5e39] border-[#3b5e39]/30'
                        : 'bg-stone-200 text-stone-700 border-stone-300'
                    }`}
                  >
                    {formSettings.enabledPayments[item.key] ? 'Enabled' : 'Disabled'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 4: Team */}
        {activeTab === 'team' && (
          <div className="bg-white/80 backdrop-blur-sm border border-[#D8C9B5]/70 rounded-xs p-6 shadow-2xs space-y-4">
            <h3 className="font-serif text-xl text-[#211C19]">Atelier Staff & Privileged Accounts</h3>
            <div className="divide-y divide-[#D8C9B5]/40">
              {[
                { name: 'Nandani Chaudhari', email: 'admin@maisonkiyora.com', role: 'OWNER', status: 'Active' },
                { name: 'Laurent Delacroix', email: 'master.perfumer@maisonkiyora.com', role: 'ADMIN', status: 'Active' },
                { name: 'Geneviève Moreau', email: 'editorial@maisonkiyora.com', role: 'CONTENT MANAGER', status: 'Active' },
              ].map((staff) => (
                <div key={staff.email} className="py-3.5 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#211C19] text-[#F5F0E8] font-serif font-bold text-xs flex items-center justify-center">
                      {staff.name
                        .split(' ')
                        .map((n) => n[0])
                        .join('')}
                    </div>
                    <div>
                      <p className="font-medium text-[#211C19]">{staff.name}</p>
                      <p className="text-[11px] text-[#8C8175]">{staff.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] font-mono tracking-wider font-semibold text-[#B69A69] border border-[#B69A69]/40 px-2 py-0.5 rounded-2xs">
                      {staff.role}
                    </span>
                    <span className="text-[10px] text-[#3b5e39] font-medium">Active</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 5: Audit Trail */}
        {activeTab === 'audit' && (
          <div className="bg-white/80 backdrop-blur-sm border border-[#D8C9B5]/70 rounded-xs p-6 shadow-2xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#D8C9B5]/40">
              <h3 className="font-serif text-xl text-[#211C19]">Security Log & Audit Trail</h3>
              <span className="text-[10px] text-[#8C8175] font-mono">APPEND-ONLY SECURE LOG</span>
            </div>

            <div className="divide-y divide-[#D8C9B5]/40 text-xs">
              {auditLog.map((log) => (
                <div key={log.id} className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-[#211C19]">{log.action}</span>
                      <span className="text-[10px] font-mono text-[#8C8175]">by {log.user} ({log.role})</span>
                    </div>
                    <p className="text-[11px] text-[#312A26] mt-0.5">{log.details}</p>
                  </div>
                  <span className="text-[10px] text-[#8C8175] font-mono whitespace-nowrap">
                    {log.timestamp}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Submit Bar */}
        <div className="p-4 bg-white/80 border border-[#D8C9B5] rounded-xs flex items-center justify-between">
          <span className="text-xs text-[#8C8175]">
            Save system parameters and authentication rules.
          </span>
          <button
            type="submit"
            className="btn-luxury-primary text-xs py-2.5 px-6 cursor-pointer flex items-center gap-2"
          >
            <Save size={14} />
            <span>SAVE SETTINGS</span>
          </button>
        </div>
      </form>
    </div>
  );
};
