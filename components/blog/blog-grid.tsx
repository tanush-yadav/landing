/**
 * BlogGrid Component
 *
 * Responsive grid layout for blog posts with filtering and search capabilities
 */

'use client'

import React, { useState, useMemo, useCallback } from 'react'
import { motion } from 'framer-motion'
import { Search, Filter, X } from 'lucide-react'
import BlogCard from './blog-card'
import { BlogPost, BlogFilters, BlogCategory } from '@/lib/types'
import { cn, animations } from '@/lib/design-system'
import { Button } from '@/components/ui/button'

interface BlogGridProps {
  posts: BlogPost[]
  categories?: BlogCategory[]
  onPostClick?: (slug: string) => void
  showSearch?: boolean
  showFilters?: boolean
  className?: string
}

const BlogGrid: React.FC<BlogGridProps> = ({
  posts,
  categories = [],
  showSearch = true,
  showFilters = true,
  className,
}) => {
  const [filters, setFilters] = useState<BlogFilters>({
    search: '',
    category: '',
    sortBy: 'publishedAt',
    sortOrder: 'desc',
  })

  const [showFiltersPanel, setShowFiltersPanel] = useState(false)
  const [visiblePosts, setVisiblePosts] = useState(6)
  const [isLoadingMore, setIsLoadingMore] = useState(false)

  // Filter and sort posts based on current filters
  const filteredPosts = useMemo(() => {
    let filtered = [...posts]

    // Search filter
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase()
      filtered = filtered.filter(
        (post) =>
          post.title.toLowerCase().includes(searchTerm) ||
          post.excerpt.toLowerCase().includes(searchTerm) ||
          post.tags.some((tag) => tag.toLowerCase().includes(searchTerm)) ||
          post.author.name.toLowerCase().includes(searchTerm)
      )
    }

    // Category filter
    if (filters.category) {
      filtered = filtered.filter((post) => post.category === filters.category)
    }

    // Tag filter
    if (filters.tags && filters.tags.length > 0) {
      filtered = filtered.filter((post) =>
        filters.tags!.some((tag) =>
          post.tags.some(
            (postTag) => postTag.toLowerCase() === tag.toLowerCase()
          )
        )
      )
    }

    // Reading time filter
    if (filters.readTimeRange) {
      filtered = filtered.filter((post) => {
        const time = post.readTime
        switch (filters.readTimeRange) {
          case 'short':
            return time < 5
          case 'medium':
            return time >= 5 && time <= 10
          case 'long':
            return time > 10
          default:
            return true
        }
      })
    }

    // Sort posts
    filtered.sort((a, b) => {
      let aValue: string | number, bValue: string | number

      switch (filters.sortBy) {
        case 'title':
          aValue = a.title.toLowerCase()
          bValue = b.title.toLowerCase()
          break
        case 'readTime':
          aValue = a.readTime
          bValue = b.readTime
          break
        case 'publishedAt':
        default:
          aValue = new Date(a.publishedAt).getTime()
          bValue = new Date(b.publishedAt).getTime()
          break
      }

      if (filters.sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1
      } else {
        return aValue < bValue ? 1 : -1
      }
    })

    return filtered
  }, [posts, filters])

  const handleSearchChange = (value: string) => {
    setFilters((prev) => ({ ...prev, search: value }))
  }

  const handleCategoryFilter = (category: string) => {
    setFilters((prev) => ({
      ...prev,
      category: prev.category === category ? '' : category,
    }))
  }

  const clearFilters = () => {
    setFilters({
      search: '',
      category: '',
      sortBy: 'publishedAt',
      sortOrder: 'desc',
      readTimeRange: undefined,
    })
    setShowFiltersPanel(false)
  }

  const hasActiveFilters =
    filters.search ||
    filters.category ||
    (filters.tags && filters.tags.length > 0) ||
    filters.readTimeRange

  // Paginated posts
  const paginatedPosts = useMemo(() => {
    return filteredPosts.slice(0, visiblePosts)
  }, [filteredPosts, visiblePosts])

  // Load more handler with animation
  const handleLoadMore = useCallback(() => {
    setIsLoadingMore(true)
    // Simulate loading animation
    setTimeout(() => {
      setVisiblePosts((prev) => Math.min(prev + 6, filteredPosts.length))
      setIsLoadingMore(false)
    }, 300)
  }, [filteredPosts.length])

  // Reset visible posts when filters change
  React.useEffect(() => {
    setVisiblePosts(6)
  }, [filters])

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
                  'w-full pl-10 pr-4 py-4 rounded-lg border border-gray-300',
                  'bg-white/80 backdrop-blur-sm',
                  'focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent',
                  'placeholder:text-gray-400 transition-all duration-200',
                  // Mobile touch target
                  'min-h-[48px]',
                  '-webkit-tap-highlight-color-transparent'
                )}
              />
            </div>
          )}

          {/* Filter Controls */}
          {showFilters && (
            <div className="flex items-center gap-2">
              <motion.button
                onClick={() => setShowFiltersPanel(!showFiltersPanel)}
                className={cn(
                  'relative inline-flex items-center gap-2 px-4 py-2',
                  'rounded-lg backdrop-blur-md bg-white/60 border border-white/30',
                  'text-sm font-medium text-gray-700',
                  'hover:bg-white/80 hover:shadow-md transition-all duration-200',
                  'overflow-hidden group',
                  // Mobile touch target
                  'min-h-[48px]',
                  '-webkit-tap-highlight-color-transparent',
                  'active:bg-white/90'
                )}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {/* Shimmer effect */}
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/40 to-transparent" />

                <Filter className="h-4 w-4 relative z-10" />
                <span className="relative z-10">Filters</span>
                {hasActiveFilters && (
                  <motion.span
                    className="ml-1 bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center relative z-10"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 500 }}
                  >
                    {
                      [
                        filters.search,
                        filters.category,
                        filters.tags && filters.tags.length > 0,
                        filters.readTimeRange,
                      ].filter(Boolean).length
                    }
                  </motion.span>
                )}
              </motion.button>

              {hasActiveFilters && (
                <motion.button
                  onClick={clearFilters}
                  className={cn(
                    'px-4 py-2 text-sm font-medium text-gray-500',
                    'hover:text-gray-700 transition-colors duration-200',
                    // Mobile touch target
                    'min-h-[48px]',
                    '-webkit-tap-highlight-color-transparent',
                    'active:text-gray-900'
                  )}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Clear
                </motion.button>
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
              className="text-gray-400 hover:text-gray-600 p-2 -m-2 rounded-lg transition-colors min-h-[48px] min-w-[48px] flex items-center justify-center -webkit-tap-highlight-color-transparent active:bg-gray-100"
            >
              <X className="h-5 w-5" />
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
                  {categories.map((category, index) => (
                    <motion.button
                      key={category.id}
                      onClick={() => handleCategoryFilter(category.name)}
                      className={cn(
                        'relative inline-flex items-center px-4 py-2 text-sm font-medium',
                        'rounded-lg backdrop-blur-md transition-all duration-200',
                        'overflow-hidden group',
                        // Mobile touch targets
                        'min-h-[48px] min-w-[48px]',
                        '-webkit-tap-highlight-color-transparent',
                        'active:bg-gray-100/50',
                        filters.category === category.name
                          ? 'bg-gradient-to-r from-white/90 to-white/70 text-indigo-800 border border-white/50 shadow-md'
                          : 'bg-white/60 text-gray-700 border border-white/30 hover:bg-white/80 hover:shadow-md'
                      )}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.05 }}
                      whileHover={{
                        scale: 1.05,
                        rotate: index % 2 === 0 ? 0.5 : -0.5,
                      }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {/* Shimmer effect */}
                      <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/40 to-transparent" />

                      <span
                        className={cn(
                          'relative z-10 font-semibold',
                          filters.category === category.name
                            ? 'bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent'
                            : ''
                        )}
                      >
                        {category.name}
                      </span>
                      <span className="ml-1.5 text-xs opacity-70 relative z-10">
                        {category.postCount}
                      </span>
                    </motion.button>
                  ))}
                </div>
              </div>
            )}

            {/* Sort and Filter Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Sort Options */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Sort By
                </label>
                <select
                  value={`${filters.sortBy}-${filters.sortOrder}`}
                  onChange={(e) => {
                    const [sortBy, sortOrder] = e.target.value.split('-')
                    setFilters((prev) => ({
                      ...prev,
                      sortBy: sortBy as 'publishedAt' | 'title' | 'readTime',
                      sortOrder: sortOrder as 'asc' | 'desc',
                    }))
                  }}
                  className="block w-full px-4 py-3 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 min-h-[48px] -webkit-tap-highlight-color-transparent"
                >
                  <optgroup label="Date">
                    <option value="publishedAt-desc">Latest</option>
                    <option value="publishedAt-asc">Oldest</option>
                  </optgroup>
                  <optgroup label="Title">
                    <option value="title-asc">A → Z</option>
                    <option value="title-desc">Z → A</option>
                  </optgroup>
                  <optgroup label="Reading Time">
                    <option value="readTime-asc">Quick Reads First</option>
                    <option value="readTime-desc">Long Reads First</option>
                  </optgroup>
                </select>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Results Count */}
      <div className="text-sm text-gray-600">
        {filteredPosts.length === posts.length
          ? `Showing all ${posts.length} articles`
          : `Showing ${filteredPosts.length} of ${posts.length} articles`}
      </div>

      {/* Posts Grid */}
      {paginatedPosts.length > 0 ? (
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
                staggerChildren: 0.1,
              },
            },
          }}
        >
          {paginatedPosts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
                ease: [0.4, 0, 0.2, 1],
              }}
            >
              <BlogCard
                post={post}
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
              Try adjusting your search terms or filters to find what
              you&apos;re looking for.
            </p>
            {hasActiveFilters && (
              <Button onClick={clearFilters} variant="outline" size="sm">
                Clear all filters
              </Button>
            )}
          </div>
        </motion.div>
      )}

      {/* Load More Button */}
      {filteredPosts.length > 0 && visiblePosts < filteredPosts.length && (
        <motion.div
          className="flex justify-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <motion.button
            onClick={handleLoadMore}
            disabled={isLoadingMore}
            className={cn(
              'relative inline-flex items-center gap-3 px-6 sm:px-8 py-3 sm:py-4',
              'rounded-xl backdrop-blur-md bg-white/60 border border-white/30',
              'text-base font-semibold text-gray-700',
              'hover:bg-white/80 hover:shadow-lg hover:border-indigo-200',
              'focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2',
              'transition-all duration-200',
              'disabled:opacity-50 disabled:cursor-not-allowed',
              'overflow-hidden group',
              // Mobile touch target
              'min-h-[48px]',
              '-webkit-tap-highlight-color-transparent',
              'active:bg-white/90'
            )}
            whileHover={!isLoadingMore ? { scale: 1.05 } : {}}
            whileTap={!isLoadingMore ? { scale: 0.95 } : {}}
          >
            {/* Shimmer effect */}
            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/40 to-transparent" />

            <span className="relative z-10">
              {isLoadingMore ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-gray-700 inline"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Loading...
                </>
              ) : (
                `Load More Articles (${
                  filteredPosts.length - visiblePosts
                } remaining)`
              )}
            </span>
          </motion.button>
        </motion.div>
      )}
    </div>
  )
}

export default BlogGrid
