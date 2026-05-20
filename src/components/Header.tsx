/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { ShoppingBag, Sun, Moon, Menu, X, ChevronDown, Sparkles, BookOpen, Heart, ArrowRight } from 'lucide-react';

interface HeaderProps {
  cartItemsCount: number;
  onCartClick: () => void;
  onBookWorkshopClick: () => void;
  onVirtualTryOnClick: () => void;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  onCategorySelect?: (category: string) => void;
}

export default function Header({
  cartItemsCount,
  onCartClick,
  onBookWorkshopClick,
  onVirtualTryOnClick,
  isDarkMode,
  toggleDarkMode,
  onCategorySelect,
}: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const [mobileFaceExpanded, setMobileFaceExpanded] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleCategoryClick = (category: string) => {
    setIsMegaMenuOpen(false);
    setIsMobileMenuOpen(false);
    if (onCategorySelect) {
      onCategorySelect(category);
    }
  };

  const handleMasterclassClick = () => {
    setIsMegaMenuOpen(false);
    setIsMobileMenuOpen(false);
    onBookWorkshopClick();
  };

  const handleVirtualStudioClick = () => {
    setIsMegaMenuOpen(false);
    setIsMobileMenuOpen(false);
    onVirtualTryOnClick();
  };

  const scrollToSection = (id: string) => {
    setIsMobileMenuOpen(false);
    setIsMegaMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <header
      id="main-header"
      className={`fixed top-4 left-1/2 -translate-x-1/2 max-w-7xl w-[92%] z-50 rounded-3xl border px-6 py-4 transition-all duration-300 ${
        isScrolled
          ? 'bg-black/90 dark:bg-black/95 backdrop-blur-xl shadow-2xl border-gold/25'
          : 'bg-black/85 backdrop-blur-lg border-gold/15 shadow-[0_8px_32px_0_rgba(212,175,55,0.08)]'
      }`}
    >
      <div className="flex items-center justify-between w-full relative">
        
        {/* Left Side: Luxe Serif Logo */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="font-serif italic text-xl md:text-2xl font-bold tracking-tight text-white hover:text-gold transition-colors duration-300 cursor-pointer group flex items-center"
        >
          <span className="text-gold font-sans font-black mr-1 text-sm md:text-base tracking-widest">★</span>
          <span>Profuse</span>
          <span className="font-sans font-light text-[10px] tracking-widest uppercase ml-1.5 opacity-80 text-gold group-hover:opacity-100">Beauty</span>
        </button>

        {/* Center Navigation Menu Items - Hidden on Mobile */}
        <nav className="hidden lg:flex items-center gap-6">
          <button
            onClick={() => scrollToSection('formula-section')}
            className="text-[11px] font-sans font-bold uppercase tracking-wider text-soft-ivory hover:text-gold transition-colors duration-200 cursor-pointer"
          >
            The Formula
          </button>

          {/* Mega Menu Toggle Trigger */}
          <div className="relative group/trigger">
            <button
              onClick={() => setIsMegaMenuOpen(!isMegaMenuOpen)}
              className="flex items-center gap-1 text-[11px] font-sans font-bold uppercase tracking-wider text-soft-ivory hover:text-gold transition-colors duration-200 cursor-pointer py-1"
            >
              <span>Shop Collections</span>
              <ChevronDown size={12} className={`stroke-[3px] transition-transform duration-300 ${isMegaMenuOpen ? 'rotate-180' : ''}`} />
            </button>
          </div>

          <button
            onClick={handleVirtualStudioClick}
            className="text-[11px] font-sans font-bold uppercase tracking-wider text-soft-ivory hover:text-gold transition-colors duration-200 cursor-pointer"
          >
            Virtual Try-on
          </button>

          <button
            onClick={() => scrollToSection('story-section')}
            className="text-[11px] font-sans font-bold uppercase tracking-wider text-soft-ivory hover:text-gold transition-colors duration-200 cursor-pointer"
          >
            MUA Lounge
          </button>

          <button
            onClick={handleMasterclassClick}
            className="text-[11px] font-sans font-bold uppercase tracking-wider text-soft-ivory hover:text-gold transition-colors duration-200 cursor-pointer"
          >
            Workshops
          </button>
        </nav>

        {/* Right Action Widgets */}
        <div className="flex items-center gap-3">
          {/* Theme Indicator Info - locked Premium Dark */}
          <span className="hidden sm:inline-block text-[9px] uppercase tracking-widest bg-gold/10 text-gold border border-gold/20 font-black px-2 py-0.5 rounded-full animate-pulse">
            Pretoria Premium
          </span>

          {/* Force Dark Mode Toggle indicator - Luxury beauty theme */}
          <button
            onClick={toggleDarkMode}
            className="p-1.5 rounded-full cursor-pointer text-soft-ivory hover:text-gold hover:bg-white/5 transition-colors"
            title="Toggle color theme"
          >
            {isDarkMode ? <Sun size={15} className="text-gold" /> : <Moon size={15} className="text-gray-400" />}
          </button>

          {/* Cart Widget */}
          <button
            onClick={onCartClick}
            className="relative flex items-center justify-center p-2 rounded-full cursor-pointer text-soft-ivory hover:text-gold hover:bg-white/5 transition-all duration-200 border border-gold/10"
            title="Open cart drawer"
          >
            <ShoppingBag size={15} className="text-gold" />
            {cartItemsCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-4.5 w-4.5 items-center justify-center rounded-full bg-gold text-[9px] font-black text-black animate-scaleIn">
                {cartItemsCount}
              </span>
            )}
          </button>

          {/* Book Masterclass Trigger Solid CTA */}
          <button
            onClick={handleMasterclassClick}
            className="hidden sm:inline-block bg-gradient-to-r from-gold to-amber-500 hover:from-amber-500 hover:to-gold text-black text-[10px] font-black uppercase tracking-wider px-4 py-2.5 rounded-lg active:scale-95 transition-all duration-300 shadow-[0_4px_12px_rgba(212,175,55,0.2)] cursor-pointer"
          >
            Book Masterclass
          </button>

          {/* Mobile menu Button toggle */}
          <button
            className="lg:hidden p-2 text-soft-ivory hover:text-gold hover:bg-white/5 rounded-xl border border-white/10"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>

        {/* ----------------- MEGA MENU DROPDOWN PANEL (Desktop) ----------------- */}
        {isMegaMenuOpen && (
          <div
            className="absolute top-16 left-0 right-0 w-full p-8 bg-black/95 backdrop-blur-2xl border border-gold/30 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.8)] z-50 grid grid-cols-4 gap-6 text-left animate-fadeIn"
            onMouseLeave={() => setIsMegaMenuOpen(false)}
          >
            
            {/* Column 1: Face Specialties */}
            <div className="space-y-4">
              <span className="text-[10px] font-black uppercase tracking-widest text-gold border-b border-gold/20 pb-1.5 block">
                Face Artistry
              </span>
              <ul className="space-y-2 text-xs">
                <li>
                  <button
                    onClick={() => handleCategoryClick('Face')}
                    className="text-gray-300 hover:text-gold font-bold block transition-colors cursor-pointer text-left"
                  >
                    All Face Formulas
                  </button>
                </li>
                <li className="mt-2 pt-2 border-t border-white/5 space-y-1.5 text-gray-400">
                  <button
                    onClick={() => handleCategoryClick('Face Primer')}
                    className="hover:text-dusty-rose block transition-colors cursor-pointer text-left"
                  >
                    • Face Primer
                  </button>
                  <button
                    onClick={() => handleCategoryClick('HD Liquid Foundation')}
                    className="hover:text-dusty-rose block transition-colors cursor-pointer text-left block"
                  >
                    • HD Liquid Foundation
                  </button>
                  <button
                    onClick={() => handleCategoryClick('HD Perfect setting powder')}
                    className="hover:text-dusty-rose block transition-colors cursor-pointer text-left block"
                  >
                    • HD Perfect setting powder
                  </button>
                  <button
                    onClick={() => handleCategoryClick('Highlighter')}
                    className="hover:text-dusty-rose block transition-colors cursor-pointer text-left block"
                  >
                    • Highlighter
                  </button>
                  <button
                    onClick={() => handleCategoryClick('Waterproof Makeup Remover')}
                    className="hover:text-dusty-rose block transition-colors cursor-pointer text-left block"
                  >
                    • Waterproof Makeup Remover
                  </button>
                </li>
              </ul>
            </div>

            {/* Column 2: Concealing Duos */}
            <div className="space-y-4">
              <span className="text-[10px] font-black uppercase tracking-widest text-gold border-b border-gold/20 pb-1.5 block">
                Concealers & Matching
              </span>
              <ul className="space-y-1.5 text-xs text-gray-300">
                <li>
                  <button
                    onClick={() => handleCategoryClick('HD Liquid Concealers')}
                    className="hover:text-gold block transition-colors cursor-pointer font-bold text-left"
                  >
                    HD Liquid Concealers
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleCategoryClick('Concealer Palette')}
                    className="hover:text-gold block transition-colors cursor-pointer font-bold text-left"
                  >
                    Concealer Palette
                  </button>
                </li>
                <li className="pt-4">
                  <div className="p-3 bg-white/5 rounded-xl border border-white/5">
                    <span className="text-[9px] font-black text-gold uppercase block">VTO Tool</span>
                    <p className="text-[10px] text-gray-400 mt-1 leading-snug">
                      Analyze camera skin tones instantly to receive biometrics recommendations.
                    </p>
                    <button
                      onClick={handleVirtualStudioClick}
                      className="text-[9px] text-gold font-bold flex items-center mt-2 hover:underline cursor-pointer"
                    >
                      Launch VTO Camera <ArrowRight size={10} className="ml-1" />
                    </button>
                  </div>
                </li>
              </ul>
            </div>

            {/* Column 3: Eyes & Lips */}
            <div className="space-y-4">
              <span className="text-[10px] font-black uppercase tracking-widest text-gold border-b border-gold/20 pb-1.5 block">
                Lips & Eyes
              </span>
              <ul className="space-y-2 text-xs">
                <li>
                  <button
                    onClick={() => handleCategoryClick('Lips')}
                    className="text-gray-300 hover:text-gold font-bold block transition-colors cursor-pointer text-left"
                  >
                    Lips
                  </button>
                  <div className="flex flex-col ml-2 pl-2 border-l border-white/5 mt-1 text-[11px] text-gray-400 gap-1.5">
                    <button onClick={() => handleCategoryClick('Lipstick')} className="hover:text-dusty-rose text-left">Matte Lipstick</button>
                    <button onClick={() => handleCategoryClick('gloss')} className="hover:text-dusty-rose text-left">Luscious / Red Gloss</button>
                  </div>
                </li>
                <li className="pt-2">
                  <button
                    onClick={() => handleCategoryClick('Eyes')}
                    className="text-gray-300 hover:text-gold font-bold block transition-colors cursor-pointer text-left"
                  >
                    Eyes
                  </button>
                  <p className="text-[10px] text-gray-500 ml-4">Bold-Eyeshadow palette & shadow accessories</p>
                </li>
              </ul>
            </div>

            {/* Column 4: Accessories & Specials */}
            <div className="space-y-4">
              <span className="text-[10px] font-black uppercase tracking-widest text-gold border-b border-gold/20 pb-1.5 block">
                Kits & Studio Tools
              </span>
              <ul className="space-y-2 text-xs text-gray-300">
                <li>
                  <button
                    onClick={() => handleCategoryClick('Accessories')}
                    className="hover:text-gold block transition-colors cursor-pointer font-bold text-left animate-pulse"
                  >
                    Accessories & Brushes
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleCategoryClick('Combo')}
                    className="hover:text-gold block transition-colors cursor-pointer font-bold text-left"
                  >
                    Combo & Radiance Kits
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleCategoryClick('All')}
                    className="hover:text-gold block transition-colors cursor-pointer text-left"
                  >
                    New Arrivals
                  </button>
                </li>
                <li className="pt-2">
                  <button
                    onClick={handleMasterclassClick}
                    className="w-full bg-gold/15 border border-gold/30 hover:bg-gold/25 p-2 rounded-lg text-[10px] font-bold text-gold flex items-center justify-between cursor-pointer"
                  >
                    <span>Saturday Masterclass</span>
                    <Sparkles size={11} className="text-gold" />
                  </button>
                </li>
              </ul>
            </div>

          </div>
        )}

      </div>

      {/* ---------------- Mobile Expanded Drawer ---------------- */}
      {isMobileMenuOpen && (
        <div className="absolute top-18 left-0 right-0 p-6 bg-black/95 backdrop-blur-2xl border border-gold/30 shadow-2xl rounded-2xl flex flex-col gap-4 animate-scaleIn lg:hidden max-h-[80vh] overflow-y-auto text-left">
          
          <div className="space-y-3.5">
            <span className="text-[10px] font-black uppercase text-gold tracking-widest block border-b border-white/10 pb-1">
              Shop categories
            </span>
            
            <div className="grid grid-cols-2 gap-2 text-xs">
              <button
                onClick={() => handleCategoryClick('All')}
                className="py-2.5 px-3 bg-white/5 border border-white/5 rounded-xl text-soft-ivory hover:text-gold text-left font-bold"
              >
                All Products
              </button>
              <button
                onClick={() => handleCategoryClick('Lips')}
                className="py-2.5 px-3 bg-white/5 border border-white/5 rounded-xl text-soft-ivory hover:text-gold text-left font-bold"
              >
                Lips
              </button>
              <button
                onClick={() => handleCategoryClick('Eyes')}
                className="py-2.5 px-3 bg-white/5 border border-white/5 rounded-xl text-soft-ivory hover:text-gold text-left font-bold"
              >
                Eyes Palette
              </button>
              <button
                onClick={() => handleCategoryClick('Accessories')}
                className="py-2.5 px-3 bg-white/5 border border-white/5 rounded-xl text-soft-ivory hover:text-gold text-left font-bold"
              >
                Accessories
              </button>
              <button
                onClick={() => handleCategoryClick('Combo')}
                className="py-2.5 px-3 bg-white/5 border border-white/5 rounded-xl text-soft-ivory hover:text-gold text-left font-bold"
              >
                Combo Sets
              </button>
              <button
                onClick={() => handleCategoryClick('HD Liquid Concealers')}
                className="py-2.5 px-3 bg-white/5 border border-white/5 rounded-xl text-soft-ivory hover:text-gold text-left font-bold"
              >
                Concealers
              </button>
              <button
                onClick={() => handleCategoryClick('Concealer Palette')}
                className="py-2.5 px-3 bg-white/5 border border-white/5 rounded-xl text-soft-ivory hover:text-gold text-left font-bold"
              >
                Concealer Palette
              </button>
              <button
                onClick={() => handleCategoryClick('Setting')}
                className="py-2.5 px-3 bg-white/5 border border-white/5 rounded-xl text-soft-ivory hover:text-gold text-left font-bold"
              >
                Setting Powders
              </button>
            </div>

            {/* Expandable Mobile Face Subgroup */}
            <div className="border border-white/5 bg-white/5 p-3 rounded-xl space-y-2">
              <button
                onClick={() => setMobileFaceExpanded(!mobileFaceExpanded)}
                className="w-full flex items-center justify-between text-xs font-bold text-soft-ivory"
              >
                <span>Face Sub-items</span>
                <ChevronDown size={14} className={`text-gold transition-transform duration-200 ${mobileFaceExpanded ? 'rotate-180' : ''}`} />
              </button>

              {mobileFaceExpanded && (
                <div className="flex flex-col gap-2 pl-2 border-l border-gold/30 mt-2 text-[11px] text-gray-400">
                  <button onClick={() => handleCategoryClick('Face Primer')} className="text-left py-1 hover:text-gold">★ Face Primer</button>
                  <button onClick={() => handleCategoryClick('HD Liquid Foundation')} className="text-left py-1 hover:text-gold">★ HD Liquid Foundation</button>
                  <button onClick={() => handleCategoryClick('HD Perfect setting powder')} className="text-left py-1 hover:text-gold">★ HD Perfect setting powder</button>
                  <button onClick={() => handleCategoryClick('Highlighter')} className="text-left py-1 hover:text-gold">★ Highlighter</button>
                  <button onClick={() => handleCategoryClick('Waterproof Makeup Remover')} className="text-left py-1 hover:text-gold">★ Waterproof Makeup Remover</button>
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-2 pt-2 border-t border-white/10">
            <button
              onClick={handleVirtualStudioClick}
              className="w-full border border-gold/40 text-gold py-2.5 rounded-xl text-xs font-bold bg-gold/5"
            >
              Virtual Try-On camera
            </button>
            <button
              onClick={handleMasterclassClick}
              className="w-full bg-gradient-to-r from-gold to-amber-500 text-black py-2.5 rounded-xl text-xs font-bold"
            >
              Book Saturday Workshop
            </button>
          </div>
        </div>
      )}

    </header>
  );
}
