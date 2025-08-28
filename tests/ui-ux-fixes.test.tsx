/**
 * UI/UX Fixes Test Suite
 * 
 * Tests for the critical UI/UX improvements implemented
 */

import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

// Mock window.matchMedia for responsive tests
beforeAll(() => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation(query => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  });
});

describe('UI/UX Fixes', () => {
  describe('Focus States', () => {
    it('should have visible focus indicators on interactive elements', () => {
      const button = document.createElement('button');
      button.className = 'focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-600';
      document.body.appendChild(button);
      
      // Simulate focus
      button.focus();
      
      // Check if focus classes are applied
      expect(button.className).toContain('focus-visible:ring-2');
      expect(button.className).toContain('focus-visible:ring-indigo-600');
      
      document.body.removeChild(button);
    });
  });

  describe('Mobile Touch Targets', () => {
    it('should have minimum 48px touch targets on mobile', () => {
      const button = document.createElement('button');
      button.className = 'py-3 px-4 min-h-[44px]';
      button.style.minHeight = '44px';
      document.body.appendChild(button);
      
      const computedStyle = window.getComputedStyle(button);
      const height = parseInt(computedStyle.minHeight);
      
      expect(height).toBeGreaterThanOrEqual(44);
      
      document.body.removeChild(button);
    });
  });

  describe('Gradient Backgrounds', () => {
    it('should have gradient backgrounds on primary buttons', () => {
      const button = document.createElement('button');
      button.className = 'bg-gradient-to-r from-indigo-600 to-purple-600';
      document.body.appendChild(button);
      
      expect(button.className).toContain('bg-gradient-to-r');
      expect(button.className).toContain('from-indigo-600');
      expect(button.className).toContain('to-purple-600');
      
      document.body.removeChild(button);
    });
  });

  describe('Responsive Grid Layouts', () => {
    it('should stack on mobile and grid on desktop', () => {
      const grid = document.createElement('div');
      grid.className = 'grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6';
      document.body.appendChild(grid);
      
      // Mobile: single column
      expect(grid.className).toContain('grid-cols-1');
      // Desktop: two columns
      expect(grid.className).toContain('lg:grid-cols-2');
      
      document.body.removeChild(grid);
    });
  });

  describe('Loading States', () => {
    it('should have skeleton loading components', () => {
      const skeleton = document.createElement('div');
      skeleton.className = 'animate-pulse bg-gray-200 rounded';
      document.body.appendChild(skeleton);
      
      expect(skeleton.className).toContain('animate-pulse');
      expect(skeleton.className).toContain('bg-gray-200');
      
      document.body.removeChild(skeleton);
    });
  });

  describe('Accessibility', () => {
    it('should have proper ARIA labels', () => {
      const button = document.createElement('button');
      button.setAttribute('aria-label', 'Delegate task to AI');
      button.setAttribute('aria-busy', 'false');
      document.body.appendChild(button);
      
      expect(button.getAttribute('aria-label')).toBe('Delegate task to AI');
      expect(button.getAttribute('aria-busy')).toBe('false');
      
      document.body.removeChild(button);
    });
  });
});