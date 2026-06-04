// File: src/components/VirtualTryOnModal.tsx
import React, { useState } from 'react';
import VirtualTryOn from './VirtualTryOn';

interface VirtualTryOnModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedShade: string;
  setSelectedShade: (val: string) => void;
  onAddToCart: (shade: string) => void;
}

export default function VirtualTryOnModal({ 
  isOpen, 
  onClose, 
  selectedShade, 
  setSelectedShade, 
  onAddToCart 
}: VirtualTryOnModalProps) {
  const [gloss, setGloss] = useState<number>(0.7);

  if (!isOpen) return null;

  const shades = [
    { name: 'The Bomb Red', color: '#B91C1C' },
    { name: 'Berry Shine', color: '#8E24AA' },
    { name: 'Coral Pop', color: '#FF6F00' },
    { name: 'Pink Frost', color: '#F06292' }
  ];

  const activeColor = selectedShade.startsWith('#') 
    ? selectedShade 
    : shades[0].color;

  return (
    <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex items-center justify-center p-4">
      <div className="max-w-4xl w-full bg-[#0A0A0F] border border-white/10 flex flex-col md:flex-row shadow-2xl overflow-hidden relative">
        <button onClick={onClose} className="absolute top-4 right-4 z-50 text-white font-mono text-sm hover:text-amber-400">✕</button>

        {/* AI Webcam Processing Viewport */}
        <div className="w-full md:w-1/2 relative bg-zinc-950 flex items-center justify-center">
          <VirtualTryOn lipColor={activeColor} glossIntensity={gloss} />
        </div>

        {/* Control Console */}
        <div className="w-full md:w-1/2 p-8 space-y-6 flex flex-col justify-between">
          <div className="space-y-4">
            <span className="text-[9px] uppercase tracking-widest text-[#fbbf24] font-mono block">E-commerce Shade Matcher</span>
            <h3 className="text-xl font-serif text-white">AI Color & Shape Matcher</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">Turn on your camera and experiment with our real-time computer vision pipeline.</p>
            
            {/* Swatch Picker */}
            <div className="grid grid-cols-4 gap-2 pt-4">
              {shades.map(s => (
                <button
                  key={s.name}
                  onClick={() => setSelectedShade(s.color)}
                  className={`p-2 border flex flex-col items-center gap-1 ${activeColor === s.color ? 'border-amber-400' : 'border-white/5'}`}
                >
                  <span className="w-6 h-6 rounded-full block" style={{ backgroundColor: s.color }} />
                  <span className="text-[9px] font-mono text-zinc-400 block">{s.name.split(' ')[0]}</span>
                </button>
              ))}
            </div>

            {/* Gloss Intensity Slider */}
            <div className="space-y-2 pt-4">
              <label className="text-xs font-mono text-zinc-400 flex justify-between">
                <span>Gloss Intensity:</span>
                <span>{Math.round(gloss * 100)}%</span>
              </label>
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={gloss}
                onChange={(e) => setGloss(parseFloat(e.target.value))}
                className="h-1.5 w-full cursor-pointer appearance-none rounded-lg bg-zinc-800 accent-amber-500"
              />
            </div>
          </div>

          <button onClick={() => { onAddToCart(activeColor); onClose(); }} className="w-full py-4 bg-gradient-to-r from-amber-500 to-orange-500 text-black font-black uppercase text-xs tracking-widest">
            Add Matched Tone to Bag
          </button>
        </div>

      </div>
    </div>
  );
}
