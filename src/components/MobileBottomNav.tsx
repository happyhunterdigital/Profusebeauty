/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Home, ShoppingCart, Heart, Phone } from 'lucide-react';

interface MobileBottomNavProps {
  onHomeClick: () => void;
  onExploreProductsClick: () => void;
  onCartClick: () => void;
  wishlistCount: number;
}

export default function MobileBottomNav({
  onHomeClick,
  onExploreProductsClick,
  onCartClick,
  wishlistCount,
}: MobileBottomNavProps) {
  const [activeTab, setActiveTab] = useState<'home' | 'shop' | 'wishlist' | 'call'>('home');

  const handleWhatsAppCall = () => {
    setActiveTab('call');
    // Prefilled message for professional cosmetics inquiry in PTA
    const message = encodeURIComponent("Hi Profuse Beauty, I would like to inquiry about the Pretoria Makeup Masterclass Workshops and Shade Match!");
    window.open(`https://wa.me/27812355910?text=${message}`, '_blank');
  };

  return (
    <div className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-sm z-40 bg-white/75 dark:bg-[#1E1214]/85 backdrop-blur-xl border border-white/20 dark:border-white/10 rounded-full px-5 py-3.5 shadow-2xl flex items-center justify-between">
      
      {/* Home Tab */}
      <button
        onClick={() => {
          setActiveTab('home');
          onHomeClick();
        }}
        className={`flex flex-col items-center justify-center cursor-pointer transition-all duration-200 ${
          activeTab === 'home' 
            ? 'text-pink-700 dark:text-pink-300 scale-110 font-bold' 
            : 'text-stone-400 dark:text-gray-400 hover:text-[#1E1214]'
        }`}
      >
        <Home size={18} />
        <span className="text-[9px] mt-1 font-sans">Home</span>
      </button>

      {/* Shop Tab */}
      <button
        onClick={() => {
          setActiveTab('shop');
          onExploreProductsClick();
        }}
        className={`flex flex-col items-center justify-center cursor-pointer transition-all duration-200 ${
          activeTab === 'shop' 
            ? 'text-pink-700 dark:text-pink-300 scale-110 font-bold' 
            : 'text-stone-400 dark:text-gray-400 hover:text-[#1E1214]'
        }`}
      >
        <ShoppingCart size={18} />
        <span className="text-[9px] mt-1 font-sans">Shop Formula</span>
      </button>

      {/* Wishlist Tab */}
      <button
        onClick={() => {
          setActiveTab('wishlist');
          onCartClick(); // Open Cart/Checkout directly for quick conversion action
        }}
        className={`relative flex flex-col items-center justify-center cursor-pointer transition-all duration-200 ${
          activeTab === 'wishlist' 
            ? 'text-pink-700 dark:text-pink-300 scale-110 font-bold' 
            : 'text-stone-400 dark:text-gray-400 hover:text-[#1E1214]'
        }`}
      >
        <Heart size={18} />
        <span className="text-[9px] mt-1 font-sans">My Cart</span>
        {wishlistCount > 0 && (
          <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-600 text-[8px] font-bold text-white">
            {wishlistCount}
          </span>
        )}
      </button>

      {/* WhatsApp Call Direct link */}
      <button
        onClick={handleWhatsAppCall}
        className={`flex flex-col items-center justify-center cursor-pointer transition-all duration-200 ${
          activeTab === 'call' 
            ? 'text-emerald-500 scale-110 font-bold' 
            : 'text-stone-400 dark:text-gray-400 hover:text-[#1E1214]'
        }`}
      >
        <Phone size={18} />
        <span className="text-[9px] mt-1 font-sans">WhatsApp</span>
      </button>
      
    </div>
  );
}
