import React from 'react';
import { blogPosts } from '../blogData';
import { ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';

interface BlogPostViewProps {
  slug: string;
  onBack: () => void;
}

export default function BlogPostView({ slug, onBack }: BlogPostViewProps) {
  const post = blogPosts.find(p => p.slug === slug) || null;

  if (!post) {
    return (
      <div className="min-h-screen bg-[#fcf8f0] flex flex-col items-center justify-center p-4">
        <h2 className="text-2xl font-black mb-4">Article Not Found</h2>
        <button onClick={onBack} className="text-[#d4af37] underline">Return to Blog</button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fcf8f0] pb-24">
      {/* Hero Section */}
      <div className="relative h-[60vh] min-h-[400px] w-full bg-[#0a0a0a]">
        {post.coverImage && (
          <img 
            src={post.coverImage} 
            alt={post.title} 
            className="absolute inset-0 w-full h-full object-cover opacity-60"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#fcf8f0] via-transparent to-black/50" />
        
        <div className="absolute top-24 left-4 sm:left-8 z-10">
          <button 
            onClick={onBack}
            className="bg-white/10 backdrop-blur-md text-white hover:bg-white hover:text-black px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest flex items-center gap-2 transition-colors border border-white/20"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Journal
          </button>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-8 sm:p-12 max-w-4xl mx-auto text-center z-10 translate-y-16">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-8 sm:p-12 rounded-3xl shadow-xl border border-zinc-100"
          >
            <div className="text-xs text-[#d4af37] font-bold uppercase tracking-widest mb-4">
              {post.date} • By {post.author}
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#0a0a0a] leading-tight">
              {post.title}
            </h1>
          </motion.div>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-3xl mx-auto px-6 pt-32 sm:pt-40">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="prose prose-lg prose-zinc max-w-none pb-20 text-[#1E1214]"
        >
          {post.content.split('\n').map((paragraph, idx) => {
            if (!paragraph.trim()) return <br key={idx} />;
            if (paragraph.startsWith('## ')) return <h2 key={idx} className="text-2xl font-bold mt-8 mb-4">{paragraph.replace('## ', '')}</h2>;
            if (paragraph.startsWith('### ')) return <h3 key={idx} className="text-xl font-bold mt-6 mb-3">{paragraph.replace('### ', '')}</h3>;
            return <p key={idx} className="mb-4 leading-relaxed">{paragraph}</p>;
          })}
        </motion.div>
      </div>
    </div>
  );
}
