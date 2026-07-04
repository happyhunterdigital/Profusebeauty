// File: src/components/IngredientShowcase.tsx
import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Sparkles, Leaf, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { ingredients } from '../data';
import { INCIIngredient } from '../types';

interface IngredientShowcaseProps {
  isDarkMode: boolean;
}

export default function IngredientShowcase({ isDarkMode }: IngredientShowcaseProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.1 });

  const textPrimary = isDarkMode ? 'text-white' : 'text-zinc-900';
  const textSecondary = isDarkMode ? 'text-zinc-400' : 'text-zinc-600';
  const borderStyle = isDarkMode ? 'border-zinc-800' : 'border-zinc-200';
  const cardBg = isDarkMode ? 'bg-zinc-900/50' : 'bg-white/50';

  return (
    <section 
      ref={containerRef}
      id="ingredient-showcase" 
      aria-label="Ingredients and Video Showcase"
      className={`relative w-full py-20 px-4 sm:px-8 lg:px-16 overflow-hidden rounded-[2.5rem] mt-12 transition-colors duration-500 border ${borderStyle} ${isDarkMode ? 'bg-zinc-950/45' : 'bg-stone-50/45'} backdrop-blur-md`}
    >
      {/* Decorative Glows */}
      <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-96 h-96 rounded-full bg-[#d4af37]/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 w-96 h-96 rounded-full bg-[#fbbf24]/10 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12 lg:gap-16 items-center">
        
        {/* Left Column: Video Showcase */}
        <div className="w-full lg:w-1/2 relative z-10">
          <div className="text-center lg:text-left space-y-4 mb-8">
            <motion.span 
              initial={{ opacity: 0, y: -20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#d4af37] font-semibold flex items-center justify-center lg:justify-start gap-2"
            >
              <Sparkles className="w-3.5 h-3.5" /> Formulation Mastery
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className={`text-3xl sm:text-4xl lg:text-5xl font-serif font-light ${textPrimary} tracking-wide leading-tight`}
            >
              The Evolution of Perfection
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className={`text-sm sm:text-base ${textSecondary} leading-relaxed max-w-lg mx-auto lg:mx-0`}
            >
              Experience our flawless, skin-matching HD Liquid Foundation. Watch the botanical mastery unfold in every drop.
            </motion.p>
          </div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative w-full aspect-[4/5] sm:aspect-video lg:aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl border border-[#d4af37]/30 group bg-black"
          >
            <video 
              autoPlay={true}
              loop={true}
              muted={true}
              playsInline={true}
              preload="auto"
              className="w-full h-full object-cover transform transition-transform duration-1000 group-hover:scale-105"
            >
              <source src="https://res.cloudinary.com/dafc66cma/video/upload/q_auto,f_auto/v1782491991/The_Evolution_of_Perfection_Profuse_Beauty_HD_Liquid_Founation_selfvf.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
            
            <div className="absolute bottom-6 left-6 right-6 pointer-events-none">
              <div className="bg-[#0a0a0a]/60 backdrop-blur-md border border-[#d4af37]/40 rounded-2xl p-4 flex items-center justify-between shadow-lg">
                <div className="flex items-center gap-3">
                  <ShieldCheck className="w-6 h-6 text-[#d4af37]" />
                  <div className="text-left">
                    <p className="text-white text-[10px] uppercase font-bold tracking-widest">Dermatologist</p>
                    <p className="text-zinc-300 text-xs">Tested & Approved</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right Column: Ingredients List */}
        <div className="w-full lg:w-1/2 relative z-10 flex flex-col h-full justify-center">
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mb-8"
          >
            <h3 className={`text-2xl font-serif ${textPrimary} flex items-center gap-2 mb-2`}>
              <Leaf className="w-5 h-5 text-[#d4af37]" /> Key Botanicals & Actives
            </h3>
            <p className={`text-sm ${textSecondary}`}>
              A transparent look at the high-performance ingredients powering our HD formula.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 gap-4 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
            {ingredients.map((ing: INCIIngredient, idx: number) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.5 + (idx * 0.1) }}
                className={`p-5 rounded-2xl border ${borderStyle} ${cardBg} hover:border-[#d4af37]/50 transition-colors duration-300 shadow-sm flex flex-col gap-2`}
              >
                <div className="flex justify-between items-start gap-4">
                  <h4 className={`font-bold text-sm ${textPrimary}`}>{ing.name}</h4>
                  <span className="shrink-0 flex items-center gap-1 bg-[#d4af37]/10 text-[#d4af37] text-[9px] uppercase tracking-widest px-2 py-1 rounded-full font-bold">
                    <CheckCircle2 className="w-3 h-3" /> {ing.hazard}
                  </span>
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded-md ${isDarkMode ? 'bg-zinc-800 text-zinc-300' : 'bg-zinc-200 text-zinc-700'}`}>
                    {ing.function}
                  </span>
                </div>
                <p className={`text-xs ${textSecondary} mt-2 leading-relaxed`}>
                  {ing.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
