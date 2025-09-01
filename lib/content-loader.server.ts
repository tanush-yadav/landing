/**
 * Server-side Content Loader
 * This file can only be used in server components
 */

import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { BlogPost, BlogCategory } from '@/lib/types'

const contentDirectory = path.join(process.cwd(), 'src/content')

export function getPostSlugs(): string[] {
  if (!fs.existsSync(contentDirectory)) {
    return []
  }

  return fs
    .readdirSync(contentDirectory)
    .filter((file) => file.endsWith('.md') || file.endsWith('.mdx'))
}

export function getPostBySlug(slug: string): BlogPost | null {
  const realSlug = slug.replace(/\.mdx?$/, '')
  const fullPath = path.join(contentDirectory, `${realSlug}.md`)

  // Try .md first, then .mdx
  let filePath = fullPath
  if (!fs.existsSync(filePath)) {
    filePath = path.join(contentDirectory, `${realSlug}.mdx`)
    if (!fs.existsSync(filePath)) {
      return null
    }
  }

  const fileContents = fs.readFileSync(filePath, 'utf8')
  const { data, content } = matter(fileContents)

  // Calculate read time (roughly 200 words per minute)
  const wordCount = content.split(/\s+/).length
  const readTime = Math.ceil(wordCount / 200)

  // Create blog post object with Sophia as the author
  const post: BlogPost = {
    id: realSlug,
    slug: data.slug || realSlug,
    title: data.title || 'Untitled Post',
    excerpt:
      data.description || data.excerpt || content.substring(0, 200) + '...',
    content: content,
    author: {
      name: 'Sophia',
      avatar: '/images/sophia-agent.png',
      bio: 'AI Research Agent at Cintra, exploring automation and AI innovation',
      socialLinks: {
        twitter: '@sophia_ai_agent',
        linkedin: 'sophia-cintra-ai',
      },
    },
    publishedAt: data.date || new Date().toISOString(),
    readTime: data.readTime || readTime,
    tags: data.tags || extractTagsFromContent(content),
    category: data.category || 'Operations',
    featuredImage: data.featuredImage || data.image || '/blog/default-hero.jpg',
    status: data.status || 'published',
    seo: {
      metaTitle: data.metaTitle || `${data.title} | Cintra`,
      metaDescription: data.metaDescription || data.description || data.excerpt,
      keywords: data.keywords || data.tags || [],
      canonicalUrl: data.canonicalUrl || `https://cintra.run/blog/${realSlug}`,
    },
  }

  return post
}

export function getAllPosts(): BlogPost[] {
  const slugs = getPostSlugs()
  const posts = slugs
    .map((slug) => getPostBySlug(slug.replace(/\.mdx?$/, '')))
    .filter((post): post is BlogPost => post !== null)
    .sort((a, b) => {
      const dateA = new Date(a.publishedAt).getTime()
      const dateB = new Date(b.publishedAt).getTime()
      return dateB - dateA // Most recent first
    })

  return posts
}

export function getPostsByCategory(category: string): BlogPost[] {
  return getAllPosts().filter(
    (post) => post.category.toLowerCase() === category.toLowerCase()
  )
}

export function getPostsByTag(tag: string): BlogPost[] {
  return getAllPosts().filter((post) =>
    post.tags.some(
      (postTag) =>
        postTag.toLowerCase().replace(/\s+/g, '-') === tag.toLowerCase()
    )
  )
}

export function searchPosts(query: string): BlogPost[] {
  const searchTerm = query.toLowerCase()
  return getAllPosts().filter(
    (post) =>
      post.title.toLowerCase().includes(searchTerm) ||
      post.excerpt.toLowerCase().includes(searchTerm) ||
      post.tags.some((tag) => tag.toLowerCase().includes(searchTerm)) ||
      post.category.toLowerCase().includes(searchTerm)
  )
}

export function getFeaturedPosts(limit: number = 3): BlogPost[] {
  return getAllPosts().slice(0, limit)
}

export function getRecentPosts(limit: number = 5): BlogPost[] {
  return getAllPosts().slice(0, limit)
}

// Helper function to extract tags from content
function extractTagsFromContent(content: string): string[] {
  const tags: string[] = []

  // Common automation-related keywords
  const keywords = [
    'AI Automation',
    'Productivity',
    'Workflows',
    'Integration',
    'Analytics',
    'Strategy',
    'Best Practices',
    'Team Management',
  ]

  keywords.forEach((keyword) => {
    if (content.toLowerCase().includes(keyword.toLowerCase())) {
      tags.push(keyword)
    }
  })

  return tags.length > 0 ? tags : ['AI Automation']
}

// Export categories (can be made dynamic later)
export const blogCategories: BlogCategory[] = [
  {
    id: 'engineering',
    name: 'Engineering',
    slug: 'engineering',
    description: 'AI automation for development teams',
    color: 'bg-blue-500',
    postCount: 0,
  },
  {
    id: 'content',
    name: 'Content',
    slug: 'content',
    description: 'Content strategy and AI writing tools',
    color: 'bg-purple-500',
    postCount: 0,
  },
  {
    id: 'sales',
    name: 'Sales',
    slug: 'sales',
    description: 'AI-powered sales automation',
    color: 'bg-green-500',
    postCount: 0,
  },
  {
    id: 'operations',
    name: 'Operations',
    slug: 'operations',
    description: 'Operational efficiency with AI',
    color: 'bg-orange-500',
    postCount: 0,
  },
]

// Update category counts dynamically
export function getCategoriesWithCounts(): BlogCategory[] {
  const categories = [...blogCategories]
  const posts = getAllPosts()

  categories.forEach((category) => {
    category.postCount = posts.filter(
      (post) => post.category.toLowerCase() === category.name.toLowerCase()
    ).length
  })

  return categories
}
