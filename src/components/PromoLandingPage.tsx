// File: src/components/PromoLandingPage.tsx
import React, { useEffect, useState } from 'react';
import { ShieldCheck, Truck, CreditCard, RotateCcw, Star, StarHalf, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Product } from '../types';

interface PromoLandingPageProps {
  currentPath: string;
  onAddToCart: (p: Product, shade: string | null, qty: number) => void;
}

const promoData: Record<string, any> = {
  '': {
    id: 'sale-default',
    name: 'HD Liquid Concealer and Contour',
    category: 'Promotions',
    price: 249.99,
    normalPrice: 350.00,
    savings: 100.01,
    desc: 'HD Liquid Concealer and Contour at R249.99 Generous 20ml Tube, No Applicator Needed, Camouflage darkness under the eyes, reduce redness, and eliminate hyperpigmentation, Enjoy all-day wear without worrying about touch-ups. Use it for spot concealing, highlighting, or contouring just like the pros. Shade 3, High Definition Concealer by Profuse Beauty is your secret weapon for flawless, radiant skin.',
    image: 'https://res.cloudinary.com/dafc66cma/image/upload/v1783171429/HD_Concealor_and_brushes_jp4icv.png',
    mediaType: 'image',
    mediaFiles: ['https://res.cloudinary.com/dafc66cma/image/upload/v1783171429/HD_Concealor_and_brushes_jp4icv.png'],
    comboImages: ['https://res.cloudinary.com/dafc66cma/image/upload/v1783171429/HD_Concealor_and_brushes_jp4icv.png'],
    includesBrush: false,
    contents: [
      { icon: '✨', name: 'HD Liquid Concealer', desc: 'Generous 20ml Tube. Camouflage darkness & redness.' },
      { icon: '🎯', name: 'Contour & Highlight', desc: 'Use it for spot concealing or contouring like a pro.' }
    ]
  },
  'powder-brush': {
    id: 'sale-powder',
    name: 'HD Perfecting powder and Powder brush',
    category: 'Promotions',
    price: 250.00,
    normalPrice: 380.00,
    savings: 130.00,
    desc: 'Luxury, lightweight loose powder to brighten certain area on your face that need to be highlighted.',
    image: 'https://res.cloudinary.com/dafc66cma/image/upload/v1783171428/Powder_and_brush_yscw2f.png',
    mediaType: 'video',
    mediaFiles: [
      'https://res.cloudinary.com/dafc66cma/video/upload/q_auto,f_auto/v1783184532/PB_HD_powder_frfp3z.mp4',
      'https://res.cloudinary.com/dafc66cma/video/upload/q_auto,f_auto/v1783184532/HD_Perfecting_powder_and_Powder_brush._pax8qc.mp4'
    ],
    comboImages: [
      'https://res.cloudinary.com/dafc66cma/image/upload/v1783171428/Powder_and_brush_yscw2f.png',
      'https://res.cloudinary.com/dafc66cma/image/upload/v1783171422/HD_Perfecting_powder_and_Powder_brush_jhbqcc.png'
    ],
    includesBrush: true,
    contents: [
      { icon: '☁️', name: 'HD Perfecting Powder', desc: 'Luxury, lightweight loose powder to brighten.' },
      { icon: '🖌️', name: 'Powder Brush', desc: 'Soft bristles for an even, airbrushed sweep.' }
    ]
  },
  'highlighter-brush': {
    id: 'sale-highlighter',
    name: 'Highlighter and brush',
    category: 'Promotions',
    price: 280.00,
    normalPrice: 400.00,
    savings: 120.00,
    desc: 'A full matte coating, hides skin imperfections, contains moisturizing components.',
    image: 'https://res.cloudinary.com/dafc66cma/image/upload/v1783171424/Highlighter_and_brush._xnjjvo.png',
    mediaType: 'carousel',
    mediaFiles: [
      'https://res.cloudinary.com/dafc66cma/image/upload/v1783182556/Profuse_Beauty_Highlighter_UGC._f2b5vy.jpg',
      'https://res.cloudinary.com/dafc66cma/image/upload/v1783182556/Profuse_Beauty_Highlighter_UGC_xugxbc.jpg'
    ],
    comboImages: ['https://res.cloudinary.com/dafc66cma/image/upload/v1783171424/Highlighter_and_brush._xnjjvo.png'],
    includesBrush: true,
    contents: [
      { icon: '✨', name: 'Premium Highlighter', desc: 'Full matte coating, hides imperfections.' },
      { icon: '🖌️', name: 'Precision Brush', desc: 'Perfect application every time.' }
    ]
  },
  'gloss-free': {
    id: 'sale-gloss',
    name: 'Buy 2 get gloss free',
    category: 'Promotions',
    price: 320.00,
    normalPrice: 480.00,
    savings: 160.00,
    desc: 'Highly pigmented formula with smooth application which provides a non-drying intense colour. 24 hour-wear, giving you a high-fashion matte finish.',
    image: 'https://res.cloudinary.com/dafc66cma/image/upload/v1783171425/Buy_2_get_gloss_free._vxo5du.png',
    mediaType: 'carousel',
    mediaFiles: [
      'https://res.cloudinary.com/dafc66cma/image/upload/v1783181694/Profuse_Beauty_Model_using_Lip_gloss_lfqftr.jpg',
      'https://res.cloudinary.com/dafc66cma/image/upload/v1783181694/Profuse_Beauty_Model_using_Lip_gloss._nnxrm3.jpg'
    ],
    comboImages: [
      'https://res.cloudinary.com/dafc66cma/image/upload/v1783171428/Buy_2_get_gloss_free_ilktqf.png',
      'https://res.cloudinary.com/dafc66cma/image/upload/v1783171425/Buy_2_get_gloss_free._vxo5du.png'
    ],
    includesBrush: false,
    contents: [
      { icon: '💋', name: '2x Matte Liquid Lipsticks', desc: 'Highly pigmented, non-drying intense colour.' },
      { icon: '✨', name: '1x Free Gloss', desc: 'High-shine luxury lip gloss absolutely free.' }
    ]
  },
  'foundation-bogo': {
    id: 'sale-bogo',
    name: 'Buy 1 get 1 50% off High Definition Foundation',
    category: 'Promotions',
    price: 525.00,
    normalPrice: 700.00,
    savings: 175.00,
    desc: 'High Definition Foundation has a 3-in-1 formulation as a concealer, primer and oil free uv protector. It is hypoallergenic, gives you flawless full coverage and an absolute matte finish.',
    image: 'https://res.cloudinary.com/dafc66cma/image/upload/v1783171429/Buy1_get_1_50_off_qomjhf.png',
    mediaType: 'carousel',
    mediaFiles: [
      'https://res.cloudinary.com/dafc66cma/image/upload/v1783182070/Profuse_Beauty_model_using_HD_Liquid_Foundation_evma8a.jpg',
      'https://res.cloudinary.com/dafc66cma/image/upload/v1783182070/Profuse_Beauty_model_using_HD_Liquid_Foundation_finishing_touches_with_the_makeup_brush_q77o86.jpg',
      'https://res.cloudinary.com/dafc66cma/image/upload/v1783182070/Profuse_Beauty_model_using_HD_Liquid_Foundation._vikzo9.jpg'
    ],
    comboImages: ['https://res.cloudinary.com/dafc66cma/image/upload/v1783171429/Buy1_get_1_50_off_qomjhf.png'],
    includesBrush: false,
    contents: [
      { icon: '💧', name: 'HD Liquid Foundation', desc: '3-in-1 formulation (concealer, primer, uv protector).' },
      { icon: '🔥', name: 'Second Foundation at 50%', desc: 'Get your backup bottle for half the price.' }
    ]
  }
};

