import React from 'react';
import { Check, Heart, Trash2, Tag, Info } from 'lucide-react';

export interface ToastItem {
  id: string;
  message: string;
  type?: 'bag' | 'wishlist' | 'remove' | 'promo' | 'info';
}

interface ToastProps {
  toasts: ToastItem[];
  onDismiss: (id: string) => void;
}

export const ToastContainer: React.FC<ToastProps> = ({ toasts, onDismiss }) => {
  if (toasts.length === 0) return null;

  return (
    <div className="fixed top-20 right-4 sm:right-8 z-50 flex flex-col gap-2.5 max-w-sm pointer-events-none">
      {toasts.map((toast) => {
        let Icon = Check;
        if (toast.type === 'wishlist') Icon = Heart;
        if (toast.type === 'remove') Icon = Trash2;
        if (toast.type === 'promo') Icon = Tag;

        return (
          <div
            key={toast.id}
            onClick={() => onDismiss(toast.id)}
            className="pointer-events-auto p-3.5 rounded-xs bg-[#211C19]/90 backdrop-blur-md text-[#F5F0E8] border border-[#B69A69]/40 shadow-xl flex items-center gap-3 text-xs font-sans tracking-wide animate-in fade-in slide-in-from-top-3 duration-300 cursor-pointer hover:bg-[#211C19]"
          >
            <div className="w-5 h-5 rounded-full bg-[#B69A69]/20 text-[#B69A69] flex items-center justify-center shrink-0">
              <Icon size={12} strokeWidth={2.5} />
            </div>
            <p className="flex-1 font-light">{toast.message}</p>
          </div>
        );
      })}
    </div>
  );
};
