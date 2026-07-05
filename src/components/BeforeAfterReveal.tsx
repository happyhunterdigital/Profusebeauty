// File: src/components/BeforeAfterReveal.tsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Eye } from 'lucide-react';

interface BeforeAfterRevealProps {
  isDarkMode: boolean;
}

// Optimizes Cloudinary URLs on the fly (compress & convert format)
const getOptimizedUrl = (url: string) => {
  if (!url || !url.includes('cloudinary.com') || url.includes('q_auto')) return url;
  return url.replace('/upload/', '/upload/q_auto,f_auto/');
};

export default function BeforeAfterReveal({ isDarkMode }: BeforeAfterRevealProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isTapped, setIsTapped] = useState(false);

  // Cloudinary assets provided by the user
  const beforeUrl = getOptimizedUrl("https://res.cloudinary.com/dafc66cma/image/upload/v1783220195/Profuse_Beauty_Model_Before_gribr5.jpg");
  const afterUrl = getOptimizedUrl("https://res.cloudinary.com/dafc66cma/image/upload/v1783220197/Profuse_Beauty_Model_After_ycfnkx.jpg");

  // Determine if we should show the "After" state based on hover or mobile tap toggles
  const showAfter = isHovered || isTapped;

  return (
    <section className={`py-20 relative overflow-hidden rounded-[2.5rem] my-10 ${
      isDarkMode ? 'bg-[#0e0e12] border border-white/5' : 'bg-zinc-50 border border-black/5 shadow-xl'
    }`}>
      {/* Ambient background glows */}
      <div className="absolute top-0 right-0 w-full h-full overflow-hidden pointer-events-none rounded-[2.5rem]">
        <div className="absolute top-[20%] right-[-10%] w-[35%] h-[35%] rounded-full bg-[#d4af37]/10 blur-[100px]" />
        <div className="absolute bottom-[10%] left-[-10%] w-[35%] h-[35%] rounded-full bg-[#fbbf24]/10 blur-[100px]" />
      </div>

      <div className="relative z-10 px-4 sm:px-6 lg:px-10 max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12">
        {/* Left Side: Typography & Copy */}
        <div className="flex-1 space-y-6 max-w-xl text-center lg:text-left">
          <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-[#d4af37]/10 border border-[#d4af37]/20">
            <Sparkles className="w-4 h-4 text-[#d4af37]" />
            <span className="text-xs font-bold text-[#d4af37] tracking-widest uppercase">Visible Results</span>
          </div>

          <h2 className="text-4xl sm:text-5xl font-serif font-black tracking-tight leading-tight">
            Seamless <span className="italic text-[#d4af37]">Transformation</span>
          </h2>

          <p className={`text-sm sm:text-base leading-relaxed ${isDarkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
            Experience the high-definition coverage of Profuse Beauty. Our lightweight, breathable formula seamlessly conceals pores, redness, and imperfections while locking in hydration.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start pt-2">
            <div className="flex items-center gap-2 text-xs font-bold text-[#d4af37] tracking-wider uppercase bg-white/5 px-4 py-2 rounded-full border border-white/10">
              <Eye className="w-4 h-4" />
              <span>Hover over the image to reveal coverage</span>
            </div>
            <button 
              onClick={() => setIsTapped(!isTapped)}
              className="text-xs font-bold text-white uppercase bg-white/10 hover:bg-[#d4af37] hover:text-black px-4 py-2 rounded-full transition-colors lg:hidden"
            >
              Tap to Toggle
            </button>
          </div>
        </div>

        {/* Right Side: Before & After Split Image Frame */}
        <div className="flex-1 w-full flex justify-center">
          <div 
            className="relative w-full max-w-md aspect-[3/4] rounded-3xl overflow-hidden shadow-2xl border border-[#d4af37]/30 bg-black cursor-crosshair select-none"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={() => setIsTapped(!isTapped)}
          >
            {/* 1. After Image (Base layer) */}
            <div className="absolute inset-0 w-full h-full">
              <img 
                src={afterUrl} 
                alt="Flawless After Application" 
                className="w-full h-full object-cover object-[center_30%] scale-[1.02] translate-y-[-1.5%] transform transition-all duration-700 ease-out"
                style={{
                  filter: showAfter ? 'none' : 'blur(2px)',
                }}
              />
              {/* After label indicator */}
              <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-lg border border-[#d4af37]/40 z-20 text-[10px] uppercase tracking-widest font-black text-[#d4af37] shadow-lg">
                After Coverage
              </div>
            </div>

            {/* 2. Before Image (Top layer overlay) */}
            <div 
              className="absolute inset-0 w-full h-full transition-opacity duration-700 ease-in-out z-10"
              style={{
                opacity: showAfter ? 0 : 1,
                pointerEvents: 'none' // allow hover to interact with the container
              }}
            >
              <img 
                src={beforeUrl} 
                alt="Natural Before Application" 
                className="w-full h-full object-cover object-[center_30%] scale-100 transform transition-all duration-700 ease-out"
              />
              {/* Before label indicator */}
              <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10 z-20 text-[10px] uppercase tracking-widest font-black text-white shadow-lg">
                Before Makeup
              </div>
            </div>

            {/* Hover instruction badge */}
            <div className="absolute top-4 left-4 right-4 z-20 flex justify-center pointer-events-none">
              <div className="bg-black/70 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/5 text-[9px] uppercase tracking-widest font-bold text-zinc-300">
                {showAfter ? "✨ Flawless Finish ✨" : "🔍 Hover to Reveal"}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
