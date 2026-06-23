// File: src/components/BentoGrid.tsx
import React from 'react';
import { Product } from '../types';

interface BentoGridProps {
  isDarkMode: boolean;
  onAddToCart: (p: Product, shade: string | null) => void;
  onWorkshopOpen: () => void;
  onVideoOpen: () => void;
  onChatbotOpen: () => void;
}

export default function BentoGrid({ 
  isDarkMode,
  onAddToCart, 
  onWorkshopOpen, 
  onVideoOpen, 
  onChatbotOpen 
}: BentoGridProps) {
  const bgPrimary = isDarkMode ? 'bg-[#1c1917]' : 'bg-[#f5f5f4]';
  const bgSecondary = isDarkMode ? 'bg-zinc-900' : 'bg-white';
  const textPrimary = isDarkMode ? 'text-white' : 'text-[#1c1917]';
  const textSecondary = isDarkMode ? 'text-[#e7e5e4]' : 'text-zinc-600';
  const border = isDarkMode ? 'border-white/5' : 'border-black/5';
  const hoverBorder = isDarkMode ? 'hover:border-white/20' : 'hover:border-black/20';

  return (
    <section id="bento-modules" className="space-y-6 animate-fade-in">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        
        <div className={`md:col-span-8 ${bgPrimary} border ${border} p-12 flex flex-col justify-between relative ${hoverBorder} transition-all duration-700`}>
          <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-zinc-400">Masterclasses</span>
          <div className="space-y-4 mt-6">
            <h3 className={`text-3xl font-serif font-light ${textPrimary}`}>1-on-1 Pretoria Makeup Workshops</h3>
            <p className={`text-sm ${textSecondary} max-w-md leading-relaxed tracking-wide`}>
              Book personal training with founder Marcia Kgaphola in Pretoria. Secure hands-on instruction customized for your skin type.
            </p>
          </div>
          <button onClick={onWorkshopOpen} className={`mt-8 w-fit px-8 py-3 border ${isDarkMode ? 'border-white/20 text-white hover:bg-white hover:text-black' : 'border-black/20 text-black hover:bg-black hover:text-white'} text-[10px] font-semibold uppercase tracking-[0.2em] transition-colors duration-500`}>
            Book Pretoria Class
          </button>
        </div>

        <div className={`md:col-span-4 ${bgSecondary} border ${border} p-10 flex flex-col justify-between ${hoverBorder} transition-all duration-700`}>
          <div className="flex justify-between items-start">
            <span className={`text-[10px] font-mono px-3 py-1 ${isDarkMode ? 'bg-white/5 text-zinc-300' : 'bg-black/5 text-zinc-700'}`}>Top-Seller</span>
            <span className={`text-sm font-medium ${textPrimary}`}>R 350.00</span>
          </div>
          <div className="space-y-2 my-6">
            <h4 className={`font-serif text-xl font-light ${textPrimary}`}>3-in-1 HD Liquid Foundation</h4>
            <p className={`text-[11px] ${textSecondary} leading-relaxed tracking-wide`}>Primer, Concealer, and UV-mineral SPF shield.</p>
          </div>
          <button 
            onClick={() => onAddToCart({ id: 'p1', name: '3-in-1 HD Liquid Foundation', category: 'Face', price: 350, desc: '', swatches: [] }, '#03')}
            className={`w-full py-3 ${isDarkMode ? 'bg-white text-black hover:bg-zinc-200' : 'bg-black text-white hover:bg-zinc-800'} text-[10px] font-semibold uppercase tracking-[0.2em] transition-colors duration-500`}
          >
            Quick Bag Add
          </button>
        </div>

        <div className={`md:col-span-5 ${bgPrimary} border ${border} p-10 flex flex-col justify-between ${hoverBorder} transition-all duration-700 delay-100`}>
          <div className="space-y-4">
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-zinc-400">Direct Commission</span>
            <h3 className={`text-xl font-serif font-light ${textPrimary}`}>Join the MUA Affiliate Team</h3>
            <p className={`text-[11px] ${textSecondary} leading-relaxed tracking-wide`}>
              Earn commissions, request bulk kit drops, and display certified local badges.
            </p>
          </div>
          <button onClick={() => alert("MUA Registration forms dispatched to email.")} className={`text-[11px] ${isDarkMode ? 'text-zinc-300' : 'text-zinc-700'} hover:opacity-70 uppercase text-left tracking-[0.2em] transition-opacity mt-6`}>
            Register MUA Profile →
          </button>
        </div>

        <div className={`md:col-span-7 ${bgSecondary} border ${border} p-10 flex flex-col justify-between ${hoverBorder} transition-all duration-700 delay-200`}>
          <div className="space-y-4">
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-zinc-400">Botanical Safety</span>
            <h3 className={`text-xl font-serif font-light ${textPrimary}`}>Interactive INCI Botanical Scanner</h3>
            <p className={`text-[11px] ${textSecondary} leading-relaxed max-w-md tracking-wide`}>
              Check ingredient safety scores, hazard rating meters, and sensitive skin ratings instantly. Powered by advanced AI.
            </p>
          </div>
          <div className="flex gap-4 mt-6">
            <button onClick={onChatbotOpen} className={`px-6 py-3 ${isDarkMode ? 'bg-white text-black hover:bg-zinc-200' : 'bg-black text-white hover:bg-zinc-800'} text-[10px] font-semibold uppercase tracking-[0.2em] transition-colors duration-500`}>
              Decode Ingredients
            </button>
            <button onClick={onVideoOpen} className={`px-6 py-3 border ${isDarkMode ? 'border-white/20 text-white hover:bg-white/5' : 'border-black/20 text-black hover:bg-black/5'} text-[10px] font-semibold uppercase tracking-[0.2em] transition-colors duration-500`}>
              Watch Textures
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
