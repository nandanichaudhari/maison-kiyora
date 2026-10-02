import React, { useState, useEffect } from 'react';
import { useStore } from '../../context/StoreContext';
import { AdminCommandPalette } from './AdminCommandPalette';
import {
  LayoutDashboard,
  ShoppingBag,
  Package,
  Layers,
  Boxes,
  Users,
  Star,
  Tag,
  Gift,
  LayoutTemplate,
  BarChart3,
  Settings,
  Search,
  Bell,
  HelpCircle,
  LogOut,
  ExternalLink,
  Menu,
  X,
  Check,
} from 'lucide-react';

interface AdminLayoutProps {
  currentTab: string;
  onSelectTab: (tab: string) => void;
  onNavigateStore: () => void;
  children: React.ReactNode;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({
  currentTab,
  onSelectTab,
  onNavigateStore,
  children,
}) => {
  const {
    adminUser,
    logoutAdmin,
    notifications,
    markNotificationRead,
    markAllNotificationsRead,
    orders,
    products,
  } = useStore();

  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // Global Ctrl/Cmd + K listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setCommandPaletteOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const unreadNotifications = notifications.filter((n) => !n.read);
  const pendingOrdersCount = orders.filter((o) => o.orderStatus === 'Pending' || o.orderStatus === 'Processing').length;
  const lowStockCount = products.filter((p) => p.stock <= (p.lowStockThreshold ?? 10)).length;

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'orders', label: 'Orders', icon: ShoppingBag, badge: pendingOrdersCount > 0 ? pendingOrdersCount : undefined },
    { id: 'products', label: 'Products', icon: Package },
    { id: 'collections', label: 'Collections', icon: Layers },
    { id: 'inventory', label: 'Inventory', icon: Boxes, badge: lowStockCount > 0 ? lowStockCount : undefined },
    { id: 'customers', label: 'Customers', icon: Users },
    { id: 'reviews', label: 'Reviews', icon: Star },
    { id: 'coupons', label: 'Coupons', icon: Tag },
    { id: 'gift-cards', label: 'Gift Cards', icon: Gift },
    { id: 'content', label: 'Content', icon: LayoutTemplate },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-[#F5F0E8] text-[#211C19] flex font-sans">
      {/* ============================================================== */}
      {/* 2. FIXED LEFT SIDEBAR (DESKTOP) */}
      {/* ============================================================== */}
      <aside className="hidden lg:flex w-64 bg-[#211C19] text-[#F5F0E8] flex-col justify-between shrink-0 border-r border-[#B69A69]/20 fixed inset-y-0 left-0 z-30 shadow-xl">
        <div className="flex flex-col">
          {/* Logo & Operational Badge */}
          <div className="p-6 border-b border-white/10">
            <span className="font-serif text-lg tracking-[0.2em] font-semibold text-white block">
              MAISON KIYORA
            </span>
            <div className="flex items-center gap-1.5 mt-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#B69A69]" />
              <span className="text-[10px] font-sans tracking-[0.2em] uppercase text-[#D8C9B5]">
                ATELIER OPERATIONS
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="p-3 space-y-1 overflow-y-auto max-h-[calc(100vh-210px)]">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => onSelectTab(item.id)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 text-xs font-sans tracking-wide rounded-xs transition-colors cursor-pointer ${
                    isActive
                      ? 'bg-[#B69A69] text-[#211C19] font-semibold'
                      : 'text-[#D8C9B5]/80 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon size={16} strokeWidth={isActive ? 2.2 : 1.75} />
                    <span>{item.label}</span>
                  </div>
                  {item.badge !== undefined && (
                    <span
                      className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold tabular-nums ${
                        isActive
                          ? 'bg-[#211C19] text-[#F5F0E8]'
                          : 'bg-[#B69A69] text-[#211C19]'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer: Profile & External Boutique Link */}
        <div className="p-4 border-t border-white/10 bg-[#1a1614] space-y-3">
          <button
            type="button"
            onClick={onNavigateStore}
            className="w-full flex items-center justify-between text-xs text-[#D8C9B5] hover:text-white px-2 py-1.5 transition-colors cursor-pointer"
          >
            <span className="flex items-center gap-2">
              <ExternalLink size={13} />
              <span>View Live Boutique</span>
            </span>
            <span className="text-[10px] uppercase font-mono">FRONTEND</span>
          </button>

          <div className="flex items-center justify-between pt-2 border-t border-white/10">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-[#B69A69] text-[#211C19] font-serif font-bold text-xs flex items-center justify-center">
                {adminUser?.avatarInitials || 'MK'}
              </div>
              <div>
                <p className="text-xs font-medium text-white truncate max-w-[110px]">
                  {adminUser?.name || 'Maison Kiyora'}
                </p>
                <p className="text-[10px] text-[#B69A69] tracking-wider uppercase">
                  {adminUser?.role || 'OWNER'}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={logoutAdmin}
              className="p-1.5 text-[#8C8175] hover:text-[#942b41] transition-colors cursor-pointer"
              title="Sign Out"
              aria-label="Logout"
            >
              <LogOut size={15} />
            </button>
          </div>
        </div>
      </aside>

      {/* ============================================================== */}
      {/* MOBILE DRAWER SIDEBAR */}
      {/* ============================================================== */}
      {mobileSidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden bg-[#211C19]/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-72 h-full bg-[#211C19] text-[#F5F0E8] flex flex-col justify-between p-4 shadow-2xl">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <div>
                  <span className="font-serif text-lg tracking-wider text-white">MAISON KIYORA</span>
                  <p className="text-[10px] text-[#B69A69] tracking-widest uppercase">ATELIER CONSOLE</p>
                </div>
                <button
                  type="button"
                  onClick={() => setMobileSidebarOpen(false)}
                  className="p-1 text-[#8C8175] hover:text-white"
                >
                  <X size={20} />
                </button>
              </div>

              <nav className="mt-4 space-y-1">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = currentTab === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => {
                        onSelectTab(item.id);
                        setMobileSidebarOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-3 py-2 text-xs rounded-xs ${
                        isActive
                          ? 'bg-[#B69A69] text-[#211C19] font-medium'
                          : 'text-[#D8C9B5] hover:bg-white/5'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon size={16} />
                        <span>{item.label}</span>
                      </div>
                      {item.badge !== undefined && (
                        <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-[#B69A69] text-[#211C19] font-bold">
                          {item.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </nav>
            </div>

            <div className="pt-4 border-t border-white/10">
              <button
                type="button"
                onClick={() => {
                  setMobileSidebarOpen(false);
                  onNavigateStore();
                }}
                className="w-full btn-luxury-outline text-xs py-2 text-white border-white/40 mb-2"
              >
                View Live Boutique
              </button>
              <button
                type="button"
                onClick={logoutAdmin}
                className="w-full text-center text-xs text-[#8C8175] hover:text-[#942b41]"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* MAIN CONTENT AREA */}
      {/* ============================================================== */}
      <div className="flex-1 flex flex-col min-w-0 lg:pl-64">
        {/* 4. TOP BAR */}
        <header className="h-16 bg-white/70 backdrop-blur-md border-b border-[#D8C9B5]/60 px-4 sm:px-8 flex items-center justify-between sticky top-0 z-20 shadow-2xs">
          <div className="flex items-center gap-3 flex-1 max-w-lg">
            {/* Mobile menu toggle */}
            <button
              type="button"
              onClick={() => setMobileSidebarOpen(true)}
              className="lg:hidden p-1.5 text-[#211C19] hover:text-[#B69A69] cursor-pointer"
            >
              <Menu size={20} />
            </button>

            {/* Global Search Input Trigger (Ctrl + K) */}
            <button
              type="button"
              onClick={() => setCommandPaletteOpen(true)}
              className="w-full flex items-center justify-between gap-3 px-3.5 py-2 text-xs bg-[#F5F0E8]/70 hover:bg-[#F5F0E8] border border-[#D8C9B5] text-[#8C8175] rounded-xs cursor-pointer transition-colors"
            >
              <div className="flex items-center gap-2">
                <Search size={14} className="text-[#B69A69]" />
                <span className="truncate">Search products, orders, customers...</span>
              </div>
              <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-mono bg-white border border-[#D8C9B5] rounded-2xs text-[#211C19]">
                ⌘K
              </kbd>
            </button>
          </div>

          {/* Right Action Icons */}
          <div className="flex items-center gap-3 sm:gap-4 ml-4">
            {/* Quick Switcher to Public Store */}
            <button
              type="button"
              onClick={onNavigateStore}
              className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-xs border border-[#D8C9B5] bg-white text-xs font-sans text-[#211C19] hover:border-[#211C19] transition-colors cursor-pointer"
            >
              <ExternalLink size={12} className="text-[#B69A69]" />
              <span>Live Boutique</span>
            </button>

            {/* Notifications Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setNotificationsOpen(!notificationsOpen)}
                className="p-2 text-[#211C19] hover:text-[#B69A69] relative rounded-full focus:outline-hidden cursor-pointer"
                aria-label="Admin notifications"
              >
                <Bell size={18} strokeWidth={1.75} />
                {unreadNotifications.length > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 bg-[#942b41] text-white text-[10px] font-sans font-bold rounded-full flex items-center justify-center">
                    {unreadNotifications.length}
                  </span>
                )}
              </button>

              {/* Notification Popover Card */}
              {notificationsOpen && (
                <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white border border-[#D8C9B5] rounded-xs shadow-xl p-4 z-40 animate-in fade-in duration-200">
                  <div className="flex items-center justify-between pb-3 border-b border-[#D8C9B5]/40 mb-3">
                    <span className="font-serif text-sm text-[#211C19] font-medium">
                      Operational Alerts
                    </span>
                    {unreadNotifications.length > 0 && (
                      <button
                        type="button"
                        onClick={markAllNotificationsRead}
                        className="text-[10px] text-[#B69A69] hover:underline cursor-pointer"
                      >
                        Mark all as read
                      </button>
                    )}
                  </div>

                  <div className="space-y-2.5 max-h-72 overflow-y-auto pr-1">
                    {notifications.length === 0 ? (
                      <p className="text-xs text-[#8C8175] text-center py-4">
                        No notifications currently.
                      </p>
                    ) : (
                      notifications.map((n) => (
                        <div
                          key={n.id}
                          onClick={() => {
                            markNotificationRead(n.id);
                            if (n.link) {
                              const tab = n.link.replace('#admin/', '');
                              onSelectTab(tab);
                              setNotificationsOpen(false);
                            }
                          }}
                          className={`p-2.5 rounded-xs text-xs transition-colors cursor-pointer border ${
                            n.read
                              ? 'bg-[#FAF7F2]/50 border-transparent text-[#8C8175]'
                              : 'bg-white border-[#B69A69]/40 text-[#211C19] shadow-2xs'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-medium text-xs text-[#211C19]">
                              {n.title}
                            </span>
                            <span className="text-[10px] text-[#8C8175]">{n.date}</span>
                          </div>
                          <p className="text-[11px] leading-relaxed">{n.message}</p>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Help / Docs */}
            <button
              type="button"
              onClick={() => alert('Maison Kiyora Admin Operations Manual (v2.6) — Paris & Grasse Distillation System.')}
              className="p-2 text-[#8C8175] hover:text-[#211C19] cursor-pointer"
              title="Help & Operations Documentation"
            >
              <HelpCircle size={18} strokeWidth={1.75} />
            </button>

            {/* Admin Avatar MK */}
            <div className="flex items-center gap-2 pl-2 border-l border-[#D8C9B5]">
              <div className="w-8 h-8 rounded-full bg-[#211C19] text-[#F5F0E8] font-serif font-semibold text-xs flex items-center justify-center">
                {adminUser?.avatarInitials || 'MK'}
              </div>
            </div>
          </div>
        </header>

        {/* MAIN BODY OUTLET */}
        <main className="flex-1 p-4 sm:p-8 overflow-x-hidden">
          {children}
        </main>
      </div>

      {/* Global Command Palette (Cmd + K) */}
      <AdminCommandPalette
        isOpen={commandPaletteOpen}
        onClose={() => setCommandPaletteOpen(false)}
        onNavigateTab={(tab) => onSelectTab(tab)}
      />
    </div>
  );
};
