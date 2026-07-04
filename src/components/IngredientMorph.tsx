// File: src/components/IngredientMorph.tsx
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { Droplet, Sparkles, RotateCcw, ShoppingBag, Info, Check, Shield } from 'lucide-react';
import { ingredients } from '../data';
import { Product } from '../types';

interface IngredientMorphProps {
  isDarkMode: boolean;
  onAddToCart: (p: Product, shade: string | null) => void;
  onOpenShadeSelector: () => void;
}

// Color mapping for visual representation of raw ingredients
const ingredientMeta = [
  { displayName: 'Macadamia Oil', color: '#E29578', size: 65, borderGlow: 'rgba(226, 149, 120, 0.4)' },
  { displayName: 'Moringa Oil', color: '#83C5BE', size: 60, borderGlow: 'rgba(131, 197, 190, 0.4)' },
  { displayName: 'Marula Oil', color: '#FFDDD2', size: 55, borderGlow: 'rgba(255, 221, 210, 0.4)' },
  { displayName: 'Vitamin E', color: '#E76F51', size: 50, borderGlow: 'rgba(231, 111, 81, 0.4)' },
  { displayName: 'Titanium Dioxide', color: '#EDF2F4', size: 55, borderGlow: 'rgba(237, 242, 244, 0.4)' },
  { displayName: 'Iron Oxides', color: '#B07D62', size: 60, borderGlow: 'rgba(176, 125, 98, 0.4)' },
  { displayName: 'Silicones', color: '#90E0EF', size: 50, borderGlow: 'rgba(144, 224, 239, 0.4)' }
];

