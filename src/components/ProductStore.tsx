// File: src/components/ProductStore.tsx
import React, { useState } from 'react';
import { Product } from '../types';
import { products } from '../data';
import { ArrowRight, Leaf, Heart, Recycle, Globe, ShieldCheck, Truck, RotateCcw, Lock, HeadphonesIcon, Tag, Star, ChevronLeft } from 'lucide-react';

interface ProductStoreProps {
  isDarkMode: boolean;
  onAddToCart: (p: Product, shade: string | null, qty?: number) => void;
  activeTab: string;
  setActiveTab: (val: string) => void;
  searchQuery: string;
  setSearchQuery: (val: string) => void;
}

export default function ProductStore({ 
  isDarkMode,
  onAddToCart, 
  activeTab, 
  setActiveTab, 
  searchQuery, 
  setSearchQuery 
}: ProductStoreProps) {
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [detailShade, setDetailShade] = useState<string | null>(null);
  const [qty, setQty] = useState<number>(1);

  const filteredProducts = products.filter(p => {
    const matchesTab = activeTab === 'All' || p.category === activeTab;
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.desc.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const handleOpenDetail = (p: Product) => {
    setSelectedProductId(p.id);
    setDetailShade(p.swatches.length > 0 ? p.swatches[0] : null);
    setQty(1);
    window.scrollTo({ top: document.getElementById('explore-products')?.offsetTop || 0, behavior: 'smooth' });
  };

  const handleCloseDetail = () => {
    setSelectedProductId(null);
  };

  const bgPrimary = isDarkMode ? 'bg-[#0A0A0F]' : 'bg-[#fcf8f0]';
  const bgSecondary = isDarkMode ? 'bg-[#141414]' : 'bg-white';
  const textPrimary = isDarkMode ? 'text-white' : 'text-[#0a0a0a]';
  const textSecondary = isDarkMode ? 'text-zinc-400' : 'text-[#b0a8a0]';
  const border = isDarkMode ? 'border-[#D4AF37]/20' : 'border-[#D4AF37]/30';

  // Render the detailed view if a product is selected
  if (selectedProductId) {
    const product = products.find(p => p.id === selectedProductId);
    if (!product) return null;

    return (
      <section id="explore-products" className={`pt-12 animate-fade-in ${bgPrimary}`}>
        <div className="mb-6 flex items-center space-x-2 text-sm text-[#D4AF37]">
          <button onClick={handleCloseDetail} className="flex items-center hover:text-white transition-colors">
            <ChevronLeft className="w-4 h-4 mr-1" />
            Back to Collection
          </button>
        </div>

        <div className={`grid grid-cols-1 md:grid-cols-2 gap-12 ${bgSecondary} rounded-2xl p-6 md:p-10 shadow-2xl border ${border}`}>
          
          {/* GALLERY */}
          <div className="flex flex-col gap-4">
            <div className={`rounded-xl overflow-hidden aspect-square flex items-center justify-center border-2 border-[#D4AF37] relative ${isDarkMode ? 'bg-black' : 'bg-[#fcf8f0]'}`}>
              {detailShade ? (
                <img src={detailShade} alt={product.name} className="w-full h-full object-cover" />
              ) : (
                <span className="text-zinc-500 font-mono tracking-widest uppercase">{product.category}</span>
              )}
            </div>
            
            {product.swatches.length > 0 && (
              <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                {product.swatches.map((sw, idx) => (
                  <button
                    key={idx}
                    onClick={() => setDetailShade(sw)}
                    className={`w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 border-2 transition-all duration-300 ${detailShade === sw ? 'border-[#D4AF37] shadow-[0_0_0_2px_rgba(212,175,55,0.25)]' : 'border-transparent hover:border-[#D4AF37]'}`}
                  >
                    <img src={sw} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* INFO */}
          <div className="flex flex-col gap-5">
            <div className="flex flex-wrap gap-2 mb-2">
              <span className="bg-[#D4AF37]/20 text-[#D4AF37] text-[10px] font-bold px-3 py-1 rounded-full tracking-widest uppercase border border-[#D4AF37]">
                <Leaf className="w-3 h-3 inline mr-1" /> Eco-Friendly
              </span>
              <span className="bg-black text-[#D4AF37] text-[10px] font-bold px-3 py-1 rounded-full tracking-widest uppercase border border-[#D4AF37]">
                <Heart className="w-3 h-3 inline mr-1" /> Cruelty-Free
              </span>
            </div>

            <h1 className={`text-3xl md:text-4xl font-extrabold tracking-tight ${textPrimary} leading-tight`}>
              {product.name}
            </h1>

            <div className="flex items-center text-sm gap-2 text-[#D4AF37]">
              <Tag className="w-3.5 h-3.5" />
              <span className="font-semibold text-zinc-500 uppercase tracking-widest text-[11px]">Category:</span>
              <span className="font-bold cursor-pointer hover:text-white transition-colors uppercase tracking-widest text-[11px]">{product.category}</span>
            </div>

            <div className="flex items-baseline gap-4 mt-2">
              <span className={`text-3xl font-extrabold ${textPrimary}`}>R {product.price.toFixed(2)}</span>
            </div>

            <div className="flex items-center gap-2 text-[#D4AF37] text-sm mt-1">
              <span className="tracking-widest"><Star className="w-4 h-4 inline fill-current"/> <Star className="w-4 h-4 inline fill-current"/> <Star className="w-4 h-4 inline fill-current"/> <Star className="w-4 h-4 inline fill-current"/> <Star className="w-4 h-4 inline fill-current"/></span>
              <span className={textSecondary}>(124 reviews)</span>
            </div>

            <p className={`text-sm md:text-base leading-relaxed ${textSecondary} border-t border-[#D4AF37]/20 pt-5 mt-2 font-light`}>
              {product.desc}
            </p>

            {product.swatches.length > 0 && (
              <div className="flex flex-col gap-3 mt-4">
                <label className={`font-bold text-sm ${textPrimary} tracking-wider uppercase`}>Select Tone</label>
                <div className="flex flex-wrap gap-3">
                  {product.swatches.map((sw, idx) => (
                    <button
                      key={idx}
                      onClick={() => setDetailShade(sw)}
                      className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all duration-300 border-2 ${
                        detailShade === sw 
                          ? 'border-[#D4AF37] bg-black text-[#D4AF37]' 
                          : `border-zinc-700 ${bgSecondary} ${textPrimary} hover:border-[#D4AF37] hover:text-[#D4AF37]`
                      }`}
                    >
                      Tone {idx + 1}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mt-6">
              <div className={`flex items-center border border-[#D4AF37] rounded-full overflow-hidden ${isDarkMode ? 'bg-black' : 'bg-white'}`}>
                <button onClick={() => setQty(Math.max(1, qty - 1))} className={`px-4 py-3 font-bold text-lg ${textPrimary} hover:bg-[#D4AF37]/20 transition-colors`}>−</button>
                <span className={`px-4 py-3 font-bold min-w-[3rem] text-center ${textPrimary}`}>{qty}</span>
                <button onClick={() => setQty(qty + 1)} className={`px-4 py-3 font-bold text-lg ${textPrimary} hover:bg-[#D4AF37]/20 transition-colors`}>+</button>
              </div>
              
              <button 
                onClick={() => onAddToCart(product, detailShade, qty)}
                className="flex-1 flex items-center justify-center gap-2 bg-black text-[#D4AF37] px-8 py-4 rounded-full font-bold text-sm tracking-widest uppercase border-2 border-[#D4AF37] hover:bg-[#D4AF37] hover:text-black transition-all duration-300 shadow-[0_8px_30px_rgba(0,0,0,0.3)] hover:shadow-[0_8px_28px_rgba(212,175,55,0.25)] hover:-translate-y-1"
              >
                Add to Cart
              </button>
            </div>

            <div className="flex flex-wrap gap-6 pt-6 border-t border-[#D4AF37]/20 mt-4">
              <span className={`flex items-center gap-2 text-xs ${textSecondary}`}>
                <Recycle className="w-4 h-4 text-[#D4AF37]" /> 100% Recyclable
              </span>
              <span className={`flex items-center gap-2 text-xs ${textSecondary}`}>
                <Leaf className="w-4 h-4 text-[#D4AF37]" /> Plant-Based
              </span>
              <span className={`flex items-center gap-2 text-xs ${textSecondary}`}>
                <Globe className="w-4 h-4 text-[#D4AF37]" /> Carbon Neutral
              </span>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Render the grid view if no product is selected
  return (
    <section id="explore-products" className="pt-12 space-y-8 animate-fade-in">
      
      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-8">
        <div>
          <h2 className={`text-3xl font-extrabold tracking-tight ${textPrimary}`}>Shop Our Collection</h2>
          <p className={`text-sm mt-2 ${textSecondary}`}>Premium curated cosmetics for a flawless, sustainable finish.</p>
        </div>
        <div className="w-full md:w-80">
          <input 
            type="text" 
            placeholder="Search our catalog..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`w-full bg-transparent border-b-2 ${isDarkMode ? 'border-[#D4AF37]/50 focus:border-[#D4AF37] text-white' : 'border-[#D4AF37]/50 focus:border-[#D4AF37] text-black'} py-2 outline-none transition-colors duration-300 text-sm`}
          />
        </div>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredProducts.map((p, idx) => (
          <div 
            key={p.id} 
            onClick={() => handleOpenDetail(p)}
            className={`${bgSecondary} rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer border ${border} hover:-translate-y-2 hover:border-[#D4AF37] group`}
            style={{ transitionDelay: `${idx * 50}ms` }}
          >
            <div className={`aspect-square ${isDarkMode ? 'bg-black' : 'bg-[#fcf8f0]'} flex items-center justify-center p-6 relative`}>
              {p.swatches.length > 0 ? (
                <img src={p.swatches[0]} alt={p.name} className="w-full h-full object-cover rounded-lg group-hover:scale-105 transition-transform duration-700" />
              ) : (
                <span className="text-zinc-500 font-mono text-xs uppercase tracking-widest">{p.category}</span>
              )}
              {idx === 0 && <span className="absolute top-4 left-4 bg-[#D4AF37] text-black text-[9px] font-extrabold uppercase px-3 py-1 rounded-full tracking-widest">Best Seller</span>}
            </div>
            <div className="p-5 flex flex-col gap-2">
              <div className="text-[10px] uppercase text-[#D4AF37] tracking-widest font-bold">{p.category}</div>
              <h3 className={`text-base font-bold ${textPrimary} truncate`}>{p.name}</h3>
              <div className={`font-extrabold text-lg ${textPrimary}`}>R {p.price.toFixed(2)}</div>
              <button 
                onClick={(e) => { e.stopPropagation(); onAddToCart(p, p.swatches.length > 0 ? p.swatches[0] : null, 1); }}
                className="mt-3 w-full py-2.5 border-2 border-zinc-700 bg-transparent rounded-full font-bold text-xs uppercase tracking-widest transition-all duration-300 hover:bg-[#D4AF37] hover:border-[#D4AF37] hover:text-black"
              >
                Quick Add
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* TRUST BAR */}
      <div className={`mt-16 bg-[#0A0A0F] rounded-2xl p-8 border border-[#D4AF37] shadow-[0_8px_30px_rgba(0,0,0,0.3)]`}>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
          <div className="flex flex-col items-center gap-2">
            <Truck className="w-8 h-8 text-[#D4AF37]" />
            <h4 className="text-[#f0d98c] font-bold text-sm tracking-wider uppercase">Free Shipping</h4>
            <p className="text-zinc-400 text-xs">On orders over R1000</p>
          </div>
          <div className="flex flex-col items-center gap-2">
            <RotateCcw className="w-8 h-8 text-[#D4AF37]" />
            <h4 className="text-[#f0d98c] font-bold text-sm tracking-wider uppercase">Easy Returns</h4>
            <p className="text-zinc-400 text-xs">30-day return policy</p>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Lock className="w-8 h-8 text-[#D4AF37]" />
            <h4 className="text-[#f0d98c] font-bold text-sm tracking-wider uppercase">Secure Payments</h4>
            <p className="text-zinc-400 text-xs">100% protected checkout</p>
          </div>
          <div className="flex flex-col items-center gap-2">
            <HeadphonesIcon className="w-8 h-8 text-[#D4AF37]" />
            <h4 className="text-[#f0d98c] font-bold text-sm tracking-wider uppercase">Client Support</h4>
            <p className="text-zinc-400 text-xs">Here to help anytime</p>
          </div>
        </div>
      </div>

    </section>
  );
}
