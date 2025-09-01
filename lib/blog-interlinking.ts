/**
 * Blog Interlinking System
 * Enhanced blog discovery through related posts, analytics tracking, and user preferences
 */

import { BlogPost } from '@/lib/types';
import posthog from 'posthog-js';

// Types for blog interlinking
export interface BlogPreferences {
  readingHistory: string[];
  bookmarks: string[];
  preferredCategories: string[];
  readingProgress: Record<string, number>;
  interactionData: {
    clicks: Record<string, number>;
    timeSpent: Record<string, number>;
  };
}

export interface BlogInteractionData {
  type: 'view' | 'bookmark' | 'scroll' | 'share' | 'search';
  slug: string;
  category?: string;
  metadata?: Record<string, unknown>;
}

export interface TableOfContentsItem {
  id: string;
  text: string;
  level: number;
  children: TableOfContentsItem[];
}

// Constants
const BLOG_PREFERENCES_KEY = 'blog_preferences';
const MAX_READING_HISTORY = 50;
const DEFAULT_RELATED_POSTS_LIMIT = 5;

/**
 * Get related posts based on content similarity and user preferences
 */
export function getRelatedPosts(
  currentPost: BlogPost, 
  allPosts: BlogPost[], 
  limit: number = DEFAULT_RELATED_POSTS_LIMIT
): BlogPost[] {
  if (!allPosts.length) return [];
  
  const preferences = getBlogPreferences();
  
  // Filter out current post
  const candidatePosts = allPosts.filter(post => post.id !== currentPost.id);
  
  // Calculate relevance scores
  const scoredPosts = candidatePosts.map(post => ({
    ...post,
    relevanceScore: calculateRelevanceScore(post, currentPost, preferences)
  }));
  
  // Sort by relevance and return top results
  return scoredPosts
    .sort((a, b) => b.relevanceScore - a.relevanceScore)
    .slice(0, limit);
}

/**
 * Calculate relevance score between two posts
 */
export function calculateRelevanceScore(
  candidatePost: BlogPost, 
  currentPost: BlogPost, 
  preferences?: BlogPreferences
): number {
  let score = 0;
  
  // Category match (high weight)
  if (candidatePost.category === currentPost.category) {
    score += 40;
  }
  
  // Tag overlap (medium weight)
  const sharedTags = candidatePost.tags.filter(tag => 
    currentPost.tags.includes(tag)
  );
  score += sharedTags.length * 15;
  
  // Same author (low weight)
  if (candidatePost.author.name === currentPost.author.name) {
    score += 10;
  }
  
  // Recency boost (newer posts get slight bonus)
  const candidateDate = new Date(candidatePost.publishedAt);
  const currentDate = new Date(currentPost.publishedAt);
  const daysDifference = Math.abs(
    (candidateDate.getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24)
  );
  
  if (daysDifference <= 30) {
    score += Math.max(0, 15 - daysDifference / 2);
  }
  
  // User preference boost
  if (preferences) {
    // Preferred category boost
    if (preferences.preferredCategories.includes(candidatePost.category)) {
      score += 20;
    }
    
    // Reading history boost (if user has read similar posts)
    const similarHistoryPosts = preferences.readingHistory.filter(historySlug => {
      const historyPost = allPosts.find(p => p.slug === historySlug);
      return historyPost && (
        historyPost.category === candidatePost.category ||
        historyPost.tags.some(tag => candidatePost.tags.includes(tag))
      );
    });
    
    if (similarHistoryPosts.length > 0) {
      score += Math.min(15, similarHistoryPosts.length * 3);
    }
  }
  
  return score;
}

/**
 * Track blog interactions with PostHog and update preferences
 */
export function trackBlogInteraction(
  slug: string, 
  action: BlogInteractionData['type'], 
  metadata?: Record<string, unknown>
): void {
  const timestamp = Date.now();
  
  // Track with PostHog
  if (typeof window !== 'undefined' && posthog) {
    posthog.capture(`blog_${action}`, {
      slug,
      timestamp,
      ...metadata
    });
  }
  
  // Update local preferences
  updateBlogPreferences({
    type: action,
    slug,
    category: typeof metadata?.category === 'string' ? metadata.category : undefined,
    metadata
  });
}

/**
 * Get user blog preferences from localStorage
 */
export function getBlogPreferences(): BlogPreferences {
  if (typeof window === 'undefined') {
    return getDefaultPreferences();
  }
  
  try {
    const stored = localStorage.getItem(BLOG_PREFERENCES_KEY);
    if (!stored) return getDefaultPreferences();
    
    const parsed = JSON.parse(stored) as BlogPreferences;
    
    // Ensure all required fields exist
    return {
      readingHistory: parsed.readingHistory || [],
      bookmarks: parsed.bookmarks || [],
      preferredCategories: parsed.preferredCategories || [],
      readingProgress: parsed.readingProgress || {},
      interactionData: {
        clicks: parsed.interactionData?.clicks || {},
        timeSpent: parsed.interactionData?.timeSpent || {}
      }
    };
  } catch {
    return getDefaultPreferences();
  }
}

/**
 * Update blog preferences in localStorage
 */