export default function IngredientMorph({ isDarkMode, onAddToCart, onOpenShadeSelector }: IngredientMorphProps) {
  const [status, setStatus] = useState<'idle' | 'blending' | 'blended'>('idle');
  const [activeIdx, setActiveIdx] = useState<number | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.3 });

  useEffect(() => {
    if (isInView && status === 'idle') {
      handleBlend();
    }
  }, [isInView, status]);



  const handleBlend = () => {
    if (status !== 'idle') return;
    setStatus('blending');
    setActiveIdx(null);
    
    // Simulate molecular fusion time
    setTimeout(() => {
      setStatus('blended');
    }, 2800);
  };

  const handleReset = () => {
    setStatus('idle');
    setActiveIdx(null);
  };



  return (
    <section 
      ref={containerRef}
      id="ingredient-morph-section" 
      aria-label="Interactive Ingredient Morphing Animation"
      className={`relative w-full border ${isDarkMode ? 'border-zinc-800 bg-zinc-950/45' : 'border-zinc-200 bg-stone-50/45'} py-16 px-6 sm:px-12 lg:px-20 overflow-hidden backdrop-blur-md rounded-3xl mt-12 transition-colors duration-500`}
    >
      {/* Decorative Glow Elements */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-amber-500/5 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-96 h-96 rounded-full bg-orange-400/5 blur-[100px] pointer-events-none" />



      <div className="max-w-7xl mx-auto flex flex-col items-center">
        
        {/* Heading */}
        <div className="text-center space-y-4 max-w-2xl mb-12">
          <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#d4af37] font-semibold flex items-center justify-center gap-2">
            <Sparkles className="w-3.5 h-3.5" /> Formulation Alchemy
          </span>
          <h2 className={`text-3xl sm:text-4xl font-serif font-light ${isDarkMode ? 'text-white' : 'text-zinc-900'} tracking-wide leading-tight`}>
            The Science of Clean Coverage
          </h2>
          <p className={`text-xs sm:text-sm ${isDarkMode ? 'text-zinc-400' : 'text-zinc-600'} leading-relaxed max-w-lg mx-auto`}>
            Interact with our active, hypoallergenic nutrients and physical sunscreen shield to witness them fuse seamlessly into our 3-in-1 HD Liquid Foundation.
          </p>
        </div>

        {/* Interactive Layout Grid */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center min-h-[500px]">
          
          {/* Left panel: Ingredient List */}
          <div className="lg:col-span-4 order-2 lg:order-1 flex flex-col gap-3">
            <span className={`text-[10px] font-mono uppercase tracking-wider ${isDarkMode ? 'text-zinc-500' : 'text-zinc-400'} mb-2`}>
              Core Formulation Elements
            </span>
            <div className="flex flex-col gap-2">
              {ingredients.map((ing, i) => {
                const isActive = activeIdx === i;
                const meta = ingredientMeta[i];
                return (
                  <button
                    key={ing.name}
                    onMouseEnter={() => status === 'idle' && setActiveIdx(i)}
                    onMouseLeave={() => status === 'idle' && activeIdx === i && setActiveIdx(null)}
                    onClick={() => status === 'idle' && setActiveIdx(isActive ? null : i)}
                    disabled={status !== 'idle'}
                    className={`text-left p-4 rounded-xl border transition-all duration-300 flex items-start gap-4 group relative overflow-hidden ${
                      status !== 'idle' ? 'opacity-40 cursor-not-allowed' : ''
                    } ${
                      isActive 
                        ? (isDarkMode ? 'bg-zinc-900 border-[#d4af37]/40 shadow-[0_0_15px_rgba(212,175,55,0.15)]' : 'bg-white border-[#d4af37]/40 shadow-lg') 
                        : (isDarkMode ? 'bg-zinc-900/20 border-zinc-800 hover:border-zinc-700' : 'bg-white/40 border-zinc-200 hover:border-zinc-300')
                    }`}
                  >
                    {/* Visual indicator color */}
                    <div 
                      className="w-3.5 h-3.5 rounded-full mt-0.5 shrink-0 transition-transform duration-300 group-hover:scale-125" 
                      style={{ 
                        backgroundColor: meta.color,
                        boxShadow: `0 0 8px ${meta.color}`
                      }} 
                    />
                    <div className="space-y-1">
                      <h4 className={`text-xs font-bold leading-none ${isDarkMode ? 'text-zinc-200' : 'text-zinc-800'}`}>
                        {meta.displayName}
                      </h4>
                      <p className={`text-[10px] font-mono leading-none ${isDarkMode ? 'text-[#d4af37]/80' : 'text-[#b5952f]'}`}>
                        {ing.function}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Center Stage: The Canvas */}
          <div className="lg:col-span-5 order-1 lg:order-2 flex flex-col items-center justify-center relative aspect-square max-w-[450px] mx-auto w-full">
            
            {/* The Video Morphing Representation */}
            <div className="absolute inset-0 flex items-center justify-center p-4">
              <div className="w-full h-full rounded-full overflow-hidden shadow-2xl border border-[#d4af37]/35 relative flex items-center justify-center bg-black/5 backdrop-blur-sm">
                <video 
                  src="https://res.cloudinary.com/dafc66cma/video/upload/v1782491991/The_Evolution_of_Perfection_Profuse_Beauty_HD_Liquid_Founation_selfvf.mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Floating Action Button */}
            <div className="absolute bottom-4 z-40">
              {status === 'idle' && (
                <button
                  onClick={handleBlend}
                  className="group relative flex items-center gap-2 bg-[#d4af37] text-[#0a0a0a] hover:bg-[#b5952f] font-black uppercase text-[10px] tracking-[0.2em] px-8 py-3.5 rounded-full shadow-[0_4px_20px_rgba(212,175,55,0.4)] transition-all duration-300 hover:scale-105 active:scale-95"
                >
                  <Droplet className="w-3.5 h-3.5 animate-bounce" />
                  Blend Formula
                </button>
              )}

              {status === 'blending' && (
                <div className="flex items-center gap-2 bg-zinc-900 border border-zinc-800 text-zinc-300 font-mono text-[9px] uppercase tracking-widest px-6 py-3.5 rounded-full shadow-xl">
                  <span className="w-2 h-2 rounded-full bg-[#d4af37] animate-ping" />
                  Molecular Fusion Active...
                </div>
              )}
            </div>
          </div>

          {/* Right panel: Details Card */}
          <div className="lg:col-span-3 order-3 flex flex-col justify-center min-h-[220px]">
            <AnimatePresence mode="wait">
              
              {/* Case A: Idle, nothing selected */}
              {status === 'idle' && activeIdx === null && (
                <motion.div
                  key="idle-intro"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className={`border rounded-2xl p-6 text-center space-y-4 ${
                    isDarkMode ? 'bg-zinc-900/30 border-zinc-800' : 'bg-white/50 border-zinc-200'
                  }`}
                >
                  <Info className={`w-8 h-8 mx-auto ${isDarkMode ? 'text-zinc-500' : 'text-zinc-400'}`} />
                  <p className={`text-xs ${isDarkMode ? 'text-zinc-400' : 'text-zinc-600'} leading-relaxed`}>
                    Hover over or click any ingredient on the left to analyze its diagnostic profile.
                  </p>
                </motion.div>
              )}

              {/* Case B: Idle, ingredient selected */}
              {status === 'idle' && activeIdx !== null && (
                <motion.div
                  key={`detail-${activeIdx}`}
                  initial={{ opacity: 0, x: 15 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -15 }}
                  className={`border rounded-2xl p-6 space-y-4 flex flex-col justify-between ${
                    isDarkMode ? 'bg-zinc-900/70 border-zinc-800' : 'bg-white border-zinc-200 shadow-md'
                  }`}
                >
                  <div className="space-y-2">
                    <span className="text-[9px] font-mono uppercase bg-[#d4af37]/10 text-[#d4af37] px-2 py-0.5 rounded-md font-bold">
                      {ingredients[activeIdx].function}
                    </span>
                    <h3 className={`text-sm font-bold ${isDarkMode ? 'text-white' : 'text-zinc-800'}`}>
                      {ingredients[activeIdx].name}
                    </h3>
                    <p className={`text-[11px] leading-relaxed ${isDarkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
                      {ingredients[activeIdx].desc}
                    </p>
                  </div>
                  <div className="pt-3 border-t border-zinc-800/40 flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <Shield className="w-3.5 h-3.5 text-emerald-500" />
                      <span className="text-[10px] font-mono font-bold text-emerald-500">
                        EWG Hazard: {ingredients[activeIdx].hazard}
                      </span>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Case C: Blending state details */}
              {status === 'blending' && (
                <motion.div
                  key="blending-card"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className={`border rounded-2xl p-6 text-center space-y-4 ${
                    isDarkMode ? 'bg-zinc-900/30 border-zinc-800' : 'bg-white/50 border-zinc-200'
                  }`}
                >
                  <div className="relative w-12 h-12 mx-auto">
                    <div className="absolute inset-0 rounded-full border-2 border-dashed border-[#d4af37] animate-spin duration-[4000ms]" />
                    <Droplet className="w-6 h-6 absolute inset-0 m-auto text-[#d4af37] animate-pulse" />
                  </div>
                  <div className="space-y-1">
                    <h4 className={`text-xs font-bold ${isDarkMode ? 'text-white' : 'text-zinc-800'}`}>Synthesizing Formula</h4>
                    <p className={`text-[10px] ${isDarkMode ? 'text-zinc-500' : 'text-zinc-400'} leading-relaxed font-mono`}>
                      Suspending botanical lipids in high-definition mineral pigments...
                    </p>
                  </div>
                </motion.div>
              )}

              {/* Case D: Blended state, show checkout and results */}
              {status === 'blended' && (
                <motion.div
                  key="blended-result"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className={`border rounded-2xl p-6 space-y-5 flex flex-col justify-between ${
                    isDarkMode ? 'bg-zinc-900/90 border-[#d4af37]/35 shadow-2xl shadow-amber-500/5' : 'bg-white border-[#d4af37]/35 shadow-2xl'
                  }`}
                >
                  <div className="space-y-3">
                    <div className="flex items-center gap-1.5 text-emerald-500">
                      <div className="w-5 h-5 rounded-full bg-emerald-500/10 flex items-center justify-center shrink-0">
                        <Check className="w-3 h-3 text-emerald-500" />
                      </div>
                      <span className="text-[10px] font-mono font-black uppercase tracking-wider">Clinical Fusion Successful</span>
                    </div>
                    
                    <h3 className={`text-md font-serif font-semibold leading-tight ${isDarkMode ? 'text-white' : 'text-zinc-800'}`}>
                      3-in-1 HD Liquid Foundation
                    </h3>

                    <div className="space-y-1.5 text-[11px] leading-tight text-zinc-400">
                      <div className="flex items-center gap-2">
                        <span className="w-1 h-1 rounded-full bg-[#d4af37]" />
                        <span className={isDarkMode ? 'text-zinc-300' : 'text-zinc-600'}>Primer + Concealer + Mineral Base</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-1 h-1 rounded-full bg-[#d4af37]" />
                        <span className={isDarkMode ? 'text-zinc-300' : 'text-zinc-600'}>SPF 25 Physical UV Filter</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-1 h-1 rounded-full bg-[#d4af37]" />
                        <span className={isDarkMode ? 'text-zinc-300' : 'text-zinc-600'}>8-Hour Smudge-Proof Finish</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2 pt-2 border-t border-zinc-800/40">
                    <button
                      onClick={onOpenShadeSelector}
                      className={`w-full py-3 bg-[#d4af37] hover:bg-[#b5952f] text-black font-black uppercase text-[10px] tracking-[0.15em] flex items-center justify-center gap-2 transition-colors duration-300 cursor-pointer`}
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      Select Your Shade • R350
                    </button>
                    <button
                      onClick={handleReset}
                      className={`w-full py-2 bg-transparent text-[9px] uppercase tracking-widest font-mono flex items-center justify-center gap-1.5 border border-zinc-800/40 cursor-pointer ${
                        isDarkMode ? 'text-zinc-400 hover:text-white' : 'text-zinc-600 hover:text-black'
                      } transition-colors`}
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      Deconstruct Formula
                    </button>
                  </div>
                </motion.div>
              )}

            </AnimatePresence>
          </div>

        </div>

      </div>
    </section>
  );
}
