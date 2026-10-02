import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { Lock, ArrowRight, ShieldCheck } from 'lucide-react';

interface AdminLoginProps {
  onLoginSuccess: () => void;
  onNavigateStore: () => void;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({ onLoginSuccess, onNavigateStore }) => {
  const { loginAdmin } = useStore();
  const [email, setEmail] = useState('admin@maisonkiyora.com');
  const [password, setPassword] = useState('atelier2026');
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const success = loginAdmin(email, password);
    if (success) {
      onLoginSuccess();
    } else {
      setError('Invalid atelier credentials. Please check your email and password.');
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F0E8] flex flex-col justify-between p-4 sm:p-6 font-sans">
      {/* Top Header */}
      <div className="flex items-center justify-between max-w-6xl mx-auto w-full pt-4">
        <span className="font-serif text-lg tracking-[0.2em] text-[#211C19] font-medium">
          MAISON KIYORA
        </span>
        <button
          type="button"
          onClick={onNavigateStore}
          className="text-xs font-sans tracking-wider uppercase text-[#8C8175] hover:text-[#211C19] flex items-center gap-1.5 cursor-pointer"
        >
          <span>Return to Boutique</span>
          <ArrowRight size={13} />
        </button>
      </div>

      {/* Centered Glass Login Card */}
      <div className="max-w-md w-full mx-auto my-auto py-10 animate-in fade-in duration-300">
        <div className="bg-white/70 backdrop-blur-xl border border-[#D8C9B5]/70 rounded-xs p-8 sm:p-10 shadow-xl">
          <div className="text-center mb-8">
            <span className="text-[10px] font-sans tracking-[0.25em] uppercase text-[#B69A69] font-semibold block mb-1">
              STORE MANAGEMENT SYSTEM
            </span>
            <h1 className="font-serif text-3xl text-[#211C19] font-normal">
              WELCOME BACK
            </h1>
            <p className="text-xs text-[#8C8175] font-light mt-1.5">
              Enter your atelier credentials to manage boutique operations.
            </p>
          </div>

          {error && (
            <div className="mb-5 p-3 rounded-xs bg-[#942b41]/10 border border-[#942b41]/30 text-xs text-[#942b41] text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-[11px] font-sans uppercase tracking-widest text-[#8C8175] mb-1.5 font-medium">
                Atelier Email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3.5 py-2.5 text-xs bg-white border border-[#D8C9B5] text-[#211C19] rounded-xs focus:border-[#211C19] focus:outline-hidden transition-colors"
                placeholder="admin@maisonkiyora.com"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-[11px] font-sans uppercase tracking-widest text-[#8C8175] font-medium">
                  Password
                </label>
                <button
                  type="button"
                  onClick={() => alert('Password recovery link dispatched to administrative email.')}
                  className="text-[10px] text-[#8C8175] hover:text-[#211C19] underline cursor-pointer"
                >
                  Forgot password?
                </button>
              </div>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3.5 py-2.5 text-xs bg-white border border-[#D8C9B5] text-[#211C19] rounded-xs focus:border-[#211C19] focus:outline-hidden transition-colors"
                placeholder="••••••••"
              />
            </div>

            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-2 text-xs text-[#312A26] cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="accent-[#211C19] rounded-2xs"
                />
                <span>Remember me</span>
              </label>
              <span className="text-[10px] text-[#8C8175]">Owner & Admin Access</span>
            </div>

            <button
              type="submit"
              className="w-full btn-luxury-primary text-xs py-3.5 tracking-[0.2em] cursor-pointer mt-4"
            >
              SIGN IN TO ATELIER
            </button>
          </form>

          <div className="mt-8 pt-4 border-t border-[#D8C9B5]/40 text-center text-[11px] text-[#8C8175] flex items-center justify-center gap-1.5">
            <ShieldCheck size={14} className="text-[#B69A69]" />
            <span>Maison Kiyora Private Administrative Network</span>
          </div>
        </div>
      </div>

      {/* Footer copyright */}
      <div className="text-center text-[11px] font-sans text-[#8C8175] pb-2">
        © 2026 Maison Kiyora Haute Parfumerie · Operational Console
      </div>
    </div>
  );
};
