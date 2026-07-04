// File: src/App.tsx
import React, { useState, useEffect } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { Product, CartItem } from './types';
import { products } from './data';
import Header from './components/Header';
import Hero from './components/Hero'; // Reverted import path pointing directly to Hero.tsx
import SalesSection from './components/SalesSection';
import BentoGrid from './components/BentoGrid';
import ProductStore from './components/ProductStore';
import MobileBottomNav from './components/MobileBottomNav';
import CartDrawer from './components/CartDrawer';
import ChatbotDrawer from './components/ChatbotDrawer';
import TrustBridge from './components/TrustBridge';
import VideoLightboxModal from './components/VideoLightboxModal';
import VirtualTryOnModal from './components/VirtualTryOnModal';
import WorkshopModal from './components/WorkshopModal';
import Testimonials from './components/Testimonials';
import LipsCollection from './components/LipsCollection';
import AdminDashboard from './components/AdminDashboard';
import UserDashboard from './components/UserDashboard';
import BlogArchive from './components/BlogArchive';
import BlogPostView from './components/BlogPostView';

const Footer: React.FC<{ isDarkMode: boolean }> = ({ isDarkMode }) => {
  return (
    <footer className="bg-black border-t border-zinc-900 pt-16 pb-8 text-zinc-500 text-xs mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-12 gap-12 pb-12 border-b border-zinc-900">
        <div className="md:col-span-3 space-y-4">
          <h4 className="font-serif text-[#fbbf24] uppercase tracking-wider text-xs font-bold">About Us</h4>
          <p className="leading-relaxed text-[11px]">
            Profuse Beauty is a premium South African cosmetics brand formulated by professional makeup artists to provide high-definition, hypoallergenic coverage.
          </p>
          <div className="space-y-1 font-mono text-[10px]">
            <p>✉️ Email: info@profusebeauty.co.za</p>
            <p>📞 Phone: 081 235 5910</p>
          </div>
        </div>

        <div className="md:col-span-3 space-y-4">
          <h4 className="font-serif text-[#fbbf24] uppercase tracking-wider text-xs font-bold">Our Services</h4>
          <ul className="space-y-2 text-[11px]">
            <li><a href="#bento-modules" className="hover:text-white transition-colors">Make-up Workshops</a></li>
            <li><span className="text-gray-600">Conditions of Sales</span></li>
            <li><span className="text-gray-600">Privacy Policy (POPIA compliant)</span></li>
            <li><span className="text-gray-600">Returns & Refunds</span></li>
          </ul>
        </div>

        <div className="md:col-span-3 space-y-4">
          <h4 className="font-serif text-[#fbbf24] uppercase tracking-wider text-xs font-bold">Useful Links</h4>
          <ul className="space-y-2 text-[11px]">
            <li><span className="text-gray-600">Fast Shipping (3PL partners)</span></li>
            <li><span className="text-gray-600">Secure Payments (Paystack & Ozow)</span></li>
            <li><span className="text-gray-600">30-Day Return Policy</span></li>
            <li><span className="text-gray-600">Business Development</span></li>
          </ul>
        </div>

        <div className="md:col-span-3 space-y-4">
          <h4 className="font-serif text-[#fbbf24] uppercase tracking-wider text-xs font-bold">Get 10% Off</h4>
          <p className="leading-relaxed text-[11px]">Subscribe for instant access to pro-MUA kit drops and safety diagnostics.</p>
          <div className="flex">
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="bg-zinc-900 border border-zinc-800 p-2 text-xs text-white outline-none w-full"
            />
            <button 
              onClick={() => alert("Check your inbox for your 10% discount code!")}
              className="bg-[#fbbf24] text-black font-bold px-3 py-2 text-xs tracking-wider uppercase"
            >
              Join
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 flex flex-col md:flex-row justify-between items-center text-[10px] text-zinc-600 space-y-4 md:space-y-0">
        <span>🔒 Secure Cloudflare SSL active Turnstile protection.</span>
        <div className="text-center">
          <p>Copyright © 2025 Profuse Beauty Cosmetics. Created by HappyHunterDigital.com</p>
          <div className="space-x-2 mt-1">
            <span className="hover:text-white cursor-pointer">Privacy Policy</span>
            <span>|</span>
            <span className="hover:text-white cursor-pointer">Terms & Conditions</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default function App() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

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
  const [currentPath, setCurrentPath] = useState<string>(window.location.pathname);
  const [isAdminAuth, setIsAdminAuth] = useState<boolean>(false);
  const [isUserAuth, setIsUserAuth] = useState<boolean>(true); // Mock user logged in

  useEffect(() => {
    try {
      const saved = localStorage.getItem('profuse_beauty_cart');
      if (saved) setCart(JSON.parse(saved));
      
      // Affiliate Tracking Interceptor
      const params = new URLSearchParams(window.location.search);
      const refCode = params.get('ref');
      if (refCode) {
        // Store referral code for 30 days
        const expirationDate = new Date();
        expirationDate.setDate(expirationDate.getDate() + 30);
        localStorage.setItem('profuse_beauty_affiliate_ref', JSON.stringify({
          code: refCode.toUpperCase(),
          expires: expirationDate.getTime()
        }));
        // Optional: clean up the URL without reloading
        window.history.replaceState({}, document.title, window.location.pathname);
      }
    } catch (e) {
      console.warn("Storage sync offline fallback activated.", e);
    }
  }, []);

  const saveCart = (newCart: CartItem[]) => {
    setCart(newCart);
    try {
      localStorage.setItem('profuse_beauty_cart', JSON.stringify(newCart));
    } catch (e) {
      console.warn("Storage write offline bypass triggered.", e);
    }
  };

  const handleAddToCart = (product: Product, shade: string | null = null, qtyToAdd: number = 1): void => {
    const itemKey = shade ? `${product.id}-${shade}` : product.id;
    const existing = cart.find(item => item.cartKey === itemKey);
    let updated;
    if (existing) {
      updated = cart.map(item => item.cartKey === itemKey ? { ...item, qty: item.qty + qtyToAdd } : item);
    } else {
      updated = [...cart, { ...product, cartKey: itemKey, selectedShade: shade, qty: qtyToAdd }];
    }
    saveCart(updated);
    setIsCartOpen(true);
  };

  const handleUpdateQty = (cartKey: string, delta: number): void => {
    const updated = cart.map(item => {
      if (item.cartKey === cartKey) {
        const nextQty = item.qty + delta;
        return nextQty > 0 ? { ...item, qty: nextQty } : null;
      }
      return item;
    }).filter((item): item is CartItem => item !== null);
    saveCart(updated);
  };

  const isLipsPath = currentPath === '/lip' || currentPath === '/lip/' || activeTab === 'Lips';
  const isAdminPath = currentPath === '/admin' || currentPath === '/admin/';
  const isProfilePath = currentPath === '/profile' || currentPath === '/profile/';

  if (isAdminPath) {
    if (!isAdminAuth) {
      return (
        <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-4">
          <div className="bg-white p-8 rounded-2xl max-w-sm w-full text-center space-y-6">
            <h2 className="text-2xl font-black">Admin Access</h2>
            <p className="text-sm text-zinc-500">Please authenticate to access the portal.</p>
            <button 
              onClick={() => setIsAdminAuth(true)}
              className="w-full bg-[#d4af37] text-black font-bold py-3 rounded-xl hover:bg-[#b8960f] transition-colors"
            >
              Mock Login (Dev)
            </button>
            <button 
              onClick={() => {
                setCurrentPath('/');
                window.history.pushState({}, '', '/');
              }}
              className="w-full bg-zinc-100 text-zinc-600 font-bold py-3 rounded-xl hover:bg-zinc-200 transition-colors mt-2"
            >
              Return to Store
            </button>
          </div>
        </div>
      );
    }
    return <AdminDashboard onLogout={() => {
      setIsAdminAuth(false);
      setCurrentPath('/');
      window.history.pushState({}, '', '/');
    }} />;
  }

  if (isProfilePath) {
    if (!isUserAuth) {
      return (
        <div className="min-h-screen bg-[#fcf8f0] flex items-center justify-center p-4">
          <div className="bg-white p-8 rounded-2xl max-w-sm w-full text-center space-y-6 shadow-sm border border-zinc-200">
            <h2 className="text-2xl font-black text-[#0a0a0a]">Customer Login</h2>
            <p className="text-sm text-zinc-500">Log in to view your profile and generated links.</p>
            <button 
              onClick={() => setIsUserAuth(true)}
              className="w-full bg-[#0a0a0a] text-[#d4af37] font-bold py-3 rounded-xl hover:bg-black transition-colors"
            >
              Log In
            </button>
            <button 
              onClick={() => {
                setCurrentPath('/');
                window.history.pushState({}, '', '/');
              }}
              className="w-full bg-zinc-100 text-zinc-600 font-bold py-3 rounded-xl hover:bg-zinc-200 transition-colors mt-2"
            >
              Back to Store
            </button>
          </div>
        </div>
      );
    }
    return <UserDashboard onLogout={() => {
      setIsUserAuth(false);
      setCurrentPath('/');
      window.history.pushState({}, '', '/');
    }} />;
  }

  const isBlogArchivePath = currentPath === '/blog' || currentPath === '/blog/';
  const isBlogPostPath = currentPath.startsWith('/blog/') && currentPath.length > 6;
  const blogSlug = isBlogPostPath ? currentPath.split('/blog/')[1].replace(/\/$/, '') : '';

  if (isBlogArchivePath) {
    return <BlogArchive onPostClick={(slug) => {
      setCurrentPath(`/blog/${slug}`);
      window.history.pushState({}, '', `/blog/${slug}`);
      window.scrollTo(0, 0);
    }} />;
  }

  if (isBlogPostPath) {
    return <BlogPostView slug={blogSlug} onBack={() => {
      setCurrentPath('/blog');
      window.history.pushState({}, '', '/blog');
      window.scrollTo(0, 0);
    }} />;
  }

  return (
    <div className={isLipsPath ? "bg-black" : (isDarkMode 
      ? "bg-[#0A0A0F] text-[#F5F5F5] selection:bg-[#fbbf24]/30 selection:text-white font-sans transition-colors duration-500 min-h-screen relative overflow-x-hidden"
      : "bg-[#FDFBF7] text-[#1E1214] selection:bg-[#2E1A1C]/20 selection:text-[#1E1214] font-sans transition-colors duration-500 min-h-screen relative overflow-x-hidden"
    )}>
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#d4af37] to-[#f3e5ab] origin-left z-[100] shadow-[0_0_10px_rgba(212,175,55,0.5)]" 
        style={{ scaleX }} 
      />
      <Header 
        isDarkMode={isDarkMode} 
        setIsDarkMode={setIsDarkMode} 
        cartCount={cart.reduce((sum, i) => sum + i.qty, 0)} 
        onCartOpen={() => setIsCartOpen(true)}
        onVTOOpen={() => setIsVTOOpen(true)}
        activeTab={activeTab}
        setActiveTab={(tab) => {
          setActiveTab(tab);
          if (tab === 'Lips') {
            setCurrentPath('/lip/');
            window.history.pushState({}, '', '/lip/');
          } else {
            setCurrentPath('/');
            window.history.pushState({}, '', '/');
          }
        }}
      />

      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 space-y-20">
        {activeTab === 'Shop' ? (
          <ProductStore 
            isDarkMode={isDarkMode} 
            onAddToCart={handleAddToCart}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
        ) : isLipsPath ? (
          <LipsCollection isDarkMode={isDarkMode} onAddToCart={handleAddToCart} />
        ) : (
          <>
            <Hero isDarkMode={isDarkMode} onVTOOpen={() => setIsVTOOpen(true)} />
            <SalesSection isDarkMode={isDarkMode} onAddToCart={handleAddToCart} />
            <BentoGrid 
              isDarkMode={isDarkMode}
              onAddToCart={handleAddToCart}
              onWorkshopOpen={() => setIsWorkshopOpen(true)}
              onVideoOpen={() => setIsVideoOpen(true)}
              onChatbotOpen={() => setIsChatbotOpen(true)}
            />
            <Testimonials isDarkMode={isDarkMode} />
            <TrustBridge isDarkMode={isDarkMode} />
          </>
        )}
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
