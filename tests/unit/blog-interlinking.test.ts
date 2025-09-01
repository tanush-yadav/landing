/**
 * Unit Tests for Blog Interlinking Utilities
 * Testing related post algorithms, analytics tracking, and user preferences
 */

import { describe, it, expect, jest, beforeEach, afterEach } from '@jest/globals';
import { BlogPost, BlogCategory } from '@/lib/types';

// Mock PostHog
const mockPostHog = {
  capture: jest.fn(),
  identify: jest.fn(),
};

jest.mock('posthog-js', () => mockPostHog);

// Mock localStorage
const mockLocalStorage = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: jest.fn((key: string) => store[key] || null),
    setItem: jest.fn((key: string, value: string) => {
      store[key] = value;
    }),
    removeItem: jest.fn((key: string) => {
      delete store[key];
    }),
    clear: jest.fn(() => {
      store = {};
    })
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: mockLocalStorage
});

// Import the utilities we're testing (these don't exist yet - we're doing TDD)
import { 
  getRelatedPosts, 
  trackBlogInteraction, 
  calculateRelevanceScore,
  getBlogPreferences,
  updateBlogPreferences,
  getReadingProgress,
  generateTableOfContents,
  highlightSearchTerms
} from '@/lib/blog-interlinking';

// Sample blog posts for testing
const mockPosts: BlogPost[] = [
  {
    id: 'post1',
    title: 'The 5 Agent Patterns That Matter',
    excerpt: 'AI agent patterns for production systems',
    content: 'Content about AI agents and patterns...',
    author: { name: 'Tanush Yadav', avatar: '/avatar.jpg', bio: 'Author bio' },
    publishedAt: '2025-09-01',
    readTime: 8,
    tags: ['ai-agents', 'production', 'system-design'],
    category: 'Engineering',
    slug: 'the-5-agent-patterns-that-matter',
    status: 'published',
    featuredImage: '/images/blog/default_4.jpg'
  },
  {
    id: 'post2',
    title: '8 MCP Servers That Make Claude Code 10x Better',
    excerpt: 'MCP servers for enhanced Claude development',
    content: 'Content about MCP servers...',
    author: { name: 'Tanush Yadav', avatar: '/avatar.jpg', bio: 'Author bio' },
    publishedAt: '2025-08-28',
    readTime: 6,
    tags: ['claude', 'mcp', 'development'],
    category: 'Engineering',
    slug: 'mcp-servers-claude-code',
    status: 'published',
    featuredImage: '/images/blog/default_2.jpg'
  },
  {
    id: 'post3',
    title: 'Why Content Is Hard',
    excerpt: 'The challenges of content creation',
    content: 'Content about content creation challenges...',
    author: { name: 'Sophia', avatar: '/sophia.jpg', bio: 'AI Agent' },
    publishedAt: '2025-08-25',
    readTime: 4,
    tags: ['content', 'marketing', 'strategy'],
    category: 'Content',
    slug: 'why-content-is-hard',
    status: 'published',
    featuredImage: '/images/blog/default_3.jpg'
  },
  {
    id: 'post4',
    title: 'Small Business AI Automation',
    excerpt: 'How small businesses can leverage AI',
    content: 'Content about small business automation...',
    author: { name: 'Sophia', avatar: '/sophia.jpg', bio: 'AI Agent' },
    publishedAt: '2025-08-20',
    readTime: 7,
    tags: ['small-business', 'automation', 'ai'],
    category: 'Operations',
    slug: 'small-business-ai-automation',
    status: 'published',
    featuredImage: '/images/blog/default_1.jpg'
  }
];

describe('getRelatedPosts', () => {
  it('should return related posts based on category and tags', () => {
    const currentPost = mockPosts[0]; // Engineering post about AI agents
    const related = getRelatedPosts(currentPost, mockPosts);
    
    expect(related).toHaveLength(3); // Should return other posts
    expect(related[0].id).not.toBe(currentPost.id); // Should not include current post
    
    // First related post should be from same category
    const sameCategory = related.filter(p => p.category === currentPost.category);
    expect(sameCategory.length).toBeGreaterThan(0);
  });

  it('should limit results to specified number', () => {
    const currentPost = mockPosts[0];
    const related = getRelatedPosts(currentPost, mockPosts, 2);
    
    expect(related).toHaveLength(2);
  });

  it('should consider user preferences when available', () => {
    // Mock user preferences
    mockLocalStorage.getItem.mockReturnValue(JSON.stringify({
      preferredCategories: ['Engineering'],
      readingHistory: ['post2', 'post3']
    }));
    
    const currentPost = mockPosts[0];
    const related = getRelatedPosts(currentPost, mockPosts);
    
    // Should prioritize Engineering posts due to preferences
    const engineeringPosts = related.filter(p => p.category === 'Engineering');
    expect(engineeringPosts.length).toBeGreaterThan(0);
  });

  it('should handle empty post array gracefully', () => {
    const currentPost = mockPosts[0];
    const related = getRelatedPosts(currentPost, []);
    
    expect(related).toHaveLength(0);
  });
});

