import React, { useState } from 'react';
import { Order, Product } from '../types';
import { PerfumeBottleVisual } from './PerfumeBottleVisual';
import { User, Package, Heart, MapPin, Settings, LogOut, Check, ArrowRight, ShieldCheck } from 'lucide-react';

interface AccountPageProps {
  orders: Order[];
  wishlistProducts: Product[];
  onTrackOrder: (orderId: string) => void;
  onExploreCollection: () => void;
  onNavigateHome: () => void;
  onSelectProduct: (product: Product) => void;
}

type AccountTab = 'orders' | 'wishlist' | 'profile' | 'addresses' | 'saved';

export const AccountPage: React.FC<AccountPageProps> = ({
  orders,
  wishlistProducts,
  onTrackOrder,
  onExploreCollection,
  onNavigateHome,
  onSelectProduct,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(true); // default logged in for review, with toggle
  const [authMode, setAuthMode] = useState<'signin' | 'register' | 'forgot'>('signin');
  const [activeTab, setActiveTab] = useState<AccountTab>('orders');

  // Login form state
  const [email, setEmail] = useState('eleanor.vance@luxury.com');
  const [password, setPassword] = useState('••••••••');
  const [name, setName] = useState('Eleanor Vance');
  const [phone, setPhone] = useState('+91 98765 43210');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setAuthMode('signin');
  };

  return (
    <div className="pt-28 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 animate-in fade-in duration-300">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs font-sans tracking-[0.16em] uppercase text-[#8C8175] mb-6">
        <button
          type="button"
          onClick={onNavigateHome}
          className="hover:text-[#211C19] transition-colors cursor-pointer"
        >
          HOME
        </button>
        <span>/</span>
        <span className="text-[#211C19] font-medium">ACCOUNT</span>
      </nav>

      {!isAuthenticated ? (
        // 20. LOGIN / ACCOUNT AUTHENTICATION VIEW
        <div className="max-w-md mx-auto py-12">
          <div className="bg-white/60 backdrop-blur-sm border border-[#D8C9B5]/60 rounded-xs p-8 shadow-xs">
            <div className="text-center mb-8">
              <span className="text-[10px] font-sans tracking-[0.24em] uppercase text-[#8C8175] font-semibold">
                MAISON KIYORA CIRCLE
              </span>
              <h1 className="font-serif text-3xl text-[#211C19] mt-1">
                {authMode === 'signin'
                  ? 'Sign In to Your Account'
                  : authMode === 'register'
                  ? 'Create an Account'
                  : 'Reset Password'}
              </h1>
              <p className="text-xs text-[#8C8175] font-light mt-1">
                {authMode === 'signin'
                  ? 'Access your saved flacons, orders, and privileges.'
                  : authMode === 'register'
                  ? 'Join our private circle of niche perfume patrons.'
                  : 'Enter your email to receive recovery instructions.'}
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              {authMode === 'register' && (
                <div>
                  <label className="block text-[11px] font-sans uppercase tracking-widest text-[#8C8175] mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Eleanor Vance"
                    className="w-full px-3 py-2.5 text-xs bg-white border border-[#D8C9B5] text-[#211C19] rounded-xs"
                  />
                </div>
              )}

              <div>
                <label className="block text-[11px] font-sans uppercase tracking-widest text-[#8C8175] mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="eleanor@luxury.com"
                  className="w-full px-3 py-2.5 text-xs bg-white border border-[#D8C9B5] text-[#211C19] rounded-xs"
                />
              </div>

              {authMode !== 'forgot' && (
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="text-[11px] font-sans uppercase tracking-widest text-[#8C8175]">
                      Password
                    </label>
                    {authMode === 'signin' && (
                      <button
                        type="button"
                        onClick={() => setAuthMode('forgot')}
                        className="text-[10px] text-[#8C8175] hover:text-[#211C19] underline"
                      >
                        Forgot password?
                      </button>
                    )}
                  </div>
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full px-3 py-2.5 text-xs bg-white border border-[#D8C9B5] text-[#211C19] rounded-xs"
                  />
                </div>
              )}

              <button
                type="submit"
                className="w-full btn-luxury-primary text-xs py-3.5 tracking-[0.2em] cursor-pointer mt-2"
              >
                {authMode === 'signin'
                  ? 'SIGN IN'
                  : authMode === 'register'
                  ? 'CREATE ACCOUNT'
                  : 'SEND INSTRUCTIONS'}
              </button>
            </form>

            <div className="mt-6 pt-4 border-t border-[#D8C9B5]/40 text-center text-xs text-[#8C8175]">
              {authMode === 'signin' ? (
                <p>
                  Do not have an account yet?{' '}
                  <button
                    type="button"
                    onClick={() => setAuthMode('register')}
                    className="text-[#211C19] font-medium underline"
                  >
                    Create Account
                  </button>
                </p>
              ) : (
                <p>
                  Already have an account?{' '}
                  <button
                    type="button"
                    onClick={() => setAuthMode('signin')}
                    className="text-[#211C19] font-medium underline"
                  >
                    Sign In
                  </button>
                </p>
              )}
            </div>
          </div>
        </div>
      ) : (
        // 21. CUSTOMER ACCOUNT DASHBOARD (MY ACCOUNT)
        <div>
          {/* Dashboard Header Banner */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 mb-8 border-b border-[#D8C9B5]/40">
            <div>
              <span className="text-[10px] font-sans tracking-[0.24em] uppercase text-[#8C8175] font-semibold">
                CONNOISSEUR PROFILE
              </span>
              <h1 className="font-serif text-4xl sm:text-5xl text-[#211C19] mt-0.5">
                MY ACCOUNT
              </h1>
              <p className="text-xs text-[#8C8175] mt-1">
                Welcome back, <strong className="text-[#211C19]">{name}</strong> ({email})
              </p>
            </div>

            <button
              type="button"
              onClick={handleLogout}
              className="text-xs font-sans tracking-wider uppercase text-[#8C8175] hover:text-[#942b41] flex items-center gap-1.5 cursor-pointer self-start sm:self-auto"
            >
              <LogOut size={13} />
              <span>SIGN OUT</span>
            </button>
          </div>

          {/* Clean Dashboard Navigation Tabs */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            {/* Sidebar Tabs */}
            <aside className="lg:col-span-3 space-y-1">
              {[
                { id: 'orders', label: 'ORDERS', icon: Package },
                { id: 'wishlist', label: 'WISHLIST', icon: Heart },
                { id: 'profile', label: 'PROFILE', icon: User },
                { id: 'addresses', label: 'ADDRESSES', icon: MapPin },
                { id: 'saved', label: 'SAVED DETAILS', icon: Settings },
              ].map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id as AccountTab)}
                    className={`w-full flex items-center gap-3 px-4 py-3 text-xs font-sans tracking-wider uppercase transition-colors rounded-xs text-left cursor-pointer ${
                      isActive
                        ? 'bg-[#211C19] text-[#F5F0E8] font-medium'
                        : 'text-[#8C8175] hover:text-[#211C19] hover:bg-white/40'
                    }`}
                  >
                    <Icon size={15} />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </aside>

            {/* Main Content Area */}
            <main className="lg:col-span-9 bg-white/50 backdrop-blur-sm border border-[#D8C9B5]/50 rounded-xs p-6 sm:p-8">
              {/* ORDERS TAB */}
              {activeTab === 'orders' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between pb-4 border-b border-[#D8C9B5]/40">
                    <h2 className="font-serif text-2xl text-[#211C19]">
                      Order History
                    </h2>
                    <span className="text-xs text-[#8C8175]">
                      {orders.length} Dispatches Recorded
                    </span>
                  </div>

                  {orders.length === 0 ? (
                    <div className="py-12 text-center">
                      <p className="font-serif text-xl text-[#211C19] mb-2">
                        No Orders Yet
                      </p>
                      <p className="text-xs text-[#8C8175] mb-6">
                        Explore our signature extraits de parfum.
                      </p>
                      <button
                        type="button"
                        onClick={onExploreCollection}
                        className="btn-luxury-outline text-xs py-2.5 px-6"
                      >
                        EXPLORE CREATIONS
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {orders.map((ord) => (
                        <div
                          key={ord.orderId}
                          className="p-5 bg-white rounded-xs border border-[#D8C9B5]/50 flex flex-col md:flex-row md:items-center justify-between gap-4"
                        >
                          <div>
                            <div className="flex items-center gap-3 mb-1">
                              <span className="font-mono text-sm font-semibold text-[#211C19]">
                                {ord.orderId}
                              </span>
                              <span className="text-[10px] font-sans uppercase px-2 py-0.5 rounded-xs bg-[#3b5e39]/10 text-[#3b5e39] font-medium">
                                {ord.orderStatus}
                              </span>
                            </div>
                            <p className="text-xs text-[#8C8175]">
                              Placed on {ord.createdAt} · {ord.items.length} item(s) · Total ₹{ord.total.toLocaleString('en-IN')}
                            </p>
                          </div>

                          <div className="flex items-center gap-3">
                            <button
                              type="button"
                              onClick={() => onTrackOrder(ord.orderId)}
                              className="text-xs font-sans tracking-wider uppercase px-4 py-2 border border-[#211C19] text-[#211C19] hover:bg-[#211C19] hover:text-[#F5F0E8] transition-colors rounded-xs"
                            >
                              TRACK DISPATCH
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* WISHLIST TAB */}
              {activeTab === 'wishlist' && (
                <div className="space-y-6">
                  <h2 className="font-serif text-2xl text-[#211C19] pb-4 border-b border-[#D8C9B5]/40">
                    Your Saved Creations
                  </h2>
                  {wishlistProducts.length === 0 ? (
                    <p className="text-xs text-[#8C8175] py-8 text-center">
                      No saved flacons in your wishlist currently.
                    </p>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {wishlistProducts.map((p) => (
                        <div
                          key={p.id}
                          className="p-4 bg-white rounded-xs border border-[#D8C9B5]/40 flex items-center justify-between"
                        >
                          <div>
                            <h4 className="font-serif text-base text-[#211C19]">{p.name}</h4>
                            <p className="text-xs text-[#8C8175]">{p.classification}</p>
                            <p className="text-xs font-medium text-[#211C19] mt-1 tabular-nums">
                              ₹{p.price.toLocaleString('en-IN')}
                            </p>
                          </div>
                          <button
                            type="button"
                            onClick={() => onSelectProduct(p)}
                            className="text-xs underline text-[#8C8175] hover:text-[#211C19]"
                          >
                            View
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* PROFILE TAB */}
              {activeTab === 'profile' && (
                <div className="space-y-6">
                  <h2 className="font-serif text-2xl text-[#211C19] pb-4 border-b border-[#D8C9B5]/40">
                    Personal Details
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div>
                      <label className="text-[10px] uppercase tracking-widest text-[#8C8175] block mb-1">
                        Full Name
                      </label>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-3 py-2 bg-white border border-[#D8C9B5] rounded-xs"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] uppercase tracking-widest text-[#8C8175] block mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-3 py-2 bg-white border border-[#D8C9B5] rounded-xs"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] uppercase tracking-widest text-[#8C8175] block mb-1">
                        Phone
                      </label>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full px-3 py-2 bg-white border border-[#D8C9B5] rounded-xs"
                      />
                    </div>
                  </div>
                  <button
                    type="button"
                    className="btn-luxury-primary text-xs py-2 px-6"
                  >
                    SAVE CHANGES
                  </button>
                </div>
              )}

              {/* ADDRESSES TAB */}
              {activeTab === 'addresses' && (
                <div className="space-y-6">
                  <h2 className="font-serif text-2xl text-[#211C19] pb-4 border-b border-[#D8C9B5]/40">
                    Saved Addresses
                  </h2>
                  <div className="p-4 bg-white rounded-xs border border-[#D8C9B5] text-xs space-y-1">
                    <span className="text-[10px] uppercase tracking-widest text-[#B69A69] font-semibold block mb-1">
                      PRIMARY RESIDENCE
                    </span>
                    <p className="font-medium text-[#211C19]">Eleanor Vance</p>
                    <p className="text-[#8C8175]">Penthouse 4B, Signature Towers, Worli Sea Face</p>
                    <p className="text-[#8C8175]">Mumbai, Maharashtra - 400018</p>
                    <p className="text-[#8C8175]">+91 98765 43210</p>
                  </div>
                </div>
              )}

              {/* SAVED DETAILS TAB */}
              {activeTab === 'saved' && (
                <div className="space-y-6">
                  <h2 className="font-serif text-2xl text-[#211C19] pb-4 border-b border-[#D8C9B5]/40">
                    Preferences & Concierge Notes
                  </h2>
                  <div className="space-y-4 text-xs">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" defaultChecked className="accent-[#211C19]" />
                      <span>Receive quarterly olfactory journal & private cellar reserves</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" defaultChecked className="accent-[#211C19]" />
                      <span>Complimentary wax-sealed personalized calligraphy on all gift orders</span>
                    </label>
                  </div>
                </div>
              )}
            </main>
          </div>
        </div>
      )}
    </div>
  );
};
