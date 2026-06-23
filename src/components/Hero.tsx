// File: src/components/Hero.tsx
import React, { useEffect, useRef, useState } from 'react';

interface HeroProps {
  isDarkMode: boolean;
  onVTOOpen: () => void;
}

export default function Hero({ isDarkMode, onVTOOpen }: HeroProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [mouse, setMouse] = useState<{ x: number; y: number }>({ x: 0.5, y: 0.5 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let time = 0;

    const resize = () => {
      canvas.width = canvas.parentElement?.offsetWidth || window.innerWidth;
      canvas.height = 600;
    };
    resize();
    window.addEventListener('resize', resize);

    const renderLoop = () => {
      time += 0.0005; // Slow-breathing speed
      const w = canvas.width;
      const h = canvas.height;

      // Fluid breathing calculation
      const breath = Math.sin(time * 2) * 0.05;

      const mesh = ctx.createRadialGradient(
        w * (0.5 + Math.sin(time) * 0.2 + mouse.x * 0.05),
        h * (0.5 + Math.cos(time * 0.8) * 0.2 + mouse.y * 0.05),
        0,
        w * 0.5,
        h * 0.5,
        w * (0.8 + breath)
      );

      if (isDarkMode) {
        // Deep Charcoal (#1c1917) base, blending into Soft Ivory Silver (#e7e5e4) highlights
        mesh.addColorStop(0, 'rgba(231, 229, 228, 0.15)'); // Soft Ivory Silver highlight
        mesh.addColorStop(0.4, 'rgba(245, 245, 244, 0.05)'); // Crisp Luxury Alabaster transition
        mesh.addColorStop(1, 'rgba(28, 25, 23, 0)'); // Fades into Deep Charcoal
        ctx.fillStyle = '#1c1917'; // Deep Charcoal background
      } else {
        // Crisp Luxury Alabaster (#f5f5f4) base, blending into Soft Ivory Silver and Charcoal shadows
        mesh.addColorStop(0, 'rgba(28, 25, 23, 0.08)'); // Charcoal shadow/depth
        mesh.addColorStop(0.4, 'rgba(231, 229, 228, 0.4)'); // Ivory Silver transition
        mesh.addColorStop(1, 'rgba(245, 245, 244, 0)'); // Fades into Alabaster
        ctx.fillStyle = '#f5f5f4'; // Crisp Luxury Alabaster background
      }

      ctx.fillRect(0, 0, w, h);
      ctx.fillStyle = mesh;
      ctx.fillRect(0, 0, w, h);

      animId = requestAnimationFrame(renderLoop);
    };
    renderLoop();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, [mouse, isDarkMode]);

  return (
    <section 
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        setMouse({ x: (e.clientX - r.left) / r.width, y: (e.clientY - r.top) / r.height });
      }}
      className={`relative grid grid-cols-1 lg:grid-cols-12 gap-12 items-center overflow-hidden py-20 border-b ${isDarkMode ? 'border-white/5' : 'border-black/5'}`}
    >
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-0 transition-opacity duration-1000" style={{ filter: 'blur(60px)' }} />

      {/* Left Column Text */}
      <div className="lg:col-span-7 relative z-10 space-y-8 text-left px-6 lg:pl-12">
        <div className={`inline-flex items-center gap-3 px-4 py-1.5 rounded-full backdrop-blur-md border ${isDarkMode ? 'bg-white/5 border-white/10' : 'bg-black/5 border-black/10'}`}>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className={`text-[10px] uppercase font-mono tracking-[0.2em] ${isDarkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>Premium Beauty</span>
        </div>

        <h1 className={`text-5xl sm:text-7xl font-serif font-light tracking-tight leading-tight ${isDarkMode ? 'text-[#f5f5f4]' : 'text-[#1c1917]'}`}>
          Cultivating Your <br/>
          <span className="font-serif italic text-transparent bg-clip-text bg-gradient-to-r from-zinc-500 to-stone-400">
            Natural Profuse Beauty
          </span>
        </h1>

        <p className={`text-sm sm:text-base max-w-xl leading-relaxed font-light tracking-wide ${isDarkMode ? 'text-[#e7e5e4]' : 'text-zinc-600'}`}>
          High-end botanical formulations crafted for perfect harmony. 
          Experience luxury clinical aesthetics with our interactive diagnostic suite.
        </p>

        <div className="flex gap-6 pt-4">
          <button onClick={onVTOOpen} className={`px-8 py-4 text-xs font-semibold uppercase tracking-[0.25em] transition-all duration-500 hover:scale-[1.02] ${isDarkMode ? 'bg-[#f5f5f4] text-[#1c1917] hover:bg-white' : 'bg-[#1c1917] text-[#f5f5f4] hover:bg-black'}`}>
            Discover Your Shade
          </button>
        </div>
      </div>

      {/* Right Column High-Res Product Display Image */}
      <div className="lg:col-span-5 relative z-10 flex justify-center px-6">
        <div className={`relative w-full max-w-[400px] aspect-[4/5] p-4 shadow-2xl transition-all duration-700 hover:shadow-3xl ${isDarkMode ? 'bg-[#1c1917] border-white/5' : 'bg-white border-black/5'}`}>
          <img 
            src="https://res.cloudinary.com/dafc66cma/image/upload/q_auto/f_auto/v1779370852/Profuse_Beauty_HD_Liquid_Foundations_eqcq3v.jpg" 
            alt="Profuse Beauty Luxury Foundations" 
            className="w-full h-full object-cover transition-transform duration-1000 hover:scale-105"
          />
        </div>
      </div>
    </section>
  );
}
