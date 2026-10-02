import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import {
  TrendingUp,
  ShoppingBag,
  Users,
  Package,
  AlertTriangle,
  Clock,
  Star,
  Plus,
  ArrowRight,
  ExternalLink,
  DollarSign,
} from 'lucide-react';

interface AdminDashboardProps {
  onNavigateTab: (tab: string) => void;
  onSelectOrder: (orderId: string) => void;
  onOpenProductEditor: (productId?: string) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  onNavigateTab,
  onSelectOrder,
  onOpenProductEditor,
}) => {
  const { products, orders, customers, coupons } = useStore();
  const [chartRange, setChartRange] = useState<'7d' | '30d' | '90d' | '12m'>('30d');

  // Aggregated KPIs
  const totalSales = orders.reduce((sum, o) => sum + (o.paymentStatus === 'Paid' ? o.total : 0), 0) + 248500;
  const todaySales = 15887;
  const pendingOrders = orders.filter((o) => o.orderStatus === 'Pending' || o.orderStatus === 'Processing');
  const lowStockProducts = products.filter((p) => p.stock <= (p.lowStockThreshold ?? 10));
  const totalReviewsCount = products.reduce((acc, p) => acc + p.reviews.length, 0);

  // Sales Chart Data
  const chartDataMap = {
    '7d': [
      { label: 'Mon', value: 34000 },
      { label: 'Tue', value: 42000 },
      { label: 'Wed', value: 38000 },
      { label: 'Thu', value: 54000 },
      { label: 'Fri', value: 68000 },
      { label: 'Sat', value: 89000 },
      { label: 'Sun', value: 72000 },
    ],
    '30d': [
      { label: 'Week 1', value: 185000 },
      { label: 'Week 2', value: 215000 },
      { label: 'Week 3', value: 248500 },
      { label: 'Week 4', value: 290000 },
    ],
    '90d': [
      { label: 'Jul', value: 680000 },
      { label: 'Aug', value: 740000 },
      { label: 'Sep', value: 890000 },
    ],
    '12m': [
      { label: 'Q1', value: 1450000 },
      { label: 'Q2', value: 1890000 },
      { label: 'Q3', value: 2340000 },
      { label: 'Q4 (Est)', value: 3100000 },
    ],
  };

  const activeChartData = chartDataMap[chartRange];
  const maxChartValue = Math.max(...activeChartData.map((d) => d.value));

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Delivered':
        return 'bg-[#3b5e39]/10 text-[#3b5e39] border-[#3b5e39]/20';
      case 'Shipped':
        return 'bg-[#2b5876]/10 text-[#2b5876] border-[#2b5876]/20';
      case 'Processing':
      case 'Confirmed':
        return 'bg-[#B69A69]/15 text-[#8c6b3e] border-[#B69A69]/30';
      case 'Pending':
        return 'bg-amber-500/10 text-amber-700 border-amber-500/20';
      case 'Cancelled':
      case 'Refunded':
        return 'bg-[#942b41]/10 text-[#942b41] border-[#942b41]/20';
      default:
        return 'bg-slate-100 text-slate-700';
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Top Header & Quick Actions Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#D8C9B5]/40">
        <div>
          <span className="text-[10px] font-sans tracking-[0.24em] uppercase text-[#8C8175] font-semibold">
            ATELIER OPERATIONS CONSOLE
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl text-[#211C19] mt-0.5">
            OVERVIEW
          </h1>
        </div>

        {/* 8. QUICK ACTIONS */}
        <div className="flex flex-wrap items-center gap-2.5">
          <button
            type="button"
            onClick={() => onOpenProductEditor()}
            className="btn-luxury-primary text-xs py-2.5 px-4 cursor-pointer flex items-center gap-1.5"
          >
            <Plus size={14} />
            <span>ADD PRODUCT</span>
          </button>
          <button
            type="button"
            onClick={() => onNavigateTab('orders')}
            className="btn-luxury-outline text-xs py-2.5 px-4 cursor-pointer"
          >
            VIEW ORDERS
          </button>
          <button
            type="button"
            onClick={() => onNavigateTab('coupons')}
            className="px-3.5 py-2.5 rounded-xs border border-[#D8C9B5] bg-white text-[#211C19] text-xs font-sans hover:border-[#211C19] transition-colors cursor-pointer"
          >
            ADD COUPON
          </button>
          <button
            type="button"
            onClick={() => onNavigateTab('inventory')}
            className="px-3.5 py-2.5 rounded-xs border border-[#D8C9B5] bg-white text-[#211C19] text-xs font-sans hover:border-[#211C19] transition-colors cursor-pointer"
          >
            UPDATE INVENTORY
          </button>
        </div>
      </div>

      {/* 5. TOP KPI CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {/* TOTAL SALES */}
        <div className="bg-white/70 backdrop-blur-sm border border-[#D8C9B5]/60 rounded-xs p-5 shadow-2xs">
          <div className="flex items-center justify-between text-[#8C8175] text-[11px] font-sans uppercase tracking-wider mb-2">
            <span>TOTAL SALES</span>
            <TrendingUp size={16} className="text-[#3b5e39]" />
          </div>
          <p className="font-sans font-medium text-2xl text-[#211C19] tabular-nums">
            ₹{totalSales.toLocaleString('en-IN')}
          </p>
          <div className="flex items-center gap-1.5 mt-2 text-xs">
            <span className="text-[#3b5e39] font-medium">+18.4%</span>
            <span className="text-[#8C8175]">vs previous month</span>
          </div>
        </div>

        {/* TOTAL ORDERS */}
        <div className="bg-white/70 backdrop-blur-sm border border-[#D8C9B5]/60 rounded-xs p-5 shadow-2xs">
          <div className="flex items-center justify-between text-[#8C8175] text-[11px] font-sans uppercase tracking-wider mb-2">
            <span>TOTAL ORDERS</span>
            <ShoppingBag size={16} className="text-[#B69A69]" />
          </div>
          <p className="font-sans font-medium text-2xl text-[#211C19] tabular-nums">
            {orders.length + 118}
          </p>
          <div className="flex items-center gap-1.5 mt-2 text-xs">
            <span className="text-[#3b5e39] font-medium">+12.2%</span>
            <span className="text-[#8C8175]">Dispatch velocity</span>
          </div>
        </div>

        {/* CUSTOMERS */}
        <div className="bg-white/70 backdrop-blur-sm border border-[#D8C9B5]/60 rounded-xs p-5 shadow-2xs">
          <div className="flex items-center justify-between text-[#8C8175] text-[11px] font-sans uppercase tracking-wider mb-2">
            <span>CUSTOMERS</span>
            <Users size={16} className="text-[#2b5876]" />
          </div>
          <p className="font-sans font-medium text-2xl text-[#211C19] tabular-nums">
            {customers.length + 84}
          </p>
          <div className="flex items-center gap-1.5 mt-2 text-xs">
            <span className="text-[#3b5e39] font-medium">94.2%</span>
            <span className="text-[#8C8175]">Connoisseur retention</span>
          </div>
        </div>

        {/* PRODUCTS */}
        <div className="bg-white/70 backdrop-blur-sm border border-[#D8C9B5]/60 rounded-xs p-5 shadow-2xs">
          <div className="flex items-center justify-between text-[#8C8175] text-[11px] font-sans uppercase tracking-wider mb-2">
            <span>ACTIVE CREATIONS</span>
            <Package size={16} className="text-[#8c6b3e]" />
          </div>
          <p className="font-sans font-medium text-2xl text-[#211C19] tabular-nums">
            {products.length}
          </p>
          <div className="flex items-center gap-1.5 mt-2 text-xs">
            <span className="text-[#B69A69] font-medium">8 Flacons</span>
            <span className="text-[#8C8175]">in production</span>
          </div>
        </div>
      </div>

      {/* SECONDARY OPERATIONAL METRIC ROW */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* TODAY'S SALES */}
        <div className="p-4 bg-white/50 border border-[#D8C9B5]/50 rounded-xs">
          <span className="text-[10px] uppercase font-sans tracking-widest text-[#8C8175] block">
            TODAY'S REVENUE
          </span>
          <p className="font-sans font-semibold text-lg text-[#211C19] tabular-nums mt-0.5">
            ₹{todaySales.toLocaleString('en-IN')}
          </p>
          <span className="text-[11px] text-[#8C8175]">4 dispatches queued</span>
        </div>

        {/* PENDING ORDERS */}
        <div
          onClick={() => onNavigateTab('orders')}
          className="p-4 bg-white/50 border border-[#D8C9B5]/50 rounded-xs cursor-pointer hover:border-[#211C19] transition-colors"
        >
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase font-sans tracking-widest text-[#8C8175] block">
              PENDING ORDERS
            </span>
            <Clock size={13} className="text-amber-600" />
          </div>
          <p className="font-sans font-semibold text-lg text-[#211C19] tabular-nums mt-0.5">
            {pendingOrders.length}
          </p>
          <span className="text-[11px] text-amber-700 underline">Requires fulfillment</span>
        </div>

        {/* LOW STOCK ALERT */}
        <div
          onClick={() => onNavigateTab('inventory')}
          className="p-4 bg-white/50 border border-[#D8C9B5]/50 rounded-xs cursor-pointer hover:border-[#942b41] transition-colors"
        >
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase font-sans tracking-widest text-[#8C8175] block">
              LOW STOCK ALERTS
            </span>
            <AlertTriangle size={13} className="text-[#942b41]" />
          </div>
          <p className="font-sans font-semibold text-lg text-[#942b41] tabular-nums mt-0.5">
            {lowStockProducts.length}
          </p>
          <span className="text-[11px] text-[#942b41] underline">Action needed</span>
        </div>

        {/* REVIEWS */}
        <div
          onClick={() => onNavigateTab('reviews')}
          className="p-4 bg-white/50 border border-[#D8C9B5]/50 rounded-xs cursor-pointer hover:border-[#211C19] transition-colors"
        >
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase font-sans tracking-widest text-[#8C8175] block">
              TOTAL REVIEWS
            </span>
            <Star size={13} className="text-[#B69A69]" fill="currentColor" strokeWidth={0} />
          </div>
          <p className="font-sans font-semibold text-lg text-[#211C19] tabular-nums mt-0.5">
            {totalReviewsCount}
          </p>
          <span className="text-[11px] text-[#8C8175]">Avg rating: 4.9 / 5.0</span>
        </div>
      </div>

      {/* 6. SALES ANALYTICS CHART & EFFICIENCY METRICS */}
      <div className="bg-white/70 backdrop-blur-sm border border-[#D8C9B5]/60 rounded-xs p-6 sm:p-8 shadow-2xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#D8C9B5]/40">
          <div>
            <span className="text-[10px] font-sans tracking-widest uppercase text-[#8C8175] font-semibold">
              REVENUE OVER TIME
            </span>
            <h2 className="font-serif text-2xl text-[#211C19]">Sales Analytics</h2>
          </div>

          {/* Time range filter buttons */}
          <div className="flex items-center gap-1.5 p-1 bg-[#F5F0E8] border border-[#D8C9B5] rounded-xs text-xs font-sans">
            {(['7d', '30d', '90d', '12m'] as const).map((range) => (
              <button
                key={range}
                type="button"
                onClick={() => setChartRange(range)}
                className={`px-3 py-1 rounded-2xs uppercase tracking-wider transition-colors cursor-pointer ${
                  chartRange === range
                    ? 'bg-[#211C19] text-[#F5F0E8] font-medium'
                    : 'text-[#8C8175] hover:text-[#211C19]'
                }`}
              >
                {range === '7d' ? '7 Days' : range === '30d' ? '30 Days' : range === '90d' ? '90 Days' : '12 Months'}
              </button>
            ))}
          </div>
        </div>

        {/* Minimal Luxury Bar Chart Visualization */}
        <div className="h-64 flex items-end gap-4 sm:gap-8 pt-8 px-2 border-b border-[#D8C9B5]/50">
          {activeChartData.map((item) => {
            const heightPercent = Math.max(12, (item.value / maxChartValue) * 100);
            return (
              <div key={item.label} className="flex-1 flex flex-col items-center h-full justify-end group">
                <span className="text-[10px] font-sans font-medium text-[#211C19] tabular-nums mb-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  ₹{(item.value / 1000).toFixed(0)}k
                </span>
                <div
                  className="w-full max-w-[54px] rounded-t-xs bg-gradient-to-t from-[#211C19] via-[#312A26] to-[#B69A69] group-hover:brightness-110 transition-all duration-300"
                  style={{ height: `${heightPercent}%` }}
                />
                <span className="text-[10px] font-sans text-[#8C8175] mt-2 whitespace-nowrap">
                  {item.label}
                </span>
              </div>
            );
          })}
        </div>

        {/* Below Chart: Key Performance Indicators */}
        <div className="grid grid-cols-3 gap-6 pt-2 text-center sm:text-left text-xs font-sans">
          <div className="p-3 bg-white/60 rounded-xs border border-[#D8C9B5]/40">
            <span className="text-[10px] uppercase text-[#8C8175] block">AVERAGE ORDER VALUE</span>
            <span className="font-serif text-lg font-medium text-[#211C19] tabular-nums">
              ₹5,420
            </span>
          </div>
          <div className="p-3 bg-white/60 rounded-xs border border-[#D8C9B5]/40">
            <span className="text-[10px] uppercase text-[#8C8175] block">CHECKOUT CONVERSION</span>
            <span className="font-serif text-lg font-medium text-[#3b5e39] tabular-nums">
              3.84%
            </span>
          </div>
          <div className="p-3 bg-white/60 rounded-xs border border-[#D8C9B5]/40">
            <span className="text-[10px] uppercase text-[#8C8175] block">REPEAT PURCHASE RATE</span>
            <span className="font-serif text-lg font-medium text-[#211C19] tabular-nums">
              42.1%
            </span>
          </div>
        </div>
      </div>

      {/* 7. RECENT ORDERS TABLE */}
      <div className="bg-white/70 backdrop-blur-sm border border-[#D8C9B5]/60 rounded-xs p-6 sm:p-8 shadow-2xs space-y-5">
        <div className="flex items-center justify-between pb-4 border-b border-[#D8C9B5]/40">
          <div>
            <span className="text-[10px] font-sans tracking-widest uppercase text-[#8C8175] font-semibold">
              LIVE DISPATCHES
            </span>
            <h2 className="font-serif text-2xl text-[#211C19]">Recent Orders</h2>
          </div>

          <button
            type="button"
            onClick={() => onNavigateTab('orders')}
            className="text-xs font-sans tracking-[0.16em] uppercase text-[#211C19] hover:text-[#B69A69] transition-colors flex items-center gap-1 font-medium cursor-pointer"
          >
            <span>VIEW ALL</span>
            <span>→</span>
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-sans border-collapse">
            <thead>
              <tr className="border-b border-[#D8C9B5] text-[#8C8175] text-[10px] tracking-widest uppercase">
                <th className="py-2.5 pr-4 font-semibold">Order ID</th>
                <th className="py-2.5 px-4 font-semibold">Customer</th>
                <th className="py-2.5 px-4 font-semibold">Items</th>
                <th className="py-2.5 px-4 font-semibold text-right">Amount</th>
                <th className="py-2.5 px-4 font-semibold">Payment</th>
                <th className="py-2.5 px-4 font-semibold">Status</th>
                <th className="py-2.5 px-4 font-semibold">Date</th>
                <th className="py-2.5 pl-4 font-semibold text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#D8C9B5]/30">
              {orders.slice(0, 5).map((ord) => (
                <tr
                  key={ord.orderId}
                  className="hover:bg-white/80 transition-colors cursor-pointer group"
                  onClick={() => onSelectOrder(ord.orderId)}
                >
                  <td className="py-3.5 pr-4 font-mono font-medium text-[#211C19]">
                    {ord.orderId}
                  </td>
                  <td className="py-3.5 px-4">
                    <p className="font-medium text-[#211C19]">
                      {ord.shippingAddress.firstName} {ord.shippingAddress.lastName}
                    </p>
                    <p className="text-[11px] text-[#8C8175]">{ord.shippingAddress.city}</p>
                  </td>
                  <td className="py-3.5 px-4 text-[#8C8175]">
                    {ord.items.length} {ord.items.length === 1 ? 'flacon' : 'flacons'}
                  </td>
                  <td className="py-3.5 px-4 text-right font-medium text-[#211C19] tabular-nums">
                    ₹{ord.total.toLocaleString('en-IN')}
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="uppercase text-[10px] tracking-wider text-[#8C8175]">
                      {ord.paymentMethod}
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    <span
                      className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-medium border uppercase tracking-wider ${getStatusBadge(
                        ord.orderStatus
                      )}`}
                    >
                      {ord.orderStatus}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-[#8C8175] whitespace-nowrap">
                    {ord.createdAt}
                  </td>
                  <td className="py-3.5 pl-4 text-right">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectOrder(ord.orderId);
                      }}
                      className="text-xs text-[#211C19] hover:text-[#B69A69] underline cursor-pointer"
                    >
                      Inspect
                    </button>
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
