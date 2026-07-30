import { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Check, Droplets, Shield, Clock, Camera, Palette, Smile } from 'lucide-react';

const getOptimizedUrl = (url: string) => {
  if (!url || !url.includes('cloudinary.com') || url.includes('q_auto')) return url;
  return url.replace('/upload/', '/upload/q_auto,f_auto/');
};

interface ShadeModel {
  shade: string;
  url: string;
  afterUrl?: string;
}

const SHADE_MODELS: ShadeModel[] = [
  { shade: '05', url: 'https://res.cloudinary.com/dafc66cma/image/upload/v1785371509/Profuse_Beauty_model_wearing_HD_Liquid_Foundation_Shade_05_i4vztk.jpg' },
  { shade: '06', url: 'https://res.cloudinary.com/dafc66cma/image/upload/v1785371512/Profuse_Beauty_model_wearing_HD_Liquid_Foundation_Shade_06_il81lr.jpg' },
  { shade: '07', url: 'https://res.cloudinary.com/dafc66cma/image/upload/v1785371512/Profuse_Beauty_model_wearing_HD_Liquid_Foundation_Shade_07_ckqvel.jpg' },
  { shade: '08', url: 'https://res.cloudinary.com/dafc66cma/image/upload/v1785371517/Profuse_Beauty_model_wearing_HD_Liquid_Foundation_Shade_08_jul6rb.jpg' },
  { shade: '09', url: 'https://res.cloudinary.com/dafc66cma/image/upload/v1785371509/Profuse_Beauty_model_wearing_HD_Liquid_Foundation_Shade_09_l1tgre.jpg' },
  {
    shade: '10',
    url: 'https://res.cloudinary.com/dafc66cma/image/upload/v1785371513/Profuse_Beauty_model_wearing_HD_Liquid_Foundation_Shade_10_qnwndt.jpg',
    afterUrl: 'https://res.cloudinary.com/dafc66cma/image/upload/v1785371956/Profuse_Beauty_model_wearing_HD_Liquid_Foundation_Shade_10_2_i5n4xr.jpg',
  },
  { shade: '11', url: 'https://res.cloudinary.com/dafc66cma/image/upload/v1785371509/Profuse_Beauty_model_wearing_HD_Liquid_Foundation_Shade_11_bm5dy5.jpg' },
  { shade: '12', url: 'https://res.cloudinary.com/dafc66cma/image/upload/v1785371514/Profuse_Beauty_model_wearing_HD_Liquid_Foundation_Shade_12_yfej4o.jpg' },
  { shade: '35', url: 'https://res.cloudinary.com/dafc66cma/image/upload/v1785371514/Profuse_Beauty_model_wearing_HD_Liquid_Foundation_Shade_35_kvffhr.jpg' },
];

