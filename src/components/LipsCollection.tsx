// File: src/components/LipsCollection.tsx
import React, { useState } from 'react';
import { Product } from '../types';
import { products } from '../data';

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

  const bgPrimary = isDarkMode ? 'bg-[#1c1917]' : 'bg-[#f5f5f4]';
  const bgSecondary = isDarkMode ? 'bg-zinc-900/30' : 'bg-white/50';
  const textPrimary = isDarkMode ? 'text-white' : 'text-[#1c1917]';
  const textSecondary = isDarkMode ? 'text-[#e7e5e4]' : 'text-zinc-600';
  const border = isDarkMode ? 'border-white/5' : 'border-black/5';

  return (
    <section className="space-y-20 py-16 animate-fade-in">
      
      {/* Editorial Photoshoot Banner */}
      <div className={`relative h-[60vh] ${bgPrimary} border ${border} flex overflow-hidden`}>
        {photoshootGallery.map((imgUrl, idx) => (
          <div key={idx} className="flex-1 relative group overflow-hidden h-full">
            <img 
              src={imgUrl} 
              alt={`Profuse Beauty Photoshoot Lipcolour Model ${idx + 1}`} 
              className="w-full h-full object-cover transition-transform duration-[2000ms] group-hover:scale-105"
            />
            <div className={`absolute inset-0 ${isDarkMode ? 'bg-black/50' : 'bg-white/20'} group-hover:opacity-0 transition-opacity duration-1000`} />
          </div>
        ))}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8 pointer-events-none z-10 bg-black/20 backdrop-blur-[2px]">
          <span className="text-[10px] font-mono tracking-[0.3em] text-white uppercase drop-shadow-md">Exclusive Release</span>
          <h2 className="text-4xl sm:text-6xl font-serif font-light uppercase text-white tracking-widest mt-4 drop-shadow-lg">The Lips Collection</h2>
          <p className="text-sm text-white/90 mt-4 font-light tracking-wide max-w-md drop-shadow-md">Designed for hydration and all-day transfer resistance.</p>
        </div>
      </div>

      {/* Standalone Lips Catalog Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {lipsProducts.map((p, idx) => {
          const currentSwatch = selectedVariants[p.id] || p.swatches[0];
          const payJustNowRate = (p.price / 3).toFixed(2);
          const delayClass = `delay-[${idx * 150}ms]`;

          return (
            <div 
              key={p.id} 
              className={`${bgSecondary} border ${border} p-8 flex flex-col justify-between ${isDarkMode ? 'hover:border-white/20' : 'hover:border-black/20'} transition-all duration-700 group animate-fade-in ${delayClass}`}
            >
              <div className="space-y-6">
                <div className={`aspect-[4/5] w-full ${bgPrimary} flex items-center justify-center relative overflow-hidden`}>
                  <img 
                    src={currentSwatch} 
                    alt={p.name} 
                    className={`w-full h-full object-cover border ${border} transition-transform duration-1000 group-hover:scale-105`}
                  />
                </div>

                <div className="space-y-3">
                  <span className="text-[9px] uppercase tracking-[0.2em] text-zinc-500 block">Select Shade Asset</span>
                  <div className="flex space-x-3 overflow-x-auto py-1 scrollbar-hide">
                    {p.swatches.map((sw) => (
                      <button
                        key={sw}
                        onClick={() => handleSwatchSelect(p.id, sw)}
                        className={`w-8 h-8 rounded-full border overflow-hidden transition-all duration-300 ${currentSwatch === sw ? (isDarkMode ? 'border-white scale-110' : 'border-black scale-110') : 'border-transparent opacity-70 hover:opacity-100'}`}
                      >
                        <img src={sw} alt="swatch option" className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex justify-between items-start pt-2">
                  <h3 className={`font-serif text-xl font-light ${textPrimary} tracking-wide`}>{p.name}</h3>
                  <span className={`font-mono text-sm font-medium ${textPrimary}`}>R {p.price.toFixed(2)}</span>
                </div>
                
                <p className={`text-xs ${textSecondary} leading-relaxed tracking-wide`}>{p.desc}</p>
              </div>

              <div className={`mt-8 pt-6 border-t ${border} space-y-4`}>
                <div className="text-[10px] font-mono text-zinc-500 flex justify-between">
                  <span>PayJustNow 3x</span>
                  <span className={textPrimary}>R {payJustNowRate}</span>
                </div>

                <button 
                  onClick={() => onAddToCart(p, currentSwatch)}
                  className={`w-full py-4 mt-2 ${isDarkMode ? 'bg-white text-black hover:bg-zinc-200' : 'bg-black text-white hover:bg-zinc-800'} text-[10px] font-semibold uppercase tracking-[0.2em] text-center transition-colors duration-500`}
                >
                  Add to Bag
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* AI Lip Shape & Color Matcher (Experiential Tool) */}
      <div className={`${bgPrimary} border ${border} p-12 mt-16 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center text-left transition-colors duration-700`}>
        <div className="lg:col-span-6 space-y-6">
          <div>
            <span className="text-[10px] uppercase tracking-[0.2em] text-zinc-400 font-mono block">Experiential AI System</span>
            <h3 className={`text-3xl font-serif font-light ${textPrimary} tracking-wide mt-2`}>Lip Shape & Color Matcher</h3>
          </div>
          <p className={`text-sm ${textSecondary} leading-relaxed tracking-wide`}>
            Preview our high-definition formulas rendered directly onto specific volumetric shapes. Test structural lip fillers, contour techniques, and customized textures before committing to a shade.
          </p>

          <div className="space-y-6 pt-6">
            <div className="space-y-3">
              <span className="text-[10px] font-mono uppercase text-zinc-500 tracking-[0.1em] block">Step 2: Choose Lip Shape</span>
              <div className="flex flex-wrap gap-3">
                {['Natural', 'M-Shape Contour', 'Heart Shape'].map(shape => (
                  <button
                    key={shape}
                    onClick={() => setMatchShape(shape)}
                    className={`text-[10px] px-4 py-2 border font-mono uppercase tracking-[0.1em] transition-all duration-300 ${
                      matchShape === shape 
                        ? (isDarkMode ? 'border-white text-white' : 'border-black text-black') 
                        : (isDarkMode ? 'border-white/10 text-zinc-500 hover:border-white/30' : 'border-black/10 text-zinc-500 hover:border-black/30')
                    }`}
                  >
                    {shape}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <span className="text-[10px] font-mono uppercase text-zinc-500 tracking-[0.1em] block">Step 3: Choose Texture</span>
              <div className="flex flex-wrap gap-3">
                {['Comfortable Matte', 'High-Fashion Gloss'].map(tex => (
                  <button
                    key={tex}
                    onClick={() => setMatchTexture(tex)}
                    className={`text-[10px] px-4 py-2 border font-mono uppercase tracking-[0.1em] transition-all duration-300 ${
                      matchTexture === tex 
                        ? (isDarkMode ? 'border-white text-white' : 'border-black text-black') 
                        : (isDarkMode ? 'border-white/10 text-zinc-500 hover:border-white/30' : 'border-black/10 text-zinc-500 hover:border-black/30')
                    }`}
                  >
                    {tex}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-6 flex justify-center relative">
          <div className={`relative w-full max-w-[400px] aspect-[4/5] ${bgSecondary} border ${border} overflow-hidden shadow-xl`}>
            <img 
              src="https://res.cloudinary.com/dafc66cma/image/upload/q_auto/f_auto/v1780597643/PB_photoshoot_Lipcolour_gev2jy.jpg" 
              alt="AI Lip Match Model View" 
              className="w-full h-full object-cover"
            />
            <div 
              className="absolute inset-0 mix-blend-color opacity-30 transition-all duration-1000" 
              style={{ backgroundColor: matchColor }}
            />
            <div className={`absolute bottom-6 left-6 right-6 ${isDarkMode ? 'bg-black/60' : 'bg-white/80'} backdrop-blur-md p-4 border ${border} text-center space-y-2`}>
              <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-[0.2em] block">Render Output</span>
              <span className={`text-[11px] ${textPrimary} font-mono tracking-wide block`}>Shape: <span className="font-semibold">{matchShape}</span> <br/> Texture: <span className="font-semibold">{matchTexture}</span></span>
            </div>
          </div>
        </div>
      </div>

    </section>
  );
}
