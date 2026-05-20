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

// Local Synonym expansion table to resolve terms without API key requests
const synonyms: { [key: string]: string } = {
  "spf": "foundation",
  "sunscreen": "foundation",
  "glass skin": "gloss",
  "cica": "foundation",
  "acne": "powder",
  "oil": "powder"
};

export default function ProductStore({ 
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

  const getExpandedQuery = (query: string): string => {
    const clean = query.trim().toLowerCase();
    return synonyms[clean] || clean;
  };

  const filteredProducts = products.filter(p => {
    const matchesTab = activeTab === 'All' || p.category === activeTab;
    const expanded = getExpandedQuery(searchQuery);
    const matchesSearch = p.name.toLowerCase().includes(expanded) || 
                          p.category.toLowerCase().includes(expanded) ||
                          p.desc.toLowerCase().includes(expanded);
    return matchesTab && matchesSearch;
  });

  return (
    <section id="explore-products" className="pt-8 border-t border-white/5 space-y-8">
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-zinc-950/40 p-4 border border-white/5">
        <div>
          <span className="text-[10px] font-mono tracking-widest text-[#fbbf24] uppercase">Inventory Search</span>
          <h2 className="text-xl font-serif text-white mt-1">Refine Selection</h2>
        </div>
        <div className="w-full md:w-80">
          <input 
            type="text" 
            placeholder="Search synonyms (SPF, glass skin, cica)..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-zinc-900 border border-white/10 text-xs p-3 text-white outline-none focus:border-amber-400"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map(p => {
          const currentShade = selectedVariants[p.id] || (p.swatches.length > 0 ? p.swatches[0] : null);
          const payJustNowRate = (p.price / 3).toFixed(2);

          return (
            <div 
              key={p.id} 
              className="bg-zinc-900/50 border border-white/5 p-5 flex flex-col justify-between hover:border-amber-500/20 transition-all group"
            >
              <div className="space-y-4">
                <div className="aspect-[4/3] w-full bg-zinc-950 flex items-center justify-center relative overflow-hidden">
                  <span className="text-[10px] font-mono text-zinc-600 uppercase tracking-widest">
                    {p.category} Category
                  </span>
                  
                  {currentShade && (
                    <div 
                      className="absolute bottom-4 left-4 w-8 h-8 rounded-full border border-white/20 shadow-lg" 
                      style={{ backgroundColor: currentShade }}
                    />
                  )}
                </div>

                {p.swatches.length > 0 && (
                  <div className="space-y-1">
                    <span className="text-[9px] uppercase tracking-widest text-zinc-500 block">Available Tones:</span>
                    <div className="flex space-x-2 overflow-x-auto py-1 scrollbar-hide">
                      {p.swatches.map(sw => (
                        <button
                          key={sw}
                          onClick={() => handleSwatchSelect(p.id, sw)}
                          style={{ backgroundColor: sw }}
                          aria-label={`Select shade hex ${sw}`}
                          className={`w-4 h-4 rounded-full border ${currentShade === sw ? 'border-amber-400 scale-110' : 'border-transparent'}`}
                        />
                      ))}
                    </div>
                  </div>
                )}

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

                <div className="text-[9px] font-mono text-emerald-400">
                  🚚 Delivery: Order within 3 hours to arrive by tomorrow
                </div>

                <button 
                  onClick={() => onAddToCart(p, currentShade)}
                  className="w-full py-2 bg-zinc-800 group-hover:bg-gradient-to-r group-hover:from-amber-500 group-hover:to-orange-500 group-hover:text-black text-xs font-black uppercase tracking-widest text-center transition-all"
                >
                  Quick Add
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
