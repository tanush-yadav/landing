'use client';

import { Metadata } from 'next'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Navigation from '@/components/navigation'
import BlogHero from '@/components/blog/blog-hero'
import BlogGrid from '@/components/blog/blog-grid'
import { blogPosts, blogCategories } from '@/lib/data/blog-posts'

// Note: This metadata export will work in the client component setup
// For production, consider moving to a server component if SSR is needed
const pageMetadata = {
  title: 'Blog - Cintra',
  description: 'Latest insights on AI automation, agentic workflows, and team productivity.',
}

export default function BlogPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');

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
    ? blogPosts.filter(post => {
        const query = searchQuery.toLowerCase();
        return post.title.toLowerCase().includes(query) ||
               post.excerpt.toLowerCase().includes(query) ||
               post.tags.some(tag => tag.toLowerCase().includes(query)) ||
               post.category.toLowerCase().includes(query);
      })
    : blogPosts;

  return (
    <main className="min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <BlogHero onSearch={handleSearch} />
      
      {/* Blog Content */}
      <section className="py-16 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div id="blog-results">
            <BlogGrid
              posts={filteredPosts}
              categories={blogCategories}
              onPostClick={handlePostClick}
              showSearch={!searchQuery} // Hide search in grid if hero search is active
              showFilters={true}
            />
          </div>
        </div>
      </section>

      {/* Newsletter CTA Section */}
      <section className="py-16 bg-gradient-to-r from-indigo-600 to-purple-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Stay Updated with AI Automation Trends
          </h2>
          <p className="text-xl text-indigo-100 mb-8">
            Get the latest insights delivered directly to your inbox. Join 500+ teams already transforming their workflows.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg bg-white text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-white/20"
            />
            <button className="px-6 py-3 bg-white text-indigo-600 font-semibold rounded-lg hover:bg-gray-50 transition-colors duration-200">
              Subscribe
            </button>
          </div>
          <p className="text-sm text-indigo-200 mt-4">
            No spam. Unsubscribe anytime.
          </p>
        </div>
      </section>
    </main>
  )
}