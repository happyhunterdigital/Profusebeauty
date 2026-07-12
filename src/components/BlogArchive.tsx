import React from 'react';
import { blogPosts } from '../blogData';
import { motion } from 'framer-motion';

interface BlogArchiveProps {
  onPostClick: (slug: string) => void;
}

export default function BlogArchive({ onPostClick }: BlogArchiveProps) {
  const posts = [...blogPosts].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div className="min-h-screen bg-[#fcf8f0] pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-black text-[#0a0a0a] uppercase tracking-tight"
          >
            The Beauty <span className="text-[#d4af37]">Journal</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-4 text-zinc-500 max-w-2xl mx-auto text-sm"
          >
            Explore our expert tutorials, skincare science, and latest product releases.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post, idx) => (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                key={post.id}
                onClick={() => onPostClick(post.slug)}
                className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow cursor-pointer group border border-zinc-100"
              >
                <div className="aspect-[16/10] overflow-hidden relative">
                  {post.coverImage ? (
                    <img 
                      src={post.coverImage} 
                      alt={post.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  ) : (
                    <div className="w-full h-full bg-zinc-100 flex items-center justify-center">
                      <span className="text-zinc-300 font-mono text-xs">NO COVER</span>
                    </div>
                  )}
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-[#0a0a0a]">
                    Article
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 text-xs text-zinc-400 mb-3 font-mono">
                    <span>{post.date}</span>
                    <span>•</span>
                    <span>{post.author}</span>
                  </div>
                  <h3 className="text-xl font-bold text-[#0a0a0a] group-hover:text-[#d4af37] transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="mt-3 text-sm text-zinc-500 line-clamp-3">
                    {post.content.replace(/[#*`_]/g, '').slice(0, 150)}...
                  </p>
                  <div className="mt-6 text-[#d4af37] text-xs font-bold uppercase tracking-wider flex items-center gap-1 group-hover:gap-2 transition-all">
                    Read Full Article <span className="text-lg leading-none">&rarr;</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
      </div>
    </div>
  );
}
