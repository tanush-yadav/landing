import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import readingTime from 'reading-time';
import BlogPostClient from './blog-post-client';

interface BlogPostData {
  title: string;
  description?: string;
  excerpt?: string;
  date: string;
  author: string;
  slug: string;
  category?: string;
  featuredImage?: string;
  readTime?: number;
  content: string;
  htmlContent: string;
}

async function getPost(slug: string): Promise<BlogPostData | null> {
  const postsDirectory = path.join(process.cwd(), 'src/content');
  
  try {
    // First try direct file lookup
    const directFile = `${slug}.md`;
    const directPath = path.join(postsDirectory, directFile);
    
    let matchingFile: string | undefined;
    
    if (fs.existsSync(directPath)) {
      matchingFile = directFile;
    } else {
      // Try to find the markdown file by checking slug field in frontmatter
      const files = fs.readdirSync(postsDirectory);
      matchingFile = files.find(file => {
        if (!file.endsWith('.md')) return false;
        const fullPath = path.join(postsDirectory, file);
        const fileContents = fs.readFileSync(fullPath, 'utf8');
        const { data } = matter(fileContents);
        return data.slug === slug;
      });
    }

    if (!matchingFile) {
      return null;
    }

    const fullPath = path.join(postsDirectory, matchingFile);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);
    
    // Process the content with remark
    const processedContent = await remark()
      .use(html)
      .process(content);
    const htmlContent = processedContent.toString();
    
    // Calculate reading time
    const stats = readingTime(content);
    
    return {
      title: data.title || 'Untitled',
      description: data.description || data.excerpt || '',
      excerpt: data.excerpt || data.description || '',
      date: data.date || new Date().toISOString(),
      author: data.author || 'Anonymous',
      slug: data.slug || slug,
      category: data.category || 'General',
      featuredImage: data.featuredImage || data.image || data.coverImage,
      readTime: Math.ceil(stats.minutes),
      content: content,
      htmlContent: htmlContent
    };
  } catch (error) {
    console.error('Error loading blog post:', error);
    return null;
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  
  if (!post) {
    return {
      title: 'Post Not Found | Volition Labs',
    };
  }
  
  return {
    title: `${post.title} | Volition Labs Blog`,
    description: post.description || post.excerpt,
    authors: [{ name: post.author }],
    openGraph: {
      title: post.title,
      description: post.description || post.excerpt,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
      images: post.featuredImage ? [post.featuredImage] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description || post.excerpt,
      images: post.featuredImage ? [post.featuredImage] : [],
    },
  };
}

export async function generateStaticParams() {
  const postsDirectory = path.join(process.cwd(), 'src/content');
  
  try {
    const files = fs.readdirSync(postsDirectory);
    return files
      .filter(file => file.endsWith('.md'))
      .map(file => {
        const fullPath = path.join(postsDirectory, file);
        const fileContents = fs.readFileSync(fullPath, 'utf8');
        const { data } = matter(fileContents);
        return {
          slug: data.slug || file.replace('.md', '')
        };
      });
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPost(slug);
  
  if (!post) {
    notFound();
  }

  return <BlogPostClient post={post} />;
}