export function updateBlogPreferences(data: BlogInteractionData): void {
  if (typeof window === 'undefined') return;
  
  try {
    const preferences = getBlogPreferences();
    
    // Update based on interaction type
    switch (data.type) {
      case 'view':
        // Add to reading history
        if (!preferences.readingHistory.includes(data.slug)) {
          preferences.readingHistory.unshift(data.slug);
          // Limit history length
          if (preferences.readingHistory.length > MAX_READING_HISTORY) {
            preferences.readingHistory = preferences.readingHistory.slice(0, MAX_READING_HISTORY);
          }
        }
        
        // Update preferred categories
        if (data.category && !preferences.preferredCategories.includes(data.category)) {
          preferences.preferredCategories.push(data.category);
        }
        break;
        
      case 'bookmark':
        if (data.metadata?.action === 'add') {
          if (!preferences.bookmarks.includes(data.slug)) {
            preferences.bookmarks.push(data.slug);
          }
        } else if (data.metadata?.action === 'remove') {
          preferences.bookmarks = preferences.bookmarks.filter(slug => slug !== data.slug);
        }
        break;
        
      case 'scroll':
        if (data.metadata?.scrollPercentage && typeof data.metadata.scrollPercentage === 'number') {
          preferences.readingProgress[data.slug] = data.metadata.scrollPercentage;
        }
        if (data.metadata?.timeOnPage && typeof data.metadata.timeOnPage === 'number') {
          preferences.interactionData.timeSpent[data.slug] = data.metadata.timeOnPage;
        }
        break;
        
      case 'share':
        preferences.interactionData.clicks[data.slug] = 
          (preferences.interactionData.clicks[data.slug] || 0) + 1;
        break;
    }
    
    localStorage.setItem(BLOG_PREFERENCES_KEY, JSON.stringify(preferences));
  } catch (error) {
    console.warn('Failed to update blog preferences:', error);
  }
}

/**
 * Calculate current reading progress percentage
 */
export function getReadingProgress(): number {
  if (typeof window === 'undefined') return 0;
  
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight;
  const winHeight = window.innerHeight;
  const scrollPercent = (scrollTop + winHeight) / docHeight * 100;
  
  return Math.min(100, Math.max(0, scrollPercent));
}

/**
 * Generate table of contents from HTML content
 */
export function generateTableOfContents(htmlContent: string): TableOfContentsItem[] {
  if (typeof window === 'undefined') return [];
  
  // Create a temporary DOM element to parse HTML
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = htmlContent;
  
  const headings = tempDiv.querySelectorAll('h1, h2, h3, h4, h5, h6');
  const toc: TableOfContentsItem[] = [];
  const stack: TableOfContentsItem[] = [];
  
  headings.forEach(heading => {
    const level = parseInt(heading.tagName.charAt(1));
    const text = heading.textContent || '';
    const id = heading.id || generateHeadingId(text);
    
    // Ensure heading has an ID for linking
    if (!heading.id) {
      heading.id = id;
    }
    
    const item: TableOfContentsItem = {
      id,
      text,
      level,
      children: []
    };
    
    // Handle nesting based on heading levels
    while (stack.length > 0 && stack[stack.length - 1].level >= level) {
      stack.pop();
    }
    
    if (stack.length === 0) {
      toc.push(item);
    } else {
      stack[stack.length - 1].children.push(item);
    }
    
    stack.push(item);
  });
  
  return toc;
}

/**
 * Highlight search terms in content
 */
export function highlightSearchTerms(content: string, searchTerms: string[]): string {
  if (!searchTerms.length) return content;
  
  let highlightedContent = content;
  
  searchTerms.forEach(term => {
    if (!term.trim()) return;
    
    // Create regex that doesn't match inside HTML tags
    const regex = new RegExp(
      `(?<!<[^>]*)(${escapeRegExp(term)})(?![^<]*>)`, 
      'gi'
    );
    
    highlightedContent = highlightedContent.replace(
      regex, 
      '<mark data-testid="search-highlight" class="bg-yellow-200 px-1 rounded">$1</mark>'
    );
  });
  
  return highlightedContent;
}

/**
 * Check if user has bookmarked a post
 */
export function isPostBookmarked(slug: string): boolean {
  const preferences = getBlogPreferences();
  return preferences.bookmarks.includes(slug);
}

/**
 * Get user's reading progress for a specific post
 */
export function getPostReadingProgress(slug: string): number {
  const preferences = getBlogPreferences();
  return preferences.readingProgress[slug] || 0;
}

/**
 * Get user's bookmarked posts
 */
export function getBookmarkedPosts(allPosts: BlogPost[]): BlogPost[] {
  const preferences = getBlogPreferences();
  return allPosts.filter(post => preferences.bookmarks.includes(post.slug));
}

/**
 * Get suggested categories based on user reading history
 */
export function getSuggestedCategories(allPosts: BlogPost[]): string[] {
  const preferences = getBlogPreferences();
  
  // Count category interactions
  const categoryCounts: Record<string, number> = {};
  
  preferences.readingHistory.forEach(slug => {
    const post = allPosts.find(p => p.slug === slug);
    if (post) {
      categoryCounts[post.category] = (categoryCounts[post.category] || 0) + 1;
    }
  });
  
  // Sort by frequency and return top categories
  return Object.entries(categoryCounts)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 5)
    .map(([category]) => category);
}

// Helper functions
function getDefaultPreferences(): BlogPreferences {
  return {
    readingHistory: [],
    bookmarks: [],
    preferredCategories: [],
    readingProgress: {},
    interactionData: {
      clicks: {},
      timeSpent: {}
    }
  };
}

function generateHeadingId(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .trim();
}

function escapeRegExp(string: string): string {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// Export a global reference for allPosts (to be injected by components)
let allPosts: BlogPost[] = [];

export function setAllPosts(posts: BlogPost[]): void {
  allPosts = posts;
}

export function getAllPosts(): BlogPost[] {
  return allPosts;
}