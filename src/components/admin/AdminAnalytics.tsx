import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import {
  BarChart3,
  TrendingUp,
  DollarSign,
  ShoppingBag,
  Users,
  Download,
  Calendar,
  Percent,
  Layers,
} from 'lucide-react';

export const AdminAnalytics: React.FC = () => {
  const { products, orders, customers } = useStore();
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d' | '12m'>('30d');

  const totalRevenue = orders.reduce((sum, o) => sum + (o.paymentStatus === 'Paid' ? o.total : 0), 0) + 482000;
  const estimatedProfit = Math.round(totalRevenue * 0.62);
  const aov = 5420;
  const conversionRate = 3.84;

  const familyBreakdown = [
    { family: 'Woody & Resinous', percent: 46, revenue: Math.round(totalRevenue * 0.46) },
    { family: 'Velvet Florals', percent: 28, revenue: Math.round(totalRevenue * 0.28) },
    { family: 'Citrus Solaire', percent: 14, revenue: Math.round(totalRevenue * 0.14) },
    { family: 'Fresh & Orris', percent: 12, revenue: Math.round(totalRevenue * 0.12) },
  ];

  const topSellingCreations = [
    { name: 'OODY RASPBERRY', family: 'Woody', unitsSold: 142, revenue: 709858, share: '34%' },
    { name: 'SANTAL BLANC', family: 'Woody', unitsSold: 98, revenue: 470202, share: '22%' },
    { name: 'ROSE IMPÉRIALE', family: 'Floral', unitsSold: 76, revenue: 395124, share: '19%' },
    { name: 'IRIS CÉLESTE', family: 'Fresh', unitsSold: 54, revenue: 291546, share: '14%' },
    { name: 'NÉROLI SOLAIRE', family: 'Citrus', unitsSold: 42, revenue: 205758, share: '11%' },
  ];

  const channels = [
    { channel: 'Direct Luxury Access / Private Bookmarks', share: '38%', orders: 128 },
    { channel: 'Editorial Fragrance Reviews & Press', share: '26%', orders: 88 },
    { channel: 'Private Concierge & VIP Referrals', share: '21%', orders: 71 },
    { channel: 'Organic Search (Haute Parfumerie)', share: '15%', orders: 51 },
  ];

  const handleExportCSV = () => {
    const csvContent =
      'data:text/csv;charset=utf-8,' +
      'Perfume,Family,Units Sold,Revenue (INR),Share\n' +
      topSellingCreations
        .map((p) => `"${p.name}","${p.family}",${p.unitsSold},${p.revenue},"${p.share}"`)
        .join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `maison_kiyora_analytics_${timeRange}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300 font-sans">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#D8C9B5]/40">
        <div>
          <span className="text-[10px] font-sans tracking-[0.22em] uppercase text-[#8C8175] font-semibold">
            BUSINESS INTELLIGENCE & PERFORMANCE
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl text-[#211C19] mt-0.5">
            Atelier Analytics
          </h1>
        </div>

        <div className="flex items-center gap-3">
          {/* Time Filter */}
          <div className="flex items-center gap-1 p-1 bg-white border border-[#D8C9B5] rounded-xs text-xs font-sans">
            {(['7d', '30d', '90d', '12m'] as const).map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => setTimeRange(r)}
                className={`px-3 py-1 rounded-2xs uppercase tracking-wider cursor-pointer ${
                  timeRange === r
                    ? 'bg-[#211C19] text-[#F5F0E8] font-medium'
                    : 'text-[#8C8175] hover:text-[#211C19]'
                }`}
              >
                {r}
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={handleExportCSV}
            className="btn-luxury-outline text-xs py-2 px-3.5 flex items-center gap-1.5 cursor-pointer bg-white"
          >
            <Download size={13} className="text-[#B69A69]" />
            <span>EXPORT CSV</span>
          </button>
        </div>
      </div>

      {/* KPI 4 Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white/70 backdrop-blur-sm border border-[#D8C9B5]/60 rounded-xs p-5 shadow-2xs">
          <span className="text-[10px] font-sans uppercase tracking-widest text-[#8C8175] block">
            GROSS STOREFRONT REVENUE
          </span>
          <p className="font-serif text-3xl text-[#211C19] tabular-nums mt-1">
            ₹{totalRevenue.toLocaleString('en-IN')}
          </p>
          <span className="text-xs text-[#3b5e39] font-medium mt-1 block">+22.4% vs benchmark</span>
        </div>

        <div className="bg-white/70 backdrop-blur-sm border border-[#D8C9B5]/60 rounded-xs p-5 shadow-2xs">
          <span className="text-[10px] font-sans uppercase tracking-widest text-[#8C8175] block">
            ESTIMATED NET MARGIN
          </span>
          <p className="font-serif text-3xl text-[#B69A69] tabular-nums mt-1">
            ₹{estimatedProfit.toLocaleString('en-IN')}
          </p>
          <span className="text-xs text-[#8C8175] mt-1 block">62% gross formulation margin</span>
        </div>

        <div className="bg-white/70 backdrop-blur-sm border border-[#D8C9B5]/60 rounded-xs p-5 shadow-2xs">
          <span className="text-[10px] font-sans uppercase tracking-widest text-[#8C8175] block">
            AVERAGE ORDER VALUE
          </span>
          <p className="font-serif text-3xl text-[#211C19] tabular-nums mt-1">
            ₹{aov.toLocaleString('en-IN')}
          </p>
          <span className="text-xs text-[#8C8175] mt-1 block">1.3 flacons per acquisition</span>
        </div>

        <div className="bg-white/70 backdrop-blur-sm border border-[#D8C9B5]/60 rounded-xs p-5 shadow-2xs">
          <span className="text-[10px] font-sans uppercase tracking-widest text-[#8C8175] block">
            CONVERSION EFFICIENCY
          </span>
          <p className="font-serif text-3xl text-[#3b5e39] tabular-nums mt-1">
            {conversionRate}%
          </p>
          <span className="text-xs text-[#8C8175] mt-1 block">Luxury benchmark ~2.1%</span>
        </div>
      </div>

      {/* Two Column Section: Fragrance Family Share & Channels */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Fragrance Family Sales Distribution */}
        <div className="bg-white/80 backdrop-blur-sm border border-[#D8C9B5]/70 rounded-xs p-6 shadow-2xs space-y-4">
          <div className="pb-3 border-b border-[#D8C9B5]/40 flex items-center justify-between">
            <h3 className="font-serif text-xl text-[#211C19]">Revenue by Olfactory Family</h3>
            <span className="text-[10px] font-mono text-[#8C8175]">100% VOLUME</span>
          </div>

          <div className="space-y-4 pt-1">
            {familyBreakdown.map((item) => (
              <div key={item.family} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-medium text-[#211C19]">{item.family}</span>
                  <div className="flex items-center gap-2">
                    <span className="tabular-nums font-semibold text-[#211C19]">
                      ₹{item.revenue.toLocaleString('en-IN')}
                    </span>
                    <span className="text-[11px] text-[#8C8175]">({item.percent}%)</span>
                  </div>
                </div>
                <div className="w-full h-2 rounded-full bg-[#F5F0E8] overflow-hidden border border-[#D8C9B5]/40">
                  <div
                    className="h-full bg-gradient-to-r from-[#211C19] to-[#B69A69] rounded-full"
                    style={{ width: `${item.percent}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Client Acquisition Channels */}
        <div className="bg-white/80 backdrop-blur-sm border border-[#D8C9B5]/70 rounded-xs p-6 shadow-2xs space-y-4">
          <div className="pb-3 border-b border-[#D8C9B5]/40 flex items-center justify-between">
            <h3 className="font-serif text-xl text-[#211C19]">Client Acquisition Origins</h3>
            <span className="text-[10px] font-mono text-[#8C8175]">TRAFFIC & ATTRIBUTION</span>
          </div>

          <div className="divide-y divide-[#D8C9B5]/40 text-xs">
            {channels.map((ch, idx) => (
              <div key={idx} className="py-3 flex items-center justify-between">
                <div>
                  <p className="font-medium text-[#211C19]">{ch.channel}</p>
                  <p className="text-[11px] text-[#8C8175]">{ch.orders} confirmed acquisitions</p>
                </div>
                <span className="font-serif text-lg font-semibold text-[#B69A69] tabular-nums">
                  {ch.share}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top 5 Products Table */}
      <div className="bg-white/80 backdrop-blur-sm border border-[#D8C9B5]/70 rounded-xs p-6 shadow-2xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-[#D8C9B5]/40">
          <div>
            <span className="text-[10px] uppercase tracking-widest text-[#8C8175] font-semibold">
              SIGNATURE CREATIONS RANKING
            </span>
            <h3 className="font-serif text-2xl text-[#211C19]">Top Perfumes by Velocity</h3>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-sans border-collapse">
            <thead>
              <tr className="border-b border-[#D8C9B5] text-[#8C8175] text-[10px] tracking-widest uppercase">
                <th className="py-2.5 pr-4">Rank</th>
                <th className="py-2.5 px-4">Fragrance</th>
                <th className="py-2.5 px-4">Family</th>
                <th className="py-2.5 px-4 text-center">Units Sold</th>
                <th className="py-2.5 px-4 text-right">Revenue (₹)</th>
                <th className="py-2.5 pl-4 text-right">Volume Share</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#D8C9B5]/30">
              {topSellingCreations.map((p, idx) => (
                <tr key={p.name} className="hover:bg-[#FAF7F2]/80 transition-colors">
                  <td className="py-3 pr-4 font-mono font-bold text-[#B69A69]">#{idx + 1}</td>
                  <td className="py-3 px-4 font-serif text-sm font-semibold text-[#211C19]">
                    {p.name}
                  </td>
                  <td className="py-3 px-4 text-[#8C8175]">{p.family}</td>
                  <td className="py-3 px-4 text-center font-medium tabular-nums">{p.unitsSold}</td>
                  <td className="py-3 px-4 text-right font-medium tabular-nums text-[#211C19]">
                    ₹{p.revenue.toLocaleString('en-IN')}
                  </td>
                  <td className="py-3 pl-4 text-right font-medium text-[#3b5e39] tabular-nums">
                    {p.share}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
