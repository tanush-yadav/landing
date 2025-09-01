import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import readingTime from 'reading-time';

const postsDirectory = path.join(process.cwd(), 'src/content');

export interface PostData {
  slug: string;
  title: string;
  date: string;
  author: string;
  authorAvatar?: string;
  excerpt: string;
  category: string;
  tags?: string[];
  image?: string;
  content: string;
  readTime: number;
  contentHtml?: string;
}

export function getAllPostSlugs() {
  try {
    const fileNames = fs.readdirSync(postsDirectory);
    return fileNames
      .filter(fileName => fileName.endsWith('.md'))
      .map(fileName => ({
        params: {
          slug: fileName.replace(/\.md$/, '')
        }
      }));
  } catch (error) {
    console.error('Error reading posts directory:', error);
    return [];
  }
}

export function getAllPosts(): PostData[] {
  try {
    const fileNames = fs.readdirSync(postsDirectory);
    const allPostsData = fileNames
      .filter(fileName => fileName.endsWith('.md'))
      .map(fileName => {
        const slug = fileName.replace(/\.md$/, '');
        const fullPath = path.join(postsDirectory, fileName);
        const fileContents = fs.readFileSync(fullPath, 'utf8');
        const matterResult = matter(fileContents);
        const stats = readingTime(matterResult.content);

        return {
          slug,
          ...matterResult.data,
          content: matterResult.content,
          readTime: Math.ceil(stats.minutes)
        } as PostData;
      });

    return allPostsData.sort((a, b) => {
      if (a.date < b.date) {
        return 1;
      } else {
        return -1;
      }
    });
  } catch (error) {
    console.error('Error getting all posts:', error);
    return [];
  }
}

export async function getPostData(slug: string): Promise<PostData | null> {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.md`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const matterResult = matter(fileContents);
    const stats = readingTime(matterResult.content);

    // Convert markdown to HTML
    const processedContent = await remark()
      .use(html)
      .process(matterResult.content);
    const contentHtml = processedContent.toString();

    return {
      slug,
      ...matterResult.data,
      content: matterResult.content,
      contentHtml,
      readTime: Math.ceil(stats.minutes)
    } as PostData;
  } catch (error) {
    console.error(`Error getting post data for ${slug}:`, error);
    return null;
  }
}

export function getPostsByCategory(category: string): PostData[] {
  const allPosts = getAllPosts();
  return allPosts.filter(post => 
    post.category.toLowerCase() === category.toLowerCase()
  );
}

export function getPostsByTag(tag: string): PostData[] {
  const allPosts = getAllPosts();
  return allPosts.filter(post => 
    post.tags?.includes(tag)
  );
}

export function getRelatedPosts(currentSlug: string, limit: number = 3): PostData[] {
  const allPosts = getAllPosts();
  const currentPost = allPosts.find(post => post.slug === currentSlug);
  
  if (!currentPost) return [];
  
  // Find posts with similar tags or category
  const relatedPosts = allPosts
    .filter(post => post.slug !== currentSlug)
    .map(post => {
      let score = 0;
      
      // Same category gets higher score
      if (post.category === currentPost.category) {
        score += 3;
      }
      
      // Matching tags
      if (currentPost.tags && post.tags) {
        const matchingTags = currentPost.tags.filter(tag => 
          post.tags?.includes(tag)
        );
        score += matchingTags.length;
      }
      
      return { post, score };
    })
    .filter(item => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(item => item.post);
  
  return relatedPosts;
}