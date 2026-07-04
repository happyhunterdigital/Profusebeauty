import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ShoppingBag, Tag, Sparkles } from 'lucide-react';
import { Product } from '../types';

interface SalesSectionProps {
  isDarkMode: boolean;
  onAddToCart: (product: Product, shade: string | null, qty: number) => void;
}

const saleBundles: Product[] = [
  {
    id: 'sale1',
    name: 'HD Concealer & Brush Set',
    category: 'Bundles',
    price: 420.00,
    desc: 'Perfect your base with our high-definition concealer paired with a professional blending brush.',
    image: 'https://res.cloudinary.com/dafc66cma/image/upload/v1783171429/HD_Concealor_and_brushes_jp4icv.png',
    swatches: []
  },
  {
    id: 'sale2',
    name: 'Buy 1 Get 1 50% Off (Assorted)',
    category: 'Bundles',
    price: 525.00,
    desc: 'Mix and match your favorite essentials. The second item is automatically half price in this exclusive bundle.',
    image: 'https://res.cloudinary.com/dafc66cma/image/upload/v1783171429/Buy1_get_1_50_off_qomjhf.png',
    swatches: []
  },
  {
    id: 'sale3',
    name: 'Buy 2 Get Gloss Free (Deep)',
    category: 'Bundles',
    price: 320.00,
    desc: 'Purchase any two deep shade foundations and receive a high-shine luxury lip gloss absolutely free.',
    image: 'https://res.cloudinary.com/dafc66cma/image/upload/v1783171428/Buy_2_get_gloss_free_ilktqf.png',
    swatches: []
  },
  {
    id: 'sale4',
    name: 'HD Powder & Brush Duo',
    category: 'Bundles',
    price: 250.00,
    desc: 'Set your makeup flawlessly with our HD perfecting powder and matching fluffy powder brush.',
    image: 'https://res.cloudinary.com/dafc66cma/image/upload/v1783171428/Powder_and_brush_yscw2f.png',
    swatches: []
  },
  {
    id: 'sale5',
    name: 'Buy 2 Get Gloss Free (Light)',
    category: 'Bundles',
    price: 320.00,
    desc: 'Purchase any two light/medium shade foundations and receive a high-shine luxury lip gloss absolutely free.',
    image: 'https://res.cloudinary.com/dafc66cma/image/upload/v1783171425/Buy_2_get_gloss_free._vxo5du.png',
    swatches: []
  },
  {
    id: 'sale6',
    name: 'Glow Highlighter & Brush Kit',
    category: 'Bundles',
    price: 280.00,
    desc: 'Achieve a blinding, angelic glow with our premium highlighter and precision fan brush.',
    image: 'https://res.cloudinary.com/dafc66cma/image/upload/v1783171424/Highlighter_and_brush._xnjjvo.png',
    swatches: []
  },
  {
    id: 'sale7',
    name: 'HD Foundation & Brush Kit',
    category: 'Bundles',
    price: 450.00,
    desc: 'Our best-selling 3-in-1 HD Foundation bundled with a professional stippling brush for an airbrushed finish.',
    image: 'https://res.cloudinary.com/dafc66cma/image/upload/v1783171422/Foundation_plus_brush_c9rdpg.png',
    swatches: []
  },
  {
    id: 'sale8',
    name: 'Perfecting Powder & Brush Combo',
    category: 'Bundles',
    price: 250.00,
    desc: 'Lock in your look all day. Includes our lightweight setting powder and a soft-focus setting brush.',
    image: 'https://res.cloudinary.com/dafc66cma/image/upload/v1783171422/HD_Perfecting_powder_and_Powder_brush_jhbqcc.png',
    swatches: []
  },
  {
    id: 'sale9',
    name: 'Flawless Foundation Duo',
    category: 'Bundles',
    price: 460.00,
    desc: 'The ultimate base kit: HD Liquid Foundation and our signature dense foundation brush.',
    image: 'https://res.cloudinary.com/dafc66cma/image/upload/v1783171420/Foundation_plus_foundation_brush_axposx.png',
    swatches: []
  },
  {
    id: 'sale10',
    name: 'Ultimate Concealer Collection',
    category: 'Bundles',
    price: 520.00,
    desc: 'Camouflage and brighten with our pro-grade concealers and a set of detail brushes.',
    image: 'https://res.cloudinary.com/dafc66cma/image/upload/v1783171420/Concealor_plus_brushes_t7wgby.png',
    swatches: []
  }
];

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
