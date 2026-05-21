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

  const navItems = [
    { label: 'Home', val: 'All', icon: '🏠' },
    { label: 'Segments', val: 'Combos', icon: '👥' },
    { label: 'Settings', val: 'Setting', icon: '⚙️' }
  ];

  const dashboardOptions = [
    { name: 'Face Collection', val: 'Face' },
    { name: 'Lips Palette', val: 'Lips' },
    { name: 'Eyes Shadow', val: 'Eyes' },
    { name: 'Brushes & Accessories', val: 'Accessories' }
  ];

  const accountPaths = [
    { label: 'Account Dashboard', href: '#dashboard' },
    { label: 'My Orders', href: '#orders' },
    { label: 'ClubCard Points (R5=1pt)', href: '#loyalty' },
    { label: 'Wishlist', href: '#wishlist' },
    { label: 'My Addresses', href: '#addresses' }
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-[#0A0A0F]/90 backdrop-blur-xl border-b border-white/5 py-3">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center relative">
        
        {/* Left Brand Logo Asset */}
        <button 
          onClick={() => { setActiveTab('All'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          className="flex items-center space-x-2"
        >
          <img 
            src="https://res.cloudinary.com/dafc66cma/image/upload/q_auto/f_auto/v1779372708/Profuse_Beauty_Logo_ofjoiq.png" 
            alt="Profuse Beauty Logo" 
            className="h-10 w-auto object-contain"
          />
        </button>

        {/* Center Navigation Bar (Mockup Style Integration) */}
        <nav className="hidden lg:flex items-center space-x-1 bg-white/[0.03] p-1.5 rounded-full border border-white/10">
          <button
            onClick={() => { setActiveTab('All'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all ${activeTab === 'All' ? 'bg-white text-black' : 'text-gray-400 hover:text-white'}`}
          >
            🏠 Home
          </button>

          {/* Interactive Dropdown (Dashboards Trigger) */}
          <div className="relative">
            <button
              onClick={() => setIsDashboardDropdownOpen(!isDashboardDropdownOpen)}
              className="px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide text-gray-400 hover:text-white flex items-center space-x-1"
            >
              <span>📊 Dashboards</span>
              <span className="text-[9px]">▼</span>
            </button>

            {isDashboardDropdownOpen && (
              <div className="absolute top-full left-0 mt-2 w-48 bg-[#0E0E12] border border-white/10 p-2 shadow-2xl rounded-xl">
                {dashboardOptions.map(opt => (
                  <button
                    key={opt.val}
                    onClick={() => {
                      setActiveTab(opt.val);
                      setIsDashboardDropdownOpen(false);
                      document.getElementById('explore-products')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="w-full text-left px-3 py-2 text-xs text-gray-400 hover:text-white hover:bg-white/5 transition-all rounded-lg"
                  >
                    {opt.name}
                  </button>
                ))}
              </div>
            )}
          </div>

          {navItems.slice(1).map(item => (
            <button
              key={item.val}
              onClick={() => {
                setActiveTab(item.val);
                document.getElementById('explore-products')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all ${activeTab === item.val ? 'bg-white text-black' : 'text-gray-400 hover:text-white'}`}
            >
              {item.icon} {item.label}
            </button>
          ))}
        </nav>

        {/* Right Action Stack */}
        <div className="flex items-center space-x-4">
          <button 
            onClick={onVTOOpen}
            className="hidden sm:inline-block text-[9px] font-black uppercase tracking-[0.15em] border border-amber-500/50 px-3.5 py-2 text-amber-400 hover:bg-amber-500 hover:text-black transition-all rounded-full"
          >
            Try-On Live
          </button>

          {/* Account Profile Flyout Menu */}
          <div className="relative">
            <button 
              onClick={() => setIsAccountOpen(!isAccountOpen)}
              className="text-gray-400 hover:text-white text-xs font-semibold flex items-center space-x-1"
            >
              <span>👤 Account</span>
              <span className="text-[9px]">▼</span>
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

          <button onClick={() => setIsDarkMode(!isDarkMode)} className="text-[10px] font-mono text-gray-400 hover:text-white">
            {isDarkMode ? "LIGHT" : "DARK"}
          </button>

          <button onClick={onCartOpen} className="relative flex items-center space-x-1">
            <span className="text-sm">🛒</span>
            <span className="bg-amber-500 text-black text-[9px] font-black w-4.5 h-4.5 flex items-center justify-center rounded-full">
              {cartCount}
            </span>
          </button>

          {/* Hamburger Mobile Toggle */}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden text-white text-lg font-bold"
          >
            ☰
          </button>
        </div>

        {/* Mobile Vertical Drawer (Mockup Design Integration) */}
        {isMobileMenuOpen && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-[#0E0E12] border-b border-white/10 p-4 flex flex-col space-y-2 lg:hidden z-50 animate-fade-in">
            <button 
              onClick={() => { setActiveTab('All'); setIsMobileMenuOpen(false); }}
              className="text-left py-2 text-xs text-gray-400 hover:text-white"
            >
              🏠 Home
            </button>
            <button 
              onClick={() => { setActiveTab('Combos'); setIsMobileMenuOpen(false); }}
              className="text-left py-2 text-xs text-gray-400 hover:text-white"
            >
              👥 Segments
            </button>
            <button 
              onClick={() => { setActiveTab('Setting'); setIsMobileMenuOpen(false); }}
              className="text-left py-2 text-xs text-gray-400 hover:text-white"
            >
              ⚙️ Settings
            </button>
          </div>
        )}

      </div>
    </header>
  );
}
