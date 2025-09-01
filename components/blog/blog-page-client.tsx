'use client';

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import BlogHero from '@/components/blog/blog-hero'
import BlogGrid from '@/components/blog/blog-grid'
import Breadcrumb from '@/components/ui/breadcrumb'
import { BlogPost, BlogCategory } from '@/lib/types'

interface BlogPageClientProps {
  initialPosts: BlogPost[];
  categories: BlogCategory[];
}

export default function BlogPageClient({ initialPosts, categories }: BlogPageClientProps) {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory] = useState<string>('');

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    // Scroll to results
    document.getElementById('blog-results')?.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start' 
    });
  };

  const handlePostClick = (slug: string) => {
    router.push(`/blog/${slug}`);
  };

  // Filter posts based on search query
  const filteredPosts = searchQuery
    ? initialPosts.filter(post => {
        const query = searchQuery.toLowerCase();
        return post.title.toLowerCase().includes(query) ||
               post.excerpt.toLowerCase().includes(query) ||
               post.tags.some(tag => tag.toLowerCase().includes(query)) ||
               post.category.toLowerCase().includes(query);
      })
    : initialPosts;

  // Breadcrumb items
  const breadcrumbItems = [
    { label: 'Blog', href: '/blog', current: !activeCategory },
    ...(activeCategory ? [{ label: activeCategory, current: true }] : [])
  ];

  return (
    <>
      {/* Hero Section */}
      <BlogHero onSearch={handleSearch} />
      
      {/* Breadcrumb Navigation */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={breadcrumbItems} />
        </div>
      </div>
      
      {/* Blog Content */}
      <section className="py-16 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div id="blog-results">
            <BlogGrid
              posts={filteredPosts}
              categories={categories}
              onPostClick={handlePostClick}
              showSearch={!searchQuery} // Hide search in grid if hero search is active
              showFilters={true}
            />
          </div>
        </div>
      </section>

      {/* Enhanced Newsletter CTA Section with Premium Glassmorphic Design */}
      <section className="relative py-20 overflow-hidden">
        {/* Animated gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-indigo-600 to-emerald-600">
          <div className="absolute inset-0 bg-gradient-to-t from-purple-600/50 via-transparent to-blue-600/50 animate-gradient-shift" />
        </div>
        
        {/* Animated blurred circles for depth */}
        <div className="absolute inset-0">
          <motion.div 
            className="absolute top-10 left-10 w-96 h-96 bg-white/10 rounded-full blur-3xl"
            animate={{
              x: [0, 30, 0],
              y: [0, -20, 0],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div 
            className="absolute bottom-10 right-10 w-80 h-80 bg-emerald-400/10 rounded-full blur-3xl"
            animate={{
              x: [0, -40, 0],
              y: [0, 30, 0],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-400/5 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        </div>
        
        {/* Glass container */}
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 p-12 shadow-2xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h2 
              className="text-4xl font-bold text-white mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              Stay Updated with AI Automation Trends
            </motion.h2>
            <motion.p 
              className="text-xl text-white/90 mb-10 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              Get the latest insights delivered directly to your inbox. Join 500+ teams already transforming their workflows.
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-5 py-4 rounded-xl bg-white/20 backdrop-blur-md text-white placeholder:text-white/60 border border-white/30 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-white/50 transition-all duration-200 min-h-[48px]"
              />
              <motion.button 
                className="px-8 py-4 bg-white text-blue-600 font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 min-h-[48px] min-w-[120px]"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Subscribe
              </motion.button>
            </motion.div>
            
            <motion.p 
              className="text-sm text-white/70 mt-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              ✨ No spam. Unsubscribe anytime.
            </motion.p>
          </motion.div>
        </div>
      </section>
    </>
  )
}