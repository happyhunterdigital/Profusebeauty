// File: src/components/VirtualTryOnModal.tsx
import React, { useState } from 'react';

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
  const [slider, setSlider] = useState<number>(50);
  const [isDragging, setIsDragging] = useState<boolean>(false);

  if (!isOpen) return null;

  // Exact Cloudinary Shade Image mappings
  const shades = [
    { code: "#03", color: "https://res.cloudinary.com/dafc66cma/image/upload/q_auto/f_auto/v1779370849/HD_Liquid_Foundation_Shade_03._vsccn8.jpg", hex: "#EED2BA", name: "Shade 03" },
    { code: "#05", color: "https://res.cloudinary.com/dafc66cma/image/upload/q_auto/f_auto/v1779370847/HD_Liquid_Foundation_Shade_05_p4801l.jpg", hex: "#E5C2A3", name: "Shade 05" },
    { code: "#06", color: "https://res.cloudinary.com/dafc66cma/image/upload/q_auto/f_auto/v1779370845/HD_Liquid_Foundation_Shade_06_ufmjya.jpg", hex: "#DBB18C", name: "Shade 06" },
    { code: "#07", color: "https://res.cloudinary.com/dafc66cma/image/upload/q_auto/f_auto/v1779370847/HD_Liquid_Foundation_Shade_07_u3jjhi.jpg", hex: "#BD8C5E", name: "Shade 07" },
    { code: "#08", color: "https://res.cloudinary.com/dafc66cma/image/upload/q_auto/f_auto/v1779370853/HD_Liquid_Foundation_Shade_08._bczwc1.jpg", hex: "#A7764A", name: "Shade 08" }
  ];

  const handleDrag = (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    const r = e.currentTarget.getBoundingClientRect();
    const xClient = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const offset = ((xClient - r.left) / r.width) * 100;
    setSlider(Math.max(5, Math.min(95, offset)));
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex items-center justify-center p-4">
      <div className="max-w-4xl w-full bg-[#0A0A0F] border border-white/10 flex flex-col md:flex-row shadow-2xl overflow-hidden relative">
        <button onClick={onClose} className="absolute top-4 right-4 z-50 text-white font-mono text-sm hover:text-amber-400">✕</button>

        {/* Draggable Divider (UX Best Practices for Shade Matching) */}
        <div 
          onMouseMove={handleDrag}
          onTouchMove={handleDrag}
          onMouseUp={() => setIsDragging(false)}
          onTouchEnd={() => setIsDragging(false)}
          className="w-full md:w-1/2 relative aspect-video md:aspect-auto min-h-[320px] select-none cursor-ew-resize overflow-hidden bg-zinc-950"
        >
          {/* After View */}
          <div className="absolute inset-0 flex items-center justify-center">
            <img src={selectedShade.startsWith('#') ? shades[4].color : selectedShade} alt="After Matched View" className="w-full h-full object-cover" />
          </div>

          {/* Before View (Clipped) */}
          <div 
            className="absolute inset-0 bg-zinc-900 flex items-center justify-center overflow-hidden border-r border-white/20"
            style={{ clipPath: `inset(0 ${100 - slider}% 0 0)` }}
          >
            <div className="absolute inset-0 bg-[#2E1A1C]/20 flex items-center justify-center">
              <span className="text-[10px] font-mono text-zinc-600 uppercase">Before Filter raw skin</span>
            </div>
          </div>

          <div 
            onMouseDown={() => setIsDragging(true)}
            onTouchStart={() => setIsDragging(true)}
            className="absolute top-0 bottom-0 w-0.5 bg-white"
            style={{ left: `${slider}%` }}
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white text-black font-bold text-sm flex items-center justify-center">
              ↔
            </div>
          </div>

          <span className="absolute top-4 left-4 bg-black/80 px-2 py-0.5 text-[8px] font-mono uppercase text-white">Before</span>
          <span className="absolute top-4 right-4 bg-amber-500 px-2 py-0.5 text-[8px] font-mono uppercase text-black">After</span>
        </div>

        {/* Try-on Control Sidebar */}
        <div className="w-full md:w-1/2 p-8 space-y-6 flex flex-col justify-between">
          <div className="space-y-4">
            <span className="text-[9px] uppercase tracking-widest text-[#fbbf24] font-mono block">E-commerce Shade Matcher</span>
            <h3 className="text-xl font-serif text-white">Camera Try-On Interface</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">Drag the white divider to evaluate the 3-in-1 coverage properties directly over your skin tone.</p>
            
            <div className="grid grid-cols-5 gap-2 pt-4">
              {shades.map(s => (
                <button
                  key={s.code}
                  onClick={() => setSelectedShade(s.color)}
                  className={`p-2 border flex flex-col items-center gap-1 ${selectedShade === s.color ? 'border-amber-400' : 'border-white/5'}`}
                >
                  <span className="w-6 h-6 rounded-full block" style={{ backgroundColor: s.hex }} />
                  <span className="text-[9px] font-mono text-zinc-400 block">{s.code}</span>
                </button>
              ))}
            </div>
          </div>

          <button onClick={() => { onAddToCart(selectedShade); onClose(); }} className="w-full py-4 bg-gradient-to-r from-amber-500 to-orange-500 text-black font-black uppercase text-xs tracking-widest">
            Add Matched Tone to Bag
          </button>
        </div>

      </div>
    </div>
  );
}
