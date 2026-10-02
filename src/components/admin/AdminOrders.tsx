import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { Order, OrderStatus } from '../../types';
import { PerfumeBottleVisual } from '../PerfumeBottleVisual';
import {
  Search,
  Filter,
  Eye,
  Printer,
  Truck,
  CheckCircle2,
  Clock,
  AlertCircle,
  X,
  Package,
  FileText,
  Save,
  ArrowRight,
} from 'lucide-react';

interface AdminOrdersProps {
  initialSelectedOrderId?: string | null;
  onClearInitialSelected?: () => void;
}

export const AdminOrders: React.FC<AdminOrdersProps> = ({
  initialSelectedOrderId,
  onClearInitialSelected,
}) => {
  const { orders, updateOrderStatus, updateOrderTracking } = useStore();

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(() => {
    if (initialSelectedOrderId) {
      return orders.find((o) => o.orderId === initialSelectedOrderId) || null;
    }
    return null;
  });

  const [isInvoiceModalOpen, setIsInvoiceModalOpen] = useState(false);

  // Tracking edit states for detail drawer
  const [editingCourier, setEditingCourier] = useState('');
  const [editingTrackingNumber, setEditingTrackingNumber] = useState('');
  const [editingDeliveryDate, setEditingDeliveryDate] = useState('');
  const [trackingSavedToast, setTrackingSavedToast] = useState(false);

  // Sync selected order tracking fields when selectedOrder changes
  React.useEffect(() => {
    if (selectedOrder) {
      setEditingCourier(selectedOrder.courier || 'BlueDart Air Express');
      setEditingTrackingNumber(selectedOrder.trackingNumber || '');
      setEditingDeliveryDate(selectedOrder.estimatedDelivery || '');
    }
  }, [selectedOrder]);

  const allStatuses: (OrderStatus | 'All')[] = [
    'All',
    'Pending',
    'Confirmed',
    'Processing',
    'Packed',
    'Shipped',
    'Delivered',
    'Cancelled',
  ];

  const filteredOrders = orders.filter((order) => {
    const matchesStatus =
      statusFilter === 'All' ? true : order.orderStatus === statusFilter;
    const query = searchQuery.trim().toLowerCase();
    const matchesQuery =
      !query ||
      order.orderId.toLowerCase().includes(query) ||
      `${order.shippingAddress.firstName} ${order.shippingAddress.lastName}`
        .toLowerCase()
        .includes(query) ||
      order.shippingAddress.email.toLowerCase().includes(query) ||
      (order.trackingNumber && order.trackingNumber.toLowerCase().includes(query));
    return matchesStatus && matchesQuery;
  });

  const getStatusBadge = (status: OrderStatus) => {
    switch (status) {
      case 'Delivered':
        return 'bg-[#3b5e39]/10 text-[#3b5e39] border-[#3b5e39]/30';
      case 'Shipped':
      case 'Out for Delivery':
        return 'bg-[#2b5876]/10 text-[#2b5876] border-[#2b5876]/30';
      case 'Processing':
      case 'Packed':
      case 'Confirmed':
        return 'bg-[#B69A69]/20 text-[#8c6b3e] border-[#B69A69]/40';
      case 'Pending':
        return 'bg-amber-500/10 text-amber-700 border-amber-500/30';
      case 'Cancelled':
      case 'Refunded':
        return 'bg-[#942b41]/10 text-[#942b41] border-[#942b41]/30';
      default:
        return 'bg-stone-100 text-stone-700 border-stone-200';
    }
  };

  const handleSaveTracking = () => {
    if (!selectedOrder) return;
    updateOrderTracking(
      selectedOrder.orderId,
      editingCourier,
      editingTrackingNumber,
      editingDeliveryDate
    );
    setSelectedOrder((prev) =>
      prev
        ? {
            ...prev,
            courier: editingCourier,
            trackingNumber: editingTrackingNumber,
            estimatedDelivery: editingDeliveryDate,
          }
        : null
    );
    setTrackingSavedToast(true);
    setTimeout(() => setTrackingSavedToast(false), 2500);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#D8C9B5]/40">
        <div>
          <span className="text-[10px] font-sans tracking-[0.22em] uppercase text-[#8C8175] font-semibold">
            DISPATCH & FULFILLMENT
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl text-[#211C19] mt-0.5">
            Orders ({orders.length})
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => {
              if (selectedOrder) {
                setIsInvoiceModalOpen(true);
              } else if (filteredOrders.length > 0) {
                setSelectedOrder(filteredOrders[0]);
                setIsInvoiceModalOpen(true);
              }
            }}
            className="px-4 py-2.5 rounded-xs border border-[#D8C9B5] bg-white text-[#211C19] text-xs font-sans hover:border-[#211C19] transition-colors flex items-center gap-1.5 cursor-pointer shadow-2xs"
          >
            <Printer size={14} className="text-[#B69A69]" />
            <span>PRINT INVOICE</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white/80 backdrop-blur-sm border border-[#D8C9B5]/70 rounded-xs p-4 shadow-2xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search
            size={14}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8C8175]"
          />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search Order ID, client, email, or tracking..."
            className="w-full pl-9 pr-4 py-2 text-xs bg-[#FAF7F2] border border-[#D8C9B5] text-[#211C19] rounded-xs focus:border-[#211C19] focus:outline-hidden"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8C8175] hover:text-[#211C19]"
            >
              <X size={12} />
            </button>
          )}
        </div>

        {/* Status Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 text-xs">
          {allStatuses.map((st) => (
            <button
              key={st}
              type="button"
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-2xs text-[11px] font-sans tracking-wide transition-colors whitespace-nowrap cursor-pointer ${
                statusFilter === st
                  ? 'bg-[#211C19] text-[#F5F0E8] font-medium shadow-xs'
                  : 'bg-white border border-[#D8C9B5] text-[#8C8175] hover:text-[#211C19]'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white/80 backdrop-blur-sm border border-[#D8C9B5]/70 rounded-xs shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-sans border-collapse">
            <thead>
              <tr className="bg-[#FAF7F2] border-b border-[#D8C9B5] text-[#8C8175] text-[10px] tracking-widest uppercase">
                <th className="py-3 px-4 font-semibold">Order</th>
                <th className="py-3 px-4 font-semibold">Date</th>
                <th className="py-3 px-4 font-semibold">Client</th>
                <th className="py-3 px-4 font-semibold">Flacons</th>
                <th className="py-3 px-4 font-semibold text-right">Total</th>
                <th className="py-3 px-4 font-semibold">Payment</th>
                <th className="py-3 px-4 font-semibold">Fulfillment</th>
                <th className="py-3 px-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#D8C9B5]/30">
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-[#8C8175]">
                    No orders found matching the filter criteria.
                  </td>
                </tr>
              ) : (
                filteredOrders.map((ord) => (
                  <tr
                    key={ord.orderId}
                    onClick={() => setSelectedOrder(ord)}
                    className="hover:bg-[#FAF7F2]/80 transition-colors cursor-pointer"
                  >
                    <td className="py-3.5 px-4 font-mono font-semibold text-[#211C19]">
                      {ord.orderId}
                    </td>
                    <td className="py-3.5 px-4 text-[#8C8175] whitespace-nowrap">
                      {ord.createdAt}
                    </td>
                    <td className="py-3.5 px-4">
                      <p className="font-medium text-[#211C19]">
                        {ord.shippingAddress.firstName} {ord.shippingAddress.lastName}
                      </p>
                      <p className="text-[11px] text-[#8C8175]">{ord.shippingAddress.email}</p>
                    </td>
                    <td className="py-3.5 px-4 text-[#211C19]">
                      <span className="font-medium">{ord.items.length}</span>{' '}
                      <span className="text-[#8C8175]">
                        ({ord.items.map((i) => i.product.name.split(' ')[0]).join(', ')})
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right font-medium text-[#211C19] tabular-nums">
                      ₹{ord.total.toLocaleString('en-IN')}
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-1.5">
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            ord.paymentStatus === 'Paid'
                              ? 'bg-[#3b5e39]'
                              : ord.paymentStatus === 'COD Confirmed'
                              ? 'bg-amber-600'
                              : 'bg-red-500'
                          }`}
                        />
                        <span className="text-[11px] text-[#312A26] font-medium">
                          {ord.paymentStatus}
                        </span>
                      </div>
                      <span className="text-[10px] text-[#8C8175] uppercase tracking-wider block">
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
                    <td className="py-3.5 px-4 text-right">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedOrder(ord);
                        }}
                        className="text-xs text-[#211C19] hover:text-[#B69A69] underline cursor-pointer"
                      >
                        Inspect
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* =================================================================== */}
      {/* ORDER INSPECTION DRAWER / MODAL */}
      {/* =================================================================== */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 bg-[#211C19]/60 backdrop-blur-xs flex justify-end animate-in fade-in duration-200">
          <div className="w-full max-w-2xl bg-[#FAF7F2] h-full shadow-2xl overflow-y-auto flex flex-col justify-between border-l border-[#D8C9B5]">
            {/* Drawer Top */}
            <div className="p-6 bg-white border-b border-[#D8C9B5] flex items-center justify-between sticky top-0 z-10">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-base text-[#211C19]">
                    {selectedOrder.orderId}
                  </span>
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[10px] font-medium border uppercase tracking-wider ${getStatusBadge(
                      selectedOrder.orderStatus
                    )}`}
                  >
                    {selectedOrder.orderStatus}
                  </span>
                </div>
                <p className="text-xs text-[#8C8175] mt-0.5">
                  Placed on {selectedOrder.createdAt} · {selectedOrder.items.length} items
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsInvoiceModalOpen(true)}
                  className="p-2 border border-[#D8C9B5] rounded-xs text-[#8C8175] hover:text-[#211C19] hover:border-[#211C19] transition-colors"
                  title="Print Invoice"
                >
                  <Printer size={16} />
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedOrder(null);
                    onClearInitialSelected?.();
                  }}
                  className="p-2 text-[#8C8175] hover:text-[#211C19]"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Drawer Body */}
            <div className="p-6 space-y-6 flex-1">
              {/* Status Update Quick Stepper */}
              <div className="p-4 bg-white border border-[#D8C9B5] rounded-xs">
                <label className="text-[10px] font-sans uppercase tracking-widest text-[#8C8175] font-semibold block mb-2">
                  Update Fulfillment Status
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {(
                    ['Pending', 'Confirmed', 'Processing', 'Packed', 'Shipped', 'Delivered', 'Cancelled'] as OrderStatus[]
                  ).map((st) => (
                    <button
                      key={st}
                      type="button"
                      onClick={() => {
                        updateOrderStatus(selectedOrder.orderId, st);
                        setSelectedOrder((prev) => (prev ? { ...prev, orderStatus: st } : null));
                      }}
                      className={`px-2.5 py-1.5 text-xs rounded-2xs border transition-colors cursor-pointer ${
                        selectedOrder.orderStatus === st
                          ? 'bg-[#211C19] text-[#F5F0E8] border-[#211C19] font-medium'
                          : 'bg-[#FAF7F2] border-[#D8C9B5] text-[#312A26] hover:border-[#211C19]'
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>

              {/* Items List */}
              <div className="p-4 bg-white border border-[#D8C9B5] rounded-xs space-y-4">
                <h3 className="font-serif text-lg text-[#211C19]">Ordered Fragrances</h3>
                <div className="divide-y divide-[#D8C9B5]/40">
                  {selectedOrder.items.map((item, idx) => (
                    <div key={idx} className="py-3 flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-14 bg-[#F5F0E8] border border-[#D8C9B5]/60 rounded-xs flex items-center justify-center overflow-hidden">
                          <PerfumeBottleVisual
                            name={item.product.name}
                            liquidColor={item.product.liquidColor}
                            size="sm"
                          />
                        </div>
                        <div>
                          <p className="font-serif text-sm font-medium text-[#211C19]">
                            {item.product.name}
                          </p>
                          <p className="text-[11px] text-[#8C8175]">
                            Size: {item.size} · Qty: {item.quantity}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-xs font-medium text-[#211C19] tabular-nums">
                          ₹{(item.unitPrice * item.quantity).toLocaleString('en-IN')}
                        </p>
                        <p className="text-[10px] text-[#8C8175]">
                          ₹{item.unitPrice.toLocaleString('en-IN')} each
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Subtotal breakdown */}
                <div className="pt-3 border-t border-[#D8C9B5]/40 text-xs space-y-1.5 font-sans">
                  <div className="flex justify-between text-[#8C8175]">
                    <span>Subtotal</span>
                    <span className="tabular-nums">₹{selectedOrder.subtotal.toLocaleString('en-IN')}</span>
                  </div>
                  {selectedOrder.discount > 0 && (
                    <div className="flex justify-between text-[#3b5e39]">
                      <span>Discount ({selectedOrder.promoCode || 'PROMO'})</span>
                      <span className="tabular-nums">-₹{selectedOrder.discount.toLocaleString('en-IN')}</span>
                    </div>
                  )}
                  {selectedOrder.giftWrap > 0 && (
                    <div className="flex justify-between text-[#8C8175]">
                      <span>Wax-Sealed Gifting</span>
                      <span className="tabular-nums">₹{selectedOrder.giftWrap}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-[#8C8175]">
                    <span>Delivery (Express Insured)</span>
                    <span>{selectedOrder.shipping === 0 ? 'COMPLIMENTARY' : `₹${selectedOrder.shipping}`}</span>
                  </div>
                  <div className="flex justify-between text-[#211C19] font-medium pt-2 border-t border-[#D8C9B5]/60 text-sm">
                    <span>Total Amount</span>
                    <span className="tabular-nums font-bold">₹{selectedOrder.total.toLocaleString('en-IN')}</span>
                  </div>
                </div>
              </div>

              {/* Shipping & Recipient Information */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 bg-white border border-[#D8C9B5] rounded-xs">
                  <h4 className="text-[10px] uppercase font-sans tracking-widest text-[#8C8175] font-semibold mb-2">
                    Client & Contact
                  </h4>
                  <p className="text-xs font-semibold text-[#211C19]">
                    {selectedOrder.shippingAddress.firstName} {selectedOrder.shippingAddress.lastName}
                  </p>
                  <p className="text-xs text-[#8C8175] mt-1">{selectedOrder.shippingAddress.email}</p>
                  <p className="text-xs text-[#8C8175]">{selectedOrder.shippingAddress.phone}</p>
                </div>

                <div className="p-4 bg-white border border-[#D8C9B5] rounded-xs">
                  <h4 className="text-[10px] uppercase font-sans tracking-widest text-[#8C8175] font-semibold mb-2">
                    Delivery Address
                  </h4>
                  <p className="text-xs text-[#211C19] leading-relaxed">
                    {selectedOrder.shippingAddress.address}
                    {selectedOrder.shippingAddress.apartment && `, ${selectedOrder.shippingAddress.apartment}`}
                    <br />
                    {selectedOrder.shippingAddress.city}, {selectedOrder.shippingAddress.state} —{' '}
                    {selectedOrder.shippingAddress.pinCode}
                  </p>
                </div>
              </div>

              {/* Dispatch Logistics & Tracking Edit */}
              <div className="p-4 bg-white border border-[#D8C9B5] rounded-xs space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Truck size={16} className="text-[#B69A69]" />
                    <h4 className="font-serif text-base text-[#211C19]">Dispatch & Tracking</h4>
                  </div>
                  {trackingSavedToast && (
                    <span className="text-[11px] text-[#3b5e39] font-medium animate-in fade-in">
                      ✓ Tracking Saved
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="text-[10px] uppercase tracking-wider text-[#8C8175] block mb-1">
                      Carrier
                    </label>
                    <input
                      type="text"
                      value={editingCourier}
                      onChange={(e) => setEditingCourier(e.target.value)}
                      placeholder="e.g. BlueDart Air"
                      className="w-full px-2.5 py-1.5 text-xs bg-[#FAF7F2] border border-[#D8C9B5] rounded-xs focus:border-[#211C19] focus:outline-hidden"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] uppercase tracking-wider text-[#8C8175] block mb-1">
                      Tracking Waybill
                    </label>
                    <input
                      type="text"
                      value={editingTrackingNumber}
                      onChange={(e) => setEditingTrackingNumber(e.target.value)}
                      placeholder="e.g. EXP-IN-88931"
                      className="w-full px-2.5 py-1.5 text-xs bg-[#FAF7F2] border border-[#D8C9B5] rounded-xs focus:border-[#211C19] focus:outline-hidden font-mono"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] uppercase tracking-wider text-[#8C8175] block mb-1">
                      Est. Delivery
                    </label>
                    <input
                      type="text"
                      value={editingDeliveryDate}
                      onChange={(e) => setEditingDeliveryDate(e.target.value)}
                      placeholder="e.g. Friday, 3 Oct"
                      className="w-full px-2.5 py-1.5 text-xs bg-[#FAF7F2] border border-[#D8C9B5] rounded-xs focus:border-[#211C19] focus:outline-hidden"
                    />
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleSaveTracking}
                  className="btn-luxury-primary text-xs py-2 px-4 cursor-pointer flex items-center gap-1.5"
                >
                  <Save size={13} />
                  <span>SAVE DISPATCH DETAILS</span>
                </button>
              </div>
            </div>

            {/* Drawer Bottom Close */}
            <div className="p-4 bg-white border-t border-[#D8C9B5] flex items-center justify-between">
              <span className="text-[11px] text-[#8C8175]">
                Internal Order ID: {selectedOrder.orderId}
              </span>
              <button
                type="button"
                onClick={() => {
                  setSelectedOrder(null);
                  onClearInitialSelected?.();
                }}
                className="btn-luxury-outline text-xs py-2 px-5 cursor-pointer"
              >
                Close Drawer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =================================================================== */}
      {/* LUXURY PACKING SLIP / INVOICE MODAL */}
      {/* =================================================================== */}
      {isInvoiceModalOpen && selectedOrder && (
        <div className="fixed inset-0 z-50 bg-[#211C19]/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white max-w-2xl w-full p-8 rounded-xs shadow-2xl border border-[#D8C9B5] text-[#211C19] font-sans relative">
            <button
              type="button"
              onClick={() => setIsInvoiceModalOpen(false)}
              className="absolute top-4 right-4 p-2 text-[#8C8175] hover:text-[#211C19]"
            >
              <X size={18} />
            </button>

            {/* Print Header */}
            <div className="border-b border-[#D8C9B5] pb-6 flex items-start justify-between">
              <div>
                <span className="font-serif text-2xl tracking-[0.2em] font-semibold">
                  MAISON KIYORA
                </span>
                <p className="text-[10px] tracking-widest text-[#B69A69] uppercase font-mono mt-0.5">
                  HAUTE PARFUMERIE · ATELIER PARIS & GRASSE
                </p>
                <p className="text-xs text-[#8C8175] mt-2">
                  GSTIN: 27AABCM9124K1Z5 · concierge@maisonkiyora.com
                </p>
              </div>
              <div className="text-right">
                <span className="text-[10px] uppercase font-mono text-[#8C8175] tracking-widest block">
                  COMMERCIAL INVOICE
                </span>
                <p className="font-mono text-base font-bold">{selectedOrder.orderId}</p>
                <p className="text-xs text-[#8C8175]">{selectedOrder.createdAt}</p>
              </div>
            </div>

            {/* Bill to */}
            <div className="py-4 border-b border-[#D8C9B5] grid grid-cols-2 gap-4 text-xs">
              <div>
                <span className="text-[10px] uppercase tracking-wider text-[#8C8175] block font-semibold mb-1">
                  BILLED & SHIPPED TO:
                </span>
                <p className="font-medium text-[#211C19]">
                  {selectedOrder.shippingAddress.firstName} {selectedOrder.shippingAddress.lastName}
                </p>
                <p className="text-[#8C8175] leading-relaxed">
                  {selectedOrder.shippingAddress.address}
                  <br />
                  {selectedOrder.shippingAddress.city}, {selectedOrder.shippingAddress.state} —{' '}
                  {selectedOrder.shippingAddress.pinCode}
                </p>
                <p className="text-[#8C8175] mt-1">Ph: {selectedOrder.shippingAddress.phone}</p>
              </div>
              <div className="text-right">
                <span className="text-[10px] uppercase tracking-wider text-[#8C8175] block font-semibold mb-1">
                  DISPATCH LOGISTICS:
                </span>
                <p className="font-medium text-[#211C19]">{selectedOrder.courier || 'BlueDart Air'}</p>
                <p className="font-mono text-[#8C8175]">AWB: {selectedOrder.trackingNumber || 'PENDING'}</p>
                <p className="text-[#8C8175] mt-1">Payment: {selectedOrder.paymentMethod.toUpperCase()} ({selectedOrder.paymentStatus})</p>
              </div>
            </div>

            {/* Line items table */}
            <div className="py-4">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-[#D8C9B5] text-[10px] uppercase tracking-wider text-[#8C8175]">
                    <th className="py-2 text-left">Fragrance Creation</th>
                    <th className="py-2 text-center">Size</th>
                    <th className="py-2 text-center">Qty</th>
                    <th className="py-2 text-right">Price</th>
                    <th className="py-2 text-right">Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#D8C9B5]/30">
                  {selectedOrder.items.map((i, index) => (
                    <tr key={index}>
                      <td className="py-2.5 font-medium">{i.product.name}</td>
                      <td className="py-2.5 text-center text-[#8C8175]">{i.size}</td>
                      <td className="py-2.5 text-center text-[#8C8175]">{i.quantity}</td>
                      <td className="py-2.5 text-right tabular-nums">₹{i.unitPrice.toLocaleString('en-IN')}</td>
                      <td className="py-2.5 text-right font-medium tabular-nums">
                        ₹{(i.unitPrice * i.quantity).toLocaleString('en-IN')}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Total Summary */}
              <div className="mt-4 pt-3 border-t border-[#D8C9B5] text-xs space-y-1 w-64 ml-auto text-right">
                <div className="flex justify-between text-[#8C8175]">
                  <span>Subtotal:</span>
                  <span>₹{selectedOrder.subtotal.toLocaleString('en-IN')}</span>
                </div>
                {selectedOrder.discount > 0 && (
                  <div className="flex justify-between text-[#3b5e39]">
                    <span>Discount:</span>
                    <span>-₹{selectedOrder.discount.toLocaleString('en-IN')}</span>
                  </div>
                )}
                <div className="flex justify-between text-[#8C8175]">
                  <span>Shipping:</span>
                  <span>{selectedOrder.shipping === 0 ? 'Complimentary' : `₹${selectedOrder.shipping}`}</span>
                </div>
                <div className="flex justify-between font-bold text-sm text-[#211C19] pt-2 border-t border-[#D8C9B5]">
                  <span>Grand Total:</span>
                  <span>₹{selectedOrder.total.toLocaleString('en-IN')}</span>
                </div>
              </div>
            </div>

            {/* Print Buttons */}
            <div className="pt-6 border-t border-[#D8C9B5] flex justify-end gap-3 print:hidden">
              <button
                type="button"
                onClick={() => window.print()}
                className="btn-luxury-primary text-xs py-2 px-5 cursor-pointer flex items-center gap-1.5"
              >
                <Printer size={14} />
                <span>PRINT DOCUMENT</span>
              </button>
              <button
                type="button"
                onClick={() => setIsInvoiceModalOpen(false)}
                className="btn-luxury-outline text-xs py-2 px-4 cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
