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
  onAddToCart, 
  onWorkshopOpen, 
  onVideoOpen, 
  onChatbotOpen 
}: BentoGridProps) {
  return (
    <section id="bento-modules" className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        
        {/* Card 1: Large - Pretoria Booking */}
        <div className="md:col-span-8 bg-zinc-950 border border-white/5 p-8 flex flex-col justify-between relative hover:border-amber-500/20 transition-all">
          <span className="text-[9px] font-mono uppercase tracking-widest text-rose-400">Masterclasses</span>
          <div className="space-y-2 mt-4">
            <h3 className="text-2xl font-serif text-white">1-on-1 Pretoria Makeup Workshops</h3>
            <p className="text-xs text-zinc-400 max-w-md leading-relaxed">
              Book personal training with founder Marcia Kgaphola in Pretoria. Secure hands-on instruction customized for your skin type.
            </p>
          </div>
          <button onClick={onWorkshopOpen} className="mt-6 w-fit px-4 py-2 border border-amber-400 text-[#fbbf24] text-[10px] font-black uppercase tracking-widest">
            Book Pretoria Class
          </button>
        </div>

        {/* Card 2: Medium - 3-in-1 core foundation */}
        <div className="md:col-span-4 bg-zinc-900 border border-white/5 p-6 flex flex-col justify-between hover:border-amber-500/20 transition-all">
          <div className="flex justify-between items-start">
            <span className="text-[9px] font-mono bg-amber-400/10 text-[#fbbf24] px-2 py-0.5">Top-Seller</span>
            <span className="text-xs font-bold text-white">R 350.00</span>
          </div>
          <div className="space-y-1 my-4">
            <h4 className="font-serif text-lg text-white">3-in-1 HD Liquid Foundation</h4>
            <p className="text-[10px] text-zinc-400 leading-relaxed">Primer, Concealer, and UV-mineral SPF shield.</p>
          </div>
          <button 
            onClick={() => onAddToCart({ id: 'p1', name: '3-in-1 HD Liquid Foundation', category: 'Face', price: 350, desc: '', swatches: [] }, '#03')}
            className="w-full py-2 bg-[#fbbf24] text-black text-[10px] font-black uppercase tracking-widest"
          >
            Quick Bag Add
          </button>
        </div>

        {/* Card 3: Small - Affiliate Portal */}
        <div className="md:col-span-5 bg-zinc-950 border border-white/5 p-6 flex flex-col justify-between hover:border-amber-500/20 transition-all">
          <div className="space-y-2">
            <span className="text-[9px] font-mono uppercase tracking-widest text-rose-400">Direct Commission</span>
            <h3 className="text-base text-white">Join the MUA Affiliate Team</h3>
            <p className="text-[10px] text-zinc-400 leading-relaxed">
              Earn commissions, request bulk kit drops, and display certified local badges.
            </p>
          </div>
          <button onClick={() => alert("MUA Registration forms dispatched to email.")} className="text-[10px] text-amber-400 hover:underline uppercase text-left tracking-wider">
            Register MUA Profile →
          </button>
        </div>

        {/* Card 4: Medium - AI Diagnostics */}
        <div className="md:col-span-7 bg-zinc-900 border border-white/5 p-6 flex flex-col justify-between hover:border-amber-500/20 transition-all">
          <div className="space-y-2">
            <span className="text-[9px] font-mono uppercase tracking-widest text-amber-500">Botanical Safety</span>
            <h3 className="text-base text-white">Interactive INCI Botanical Scanner</h3>
            <p className="text-[10px] text-zinc-400 leading-relaxed max-w-md">
              Check ingredient safety scores, hazard rating meters, and sensitive skin ratings instantly. Powered by gemini-3.1-flash-lite-preview.
            </p>
          </div>
          <div className="flex gap-2">
            <button onClick={onChatbotOpen} className="px-4 py-2 bg-zinc-800 text-white text-[10px] font-bold uppercase tracking-widest">
              Decode Ingredients
            </button>
            <button onClick={onVideoOpen} className="px-4 py-2 border border-zinc-800 text-zinc-400 text-[10px] font-bold uppercase tracking-widest">
              Watch Textures
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
