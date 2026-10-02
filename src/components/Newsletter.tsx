import React, { useState } from 'react';
import { Check, ArrowRight } from 'lucide-react';

export const Newsletter: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && email.includes('@')) {
      setIsSubmitted(true);
    }
  };

  return (
    <section className="py-20 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto text-center">
        <span className="text-[10px] font-sans tracking-[0.24em] uppercase text-[#B69A69] font-semibold mb-2 block">
          THE KIYORA CIRCLE
        </span>

        <h2 className="font-serif text-3xl sm:text-4xl text-[#211C19] mb-3">
          JOIN THE JOURNEY
        </h2>

        <p className="text-sm sm:text-base text-[#312A26]/80 font-light mb-8">
          New scents, stories and launches.
        </p>

        {isSubmitted ? (
          <div className="p-6 rounded-xs bg-[#E3D7C7]/40 border border-[#B69A69]/40 animate-in fade-in duration-300">
            <div className="flex items-center justify-center gap-2 text-[#211C19] mb-1">
              <Check size={16} className="text-[#B69A69]" />
              <p className="font-serif text-lg">Bienvenue to the Circle</p>
            </div>
            <p className="text-xs text-[#8C8175] font-light">
              Use code <span className="font-medium text-[#211C19] tracking-wider">KIYORA10</span> for 10% privilege on your first flacon.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-center gap-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address"
              required
              className="w-full sm:flex-1 px-5 py-3.5 text-xs font-sans bg-white/60 backdrop-blur-md border border-[#D8C9B5] focus:border-[#211C19] text-[#211C19] placeholder:text-[#8C8175] focus:outline-hidden transition-colors rounded-xs shadow-2xs"
            />
            <button
              type="submit"
              className="w-full sm:w-auto px-8 py-3.5 text-xs font-sans tracking-[0.2em] uppercase bg-[#211C19] hover:bg-[#312A26] text-[#F5F0E8] font-medium transition-colors flex items-center justify-center gap-2 whitespace-nowrap cursor-pointer rounded-xs shadow-md"
            >
              <span>SUBSCRIBE</span>
              <ArrowRight size={13} className="text-[#B69A69]" />
            </button>
          </form>
        )}
      </div>
    </section>
  );
};
