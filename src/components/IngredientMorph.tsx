// File: src/components/IngredientMorph.tsx
import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Sparkles, Play } from 'lucide-react';
import { Product } from '../types';

interface IngredientMorphProps {
  isDarkMode: boolean;
  onAddToCart: (p: Product, shade: string | null) => void;
  onOpenShadeSelector: () => void;
}

export default function IngredientMorph({ isDarkMode, onOpenShadeSelector }: IngredientMorphProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.3 });

  return (
    <section 
      ref={containerRef}
      id="ingredient-morph-section" 
      aria-label="HD Liquid Foundation Showcase"
      className={`relative w-full border ${isDarkMode ? 'border-zinc-800 bg-zinc-950/45' : 'border-zinc-200 bg-stone-50/45'} py-16 px-4 sm:px-8 lg:px-16 overflow-hidden backdrop-blur-md rounded-[2.5rem] mt-12 transition-colors duration-500`}
    >
      {/* Decorative Glow Elements */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-[#d4af37]/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-96 h-96 rounded-full bg-[#fbbf24]/10 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto flex flex-col items-center">
        
        {/* Heading */}
        <div className="text-center space-y-4 max-w-3xl mb-12 relative z-10">
          <motion.span 
            initial={{ opacity: 0, y: -20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#d4af37] font-semibold flex items-center justify-center gap-2"
          >
            <Sparkles className="w-3.5 h-3.5" /> The Evolution of Perfection
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className={`text-3xl sm:text-4xl md:text-5xl font-serif font-light ${isDarkMode ? 'text-white' : 'text-zinc-900'} tracking-wide leading-tight`}
          >
            3-in-1 HD Liquid Foundation
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className={`text-sm sm:text-base ${isDarkMode ? 'text-zinc-400' : 'text-zinc-600'} leading-relaxed max-w-2xl mx-auto`}
          >
            Experience our flawless, skin-matching coverage with hypoallergenic botanical formulas. 
            Watch the perfection unfold.
          </motion.p>
        </div>

        {/* Video Container */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="w-full max-w-5xl mx-auto relative z-10"
        >
          <div className="relative w-full aspect-[9/16] sm:aspect-video rounded-3xl overflow-hidden shadow-2xl border border-[#d4af37]/30 group">
            <video 
              src="https://res.cloudinary.com/dafc66cma/video/upload/v1782491991/The_Evolution_of_Perfection_Profuse_Beauty_HD_Liquid_Founation_selfvf.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover transform transition-transform duration-1000 group-hover:scale-105"
            />
            {/* Gradient Overlay for better contrast */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
            
            {/* CTA Button Overlay */}
            <div className="absolute bottom-6 sm:bottom-10 left-1/2 -translate-x-1/2 w-full px-4 flex justify-center">
              <button
                onClick={onOpenShadeSelector}
                className="bg-[#d4af37] text-black hover:bg-[#b8960f] px-6 sm:px-8 py-3.5 sm:py-4 rounded-full font-black text-[10px] sm:text-xs tracking-widest uppercase transition-all duration-300 shadow-[0_0_20px_rgba(212,175,55,0.4)] hover:shadow-[0_0_30px_rgba(212,175,55,0.6)] hover:scale-105 flex items-center gap-2"
              >
                <Play className="w-4 h-4" />
                Find Your Perfect Shade
              </button>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
}
