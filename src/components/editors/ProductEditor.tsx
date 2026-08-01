// src/components/editors/ProductEditor.tsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X, Settings, Image as ImageIcon, Search, AlertTriangle, RefreshCw, Globe
} from 'lucide-react';
import { Product, SEOMeta, GEOFields, AEOFields, PublishingStatus, Tone, Review } from '../../types';
import { auditContent, AuditResult } from '../../lib/seoAudit';

const baseInput = 'w-full bg-zinc-100 dark:bg-zinc-800 border-none rounded-xl px-4 py-3 font-bold text-sm focus:ring-2 focus:ring-[#d4af37] focus:outline-none';
const areaInput = `${baseInput} font-normal resize-y`;
const boxLabels = 'block text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-1';
const tagCategorical = (color: string, lum: number) => `!text-white bg-${color} text-xs font-extrabold uppercase`;

/** Helper for formatting variety in the editor */
function labelVal(label: string, val: React.ReactNode, grow = false) {
  return (
    <div className={grow ? 'flex-1' : ''}>
      <label className={boxLabels}>{label}</label>
      <div className="text-sm font-bold text-[#0a0a0a] dark: text-zinc-200">{val}</div>
    </div>
  );
}

interface ProductEditorProps {
  product?: Partial<Product>;
  onClose: () => void;
  onSave: (p: Partial<Product>) => Promise<void>;
  saving?: boolean;
}

const defaultTags: string[] = ['Face', 'Lips', 'Accessories'];

