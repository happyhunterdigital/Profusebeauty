/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, FormEvent } from 'react';
import { Sparkles, ArrowRight, Star, Heart, MessageSquare, AlertCircle, ShoppingBag, ShieldAlert, Check, X } from 'lucide-react';
import Header from './components/Header';
import Hero from './components/Hero';
import BentoGrid from './components/BentoGrid';
import TrustBridge from './components/TrustBridge';
import VirtualTryOnModal from './components/VirtualTryOnModal';
import VideoLightboxModal from './components/VideoLightboxModal';
import WorkshopModal from './components/WorkshopModal';
import CartDrawer from './components/CartDrawer';
import MobileBottomNav from './components/MobileBottomNav';
import { Product, CartItem } from './types';
import { PRODUCTS, SHADES } from './data';

export default function App() {
  // Color configuration
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Sync dark class with document element
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  // Cart Management
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Modal Open Toggles
  const [isVirtualTryOnOpen, setIsVirtualTryOnOpen] = useState(false);
  const [isWorkshopOpen, setIsWorkshopOpen] = useState(false);
  const [activeVideo, setActiveVideo] = useState<any | null>(null);

  // Product Filter Catalog State
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeAppliedShade, setActiveAppliedShade] = useState<any | null>(null);
  
  // Newsletter Signups
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSuccess, setNewsletterSuccess] = useState(false);

  // AI Interactive Chatbot Drawer
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState<Array<{ sender: 'user' | 'bot'; text: string }>>([
    { sender: 'bot', text: 'Molo! I am your Pretoria-calibrated Beauty Advisor. Would you like help matching your skin undertone to our Shade #01 - #12 formulas?' }
  ]);
  const [isBotTyping, setIsBotTyping] = useState(false);

  // Add Product to Cart standard implementation
  const handleAddToCart = (product: Product, shade?: { id: string; name: string; hex: string }) => {
    setCart((prevCart) => {
      // Find matching item by ID and exact shade ID to avoid stacking different colors
      const existingProductIndex = prevCart.findIndex(
        (item) => item.product.id === product.id && item.selectedShade?.id === shade?.id
      );

      if (existingProductIndex > -1) {
        const updatedCart = [...prevCart];
        updatedCart[existingProductIndex].quantity += 1;
        return updatedCart;
      } else {
        return [...prevCart, { product, quantity: 1, selectedShade: shade }];
      }
    });
    setIsCartOpen(true);
  };

  // Direct custom buy trigger
  const handleDirectAdd = (title: string, price: number, image: string) => {
    const virtualProduct: Product = {
      id: `virtual-${Date.now()}`,
      name: title,
      price: price,
      category: 'Face',
      description: 'Pretoria Premium Cosmetics curated routine bundle set.',
      image: image,
      rating: 5.0
    };
    handleAddToCart(virtualProduct);
  };

  const handleUpdateQuantity = (productId: string, newQty: number, shadeId?: string) => {
    if (newQty <= 0) {
      handleRemoveItem(productId, shadeId);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.product.id === productId && item.selectedShade?.id === shadeId
          ? { ...item, quantity: newQty }
          : item
      )
    );
  };

  const handleRemoveItem = (productId: string, shadeId?: string) => {
    setCart((prevCart) =>
      prevCart.filter(
        (item) => !(item.product.id === productId && item.selectedShade?.id === shadeId)
      )
    );
  };

  const handleClearCart = () => {
    setCart([]);
  };

  // Catalog filtering
  const filteredProducts = selectedCategory === 'All'
    ? PRODUCTS
    : PRODUCTS.filter(p => p.category === selectedCategory);

  // AI chatbot questions triggers
  const chatOptions = [
    "Which shade is best for honey warm undertones?",
    "Are these products safe for hyper-sensitive eczema skin?",
    "Where in Pretoria are you located?",
    "Do you offer professional makeup artist discount packages?"
  ];

  const handleChatQuestion = (question: string) => {
    setChatMessages(prev => [...prev, { sender: 'user', text: question }]);
    setIsBotTyping(true);

    setTimeout(() => {
      let botText = "";
      if (question.includes("honey")) {
        botText = "For rich honey golden undertones, we highly recommend Shade #04 (Highveld Honey) or Shade #05 (Namib Dusk). They blend perfectly under bright sunlight with zero chalkiness!";
      } else if (question.includes("sensitive")) {
        botText = "Absolutely! All Profuse products are 100% talc-free, hypoallergenic, and formulated with soothing African botanicals like Kalahari melon seed oil to nourish dry, eczema-prone skin.";
      } else if (question.includes("Pretoria")) {
        botText = "Our boutique flagship studio is located right inside Brooklyn, Pretoria (329 Cherry Lane). This is where Marcia Kgaphola holds her Saturday masterclass workshops!";
      } else {
        botText = "Yes! Professional MUAs get an immediate 15% discount on all bulk orders. Sign up in our Pro Affiliate Hub above to claim your unique tracking commission link instantly.";
      }

      setChatMessages(prev => [...prev, { sender: 'bot', text: botText }]);
      setIsBotTyping(false);
    }, 1200);
  };

  const handleNewsletterSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    setNewsletterSuccess(true);
    setNewsletterEmail('');
    setTimeout(() => setNewsletterSuccess(false), 3000);
  };

  const cartItemsCount = cart.reduce((acc, curr) => acc + curr.quantity, 0);

  return (
    <div className="min-h-screen bg-[#FDFBF7] dark:bg-[#120A0B] text-[#1E1214] dark:text-[#FBF8F6] font-sans antialiased selection:bg-pink-100 transition-colors duration-500 overflow-x-hidden relative">
      
      {/* 1. Header component overlay */}
      <Header
        cartItemsCount={cartItemsCount}
        onCartClick={() => setIsCartOpen(true)}
        onBookWorkshopClick={() => setIsWorkshopOpen(true)}
        onVirtualTryOnClick={() => setIsVirtualTryOnOpen(true)}
        isDarkMode={isDarkMode}
        toggleDarkMode={() => setIsDarkMode(!isDarkMode)}
      />

      {/* 2. Hero Section containing 3D Interactive Parallax Layer */}
      <Hero
        onVirtualTryOnClick={() => setIsVirtualTryOnOpen(true)}
        onExploreStoryClick={() => {
          const catElement = document.getElementById('formula-catalog');
          if (catElement) catElement.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* 3. Section Divider with text scroll */}
      <div className="w-full bg-[#1E1214] dark:bg-[#FAF7F2] py-4 overflow-hidden relative border-y border-[#1E1214]/10 select-none">
        <div className="flex whitespace-nowrap gap-12 text-[10px] md:text-xs tracking-widest uppercase font-bold text-[#F9EBE6] dark:text-[#1E1214] animate-pulse">
          <span>🛡️ Dermatologically Approved • Cruelty Free</span>
          <span>✨ 12-Tone South African skin tones calibrated</span>
          <span>🇿🇦 Designed and engineered in Pretoria Brooklyn</span>
          <span>🔥 R350 3-in-1 Prime Foundation Liquid Mat</span>
          <span>🛡️ Dermatologically Approved • Cruelty Free</span>
          <span>✨ 12-Tone South African skin tones calibrated</span>
        </div>
      </div>

      {/* 4. Asymmetrical Bento Grid containing Routine Shade matches & Glide powder sweep */}
      <BentoGrid
        onAddToCart={handleAddToCart}
        onBookWorkshopClick={() => setIsWorkshopOpen(true)}
      />

      {/* 5. Formula Catalog selection filter wrapper */}
      <section id="formula-catalog" className="py-24 bg-[#FDFBF7] dark:bg-[#150D0E] border-t border-stone-200/50 dark:border-white/5 transition-colors duration-500">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          
          {/* Header Title Grid */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-pink-700 dark:text-pink-300">Profuse Beauty Shop</span>
              <h3 className="text-2xl md:text-4xl font-sans font-medium text-[#1E1214] dark:text-white mt-1">
                The Masterlist Catalog
              </h3>
              <p className="text-xs text-stone-500 dark:text-gray-400 mt-1 max-w-sm">
                Explore our professional formulas, calibrated to resist shine under South African daylight.
              </p>
            </div>

            {/* Filter buttons pills */}
            <div className="flex flex-wrap gap-2">
              {['All', 'Face', 'Lips', 'Setting', 'Accessories'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-full text-xs font-semibold cursor-pointer transition-all ${
                    selectedCategory === cat
                      ? 'bg-[#1E1214] dark:bg-[#F9EBE6] text-white dark:text-[#1E1214] scale-102 shadow-md'
                      : 'bg-[#FAF7F2] dark:bg-white/5 hover:bg-stone-150 border border-stone-200/60 dark:border-white/10 text-stone-700 dark:text-gray-300'
                  }`}
                >
                  {cat === 'All' ? 'All formulas' : cat}
                </button>
              ))}
            </div>
          </div>

          {/* Actual Catalog Products list */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map((p) => (
              <div
                key={p.id}
                className="group bg-white dark:bg-[#201315] rounded-[24px] border border-stone-200/50 dark:border-white/5 p-4 flex flex-col justify-between shadow-sm hover:translate-y-[-4px] hover:shadow-xl transition-all duration-300 relative overflow-hidden"
              >
                {/* Visual Preview */}
                <div className="relative aspect-square rounded-2xl overflow-hidden bg-stone-50 shrink-0 border border-stone-100">
                  <img src={p.image} alt={p.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute top-3 right-3 bg-white/80 dark:bg-black/80 backdrop-blur-sm shadow-sm rounded-full p-1.5 text-rose-500 hover:scale-105 active:scale-95 duration-150 cursor-pointer">
                    <Heart size={14} fill="currentColor" />
                  </div>
                </div>

                {/* Info Text block */}
                <div className="mt-4 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest block mb-0.5">
                      {p.category} • {p.volume}
                    </span>
                    <h4 className="text-sm font-semibold text-[#1E1214] dark:text-white group-hover:text-pink-700 dark:group-hover:text-pink-300 transition-colors line-clamp-1">
                      {p.name}
                    </h4>
                    <p className="text-[11px] text-gray-500 dark:text-gray-300 mt-1 line-clamp-2 leading-relaxed">
                      {p.description}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-stone-50 dark:border-white/5 flex items-center justify-between">
                    <div>
                      <span className="block text-base font-serif font-black text-[#1E1214] dark:text-white">R{p.price}.00</span>
                      <span className="block text-[9px] text-gray-400">VAT incl. SA delivery option</span>
                    </div>

                    <button
                      onClick={() => handleAddToCart(p, p.shades ? p.shades[8] : undefined)}
                      className="bg-[#1E1214] dark:bg-[#F9EBE6] text-white dark:text-[#1E1214] hover:opacity-90 py-2.5 px-4 rounded-full text-[11px] font-bold transition-transform cursor-pointer hover:scale-102 active:scale-98"
                    >
                      Quick Buy
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 6. Trust Bridge Section exhibiting vertical videos and line drawing badges */}
      <TrustBridge
        onOpenVideo={(v) => setActiveVideo(v)}
        onOpenShadeMatcher={() => setIsVirtualTryOnOpen(true)}
      />

      {/* 7. Pro MUA Affiliate CTA / Live Social Feed section */}
      <section className="py-20 bg-[#FAF7F2] dark:bg-[#1D1113] border-t border-stone-200/50 dark:border-white/5 transition-colors duration-500">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <span className="text-xs font-bold uppercase tracking-widest text-[#1E1214]/60 dark:text-[#F9EBE6]/60 block mb-2">Connect with Pretoria Beauty</span>
          <h2 className="text-2xl md:text-3xl font-serif italic font-bold">#ProfuseBeauty_rsa</h2>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 max-w-md mx-auto leading-relaxed">
            Tag us in your Pretoria Bridal routines or early school drops to get featured across our Instagram and TikTok stories directly!
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8">
            <div className="rounded-2xl overflow-hidden aspect-square border border-white/20">
              <img src="https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&q=80&w=300" alt="Cosmetic tube swatch" className="w-full h-full object-cover" />
            </div>
            <div className="rounded-2xl overflow-hidden aspect-square border border-white/20">
              <img src="https://images.unsplash.com/photo-1515688594390-b649af70d282?auto=format&fit=crop&q=80&w=300" alt="Lipstick cosmetic" className="w-full h-full object-cover" />
            </div>
            <div className="rounded-2xl overflow-hidden aspect-square border border-white/20">
              <img src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=300" alt="MUA brush palette" className="w-full h-full object-cover" />
            </div>
            <div className="rounded-2xl overflow-hidden aspect-square border border-white/20">
              <img src="https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&q=80&w=300" alt="Beauty cosmetic model" className="w-full h-full object-cover" />
            </div>
          </div>
          
          <button
            onClick={() => window.open('https://instagram.com/profusebeauty_rsa', '_blank')}
            className="mt-8 inline-flex items-center gap-2 border border-pink-700/20 text-pink-750 font-bold text-xs py-2.5 px-6 rounded-full bg-pink-500/5 hover:bg-pink-500/10 cursor-pointer"
          >
            Launch Live Instagram Story Feed
          </button>
        </div>
      </section>

      {/* 8. Newsletter & Lead Generation */}
      <section className="py-24 bg-[#1E1214] text-[#F9EBE6] relative overflow-hidden text-center md:text-left select-none border-t border-[#1E1214]/20">
        <div className="absolute top-0 right-0 w-80 h-80 bg-pink-700/10 blur-3xl rounded-full" />
        <div className="max-w-5xl mx-auto px-6 relative z-10 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          
          <div className="md:col-span-7">
            <span className="text-[10px] bg-white/10 text-pink-200 font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
              Exclusive Pretoria Club
            </span>
            <h3 className="text-2xl md:text-3xl font-sans font-medium mt-1 leading-tight text-white">Join the Profuse Collective</h3>
            <p className="text-xs text-stone-400 mt-2 max-w-md leading-relaxed">
              Get an instant 10% discount coupon configured specifically for your first cosmetics purchase. Receive Pretoria masterclass invites, shade alerts, and cruelty-free advice.
            </p>
          </div>

          <div className="md:col-span-5">
            {!newsletterSuccess ? (
              <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
                <input
                  type="email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Insert email address"
                  required
                  className="bg-white/5 border border-white/15 rounded-xl py-3 px-4 text-xs text-white placeholder-gray-500 font-medium focus:outline-none focus:border-pink-500 flex-1"
                />
                <button
                  type="submit"
                  className="bg-[#F9EBE6] text-[#1E1214] font-bold py-3 px-5 rounded-xl text-xs flex items-center gap-1 cursor-pointer hover:bg-white active:scale-95 duration-150"
                >
                  Join List <ArrowRight size={13} />
                </button>
              </form>
            ) : (
              <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-4 text-center text-emerald-300 font-bold text-xs flex items-center justify-center gap-1.5 animate-scaleIn">
                <Check size={14} className="text-emerald-400" />
                10% Discount Code "PROFUSE10" Sent to Inbox!
              </div>
            )}
          </div>

        </div>
      </section>

      {/* 9. Human Footer with detailed SA indicators */}
      <footer className="bg-[#FAF7F2] dark:bg-[#120A0B] py-16 px-6 md:px-12 border-t border-stone-200/60 dark:border-white/5 transition-colors duration-500 pb-28 md:pb-16 text-left">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-10">
          
          <div className="md:col-span-4 space-y-4">
            <span className="font-serif italic text-2xl font-bold tracking-tight text-[#1E1214] dark:text-[#F9EBE6]">Profuse Beauty</span>
            <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
              Premium South African cosmetics celebrating diverse beauty, confidence, and lifecycle paths. Engineered for sensitive skin, cruelty-free, and proudly South African since 2019.
            </p>
            <div className="text-xs text-gray-500 font-medium">
              📍 Brooklyn boutique flag: 329 Cherry Lane, Brooklyn, Pretoria, 0181
            </div>
            <div className="text-xs text-gray-500 font-medium">
              📞 Direct Call / WhatsApp: <a href="tel:+27812355910" className="text-pink-600 hover:underline">+27 81 235 5910</a>
            </div>
          </div>

          <div className="md:col-span-5 grid grid-cols-2 gap-4">
            <div>
              <h5 className="text-[10px] font-bold uppercase tracking-widest text-[#1E1214]/60 dark:text-[#F9EBE6]/60">Useful Links</h5>
              <div className="flex flex-col gap-2 mt-3 text-xs text-gray-500 dark:text-gray-400">
                <a href="#formula-section" className="hover:text-[#1E1214] transition-colors">The Formula</a>
                <a href="#studio-section" className="hover:text-[#1E1214] transition-colors">Virtual Studio VTO</a>
                <a href="#workshops-section" className="hover:text-[#1E1214] transition-colors">Saturday coaching Workshops</a>
                <a href="#story-section" className="hover:text-[#1E1214] transition-colors">Ambassador Stories</a>
              </div>
            </div>

            <div>
              <h5 className="text-[10px] font-bold uppercase tracking-widest text-[#1E1214]/60 dark:text-[#F9EBE6]/60">E-Commerce Security</h5>
              <div className="flex flex-col gap-2 mt-3 text-xs text-gray-500 dark:text-gray-400">
                <span className="text-emerald-600 font-bold block">✓ Paystack SECURE SSL</span>
                <span className="text-emerald-600 font-bold block">✓ Ozow INSTANT EFT verified</span>
                <span className="block text-gray-400">Aramex / Courier Guy dispatching</span>
                <span className="block text-gray-400">30-Day Hassle-Free Returns</span>
              </div>
            </div>
          </div>

          <div className="md:col-span-3 space-y-4">
            <h5 className="text-[10px] font-bold uppercase tracking-widest text-[#1E1214]/60 dark:text-[#F9EBE6]/60">Regulatory Credentials</h5>
            <div className="bg-white dark:bg-[#1E1214]/60 p-3.5 rounded-2xl border border-stone-200/50 dark:border-white/10 text-[10px] text-gray-500 dark:text-gray-400">
              Profuse Cosmetics is fully POPIA-compliant. We respect physical shade biometrics during WebGL Virtual Try-On analysis. No camera records are uploaded or shared.
            </div>
            <p className="text-[10px] text-gray-400 mt-2">
              © 2026 Profuse Beauty (Pty) Ltd. Built with absolute modern performance standards. All rights reserved.
            </p>
          </div>

        </div>
      </footer>


      {/* 10. Floating Expandable AI "Pretoria Advisor" Chatbot Drawer */}
      <div className="fixed bottom-24 right-6 md:bottom-6 z-40">
        
        {!isChatOpen ? (
          <button
            onClick={() => setIsChatOpen(true)}
            className="flex items-center gap-2 bg-[#1E1214] dark:bg-[#F9EBE6] text-white dark:text-[#1E1214] py-3.5 px-6 rounded-full shadow-2xl hover:scale-105 active:scale-95 duration-200 cursor-pointer border border-white/10 font-bold text-xs"
          >
            <MessageSquare size={16} className="text-pink-400 dark:text-pink-700 animate-pulse" />
            <span>Chat MUA Advisor</span>
          </button>
        ) : (
          <div className="bg-white dark:bg-[#1E1214] border border-stone-200 dark:border-white/10 rounded-3xl w-80 h-96 flex flex-col justify-between shadow-2xl overflow-hidden animate-scaleIn">
            
            {/* Chat header */}
            <div className="bg-[#1E1214] text-white p-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
                <div>
                  <h4 className="text-xs font-black uppercase tracking-wider">MUA Advisory Chat</h4>
                  <span className="text-[9px] text-gray-400">Online • Brooklyn Studio</span>
                </div>
              </div>
              <button onClick={() => setIsChatOpen(false)} className="text-gray-400 hover:text-white cursor-pointer">
                <X size={15} />
              </button>
            </div>

            {/* Message feed stream */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-[#FAF7F2]/60 dark:bg-black/10 text-xs">
              {chatMessages.map((msg, idx) => (
                <div 
                  key={idx} 
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'} animate-fadeIn`}
                >
                  <div className={`p-3 rounded-2xl max-w-[85%] text-left ${
                    msg.sender === 'user'
                      ? 'bg-pink-700 text-white rounded-br-none shadow-sm'
                      : 'bg-white dark:bg-stone-900 border border-stone-200/50 dark:border-white/5 text-[#1E1214] dark:text-gray-300 rounded-bl-none'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              {isBotTyping && (
                <div className="flex justify-start">
                  <div className="bg-white dark:bg-stone-900 p-2.5 rounded-2xl border border-stone-200/50 rounded-bl-none italic text-gray-400 text-[10px]">
                    Advisor typing recipe...
                  </div>
                </div>
              )}
            </div>

            {/* Quick interactive prompts choice list */}
            <div className="p-2.5 border-t border-stone-100 dark:border-white/5 space-y-1.5 bg-white dark:bg-stone-950">
              <div className="text-[9px] text-gray-400 font-bold uppercase text-left mb-1 px-1">Interactive Advisor Queries</div>
              <div className="flex flex-col gap-1 max-h-24 overflow-y-auto pr-1">
                {chatOptions.map((opt, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleChatQuestion(opt)}
                    className="text-[10px] text-stone-700 dark:text-gray-300 hover:text-pink-700 bg-stone-50 dark:bg-white/5 border border-stone-200/40 dark:border-white/5 rounded-lg py-1 px-2 text-left cursor-pointer truncate"
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>

          </div>
        )}

      </div>


      {/* 11. Persistent thumb-friendly mobile bottom menu dock */}
      <MobileBottomNav
        onHomeClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        onExploreProductsClick={() => {
          const catElement = document.getElementById('formula-catalog');
          if (catElement) catElement.scrollIntoView({ behavior: 'smooth' });
        }}
        onCartClick={() => setIsCartOpen(true)}
        wishlistCount={cartItemsCount}
      />

      {/* 12. Virtual Shade Try-On WebGL simulator Modal popup */}
      <VirtualTryOnModal
        isOpen={isVirtualTryOnOpen}
        onClose={() => setIsVirtualTryOnOpen(false)}
        onApplyShade={(shade) => {
          setActiveAppliedShade(shade);
          // Auto add chosen shade in simulator to cart for customer delight
          handleAddToCart(PRODUCTS[0], shade);
        }}
      />

      {/* 13. Smartphone vertical review video Lightbox Modal */}
      <VideoLightboxModal
        isOpen={activeVideo !== null}
        video={activeVideo}
        onClose={() => setActiveVideo(null)}
        onAddToCart={handleDirectAdd}
      />

      {/* 14. Saturday masterclass workshops reservation modal */}
      <WorkshopModal
        isOpen={isWorkshopOpen}
        onClose={() => setIsWorkshopOpen(false)}
      />

      {/* 15. Transaction slide-out Cart Drawer with Paystack & Ozow simulation */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />

    </div>
  );
}
