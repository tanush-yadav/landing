/**
 * BlogGrid Component
 * 
 * Responsive grid layout for blog posts with filtering and search capabilities
 */

'use client';

import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, X } from 'lucide-react';
import BlogCard from './blog-card';
import { BlogPost, BlogFilters, BlogCategory } from '@/lib/types';
import { cn, animations } from '@/lib/design-system';
import { Button } from '@/components/ui/button';

interface BlogGridProps {
  posts: BlogPost[];
  categories?: BlogCategory[];
  onPostClick?: (slug: string) => void;
  showSearch?: boolean;
  showFilters?: boolean;
  className?: string;
}

const BlogGrid: React.FC<BlogGridProps> = ({
  posts,
  categories = [],
  onPostClick,
  showSearch = true,
  showFilters = true,
  className
}) => {
  const [filters, setFilters] = useState<BlogFilters>({
    search: '',
    category: '',
    sortBy: 'publishedAt',
    sortOrder: 'desc'
  });

  const [showFiltersPanel, setShowFiltersPanel] = useState(false);

  // Filter and sort posts based on current filters
  const filteredPosts = useMemo(() => {
    let filtered = [...posts];

    // Search filter
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      filtered = filtered.filter(post =>
        post.title.toLowerCase().includes(searchTerm) ||
        post.excerpt.toLowerCase().includes(searchTerm) ||
        post.tags.some(tag => tag.toLowerCase().includes(searchTerm)) ||
        post.author.name.toLowerCase().includes(searchTerm)
      );
    }

    // Category filter
    if (filters.category) {
      filtered = filtered.filter(post => 
        post.category === filters.category
      );
    }

    // Tag filter
    if (filters.tags && filters.tags.length > 0) {
      filtered = filtered.filter(post =>
        filters.tags!.some(tag =>
          post.tags.some(postTag => 
            postTag.toLowerCase() === tag.toLowerCase()
          )
        )
      );
    }

    // Sort posts
    filtered.sort((a, b) => {
      let aValue: string | number, bValue: string | number;

      switch (filters.sortBy) {
        case 'title':
          aValue = a.title.toLowerCase();
          bValue = b.title.toLowerCase();
          break;
        case 'readTime':
          aValue = a.readTime;
          bValue = b.readTime;
          break;
        case 'publishedAt':
        default:
          aValue = new Date(a.publishedAt).getTime();
          bValue = new Date(b.publishedAt).getTime();
          break;
      }

      if (filters.sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    return filtered;
  }, [posts, filters]);

  const handleSearchChange = (value: string) => {
    setFilters(prev => ({ ...prev, search: value }));
  };

  const handleCategoryFilter = (category: string) => {
    setFilters(prev => ({ 
      ...prev, 
      category: prev.category === category ? '' : category 
    }));
  };

  const clearFilters = () => {
    setFilters({
      search: '',
      category: '',
      sortBy: 'publishedAt',
      sortOrder: 'desc'
    });
    setShowFiltersPanel(false);
  };

  const hasActiveFilters = filters.search || filters.category || (filters.tags && filters.tags.length > 0);

  return (
    <div data-testid="blog-grid" className={cn('space-y-8', className)}>
      {/* Search and Filter Header */}
      {(showSearch || showFilters) && (
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          {/* Search Input */}
          {showSearch && (
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                data-testid="search-input"
                type="text"
                placeholder="Search articles..."
                value={filters.search}
                onChange={(e) => handleSearchChange(e.target.value)}
                className={cn(
                  'w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300',
                  'bg-white/80 backdrop-blur-sm',
                  'focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent',
                  'placeholder:text-gray-400 transition-all duration-200'
                )}
              />
            </div>
          )}

          {/* Filter Controls */}
          {showFilters && (
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowFiltersPanel(!showFiltersPanel)}
                className="flex items-center gap-2"
              >
                <Filter className="h-4 w-4" />
                Filters
                {hasActiveFilters && (
                  <span className="ml-1 bg-indigo-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    1
                  </span>
                )}
              </Button>

              {hasActiveFilters && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearFilters}
                  className="text-gray-500 hover:text-gray-700"
                >
                  Clear
                </Button>
              )}
            </div>
          )}
        </div>
      )}

      {/* Filters Panel */}
      {showFilters && showFiltersPanel && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="bg-white/80 backdrop-blur-md rounded-lg p-6 border border-white/20"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-medium text-gray-900">Filter Articles</h3>
            <button
              onClick={() => setShowFiltersPanel(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="space-y-4">
            {/* Categories */}
            {categories.length > 0 && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Categories
                </label>
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => handleCategoryFilter(category.name)}
                      className={cn(
                        'inline-flex items-center px-3 py-1.5 text-sm font-medium rounded-full border transition-colors',
                        filters.category === category.name
                          ? 'bg-indigo-100 text-indigo-800 border-indigo-200'
                          : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100'
                      )}
                    >
                      {category.name}
                      <span className="ml-1 text-xs opacity-60">
                        {category.postCount}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Sort Options */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Sort By
              </label>
              <select
                value={`${filters.sortBy}-${filters.sortOrder}`}
                onChange={(e) => {
                  const [sortBy, sortOrder] = e.target.value.split('-');
                  setFilters(prev => ({ 
                    ...prev, 
                    sortBy: sortBy as 'publishedAt' | 'title' | 'readTime', 
                    sortOrder: sortOrder as 'asc' | 'desc' 
                  }));
                }}
                className="block w-full px-3 py-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="publishedAt-desc">Newest First</option>
                <option value="publishedAt-asc">Oldest First</option>
                <option value="title-asc">Title A-Z</option>
                <option value="title-desc">Title Z-A</option>
                <option value="readTime-asc">Shortest Read</option>
                <option value="readTime-desc">Longest Read</option>
              </select>
            </div>
          </div>
        </motion.div>
      )}

      {/* Results Count */}
      <div className="text-sm text-gray-600">
        {filteredPosts.length === posts.length ? (
          `Showing all ${posts.length} articles`
        ) : (
          `Showing ${filteredPosts.length} of ${posts.length} articles`
        )}
      </div>

      {/* Posts Grid */}
      {filteredPosts.length > 0 ? (
        <motion.div
          className={cn(
            'grid gap-8',
            'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
          )}
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.1
              }
            }
          }}
        >
          {filteredPosts.map((post, index) => (
            <motion.div
              key={post.id}
              variants={animations.slideInUp}
              transition={{ delay: index * 0.1 }}
            >
              <BlogCard
                post={post}
                onReadMore={onPostClick}
                priority={index < 3} // Load first 3 images with priority
              />
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <motion.div
          data-testid="empty-state"
          className="text-center py-16"
          initial={animations.fadeIn.initial}
          animate={animations.fadeIn.animate}
        >
          <div className="bg-white/80 backdrop-blur-md rounded-2xl p-8 border border-white/20 max-w-md mx-auto">
            <div className="text-gray-400 mb-4">
              <Search className="h-12 w-12 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No articles found
            </h3>
            <p className="text-gray-600 mb-4">
              Try adjusting your search terms or filters to find what you&apos;re looking for.
            </p>
            {hasActiveFilters && (
              <Button onClick={clearFilters} variant="outline" size="sm">
                Clear all filters
              </Button>
            )}
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default BlogGrid;