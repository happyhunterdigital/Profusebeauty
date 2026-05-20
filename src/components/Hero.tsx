/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useRef, MouseEvent } from 'react';
import { Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';

interface HeroProps {
  onVirtualTryOnClick: () => void;
  onExploreStoryClick: () => void;
}

export default function Hero({ onVirtualTryOnClick, onExploreStoryClick }: HeroProps) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    // Calculate cursor position relative to element center (-0.5 to 0.5)
    const xVal = (e.clientX - rect.left) / width - 0.5;
    const yVal = (e.clientY - rect.top) / height - 0.5;
    
    // Set rot multiplier (max 10 degrees)
    setTilt({
      x: xVal * 12, // Rotate around Y axis
      y: yVal * -12, // Rotate around X axis
    });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  return (
    <section className="relative min-h-screen pt-32 pb-16 flex items-center overflow-hidden bg-[#FDFBF7] dark:bg-[#120A0B] px-6 md:px-12 transition-colors duration-500">
      
      {/* Morphing Satin Background Blobs */}
      <div className="absolute top-1/4 -left-20 w-80 h-80 bg-[#F9EBE6] dark:bg-pink-900/10 blur-3xl opacity-70 rounded-full animate-morph-blob filter mix-blend-multiply dark:mix-blend-normal pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-[#FAF0EC] dark:bg-[#1E1214]/30 blur-3xl opacity-80 rounded-full animate-morph-blob filter mix-blend-multiply dark:mix-blend-normal pointer-events-none" style={{ animationDelay: '4s' }} />

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center z-10">
        
        {/* Left Column: Authentic Confidence */}
        <div className="lg:col-span-7 flex flex-col justify-center text-left">
          
          {/* Tag Line */}
          <div className="inline-flex items-center gap-2 bg-[#F9EBE6]/60 dark:bg-white/5 border border-pink-500/10 rounded-full px-4 py-1.5 w-fit mb-6 animate-fade-rise">
            <Sparkles size={14} className="text-pink-600 dark:text-pink-300 animate-pulse" />
            <span className="text-xs font-semibold tracking-wider text-[#1E1214]/80 dark:text-[#FBF8F6]/80 uppercase font-sans">
              Proudly South African • Cosmetics
            </span>
          </div>

          {/* Headline - Staggered rise */}
          <h1 className="text-4xl xs:text-5xl md:text-6xl tracking-tight leading-[1.08] text-[#1E1214] dark:text-[#FBF8F6] font-sans font-medium animate-fade-rise">
            Authentic Confidence. <br />
            <span className="font-serif italic font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#211215] via-pink-700 to-rose-900 dark:from-[#F9EBE6] dark:via-pink-300 dark:to-amber-200">
              Flawless You.
            </span>
          </h1>

          {/* Subtext */}
          <p className="text-base md:text-lg text-gray-700/80 dark:text-gray-300/80 max-w-xl mt-6 font-normal leading-relaxed animate-fade-rise-delay-1">
            High-definition, hypoallergenic, and cruelty-free formulas engineered in Pretoria to protect sensitive skin and celebrate diverse South African skin tones.
          </p>

          {/* CTA Stack */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mt-8 lg:mt-10 animate-fade-rise-delay-2">
            <button
              onClick={onVirtualTryOnClick}
              className="group relative inline-flex items-center justify-center bg-[#1E1214] dark:bg-[#F9EBE6] text-white dark:text-[#1E1214] font-medium px-8 py-4 text-sm rounded-full overflow-hidden hover:scale-[1.03] active:scale-98 transition-all duration-300 cursor-pointer shadow-xl shadow-[#1E1214]/10 dark:shadow-none"
            >
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-pink-600 to-amber-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <span className="relative z-10 flex items-center gap-2">
                Match My Shade
                <ArrowRight size={16} className="group-hover:translate-x-1 duration-200" />
              </span>
            </button>
            
            <button
              onClick={onExploreStoryClick}
              className="inline-flex items-center justify-center border border-[#1E1214]/20 dark:border-white/20 text-[#1E1214] dark:text-[#FBF8F6] hover:bg-[#1E1214]/5 dark:hover:bg-white/5 active:scale-98 px-8 py-4 text-sm font-semibold rounded-full transition-all duration-300 cursor-pointer"
            >
              Explore Story
            </button>
          </div>

          {/* Quick trust metrics */}
          <div className="grid grid-cols-3 gap-6 mt-12 pt-8 border-t border-[#1E1214]/10 dark:border-white/10 animate-fade-rise-delay-2 max-w-lg">
            <div>
              <div className="text-2xl md:text-3xl font-serif italic text-pink-700 dark:text-pink-300 font-bold">12+</div>
              <div className="text-xs text-gray-500 dark:text-gray-400 mt-1 uppercase tracking-wider font-medium">SA Tone Shades</div>
            </div>
            <div>
              <div className="text-2xl md:text-3xl font-serif italic text-pink-700 dark:text-pink-300 font-bold">100%</div>
              <div className="text-xs text-gray-500 dark:text-gray-400 mt-1 uppercase tracking-wider font-medium">Hypoallergenic</div>
            </div>
            <div>
              <div className="text-2xl md:text-3xl font-serif italic text-pink-700 dark:text-pink-300 font-bold">Local</div>
              <div className="text-xs text-gray-500 dark:text-gray-400 mt-1 uppercase tracking-wider font-medium">Engineered in PTA</div>
            </div>
          </div>
        </div>

        {/* Right Column: Tall vertical composition with parallax movement */}
        <div className="lg:col-span-5 flex justify-center items-center mt-10 lg:mt-0">
          <div
            ref={containerRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="relative w-full max-w-[420px] aspect-[3/4] rounded-3xl cursor-grab active:cursor-grabbing transition-transform duration-200 ease-out preserve-3d"
            style={{
              transform: `perspective(1000px) rotateY(${tilt.x}deg) rotateX(${tilt.y}deg)`,
            }}
          >
            {/* Satin shadow base glows */}
            <div className="absolute -inset-2 bg-gradient-to-tr from-pink-500/20 via-[#1E1214]/10 to-amber-500/15 rounded-[32px] blur-xl opacity-80 pointer-events-none -z-10" />

            {/* Inner Content Card */}
            <div className="relative w-full h-full rounded-[28px] overflow-hidden border border-white/40 dark:border-white/10 bg-gradient-to-br from-[#FCEEEA]/70 to-[#FDFBF7] dark:from-[#2e181c]/50 dark:to-[#120A0B]/90 shadow-2xl p-6 flex flex-col justify-between">
              
              {/* Card top details */}
              <div className="flex justify-between items-start">
                <div className="bg-white/60 dark:bg-[#1E1214]/60 backdrop-blur-md border border-white/20 px-3 py-1 rounded-full text-[10px] font-bold tracking-widest text-[#1E1214] dark:text-[#F9EBE6] uppercase">
                  South African Beauty Collective
                </div>
                <div className="flex items-center gap-1 text-[11px] text-[#1E1214]/80 dark:text-[#F9EBE6]/80 font-medium">
                  <ShieldCheck size={14} className="text-pink-600 dark:text-pink-300" />
                  Cert. Cruelty Free
                </div>
              </div>

              {/* Central Stack of portraits. We position and layer beautiful representational South African women faces overlay */}
              <div className="relative w-full h-[60%] my-auto flex justify-center items-center">
                
                {/* Image 3: MUA Artist layer (asymmetrical offset back left) */}
                <div className="absolute left-2 -bottom-2 w-[48%] aspect-[4/5] rounded-2xl overflow-hidden border-2 border-white/80 dark:border-[#1E1214] shadow-lg transform -rotate-6 transition-all duration-500 hover:scale-105 hover:z-30 cursor-pointer hover:rotate-0">
                  <img
                    src="https://images.unsplash.com/photo-1595959183075-c1d09e573ec3?auto=format&fit=crop&q=80&w=300"
                    alt="Profuse MUA Artist Studio"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 p-2 text-[10px] text-white text-center font-medium">
                    Corporate Specialist
                  </div>
                </div>

                {/* Image 2: Gorgeous radiant mother (asymmetrical offset back right) */}
                <div className="absolute right-2 top-2 w-[50%] aspect-[4/5] rounded-2xl overflow-hidden border-2 border-white/80 dark:border-[#1E1214] shadow-lg transform rotate-6 transition-all duration-500 hover:scale-105 hover:z-30 cursor-pointer hover:rotate-0">
                  <img
                    src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=300"
                    alt="Profuse Radiant Mother"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 p-2 text-[10px] text-white text-center font-medium">
                    Gentle Mom-Core
                  </div>
                </div>

                {/* Image 1: Main Corporate Professional Centerpiece */}
                <div className="absolute w-[58%] aspect-[4/5] rounded-2xl overflow-hidden border-4 border-white dark:border-[#1E1214] shadow-2xl z-20 transition-all duration-500 hover:rotate-2 hover:scale-105 cursor-pointer">
                  <img
                    src="https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&q=80&w=300"
                    alt="Corporate Elite Beauty"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-[#1E1214] to-transparent p-3 text-xs text-white text-center font-medium">
                    Pretoria HD Formulation
                  </div>
                </div>
              </div>

              {/* Bottom card details */}
              <div className="bg-white/40 dark:bg-black/20 backdrop-blur-sm border border-white/20 p-3 rounded-2xl flex items-center justify-between text-left">
                <div>
                  <div className="text-[10px] text-gray-500 dark:text-gray-400 font-medium tracking-wide uppercase">Active Formula</div>
                  <div className="text-xs font-semibold text-[#1E1214] dark:text-white">Foundation Shade #09</div>
                </div>
                <div className="text-right">
                  <div className="text-[10px] text-gray-500 dark:text-gray-400 font-bold uppercase">Coverage</div>
                  <div className="text-xs font-semibold text-rose-700 dark:text-rose-400">12hr Sweatproof</div>
                </div>
              </div>

            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
