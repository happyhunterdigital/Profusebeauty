// File: src/components/PromoLandingPage.tsx
import React, { useEffect } from 'react';
import { ShieldCheck, Truck, CreditCard, RotateCcw, Star, StarHalf, ChevronRight } from 'lucide-react';
import { Product } from '../types';

interface PromoLandingPageProps {
  onAddToCart: (p: Product, shade: string | null, qty: number) => void;
}

export default function PromoLandingPage({ onAddToCart }: PromoLandingPageProps) {
  // Ensure the page always starts at the top
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Hardcoded combo details based on the brief
  const combo = {
    id: 'sale1',
    name: 'HD Concealer & Brush Set',
    category: 'Bundles',
    price: 420.00,
    normalPrice: 550.00,
    savings: 130.00,
    desc: 'Perfect your base with our high-definition concealer paired with a professional blending brush.',
    image: 'https://res.cloudinary.com/dafc66cma/image/upload/v1783171429/HD_Concealor_and_brushes_jp4icv.png',
    swatches: []
  };

  const handleBuyNow = () => {
    onAddToCart(combo, null, 1);
  };

  return (
    <div className="min-h-screen bg-[#0A0A0F] text-[#F5F5F5] font-sans selection:bg-[#fbbf24]/30">
      <main className="max-w-xl mx-auto bg-[#111116] min-h-screen shadow-2xl relative overflow-hidden">
        
        {/* Decorative subtle glows */}
        <div className="absolute top-0 left-0 w-full h-[500px] rounded-full bg-[#d4af37]/10 blur-[150px] pointer-events-none" />

        {/* [HERO] */}
        <section className="relative px-6 pt-12 pb-10 border-b border-white/5">
          <div className="flex justify-center mb-6">
            <span className="bg-[#fbbf24] text-black text-[10px] font-black px-3 py-1.5 rounded-full uppercase tracking-widest shadow-lg shadow-[#fbbf24]/20 animate-pulse">
              Limited stock / This week only
            </span>
          </div>
          
          <h1 className="text-3xl sm:text-4xl font-serif font-black text-center leading-tight mb-4 text-white">
            The {combo.name} — <span className="text-[#d4af37] italic">everything you need, one price.</span>
          </h1>
          
          <p className="text-center text-sm text-zinc-400 mb-8 font-medium">
            2 premium products worth R{combo.normalPrice.toFixed(2)} for R{combo.price.toFixed(2)}. <br/>
            <span className="text-white font-bold border-b border-[#d4af37]">Save R{combo.savings.toFixed(2)}.</span>
          </p>

          <div className="relative aspect-[4/5] w-full rounded-2xl overflow-hidden shadow-2xl mb-8 border border-white/10">
            <img 
              src={combo.image} 
              alt={combo.name} 
              className="w-full h-full object-cover"
              loading="eager"
            />
          </div>

          <button 
            onClick={handleBuyNow}
            className="w-full bg-[#d4af37] text-black font-black py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-[#b8960f] transition-all shadow-[0_0_20px_rgba(212,175,55,0.3)] active:scale-[0.98]"
          >
            Get the full set — R{combo.price.toFixed(2)} <ChevronRight className="w-5 h-5" />
          </button>
        </section>

        {/* [WHAT'S INSIDE] */}
        <section className="px-6 py-12 border-b border-white/5 bg-zinc-950/30">
          <h3 className="text-sm font-mono uppercase tracking-[0.2em] text-[#d4af37] mb-6 text-center font-bold">What's Inside</h3>
          
          <div className="space-y-4 mb-8">
            <div className="flex items-center gap-4 bg-white/5 p-4 rounded-xl border border-white/5">
              <div className="w-12 h-12 bg-zinc-900 rounded-lg flex items-center justify-center shrink-0 border border-white/10">
                <span className="text-lg">✨</span>
              </div>
              <div>
                <h4 className="font-bold text-white text-sm">HD Liquid Concealer</h4>
                <p className="text-xs text-zinc-400">High-definition, flawless skin coverage.</p>
              </div>
            </div>
            <div className="flex items-center gap-4 bg-white/5 p-4 rounded-xl border border-white/5">
              <div className="w-12 h-12 bg-zinc-900 rounded-lg flex items-center justify-center shrink-0 border border-white/10">
                <span className="text-lg">🖌️</span>
              </div>
              <div>
                <h4 className="font-bold text-white text-sm">Pro Blending Brush</h4>
                <p className="text-xs text-zinc-400">Seamless, airbrush-finish application.</p>
              </div>
            </div>
          </div>

          <div className="text-center p-4 rounded-xl border border-[#d4af37]/30 bg-[#d4af37]/5">
            <p className="text-sm text-zinc-300">
              Buy separately: <span className="line-through">R{combo.normalPrice.toFixed(2)}</span><br/>
              This combo: <strong className="text-white">R{combo.price.toFixed(2)}</strong><br/>
              <span className="text-[#fbbf24] font-black uppercase text-xs tracking-widest block mt-2">You save R{combo.savings.toFixed(2)}</span>
            </p>
          </div>
          
          <div className="mt-8">
            <button 
              onClick={handleBuyNow}
              className="w-full bg-[#d4af37] text-black font-black py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-[#b8960f] transition-all shadow-[0_0_20px_rgba(212,175,55,0.3)] active:scale-[0.98]"
            >
              Get the full set — R{combo.price.toFixed(2)} <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </section>

        {/* [WHY A COMBO] */}
        <section className="px-8 py-12 border-b border-white/5 text-center">
          <div className="w-12 h-12 mx-auto bg-[#d4af37]/10 rounded-full flex items-center justify-center mb-6">
            <ShieldCheck className="w-6 h-6 text-[#d4af37]" />
          </div>
          <p className="text-base text-zinc-300 leading-relaxed italic font-serif">
            "Built the way a makeup artist actually packs their kit — everything that works perfectly together, in one order, at one unbeatable price."
          </p>
        </section>

        {/* [SOCIAL PROOF] */}
        <section className="px-6 py-12 border-b border-white/5 bg-zinc-950/30">
          <div className="flex flex-col items-center text-center mb-8">
            <div className="flex items-center gap-1 text-[#fbbf24] mb-2">
              <Star className="w-5 h-5 fill-current" />
              <Star className="w-5 h-5 fill-current" />
              <Star className="w-5 h-5 fill-current" />
              <Star className="w-5 h-5 fill-current" />
              <StarHalf className="w-5 h-5 fill-current" />
            </div>
            <p className="text-xs font-mono text-zinc-400 uppercase tracking-widest">Based on 124 Reviews</p>
          </div>
          
          <div className="bg-white/5 p-6 rounded-2xl border border-white/10 relative">
            <div className="text-[#d4af37] text-4xl font-serif absolute top-4 left-4 opacity-50">"</div>
            <p className="text-sm text-zinc-200 relative z-10 text-center italic mb-4 mt-2">
              Absolutely love this set! The brush makes the concealer melt perfectly into my skin. Has everything you need in one go.
            </p>
            <p className="text-xs text-center text-zinc-500 font-bold uppercase tracking-wider">— Sarah H., Pretoria</p>
          </div>
          
          <div className="mt-8">
            <button 
              onClick={handleBuyNow}
              className="w-full bg-[#d4af37] text-black font-black py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-[#b8960f] transition-all shadow-[0_0_20px_rgba(212,175,55,0.3)] active:scale-[0.98]"
            >
              Get the full set — R{combo.price.toFixed(2)} <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </section>

        {/* [OBJECTION HANDLING] */}
        <section className="px-6 py-12 border-b border-white/5">
          <h3 className="text-sm font-mono uppercase tracking-[0.2em] text-zinc-500 mb-8 text-center font-bold">Why Shop With Us</h3>
          
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <Truck className="w-6 h-6 text-[#d4af37] shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-white text-sm mb-1">Fast Delivery</h4>
                <p className="text-xs text-zinc-400">We deliver securely anywhere across South Africa via our trusted courier partners.</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <RotateCcw className="w-6 h-6 text-[#d4af37] shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-white text-sm mb-1">Easy Returns</h4>
                <p className="text-xs text-zinc-400">Not your shade? We offer a hassle-free 30-day return policy. <a href="#" onClick={(e) => e.preventDefault()} className="text-[#d4af37] underline underline-offset-2">Read policy</a>.</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <CreditCard className="w-6 h-6 text-[#d4af37] shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-white text-sm mb-1">Secure Payment</h4>
                <p className="text-xs text-zinc-400">100% secure checkout via Payfast & Ozow.</p>
              </div>
            </div>
          </div>
        </section>

        {/* [FINAL CTA] */}
        <section className="px-6 py-16 bg-gradient-to-b from-transparent to-[#d4af37]/10 text-center">
          <h2 className="text-2xl font-serif font-black text-white mb-2">
            Don't miss out.
          </h2>
          <p className="text-sm text-zinc-300 mb-8">
            Get the {combo.name} for just R{combo.price.toFixed(2)}.<br/>
            <span className="text-[#fbbf24] font-bold">Save R{combo.savings.toFixed(2)} today.</span>
          </p>

          <button 
            onClick={handleBuyNow}
            className="w-full bg-[#d4af37] text-black font-black py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-[#b8960f] transition-all shadow-[0_0_30px_rgba(212,175,55,0.4)] active:scale-[0.98] animate-pulse"
          >
            Get the full set — R{combo.price.toFixed(2)} <ChevronRight className="w-5 h-5" />
          </button>
          
          <p className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold mt-4">
            🔥 Extremely low stock
          </p>
        </section>

      </main>
    </div>
  );
}
