// src/components/editors/BlogEditor.tsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Search, Globe } from 'lucide-react';
import { BlogPost, SEOMeta, AEOFields, PublishingStatus } from '../../types';
import { auditContent, AuditResult } from '../../lib/seoAudit';

const baseInput = 'w-full bg-zinc-100 dark:bg-zinc-800 border-none rounded-xl px-4 py-3 font-bold text-sm focus:ring-2 focus:ring-[#d4af37] focus:outline-none';
const areaInput = `${baseInput} font-normal resize-y`;
const boxLabels = 'block text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-1';

interface BlogEditorProps {
  post?: Partial<BlogPost>;
  onClose: () => void;
  onSave: (b: Partial<BlogPost>) => void;
  saving?: boolean;
}

export default function BlogEditor({ post: initial, onClose, onSave }: BlogEditorProps) {
  const [b, setB] = useState<Partial<BlogPost>>(initial || {});
  const [audit, setAudit] = useState<AuditResult | null>(null);
  const [activeTab, setActiveTab] = useState('General');

  useEffect(() => {
    if (!b.title && !b.content) { setAudit(null); return; }
    const res = auditContent({
      text: b.content || '',
      title: b.title || '',
      excerpt: b.seo?.title,
      metaTitle: b.seo?.title,
      metaDescription: b.seo?.description,
      contentType: 'blog',
    });
    setAudit(res);
  }, [b.title, b.content, b.seo, b.excerpt]);

  const setField = (key: keyof BlogPost, val: any) => setB(p => ({ ...p, [key]: val }));
  const setSeo = (key: keyof SEOMeta, val: any) => setB(p => ({ ...p, seo: { ...p.seo, [key]: val } }));

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
              {b.id ? 'Edit Blog Post' : 'New Blog Post'}
            </h2>
            <p className="text-xs text-zinc-500 mt-1">
              {b.status === 'published' ? 'Published — live on blog' : b.status === 'draft' ? 'Draft — not public' : 'Unsaved draft'}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <button onClick={onClose} className="p-2 text-zinc-400 hover:text-zinc-600 hover:bg-zinc-100 rounded-full">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab strip */}
        <div className="px-6 border-b border-zinc-100 dark:border-zinc-800 flex gap-1 overflow-x-auto pb-2 -mb-px">
          {[
            { id: 'General', icon: Search },
            { id: 'Media', icon: Globe },
            { id: 'SEO & IA', icon: Search },
            { id: 'Publishing', icon: Globe },
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
                    <label className={boxLabels}>Blog Title</label>
                    <input
                      className={baseInput}
                      value={b.title || ''}
                      onChange={e => setField('title', e.target.value)}
                      placeholder="e.g., 5 Foundations for Deep Skin Tones That Stay All Day"
                    />
                  </div>

                  <div>
                    <label className={boxLabels}>Slug</label>
                    <input
                      className={baseInput + " font-mono text-xs"}
                      value={b.slug || ''}
                      onChange={e => setField('slug', e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''))}
                      placeholder="auto-generated from title"
                    />
                    <p className="text-[10px] text-zinc-400 mt-1">/blog/{b.slug || 'your-slug-here'}</p>
                  </div>

                  <div>
                    <label className={boxLabels}>Content (Markdown)</label>
                    <textarea
                      className={areaInput + " font-mono"}
                      rows={10}
                      value={b.content || ''}
                      onChange={e => setField('content', e.target.value)}
                      placeholder="# Your headline&#10;&#10;Paragraph one...&#10;&#10;## Subheading&#10;&#10;- Bullet point"
                    />
                  </div>

                  <div>
                    <label className={boxLabels}>Author</label>
                    <input className={baseInput} value={b.author || ''} onChange={e => setField('author', e.target.value)} placeholder="e.g., Thabo M." />
                  </div>

                  <div>
                    <label className={boxLabels}>Tags (comma separated)</label>
                    <input
                      className={baseInput}
                      value={b.tags?.join(', ') || ''}
                      onChange={e => setField('tags', e.target.value.split(',').map(s => s.trim()))}
                      placeholder="summer makeup, deep skin tones, SA beauty"
                    />
                  </div>
                </div>

                {/* Right column — cover image + excerpt */}
                <div className="space-y-4">
                  <div className="bg-zinc-50 dark:bg-zinc-800/50 rounded-2xl p-4">
                    <h4 className="text-[11px] font-bold text-zinc-600 uppercase tracking-widest mb-3">Cover image</h4>
                    <textarea
                      className={areaInput}
                      rows={2}
                      value={b.coverImage || ''}
                      onChange={e => setField('coverImage', e.target.value)}
                      placeholder="https://res.cloudinary.com/..."
                    />
                    {b.coverImage && (
                      <div className="mt-2 relative rounded-xl overflow-hidden h-40 border border-zinc-200 dark:border-zinc-700">
                        <img src={b.coverImage} alt="Cover preview" className="w-full h-full object-cover" />
                      </div>
                    )}
                  </div>

                  <div>
                    <label className={boxLabels}>Excerpt (for archive / cards)</label>
                    <textarea
                      className={areaInput}
                      rows={3}
                      value={b.excerpt || ''}
                      onChange={e => setField('excerpt', e.target.value)}
                      placeholder="Short teaser for blog listing pages (up to 155 chars)"
                    />
                    <p className="text-xs text-zinc-400 mt-1">{b.excerpt?.length || 0} chars</p>
                  </div>
                </div>
              </div>
            )}

            {/* === MEDIA & GALLERY — placeholder placeholder for blog images === */}
            {activeTab === 'Media' && (
              <div className="space-y-6">
                <div>
                  <label className={boxLabels}>Inline images (blog content)</label>
                  <div className="bg-[#fcf8f0] rounded-2xl p-4 border border-[#d4af37]/20">
                    <p className="text-xs text-zinc-500">
                      Images within your markdown content are managed directly in the blog text. Upload images to Cloudinary once,
                      then paste the URL where you want them in the post body.
                    </p>
                  </div>
                </div>
                {b.coverImage && (
                  <div>
                    <label className={boxLabels}>Featured/Open Graph Image</label>
                    <p className="text-xs text-zinc-400 mb-2">Primary image for social sharing and search results.</p>
                    <img src={b.coverImage} alt="Featured preview" className="rounded-xl w-full max-w-md mx-auto border border-zinc-200 h-48 object-cover" />
                  </div>
                )}
              </div>
            )}

            {/* === SEO & IA === */}
            {activeTab === 'SEO & IA' && (
              <div className="space-y-6">
                <div>
                  <h4 className="text-[11px] font-bold text-zinc-600 uppercase tracking-widest mb-4">Search appearance</h4>
                  <div className="grid grid-cols-1 gap-4">
                    <div>
                      <label className={boxLabels}>Meta Title</label>
                      <input
                        className={baseInput}
                        value={b.seo?.title || ''}
                        onChange={e => setSeo('title', e.target.value)}
                        placeholder={b.title || 'Auto-generated from title'}
                      />
                      <p className="text-xs text-zinc-400 mt-1">{b.seo?.title?.length || 0} chars — keep under 60</p>
                    </div>
                    <div>
                      <label className={boxLabels}>Meta Description</label>
                      <textarea
                        className={areaInput}
                        rows={2}
                        value={b.seo?.description || ''}
                        onChange={e => setSeo('description', e.target.value)}
                        placeholder="Description search engines show under your title"
                      />
                      <p className="text-xs text-zinc-400 mt-1">{b.seo?.description?.length || 0} chars — target 120-155</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-[11px] font-bold text-zinc-600 uppercase tracking-widest mb-4">Structured content for AI search</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className={boxLabels}>Primary target keywords</label>
                      <textarea
                        className={areaInput}
                        rows={2}
                        value={b.seo?.keywords?.join(', ') || ''}
                        onChange={e => setSeo('keywords', e.target.value.split(',').map(s => s.trim()).filter(Boolean))}
                        placeholder="deep-skin-foundation, south-african-makeup, cruelty-free cosmetics"
                      />
                    </div>
                    <div>
                      <label className={boxLabels}>Category</label>
                      <select
                        className={baseInput + " appearance-none"}
                        value={b.category || ''}
                        onChange={e => setField('category', e.target.value)}
                      >
                        <option value="">Select...</option>
                        <option value="Guides">Guides</option>
                        <option value="Routine">Routine Building</option>
                        <option value="Reviews">Reviews &amp; Demos</option>
                        <option value="Trends">Trends &amp; Lookbooks</option>
                        <option value="Tutorials">Tutorials</option>
                        <option value="Brand">Brand Stories</option>
                        <option value="DIY">DIY Recipes</option>
                        <option value="Events">Events &amp; Workshops</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div>
                  <label className={boxLabels}>Social Sharing Image (fallback)</label>
                  <textarea
                    className={areaInput}
                    rows={2}
                    value={b.seo?.ogImage || ''}
                    onChange={e => setSeo('ogImage', e.target.value)}
                    placeholder="https://your-image-120x628.jpg — this overrides coverImage for Open Graph cards"
                  />
                  {b.seo?.ogImage && (
                    <img src={b.seo.ogImage} alt="OG preview" className="rounded-xl w-full max-w-md mt-2 border border-zinc-200 h-32 object-cover" />
                  )}
                </div>

                {audit && (
                  <div className="bg-[#fcf8f0] rounded-2xl p-5 border border-[#d4af37]/20 space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="text-[11px] font-extrabold text-[#d4af37] uppercase tracking-widest">Content intelligence</h4>
                      <span className="text-xs font-bold text-zinc-600">{audit.score}/100</span>
                    </div>
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div className="flex items-center gap-2">
                        <span className={`w-2.5 h-2.5 rounded-full ${audit.fleschScore > 60 ? 'bg-emerald-500' : 'bg-amber-500'}`} />
                        <span className="text-zinc-600">Flesch: {audit.fleschScore}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`w-2.5 h-2.5 rounded-full ${audit.words > 300 ? 'bg-emerald-500' : 'bg-amber-500'}`} />
                        <span className="text-zinc-600">Words: {audit.words}</span>
                      </div>
                    </div>
                    <div className="text-xs space-y-1">
                      {audit.issues.map((issue, i) => (
                        <div key={i} className={`flex gap-2 ${issue.severity === 'error' ? 'text-red-600' : 'text-zinc-600'}`}>
                          <Globe className={`w-3.5 h-3.5 mt-0.5 flex-shrink-0 ${issue.severity === 'error' ? 'text-red-500' : 'text-zinc-400'}`} />
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
                    <select
                      className={baseInput}
                      value={b.status || 'draft'}
                      onChange={e => setField('status', e.target.value as PublishingStatus)}
                    >
                      <option value="draft">Draft</option>
                      <option value="published">Published</option>
                    </select>
                  </div>
                  <div>
                    <label className={boxLabels}>Visibility</label>
                    <select
                      className={baseInput}
                      value={b.visibility || 'Public'}
                      onChange={e => setField('visibility', e.target.value)}
                    >
                      <option value="Public">Public</option>
                      <option value="Hidden">Hidden</option>
                    </select>
                  </div>
                </div>

                {/* Date & time */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className={boxLabels}>Published Date</label>
                    <input
                      className={baseInput}
                      type="date"
                      value={b.date || ''}
                      onChange={e => setField('date', e.target.value)}
                    />
                  </div>
                  <div>
                    <label className={boxLabels}>Last Modified</label>
                    <input
                      className={baseInput + " opacity-60"}
                      readOnly
                      value={b.lastModified || ''}
                    />
                  </div>
                </div>

                {/* Preview link & catalog visibility controls */}
                <div className="bg-white dark:bg-zinc-800/50 border border-zinc-100 dark:border-zinc-700 rounded-2xl p-5 shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h4 className="text-[11px] font-bold text-zinc-600 uppercase tracking-widest">Preview link</h4>
                      {b.status !== 'published' ? (
                        <p className="text-xs text-zinc-500 mt-1">Draft posts are only visible via this private URL until published.</p>
                      ) : b.visibility === 'Public' ? (
                        <p className="text-xs text-emerald-600 mt-1">Live and publicly accessible on /blog/{b.slug}.</p>
                      ) : null}
                    </div>
                    <button
                      type="button"
                      onClick={() => window.open(`/blog/${b.slug || 'post-preview'}`, '_blank')}
                      className="px-4 py-2 bg-[#d4af37] hover:bg-[#e5c96a] text-white text-xs font-bold rounded-full transition-colors flex items-center gap-1.5"
                    >
                      Preview ↗
                    </button>
                  </div>

                  {(b.status === 'published' && b.visibility === 'Public') && (
                    <p className="text-xs text-zinc-400 border-t border-zinc-100 pt-3">
                      Live at: <code className="text-[11px] font-mono text-[#d4af37] bg-[#d4af37]/10 px-2 py-1 rounded">/blog/{b.slug}</code>
                    </p>
                  )}
                </div>

                <button
                  type="button"
                  onClick={() => onSave(b)}
                  className="w-full bg-[#0a0a0a] text-[#d4af37] font-black text-lg py-3.5 rounded-xl hover:bg-[#d4af37] hover:text-[#0a0a0a] disabled:opacity-50 transition-colors shadow-lg"
                >
                  Save blog post
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
