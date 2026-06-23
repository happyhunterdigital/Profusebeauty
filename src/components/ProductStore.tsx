// File: src/components/ProductStore.tsx
import React, { useState, useEffect } from 'react';
import { Product } from '../types';
import { products } from '../data';
import { 
  ShoppingBag, Tag, Star, Leaf, Heart, Recycle, 
  Globe, Truck, RotateCcw, Lock, Headphones, ArrowRight 
} from 'lucide-react';

interface ProductStoreProps {
  isDarkMode: boolean;
  onAddToCart: (p: Product, shade: string | null, qty?: number) => void;
  activeTab: string;
  setActiveTab: (val: string) => void;
  searchQuery: string;
  setSearchQuery: (val: string) => void;
}

export default function ProductStore({ 
  onAddToCart, 
  searchQuery,
}: ProductStoreProps) {
  const [selectedProductId, setSelectedProductId] = useState<string>(products[0].id);
  const [detailShade, setDetailShade] = useState<string | null>(null);
  const [qty, setQty] = useState<number>(1);

  const product = products.find(p => p.id === selectedProductId) || products[0];

  useEffect(() => {
    setDetailShade(product.swatches.length > 0 ? product.swatches[0] : null);
    setQty(1);
  }, [product]);

  const filteredProducts = products.filter(p => {
    return p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
           p.desc.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <section className="bg-[#fcf8f0] text-[#0a0a0a] font-sans -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 py-12 rounded-3xl overflow-hidden">
      
      {/* ===== PRODUCT DETAIL ===== */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 bg-white rounded-2xl p-6 md:p-10 shadow-[0_8px_30px_rgba(0,0,0,0.05)] border border-[#d4af37]/20">
        
        {/* GALLERY */}
        <div className="flex flex-col gap-4">
          <div className="rounded-xl overflow-hidden aspect-square flex items-center justify-center bg-[#fcf8f0] border-2 border-[#d4af37] relative">
            {detailShade ? (
              <img src={detailShade} alt={product.name} className="w-full h-full object-cover" />
            ) : (
              <span className="text-[#b0a8a0] font-mono tracking-widest uppercase">{product.category}</span>
            )}
          </div>
          
          {product.swatches.length > 0 && (
            <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
              {product.swatches.map((sw, idx) => (
                <button
                  key={idx}
                  onClick={() => setDetailShade(sw)}
                  className={`w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 border-2 transition-all bg-[#fcf8f0] ${
                    detailShade === sw 
                      ? 'border-[#d4af37] shadow-[0_0_0_2px_rgba(212,175,55,0.25)]' 
                      : 'border-transparent hover:border-[#d4af37]'
                  }`}
                >
                  <img src={sw} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* INFO */}
        <div className="flex flex-col gap-4">
          <div className="flex flex-wrap gap-2.5">
            <span className="bg-[#d4af37] text-[#0a0a0a] text-[11px] font-bold px-3.5 py-1.5 rounded-full tracking-wider uppercase flex items-center gap-1.5">
              <Leaf className="w-3.5 h-3.5 fill-current" /> Eco-Friendly
            </span>
            <span className="bg-[#0a0a0a] text-[#d4af37] text-[11px] font-bold px-3.5 py-1.5 rounded-full tracking-wider uppercase flex items-center gap-1.5">
              <Heart className="w-3.5 h-3.5 fill-current" /> Cruelty-Free
            </span>
            <span className="bg-[#faf3e0] text-[#0a0a0a] border border-[#d4af37] text-[11px] font-bold px-3.5 py-1.5 rounded-full tracking-wider uppercase">
              Premium Quality
            </span>
          </div>

          <h1 className="text-4xl md:text-[2.5rem] font-extrabold tracking-tight text-[#0a0a0a] leading-none mt-2">
            {product.name}
          </h1>

          <div className="flex items-center text-[13px] gap-1.5 text-[#b0a8a0] font-medium">
            <Tag className="w-3.5 h-3.5 text-[#b8960f]" />
            Category: <span className="text-[#b8960f] font-bold hover:text-[#0a0a0a] transition-colors cursor-pointer">{product.category}</span>
          </div>

          <div className="flex items-baseline gap-3.5 mt-2">
            <span className="text-3xl md:text-4xl font-extrabold text-[#0a0a0a]">
              ${(product.price * 0.81).toFixed(2)}
            </span>
            <span className="text-lg text-[#b0a8a0] line-through">${product.price.toFixed(2)}</span>
            <span className="bg-[#d4af37] text-[#0a0a0a] text-[11px] font-bold px-3 py-0.5 rounded-full">
              −19%
            </span>
          </div>

          <div className="flex items-center gap-2 text-[#d4af37] text-[15px] mt-1">
            <span className="tracking-[2px]">★★★★★</span>
            <span className="text-[#b0a8a0] text-[13px]">(124 reviews)</span>
          </div>

          <p className="text-[15px] leading-relaxed text-[#1a1a1a] border-t border-[#d4af37]/25 pt-4 mt-1">
            {product.desc}
          </p>

          {/* COLOR VARIANTS */}
          {product.swatches.length > 0 && (
            <div className="flex flex-col gap-2 mt-2">
              <label className="font-bold text-[14px] text-[#0a0a0a]">Color</label>
              <div className="flex flex-wrap gap-2.5">
                {product.swatches.map((sw, idx) => {
                  // Generate names like Natural, Charcoal, Olive based on index for the demo look
                  const toneNames = ["Natural", "Charcoal", "Olive", "Sand", "Rose", "Plum"];
                  const toneName = toneNames[idx] || `Tone ${idx + 1}`;
                  return (
                    <button
                      key={idx}
                      onClick={() => setDetailShade(sw)}
                      className={`px-5 py-2 rounded-full text-[13px] font-bold transition-all border-2 ${
                        detailShade === sw 
                          ? 'border-[#d4af37] bg-[#0a0a0a] text-[#d4af37]' 
                          : 'border-[#ccc] bg-white text-[#0a0a0a] hover:border-[#d4af37] hover:text-[#b8960f]'
                      }`}
                    >
                      {toneName}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* QTY & ADD */}
          <div className="flex flex-wrap sm:flex-nowrap items-center gap-4 mt-2">
            <div className="flex items-center border border-[#0a0a0a] rounded-full overflow-hidden bg-white">
              <button 
                onClick={() => setQty(Math.max(1, qty - 1))} 
                className="px-5 py-2.5 font-bold text-lg text-[#0a0a0a] hover:bg-[#faf3e0] transition-colors"
              >
                −
              </button>
              <span className="px-4 py-2.5 font-bold min-w-[3rem] text-center text-[#0a0a0a]">{qty}</span>
              <button 
                onClick={() => setQty(qty + 1)} 
                className="px-5 py-2.5 font-bold text-lg text-[#0a0a0a] hover:bg-[#faf3e0] transition-colors"
              >
                +
              </button>
            </div>
            
            <button 
              onClick={() => onAddToCart(product, detailShade, qty)}
              className="flex-1 min-w-[160px] flex items-center justify-center gap-2.5 bg-[#0a0a0a] text-[#d4af37] px-8 py-3.5 rounded-full font-bold text-[15px] tracking-[0.5px] uppercase border-2 border-[#d4af37] hover:bg-[#d4af37] hover:text-[#0a0a0a] hover:-translate-y-0.5 transition-all duration-300 hover:shadow-[0_8px_28px_rgba(212,175,55,0.25)]"
            >
              <ShoppingBag className="w-[18px] h-[18px]" /> Add to Cart
            </button>
          </div>

          {/* SUSTAIN TAGS */}
          <div className="flex flex-wrap gap-5 pt-3.5 border-t border-[#d4af37]/25 mt-1.5">
            <span className="flex items-center gap-2 text-[13px] text-[#1a1a1a]">
              <Recycle className="w-4 h-4 text-[#b8960f]" /> 100% Recyclable
            </span>
            <span className="flex items-center gap-2 text-[13px] text-[#1a1a1a]">
              <Leaf className="w-4 h-4 text-[#b8960f]" /> Plant-Based
            </span>
            <span className="flex items-center gap-2 text-[13px] text-[#1a1a1a]">
              <Globe className="w-4 h-4 text-[#b8960f]" /> Carbon Neutral
            </span>
          </div>
        </div>
      </div>

      {/* ===== TRUST BAR ===== */}
      <div className="my-10 bg-[#0a0a0a] rounded-2xl py-8 px-4 shadow-[0_8px_30px_rgba(0,0,0,0.3)] border border-[#d4af37]">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div className="flex flex-col items-center gap-1.5 p-2">
            <Truck className="w-7 h-7 text-[#d4af37] mb-1" />
            <h4 className="text-[#f0d98c] font-bold text-[14px]">Free Shipping</h4>
            <p className="text-[#b0a8a0] text-[12px]">On orders over $60</p>
          </div>
          <div className="flex flex-col items-center gap-1.5 p-2">
            <RotateCcw className="w-7 h-7 text-[#d4af37] mb-1" />
            <h4 className="text-[#f0d98c] font-bold text-[14px]">Easy Returns</h4>
            <p className="text-[#b0a8a0] text-[12px]">30-day return policy</p>
          </div>
          <div className="flex flex-col items-center gap-1.5 p-2">
            <Lock className="w-7 h-7 text-[#d4af37] mb-1" />
            <h4 className="text-[#f0d98c] font-bold text-[14px]">Secure Payments</h4>
            <p className="text-[#b0a8a0] text-[12px]">100% protected checkout</p>
          </div>
          <div className="flex flex-col items-center gap-1.5 p-2">
            <Headphones className="w-7 h-7 text-[#d4af37] mb-1" />
            <h4 className="text-[#f0d98c] font-bold text-[14px]">Customer Support</h4>
            <p className="text-[#b0a8a0] text-[12px]">Here to help anytime</p>
          </div>
        </div>
      </div>

      {/* ===== RELATED PRODUCTS GRID ===== */}
      <div className="pt-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between flex-wrap mb-6 gap-2">
          <div>
            <h2 className="text-[1.6rem] font-extrabold tracking-[-0.3px] text-[#0a0a0a] mb-2">Shop Our Favorites</h2>
            <p className="text-[#b0a8a0] text-[15px]">Handpicked sustainable essentials you'll love.</p>
          </div>
          <button className="font-bold text-[#b8960f] hover:text-[#0a0a0a] transition-colors text-[14.5px] flex items-center gap-1">
            View all products <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {filteredProducts.map((p) => (
            <div 
              key={p.id}
              onClick={() => {
                setSelectedProductId(p.id);
                window.scrollTo({ top: document.getElementById('explore-products')?.offsetTop || 0, behavior: 'smooth' });
              }}
              className="bg-white rounded-[16px] overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.05)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.15)] transition-all duration-300 cursor-pointer border border-[#d4af37]/20 hover:-translate-y-1.5 hover:border-[#d4af37] group flex flex-col"
            >
              <div className="aspect-square bg-[#fcf8f0] flex items-center justify-center p-4 relative">
                {p.swatches.length > 0 ? (
                  <img src={p.swatches[0]} alt={p.name} className="w-full h-full object-contain mix-blend-multiply" />
                ) : (
                  <span className="text-[#b0a8a0] font-mono text-xs uppercase tracking-widest">{p.category}</span>
                )}
                {/* Randomly assign a badge for styling demonstration */}
                {p.id === 'p1' && <span className="absolute top-3 left-3 bg-[#d4af37] text-[#0a0a0a] text-[10px] font-extrabold uppercase px-3 py-1 rounded-full tracking-[0.5px]">Best Seller</span>}
                {p.id === 'p2' && <span className="absolute top-3 left-3 bg-[#d4af37] text-[#0a0a0a] text-[10px] font-extrabold uppercase px-3 py-1 rounded-full tracking-[0.5px]">Eco Pick</span>}
              </div>
              
              <div className="p-4 sm:p-5 flex flex-col flex-grow">
                <div className="text-[11px] uppercase text-[#b0a8a0] tracking-[0.5px] font-semibold mb-1">{p.category}</div>
                <h3 className="text-base font-bold text-[#0a0a0a] mb-1.5 leading-tight">{p.name}</h3>
                
                <div className="font-extrabold text-[17px] text-[#0a0a0a] mt-auto">
                  ${(p.price * 0.81).toFixed(2)}
                  <span className="font-normal text-[#b0a8a0] line-through text-[13px] ml-2">${p.price.toFixed(2)}</span>
                </div>
                
                <button 
                  onClick={(e) => { 
                    e.stopPropagation(); 
                    onAddToCart(p, p.swatches.length > 0 ? p.swatches[0] : null, 1); 
                  }}
                  className="mt-3 w-full py-2.5 border-2 border-[#0a0a0a] bg-transparent rounded-full font-bold text-[13px] text-[#0a0a0a] uppercase tracking-[0.5px] transition-all duration-300 hover:bg-[#0a0a0a] hover:text-[#d4af37] hover:border-[#d4af37]"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
}
