/**
 * Navigation Simplification Tests
 * 
 * TDD Red Phase: These tests will FAIL initially and drive the implementation
 * of simplified navigation with only Agents and Blog links
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

// Mock Next.js modules
vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: vi.fn() }),
  usePathname: () => '/',
}));

vi.mock('next/link', () => ({
  default: ({ children, href, ...props }: any) => (
    <a href={href} {...props}>{children}</a>
  ),
}));

describe('Navigation Simplification Requirements', () => {
  let NavigationComponent: any;

  beforeEach(async () => {
    // Reset document body for each test
    document.body.innerHTML = '';
    
    // Dynamically import Navigation component
    const module = await import('@/components/navigation');
    NavigationComponent = module.default;
  });

  describe('Simplified Navigation Structure', () => {
    it('should render only Agents and Blog links', () => {
      render(<NavigationComponent />);
      
      // These should be present (will PASS when implemented)
      const agentsLinks = screen.getAllByRole('link', { name: /agents/i });
      const blogLinks = screen.getAllByRole('link', { name: /blog/i });
      
      expect(agentsLinks.length).toBeGreaterThanOrEqual(1);
      expect(blogLinks.length).toBeGreaterThanOrEqual(1);
      
      // These should NOT be present (will FAIL initially, PASS when removed)
      expect(screen.queryByText(/pricing/i)).not.toBeInTheDocument();
      expect(screen.queryByText(/security/i)).not.toBeInTheDocument();
      expect(screen.queryByText(/careers/i)).not.toBeInTheDocument();
      expect(screen.queryByText(/enterprise/i)).not.toBeInTheDocument();
      expect(screen.queryByText(/docs/i)).not.toBeInTheDocument();
      expect(screen.queryByText(/community/i)).not.toBeInTheDocument();
      expect(screen.queryByText(/login/i)).not.toBeInTheDocument();
    });

    it('should have correct href attributes for navigation links', () => {
      render(<NavigationComponent />);
      
      const agentsLinks = screen.getAllByRole('link', { name: /agents/i });
      const blogLinks = screen.getAllByRole('link', { name: /blog/i });
      
      // Check that at least one Agents link has correct href
      expect(agentsLinks.some(link => link.getAttribute('href') === '/team')).toBe(true);
      // Check that at least one Blog link has correct href
      expect(blogLinks.some(link => link.getAttribute('href') === '/blog')).toBe(true);
    });

    it('should maintain logo and brand functionality', () => {
      render(<NavigationComponent />);
      
      const logo = screen.getByRole('link', { name: /cintra home/i });
      expect(logo).toBeInTheDocument();
      expect(logo).toHaveAttribute('href', '/');
      expect(logo).toHaveTextContent('Cintra');
    });
  });

  describe('Mobile Navigation Simplified Structure', () => {
    it('should show simplified navigation in mobile menu', () => {
      render(<NavigationComponent />);
      
      // Open mobile menu
      const menuButton = screen.getByRole('button', { name: /toggle navigation menu/i });
      fireEvent.click(menuButton);
      
      // Should show only Agents and Blog in mobile menu
      expect(screen.getAllByText(/agents/i).length).toBeGreaterThanOrEqual(1);
      expect(screen.getAllByText(/blog/i).length).toBeGreaterThanOrEqual(1);
      
      // Should NOT show removed items in mobile menu
      expect(screen.queryByText(/pricing/i)).not.toBeInTheDocument();
      expect(screen.queryByText(/login/i)).not.toBeInTheDocument();
    });

    it('should preserve mobile menu functionality', () => {
      render(<NavigationComponent />);
      
      const menuButton = screen.getByRole('button', { name: /toggle navigation menu/i });
      
      // Menu should open
      fireEvent.click(menuButton);
      expect(menuButton).toHaveAttribute('aria-expanded', 'true');
      
      // Menu should close
      const closeButton = screen.getByRole('button', { name: /close menu/i });
      fireEvent.click(closeButton);
      expect(menuButton).toHaveAttribute('aria-expanded', 'false');
    });
  });

  describe('Preserved Functionality', () => {
    it('should maintain glassmorphic styling classes', () => {
      const { container } = render(<NavigationComponent />);
      
      // Check for glassmorphic design classes
      const nav = container.querySelector('nav');
      expect(nav?.className).toMatch(/backdrop-blur/);
      expect(nav?.className).toMatch(/bg-white/);
    });

    it('should preserve scroll behavior state management', () => {
      const { container } = render(<NavigationComponent />);
      
      // Should render navigation header
      const header = container.querySelector('header');
      expect(header).toBeInTheDocument();
      expect(header?.className).toMatch(/fixed/);
      expect(header?.className).toMatch(/transition/);
    });

    it('should maintain accessibility attributes', () => {
      render(<NavigationComponent />);
      
      const menuButton = screen.getByRole('button', { name: /toggle navigation menu/i });
      expect(menuButton).toHaveAttribute('aria-expanded');
      expect(menuButton).toHaveAttribute('aria-label');
    });
  });
});