describe('calculateRelevanceScore', () => {
  it('should give higher scores to posts with shared tags', () => {
    const post1 = mockPosts[0]; // ai-agents, production, system-design
    const post2 = mockPosts[1]; // claude, mcp, development
    const post3 = { ...mockPosts[2], tags: ['ai-agents', 'production'] }; // Shares tags with post1
    
    const score1 = calculateRelevanceScore(post2, post1);
    const score2 = calculateRelevanceScore(post3, post1);
    
    expect(score2).toBeGreaterThan(score1);
  });

  it('should give higher scores to posts in same category', () => {
    const post1 = mockPosts[0]; // Engineering
    const post2 = mockPosts[1]; // Engineering
    const post3 = mockPosts[2]; // Content
    
    const score1 = calculateRelevanceScore(post2, post1);
    const score2 = calculateRelevanceScore(post3, post1);
    
    expect(score1).toBeGreaterThan(score2);
  });

  it('should consider recency in scoring', () => {
    const currentPost = mockPosts[0];
    const recentPost = { ...mockPosts[1], publishedAt: '2025-09-01' };
    const oldPost = { ...mockPosts[2], publishedAt: '2024-01-01' };
    
    const recentScore = calculateRelevanceScore(recentPost, currentPost);
    const oldScore = calculateRelevanceScore(oldPost, currentPost);
    
    expect(recentScore).toBeGreaterThan(oldScore);
  });
});

describe('trackBlogInteraction', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should track blog post view with PostHog', () => {
    trackBlogInteraction('post1', 'view', { source: 'homepage' });
    
    expect(mockPostHog.capture).toHaveBeenCalledWith('blog_view', {
      slug: 'post1',
      timestamp: expect.any(Number),
      source: 'homepage'
    });
  });

  it('should track bookmark interactions', () => {
    trackBlogInteraction('post1', 'bookmark', { action: 'add' });
    
    expect(mockPostHog.capture).toHaveBeenCalledWith('blog_bookmark', {
      slug: 'post1',
      timestamp: expect.any(Number),
      action: 'add'
    });
  });

  it('should update local preferences on interaction', () => {
    trackBlogInteraction('post1', 'view', { category: 'Engineering' });
    
    expect(mockLocalStorage.setItem).toHaveBeenCalledWith(
      'blog_preferences',
      expect.stringContaining('Engineering')
    );
  });

  it('should track reading progress', () => {
    trackBlogInteraction('post1', 'scroll', { 
      scrollPercentage: 75,
      timeOnPage: 120 
    });
    
    expect(mockPostHog.capture).toHaveBeenCalledWith('blog_scroll', {
      slug: 'post1',
      timestamp: expect.any(Number),
      scrollPercentage: 75,
      timeOnPage: 120
    });
  });
});

describe('getBlogPreferences', () => {
  afterEach(() => {
    mockLocalStorage.clear();
  });

  it('should return default preferences if none exist', () => {
    mockLocalStorage.getItem.mockReturnValue(null);
    
    const prefs = getBlogPreferences();
    
    expect(prefs).toEqual({
      readingHistory: [],
      bookmarks: [],
      preferredCategories: [],
      readingProgress: {},
      interactionData: {
        clicks: {},
        timeSpent: {}
      }
    });
  });

  it('should parse and return existing preferences', () => {
    const mockPrefs = {
      readingHistory: ['post1', 'post2'],
      bookmarks: ['post1'],
      preferredCategories: ['Engineering'],
      readingProgress: { post1: 100 },
      interactionData: {
        clicks: { post1: 5 },
        timeSpent: { post1: 300 }
      }
    };
    
    mockLocalStorage.getItem.mockReturnValue(JSON.stringify(mockPrefs));
    
    const prefs = getBlogPreferences();
    
    expect(prefs).toEqual(mockPrefs);
  });

  it('should handle corrupted localStorage gracefully', () => {
    mockLocalStorage.getItem.mockReturnValue('invalid json');
    
    const prefs = getBlogPreferences();
    
    expect(prefs.readingHistory).toEqual([]);
  });
});

