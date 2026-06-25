// File: src/components/Header.tsx
import React, { useState } from 'react';

interface HeaderProps {
  isDarkMode: boolean;
  setIsDarkMode: (val: boolean) => void;
  cartCount: number;
  onCartOpen: () => void;
  onVTOOpen: () => void;
  activeTab: string;
  setActiveTab: (val: string) => void;
}

export default function Header({ 
  isDarkMode, 
  setIsDarkMode, 
  cartCount, 
  onCartOpen, 
  onVTOOpen, 
  activeTab, 
  setActiveTab 
}: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [isDashboardDropdownOpen, setIsDashboardDropdownOpen] = useState<boolean>(false);
  const [isAccountOpen, setIsAccountOpen] = useState<boolean>(false);

  const dashboardOptions = [
    { name: 'Face Collection', val: 'Face' },
    { name: 'Lips Palette', val: 'Lips' },
    { name: 'Eyes Shadow', val: 'Eyes' },
    { name: 'Brushes & Accessories', val: 'Accessories' }
  ];

  const accountPaths = [
    { label: 'Account Dashboard', href: '/admin' },
    { label: 'My Orders', href: '/admin' },
    { label: 'ClubCard Points (R5=1pt)', href: '/admin' },
    { label: 'Wishlist', href: '/admin' },
    { label: 'My Addresses', href: '/admin' }
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-[#0A0A0F]/90 backdrop-blur-xl border-b border-white/5 py-3">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center relative">
        
        {/* Left Brand Logo */}
        <button 
          onClick={() => { setActiveTab('All'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          className="flex items-center space-x-2 cursor-pointer transition-opacity hover:opacity-90"
        >
          <img 
            src="https://res.cloudinary.com/dafc66cma/image/upload/q_auto,f_auto/v1782249161/favicon_zihqgj.png" 
            alt="Profuse Beauty Logo" 
            className="h-10 w-auto object-contain"
          />
        </button>

        {/* Center Navigation Bar (Vercel/Perfect Corp Hybrid Style) */}
        <nav className="hidden lg:flex items-center space-x-2 bg-white/[0.03] p-1.5 rounded-full border border-white/10">
          <button
            onClick={() => { setActiveTab('All'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all duration-300 cursor-pointer flex items-center space-x-1.5 ${
              activeTab === 'All' ? 'bg-white text-black' : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            <span>Home</span>
          </button>

          <button
            onClick={() => { setActiveTab('Shop'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all duration-300 cursor-pointer flex items-center space-x-1.5 ${
              activeTab === 'Shop' ? 'bg-white text-black' : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            <span>Shop</span>
          </button>

          <button
            onClick={() => { setActiveTab('Combos'); document.getElementById('explore-products')?.scrollIntoView({ behavior: 'smooth' }); }}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all duration-300 cursor-pointer flex items-center space-x-1.5 ${
              activeTab === 'Combos' ? 'bg-white text-black' : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <span>Segments</span>
          </button>

          <button
            onClick={() => { setActiveTab('Setting'); document.getElementById('explore-products')?.scrollIntoView({ behavior: 'smooth' }); }}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all duration-300 cursor-pointer flex items-center space-x-1.5 ${
              activeTab === 'Setting' ? 'bg-white text-black' : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span>Settings</span>
          </button>
        </nav>

        {/* Right Actions */}
        <div className="flex items-center space-x-4">
          <button 
            onClick={onVTOOpen}
            className="hidden sm:inline-block text-[9px] font-black uppercase tracking-[0.15em] border border-amber-500/50 px-3.5 py-2 text-amber-400 hover:bg-amber-500 hover:text-black transition-all duration-300 cursor-pointer rounded-full"
          >
            Try-On Live
          </button>

          {/* Account Menu */}
          <div className="relative">
            <button 
              onClick={() => setIsAccountOpen(!isAccountOpen)}
              className="text-gray-400 hover:text-white text-xs font-semibold flex items-center space-x-1 cursor-pointer py-1"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span>Account</span>
              <svg className="w-3 h-3 text-zinc-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {isAccountOpen && (
              <div className="absolute right-0 mt-4 w-56 bg-[#0E0E12] border border-white/10 p-4 shadow-2xl rounded-xl z-50">
                <span className="text-[9px] uppercase tracking-widest text-amber-500 font-mono block border-b border-white/5 pb-2 mb-2">My Profile</span>
                <div className="space-y-2">
                  {accountPaths.map(link => (
                    <a
                      key={link.label}
                      href={link.href}
                      onClick={() => setIsAccountOpen(false)}
                      className="block text-[11px] text-gray-400 hover:text-white transition-all tracking-wider"
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>

          <button onClick={() => setIsDarkMode(!isDarkMode)} className="text-[10px] font-mono text-gray-400 hover:text-white cursor-pointer transition-colors">
            {isDarkMode ? "LIGHT" : "DARK"}
          </button>

          <button onClick={onCartOpen} className="relative flex items-center space-x-1.5 cursor-pointer">
            <svg className="w-4.5 h-4.5 text-gray-400 hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            <span className="bg-amber-500 text-black text-[9px] font-black w-4.5 h-4.5 flex items-center justify-center rounded-full">
              {cartCount}
            </span>
          </button>

          {/* Accessible Menu Trigger */}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden text-gray-400 hover:text-white transition-colors cursor-pointer p-1"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Mobile Vertical Drawer */}
        {isMobileMenuOpen && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-[#0E0E12] border-b border-white/10 p-4 flex flex-col space-y-2 lg:hidden z-50 animate-fade-in">
            <button 
              onClick={() => { setActiveTab('All'); setIsMobileMenuOpen(false); }}
              className="text-left py-2.5 text-xs text-gray-400 hover:text-white cursor-pointer flex items-center space-x-2"
            >
              <span>🏠 Home</span>
            </button>
            <button 
              onClick={() => { setActiveTab('Combos'); setIsMobileMenuOpen(false); }}
              className="text-left py-2.5 text-xs text-gray-400 hover:text-white cursor-pointer flex items-center space-x-2"
            >
              <span>👥 Segments</span>
            </button>
            <button 
              onClick={() => { setActiveTab('Setting'); setIsMobileMenuOpen(false); }}
              className="text-left py-2.5 text-xs text-gray-400 hover:text-white cursor-pointer flex items-center space-x-2"
            >
              <span>⚙️ Settings</span>
            </button>
          </div>
        )}

      </div>
    </header>
  );
}
