/**
 * E2E Tests for Simplified Navigation
 * 
 * TDD Red Phase: These tests will FAIL initially and drive the implementation
 * Playwright E2E tests for complete user navigation flows
 */

import { test, expect } from '@playwright/test';

test.describe('Simplified Navigation E2E Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  test.describe('Desktop Navigation', () => {
    test('should display only Agents and Blog links', async ({ page }) => {
      // Should show simplified navigation links in the nav header
      const header = page.locator('header');
      await expect(header.getByRole('link', { name: /agents/i })).toBeVisible();
      await expect(header.getByRole('link', { name: /blog/i })).toBeVisible();
      
      // Should NOT show removed links in the navigation header
      await expect(header.getByText(/pricing/i)).not.toBeVisible();
      await expect(header.getByText(/security/i)).not.toBeVisible();
      await expect(header.getByText(/careers/i)).not.toBeVisible();
      await expect(header.getByText(/docs/i)).not.toBeVisible();
      await expect(header.getByText(/community/i)).not.toBeVisible();
      await expect(header.getByText(/login/i)).not.toBeVisible();
    });

    test('should navigate correctly to team page via Agents link', async ({ page }) => {
      const header = page.locator('header');
      await header.getByRole('link', { name: /agents/i }).click();
      await expect(page).toHaveURL('/team');
    });

    test('should navigate to blog page via Blog link', async ({ page }) => {
      const header = page.locator('header');
      await header.getByRole('link', { name: /blog/i }).click();
      await expect(page).toHaveURL('/blog');
    });
  });

  test.describe('Mobile Navigation', () => {
    test('should show simplified mobile menu', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      
      // Open mobile menu
      await page.click('[aria-label="Toggle navigation menu"]');
      
      // Look specifically in the mobile menu panel for links
      const mobileMenu = page.locator('.absolute.right-4.top-4.bottom-4');
      await expect(mobileMenu.getByRole('link', { name: /agents/i })).toBeVisible();
      await expect(mobileMenu.getByRole('link', { name: /blog/i })).toBeVisible();
      
      // Should NOT show removed links in mobile menu
      await expect(mobileMenu.getByText(/pricing/i)).not.toBeVisible();
      await expect(mobileMenu.getByText(/login/i)).not.toBeVisible();
    });

    test('should preserve mobile menu interaction', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      
      // Menu should open
      await page.click('[aria-label="Toggle navigation menu"]');
      await expect(page.getByRole('button', { name: /close menu/i })).toBeVisible();
      
      // Menu should close when clicking a link (use the mobile menu selector)
      const mobileMenu = page.locator('.absolute.right-4.top-4.bottom-4');
      await mobileMenu.getByRole('link', { name: /agents/i }).click();
      await expect(page).toHaveURL('/team');
    });
  });

  test.describe('Scroll Behavior Preservation', () => {
    test('should maintain scroll-based styling changes', async ({ page }) => {
      // Scroll down to trigger scroll behavior
      await page.evaluate(() => window.scrollTo(0, 200));
      
      // Navigation should still be visible and functional (look in header specifically)
      const header = page.locator('header');
      await expect(header.getByRole('link', { name: /agents/i })).toBeVisible();
      await expect(header.getByRole('link', { name: /blog/i })).toBeVisible();
      
      // Should maintain glassmorphic styling - check the main navigation nav
      const nav = page.locator('header nav');
      await expect(nav).toHaveClass(/backdrop-blur/);
    });
  });

  test.describe('Accessibility Compliance', () => {
    test('should maintain keyboard navigation', async ({ page }) => {
      // Focus on first navigation link specifically
      const header = page.locator('header');
      const agentsLink = header.getByRole('link', { name: /agents/i });
      
      // Focus and activate the link
      await agentsLink.focus();
      await page.keyboard.press('Enter');
      
      // Should navigate successfully to team page
      await expect(page).toHaveURL('/team');
    });

    test('should support screen reader navigation', async ({ page }) => {
      const header = page.locator('header');
      const agentsLink = header.getByRole('link', { name: /agents/i });
      const blogLink = header.getByRole('link', { name: /blog/i });
      
      await expect(agentsLink).toBeVisible();
      await expect(blogLink).toBeVisible();
      
      // Links should have proper accessibility attributes
      await expect(agentsLink).toHaveAttribute('href', '/team');
      await expect(blogLink).toHaveAttribute('href', '/blog');
    });
  });
});