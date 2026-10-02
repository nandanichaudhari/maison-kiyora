import React, { useState } from 'react';
import { FRAGRANCE_NOTES } from '../data/products';

export const FragranceNotes: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'Top' | 'Heart' | 'Base'>('Top');

  const filteredNotes = FRAGRANCE_NOTES.filter((note) => note.category === activeTab);

  const renderNoteVisual = (type: string) => {
    switch (type) {
      case 'berry':
        return (
          <svg viewBox="0 0 100 100" className="w-10 h-10 text-[#8a2b38]" fill="currentColor">
            <circle cx="42" cy="48" r="14" fill="#a83248" />
            <circle cx="58" cy="46" r="13" fill="#8a2337" />
            <circle cx="50" cy="62" r="15" fill="#691626" />
            <circle cx="36" cy="64" r="11" fill="#8a2337" />
            <circle cx="64" cy="62" r="11" fill="#54121d" />
            <path d="M50 34 Q 48 20 40 16" stroke="#4a5d3e" strokeWidth="2.5" fill="none" strokeLinecap="round" />
            <path d="M46 26 Q 34 24 32 30 Q 40 32 46 26" fill="#586e4a" />
          </svg>
        );
      case 'spice':
        return (
          <svg viewBox="0 0 100 100" className="w-10 h-10 text-[#B69A69]" fill="none" stroke="currentColor">
            <path d="M28 78 Q 45 40 72 26" stroke="#c49a5c" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M38 82 Q 52 48 76 34" stroke="#a07a40" strokeWidth="2" strokeLinecap="round" />
            <circle cx="72" cy="26" r="2.5" fill="#c49a5c" />
            <circle cx="76" cy="34" r="2" fill="#a07a40" />
          </svg>
        );
      case 'flower':
        return (
          <svg viewBox="0 0 100 100" className="w-10 h-10" fill="none">
            <circle cx="50" cy="50" r="8" fill="#B69A69" fillOpacity="0.5" />
            <path d="M50 28 C42 38 42 46 50 48 C58 46 58 38 50 28 Z" fill="#b34055" fillOpacity="0.8" />
            <path d="M72 50 C62 42 54 42 52 50 C54 58 62 58 72 50 Z" fill="#a83248" fillOpacity="0.8" />
            <path d="M50 72 C58 62 58 54 50 52 C42 54 42 62 50 72 Z" fill="#852737" fillOpacity="0.8" />
            <path d="M28 50 C38 58 46 58 48 50 C46 42 38 42 28 50 Z" fill="#942b41" fillOpacity="0.8" />
          </svg>
        );
      case 'wood':
        return (
          <svg viewBox="0 0 100 100" className="w-10 h-10" fill="none">
            <ellipse cx="50" cy="50" rx="34" ry="22" stroke="#7d5822" strokeWidth="2" />
            <ellipse cx="50" cy="50" rx="24" ry="15" stroke="#9a7134" strokeWidth="1.8" />
            <circle cx="50" cy="50" r="3.5" fill="#52331f" />
          </svg>
        );
      case 'vanilla':
        return (
          <svg viewBox="0 0 100 100" className="w-10 h-10" fill="none">
            <path d="M30 84 Q 45 50 68 20 Q 72 16 76 18 Q 72 26 50 65 Q 38 84 30 84 Z" fill="#312217" />
            <circle cx="68" cy="22" r="3" fill="#B69A69" />
          </svg>
        );
      case 'citrus':
        return (
          <svg viewBox="0 0 100 100" className="w-10 h-10" fill="none">
            <circle cx="50" cy="50" r="30" stroke="#8C734B" strokeWidth="1.8" fill="#FAF5E8" />
            <circle cx="50" cy="50" r="26" stroke="#B69A69" strokeWidth="1" strokeDasharray="3 3" />
            <path d="M50 24 L 50 76 M 24 50 L 76 50" stroke="#B69A69" strokeWidth="1" />
          </svg>
        );
      default:
        return (
          <div className="w-8 h-8 rounded-full bg-[#B69A69]/20 flex items-center justify-center font-serif text-xs text-[#B69A69]">
            MK
          </div>
        );
    }
  };

  return (
    <section id="fragrance-notes" className="py-20 sm:py-28 bg-[#F5F0E8] border-t border-[#D8C9B5]/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12 border-b border-[#D8C9B5]/40 pb-6">
          <div>
            <span className="text-[10px] font-sans tracking-[0.26em] uppercase text-[#B69A69] font-semibold block mb-2">
              RAW INGREDIENT ARCHITECTURE
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#211C19]">
              FRAGRANCE NOTES
            </h2>
          </div>

          {/* Smooth Animated Tabs (Section 17) */}
          <div className="flex items-center gap-6 sm:gap-8">
            {(['Top', 'Heart', 'Base'] as const).map((tab) => {
              const isActive = activeTab === tab;
              const title = tab === 'Top' ? 'TOP NOTES' : tab === 'Heart' ? 'HEART NOTES' : 'BASE NOTES';
              return (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveTab(tab)}
                  className={`relative py-1.5 text-xs font-sans tracking-[0.22em] uppercase transition-colors cursor-pointer ${
                    isActive ? 'text-[#211C19] font-semibold' : 'text-[#8C8175] hover:text-[#211C19]'
                  }`}
                >
                  <span>{title}</span>
                  <span
                    className={`absolute bottom-0 left-0 h-[1.5px] bg-[#B69A69] transition-all duration-400 ease-out ${
                      isActive ? 'w-full' : 'w-0'
                    }`}
                  />
                </button>
              );
            })}
          </div>
        </div>

        {/* Minimal Ingredient Grid (Section 17: ingredient image, ingredient name, small category) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 animate-in fade-in duration-400">
          {filteredNotes.map((note) => (
            <div
              key={note.name}
              className="p-6 rounded-xs bg-[#FAF8F5]/80 backdrop-blur-md border border-[#D8C9B5]/50 flex flex-col items-center text-center space-y-3 group hover:border-[#B69A69]/60 transition-all duration-500"
            >
              {/* Ingredient Visual */}
              <div className="w-16 h-16 rounded-full bg-[#F5F0E8] border border-[#D8C9B5]/40 flex items-center justify-center group-hover:scale-105 transition-transform duration-500">
                {renderNoteVisual(note.iconType)}
              </div>

              {/* Ingredient Name */}
              <h3 className="font-serif text-base text-[#211C19] font-medium tracking-wide">
                {note.name}
              </h3>

              {/* Small Category */}
              <span className="text-[10px] font-sans tracking-[0.2em] uppercase text-[#8C8175] block">
                {note.origin}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
