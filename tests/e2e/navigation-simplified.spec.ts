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
      // Should show simplified navigation links
      await expect(page.getByRole('link', { name: /agents/i })).toBeVisible();
      await expect(page.getByRole('link', { name: /blog/i })).toBeVisible();
      
      // Should NOT show removed links
      await expect(page.getByText(/pricing/i)).not.toBeVisible();
      await expect(page.getByText(/security/i)).not.toBeVisible();
      await expect(page.getByText(/careers/i)).not.toBeVisible();
      await expect(page.getByText(/enterprise/i)).not.toBeVisible();
      await expect(page.getByText(/docs/i)).not.toBeVisible();
      await expect(page.getByText(/community/i)).not.toBeVisible();
      await expect(page.getByText(/login/i)).not.toBeVisible();
    });

    test('should navigate correctly to team page via Agents link', async ({ page }) => {
      await page.click('text=Agents');
      await expect(page).toHaveURL('/team');
    });

    test('should navigate to blog page via Blog link', async ({ page }) => {
      await page.click('text=Blog');
      await expect(page).toHaveURL('/blog');
    });
  });

  test.describe('Mobile Navigation', () => {
    test('should show simplified mobile menu', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      
      // Open mobile menu
      await page.click('[aria-label="Toggle navigation menu"]');
      
      // Should show only simplified links in mobile menu
      await expect(page.getByText('Agents')).toBeVisible();
      await expect(page.getByText('Blog')).toBeVisible();
      
      // Should NOT show removed links in mobile menu
      await expect(page.getByText('Pricing')).not.toBeVisible();
      await expect(page.getByText('Login')).not.toBeVisible();
    });

    test('should preserve mobile menu interaction', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      
      // Menu should open
      await page.click('[aria-label="Toggle navigation menu"]');
      await expect(page.getByRole('button', { name: /close menu/i })).toBeVisible();
      
      // Menu should close when clicking a link
      await page.click('text=Agents');
      await expect(page).toHaveURL('/team');
    });
  });

  test.describe('Scroll Behavior Preservation', () => {
    test('should maintain scroll-based styling changes', async ({ page }) => {
      // Scroll down to trigger scroll behavior
      await page.evaluate(() => window.scrollTo(0, 200));
      
      // Navigation should still be visible and functional
      await expect(page.getByText('Agents')).toBeVisible();
      await expect(page.getByText('Blog')).toBeVisible();
      
      // Should maintain glassmorphic styling
      const nav = page.locator('nav');
      await expect(nav).toHaveClass(/backdrop-blur/);
    });
  });

  test.describe('Accessibility Compliance', () => {
    test('should maintain keyboard navigation', async ({ page }) => {
      // Tab through navigation
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      
      // Should be able to activate links with Enter
      await page.keyboard.press('Enter');
      
      // Should navigate successfully (to whichever link has focus)
      const currentUrl = page.url();
      expect(currentUrl).toMatch(/\/(team|blog)$/);
    });

    test('should support screen reader navigation', async ({ page }) => {
      const agentsLink = page.getByRole('link', { name: /agents/i });
      const blogLink = page.getByRole('link', { name: /blog/i });
      
      await expect(agentsLink).toBeVisible();
      await expect(blogLink).toBeVisible();
      
      // Links should have proper accessibility attributes
      await expect(agentsLink).toHaveAttribute('href', '/team');
      await expect(blogLink).toHaveAttribute('href', '/blog');
    });
  });
});