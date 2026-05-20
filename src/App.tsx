// File: src/App.tsx
import React, { useState } from 'react';
import { Product, CartItem } from './types';
import Header from './components/Header';
import Hero from './components/Hero';
import BentoGrid from './components/BentoGrid';
import ProductStore from './components/ProductStore';
import MobileBottomNav from './components/MobileBottomNav';
import CartDrawer from './components/CartDrawer';
import ChatbotDrawer from './components/ChatbotDrawer';
import TrustBridge from './components/TrustBridge';
import VideoLightboxModal from './components/VideoLightboxModal';
import VirtualTryOnModal from './components/VirtualTryOnModal';
import WorkshopModal from './components/WorkshopModal';
import Footer from './Footer';

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isChatbotOpen, setIsChatbotOpen] = useState<boolean>(false);
  const [isVTOOpen, setIsVTOOpen] = useState<boolean>(false);
  const [isWorkshopOpen, setIsWorkshopOpen] = useState<boolean>(false);
  const [isVideoOpen, setIsVideoOpen] = useState<boolean>(false);
  const [selectedShade, setSelectedShade] = useState<string>('#07');
  const [activeTab, setActiveTab] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const handleAddToCart = (product: Product, shade: string | null = null): void => {
    setCart(prev => {
      const itemKey = shade ? `${product.id}-${shade}` : product.id;
      const existing = prev.find(item => item.cartKey === itemKey);
      if (existing) {
        return prev.map(item => item.cartKey === itemKey ? { ...item, qty: item.qty + 1 } : item);
      }
      return [...prev, { ...product, cartKey: itemKey, selectedShade: shade, qty: 1 }];
    });
    setIsCartOpen(true);
  };

  const handleUpdateQty = (cartKey: string, delta: number): void => {
    setCart(prev => prev.map(item => {
      if (item.cartKey === cartKey) {
        const nextQty = item.qty + delta;
        return nextQty > 0 ? { ...item, qty: nextQty } : null;
      }
      return item;
    }).filter((item): item is CartItem => item !== null));
  };

  const themeClasses = isDarkMode 
    ? "bg-[#0A0A0F] text-[#F5F5F5] selection:bg-[#fbbf24]/30 selection:text-white font-sans transition-colors duration-500 min-h-screen relative overflow-x-hidden"
    : "bg-[#FDFBF7] text-[#1E1214] selection:bg-[#2E1A1C]/20 selection:text-[#1E1214] font-sans transition-colors duration-500 min-h-screen relative overflow-x-hidden";

  return (
    <div className={themeClasses}>
      <Header 
        isDarkMode={isDarkMode} 
        setIsDarkMode={setIsDarkMode} 
        cartCount={cart.reduce((sum, i) => sum + i.qty, 0)} 
        onCartOpen={() => setIsCartOpen(true)}
        onVTOOpen={() => setIsVTOOpen(true)}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 space-y-20">
        <Hero isDarkMode={isDarkMode} onVTOOpen={() => setIsVTOOpen(true)} />
        
        <BentoGrid 
          isDarkMode={isDarkMode}
          onAddToCart={handleAddToCart}
          onWorkshopOpen={() => setIsWorkshopOpen(true)}
          onVideoOpen={() => setIsVideoOpen(true)}
          onChatbotOpen={() => setIsChatbotOpen(true)}
        />
        
        <ProductStore 
          isDarkMode={isDarkMode} 
          onAddToCart={handleAddToCart}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />

        <TrustBridge isDarkMode={isDarkMode} />
      </main>

      <Footer isDarkMode={isDarkMode} />
      <MobileBottomNav cartCount={cart.reduce((sum, i) => sum + i.qty, 0)} onCartOpen={() => setIsCartOpen(true)} onVTOOpen={() => setIsVTOOpen(true)} />
      
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} cartItems={cart} onUpdateQty={handleUpdateQty} />
      <ChatbotDrawer isOpen={isChatbotOpen} onClose={() => setIsChatbotOpen(false)} isDarkMode={isDarkMode} />
      <VideoLightboxModal isOpen={isVideoOpen} onClose={() => setIsVideoOpen(false)} />
      <VirtualTryOnModal isOpen={isVTOOpen} onClose={() => setIsVTOOpen(false)} selectedShade={selectedShade} setSelectedShade={setSelectedShade} onAddToCart={(s) => handleAddToCart(products[0], s)} />
      <WorkshopModal isOpen={isWorkshopOpen} onClose={() => setIsWorkshopOpen(false)} isDarkMode={isDarkMode} />
    </div>
  );
}
