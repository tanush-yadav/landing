/**
 * Related Posts Component
 * Shows relevant blog posts based on content similarity and user preferences
 */

'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Clock, TrendingUp } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { BlogPost } from '@/lib/types';
import { getRelatedPosts, trackBlogInteraction } from '@/lib/blog-interlinking';
import { cn } from '@/lib/design-system';

interface RelatedPostsProps {
  currentPost: BlogPost;
  allPosts: BlogPost[];
  className?: string;
  limit?: number;
}

const RelatedPosts: React.FC<RelatedPostsProps> = ({
  currentPost,
  allPosts,
  className,
  limit = 5
}) => {
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadRelatedPosts = async () => {
      setIsLoading(true);
      
      // Get related posts using our algorithm
      const related = getRelatedPosts(currentPost, allPosts, limit);
      setRelatedPosts(related);
      
      // Track related posts impression
      trackBlogInteraction(currentPost.slug, 'view', {
        relatedPostsShown: related.map(p => p.slug),
        context: 'related_posts_section'
      });
      
      setIsLoading(false);
    };

    loadRelatedPosts();
  }, [currentPost, allPosts, limit]);

  const handleRelatedPostClick = (targetPost: BlogPost) => {
    trackBlogInteraction(targetPost.slug, 'view', {
      source: 'related_posts',
      currentPostSlug: currentPost.slug,
      category: targetPost.category
    });
  };

  if (isLoading) {
    return (
      <section className={cn('py-12', className)}>
        <div className="space-y-8">
          <div className="h-8 w-48 bg-gray-200 rounded animate-pulse" />
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="space-y-4">
                <div className="h-48 bg-gray-200 rounded-lg animate-pulse" />
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200 rounded animate-pulse" />
                  <div className="h-4 w-3/4 bg-gray-200 rounded animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (relatedPosts.length === 0) {
    return null;
  }

  return (
    <section 
      data-testid="related-posts-section"
      className={cn('py-12 border-t border-gray-200', className)}
    >
      <div className="space-y-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-3"
        >
          <TrendingUp className="h-6 w-6 text-indigo-600" />
          <h2 className="text-2xl font-bold text-gray-900">
            Related Articles
          </h2>
          <div className="flex-1 h-px bg-gradient-to-r from-indigo-200 to-transparent" />
        </motion.div>

        {/* Related Posts Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence>
            {relatedPosts.map((post, index) => (
              <motion.article
                key={post.id}
                data-testid="related-post-card"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ 
                  duration: 0.5, 
                  delay: index * 0.1,
                  ease: [0.25, 0.4, 0.25, 1]
                }}
                className="group cursor-pointer"
              >
                <Link 
                  href={`/blog/${post.slug}`}
                  onClick={() => handleRelatedPostClick(post)}
                  className="block h-full"
                >
                  <div className="relative h-full bg-white rounded-xl border border-gray-200/60 overflow-hidden hover:shadow-lg hover:border-transparent transition-all duration-300 transform hover:-translate-y-1">
                    
                    {/* Featured Image */}
                    <div className="relative h-48 bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
                      <Image
                        src={post.featuredImage || '/images/blog/default-hero.jpg'}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                      
                      {/* Category Badge */}
                      <div className="absolute top-4 right-4">
                        <span className="px-2 py-1 bg-white/90 backdrop-blur-sm text-xs font-semibold text-indigo-600 rounded-full border border-white/50">
                          {post.category}
                        </span>
                      </div>
                      
                      {/* Overlay Gradient */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      {/* Meta Information */}
                      <div className="flex items-center gap-3 mb-3 text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <Clock className="h-3.5 w-3.5" />
                          <span>{post.readTime} min</span>
                        </div>
                        <div className="h-1 w-1 bg-gray-400 rounded-full" />
                        <span>
                          {new Date(post.publishedAt).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric'
                          })}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="font-display font-bold text-lg text-gray-900 mb-2 line-clamp-2 group-hover:text-indigo-600 transition-colors duration-300">
                        {post.title}
                      </h3>

                      {/* Excerpt */}
                      <p className="text-gray-600 text-sm leading-relaxed line-clamp-2 mb-4">
                        {post.excerpt}
                      </p>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {post.tags.slice(0, 2).map((tag, tagIndex) => (
                          <span
                            key={tag}
                            className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded hover:bg-gray-200 transition-colors duration-200"
                          >
                            #{tag}
                          </span>
                        ))}
                        {post.tags.length > 2 && (
                          <span className="text-xs text-gray-400">
                            +{post.tags.length - 2} more
                          </span>
                        )}
                      </div>

                      {/* Footer with Read More */}
                      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                        <div className="flex items-center gap-2">
                          <div className="h-8 w-8 rounded-full overflow-hidden">
                            <Image
                              src={post.author.avatar}
                              alt={post.author.name}
                              width={32}
                              height={32}
                              className="object-cover"
                            />
                          </div>
                          <span className="text-sm font-medium text-gray-700">
                            {post.author.name}
                          </span>
                        </div>

                        <motion.div
                          className="flex items-center gap-1 text-indigo-600 text-sm font-medium"
                          whileHover={{ x: 4 }}
                          transition={{ duration: 0.2 }}
                        >
                          <span>Read</span>
                          <ArrowRight className="h-4 w-4" />
                        </motion.div>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.article>
            ))}
          </AnimatePresence>
        </div>

        {/* View All Link */}
        {allPosts.length > relatedPosts.length + 1 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-center"
          >
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gray-50 hover:bg-gray-100 text-gray-700 rounded-lg transition-colors duration-200 font-medium"
            >
              <span>View All Articles</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default RelatedPosts;