// File: src/components/LipsCollection.tsx
import React, { useState } from 'react';
import { Product } from '../types';
import { products } from '../data'; // Reverted import path pointing directly to src/data.ts

interface LipsCollectionProps {
  isDarkMode: boolean;
  onAddToCart: (p: Product, shade: string | null) => void;
}

export default function LipsCollection({ isDarkMode, onAddToCart }: LipsCollectionProps) {
  const [selectedVariants, setSelectedVariants] = useState<{ [key: string]: string }>({});
  
  // Interactive Lip Match Technique States
  const [matchColor, setMatchColor] = useState<string>('#B91C1C'); // Defaults to "The Bomb" Red
  const [matchShape, setMatchShape] = useState<string>('Natural'); // Natural, M-Shape, Heart Shape
  const [matchTexture, setMatchTexture] = useState<string>('Comfortable Matte'); // Matte, High-Fashion Gloss

  const lipsProducts = products.filter(p => p.category === 'Lips');

  const handleSwatchSelect = (prodId: string, swatch: string) => {
    setSelectedVariants(prev => ({ ...prev, [prodId]: swatch }));
  };

  const photoshootGallery = [
    "https://res.cloudinary.com/dafc66cma/image/upload/q_auto/f_auto/v1780597692/PB_photoshoot_Lipcolour1_cgv4km.jpg",
    "https://res.cloudinary.com/dafc66cma/image/upload/q_auto/f_auto/v1780597691/PB_photoshoot_Lipcolour-2_ngh1nb.jpg",
    "https://res.cloudinary.com/dafc66cma/image/upload/q_auto/f_auto/v1780597643/PB_photoshoot_Lipcolour_gev2jy.jpg"
  ];

  return (
    <section className="space-y-16 py-12 animate-fade-in">
      
      {/* Editorial Photoshoot Banner */}
      <div className="relative h-[50vh] bg-zinc-950 border border-white/5 flex overflow-hidden">
        {photoshootGallery.map((imgUrl, idx) => (
          <div key={idx} className="flex-1 relative group overflow-hidden h-full">
            <img 
              src={imgUrl} 
              alt={`Profuse Beauty Photoshoot Lipcolour Model ${idx + 1}`} 
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors duration-500" />
          </div>
        ))}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4 pointer-events-none z-10">
          <span className="text-[10px] font-mono tracking-widest text-[#fbbf24] uppercase">Exclusive Release</span>
          <h2 className="text-3xl sm:text-5xl font-serif font-black uppercase text-white tracking-wide mt-2">The Lips Collection</h2>
          <p className="text-xs text-zinc-300 mt-2 font-mono">Designed for hydration and all-day transfer resistance.</p>
        </div>
      </div>

      {/* Standalone Lips Catalog Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {lipsProducts.map(p => {
          const currentSwatch = selectedVariants[p.id] || p.swatches[0];
          const payJustNowRate = (p.price / 3).toFixed(2);

          return (
            <div 
              key={p.id} 
              className="bg-zinc-900/50 border border-white/5 p-5 flex flex-col justify-between hover:border-amber-500/20 transition-all group"
            >
              <div className="space-y-4">
                <div className="aspect-[4/3] w-full bg-zinc-950 flex items-center justify-center relative overflow-hidden">
                  <img 
                    src={currentSwatch} 
                    alt={p.name} 
                    className="w-full h-full object-cover border border-white/5"
                  />
                </div>

                {/* Horizontally swipeable swatch buttons */}
                <div className="space-y-1">
                  <span className="text-[9px] uppercase tracking-widest text-zinc-500 block">Select Shade Asset:</span>
                  <div className="flex space-x-2 overflow-x-auto py-1 scrollbar-hide">
                    {p.swatches.map((sw, idx) => (
                      <button
                        key={sw}
                        onClick={() => handleSwatchSelect(p.id, sw)}
                        className={`w-6 h-6 rounded-full border overflow-hidden ${currentSwatch === sw ? 'border-amber-400 scale-110' : 'border-transparent'}`}
                      >
                        <img src={sw} alt="swatch option" className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex justify-between items-start">
                  <h3 className="font-serif text-base text-white tracking-wide">{p.name}</h3>
                  <span className="text-amber-400 font-mono text-sm font-bold">R {p.price.toFixed(2)}</span>
                </div>
                
                <p className="text-xs text-gray-400 leading-relaxed">{p.desc}</p>
              </div>

              <div className="mt-4 pt-4 border-t border-white/5 space-y-3">
                <div className="text-[10px] font-mono text-zinc-500 flex justify-between">
                  <span>PayJustNow 3x</span>
                  <span className="text-[#fbbf24] font-bold">R {payJustNowRate}</span>
                </div>

                <button 
                  onClick={() => onAddToCart(p, currentSwatch)}
                  className="w-full py-2 bg-zinc-800 group-hover:bg-gradient-to-r group-hover:from-amber-500 group-hover:to-orange-500 group-hover:text-black text-xs font-black uppercase tracking-widest text-center transition-all"
                >
                  Add Lip Colour to Bag
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* AI Lip Shape & Color Matcher (Experiential Tool) */}
      <div className="bg-zinc-950/60 border border-white/10 p-8 rounded-3xl mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center text-left">
        <div className="lg:col-span-6 space-y-4">
          <div>
            <span className="text-[9px] uppercase tracking-widest text-[#fbbf24] font-mono block">Experiential AI System</span>
            <h3 className="text-2xl font-serif text-white uppercase tracking-wide">Lip Shape & Color Matcher</h3>
          </div>
          <p className="text-xs text-zinc-400 leading-relaxed">
            Preview our high-definition formulas rendered directly onto specific volumetric shapes. Test structural lip fillers, hearts konturs, and customized textures before committing to a shade.
          </p>

          {/* Step 2 & 3: Selection parameters */}
          <div className="space-y-4 pt-4">
            <div className="space-y-2">
              <span className="text-[10px] font-mono uppercase text-zinc-500 block">Step 2: Choose Lip Shape</span>
              <div className="flex space-x-2">
                {['Natural', 'M-Shape Contour', 'Heart Shape'].map(shape => (
                  <button
                    key={shape}
                    onClick={() => setMatchShape(shape)}
                    className={`text-[9px] px-3 py-1.5 border font-mono uppercase tracking-wider ${
                      matchShape === shape ? 'border-amber-400 text-white' : 'border-white/5 text-zinc-500'
                    }`}
                  >
                    {shape}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <span className="text-[10px] font-mono uppercase text-zinc-500 block">Step 3: Choose Texture & Formula</span>
              <div className="flex space-x-2">
                {['Comfortable Matte', 'High-Fashion Gloss'].map(tex => (
                  <button
                    key={tex}
                    onClick={() => setMatchTexture(tex)}
                    className={`text-[9px] px-3 py-1.5 border font-mono uppercase tracking-wider ${
                      matchTexture === tex ? 'border-amber-400 text-white' : 'border-white/5 text-zinc-500'
                    }`}
                  >
                    {tex}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Live Simulator view displaying before/after effects based on values */}
        <div className="lg:col-span-6 flex justify-center relative">
          <div className="relative w-full max-w-[340px] aspect-[4/5] bg-zinc-900 border border-white/5 overflow-hidden">
            <img 
              src="https://res.cloudinary.com/dafc66cma/image/upload/q_auto/f_auto/v1780597643/PB_photoshoot_Lipcolour_gev2jy.jpg" 
              alt="AI Lip Match Model View" 
              className="w-full h-full object-cover"
            />
            {/* Color/Shape Tint layer mapping to state values */}
            <div 
              className="absolute inset-0 mix-blend-color opacity-30 transition-all duration-500" 
              style={{ backgroundColor: matchColor }}
            />
            <div className="absolute bottom-4 left-4 right-4 bg-black/80 backdrop-blur-md p-3 border border-white/5 text-center space-y-1">
              <span className="text-[8px] font-mono text-zinc-500 uppercase tracking-widest block">Render Output</span>
              <span className="text-[10px] text-white font-mono block">Shape: <b>{matchShape}</b> • Texture: <b>{matchTexture}</b></span>
            </div>
          </div>
        </div>
      </div>

    </section>
  );
}
