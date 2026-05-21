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
  const [isAccountOpen, setIsAccountOpen] = useState<boolean>(false);

  const categories = [
    { label: 'Face', val: 'Face' },
    { label: 'Lips', val: 'Lips' },
    { label: 'Eyes', val: 'Eyes' },
    { label: 'Accessories', val: 'Accessories' }
  ];

  const accountLinks = [
    { name: 'Account Dashboard', href: '#dashboard' },
    { name: 'My Orders', href: '#orders' },
    { name: 'Payment Information', href: '#payment' },
    { name: 'ClubCard Points (R5=1pt)', href: '#loyalty' },
    { name: 'Wishlist', href: '#wishlist' },
    { name: 'My Addresses', href: '#addresses' },
    { name: 'Passwords & Security', href: '#passwords' }
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-[#0A0A0F]/90 backdrop-blur-xl border-b border-white/5 py-3">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        
        {/* Render Official High-Res Logo Asset */}
        <button 
          onClick={() => { setActiveTab('All'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          className="flex items-center space-x-2 hover:opacity-95 transition-opacity"
        >
          <img 
            src="https://res.cloudinary.com/dafc66cma/image/upload/q_auto/f_auto/v1779372708/Profuse_Beauty_Logo_ofjoiq.png" 
            alt="Profuse Beauty Logo" 
            className="h-10 w-auto object-contain"
          />
        </button>

        <nav className="hidden lg:flex space-x-6">
          {categories.map(cat => (
            <button
              key={cat.val}
              onClick={() => {
                setActiveTab(cat.val);
                document.getElementById('explore-products')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className={`text-[10px] font-black uppercase tracking-[0.2em] transition-all py-1 ${
                activeTab === cat.val ? 'text-amber-400 border-b border-amber-400' : 'text-gray-400 hover:text-white'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </nav>

        <div className="flex items-center space-x-4">
          <button 
            onClick={onVTOOpen}
            className="hidden sm:inline-block text-[9px] font-black uppercase tracking-[0.15em] border border-amber-500/50 px-3 py-1.5 text-amber-400 hover:bg-amber-500 hover:text-black transition-all rounded-full"
          >
            Try-On Live
          </button>

          <div className="relative">
            <button 
              onClick={() => setIsAccountOpen(!isAccountOpen)}
              className="text-gray-400 hover:text-white text-xs font-mono tracking-widest uppercase"
            >
              👤 Profile
            </button>

            {isAccountOpen && (
              <div className="absolute right-0 mt-4 w-56 bg-[#0E0E12] border border-white/10 p-4 shadow-2xl animate-fade-in z-50">
                <span className="text-[9px] uppercase tracking-widest text-amber-500 font-mono block border-b border-white/5 pb-2 mb-2">My Profile</span>
                <div className="space-y-2">
                  {accountLinks.map(link => (
                    <a
                      key={link.name}
                      href={link.href}
                      onClick={() => setIsAccountOpen(false)}
                      className="block text-[10px] text-gray-400 hover:text-white transition-all uppercase tracking-wider"
                    >
                      {link.name}
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>

          <button onClick={() => setIsDarkMode(!isDarkMode)} className="text-[10px] font-mono text-gray-400 hover:text-white">
            {isDarkMode ? "LIGHT" : "DARK"}
          </button>

          <button onClick={onCartOpen} className="relative flex items-center space-x-1">
            <span className="text-sm">🛒</span>
            <span className="bg-amber-500 text-black text-[9px] font-black w-4.5 h-4.5 flex items-center justify-center rounded-full">
              {cartCount}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}
