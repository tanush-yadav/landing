'use client';

import { useState, Suspense } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import dynamic from 'next/dynamic'
import BlogErrorBoundary from '@/components/blog/blog-error-boundary'
import Breadcrumb from '@/components/ui/breadcrumb'
import { BlogPost, BlogCategory } from '@/lib/types'
import BlogSkeleton from '@/components/blog/blog-skeleton'

// Lazy load components for better performance
const BlogHero = dynamic(() => import('@/components/blog/blog-hero'), {
  loading: () => <div className="h-96 bg-gradient-to-br from-indigo-50 to-blue-50 animate-pulse" />,
  ssr: true
})

const BlogGrid = dynamic(() => import('@/components/blog/blog-grid'), {
  loading: () => <BlogSkeleton />,
  ssr: true
})

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
    <BlogErrorBoundary>
      {/* Hero Section */}
      <Suspense fallback={<div className="h-96 bg-gradient-to-br from-indigo-50 to-blue-50 animate-pulse" />}>
        <BlogHero onSearch={handleSearch} />
      </Suspense>
      
      {/* Breadcrumb Navigation */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={breadcrumbItems} />
        </div>
      </div>
      
      {/* Blog Content */}
      <section className="py-12 sm:py-16 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div id="blog-results">
            <Suspense fallback={<BlogSkeleton />}>
              <BlogGrid
                posts={filteredPosts}
                categories={categories}
                onPostClick={handlePostClick}
                showSearch={!searchQuery} // Hide search in grid if hero search is active
                showFilters={true}
              />
            </Suspense>
          </div>
        </div>
      </section>

      {/* Clean Newsletter CTA Section */}
      <section className="py-16 sm:py-20 bg-linear-bg-primary">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="bg-linear-bg-secondary rounded-2xl border border-linear-border-subtle p-8 sm:p-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-display text-3xl sm:text-4xl text-linear-text-primary mb-4">
              Stay Updated
            </h2>
            <p className="text-lg text-linear-text-secondary mb-8 max-w-xl mx-auto">
              Get the latest AI automation insights delivered to your inbox
            </p>
            
            <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 bg-linear-bg-primary border border-linear-border-default rounded-lg text-linear-text-primary placeholder:text-linear-text-quaternary focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200 min-h-[48px]"
                required
                aria-label="Email subscription"
              />
              <motion.button 
                type="submit"
                className="px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg transition-colors duration-200 min-h-[48px] flex items-center justify-center"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                aria-label="Subscribe to newsletter"
              >
                Subscribe
              </motion.button>
            </form>
            
            <p className="text-sm text-linear-text-tertiary mt-6">
              No spam, unsubscribe anytime
            </p>
          </motion.div>
        </div>
      </section>
    </BlogErrorBoundary>
  )
}
