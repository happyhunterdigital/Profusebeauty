// File: src/components/Hero.tsx
import React, { useState, useEffect } from 'react';
import { ArrowUpRight, Award, Crown, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface HeroProps {
  isDarkMode?: boolean;
  onVTOOpen?: () => void;
}

const heroImages = [
  "https://res.cloudinary.com/dafc66cma/image/upload/q_auto/f_auto/v1782233996/Profuse_Beauty_Hero_Image_wunwyw.jpg",
  "https://res.cloudinary.com/dafc66cma/image/upload/q_auto/f_auto/v1782234464/Profuse_Beauty_Hero_Image2_q4fan7.jpg",
  "https://res.cloudinary.com/dafc66cma/image/upload/q_auto/f_auto/v1782234466/Profuse_Beauty_Hero_Image3_wlbdjf.jpg"
];

export default function Hero({ onVTOOpen }: HeroProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    // Crossfade every 5 seconds
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const navLinks = ["Products", "Studio", "Masterclass", "Inquire"];

  return (
    <section className="relative w-full h-[100vh] min-h-[600px] overflow-hidden bg-black">
      
      {/* Background Image Slider with Ken Burns effect */}
      <div className="absolute inset-0 overflow-hidden bg-black z-0">
        <AnimatePresence mode="popLayout">
          <motion.img
            key={currentImageIndex}
            src={heroImages[currentImageIndex]}
            alt="Profuse Beauty Hero Background"
            initial={{ opacity: 0, scale: 1 }}
            animate={{ opacity: 1, scale: 1.05 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ 
              opacity: { duration: 1.5, ease: "easeInOut" },
              scale: { duration: 6.5, ease: "linear" } 
            }}
            className="absolute inset-0 w-full h-full object-cover"
          />
        </AnimatePresence>
        {/* Dark gradient overlay to ensure text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/80" />
      </div>

      {/* Navbar Overlay */}
      <div className="absolute top-0 left-0 w-full z-40 flex items-center justify-between px-6 sm:px-10 lg:px-16 py-5 lg:py-7">
        {/* Left: Brand */}
        <div className="font-podium text-white text-2xl sm:text-3xl tracking-wider uppercase font-bold">
          PROFUSE
        </div>

        {/* Center: Desktop Links */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <a 
              key={link} 
              href={`#${link.toLowerCase()}`}
              className="font-inter text-sm text-white/80 tracking-widest uppercase hover:text-white transition-colors"
            >
              {link}
            </a>
          ))}
        </div>

        {/* Right: Desktop CTA & Mobile Hamburger */}
        <div className="flex items-center">
          <button 
            onClick={onVTOOpen}
            className="hidden md:flex items-center gap-2 border border-white/30 hover:border-white/60 px-6 py-3 text-xs tracking-widest uppercase text-white hover:bg-white/10 transition-all"
          >
            START SCAN
            <ArrowUpRight className="w-4 h-4" />
          </button>

          <button 
            className="md:hidden flex flex-col space-y-1.5 p-2"
            onClick={() => setMenuOpen(true)}
            aria-label="Open Menu"
          >
            <div className="w-6 h-0.5 bg-white"></div>
            <div className="w-6 h-0.5 bg-white"></div>
            <div className="w-4 h-0.5 bg-white"></div>
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div 
        className={`fixed inset-0 z-50 bg-black/95 backdrop-blur-sm transition-all duration-500 ${
          menuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
      >
        <div className="flex flex-col h-full w-full">
          <div className="flex items-center justify-between px-6 py-5">
            <div className="font-podium text-white text-2xl tracking-wider uppercase font-bold">
              PROFUSE
            </div>
            <button onClick={() => setMenuOpen(false)} aria-label="Close Menu" className="p-2 text-white">
              <X className="w-8 h-8" />
            </button>
          </div>

          <div className="flex-1 flex flex-col items-center justify-center space-y-8">
            {navLinks.map((link, i) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                onClick={() => setMenuOpen(false)}
                className="font-podium text-4xl sm:text-5xl text-white uppercase tracking-wider transition-all duration-500"
                style={{
                  transitionDelay: `${i * 80 + 100}ms`,
                  opacity: menuOpen ? 1 : 0,
                  transform: menuOpen ? 'translateY(0)' : 'translateY(20px)'
                }}
              >
                {link}
              </a>
            ))}
            <button 
              onClick={() => { setMenuOpen(false); onVTOOpen && onVTOOpen(); }}
              className="mt-8 flex items-center gap-2 border border-white/30 px-8 py-4 text-sm tracking-widest uppercase text-white transition-all duration-500"
              style={{
                transitionDelay: `${navLinks.length * 80 + 100}ms`,
                opacity: menuOpen ? 1 : 0,
                transform: menuOpen ? 'translateY(0)' : 'translateY(20px)'
              }}
            >
              START SCAN
              <ArrowUpRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Hero Content Overlays */}
      <div className="absolute inset-0 z-10 flex flex-col justify-center px-6 sm:px-10 lg:px-16 pointer-events-none">
        <div className="max-w-4xl pointer-events-auto">
          
          {/* Tagline */}
          <div className="animate-fade-up mb-6 lg:mb-8 flex items-center gap-3">
            <Crown className="w-4 h-4 text-amber-400/80" />
            <span className="text-amber-400/80 text-xs sm:text-sm font-inter tracking-[0.3em] uppercase">
              Premium Luxury Beauty & Cosmetic Wellness
            </span>
          </div>

          {/* Main Heading */}
          <div className="animate-fade-up-delay-1 flex flex-col">
            <h1 className="font-podium text-white uppercase leading-[0.92] tracking-tight text-[clamp(2.8rem,8vw,7rem)] drop-shadow-2xl">
              Cultivate.<br/>
              Natural.<br/>
              Beauty.
            </h1>
          </div>

          {/* Subtext */}
          <div className="animate-fade-up-delay-2 mt-6 lg:mt-8">
            <p className="text-white/80 text-sm sm:text-base font-inter leading-relaxed max-w-md drop-shadow-md font-light">
              High-end botanical formulations crafted for perfect harmony.<br/>
              <span className="font-semibold text-white mt-1 block">Experience luxury clinical aesthetics with our interactive diagnostic suite.</span>
            </p>
          </div>

          {/* CTA Row */}
          <div className="animate-fade-up-delay-3 mt-8 lg:mt-10 flex flex-wrap items-center gap-4 sm:gap-6">
            <button 
              onClick={onVTOOpen}
              className="group bg-white hover:bg-zinc-200 text-black px-5 sm:px-7 py-3 sm:py-4 text-[11px] sm:text-xs tracking-widest uppercase font-bold flex items-center gap-2 transition-colors"
            >
              DISCOVER YOUR SHADE
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
            <div className="hidden sm:flex items-center gap-3 border-l border-white/20 pl-6 ml-2">
              <Award className="w-8 h-8 text-amber-400/60" />
              <div className="flex flex-col">
                <span className="text-white/80 text-[10px] tracking-wider uppercase font-inter">Top-Rated</span>
                <span className="text-white/60 text-[10px] tracking-wider uppercase font-inter">Beauty Studio</span>
              </div>
            </div>
          </div>

          {/* Stats Row */}
          <div className="animate-fade-up-delay-4 mt-8 sm:mt-10 lg:mt-14 flex flex-wrap gap-6 sm:gap-12 lg:gap-16 pt-6 border-t border-white/10">
            <div className="flex flex-col">
              <span className="font-inter text-white text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight drop-shadow-lg">250+</span>
              <span className="text-amber-400/70 text-[9px] sm:text-[10px] tracking-widest uppercase mt-2 font-inter">Botanical Ingredients</span>
            </div>
            <div className="flex flex-col">
              <span className="font-inter text-white text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight drop-shadow-lg">95%</span>
              <span className="text-amber-400/70 text-[9px] sm:text-[10px] tracking-widest uppercase mt-2 font-inter">Skin Match Rate</span>
            </div>
            <div className="flex flex-col">
              <span className="font-inter text-white text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight drop-shadow-lg">10+</span>
              <span className="text-amber-400/70 text-[9px] sm:text-[10px] tracking-widest uppercase mt-2 font-inter">Years in the Game</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