const BeforeAfterCard = ({ model }: { model: ShadeModel }) => {
  const [revealed, setRevealed] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="col-span-full bg-white rounded-[2rem] overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.06)] border-2 border-[#d4af37]/40"
    >
      <div
        className="relative w-full cursor-pointer overflow-hidden bg-[#fcf8f0]"
        style={{ aspectRatio: '1 / 1' }}
        onMouseEnter={() => setRevealed(true)}
        onMouseLeave={() => setRevealed(false)}
        onClick={() => setRevealed((v) => !v)}
        onTouchStart={() => setRevealed((v) => !v)}
      >
        <img
          src={getOptimizedUrl(model.url)}
          alt={`Shade ${model.shade} — Before`}
          className="absolute inset-0 w-full h-full object-contain p-2"
          loading="lazy"
        />

        {model.afterUrl && (
          <img
            src={getOptimizedUrl(model.afterUrl)}
            alt={`Shade ${model.shade} — After`}
            className="absolute inset-0 w-full h-full object-contain p-2 transition-opacity duration-700 ease-in-out"
            style={{ opacity: revealed ? 1 : 0 }}
            loading="lazy"
          />
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />

        <div className={`absolute bottom-4 left-4 transition-all duration-500 ${revealed ? 'opacity-0' : 'opacity-100'}`}>
          <span className="bg-black/70 backdrop-blur-md text-white text-xs sm:text-sm font-bold px-3 py-1.5 rounded-full border border-white/20">
            Shade 10 — Before
          </span>
        </div>

        <div className={`absolute bottom-4 right-4 transition-all duration-500 ${revealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}>
          <span className="bg-[#d4af37] text-black text-xs sm:text-sm font-extrabold px-3 py-1.5 rounded-full border border-black/20 flex items-center gap-1.5 shadow-lg">
            <Sparkles className="w-3 h-3 sm:w-4 sm:h-4" /> Shade 10 — After
          </span>
        </div>

        <div className={`absolute inset-0 flex flex-col items-center justify-center transition-all duration-500 pointer-events-none ${revealed ? 'opacity-0' : 'opacity-100'}`}>
          <motion.div
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
            className="bg-black/50 backdrop-blur-sm rounded-full px-4 py-2 sm:px-5 sm:py-2.5 text-white text-xs sm:text-sm font-bold tracking-wider"
          >
            Tap or hover to see the transformation
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

const ShadeCard = ({ model, index }: { model: ShadeModel; index: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay: index * 0.06 }}
    className="bg-white rounded-[2rem] overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_50px_rgba(212,175,55,0.15)] transition-all duration-500 border border-[#d4af37]/20 hover:-translate-y-2 hover:border-[#d4af37]/60 group cursor-pointer"
  >
    <div className="relative aspect-[3/4] overflow-hidden">
      <img
        src={getOptimizedUrl(model.url)}
        alt={`Profuse Beauty model wearing HD Liquid Foundation Shade ${model.shade}`}
        className="w-full h-full object-cover object-[center_15%] group-hover:scale-105 transition-transform duration-700 ease-out"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
      <span className="absolute top-4 left-4 bg-[#d4af37] border border-black/10 text-xs uppercase tracking-widest text-black font-extrabold px-3 py-1.5 rounded-full shadow-md">
        Shade {model.shade}
      </span>
    </div>
  </motion.div>
);

const FEATURES = [
  { icon: Camera, label: 'High-definition finish for camera-ready skin' },
  { icon: Droplets, label: 'Lightweight and hydrating formula' },
  { icon: Smile, label: '30ml pump bottle for easy application' },
  { icon: Clock, label: 'Long-wear and transfer-resistant' },
  { icon: Palette, label: 'Inclusive shade range for all complexions' },
];

const BENEFITS = [
  'Designed for diverse African skin tones',
  'Long-wear, transfer-resistant formula',
  'Lightweight and breathable for all-day comfort',
  'Matte, high-definition finish for photo-ready skin',
  '30ml pump bottle for hygienic, mess-free application',
];

export default function FoundationShadeShowcase() {
  const regularModels = SHADE_MODELS.filter((m) => m.shade !== '10');
  const shade10 = SHADE_MODELS.find((m) => m.shade === '10')!;

  return (
    <div className="space-y-12">
      {/* ===== PRODUCT INFO ===== */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-[2rem] p-8 sm:p-10 shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-[#d4af37]/20"
      >
        <div className="max-w-4xl">
          <h3 className="text-2xl sm:text-3xl font-extrabold tracking-[-0.5px] text-[#0a0a0a] mb-3">
            Profuse Beauty HD Liquid Foundation &mdash; 30ml
          </h3>
          <p className="text-[#0a0a0a]/70 text-[15px] leading-relaxed mb-6">
            Get flawless, long-lasting coverage with Profuse Beauty&rsquo;s HD Liquid Foundation. This lightweight, buildable formula smooths skin, blurs imperfections, and delivers a natural matte finish. Perfect for everyday wear or full-glam looks, it&rsquo;s designed to match South African skin tones with true-to-tone pigments.
          </p>

          <div className="mb-6">
            <h4 className="text-xs font-extrabold uppercase tracking-[2px] text-[#d4af37] mb-4">Key Features</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {FEATURES.map((feat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="flex items-start gap-3 bg-[#fcf8f0] rounded-xl p-4 border border-[#d4af37]/10"
                >
                  <div className="w-8 h-8 rounded-full bg-[#d4af37]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <feat.icon className="w-4 h-4 text-[#b8960f]" />
                  </div>
                  <span className="text-sm font-medium text-[#0a0a0a]/80 leading-snug">{feat.label}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-[#d4af37]/10 to-transparent rounded-2xl p-6 border border-[#d4af37]/20 mb-6">
          <p className="text-[#0a0a0a]/70 text-[15px] leading-relaxed mb-4">
            Achieve flawless, long-lasting coverage with the Profuse Beauty HD Liquid Foundation, proudly formulated for South African skin tones. This high-performance foundation delivers a smooth, matte finish with buildable coverage that looks natural in person and flawless on camera. Whether you&rsquo;re heading to work, a photoshoot, or a night out, this foundation keeps your skin looking radiant and refined all day.
          </p>
          <p className="text-[#0a0a0a]/70 text-[15px] leading-relaxed">
            Crafted with a 3-in-1 formula&mdash;concealer, primer, and oil-free UV protector&mdash;it simplifies your routine while enhancing your skin&rsquo;s natural beauty. The lightweight, breathable texture ensures comfort even in warm climates, while the inclusive shade range ensures a true-to-tone match for every complexion.
          </p>
        </div>

        <div>
          <h4 className="text-xs font-extrabold uppercase tracking-[2px] text-[#d4af37] mb-4">Why South African women love it</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {BENEFITS.map((benefit, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="flex items-center gap-2"
              >
                <div className="w-5 h-5 rounded-full bg-[#d4af37]/20 flex items-center justify-center flex-shrink-0">
                  <Check className="w-3 h-3 text-[#d4af37]" />
                </div>
                <span className="text-sm text-[#0a0a0a]/70">{benefit}</span>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="mt-6 bg-[#fcf8f0] rounded-xl p-5 border border-[#d4af37]/10">
          <h4 className="text-xs font-extrabold uppercase tracking-[2px] text-[#d4af37] mb-3">Perfect for</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-[#0a0a0a]/60">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-[#d4af37]/60" />
              <span>Everyday wear in hot or humid conditions</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-[#d4af37]/60" />
              <span>Professional makeup artists and content creators</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-[#d4af37]/60" />
              <span>Women seeking full coverage without the heavy feel</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-[#d4af37]/60" />
              <span>Busy professionals and moms who need reliable, all-day performance</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* ===== SHADE MODEL GRID ===== */}
      <div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <span className="inline-block bg-[#d4af37]/20 border border-[#d4af37]/40 text-[#b8960f] text-[10px] uppercase tracking-[2px] font-extrabold px-3 py-1.5 rounded-full mb-3">
            Find Your Shade
          </span>
          <h3 className="text-xl sm:text-2xl font-extrabold tracking-[-0.5px] text-[#0a0a0a] leading-tight">
            Our Models Wearing HD Liquid Foundation
          </h3>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 mb-10">
          {regularModels.map((model, idx) => (
            <ShadeCard key={model.shade} model={model} index={idx} />
          ))}
        </div>

        <BeforeAfterCard model={shade10} />
      </div>
    </div>
  );
}