describe('updateBlogPreferences', () => {
  it('should update reading history', () => {
    updateBlogPreferences({
      type: 'view',
      slug: 'post1',
      category: 'Engineering'
    });
    
    expect(mockLocalStorage.setItem).toHaveBeenCalledWith(
      'blog_preferences',
      expect.any(String)
    );
    
    const savedData = JSON.parse((mockLocalStorage.setItem as jest.Mock).mock.calls[0][1]);
    expect(savedData.readingHistory).toContain('post1');
    expect(savedData.preferredCategories).toContain('Engineering');
  });

  it('should limit reading history to 50 items', () => {
    // Mock existing long history
    const longHistory = Array.from({length: 55}, (_, i) => `post${i}`);
    mockLocalStorage.getItem.mockReturnValue(JSON.stringify({
      readingHistory: longHistory,
      bookmarks: [],
      preferredCategories: [],
      readingProgress: {},
      interactionData: { clicks: {}, timeSpent: {} }
    }));
    
    updateBlogPreferences({
      type: 'view',
      slug: 'new-post',
      category: 'Engineering'
    });
    
    const savedData = JSON.parse((mockLocalStorage.setItem as jest.Mock).mock.calls[0][1]);
    expect(savedData.readingHistory).toHaveLength(50);
    expect(savedData.readingHistory).toContain('new-post');
  });
});

describe('getReadingProgress', () => {
  it('should calculate reading progress based on scroll position', () => {
    // Mock DOM elements and scroll position
    Object.defineProperty(window, 'scrollY', { value: 500, writable: true });
    Object.defineProperty(document.documentElement, 'scrollHeight', { value: 2000 });
    Object.defineProperty(window, 'innerHeight', { value: 800 });
    
    const progress = getReadingProgress();
    
    // Progress should be around 41.7% ((500 + 800) / 2000 * 100)
    expect(progress).toBeCloseTo(65, 0);
  });

  it('should handle edge cases', () => {
    // Mock no scroll
    Object.defineProperty(window, 'scrollY', { value: 0 });
    Object.defineProperty(document.documentElement, 'scrollHeight', { value: 1000 });
    Object.defineProperty(window, 'innerHeight', { value: 800 });
    
    const progress = getReadingProgress();
    expect(progress).toBeCloseTo(80, 0); // 800/1000 * 100
  });
});

describe('generateTableOfContents', () => {
  it('should extract headings and create TOC structure', () => {
    const content = `
      <h1>Main Title</h1>
      <p>Some content</p>
      <h2 id="section-1">First Section</h2>
      <p>More content</p>
      <h3 id="subsection-1">Subsection</h3>
      <p>Content</p>
      <h2 id="section-2">Second Section</h2>
    `;
    
    const toc = generateTableOfContents(content);
    
    expect(toc).toHaveLength(3); // h2 and h3 elements
    expect(toc[0]).toEqual({
      id: 'section-1',
      text: 'First Section',
      level: 2,
      children: [
        { id: 'subsection-1', text: 'Subsection', level: 3, children: [] }
      ]
    });
  });

  it('should handle content without headings', () => {
    const content = '<p>Just a paragraph</p>';
    const toc = generateTableOfContents(content);
    
    expect(toc).toHaveLength(0);
  });
});

describe('highlightSearchTerms', () => {
  it('should highlight search terms in content', () => {
    const content = 'This is about AI agents and automation patterns.';
    const searchTerms = ['AI', 'patterns'];
    
    const highlighted = highlightSearchTerms(content, searchTerms);
    
    expect(highlighted).toContain('<mark data-testid="search-highlight">AI</mark>');
    expect(highlighted).toContain('<mark data-testid="search-highlight">patterns</mark>');
  });

  it('should handle case insensitive search', () => {
    const content = 'AI and ai are the same thing.';
    const searchTerms = ['ai'];
    
    const highlighted = highlightSearchTerms(content, searchTerms);
    
    expect(highlighted).toContain('<mark data-testid="search-highlight">AI</mark>');
    expect(highlighted).toContain('<mark data-testid="search-highlight">ai</mark>');
  });

  it('should not highlight within HTML tags', () => {
    const content = '<a href="/ai">AI Link</a> about AI technology';
    const searchTerms = ['ai'];
    
    const highlighted = highlightSearchTerms(content, searchTerms);
    
    // Should not break the href attribute
    expect(highlighted).toContain('<a href="/ai">');
    // Should highlight the text content
    expect(highlighted).toContain('<mark data-testid="search-highlight">AI</mark> technology');
  });

  it('should handle empty search terms', () => {
    const content = 'Some content here.';
    const highlighted = highlightSearchTerms(content, []);
    
    expect(highlighted).toBe(content);
  });
});