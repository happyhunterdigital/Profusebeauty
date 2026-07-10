import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ShoppingBag, Tag, Sparkles } from 'lucide-react';
import { Product } from '../types';
import { comboProducts } from '../data';

interface SalesSectionProps {
  isDarkMode: boolean;
  onAddToCart: (product: Product, shade: string | null, qty: number) => void;
}

// Combo/bundle products now live in data.ts (category 'Combos') so the exact
// same catalog is browsable under Shop > Combos, per item 10.
const saleBundles: Product[] = comboProducts;

export default function SalesSection({ isDarkMode, onAddToCart }: SalesSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px 0px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 15 }
    }
  };

  return (
    <section 
      ref={sectionRef}
      className={`py-16 md:py-24 relative overflow-hidden rounded-[2.5rem] my-20 ${
        isDarkMode ? 'bg-[#111116] border border-white/5' : 'bg-white border border-black/5 shadow-2xl shadow-black/5'
      }`}
    >
      {/* Background ambient glows */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none rounded-[2.5rem]">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-[#d4af37]/20 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-[#fbbf24]/20 blur-[120px]" />
      </div>

      <div className="relative z-10 px-4 sm:px-6 lg:px-10 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-4 max-w-2xl">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-[#d4af37]/10 border border-[#d4af37]/20"
            >
              <Sparkles className="w-4 h-4 text-[#d4af37]" />
              <span className="text-xs font-bold text-[#d4af37] tracking-widest uppercase">Limited Time Offers</span>
            </motion.div>
            
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-serif font-black tracking-tight"
            >
              Exclusive <span className="italic text-[#d4af37]">Bundles</span>
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className={`text-sm md:text-base ${isDarkMode ? 'text-zinc-400' : 'text-zinc-600'}`}
            >
              Curated pairings and special offers designed for professional artists and makeup enthusiasts. 
              Elevate your kit with our high-definition, hypoallergenic combos.
            </motion.p>
          </div>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8"
        >
          {saleBundles.map((bundle) => (
            <motion.div
              key={bundle.id}
              variants={itemVariants}
              whileHover={{ y: -8, scale: 1.02 }}
              className={`group relative flex flex-col rounded-3xl overflow-hidden backdrop-blur-xl transition-all duration-300 ${
                isDarkMode 
                  ? 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-[#d4af37]/50 hover:shadow-[0_0_30px_rgba(212,175,55,0.15)]' 
                  : 'bg-white/60 border-black/5 hover:bg-white hover:border-[#d4af37]/40 hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)]'
              } border`}
            >
              {/* Sale Tag */}
              <div className="absolute top-4 left-4 z-20">
                <div className="bg-[#fbbf24] text-black text-[10px] font-black px-3 py-1.5 rounded-full uppercase tracking-wider flex items-center space-x-1 shadow-lg">
                  <Tag className="w-3 h-3" />
                  <span>Promo</span>
                </div>
              </div>

              {/* Image Container */}
              <div className="relative aspect-[4/5] w-full overflow-hidden bg-zinc-100 dark:bg-zinc-900">
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                />
                {bundle.image && (
                  <img 
                    src={bundle.image} 
                    alt={bundle.name}
                    className="w-full h-full object-cover object-center transform transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                )}
                
                {/* Quick Add Button (Hover) */}
                <div className="absolute bottom-4 left-0 right-0 z-20 px-4 translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                  <button
                    onClick={() => onAddToCart(bundle, null, 1)}
                    className="w-full bg-[#d4af37] text-black font-bold py-3 rounded-xl flex items-center justify-center space-x-2 hover:bg-[#b8960f] transition-colors"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add to Bag</span>
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="p-5 flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-serif font-bold text-lg leading-tight line-clamp-2 pr-2">
                    {bundle.name}
                  </h3>
                  <p className="font-mono font-bold text-[#d4af37] whitespace-nowrap">
                    R{bundle.price.toFixed(2)}
                  </p>
                </div>
                <p className={`text-xs line-clamp-2 mt-1 flex-grow ${isDarkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
                  {bundle.desc}
                </p>
                
                {/* Mobile Add Button (Visible on touch devices / small screens) */}
                <button
                  onClick={() => onAddToCart(bundle, null, 1)}
                  className={`mt-4 w-full py-2.5 rounded-xl flex items-center justify-center space-x-2 font-bold text-sm transition-colors lg:hidden ${
                    isDarkMode 
                      ? 'bg-white/10 text-white hover:bg-[#d4af37] hover:text-black' 
                      : 'bg-black/5 text-black hover:bg-[#d4af37] hover:text-white'
                  }`}
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add</span>
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
