/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Play, Sparkles, Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { VIDEO_SHOWCASES, TESTIMONIALS } from '../data';

interface TrustBridgeProps {
  onOpenVideo: (video: typeof VIDEO_SHOWCASES[0]) => void;
  onOpenShadeMatcher: () => void;
}

export default function TrustBridge({ onOpenVideo, onOpenShadeMatcher }: TrustBridgeProps) {
  return (
    <section id="studio-section" className="py-24 bg-[#FDFBF7] dark:bg-[#120A0B] transition-colors duration-500 overflow-hidden relative">
      
      {/* Dynamic Background Blobs */}
      <div className="absolute top-1/3 -right-20 w-80 h-80 bg-rose-500/5 dark:bg-rose-500/10 blur-3xl rounded-full pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-amber-500/5 dark:bg-amber-500/10 blur-3xl rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-pink-700 dark:text-pink-300">Shade Discovery & Real Experiences</span>
          <h2 className="text-3xl md:text-5xl font-sans font-medium text-[#1E1214] dark:text-white tracking-tight mt-1">
            Real Women. <span className="font-serif italic text-pink-800 dark:text-pink-300">Undiluted Texture.</span>
          </h2>
          <p className="text-gray-500 dark:text-gray-400 text-xs md:text-sm mt-3 leading-relaxed">
            Profuse Beauty doesn't believe in over-filtered makeup. See how our products drape, oxidize, and adjust under direct daylight in authentic vertical videos.
          </p>
        </div>

        {/* 1. Cruelty Free / Hypoallergenic / POPIA line SVG badges */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 items-center justify-center mb-16 py-8 border-y border-stone-200/50 dark:border-white/5 bg-[#FAF7F2]/50 dark:bg-white/5 rounded-3xl">
          
          {/* Badge 1: Cruelty-Free */}
          <div className="flex flex-col items-center text-center p-3">
            <svg className="w-10 h-10 text-pink-600 dark:text-pink-300 mb-2" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M11.996 15.203v-.01m0-3.048a1.5 1.5 0 11.23-.037c.28-.01.522.09.739.266a2.25 2.25 0 011.031 1.734c.063.468.21.914.437 1.32.227.406.495.772.8 1.09a2.25 2.25 0 003.111 0c.304-.318.572-.684.8-1.09.227-.406.374-.852.438-1.32a2.25 2.25 0 00-2.072-2.529h-.008a2.25 2.25 0 10-3.02-3.115 11.916 11.916 0 00-14.545 0A2.25 2.25 0 102.5 12h-.008A2.25 2.25 0 00.42 14.53c.064.467.21.913.438 1.32.227.405.495.77.8 1.09a2.25 2.25 0 003.111 0c.304-.318.572-.684.8-1.09.227-.406.374-.852.438-1.32a2.25 2.25 0 001.03-1.734c.218-.176.46-.277.74-.266a1.5 1.5 0 11.21.037" />
            </svg>
            <span className="text-xs font-bold text-[#1E1214] dark:text-white uppercase tracking-wider">Cruelty-Free</span>
            <span className="text-[10px] text-gray-400 mt-1">Zero animal testing, registered vegan</span>
          </div>

          {/* Badge 2: Hypoallergenic */}
          <div className="flex flex-col items-center text-center p-3">
            <svg className="w-10 h-10 text-pink-600 dark:text-pink-300 mb-2" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
            </svg>
            <span className="text-xs font-bold text-[#1E1214] dark:text-white uppercase tracking-wider">Hypoallergenic</span>
            <span className="text-[10px] text-gray-400 mt-1">Zero parabens, 100% skin safe</span>
          </div>

          {/* Badge 3: POPIA Compliant */}
          <div className="flex flex-col items-center text-center p-3">
            <svg className="w-10 h-10 text-pink-600 dark:text-pink-300 mb-2" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
            </svg>
            <span className="text-xs font-bold text-[#1E1214] dark:text-white uppercase tracking-wider">POPIA Compliant</span>
            <span className="text-[10px] text-gray-400 mt-1">Encrypted personal shade biometric records</span>
          </div>

          {/* Badge 4: Proudly South African */}
          <div className="flex flex-col items-center text-center p-3">
            <svg className="w-10 h-10 text-pink-600 dark:text-pink-300 mb-2" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
            </svg>
            <span className="text-xs font-bold text-[#1E1214] dark:text-white uppercase tracking-wider">Proudly South African</span>
            <span className="text-[10px] text-gray-400 mt-1">Formulated in Pretoria, shipped nationwide</span>
          </div>

        </div>

        {/* 2. Short looping smartphone micro videos slider */}
        <div className="mb-20">
          <div className="flex justify-between items-end mb-6">
            <h3 className="text-xl md:text-2xl font-sans font-semibold text-[#1E1214] dark:text-white text-left">
              15-Second Routine Stories
            </h3>
            <span className="text-xs text-gray-400 font-bold uppercase tracking-wider hidden sm:inline">
              Click to Stream Lightbox Player
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {VIDEO_SHOWCASES.map((v) => (
              <button
                key={v.id}
                onClick={() => onOpenVideo(v)}
                className="group relative aspect-[3/4] rounded-3xl overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 text-left border border-stone-200/50 dark:border-white/5 cursor-pointer"
              >
                {/* Visual Thumbnail */}
                <img
                  src={v.thumbnail}
                  alt={v.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                
                {/* Dark gradient gloss overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />

                {/* Duration Badge */}
                <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-sm rounded-full px-2.5 py-1 text-[9px] font-bold text-white uppercase tracking-wider">
                  {v.duration} Secs
                </div>

                {/* Click to Play circle */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none group-hover:scale-110 transition-transform duration-300">
                  <div className="w-12 h-12 rounded-full bg-white/35 backdrop-blur-md border border-white/50 flex items-center justify-center text-white shadow-lg shadow-black/25">
                    <Play size={18} fill="currentColor" className="ml-0.5 text-white" />
                  </div>
                </div>

                {/* Video Info footer metadata */}
                <div className="absolute bottom-0 inset-x-0 p-5 text-white z-10">
                  <span className="text-[9px] text-pink-300 uppercase tracking-widest font-black block">
                    {v.speaker}
                  </span>
                  <h4 className="text-base font-bold tracking-tight mt-1 group-hover:text-pink-100 duration-200">
                    {v.title}
                  </h4>
                  <p className="text-[10px] text-gray-300 leading-tight mt-1 line-clamp-2">
                    {v.description}
                  </p>
                  
                  <div className="flex items-center gap-1.5 mt-3 pt-3 border-t border-white/10 text-[9px] font-bold text-amber-200">
                    <Sparkles size={11} className="text-amber-300 animate-pulse" />
                    <span>Active Formula: {v.accent}</span>
                  </div>
                </div>

              </button>
            ))}
          </div>
        </div>

        {/* 3. Grid of deep customer testimonials */}
        <div id="story-section" className="pt-8 text-left">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-pink-700 dark:text-pink-300">True Verification</span>
              <h3 className="text-xl md:text-3xl font-sans font-medium text-[#1E1214] dark:text-white tracking-tight mt-1">
                South African Confidences Proclaimed
              </h3>
            </div>
            <button
              onClick={onOpenShadeMatcher}
              className="px-6 py-2.5 bg-[#1E1214] dark:bg-white text-white dark:text-[#1E1214] rounded-full text-xs font-bold hover:scale-102 transition-transform self-start md:self-auto cursor-pointer"
            >
              Match Your Shade presets
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t) => (
              <div
                key={t.id}
                className="bg-[#FAF7F2] dark:bg-[#1E1214]/50 border border-stone-200/40 dark:border-white/5 rounded-3xl p-6 shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-1 text-amber-500 mb-4 text-xs font-bold">
                    <Star size={14} fill="currentColor" />
                    <Star size={14} fill="currentColor" />
                    <Star size={14} fill="currentColor" />
                    <Star size={14} fill="currentColor" />
                    <Star size={14} fill="currentColor" />
                  </div>
                  
                  <p className="text-xs md:text-sm text-gray-600 dark:text-gray-300 italic leading-relaxed">
                    "{t.quote}"
                  </p>
                </div>

                <div className="flex items-center gap-3.5 mt-6 pt-4 border-t border-stone-200/50 dark:border-white/5">
                  <div className="w-10 h-10 rounded-full overflow-hidden border border-stone-300/50">
                    <img src={t.avatar} alt={t.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h5 className="text-xs font-black text-[#1E1214] dark:text-white uppercase tracking-wider">{t.name}</h5>
                    <span className="text-[10px] text-gray-400 block mt-0.5">{t.role}</span>
                    <span className="text-[9px] text-pink-600 dark:text-pink-300 font-mono font-bold block mt-1">
                      Matched: {t.shadeUsed}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
