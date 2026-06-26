import React, { useState } from 'react';
import { 
  LayoutDashboard, Package, ShoppingCart, Settings, 
  Users, LogOut, Search, Plus, Edit2, Trash2, GripVertical, BadgeDollarSign
} from 'lucide-react';
import { motion, AnimatePresence, Reorder } from 'framer-motion';
import { useEffect } from 'react';
import { collection, onSnapshot, doc, updateDoc, writeBatch, deleteDoc, addDoc, setDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { Product } from '../types';

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
    { id: 'Affiliates', icon: BadgeDollarSign },
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
              {activeTab === 'Affiliates' && <AffiliatesPanel />}
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
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Partial<Product> | null>(null);

  useEffect(() => {
    // Listen to Firestore products
    const unsubscribe = onSnapshot(collection(db, 'products'), (snapshot) => {
      const fetchedProducts: Product[] = [];
      snapshot.forEach((doc) => {
        fetchedProducts.push({ id: doc.id, ...doc.data() } as Product);
      });
      // Sort by sortOrder
      fetchedProducts.sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0));
      setProducts(fetchedProducts);
      setLoading(false);
    }, (error) => {
      console.error("Firestore error:", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleReorder = async (newOrder: Product[]) => {
    setProducts(newOrder); // Optimistic UI update
    
    // Save new order to Firestore
    try {
      const batch = writeBatch(db);
      newOrder.forEach((product, index) => {
        const docRef = doc(db, 'products', product.id);
        batch.update(docRef, { sortOrder: index });
      });
      await batch.commit();
    } catch (error) {
      console.error("Error updating sort order:", error);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await deleteDoc(doc(db, 'products', id));
      } catch (error) {
        console.error("Error deleting product:", error);
        alert("Failed to delete product.");
      }
    }
  };

  const handleSaveProduct = async (productData: Partial<Product>) => {
    try {
      if (productData.id) {
        // Edit
        await setDoc(doc(db, 'products', productData.id), productData, { merge: true });
      } else {
        // Add new
        await addDoc(collection(db, 'products'), {
          ...productData,
          sortOrder: products.length // Add to end of list
        });
      }
      setIsModalOpen(false);
      setEditingProduct(null);
    } catch (error) {
      console.error("Error saving product:", error);
      alert("Failed to save product.");
    }
  };

  if (loading) {
    return <div className="p-8 text-center text-zinc-500">Loading products from Firestore...</div>;
  }

  return (
    <>
    <div className="bg-white rounded-2xl shadow-sm border border-zinc-100 overflow-hidden">
      <div className="p-6 border-b border-zinc-100 flex justify-between items-center bg-[#fcf8f0]/50">
        <h2 className="font-bold text-lg text-[#0a0a0a]">Product Catalog (Drag to Reorder)</h2>
        <button 
          onClick={() => {
            setEditingProduct({ name: '', category: '', price: 0, desc: '', swatches: [], image: '' });
            setIsModalOpen(true);
          }}
          className="bg-[#0a0a0a] text-[#d4af37] px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 hover:bg-[#d4af37] hover:text-[#0a0a0a] transition-colors"
        >
          <Plus className="w-4 h-4" /> Add Product
        </button>
      </div>
      
      <div className="p-4">
        {products.length === 0 ? (
          <div className="text-center p-8 text-zinc-500">
            <p>No products found in Firestore.</p>
            <p className="text-xs mt-2">Run the seedProducts script to populate the database.</p>
          </div>
        ) : (
          <Reorder.Group axis="y" values={products} onReorder={handleReorder} className="space-y-2">
            {products.map((product) => (
              <Reorder.Item 
                key={product.id} 
                value={product}
                className="flex items-center justify-between p-4 bg-white border border-zinc-100 rounded-xl shadow-sm cursor-grab active:cursor-grabbing hover:border-[#d4af37]/30 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <GripVertical className="w-5 h-5 text-zinc-400" />
                  <div className="w-12 h-12 bg-zinc-100 rounded-lg overflow-hidden flex-shrink-0">
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-[#0a0a0a]">{product.name}</h4>
                    <p className="text-xs text-zinc-500">{product.category} • R {product.price}</p>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <button 
                    onClick={() => {
                      setEditingProduct(product);
                      setIsModalOpen(true);
                    }}
                    className="p-2 text-zinc-400 hover:text-[#d4af37] hover:bg-[#d4af37]/10 rounded-lg transition-colors"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => handleDelete(product.id)}
                    className="p-2 text-zinc-400 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </Reorder.Item>
            ))}
          </Reorder.Group>
        )}
      </div>
    </div>
      {isModalOpen && editingProduct && (
        <ProductFormModal 
          product={editingProduct} 
          onClose={() => { setIsModalOpen(false); setEditingProduct(null); }}
          onSave={handleSaveProduct}
        />
      )}
    </>
  );
}

function OrdersPanel() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'orders'), (snapshot) => {
      const fetched: any[] = [];
      snapshot.forEach(doc => fetched.push({ id: doc.id, ...doc.data() }));
      setOrders(fetched);
      setLoading(false);
    }, (error) => {
      console.error("Orders error:", error);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleStatusChange = async (orderId: string, newStatus: string) => {
    try {
      await updateDoc(doc(db, 'orders', orderId), { status: newStatus });
    } catch (e) {
      console.error("Failed to update status", e);
    }
  };

  if (loading) return <div className="p-8 text-center text-zinc-500">Loading live orders...</div>;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-zinc-100 overflow-hidden">
      <div className="p-6 border-b border-zinc-100">
        <h2 className="font-bold text-lg text-[#0a0a0a]">Recent Transactions (Payfast)</h2>
      </div>
      <div className="divide-y divide-zinc-100">
        {orders.length === 0 ? (
          <div className="p-8 text-center text-zinc-500 text-sm">
            No active orders found in the database.
          </div>
        ) : (
          orders.map(order => (
            <div key={order.id} className="p-4 flex items-center justify-between hover:bg-zinc-50 transition-colors">
              <div>
                <p className="font-bold text-sm text-[#0a0a0a]">{order.customerEmail || 'Guest Order'}</p>
                <p className="text-xs text-zinc-500">R {order.total} • Payfast Ref: {order.payfastRef || 'N/A'}</p>
              </div>
              <div className="flex items-center gap-4">
                <select 
                  value={order.status || 'Processing'}
                  onChange={(e) => handleStatusChange(order.id, e.target.value)}
                  className="bg-zinc-100 text-[#0a0a0a] text-xs font-bold px-3 py-2 rounded-lg border-none focus:ring-2 focus:ring-[#d4af37]"
                >
                  <option value="Processing">Processing</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Delivered">Delivered</option>
                </select>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

function AffiliatesPanel() {
  const [affiliates, setAffiliates] = useState<{ id: string; name: string; code: string; owing: number }[]>([
    { id: '1', name: 'Sarah M.', code: 'SARAH10', owing: 450 },
    { id: '2', name: 'Zoe L.', code: 'ZOE20', owing: 120 },
    { id: '3', name: 'Kamo G.', code: 'KAMO15', owing: 0 },
  ]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-zinc-100">
          <h3 className="text-sm font-bold text-zinc-500 mb-1">Total Owed</h3>
          <p className="text-3xl font-black text-[#0a0a0a]">R {affiliates.reduce((acc, curr) => acc + curr.owing, 0)}</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-zinc-100">
          <h3 className="text-sm font-bold text-zinc-500 mb-1">Active Codes</h3>
          <p className="text-3xl font-black text-[#0a0a0a]">{affiliates.length}</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-zinc-100 flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-zinc-500 mb-1">New Affiliate</h3>
            <p className="text-xs text-zinc-400">Generate referral code</p>
          </div>
          <button className="w-12 h-12 bg-[#0a0a0a] text-[#d4af37] rounded-full flex items-center justify-center hover:bg-[#d4af37] hover:text-[#0a0a0a] transition-colors">
            <Plus className="w-6 h-6" />
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-zinc-100 overflow-hidden">
        <div className="p-6 border-b border-zinc-100 flex items-center justify-between">
          <h2 className="font-bold text-lg text-[#0a0a0a]">Affiliate Network</h2>
        </div>
        <div className="divide-y divide-zinc-100">
          {affiliates.map((aff) => (
            <div key={aff.id} className="p-4 flex items-center justify-between hover:bg-zinc-50 transition-colors">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-zinc-100 rounded-full flex items-center justify-center text-zinc-500 font-bold">
                  {aff.name.charAt(0)}
                </div>
                <div>
                  <h4 className="font-bold text-sm text-[#0a0a0a]">{aff.name}</h4>
                  <p className="text-xs font-mono text-[#d4af37]">?ref={aff.code}</p>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <div className="text-right">
                  <p className="text-xs text-zinc-500">Owed</p>
                  <p className="text-sm font-black text-[#0a0a0a]">R {aff.owing}</p>
                </div>
                {aff.owing >= 200 ? (
                  <button className="px-4 py-2 bg-zinc-100 hover:bg-green-100 hover:text-green-700 text-xs font-bold rounded-lg transition-colors">
                    Mark Paid
                  </button>
                ) : (
                  <div className="px-4 py-2 bg-red-50 text-red-500 text-[10px] font-bold rounded-lg uppercase tracking-wider">
                    Min R200
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ProductFormModal({ product, onClose, onSave }: { product: Partial<Product>, onClose: () => void, onSave: (p: Partial<Product>) => void }) {
  const [formData, setFormData] = useState<Partial<Product>>(product);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 relative">
        <button onClick={onClose} className="absolute top-4 right-4 p-2 bg-zinc-100 hover:bg-zinc-200 rounded-full">
          <X className="w-5 h-5" />
        </button>
        <h2 className="text-2xl font-black mb-6">{product.id ? 'Edit Product' : 'Add New Product'}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-zinc-500 uppercase tracking-wider mb-1">Name</label>
              <input type="text" required value={formData.name || ''} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full bg-zinc-100 border-none rounded-xl px-4 py-3 font-bold text-sm focus:ring-2 focus:ring-[#d4af37]" />
            </div>
            <div>
              <label className="block text-xs font-bold text-zinc-500 uppercase tracking-wider mb-1">Category</label>
              <input type="text" required value={formData.category || ''} onChange={e => setFormData({...formData, category: e.target.value})} className="w-full bg-zinc-100 border-none rounded-xl px-4 py-3 font-bold text-sm focus:ring-2 focus:ring-[#d4af37]" placeholder="e.g. Face, Lips, Accessories" />
            </div>
          </div>
          <div>
            <label className="block text-xs font-bold text-zinc-500 uppercase tracking-wider mb-1">Price (R)</label>
            <input type="number" required min="0" step="0.01" value={formData.price || ''} onChange={e => setFormData({...formData, price: parseFloat(e.target.value)})} className="w-full bg-zinc-100 border-none rounded-xl px-4 py-3 font-bold text-sm focus:ring-2 focus:ring-[#d4af37]" />
          </div>
          <div>
            <label className="block text-xs font-bold text-zinc-500 uppercase tracking-wider mb-1">Description</label>
            <textarea required rows={3} value={formData.desc || ''} onChange={e => setFormData({...formData, desc: e.target.value})} className="w-full bg-zinc-100 border-none rounded-xl px-4 py-3 font-bold text-sm focus:ring-2 focus:ring-[#d4af37]" />
          </div>
          <div>
            <label className="block text-xs font-bold text-zinc-500 uppercase tracking-wider mb-1">Main Image URL</label>
            <input type="url" value={formData.image || ''} onChange={e => setFormData({...formData, image: e.target.value})} className="w-full bg-zinc-100 border-none rounded-xl px-4 py-3 font-bold text-sm focus:ring-2 focus:ring-[#d4af37]" placeholder="https://..." />
          </div>
          <div>
            <label className="block text-xs font-bold text-zinc-500 uppercase tracking-wider mb-1">Swatch Image URLs (comma separated)</label>
            <textarea rows={2} value={formData.swatches?.join(', ') || ''} onChange={e => setFormData({...formData, swatches: e.target.value.split(',').map(s => s.trim()).filter(Boolean)})} className="w-full bg-zinc-100 border-none rounded-xl px-4 py-3 font-bold text-sm focus:ring-2 focus:ring-[#d4af37]" placeholder="url1, url2..." />
          </div>
          <button type="submit" className="w-full bg-[#0a0a0a] text-[#d4af37] font-black text-lg py-4 rounded-xl mt-6 hover:bg-[#d4af37] hover:text-[#0a0a0a] transition-colors shadow-lg">
            Save Product
          </button>
        </form>
      </div>
    </div>
  );
}
