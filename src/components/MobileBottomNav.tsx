// File: src/components/MobileBottomNav.tsx
import React from 'react';

interface MobileBottomNavProps {
  cartCount: number;
  onCartOpen: () => void;
  onVTOOpen: () => void;
}

export default function MobileBottomNav({ cartCount, onCartOpen, onVTOOpen }: MobileBottomNavProps) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-black/90 backdrop-blur-xl border-t border-white/5 py-3 lg:hidden flex justify-around items-center">
      <button 
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} 
        className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 hover:text-white"
      >
        🏠 Home
      </button>
      
      <button 
        onClick={onVTOOpen} 
        className="text-[10px] font-mono uppercase tracking-wider text-[#fbbf24] font-black"
      >
        📷 Try-On
      </button>
      
      <button 
        onClick={onCartOpen} 
        className="relative text-[10px] font-mono uppercase tracking-wider text-zinc-400 hover:text-white"
      >
        🛒 Bag
        <span className="absolute -top-2 -right-3 bg-amber-500 text-black text-[9px] font-black w-4 h-4 flex items-center justify-center rounded-full">
          {cartCount}
        </span>
      </button>
    </nav>
  );
}
