// File: src/pages/NotFound.tsx
import React from 'react';

interface NotFoundProps {
  onHome: () => void;
}

export default function NotFound({ onHome }: NotFoundProps) {
  return (
    <div className="min-h-screen bg-[#0A0A0F] text-white flex items-center justify-center px-4 sm:px-6">
      <div className="max-w-md w-full text-center space-y-6 py-20">
        <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#d4af37]">
          Profuse Beauty
        </p>
        <h1 className="text-6xl font-black">404</h1>
        <h2 className="text-xl font-bold">Shade not found</h2>
        <p className="text-sm text-zinc-400 leading-relaxed">
          The page you are looking for doesn&rsquo;t exist or may have moved.
          Let&rsquo;s get you back to your perfect match.
        </p>
        <button
          onClick={onHome}
          className="inline-block bg-[#d4af37] text-black font-bold px-8 py-3.5 rounded-xl text-xs uppercase tracking-widest hover:bg-[#b8960f] transition-colors"
        >
          Back to home
        </button>
      </div>
    </div>
  );
}
