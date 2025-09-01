import { render, screen } from '@testing-library/react';
import { useParams, useRouter } from 'next/navigation';
import BlogPostPage from './page';

// Mock the Next.js router
jest.mock('next/navigation', () => ({
  useParams: jest.fn(),
  useRouter: jest.fn(),
}));

// Mock the blog data
jest.mock('@/lib/data/blog-posts', () => ({
  getPostBySlug: jest.fn((slug) => {
    if (slug === 'future-of-ai') {
      return {
        id: '1',
        title: 'The Future of AI in 2024',
        slug: 'future-of-ai',
        excerpt: 'Exploring the latest advancements in artificial intelligence',
        content: 'This is the blog post content.\n\n## Introduction\n\nSome introductory text.\n\n### Key Points\n\n- Point one\n- Point two\n\n> This is a quote\n\n```javascript\nconst example = "code";\n```',
        category: 'Technology',
        tags: ['AI', 'Technology'],
        author: {
          name: 'Jane Doe',
          avatar: '/images/avatar.jpg',
          bio: 'Tech writer',
        },
        publishedAt: new Date('2024-01-15'),
        readTime: 5,
        featuredImage: '/images/blog/ai.jpg',
      };
    }
    return null;
  }),
}));

describe('BlogPostPage', () => {
  const mockPush = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders blog post with clean layout', () => {
    (useParams as jest.Mock).mockReturnValue({ slug: 'future-of-ai' });

    render(<BlogPostPage />);

    // Check for title
    expect(screen.getByText('The Future of AI in 2024')).toBeInTheDocument();

    // Check for excerpt
    expect(screen.getByText('Exploring the latest advancements in artificial intelligence')).toBeInTheDocument();

    // Check for meta information
    expect(screen.getByText('Jane Doe')).toBeInTheDocument();
    expect(screen.getByText('5 min read')).toBeInTheDocument();

    // Check for back button
    expect(screen.getByText('Back to blog')).toBeInTheDocument();
  });

  it('shows 404 state for non-existent post', () => {
    (useParams as jest.Mock).mockReturnValue({ slug: 'non-existent' });

    render(<BlogPostPage />);

    expect(screen.getByText('Post Not Found')).toBeInTheDocument();
    expect(screen.getByText(/doesn't exist/)).toBeInTheDocument();
  });

  it('renders content with proper typography', () => {
    (useParams as jest.Mock).mockReturnValue({ slug: 'future-of-ai' });

    const { container } = render(<BlogPostPage />);

    // Check for headings with font-display class
    const headings = container.querySelectorAll('.font-display');
    expect(headings.length).toBeGreaterThan(0);

    // Check for proper content structure
    const article = container.querySelector('article');
    expect(article).toBeInTheDocument();

    // Check for prose content wrapper
    const proseContent = container.querySelector('.prose-content');
    expect(proseContent).toBeInTheDocument();
  });

  it('has reading progress bar', () => {
    (useParams as jest.Mock).mockReturnValue({ slug: 'future-of-ai' });

    const { container } = render(<BlogPostPage />);

    // Check for progress bar
    const progressBar = container.querySelector('[style*="width"]');
    expect(progressBar).toBeInTheDocument();
  });
});