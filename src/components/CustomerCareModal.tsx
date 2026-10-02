import React from 'react';
import { X, ShieldCheck, Truck, RotateCcw, Mail, HelpCircle } from 'lucide-react';

interface CustomerCareModalProps {
  isOpen: boolean;
  topic: string;
  onClose: () => void;
}

export const CustomerCareModal: React.FC<CustomerCareModalProps> = ({
  isOpen,
  topic,
  onClose,
}) => {
  if (!isOpen) return null;

  const getContent = () => {
    switch (topic) {
      case 'Shipping':
        return {
          title: 'Complimentary Express Shipping',
          icon: Truck,
          body: (
            <div className="space-y-4 text-xs sm:text-sm text-[#312A26] font-light leading-relaxed">
              <p>
                Every Maison Kiyora creation is packaged within our temperature-regulated flacon vault and dispatched via insured air express.
              </p>
              <ul className="list-disc pl-5 space-y-1.5 text-xs text-[#8C8175]">
                <li>Complimentary courier on all orders over ₹6,000.</li>
                <li>Standard delivery window: 2 to 4 business days nationwide.</li>
                <li>Each package is tamper-evident and wax-sealed with a unique tracking seal.</li>
              </ul>
            </div>
          ),
        };
      case 'Returns':
        return {
          title: 'The Risk-Free Olfactory Guarantee',
          icon: RotateCcw,
          body: (
            <div className="space-y-4 text-xs sm:text-sm text-[#312A26] font-light leading-relaxed">
              <p>
                To ensure complete peace of mind, every full-size 100ml flacon includes a complimentary matching 2ml sample vial.
              </p>
              <p>
                Please test the 2ml sample on clean skin first. If the scent does not harmonize with your chemistry, you may return the unopened, sealed 100ml flacon within 14 days for a full refund or exchange.
              </p>
            </div>
          ),
        };
      case 'FAQ':
        return {
          title: 'Frequently Asked Questions',
          icon: HelpCircle,
          body: (
            <div className="space-y-4 text-xs sm:text-sm text-[#312A26] font-light leading-relaxed">
              <div>
                <strong className="text-[#211C19] font-medium block">What concentration do you use?</strong>
                <p className="text-xs text-[#8C8175] mt-0.5">
                  All Maison Kiyora perfumes are formulated as Extrait de Parfum at 28% oil concentration.
                </p>
              </div>
              <div>
                <strong className="text-[#211C19] font-medium block">Are the ingredients sustainably sourced?</strong>
                <p className="text-xs text-[#8C8175] mt-0.5">
                  Yes, our Australian sandalwood is certified plantation-grown, and our orris is harvested responsibly in Tuscany.
                </p>
              </div>
              <div>
                <strong className="text-[#211C19] font-medium block">How long will a 100ml flacon last?</strong>
                <p className="text-xs text-[#8C8175] mt-0.5">
                  With 2 to 3 sprays per wear, a 100ml flacon provides approximately 850 sprays (over 8 months of daily use).
                </p>
              </div>
            </div>
          ),
        };
      default:
        return {
          title: topic || 'Maison Kiyora Concierge',
          icon: Mail,
          body: (
            <div className="space-y-4 text-xs sm:text-sm text-[#312A26] font-light leading-relaxed">
              <p>
                Our perfume consultants and atelier concierges are available to assist you with scent consultations, custom gifting, and private commissions.
              </p>
              <div className="p-4 bg-white/70 rounded-xs border border-[#D8C9B5] text-xs space-y-1">
                <p><strong>Concierge Email:</strong> concierge@maisonkiyora.com</p>
                <p><strong>Atelier Line:</strong> +91 11 4982 0100</p>
                <p><strong>Hours:</strong> Monday – Saturday, 10:00 AM – 7:00 PM IST</p>
              </div>
            </div>
          ),
        };
    }
  };

  const { title, icon: Icon, body } = getContent();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#211C19]/60 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-[#F5F0E8] border border-[#B69A69]/40 rounded-xs shadow-2xl p-6 sm:p-8">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 text-[#8C8175] hover:text-[#211C19]"
          aria-label="Close"
        >
          <X size={20} />
        </button>

        <div className="flex items-center gap-3 mb-4 pb-3 border-b border-[#D8C9B5]/50">
          <div className="p-2 rounded-full bg-[#B69A69]/20 text-[#B69A69]">
            <Icon size={18} />
          </div>
          <div>
            <span className="text-[10px] font-sans tracking-[0.2em] uppercase text-[#8C8175]">
              CUSTOMER CARE
            </span>
            <h3 className="font-serif text-xl text-[#211C19]">{title}</h3>
          </div>
        </div>

        <div className="py-2">{body}</div>

        <div className="pt-6 mt-4 border-t border-[#D8C9B5]/40 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="btn-luxury-primary text-xs py-2 px-6"
          >
            CLOSE
          </button>
        </div>
      </div>
    </div>
  );
};
