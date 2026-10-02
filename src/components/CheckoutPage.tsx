import React, { useState } from 'react';
import { CartItem, ShippingAddress, PaymentMethod, Order } from '../types';
import { PerfumeBottleVisual } from './PerfumeBottleVisual';
import { ShieldCheck, Lock, ChevronDown, Check, ArrowLeft } from 'lucide-react';

interface CheckoutPageProps {
  items: CartItem[];
  appliedPromo?: string | null;
  onOrderPlaced: (order: Order) => void;
  onReturnToCart: () => void;
  onNavigateHome: () => void;
}

export const CheckoutPage: React.FC<CheckoutPageProps> = ({
  items,
  appliedPromo,
  onOrderPlaced,
  onReturnToCart,
  onNavigateHome,
}) => {
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);

  // Form Fields
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');

  const [address, setAddress] = useState('');
  const [apartment, setApartment] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('Maharashtra');
  const [pinCode, setPinCode] = useState('');
  const [saveAddress, setSaveAddress] = useState(true);

  // Payment
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('upi');
  const [upiId, setUpiId] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [selectedBank, setSelectedBank] = useState('HDFC Bank');

  // Mobile order summary accordion
  const [mobileSummaryOpen, setMobileSummaryOpen] = useState(false);

  // Cost calculations
  const subtotal = items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
  const discountAmount = appliedPromo === 'KIYORA10' ? Math.round(subtotal * 0.1) : 0;
  const shippingCost = subtotal >= 6000 ? 0 : 250;
  const total = Math.max(0, subtotal - discountAmount + shippingCost);

  // Handlers for step progression
  const handleProceedToShipping = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && firstName && phone) {
      setCurrentStep(2);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleProceedToPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (address && city && pinCode) {
      setCurrentStep(3);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleFinalPlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();

    const orderNumber = `MK-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const today = new Date();
    const estDelivery = new Date(today);
    estDelivery.setDate(today.getDate() + 3);

    const newOrder: Order = {
      orderId: orderNumber,
      items,
      shippingAddress: {
        firstName,
        lastName,
        email,
        phone,
        address,
        apartment,
        city,
        state,
        pinCode,
      },
      paymentMethod,
      paymentStatus: paymentMethod === 'cod' ? 'COD Confirmed' : 'Paid',
      orderStatus: 'Confirmed',
      subtotal,
      discount: discountAmount,
      shipping: shippingCost,
      giftWrap: 0,
      total,
      promoCode: appliedPromo || undefined,
      createdAt: today.toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      }),
      estimatedDelivery: estDelivery.toLocaleDateString('en-IN', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      }),
      trackingNumber: `EXP-IN-${Math.floor(10000000 + Math.random() * 90000000)}`,
      courier: 'BlueDart Air Express',
    };

    onOrderPlaced(newOrder);
  };

  return (
    <div className="min-h-screen bg-[#F5F0E8] text-[#211C19] font-sans pb-24">
      {/* 26. STREAMLINED CHECKOUT HEADER */}
      <header className="border-b border-[#D8C9B5]/50 bg-[#F5F0E8]/90 backdrop-blur-md py-5 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <button
            type="button"
            onClick={onNavigateHome}
            className="text-lg sm:text-xl font-serif font-semibold tracking-[0.2em] text-[#211C19] hover:text-[#B69A69] cursor-pointer"
          >
            MAISON KIYORA
          </button>

          <div className="flex items-center gap-1.5 text-xs font-sans text-[#8C8175]">
            <Lock size={13} className="text-[#B69A69]" />
            <span className="tracking-wider uppercase">Secure 256-Bit Checkout</span>
          </div>
        </div>
      </header>

      {/* Main Checkout Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* Step Indicator Bar */}
        <div className="max-w-3xl mb-8 flex items-center justify-between text-xs font-sans tracking-widest uppercase border-b border-[#D8C9B5]/40 pb-4">
          <button
            type="button"
            onClick={() => setCurrentStep(1)}
            className={`flex items-center gap-2 cursor-pointer ${
              currentStep === 1
                ? 'text-[#211C19] font-semibold border-b-2 border-[#211C19] pb-1'
                : 'text-[#8C8175]'
            }`}
          >
            <span>01</span>
            <span className="hidden sm:inline">INFORMATION</span>
          </button>

          <span className="text-[#D8C9B5]">/</span>

          <button
            type="button"
            onClick={() => {
              if (email && firstName) setCurrentStep(2);
            }}
            className={`flex items-center gap-2 cursor-pointer ${
              currentStep === 2
                ? 'text-[#211C19] font-semibold border-b-2 border-[#211C19] pb-1'
                : 'text-[#8C8175]'
            }`}
          >
            <span>02</span>
            <span className="hidden sm:inline">SHIPPING</span>
          </button>

          <span className="text-[#D8C9B5]">/</span>

          <button
            type="button"
            onClick={() => {
              if (address && city) setCurrentStep(3);
            }}
            className={`flex items-center gap-2 cursor-pointer ${
              currentStep === 3
                ? 'text-[#211C19] font-semibold border-b-2 border-[#211C19] pb-1'
                : 'text-[#8C8175]'
            }`}
          >
            <span>03</span>
            <span className="hidden sm:inline">PAYMENT</span>
          </button>

          <span className="text-[#D8C9B5]">/</span>

          <span className="text-[#8C8175] flex items-center gap-2">
            <span>04</span>
            <span className="hidden sm:inline">CONFIRMATION</span>
          </span>
        </div>

        {/* Mobile Collapsible Order Summary Bar */}
        <div className="lg:hidden mb-6 bg-white/70 border border-[#D8C9B5] rounded-xs p-4">
          <button
            type="button"
            onClick={() => setMobileSummaryOpen(!mobileSummaryOpen)}
            className="w-full flex items-center justify-between text-xs font-sans text-[#211C19]"
          >
            <span className="flex items-center gap-2">
              <span className="font-serif text-sm">Order Summary</span>
              <ChevronDown
                size={14}
                className={`transition-transform ${mobileSummaryOpen ? 'rotate-180' : ''}`}
              />
            </span>
            <span className="font-semibold tabular-nums text-sm">
              ₹{total.toLocaleString('en-IN')}
            </span>
          </button>

          {mobileSummaryOpen && (
            <div className="pt-4 mt-3 border-t border-[#D8C9B5]/40 space-y-3">
              {items.map((i) => (
                <div key={i.product.id} className="flex justify-between text-xs">
                  <span>
                    {i.product.name} ({i.size}) × {i.quantity}
                  </span>
                  <span className="tabular-nums">
                    ₹{(i.unitPrice * i.quantity).toLocaleString('en-IN')}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* 2-Column Desktop Grid: Steps Form Left, Sticky Summary Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* ============================================================== */}
          {/* LEFT: STEP FORMS */}
          {/* ============================================================== */}
          <div className="lg:col-span-7">
            {/* STEP 1: CUSTOMER INFORMATION */}
            {currentStep === 1 && (
              <form onSubmit={handleProceedToShipping} className="space-y-6 animate-in fade-in">
                <div className="flex items-center justify-between pb-2 border-b border-[#D8C9B5]/40">
                  <h2 className="font-serif text-2xl text-[#211C19]">
                    01 · Customer Information
                  </h2>
                  <button
                    type="button"
                    onClick={onReturnToCart}
                    className="text-xs text-[#8C8175] hover:text-[#211C19] flex items-center gap-1 cursor-pointer"
                  >
                    <ArrowLeft size={12} />
                    <span>Return to bag</span>
                  </button>
                </div>

                <div>
                  <label className="block text-[11px] font-sans uppercase tracking-widest text-[#8C8175] mb-1.5 font-medium">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="connoisseur@maisonkiyora.com"
                    className="w-full px-4 py-3 text-xs bg-white border border-[#D8C9B5] text-[#211C19] rounded-xs focus:border-[#211C19] focus:outline-hidden"
                  />
                  <p className="text-[10px] text-[#8C8175] mt-1">
                    Your shipment notification and digital certificate will be dispatched here.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-sans uppercase tracking-widest text-[#8C8175] mb-1.5 font-medium">
                      First Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      placeholder="Eleanor"
                      className="w-full px-4 py-3 text-xs bg-white border border-[#D8C9B5] text-[#211C19] rounded-xs focus:border-[#211C19] focus:outline-hidden"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-sans uppercase tracking-widest text-[#8C8175] mb-1.5 font-medium">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      placeholder="Vance"
                      className="w-full px-4 py-3 text-xs bg-white border border-[#D8C9B5] text-[#211C19] rounded-xs focus:border-[#211C19] focus:outline-hidden"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-sans uppercase tracking-widest text-[#8C8175] mb-1.5 font-medium">
                    Mobile Phone *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 98765 43210"
                    className="w-full px-4 py-3 text-xs bg-white border border-[#D8C9B5] text-[#211C19] rounded-xs focus:border-[#211C19] focus:outline-hidden"
                  />
                  <p className="text-[10px] text-[#8C8175] mt-1">
                    Required for courier tracking dispatch.
                  </p>
                </div>

                <button
                  type="submit"
                  className="w-full btn-luxury-primary text-xs py-4 tracking-[0.2em] cursor-pointer mt-4"
                >
                  CONTINUE TO SHIPPING
                </button>
              </form>
            )}

            {/* STEP 2: SHIPPING ADDRESS */}
            {currentStep === 2 && (
              <form onSubmit={handleProceedToPayment} className="space-y-6 animate-in fade-in">
                <div className="flex items-center justify-between pb-2 border-b border-[#D8C9B5]/40">
                  <h2 className="font-serif text-2xl text-[#211C19]">
                    02 · Shipping Destination
                  </h2>
                  <button
                    type="button"
                    onClick={() => setCurrentStep(1)}
                    className="text-xs text-[#8C8175] hover:text-[#211C19] flex items-center gap-1 cursor-pointer"
                  >
                    <ArrowLeft size={12} />
                    <span>Back to information</span>
                  </button>
                </div>

                {/* Recipient summary banner */}
                <div className="p-3 bg-white/50 border border-[#D8C9B5] rounded-xs text-xs flex justify-between items-center">
                  <span className="text-[#8C8175]">
                    Contact: <strong className="text-[#211C19]">{email}</strong>
                  </span>
                  <button
                    type="button"
                    onClick={() => setCurrentStep(1)}
                    className="text-[11px] underline text-[#8C8175]"
                  >
                    Change
                  </button>
                </div>

                <div>
                  <label className="block text-[11px] font-sans uppercase tracking-widest text-[#8C8175] mb-1.5 font-medium">
                    Address *
                  </label>
                  <input
                    type="text"
                    required
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="House / Flat No, Building, Street"
                    className="w-full px-4 py-3 text-xs bg-white border border-[#D8C9B5] text-[#211C19] rounded-xs focus:border-[#211C19] focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-sans uppercase tracking-widest text-[#8C8175] mb-1.5 font-medium">
                    Apartment, Suite, Unit (Optional)
                  </label>
                  <input
                    type="text"
                    value={apartment}
                    onChange={(e) => setApartment(e.target.value)}
                    placeholder="Penthouse 4B"
                    className="w-full px-4 py-3 text-xs bg-white border border-[#D8C9B5] text-[#211C19] rounded-xs focus:border-[#211C19] focus:outline-hidden"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-[11px] font-sans uppercase tracking-widest text-[#8C8175] mb-1.5 font-medium">
                      City *
                    </label>
                    <input
                      type="text"
                      required
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="Mumbai"
                      className="w-full px-4 py-3 text-xs bg-white border border-[#D8C9B5] text-[#211C19] rounded-xs focus:border-[#211C19] focus:outline-hidden"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-sans uppercase tracking-widest text-[#8C8175] mb-1.5 font-medium">
                      State *
                    </label>
                    <input
                      type="text"
                      required
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                      placeholder="Maharashtra"
                      className="w-full px-4 py-3 text-xs bg-white border border-[#D8C9B5] text-[#211C19] rounded-xs focus:border-[#211C19] focus:outline-hidden"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-sans uppercase tracking-widest text-[#8C8175] mb-1.5 font-medium">
                      PIN Code *
                    </label>
                    <input
                      type="text"
                      maxLength={6}
                      required
                      value={pinCode}
                      onChange={(e) => setPinCode(e.target.value.replace(/\D/g, ''))}
                      placeholder="400001"
                      className="w-full px-4 py-3 text-xs bg-white border border-[#D8C9B5] text-[#211C19] rounded-xs focus:border-[#211C19] focus:outline-hidden"
                    />
                  </div>
                </div>

                <label className="flex items-center gap-2 text-xs text-[#211C19] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={saveAddress}
                    onChange={(e) => setSaveAddress(e.target.checked)}
                    className="accent-[#211C19]"
                  />
                  <span>Save this address to my Maison Kiyora profile</span>
                </label>

                <button
                  type="submit"
                  className="w-full btn-luxury-primary text-xs py-4 tracking-[0.2em] cursor-pointer mt-4"
                >
                  CONTINUE TO PAYMENT
                </button>
              </form>
            )}

            {/* STEP 3: PAYMENT METHOD */}
            {currentStep === 3 && (
              <form onSubmit={handleFinalPlaceOrder} className="space-y-6 animate-in fade-in">
                <div className="flex items-center justify-between pb-2 border-b border-[#D8C9B5]/40">
                  <h2 className="font-serif text-2xl text-[#211C19]">
                    03 · Payment Method
                  </h2>
                  <button
                    type="button"
                    onClick={() => setCurrentStep(2)}
                    className="text-xs text-[#8C8175] hover:text-[#211C19] flex items-center gap-1 cursor-pointer"
                  >
                    <ArrowLeft size={12} />
                    <span>Back to shipping</span>
                  </button>
                </div>

                {/* Shipping summary preview */}
                <div className="p-3 bg-white/50 border border-[#D8C9B5] rounded-xs text-xs space-y-1">
                  <p className="text-[#8C8175]">
                    Ship to: <strong className="text-[#211C19]">{address}, {city} - {pinCode}</strong>
                  </p>
                  <p className="text-[#8C8175]">
                    Method: <strong className="text-[#211C19]">Insured Air Express Courier</strong>
                  </p>
                </div>

                {/* 29. Payment Selection UI */}
                <div className="space-y-3">
                  {/* UPI */}
                  <div
                    className={`rounded-xs border transition-all ${
                      paymentMethod === 'upi'
                        ? 'border-[#211C19] bg-white shadow-xs'
                        : 'border-[#D8C9B5] bg-white/40'
                    }`}
                  >
                    <label className="flex items-center justify-between p-4 cursor-pointer">
                      <div className="flex items-center gap-3">
                        <input
                          type="radio"
                          name="paymentMethod"
                          checked={paymentMethod === 'upi'}
                          onChange={() => setPaymentMethod('upi')}
                          className="accent-[#211C19]"
                        />
                        <span className="font-medium text-xs font-sans text-[#211C19]">
                          UPI (Google Pay, PhonePe, Paytm, BHIM)
                        </span>
                      </div>
                      <span className="text-[10px] text-[#3b5e39] font-medium uppercase tracking-wider">
                        Instant Zero Fee
                      </span>
                    </label>

                    {paymentMethod === 'upi' && (
                      <div className="px-4 pb-4 pt-1 border-t border-[#D8C9B5]/30">
                        <p className="text-[11px] text-[#8C8175] mb-2">
                          Enter your Virtual Payment Address (UPI ID) or approve via app:
                        </p>
                        <input
                          type="text"
                          value={upiId}
                          onChange={(e) => setUpiId(e.target.value)}
                          placeholder="e.g. mobile@upi or username@okhdfcbank"
                          className="w-full px-3 py-2 text-xs bg-[#FAF7F2] border border-[#D8C9B5] text-[#211C19] rounded-xs"
                        />
                      </div>
                    )}
                  </div>

                  {/* Credit / Debit Card */}
                  <div
                    className={`rounded-xs border transition-all ${
                      paymentMethod === 'card'
                        ? 'border-[#211C19] bg-white shadow-xs'
                        : 'border-[#D8C9B5] bg-white/40'
                    }`}
                  >
                    <label className="flex items-center justify-between p-4 cursor-pointer">
                      <div className="flex items-center gap-3">
                        <input
                          type="radio"
                          name="paymentMethod"
                          checked={paymentMethod === 'card'}
                          onChange={() => setPaymentMethod('card')}
                          className="accent-[#211C19]"
                        />
                        <span className="font-medium text-xs font-sans text-[#211C19]">
                          Credit or Debit Card (Visa, Mastercard, Amex, RuPay)
                        </span>
                      </div>
                    </label>

                    {paymentMethod === 'card' && (
                      <div className="px-4 pb-4 pt-1 border-t border-[#D8C9B5]/30 space-y-3">
                        <input
                          type="text"
                          maxLength={19}
                          value={cardNumber}
                          onChange={(e) => setCardNumber(e.target.value)}
                          placeholder="Card Number"
                          className="w-full px-3 py-2 text-xs bg-[#FAF7F2] border border-[#D8C9B5] text-[#211C19] rounded-xs"
                        />
                        <div className="grid grid-cols-2 gap-3">
                          <input
                            type="text"
                            maxLength={5}
                            value={cardExpiry}
                            onChange={(e) => setCardExpiry(e.target.value)}
                            placeholder="MM / YY"
                            className="w-full px-3 py-2 text-xs bg-[#FAF7F2] border border-[#D8C9B5] text-[#211C19] rounded-xs"
                          />
                          <input
                            type="password"
                            maxLength={4}
                            value={cardCvv}
                            onChange={(e) => setCardCvv(e.target.value)}
                            placeholder="CVV"
                            className="w-full px-3 py-2 text-xs bg-[#FAF7F2] border border-[#D8C9B5] text-[#211C19] rounded-xs"
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Net Banking */}
                  <div
                    className={`rounded-xs border transition-all ${
                      paymentMethod === 'netbanking'
                        ? 'border-[#211C19] bg-white shadow-xs'
                        : 'border-[#D8C9B5] bg-white/40'
                    }`}
                  >
                    <label className="flex items-center justify-between p-4 cursor-pointer">
                      <div className="flex items-center gap-3">
                        <input
                          type="radio"
                          name="paymentMethod"
                          checked={paymentMethod === 'netbanking'}
                          onChange={() => setPaymentMethod('netbanking')}
                          className="accent-[#211C19]"
                        />
                        <span className="font-medium text-xs font-sans text-[#211C19]">
                          Net Banking
                        </span>
                      </div>
                    </label>

                    {paymentMethod === 'netbanking' && (
                      <div className="px-4 pb-4 pt-1 border-t border-[#D8C9B5]/30">
                        <select
                          value={selectedBank}
                          onChange={(e) => setSelectedBank(e.target.value)}
                          className="w-full px-3 py-2 text-xs bg-[#FAF7F2] border border-[#D8C9B5] text-[#211C19] rounded-xs"
                        >
                          <option>HDFC Bank</option>
                          <option>ICICI Bank</option>
                          <option>State Bank of India</option>
                          <option>Axis Bank</option>
                          <option>Kotak Mahindra Bank</option>
                        </select>
                      </div>
                    )}
                  </div>

                  {/* Cash on Delivery */}
                  <div
                    className={`rounded-xs border transition-all ${
                      paymentMethod === 'cod'
                        ? 'border-[#211C19] bg-white shadow-xs'
                        : 'border-[#D8C9B5] bg-white/40'
                    }`}
                  >
                    <label className="flex items-center justify-between p-4 cursor-pointer">
                      <div className="flex items-center gap-3">
                        <input
                          type="radio"
                          name="paymentMethod"
                          checked={paymentMethod === 'cod'}
                          onChange={() => setPaymentMethod('cod')}
                          className="accent-[#211C19]"
                        />
                        <span className="font-medium text-xs font-sans text-[#211C19]">
                          Cash on Delivery (COD)
                        </span>
                      </div>
                    </label>

                    {paymentMethod === 'cod' && (
                      <div className="px-4 pb-4 pt-1 border-t border-[#D8C9B5]/30 text-xs text-[#8C8175]">
                        <p>
                          Pay in cash or digital scan-on-delivery when your sealed flacon arrives.
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* 31. PLACE ORDER CTA */}
                <div className="pt-4 border-t border-[#D8C9B5]/40 space-y-3">
                  <button
                    type="submit"
                    className="w-full btn-luxury-primary text-xs py-4 tracking-[0.2em] cursor-pointer"
                  >
                    PLACE ORDER · ₹{total.toLocaleString('en-IN')}
                  </button>

                  <div className="text-center text-[11px] text-[#8C8175] flex items-center justify-center gap-1.5">
                    <ShieldCheck size={14} className="text-[#B69A69]" />
                    <span>🔒 Secure payment · Your payment information is protected.</span>
                  </div>
                </div>
              </form>
            )}
          </div>

          {/* ============================================================== */}
          {/* RIGHT: 30. STICKY ORDER SUMMARY PANEL */}
          {/* ============================================================== */}
          <aside className="hidden lg:block lg:col-span-5 bg-white/60 backdrop-blur-sm p-8 rounded-xs border border-[#D8C9B5]/60 sticky top-28 space-y-6">
            <h3 className="font-serif text-2xl text-[#211C19] pb-4 border-b border-[#D8C9B5]/40">
              YOUR SELECTION
            </h3>

            {/* Product Thumbnails List */}
            <div className="space-y-4 max-h-[320px] overflow-y-auto pr-2">
              {items.map((item) => (
                <div
                  key={`${item.product.id}-${item.size}`}
                  className="flex items-center gap-4"
                >
                  <div className="w-14 h-16 bg-white rounded-xs border border-[#D8C9B5]/50 flex items-center justify-center shrink-0">
                    <PerfumeBottleVisual
                      name={item.product.name}
                      size="sm"
                      className="w-10 h-12"
                      interactive={false}
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <h4 className="font-serif text-sm text-[#211C19] truncate">
                      {item.product.name}
                    </h4>
                    <p className="text-[11px] font-sans text-[#8C8175]">
                      {item.size} × {item.quantity}
                    </p>
                  </div>

                  <span className="font-sans font-medium text-xs text-[#211C19] tabular-nums">
                    ₹{(item.unitPrice * item.quantity).toLocaleString('en-IN')}
                  </span>
                </div>
              ))}
            </div>

            {/* Calculations Breakdown */}
            <div className="space-y-2 pt-4 border-t border-[#D8C9B5]/40 text-xs font-sans text-[#8C8175]">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="text-[#211C19] font-medium tabular-nums">
                  ₹{subtotal.toLocaleString('en-IN')}
                </span>
              </div>

              {discountAmount > 0 && (
                <div className="flex justify-between text-[#3b5e39]">
                  <span>Privilege Code ({appliedPromo})</span>
                  <span className="tabular-nums">-₹{discountAmount.toLocaleString('en-IN')}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span>Insured Air Courier</span>
                <span className="tabular-nums">
                  {shippingCost === 0 ? 'Complimentary' : '₹250'}
                </span>
              </div>

              <div className="flex justify-between">
                <span>Taxes</span>
                <span className="text-[#3b5e39]">Included in Price</span>
              </div>

              <div className="pt-4 border-t border-[#D8C9B5]/50 flex justify-between items-baseline">
                <span className="font-serif text-base text-[#211C19]">Total</span>
                <span className="font-sans text-xl font-semibold text-[#211C19] tabular-nums">
                  ₹{total.toLocaleString('en-IN')}
                </span>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};