const BrushCarousel = () => {
  const [index, setIndex] = useState(0);
  const brushImages = [
    'https://res.cloudinary.com/dafc66cma/image/upload/v1783184286/PB_Makeup_brush_by_User_Generated_Content_bl1edh.jpg',
    'https://res.cloudinary.com/dafc66cma/image/upload/v1783184286/PB_Makeup_brush_displayed_by_an_impressed_User_Generated_Content_ua1q5x.jpg',
    'https://res.cloudinary.com/dafc66cma/image/upload/v1783184285/PB_Makeup_brush_by_User_Generated_Content._s1ojfy.jpg'
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % brushImages.length);
    }, 2500);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="mt-8 border border-[#d4af37]/30 rounded-2xl overflow-hidden shadow-lg bg-black relative">
      <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-md px-2 py-1 rounded-md z-20 text-[9px] uppercase tracking-widest text-[#d4af37] border border-[#d4af37]/30">
        Brush Quality UGC
      </div>
      <div className="relative aspect-[4/5] w-full bg-[#111116]">
        {brushImages.map((src, idx) => (
          <motion.img
            key={idx}
            src={src}
            initial={{ opacity: 0 }}
            animate={{ opacity: index === idx ? 1 : 0 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0 w-full h-full object-cover object-[center_15%]"
            alt="UGC Brush Review"
          />
        ))}
      </div>
    </div>
  );
};

const MediaEngine = ({ type, files }: { type: string, files: string[] }) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (type === 'image') return;
    const interval = type === 'video' ? 6000 : 2500;
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % files.length);
    }, interval);
    return () => clearInterval(timer);
  }, [type, files]);

  if (type === 'image') {
    return (
      <img src={files[0]} className="w-full h-full object-cover object-[center_15%]" alt="Product" />
    );
  }

  if (type === 'carousel') {
    return (
      <div className="relative w-full h-full bg-black">
        {files.map((file, idx) => (
          <motion.img
            key={idx}
            src={file}
            initial={{ opacity: 0 }}
            animate={{ opacity: index === idx ? 1 : 0 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0 w-full h-full object-cover object-[center_15%]"
            alt="Model View"
          />
        ))}
      </div>
    );
  }

  if (type === 'video') {
    return (
      <div className="relative w-full h-full bg-black">
        {files.map((file, idx) => (
          <motion.div
            key={idx}
            className="absolute inset-0 w-full h-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: index === idx ? 1 : 0 }}
            transition={{ duration: 1.0 }}
          >
            <video 
              autoPlay={true}
              muted={true}
              playsInline={true}
              loop={true}
              preload="auto"
              className="w-full h-full object-cover object-[center_15%]"
            >
              <source src={file} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </motion.div>
        ))}
      </div>
    );
  }

  return null;
};

export default function PromoLandingPage({ currentPath, onAddToCart }: PromoLandingPageProps) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPath]);

  // Extract slug from /promo/slug
  const slug = currentPath.replace('/promo', '').replace('/', '');
  const combo = promoData[slug] || promoData[''];

  const handleBuyNow = () => {
    onAddToCart({
      id: combo.id,
      name: combo.name,
      category: combo.category,
      price: combo.price,
      desc: combo.desc,
      image: combo.image,
      swatches: []
    }, null, 1);
  };

  return (
    <div className="min-h-screen bg-[#0A0A0F] text-[#F5F5F5] font-sans selection:bg-[#fbbf24]/30">
      <main className="max-w-xl mx-auto bg-[#111116] min-h-screen shadow-2xl relative overflow-hidden">
        
        {/* Decorative subtle glows */}
        <div className="absolute top-0 left-0 w-full h-[500px] rounded-full bg-[#d4af37]/10 blur-[150px] pointer-events-none" />

        {/* [HERO] */}
        <section className="relative px-6 pt-12 pb-10 border-b border-white/5">
          <div className="flex justify-center mb-6">
            <span className="bg-[#fbbf24] text-black text-[10px] font-black px-3 py-1.5 rounded-full uppercase tracking-widest shadow-lg shadow-[#fbbf24]/20 animate-pulse">
              Limited stock / This week only
            </span>
          </div>
          
          <h1 className="text-3xl sm:text-4xl font-serif font-black text-center leading-tight mb-4 text-white">
            The {combo.name} — <br/>
            <span className="text-[#d4af37] italic">everything you need, one price.</span>
          </h1>
          
          <p className="text-center text-sm text-zinc-400 mb-8 font-medium px-4">
            {combo.desc}
          </p>

          <div className="relative aspect-[3/4] w-full rounded-2xl overflow-hidden shadow-2xl mb-8 border border-white/10 bg-black">
            <MediaEngine type={combo.mediaType} files={combo.mediaFiles} />
          </div>

          <button 
            onClick={handleBuyNow}
            className="w-full bg-[#d4af37] text-black font-black py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-[#b8960f] transition-all shadow-[0_0_20px_rgba(212,175,55,0.3)] active:scale-[0.98]"
          >
            Get the full set — R{combo.price.toFixed(2)} <ChevronRight className="w-5 h-5" />
          </button>
          
          {combo.includesBrush && <BrushCarousel />}
        </section>

        {/* [WHAT'S INSIDE] */}
        <section className="px-6 py-12 border-b border-white/5 bg-zinc-950/30">
          <h3 className="text-sm font-mono uppercase tracking-[0.2em] text-[#d4af37] mb-6 text-center font-bold">What's Inside</h3>
          
          {/* Combo Showcase Gallery (No Crop) */}
          <div className="mb-8 space-y-4">
            <p className="text-xs uppercase tracking-wider text-zinc-500 font-bold text-center">Package Contents Preview</p>
            <div className={`grid ${combo.comboImages.length > 1 ? 'grid-cols-2' : 'grid-cols-1'} gap-4`}>
              {combo.comboImages.map((imgUrl: string, idx: number) => (
                <div key={idx} className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden border border-white/5 bg-zinc-900/50 flex items-center justify-center p-3">
                  <img 
                    src={imgUrl} 
                    className="max-w-full max-h-full object-contain animate-fadeIn" 
                    alt="Combo Content"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4 mb-8">
            {combo.contents.map((item: any, idx: number) => (
              <div key={idx} className="flex items-center gap-4 bg-white/5 p-4 rounded-xl border border-white/5">
                <div className="w-12 h-12 bg-zinc-900 rounded-lg flex items-center justify-center shrink-0 border border-white/10">
                  <span className="text-lg">{item.icon}</span>
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm">{item.name}</h4>
                  <p className="text-xs text-zinc-400">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center p-4 rounded-xl border border-[#d4af37]/30 bg-[#d4af37]/5">
            <p className="text-sm text-zinc-300">
              Buy separately: <span className="line-through">R{combo.normalPrice.toFixed(2)}</span><br/>
              This combo: <strong className="text-white">R{combo.price.toFixed(2)}</strong><br/>
              <span className="text-[#fbbf24] font-black uppercase text-xs tracking-widest block mt-2">You save R{combo.savings.toFixed(2)}</span>
            </p>
          </div>
          
          <div className="mt-8">
            <button 
              onClick={handleBuyNow}
              className="w-full bg-[#d4af37] text-black font-black py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-[#b8960f] transition-all shadow-[0_0_20px_rgba(212,175,55,0.3)] active:scale-[0.98]"
            >
              Get the full set — R{combo.price.toFixed(2)} <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </section>

        {/* [WHY A COMBO] */}
        <section className="px-8 py-12 border-b border-white/5 text-center">
          <div className="w-12 h-12 mx-auto bg-[#d4af37]/10 rounded-full flex items-center justify-center mb-6">
            <ShieldCheck className="w-6 h-6 text-[#d4af37]" />
          </div>
          <p className="text-base text-zinc-300 leading-relaxed italic font-serif">
            "Built the way a makeup artist actually packs their kit — everything that works perfectly together, in one order, at one unbeatable price."
          </p>
        </section>

        {/* [SOCIAL PROOF] */}
        <section className="px-6 py-12 border-b border-white/5 bg-zinc-950/30">
          <div className="flex flex-col items-center text-center mb-8">
            <div className="flex items-center gap-1 text-[#fbbf24] mb-2">
              <Star className="w-5 h-5 fill-current" />
              <Star className="w-5 h-5 fill-current" />
              <Star className="w-5 h-5 fill-current" />
              <Star className="w-5 h-5 fill-current" />
              <StarHalf className="w-5 h-5 fill-current" />
            </div>
            <p className="text-xs font-mono text-zinc-400 uppercase tracking-widest">Based on Real User Reviews</p>
          </div>
          
          <div className="bg-white/5 p-6 rounded-2xl border border-white/10 relative">
            <div className="text-[#d4af37] text-4xl font-serif absolute top-4 left-4 opacity-50">"</div>
            <p className="text-sm text-zinc-200 relative z-10 text-center italic mb-4 mt-2">
              Absolutely love this! Has everything you need in one go, completely transformed my daily routine. Highly recommend.
            </p>
            <p className="text-xs text-center text-zinc-500 font-bold uppercase tracking-wider">— Verified Buyer, South Africa</p>
          </div>
        </section>

        {/* [OBJECTION HANDLING] */}
        <section className="px-6 py-12 border-b border-white/5">
          <h3 className="text-sm font-mono uppercase tracking-[0.2em] text-zinc-500 mb-8 text-center font-bold">Why Shop With Us</h3>
          
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <Truck className="w-6 h-6 text-[#d4af37] shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-white text-sm mb-1">Fast Delivery</h4>
                <p className="text-xs text-zinc-400">We deliver securely anywhere across South Africa via our trusted courier partners.</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <RotateCcw className="w-6 h-6 text-[#d4af37] shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-white text-sm mb-1">Easy Returns</h4>
                <p className="text-xs text-zinc-400">Not your shade? We offer a hassle-free 30-day return policy.</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <CreditCard className="w-6 h-6 text-[#d4af37] shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-white text-sm mb-1">Secure Payment</h4>
                <p className="text-xs text-zinc-400">100% secure checkout via Payfast & Ozow.</p>
              </div>
            </div>
          </div>
        </section>

        {/* [FINAL CTA] */}
        <section className="px-6 py-16 bg-gradient-to-b from-transparent to-[#d4af37]/10 text-center">
          <h2 className="text-2xl font-serif font-black text-white mb-2">
            Don't miss out.
          </h2>
          <p className="text-sm text-zinc-300 mb-8">
            Get the {combo.name} for just R{combo.price.toFixed(2)}.<br/>
            <span className="text-[#fbbf24] font-bold">Save R{combo.savings.toFixed(2)} today.</span>
          </p>

          <button 
            onClick={handleBuyNow}
            className="w-full bg-[#d4af37] text-black font-black py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-[#b8960f] transition-all shadow-[0_0_30px_rgba(212,175,55,0.4)] active:scale-[0.98] animate-pulse"
          >
            Get the full set — R{combo.price.toFixed(2)} <ChevronRight className="w-5 h-5" />
          </button>
          
          <p className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold mt-4">
            🔥 Extremely low stock
          </p>
        </section>

      </main>
    </div>
  );
}
