/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { ShoppingBag, Sun, Moon, Menu, X } from 'lucide-react';

interface HeaderProps {
  cartItemsCount: number;
  onCartClick: () => void;
  onBookWorkshopClick: () => void;
  onVirtualTryOnClick: () => void;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

export default function Header({
  cartItemsCount,
  onCartClick,
  onBookWorkshopClick,
  onVirtualTryOnClick,
  isDarkMode,
  toggleDarkMode,
}: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setIsMobileMenuOpen(false);
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
      className={`fixed top-4 left-1/2 -translate-x-1/2 max-w-7xl w-[92%] z-50 rounded-full border px-6 py-3 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/80 dark:bg-[#1E1214]/80 backdrop-blur-lg shadow-lg border-white/20 dark:border-white/10'
          : 'bg-white/40 dark:bg-black/20 backdrop-blur-md border-white/20 dark:border-white/5 shadow-[0_8px_32px_0_rgba(30,18,20,0.04)]'
      }`}
    >
      <div className="flex items-center justify-between w-full">
        {/* Left Side: Serif Logo */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="font-serif italic text-xl md:text-2xl font-semibold tracking-tight text-[#1E1214] dark:text-[#F9EBE6] hover:opacity-80 transition-opacity cursor-pointer group"
        >
          Profuse <span className="font-sans font-light text-sm tracking-widest uppercase ml-1 opacity-75 group-hover:opacity-100 transition-opacity">Beauty</span>
        </button>

        {/* Center Navigation Menu Items - Hidden on Mobile */}
        <nav className="hidden md:flex items-center gap-8">
          {[
            { label: 'The Formula', id: 'formula-section' },
            { label: 'Virtual Studio', id: 'studio-section' },
            { label: 'Workshops', id: 'workshops-section' },
            { label: 'MUA Lounge', id: 'mua-section' },
            { label: 'Our Story', id: 'story-section' },
          ].map((item) => (
            <button
              key={item.label}
              onClick={() => scrollToSection(item.id)}
              className="text-xs lg:text-sm font-medium text-[#1E1214]/85 dark:text-[#F9EBE6]/85 hover:text-[#1E1214] dark:hover:text-white transition-all hover:scale-[1.03] cursor-pointer relative group py-1"
            >
              {item.label}
              <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#1E1214] dark:bg-[#F9EBE6] transition-all duration-300 group-hover:w-full" />
            </button>
          ))}
        </nav>

        {/* Right Action Widgets */}
        <div className="flex items-center gap-4">
          {/* Dark Mode Icon */}
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-full cursor-pointer text-[#1E1214] dark:text-[#FBF8F6] hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
            title="Toggle color theme"
          >
            {isDarkMode ? <Sun size={18} className="text-amber-300" /> : <Moon size={18} />}
          </button>

          {/* Pill Shaped Cart Icon */}
          <button
            onClick={onCartClick}
            className="relative flex items-center justify-center p-2 rounded-full cursor-pointer text-[#1E1214] dark:text-[#FBF8F6] hover:bg-black/5 dark:hover:bg-white/10 transition-all duration-200"
            title="Open cart drawer"
          >
            <ShoppingBag size={18} />
            {cartItemsCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-600 text-[10px] font-bold text-white animate-scaleIn">
                {cartItemsCount}
              </span>
            )}
          </button>

          {/* Workshop Solid Button - Hidden on mobile */}
          <button
            onClick={onBookWorkshopClick}
            className="hidden sm:inline-block bg-[#1E1214] dark:bg-[#F9EBE6] text-white dark:text-[#1E1214] text-xs font-semibold px-5 py-2.5 rounded-full hover:scale-105 active:scale-95 duration-200 cursor-pointer shadow-md"
          >
            Book Workshop
          </button>

          {/* Quick Match Shade for Mobile Top bar */}
          <button
            onClick={onVirtualTryOnClick}
            className="hidden xs:inline-block md:hidden bg-gradient-to-r from-pink-500/20 to-amber-500/10 dark:from-pink-600/30 dark:to-orange-500/20 text-[#1E1214] dark:text-[#F9EBE6] border border-pink-500/30 text-[11px] font-semibold px-3 py-1.5 rounded-full hover:scale-105 duration-200 cursor-pointer"
          >
            Try-On
          </button>

          {/* Mobile hamburger menu */}
          <button
            className="md:hidden p-2 text-[#1E1214] dark:text-[#F9EBE6] hover:bg-black/5 dark:hover:bg-white/10 rounded-full"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Expanded Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="absolute top-16 left-0 right-0 p-6 bg-white/95 dark:bg-[#1E1214]/95 backdrop-blur-xl border border-white/20 dark:border-white/10 shadow-2xl rounded-3xl mt-2 flex flex-col gap-4 animate-fadeIn md:hidden">
          <div className="grid grid-cols-2 gap-3 text-center">
            {[
              { label: 'The Formula', id: 'formula-section' },
              { label: 'Virtual Studio', id: 'studio-section' },
              { label: 'Workshops', id: 'workshops-section' },
              { label: 'MUA Lounge', id: 'mua-section' },
              { label: 'Our Story', id: 'story-section' },
            ].map((item) => (
              <button
                key={item.label}
                onClick={() => scrollToSection(item.id)}
                className="py-3 px-4 rounded-xl font-medium bg-black/5 dark:bg-white/5 text-sm text-[#1E1214] dark:text-[#F9EBE6] hover:bg-black/10 dark:hover:bg-white/10 active:scale-95 duration-150"
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="flex flex-col gap-2 pt-2 border-t border-[#1E1214]/10 dark:border-white/10">
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                onBookWorkshopClick();
              }}
              className="w-full bg-[#1E1214] dark:bg-[#F9EBE6] text-white dark:text-[#1E1214] font-medium py-3 rounded-full text-sm duration-200"
            >
              Book Pretoria Workshop
            </button>
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                onVirtualTryOnClick();
              }}
              className="w-full border border-pink-500/40 text-pink-600 dark:text-pink-300 font-medium py-3 rounded-full text-sm duration-200 bg-pink-500/5"
            >
              Match My Shade (VTO)
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
