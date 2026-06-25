import React, { useState } from 'react';
import { 
  LayoutDashboard, Package, ShoppingCart, Settings, 
  Users, LogOut, Search, Plus, Edit2, Trash2 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface AdminDashboardProps {
  onLogout: () => void;
}

export default function AdminDashboard({ onLogout }: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState('Overview');

  const tabs = [
    { id: 'Overview', icon: LayoutDashboard },
    { id: 'Products', icon: Package },
    { id: 'Orders', icon: ShoppingCart },
    { id: 'Customers', icon: Users },
    { id: 'Settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-[#fcf8f0] flex">
      {/* Sidebar */}
      <div className="w-64 bg-[#0a0a0a] text-white flex flex-col shadow-2xl z-20">
        <div className="p-6">
          <h2 className="text-2xl font-black text-[#d4af37] tracking-tighter">ADMIN</h2>
          <p className="text-xs text-zinc-500 font-mono tracking-widest uppercase mt-1">Profuse Portal</p>
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
                    ? 'bg-[#d4af37] text-[#0a0a0a] shadow-[0_4px_14px_rgba(212,175,55,0.4)]' 
                    : 'text-zinc-400 hover:bg-zinc-900 hover:text-white'
                }`}
              >
                <Icon className="w-5 h-5" />
                {tab.id}
              </button>
            );
          })}
        </nav>

        <div className="p-4 border-t border-zinc-800">
          <button 
            onClick={onLogout}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-zinc-900 hover:bg-red-900/50 text-zinc-400 hover:text-red-400 rounded-xl transition-colors font-bold text-sm"
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
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
              <input 
                type="text" 
                placeholder="Search..." 
                className="pl-9 pr-4 py-2 bg-[#fcf8f0] border border-zinc-200 rounded-full text-sm focus:outline-none focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37] transition-all"
              />
            </div>
            <div className="w-10 h-10 bg-zinc-200 rounded-full border-2 border-[#d4af37] overflow-hidden">
              <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Admin" alt="Admin" className="w-full h-full object-cover" />
            </div>
          </div>
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
              {activeTab === 'Overview' && <OverviewPanel />}
              {activeTab === 'Products' && <ProductsPanel />}
              {activeTab === 'Orders' && <OrdersPanel />}
              {/* Other panels would go here */}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}

// Sub-components for Admin Panels
function OverviewPanel() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-zinc-100">
        <h3 className="text-zinc-500 font-bold text-xs uppercase tracking-widest">Total Sales</h3>
        <p className="text-3xl font-black text-[#0a0a0a] mt-2">R 45,230</p>
        <span className="text-emerald-500 text-xs font-bold mt-2 inline-block">+12.5% this month</span>
      </div>
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-zinc-100">
        <h3 className="text-zinc-500 font-bold text-xs uppercase tracking-widest">Active Orders</h3>
        <p className="text-3xl font-black text-[#0a0a0a] mt-2">24</p>
        <span className="text-amber-500 text-xs font-bold mt-2 inline-block">5 require shipping</span>
      </div>
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-zinc-100">
        <h3 className="text-zinc-500 font-bold text-xs uppercase tracking-widest">Total Products</h3>
        <p className="text-3xl font-black text-[#0a0a0a] mt-2">156</p>
        <span className="text-zinc-500 text-xs font-bold mt-2 inline-block">All categories active</span>
      </div>
    </div>
  );
}

function ProductsPanel() {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-zinc-100 overflow-hidden">
      <div className="p-6 border-b border-zinc-100 flex justify-between items-center">
        <h2 className="font-bold text-lg text-[#0a0a0a]">Product Catalog</h2>
        <button className="bg-[#0a0a0a] text-[#d4af37] px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 hover:bg-[#d4af37] hover:text-[#0a0a0a] transition-colors">
          <Plus className="w-4 h-4" /> Add Product
        </button>
      </div>
      <div className="p-8 text-center text-zinc-500 text-sm">
        Drag-and-drop product management interface will be mounted here. Connects to Firestore.
      </div>
    </div>
  );
}

function OrdersPanel() {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-zinc-100 overflow-hidden">
      <div className="p-6 border-b border-zinc-100">
        <h2 className="font-bold text-lg text-[#0a0a0a]">Recent Transactions (Payfast)</h2>
      </div>
      <div className="p-8 text-center text-zinc-500 text-sm">
        List of webhook-verified orders from Payfast will appear here.
      </div>
    </div>
  );
}
