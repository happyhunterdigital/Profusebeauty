/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, FormEvent } from 'react';
import { X, Plus, Minus, Trash2, Smartphone, ShieldCheck, CreditCard, Key, Landmark, Check } from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (id: string, newQty: number, shadeId?: string) => void;
  onRemoveItem: (id: string, shadeId?: string) => void;
  onClearCart: () => void;
}

const SA_BANKS = [
  { id: 'fnb', name: 'First National Bank (FNB)', color: '#00A19B' },
  { id: 'capitec', name: 'Capitec Bank', color: '#004A8F' },
  { id: 'standard', name: 'Standard Bank', color: '#0033A0' },
  { id: 'abs', name: 'Absa Bank', color: '#D20000' },
  { id: 'nedbank', name: 'Nedbank', color: '#006A4E' },
];

export default function CartDrawer({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}: CartDrawerProps) {
  const [checkoutStep, setCheckoutStep] = useState<'cart' | 'paystack' | 'ozow' | 'completed'>('cart');
  const [paystackCardNum, setPaystackCardNum] = useState('');
  const [paystackExpiry, setPaystackExpiry] = useState('');
  const [paystackCvc, setPaystackCvc] = useState('');
  const [activeBank, setActiveBank] = useState(SA_BANKS[0]);
  const [bankUsername, setBankUsername] = useState('');
  const [bankPassword, setBankPassword] = useState('');
  const [otpCode, setOtpCode] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isOpen) return null;

  // Calculators
  const itemsSubtotal = cartItems.reduce((acc, curr) => acc + curr.product.price * curr.quantity, 0);
  const deliveryFee = itemsSubtotal === 0 ? 0 : itemsSubtotal >= 500 ? 0 : 85; // Free over R500 SA Delivery
  const totalCost = itemsSubtotal + deliveryFee;

  const handlePaystackPayment = (e: FormEvent) => {
    e.preventDefault();
    if (!paystackCardNum || !paystackExpiry || !paystackCvc) return;
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setCheckoutStep('completed');
    }, 2000);
  };

  const handleOzowPayment = (e: FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setCheckoutStep('completed');
    }, 2200);
  };

  const handleSuccessfulClose = () => {
    onClearCart();
    setCheckoutStep('cart');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backblurs backdrop */}
      <div 
        className="absolute inset-0 bg-[#1E1214]/60 dark:bg-black/85 backdrop-blur-md cursor-pointer"
        onClick={onClose}
      />

      {/* Cart Container Slider Panel */}
      <div className="relative w-full max-w-md h-full bg-[#FDFBF7] dark:bg-[#1E1214] border-l border-[#1E1214]/15 dark:border-white/10 shadow-2xl z-10 flex flex-col justify-between p-6 animate-slideLeft">
        
        {/* Header Drawer */}
        <div className="flex justify-between items-center pb-4 border-b border-[#1E1214]/10 dark:border-white/10">
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold bg-[#1E1214] text-white dark:bg-pink-700/30 dark:text-pink-300 font-mono text-[10px] px-2.5 py-1 rounded-full">
              SA Checkout Stack
            </span>
            <h3 className="text-lg font-bold text-[#1E1214] dark:text-white font-serif">Your Cosmetic Cart</h3>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 hover:bg-black/5 dark:hover:bg-white/10 text-stone-700 dark:text-[#F9EBE6] rounded-full transition-colors cursor-pointer"
          >
            <X size={20} />
          </button>
        </div>

        {/* STEP 1: REVIEW CART LIST */}
        {checkoutStep === 'cart' && (
          <div className="flex-1 flex flex-col justify-between overflow-y-auto py-4">
            {cartItems.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center text-center p-8">
                <div className="w-16 h-16 bg-pink-500/10 text-pink-700 dark:text-pink-300 rounded-full flex items-center justify-center mb-4">
                  <X size={28} />
                </div>
                <h4 className="text-base font-bold text-stone-800 dark:text-white">Active cart contains 0 items</h4>
                <p className="text-xs text-stone-500 dark:text-gray-400 mt-1 max-w-[240px] leading-relaxed">
                  Browse our high-definition hypoallergenic formulas to match your skin shades.
                </p>
                <button
                  onClick={onClose}
                  className="mt-6 bg-[#1E1214] dark:bg-[#F9EBE6] text-white dark:text-[#1E1214] text-xs font-semibold px-6 py-2.5 rounded-full cursor-pointer hover:scale-105"
                >
                  Start Exploring
                </button>
              </div>
            ) : (
              <div className="flex-1 space-y-4 pr-1 overflow-y-auto">
                {cartItems.map((item, index) => (
                  <div 
                    key={`${item.product.id}-${index}`}
                    className="flex gap-4 p-3 rounded-2xl bg-white dark:bg-stone-900/40 border border-stone-100 dark:border-white/5 shadow-sm relative group"
                  >
                    {/* Image preview */}
                    <div className="w-20 h-20 rounded-xl overflow-hidden shrink-0 border border-stone-200/50">
                      <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover" />
                    </div>

                    {/* Meta info column */}
                    <div className="flex-1 flex flex-col justify-between min-w-0">
                      <div>
                        <div className="flex justify-between items-start">
                          <h4 className="text-xs font-semibold text-[#1E1214] dark:text-white truncate pr-4">
                            {item.product.name}
                          </h4>
                          <button 
                            onClick={() => onRemoveItem(item.product.id, item.selectedShade?.id)}
                            className="text-stone-400 hover:text-red-500 p-1 rounded-full hover:bg-stone-50 cursor-pointer absolute top-2 right-2 duration-150"
                          >
                            <Trash2 size={13} />
                          </button>
                        </div>
                        
                        {/* Selected shade info display */}
                        {item.selectedShade && (
                          <div className="flex items-center gap-1.5 mt-1">
                            <span 
                              className="w-2.5 h-2.5 rounded-full border border-stone-300 shadow-sm block" 
                              style={{ backgroundColor: item.selectedShade.hex }} 
                            />
                            <span className="text-[10px] text-gray-500 font-mono font-bold">
                              Shade #{item.selectedShade.id} ({item.selectedShade.name.split(' (')[0]})
                            </span>
                          </div>
                        )}
                      </div>

                      <div className="flex justify-between items-center mt-2 pt-1 border-t border-stone-50 dark:border-white/5">
                        {/* Real-time qty controls */}
                        <div className="flex items-center gap-1.5 bg-stone-50 dark:bg-stone-900 border border-stone-200/50 rounded-full px-2 py-0.5">
                          <button 
                            onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1, item.selectedShade?.id)}
                            className="text-stone-500 hover:text-stone-800 p-1 cursor-pointer"
                          >
                            <Minus size={10} />
                          </button>
                          <span className="text-xs font-black min-w-[14px] text-center text-stone-800 dark:text-white">
                            {item.quantity}
                          </span>
                          <button 
                            onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1, item.selectedShade?.id)}
                            className="text-stone-500 hover:text-stone-800 p-1 cursor-pointer"
                          >
                            <Plus size={10} />
                          </button>
                        </div>

                        {/* Price times qty calculator */}
                        <span className="text-xs font-black text-[#1E1214] dark:text-white font-serif">
                          R{item.product.price * item.quantity}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Price list and Payment Gateway Selection */}
            {cartItems.length > 0 && (
              <div className="border-t border-[#1E1214]/10 dark:border-white/10 pt-4 mt-4 space-y-4">
                
                {/* Checkout pricing sum */}
                <div className="space-y-2 text-xs text-gray-500 dark:text-gray-400 font-medium">
                  <div className="flex justify-between">
                    <span>Cosmetics Subtotal</span>
                    <span className="font-bold text-[#1E1214] dark:text-white">R{itemsSubtotal}.00</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>SA Premium Delivery (Aramex/The Courier Guy)</span>
                    <span className="font-bold text-[#1E1214] dark:text-white">
                      {deliveryFee === 0 ? <span className="text-emerald-500 font-bold uppercase tracking-wider text-[10px]">Free Delivery ✓</span> : `R${deliveryFee}.00`}
                    </span>
                  </div>
                  {deliveryFee > 0 && (
                    <p className="text-[10px] text-amber-700 bg-amber-500/5 p-2 rounded-xl border border-amber-500/10 text-left mt-1 leading-tight">
                      💡 Spend R500 or more to activate free delivery nationwide across South Africa!
                    </p>
                  )}
                  <div className="flex justify-between text-sm text-[#1E1214] dark:text-white font-black border-t border-stone-100 dark:border-white/5 pt-2">
                    <span>Estimated Total</span>
                    <span className="text-lg font-serif">R{totalCost}.00</span>
                  </div>
                </div>

                {/* Shipping logistics trust badges */}
                <div className="bg-[#FAF7F2] dark:bg-stone-900/50 p-3 rounded-2xl flex items-start gap-2 border border-stone-200/50 dark:border-white/5 text-[10px] leading-relaxed text-left">
                  <ShieldCheck size={14} className="text-pink-600 dark:text-pink-400 shrink-0 mt-0.5 animate-pulse" />
                  <div>
                    <span className="font-bold text-gray-700 dark:text-gray-200">Aramex & The Courier Guy Express:</span>
                    <p className="text-gray-500 dark:text-gray-400 mt-0.5">
                      Delivered to major SA hubs within 2-3 business days. 30-Day Hassle-Free Returns. POPIA compliant handling.
                    </p>
                  </div>
                </div>

                {/* Instant Checkout Stack Toggles */}
                <div className="grid grid-cols-2 gap-2 text-center pt-2">
                  <button
                    onClick={() => setCheckoutStep('paystack')}
                    className="flex items-center justify-center gap-1.5 bg-[#00C3F7]/10 dark:bg-[#00C3F7]/20 hover:bg-[#00C3F7]/20 border border-[#00C3F7]/30 text-sky-800 dark:text-sky-300 py-3 rounded-xl font-bold text-xs cursor-pointer active:scale-98 transition-all"
                  >
                    <CreditCard size={13} />
                    <span>Paystack Card</span>
                  </button>

                  <button
                    onClick={() => setCheckoutStep('ozow')}
                    className="flex items-center justify-center gap-1.5 bg-[#FE5000]/10 dark:bg-[#FE5000]/20 hover:bg-[#FE5000]/20 border border-[#FE5000]/30 text-orange-850 dark:text-orange-300 py-3 rounded-xl font-bold text-xs cursor-pointer active:scale-98 transition-all"
                  >
                    <Smartphone size={13} />
                    <span>Ozow Instant EFT</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* STEP 2: PAYSTACK CARD SIMULATOR */}
        {checkoutStep === 'paystack' && (
          <div className="flex-1 flex flex-col justify-between py-6 text-left">
            <div className="space-y-4">
              <div className="bg-[#00A19B]/5 border border-[#00A19B]/20 p-4 rounded-3xl flex items-center justify-between">
                <div>
                  <div className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Gateway Secure Portal</div>
                  <h4 className="text-sm font-black text-stone-800 dark:text-white">Paystack Acceptance Card</h4>
                </div>
                <div className="bg-sky-500 text-white rounded-md px-2 py-0.5 text-[9px] font-black uppercase tracking-wider">
                  Verified
                </div>
              </div>

              <form onSubmit={handlePaystackPayment} className="space-y-4 pt-2">
                <div>
                  <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest">Credit Card Number</label>
                  <input
                    type="text"
                    maxLength={19}
                    placeholder="4000 1234 5678 9010"
                    value={paystackCardNum}
                    onChange={(e) => setPaystackCardNum(e.target.value.replace(/\s?/g, '').replace(/(\d{4})/g, '$1 ').trim())}
                    required
                    className="w-full mt-1.5 bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl py-3 px-4 text-xs text-[#1E1214] dark:text-white focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest">Expiration Date</label>
                    <input
                      type="text"
                      maxLength={5}
                      placeholder="MM/YY"
                      value={paystackExpiry}
                      onChange={(e) => setPaystackExpiry(e.target.value)}
                      required
                      className="w-full mt-1.5 bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl py-3 px-4 text-xs text-[#1E1214] dark:text-white focus:outline-none focus:border-sky-500"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest">CVV / Security Code</label>
                    <input
                      type="password"
                      maxLength={3}
                      placeholder="123"
                      value={paystackCvc}
                      onChange={(e) => setPaystackCvc(e.target.value)}
                      required
                      className="w-full mt-1.5 bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl py-3 px-4 text-xs text-[#1E1214] dark:text-white focus:outline-none focus:border-sky-500"
                    />
                  </div>
                </div>

                <div className="bg-stone-50 dark:bg-stone-900 p-3.5 rounded-2xl flex items-center justify-between border border-stone-200/50 dark:border-stone-800/80 text-xs font-semibold mt-4">
                  <span className="text-gray-500">Paystack Invoice Total:</span>
                  <span className="text-base text-sky-600 font-bold font-serif">R{totalCost}.00</span>
                </div>

                <button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full bg-[#1E1214] dark:bg-sky-500 text-white dark:text-[#120A0B] py-3.5 rounded-full text-xs font-bold block text-center shadow-lg cursor-pointer hover:opacity-90 active:scale-98 transition-all mt-6"
                >
                  {isProcessing ? 'Simulating Secure Authorization via Paystack Verification...' : 'Pay with Secure Credit Card'}
                </button>
              </form>
            </div>

            <button
              onClick={() => setCheckoutStep('cart')}
              className="w-full text-center text-xs text-gray-400 font-semibold hover:text-[#1E1214] dark:hover:text-white mt-8"
            >
              Back to shopping cart list
            </button>
          </div>
        )}

        {/* STEP 3: OZOW INSTANT EFT SIMULATOR */}
        {checkoutStep === 'ozow' && (
          <div className="flex-1 flex flex-col justify-between py-6 text-left">
            <div className="space-y-4">
              <div className="bg-[#FE5000]/5 border border-[#FE5000]/20 p-4 rounded-3xl">
                <div className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Gateway Secure EFT</div>
                <h4 className="text-sm font-black text-[#FE5000]">Ozow Instant EFT Payment</h4>
                <p className="text-[10px] text-gray-500 mt-1">Pay direct via your South African bank. No Credit Card required.</p>
              </div>

              {/* Bank choice list */}
              <div className="space-y-2">
                <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest">Select South African Bank</label>
                <div className="grid grid-cols-2 gap-2">
                  {SA_BANKS.map((b) => (
                    <button
                      key={b.id}
                      onClick={() => setActiveBank(b)}
                      className={`flex items-center gap-2 p-2.5 rounded-xl border text-xs text-left cursor-pointer transition-all ${
                        activeBank.id === b.id
                          ? 'border-orange-500 bg-orange-500/5 font-bold'
                          : 'border-stone-200 dark:border-white/5'
                      }`}
                    >
                      <Landmark size={14} style={{ color: b.color }} />
                      <span className="truncate text-[11px] text-[#1E1214] dark:text-gray-300">{b.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Simulated electronic fund payment login */}
              <form onSubmit={handleOzowPayment} className="space-y-3.5 pt-2">
                <div>
                  <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest">Internet Banking Username</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 104882098"
                    value={bankUsername}
                    onChange={(e) => setBankUsername(e.target.value)}
                    className="w-full mt-1.5 bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl py-2.5 px-3 text-xs text-[#1E1214] dark:text-white focus:outline-none focus:border-orange-500"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest">Internet Banking Passcode / PIN</label>
                  <input
                    type="password"
                    required
                    placeholder="••••••"
                    value={bankPassword}
                    onChange={(e) => setBankPassword(e.target.value)}
                    className="w-full mt-1.5 bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl py-2.5 px-3 text-xs text-[#1E1214] dark:text-white focus:outline-none focus:border-orange-500"
                  />
                </div>

                <div className="bg-stone-50 dark:bg-stone-900 p-3.5 rounded-2xl flex items-center justify-between border border-stone-200/50 dark:border-stone-800/80 text-xs mt-3">
                  <span className="text-gray-500">Secure Ozow EFT Total:</span>
                  <span className="text-base text-orange-600 font-bold font-serif">R{totalCost}.00</span>
                </div>

                <button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full bg-[#1E1214] dark:bg-[#FE5000] text-white dark:text-[#120A0B] py-3 rounded-xl text-xs font-bold block text-center shadow-lg cursor-pointer hover:opacity-90 transition-all mt-4"
                >
                  {isProcessing ? 'Verifying Safe Biometric OTP with your bank...' : 'Verify payment via Internet Banking'}
                </button>
              </form>
            </div>

            <button
              onClick={() => setCheckoutStep('cart')}
              className="w-full text-center text-xs text-gray-400 font-semibold hover:text-[#1E1214] dark:hover:text-white"
            >
              Back to shopping cart list
            </button>
          </div>
        )}

        {/* STEP 4: ORDER PLACED CONFIRMATION SCREEN */}
        {checkoutStep === 'completed' && (
          <div className="flex-1 flex flex-col justify-center items-center text-center py-8 px-4 animate-fadeIn">
            <div className="w-16 h-16 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center mb-6 border border-emerald-500/20">
              <Check size={28} className="animate-scaleIn" />
            </div>

            <div className="space-y-2">
              <span className="text-[10px] bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider inline-block">
                SA Payments Settled
              </span>
              <h3 className="text-xl md:text-2xl font-serif italic text-stone-800 dark:text-white font-bold">
                Order Confirmed!
              </h3>
              <p className="text-xs text-stone-500 dark:text-gray-400 max-w-sm mx-auto leading-relaxed mt-2">
                We have registered your payment and initialized the dispatch pipeline. An official invoice and live Aramex tracking pin have been sent to your inbox.
              </p>
            </div>

            {/* Quick delivery route simulation card */}
            <div className="bg-[#FAF7F2] dark:bg-stone-900/40 p-5 rounded-3xl border border-stone-200/50 dark:border-white/5 text-left w-full mt-8 text-xs font-semibold text-[#1E1214] dark:text-white">
              <div className="flex justify-between items-center pb-3 border-b border-stone-100 dark:border-white/5 mb-3">
                <span className="text-gray-500 text-[10px] uppercase tracking-wider">Est. Dispatch Timeline</span>
                <span className="text-emerald-600 font-bold">2 - 3 Business Days</span>
              </div>
              
              <div className="space-y-2 text-stone-700 dark:text-gray-300">
                <div className="flex justify-between">
                  <span>Authorized Subtotal:</span>
                  <span className="font-bold text-[#1E1214] dark:text-white">R{itemsSubtotal}.00</span>
                </div>
                <div className="flex justify-between">
                  <span>Carrier Partners:</span>
                  <span className="text-pink-600 dark:text-pink-400">The Courier Guy / Aramex</span>
                </div>
                <div className="flex justify-between">
                  <span>Tracking Reference Code:</span>
                  <span className="font-mono bg-white dark:bg-black/20 rounded-md px-1.5 py-0.5">PB-TRACK-88220-SA</span>
                </div>
              </div>
            </div>

            <button
              onClick={handleSuccessfulClose}
              className="w-full bg-[#1E1214] dark:bg-[#F9EBE6] text-white dark:text-[#1E1214] font-bold py-3.5 rounded-full text-xs mt-10 active:translate-y-0.5"
            >
              Done & Continue Browsing
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
