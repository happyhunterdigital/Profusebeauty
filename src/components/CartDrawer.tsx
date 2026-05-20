// File: src/components/CartDrawer.tsx
import React from 'react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQty: (key: string, delta: number) => void;
}

export default function CartDrawer({ isOpen, onClose, cartItems, onUpdateQty }: CartDrawerProps) {
  if (!isOpen) return null;

  const total = cartItems.reduce((sum, item) => sum + (item.price * item.qty), 0);

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex justify-end">
      <div className="w-full max-w-md bg-[#0E0E12] border-l border-white/5 h-full p-6 flex flex-col justify-between animate-slide-in">
        <div>
          <div className="flex justify-between items-center border-b border-zinc-800 pb-4 mb-4">
            <h3 className="text-lg font-black uppercase tracking-wider font-serif text-white">Your Shopping Bag</h3>
            <button onClick={onClose} className="text-xs font-mono text-zinc-500 hover:text-white">CLOSE</button>
          </div>

          <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-2">
            {cartItems.length === 0 ? (
              <p className="text-center py-16 text-xs font-mono text-zinc-600 uppercase">Bag is Empty</p>
            ) : (
              cartItems.map(item => (
                <div key={item.cartKey} className="flex justify-between items-center border-b border-zinc-800 pb-4">
                  <div className="space-y-1">
                    <h4 className="text-xs font-bold text-white tracking-wide">{item.name}</h4>
                    {item.selectedShade && <span className="text-[9px] bg-amber-400/10 text-amber-400 px-2 py-0.5 font-mono">Shade: {item.selectedShade}</span>}
                    <p className="text-[10px] text-zinc-400">R {item.price.toFixed(2)}</p>
                  </div>
                  <div className="flex items-center space-x-2 border border-zinc-800 p-1">
                    <button onClick={() => onUpdateQty(item.cartKey, -1)} className="px-2 py-0.5 text-xs text-zinc-400 hover:text-white">-</button>
                    <span className="text-xs font-mono text-white">{item.qty}</span>
                    <button onClick={() => onUpdateQty(item.cartKey, 1)} className="px-2 py-0.5 text-xs text-zinc-400 hover:text-white">+</button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {cartItems.length > 0 && (
          <div className="border-t border-zinc-850 pt-4 space-y-4">
            <div className="flex justify-between text-sm font-bold text-white uppercase">
              <span>Subtotal:</span>
              <span className="text-[#fbbf24]">R {total.toFixed(2)}</span>
            </div>
            <div className="text-[10px] bg-[#fbbf24]/5 p-3 border border-[#fbbf24]/25 text-zinc-400 font-mono">
              💳 PayJustNow: 3 x installments of <b>R {(total / 3).toFixed(2)}</b> interest-free.
            </div>
            <button className="w-full py-3.5 bg-gradient-to-r from-amber-500 to-orange-500 text-black font-black tracking-widest uppercase text-xs">
              Proceed to Secure Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
