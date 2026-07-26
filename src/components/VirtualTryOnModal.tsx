// File: src/components/VirtualTryOnModal.tsx
import React, { useState, useMemo } from 'react';
import VirtualTryOn, { TryOnMode } from './VirtualTryOn';
import { PRODUCTS, FOUNDATION_SHADES } from '../data';

interface VirtualTryOnModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedShade: string;
  setSelectedShade: (val: string) => void;
  onAddToCart: (shade: string) => void;
}

interface ShadeOption {
  name: string;
  color: string;
}

const MODES: TryOnMode[] = ['Foundation', 'Concealer', 'Contour', 'Lip Color'];

export default function VirtualTryOnModal({ 
  isOpen, 
  onClose, 
  selectedShade, 
  setSelectedShade, 
  onAddToCart 
}: VirtualTryOnModalProps) {
  const [intensity, setIntensity] = useState<number>(0.7);
  const [mode, setMode] = useState<TryOnMode>('Lip Color');

  const shadesByMode: Record<TryOnMode, ShadeOption[]> = useMemo(() => ({
    Foundation: FOUNDATION_SHADES.map(t => ({ name: `Shade ${t.shade}`, color: t.hex })),
    Concealer: PRODUCTS.filter(p => p.subFolder === 'Concealer' && p.previewHex)
      .map(p => ({ name: p.name.replace('HD Liquid ', ''), color: p.previewHex as string })),
    Contour: PRODUCTS.filter(p => p.subFolder === 'Contour' && p.previewHex)
      .map(p => ({ name: p.name.replace('HD Liquid ', ''), color: p.previewHex as string })),
    'Lip Color': PRODUCTS.filter(p => p.folder === 'lip-colour' && p.previewHex)
      .map(p => ({ name: p.name, color: p.previewHex as string }))
  }), []);

  const shades = shadesByMode[mode];

  if (!isOpen) return null;

  const activeColor = selectedShade.startsWith('#') && shades.some(s => s.color === selectedShade)
    ? selectedShade
    : (shades[0]?.color || '#B91C1C');

  const handleModeChange = (m: TryOnMode) => {
    setMode(m);
    const firstShade = shadesByMode[m][0];
    if (firstShade) setSelectedShade(firstShade.color);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex items-center justify-center p-2 sm:p-4">
      <div className="max-w-4xl w-full bg-[#0A0A0F] border border-white/10 flex flex-col md:flex-row shadow-2xl overflow-hidden relative max-h-[95vh] sm:max-h-[90vh]">
        <button onClick={onClose} className="absolute top-3 right-3 sm:top-4 sm:right-4 z-50 text-white font-mono text-sm hover:text-amber-400">✕</button>

        {/* AI Webcam Processing Viewport */}
        <div className="w-full md:w-1/2 relative bg-zinc-950 flex items-center justify-center">
          <VirtualTryOn mode={mode} color={activeColor} intensity={intensity} />
        </div>

        {/* Control Console */}
        <div className="w-full md:w-1/2 p-5 sm:p-8 space-y-5 sm:space-y-6 flex flex-col justify-between overflow-y-auto">
          <div className="space-y-4">
            <span className="text-[9px] uppercase tracking-widest text-[#fbbf24] font-mono block">E-commerce Shade Matcher</span>
            <h3 className="text-xl font-serif text-white">AI Color & Shade Matcher</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">Turn on your camera and try Foundation, Concealer, Contour or Lip Color in real time with our computer vision pipeline.</p>

            {/* Mode Tabs */}
            <div className="grid grid-cols-4 gap-1.5 pt-2">
              {MODES.map(m => (
                <button
                  key={m}
                  onClick={() => handleModeChange(m)}
                  className={`py-2 px-1 text-[10px] font-bold uppercase tracking-wide border transition-colors ${
                    mode === m ? 'bg-amber-500 text-black border-amber-500' : 'border-white/10 text-zinc-400 hover:text-white hover:border-white/30'
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>

            {/* Swatch Picker */}
            <div className="grid grid-cols-4 gap-2 pt-4 max-h-40 overflow-y-auto">
              {shades.length === 0 && (
                <p className="col-span-4 text-[10px] font-mono text-zinc-500">No shades available for this category yet.</p>
              )}
              {shades.map(s => (
                <button
                  key={s.name}
                  onClick={() => setSelectedShade(s.color)}
                  className={`p-2 border flex flex-col items-center gap-1 ${activeColor === s.color ? 'border-amber-400' : 'border-white/5'}`}
                >
                  <span className="w-6 h-6 rounded-full block border border-white/10" style={{ backgroundColor: s.color }} />
                  <span className="text-[9px] font-mono text-zinc-400 block text-center leading-tight">{s.name}</span>
                </button>
              ))}
            </div>

            {/* Intensity Slider */}
            <div className="space-y-2 pt-4">
              <label className="text-xs font-mono text-zinc-400 flex justify-between">
                <span>{mode === 'Lip Color' ? 'Gloss Intensity:' : 'Coverage Intensity:'}</span>
                <span>{Math.round(intensity * 100)}%</span>
              </label>
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={intensity}
                onChange={(e) => setIntensity(parseFloat(e.target.value))}
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
