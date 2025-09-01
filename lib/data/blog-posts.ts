/**
 * Blog Posts Data - Client-side Stubs
 * 
 * This file provides empty arrays for client components
 * Actual data comes from server components
 */

import { BlogPost, BlogCategory, BlogTag } from '@/lib/types';

// Empty arrays for client-side imports
// These will be overridden by server-side data
export const blogPosts: BlogPost[] = [];
export const blogCategories: BlogCategory[] = [];
export const blogTags: BlogTag[] = [];

// Helper functions that return empty arrays on client
export const getPostBySlug = (slug: string): BlogPost | undefined => undefined;
export const getPostsByCategory = (categorySlug: string): BlogPost[] => [];
export const getPostsByTag = (tagSlug: string): BlogPost[] => [];
export const getPostsByAuthor = (authorName: string): BlogPost[] => [];
export const searchPosts = (query: string): BlogPost[] => [];
export const getFeaturedPosts = (limit: number = 3): BlogPost[] => [];
export const getRecentPosts = (limit: number = 5): BlogPost[] => [];