/**
 * E2E Tests for Blog Interlinking Features
 * Testing related posts, reading progress, and cross-post navigation
 */

import { test, expect } from '@playwright/test';

test.describe('Blog Interlinking System', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to a blog post page
    await page.goto('/blog/the-5-agent-patterns-that-matter-from-simple-prompts-to-production-systems');
  });

  test('should display related posts section', async ({ page }) => {
    // Should show related posts at the end of the article
    const relatedPostsSection = page.locator('[data-testid="related-posts-section"]');
    await expect(relatedPostsSection).toBeVisible();
    
    // Should have a heading
    const heading = relatedPostsSection.locator('h2');
    await expect(heading).toContainText('Related Articles');
    
    // Should show at least 2-3 related posts
    const relatedPosts = relatedPostsSection.locator('[data-testid="related-post-card"]');
    await expect(relatedPosts).toHaveCount({ min: 2, max: 5 });
  });

  test('should display reading progress indicator', async ({ page }) => {
    // Should show reading progress bar
    const progressBar = page.locator('[data-testid="reading-progress"]');
    await expect(progressBar).toBeVisible();
    
    // Progress should start at 0 or near 0
    const initialProgress = await progressBar.getAttribute('data-progress');
    expect(parseInt(initialProgress || '0')).toBeLessThan(10);
    
    // Scroll to bottom and check progress increases
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(100);
    
    const finalProgress = await progressBar.getAttribute('data-progress');
    expect(parseInt(finalProgress || '0')).toBeGreaterThan(80);
  });

  test('should track blog post interactions with PostHog', async ({ page }) => {
    // Mock PostHog calls
    await page.route('**/ingest/**', (route) => {
      route.fulfill({ status: 200, body: 'OK' });
    });
    
    // Should track blog post view on load
    const postHogCalls = [];
    page.on('request', request => {
      if (request.url().includes('/ingest/')) {
        postHogCalls.push(request.postData());
      }
    });
    
    await page.reload();
    await page.waitForTimeout(1000);
    
    // Should have tracked blog post view event
    const viewEvents = postHogCalls.filter(data => 
      data?.includes('blog_post_viewed')
    );
    expect(viewEvents.length).toBeGreaterThan(0);
  });

  test('should show bookmark functionality', async ({ page }) => {
    // Should have bookmark button
    const bookmarkButton = page.locator('[data-testid="bookmark-button"]');
    await expect(bookmarkButton).toBeVisible();
    
    // Should toggle bookmark state
    await bookmarkButton.click();
    await expect(bookmarkButton).toHaveAttribute('data-bookmarked', 'true');
    
    // Should persist bookmark state in localStorage
    const bookmarkState = await page.evaluate(() => 
      localStorage.getItem('blog_bookmarks')
    );
    expect(bookmarkState).toBeTruthy();
  });

  test('should display next/previous post navigation', async ({ page }) => {
    // Should show navigation at bottom of post
    const postNavigation = page.locator('[data-testid="post-navigation"]');
    await expect(postNavigation).toBeVisible();
    
    // Should have previous and/or next post links
    const prevLink = postNavigation.locator('[data-testid="prev-post-link"]');
    const nextLink = postNavigation.locator('[data-testid="next-post-link"]');
    
    const hasNavigation = await prevLink.count() > 0 || await nextLink.count() > 0;
    expect(hasNavigation).toBeTruthy();
  });

  test('should highlight search terms when coming from search', async ({ page }) => {
    // Navigate from search with query parameters
    await page.goto('/blog/the-5-agent-patterns-that-matter-from-simple-prompts-to-production-systems?highlight=agent%20patterns');
    
    // Should highlight the search terms
    const highlightedTerms = page.locator('[data-testid="search-highlight"]');
    await expect(highlightedTerms).toHaveCount({ min: 1 });
    
    // Highlighted terms should be visible
    const firstHighlight = highlightedTerms.first();
    await expect(firstHighlight).toBeVisible();
    await expect(firstHighlight).toHaveClass(/highlight/);
  });

  test('should show reading time and category badges', async ({ page }) => {
    // Should display reading time
    const readingTime = page.locator('[data-testid="reading-time"]');
    await expect(readingTime).toBeVisible();
    await expect(readingTime).toContainText('min');
    
    // Should display category badge
    const categoryBadge = page.locator('[data-testid="category-badge"]');
    await expect(categoryBadge).toBeVisible();
    await expect(categoryBadge).toContainText('Engineering');
  });

  test('should show table of contents for long posts', async ({ page }) => {
    // Should show TOC for posts with multiple headings
    const toc = page.locator('[data-testid="table-of-contents"]');
    
    // TOC should be visible if the post has multiple sections
    const headings = page.locator('h2, h3');
    const headingCount = await headings.count();
    
    if (headingCount >= 3) {
      await expect(toc).toBeVisible();
      
      // TOC should have clickable links
      const tocLinks = toc.locator('a');
      await expect(tocLinks).toHaveCount({ min: 2 });
      
      // Clicking TOC link should scroll to section
      const firstLink = tocLinks.first();
      await firstLink.click();
      await page.waitForTimeout(500);
      
      // Should have scrolled (we can't easily test exact position in Playwright)
      const scrollY = await page.evaluate(() => window.scrollY);
      expect(scrollY).toBeGreaterThan(100);
    }
  });
});

