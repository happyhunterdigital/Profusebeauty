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
        className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 hover:text-white cursor-pointer flex flex-col items-center space-y-1"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
        <span>Home</span>
      </button>
      
      <button 
        onClick={onVTOOpen} 
        className="text-[10px] font-mono uppercase tracking-wider text-[#fbbf24] font-black cursor-pointer flex flex-col items-center space-y-1"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
        <span>Try-On</span>
      </button>
      
      <button 
        onClick={onCartOpen} 
        className="relative text-[10px] font-mono uppercase tracking-wider text-zinc-400 hover:text-white cursor-pointer flex flex-col items-center space-y-1"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
        </svg>
        <span>Bag</span>
        <span className="absolute -top-1 right-1 bg-amber-500 text-black text-[9px] font-black w-4.5 h-4.5 flex items-center justify-center rounded-full">
          {cartCount}
        </span>
      </button>
    </nav>
  );
}
