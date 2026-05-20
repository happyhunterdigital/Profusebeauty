/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useRef, MouseEvent, FormEvent, TouchEvent } from 'react';
import { Check, Star, Users, Calendar, Award, Gift, ChevronRight, UserCheck } from 'lucide-react';
import { Product } from '../types';
import { PRODUCTS, SHADES } from '../data';

interface BentoGridProps {
  onAddToCart: (product: Product, shade?: { id: string; name: string; hex: string }) => void;
  onBookWorkshopClick: () => void;
}

export default function BentoGrid({ onAddToCart, onBookWorkshopClick }: BentoGridProps) {
  // Card 1: Foundation Interactive Shade Choice
  const foundationProduct = PRODUCTS.find(p => p.id === '3-in-1-foundation') || PRODUCTS[0];
  const [selectedShade, setSelectedShade] = useState(SHADES[8]); // Default to Shade 09 Madiba Gold
  const [successMsg, setSuccessMsg] = useState(false);

  // Card 2: Mom Scent tactile glide effect
  const [glideProgress, setGlideProgress] = useState(0); // 0 to 100 representing powder swept percentage
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const handleGlideMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.min(Math.max((x / rect.width) * 100, 0), 100);
    setGlideProgress(percentage);
  };

  const handleMouseDown = (e: MouseEvent) => {
    isDragging.current = true;
    handleGlideMove(e.clientX);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging.current) return;
    handleGlideMove(e.clientX);
  };

  const handleMouseUpOrLeave = () => {
    isDragging.current = false;
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (e.touches && e.touches[0]) {
      handleGlideMove(e.touches[0].clientX);
    }
  };

  // Card 4: Pro MUA Affiliate Signup flow
  const [affiliateName, setAffiliateName] = useState('');
  const [affiliateEmail, setAffiliateEmail] = useState('');
  const [isAffiliateSignedUp, setIsAffiliateSignedUp] = useState(false);
  const [generatedCode, setGeneratedCode] = useState('');

  const handleAffiliateSignup = (e: FormEvent) => {
    e.preventDefault();
    if (!affiliateName || !affiliateEmail) return;
    const randomCode = `PB-MUA-${affiliateName.substring(0, 3).toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`;
    setGeneratedCode(randomCode);
    setIsAffiliateSignedUp(true);
  };

  const triggerAddFoundation = () => {
    onAddToCart(foundationProduct, selectedShade);
    setSuccessMsg(true);
    setTimeout(() => setSuccessMsg(false), 2000);
  };

  const powderProduct = PRODUCTS.find(p => p.id === 'setting-powder') || PRODUCTS[1];
  const [powderSuccess, setPowderSuccess] = useState(false);

  const triggerAddPowder = () => {
    onAddToCart(powderProduct);
    setPowderSuccess(true);
    setTimeout(() => setPowderSuccess(false), 2000);
  };

  return (
    <section id="formula-section" className="py-24 bg-[#FAF7F2] dark:bg-[#191012] px-6 md:px-12 transition-colors duration-500">
      <div className="max-w-7xl mx-auto w-full">
        
        {/* Section Header */}
        <div className="text-center md:text-left mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-pink-700 dark:text-pink-300">The Ultimate Cosmeceuticals</span>
          <h2 className="text-3xl md:text-5xl font-sans font-medium text-[#1E1214] dark:text-[#FBF8F6] tracking-tight mt-2">
            Engineered Bioscience. <span className="font-serif italic text-pink-800 dark:text-pink-300">South African Spirit.</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mt-4 max-w-2xl text-sm md:text-base">
            Profuse Beauty bridges professional-grade makeup artistry with gentle, daily skin-loving shield protection. Hypoallergenic, cruelty-free, and sweat-resistant.
          </p>
        </div>

        {/* Asymmetrical Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* CARD 1: LARGE - The Corporate Routine (Liquid Foundation Shade Matcher) */}
          <div className="lg:col-span-8 bg-white dark:bg-[#201315] rounded-[32px] border border-[#1E1214]/5 dark:border-white/5 p-6 md:p-8 flex flex-col justify-between shadow-sm hover:translate-y-[-4px] hover:shadow-lg transition-all duration-300 overflow-hidden relative">
            
            {/* Soft decorative background shadow blob */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-br from-amber-500/5 to-pink-500/10 blur-3xl pointer-events-none -z-10" />

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
              
              {/* Card 1 Left: Details & Product info */}
              <div className="md:col-span-5 flex flex-col justify-between h-full">
                <div>
                  <div className="inline-flex items-center gap-1.5 bg-rose-500/10 dark:bg-rose-500/20 text-rose-700 dark:text-rose-300 font-semibold px-3 py-1 rounded-full text-[10px] tracking-wide uppercase w-fit mb-4">
                    Face • 3-in-1 Cover
                  </div>
                  <h3 className="text-2xl md:text-3xl font-sans font-semibold text-[#1E1214] dark:text-[#FBF8F6] tracking-tight">
                    3-in-1 Liquid Foundation
                  </h3>
                  <p className="text-xs text-amber-800 dark:text-amber-200 font-serif italic mt-1 font-bold">
                    Primer • Concealer • UV Protector
                  </p>
                  
                  <p className="text-sm text-gray-600 dark:text-gray-300 mt-4 leading-relaxed">
                    Designed for Pretoria heat and high-volume corporate routines. Stays perfectly matte and flashback-free from the early sandton commute up to sunset networking.
                  </p>
                </div>

                <div className="mt-8">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-3xl font-serif font-black text-[#1E1214] dark:text-[#FBF8F6]">R350.00</span>
                    <span className="text-xs text-gray-500 dark:text-gray-400 line-through">R420.00</span>
                    <span className="text-[10px] bg-emerald-500/10 text-emerald-600 font-bold px-2 py-0.5 rounded-full">Save 15%</span>
                  </div>
                  
                  <div className="flex items-center gap-1 text-xs text-amber-500 font-semibold mb-6">
                    <Star size={14} fill="currentColor" />
                    <Star size={14} fill="currentColor" />
                    <Star size={14} fill="currentColor" />
                    <Star size={14} fill="currentColor" />
                    <Star size={14} fill="currentColor" />
                    <span className="text-gray-500 dark:text-gray-400 font-medium ml-1">(120+ reviews)</span>
                  </div>

                  <button
                    onClick={triggerAddFoundation}
                    className="w-full bg-[#1E1214] dark:bg-[#F9EBE6] text-white dark:text-[#1E1214] font-medium py-3 rounded-full text-xs hover:opacity-90 active:scale-95 duration-200 cursor-pointer shadow-md"
                  >
                    {successMsg ? 'Added to Cart ✓' : `Add Active Shade (${selectedShade.id}) to Cart`}
                  </button>
                </div>
              </div>

              {/* Card 1 Right: Foundation Display & Interactive Shade Selector */}
              <div className="md:col-span-7 flex flex-col items-center">
                {/* Visual Swatch and Bottle Simulation */}
                <div className="relative w-full aspect-[4/3] rounded-2xl bg-stone-50 dark:bg-[#120A0B] p-4 border border-stone-200/50 dark:border-white/5 flex items-center justify-between gap-6 overflow-hidden">
                  
                  {/* Dynamic Gradient Color background representing the current formula */}
                  <div 
                    className="absolute inset-0 opacity-15 blur-2xl transition-all duration-500"
                    style={{ backgroundColor: selectedShade.hex }} 
                  />
                  
                  {/* Cosmetic Liquid bottle render representation */}
                  <div className="relative w-[40%] flex justify-center items-center">
                    <div className="relative w-20 h-40 rounded-2xl border-2 border-stone-300 dark:border-stone-700 bg-white/45 dark:bg-[#1E1214]/30 backdrop-blur-sm p-1.5 shadow-xl flex flex-col justify-between items-center">
                      <div className="w-14 h-10 rounded-lg bg-stone-800 dark:bg-stone-300 mt-1 flex items-center justify-center text-[10px] font-bold text-white dark:text-[#1E1214]">3-in-1</div>
                      
                      {/* Fluid Liquid inside bottle matching shade */}
                      <div 
                        className="w-full h-20 rounded-md transition-all duration-500 shadow-inner flex items-center justify-center text-[11px] font-mono font-bold text-[#1E1214]/50 text-center uppercase"
                        style={{ backgroundColor: selectedShade.hex }}
                      >
                        {selectedShade.id}
                      </div>
                      
                      <div className="text-[10px] font-bold text-[#1E1214] dark:text-[#F9EBE6] tracking-widest text-center uppercase mb-1">PROFUSE</div>
                    </div>
                  </div>

                  {/* Shade Information Details Card */}
                  <div className="w-[55%] text-left z-10 p-2 bg-white/70 dark:bg-[#1E1214]/70 backdrop-blur-md rounded-xl border border-white/20">
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded-full border border-stone-300 shadow-sm" style={{ backgroundColor: selectedShade.hex }} />
                      <span className="text-xs font-mono font-bold text-gray-500 dark:text-gray-400 uppercase">Shade #{selectedShade.id}</span>
                    </div>
                    <div className="text-sm font-semibold text-[#1E1214] dark:text-white mt-1.5">{selectedShade.name}</div>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mt-1 leading-relaxed">{selectedShade.description}</p>
                    <div className="mt-2.5 flex flex-wrap gap-1">
                      <span className="text-[9px] bg-[#1E1214]/5 dark:bg-white/5 text-[#1E1214] dark:text-[#F9EBE6] font-semibold px-2 py-0.5 rounded">Pretoria Tech</span>
                      <span className="text-[9px] bg-amber-500/10 text-amber-700 dark:text-amber-300 font-semibold px-2 py-0.5 rounded">Hypoallergenic</span>
                    </div>
                  </div>
                </div>

                {/* 12 Shade Grid */}
                <div className="w-full mt-6">
                  <div className="text-xs font-semibold text-gray-500 dark:text-gray-400 text-left mb-2">
                    Interactive Shade Selector (Shades #01 to #12)
                  </div>
                  <div className="grid grid-cols-6 gap-2">
                    {SHADES.map((shade) => (
                      <button
                        key={shade.id}
                        onClick={() => setSelectedShade(shade)}
                        className={`relative w-full aspect-square rounded-lg border-2 transition-all duration-200 cursor-pointer overflow-hidden ${
                          selectedShade.id === shade.id
                            ? 'border-pink-600 dark:border-pink-300 scale-105 shadow-md flex items-center justify-center'
                            : 'border-transparent hover:scale-102 hover:border-gray-300'
                        }`}
                        title={shade.name}
                        style={{ backgroundColor: shade.hex }}
                      >
                        {selectedShade.id === shade.id ? (
                          <Check size={14} className="text-[#1E1214] bg-white/80 p-0.5 rounded-full font-bold shadow-sm" />
                        ) : (
                          <span className="absolute bottom-0.5 right-1 text-[8px] font-mono font-black text-black/50 bg-white/20 rounded px-0.5">
                            {shade.id}
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                </div>

              </div>

            </div>

          </div>

          {/* CARD 2: MEDIUM - The Mom-Care Setting Powder Dust (Tactile Glide effect) */}
          <div className="lg:col-span-4 bg-white dark:bg-[#201315] rounded-[32px] border border-[#1E1214]/5 dark:border-white/5 p-6 flex flex-col justify-between shadow-sm hover:translate-y-[-4px] hover:shadow-lg transition-all duration-300 overflow-hidden relative">
            
            {/* Soft pink satin fill overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-pink-500/5 via-transparent to-transparent pointer-events-none" />

            <div>
              <div className="inline-flex items-center gap-1 bg-amber-500/10 dark:bg-amber-500/20 text-amber-700 dark:text-amber-300 font-semibold px-3 py-1 rounded-full text-[10px] tracking-wide uppercase w-fit mb-4">
                Setting Media • Zero Irritation
              </div>
              <h3 className="text-2xl font-sans font-semibold text-[#1E1214] dark:text-[#FBF8F6] tracking-tight">
                Micro Pearl Setting Powder
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm mt-3 leading-relaxed">
                Celebrating mothers with busy routines. Ultra-refined talc-free powder formulated with calming chamomile.
              </p>
            </div>

            {/* Interactive "Glide" swept tactile visualization */}
            <div className="my-6">
              <div className="text-[11px] font-bold text-gray-500 dark:text-gray-400 mb-2 text-left flex justify-between items-center">
                <span>Hold & Swipe to Blend (Powder Sweep Simulation)</span>
                <span className="font-mono text-pink-600 dark:text-pink-300 font-bold">{Math.round(glideProgress)}% Blended</span>
              </div>
              
              <div
                ref={containerRef}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUpOrLeave}
                onMouseLeave={handleMouseUpOrLeave}
                onTouchMove={handleTouchMove}
                className="relative h-40 max-h-40 rounded-2xl bg-[#EBE4DC] overflow-hidden cursor-ew-resize select-none border border-stone-200 dark:border-white/5"
              >
                {/* Background image: Radiant maternal beautiful skin revealed on sweep */}
                <img
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=600"
                  alt="Radiant Skin Revealed"
                  className="absolute inset-0 w-full h-full object-cover pointer-events-none"
                  referrerPolicy="no-referrer"
                />
                
                {/* Powder Powder Layer with opacity driven by glide percentage */}
                <div
                  className="absolute inset-0 bg-[#F5EFE8]/95 dark:bg-[#eedfd2]/90 flex flex-col justify-center items-center p-4 transition-all pointer-events-none text-stone-800"
                  style={{
                    clipPath: `polygon(${glideProgress}% 0, 100% 0, 100% 100%, ${glideProgress}% 100%)`,
                  }}
                >
                  {/* Decorative powder spatter SVG drawing style representation */}
                  <div className="w-12 h-12 rounded-full border border-dashed border-stone-400/50 flex items-center justify-center animate-spin" style={{ animationDuration: '24s' }} />
                  <span className="text-[10px] font-bold tracking-widest text-stone-500 mt-2 uppercase">Loose Micro Pearl Powder</span>
                  <p className="text-[9px] text-stone-400 text-center max-w-[150px] mt-1 font-medium">Glides smooth with zero flashback</p>
                </div>

                {/* Sweeping bar indicator */}
                <div
                  className="absolute top-0 bottom-0 w-1 bg-pink-600 pointer-events-none shadow-[0_0_8px_rgba(219,39,119,0.5)]"
                  style={{ left: `${glideProgress}%` }}
                />

                {/* Tactile indicator text */}
                {glideProgress === 0 && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/20 text-white font-bold text-xs animate-pulse pointer-events-none">
                    Slide Finger Here
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-center justify-between mt-2 pt-2 border-t border-stone-100 dark:border-white/5">
              <div>
                <span className="text-xl font-serif font-black text-[#1E1214] dark:text-[#FBF8F6]">R250.00</span>
                <span className="block text-[9px] text-gray-400">15g Net Vol</span>
              </div>
              <button
                onClick={triggerAddPowder}
                className="bg-[#1E1214] dark:bg-[#F9EBE6] text-white dark:text-[#1E1214] font-semibold text-xs py-2.5 px-5 rounded-full hover:opacity-95 duration-200 cursor-pointer shadow-sm"
              >
                {powderSuccess ? 'Added ✓' : 'Add to Cart'}
              </button>
            </div>

          </div>

          {/* CARD 3: MEDIUM - Pretoria Masterclass Workshops Booking Link */}
          <div className="lg:col-span-6 bg-white dark:bg-[#201315] rounded-[32px] border border-[#1E1214]/5 dark:border-white/5 p-6 flex flex-col justify-between shadow-sm hover:translate-y-[-4px] hover:shadow-lg transition-all duration-300 overflow-hidden relative">
            <div className="absolute top-0 right-0 w-48 h-48 bg-teal-500/5 blur-3xl pointer-events-none" />

            <div>
              <div className="inline-flex items-center gap-1.5 bg-teal-500/10 dark:bg-teal-500/20 text-teal-700 dark:text-teal-300 font-semibold px-3 py-1 rounded-full text-[10px] tracking-wide uppercase w-fit mb-4">
                Workshops • Pretoria Base
              </div>
              <h3 className="text-2xl font-sans font-semibold text-[#1E1214] dark:text-[#FBF8F6] tracking-tight">
                Pretoria Masterclass Workshops
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm mt-3 leading-relaxed">
                Learn pro application techniques directly from Marcia Kgaphola in our Brooklyn, Pretoria studio. We host interactive 1-on-1 and group coaching templates curated for all experience levels.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 my-6">
              <div className="bg-stone-50 dark:bg-[#1E1214]/40 p-3 rounded-xl border border-stone-200/40 dark:border-white/5">
                <div className="text-pink-600 dark:text-pink-300 font-bold text-lg font-serif italic">1-on-1</div>
                <div className="text-xs font-semibold text-gray-700 dark:text-gray-200 mt-1">Personalized Glam</div>
                <p className="text-[10px] text-gray-500 mt-1">Custom shade calibration and professional routine mapping</p>
              </div>
              <div className="bg-stone-50 dark:bg-[#1E1214]/40 p-3 rounded-xl border border-stone-200/40 dark:border-white/5">
                <div className="text-pink-600 dark:text-pink-300 font-bold text-lg font-serif italic">Group</div>
                <div className="text-xs font-semibold text-gray-700 dark:text-gray-200 mt-1">Mothers & Pros</div>
                <p className="text-[10px] text-gray-500 mt-1">Fun, sociable, interactive cosmetics pairing workshops</p>
              </div>
            </div>

            <button
              onClick={onBookWorkshopClick}
              className="w-full relative group bg-gradient-to-r from-[#1E1214] to-teal-980 dark:from-[#3a2024] dark:to-[#1e1214] text-white py-3 rounded-full text-xs font-semibold flex items-center justify-center gap-2 duration-300 ease-out cursor-pointer hover:scale-[1.02] shadow-md border border-white/15"
            >
              <Calendar size={14} className="text-teal-300" />
              Book Workshop calendar Open
              <ChevronRight size={14} className="group-hover:translate-x-1 duration-200" />
            </button>

          </div>

          {/* CARD 4: SMALL - Pro MUA Affiliate Hub */}
          <div className="lg:col-span-6 bg-white dark:bg-[#201315] rounded-[32px] border border-[#1E1214]/5 dark:border-white/5 p-6 flex flex-col justify-between shadow-sm hover:translate-y-[-4px] hover:shadow-lg transition-all duration-300 overflow-hidden relative">
            <div className="absolute top-0 left-0 w-32 h-32 bg-amber-500/5 blur-2xl pointer-events-none" />

            <div>
              <div className="inline-flex items-center gap-1.5 bg-amber-500/10 dark:bg-amber-500/20 text-amber-700 dark:text-amber-300 font-semibold px-3 py-1 rounded-full text-[10px] tracking-wide uppercase w-fit mb-4">
                Community • MUA Network
              </div>
              <h3 className="text-xl font-sans font-semibold text-[#1E1214] dark:text-[#FBF8F6] tracking-tight">
                Pro MUA Affiliate Hub
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-xs mt-2 leading-relaxed">
                Are you a local South African makeup artist or lifestyle influencer? Earn 15% recurring commissions, free cosmetics samples, and get listed in our booking directory.
              </p>
            </div>

            {/* Affiliate quick simulation box */}
            <div className="my-4 pt-4 border-t border-stone-100 dark:border-white/5">
              {!isAffiliateSignedUp ? (
                <form onSubmit={handleAffiliateSignup} className="space-y-2">
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      placeholder="Your Name"
                      value={affiliateName}
                      onChange={(e) => setAffiliateName(e.target.value)}
                      required
                      className="bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl px-3 py-2 text-xs text-[#1E1214] dark:text-white placeholder-gray-400 focus:outline-none focus:border-pink-600 focus:ring-1 focus:ring-pink-600"
                    />
                    <input
                      type="email"
                      placeholder="MUA Email"
                      value={affiliateEmail}
                      onChange={(e) => setAffiliateEmail(e.target.value)}
                      required
                      className="bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl px-3 py-2 text-xs text-[#1E1214] dark:text-white placeholder-gray-400 focus:outline-none focus:border-pink-600 focus:ring-1 focus:ring-pink-600"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-pink-700 hover:bg-pink-800 text-white rounded-xl py-2 text-xs font-semibold cursor-pointer active:scale-98 transition-all"
                  >
                    Join the Pro Affiliate Team
                  </button>
                </form>
              ) : (
                <div className="bg-emerald-500/5 dark:bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-4 text-center animate-fadeIn">
                  <div className="text-emerald-600 dark:text-emerald-400 font-bold text-xs flex items-center justify-center gap-1.5">
                    <UserCheck size={14} /> Congratulations MUA Ambassador!
                  </div>
                  <p className="text-[10px] text-gray-500 mt-1">Your unique affiliate tracking link is generated:</p>
                  <div className="bg-white dark:bg-stone-900 border border-emerald-500/15 select-all font-mono font-bold text-xs text-emerald-700 dark:text-emerald-300 rounded-xl py-1.5 px-3 mt-2 break-all">
                    {generatedCode}
                  </div>
                  <p className="text-[9px] text-gray-400 mt-1.5">Use this code for R50 off your clients cosmetics orders!</p>
                </div>
              )}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
