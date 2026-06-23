// File: src/components/ProductStore.tsx
import React, { useState, useEffect } from 'react';
import { Product } from '../types';
import { products } from '../data';
import { 
  ShoppingBag, Tag, Leaf, Heart, Recycle, 
  Globe, Truck, RotateCcw, Lock, Headphones, ArrowRight, X 
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
  
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [activeProductId, setActiveProductId] = useState<string | null>(null);
  const [selectedVariant, setSelectedVariant] = useState<string | null>(null);
  const [qty, setQty] = useState<number>(1);

  // Group products into unique categories
  const categories = Array.from(new Set(products.map(p => p.category)));

  // Products belonging to the selected category
  const categoryProducts = selectedCategory 
    ? products.filter(p => p.category === selectedCategory)
    : [];

  // Active product being viewed in the modal
  const product = products.find(p => p.id === activeProductId) || categoryProducts[0];

  // When a category is opened, reset to its first product
  useEffect(() => {
    if (selectedCategory && categoryProducts.length > 0) {
      const initialProduct = categoryProducts[0];
      setActiveProductId(initialProduct.id);
      
      if (initialProduct.tones && initialProduct.tones.length > 0) {
        setSelectedVariant(initialProduct.tones[0].name);
      } else if (initialProduct.swatches && initialProduct.swatches.length > 0) {
        setSelectedVariant(initialProduct.swatches[0]);
      } else {
        setSelectedVariant(null);
      }
      setQty(1);
    }
  }, [selectedCategory]);

  const getAverageRating = () => {
    if (!product || !product.reviews || product.reviews.length === 0) return 5;
    const total = product.reviews.reduce((acc, r) => acc + r.rating, 0);
    return Math.round(total / product.reviews.length);
  };

  const avgRating = product ? getAverageRating() : 5;
  const reviewCount = product?.reviews ? product.reviews.length : 124;

  let mainImage = product?.image;
  if (!mainImage && product?.swatches && product.swatches.length > 0) {
    mainImage = product.swatches.includes(selectedVariant || '') 
      ? selectedVariant! 
      : product.swatches[0];
  }

  // Handle preventing body scroll when modal is open
  useEffect(() => {
    if (selectedCategory) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedCategory]);

  return (
    <section className="bg-[#fcf8f0] text-[#0a0a0a] font-sans -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 py-12 rounded-3xl overflow-hidden min-h-screen">
      
      {/* ===== HEADER ===== */}
      <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between flex-wrap mb-10 gap-2">
        <div>
          <h2 className="text-[2rem] font-extrabold tracking-[-0.5px] text-[#0a0a0a] mb-2 leading-tight">Shop Collections</h2>
          <p className="text-[#b0a8a0] text-[16px]">Select a category to view variations and shades.</p>
        </div>
      </div>

      {/* ===== CATEGORY GRID ===== */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-16">
        {categories.map((cat, idx) => {
          const catProducts = products.filter(p => p.category === cat);
          // Only show categories that match the search query (if any)
          if (searchQuery && !cat.toLowerCase().includes(searchQuery.toLowerCase()) && !catProducts.some(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()))) {
            return null;
          }

          const repProduct = catProducts[0];
          const repImage = repProduct.image || (repProduct.swatches && repProduct.swatches[0]);
          const minPrice = Math.min(...catProducts.map(p => p.price));
          const totalItems = catProducts.length;

          return (
            <div 
              key={idx}
              onClick={() => setSelectedCategory(cat)}
              className="bg-white rounded-3xl overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_50px_rgba(212,175,55,0.15)] transition-all duration-500 cursor-pointer border border-[#d4af37]/20 hover:-translate-y-2 hover:border-[#d4af37] group flex flex-col relative"
            >
              <div className="aspect-[4/3] bg-[#fcf8f0] flex items-center justify-center p-8 relative overflow-hidden">
                {repImage ? (
                  <img src={repImage} alt={cat} className="w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-700 ease-out" />
                ) : (
                  <span className="text-[#b0a8a0] font-mono text-xs uppercase tracking-widest">{cat}</span>
                )}
                
                <div className="absolute top-4 right-4 bg-[#0a0a0a] text-[#d4af37] text-[10px] font-extrabold uppercase px-3 py-1.5 rounded-full tracking-[0.5px]">
                  {totalItems} {totalItems === 1 ? 'Item' : 'Items'}
                </div>
              </div>
              
              <div className="p-6 flex flex-col flex-grow items-center text-center">
                <div className="text-[11px] uppercase text-[#b8960f] tracking-[1px] font-bold mb-2">Collection</div>
                <h3 className="text-2xl font-black text-[#0a0a0a] mb-2">{cat}</h3>
                
                <div className="font-extrabold text-[15px] text-[#b0a8a0] mt-auto">
                  From R {minPrice.toFixed(2)}
                </div>
                
                <button 
                  className="mt-5 w-full py-3 bg-[#0a0a0a] rounded-full font-bold text-[13px] text-[#d4af37] uppercase tracking-[0.5px] transition-all duration-300 group-hover:bg-[#d4af37] group-hover:text-[#0a0a0a] flex justify-center items-center gap-2"
                >
                  Explore Variants <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* ===== TRUST BAR ===== */}
      <div className="mt-auto bg-[#0a0a0a] rounded-3xl py-10 px-4 shadow-[0_8px_30px_rgba(0,0,0,0.3)] border border-[#d4af37]">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="flex flex-col items-center gap-2 p-2">
            <Truck className="w-8 h-8 text-[#d4af37] mb-1" />
            <h4 className="text-[#f0d98c] font-bold text-[15px]">Shipping Nationwide</h4>
            <p className="text-[#b0a8a0] text-[13px]">On orders over R1000</p>
          </div>
          <div className="flex flex-col items-center gap-2 p-2">
            <RotateCcw className="w-8 h-8 text-[#d4af37] mb-1" />
            <h4 className="text-[#f0d98c] font-bold text-[15px]">Easy Returns</h4>
            <p className="text-[#b0a8a0] text-[13px]">30-day return policy</p>
          </div>
          <div className="flex flex-col items-center gap-2 p-2">
            <Lock className="w-8 h-8 text-[#d4af37] mb-1" />
            <h4 className="text-[#f0d98c] font-bold text-[15px]">Secure Payments</h4>
            <p className="text-[#b0a8a0] text-[13px]">100% protected checkout</p>
          </div>
          <div className="flex flex-col items-center gap-2 p-2">
            <Headphones className="w-8 h-8 text-[#d4af37] mb-1" />
            <h4 className="text-[#f0d98c] font-bold text-[15px]">Customer Support</h4>
            <p className="text-[#b0a8a0] text-[13px]">Here to help anytime</p>
          </div>
        </div>
      </div>

      {/* ===== POP-OUT MODAL (PRODUCT DETAILS) ===== */}
      {selectedCategory && product && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-hidden">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-[#0a0a0a]/80 backdrop-blur-md animate-fade-in"
            onClick={() => setSelectedCategory(null)}
          ></div>
          
          {/* Modal Content */}
          <div className="relative bg-white w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-[2rem] p-6 sm:p-10 shadow-2xl animate-scale-in border border-[#d4af37]/30 flex flex-col md:flex-row gap-8 lg:gap-12 hide-scrollbar">
            
            {/* Close Button */}
            <button 
              onClick={() => setSelectedCategory(null)}
              className="absolute top-6 right-6 p-2 bg-[#fcf8f0] text-[#0a0a0a] rounded-full hover:bg-[#d4af37] transition-colors z-20"
            >
              <X className="w-5 h-5" />
            </button>

            {/* GALLERY */}
            <div className="flex flex-col gap-4 w-full md:w-1/2 shrink-0">
              <div className="rounded-2xl overflow-hidden aspect-square flex items-center justify-center bg-[#fcf8f0] border-2 border-[#d4af37]/50 relative">
                {mainImage ? (
                  <img src={mainImage} alt={product.name} className="w-full h-full object-cover" />
                ) : (
                  <span className="text-[#b0a8a0] font-mono tracking-widest uppercase">{product.category}</span>
                )}
              </div>
              
              {/* Thumbnail Swatches (if applicable to the specific active product) */}
              {product.swatches && product.swatches.length > 0 && (
                <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                  {product.swatches.map((sw, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedVariant(sw)}
                      className={`w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 border-2 transition-all bg-[#fcf8f0] ${
                        selectedVariant === sw 
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
            <div className="flex flex-col gap-4 w-full md:w-1/2 pt-2 md:pt-0">
              <div className="flex flex-wrap gap-2">
                <span className="bg-[#d4af37] text-[#0a0a0a] text-[10px] font-bold px-3 py-1 rounded-full tracking-widest uppercase flex items-center gap-1">
                  <Leaf className="w-3 h-3 fill-current" /> Eco-Friendly
                </span>
                <span className="bg-[#0a0a0a] text-[#d4af37] text-[10px] font-bold px-3 py-1 rounded-full tracking-widest uppercase flex items-center gap-1">
                  <Heart className="w-3 h-3 fill-current" /> Cruelty-Free
                </span>
              </div>

              <h1 className="text-3xl md:text-4xl font-black tracking-tight text-[#0a0a0a] leading-none mt-2 pr-10">
                {product.name}
              </h1>

              <div className="flex items-center text-[13px] gap-1.5 text-[#b0a8a0] font-medium">
                <Tag className="w-3.5 h-3.5 text-[#b8960f]" />
                Collection: <span className="text-[#b8960f] font-bold uppercase">{selectedCategory}</span>
              </div>

              <div className="flex items-baseline gap-3.5 mt-2">
                <span className="text-3xl font-extrabold text-[#0a0a0a]">
                  R {product.price.toFixed(2)}
                </span>
              </div>

              <div className="flex items-center gap-2 text-[#d4af37] text-[15px]">
                <span className="tracking-[2px]">
                  {Array.from({ length: 5 }).map((_, i) => (
                    i < avgRating ? '★' : '☆'
                  )).join('')}
                </span>
                <span className="text-[#b0a8a0] text-[13px]">({reviewCount} reviews)</span>
              </div>

              <p className="text-[14px] leading-relaxed text-[#1a1a1a] border-t border-[#d4af37]/25 pt-4 mt-1">
                {product.desc}
              </p>

              {/* MASTER VARIATION SELECTOR (Switches between products in the same category) */}
              {categoryProducts.length > 1 && (
                <div className="flex flex-col gap-2 mt-4 bg-[#fcf8f0] p-4 rounded-2xl border border-[#d4af37]/30">
                  <label className="font-extrabold text-[12px] uppercase tracking-widest text-[#0a0a0a]">Select Item</label>
                  <div className="flex flex-wrap gap-2">
                    {categoryProducts.map((cp) => (
                      <button
                        key={cp.id}
                        onClick={() => {
                          setActiveProductId(cp.id);
                          if (cp.tones && cp.tones.length > 0) {
                            setSelectedVariant(cp.tones[0].name);
                          } else if (cp.swatches && cp.swatches.length > 0) {
                            setSelectedVariant(cp.swatches[0]);
                          } else {
                            setSelectedVariant(null);
                          }
                          setQty(1);
                        }}
                        className={`px-4 py-2 rounded-xl text-[12px] font-bold transition-all border-2 ${
                          activeProductId === cp.id
                            ? 'border-[#0a0a0a] bg-[#0a0a0a] text-[#d4af37] shadow-md'
                            : 'border-[#ccc] bg-white text-[#0a0a0a] hover:border-[#d4af37]'
                        }`}
                      >
                        {cp.name}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* COLOR VARIANTS (Hex Tones) */}
              {product.tones && product.tones.length > 0 && (
                <div className="flex flex-col gap-2 mt-2">
                  <label className="font-extrabold text-[12px] uppercase tracking-widest text-[#0a0a0a]">Select Shade</label>
                  <div className="flex flex-wrap gap-2.5">
                    {product.tones.map((tone, idx) => (
                      <button
                        key={idx}
                        onClick={() => setSelectedVariant(tone.name)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-full text-[13px] font-bold transition-all border-2 ${
                          selectedVariant === tone.name 
                            ? 'border-[#0a0a0a] bg-[#faf3e0] text-[#0a0a0a]' 
                            : 'border-[#ccc] bg-white text-[#0a0a0a] hover:border-[#d4af37]'
                        }`}
                      >
                        <span 
                          className="w-4 h-4 rounded-full border border-zinc-300 shadow-sm"
                          style={{ backgroundColor: tone.hex }}
                        ></span>
                        {tone.name}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* COLOR VARIANTS (Image Swatches Fallback) */}
              {(!product.tones || product.tones.length === 0) && product.swatches && product.swatches.length > 0 && (
                <div className="flex flex-col gap-2 mt-2">
                  <label className="font-extrabold text-[12px] uppercase tracking-widest text-[#0a0a0a]">Select Tone</label>
                  <div className="flex flex-wrap gap-2.5">
                    {product.swatches.map((sw, idx) => {
                      const toneName = `Tone ${idx + 1}`;
                      return (
                        <button
                          key={idx}
                          onClick={() => setSelectedVariant(sw)}
                          className={`px-5 py-2 rounded-full text-[13px] font-bold transition-all border-2 ${
                            selectedVariant === sw 
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
              <div className="flex flex-wrap sm:flex-nowrap items-center gap-3 mt-4">
                <div className="flex items-center border-2 border-[#0a0a0a] rounded-full overflow-hidden bg-white">
                  <button 
                    onClick={() => setQty(Math.max(1, qty - 1))} 
                    className="px-4 py-3 font-bold text-lg text-[#0a0a0a] hover:bg-[#faf3e0] transition-colors"
                  >
                    −
                  </button>
                  <span className="px-3 py-3 font-bold min-w-[3rem] text-center text-[#0a0a0a]">{qty}</span>
                  <button 
                    onClick={() => setQty(qty + 1)} 
                    className="px-4 py-3 font-bold text-lg text-[#0a0a0a] hover:bg-[#faf3e0] transition-colors"
                  >
                    +
                  </button>
                </div>
                
                <button 
                  onClick={() => {
                     onAddToCart(product, selectedVariant, qty);
                     setSelectedCategory(null); // Optional: close modal on add to cart
                  }}
                  className="flex-1 min-w-[160px] flex items-center justify-center gap-2.5 bg-[#0a0a0a] text-[#d4af37] px-6 py-4 rounded-full font-bold text-[14px] tracking-widest uppercase border-2 border-[#d4af37] hover:bg-[#d4af37] hover:text-[#0a0a0a] transition-all duration-300"
                >
                  <ShoppingBag className="w-[18px] h-[18px]" /> Add to Cart
                </button>
              </div>

              {/* REVIEWS */}
              {product.reviews && product.reviews.length > 0 && (
                <div className="mt-6 pt-6 border-t border-zinc-200">
                  <h3 className="font-extrabold text-[12px] uppercase tracking-widest mb-4">Recent Reviews</h3>
                  <div className="space-y-3">
                    {product.reviews.map((rev, i) => (
                      <div key={i} className="bg-[#faf3e0]/50 p-4 rounded-2xl">
                        <div className="flex justify-between items-center mb-1">
                          <span className="font-bold text-xs">{rev.author}</span>
                          <span className="text-[10px] text-zinc-500">{rev.date}</span>
                        </div>
                        <div className="text-[#d4af37] text-[10px] mb-2 tracking-widest">
                          {Array.from({ length: 5 }).map((_, idx) => (
                            idx < rev.rating ? '★' : '☆'
                          )).join('')}
                        </div>
                        <p className="text-[13px] text-zinc-700 italic">"{rev.text}"</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>
      )}

    </section>
  );
}
