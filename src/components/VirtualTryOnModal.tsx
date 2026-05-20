/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useRef, useEffect } from 'react';
import { Camera, X, RefreshCw, Sun, Lightbulb, Moon, Play, Sparkles, Check } from 'lucide-react';
import { SHADES } from '../data';

interface VirtualTryOnProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyShade: (shade: typeof SHADES[0]) => void;
}

const TEMPLATES = [
  { id: 't1', name: 'Lerato (Warm Golden)', image: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&q=80&w=500', baseShade: '09' },
  { id: 't2', name: 'Zola (Warm Peach)', image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=500', baseShade: '06' },
  { id: 't3', name: 'Kylie (Porcelain Sand)', image: 'https://images.unsplash.com/photo-1595959183075-c1d09e573ec3?auto=format&fit=crop&q=80&w=500', baseShade: '03' }
];

const LIGHTS = [
  { id: 'golden', name: 'Pretoria Golden Hour', overlay: 'rgba(251, 191, 36, 0.15)', desc: 'Warm 3000K sunlight glow' },
  { id: 'office', name: 'Executive Office Lights', overlay: 'rgba(191, 219, 254, 0.08)', desc: 'Cool 5000K professional neon' },
  { id: 'studio', name: 'MUA Flash Studio', overlay: 'rgba(255, 255, 255, 0.12)', desc: 'Neutral high-lumen flash bulbs' },
];

export default function VirtualTryOnModal({ isOpen, onClose, onApplyShade }: VirtualTryOnProps) {
  const [selectedTemplate, setSelectedTemplate] = useState(TEMPLATES[0]);
  const [activeShade, setActiveShade] = useState(SHADES[8]); // Default to Shade 09 Madiba Gold
  const [activeLight, setActiveLight] = useState(LIGHTS[0]);
  const [useWebcam, setUseWebcam] = useState(false);
  const [webcamAllowed, setWebcamAllowed] = useState(false);
  const [webcamStream, setWebcamStream] = useState<MediaStream | null>(null);
  const [opacity, setOpacity] = useState(0.8); // Foundation coverage opacity slider
  const [splitViewMode, setSplitViewMode] = useState(true); // Split view slider to compare before/after
  const [splitRatio, setSplitRatio] = useState(50); // Split slider ratio in %

  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Turn off webcam on close
  useEffect(() => {
    if (!isOpen) {
      stopWebcam();
    }
    return () => stopWebcam();
  }, [isOpen]);

  const startWebcam = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' } });
      setWebcamStream(stream);
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setWebcamAllowed(true);
      setUseWebcam(true);
    } catch (err) {
      console.warn('Webcam access was declined or is unsupported in iFrame:', err);
      alert('Could not open camera. Falling back to pre-rendered models.');
      setUseWebcam(false);
    }
  };

  const stopWebcam = () => {
    if (webcamStream) {
      webcamStream.getTracks().forEach(track => track.stop());
      setWebcamStream(null);
    }
    setUseWebcam(false);
  };

  const toggleWebcam = () => {
    if (useWebcam) {
      stopWebcam();
    } else {
      startWebcam();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Blurred overlay backdrop */}
      <div 
        className="absolute inset-0 bg-[#1E1214]/60 dark:bg-black/80 backdrop-blur-md cursor-pointer"
        onClick={onClose}
      />

      {/* Main glassmorphic frame */}
      <div className="relative bg-white dark:bg-[#1C1012] border border-white/20 dark:border-white/10 w-full max-w-5xl rounded-[32px] overflow-hidden shadow-2xl z-10 grid grid-cols-1 lg:grid-cols-12 max-h-[90vh] lg:max-h-[85vh] animate-scaleIn">
        
        {/* Absolute header toggle and status */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-30 p-2 bg-black/60 dark:bg-white/10 text-white dark:text-[#F9EBE6] backdrop-blur-md rounded-full hover:scale-105 active:scale-95 duration-200 cursor-pointer"
        >
          <X size={18} />
        </button>

        {/* LEFT COLUMN (Lg: col-span-7) Video Stream / pre-rendered Canvas viewer */}
        <div className="lg:col-span-7 bg-[#120A0B] flex flex-col items-center justify-center relative p-6 border-b lg:border-r lg:border-b-0 border-[#1E1214]/10 dark:border-white/10 select-none min-h-[300px] md:min-h-[420px]">
          
          {/* Active Color Tint Light overlays */}
          <div 
            className="absolute inset-0 pointer-events-none z-20 transition-all duration-300 pointer-events-none"
            style={{ backgroundColor: activeLight.overlay }}
          />

          {/* Interactive Makeup Render Stage */}
          <div 
            ref={containerRef}
            className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl bg-black border border-white/10"
          >
            {/* Split Screen before & after rendering logic */}
            {useWebcam ? (
              /* REAL LIVE CAMERA MODE STAGE */
              <div className="relative w-full h-full">
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className="w-full h-full object-cover scale-x-[-1]"
                />
                
                {/* Simulated WebGL color mesh applied over the face cam */}
                <div 
                  className="absolute inset-0 transition-all duration-500 pointer-events-none mix-blend-color"
                  style={{ 
                    backgroundColor: activeShade.hex,
                    opacity: opacity * 0.45 // Soft realistic color blending factor
                  }}
                  id="vto-cam-tint"
                />
              </div>
            ) : (
              /* PRE-RENDERED HIGH INTENSITY BEAUTY PORTRAITS VIEW */
              <div className="relative w-full h-full">
                
                {/* AFTER IMAGE STATE (Full view behind or clipped view in splitmode) */}
                <div className="absolute inset-0">
                  <img
                    src={selectedTemplate.image}
                    alt={selectedTemplate.name}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  {/* Applied foundation color gloss overlay */}
                  <div 
                    className="absolute inset-0 transition-all duration-500 mix-blend-multiply"
                    style={{ 
                      backgroundColor: activeShade.hex,
                      opacity: opacity * 0.28 // Premium translucent cosmetic drape
                    }}
                  />
                  <div 
                    className="absolute inset-0 transition-all duration-500 mix-blend-color"
                    style={{ 
                      backgroundColor: activeShade.hex,
                      opacity: opacity * 0.4 // Enhanced melanin alignment factors
                    }}
                  />
                </div>

                {/* BEFORE IMAGE STATE (Clipped by splitRatio if in split mode) */}
                {splitViewMode && (
                  <div 
                    className="absolute inset-y-0 left-0 overflow-hidden border-r-2 border-white z-10 transition-shadow shadow-[2px_0_12px_rgba(255,255,255,0.4)]"
                    style={{ width: `${splitRatio}%` }}
                  >
                    <img
                      src={selectedTemplate.image}
                      alt={`${selectedTemplate.name} raw`}
                      className="absolute inset-0 w-full h-full object-cover"
                      style={{ width: containerRef.current?.getBoundingClientRect().width || 600 }}
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-y-0 left-2 bottom-2 bg-black/50 text-white rounded px-2 py-0.5 text-[9px] uppercase tracking-wider font-bold">
                      Bare Skin (Original)
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Split Drag overlay handle */}
            {!useWebcam && splitViewMode && (
              <input
                type="range"
                min="0"
                max="100"
                value={splitRatio}
                onChange={(e) => setSplitRatio(Number(e.target.value))}
                className="absolute inset-x-0 bottom-4 mx-auto w-[90%] z-20 cursor-ew-resize opacity-80 accent-pink-600 hover:opacity-100 transition-opacity"
              />
            )}

            {/* Mode badge labels */}
            <div className="absolute top-3 left-3 bg-black/60 dark:bg-[#1E1214]/80 text-white border border-white/20 rounded-full px-3 py-1 text-[10px] tracking-widest uppercase font-bold flex items-center gap-1.5 z-20">
              <Sparkles size={11} className="text-pink-400 animate-pulse" />
              <span>Simulating: Shade {activeShade.id} ({activeShade.name})</span>
            </div>

            <div className="absolute bottom-3 right-3 bg-black/70 backdrop-blur-sm rounded-lg px-2.5 py-1 text-[10px] text-white/90 z-20 font-bold tracking-wide">
              {activeLight.name}
            </div>
          </div>

          {/* Quick options footer toolbar */}
          <div className="flex flex-wrap gap-3 mt-4 items-center justify-between w-full z-10">
            {/* Toggle Webcam Button */}
            <button
              onClick={toggleWebcam}
              className={`flex items-center gap-2 text-xs font-semibold py-2 px-4 rounded-full transition-all duration-200 cursor-pointer ${
                useWebcam
                  ? 'bg-red-600 text-white shadow-md'
                  : 'bg-white/10 text-white border border-white/10 hover:bg-white/20'
              }`}
            >
              <Camera size={14} />
              {useWebcam ? 'Disconnect Live Cam' : 'Unlock Live Webcam (Realtime)'}
            </button>

            {/* Split Screen Toggle */}
            {!useWebcam && (
              <button
                onClick={() => setSplitViewMode(!splitViewMode)}
                className="text-xs bg-white/5 border border-white/10 hover:bg-white/15 text-white py-2 px-4 rounded-full font-semibold transition-all"
              >
                {splitViewMode ? 'View Full After-Cover' : 'Split View Slider'}
              </button>
            )}
          </div>

        </div>

        {/* RIGHT COLUMN (Lg: col-span-5) Shading Controls & Settings */}
        <div className="lg:col-span-5 p-6 flex flex-col justify-between overflow-y-auto max-h-[45vh] lg:max-h-[85vh] bg-[#FDFBF7] dark:bg-[#1A1012]">
          
          <div>
            <div className="mb-4">
              <span className="text-[10px] bg-pink-500/10 text-pink-700 dark:text-pink-300 font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                VTO AI Simulator 5.2
              </span>
              <h3 className="text-xl md:text-2xl font-serif italic text-[#1E1214] dark:text-white mt-1">
                Virtual Shade Matcher
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Calibrated under Pretoria sunlight filters. Pick a skin preset and match with Shade #01 - #12.
              </p>
            </div>

            {/* Template Presets (Only when webcam is offline) */}
            {!useWebcam && (
              <div className="mb-6">
                <div className="text-xs font-bold text-gray-500 dark:text-gray-400 mb-2">1. Select Skin Tone Template</div>
                <div className="grid grid-cols-3 gap-2">
                  {TEMPLATES.map((tpl) => (
                    <button
                      key={tpl.id}
                      onClick={() => {
                        setSelectedTemplate(tpl);
                        const correspondingShade = SHADES.find(s => s.id === tpl.baseShade);
                        if (correspondingShade) setActiveShade(correspondingShade);
                      }}
                      className={`relative aspect-[4/3] rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                        selectedTemplate.id === tpl.id
                          ? 'border-pink-600 dark:border-pink-300 scale-[1.03]'
                          : 'border-transparent opacity-70 hover:opacity-100 hover:scale-[1.01]'
                      }`}
                    >
                      <img src={tpl.image} alt={tpl.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                      <div className="absolute bottom-0 inset-x-0 bg-black/60 p-1 text-[9px] text-white text-center font-bold">
                        {tpl.name.split(' (')[0]}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Lighting Scenarios */}
            <div className="mb-6">
              <div className="text-xs font-bold text-gray-500 dark:text-gray-400 mb-2">2. Ambient Light Filters</div>
              <div className="flex flex-col gap-2">
                {LIGHTS.map((light) => (
                  <button
                    key={light.id}
                    onClick={() => setActiveLight(light)}
                    className={`flex items-center justify-between p-2.5 rounded-xl border text-left cursor-pointer transition-all duration-200 ${
                      activeLight.id === light.id
                        ? 'border-pink-600 dark:border-pink-300 bg-pink-500/5 dark:bg-pink-500/10'
                        : 'border-stone-200 dark:border-white/5 hover:bg-stone-50 dark:hover:bg-white/5'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      {light.id === 'golden' && <Sun size={14} className="text-amber-500" />}
                      {light.id === 'office' && <Lightbulb size={14} className="text-blue-500" />}
                      {light.id === 'studio' && <Moon size={14} className="text-pink-500" />}
                      <div>
                        <div className="text-xs font-bold text-[#1E1214] dark:text-white">{light.name}</div>
                        <p className="text-[10px] text-gray-400">{light.desc}</p>
                      </div>
                    </div>
                    {activeLight.id === light.id && (
                      <span className="w-2 h-2 rounded-full bg-pink-600 dark:bg-pink-300" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Coverage density control slider */}
            <div className="mb-6">
              <div className="flex items-center justify-between text-xs font-bold text-gray-500 dark:text-gray-400 mb-1">
                <span>3. Adjust Foundation Finish Cover</span>
                <span className="font-mono text-pink-600 dark:text-pink-300">{Math.round(opacity * 100)}% (Full Cover)</span>
              </div>
              <input
                type="range"
                min="0.1"
                max="1"
                step="0.05"
                value={opacity}
                onChange={(e) => setOpacity(Number(e.target.value))}
                className="w-full h-1.5 bg-[#EBE4DC] dark:bg-stone-800 rounded-lg appearance-none cursor-pointer accent-pink-600"
              />
              <div className="flex justify-between text-[9px] text-gray-400 mt-1 uppercase font-bold">
                <span>Sheer Radiant</span>
                <span>Airbrushed Matte</span>
              </div>
            </div>

            {/* 12-Tone Selection Bar */}
            <div className="mb-4">
              <div className="text-xs font-bold text-gray-500 dark:text-gray-400 mb-2">4. Core Shades Selection</div>
              <div className="grid grid-cols-6 gap-1.5">
                {SHADES.map((shade) => (
                  <button
                    key={shade.id}
                    onClick={() => setActiveShade(shade)}
                    className={`relative w-full aspect-square rounded-lg border-2 transition-all cursor-pointer ${
                      activeShade.id === shade.id
                        ? 'border-pink-600 dark:border-pink-300 scale-105'
                        : 'border-transparent hover:scale-102 hover:border-gray-500'
                    }`}
                    style={{ backgroundColor: shade.hex }}
                    title={shade.name}
                  >
                    {activeShade.id === shade.id && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/10">
                        <Check size={12} className="text-white bg-pink-600 rounded-full p-0.5" />
                      </div>
                    )}
                  </button>
                ))}
              </div>
              <div className="bg-[#FAF7F2] dark:bg-[#1E1214]/50 border border-stone-200/50 dark:border-white/5 p-3 rounded-2xl mt-3 text-left">
                <div className="text-xs font-bold text-[#1E1214] dark:text-[#F9EBE6]">Active: Shade {activeShade.id} ({activeShade.name})</div>
                <p className="text-[11px] text-gray-500 mt-0.5 leading-tight">{activeShade.description}</p>
              </div>
            </div>

          </div>

          <div className="pt-4 border-t border-[#1E1214]/10 dark:border-white/10 flex gap-3">
            <button
              onClick={() => {
                onApplyShade(activeShade);
                onClose();
              }}
              className="flex-1 bg-pink-700 hover:bg-pink-800 text-white rounded-full py-3 text-xs font-bold cursor-pointer transition-all hover:scale-[1.01] active:translate-y-0.5 text-center"
            >
              Apply Shade #{activeShade.id} in Lounge
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
