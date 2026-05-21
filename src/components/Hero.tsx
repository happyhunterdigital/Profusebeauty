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
      canvas.height = 440;
    };
    resize();
    window.addEventListener('resize', resize);

    const renderLoop = () => {
      time += 0.003;
      const w = canvas.width;
      const h = canvas.height;

      const mesh = ctx.createRadialGradient(
        w * (0.35 + Math.sin(time) * 0.15 + mouse.x * 0.15),
        h * (0.45 + Math.cos(time * 0.6) * 0.15 + mouse.y * 0.15),
        0,
        w * 0.5,
        h * 0.5,
        w * 0.75
      );

      mesh.addColorStop(0, 'rgba(251, 191, 36, 0.15)');
      mesh.addColorStop(0.3, 'rgba(251, 146, 60, 0.08)');
      mesh.addColorStop(0.6, 'rgba(239, 68, 68, 0.04)');
      mesh.addColorStop(1, 'rgba(10, 10, 15, 0)');

      ctx.fillStyle = isDarkMode ? '#0A0A0F' : '#FDFBF7';
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
      className="relative grid grid-cols-1 lg:grid-cols-12 gap-12 items-center overflow-hidden py-12 border-b border-white/5"
    >
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-0" style={{ filter: 'blur(40px)' }} />

      {/* Left Column Text */}
      <div className="lg:col-span-7 relative z-10 space-y-6 text-left px-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 backdrop-blur-md border border-white/10">
          <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
          <span className="text-[9px] uppercase font-mono tracking-widest text-zinc-300">Pretoria Brooklyn Studio Open</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-black uppercase tracking-tighter leading-none text-white">
          Is Your Skin Ready for{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-400 to-red-400">
            2026 Beauty?
          </span>
        </h1>

        <p className="text-xs sm:text-sm text-zinc-400 max-w-xl leading-relaxed">
          Premium, hypoallergenic, botanical formulations built for South African skin tones. Eliminate shade anxiety with instant WebGL diagnostics and Pretoria pro-MUA workshops.
        </p>

        <div className="flex gap-4">
          <button onClick={onVTOOpen} className="px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-black text-xs font-black uppercase tracking-widest hover:scale-[1.02] transition-transform">
            Start Live Shade Scan
          </button>
        </div>
      </div>

      {/* Right Column High-Res Product Display Image */}
      <div className="lg:col-span-5 relative z-10 flex justify-center">
        <div className="relative w-full max-w-[340px] aspect-[4/5] bg-zinc-950 border border-white/10 p-3 shadow-2xl">
          <img 
            src="https://res.cloudinary.com/dafc66cma/image/upload/q_auto/f_auto/v1779370852/Profuse_Beauty_HD_Liquid_Foundations_eqcq3v.jpg" 
            alt="Profuse Beauty Flagship HD Foundations Group" 
            className="w-full h-full object-cover border border-white/5"
          />
        </div>
      </div>
    </section>
  );
}
