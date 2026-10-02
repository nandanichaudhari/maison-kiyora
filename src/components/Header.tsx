import React, { useState, useEffect } from 'react';
import { Search, User, Heart, ShoppingBag, Menu, X } from 'lucide-react';

interface HeaderProps {
  onNavigateHome: () => void;
  onNavigateShop: () => void;
  onOpenSearch: () => void;
  onOpenBag: () => void;
  onOpenWishlist: () => void;
  onOpenScentFinder: () => void;
  onOpenStory: () => void;
  onOpenAccount: () => void;
  onNavigateTrackOrder: () => void;
  cartCount: number;
  wishlistCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  onNavigateHome,
  onNavigateShop,
  onOpenSearch,
  onOpenBag,
  onOpenWishlist,
  onOpenScentFinder,
  onOpenStory,
  onOpenAccount,
  onNavigateTrackOrder,
  cartCount,
  wishlistCount,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ease-out ${
          isScrolled ? 'glass-nav-scrolled py-3 sm:py-3.5' : 'glass-nav py-4 sm:py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* LEFT: MAISON KIYORA LOGO & BRANDMARK */}
            <div className="flex items-center gap-3">
              {/* Mobile Hamburger Button */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(true)}
                className="md:hidden p-1.5 -ml-1 text-[#211C19] hover:text-[#B69A69] transition-colors cursor-pointer"
                aria-label="Open mobile menu"
              >
                <Menu size={20} strokeWidth={1.5} />
              </button>

              <button
                type="button"
                onClick={onNavigateHome}
                className="flex items-center gap-2 group cursor-pointer text-left"
              >
                {/* Monogram emblem */}
                <span className="w-6 h-6 rounded-full border border-[#B69A69]/60 flex items-center justify-center font-serif text-[11px] font-semibold text-[#B69A69] group-hover:border-[#211C19] group-hover:text-[#211C19] transition-colors">
                  MK
                </span>
                <span className="font-serif text-lg sm:text-xl tracking-[0.22em] font-medium text-[#211C19] group-hover:text-[#B69A69] transition-colors whitespace-nowrap">
                  MAISON KIYORA
                </span>
              </button>
            </div>

            {/* CENTER: DESKTOP NAVIGATION LINKS (SECTION 9) */}
            <nav className="hidden md:flex items-center gap-8 lg:gap-11 text-[11px] font-sans font-medium tracking-[0.22em] uppercase text-[#211C19]/80">
              <button
                type="button"
                onClick={onNavigateShop}
                className="hover:text-[#211C19] relative py-1 transition-colors group cursor-pointer"
              >
                <span>SHOP</span>
                <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#B69A69] transition-all duration-300 group-hover:w-full" />
              </button>

              <button
                type="button"
                onClick={onNavigateShop}
                className="hover:text-[#211C19] relative py-1 transition-colors group cursor-pointer"
              >
                <span>COLLECTIONS</span>
                <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#B69A69] transition-all duration-300 group-hover:w-full" />
              </button>

              <button
                type="button"
                onClick={onOpenStory}
                className="hover:text-[#211C19] relative py-1 transition-colors group cursor-pointer"
              >
                <span>OUR STORY</span>
                <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#B69A69] transition-all duration-300 group-hover:w-full" />
              </button>

              <button
                type="button"
                onClick={onOpenScentFinder}
                className="hover:text-[#211C19] relative py-1 transition-colors group cursor-pointer"
              >
                <span>SCENT FINDER</span>
                <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#B69A69] transition-all duration-300 group-hover:w-full" />
              </button>
            </nav>

            {/* RIGHT: SEARCH, ACCOUNT, WISHLIST, BAG */}
            <div className="flex items-center gap-1.5 sm:gap-3 text-[#211C19]">
              {/* Search */}
              <button
                type="button"
                onClick={onOpenSearch}
                className="p-2 text-[#211C19] hover:text-[#B69A69] transition-colors cursor-pointer"
                aria-label="Search Fragrances"
                title="Search Fragrances"
              >
                <Search size={18} strokeWidth={1.5} />
              </button>

              {/* Account (Hidden on small mobile) */}
              <button
                type="button"
                onClick={onOpenAccount}
                className="hidden sm:block p-2 text-[#211C19] hover:text-[#B69A69] transition-colors cursor-pointer"
                aria-label="Connoisseur Account"
                title="My Account"
              >
                <User size={18} strokeWidth={1.5} />
              </button>

              {/* Wishlist */}
              <button
                type="button"
                onClick={onOpenWishlist}
                className="hidden sm:block p-2 text-[#211C19] hover:text-[#B69A69] transition-colors relative cursor-pointer"
                aria-label="Wishlist"
                title="Wishlist"
              >
                <Heart size={18} strokeWidth={1.5} />
                {wishlistCount > 0 && (
                  <span className="absolute top-1 right-1 w-3.5 h-3.5 rounded-full bg-[#B69A69] text-[#211C19] text-[9px] font-bold flex items-center justify-center">
                    {wishlistCount}
                  </span>
                )}
              </button>

              {/* Bag */}
              <button
                type="button"
                onClick={onOpenBag}
                className="p-2 text-[#211C19] hover:text-[#B69A69] transition-colors relative cursor-pointer flex items-center gap-1"
                aria-label="Shopping Bag"
                title="Shopping Bag"
              >
                <ShoppingBag size={18} strokeWidth={1.5} />
                {cartCount > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-[#211C19] text-[#F5F0E8] text-[9px] font-bold flex items-center justify-center tabular-nums">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* =================================================================== */}
      {/* MOBILE SLIDE-OUT DRAWER (SECTION 35) */}
      {/* =================================================================== */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden bg-[#211C19]/60 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="fixed inset-y-0 left-0 max-w-xs w-full glass-drawer p-6 flex flex-col justify-between animate-in slide-in-from-left duration-400">
            <div>
              {/* Header */}
              <div className="flex items-center justify-between pb-6 border-b border-[#D8C9B5]/40">
                <span className="font-serif text-lg tracking-[0.2em] font-medium text-[#211C19]">
                  MAISON KIYORA
                </span>
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1.5 text-[#8C8175] hover:text-[#211C19]"
                >
                  <X size={20} strokeWidth={1.5} />
                </button>
              </div>

              {/* Navigation Links */}
              <nav className="py-6 space-y-5 text-sm font-sans tracking-[0.2em] uppercase text-[#211C19]">
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onNavigateShop();
                  }}
                  className="block w-full text-left py-1 hover:text-[#B69A69] transition-colors"
                >
                  SHOP
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onNavigateShop();
                  }}
                  className="block w-full text-left py-1 hover:text-[#B69A69] transition-colors"
                >
                  COLLECTIONS
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenStory();
                  }}
                  className="block w-full text-left py-1 hover:text-[#B69A69] transition-colors"
                >
                  OUR STORY
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenScentFinder();
                  }}
                  className="block w-full text-left py-1 hover:text-[#B69A69] transition-colors"
                >
                  SCENT FINDER
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenWishlist();
                  }}
                  className="flex items-center justify-between w-full text-left py-1 hover:text-[#B69A69] transition-colors"
                >
                  <span>WISHLIST</span>
                  {wishlistCount > 0 && (
                    <span className="text-xs px-2 py-0.5 rounded-full bg-[#B69A69] text-[#211C19] font-bold">
                      {wishlistCount}
                    </span>
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenAccount();
                  }}
                  className="block w-full text-left py-1 hover:text-[#B69A69] transition-colors"
                >
                  MY ACCOUNT
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onNavigateTrackOrder();
                  }}
                  className="block w-full text-left py-1 hover:text-[#B69A69] transition-colors"
                >
                  TRACK ORDER
                </button>
              </nav>
            </div>

            {/* Footer coords */}
            <div className="pt-6 border-t border-[#D8C9B5]/40 text-xs text-[#8C8175] space-y-1">
              <p className="font-serif italic text-sm text-[#211C19]">Maison Kiyora Haute Parfumerie</p>
              <p>Paris · Grasse · New Delhi</p>
              <p className="text-[11px] pt-1">concierge@maisonkiyora.com</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
