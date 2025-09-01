'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowLeft, Clock } from 'lucide-react';
import Image from 'next/image';
import Navigation from '@/components/navigation';
import { animations } from '@/lib/design-system';
import '@/styles/blog-post.css';

interface BlogPostClientProps {
  post: {
    title: string;
    description?: string;
    excerpt?: string;
    date: string;
    author: string;
    slug: string;
    category?: string;
    featuredImage?: string;
    readTime?: number;
    content: string;
    htmlContent: string;
  };
}

export default function BlogPostClient({ post }: BlogPostClientProps) {
  const router = useRouter();
  const [readingProgress, setReadingProgress] = useState(0);

  // Reading progress indicator
  const handleScroll = useCallback(() => {
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    const currentProgress = (window.scrollY / totalHeight) * 100;
    setReadingProgress(Math.min(100, Math.max(0, currentProgress)));
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <main className="min-h-screen bg-white">
      <Navigation />
      
      {/* Reading Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-0.5 bg-gray-100 z-50">
        <div 
          className="h-full bg-indigo-600 transition-all duration-150 ease-out"
          style={{ width: `${readingProgress}%` }}
        />
      </div>

      {/* Back Button */}
      <div className="pt-24 md:pt-28 pb-6">
        <div className="max-w-[680px] mx-auto px-5 sm:px-6">
          <button
            onClick={() => router.push('/blog')}
            className="inline-flex items-center text-sm text-gray-500 hover:text-gray-900 transition-colors group"
          >
            <ArrowLeft className="h-3.5 w-3.5 mr-1.5 transition-transform group-hover:-translate-x-1" />
            <span>Back to blog</span>
          </button>
        </div>
      </div>

      {/* Article Header */}
      <header>
        <div className="max-w-[680px] mx-auto px-5 sm:px-6">
          <motion.div
            initial={animations.fadeIn.initial}
            animate={animations.fadeIn.animate}
            transition={{ duration: 0.6 }}
          >
            {/* Category Badge */}
            {post.category && (
              <div className="mb-4">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-indigo-50 text-indigo-700 uppercase tracking-wider">
                  {post.category}
                </span>
              </div>
            )}

            {/* Title - Medium-style large font */}
            <h1 className="font-display text-[2rem] sm:text-[2.5rem] md:text-[3rem] leading-[1.1] text-gray-900 mb-6 tracking-tight">
              {post.title}
            </h1>

            {/* Subtitle/Excerpt - Medium-style */}
            {(post.excerpt || post.description) && (
              <p className="text-[1.25rem] sm:text-[1.375rem] text-gray-600 mb-8 leading-[1.5] font-light">
                {post.excerpt || post.description}
              </p>
            )}

            {/* Author Info Row - Medium-style */}
            <div className="flex items-center gap-4 pb-8 border-b border-gray-200">
              <div className="relative h-12 w-12 overflow-hidden rounded-full bg-gradient-to-br from-indigo-400 to-purple-400">
                <div className="flex items-center justify-center h-full text-white font-medium text-lg">
                  {post.author.charAt(0).toUpperCase()}
                </div>
              </div>
              
              <div className="flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-medium text-gray-900">{post.author}</span>
                  <span className="text-gray-400">·</span>
                  <span className="text-gray-600 text-sm">{formatDate(post.date)}</span>
                  {post.readTime && (
                    <>
                      <span className="text-gray-400">·</span>
                      <span className="text-gray-600 text-sm flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5" />
                        {post.readTime} min read
                      </span>
                    </>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </header>

      {/* Featured Image - Full width on mobile, constrained on desktop */}
      {post.featuredImage && (
        <motion.div 
          className="mt-8 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="max-w-[860px] mx-auto px-0 sm:px-6">
            <div className="relative h-[280px] sm:h-[400px] md:h-[480px] sm:rounded-xl overflow-hidden bg-gray-100">
              <Image
                src={post.featuredImage}
                alt={post.title}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 640px) 100vw, (max-width: 860px) 860px, 860px"
              />
            </div>
          </div>
        </motion.div>
      )}

      {/* Article Content - Medium-style Typography */}
      <article className="pb-16 sm:pb-24">
        <motion.div 
          className="max-w-[680px] mx-auto px-5 sm:px-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div 
            className="medium-content prose prose-lg prose-gray max-w-none"
            dangerouslySetInnerHTML={{ __html: post.htmlContent }}
          />
        </motion.div>
      </article>

      {/* Author Bio Section */}
      <section className="py-12 border-t border-gray-200">
        <div className="max-w-[680px] mx-auto px-5 sm:px-6">
          <div className="flex items-start gap-4">
            <div className="relative h-16 w-16 overflow-hidden rounded-full bg-gradient-to-br from-indigo-400 to-purple-400 flex-shrink-0">
              <div className="flex items-center justify-center h-full text-white font-medium text-2xl">
                {post.author.charAt(0).toUpperCase()}
              </div>
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900 mb-1">Written by {post.author}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Building the future of AI-powered automation at Volition Labs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Back to Blog - Bottom */}
      <section className="py-12 sm:py-16 border-t border-gray-100">
        <div className="max-w-[680px] mx-auto px-5 sm:px-6 text-center">
          <button
            onClick={() => router.push('/blog')}
            className="inline-flex items-center px-6 py-3 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors group font-medium"
          >
            <ArrowLeft className="h-4 w-4 mr-2 transition-transform group-hover:-translate-x-1" />
            <span>Back to All Articles</span>
          </button>
        </div>
      </section>
    </main>
  );
}