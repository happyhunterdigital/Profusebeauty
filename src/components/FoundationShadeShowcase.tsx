import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Check, Droplets, Shield, Clock, Camera, Palette, Smile, X, ChevronLeft } from 'lucide-react';

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

const SHADE_PRODUCT_IMAGES: Record<string, string> = {
  '05': 'https://res.cloudinary.com/dafc66cma/image/upload/v1779370847/HD_Liquid_Foundation_Shade_05_p4801l.jpg',
  '06': 'https://res.cloudinary.com/dafc66cma/image/upload/v1779370845/HD_Liquid_Foundation_Shade_06_ufmjya.jpg',
  '07': 'https://res.cloudinary.com/dafc66cma/image/upload/v1779370847/HD_Liquid_Foundation_Shade_07_u3jjhi.jpg',
  '08': 'https://res.cloudinary.com/dafc66cma/image/upload/v1779370840/HD_Liquid_Foundation_Shade_8.._h1t3qr.jpg',
  '35': 'https://res.cloudinary.com/dafc66cma/image/upload/v1779370847/HD_Liquid_Foundation_Shade_35_qbnamt.jpg',
};

const FALLBACK_PRODUCT_IMAGE = 'https://res.cloudinary.com/dafc66cma/image/upload/v1779370840/HD_Liquid_Foundation_Shade_8.._h1t3qr.jpg';

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

