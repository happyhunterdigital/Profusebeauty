// File: src/components/ProductStore.tsx
import React, { useState } from 'react';
import { Product } from '../types';
import { products } from '../data';

interface ProductStoreProps {
  isDarkMode: boolean;
  onAddToCart: (p: Product, shade: string | null) => void;
  activeTab: string;
  setActiveTab: (val: string) => void;
  searchQuery: string;
  setSearchQuery: (val: string) => void;
}

interface SelectedVariants {
  [productId: string]: string;
}

export default function ProductStore({ 
  isDarkMode,
  onAddToCart, 
  activeTab, 
  setActiveTab, 
  searchQuery, 
  setSearchQuery 
}: ProductStoreProps) {
  const [selectedVariants, setSelectedVariants] = useState<SelectedVariants>({});

  const handleSwatchSelect = (prodId: string, shade: string): void => {
    setSelectedVariants(prev => ({ ...prev, [prodId]: shade }));
  };

  const filteredProducts = products.filter(p => {
    const matchesTab = activeTab === 'All' || p.category === activeTab;
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.desc.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const bgPrimary = isDarkMode ? 'bg-[#1c1917]' : 'bg-[#f5f5f4]';
  const textPrimary = isDarkMode ? 'text-[#f5f5f4]' : 'text-[#1c1917]';
  const textSecondary = isDarkMode ? 'text-[#e7e5e4]' : 'text-zinc-600';
  const border = isDarkMode ? 'border-white/5' : 'border-black/5';

  return (
    <section id="explore-products" className={`pt-12 border-t ${border} space-y-12 animate-fade-in`}>
      
      <div className={`flex flex-col md:flex-row justify-between items-start md:items-center gap-6 p-8 border ${border} transition-colors duration-700`}>
        <div>
          <span className="text-[10px] font-mono tracking-[0.2em] text-zinc-400 uppercase">Inventory Search</span>
          <h2 className={`text-3xl font-serif font-light ${textPrimary} mt-2`}>Refine Selection</h2>
        </div>
        <div className="w-full md:w-96">
          <input 
            type="text" 
            placeholder="Search synonyms (SPF, glass skin, cica)..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`w-full bg-transparent border-b ${isDarkMode ? 'border-white/20 text-white focus:border-white' : 'border-black/20 text-black focus:border-black'} text-sm py-4 outline-none transition-colors duration-500 font-light tracking-wide placeholder:opacity-50`}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProducts.map((p, idx) => {
          const currentShade = selectedVariants[p.id] || (p.swatches.length > 0 ? p.swatches[0] : null);
          const payJustNowRate = (p.price / 3).toFixed(2);
          const delayClass = `delay-[${idx * 100}ms]`;

          return (
            <div 
              key={p.id} 
              className={`${isDarkMode ? 'bg-zinc-900/30' : 'bg-white/50'} border ${border} p-8 flex flex-col justify-between ${isDarkMode ? 'hover:border-white/20' : 'hover:border-black/20'} transition-all duration-700 group animate-fade-in ${delayClass}`}
            >
              <div className="space-y-6">
                <div className={`aspect-[4/5] w-full ${isDarkMode ? 'bg-[#1c1917]' : 'bg-[#f5f5f4]'} flex items-center justify-center relative overflow-hidden`}>
                  {currentShade ? (
                    <img 
                      src={currentShade} 
                      alt={p.name} 
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                    />
                  ) : (
                    <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-[0.2em]">
                      {p.category}
                    </span>
                  )}
                </div>

                {p.swatches.length > 0 && (
                  <div className="space-y-3">
                    <span className="text-[9px] uppercase tracking-[0.2em] text-zinc-500 block">Available Tones</span>
                    <div className="flex space-x-3 overflow-x-auto py-1 scrollbar-hide">
                      {p.swatches.map(sw => (
                        <button
                          key={sw}
                          onClick={() => handleSwatchSelect(p.id, sw)}
                          style={{ backgroundColor: sw.includes('Shade_03') ? '#EED2BA' : sw.includes('Shade_05') ? '#E5C2A3' : sw.includes('Shade_06') ? '#DBB18C' : sw.includes('Shade_07') ? '#BD8C5E' : '#A7764A' }}
                          aria-label={`Select shade hex ${sw}`}
                          className={`w-5 h-5 rounded-full border transition-all duration-300 ${currentShade === sw ? (isDarkMode ? 'border-white scale-110' : 'border-black scale-110') : 'border-transparent opacity-70 hover:opacity-100'}`}
                        />
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex justify-between items-start pt-2">
                  <h3 className={`font-serif text-xl font-light ${textPrimary} tracking-wide`}>{p.name}</h3>
                  <span className={`font-mono text-sm font-medium ${textPrimary}`}>R {p.price.toFixed(2)}</span>
                </div>
                
                {p.id === 'p1' ? (
                  <div className="space-y-4">
                    <div className={`flex items-center space-x-2 text-[10px] ${textPrimary} tracking-[0.2em]`}>
                      <span>★ ★ ★ ★ ★</span>
                      <span className={`font-mono ${textSecondary}`}>(2 Reviews)</span>
                    </div>
                    <p className={`text-xs ${textSecondary} leading-relaxed tracking-wide`}>{p.desc}</p>
                    <div className={`text-[10px] space-y-2 ${textSecondary} font-mono border-t ${border} pt-4`}>
                      <p>✓ Designed for diverse African skin tones</p>
                      <p>✓ Long-wear, transfer-resistant formula</p>
                      <p>✓ Matte, high-definition SPF 25 finish</p>
                      <p>✓ 30ml pump bottle</p>
                    </div>
                  </div>
                ) : (
                  <p className={`text-xs ${textSecondary} leading-relaxed tracking-wide`}>{p.desc}</p>
                )}
              </div>

              <div className={`mt-8 pt-6 border-t ${border} space-y-4`}>
                <div className="text-[10px] font-mono text-zinc-500 flex justify-between">
                  <span>PayJustNow 3x</span>
                  <span className={`${textPrimary}`}>R {payJustNowRate}</span>
                </div>

                <div className="text-[9px] font-mono text-zinc-400">
                  Complimentary express shipping on orders placed today.
                </div>

                <button 
                  onClick={() => onAddToCart(p, currentShade)}
                  className={`w-full py-4 mt-2 ${isDarkMode ? 'bg-white text-black hover:bg-zinc-200' : 'bg-black text-white hover:bg-zinc-800'} text-[10px] font-semibold uppercase tracking-[0.2em] text-center transition-colors duration-500`}
                >
                  Add to Bag
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <div className={`p-10 border ${border} space-y-8 mt-16 text-left`}>
        <h3 className={`font-serif text-2xl font-light ${textPrimary} tracking-wide`}>Client Testimonials</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className={`space-y-4 p-8 border ${border} ${isDarkMode ? 'bg-zinc-900/20' : 'bg-white/50'}`}>
            <div className="flex justify-between items-center">
              <span className={`font-mono text-xs ${textPrimary} tracking-[0.1em]`}>Mary K</span>
              <span className="text-[10px] text-zinc-500 font-mono">1 December 2021</span>
            </div>
            <span className={`text-[10px] ${textPrimary} tracking-[0.2em] block`}>★ ★ ★ ★ ★</span>
            <p className={`text-sm ${textSecondary} leading-relaxed italic font-serif`}>
              "Love this foundation. It’s gentle on skin and stays on all day!"
            </p>
          </div>
          <div className={`space-y-4 p-8 border ${border} ${isDarkMode ? 'bg-zinc-900/20' : 'bg-white/50'}`}>
            <div className="flex justify-between items-center">
              <span className={`font-mono text-xs ${textPrimary} tracking-[0.1em]`}>Funeka</span>
              <span className="text-[10px] text-zinc-500 font-mono">16 February 2022</span>
            </div>
            <span className={`text-[10px] ${textPrimary} tracking-[0.2em] block`}>★ ★ ★ ★ ★</span>
            <p className={`text-sm ${textSecondary} leading-relaxed italic font-serif`}>
              "I love this precious product and I would continue using it! It is lightweight and the colour on the high bone cheeks looks just perfect!"
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
