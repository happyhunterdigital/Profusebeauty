// File: src/components/ProductStore.tsx
import React, { useState, useEffect } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { Product } from '../types';
import { products as fallbackProducts } from '../data';
import {
  ShoppingBag, Tag, Leaf, Heart, ArrowRight, X
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ProductStoreProps {
  isDarkMode: boolean;
  onAddToCart: (p: Product, shade: string | null, qty?: number) => void;
  activeTab: string;
  setActiveTab: (val: string) => void;
  searchQuery: string;
  setSearchQuery: (val: string) => void;
}

// Dynamically extracts a clean title from Cloudinary filenames
const getPrettyNameFromUrl = (url: string) => {
  try {
    const parts = url.split('/');
    const fileNameWithExt = parts[parts.length - 1];
    const fileName = fileNameWithExt.split('.')[0];
    const nameParts = fileName.split('_');
    if (nameParts.length > 1) {
      // Discard the last random string part from Cloudinary
      nameParts.pop();
    }
    return nameParts
      .join(' ')
      .replace(/-/g, ' ')
      .replace(/\b\w/g, (char) => char.toUpperCase());
  } catch (e) {
    return 'Product View';
  }
};

// Seamless Modal Image Carousel
const ModalGalleryCarousel = ({ images }: { images: string[] }) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!images || images.length <= 1) return;
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 2500);
    return () => clearInterval(timer);
  }, [images]);

  if (!images || images.length === 0) return null;

  return (
    <div className="relative w-full h-full bg-[#fcf8f0]">
      {/* Dynamic Name Label Overlay */}
      <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10 z-20 text-xs font-bold text-white shadow-lg">
        {getPrettyNameFromUrl(images[index])}
      </div>

      {images.map((src, idx) => (
        <motion.img
          key={idx}
          src={src}
          initial={{ opacity: 0 }}
          animate={{ opacity: index === idx ? 1 : 0 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0 w-full h-full object-cover object-[center_15%]"
          alt={`Product View ${idx + 1}`}
        />
      ))}
    </div>
  );
};

export default function ProductStore({
  onAddToCart,
  searchQuery
}: ProductStoreProps) {
  const [products, setProducts] = useState<Product[]>(fallbackProducts);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeProductId, setActiveProductId] = useState<string | null>(null);
  const [selectedVariant, setSelectedVariant] = useState<string | null>(null);
  const [qty, setQty] = useState<number>(1);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'products'), (snapshot) => {
      const fetched: Product[] = [];
      snapshot.forEach(doc => fetched.push({ id: doc.id, ...doc.data() } as Product));
      if (fetched.length > 0) {
        fetched.sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0));
        setProducts(fetched);
      }
    });
    return () => unsubscribe();
  }, []);

  // Filter products based on category and search query
  const filteredProducts = products.filter(p => {
    const matchesCategory = selectedCategory === 'All' || p.category.toLowerCase() === selectedCategory.toLowerCase();
    const matchesSearch = !searchQuery || 
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      p.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const product = products.find(p => p.id === activeProductId);

  // Set default variant when a product modal opens
  useEffect(() => {
    if (product) {
      if (product.tones && product.tones.length > 0) {
        setSelectedVariant(product.tones[0].name);
      } else if (product.swatches && product.swatches.length > 0) {
        setSelectedVariant(product.swatches[0]);
      } else {
        setSelectedVariant(null);
      }
      setQty(1);
    }
  }, [activeProductId]);

  const getAverageRating = (prod: Product) => {
    if (!prod.reviews || prod.reviews.length === 0) return 5;
    const total = prod.reviews.reduce((acc, r) => acc + r.rating, 0);
    return Math.round(total / prod.reviews.length);
  };

  // Prevent scroll when modal is active
  useEffect(() => {
    if (activeProductId) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [activeProductId]);

  const categoriesList = ['All', 'Face', 'Lips', 'Accessories', 'Eyes', 'Skincare'];

  return (
    <section className="bg-gradient-to-br from-[#d4af37] via-[#e5c96a] to-[#b8960f] text-[#0a0a0a] font-sans -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 py-12 rounded-3xl overflow-hidden min-h-screen shadow-inner">
      
      {/* ===== HEADER & TABS ===== */}
      <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between flex-wrap mb-10 gap-6">
        <div>
          <h2 className="text-[2rem] font-extrabold tracking-[-0.5px] text-[#0a0a0a] mb-2 leading-tight drop-shadow-sm">Shop Collections</h2>
          <p className="text-[#0a0a0a]/80 font-medium text-[16px]">Browse our professional-grade cosmetics individually.</p>
        </div>
        
        {/* Category Tabs */}
        <div className="flex flex-wrap gap-2">
          {categoriesList.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all ${
                selectedCategory === cat 
                  ? 'bg-black text-[#d4af37] shadow-lg' 
                  : 'bg-white/30 text-black hover:bg-white/60'
              }`}
            >
              #{cat}
            </button>
          ))}
        </div>
      </div>

      {/* ===== PRODUCT DIRECT GRID ===== */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8 mb-16">
        {filteredProducts.map((p, idx) => {
          const mainImg = p.image || (p.swatches && p.swatches[0]);
          return (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.05 }}
              key={p.id}
              onClick={() => setActiveProductId(p.id)}
              className="bg-white rounded-3xl overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_50px_rgba(212,175,55,0.15)] transition-all duration-500 cursor-pointer border border-[#d4af37]/20 hover:-translate-y-2 hover:border-[#d4af37] group flex flex-col relative"
            >
              <div className="aspect-[4/3] bg-[#fcf8f0] flex items-center justify-center p-6 relative overflow-hidden">
                {mainImg ? (
                  <img src={mainImg} alt={p.name} className="w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-700 ease-out" />
                ) : (
                  <span className="text-[#b0a8a0] font-mono text-xs uppercase tracking-widest">{p.category}</span>
                )}
                
                <span className="absolute top-4 left-4 bg-black/5 border border-black/10 text-[9px] uppercase tracking-widest text-[#b8960f] font-extrabold px-2.5 py-1 rounded-full">
                  {p.category}
                </span>
              </div>

              <div className="p-6 flex flex-col flex-grow items-center text-center">
                <h3 className="text-lg font-black text-[#0a0a0a] mb-2 leading-snug line-clamp-2 min-h-[3.5rem]">{p.name}</h3>

                <div className="font-extrabold text-[16px] text-zinc-900 mt-auto mb-4">
                  R {p.price.toFixed(2)}
                </div>

                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-3 bg-[#0a0a0a] rounded-full font-bold text-[11px] text-[#d4af37] uppercase tracking-[1px] transition-colors group-hover:bg-[#d4af37] group-hover:text-[#0a0a0a] flex justify-center items-center gap-2 shadow-[0_4px_14px_rgba(0,0,0,0.1)]"
                >
                  View Details <ArrowRight className="w-4 h-4" />
                </motion.button>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* ===== POP-OUT DETAILS MODAL ===== */}
      <AnimatePresence>
        {activeProductId && product && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-hidden">
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-[#0a0a0a]/80 backdrop-blur-md"
              onClick={() => setActiveProductId(null)}
            />
            
            {/* Modal Box */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="relative bg-white w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-[2rem] p-6 sm:p-10 shadow-2xl border border-[#d4af37]/30 flex flex-col md:flex-row gap-8 lg:gap-12 hide-scrollbar z-10"
            >
              {/* Close Button */}
              <button
                onClick={() => setActiveProductId(null)}
                className="absolute top-6 right-6 p-2 bg-[#fcf8f0] text-[#0a0a0a] rounded-full hover:bg-[#d4af37] transition-colors z-20"
              >
                <X className="w-5 h-5" />
              </button>

              {/* GALLERY CAROUSEL */}
              <div className="flex flex-col gap-4 w-full md:w-1/2 shrink-0">
                <div className="rounded-2xl overflow-hidden aspect-square border-2 border-[#d4af37]/50 relative bg-black shadow-inner">
                  {product.swatches && product.swatches.length > 0 ? (
                    <ModalGalleryCarousel images={product.swatches} />
                  ) : product.image ? (
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover object-[center_15%]" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-[#fcf8f0]">
                      <span className="text-[#b0a8a0] font-mono tracking-widest uppercase">{product.category}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* INFO SECTION */}
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

                <div className="flex items-center text-[13px] gap-1.5 text-zinc-500 font-medium">
                  <Tag className="w-3.5 h-3.5 text-[#b8960f]" />
                  Collection: <span className="text-[#b8960f] font-bold uppercase">{product.category}</span>
                </div>

                <div className="flex items-baseline gap-3.5 mt-2">
                  <span className="text-3xl font-extrabold text-[#0a0a0a]">
                    R {product.price.toFixed(2)}
                  </span>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-2 text-[#d4af37] text-[15px]">
                  <span className="tracking-[2px]">
                    {Array.from({ length: 5 }).map((_, i) => (
                      i < getAverageRating(product) ? '★' : '☆'
                    )).join('')}
                  </span>
                  <span className="text-zinc-500 text-[13px]">({product.reviews ? product.reviews.length : 0} reviews)</span>
                </div>

                <p className="text-[14px] leading-relaxed text-[#1a1a1a] border-t border-[#d4af37]/25 pt-4 mt-1">
                  {product.desc}
                </p>

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

                {/* QTY & ADD */}
                <div className="flex flex-wrap sm:flex-nowrap items-center gap-3 mt-6">
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

                  <motion.button 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                       onAddToCart(product, selectedVariant, qty);
                       setActiveProductId(null);
                    }}
                    className="flex-1 min-w-[160px] flex items-center justify-center gap-2.5 bg-[#0a0a0a] text-[#d4af37] px-6 py-4 rounded-full font-bold text-[14px] tracking-widest uppercase border-2 border-[#d4af37] hover:bg-[#d4af37] hover:text-[#0a0a0a] transition-colors duration-300 shadow-[0_4px_14px_rgba(0,0,0,0.1)] hover:shadow-[0_6px_20px_rgba(212,175,55,0.4)]"
                  >
                    <ShoppingBag className="w-[18px] h-[18px]" /> Add to Cart
                  </motion.button>
                </div>

                {/* REVIEWS */}
                {product.reviews && product.reviews.length > 0 && (
                  <div className="mt-6 pt-6 border-t border-zinc-200">
                    <h3 className="font-extrabold text-[12px] uppercase tracking-widest mb-4">Customer Reviews</h3>
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
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
}