const ShadeDetailPanel = ({ model, onClose }: { model: ShadeModel; onClose: () => void }) => {
  const productImage = SHADE_PRODUCT_IMAGES[model.shade] || FALLBACK_PRODUCT_IMAGE;
  const [revealed, setRevealed] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-40 bg-[#0a0a0a]/80 backdrop-blur-md overflow-y-auto"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 40, scale: 0.97 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        onClick={(e) => e.stopPropagation()}
        className="min-h-full flex items-start justify-center p-4 sm:p-8"
      >
        <div className="bg-white w-full max-w-5xl rounded-[2rem] overflow-hidden shadow-2xl border border-[#d4af37]/30 my-4 sm:my-8">
          <div className="sticky top-0 z-10 bg-white/95 backdrop-blur-sm border-b border-[#d4af37]/10 px-6 py-4 flex items-center justify-between">
            <button
              onClick={onClose}
              className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-[#0a0a0a]/60 hover:text-[#0a0a0a] transition-colors"
            >
              <ChevronLeft className="w-4 h-4" /> Back to shades
            </button>
            <span className="bg-[#d4af37] border border-black/10 text-xs uppercase tracking-widest text-black font-extrabold px-3 py-1.5 rounded-full">
              Shade {model.shade}
            </span>
            <button onClick={onClose} className="text-[#0a0a0a]/40 hover:text-[#0a0a0a] transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
            <div className="bg-[#fcf8f0] flex items-center justify-center p-0">
              {model.afterUrl ? (
                <div
                  className="relative w-full"
                  style={{ aspectRatio: '3 / 4' }}
                  onMouseEnter={() => setRevealed(true)}
                  onMouseLeave={() => setRevealed(false)}
                  onClick={() => setRevealed((v) => !v)}
                  onTouchStart={() => setRevealed((v) => !v)}
                >
                  <img
                    src={getOptimizedUrl(model.url)}
                    alt={`Shade ${model.shade} — Before`}
                    className="absolute inset-0 w-full h-full object-cover object-top"
                  />
                  <img
                    src={getOptimizedUrl(model.afterUrl!)}
                    alt={`Shade ${model.shade} — After`}
                    className="absolute inset-0 w-full h-full object-cover object-top transition-opacity duration-700 ease-in-out"
                    style={{ opacity: revealed ? 1 : 0 }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                  <div className={`absolute bottom-4 left-4 transition-all duration-400 ${revealed ? 'opacity-0' : 'opacity-100'}`}>
                    <span className="bg-black/70 backdrop-blur-md text-white text-xs font-bold px-3 py-1.5 rounded-full border border-white/20">Before</span>
                  </div>
                  <div className={`absolute bottom-4 right-4 transition-all duration-400 ${revealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}>
                    <span className="bg-[#d4af37] text-black text-xs font-extrabold px-3 py-1.5 rounded-full border border-black/20 flex items-center gap-1.5 shadow-lg">
                      <Sparkles className="w-3 h-3" /> After
                    </span>
                  </div>
                  {!revealed && (
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <div className="bg-black/50 backdrop-blur-sm rounded-full px-4 py-2 text-white text-xs font-bold">Tap for after photo</div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="w-full" style={{ aspectRatio: '3 / 4' }}>
                  <img
                    src={getOptimizedUrl(model.url)}
                    alt={`Shade ${model.shade} model`}
                    className="w-full h-full object-cover object-top"
                  />
                </div>
              )}
            </div>

            <div className="p-6 sm:p-8 flex flex-col">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-[#fcf8f0] border border-[#d4af37]/20 flex items-center justify-center p-2 flex-shrink-0">
                  <img
                    src={getOptimizedUrl(productImage)}
                    alt={`HD Liquid Foundation Shade ${model.shade} bottle`}
                    className="w-full h-full object-contain mix-blend-multiply"
                  />
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-extrabold tracking-[-0.5px] text-[#0a0a0a] leading-tight">
                    Profuse Beauty HD Liquid Foundation
                  </h3>
                  <p className="text-sm text-[#d4af37] font-bold mt-1">30ml &middot; Shade {model.shade}</p>
                  <p className="text-lg font-extrabold text-[#0a0a0a] mt-1">R 370.00</p>
                </div>
              </div>

              <p className="text-[#0a0a0a]/70 text-sm leading-relaxed mb-6">
                Get flawless, long-lasting coverage with Profuse Beauty&rsquo;s HD Liquid Foundation. This lightweight, buildable formula smooths skin, blurs imperfections, and delivers a natural matte finish. Perfect for everyday wear or full-glam looks, it&rsquo;s designed to match South African skin tones with true-to-tone pigments.
              </p>

              <div className="mb-6">
                <h4 className="text-xs font-extrabold uppercase tracking-[2px] text-[#d4af37] mb-3">Key Features</h4>
                <div className="space-y-2">
                  {FEATURES.map((feat, i) => (
                    <div key={i} className="flex items-start gap-3 bg-[#fcf8f0] rounded-xl p-3 border border-[#d4af37]/10">
                      <div className="w-7 h-7 rounded-full bg-[#d4af37]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <feat.icon className="w-3.5 h-3.5 text-[#b8960f]" />
                      </div>
                      <span className="text-xs font-medium text-[#0a0a0a]/80 leading-snug">{feat.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gradient-to-r from-[#d4af37]/10 to-transparent rounded-2xl p-5 border border-[#d4af37]/20 mb-4">
                <p className="text-[#0a0a0a]/70 text-xs leading-relaxed mb-3">
                  Achieve flawless, long-lasting coverage with the Profuse Beauty HD Liquid Foundation, proudly formulated for South African skin tones. This high-performance foundation delivers a smooth, matte finish with buildable coverage that looks natural in person and flawless on camera.
                </p>
                <p className="text-[#0a0a0a]/70 text-xs leading-relaxed">
                  Crafted with a 3-in-1 formula&mdash;concealer, primer, and oil-free UV protector&mdash;it simplifies your routine while enhancing your skin&rsquo;s natural beauty.
                </p>
              </div>

              <h4 className="text-xs font-extrabold uppercase tracking-[2px] text-[#d4af37] mb-3">Why South African women love it</h4>
              <div className="space-y-1.5 mb-4">
                {BENEFITS.map((benefit, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-[#d4af37]/20 flex items-center justify-center flex-shrink-0">
                      <Check className="w-2.5 h-2.5 text-[#d4af37]" />
                    </div>
                    <span className="text-xs text-[#0a0a0a]/70">{benefit}</span>
                  </div>
                ))}
              </div>

              <div className="bg-[#fcf8f0] rounded-xl p-4 border border-[#d4af37]/10">
                <h4 className="text-[10px] font-extrabold uppercase tracking-[2px] text-[#d4af37] mb-2">Perfect for</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-[11px] text-[#0a0a0a]/60">
                  <div className="flex items-center gap-2"><Shield className="w-3 h-3 text-[#d4af37]/60" /><span>Everyday wear in hot or humid conditions</span></div>
                  <div className="flex items-center gap-2"><Shield className="w-3 h-3 text-[#d4af37]/60" /><span>Professional makeup artists and content creators</span></div>
                  <div className="flex items-center gap-2"><Shield className="w-3 h-3 text-[#d4af37]/60" /><span>Full coverage without the heavy feel</span></div>
                  <div className="flex items-center gap-2"><Shield className="w-3 h-3 text-[#d4af37]/60" /><span>All-day reliable performance</span></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

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
        style={{ aspectRatio: '3 / 4' }}
        onMouseEnter={() => setRevealed(true)}
        onMouseLeave={() => setRevealed(false)}
        onClick={() => setRevealed((v) => !v)}
        onTouchStart={() => setRevealed((v) => !v)}
      >
        <img
          src={getOptimizedUrl(model.url)}
          alt={`Shade ${model.shade} — Before`}
          className="absolute inset-0 w-full h-full object-cover object-top"
          loading="lazy"
        />

        {model.afterUrl && (
          <img
            src={getOptimizedUrl(model.afterUrl)}
            alt={`Shade ${model.shade} — After`}
            className="absolute inset-0 w-full h-full object-cover object-top transition-opacity duration-700 ease-in-out"
            style={{ opacity: revealed ? 1 : 0 }}
            loading="lazy"
          />
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />

        <div className={`absolute bottom-4 left-4 transition-all duration-500 ${revealed ? 'opacity-0' : 'opacity-100'}`}>
          <span className="bg-black/70 backdrop-blur-md text-white text-xs sm:text-sm font-bold px-3 py-1.5 rounded-full border border-white/20">
            Shade 10 &mdash; Before
          </span>
        </div>

        <div className={`absolute bottom-4 right-4 transition-all duration-500 ${revealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}>
          <span className="bg-[#d4af37] text-black text-xs sm:text-sm font-extrabold px-3 py-1.5 rounded-full border border-black/20 flex items-center gap-1.5 shadow-lg">
            <Sparkles className="w-3 h-3 sm:w-4 sm:h-4" /> Shade 10 &mdash; After
          </span>
        </div>

        <div className={`absolute inset-0 flex flex-col items-center justify-center transition-all duration-500 pointer-events-none ${revealed ? 'opacity-0' : 'opacity-100'}`}>
          <motion.div
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
            className="bg-black/50 backdrop-blur-sm rounded-full px-4 py-2 sm:px-5 sm:py-2.5 text-white text-xs sm:text-sm font-bold tracking-wider"
          >
            Tap or hover for the after photo
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

const ShadeCard = ({ model, index, onClick }: { model: ShadeModel; index: number; onClick: (model: ShadeModel) => void }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay: index * 0.06 }}
    onClick={() => onClick(model)}
    className="bg-white rounded-[2rem] overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_50px_rgba(212,175,55,0.15)] transition-all duration-500 border border-[#d4af37]/20 hover:-translate-y-2 hover:border-[#d4af37]/60 group cursor-pointer"
  >
    <div className="relative aspect-[3/4] overflow-hidden">
      <img
        src={getOptimizedUrl(model.url)}
        alt={`Shade ${model.shade} model demonstrating HD Liquid Foundation`}
        className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700 ease-out"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
      <span className="absolute top-4 left-4 bg-[#d4af37] border border-black/10 text-xs uppercase tracking-widest text-black font-extrabold px-3 py-1.5 rounded-full shadow-md">
        Shade {model.shade}
      </span>
      <div className="absolute bottom-4 inset-x-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <span className="block w-full bg-[#d4af37] text-black text-[10px] font-extrabold uppercase tracking-widest text-center py-2 rounded-full shadow-lg">
          View Details
        </span>
      </div>
    </div>
  </motion.div>
);

export default function FoundationShadeShowcase() {
  const [selectedModel, setSelectedModel] = useState<ShadeModel | null>(null);
  const regularModels = SHADE_MODELS.filter((m) => m.shade !== '10');
  const shade10 = SHADE_MODELS.find((m) => m.shade === '10')!;

  return (
    <div className="space-y-10">
      {/* ===== COMPACT SNIPPET ===== */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-[2rem] p-6 sm:p-8 shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-[#d4af37]/20 text-center"
      >
        <span className="inline-block bg-[#d4af37]/20 border border-[#d4af37]/40 text-[#b8960f] text-[10px] uppercase tracking-[2px] font-extrabold px-3 py-1.5 rounded-full mb-3">
          HD Liquid Foundation &middot; 30ml &middot; R 370
        </span>
        <h3 className="text-xl sm:text-2xl font-extrabold tracking-[-0.5px] text-[#0a0a0a] mb-2">
          3-in-1 Concealer, Primer &amp; UV Protector
        </h3>
        <p className="text-[#0a0a0a]/60 text-sm max-w-2xl mx-auto leading-relaxed">
          Lightweight, buildable, and long-wear with a natural matte finish &mdash; proudly formulated for South African skin tones.
          <span className="block mt-2 text-[#d4af37] font-bold text-xs">
            Tap any shade below to view full details and product photos.
          </span>
        </p>
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
            Shade-Matching Guide &mdash; Find Your Tone by Skin Comparison
          </h3>
          <p className="text-[#0a0a0a]/50 text-sm mt-2 max-w-xl mx-auto">
            Match your shade effortlessly by comparing your skin tone against each numbered shade below.
            Tap Shade 10 to see the before-and-after finish.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 mb-10">
          {regularModels.map((model, idx) => (
            <ShadeCard key={model.shade} model={model} index={idx} onClick={setSelectedModel} />
          ))}
        </div>

        <div onClick={() => setSelectedModel(shade10)} className="cursor-pointer">
          <BeforeAfterCard model={shade10} />
        </div>
      </div>

      {/* ===== SHADE DETAIL PANEL ===== */}
      <AnimatePresence>
        {selectedModel && (
          <ShadeDetailPanel model={selectedModel} onClose={() => setSelectedModel(null)} />
        )}
      </AnimatePresence>
    </div>
  );
}
