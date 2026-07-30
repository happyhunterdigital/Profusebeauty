import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';

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
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="col-span-full bg-white rounded-[2rem] overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.06)] border-2 border-[#d4af37]/40 group"
    >
      <div className="grid grid-cols-1 md:grid-cols-2">
        <div className="relative aspect-[4/5] overflow-hidden">
          <img
            src={getOptimizedUrl(model.url)}
            alt={`Shade ${model.shade} — Before`}
            className="w-full h-full object-cover object-[center_15%]"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
          <span className="absolute bottom-4 left-4 bg-black/70 backdrop-blur-md text-white text-xs font-bold px-3 py-1.5 rounded-full border border-white/20">
            Shade {model.shade} — Before
          </span>
        </div>

        <div className="relative aspect-[4/5] overflow-hidden bg-[#fcf8f0]">
          <motion.div
            className="absolute inset-0"
            initial={{ x: '100%' }}
            animate={isInView ? { x: 0 } : { x: '100%' }}
            transition={{ type: 'spring', stiffness: 60, damping: 20, delay: 0.2 }}
          >
            {model.afterUrl && (
              <>
                <img
                  src={getOptimizedUrl(model.afterUrl)}
                  alt={`Shade ${model.shade} — After`}
                  className="w-full h-full object-cover object-[center_15%]"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                <motion.span
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                  transition={{ delay: 0.6, duration: 0.4 }}
                  className="absolute bottom-4 right-4 bg-[#d4af37] text-black text-xs font-extrabold px-3 py-1.5 rounded-full border border-black/20 flex items-center gap-1.5"
                >
                  <Sparkles className="w-3 h-3" /> Shade {model.shade} — After
                </motion.span>
              </>
            )}
          </motion.div>
          <motion.div
            initial={{ opacity: 1 }}
            animate={isInView ? { opacity: 0 } : { opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.3 }}
            className="absolute inset-0 flex flex-col items-center justify-center p-8"
          >
            <p className="text-[#b0a8a0] text-sm font-medium text-center">
              Scroll to reveal the transformation
            </p>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
              className="mt-3"
            >
              <ArrowRight className="w-6 h-6 text-[#d4af37] rotate-90" />
            </motion.div>
          </motion.div>
        </div>
      </div>

      <div className="px-6 py-4 border-t border-[#d4af37]/20 bg-gradient-to-r from-[#d4af37]/5 to-transparent">
        <p className="text-xs text-zinc-600 leading-relaxed text-center">
          <span className="font-extrabold text-[#d4af37]">HD Liquid Foundation Shade {model.shade}</span> — Our best-selling neutral warm tone.
          See the flawless, skin-like finish in real life.
        </p>
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
    <div className="relative aspect-[4/5] overflow-hidden">
      <img
        src={getOptimizedUrl(model.url)}
        alt={`Profuse Beauty model wearing HD Liquid Foundation Shade ${model.shade}`}
        className="w-full h-full object-cover object-[center_15%] group-hover:scale-105 transition-transform duration-700 ease-out"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />

      <span className="absolute top-4 left-4 bg-[#d4af37] border border-black/10 text-[11px] uppercase tracking-widest text-black font-extrabold px-3 py-1.5 rounded-full">
        Shade {model.shade}
      </span>
    </div>

    <div className="px-5 py-4 flex items-center justify-between">
      <div>
        <h4 className="text-sm font-black text-[#0a0a0a] leading-tight">
          Shade {model.shade}
        </h4>
        <p className="text-[11px] text-zinc-500 mt-0.5">HD Liquid Foundation</p>
      </div>
      <motion.div
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="w-8 h-8 rounded-full bg-[#0a0a0a] flex items-center justify-center"
      >
        <ArrowRight className="w-4 h-4 text-[#d4af37]" />
      </motion.div>
    </div>
  </motion.div>
);

export default function FoundationShadeShowcase() {
  const regularModels = SHADE_MODELS.filter((m) => m.shade !== '10');
  const shade10 = SHADE_MODELS.find((m) => m.shade === '10')!;

  return (
    <section className="mb-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <span className="inline-block bg-[#d4af37]/20 border border-[#d4af37]/40 text-[#b8960f] text-[10px] uppercase tracking-[2px] font-extrabold px-3 py-1.5 rounded-full mb-3">
          Real Results
        </span>
        <h2 className="text-[2rem] sm:text-[2.5rem] font-extrabold tracking-[-0.5px] text-[#0a0a0a] mb-3 leading-tight">
          Our Models Wearing HD Liquid Foundation
        </h2>
        <p className="text-[#0a0a0a]/60 max-w-2xl mx-auto text-[15px] leading-relaxed">
          See every shade on real skin. Find your perfect match with confidence — scroll to see the
          before-and-after transformation on Shade 10.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
        {regularModels.map((model, idx) => (
          <ShadeCard key={model.shade} model={model} index={idx} />
        ))}
      </div>

      <div className="mt-10">
        <BeforeAfterCard model={shade10} />
      </div>
    </section>
  );
}
