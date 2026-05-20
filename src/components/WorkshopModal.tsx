// File: src/components/WorkshopModal.tsx
import React from 'react';
import { workshopDates } from '../data';

interface WorkshopModalProps {
  isOpen: boolean;
  onClose: () => void;
  isDarkMode: boolean;
}

export default function WorkshopModal({ isOpen, onClose, isDarkMode }: WorkshopModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4">
      <div className={`max-w-md w-full ${isDarkMode ? 'bg-[#0E0E12] border border-white/10 text-white' : 'bg-white text-black'} p-8`}>
        <div className="flex justify-between items-start mb-4">
          <div>
            <span className="text-[9px] font-mono uppercase tracking-widest text-amber-500 block">Pretoria bookings</span>
            <h3 className="text-xl font-serif">Makeup Masterclasses</h3>
          </div>
          <button onClick={onClose} className="text-xs font-mono text-zinc-500 hover:text-zinc-400">✕ CLOSE</button>
        </div>

        <p className="text-xs text-zinc-400 mb-6 leading-relaxed">
          Join our Pretoria East studio for a hands-on shade selection and blending tutorial. Registration fee is redeemable on core products.
        </p>

        <div className="space-y-3 mb-6">
          {workshopDates.map(date => (
            <div key={date.id} className="p-3 bg-zinc-950 border border-white/5 flex justify-between items-center">
              <div>
                <p className="text-xs font-bold text-white">{date.date}</p>
                <p className="text-[10px] text-zinc-500 font-mono mt-0.5">📍 {date.location}</p>
              </div>
              <span className="text-[9px] uppercase font-mono tracking-wider bg-rose-400/10 text-rose-400 px-2 py-1">
                {date.capacity}
              </span>
            </div>
          ))}
        </div>

        <button 
          onClick={() => { alert("Selected masterclass slot has been provisionally saved. A pro-MUA coordinator will contact you via WhatsApp."); onClose(); }}
          className="w-full py-3.5 bg-gradient-to-r from-amber-500 to-orange-500 text-black font-black uppercase tracking-widest text-xs"
        >
          Request Reservation
        </button>
      </div>
    </div>
  );
}
