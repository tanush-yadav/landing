/**
 * Default blog images for posts without featured images
 * Using local images from /public/images/blog/ directory
 * Images cycle randomly on each page load for variety
 */

export const DEFAULT_BLOG_IMAGES = [
  '/images/blog/default.jpg',
  '/images/blog/default_2.jpg',
  '/images/blog/default_3.jpg',
];

/**
 * Get a random default image for a blog post
 * Returns a different image each time for variety
 * 
 * @returns URL of a randomly selected default image
 */
export function getDefaultBlogImage(): string {
  // Random selection - different each time for variety
  const randomIndex = Math.floor(Math.random() * DEFAULT_BLOG_IMAGES.length);
  return DEFAULT_BLOG_IMAGES[randomIndex];
}

/**
 * Get a default image by index (for explicit selection)
 * 
 * @param index - The index of the image to retrieve
 * @returns URL of the default image
 */
export function getDefaultImageByIndex(index: number): string {
  return DEFAULT_BLOG_IMAGES[index % DEFAULT_BLOG_IMAGES.length];
}

/**
 * Get total number of default images available
 * 
 * @returns Number of default images
 */
export function getDefaultImageCount(): number {
  return DEFAULT_BLOG_IMAGES.length;
}