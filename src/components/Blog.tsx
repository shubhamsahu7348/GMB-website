import React, { useState } from 'react';
import { Calendar, User, Clock, ArrowRight, X, Sparkles } from 'lucide-react';
import { BLOG_POSTS } from '../data/products';
import { BlogPost as BlogPostType } from '../types';

export default function Blog() {
  const [selectedPost, setSelectedPost] = useState<BlogPostType | null>(null);

  return (
    <section id="blog" className="py-16 bg-white dark:bg-stone-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto mb-12">
          <span className="text-xs uppercase tracking-[0.25em] text-[#800000] dark:text-[#D4AF37] font-bold block">Heritage Stories & Recipes</span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-stone-900 dark:text-cream-100">
            From the Confectionery <span className="text-[#800000] dark:text-[#D4AF37]">Chronicles</span>
          </h2>
          <div className="flex items-center justify-center gap-1.5 pt-2">
            <span className="h-1 w-8 bg-[#800000] dark:bg-gold-500 rounded-full" />
            <span className="text-xs text-[#D4AF37]">Read & Savor</span>
            <span className="h-1 w-8 bg-[#800000] dark:bg-gold-500 rounded-full" />
          </div>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {BLOG_POSTS.map((post) => (
            <article
              key={post.id}
              className="bg-[#FFF8E7] dark:bg-stone-950 rounded-none border border-stone-200 dark:border-stone-850 overflow-hidden shadow-xs hover:shadow-xl hover:border-[#D4AF37]/40 transition-all duration-300 flex flex-col group h-full"
            >
              
              {/* Blog Image */}
              <div className="relative h-48 overflow-hidden cursor-pointer" onClick={() => setSelectedPost(post)}>
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-stone-950/20" />
                <div className="absolute top-3 left-3 flex flex-wrap gap-1">
                  {post.tags.map((tag) => (
                    <span key={tag} className="text-[9px] font-bold uppercase tracking-widest bg-[#800000] text-[#FFF8E7] px-2 py-0.5 rounded-none">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Blog Content */}
              <div className="p-5 flex flex-col flex-1 space-y-3">
                {/* Meta details */}
                <div className="flex items-center gap-3 text-[10px] text-stone-500 dark:text-stone-400 font-medium">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {post.date}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {post.readTime}
                  </span>
                </div>

                {/* Title */}
                <h3
                  onClick={() => setSelectedPost(post)}
                  className="font-serif text-base sm:text-lg font-bold text-stone-900 dark:text-cream-100 line-clamp-2 cursor-pointer hover:text-[#800000] dark:hover:text-[#D4AF37] transition-colors"
                >
                  {post.title}
                </h3>

                {/* Excerpt */}
                <p className="text-xs text-stone-650 dark:text-stone-400 line-clamp-3 leading-relaxed">
                  {post.excerpt}
                </p>

                {/* Author & CTA Button */}
                <div className="flex items-center justify-between pt-4 border-t border-stone-200 dark:border-stone-800 mt-auto">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-none bg-[#FFF8E7] dark:bg-stone-900 flex items-center justify-center text-[10px] font-bold text-stone-850 dark:text-cream-100 border border-stone-200 dark:border-stone-800">
                      {post.author[0]}
                    </div>
                    <span className="text-[10px] font-medium text-stone-500 dark:text-stone-400 truncate max-w-[100px]">{post.author}</span>
                  </div>
                  
                  <button
                    onClick={() => setSelectedPost(post)}
                    className="text-[10px] font-bold uppercase tracking-wider text-[#800000] hover:text-[#990000] dark:text-[#D4AF37] dark:hover:text-[#E5C158] flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    Read Article
                    <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>

              </div>

            </article>
          ))}
        </div>

      </div>

      {/* 4. FULL BLOG READ MODAL */}
      {selectedPost && (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-fade-in">
          <div className="bg-[#FFF8E7] dark:bg-stone-950 rounded-none border border-stone-200 dark:border-stone-850 w-full max-w-3xl max-h-[85vh] overflow-y-auto shadow-2xl relative">
            
            {/* Close Button */}
            <button
              onClick={() => setSelectedPost(null)}
              className="absolute top-4 right-4 p-2 bg-stone-950/10 hover:bg-stone-950/20 dark:bg-stone-100/10 dark:hover:bg-stone-100/20 text-stone-800 dark:text-cream-100 rounded-none border border-stone-200 dark:border-stone-800 transition-all cursor-pointer z-10"
              title="Close modal"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Banner Image */}
            <div className="relative h-64 sm:h-80 w-full">
              <img
                src={selectedPost.image}
                alt={selectedPost.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/40 to-transparent" />
              
              <div className="absolute bottom-6 left-6 right-6 space-y-2">
                <div className="flex flex-wrap gap-1.5">
                  {selectedPost.tags.map((tag) => (
                    <span key={tag} className="text-[10px] font-bold uppercase tracking-widest bg-[#D4AF37] text-[#800000] px-2.5 py-0.5 rounded-none">
                      {tag}
                    </span>
                  ))}
                </div>
                <h2 className="font-serif text-xl sm:text-2xl md:text-3xl font-bold text-white leading-tight">
                  {selectedPost.title}
                </h2>
              </div>
            </div>

            {/* Post Metadata & Content */}
            <div className="p-6 sm:p-8 space-y-6">
              
              {/* Meta information row */}
              <div className="flex flex-wrap items-center gap-4 text-xs text-stone-500 dark:text-stone-400 pb-4 border-b border-stone-200 dark:border-stone-800 font-medium">
                <span className="flex items-center gap-1.5">
                  <User className="h-4 w-4 text-[#800000] dark:text-[#D4AF37]" />
                  Written by: <strong>{selectedPost.author}</strong>
                </span>
                <span>•</span>
                <span className="flex items-center gap-1.5">
                  <Calendar className="h-4 w-4" />
                  Published: {selectedPost.date}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1.5">
                  <Clock className="h-4 w-4" />
                  {selectedPost.readTime}
                </span>
              </div>

              {/* Full Content */}
              <div className="font-sans text-sm sm:text-base text-stone-800 dark:text-stone-200 leading-relaxed whitespace-pre-line space-y-4">
                <p>{selectedPost.content}</p>
              </div>

              {/* Ghee Seal Signature footer */}
              <div className="p-4 bg-[#800000]/5 dark:bg-[#D4AF37]/5 rounded-none border border-[#800000]/10 dark:border-[#D4AF37]/15 flex items-center gap-3">
                <span className="text-2xl">🍬</span>
                <div className="text-xs">
                  <p className="font-bold text-stone-800 dark:text-cream-100 flex items-center gap-1">
                    <Sparkles className="h-3.5 w-3.5 text-[#D4AF37]" />
                    Gokul Tradition Seal
                  </p>
                  <p className="text-stone-500 dark:text-stone-400 mt-0.5">
                    We pledge to cook with authentic Ghee and hand-rolled methods, preserving absolute heritage in every bite.
                  </p>
                </div>
              </div>

            </div>

          </div>
        </div>
      )}

    </section>
  );
}
