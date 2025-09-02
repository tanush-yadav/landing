/**
 * Test Suite for AgentAvatar Component
 * Following TDD approach - tests written before implementation
 */

import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { AgentAvatar } from '@/components/alex/agent-avatar';
import { AgentAvatarProps } from '@/types/alex-agent';

describe('AgentAvatar Component', () => {
  const defaultProps: AgentAvatarProps = {
    src: '/images/alex-avatar.webp',
    alt: 'Alex AI Agent',
    size: 'md',
    loading: 'lazy',
  };

  describe('Rendering', () => {
    it('should render with essential props', () => {
      render(<AgentAvatar {...defaultProps} />);
      
      const avatar = screen.getByTestId('agent-avatar');
      expect(avatar).toBeInTheDocument();
      
      const image = screen.getByRole('img', { name: /alex ai agent/i });
      expect(image).toBeInTheDocument();
      expect(image).toHaveAttribute('src', expect.stringContaining('alex-avatar'));
      expect(image).toHaveAttribute('alt', 'Alex AI Agent');
    });

    it('should apply correct size classes', () => {
      const sizes: Array<AgentAvatarProps['size']> = ['sm', 'md', 'lg', 'xl'];
      
      sizes.forEach(size => {
        const { container, rerender } = render(
          <AgentAvatar {...defaultProps} size={size} />
        );
        
        const avatar = container.querySelector('[data-testid="agent-avatar"]');
        expect(avatar).toHaveClass(`avatar-${size}`);
        
        rerender(<div />); // Clean up for next iteration
      });
    });

    it('should support custom className', () => {
      render(<AgentAvatar {...defaultProps} className="custom-avatar-class" />);
      
      const avatar = screen.getByTestId('agent-avatar');
      expect(avatar).toHaveClass('custom-avatar-class');
    });

    it('should render with WebP and fallback sources', () => {
      render(<AgentAvatar {...defaultProps} />);
      
      const picture = screen.getByTestId('agent-avatar-picture');
      expect(picture).toBeInTheDocument();
      
      // Check for WebP source
      const webpSource = picture.querySelector('source[type="image/webp"]');
      expect(webpSource).toBeInTheDocument();
      expect(webpSource).toHaveAttribute('srcset', expect.stringContaining('.webp'));
      
      // Check for AVIF source if supported
      const avifSource = picture.querySelector('source[type="image/avif"]');
      if (avifSource) {
        expect(avifSource).toHaveAttribute('srcset', expect.stringContaining('.avif'));
      }
    });
  });

  describe('Loading States', () => {
    it('should show skeleton loader while image is loading', () => {
      render(<AgentAvatar {...defaultProps} />);
      
      const skeleton = screen.getByTestId('avatar-skeleton');
      expect(skeleton).toBeInTheDocument();
      expect(skeleton).toHaveClass('animate-pulse');
    });

    it('should hide skeleton after image loads', async () => {
      render(<AgentAvatar {...defaultProps} />);
      
      const image = screen.getByRole('img', { name: /alex ai agent/i }) as HTMLImageElement;
      
      // Simulate image load
      Object.defineProperty(image, 'complete', { value: true });
      image.dispatchEvent(new Event('load'));
      
      await waitFor(() => {
        const skeleton = screen.queryByTestId('avatar-skeleton');
        expect(skeleton).not.toBeInTheDocument();
      });
    });

    it('should apply lazy loading attribute', () => {
      render(<AgentAvatar {...defaultProps} loading="lazy" />);
      
      const image = screen.getByRole('img');
      expect(image).toHaveAttribute('loading', 'lazy');
    });

    it('should apply eager loading when specified', () => {
      render(<AgentAvatar {...defaultProps} loading="eager" />);
      
      const image = screen.getByRole('img');
      expect(image).toHaveAttribute('loading', 'eager');
    });
  });

  describe('Fallback Handling', () => {
    it('should show fallback image on error', async () => {
      const fallbackSrc = '/images/default-avatar.png';
      render(<AgentAvatar {...defaultProps} fallback={fallbackSrc} />);
      
      const image = screen.getByRole('img') as HTMLImageElement;
      
      // Simulate image error
      image.dispatchEvent(new Event('error'));
      
      await waitFor(() => {
        expect(image).toHaveAttribute('src', expect.stringContaining('default-avatar'));
      });
    });

    it('should show default fallback when no fallback provided', async () => {
      render(<AgentAvatar {...defaultProps} />);
      
      const image = screen.getByRole('img') as HTMLImageElement;
      
      // Simulate image error
      image.dispatchEvent(new Event('error'));
      
      await waitFor(() => {
        const fallbackElement = screen.getByTestId('avatar-fallback');
        expect(fallbackElement).toBeInTheDocument();
        expect(fallbackElement).toHaveTextContent('A'); // First letter of "Alex"
      });
    });
  });

  describe('Status Indicator', () => {
    it('should show status indicator when showStatus is true', () => {
      render(<AgentAvatar {...defaultProps} showStatus status="online" />);
      
      const statusIndicator = screen.getByTestId('avatar-status');
      expect(statusIndicator).toBeInTheDocument();
      expect(statusIndicator).toHaveClass('status-online');
    });

    it('should apply correct status colors', () => {
      const statuses: Array<'online' | 'offline' | 'busy'> = ['online', 'offline', 'busy'];
      
      statuses.forEach(status => {
        const { container, rerender } = render(
          <AgentAvatar {...defaultProps} showStatus status={status} />
        );
        
        const statusIndicator = container.querySelector('[data-testid="avatar-status"]');
        expect(statusIndicator).toHaveClass(`status-${status}`);
        
        rerender(<div />);
      });
    });

    it('should not show status indicator by default', () => {
      render(<AgentAvatar {...defaultProps} />);
      
      const statusIndicator = screen.queryByTestId('avatar-status');
      expect(statusIndicator).not.toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('should have proper ARIA attributes', () => {
      render(<AgentAvatar {...defaultProps} aria-label="Alex Agent Profile Picture" />);
      
      const avatar = screen.getByTestId('agent-avatar');
      expect(avatar).toHaveAttribute('role', 'img');
      expect(avatar).toHaveAttribute('aria-label', 'Alex Agent Profile Picture');
    });

    it('should support aria-describedby', () => {
      render(
        <>
          <AgentAvatar {...defaultProps} aria-describedby="avatar-description" />
          <span id="avatar-description">AI Code Review Assistant</span>
        </>
      );
      
      const avatar = screen.getByTestId('agent-avatar');
      expect(avatar).toHaveAttribute('aria-describedby', 'avatar-description');
    });

    it('should have descriptive alt text', () => {
      render(<AgentAvatar {...defaultProps} />);
      
      const image = screen.getByRole('img');
      expect(image).toHaveAttribute('alt', 'Alex AI Agent');
    });
  });

  describe('Responsive Behavior', () => {
    it('should render different sizes for different viewports', () => {
      render(<AgentAvatar {...defaultProps} />);
      
      const picture = screen.getByTestId('agent-avatar-picture');
      const sources = picture.querySelectorAll('source[media]');
      
      // Should have responsive sources
      expect(sources.length).toBeGreaterThan(0);
      
      // Check for mobile/desktop breakpoints
      const hasResponsiveSources = Array.from(sources).some(source => 
        source.getAttribute('media')?.includes('min-width')
      );
      expect(hasResponsiveSources).toBe(true);
    });
  });

  describe('Performance', () => {
    it('should include width and height to prevent layout shift', () => {
      render(<AgentAvatar {...defaultProps} size="lg" />);
      
      const image = screen.getByRole('img');
      expect(image).toHaveAttribute('width');
      expect(image).toHaveAttribute('height');
    });

    it('should use blur placeholder for smooth loading', () => {
      render(<AgentAvatar {...defaultProps} />);
      
      const wrapper = screen.getByTestId('agent-avatar');
      const blurPlaceholder = wrapper.querySelector('[data-blur-placeholder]');
      
      expect(blurPlaceholder).toBeInTheDocument();
    });
  });

  describe('Error Handling', () => {
    it('should handle missing src gracefully', () => {
      render(<AgentAvatar {...defaultProps} src="" />);
      
      const fallback = screen.getByTestId('avatar-fallback');
      expect(fallback).toBeInTheDocument();
    });

    it('should retry loading on error with exponential backoff', async () => {
      jest.useFakeTimers();
      
      render(<AgentAvatar {...defaultProps} />);
      
      const image = screen.getByRole('img') as HTMLImageElement;
      
      // First error
      image.dispatchEvent(new Event('error'));
      
      // Should retry after delay
      jest.advanceTimersByTime(1000);
      
      await waitFor(() => {
        expect(image).toHaveAttribute('src', expect.stringContaining('alex-avatar'));
      });
      
      jest.useRealTimers();
    });
  });
});