test.describe('Blog Homepage Interlinking', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/blog');
  });

  test('should show enhanced blog cards with interaction buttons', async ({ page }) => {
    // Should show blog cards
    const blogCards = page.locator('[data-testid="enhanced-blog-card"]');
    await expect(blogCards).toHaveCount({ min: 1 });
    
    // Hover over first card to reveal interaction buttons
    const firstCard = blogCards.first();
    await firstCard.hover();
    
    // Should show bookmark and share buttons on hover
    await expect(page.locator('[data-testid="bookmark-action"]').first()).toBeVisible();
    await expect(page.locator('[data-testid="share-action"]').first()).toBeVisible();
  });

  test('should filter posts by category and track analytics', async ({ page }) => {
    // Mock PostHog analytics
    await page.route('**/ingest/**', (route) => {
      route.fulfill({ status: 200, body: 'OK' });
    });
    
    // Should have category filters
    const categoryFilter = page.locator('[data-testid="category-filter"]');
    await expect(categoryFilter).toBeVisible();
    
    // Click on a category filter
    const engineeringFilter = page.locator('[data-testid="category-filter-Engineering"]');
    if (await engineeringFilter.count() > 0) {
      await engineeringFilter.click();
      
      // Should filter posts
      const visiblePosts = page.locator('[data-testid="blog-card"]:visible');
      await expect(visiblePosts).toHaveCount({ min: 1 });
      
      // All visible posts should be Engineering category
      const categories = page.locator('[data-testid="blog-card"]:visible [data-testid="category-badge"]');
      const categoryTexts = await categories.allTextContents();
      categoryTexts.forEach(text => {
        expect(text.toLowerCase()).toContain('engineering');
      });
    }
  });

  test('should implement search with autocomplete and suggestions', async ({ page }) => {
    // Should have search input
    const searchInput = page.locator('[data-testid="blog-search-input"]');
    await expect(searchInput).toBeVisible();
    
    // Type search query
    await searchInput.fill('agent');
    await page.waitForTimeout(300); // Wait for debounce
    
    // Should show search suggestions
    const suggestions = page.locator('[data-testid="search-suggestions"]');
    await expect(suggestions).toBeVisible();
    
    // Should have at least one suggestion
    const suggestionItems = suggestions.locator('[data-testid="search-suggestion-item"]');
    await expect(suggestionItems).toHaveCount({ min: 1 });
    
    // Click on first suggestion
    const firstSuggestion = suggestionItems.first();
    await firstSuggestion.click();
    
    // Should navigate to the selected post
    await expect(page).toHaveURL(/\/blog\/.+/);
  });
});