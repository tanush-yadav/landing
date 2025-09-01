/**
 * Enhanced Blog Post Client Component
 * Integrates all blog interlinking features: related posts, navigation, bookmarks, analytics
 */

'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Clock, Calendar, Tag } from 'lucide-react';
import DOMPurify from 'isomorphic-dompurify';

// Import our interlinking components
import ReadingProgress from './reading-progress';
import RelatedPosts from './related-posts';
import PostNavigation from './post-navigation';
import BookmarkButton from './bookmark-button';
import TableOfContents from './table-of-contents';

// Import utilities
import { BlogPost } from '@/lib/types';
import { 
  trackBlogInteraction, 
  highlightSearchTerms, 
  setAllPosts 
} from '@/lib/blog-interlinking';
import { getDefaultBlogImage } from '@/lib/blog-defaults';

interface EnhancedBlogPostClientProps {
  post: BlogPost;
  allPosts: BlogPost[];
  previousPost?: BlogPost;
  nextPost?: BlogPost;
  highlightTerms?: string[];
}

const EnhancedBlogPostClient: React.FC<EnhancedBlogPostClientProps> = ({
  post,
  allPosts,
  previousPost,
  nextPost,
  highlightTerms = []
}) => {
  const [showStickyHeader, setShowStickyHeader] = useState(false);
  const [readingStartTime] = useState(Date.now());
  const contentRef = useRef<HTMLDivElement>(null);
  const lastScrollY = useRef(0);

  // Initialize all posts for interlinking system
  useEffect(() => {
    setAllPosts(allPosts);
  }, [allPosts]);

  // Track page view and setup scroll tracking
  useEffect(() => {
    // Track initial page view
    trackBlogInteraction(post.slug, 'view', {
      title: post.title,
      category: post.category,
      source: 'direct',
      referrer: document.referrer
    });

    // Setup scroll tracking for sticky header
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Show sticky header after scrolling past the main header
      if (currentScrollY > 400) {
        if (currentScrollY < lastScrollY.current) {
          setShowStickyHeader(true);
        } else {
          setShowStickyHeader(false);
        }
      } else {
        setShowStickyHeader(false);
      }
      
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      
      // Track reading session end
      const sessionDuration = Date.now() - readingStartTime;
      if (sessionDuration > 10000) { // Only track if spent more than 10 seconds
        trackBlogInteraction(post.slug, 'view', {
          sessionEnd: true,
          totalTime: sessionDuration
        });
      }
    };
  }, [post.slug, post.title, post.category, readingStartTime]);

  // Process content with search highlighting
  const processedContent = React.useMemo(() => {
    let content = post.content || '';
    if (highlightTerms.length > 0) {
      content = highlightSearchTerms(content, highlightTerms);
    }
    return DOMPurify.sanitize(content);
  }, [post.content, highlightTerms]);

  const formatDate = (dateString: string | Date) => {
    const date = typeof dateString === 'string' ? new Date(dateString) : dateString;
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const heroImageUrl = post.featuredImage || getDefaultBlogImage();

  return (
    <>
      {/* Reading Progress Bar */}
      <ReadingProgress postSlug={post.slug} />

      {/* Sticky Header */}
      <AnimatePresence>
        {showStickyHeader && (
          <motion.header
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed top-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm"
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between h-16">
                <div className="flex items-center gap-4 flex-1 min-w-0">
                  <Link
                    href="/blog"
                    className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    <ArrowLeft className="h-5 w-5" />
                    <span className="hidden sm:inline">Blog</span>
                  </Link>
                  <div className="min-w-0 flex-1">
                    <h1 className="font-display text-lg font-semibold truncate">
                      {post.title}
                    </h1>
                    <p className="text-sm text-gray-500 truncate">
                      {post.author.name} · {post.readTime} min read
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <BookmarkButton 
                    postSlug={post.slug}
                    postTitle={post.title}
                    variant="minimal"
                    size="sm"
                    showLabel={false}
                  />
                </div>
              </div>
            </div>
          </motion.header>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <article className="min-h-screen bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:flex lg:gap-8">
            
            {/* Main Content Column */}
            <main className="flex-1 max-w-4xl mx-auto lg:mx-0 py-8">
              {/* Back Button */}
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-8 transition-colors group"
              >
                <ArrowLeft className="h-5 w-5 transition-transform group-hover:-translate-x-1" />
                <span>Back to Blog</span>
              </Link>

              {/* Article Header */}
              <header className="mb-12">
                {/* Category Badge */}
                <div className="mb-4">
                  <span 
                    data-testid="category-badge"
                    className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800"
                  >
                    {post.category}
                  </span>
                </div>

                {/* Title */}
                <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                  {post.title}
                </h1>
                
                {/* Excerpt */}
                <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                  {post.excerpt}
                </p>

                {/* Author & Meta Section */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-8 border-b border-gray-200">
                  <div className="flex items-center gap-4">
                    {/* Author Avatar */}
                    <div className="relative w-12 h-12 rounded-full overflow-hidden">
                      <Image
                        src={post.author.avatar}
                        alt={post.author.name}
                        fill
                        className="object-cover"
                        sizes="48px"
                      />
                    </div>
                    
                    <div>
                      <p className="font-semibold text-gray-900">{post.author.name}</p>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          <span>{formatDate(post.publishedAt)}</span>
                        </div>
                        <div className="flex items-center gap-1" data-testid="reading-time">
                          <Clock className="h-4 w-4" />
                          <span>{post.readTime} min read</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Action Buttons */}
                  <div className="flex items-center gap-3">
                    <BookmarkButton 
                      postSlug={post.slug}
                      postTitle={post.title}
                      variant="default"
                    />
                  </div>
                </div>
              </header>

              {/* Hero Image */}
              <div className="relative w-full h-64 sm:h-80 md:h-96 lg:h-[500px] mb-12 rounded-xl overflow-hidden shadow-lg">
                <Image
                  src={heroImageUrl}
                  alt={post.title}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent" />
              </div>

              {/* Article Content */}
              <div 
                ref={contentRef}
                className="prose prose-lg prose-gray max-w-none prose-headings:font-display prose-headings:font-bold prose-a:text-indigo-600 prose-a:no-underline hover:prose-a:underline prose-code:text-indigo-600 prose-code:bg-indigo-50 prose-code:px-1 prose-code:rounded"
                dangerouslySetInnerHTML={{ __html: processedContent }}
              />

              {/* Tags */}
              {post.tags && post.tags.length > 0 && (
                <div className="mt-12 pt-8 border-t border-gray-200">
                  <div className="flex items-center gap-2 mb-4">
                    <Tag className="h-5 w-5 text-gray-400" />
                    <span className="text-sm font-medium text-gray-500">Tags</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag, index) => (
                      <motion.span
                        key={tag}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                        className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors cursor-pointer"
                      >
                        #{tag}
                      </motion.span>
                    ))}
                  </div>
                </div>
              )}

              {/* Related Posts Section */}
              <RelatedPosts 
                currentPost={post}
                allPosts={allPosts}
                className="mt-16"
              />

              {/* Post Navigation */}
              <PostNavigation
                currentPost={post}
                previousPost={previousPost}
                nextPost={nextPost}
                className="mt-12"
              />
            </main>

            {/* Sidebar */}
            <aside className="hidden lg:block w-80 py-8">
              <div className="sticky top-24 space-y-8">
                {/* Table of Contents */}
                <TableOfContents
                  content={processedContent}
                  postSlug={post.slug}
                />
                
                {/* Author Bio */}
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="relative w-16 h-16 rounded-full overflow-hidden">
                      <Image
                        src={post.author.avatar}
                        alt={post.author.name}
                        fill
                        className="object-cover"
                        sizes="64px"
                      />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{post.author.name}</h3>
                      <p className="text-sm text-gray-600">Author</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">{post.author.bio}</p>
                  
                  {/* Social Links */}
                  {post.author.socialLinks && (
                    <div className="flex gap-2 mt-4">
                      {post.author.socialLinks.twitter && (
                        <a
                          href={`https://twitter.com/${post.author.socialLinks.twitter.replace('@', '')}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-400 hover:text-blue-500 transition-colors"
                        >
                          Twitter
                        </a>
                      )}
                      {post.author.socialLinks.linkedin && (
                        <a
                          href={`https://linkedin.com/in/${post.author.socialLinks.linkedin}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-400 hover:text-blue-500 transition-colors"
                        >
                          LinkedIn
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </aside>
          </div>
        </div>
      </article>
    </>
  );
};

export default EnhancedBlogPostClient;