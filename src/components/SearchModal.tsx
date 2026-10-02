import React, { useState, useEffect, useRef } from 'react';
import { Product } from '../types';
import { PerfumeBottleVisual } from './PerfumeBottleVisual';
import { Search, X, ArrowRight } from 'lucide-react';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onSelectProduct: (product: Product) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  products,
  onSelectProduct,
}) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const results =
    query.trim() === ''
      ? []
      : products.filter(
          (p) =>
            p.name.toLowerCase().includes(query.toLowerCase()) ||
            p.classification.toLowerCase().includes(query.toLowerCase()) ||
            p.description.toLowerCase().includes(query.toLowerCase()) ||
            p.topNotes.some((n) => n.toLowerCase().includes(query.toLowerCase())) ||
            p.heartNotes.some((n) => n.toLowerCase().includes(query.toLowerCase())) ||
            p.baseNotes.some((n) => n.toLowerCase().includes(query.toLowerCase()))
        );

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-[#211C19]/60 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-[#F5F0E8] border border-[#B69A69]/40 rounded-xs shadow-2xl p-6 sm:p-8">
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 pb-4 border-b border-[#D8C9B5]/60">
          <Search size={20} className="text-[#B69A69]" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by fragrance, note (e.g. Raspberry, Oud, Rose), or mood..."
            className="flex-1 text-sm sm:text-base font-sans bg-transparent text-[#211C19] placeholder:text-[#8C8175] focus:outline-hidden"
          />
          <button
            type="button"
            onClick={onClose}
            className="p-1 text-[#8C8175] hover:text-[#211C19]"
            aria-label="Close search"
          >
            <X size={20} />
          </button>
        </div>

        {/* Quick Suggestion Pills */}
        {query.trim() === '' && (
          <div className="pt-6">
            <p className="text-[10px] font-sans tracking-[0.2em] uppercase text-[#8C8175] mb-3">
              POPULAR DISCOVERIES
            </p>
            <div className="flex flex-wrap gap-2 text-xs font-sans">
              {['Oody Raspberry', 'Santal Blanc', 'Rose Impériale', 'Oud', 'Sandalwood', 'Vanilla'].map((term) => (
                <button
                  key={term}
                  type="button"
                  onClick={() => setQuery(term)}
                  className="px-3 py-1.5 rounded-xs bg-white/60 hover:bg-white text-[#211C19] border border-[#D8C9B5]/60 transition-colors"
                >
                  {term}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Results List */}
        {query.trim() !== '' && (
          <div className="pt-4 max-h-[60vh] overflow-y-auto space-y-3">
            {results.length === 0 ? (
              <p className="text-sm text-[#8C8175] py-8 text-center font-light">
                No creations found for "{query}". Try searching by note like 'Raspberry' or 'Oud'.
              </p>
            ) : (
              results.map((product) => (
                <div
                  key={product.id}
                  onClick={() => {
                    onSelectProduct(product);
                    onClose();
                  }}
                  className="flex items-center justify-between p-3 rounded-xs bg-white/40 hover:bg-white border border-[#D8C9B5]/40 transition-all cursor-pointer group"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-14 bg-white/80 rounded-xs flex items-center justify-center shrink-0 border border-[#D8C9B5]/30">
                      <PerfumeBottleVisual
                        name={product.name}
                        size="sm"
                        className="w-10 h-12"
                        interactive={false}
                      />
                    </div>
                    <div>
                      <h4 className="font-serif text-base text-[#211C19] group-hover:text-[#B69A69] transition-colors">
                        {product.name}
                      </h4>
                      <p className="text-xs text-[#8C8175]">
                        {product.classification}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-xs font-sans font-medium text-[#211C19] tabular-nums">
                      ₹{product.price.toLocaleString('en-IN')}
                    </span>
                    <ArrowRight size={14} className="text-[#8C8175] group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};
