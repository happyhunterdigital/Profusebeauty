import React, { useState } from 'react';
import { 
  User, ShoppingBag, Gift, Heart, MapPin, LogOut, Share2, Copy, Check
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface UserDashboardProps {
  onLogout: () => void;
}

export default function UserDashboard({ onLogout }: UserDashboardProps) {
  const [activeTab, setActiveTab] = useState('Affiliate Program');
  const [copied, setCopied] = useState(false);
  const [hasGeneratedLink, setHasGeneratedLink] = useState(false);

  const tabs = [
    { id: 'My Orders', icon: ShoppingBag },
    { id: 'ClubCard Points', icon: Gift },
    { id: 'Affiliate Program', icon: Share2 },
    { id: 'Wishlist', icon: Heart },
    { id: 'Addresses', icon: MapPin },
  ];

  const handleCopyLink = () => {
    navigator.clipboard.writeText('profusebeauty.com/?ref=SARAH10');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#fcf8f0] flex">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-zinc-200 text-black flex flex-col shadow-xl z-20">
        <div className="p-6">
          <h2 className="text-2xl font-black text-[#0a0a0a] tracking-tighter">SARAH M.</h2>
          <p className="text-xs text-zinc-500 font-mono tracking-widest uppercase mt-1">Customer Profile</p>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 font-bold text-sm ${
                  isActive 
                    ? 'bg-[#0a0a0a] text-[#d4af37]' 
                    : 'text-zinc-500 hover:bg-zinc-100 hover:text-black'
                }`}
              >
                <Icon className="w-5 h-5" />
                {tab.id}
              </button>
            );
          })}
        </nav>

        <div className="p-4 border-t border-zinc-200">
          <button 
            onClick={onLogout}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 hover:bg-red-50 text-zinc-500 hover:text-red-500 rounded-xl transition-colors font-bold text-sm"
          >
            <LogOut className="w-4 h-4" /> Sign Out
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Top Header */}
        <header className="bg-white px-8 py-5 flex items-center justify-between shadow-sm z-10 border-b border-zinc-200">
          <h1 className="text-2xl font-extrabold text-[#0a0a0a]">{activeTab}</h1>
        </header>

        {/* Dynamic Content */}
        <main className="flex-1 overflow-y-auto p-8 bg-[#fcf8f0]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {activeTab === 'Affiliate Program' && (
                <div className="space-y-6 max-w-3xl">
                  {/* Earnings Banner */}
                  <div className="bg-[#0a0a0a] text-white p-8 rounded-3xl shadow-xl border border-[#d4af37]/30 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-8 opacity-10">
                      <Share2 className="w-32 h-32 text-[#d4af37]" />
                    </div>
                    <div className="relative z-10">
                      <h2 className="text-[#d4af37] font-bold tracking-widest text-sm mb-2 uppercase">Your Referral Earnings</h2>
                      <p className="text-5xl font-black mb-6">R 180<span className="text-lg text-zinc-400 font-normal">.00</span></p>
                      
                      {/* Payout Progress */}
                      <div className="space-y-2">
                        <div className="flex justify-between text-xs font-bold text-zinc-400">
                          <span>R0</span>
                          <span className="text-[#d4af37]">Min Payout: R200</span>
                        </div>
                        <div className="w-full h-2 bg-zinc-800 rounded-full overflow-hidden">
                          <div className="h-full bg-[#d4af37] w-[90%] rounded-full"></div>
                        </div>
                        <p className="text-xs text-zinc-500 mt-2">You need R20 more to reach the minimum payout threshold.</p>
                      </div>
                    </div>
                  </div>

                  {/* Referral Link Generator */}
                  <div className="bg-white p-8 rounded-3xl shadow-sm border border-zinc-200">
                    <h3 className="font-bold text-xl text-[#0a0a0a] mb-2">Invite Friends, Earn Cash</h3>
                    <p className="text-zinc-500 text-sm mb-6">Share your unique link. When someone buys using it, they get 10% off their cart, and you earn a cash commission!</p>
                    
                    {!hasGeneratedLink ? (
                      <button 
                        onClick={() => setHasGeneratedLink(true)}
                        className="bg-[#0a0a0a] text-[#d4af37] font-bold px-6 py-3 rounded-xl hover:bg-[#d4af37] hover:text-[#0a0a0a] transition-colors"
                      >
                        Generate Referral Link
                      </button>
                    ) : (
                      <div className="flex items-center gap-4">
                        <div className="flex-1 bg-zinc-100 p-4 rounded-xl font-mono text-sm text-zinc-600 border border-zinc-200 truncate">
                          profusebeauty.com/?ref=SARAH10
                        </div>
                        <button 
                          onClick={handleCopyLink}
                          className="flex items-center gap-2 bg-[#d4af37] text-[#0a0a0a] font-bold px-6 py-4 rounded-xl hover:bg-yellow-500 transition-colors"
                        >
                          {copied ? <><Check className="w-4 h-4" /> Copied</> : <><Copy className="w-4 h-4" /> Copy Link</>}
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {activeTab === 'My Orders' && (
                <div className="bg-white p-8 rounded-3xl shadow-sm border border-zinc-200 text-center text-zinc-500">
                  You have no past orders.
                </div>
              )}

              {activeTab === 'ClubCard Points' && (
                <div className="bg-white p-8 rounded-3xl shadow-sm border border-zinc-200 text-center text-zinc-500">
                  <Gift className="w-12 h-12 mx-auto text-zinc-300 mb-4" />
                  <p>You have 0 points.</p>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
