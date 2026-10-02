import React from 'react';
import { ArrowUp } from 'lucide-react';

interface FooterProps {
  onNavigateHome: () => void;
  onNavigateShop: () => void;
  onNavigateWishlist: () => void;
  onNavigateAccount: () => void;
  onNavigateTrackOrder: () => void;
  onOpenStory: () => void;
  onOpenScentFinder: () => void;
  onOpenCustomerCare: (topic: string) => void;
  onNavigateAdmin?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigateHome,
  onNavigateShop,
  onNavigateWishlist,
  onNavigateAccount,
  onNavigateTrackOrder,
  onOpenStory,
  onOpenScentFinder,
  onOpenCustomerCare,
  onNavigateAdmin,
}) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#211C19] text-[#F5F0E8] pt-20 pb-12 border-t border-[#B69A69]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 pb-16 border-b border-white/10">
          {/* Brand Col */}
          <div className="lg:col-span-4 flex flex-col items-start">
            <button
              type="button"
              onClick={onNavigateHome}
              className="text-xl sm:text-2xl font-serif tracking-[0.2em] text-[#F5F0E8] mb-4 text-left cursor-pointer"
            >
              MAISON KIYORA
            </button>
            <p className="text-xs font-sans text-[#D8C9B5]/80 font-light leading-relaxed max-w-sm mb-6">
              Haute Parfumerie. Formulated with rare essences from Grasse, Kashmir, and Florence, bottled in architectural heavy crystal at 28% concentration.
            </p>
            <p className="text-[11px] font-sans text-[#B69A69] tracking-widest uppercase">
              PARIS · NEW DELHI
            </p>
          </div>

          {/* Nav Links */}
          <div className="lg:col-span-2">
            <p className="text-[10px] font-sans tracking-[0.24em] uppercase text-[#B69A69] mb-4 font-semibold">
              EXPLORE
            </p>
            <ul className="space-y-3 text-xs font-sans text-[#D8C9B5]/80">
              <li>
                <button
                  type="button"
                  onClick={onNavigateShop}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  SHOP
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={onNavigateShop}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  COLLECTIONS
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={onOpenStory}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  OUR STORY
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={onOpenScentFinder}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  SCENT FINDER
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={onNavigateWishlist}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  WISHLIST
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={onNavigateTrackOrder}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  TRACK ORDER
                </button>
              </li>
            </ul>
          </div>

          {/* Customer Care */}
          <div className="lg:col-span-3">
            <p className="text-[10px] font-sans tracking-[0.24em] uppercase text-[#B69A69] mb-4 font-semibold">
              CUSTOMER CARE
            </p>
            <ul className="space-y-3 text-xs font-sans text-[#D8C9B5]/80">
              {['Shipping', 'Returns', 'FAQ', 'Privacy', 'Terms'].map((item) => (
                <li key={item}>
                  <button
                    type="button"
                    onClick={() => onOpenCustomerCare(item)}
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    {item}
                  </button>
                </li>
              ))}
              <li>
                <button
                  type="button"
                  onClick={() => onOpenCustomerCare('Contact')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Contact Concierge
                </button>
              </li>
            </ul>
          </div>

          {/* Social & Concierge */}
          <div className="lg:col-span-3">
            <p className="text-[10px] font-sans tracking-[0.24em] uppercase text-[#B69A69] mb-4 font-semibold">
              SOCIAL
            </p>
            <div className="flex items-center gap-4 text-xs font-sans text-[#D8C9B5]/80 mb-6">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="hover:text-white transition-colors tracking-wider"
              >
                Instagram
              </a>
              <span className="text-[#8C8175]">·</span>
              <a
                href="https://pinterest.com"
                target="_blank"
                rel="noreferrer"
                className="hover:text-white transition-colors tracking-wider"
              >
                Pinterest
              </a>
              <span className="text-[#8C8175]">·</span>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="hover:text-white transition-colors tracking-wider"
              >
                Facebook
              </a>
            </div>

            <p className="text-[10px] font-sans tracking-[0.24em] uppercase text-[#B69A69] mb-2 font-semibold">
              CONCIERGE DIRECT
            </p>
            <p className="text-xs text-[#D8C9B5]/70 font-light mb-1">
              atelier@maisonkiyora.com
            </p>
            <p className="text-xs text-[#D8C9B5]/70 font-light mb-4">
              Mon – Fri, 9am – 6pm CET
            </p>

            <div className="flex flex-col gap-2">
              <button
                type="button"
                onClick={onNavigateAccount}
                className="text-xs text-[#B69A69] hover:underline text-left cursor-pointer"
              >
                Customer Account Portal →
              </button>
              {onNavigateAdmin && (
                <button
                  type="button"
                  onClick={onNavigateAdmin}
                  className="text-xs text-[#D8C9B5]/80 hover:text-white hover:underline text-left cursor-pointer flex items-center gap-1.5"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#B69A69]" />
                  <span>Atelier Console (Admin) →</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Line */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-sans text-[#8C8175]">
          <p>© 2026 Maison Kiyora. All rights reserved.</p>

          <div className="flex items-center gap-6">
            {onNavigateAdmin && (
              <button
                type="button"
                onClick={onNavigateAdmin}
                className="text-[#8C8175] hover:text-[#B69A69] transition-colors cursor-pointer"
              >
                Atelier Operations
              </button>
            )}
            <button
              type="button"
              onClick={scrollToTop}
              className="flex items-center gap-1.5 text-[#D8C9B5] hover:text-white transition-colors group cursor-pointer"
            >
              <span>BACK TO TOP</span>
              <ArrowUp size={12} className="transition-transform group-hover:-translate-y-0.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
