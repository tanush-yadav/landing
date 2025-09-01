/**
 * BlogHero Component
 * 
 * Hero section for the blog page with title, description, and search functionality
 */

'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, TrendingUp, BookOpen, Users, Lightbulb } from 'lucide-react';
import { cn, typography } from '@/lib/design-system';

interface BlogHeroProps {
  onSearch?: (query: string) => void;
  className?: string;
}

const BlogHero: React.FC<BlogHeroProps> = ({
  onSearch,
  className
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch && searchQuery.trim()) {
      onSearch(searchQuery.trim());
    }
  };

  const quickSearchTopics = [
    { label: 'AI Automation', icon: TrendingUp },
    { label: 'Best Practices', icon: Lightbulb },
    { label: 'Team Management', icon: Users },
    { label: 'Workflows', icon: BookOpen }
  ];

  return (
    <section 
      data-testid="blog-hero"
      className={cn(
        'relative overflow-hidden py-20 lg:py-28',
        'bg-gradient-to-br from-indigo-50 via-white to-purple-50',
        className
      )}
    >
      {/* Background Elements */}
      <div className="absolute inset-0">
        {/* Floating orbs for visual appeal */}
        <div className="absolute top-20 left-10 w-64 h-64 bg-indigo-200/30 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-purple-200/30 rounded-full blur-3xl animate-float-delayed" />
        
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-grid-white/[0.02]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="inline-flex items-center px-4 py-2 rounded-full bg-white/60 backdrop-blur-sm border border-white/20 text-sm font-medium text-indigo-600 mb-6"
          >
            <TrendingUp className="h-4 w-4 mr-2" />
            Latest Insights & Updates
          </motion.div>

          {/* Main Title */}
          <motion.h1
            data-testid="hero-title"
            className={cn(
              typography.h1,
              'text-gray-900 mb-6',
              'bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent'
            )}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Insights & Updates
          </motion.h1>

          {/* Description */}
          <motion.p
            data-testid="hero-description"
            className="text-xl text-gray-600 mb-8 leading-relaxed max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Latest insights on AI automation, agentic workflows, and team productivity. 
            Learn how leading teams are transforming their work with AI.
          </motion.p>

          {/* Search Section */}
          <motion.div
            data-testid="search-section"
            className="mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <form onSubmit={handleSearchSubmit} className="max-w-2xl mx-auto">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  data-testid="search-input"
                  type="text"
                  placeholder="Search articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={cn(
                    'block w-full pl-12 pr-4 py-4 text-lg',
                    'bg-white/80 backdrop-blur-md border border-white/20 rounded-2xl',
                    'placeholder:text-gray-400 text-gray-900',
                    'focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent',
                    'shadow-lg hover:shadow-xl transition-all duration-200'
                  )}
                />
                {searchQuery && (
                  <button
                    type="submit"
                    className={cn(
                      'absolute inset-y-0 right-0 pr-4 flex items-center',
                      'text-indigo-600 hover:text-indigo-700 transition-colors'
                    )}
                  >
                    <Search className="h-5 w-5" />
                  </button>
                )}
              </div>
            </form>

            {/* Quick Search Topics */}
            <div className="mt-6">
              <p className="text-sm text-gray-500 mb-3">Popular topics:</p>
              <div className="flex flex-wrap gap-2 justify-center">
                {quickSearchTopics.map((topic, index) => (
                  <motion.button
                    key={topic.label}
                    onClick={() => {
                      setSearchQuery(topic.label);
                      if (onSearch) {
                        onSearch(topic.label);
                      }
                    }}
                    className={cn(
                      'inline-flex items-center px-4 py-2 rounded-full',
                      'bg-white/60 backdrop-blur-sm border border-white/20',
                      'text-sm font-medium text-gray-700',
                      'hover:bg-white/80 hover:shadow-md hover:scale-105',
                      'transition-all duration-200'
                    )}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: 0.8 + (index * 0.1) }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <topic.icon className="h-4 w-4 mr-2" />
                    {topic.label}
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Stats Section */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            {[
              { label: 'Articles', value: '25+' },
              { label: 'Categories', value: '4' },
              { label: 'Authors', value: '8' }
            ].map((stat, index) => (
              <div
                key={stat.label}
                className={cn(
                  'bg-white/60 backdrop-blur-sm border border-white/20 rounded-2xl p-6',
                  'hover:bg-white/80 transition-all duration-200'
                )}
              >
                <div className="text-2xl font-bold text-gray-900">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-600">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default BlogHero;