// File: src/components/VideoLightboxModal.tsx
import React from 'react';

interface VideoLightboxModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function VideoLightboxModal({ isOpen, onClose }: VideoLightboxModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-[#0E0E12] border border-white/10 p-6 relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-white text-sm font-mono">✕ CLOSE</button>
        
        <div className="space-y-4">
          <span className="text-[9px] font-mono uppercase tracking-widest text-[#fbbf24]">15-Second Texture Demo</span>
          <h3 className="text-lg font-serif text-white">HD Foundation Skin Blend</h3>
          
          <div className="aspect-video w-full bg-zinc-950 flex items-center justify-center border border-white/5">
            <p className="text-xs font-mono text-zinc-600 uppercase tracking-widest">Texture Blend video playing...</p>
          </div>

          <p className="text-[10px] text-zinc-400 leading-relaxed">
            See our non-greasy, full coverage formula adapt instantly to warm South African complexions under natural light.
          </p>
        </div>
      </div>
    </div>
  );
}
