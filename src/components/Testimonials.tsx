import React from 'react';
import { Star } from 'lucide-react';
import { motion } from 'framer-motion';

interface TestimonialsProps {
  isDarkMode: boolean;
}

export default function Testimonials({ isDarkMode }: TestimonialsProps) {
  const bgPrimary = isDarkMode ? 'bg-[#1c1917]' : 'bg-[#f5f5f4]';
  const textPrimary = isDarkMode ? 'text-white' : 'text-[#1c1917]';
  const textSecondary = isDarkMode ? 'text-[#e7e5e4]' : 'text-zinc-600';
  const border = isDarkMode ? 'border-white/5' : 'border-black/5';

  return (
    <section id="trust-signals" aria-label="Customer Testimonials" className="py-8">
      <div className="text-center max-w-2xl mx-auto space-y-4 mb-12">
        <span className="text-[10px] font-mono uppercase tracking-widest text-[#d4af37]">Verified Client Results</span>
        <h3 className={`text-3xl font-serif font-light ${textPrimary}`}>The Profuse Beauty Standard</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className={`${bgPrimary} border ${border} p-8 flex flex-col justify-between`}
        >
          <div className="space-y-4">
            <div className="flex gap-1 text-[#d4af37]">
              {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
            </div>
            <p className={`text-sm ${textSecondary} leading-relaxed tracking-wide italic`}>
              "The waterproof makeup remover is absolutely unmatched. It literally melts away my heaviest waterproof mascara without any harsh rubbing. My skin feels so soft afterwards!"
            </p>
          </div>
          <div className="mt-8 flex items-center gap-4">
            <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center text-[#d4af37] font-serif font-bold">
              SJ
            </div>
            <div>
              <div className={`text-xs font-bold ${textPrimary}`}>Sarah J.</div>
              <div className="text-[10px] text-zinc-500 uppercase tracking-widest">Verified Buyer</div>
            </div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className={`${bgPrimary} border ${border} p-8 flex flex-col justify-between`}
        >
          <div className="space-y-4">
            <div className="flex gap-1 text-[#d4af37]">
              {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
            </div>
            <p className={`text-sm ${textSecondary} leading-relaxed tracking-wide italic`}>
              "The 1-on-1 masterclass in Pretoria changed how I do my makeup forever. Marcia was incredibly patient and tailored everything exactly to my complex skin tone. Highly recommend."
            </p>
          </div>
          <div className="mt-8 flex items-center gap-4">
            <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center text-[#d4af37] font-serif font-bold">
              NM
            </div>
            <div>
              <div className={`text-xs font-bold ${textPrimary}`}>Nomvula M.</div>
              <div className="text-[10px] text-zinc-500 uppercase tracking-widest">Masterclass Attendee</div>
            </div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className={`${bgPrimary} border ${border} p-8 flex flex-col justify-between hidden lg:flex`}
        >
          <div className="space-y-4">
            <div className="flex gap-1 text-[#d4af37]">
              {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
            </div>
            <p className={`text-sm ${textSecondary} leading-relaxed tracking-wide italic`}>
              "I've struggled for years to find a foundation that matches my undertone without causing breakouts. The virtual try-on paired with the botanical ingredients is pure genius."
            </p>
          </div>
          <div className="mt-8 flex items-center gap-4">
            <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center text-[#d4af37] font-serif font-bold">
              CK
            </div>
            <div>
              <div className={`text-xs font-bold ${textPrimary}`}>Chloe K.</div>
              <div className="text-[10px] text-zinc-500 uppercase tracking-widest">Verified Buyer</div>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