export default function ProductEditor({ product: initial, onClose, onSave, saving = false }: ProductEditorProps) {
  const [prod, setProd] = useState<Partial<Product>>(initial || {});
  const [audit, setAudit] = useState<AuditResult | null>(null);
  const [activeTab, setActiveTab] = useState<string>('General');
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // Sync audit when description/title/category/etc. change
  useEffect(() => {
    if (!prod.name && !prod.desc) { setAudit(null); return; }
    const result = auditContent({
      text: prod.desc || '',
      title: prod.name || '',
      excerpt: (prod.desc || '').substring(0, 50),
      metaTitle: prod.seo?.title || '',
      metaDescription: prod.seo?.description || '',
      contentType: 'product',
    });
    setAudit(result);
  }, [prod.name, prod.desc, prod.category, prod.seo, prod.price]);

  const handleAnalyze = () => {
    setIsAnalyzing(true);
    const result = auditContent({
      text: prod.desc || '',
      title: prod.name || '',
      excerpt: (prod.desc || '').substring(0, 50),
      metaTitle: prod.seo?.title || '',
      metaDescription: prod.seo?.description || '',
      contentType: 'product',
    });
    setAudit(result);
    setIsAnalyzing(false);
  };

  const setField = (key: keyof Product, val: any) => setProd(p => ({ ...p, [key]: val }));
  const setSeo = (key: keyof SEOMeta, val: any) => setProd(p => ({ ...p, seo: { ...p.seo, [key]: val } }));

  const applyFocusKeyword = () => {
    const val = prod.seo?.keywords?.join(', ') || '';
    setProd(p => ({
      ...p,
      seo: {
        ...p.seo,
        keywords: val.split(',').map(s => s.trim()).filter(Boolean) as SEOMeta['keywords'],
      },
    }));
  };

  // Quick action: fill SEO title from Product Name template hint
  const fillSeoTemplate = () => {
    if (!prod.name) return;
    const kw = prod.category || 'Beauty';
    setSeo('title', `${prod.name} | HD Liquid Foundation ShuShu`); // placeholder
    setSeo('description', `${prod.name} — natural-looking coverage for ${prod.category?.toLowerCase() || 'skin'} with SPF protection.`);
  };

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 overflow-hidden">
      <motion.div
        className="bg-white dark:bg-zinc-900 rounded-[2rem] shadow-2xl border border-zinc-200 dark:border-zinc-800 w-full max-w-5xl max-h-[92vh] flex flex-col"
        initial={{ scale: 0.98, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.98, opacity: 0 }}
      >
        {/* Header */}
        <div className="px-6 py-5 border-b border-zinc-100 dark:border-zinc-800 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-black tracking-tight text-zinc-900 dark:text-white">
              {prod.id ? 'Edit Product' : 'New Product'}
            </h2>
            <p className="text-xs text-zinc-500 mt-1">
              {prod.status === 'published' ? 'Live on shop floor' : prod.status === 'draft' ? 'Draft — not visible' : 'Unsaved draft'}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={handleAnalyze}
              className="flex items-center gap-1 text-xs font-bold text-[#d4af37] bg-[#d4af37]/10 px-3 py-1.5 rounded-full hover:bg-[#d4af37]/20 transition-colors"
              title="Live readability & SEO analysis of product text"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isAnalyzing ? 'animate-spin' : ''}`} />
              {isAnalyzing ? 'Analyzing…' : 'AiAudit'}
            </button>

            {/* Status tabs hidden if not applicable */}
            <button onClick={onClose} className="p-2 text-zinc-400 hover:text-zinc-600 hover:bg-zinc-100 rounded-full">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab strip */}
        <div className="px-6 border-b border-zinc-100 dark:border-zinc-800 flex gap-1 overflow-x-auto pb-2 -mb-px">
          {[
            { id: 'General', icon: Settings },
            { id: 'Media', icon: ImageIcon },
            { id: 'SEO', icon: Globe },
            { id: 'Publishing', icon: AlertTriangle },
          ].map(t => (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-[13px] font-bold border-b-2 transition-all ${
                activeTab === t.id
                  ? 'bg-[#d4af37]/10 border-[#d4af37] text-[#d4af37]'
                  : 'border-transparent text-zinc-500 hover:text-zinc-800 hover:bg-zinc-50'
              }`}
            >
              <t.icon className="w-4 h-4" /> {t.id}
            </button>
          ))}
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-6 py-6 min-h-0 min-w-0">
          <AnimatePresence mode="wait">
            <motion.div key={activeTab} className="w-full">

            {/* === GENERAL === */}
            {activeTab === 'General' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className={boxLabels}>Product Name</label>
                    <input className={baseInput} required value={prod.name || ''} onChange={e => setField('name', e.target.value)} />
                  </div>

                  <div>
                    <label className={boxLabels}>Category</label>
                    <select
                      className={baseInput + " appearance-none"}
                      value={prod.category || ''}
                      onChange={e => setField('category', e.target.value || prod.category || '')}
                    >
                      <option value="">Select…</option>
                      {defaultTags.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                    </select>
                  </div>

                  <div>
                    <label className={boxLabels}>Short description</label>
                    <textarea
                      className={areaInput}
                      rows={4}
                      value={prod.desc || ''}
                      onChange={e => setField('desc', e.target.value)}
                      placeholder="Selling points, shade naming hints, delivery promise…"
                    />
                  </div>

                  <div>
                    <label className={boxLabels}>Price (R)</label>
                    <input
                      className={baseInput}
                      type="number"
                      step="0.01"
                      min="0"
                      value={prod.price || ''}
                      onChange={e => setField('price', parseFloat(e.target.value) || 0)}
                    />
                  </div>
                </div>

                {/* Right column — colors, tones, reviews, etc. — compact placeholder */}
                <div className="space-y-4">
                  <div className="bg-zinc-50 dark:bg-zinc-800/50 rounded-2xl p-4">
                    <h4 className="text-[11px] font-bold text-zinc-600 uppercase tracking-widest mb-3">Visual identity</h4>
                    <div className="flex flex-wrap gap-2 mb-3">
                      <span className={`px-3 py-1 rounded-full text-[11px] font-bold ${prod.inStock ? 'bg-emerald-500 text-white' : 'bg-red-500 text-white'}`}>
                        {prod.inStock !== false ? 'In stock' : 'Out of stock'}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-xs">
                      <label className="flex items-center gap-1 cursor-pointer">
                        <input type="checkbox" checked={prod.inStock !== false} onChange={e => setField('inStock', e.target.checked)} className="accent-[#d4af37]" />
                        <span>In stock</span>
                      </label>
                    </div>
                  </div>

                  {/* Slug auto-gen */}
                  <div className="flex gap-3">
                    <div className="flex-1">
                      <label className={boxLabels}>Slug</label>
                      <input
                        className={baseInput + " font-mono font-medium"}
                        value={prod.slug || ''}
                        onChange={e => setField('slug', e.target.value.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''))}
                        placeholder="auto-generated"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        const baseSlug = prod.name?.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '') || '';
                        setField('slug', baseSlug);
                      }}
                      className="text-xs text-zinc-400 hover:text-zinc-600 font-mono py-2 px-3 bg-zinc-100 rounded-lg hover:bg-zinc-200"
                    >
                      Generate
                    </button>
                  </div>

                  {/* Tone associations */}
                  {prod.folder && (
                    <div className="bg-zinc-50 dark:bg-zinc-800/50 rounded-2xl p-4 border border-zinc-200 dark:border-zinc-700">
                      <h4 className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-2">Shade tones</h4>
                      <div className="flex flex-wrap gap-2">
                        {Array.isArray(prod.tones) && prod.tones.map(t => (
                          <div key={t.hex} className="flex items-center gap-2 px-2 py-1 bg-white dark:bg-zinc-700 rounded-full border border-zinc-200 dark:border-zinc-600 text-[11px]">
                            <span className="w-4 h-4 rounded-full border border-zinc-300" style={{ backgroundColor: t.hex }} />
                            {t.name}
                          </div>
                        ))}
                        {prod.previewHex && (
                          <div className="flex items-center gap-2 px-2 py-1 bg-zinc-100 dark:bg-zinc-800 rounded border border-zinc-200 dark:border-zinc-700 text-[11px]">
                            <span className="w-4 h-4 rounded-full border border-zinc-300" style={{ backgroundColor: prod.previewHex }} />
                            Try-On: {prod.previewHex}
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* === MEDIA === */}
            {activeTab === 'Media' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className={boxLabels}>Cover image URL</label>
                    <div className="flex gap-2 items-start">
                      <input
                        className={baseInput}
                        type="url"
                        value={prod.image || ''}
                        onChange={e => setField('image', e.target.value)}
                        placeholder="https://cloudinary.com/… or paste URL"
                      />
                    </div>
                    {prod.image && (
                      <div className="mt-2 relative rounded-xl overflow-hidden bg-zinc-100 h-48 border border-zinc-200 dark:border-zinc-700">
                        <img src={prod.image} alt={prod.name} className="w-full h-full object-cover" />
                      </div>
                    )}
                  </div>

                  <div>
                    <label className={boxLabels}>Additional gallery images (comma separated URLs)</label>
                    <textarea
                      className={areaInput}
                      rows={3}
                      value={Array.isArray(prod.galleryImages) ? prod.galleryImages.join(', ') : ''}
                      onChange={e => setProd(p => ({ ...p, galleryImages: e.target.value.split(',').map(s => s.trim()).filter(Boolean) }))}
                      placeholder="https://cloudinary.com/image1.jpg, https://cloudinary.com/image2.jpg"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className={boxLabels}>Product swatch images (for gallery)</label>
                    <textarea
                      className={areaInput}
                      rows={2}
                      value={prod.swatches?.join(', ') || ''}
                      onChange={e => setProd(p => ({ ...p, swatches: e.target.value.split(',').map(s => s.trim()).filter(Boolean) }))}
                      placeholder="url1, url2…"
                    />
                  </div>
                  <div>
                    <label className={boxLabels}>Swatch labels (pipe-separated, matching swatches)</label>
                    <textarea
                      className={areaInput}
                      rows={2}
                      value={prod.swatchLabels?.join('|') || ''}
                      onChange={e => setProd(p => ({ ...p, swatchLabels: e.target.value.split('|').map(s => s.trim()).filter(Boolean) }))}
                      placeholder="Shade 05 | Shade 06 | ..."
                    />
                  </div>
                </div>

                {/* SEO image hints for gallery: manual alt text */}
                {Array.isArray(prod.galleryImages) && prod.galleryImages.length > 0 && (
                  <div className="bg-[#fcf8f0] rounded-2xl p-4 border border-[#d4af37]/20">
                    <p className="text-[10px] font-bold text-[#d4af37] uppercase tracking-widest mb-2">SEO Tip</p>
                    <p className="text-xs text-zinc-500">
                      Images shared with text in the description perform better on Google. Add descriptive alt text inside the Media tab for products like Shade X as your work continues.
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* === SEO & IA === */}
            {activeTab === 'SEO' && (
              <div className="space-y-6">
                <div>
                  <h4 className="text-[11px] font-bold text-zinc-600 uppercase tracking-widest mb-3">Fresh keyword feed</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className={boxLabels}>SEO Title</label>
                      <div className="flex gap-2">
                        <input
                          className={baseInput}
                          value={prod.seo?.title || ''}
                          onChange={e => setSeo('title', e.target.value)}
                          placeholder={prod.name ? `${prod.name} — buy from Profuse Beauty` : 'Title…'}
                        />
                        <button
                          type="button"
                          onClick={fillSeoTemplate}
                          className="tex-xs px-3 py-2 bg-zinc-100 rounded-lg text-zinc-500 hover:text-zinc-700 hover:bg-zinc-200 border border-zinc-200"
                        >
                          Autofix
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className={boxLabels}>SEO Meta Description</label>
                      <textarea
                        className={areaInput}
                        rows={3}
                        value={prod.seo?.description || ''}
                        onChange={e => setSeo('description', e.target.value)}
                        placeholder="Short description for search engine result pages (150–160 chars max)">
                      </textarea>
                      <p className="text-xs text-zinc-400 mt-1">{prod.seo?.description?.length || 0}/160</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-[11px] font-bold text-zinc-600 uppercase tracking-widest mb-3">GEO + Local</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className={boxLabels}>Address / locality</label>
                      <input className={baseInput} placeholder="Pretoria, Gauteng"                       value={prod.geo?.addressLocality || ''} onChange={e => setField('geo', { ...prod.geo, addressLocality: e.target.value })} />
                    </div>
                    <div>
                      <label className={boxLabels}>Phone (optional for local associations)</label>
                      <input className={baseInput} placeholder="+27 (0)81 234 5678" value={prod.geo?.phone || ''} onChange={e => setField('geo', { ...prod.geo, phone: e.target.value })} />
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-[11px] font-bold text-zinc-600 uppercase tracking-widest mb-3">AEO — Questions & Answers</h4>
                  <p className="text-xs text-zinc-500 mb-4">
                    Ask & answer pairs here feed into Google's "People also ask" and featured snippets (AEO schema).
                    <span className="block text-[11px] text-zinc-400 mt-1">Each Q:curation supports one Caribbean — keep it focused.</span>
                  </p>

                  <div className="space-y-4">
                    {(prod.aeo?.faq || []).map((qa, i) => (
                      <div key={i} className="flex gap-4 item-start">
                        <div className="flex-1">
                          <input
                            className={baseInput + " text-sm"}
                            placeholder="Question: e.g., 'Does this foundation cover blemishes?' "
                            value={qa.q}
                            onChange={(e) => {
                              const newFaq = [...(prod.aeo?.faq || [])];
                              newFaq[i] = { ...newFaq[i], q: e.target.value };
                              setProd(p => ({ ...p, aeo: { ...p.aeo, faq: newFaq } }));
                            }}
                          />
                        </div>
                        <div className="flex-1">
                          <textarea
                            className={areaInput + " text-sm"}
                            rows={2}
                            placeholder="Answer…"
                            value={qa.a}
                            onChange={(e) => {
                              const newFaq = [...(prod.aeo?.faq || [])];
                              newFaq[i] = { ...newFaq[i], a: e.target.value };
                              setProd(p => ({ ...p, aeo: { ...p.aeo, faq: newFaq } }));
                            }}
                          />
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            const newFaq = (prod.aeo?.faq || []).filter((_, idx) => idx !== i);
                            setProd(p => ({ ...p, aeo: { ...p.aeo, faq: newFaq } }));
                          }}
                          className="mt-1 p-2 text-zinc-400 hover:text-red-500 text-xs"
                        >
                          ✕
                        </button>
                      </div>
                    ))}

                    <button
                      type="button"
                      onClick={() => {
                        const list = prod.aeo?.faq || [];
                        setProd(p => ({ ...p, aeo: { ...p.aeo, faq: [...list, { q: '', a: '' }] } }));
                      }}
                      className="text-xs font-bold text-[#d4af37] hover:underline"
                    >
                      + Add another Q&A pair
                    </button>
                  </div>
                </div>

                {/* Readability feedback */}
                {audit && (
                  <div className="bg-[#fcf8f0] rounded-2xl p-5 border border-[#d4af37]/20 space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="text-[11px] font-extrabold text-[#d4af37] uppercase tracking-widest">
                        Content intelligence (readability + SEO scoring)
                      </h4>
                      <span className="text-xs font-bold text-zinc-600">{audit.score}/100</span>
                    </div>

                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div className="flex items-center gap-2">
                        <span className={`w-2.5 h-2.5 rounded-full ${audit.fleschScore > 60 ? 'bg-emerald-500' : 'bg-amber-500'}`} />
                        <span className="text-zinc-600">Flesch: {audit.fleschScore}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`w-2.5 h-2.5 rounded-full ${audit.passiveCount < 2 ? 'bg-emerald-500' : 'bg-amber-500'}`} />
                        <span className="text-zinc-600">Passive cues: {audit.passiveCount}</span>
                      </div>
                    </div>

                    <div className="text-xs space-y-1">
                      {audit.issues.map((issue, i) => (
                        <div key={i} className={`flex gap-2 ${issue.severity === 'error' ? 'text-red-600' : 'text-zinc-600'}`}>
                          <AlertTriangle className={`w-3.5 h-3.5 mt-0.5 flex-shrink-0 ${issue.severity === 'error' ? 'text-red-500' : 'text-zinc-400'}`} />
                          <span>{issue.message}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* === PUBLISHING === */}
            {activeTab === 'Publishing' && (
              <div className="space-y-6 max-w-3xl mx-auto text-zinc-800 dark:text-zinc-200">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className={boxLabels}>Status</label>
                    <select className={baseInput} value={prod.status || 'draft'} onChange={e => setField('status', e.target.value as PublishingStatus)}>
                      <option value="draft">Draft</option>
                      <option value="published">Published</option>
                    </select>
                  </div>

                  <div>
                    <label className={boxLabels}>Visibility</label>
                    <select className={baseInput} value={prod.visibility || 'Public'} onChange={e => setField('visibility', e.target.value)}>
                      <option value="Public">Public</option>
                      <option value="Hidden">Hidden</option>
                    </select>
                  </div>
                </div>

                <div className="bg-white dark:bg-zinc-800/50 border border-zinc-100 dark:border-zinc-700 p-5 rounded-2xl shadow-sm">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-[11px] font-bold text-zinc-600 uppercase tracking-widest">Preview link (rules)</h4>
                      {prod.visibility !== 'Public' ? (
                        <p className="text-xs text-zinc-500 mt-2">Visibility is {prod.visibility}. Customers can't see this product until it's Public.</p>
                      ) : (
                        <p className="text-xs text-green-600 mt-2">Live on the shop floor.</p>
                      )}
                    </div>
                    <button
                      type="button"
                      onClick={() => window.open(`/product/${prod.slug || 'preview'}`, '_blank')}
                      className="px-4 py-2 bg-[#d4af37] hover:bg-[#e5c96a] text-white text-xs font-bold rounded-full transition-colors flex items-center gap-1.5"
                    >
                      Preview on shop ↗
                    </button>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => onSave(prod)}
                  disabled={saving}
                  className="w-full bg-[#0a0a0a] text-[#d4af37] font-black text-lg py-3.5 rounded-xl hover:bg-[#d4af37] hover:text-[#0a0a0a] disabled:opacity-50 transition-colors shadow-lg mt-4"
                >
                  {saving ? 'Saving…' : 'Save product'}
                </button>
              </div>
            )}
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}
