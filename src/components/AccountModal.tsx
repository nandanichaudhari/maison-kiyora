import React, { useState } from 'react';
import { X, User, Package, Heart, Sparkles, LogIn } from 'lucide-react';

interface AccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenWishlist: () => void;
}

export const AccountModal: React.FC<AccountModalProps> = ({
  isOpen,
  onClose,
  onOpenWishlist,
}) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  if (!isOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsLoggedIn(true);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#211C19]/60 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-[#F5F0E8] border border-[#B69A69]/40 rounded-xs shadow-2xl p-6 sm:p-8">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 text-[#8C8175] hover:text-[#211C19]"
          aria-label="Close"
        >
          <X size={20} />
        </button>

        {!isLoggedIn ? (
          <div>
            <div className="text-center mb-6">
              <span className="text-[10px] font-sans tracking-[0.24em] uppercase text-[#8C8175] font-medium">
                MAISON KIYORA CIRCLE
              </span>
              <h3 className="font-serif text-2xl text-[#211C19] mt-1">
                Connoisseur Sign In
              </h3>
              <p className="text-xs text-[#8C8175] font-light mt-1">
                Access your private reservations, fragrance archives, and bespoke order status.
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-[11px] font-sans uppercase tracking-wider text-[#8C8175] mb-1">
                  Email
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="atelier@maisonkiyora.com"
                  className="w-full px-3 py-2 text-xs bg-white border border-[#D8C9B5] text-[#211C19] rounded-xs"
                />
              </div>

              <div>
                <label className="block text-[11px] font-sans uppercase tracking-wider text-[#8C8175] mb-1">
                  Password
                </label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-3 py-2 text-xs bg-white border border-[#D8C9B5] text-[#211C19] rounded-xs"
                />
              </div>

              <button
                type="submit"
                className="w-full btn-luxury-primary text-xs py-3 mt-2 cursor-pointer flex items-center justify-center gap-2"
              >
                <LogIn size={14} />
                <span>SIGN IN TO BOUTIQUE</span>
              </button>
            </form>

            <div className="mt-6 pt-4 border-t border-[#D8C9B5]/40 text-center">
              <p className="text-xs text-[#8C8175]">
                New to Maison Kiyora? Sign in seamlessly with your email to track any placement.
              </p>
            </div>
          </div>
        ) : (
          <div className="text-center">
            <div className="w-12 h-12 rounded-full bg-[#B69A69]/20 border border-[#B69A69] text-[#B69A69] flex items-center justify-center mx-auto mb-3">
              <Sparkles size={20} />
            </div>
            <span className="text-[10px] font-sans tracking-[0.24em] uppercase text-[#8C8175]">
              WELCOME BACK
            </span>
            <h3 className="font-serif text-2xl text-[#211C19] mt-1 mb-4">
              {email.split('@')[0]}
            </h3>

            <div className="space-y-2 text-left text-xs mb-6">
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onOpenWishlist();
                }}
                className="w-full p-3 rounded-xs border border-[#D8C9B5] bg-white flex items-center justify-between hover:border-[#B69A69]"
              >
                <div className="flex items-center gap-2">
                  <Heart size={14} className="text-[#B69A69]" />
                  <span>My Saved Flacons</span>
                </div>
                <span>→</span>
              </button>

              <div className="p-3 rounded-xs border border-[#D8C9B5] bg-white flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Package size={14} className="text-[#B69A69]" />
                  <span>Recent Shipments</span>
                </div>
                <span className="text-[#8C8175]">None active</span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsLoggedIn(false)}
              className="text-xs text-[#8C8175] hover:text-[#211C19] underline"
            >
              Sign out
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
