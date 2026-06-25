// File: src/components/CartDrawer.tsx
import React, { useState } from 'react';
import { CartItem } from '../types';
import { calculateCartTotals } from '../lib/discountEngine';
import PayfastCheckout from './PayfastCheckout';
import { Tag, X } from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQty: (key: string, delta: number) => void;
}

export default function CartDrawer({ isOpen, onClose, cartItems, onUpdateQty }: CartDrawerProps) {
  const [promoCode, setPromoCode] = useState('');
  const [appliedPromo, setAppliedPromo] = useState('');
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  if (!isOpen && !isCheckoutOpen) return null;

  // Run the Cart Logic Engine
  const { 
    discountedCart, 
    subtotal, 
    promoDiscount, 
    bogoDiscount, 
    totalDiscount, 
    finalTotal 
  } = calculateCartTotals(cartItems, appliedPromo);

  const handleApplyPromo = () => {
    setAppliedPromo(promoCode);
  };

  if (isCheckoutOpen) {
    return (
      <PayfastCheckout 
        amount={finalTotal} 
        itemName={`Profusebeauty Order (${cartItems.length} items)`}
        itemDescription={`Order containing ${cartItems.map(i => i.name).join(', ')}`}
        onCancel={() => setIsCheckoutOpen(false)}
      />
    );
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex justify-end">
      <div className="w-full max-w-md bg-[#0E0E12] border-l border-white/5 h-full p-6 flex flex-col justify-between animate-slide-in">
        <div>
          <div className="flex justify-between items-center border-b border-zinc-800 pb-4 mb-4">
            <h3 className="text-lg font-black uppercase tracking-wider font-serif text-[#d4af37]">Your Shopping Bag</h3>
            <button onClick={onClose} className="text-xs font-mono text-zinc-500 hover:text-white flex items-center gap-1">
              <X className="w-4 h-4" /> CLOSE
            </button>
          </div>

          <div className="space-y-4 max-h-[55vh] overflow-y-auto pr-2 custom-scrollbar">
            {discountedCart.length === 0 ? (
              <p className="text-center py-16 text-xs font-mono text-zinc-600 uppercase">Bag is Empty</p>
            ) : (
              discountedCart.map(item => (
                <div key={item.cartKey} className="flex justify-between items-start border-b border-zinc-800 pb-4">
                  <div className="space-y-1.5 flex-1">
                    <h4 className="text-xs font-bold text-white tracking-wide">{item.name}</h4>
                    {item.selectedShade && <span className="text-[9px] bg-amber-400/10 text-amber-400 px-2 py-0.5 font-mono rounded-sm">Shade: {item.selectedShade}</span>}
                    
                    <div className="flex items-center gap-2 mt-1">
                      {item.isBogoApplied ? (
                        <>
                          <span className="text-[11px] text-zinc-500 line-through">R {item.originalItemTotal.toFixed(2)}</span>
                          <span className="text-[11px] text-[#d4af37] font-bold">R {item.discountedItemTotal.toFixed(2)}</span>
                          <span className="text-[8px] bg-[#d4af37]/20 text-[#d4af37] px-1.5 py-0.5 rounded uppercase font-black tracking-widest">BOGO FREE</span>
                        </>
                      ) : (
                        <span className="text-[11px] text-zinc-400">R {item.originalItemTotal.toFixed(2)}</span>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex flex-col items-end gap-2 ml-4">
                    <div className="flex items-center space-x-2 border border-zinc-800 p-1 rounded-lg bg-zinc-900/50">
                      <button onClick={() => onUpdateQty(item.cartKey, -1)} className="px-2 py-0.5 text-xs text-zinc-400 hover:text-white">-</button>
                      <span className="text-xs font-mono text-white w-4 text-center">{item.qty}</span>
                      <button onClick={() => onUpdateQty(item.cartKey, 1)} className="px-2 py-0.5 text-xs text-zinc-400 hover:text-white">+</button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {cartItems.length > 0 && (
          <div className="border-t border-zinc-800 pt-4 space-y-4">
            
            {/* Promo Code Input */}
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Tag className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
                <input 
                  type="text" 
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  placeholder="Promo Code" 
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-lg pl-9 pr-3 py-2 text-xs text-white focus:outline-none focus:border-[#d4af37] uppercase"
                />
              </div>
              <button 
                onClick={handleApplyPromo}
                className="bg-zinc-800 text-white px-4 py-2 rounded-lg text-xs font-bold hover:bg-zinc-700 transition-colors"
              >
                Apply
              </button>
            </div>

            {/* Totals Breakdown */}
            <div className="space-y-2 bg-zinc-900/50 p-4 rounded-xl border border-zinc-800/50">
              <div className="flex justify-between text-xs text-zinc-400">
                <span>Subtotal:</span>
                <span>R {subtotal.toFixed(2)}</span>
              </div>
              
              {bogoDiscount > 0 && (
                <div className="flex justify-between text-xs text-emerald-400 font-bold">
                  <span>BOGO Savings:</span>
                  <span>- R {bogoDiscount.toFixed(2)}</span>
                </div>
              )}

              {promoDiscount > 0 && (
                <div className="flex justify-between text-xs text-emerald-400 font-bold">
                  <span>Promo ({appliedPromo}):</span>
                  <span>- R {promoDiscount.toFixed(2)}</span>
                </div>
              )}

              <div className="flex justify-between text-sm font-black text-white uppercase pt-2 border-t border-zinc-800">
                <span>Total:</span>
                <span className="text-[#d4af37] text-lg">R {finalTotal.toFixed(2)}</span>
              </div>
            </div>

            <button 
              onClick={() => setIsCheckoutOpen(true)}
              className="w-full py-4 bg-[#d4af37] text-black rounded-xl font-black tracking-widest uppercase text-xs hover:bg-[#b8960f] transition-colors shadow-[0_0_20px_rgba(212,175,55,0.2)]"
            >
              Proceed to Secure Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
